// Cephalexin brand/formulation reconciliation: Keflex vs Larixin.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined'||!DB.cephalex)return;
 const S=$("drug"), add=(k,n,mg,note)=>{
   DB[k]=Object.assign({},DB.cephalex,{
     products:{g:{label:n,unit:"g",mgPerUnit:mg,defaultAmount:mg===100?4.5:2.25}},
     source:"厚生労働省 薬価基準収載品目／セファレキシン電子添文",
     sourceUrl:"https://www.mhlw.go.jp/topics/2025/04/dl/tp20250716-01_01.pdf",
     auditStatus:"現行収載確認済み",
     auditNote:note
   });
   if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}
 };
 add("larixin10","ラリキシンドライシロップ小児用10%",100,"セファレキシン100mg/g。ケフレックスとは別の商品名・製剤だが同一有効成分。");
 add("larixin20","ラリキシンドライシロップ小児用20%",200,"セファレキシン200mg/g。ケフレックスとは別の商品名・製剤だが同一有効成分。");

 // Enrich aliases used by the search layer so generic and brand searches both hit.
 const aliases={
   cephalex:["セファレキシン","ケフレックス","keflex","cephalexin"],
   aud_cephalex100:["セファレキシン","ケフレックス","ケフレックスシロップ用細粒100","keflex","cephalexin"],
   aud_cephalex200:["セファレキシン","ケフレックス","ケフレックスシロップ用細粒200","keflex","cephalexin"],
   larixin10:["セファレキシン","ラリキシン","ラリキシンドライシロップ","ラリキシンドライシロップ小児用10%","larixin","cephalexin"],
   larixin20:["セファレキシン","ラリキシン","ラリキシンドライシロップ","ラリキシンドライシロップ小児用20%","larixin","cephalexin"]
 };
 Object.keys(aliases).forEach(k=>{if(DB[k])DB[k].searchAliases=aliases[k];});

 // Search UI was loaded before this file; patch its datalist/input matcher without replacing existing behavior.
 const input=document.getElementById("drugSearch");
 if(input){
   const old=input.oninput;
   input.oninput=function(e){
     if(typeof old==="function")old.call(this,e);
     const q=(this.value||"").trim().toLowerCase();
     if(!q)return;
     const hit=Object.keys(aliases).find(k=>aliases[k].some(a=>a.toLowerCase().includes(q)) && DB[k]);
     if(hit && (q.includes("ラリキシ")||q==="larixin")){S.value=hit;loadDrug(true);}
   };
 }
})();