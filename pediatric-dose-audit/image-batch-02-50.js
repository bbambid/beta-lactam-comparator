// Image table batch 02: 50 formulation/product records.
// Image supplied names only. Product availability/current labels are reconciled against PMDA; dosing reuses the verified ingredient logic where available.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined') return;
 const sel=$("drug");
 const clone=(x)=>JSON.parse(JSON.stringify(x));
 const addAlias=(key,label,base,products,source,sourceUrl)=>{
   if(!DB[base]) return;
   const d=Object.assign({},DB[base],{products,source:source||DB[base].source});
   if(sourceUrl)d.sourceUrl=sourceUrl;
   DB[key]=d;
   if(!sel.querySelector('option[value="'+key+'"]')){const o=document.createElement('option');o.value=key;o.textContent=label;sel.appendChild(o);}
 };
 const addHold=(key,label,products,indication,source,sourceUrl)=>{
   DB[key]={products,indications:{general:{label:indication,lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"現行電子添文の用法・用量を優先。画像表の数値は使用しません。"}},adult:null,source,sourceUrl};
   if(!sel.querySelector('option[value="'+key+'"]')){const o=document.createElement('option');o.value=key;o.textContent=label;sel.appendChild(o);}
 };
 // 1-18 antimicrobials / antivirals
 addAlias("img02_01","ペリアクチン散1%","cypro",{pow1:{label:"ペリアクチン散1%",unit:"g",mgPerUnit:10,defaultAmount:0.25}},"PMDA ペリアクチン散1%電子添文");
 addAlias("img02_02","アスベリン散10%","tipe",{pow10:{label:"アスベリン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.45}},"PMDA アスベリン散10%電子添文");
 addAlias("img02_03","ワイドシリン細粒20%","amox",{gran20:{label:"ワイドシリン細粒20%",unit:"g",mgPerUnit:200,defaultAmount:1.8}},"PMDA ワイドシリン細粒20%電子添文","https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=61");
 addAlias("img02_04","ワイドシリン細粒10%","amox",{gran10:{label:"ワイドシリン細粒10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}},"PMDA ワイドシリン細粒10%電子添文","https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=61");
 addAlias("img02_05","パセトシン細粒10%","amox",{gran10:{label:"パセトシン細粒10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}},"PMDA パセトシン細粒10%電子添文");
 addAlias("img02_06","ケフラール細粒小児用20%","ccr",{gran20:{label:"ケフラール細粒小児用20%",unit:"g",mgPerUnit:200,defaultAmount:1.8}},"PMDA ケフラール細粒小児用20%電子添文");
 addAlias("img02_07","トミロン細粒小児用10%","cefteram",{gran10:{label:"トミロン細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"PMDA トミロン細粒小児用10%電子添文");
 addAlias("img02_08","バナンドライシロップ5%","cpdx",{ds5:{label:"バナンドライシロップ5%",unit:"g",mgPerUnit:50,defaultAmount:3.6}},"PMDA バナンドライシロップ5%電子添文");
 addAlias("img02_09","セフゾン細粒小児用10%","cfdn",{gran10:{label:"セフゾン細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"PMDA セフゾン細粒小児用10%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132013C1031_4?user=1");
 addAlias("img02_10","フロモックス小児用細粒100mg","cfpn",{gran10:{label:"フロモックス小児用細粒100mg",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"PMDA フロモックス小児用細粒100mg電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132016C1027_1?user=1");
 addAlias("img02_11","メイアクトMS小児用細粒10%","cdtr",{gran10:{label:"メイアクトMS小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"PMDA メイアクトMS小児用細粒10%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132015C1103_1?user=1");
 addAlias("img02_12","エリスロシンドライシロップ10%","ery",{ds10:{label:"エリスロシンドライシロップ10%",unit:"g",mgPerUnit:100,defaultAmount:5}},"PMDA エリスロシンドライシロップ10%電子添文");
 addAlias("img02_13","クラリスドライシロップ10%小児用","cam",{ds10:{label:"クラリスドライシロップ10%小児用",unit:"g",mgPerUnit:100,defaultAmount:2.7}},"PMDA クラリスドライシロップ10%小児用電子添文");
 addAlias("img02_14","クラリシッドドライシロップ10%小児用","cam",{ds10:{label:"クラリシッドドライシロップ10%小児用",unit:"g",mgPerUnit:100,defaultAmount:2.7}},"PMDA クラリシッドドライシロップ10%小児用電子添文");
 addAlias("img02_15","ホスミシンドライシロップ400","fos",{ds40:{label:"ホスミシンドライシロップ400",unit:"g",mgPerUnit:400,defaultAmount:2.7}},"PMDA ホスミシンドライシロップ400電子添文");
 addAlias("img02_16","ホスミシンドライシロップ200","fos",{ds20:{label:"ホスミシンドライシロップ200",unit:"g",mgPerUnit:200,defaultAmount:5.4}},"PMDA ホスミシンドライシロップ200電子添文");
 addAlias("img02_17","ジスロマック細粒小児用10%","azi",{gran10:{label:"ジスロマック細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.8}},"PMDA ジスロマック細粒小児用10%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6149004C1030_3?user=1");
 addAlias("img02_18","オゼックス細粒小児用15%","tosu",{gran15:{label:"オゼックス細粒小児用15%",unit:"g",mgPerUnit:150,defaultAmount:1.44}},"PMDA オゼックス細粒小児用15%電子添文");

 // 19-29 rectal / skin / inhalation
 addAlias("img02_19","ホクナリンテープ0.5mg","tulo",{p:{label:"ホクナリンテープ0.5mg",unit:"枚",mgPerUnit:0.5,defaultAmount:1}},"PMDA ホクナリンテープ電子添文");
 addAlias("img02_20","ホクナリンテープ1mg","tulo",{p:{label:"ホクナリンテープ1mg",unit:"枚",mgPerUnit:1,defaultAmount:1}},"PMDA ホクナリンテープ電子添文");
 addAlias("img02_21","ホクナリンテープ2mg","tulo",{p:{label:"ホクナリンテープ2mg",unit:"枚",mgPerUnit:2,defaultAmount:1}},"PMDA ホクナリンテープ電子添文");
 addAlias("img02_22","アンヒバ坐剤小児用50mg","apap",{s:{label:"アンヒバ坐剤小児用50mg",unit:"個",mgPerUnit:50,defaultAmount:1}},"PMDA アンヒバ坐剤小児用電子添文");
 addAlias("img02_23","アンヒバ坐剤小児用100mg","apap",{s:{label:"アンヒバ坐剤小児用100mg",unit:"個",mgPerUnit:100,defaultAmount:1}},"PMDA アンヒバ坐剤小児用電子添文");
 addAlias("img02_24","アンヒバ坐剤小児用200mg","apap",{s:{label:"アンヒバ坐剤小児用200mg",unit:"個",mgPerUnit:200,defaultAmount:1}},"PMDA アンヒバ坐剤小児用電子添文");
 addAlias("img02_25","エスクレ坐剤250mg","chloral",{s:{label:"エスクレ坐剤「250」",unit:"個",mgPerUnit:250,defaultAmount:1}},"PMDA エスクレ坐剤電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1123700J1020_2?user=1");
 addAlias("img02_26","エスクレ坐剤500mg","chloral",{s:{label:"エスクレ坐剤「500」",unit:"個",mgPerUnit:500,defaultAmount:1}},"PMDA エスクレ坐剤電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1123700J1020_2?user=1");
 addHold("img02_27","ヒルドイドクリーム0.3%",{tube:{label:"ヒルドイドクリーム0.3%",unit:"g",mgPerUnit:3,defaultAmount:1}},"皮脂欠乏症等","PMDA ヒルドイドクリーム0.3%電子添文");
 addHold("img02_28","ヒルドイドソフト軟膏0.3%",{tube:{label:"ヒルドイドソフト軟膏0.3%",unit:"g",mgPerUnit:3,defaultAmount:1}},"皮脂欠乏症等","PMDA ヒルドイドソフト軟膏0.3%電子添文");
 addHold("img02_29","ヒルドイドローション0.3%",{b:{label:"ヒルドイドローション0.3%",unit:"g",mgPerUnit:3,defaultAmount:1}},"皮脂欠乏症等","PMDA ヒルドイドローション0.3%電子添文");
 addHold("img02_30","ベネトリン吸入液0.5%",{neb:{label:"ベネトリン吸入液0.5%",unit:"mL",mgPerUnit:5,defaultAmount:0.3}},"気管支喘息等","PMDA ベネトリン吸入液0.5%電子添文");
 addHold("img02_31","パルミコート吸入液0.5mg",{neb:{label:"パルミコート吸入液0.5mg",unit:"アンプル",mgPerUnit:0.5,defaultAmount:1}},"気管支喘息","PMDA パルミコート吸入液電子添文");

 // 32-50 allergy/respiratory oral formulations
 addAlias("img02_32","ゼスラン小児用細粒0.6%","meq",{g:{label:"ゼスラン小児用細粒0.6%",unit:"g",mgPerUnit:6,defaultAmount:0.3}},"PMDA ゼスラン小児用細粒0.6%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4413004C2022_2?user=1");
 addAlias("img02_33","ニポラジン小児用細粒0.6%","meq",{g:{label:"ニポラジン小児用細粒0.6%",unit:"g",mgPerUnit:6,defaultAmount:0.3}},"PMDA ニポラジン小児用細粒0.6%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4413004C2030_1?user=1");
 addHold("img02_34","ポララミン散1%",{g:{label:"ポララミン散1%",unit:"g",mgPerUnit:10,defaultAmount:0.2}},"アレルギー性疾患","PMDA d-クロルフェニラミンマレイン酸塩製剤電子添文");
 addAlias("img02_35","ザジテンドライシロップ0.1%","keto",{g:{label:"ザジテンドライシロップ0.1%",unit:"g",mgPerUnit:1,defaultAmount:1.08}},"PMDA ザジテンドライシロップ0.1%電子添文");
 addAlias("img02_36","アレジオンドライシロップ1%","epi",{g:{label:"アレジオンドライシロップ1%",unit:"g",mgPerUnit:10,defaultAmount:1}},"PMDA アレジオンドライシロップ1%電子添文");
 addAlias("img02_37","エバステルドライシロップ1%","ebas",{g:{label:"エバステルドライシロップ1%",unit:"g",mgPerUnit:10,defaultAmount:0.5}},"PMDA エバステルドライシロップ1%電子添文");
 addAlias("img02_38","ジルテックドライシロップ1.25%","ceti",{g:{label:"ジルテックドライシロップ1.25%",unit:"g",mgPerUnit:12.5,defaultAmount:0.4}},"PMDA ジルテックドライシロップ1.25%電子添文");
 addAlias("img02_39","アレロック顆粒0.5%","olop",{g:{label:"アレロック顆粒0.5%",unit:"g",mgPerUnit:5,defaultAmount:1}},"PMDA アレロック顆粒0.5%電子添文");
 addAlias("img02_40","アレグラドライシロップ5%","fexo",{g:{label:"アレグラドライシロップ5%",unit:"g",mgPerUnit:50,defaultAmount:1.2}},"PMDA アレグラドライシロップ5%電子添文");
 addAlias("img02_41","ムコソルバンドライシロップ1.5%","ambro",{g:{label:"ムコソルバンドライシロップ1.5%",unit:"g",mgPerUnit:15,defaultAmount:1.08}},"PMDA ムコソルバンDS1.5%電子添文");
 addAlias("img02_42","ムコダインドライシロップ50%","carbo",{g:{label:"ムコダインドライシロップ50%",unit:"g",mgPerUnit:500,defaultAmount:1.08}},"PMDA ムコダインDS50%電子添文");
 addHold("img02_43","ビソルボン細粒2%",{g:{label:"ビソルボン細粒2%",unit:"g",mgPerUnit:20,defaultAmount:0.5}},"去痰","PMDA ブロムヘキシン塩酸塩細粒2%電子添文");
 addAlias("img02_44","メプチン顆粒0.01%","proc",{g:{label:"メプチン顆粒0.01%",unit:"g",mgPerUnit:0.1,defaultAmount:0.5}},"PMDA メプチン顆粒0.01%電子添文");
 addAlias("img02_45","メプチンミニ錠25μg","proc",{t:{label:"メプチンミニ錠25μg",unit:"錠",mgPerUnit:0.025,defaultAmount:1}},"PMDA メプチンミニ錠25μg電子添文");
 addAlias("img02_46","ホクナリンドライシロップ0.1%小児用","tulooral",{g:{label:"ホクナリンドライシロップ0.1%小児用",unit:"g",mgPerUnit:1,defaultAmount:0.72}},"PMDA ホクナリンドライシロップ0.1%小児用電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2259002F1065_5?user=1");
 addAlias("img02_47","テオドール錠50mg","theo",{t:{label:"テオドール錠50mg",unit:"錠",mgPerUnit:50,defaultAmount:2}},"PMDA テオドール錠50mg電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2251001D1061_1?user=1");
 addHold("img02_48","テオドール錠100mg",{t:{label:"テオドール錠100mg",unit:"錠",mgPerUnit:100,defaultAmount:1}},"気管支喘息等","PMDA テオフィリン徐放錠電子添文");
 addAlias("img02_49","ホクナリン錠1mg","tulooral",{t:{label:"ホクナリン錠1mg",unit:"錠",mgPerUnit:1,defaultAmount:1}},"PMDA ホクナリン錠1mg電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2259002F1065_5?user=1");
 addAlias("img02_50","カロナール細粒20%","apap",{g:{label:"カロナール細粒20%",unit:"g",mgPerUnit:200,defaultAmount:0.5}},"PMDA カロナール細粒20%電子添文");

 // shared frequency handling for exact-product aliases
 const prevLoad=loadDrug;
 loadDrug=function(reset=true){
   prevLoad(reset);
   const k=$("drug").value;
   const baseFreq={
     img02_01:[1,2,3],img02_02:[3],img02_03:[3,4],img02_04:[3,4],img02_05:[3,4],
     img02_06:[3],img02_07:[3],img02_08:[2,3],img02_09:[3],img02_10:[3],img02_11:[3],
     img02_12:[4,5,6],img02_13:[2,3],img02_14:[2,3],img02_15:[3,4],img02_16:[3,4],img02_17:[1],img02_18:[2],
     img02_19:[1],img02_20:[1],img02_21:[1],img02_22:[1,2,3,4],img02_23:[1,2,3,4],img02_24:[1,2,3,4],
     img02_25:[1],img02_26:[1],img02_30:[1,2,3,4],img02_31:[1,2],
     img02_32:[2],img02_33:[2],img02_34:[2,3],img02_35:[2],img02_36:[1],img02_37:[1],img02_38:[2],
     img02_39:[2],img02_40:[2],img02_41:[3],img02_42:[3],img02_43:[3],img02_44:[2,3],img02_45:[1,2],
     img02_46:[2],img02_47:[2],img02_48:[2],img02_49:[2],img02_50:[1,2,3,4]
   };
   if(baseFreq[k]) $("freq").innerHTML=baseFreq[k].map(n=>'<option value="'+n+'">'+(n===1?'分1':'分'+n)+'</option>').join('');
   render();
 };
})();