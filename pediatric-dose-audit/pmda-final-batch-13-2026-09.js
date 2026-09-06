// PMDA final reconciliation — audit units 121–130 (2026-09-07).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};

 mark("aud_cefrox","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132006R1093","オラスポア小児用DS10%。セフロキサジン30mg/kg/day・分3、症状により適宜増減。");
 mark("aud_fungizone","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266173001Q1047","ファンギゾンシロップ100mg/mL。小児1回0.5～1mL（50～100mg）を1日2～4回、食後。");
 mark("aud_pontal","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261141005Q1050","ポンタールシロップ3.25%。小児1回0.2mL/kg（メフェナム酸6.5mg/kg）、原則1日2回まで、空腹時を避ける。");
 mark("aud_k2","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530258_3160002Q1040_3_02","ケイツーシロップ0.2%。新生児出血症等の治療は2mg/day、症状により6mg/dayまで。予防は1回2mgを規定スケジュールで投与。");
 mark("aud_hemangiol","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%262900003Q1029","ヘマンジオルシロップ小児用0.375%。1mg/kg/day・分2開始、2日以上あけて増量し3mg/kg/day・分2維持。");
 mark("aud_polaramineS","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/","ポララミンシロップ0.04%。承認は成人1回2mg・1日1～4回、年齢・症状で適宜増減。小児固定mg/kg承認量なし。");
 mark("aud_cefaclor100","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132005C1053","ケフラール細粒小児用100mg（100mg/g）。現行製剤濃度と小児承認量を再突合。");
 mark("aud_cephalex100","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132002R1141","ケフレックスシロップ用細粒100（100mg/g）。現行製剤濃度と小児承認量を再突合。");
 mark("aud_cephalex200","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/","ケフレックスシロップ用細粒200（200mg/g）。現行製剤濃度と小児承認量を再突合。");
 mark("aud_faro","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/","ファロムドライシロップ小児用10%（100mg/g）。現行製剤と小児承認量を再突合。");
})();