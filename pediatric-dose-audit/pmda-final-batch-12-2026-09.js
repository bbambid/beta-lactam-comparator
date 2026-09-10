// PMDA final reconciliation — audit units 111–120 (2026-09-07).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};
 const referenceOnly=(k,desc,freq=[1,2,3,4])=>{if(!DB[k])return;DB[k].indications={general:{label:"承認適応",lo:()=>NaN,hi:()=>NaN,freq,referenceOnly:true,desc}};};

 mark("aud_alegysalEye","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319735Q1071_1_09","アレギサール点眼液0.1%。通常1回1滴、1日2回（朝・夕）。低出生体重児・新生児・乳児の臨床試験未実施を確認。");
 mark("aud_levofEye","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319742Q1039_1_14","クラビット点眼液0.5%。通常1回1滴、1日3回。症状により適宜増減。");
 if(DB.aud_tomiron20)DB.aud_tomiron20.indications={general:{label:"小児の承認感染症",lo:w=>9*w,hi:w=>18*w,freq:[3],desc:"セフテラム ピボキシルとして9～18mg/kg/dayを3回に分割して経口投与。年齢・症状により適宜増減"}};
 mark("aud_tomiron20","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132009C2023_2?user=1","トミロン細粒小児用20%（200mg/g）。小児9～18mg/kg/day・分3を現行PMDA 2026年6月版で再突合。");
 mark("aud_eryDSW20","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6141001R1120_3?user=1","エリスロシンドライシロップW20%。200mg/g。小児25～50mg/kg/dayを4～6回に分割、成人量を上限。2026年7月版を確認。");
 mark("aud_eryGran20","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6141001R1120_3?user=1","エリスロシンW顆粒20%。200mg/g。小児25～50mg/kg/dayを4～6回に分割、成人量を上限。2026年7月版を確認。");

 // Clemastine syrup has an approved age-banded standard daily volume for children.
 const clemDesc="幼小児の標準1日量（シロップ0.01%）：1歳以上3歳未満4mL、3歳以上5歳未満5mL、5歳以上8歳未満7mL、8歳以上11歳未満10mL、11歳以上15歳未満13mL。1歳未満は体重・症状などを考慮して適宜投与量を決める。";
 const clemInd={general:{label:"アレルギー性鼻炎／皮膚疾患／上気道炎症状",lo:(w,a)=>a<1?NaN:a<3?0.4:a<5?0.5:a<8?0.7:a<11?1:a<15?1.3:2,hi:(w,a)=>a<1?NaN:a<3?0.4:a<5?0.5:a<8?0.7:a<11?1:a<15?1.3:2,freq:[2],desc:clemDesc}};
 if(DB.clem)DB.clem.indications=clemInd;
 if(DB.aud_clemDS){DB.aud_clemDS.indications=clemInd;DB.aud_clemDS.products={g:{label:"クレマスチンドライシロップ0.1%「あゆみ」",unit:"g",mgPerUnit:1,defaultAmount:0.7}};}
 mark("clem","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008Q1157_1?user=1","シロップ0.01%の幼小児年齢別標準1日量と1歳未満の個別調整を反映。");
 mark("aud_clemDS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008R1128_1?user=1","クレマスチンDS0.1%は1g中クレマスチン1mg。シロップと同一成分の剤形違いとして統合。");

 // Dextromethorphan tablets/powder: adult label only; do not fabricate pediatric fixed dose.
 const dextDesc="通常、成人はデキストロメトルファン臭化水素酸塩水和物として1回15～30mgを1日1～4回。年齢・症状により適宜増減。小児固定承認量はなく、小児等を対象とした臨床試験は実施されていない。";
 referenceOnly("aud_mediconPow",dextDesc,[1,2,3,4]);
 if(DB.aud_mediconPow){DB.aud_mediconPow.products={g:{label:"メジコン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.15}};}
 mark("aud_mediconPow","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2223001B1210_2?user=1","メジコン散10%（100mg/g）。小児固定承認量なし、小児臨床試験未実施を確認。");

 mark("aud_fexoDS5","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490023R2035_1?user=1","フェキソフェナジンDS5%（50mg/g）。6か月～2歳未満15mg/回、2～12歳未満30mg/回、12歳以上60mg/回を各1日2回。");
 mark("aud_saw10","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6131001C1210_2?user=1","サワシリン細粒10%（100mg/g）。小児20～40mg/kg/day・分3～4、最大90mg/kg/dayを確認。");
 mark("aud_unasin","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6131008C1033_3?user=1","ユナシン細粒小児用10%（100mg/g）。スルタミシリン15～30mg/kg/day・分3。30mg/kg/day超で下痢・軟便増加の注意も確認。");
})();
