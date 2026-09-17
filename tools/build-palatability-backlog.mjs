import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {loadApp} from '../pediatric-dose-audit/tests/load-app.mjs';

const repo=path.resolve(import.meta.dirname,'..');
const outputPath=path.join(repo,'pediatric-dose-audit','palatability-research-backlog-2026-09.json');
const app=loadApp();
const {document,window,context,DB}=app;
const master=window.PEDIATRIC_PALATABILITY_MASTER;
const formalMasterPath=path.join(repo,'pediatric-dose-audit','pediatric-master-2026-09.js');
const formalMasterSource=fs.readFileSync(formalMasterPath,'utf8');
const ingredientLiteral=formalMasterSource.match(/const INGREDIENT_BY_KEY=(\{[\s\S]*?\n  \});/);
if(!ingredientLiteral)throw new Error('INGREDIENT_BY_KEY not found in formal master');
const ingredientByKey=vm.runInNewContext(`(${ingredientLiteral[1]})`);
const drug=document.getElementById('drug');
const product=document.getElementById('product');

const externalPattern=/(坐剤|坐薬|テープ|吸入|点眼|点鼻|軟膏|クリーム|ローション|貼付)/;
const swallowedSolidPattern=/(^|[^用])錠|OD錠|カプセル|チュアブル/;
const preferredPattern=/(シロップ|ドライシロップ|DS|細粒|顆粒|散|エリキシル|内用剤|原末)/;
const normalize=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/[\s　・‐－ー()（）「」]/g,'');
const cleanIngredient=value=>String(value||'').replace(/水和物|塩酸塩|カリウム/g,'').replace(/\s+/g,'');
const sameIngredient=(a,b)=>cleanIngredient(a)===cleanIngredient(b);
const formulationKind=(label,unit)=>{
 const value=String(label||'');
 if(/シロップ|エリキシル/.test(value))return 'liquid';
 if(/ドライシロップ|DS/.test(value))return 'dry_syrup';
 if(/細粒/.test(value))return 'fine_granules';
 if(/顆粒/.test(value))return 'granules';
 if(/散|原末/.test(value))return 'powder';
 if(/内用剤|包/.test(value)||unit==='包')return 'packet';
 return 'other';
};
const formulationMatches=(selected,item)=>{
 const target=`${item.formulation} ${item.product}`;
 const m=selected.match(/(\d+(?:\.\d+)?)%/),n=target.match(/(\d+(?:\.\d+)?)%/);
 if(m&&n)return m[1]===n[1];
 return ['4mg','50mg','100mg','200mg','400mg'].some(value=>selected.includes(value)&&target.includes(value));
};

function setSelect(select,value){
 for(const option of select.options){
  if(String(option.value)===String(value))option.setAttribute('selected','');
  else option.removeAttribute('selected');
 }
}

function selectDrug(key){
 setSelect(drug,key);
 vm.runInContext('loadDrug(true)',context);
 app.flushTimers();
}

function selectProduct(key){
 setSelect(product,key);
 product.dispatchEvent(new window.Event('change',{bubbles:true}));
 vm.runInContext('render()',context);
 app.flushTimers();
}

const candidates=[];
const visibleOptions=[...drug.options].map(option=>({key:option.value,name:option.textContent.trim()}));
for(const option of visibleOptions){
 selectDrug(option.key);
 const d=DB[option.key];
 if(!d)continue;
 const products=Object.entries(d.products||{}).filter(([,item])=>!item._familyExclude);
 for(const [productKey,item] of products){
  const formulation=item._familyLabel||item.label||'';
  if(externalPattern.test(formulation)||swallowedSolidPattern.test(formulation)||!preferredPattern.test(formulation))continue;
  selectProduct(productKey);
  const candidateText=normalize(`${option.name} ${formulation} ${item.label||''}`);
  const exactProductItems=master.products.filter(entry=>candidateText.includes(normalize(entry.product)));
  const ingredient=ingredientByKey[option.key]||exactProductItems[0]?.ingredient||null;
  const evidenceItems=ingredient?master.products.filter(entry=>sameIngredient(entry.ingredient,ingredient)):[];
  const matched=evidenceItems.filter(entry=>formulationMatches(formulation,entry)).length;
  const foodChips=evidenceItems.reduce((sum,entry)=>sum+(entry.foods?.length||0),0);
  const status=exactProductItems.length&&!ingredientByKey[option.key]?'ui_mapping_gap':!evidenceItems.length?'research_needed':matched?'formulation_match_available':'ingredient_only';
  candidates.push({
   id:`${option.key}:${productKey}`,
   drugKey:option.key,
   drugName:option.name,
   formulationKey:productKey,
   formulation,
   rawFormulation:item.label||formulation,
   unit:item.unit||null,
   strengthPerUnit:Number.isFinite(Number(item.mgPerUnit))?Number(item.mgPerUnit):null,
   dedupeIdentity:item._dedupeIdentity||null,
   status,
   ingredient,
   evidenceProductsShown:evidenceItems.length,
   selectedFormulationMatches:matched,
   foodDrinkEntriesShown:foodChips,
   sourceHint:item._sourceUrl||d.sourceUrl||null,
   priority:status==='research_needed'&&/(シロップ|エリキシル)/.test(formulation)?1:status==='research_needed'?2:status==='ingredient_only'?3:4
  });
 }
}

const duplicateGroups=new Map();
for(const item of candidates){
 const signature=item.dedupeIdentity||`${cleanIngredient(item.ingredient)||normalize(item.drugName)}|${formulationKind(item.formulation,item.unit)}|${item.strengthPerUnit}|${item.unit}`;
 if(!duplicateGroups.has(signature))duplicateGroups.set(signature,[]);
 duplicateGroups.get(signature).push(item.id);
}
for(const item of candidates){
 const signature=item.dedupeIdentity||`${cleanIngredient(item.ingredient)||normalize(item.drugName)}|${formulationKind(item.formulation,item.unit)}|${item.strengthPerUnit}|${item.unit}`;
 const group=duplicateGroups.get(signature);
 item.duplicateGroup=group.length>1?group:null;
}

candidates.sort((a,b)=>a.priority-b.priority||a.drugName.localeCompare(b.drugName,'ja')||a.formulation.localeCompare(b.formulation,'ja'));
const counts=Object.fromEntries(['research_needed','ingredient_only','formulation_match_available','ui_mapping_gap'].map(status=>[status,candidates.filter(item=>item.status===status).length]));
const firstBatchIds=[
 'ceti:ds125','mont:gran4','lora:ds1','epi:ds1','fexo:ds5',
 'meq:zeslanGran','meq:nipolazinGran','meq:form03','oxa:ds2','oxa:syr02',
 'pemi:ds05','tran:ds5','aud_cefrox:g','gaba:syr5','clem:syr001',
 'clem:form02','aud_k2:mL','dime:syr025','dime:ds25','imgF17:s',
 'tulooral:ds01','theo:theodurSyr','theo:ds20','dexa:elix001','aud_depakeneS:mL',
 'hydroxyz:syr005','aud_ataraxPow:form03','pyr:ds10','mela:gran02','meto:syr01'
].filter(id=>candidates.some(item=>item.id===id&&item.status==='research_needed'));
const backlog={
 schemaVersion:1,
 generatedDate:'2026-09-16',
 purpose:'小児監査ツールの味・飲みやすさ情報を、製品・メーカー・規格単位で監査するための未調査台帳',
 policies:{
  productSpecific:'別製品・別メーカーの味や食品相性を流用しない',
  evidence:'メーカー資料・PMDA・インタビューフォーム等の一次資料を優先する',
  noInference:'添加剤名だけから味・香りを推定しない',
  foodDrink:'食品・飲料の○△×は当該製品資料に直接記載がある場合だけ登録する',
  excluded:'外用・吸入・坐剤と、通常そのまま嚥下する錠剤・カプセルはこの味調査台帳から除外する'
 },
 metrics:{
  visibleDrugGroups:visibleOptions.length,
  currentPalatabilityProducts:master.products.length,
  candidateFormulations:candidates.length,
  ...counts,
  duplicateCandidateRows:candidates.filter(item=>item.duplicateGroup).length
 },
 nextBatch:firstBatchIds,
 candidates
};
fs.writeFileSync(outputPath,`${JSON.stringify(backlog,null,2)}\n`);
console.log(`Wrote ${candidates.length} candidates to ${path.relative(repo,outputPath)}`);
console.log(JSON.stringify(backlog.metrics,null,2));
