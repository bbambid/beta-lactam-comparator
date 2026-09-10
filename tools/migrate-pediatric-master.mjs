import fs from 'node:fs';
import path from 'node:path';

const repo=path.resolve(import.meta.dirname,'..');
const app=path.join(repo,'pediatric-dose-audit');
const indexPath=path.join(app,'index.html');
const masterPath=path.join(app,'pediatric-master-2026-09.js');

// One-time migration manifest. This is intentionally explicit so the effective
// runtime order is reviewable. The old files remain as frozen rollback sources;
// production loads only the generated formal master after this migration.
const sources=[
 'image-batch-01.js','image-batch-02.js','nkdesk-batch-01.js','nkdesk-batch-02.js','nkdesk-final.js',
 'image-batch-02-50.js','image-final.js','coverage-audit-2026-09.js','coverage-audit-local-2026-09.js',
 'coverage-audit-final-fixes-2026-09.js','dose-audit-upgrades-2026-09.js','final-reconciliation-2026-09.js',
 'drug-search-2026-09.js','formula-help-2026-09.js','frequency-interpretation-2026-09.js',
 'oral-batch-01-2026-09.js','cephalexin-brands-2026-09.js','oral-batch-02-2026-09.js',
 'pediatric-ui-clarity-2026-09.js','audit-dashboard-2026-09.js','pmda-audit-progress-2026-09.js',
 'pmda-final-batch-01-2026-09.js','pmda-final-batch-02-2026-09.js',
 'pmda-final-batch-03-2026-09.js','pmda-final-batch-04-2026-09.js','pmda-final-batch-05-2026-09.js',
 'pmda-final-batch-06-2026-09.js','pmda-final-batch-07-2026-09.js','pmda-final-batch-08-2026-09.js',
 'pmda-final-batch-09-2026-09.js','steroid-master-2026-09.js','pmda-final-batch-10-2026-09.js',
 'pmda-final-batch-11-2026-09.js','pmda-final-batch-12-2026-09.js','pmda-final-batch-13-2026-09.js',
 'pmda-final-batch-14-2026-09.js','pmda-final-status-normalizer-2026-09.js'
];
const inlineIds=['doseUnitAndMagmittCurrentLabel','mobilePreviewEnhancer','approvedDoseCardEnhancer','mobileRxAndDrugPickerJS','steroidPracticeCards','formulaHelpSubstitution'];

let html=fs.readFileSync(indexPath,'utf8');
if(fs.existsSync(masterPath))throw new Error('Formal master already exists; this migration may run only once.');

const stripBatchLoader=code=>code
 .replace(/\n?\s*\/\/ Keep later reconciliation batches ordered[^\n]*\n/g,'\n')
 .replace(/\n?\s*if\(!document\.querySelector\('script\[src="pmda-final-batch-\d+-2026-09\.js"\]'\)\)\{[\s\S]*?document\.head\.appendChild\(s\);?\s*\}/g,'\n');

const sections=[];
for(const source of sources){
 let code=fs.readFileSync(path.join(app,source),'utf8');
 code=stripBatchLoader(code).trim();
 sections.push(`\n/* ===== Migrated source: ${source} ===== */\n${code}\n`);
}
for(const id of inlineIds){
 const match=html.match(new RegExp(`<script id="${id}">([\\s\\S]*?)<\\/script>`));
 if(!match)throw new Error(`Missing inline enhancement: ${id}`);
 sections.push(`\n/* ===== Migrated inline enhancement: ${id} ===== */\n${match[1].trim()}\n`);
}

for(const source of ['palatability-core-2026-09.js','kampo-formulation-normalizer-2026-09.js','category-picker-final-2026-09.js']){
 sections.push(`\n/* ===== Migrated source: ${source} ===== */\n${fs.readFileSync(path.join(app,source),'utf8').trim()}\n`);
}

const header=`/*
 * Pediatric Dose Audit formal runtime master
 * Version: 1.0.0
 * Application updated: 2026-09-11
 * PMDA data baseline: 2026-09-07 (individual records may state later audit dates)
 *
 * This file is the sole production JavaScript extension point after the core
 * bootstrap embedded in index.html. Legacy source files are retained only for
 * rollback/reference and must not be edited for new changes.
 */
window.PEDIATRIC_RELEASE=Object.freeze({version:'1.0.0',appUpdated:'2026-09-11',dataBaseline:'2026-09-07'});
(function(){
 if(document.querySelector('link[href="category-layout-fixes-2026-09.css"]'))return;
 const css=document.createElement('link');css.rel='stylesheet';css.href='category-layout-fixes-2026-09.css';document.head.appendChild(css);
})();
`;
fs.writeFileSync(masterPath,header+sections.join(''));

const staticTags=sources.filter(s=>!/^pmda-final-batch-0[3-9]-/.test(s)).map(s=>`<script src="${s}"></script>`).join('');
if(!html.includes(staticTags))throw new Error('Static production script chain did not match migration manifest.');
html=html.replace(staticTags,'<script src="pediatric-master-2026-09.js"></script>');
for(const id of inlineIds){
 html=html.replace(new RegExp(`\\n?<script id="${id}">[\\s\\S]*?<\\/script>`),'');
}
html=html.replace('<script src="palatability-preview-2026-09.js"></script>','');
fs.writeFileSync(indexPath,html);

console.log(`Created ${path.relative(repo,masterPath)} and rewired index.html.`);
