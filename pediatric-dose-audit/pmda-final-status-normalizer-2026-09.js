// Follow-up corrections: product search identity and PMDA dose reconciliation, 2026-09-09.
(function(){
 if(typeof DB==="undefined")return;
 const tagProduct=(drugKey,productKey,values)=>{const p=DB[drugKey]?.products?.[productKey];if(p)Object.assign(p,values);};
 const salbutamolIndications={general:{
   label:"気管支喘息・気管支炎等の気管支攣縮",
   lo:(w,a)=>a<5?0.3*w:NaN,hi:(w,a)=>a<5?0.3*w:NaN,freq:[3],
   desc:"乳幼児：ベネトリンシロップ0.04%を0.75mL/kg/day（サルブタモール0.3mg/kg/day）として分3。標準1日量は1歳未満3～6mL、1～3歳未満6～9mL、3～5歳未満9～15mL。"
 }};
 ["salbu","salb","imgF13"].forEach(k=>{
   if(!DB[k])return;
   DB[k].products={syr004:{label:"ベネトリンシロップ0.04%",unit:"mL",mgPerUnit:0.4,defaultAmount:7.5,defaultAmountByWeight:w=>0.75*w}};
   DB[k].indications=salbutamolIndications;DB[k].adult=null;
   DB[k].source="PMDA ベネトリンシロップ0.04%電子添文（2025年8月改訂）";
   DB[k].sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2254001Q1073_1?user=1";
   DB[k].auditNote="1mL中サルブタモール0.4mg。乳幼児0.75mL/kg/day（0.3mg/kg/day）・分3と年齢別標準1日量を突合。";
   DB[k]._familyDisplayName="ベネトリン（サルブタモール）";
 });
 const clavBandAmount=w=>{
   if(!Number.isFinite(w)||w<6||w>=40)return NaN;
   if(w<11)return 1.01;if(w<17)return 2.02;if(w<24)return 3.03;
   if(w<31)return 4.04;if(w<37)return 5.05;return 6.06;
 };
 if(DB.clav){
   const strength=(600+42.9)/1.01;
   DB.clav.products={ds:{label:"クラバモックス小児用配合ドライシロップ（分包製剤）",unit:"g",mgPerUnit:strength,defaultAmount:2.02,defaultAmountByWeight:clavBandAmount}};
   DB.clav.indications={general:{label:"承認感染症（分包製剤・体重換算表）",lo:w=>clavBandAmount(w)*strength,hi:w=>clavBandAmount(w)*strength,freq:[2],desc:"通常はAMPC/CVA合計96.4mg/kg/day（AMPC 90＋CVA 6.4mg/kg/day）を12時間ごと・分2・食直前。分包製剤の目安1日量：6～10kg 1.01g、11～16kg 2.02g、17～23kg 3.03g、24～30kg 4.04g、31～36kg 5.05g、37～39kg 6.06g。"}};
   DB.clav.source="PMDA クラバモックス小児用配合ドライシロップ電子添文（2024年10月改訂）";
   DB.clav.sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139100R1036_1?user=1";
   DB.clav.warning="分包製剤はPMDA体重換算表で判定。6kg未満・40kg以上は表の範囲外。12時間ごと・分2・食直前。";
   DB.clav.weightEvidence={text:"PMDA分包製剤表：6～10kg 1.01g、11～16kg 2.02g、17～23kg 3.03g、24～30kg 4.04g、31～36kg 5.05g、37～39kg 6.06g／day。",url:DB.clav.sourceUrl,label:"PMDA電子添文"};
 }
 if(typeof setDefaultAmount==="function")setDefaultAmount=function(p){
   const mode=$("amountMode")?.value||"product",byWeight=typeof p.defaultAmountByWeight==="function"?p.defaultAmountByWeight(+$("wt").value):NaN,defaultAmount=Number.isFinite(byWeight)?byWeight:p.defaultAmount;
   $("amountInput").value=mode==="mg"?Number((defaultAmount*p.mgPerUnit*doseScale()).toFixed(3)):defaultAmount;syncAmountValue();
 };
 if(DB.imgF19)DB.imgF19.searchExcluded=true;
 ["cephalex","cefalex"].forEach(k=>{if(DB[k]?.products)Object.values(DB[k].products).forEach(p=>p._familyExclude=true);});
 if(DB.cephalex)DB.cephalex._familyDisplayName="ケフレックス（セファレキシン）";
 [
   ["aud_cephalex100","g","ケフレックス（セファレキシン）","シロップ用細粒100","keflex-100"],
   ["aud_cephalex200","g","ケフレックス（セファレキシン）","シロップ用細粒200","keflex-200"],
   ["larixin10","g","ラリキシン（セファレキシン）","ドライシロップ小児用10%","larixin-10"],
   ["larixin20","g","ラリキシン（セファレキシン）","ドライシロップ小児用20%","larixin-20"],
   ["aud_lkeflex","g","L-ケフレックス（セファレキシン）","小児用顆粒（1包1g）","l-keflex"]
 ].forEach(([k,p,name,label,identity])=>{
   if(!DB[k])return;DB[k]._familyDisplayName=name;
   DB[k].searchAliases=[...new Set([...(DB[k].searchAliases||[]),"セファレキシン","ケフレックス"] )];
   tagProduct(k,p,{_familyLabel:label,_dedupeIdentity:identity});
 });
 if(DB.cefteram&&DB.aud_tomiron20)DB.aud_tomiron20.indications=DB.cefteram.indications;
 ["cefteram","aud_tomiron20"].forEach(k=>{
   if(!DB[k])return;DB[k]._familyDisplayName="トミロン（セフテラム）";
   DB[k].searchAliases=[...new Set([...(DB[k].searchAliases||[]),"トミロン","セフテラム","セフテラム ピボキシル"] )];
   Object.values(DB[k].products||{}).forEach(p=>Object.assign(p,{_familyLabel:"細粒小児用20%",_dedupeIdentity:"tomiron-20"}));
 });
})();

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
 const displayNames={cam:"クラリス（クラリスロマイシン）",carbo:"ムコダイン（カルボシステイン）",proc:"メプチン（プロカテロール）",pred:"プレドニゾロン"};
 const unitKey=u=>String(u||"").normalize("NFKC").toLowerCase()==="ml"?"mL":String(u||"").normalize("NFKC");
 function formulationKind(label,unit){
   const s=String(label||"").normalize("NFKC");
   if(/(?:ドライシロップ|\bDS\b|DS(?=\d)|シロップ用細粒)/i.test(s))return "dry-syrup";
   if(/シロップ|エリキシル/i.test(s))return "syrup";
   if(/OD錠/i.test(s))return "od-tablet";if(/チュアブル|レディタブ/i.test(s))return "chewable";if(/ミニ錠/i.test(s))return "mini-tablet";
   if(/錠/.test(s))return "tablet";if(/カプセル/.test(s))return "capsule";if(/細粒/.test(s))return "fine-granules";if(/顆粒/.test(s))return "granules";if(/散/.test(s))return "powder";
   if(/坐剤|坐薬|サポ/.test(s))return "suppository";if(/テープ|貼付/.test(s))return "tape";if(/吸入|ネブライザ|噴霧/.test(s))return "inhalation";if(/点眼/.test(s))return "eye-drops";if(/点鼻|点耳|パウダースプレー/.test(s))return "nasal";if(/外用|軟膏|クリーム|ゲル|ローション|塗布/.test(s))return "topical";
   return "unit-"+unitKey(unit);
 }
 const externalKinds=new Set(["suppository","tape","inhalation","eye-drops","nasal","topical"]);
 const isSearchableProduct=p=>!externalKinds.has(formulationKind(p.label,p.unit));
 const externalSearchWords=["外用","軟膏","クリーム","ゲル","ローション","塗布","点眼","点鼻","点耳","吸入","ネブライザ","噴霧","テープ","貼付","坐剤","坐薬","サポ"].map(norm);
 function formulationSignature(p){return [formulationKind(p.label,p.unit),unitKey(p.unit),Number(p.mgPerUnit).toPrecision(12),p._dedupeIdentity||""].join("|");}
 function formulationLabel(p){
   let s=String(p.label||"").normalize("NFKC").replace(/「[^」]+」/g,"").replace(/【[^】]+】/g,"").replace(/相当製剤/g,"").replace(/（1包[^)]*）/g,"").trim();
   const patterns=[/ドライシロップ/i,/DS(?=\d|\s|$)/i,/シロップ用細粒/i,/小児用細粒/i,/細粒/i,/顆粒/i,/散/i,/OD錠/i,/チュアブル錠/i,/レディタブ錠/i,/ミニ錠/i,/錠/i,/カプセル/i,/シロップ/i,/エリキシル/i,/坐剤/i,/坐薬/i,/テープ/i,/吸入/i,/点眼/i,/点鼻/i,/軟膏/i,/クリーム/i];
   let at=-1;patterns.forEach(re=>{const m=s.search(re);if(m>=0&&(at<0||m<at))at=m;});if(at>0)s=s.slice(at);
   return s.replace(/^DS/i,"ドライシロップ").replace(/シロップ用細粒/i,"ドライシロップ").replace(/小児用/g,"").replace(/\s+/g," ").trim()||String(p.label||"");
 }

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
     const d=DB[k];if(!d?.products)return;
     Object.entries(d.products).forEach(([pk,p])=>{
       if(pk.startsWith("__grp__")||!p?.label||p._familyExclude)return;
       const signature=formulationSignature(p);if(seen.has(signature))return;seen.add(signature);
       let label=p._familyLabel||formulationLabel(p);
       if(g.canonical==="pred"){if(formulationKind(p.label,p.unit)==="powder")label="散「タケダ」1%";if(formulationKind(p.label,p.unit)==="tablet")label="錠5mg";}
       rows.push({drug:g.canonical,sourceDrug:k,sourceProduct:pk,signature,label,rawLabel:p.label,productData:Object.assign({},p)});
     });
   });
   return rows;
 }
 function genericLabel(g){
   if(DB[g.canonical]?._familyDisplayName)return DB[g.canonical]._familyDisplayName;
   if(displayNames[g.canonical])return displayNames[g.canonical];
   const c=optLabel(g.canonical);
   return dosageWord.test(c)?(DB[g.canonical]?.searchAliases?.find(x=>!dosageWord.test(x))||c):c;
 }

 // Merge equivalent records into one stable drug record. Form changes now update synchronously;
 // no hidden switch to a sibling drug record remains to leave the previous unit behind.
 groups.forEach(g=>{
   const d=DB[g.canonical];if(!d)return;
   const rows=formulations(g),merged={};
   rows.forEach((r,i)=>{let key=r.sourceDrug===g.canonical&&!merged[r.sourceProduct]?r.sourceProduct:"form"+String(i+1).padStart(2,"0");while(merged[key])key+="x";merged[key]=Object.assign({},r.productData,{label:r.label,_searchLabel:r.rawLabel,_signature:r.signature});r.product=key;});
   if(rows.length){d.products=merged;d._familyFormulations=rows;d.preferredProductKey=rows[0].product;}
   d.familyBase=g.canonical;d.displayName=genericLabel(g);
   d.searchAliases=[...new Set(g.members.flatMap(k=>[optLabel(k),...(DB[k]?.searchAliases||[]),...Object.values(DB[k]?.products||{}).flatMap(p=>[p.label,p._searchLabel].filter(Boolean))]))];
   const option=sel.querySelector('option[value="'+CSS.escape(g.canonical)+'"]');if(option)option.textContent=d.displayName;
   g.members.forEach(k=>{if(k!==g.canonical)sel.querySelector('option[value="'+CSS.escape(k)+'"]')?.remove();});
 });

 // Search is formulation-specific, but the selected drug field shows only the canonical drug name.
 function installSearch(){
   const oldInp=document.getElementById("drugSearch"),oldBox=document.getElementById("drugSuggest");
   if(!oldInp||!oldBox||oldInp.dataset.globalGroups==="1")return;
   const inp=oldInp.cloneNode(true),box=oldBox.cloneNode(false);oldInp.replaceWith(inp);oldBox.replaceWith(box);inp.dataset.globalGroups="1";
   const render=()=>{
     const q=norm(inp.value);if(q.length<2){box.style.display="none";return;}
     if(externalSearchWords.some(word=>q.includes(word))){box.innerHTML='<div style="padding:9px;font-size:10px;color:#667085">候補なし</div>';box.style.display="block";box._globalRows=[];return;}
     const hits=[];
     groups.forEach(g=>{
       const d=DB[g.canonical],forms=d?._familyFormulations||[];
       if(g.members.every(k=>DB[k]?.searchExcluded))return;
       const labels=[genericLabel(g),...g.members.map(optLabel),...(d?.searchAliases||[]),...forms.flatMap(x=>[x.label,x.rawLabel])];
       if(!labels.some(x=>norm(x).includes(q)))return;
       forms.filter(x=>isSearchableProduct(x.productData)).forEach(x=>hits.push({label:genericLabel(g)+" "+x.label,drug:g.canonical,product:x.product}));
     });
     const seen=new Set();box._globalRows=hits.filter(r=>{const k=r.drug+"|"+r.product;if(seen.has(k))return false;seen.add(k);return true;}).slice(0,20);
     if(!box._globalRows.length){box.innerHTML='<div style="padding:9px;font-size:10px;color:#667085">候補なし</div>';box.style.display="block";return;}
     box.innerHTML=box._globalRows.map((r,i)=>'<button type="button" data-global-row="'+i+'" style="display:block;width:100%;border:0;border-bottom:1px solid #eef1f4;background:#fff;padding:9px;text-align:left;font-size:11px;cursor:pointer">'+r.label+'</button>').join("");
     box.style.display="block";
   };
   inp.addEventListener("input",render);
   box.addEventListener("click",e=>{
     const b=e.target.closest("[data-global-row]");if(!b)return;
     e.preventDefault();
     const r=(box._globalRows||[])[+b.dataset.globalRow];if(!r)return;
     sel.value=r.drug;if(typeof loadDrug==="function")loadDrug(true);else sel.dispatchEvent(new Event("change",{bubbles:true}));
     if(r.product&&product.querySelector('option[value="'+CSS.escape(r.product)+'"]')){product.value=r.product;product.dispatchEvent(new Event("change",{bubbles:true}));}
     inp.value=DB[r.drug]?.displayName||genericLabel(groupByKey[r.drug]);box.style.display="none";
   });
   sel.addEventListener("change",()=>{inp.value=DB[sel.value]?.displayName||optLabel(sel.value);box.style.display="none";});
   document.addEventListener("click",e=>{if(e.target!==inp&&!box.contains(e.target))box.style.display="none";});
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
