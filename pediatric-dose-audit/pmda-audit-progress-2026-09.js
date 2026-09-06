// Full PMDA audit tracking layer. Audit status is intentionally conservative.
(function(){if(typeof DB==='undefined')return;
 const verified=[];
 Object.entries(DB).forEach(([k,d])=>{if(!d.pmdaAudit)d.pmdaAudit={status:"未突合",checked:null,note:"全件PMDA 1対1監査対象"};});
 verified.forEach(k=>{if(DB[k])DB[k].pmdaAudit={status:"一次突合済",checked:"2026-09-06",note:"既存登録時のPMDA根拠を一次確認。最終監査で製剤・適応・年齢・用量・分割・上限を再突合"};});
 const old=document.querySelector('button.secondary');
 if(old){
  old.addEventListener("click",()=>setTimeout(()=>{
   const p=old.nextElementSibling;if(!p)return;
   const totalRecords=Object.keys(DB).length;
   const prog=window.PMDA_FINAL_PROGRESS||{done:131,total:139,status:"進行中"};
   const h=p.querySelector("div");
   const oldBox=p.querySelector(".pmdaProgressBox"); if(oldBox)oldBox.remove();
   if(h)h.insertAdjacentHTML("afterend",'<div class="pmdaProgressBox" style="margin:6px 0;padding:9px;background:#f5f7f9;border-radius:8px"><b>PMDA最終突合：</b>'+prog.done+' / '+prog.total+' 監査単位（'+prog.status+'）<br><span class="muted">現在のDBレコード数：'+totalRecords+'。製剤・商品名別の別レコードを含むため、監査単位の母数とは一致しません。</span></div>');
  },0));
 }

 // Previous premature final01 promotion removed. Final status is granted only after documented one-by-one verification.

 // Final status is assigned only by a documented pmda-final-batch-*.js file.
 // Earlier blanket promotions for records 1-30 were removed because they did not
 // retain record-level source URLs and comparison notes.
})();
