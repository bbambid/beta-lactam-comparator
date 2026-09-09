// Normalize visible audit statuses after documented PMDA final reconciliation completion.
(function(){
 if(typeof DB==="undefined")return;
 const p=window.PMDA_FINAL_PROGRESS;
 if(!p||p.done!==p.total||p.status!=="完了")return;
 Object.values(DB).forEach(d=>{
   d.auditStatus="PMDA最終突合済み";
   d.auditDate=p.date||"2026-09-07";
   d.pmdaAudit={status:"PMDA最終突合済み",checked:p.date||"2026-09-07",note:"PMDA最終突合 139/139監査単位完了時点の現行DB。製剤・商品名別レコードは対応する監査済み用量ロジックと製剤確認結果を継承。"};
 });
})();

// Global formulation grouping / search deduplication / category normalization, 2026-09-09.
// Source DB records are preserved. Records that share the same dosing logic object are treated
// as formulation siblings; switching a formulation switches back to that original audited record.
(function(){
 if(typeof DB==="undefined"||typeof $==="undefined")return;
 const sel=$("drug"),product=$("product"); if(!sel||!product)return;
 const norm=s=>String(s||"").normalize("NFKC").toLowerCase().replace(/[\s　・‐－ー%％()（）「」\[\]【】]/g,"");
 const dosageWord=/(シロップ|ドライシロップ|DS|細粒|顆粒|散|錠|カプセル|チュアブル|レディタブ|液|吸入|坐剤|テープ|クリーム|軟膏|小児用|mg|μg|%)/i;
 const optLabel=k=>sel.querySelector('option[value="'+CSS.escape(k)+'"]')?.textContent||k;

 // Preserve the explicitly requested canonical formulation sets.
 if(DB.cam){DB.cam.products=Object.assign({},DB.cam.products||{}, {
   ds10:{label:"クラリスドライシロップ10%小児用",unit:"g",mgPerUnit:100,defaultAmount:2.7},
   tab50:{label:"クラリス錠50mg小児用",unit:"錠",mgPerUnit:50,defaultAmount:5}
 });}
 if(DB.proc){DB.proc.products=Object.assign({},DB.proc.products||{}, {
   ds005:{label:"メプチンドライシロップ0.005%",unit:"g",mgPerUnit:0.05,defaultAmount:0.5},
   syrup5:{label:"メプチンシロップ5μg/mL",unit:"mL",mgPerUnit:0.005,defaultAmount:5},
   mini25:{label:"メプチンミニ錠25μg",unit:"錠",mgPerUnit:0.025,defaultAmount:1},
   tab50:{label:"メプチン錠50μg",unit:"錠",mgPerUnit:0.05,defaultAmount:1}
 });}

 const knownCategory={
  cam:"抗菌薬",amox:"抗菌薬",cfpn:"抗菌薬",cdtr:"抗菌薬",cpdx:"抗菌薬",cfdn:"抗菌薬",ccr:"抗菌薬",sult:"抗菌薬",cephalex:"抗菌薬",ery:"抗菌薬",azi:"抗菌薬",faro:"抗菌薬",tebi:"抗菌薬",fos:"抗菌薬",tosu:"抗菌薬",cfix:"抗菌薬",clav:"抗菌薬",
  ceti:"抗アレルギー薬",mont:"抗アレルギー薬",desl:"抗アレルギー薬",olop:"抗アレルギー薬",pran:"抗アレルギー薬",lora:"抗アレルギー薬",epi:"抗アレルギー薬",fexo:"抗アレルギー薬",meq:"抗アレルギー薬",keto:"抗アレルギー薬",oxa:"抗アレルギー薬",pemi:"抗アレルギー薬",tran:"抗アレルギー薬",clem:"抗アレルギー薬",rupa:"抗アレルギー薬",cypro:"抗アレルギー薬",
  carbo:"呼吸器・鎮咳去痰",ambro:"呼吸器・鎮咳去痰",tipe:"呼吸器・鎮咳去痰",tulo:"呼吸器・鎮咳去痰",theo:"呼吸器・鎮咳去痰",theoS:"呼吸器・鎮咳去痰",proc:"呼吸器・鎮咳去痰",tulooral:"呼吸器・鎮咳去痰",dime:"呼吸器・鎮咳去痰",salb:"呼吸器・鎮咳去痰",fusk:"呼吸器・鎮咳去痰",dextMix:"呼吸器・鎮咳去痰",
  apap:"解熱鎮痛・抗炎症",txa:"解熱鎮痛・抗炎症",
  domp:"消化器",meto:"消化器",movLD:"消化器",movHD:"消化器",lactoR:"消化器",
  acy:"抗ウイルス薬",osel:"抗ウイルス薬",lani:"抗ウイルス薬",zana:"抗ウイルス薬",balo:"抗ウイルス薬",vala:"抗ウイルス薬",
  levet:"神経",mela:"神経",lacos:"神経",gaba:"神経",valpro:"神経",
  kampo75:"漢方",kampo90:"漢方",kampo180:"漢方",
  pred:"ステロイド",beta:"ステロイド",dexa:"ステロイド"
 };
 const categoryOrder=["すべて","抗菌薬","抗アレルギー薬","呼吸器・鎮咳去痰","解熱鎮痛・抗炎症","消化器","抗ウイルス薬","漢方","ステロイド","神経","その他"];
 function keywordCategory(text){
   const s=String(text||"");
   if(/プレドニ|リンデロン|デキサメタ|ベタメタ|ステロイド/.test(s))return "ステロイド";
   if(/葛根湯|麻黄湯|小青竜湯|漢方/.test(s))return "漢方";
   if(/アシクロ|バラシクロ|タミフル|オセルタ|ラニナ|ザナミ|バロキサ|抗ウイルス/.test(s))return "抗ウイルス薬";
   if(/セフ|シリン|マイシン|ペネム|ホスホマイ|トスフロ|オゼックス|抗菌/.test(s))return "抗菌薬";
   if(/アレル|ヒスタミン|ザイザル|ジルテック|アレグラ|アレロック|アレジオン|クラリチン|デザレックス|ルパフィン|ザジテン|オノン|キプレス|シングレア/.test(s))return "抗アレルギー薬";
   if(/ムコダイン|カルボシステイン|ムコソルバン|アンブロキソール|アスベリン|アストミン|メプチン|プロカテロール|テオドール|テオフィリン|ホクナリン|ツロブテロール|ベネトリン|吸入|鎮咳|去痰/.test(s))return "呼吸器・鎮咳去痰";
   if(/カロナール|アセトアミノフェン|トランサミン|トラネキサム|解熱|鎮痛|抗炎症/.test(s))return "解熱鎮痛・抗炎症";
   if(/ナウゼリン|ドンペリドン|プリンペラン|メトクロプラミド|モビコール|マクロゴール|整腸|乳酸菌|消化器/.test(s))return "消化器";
   if(/イーケプラ|レベチラ|ビムパット|ラコサミド|ガバペン|バルプロ|デパケン|メラトニン|神経/.test(s))return "神経";
   return "その他";
 }

 // Group records by shared indication object reference. All clone helpers in this app copy that
 // reference, so this identifies same-ingredient/product variants without merging unrelated drugs.
 const byLogic=new Map();
 Object.entries(DB).forEach(([k,d])=>{
   if(!d||!d.indications)return;
   const ref=d.indications;
   if(!byLogic.has(ref))byLogic.set(ref,[]);
   byLogic.get(ref).push(k);
 });
 const groups=[]; const groupByKey={};
 function canonicalScore(k){
   const label=optLabel(k),d=DB[k]||{};
   let score=0;
   if(knownCategory[k])score-=50;
   if(d.category)score-=20;
   if(dosageWord.test(label))score+=20;
   if(/^(img|ob|aud|nk)/i.test(k))score+=15;
   score+=label.length/100;
   return score;
 }
 byLogic.forEach(keys=>{
   const visible=keys.filter(k=>sel.querySelector('option[value="'+CSS.escape(k)+'"]'));
   if(!visible.length)return;
   visible.sort((a,b)=>canonicalScore(a)-canonicalScore(b));
   const canonical=visible[0];
   const g={canonical,members:visible};groups.push(g);visible.forEach(k=>groupByKey[k]=g);
 });
 // Single records not captured above still get their own group.
 [...sel.options].forEach(o=>{if(!groupByKey[o.value]){const g={canonical:o.value,members:[o.value]};groups.push(g);groupByKey[o.value]=g;}});

 function groupCategory(g){
   for(const k of g.members){if(knownCategory[k])return knownCategory[k];}
   for(const k of g.members){if(DB[k]?.category)return DB[k].category;}
   const txt=g.members.map(k=>optLabel(k)+" "+(DB[k]?.source||"")+" "+(DB[k]?.searchAliases||[]).join(" ")).join(" ");
   return keywordCategory(txt);
 }
 groups.forEach(g=>g.category=groupCategory(g));

 function formulations(g){
   const rows=[],seen=new Set();
   g.members.forEach(k=>{
     const d=DB[k]; if(!d?.products)return;
     Object.entries(d.products).forEach(([pk,p])=>{
       if(pk.startsWith("__grp__")||!p?.label)return;
       const nk=norm(p.label); if(seen.has(nk))return; seen.add(nk);
       rows.push({drug:k,product:pk,label:p.label});
     });
   });
   return rows;
 }
 function genericLabel(g){
   const c=optLabel(g.canonical);
   return dosageWord.test(c)?(DB[g.canonical]?.searchAliases?.find(x=>!dosageWord.test(x))||c):c;
 }

 // Remove duplicate sibling options from the base selector/list; formulations remain reachable via product selector/search.
 groups.forEach(g=>g.members.forEach(k=>{if(k!==g.canonical)sel.querySelector('option[value="'+CSS.escape(k)+'"]')?.remove();}));

 function decorateProducts(){
   const key=sel.value,g=groupByKey[key]; if(!g)return;
   const d=DB[key]; if(!d?.products)return;
   const current=product.value;
   const seen=new Set([...product.options].map(o=>norm(o.textContent)));
   formulations(g).forEach(r=>{
     if(r.drug===key&&r.product===current)return;
     const nl=norm(r.label); if(seen.has(nl))return; seen.add(nl);
     const sk="__grp__"+r.drug+"__"+r.product;
     d.products[sk]=Object.assign({},DB[r.drug].products[r.product],{_groupTarget:{drug:r.drug,product:r.product}});
     const o=document.createElement("option");o.value=sk;o.textContent=r.label;product.appendChild(o);
   });
 }
 document.addEventListener("change",e=>{
   if(e.target!==product)return;
   const d=DB[sel.value],p=d?.products?.[product.value],t=p?._groupTarget;
   if(!t)return;
   e.stopImmediatePropagation();
   sel.value=t.drug;
   if(typeof loadDrug==="function")loadDrug(false);else sel.dispatchEvent(new Event("change",{bubbles:true}));
   setTimeout(()=>{product.value=t.product;product.dispatchEvent(new Event("change",{bubbles:true}));decorateProducts();},0);
 },true);
 document.addEventListener("change",e=>{if(e.target===sel)setTimeout(decorateProducts,0);},true);
 document.addEventListener("DOMContentLoaded",()=>setTimeout(decorateProducts,0));
 setTimeout(decorateProducts,0);

 // Replace search results with one generic row + one row per unique formulation for every group.
 function installSearch(){
   const inp=document.getElementById("drugSearch"),box=document.getElementById("drugSuggest");
   if(!inp||!box||inp.dataset.globalGroups==="1")return;
   inp.dataset.globalGroups="1";
   const render=()=>{
     const q=norm(inp.value);if(q.length<2)return;
     const hits=[];
     groups.forEach(g=>{
       const labels=[genericLabel(g),...g.members.map(optLabel),...g.members.flatMap(k=>DB[k]?.searchAliases||[]),...formulations(g).map(x=>x.label)];
       if(!labels.some(x=>norm(x).includes(q)))return;
       hits.push({label:genericLabel(g),drug:g.canonical,product:null});
       formulations(g).forEach(x=>hits.push(x));
     });
     const seen=new Set();box._globalRows=hits.filter(r=>{const k=norm(r.label);if(seen.has(k))return false;seen.add(k);return true;}).slice(0,20);
     if(!box._globalRows.length)return;
     box.innerHTML=box._globalRows.map((r,i)=>'<button type="button" data-global-row="'+i+'" style="display:block;width:100%;border:0;border-bottom:1px solid #eef1f4;background:#fff;padding:9px;text-align:left;font-size:11px;cursor:pointer">'+r.label+'</button>').join("");
     box.style.display="block";
   };
   inp.addEventListener("input",()=>setTimeout(render,0));
   box.addEventListener("click",e=>{
     const b=e.target.closest("[data-global-row]");if(!b)return;
     e.preventDefault();e.stopImmediatePropagation();
     const r=(box._globalRows||[])[+b.dataset.globalRow];if(!r)return;
     sel.value=r.drug;if(typeof loadDrug==="function")loadDrug(false);else sel.dispatchEvent(new Event("change",{bubbles:true}));
     setTimeout(()=>{if(r.product)product.value=r.product;product.dispatchEvent(new Event("change",{bubbles:true}));decorateProducts();inp.value=r.label;box.style.display="none";},0);
   },true);
 }
 document.addEventListener("DOMContentLoaded",()=>setTimeout(installSearch,0));setTimeout(installSearch,0);

 // Re-render the mobile "一覧から選択" sheet with inherited/dynamic categories so clone keys do not fall into "その他".
 function installCategorySheet(){
   const sheet=document.getElementById("drugListSheet"),btn=document.getElementById("drugListBtn");if(!sheet||!btn||sheet.dataset.globalCategories==="1")return;
   sheet.dataset.globalCategories="1";let active="すべて";const collator=new Intl.Collator("ja",{usage:"sort",sensitivity:"base"});
   const visibleGroups=()=>groups.filter(g=>sel.querySelector('option[value="'+CSS.escape(g.canonical)+'"]'));
   function draw(){
     const gs=visibleGroups().map(g=>({g,label:genericLabel(g),cat:g.category||"その他"})).sort((a,b)=>collator.compare(a.label,b.label));
     const shown=active==="すべて"?gs:gs.filter(x=>x.cat===active);
     const cats=categoryOrder.filter(c=>c==="すべて"||gs.some(x=>x.cat===c));
     document.getElementById("drugCategoryTabs").innerHTML=cats.map(c=>'<button type="button" class="drugCatTab'+(c===active?' active':'')+'" data-global-cat="'+c+'">'+c+'</button>').join("");
     const groupCats=active==="すべて"?categoryOrder.slice(1).filter(c=>shown.some(x=>x.cat===c)):[active];
     document.getElementById("drugListItems").innerHTML=groupCats.map(c=>'<div class="drugCatGroup"><div class="drugCatHead">'+c+'</div>'+shown.filter(x=>x.cat===c).map(x=>'<button type="button" data-v="'+x.g.canonical+'">'+x.label+'</button>').join("")+'</div>').join("");
   }
   btn.addEventListener("click",()=>{active="すべて";setTimeout(draw,0)});
   sheet.addEventListener("click",e=>{const c=e.target.closest("[data-global-cat]");if(!c)return;e.preventDefault();e.stopImmediatePropagation();active=c.dataset.globalCat;draw();},true);
 }
 document.addEventListener("DOMContentLoaded",()=>setTimeout(installCategorySheet,20));setTimeout(()=>installCategorySheet(),20);
})();
