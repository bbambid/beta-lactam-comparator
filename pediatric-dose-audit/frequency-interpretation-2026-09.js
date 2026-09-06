// Flexible prescribed frequency + interpretation of daily-dose vs per-dose design.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined'||typeof render!=='function')return;
 const ensureFreq=()=>{
   const s=$("freq"),cur=s.value||"3";
   [1,2,3,4,5,6].forEach(n=>{if(!s.querySelector('option[value="'+n+'"]')){const o=document.createElement("option");o.value=n;o.textContent=n===1?"分1":"分"+n;s.appendChild(o);}});
   s.value=cur;
 };
 ensureFreq();

 const oldLoad=loadDrug;
 loadDrug=function(reset=true){
   oldLoad(reset);
   const cur=$("freq").value;
   [1,2,3,4,5,6].forEach(n=>{if(!$("freq").querySelector('option[value="'+n+'"]')){const o=document.createElement("option");o.value=n;o.textContent=n===1?"分1":"分"+n;$("freq").appendChild(o);}});
   if(cur && $("freq").querySelector('option[value="'+cur+'"]'))$("freq").value=cur;
   render();
 };

 const oldRender=render;
 render=function(){
   oldRender();
   const out=$("out"),d=DB[$("drug").value],ii=d&&d.indications[$("ind").value],p=d&&d.products[$("product").value];
   if(!out||!d||!ii||!p)return;
   const w=+$("wt").value,a=+$("age").value,q=+$("amount").value,f=+$("freq").value,mg=q*p.mgPerUnit;
   const allowed=ii.freqByAge?ii.freqByAge(a):(ii.freq||[]);
   if(!allowed.length)return;
   const lo=ii.lo(w,a),hi=ii.hi(w,a);
   if(!Number.isFinite(lo)||!Number.isFinite(hi))return;
   const stdF=allowed.includes(3)?3:allowed[0];
   const stdDaily=(lo+hi)/2;
   const prescribedPer=mg/f;
   const stdPer=stdDaily/stdF;
   const dailyPct=stdDaily>0?mg/stdDaily*100:NaN;
   const perPct=stdPer>0?prescribedPer/stdPer*100:NaN;
   let interp="";
   const freqOff=!allowed.includes(f);
   if(freqOff){
     if(Math.abs(dailyPct-100)<=15 && f<stdF) interp="1日量は標準量をほぼ維持したまま、投与回数を"+(stdF===1?"1回":"分"+stdF)+"→"+(f===1?"分1":"分"+f)+"へ減らした処方です。そのため1回量は標準設計の約"+Math.round(perPct)+"%。";
     else if(Math.abs(perPct-100)<=15 && f<stdF) interp="1回量は標準設計とほぼ同じまま、投与回数を"+(stdF===1?"1回":"分"+stdF)+"→"+(f===1?"分1":"分"+f)+"へ減らした処方です。1日量は標準量の約"+Math.round(dailyPct)+"%。";
     else interp="承認上の分割回数とは異なります。1日量は標準量の約"+Math.round(dailyPct)+"%、1回量は標準設計の約"+Math.round(perPct)+"%です。";
   }else{
     interp="分割回数は承認用法の範囲内。1日量は標準量の約"+Math.round(dailyPct)+"%、1回量は基準分割（"+(stdF===1?"分1":"分"+stdF)+"）でみた標準設計の約"+Math.round(perPct)+"%。";
   }
   const div=document.createElement("div");
   div.className="note";div.style.cssText="margin-top:8px;padding:9px;border:1px solid #e2e8f0;border-radius:8px;background:#fff";
   div.innerHTML='<b>処方設計の解釈：</b>'+interp+(freqOff?'<br><span class="pill warn">分割は承認用法外／適宜増減とは別に確認</span>':'');
   const nums=out.querySelector(".nums"); if(nums)nums.insertAdjacentElement("afterend",div); else out.appendChild(div);
 };
 render();
})();