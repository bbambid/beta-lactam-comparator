// PMDA final reconciliation — audit units 91–100 (2026-09-07).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};

 mark("aud_voltarenSupp","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1147700J1057_2?user=1","ボルタレンサポ12.5/25/50mg。小児1回0.5～1mg/kg、1日1～2回、少量から開始する承認記載を現行PMDAと再突合。");
 mark("aud_telemin2","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2359700J1088_3?user=1","テレミンソフト坐薬2mg。小児固定mg/kg量を自動生成せず、年齢・症状による適宜増減として区分を維持。");
 mark("aud_depakeneS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1139004Q1100_2?user=1","デパケンシロップ5%（50mg/mL）。承認1日量・分割と片頭痛発症抑制の上限を現行PMDAと再突合。");
 mark("aud_ataraxDS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019M1046_3?user=1","アタラックス-Pドライシロップ2.5%。成人量を年齢・症状で適宜増減する記載で、小児固定mg/kg承認量なしの区分を確認。");
 mark("aud_ataraxPow","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019B1037_3?user=1","アタラックス-P散10%。小児固定mg/kg承認量なしの区分と現行製剤を確認。");
 mark("aud_ataraxS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019Q1030_3?user=1","アタラックス-Pシロップ0.5%（5mg/mL）。小児固定mg/kg承認量なしの区分と濃度を確認。");
 mark("aud_flumEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1315704Q1115_1?user=1","フルメトロン点眼液0.1%。1回1～2滴、1日2～4回。2歳未満は慎重投与、臨床試験未実施の注意を確認。");
 mark("aud_patEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319752Q1024_2?user=1","パタノール点眼液0.1%。1回1～2滴、1日4回を現行PMDAと再突合。");
 mark("aud_alesionEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319762Q1028_1?user=1","アレジオン点眼液0.05%。1回1滴、1日4回。12歳未満の臨床試験未実施を確認。");
 mark("aud_alesionLX","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319762Q2024_1?user=1","アレジオンLX点眼液0.1%。1回1滴、1日2回（朝・夕）を現行PMDAと再突合。");
})();