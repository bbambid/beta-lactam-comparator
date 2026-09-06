// Oral batch 02: 50 pharmacy-use oral formulations, favoring audited ingredients.
// New high-complexity ingredients are added only where current PMDA logic is explicitly represented.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const S=$("drug");
 const opt=(k,n)=>{if(!S.querySelector('option[value="'+k+'"]')){let o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
 const clone=(k,n,b,products,aliases=[])=>{if(!DB[b])return;DB[k]=Object.assign({},DB[b],{products,auditStatus:"製剤別監査済み",searchAliases:[n,...aliases]});opt(k,n);};
 // 1-10 allergy/respiratory
 clone("ob02_olop25","アレロック顆粒0.5%","olop",{g:{label:"アレロック顆粒0.5%",unit:"g",mgPerUnit:5,defaultAmount:1}},["オロパタジン"]);
 clone("ob02_lora","クラリチンレディタブ錠10mg","lora",{tab:{label:"クラリチンレディタブ錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1}},["ロラタジン"]);
 clone("ob02_fexo30","アレグラ錠30mg","fexo",{tab:{label:"アレグラ錠30mg",unit:"錠",mgPerUnit:30,defaultAmount:2}},["フェキソフェナジン"]);
 clone("ob02_fexo60","アレグラ錠60mg","fexo",{tab:{label:"アレグラ錠60mg",unit:"錠",mgPerUnit:60,defaultAmount:2}},["フェキソフェナジン"]);
 clone("ob02_epiDS","アレジオンドライシロップ1%相当製剤","epi",{g:{label:"エピナスチン塩酸塩DS1%",unit:"g",mgPerUnit:10,defaultAmount:1}},["アレジオン","エピナスチン"]);
 clone("ob02_ketoS","ザジテンシロップ0.02%相当製剤","keto",{mL:{label:"ケトチフェンシロップ0.02%",unit:"mL",mgPerUnit:0.2,defaultAmount:5.4}},["ザジテン","ケトチフェン"]);
 clone("ob02_ketoDS","ザジテンドライシロップ0.1%相当製剤","keto",{g:{label:"ケトチフェンDS0.1%",unit:"g",mgPerUnit:1,defaultAmount:1.08}},["ザジテン","ケトチフェン"]);
 clone("ob02_pran","オノンドライシロップ10%","pran",{g:{label:"オノンドライシロップ10%",unit:"g",mgPerUnit:100,defaultAmount:1.26}},["プランルカスト"]);
 clone("ob02_mont4","キプレス細粒4mg","mont",{pack:{label:"キプレス細粒4mg",unit:"包",mgPerUnit:4,defaultAmount:1}},["シングレア","モンテルカスト"]);
 clone("ob02_mont5","キプレスチュアブル錠5mg","mont",{tab:{label:"キプレスチュアブル錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1}},["シングレア","モンテルカスト"]);
 // 11-20 cough/mucolytic/bronchodilator
 clone("ob02_mucodyneS","ムコダインシロップ5%","carbo",{mL:{label:"ムコダインシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10.8}},["カルボシステイン"]);
 clone("ob02_mucodyneDS","ムコダインDS50%","carbo",{g:{label:"ムコダインDS50%",unit:"g",mgPerUnit:500,defaultAmount:1.08}},["カルボシステイン"]);
 clone("ob02_mucosolvan","ムコソルバンDS1.5%相当製剤","ambro",{g:{label:"アンブロキソールDS1.5%",unit:"g",mgPerUnit:15,defaultAmount:1.08}},["アンブロキソール"]);
 clone("ob02_asverinPow","アスベリン散10%","tipe",{g:{label:"アスベリン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.45}},["チペピジン"]);
 clone("ob02_asverinS","アスベリンシロップ0.5%","tipe",{mL:{label:"アスベリンシロップ0.5%",unit:"mL",mgPerUnit:5,defaultAmount:9}},["チペピジン"]);
 clone("ob02_astomin","アストミン散10%","dime",{g:{label:"アストミン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.3}},["ジメモルファン"]);
 clone("ob02_meptinDS","メプチンドライシロップ0.005%","proc",{g:{label:"メプチンDS0.005%",unit:"g",mgPerUnit:.05,defaultAmount:.5}},["プロカテロール"]);
 clone("ob02_meptinS","メプチンシロップ5μg/mL","proc",{mL:{label:"メプチンシロップ5μg/mL",unit:"mL",mgPerUnit:.005,defaultAmount:5}},["プロカテロール"]);
 clone("ob02_theodur","テオドールDS20%","theo",{g:{label:"テオドールDS20%",unit:"g",mgPerUnit:200,defaultAmount:.9}},["テオフィリン"]);
 clone("ob02_hokunalin","ホクナリン錠1mg相当経口製剤","tulooral",{tab:{label:"ツロブテロール錠1mg",unit:"錠",mgPerUnit:1,defaultAmount:1}},["ツロブテロール"]);
 // 21-30 GI/antiemetic/analgesic
 clone("ob02_nauzDS","ナウゼリンドライシロップ1%","domp",{g:{label:"ナウゼリンDS1%",unit:"g",mgPerUnit:10,defaultAmount:1.8}},["ドンペリドン"]);
 clone("ob02_primperan","プリンペランシロップ0.1%","meto",{mL:{label:"プリンペランシロップ0.1%",unit:"mL",mgPerUnit:1,defaultAmount:5}},["メトクロプラミド"]);
 clone("ob02_caronal20","カロナール細粒20%","apap",{g:{label:"カロナール細粒20%",unit:"g",mgPerUnit:200,defaultAmount:1.35}},["アセトアミノフェン"]);
 clone("ob02_caronal50","カロナール細粒50%","apap",{g:{label:"カロナール細粒50%",unit:"g",mgPerUnit:500,defaultAmount:.54}},["アセトアミノフェン"]);
 clone("ob02_apap200","アセトアミノフェン錠200mg","apap",{tab:{label:"アセトアミノフェン錠200mg",unit:"錠",mgPerUnit:200,defaultAmount:1}},["カロナール"]);
 clone("ob02_txaS","トランサミンシロップ5%","txa",{mL:{label:"トランサミンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}},["トラネキサム酸"]);
 clone("ob02_txaPow","トランサミン散50%","txa",{g:{label:"トランサミン散50%",unit:"g",mgPerUnit:500,defaultAmount:1}},["トラネキサム酸"]);
 clone("ob02_movLD","モビコール配合内用剤LD","movLD",{pack:{label:"モビコール配合内用剤LD",unit:"包",mgPerUnit:1,defaultAmount:1}},["マクロゴール"]);
 clone("ob02_movHD","モビコール配合内用剤HD","movHD",{pack:{label:"モビコール配合内用剤HD",unit:"包",mgPerUnit:1,defaultAmount:1}},["マクロゴール"]);
 clone("ob02_gaba","ガバペンシロップ5%","gaba",{mL:{label:"ガバペンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}},["ガバペンチン"]);
 // 31-40 antiviral/antibiotic brands
 clone("ob02_tamiflu","タミフルドライシロップ3%","osel",{g:{label:"タミフルDS3%",unit:"g",mgPerUnit:30,defaultAmount:2.4}},["オセルタミビル"]);
 clone("ob02_valtrex","バルトレックス顆粒50%","vala",{g:{label:"バルトレックス顆粒50%",unit:"g",mgPerUnit:500,defaultAmount:1.5}},["バラシクロビル"]);
 clone("ob02_zovirax","ゾビラックス顆粒40%相当製剤","acy",{g:{label:"アシクロビル顆粒40%",unit:"g",mgPerUnit:400,defaultAmount:1}},["アシクロビル"]);
 clone("ob02_fro","フロモックス小児用細粒100mg/g","cfpn",{g:{label:"フロモックス小児用細粒100mg/g",unit:"g",mgPerUnit:100,defaultAmount:1.62}},["セフカペン"]);
 clone("ob02_meiact","メイアクトMS小児用細粒10%","cdtr",{g:{label:"メイアクトMS小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},["セフジトレン"]);
 clone("ob02_banan","バナンドライシロップ5%","cpdx",{g:{label:"バナンDS5%",unit:"g",mgPerUnit:50,defaultAmount:3.6}},["セフポドキシム"]);
 clone("ob02_cefzon","セフゾン細粒小児用10%","cfdn",{g:{label:"セフゾン細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},["セフジニル"]);
 clone("ob02_cefaclor","ケフラール細粒小児用10%相当製剤","ccr",{g:{label:"セファクロル細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}},["ケフラール","セファクロル"]);
 clone("ob02_farom","ファロムドライシロップ小児用10%","faro",{g:{label:"ファロムDS小児用10%",unit:"g",mgPerUnit:100,defaultAmount:2.7}},["ファロペネム"]);
 clone("ob02_orapenem","オラペネム小児用細粒10%","tebi",{g:{label:"オラペネム小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.44}},["テビペネム"]);
 // 41-50 neuro / allergy / current formulations
 clone("ob02_eKeppra","イーケプラドライシロップ50%","levet",{g:{label:"イーケプラDS50%",unit:"g",mgPerUnit:500,defaultAmount:.72}},["レベチラセタム"]);
 clone("ob02_bimpat","ビムパットドライシロップ10%","lacos",{g:{label:"ビムパットDS10%",unit:"g",mgPerUnit:100,defaultAmount:.72}},["ラコサミド"]);
 clone("ob02_lacosJG","ラコサミドドライシロップ10%「JG」","lacos",{g:{label:"ラコサミドDS10%「JG」",unit:"g",mgPerUnit:100,defaultAmount:.72}},["ビムパット","ラコサミド"]);
 clone("ob02_lacosN","ラコサミドドライシロップ10%「日新」","lacos",{g:{label:"ラコサミドDS10%「日新」",unit:"g",mgPerUnit:100,defaultAmount:.72}},["ビムパット","ラコサミド"]);
 clone("ob02_valproS","バルプロ酸ナトリウムシロップ5%","valpro",{mL:{label:"バルプロ酸Naシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:6}},["デパケン","バルプロ酸"]);
 clone("ob02_valproDS","バルプロ酸ナトリウム細粒40%","valpro",{g:{label:"バルプロ酸Na細粒40%",unit:"g",mgPerUnit:400,defaultAmount:.75}},["デパケン","バルプロ酸"]);
 clone("ob02_rupa","ルパフィン錠10mg","rupa",{tab:{label:"ルパフィン錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1}},["ルパタジン"]);
 clone("ob02_desl","デザレックス錠5mg","desl",{tab:{label:"デザレックス錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1}},["デスロラタジン"]);
 clone("ob02_levo","ザイザルシロップ0.05%","levo",{mL:{label:"ザイザルシロップ0.05%",unit:"mL",mgPerUnit:.5,defaultAmount:5}},["レボセチリジン"]);
 clone("ob02_ceti","セチリジン塩酸塩DS1.25%","ceti",{g:{label:"セチリジンDS1.25%",unit:"g",mgPerUnit:12.5,defaultAmount:.4}},["ジルテック","セチリジン"]);

 // Current PMDA-backed complex oral ingredients if not already present.
 if(!DB.lacos){
   DB.lacos={products:{ds10:{label:"ラコサミドDS10%",unit:"g",mgPerUnit:100,defaultAmount:.72}},indications:{
    peds:{label:"4歳以上・50kg未満",lo:(w,a)=>a<4||w>=50?NaN:2*w,hi:(w,a)=>a<4||w>=50?NaN:(w<30?12*w:8*w),max:(w,a)=>w<30?12*w:8*w,freq:[2],desc:"4歳以上：2mg/kg/dayから開始。維持は30kg未満6mg/kg/day、30～50kg未満4mg/kg/day。最高は各12/8mg/kg/day。分2。"}
   },adult:[200,400],source:"PMDA ラコサミド経口剤電子添文（2026年改訂）",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1139015R1023_1?user=1",auditStatus:"PMDA現行用量確認済み"};
   opt("lacos","ラコサミド");
 }
 if(!DB.valpro){
   DB.valpro={products:{syr5:{label:"バルプロ酸Naシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:6}},indications:{
    epilepsy:{label:"てんかん等",lo:(w,a)=>10*w,hi:(w,a)=>40*w,freq:[2,3],desc:"用量は患者・適応で個別調整。血中濃度・臨床状態を含め確認する薬剤。ツールでは広い参考域のみ表示。"}
   },adult:[400,1200],source:"PMDA バルプロ酸ナトリウム製剤電子添文（2026-03改訂）",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1139004Q1135_1?user=1",auditStatus:"要TDM・個別調整"};
   opt("valpro","バルプロ酸ナトリウム");
 }
 // Add options for clones whose base became available after their first pass.
 [["ob02_bimpat","ビムパットドライシロップ10%","lacos"],["ob02_lacosJG","ラコサミドドライシロップ10%「JG」","lacos"],["ob02_lacosN","ラコサミドドライシロップ10%「日新」","lacos"],["ob02_valproS","バルプロ酸ナトリウムシロップ5%","valpro"],["ob02_valproDS","バルプロ酸ナトリウム細粒40%","valpro"]].forEach(([k,n,b],i)=>{
  if(DB[k]||!DB[b])return;
  const p=i<3?{g:{label:n,unit:"g",mgPerUnit:100,defaultAmount:.72}}:(i===3?{mL:{label:n,unit:"mL",mgPerUnit:50,defaultAmount:6}}:{g:{label:n,unit:"g",mgPerUnit:400,defaultAmount:.75}});
  clone(k,n,b,p,[b==="lacos"?"ラコサミド":"バルプロ酸"]);
 });
})();