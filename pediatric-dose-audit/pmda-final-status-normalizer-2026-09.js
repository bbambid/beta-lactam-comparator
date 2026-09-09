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

// Canonical formulation groups + deduplicated search results, 2026-09-09.
// Keep source DB records intact; only the visible selector/search layer is consolidated.
(function(){
 if(typeof DB==="undefined"||typeof $==="undefined")return;
 const sel=$("drug"), product=$("product");
 if(!sel||!product)return;
 const norm=s=>String(s||"").normalize("NFKC").toLowerCase().replace(/[\s　・‐－ー%％()（）「」]/g,"");

 // Canonical product sets. These parent records retain the existing dosing/PMDA logic.
 if(DB.cam){
   DB.cam.products=Object.assign({},DB.cam.products||{}, {
     ds10:{label:"クラリスドライシロップ10%小児用",unit:"g",mgPerUnit:100,defaultAmount:2.7},
     tab50:{label:"クラリス錠50mg小児用",unit:"錠",mgPerUnit:50,defaultAmount:5}
   });
 }
 if(DB.proc){
   DB.proc.products={
     ds005:{label:"メプチンドライシロップ0.005%",unit:"g",mgPerUnit:0.05,defaultAmount:0.5},
     syrup5:{label:"メプチンシロップ5μg/mL",unit:"mL",mgPerUnit:0.005,defaultAmount:5},
     mini25:{label:"メプチンミニ錠25μg",unit:"錠",mgPerUnit:0.025,defaultAmount:1},
     tab50:{label:"メプチン錠50μg",unit:"錠",mgPerUnit:0.05,defaultAmount:1}
   };
 }
 // DB.pred is defined by steroid-master; preserve its audited values and labels.

 const GROUPS={
   cam:{canonical:"cam",tokens:["クラリス","クラリスロマイシン"],generic:"クラリスロマイシン",products:["ds10","tab50"]},
   proc:{canonical:"proc",tokens:["メプチン","プロカテロール"],generic:"プロカテロール",products:["ds005","syrup5","mini25","tab50"]},
   pred:{canonical:"pred",tokens:["プレドニゾロン","プレドニン"],generic:"プレドニゾロン",products:["pow1","tab5"]}
 };

 // Product-name-only records remain in DB for evidence/palatability linkage, but are removed
 // from the base selector so the same marketed formulation is not displayed twice.
 [...sel.options].forEach(o=>{
   const t=norm(o.textContent),v=o.value;
   const duplicate=(v!=="cam"&&t.includes(norm("クラリス")))||
                   (v!=="proc"&&t.includes(norm("メプチン")))||
                   (v!=="pred"&&(t.includes(norm("プレドニゾロン"))||t.includes(norm("プレドニン"))));
   if(duplicate)o.remove();
 });

 function matchingGroup(q){
   const nq=norm(q); if(nq.length<2)return null;
   return Object.values(GROUPS).find(g=>g.tokens.some(t=>norm(t).includes(nq)||nq.includes(norm(t))))||null;
 }
 function rowsFor(g){
   const d=DB[g.canonical]; if(!d)return [];
   const rows=[{label:g.generic,drug:g.canonical,product:null}];
   (g.products||[]).forEach(pk=>{const p=d.products&&d.products[pk];if(p)rows.push({label:p.label,drug:g.canonical,product:pk});});
   const seen=new Set();
   return rows.filter(r=>{const k=norm(r.label);if(seen.has(k))return false;seen.add(k);return true;});
 }
 function choose(row){
   sel.value=row.drug;
   sel.dispatchEvent(new Event("change",{bubbles:true}));
   if(row.product&&DB[row.drug]?.products?.[row.product]){
     product.value=row.product;
     product.dispatchEvent(new Event("change",{bubbles:true}));
   }
 }
 function install(){
   const inp=document.getElementById("drugSearch"),box=document.getElementById("drugSuggest");
   if(!inp||!box||inp.dataset.formulationGroups==="1")return;
   inp.dataset.formulationGroups="1";
   const renderGrouped=()=>{
     const g=matchingGroup(inp.value); if(!g)return;
     const rows=rowsFor(g);
     box.innerHTML=rows.map((r,i)=>'<button type="button" data-group-row="'+i+'" style="display:block;width:100%;border:0;border-bottom:1px solid #eef1f4;background:#fff;padding:9px;text-align:left;font-size:11px;cursor:pointer">'+r.label+'</button>').join("");
     box.style.display=rows.length?"block":"none";
     box._formulationRows=rows;
   };
   inp.addEventListener("input",()=>setTimeout(renderGrouped,0));
   box.addEventListener("click",e=>{
     const b=e.target.closest("[data-group-row]"); if(!b)return;
     e.preventDefault();e.stopImmediatePropagation();
     const row=(box._formulationRows||[])[+b.dataset.groupRow];if(!row)return;
     choose(row);inp.value=row.label;box.style.display="none";
   },true);
 }
 document.addEventListener("DOMContentLoaded",()=>setTimeout(install,0));
 setTimeout(install,0);
})();
