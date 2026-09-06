// Final source-table reconciliation fixes, 2026-09.
(function(){if(typeof DB==='undefined'||typeof $==='undefined')return;
const S=$("drug"),add=(k,n,obj)=>{DB[k]=obj;if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
const alias=(k,n,b,p,src,url,note)=>{if(!DB[b])return;DB[k]=Object.assign({},DB[b],{products:p,source:src,sourceUrl:url,auditStatus:"現行製剤確認済み",auditNote:note||""});add(k,n,DB[k]);};
const mk=(p,i,src,url)=>({products:p,indications:i,adult:null,source:src,sourceUrl:url,auditStatus:"承認用量確認済み"});
// Remove products confirmed non-current or wrong current strength.
["img02_05","img02_07"].forEach(k=>{delete DB[k];const o=S.querySelector('option[value="'+k+'"]');if(o)o.remove();});
// img02_07 was Tomiron 10%; current product is 20%.
alias("aud_tomiron20","トミロン細粒小児用20%","cefteram",{g:{label:"トミロン細粒小児用20%",unit:"g",mgPerUnit:200,defaultAmount:0.81}},"PMDA トミロン細粒小児用20%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132009C2023_2?user=1","10%製剤は薬価削除済み。現行20%へ修正。");
// Current erythromycin products.
alias("aud_eryDSW20","エリスロシンドライシロップW20%","ery",{g:{label:"エリスロシンDS W20%",unit:"g",mgPerUnit:200,defaultAmount:2.5}},"PMDA エリスロシンDS10%/W20%・W顆粒20%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6141001R1120_3?user=1");
alias("aud_eryGran20","エリスロシンW顆粒20%","ery",{g:{label:"エリスロシンW顆粒20%",unit:"g",mgPerUnit:200,defaultAmount:2.5}},"PMDA エリスロシンDS10%/W20%・W顆粒20%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6141001R1120_3?user=1");
// Current allergy formulations.
alias("aud_clemDS","クレマスチンドライシロップ0.1%","clem",{g:{label:"クレマスチンDS0.1%",unit:"g",mgPerUnit:1,defaultAmount:0.7}},"PMDA クレマスチンDS0.1%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008R1128_1?user=1");
if(DB.aud_polaramineS){
 add("aud_polaramineDS","ポララミンドライシロップ0.2%",Object.assign({},DB.aud_polaramineS,{products:{g:{label:"ポララミンDS0.2%",unit:"g",mgPerUnit:2,defaultAmount:0.6}},source:"PMDA ポララミンDS0.2%電子添文",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419002R1031_2?user=1"}));
}
add("aud_lindelonPow","リンデロン散0.1%",mk(
 {g:{label:"リンデロン散0.1%",unit:"g",mgPerUnit:1,defaultAmount:0.5}},
 {general:{label:"各種承認適応",lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"疾患・重症度で用量幅が大きく、年齢・症状により調節。単一小児mg/kg標準値では監査しない。"}},
 "PMDA リンデロン散0.1%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454004B1040_2?user=1"));
alias("aud_mediconPow","メジコン散10%","dext",{g:{label:"メジコン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.15}},"PMDA デキストロメトルファン散10%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
// Correct current fexofenadine DS is 5%, not NKdesk 6%.
alias("aud_fexoDS5","フェキソフェナジン塩酸塩DS5%","fexo",{g:{label:"フェキソフェナジン塩酸塩DS5%",unit:"g",mgPerUnit:50,defaultAmount:1.2}},"PMDA フェキソフェナジン塩酸塩DS5%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480235_4490023R2035_1_03","NKdesk記載6%ではなく、現行PMDAで5%製剤を確認。");
// Eye products omitted in prior pass.
add("aud_livostinEye","リボスチン点眼液0.025%",mk(
 {eye:{label:"リボスチン点眼液0.025%",unit:"回",mgPerUnit:1,defaultAmount:4}},
 {eye:{label:"アレルギー性結膜炎",lo:()=>4,hi:()=>4,freq:[4],desc:"1回1～2滴、1日4回を基本とする。"}},
 "PMDA リボスチン点眼液0.025%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319746Q1029_3_02"));
add("aud_alegysalEye","アレギサール点眼液0.1%",mk(
 {eye:{label:"アレギサール点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:2}},
 {eye:{label:"アレルギー性結膜炎／春季カタル",lo:()=>2,hi:()=>2,freq:[2],desc:"1回1滴、1日2回（朝、夕）。"}},
 "PMDA アレギサール点眼液0.1%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319735Q1071_1_09"));
add("aud_levofEye","クラビット点眼液0.5%",mk(
 {eye:{label:"クラビット点眼液0.5%",unit:"回",mgPerUnit:1,defaultAmount:3}},
 {eye:{label:"細菌性眼感染症",lo:()=>3,hi:()=>3,freq:[3],desc:"通常1回1滴、1日3回。症状により適宜増減。"}},
 "PMDA クラビット点眼液0.5%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319742Q1039_1?user=1"));
// Explicit obsolete-source-table entries: remove if any option was created elsewhere.
["パセトシン細粒10%","トミロン細粒小児用10%","フェキソフェナジンドライシロップ6%","ニフランシロップ1.5%","テルバンスドライシロップ20%","ベラチンドライシロップ小児用0.1%"].forEach(n=>[...S.options].filter(o=>o.textContent.includes(n)).forEach(o=>o.remove()));
const prevLoad=loadDrug;loadDrug=function(reset=true){prevLoad(reset);const k=$("drug").value;const M={aud_tomiron20:[3],aud_eryDSW20:[4,5,6],aud_eryGran20:[4,5,6],aud_clemDS:[2],aud_polaramineDS:[1,2,3,4],aud_lindelonPow:[1,2,3,4],aud_mediconPow:[1,2,3,4],aud_fexoDS5:[2],aud_livostinEye:[4],aud_alegysalEye:[2],aud_levofEye:[3]};if(M[k])$("freq").innerHTML=M[k].map(n=>'<option value="'+n+'">'+(n===1?'1回/分1':'分'+n)+'</option>').join("");render();};
})();