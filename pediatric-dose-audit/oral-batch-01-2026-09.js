// Pharmacy-focused oral batch 01. Adds practical oral formulations to existing audited ingredients.
// Approved dose logic is inherited only from an already-audited ingredient DB entry.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const S=$("drug");
 const addOpt=(k,n)=>{if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
 const clone=(k,n,b,products,note)=>{
  if(!DB[b])return;
  DB[k]=Object.assign({},DB[b],{products:products,auditStatus:"既存承認用量ロジック＋製剤追加監査",auditNote:note||"現行製剤を追加。用量判定は同一成分の監査済みロジックを継承。"});
  addOpt(k,n);
 };
 // 1-15 antimicrobial / antiviral formulations
 clone("ob01_camds","クラリスドライシロップ10%小児用","cam",{g:{label:"クラリスドライシロップ10%小児用",unit:"g",mgPerUnit:100,defaultAmount:2.7}},"PMDA 2026-03改訂確認");
 clone("ob01_camt50","クラリス錠50小児用","cam",{tab:{label:"クラリス錠50小児用",unit:"錠",mgPerUnit:50,defaultAmount:5}});
 clone("ob01_amox10","アモキシシリン細粒10%","amox",{g:{label:"アモキシシリン細粒10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}});
 clone("ob01_amox20","アモキシシリン細粒20%","amox",{g:{label:"アモキシシリン細粒20%",unit:"g",mgPerUnit:200,defaultAmount:1.8}});
 clone("ob01_cfpn","セフカペン ピボキシル小児用細粒10%","cfpn",{g:{label:"セフカペン ピボキシル小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"2026-06安全性改訂対象を確認");
 clone("ob01_cdtr","セフジトレン ピボキシル小児用細粒10%","cdtr",{g:{label:"セフジトレン ピボキシル小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"2026-06安全性改訂対象を確認");
 clone("ob01_cpdx","セフポドキシム プロキセチルDS5%","cpdx",{g:{label:"セフポドキシム プロキセチルDS5%",unit:"g",mgPerUnit:50,defaultAmount:1.8}});
 clone("ob01_cfdn","セフジニル細粒小児用10%","cfdn",{g:{label:"セフジニル細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}});
 clone("ob01_ccr","セファクロル細粒小児用10%","ccr",{g:{label:"セファクロル細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}});
 clone("ob01_sult","スルタミシリン細粒小児用10%","sult",{g:{label:"スルタミシリン細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:2.7}});
 clone("ob01_faro","ファロペネムDS小児用10%","faro",{g:{label:"ファロペネムDS小児用10%",unit:"g",mgPerUnit:100,defaultAmount:2.7}});
 clone("ob01_tebi","テビペネム ピボキシル細粒小児用10%","tebi",{g:{label:"テビペネム ピボキシル細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.44}},"2026-06安全性改訂対象を確認");
 clone("ob01_tosu","トスフロキサシン細粒小児用15%","tosu",{g:{label:"トスフロキサシン細粒小児用15%",unit:"g",mgPerUnit:150,defaultAmount:1.2}});
 clone("ob01_osel","オセルタミビルDS3%","osel",{g:{label:"オセルタミビルDS3%",unit:"g",mgPerUnit:30,defaultAmount:2.4}});
 clone("ob01_vala","バラシクロビル顆粒50%","vala",{g:{label:"バラシクロビル顆粒50%",unit:"g",mgPerUnit:500,defaultAmount:1.5}});
 // 16-30 respiratory/allergy
 clone("ob01_carboS","カルボシステインシロップ5%","carbo",{mL:{label:"カルボシステインシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10.8}});
 clone("ob01_carboDS","カルボシステインDS50%","carbo",{g:{label:"カルボシステインDS50%",unit:"g",mgPerUnit:500,defaultAmount:1.08}});
 clone("ob01_ambroDS","アンブロキソールDS1.5%","ambro",{g:{label:"アンブロキソールDS1.5%",unit:"g",mgPerUnit:15,defaultAmount:1.08}});
 clone("ob01_tipeDS","チペピジンDS2%","tipe",{g:{label:"チペピジンDS2%",unit:"g",mgPerUnit:20,defaultAmount:2.25}});
 clone("ob01_tipeS","アスベリンシロップ0.5%","tipe",{mL:{label:"アスベリンシロップ0.5%",unit:"mL",mgPerUnit:5,defaultAmount:9}});
 clone("ob01_dimePow","ジメモルファン散10%","dime",{g:{label:"ジメモルファン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.3}});
 clone("ob01_procDS","プロカテロールDS0.005%","proc",{g:{label:"プロカテロールDS0.005%",unit:"g",mgPerUnit:0.05,defaultAmount:0.5}});
 clone("ob01_procS","プロカテロールシロップ5μg/mL","proc",{mL:{label:"プロカテロールシロップ5μg/mL",unit:"mL",mgPerUnit:0.005,defaultAmount:5}});
 clone("ob01_theoDS","テオフィリン徐放DS20%","theo",{g:{label:"テオフィリン徐放DS20%",unit:"g",mgPerUnit:200,defaultAmount:0.9}});
 clone("ob01_levoS","レボセチリジンシロップ0.05%","levo",{mL:{label:"レボセチリジンシロップ0.05%",unit:"mL",mgPerUnit:0.5,defaultAmount:5}});
 clone("ob01_levoDS","レボセチリジンDS0.5%","levo",{g:{label:"レボセチリジンDS0.5%",unit:"g",mgPerUnit:5,defaultAmount:0.5}});
 clone("ob01_cetiDS","セチリジンDS1.25%","ceti",{g:{label:"セチリジンDS1.25%",unit:"g",mgPerUnit:12.5,defaultAmount:0.4}});
 clone("ob01_loraDS","ロラタジンDS1%","lora",{g:{label:"ロラタジンDS1%",unit:"g",mgPerUnit:10,defaultAmount:1}});
 clone("ob01_ketoDS","ケトチフェンDS0.1%","keto",{g:{label:"ケトチフェンDS0.1%",unit:"g",mgPerUnit:1,defaultAmount:1.08}});
 clone("ob01_pranDS","プランルカストDS10%","pran",{g:{label:"プランルカストDS10%",unit:"g",mgPerUnit:100,defaultAmount:1.26}});
 // 31-40 GI / pain / other frequent
 clone("ob01_dompDS","ドンペリドンDS1%","domp",{g:{label:"ドンペリドンDS1%",unit:"g",mgPerUnit:10,defaultAmount:1.8}});
 clone("ob01_metoS","メトクロプラミドシロップ0.1%","meto",{mL:{label:"メトクロプラミドシロップ0.1%",unit:"mL",mgPerUnit:1,defaultAmount:5}});
 clone("ob01_apapDS","アセトアミノフェンDS20%","apap",{g:{label:"アセトアミノフェンDS20%",unit:"g",mgPerUnit:200,defaultAmount:1.35}});
 clone("ob01_apapS","アセトアミノフェンシロップ2%","apap",{mL:{label:"アセトアミノフェンシロップ2%",unit:"mL",mgPerUnit:20,defaultAmount:13.5}});
 clone("ob01_txaS","トラネキサム酸シロップ5%","txa",{mL:{label:"トラネキサム酸シロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}});
 clone("ob01_mont4","モンテルカスト細粒4mg","mont",{pack:{label:"モンテルカスト細粒4mg",unit:"包",mgPerUnit:4,defaultAmount:1}});
 clone("ob01_olop","オロパタジン顆粒0.5%","olop",{g:{label:"オロパタジン顆粒0.5%",unit:"g",mgPerUnit:5,defaultAmount:1}});
 clone("ob01_fexo","フェキソフェナジンDS5%","fexo",{g:{label:"フェキソフェナジンDS5%",unit:"g",mgPerUnit:50,defaultAmount:1.2}});
 clone("ob01_tran","トラニラストDS5%","tran",{g:{label:"トラニラストDS5%",unit:"g",mgPerUnit:50,defaultAmount:1.8}});
 clone("ob01_pemi","ペミロラストDS0.5%","pemi",{g:{label:"ペミロラストDS0.5%",unit:"g",mgPerUnit:5,defaultAmount:1.44}});
 // 41-50 neurologic / sleep / selected practical products
 clone("ob01_levet","レベチラセタムDS50%","levet",{g:{label:"レベチラセタムDS50%",unit:"g",mgPerUnit:500,defaultAmount:0.72}});
 clone("ob01_gaba","ガバペンチンシロップ5%","gaba",{mL:{label:"ガバペンチンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}});
 clone("ob01_mela","メラトニン顆粒0.2%","mela",{g:{label:"メラトニン顆粒0.2%",unit:"g",mgPerUnit:2,defaultAmount:1}});
 clone("ob01_rupa","ルパタジン錠10mg","rupa",{tab:{label:"ルパタジン錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1}});
 clone("ob01_desl","デスロラタジン錠5mg","desl",{tab:{label:"デスロラタジン錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1}});
 clone("ob01_epi","エピナスチンDS1%","epi",{g:{label:"エピナスチンDS1%",unit:"g",mgPerUnit:10,defaultAmount:1}});
 clone("ob01_meq","メキタジンシロップ0.03%","meq",{mL:{label:"メキタジンシロップ0.03%",unit:"mL",mgPerUnit:0.3,defaultAmount:6}});
 clone("ob01_oxa","オキサトミドDS2%","oxa",{g:{label:"オキサトミドDS2%",unit:"g",mgPerUnit:20,defaultAmount:1}});
 clone("ob01_acy","アシクロビルDS80%","acy",{g:{label:"アシクロビルDS80%",unit:"g",mgPerUnit:800,defaultAmount:0.25}});
 clone("ob01_ery","エリスロマイシン顆粒20%","ery",{g:{label:"エリスロマイシン顆粒20%",unit:"g",mgPerUnit:200,defaultAmount:2.5}});

 // SKGH is an evidence layer, not an approved-dose source.
 const sk="https://www.skgh.jp/wp/wp-content/themes/skgh/department/pharmacy/for-pharmacist/pdf/pediatric-dose.pdf";
 const practical={
  carbo:["30 mg/kg/day・分3","湘南鎌倉総合病院 小児薬用量"],
  ambro:["0.9 mg/kg/day・分3","湘南鎌倉総合病院 小児薬用量"],
  tipe:["1～2 mg/kg/day・分3","湘南鎌倉総合病院 小児薬用量"],
  cam:["10～15 mg/kg/day・分2～3","湘南鎌倉総合病院 小児薬用量"],
  amox:["20～40 mg/kg/day（同資料記載の実務域）","湘南鎌倉総合病院 小児薬用量"]
 };
 Object.keys(practical).forEach(k=>{if(DB[k]){DB[k].clinicalPracticeEvidence=DB[k].clinicalPracticeEvidence||[];DB[k].clinicalPracticeEvidence.push({dose:practical[k][0],source:practical[k][1],sourceType:"小児科監修・病院薬剤部作成の臨床実務資料",url:sk});}});

 // Display the SKGH layer when present.
 const oldRender=render;
 render=function(){
  oldRender();
  const key=$("drug").value,d=DB[key],out=$("out");if(!d||!out||!d.clinicalPracticeEvidence||["tipe","cypro"].includes(key))return;
  const h=d.clinicalPracticeEvidence.map(x=>'・'+x.dose+' — <a href="'+x.url+'" target="_blank" rel="noopener">'+x.source+' ↗</a>（'+x.sourceType+'）').join("<br>");
  out.insertAdjacentHTML("beforeend",'<div class="note"><b>臨床実務資料：</b><br>'+h+'<br><span class="pill">承認用量とは別レイヤー</span></div>');
 };
})();
