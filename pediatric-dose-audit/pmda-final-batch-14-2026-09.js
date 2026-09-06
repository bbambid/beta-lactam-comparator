// PMDA final reconciliation — audit units 131–138 (2026-09-07). Final batch.
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};

 mark("aud_tebi","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139002C1026_1?user=1","オラペネム小児用細粒10%。一般名テビペネム ピボキシル。2026年6月30日改訂の現行PMDA製品ページで製剤・承認用量ロジックを再確認。");
 mark("aud_acy80","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6250002R1056_1?user=1","アシクロビルDS80%。2026年2月10日改訂。小児の適応別20mg/kg/回と1回上限を既存監査済みロジックと再突合。");
 mark("aud_zovi40","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6250002D1024_1?user=1","ゾビラックス顆粒40%。2026年2月10日改訂。アシクロビル400mg/g、適応別小児用量・1回上限を再突合。");
 mark("aud_vala","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6250019D1020_1?user=1","バルトレックス顆粒50%。2026年2月10日改訂。小児25mg/kg/回を1日3回、1回1000mg上限の既存ロジックと再突合。");
 mark("aud_tamiflu","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6250021R1024_1?user=1","タミフルドライシロップ3%。治療・予防、1歳未満/以上の用量区分と1回75mg上限を既存監査済みロジックと再突合。");
 mark("aud_claritin","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490027R1029_4?user=1","クラリチンドライシロップ1%。一般名ロラタジン。小児3歳以上7歳未満5mg、7歳以上10mgを1日1回の既存ロジックと現行PMDAで再突合。");
 mark("aud_cetiTakata","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490020R1035_1?user=1","セチリジン塩酸塩DS1.25%「タカタ」。2～7歳未満2.5mg/回、7～15歳未満5mg/回、各1日2回を現行PMDAと再突合。");
 mark("aud_kipres","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490026C1021_2?user=1","キプレス細粒4mg。1歳以上6歳未満の小児気管支喘息に1回4mgを1日1回、就寝前の承認用量を現行PMDAと再突合。");

 window.PMDA_FINAL_PROGRESS={done:139,total:139,status:"完了",date:"2026-09-07"};
})();