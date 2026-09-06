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

 // Clemastine: prior age-banded pediatric fixed doses were not PMDA-approved fixed pediatric doses.
 const clemDesc="通常、成人はクレマスチンとして2mg/dayを2回に分割。年齢・症状により適宜増減。小児の固定mg/kg・年齢別承認量は設定されていない。";
 referenceOnly("clem",clemDesc,[2]);
 referenceOnly("aud_clemDS",clemDesc,[2]);
 if(DB.aud_clemDS){DB.aud_clemDS.products={g:{label:"クレマスチンドライシロップ0.1%「あゆみ」",unit:"g",mgPerUnit:1,defaultAmount:2}};}
 mark("clem","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008R1128_1?user=1","旧登録の年齢別固定量を撤回。PMDAは成人2mg/day・分2を示し、年齢・症状で適宜増減。小児固定承認量なし。");
 mark("aud_clemDS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008R1128_1?user=1","クレマスチンDS0.1%は1g中クレマスチン1mg。小児固定承認量なしとして区分修正。");

 // Dextromethorphan tablets/powder: adult label only; do not fabricate pediatric fixed dose.
 const dextDesc="通常、成人はデキストロメトルファン臭化水素酸塩水和物として1回15～30mgを1日1～4回。年齢・症状により適宜増減。小児固定承認量はなく、小児等を対象とした臨床試験は実施されていない。";
 referenceOnly("aud_mediconPow",dextDesc,[1,2,3,4]);
 if(DB.aud_mediconPow){DB.aud_mediconPow.products={g:{label:"メジコン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.15}};}
 mark("aud_mediconPow","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2223001B1210_2?user=1","メジコン散10%（100mg/g）。小児固定承認量なし、小児臨床試験未実施を確認。");

 mark("aud_fexoDS5","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490023R2035_1?user=1","フェキソフェナジンDS5%（50mg/g）。6か月～2歳未満15mg/回、2～12歳未満30mg/回、12歳以上60mg/回を各1日2回。");
 mark("aud_saw10","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6131001C1210_2?user=1","サワシリン細粒10%（100mg/g）。小児20～40mg/kg/day・分3～4、最大90mg/kg/dayを確認。");
 mark("aud_unasin","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6131008C1033_3?user=1","ユナシン細粒小児用10%（100mg/g）。スルタミシリン15～30mg/kg/day・分3。30mg/kg/day超で下痢・軟便増加の注意も確認。");
})();