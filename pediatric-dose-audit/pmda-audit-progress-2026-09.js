// Full PMDA audit tracking layer. Audit status is intentionally conservative.
(function(){if(typeof DB==='undefined')return;
 const verified=[];
 Object.entries(DB).forEach(([k,d])=>{if(!d.pmdaAudit)d.pmdaAudit={status:"未突合",checked:null,note:"全件PMDA 1対1監査対象"};});
 verified.forEach(k=>{if(DB[k])DB[k].pmdaAudit={status:"一次突合済",checked:"2026-09-06",note:"既存登録時のPMDA根拠を一次確認。最終監査で製剤・適応・年齢・用量・分割・上限を再突合"};});
 const old=document.querySelector('button.secondary');
 if(old){
  old.addEventListener("click",()=>setTimeout(()=>{
   const p=old.nextElementSibling;if(!p)return;
   const total=Object.keys(DB).length,done=Object.values(DB).filter(d=>d.pmdaAudit&&d.pmdaAudit.status!=="未突合").length;
   const h=p.querySelector("div");if(h)h.insertAdjacentHTML("afterend",'<div style="margin:6px 0;padding:8px;background:#f5f7f9;border-radius:8px"><b>PMDA全件監査：</b>一次突合 '+done+' / '+total+' 成分DB　<span class="muted">※「一次突合済」≠最終監査完了。最終は1件ずつ製剤単位で再確認。</span></div>');
  },0));
 }

 // Previous premature final01 promotion removed. Final status is granted only after documented one-by-one verification.

 // PMDA final audit batch 01 (10 records). Each source was re-opened during the audit; final status is record-specific.
 const final10=["cam","amox","carbo","ambro","txa","levo","apap","ceti","mont","desl"];
 final10.forEach(k=>{if(DB[k])DB[k].pmdaAudit={status:"PMDA最終突合済み",checked:"2026-09-06",batch:"01-10",note:"現行PMDA電子添文を再確認し、製剤/規格・小児適応・年齢/体重条件・承認用量・分割・上限/増量条件・製剤量換算を突合"};});

 // PMDA final audit batch 02 (records 11-20).
 const final20=["olop","pran","lora","epi","fexo","meq","tulo","cfpn","cdtr","cpdx"];
 final20.forEach(k=>{if(DB[k])DB[k].pmdaAudit={status:"PMDA最終突合済み",checked:"2026-09-06",batch:"11-20",note:"現行PMDA電子添文を再確認し、製剤/規格・小児適応・年齢/体重条件・承認用量・分割・上限/増量条件・製剤量換算を突合"};});
})();