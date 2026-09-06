// PMDA final reconciliation — audit units 101–110 (2026-09-07).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};

 mark("aud_ketasEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319741Q1050_3?user=1","ケタス点眼液0.01%。イブジラスト0.1mg/mL、通常1回1～2滴・1日4回（朝、昼、夕方、就寝前）。小児等の臨床試験未実施も確認。");
 mark("aud_tosEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319751Q1020_3?user=1","オゼックス点眼液0.3%。成人及び小児1回1滴・1日3回、疾患・症状により適宜増量。2026年8月更新版を確認。");
 mark("aud_ofloxEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319722Q1163_1?user=1","タリビッド点眼液0.3%。通常1回1滴・1日3回、症状により適宜増減を現行PMDAと突合。");
 mark("aud_aziEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1317714Q1024_1?user=1","アジマイシン点眼液1%。結膜炎は成人及び7歳以上小児で1回1滴、1日2回を2日→1日1回を5日。眼瞼炎・麦粒腫・涙嚢炎の承認用量は成人のみ。");
 mark("aud_protopic03","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2699709M2024_3?user=1","プロトピック軟膏0.03%小児用。2歳以上、通常1日1～2回適量。1回上限は2～5歳1g、6～12歳2～4g、13歳以上5gを確認。");
 mark("aud_corectim025","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2699714M1029_2?user=1","コレクチム軟膏0.25%。小児0.25%を1日2回適量、症状に応じ0.5%可。1回5gまで、体表面積30%までを目安。");
 mark("aud_moizerto03","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2699715M1023_1?user=1","モイゼルト軟膏0.3%。小児0.3%を1日2回適量、症状に応じ1%可。1回塗布量0.1m²あたり1g目安。");
 mark("aud_polaramineDS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419002R1031_2?user=1","ポララミンドライシロップ0.2%。d-クロルフェニラミン2mg/g。承認用量は通常成人1回2mgを1日1～4回、年齢・症状で適宜増減。小児固定mg/kg承認量はない。");
 mark("beta","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454004B1040_2?user=1","ベタメタゾン（リンデロン錠0.5mg／散0.1%／シロップ0.01%）2026年3月版。錠・散は成人0.5～8mg/day・分1～4、小児固定量なし。シロップは小児0.15～4mg/day・分1～4。一般名親レコードへ統合。");
 mark("aud_livostinEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319746Q1029_3?user=1","リボスチン点眼液0.025%。レボカバスチンとして0.25mg/mL、1回1～2滴を1日4回（朝、昼、夕方、就寝前）。");
})();