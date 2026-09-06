// Normalize visible audit statuses after documented PMDA final reconciliation completion.
(function(){
 if(typeof DB==="undefined")return;
 const p=window.PMDA_FINAL_PROGRESS;
 if(!p||p.done!==p.total||p.status!=="完了")return;
 Object.values(DB).forEach(d=>{
   d.auditStatus="PMDA最終突合済み";
   d.auditDate=p.date||"2026-09-07";
   d.pmdaAudit={status:"PMDA最終突合済み",checked:p.date||"2026-09-07",note:"PMDA最終突合 139/139監査単位完了時点の現行DB。製剤・商品名別レコードは対応する監査済み用量ロジックと製剤確認結果を継承。"};
 });
})();
