#!/usr/bin/env python3
"""Build a preview that appends four cephalosporins without recalculating old pairs."""

from __future__ import annotations

import argparse
import base64
import json
import math
import re
from pathlib import Path

from rdkit import Chem, DataStructs
from rdkit.Chem import rdDepictor, rdFMCS, rdFingerprintGenerator
from rdkit.Chem.Draw import rdMolDraw2D


NEW_DRUGS = [
    {
        "key": "cefroxadine",
        "name": "セフロキサジン",
        "cls": "第1世代セフェム",
        "smiles": "COC1=C(N2[C@@H]([C@@H](C2=O)NC(=O)[C@@H](C3=CCC=CC3)N)SC1)C(=O)O",
        "r1": "O=C([C@H](N)C1=CCC=CC1)",
        "label": "シクロヘキサジエニル-α-アミノアセチル型",
        "r3": "OC",
        "r3Label": "メトキシ型",
        "note": "構造同定：PubChem CID 5284529／ChEBI 31379。",
    },
    {
        "key": "ceftizoxime",
        "name": "セフチゾキシム",
        "cls": "第3世代セフェム",
        "smiles": "CO/N=C(/C1=CSC(=N1)N)\\C(=O)N[C@H]2[C@@H]3N(C2=O)C(=CCS3)C(=O)O",
        "r1": "O=C(/C(=N\\OC)/c1csc(N)n1)",
        "label": "アミノチアゾリル-メトキシイミノ型",
        "r3": "[H]",
        "r3Label": "H（3位側鎖なし）",
        "note": "構造同定：PubChem CID 6533629／KEGG D00923。",
    },
    {
        "key": "cefminox",
        "name": "セフミノクス",
        "cls": "セファマイシン",
        "smiles": "CN1C(=NN=N1)SCC2=C(N3[C@@H]([C@@](C3=O)(NC(=O)CSC[C@H](C(=O)O)N)OC)SC2)C(=O)O",
        "r1": "O=C(CSC[C@H](N)C(=O)O)",
        "label": "アミノカルボキシエチルチオアセチル型",
        "r3": "CSc1nnnn1C",
        "r3Label": "N-メチルテトラゾールチオメチル型",
        "note": "構造同定：PubChem CID 71141／ChEBI 135817。",
    },
    {
        "key": "cefozopran",
        "name": "セフォゾプラン",
        "cls": "第4世代セフェム",
        "smiles": "CO/N=C(/C1=NSC(=N1)N)\\C(=O)N[C@H]2[C@@H]3N(C2=O)C(=C(CS3)C[N+]4=C5C=CC=NN5C=C4)C(=O)[O-]",
        "r1": "O=C(/C(=N\\OC)/c1nsc(N)n1)",
        "label": "アミノチアジアゾリル-メトキシイミノ型",
        "r3": "C[N+]1=C2C=CC=NN2C=C1",
        "r3Label": "イミダゾピリダジニウムメチル型",
        "note": "構造同定：PubChem CID 9571080。",
    },
]


def mol(smiles: str) -> Chem.Mol:
    parsed = Chem.MolFromSmiles(smiles)
    if parsed is None:
        raise ValueError(f"Invalid SMILES: {smiles}")
    return parsed


def rotate_ceph_core(molecule: Chem.Mol) -> None:
    """Rotate so the beta-lactam N is at the lower right in the rendered SVG."""
    rdDepictor.Compute2DCoords(molecule)
    ring = next(
        (tuple(r) for r in molecule.GetRingInfo().AtomRings()
         if len(r) == 4 and any(molecule.GetAtomWithIdx(i).GetAtomicNum() == 7 for i in r)),
        None,
    )
    if ring is None:
        return
    nitrogen = next(i for i in ring if molecule.GetAtomWithIdx(i).GetAtomicNum() == 7)
    conf = molecule.GetConformer()
    cx = sum(conf.GetAtomPosition(i).x for i in ring) / 4
    cy = sum(conf.GetAtomPosition(i).y for i in ring) / 4
    npos = conf.GetAtomPosition(nitrogen)
    current = math.atan2(npos.y - cy, npos.x - cx)
    theta = -math.pi / 4 - current
    ct, st = math.cos(theta), math.sin(theta)
    for i in range(molecule.GetNumAtoms()):
        p = conf.GetAtomPosition(i)
        x, y = p.x - cx, p.y - cy
        p.x = x * ct - y * st + cx
        p.y = x * st + y * ct + cy
        conf.SetAtomPosition(i, p)


def svg64(smiles: str, *, full: bool) -> str:
    if not full and smiles == "[H]":
        svg = "<svg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'><rect width='320' height='180' fill='#fff'/><text x='160' y='103' text-anchor='middle' font-family='Arial,sans-serif' font-size='46' fill='#000'>H</text></svg>"
        return base64.b64encode(svg.encode()).decode()
    molecule = mol(smiles)
    if full:
        rotate_ceph_core(molecule)
        width, height = 620, 390
    else:
        rdDepictor.Compute2DCoords(molecule)
        width, height = 320, 180
    drawer = rdMolDraw2D.MolDraw2DSVG(width, height)
    drawer.DrawMolecule(molecule)
    drawer.FinishDrawing()
    return base64.b64encode(drawer.GetDrawingText().encode()).decode()


def fragment_mapping(full_smiles: str, fragment_smiles: str) -> tuple[list[int], list[int]]:
    full, fragment = mol(full_smiles), mol(fragment_smiles)
    match = full.GetSubstructMatch(fragment, useChirality=True)
    if not match:
        match = full.GetSubstructMatch(fragment, useChirality=False)
    if not match:
        raise ValueError(f"Fragment {fragment_smiles} not found in {full_smiles}")
    bonds = []
    for bond in fragment.GetBonds():
        mapped = full.GetBondBetweenAtoms(match[bond.GetBeginAtomIdx()], match[bond.GetEndAtomIdx()])
        bonds.append(mapped.GetIdx())
    return list(match), bonds


def mcs_matches(smiles_a: str, smiles_b: str) -> tuple[Chem.Mol | None, tuple[int, ...], tuple[int, ...]]:
    a, b = mol(smiles_a), mol(smiles_b)
    result = rdFMCS.FindMCS(
        [a, b],
        ringMatchesRingOnly=True,
        completeRingsOnly=True,
        atomCompare=rdFMCS.AtomCompare.CompareElements,
        bondCompare=rdFMCS.BondCompare.CompareOrder,
    )
    if not result.smartsString:
        return None, (), ()
    pattern = Chem.MolFromSmarts(result.smartsString)
    return pattern, a.GetSubstructMatch(pattern), b.GetSubstructMatch(pattern)


def matched_bonds(parent: Chem.Mol, pattern: Chem.Mol | None, match: tuple[int, ...]) -> list[int]:
    if pattern is None or not match:
        return []
    found = []
    for bond in pattern.GetBonds():
        mapped = parent.GetBondBetweenAtoms(match[bond.GetBeginAtomIdx()], match[bond.GetEndAtomIdx()])
        found.append(mapped.GetIdx())
    return found


def atom_pair_similarity(smiles_a: str, smiles_b: str) -> float:
    generator = rdFingerprintGenerator.GetAtomPairGenerator(includeChirality=True)
    fa = generator.GetSparseCountFingerprint(mol(smiles_a))
    fb = generator.GetSparseCountFingerprint(mol(smiles_b))
    return float(DataStructs.TanimotoSimilarity(fa, fb))


def morgan_similarity(smiles_a: str, smiles_b: str) -> float:
    generator = rdFingerprintGenerator.GetMorganGenerator(radius=2, fpSize=2048, includeChirality=True)
    fa = generator.GetFingerprint(mol(smiles_a))
    fb = generator.GetFingerprint(mol(smiles_b))
    return round(float(DataStructs.TanimotoSimilarity(fa, fb)), 3)


def pair_data(a: dict, b: dict) -> dict:
    ma, mb = mol(a["r1"]), mol(b["r1"])
    pattern, match_a, match_b = mcs_matches(a["r1"], b["r1"])
    frag_common_a = matched_bonds(ma, pattern, match_a)
    frag_common_b = matched_bonds(mb, pattern, match_b)
    full_common_a = [a["r1Bonds"][i] for i in frag_common_a]
    full_common_b = [b["r1Bonds"][i] for i in frag_common_b]
    return {
        "sim": atom_pair_similarity(a["r1"], b["r1"]),
        "aCommon": full_common_a,
        "aUnique": [i for i in a["r1Bonds"] if i not in full_common_a],
        "bCommon": full_common_b,
        "bUnique": [i for i in b["r1Bonds"] if i not in full_common_b],
    }


def r3_pair_data(a: dict, b: dict) -> dict:
    if a["r3"] == "[H]" or b["r3"] == "[H]":
        same = a["r3"] == b["r3"]
        bonds_a = 0 if a["r3"] == "[H]" else mol(a["r3"]).GetNumBonds()
        bonds_b = 0 if b["r3"] == "[H]" else mol(b["r3"]).GetNumBonds()
        return {
            "sim": 1.0 if same else 0.0,
            "aCommon": [], "aUnique": [], "bCommon": [], "bUnique": [],
            "faCommon": [],
            "faUnique": list(range(bonds_a)),
            "fbCommon": [],
            "fbUnique": list(range(bonds_b)),
            "mcsAtoms": 1 if same else 0,
            "mcsBonds": 0,
        }
    ma, mb = mol(a["r3"]), mol(b["r3"])
    pattern, match_a, match_b = mcs_matches(a["r3"], b["r3"])
    common_a = matched_bonds(ma, pattern, match_a)
    common_b = matched_bonds(mb, pattern, match_b)
    return {
        "sim": atom_pair_similarity(a["r3"], b["r3"]),
        "aCommon": [], "aUnique": [], "bCommon": [], "bUnique": [],
        "faCommon": common_a,
        "faUnique": [i for i in range(ma.GetNumBonds()) if i not in common_a],
        "fbCommon": common_b,
        "fbUnique": [i for i in range(mb.GetNumBonds()) if i not in common_b],
        "mcsAtoms": pattern.GetNumAtoms() if pattern is not None else 0,
        "mcsBonds": pattern.GetNumBonds() if pattern is not None else 0,
    }


def build(source: Path, output: Path) -> None:
    html = source.read_text()
    match = re.search(r"const DATA=(\{.*?\});\nconst D=", html, re.S)
    if not match:
        raise RuntimeError("DATA block not found")
    data = json.loads(match.group(1))
    old_keys = [d["key"] for d in data["drugs"]]
    new_keys = [d["key"] for d in NEW_DRUGS]
    if any(k in old_keys for k in new_keys):
        raise RuntimeError("One or more new keys already exist")

    prepared = []
    for spec in NEW_DRUGS:
        drug = dict(spec)
        atoms, bonds = fragment_mapping(drug["smiles"], drug["r1"])
        drug["sims"] = {}
        drug["svg"] = svg64(drug["smiles"], full=True)
        drug["r1Atoms"] = atoms
        drug["r1Bonds"] = bonds
        drug["r3svg"] = svg64(drug["r3"], full=False)
        prepared.append(drug)

    all_drugs = data["drugs"] + prepared
    for drug in all_drugs:
        for new_drug in prepared:
            drug.setdefault("sims", {})[new_drug["key"]] = morgan_similarity(drug["r1"], new_drug["r1"])
    for new_drug in prepared:
        new_drug["sims"] = {drug["key"]: morgan_similarity(new_drug["r1"], drug["r1"]) for drug in all_drugs}

    for a in all_drugs:
        for b in all_drugs:
            if a["key"] in new_keys or b["key"] in new_keys:
                data["pairs"][f'{a["key"]}|{b["key"]}'] = pair_data(a, b)

    cephs = [d for d in all_drugs if d.get("r3")]
    for a in cephs:
        for b in cephs:
            if a["key"] in new_keys or b["key"] in new_keys:
                data["r3pairs"][f'{a["key"]}|{b["key"]}'] = r3_pair_data(a, b)

    data["drugs"] = all_drugs
    encoded = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    html = html[:match.start(1)] + encoded + html[match.end(1):]
    options = "".join(f'<option value="{d["key"]}">{d["name"]}</option>' for d in prepared)
    anchor = '<option value="aztreonam">アズトレオナム</option>'
    if html.count(anchor) != 2:
        raise RuntimeError("Expected two selector anchors")
    html = html.replace(anchor, anchor + options)
    output.write_text(html)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", default="index.html")
    parser.add_argument("--output", default="structure-four-cephalosporins-preview.html")
    args = parser.parse_args()
    build(Path(args.source), Path(args.output))


if __name__ == "__main__":
    main()
