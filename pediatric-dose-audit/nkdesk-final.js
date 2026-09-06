// Final NKdesk recovery + discontinued-product cleanup.
// Candidate names from NKdesk; no NKdesk Augsberger value is promoted to an approved dose.
(function(){if(typeof DB==='undefined'||typeof $==='undefined')return;
const S=$("drug"), add=(k,n,p,label,src)=>{if(!DB[k])DB[k]={products:p,indications:{general:{label,lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"現行の電子添文・適応別用量を優先して監査。NKdesk換算値は承認用量として使用しない。"}},adult:null,source:src};if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
add("cefteram","セフテラム ピボキシル",{ds10:{label:"細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:0.9}},"感染症","PMDA セフテラム ピボキシル電子添文");
add("cefix","セフィキシム",{ds5:{label:"細粒小児用5%",unit:"g",mgPerUnit:50,defaultAmount:1.2}},"感染症","PMDA セフィキシム電子添文");
add("fosfo","ホスホマイシン",{ds40:{label:"DS40%",unit:"g",mgPerUnit:400,defaultAmount:1}},"感染症","PMDA ホスホマイシン電子添文");
add("mide","ミデカマイシン",{ds10:{label:"DS10%",unit:"g",mgPerUnit:100,defaultAmount:1}},"感染症","PMDA ミデカマイシン電子添文");
add("jos","ジョサマイシン",{ds10:{label:"DS10%",unit:"g",mgPerUnit:100,defaultAmount:1}},"感染症","PMDA ジョサマイシン電子添文");
add("dext","デキストロメトルファン",{pow10:{label:"散10%",unit:"g",mgPerUnit:100,defaultAmount:0.1}},"鎮咳","PMDA デキストロメトルファン電子添文");
add("dimem","ジメモルファン",{ds25:{label:"DS2.5%",unit:"g",mgPerUnit:25,defaultAmount:0.9}},"鎮咳","PMDA ジメモルファン電子添文");
add("astomin","ジメモルファン（アストミンシロップ）",{syr025:{label:"シロップ0.25%",unit:"mL",mgPerUnit:2.5,defaultAmount:3}},"鎮咳","PMDA アストミンシロップ電子添文");
add("mgO","酸化マグネシウム",{pow:{label:"原末",unit:"g",mgPerUnit:1000,defaultAmount:0.5},tab250:{label:"錠250mg",unit:"錠",mgPerUnit:250,defaultAmount:2},tab330:{label:"錠330mg",unit:"錠",mgPerUnit:330,defaultAmount:1.5},tab500:{label:"錠500mg",unit:"錠",mgPerUnit:500,defaultAmount:1}},"便秘症等","PMDA 酸化マグネシウム電子添文");
add("gaba","ガバペンチン",{syr5:{label:"シロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:2}},"てんかん（3歳以上）","PMDA ガバペンシロップ電子添文");
add("ensit","エンシトレルビル（ゾコーバ）",{tab125:{label:"錠125mg",unit:"錠",mgPerUnit:125,defaultAmount:1}},"SARS-CoV-2感染症（小児適応・体重別用量を確認）","PMDA ゾコーバ錠電子添文");
add("tosped","トスフロキサシン小児用錠",{tab75:{label:"小児用錠75mg",unit:"錠",mgPerUnit:75,defaultAmount:1}},"感染症","PMDA トスフロキサシン小児用錠電子添文");
add("dompDS","ドンペリドンDS",{ds1:{label:"DS1%",unit:"g",mgPerUnit:10,defaultAmount:0.5}},"消化器症状","PMDA ドンペリドンDS電子添文");
add("fluEye","フルオロメトロン点眼",{eye01:{label:"点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:3}},"眼炎症（小児年齢を確認）","PMDA フルオロメトロン点眼液電子添文");
add("olopEye","オロパタジン点眼",{eye01:{label:"点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:4}},"アレルギー性結膜炎","PMDA オロパタジン点眼液電子添文");
add("tranEye","トラニラスト点眼",{eye05:{label:"点眼液0.5%",unit:"回",mgPerUnit:1,defaultAmount:4}},"アレルギー性結膜炎","PMDA トラニラスト点眼液電子添文");
add("cromoEye","クロモグリク酸Na点眼",{eye2:{label:"点眼液2%",unit:"回",mgPerUnit:1,defaultAmount:4}},"アレルギー性結膜炎","PMDA クロモグリク酸Na点眼液電子添文");
add("diazRect","ジアゼパム坐剤",{s4:{label:"坐剤4mg",unit:"個",mgPerUnit:4,defaultAmount:1},s6:{label:"坐剤6mg",unit:"個",mgPerUnit:6,defaultAmount:1},s10:{label:"坐剤10mg",unit:"個",mgPerUnit:10,defaultAmount:1}},"小児けいれん","PMDA ダイアップ坐剤電子添文");
add("bisac","ビサコジル坐剤",{s2:{label:"坐剤2mg",unit:"個",mgPerUnit:2,defaultAmount:1},s10:{label:"坐剤10mg",unit:"個",mgPerUnit:10,defaultAmount:1}},"便秘症","PMDA ビサコジル坐剤電子添文");
add("chloral","抱水クロラール坐剤",{s250:{label:"坐剤250mg",unit:"個",mgPerUnit:250,defaultAmount:1},s500:{label:"坐剤500mg",unit:"個",mgPerUnit:500,defaultAmount:1}},"鎮静・催眠等","PMDA 抱水クロラール坐剤電子添文");
// Remove known discontinued/transition-completed names if any earlier batch accidentally exposed them.
["アドソルビン","エンテロノンR","アクディーム","ノイチーム","ビソルボンシロップ","フルナーゼ点鼻小児用","アルデシンAQネーザル"].forEach(n=>[...S.options].filter(o=>o.textContent.includes(n)).forEach(o=>o.remove()));
})();