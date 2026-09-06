// Local/topical + remaining systemic coverage audit, 2026-09
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const S=$("drug");
 const add=(k,n,obj)=>{DB[k]=obj;if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
 const mk=(products,inds,src,url,note)=>({products,indications:inds,adult:null,source:src,sourceUrl:url,auditStatus:"承認用量確認済み",auditNote:note||""});
 // Current systemic/suppository products not previously represented with exact current label logic.
 add("aud_voltarenSupp","ボルタレンサポ12.5/25/50mg",mk(
  {s125:{label:"ボルタレンサポ12.5mg",unit:"個",mgPerUnit:12.5,defaultAmount:1},s25:{label:"ボルタレンサポ25mg",unit:"個",mgPerUnit:25,defaultAmount:1},s50:{label:"ボルタレンサポ50mg",unit:"個",mgPerUnit:50,defaultAmount:1}},
  {peds:{label:"小児の鎮痛・緊急解熱",lo:w=>0.5*w,hi:w=>2*w,max:w=>2*w,freq:[1,2],perDoseLo:w=>0.5*w,perDoseHi:w=>1*w,desc:"1回0.5～1.0mg/kgを1日1～2回。年齢別目安あり。少量から開始。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261147700J1057"
 ));
 add("aud_telemin2","テレミンソフト坐薬2mg",mk(
  {s2:{label:"テレミンソフト坐薬2mg",unit:"個",mgPerUnit:2,defaultAmount:1}},
  {general:{label:"便秘症等",lo:()=>NaN,hi:()=>NaN,freq:[1,2],desc:"承認添付文書は年齢・症状により適宜増減。固定小児mg/kg量は設定なし。"}},
  "PMDA テレミンソフト坐薬2mg電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2359700J1088_3?user=1"
 ));
 add("aud_depakeneS","デパケンシロップ5%",mk(
  {mL:{label:"デパケンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}},
  {epilepsy:{label:"てんかん等",lo:()=>400,hi:()=>1200,freq:[2,3],desc:"承認量は400～1200mg/day・分2～3、年齢・症状で適宜増減。小児固定mg/kg承認量ではない。"},migraine:{label:"片頭痛発作の発症抑制",lo:()=>400,hi:()=>800,max:()=>1000,freq:[2,3],desc:"400～800mg/day・分2～3、最大1000mg/day。年齢・症状で適宜増減。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261139004Q1100"
 ));
 // Hydroxyzine current formulations: no fixed pediatric approved mg/kg, so do not fabricate one.
 const hydInd={skin:{label:"蕁麻疹・皮膚疾患に伴うそう痒",lo:()=>NaN,hi:()=>NaN,freq:[2,3],desc:"承認添付文書は成人量を示し年齢・症状で適宜増減。小児固定mg/kg承認量なし。"},neuro:{label:"神経症の不安・緊張・抑うつ",lo:()=>NaN,hi:()=>NaN,freq:[3,4],desc:"承認添付文書は成人量を示し年齢・症状で適宜増減。小児固定mg/kg承認量なし。"}};
 add("aud_ataraxDS","アタラックス-Pドライシロップ2.5%",mk({g:{label:"アタラックス-Pドライシロップ2.5%",unit:"g",mgPerUnit:25,defaultAmount:1}},hydInd,"PMDA アタラックス-P DS2.5%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019M1046_3?user=1"));
 add("aud_ataraxPow","アタラックス-P散10%",mk({g:{label:"アタラックス-P散10%",unit:"g",mgPerUnit:100,defaultAmount:0.25}},hydInd,"PMDA アタラックス-P散10%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019B1037_3?user=1"));
 add("aud_ataraxS","アタラックス-Pシロップ0.5%",mk({mL:{label:"アタラックス-Pシロップ0.5%",unit:"mL",mgPerUnit:5,defaultAmount:5}},hydInd,"PMDA アタラックス-Pシロップ0.5%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019Q1030_3?user=1"));

 // Ophthalmic products from the source table — regimen is drops/frequency, not mg/kg.
 add("aud_flumEye","フルメトロン点眼液0.1%",mk(
  {eye:{label:"フルメトロン点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:3}},
  {eye:{label:"外眼部・前眼部炎症",lo:()=>2,hi:()=>4,freq:[2,3,4],desc:"1回1～2滴、1日2～4回。年齢・症状で適宜増減。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261315704Q3126"
 ));
 add("aud_patEye","パタノール点眼液0.1%",mk(
  {eye:{label:"パタノール点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:4}},
  {eye:{label:"アレルギー性結膜炎",lo:()=>4,hi:()=>4,freq:[4],desc:"1回1～2滴、1日4回。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261319752Q1024"
 ));
 add("aud_alesionEye","アレジオン点眼液0.05%",mk(
  {eye:{label:"アレジオン点眼液0.05%",unit:"回",mgPerUnit:1,defaultAmount:4}},
  {eye:{label:"アレルギー性結膜炎",lo:()=>4,hi:()=>4,freq:[4],desc:"1回1滴、1日4回。12歳未満の臨床試験は実施されていない旨も確認。"}},
  "PMDA アレジオン点眼液0.05%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319762Q1028_1_12"
 ));
 add("aud_alesionLX","アレジオンLX点眼液0.1%",mk(
  {eye:{label:"アレジオンLX点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:2}},
  {eye:{label:"アレルギー性結膜炎",lo:()=>2,hi:()=>2,freq:[2],desc:"1回1滴、1日2回（朝・夕）。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261319762Q2024"
 ));
 add("aud_ketasEye","ケタス点眼液0.01%",mk(
  {eye:{label:"ケタス点眼液0.01%",unit:"回",mgPerUnit:1,defaultAmount:4}},
  {eye:{label:"アレルギー性結膜炎",lo:()=>4,hi:()=>4,freq:[4],desc:"1回1～2滴、1日4回。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261319741Q1050"
 ));
 add("aud_tosEye","オゼックス点眼液0.3%",mk(
  {eye:{label:"オゼックス点眼液0.3%",unit:"回",mgPerUnit:1,defaultAmount:3}},
  {eye:{label:"細菌性眼感染症",lo:()=>3,hi:()=>3,freq:[3],desc:"成人・小児とも1回1滴、1日3回。症状により適宜増量。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261319751Q1020"
 ));
 add("aud_ofloxEye","タリビッド点眼液0.3%",mk(
  {eye:{label:"タリビッド点眼液0.3%",unit:"回",mgPerUnit:1,defaultAmount:3}},
  {eye:{label:"細菌性眼感染症",lo:()=>3,hi:()=>3,freq:[3],desc:"1回1滴、1日3回。症状により適宜増減。"}},
  "厚労省/PMDA 現行添付文書","https://rctportal.mhlw.go.jp/drug?id=00052556&sub=001"
 ));
 add("aud_aziEye","アジマイシン点眼液1%",mk(
  {eye:{label:"アジマイシン点眼液1%",unit:"回",mgPerUnit:1,defaultAmount:2}},
  {conj:{label:"結膜炎（7歳以上）",lo:()=>NaN,hi:()=>NaN,freq:[1,2],desc:"7歳以上：1回1滴、1日2回を2日、その後1日1回を5日。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261317714Q1024"
 ));

 // Current topical pediatric products.
 add("aud_protopic03","プロトピック軟膏0.03%小児用",mk(
  {g:{label:"プロトピック軟膏0.03%小児用",unit:"g",mgPerUnit:0.3,defaultAmount:1}},
  {ad:{label:"アトピー性皮膚炎（2歳以上）",lo:()=>NaN,hi:()=>NaN,freq:[1,2],desc:"1日1～2回、適量。1回最大5gだが年齢で減量。2～5歳は1g、6～12歳は2～4g、13歳以上5gが目安上限。"}},
  "厚労省/PMDA 現行添付文書","https://rctportal.mhlw.go.jp/drug?id=00049740&sub=001"
 ));
 add("aud_corectim025","コレクチム軟膏0.25%",mk(
  {g:{label:"コレクチム軟膏0.25%",unit:"g",mgPerUnit:2.5,defaultAmount:1}},
  {ad:{label:"アトピー性皮膚炎（小児）",lo:()=>NaN,hi:()=>NaN,freq:[2],desc:"0.25%製剤を1日2回、適量。症状により0.5%製剤可。1回最大5g、体格考慮。塗布量は体表面積30%までを目安。"}},
  "PMDA コレクチム軟膏電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/340018_2699714M1029_2_01"
 ));
 add("aud_moizerto03","モイゼルト軟膏0.3%",mk(
  {g:{label:"モイゼルト軟膏0.3%",unit:"g",mgPerUnit:3,defaultAmount:1}},
  {ad:{label:"アトピー性皮膚炎（小児）",lo:()=>NaN,hi:()=>NaN,freq:[2],desc:"0.3%製剤を1日2回、適量。症状により1%製剤可。塗布量は皮疹面積0.1m²あたり1gを目安。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%262699715M1023"
 ));

 // Explicitly mark known non-current source-table items so they never reappear.
 const obsolete=["セルシンシロップ0.1%","ジョサマイドライシロップ10%","カナマイシンシロップ5%","ビクロックスシロップ8%","ラクスパン散1.8%","エステルチンドライシロップ0.01%","プルスマリンAドライシロップ1.5%","アレグラドライシロップ5%","アレジオンドライシロップ1%"];
 [...S.options].forEach(o=>{if(obsolete.some(n=>o.textContent.includes(n)))o.remove();});

 const prevLoad=loadDrug;
 loadDrug=function(reset=true){
   prevLoad(reset); const k=$("drug").value;
   const M={aud_voltarenSupp:[1,2],aud_telemin2:[1,2],aud_depakeneS:[2,3],aud_ataraxDS:[2,3,4],aud_ataraxPow:[2,3,4],aud_ataraxS:[2,3,4],aud_flumEye:[2,3,4],aud_patEye:[4],aud_alesionEye:[4],aud_alesionLX:[2],aud_ketasEye:[4],aud_tosEye:[3],aud_ofloxEye:[3],aud_aziEye:[1,2],aud_protopic03:[1,2],aud_corectim025:[2],aud_moizerto03:[2]};
   if(M[k])$("freq").innerHTML=M[k].map(n=>'<option value="'+n+'">'+(n===1?'1回/分1':'分'+n)+'</option>').join("");
   render();
 };
})();