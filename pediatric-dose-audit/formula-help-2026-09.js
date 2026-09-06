// Tappable explanations for classic pediatric dose-conversion formulas.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined'||typeof render!=='function') return;
 const style=document.createElement("style");
 style.textContent=".formulaBtn{border:0;background:transparent;padding:0;color:#2f5d8a;text-decoration:underline;text-underline-offset:2px;font:inherit;font-weight:800;cursor:pointer}.formulaHelp{margin-top:8px;padding:10px;border:1px solid #dfe6ec;border-radius:9px;background:#fff;font-size:10px;line-height:1.7}.formulaHelp b{font-size:11px}";
 document.head.appendChild(style);

 const oldRender=render;
 render=function(){
   oldRender();
   const out=$("out"); if(!out)return;
   const table=[...out.querySelectorAll("table")].find(t=>t.textContent.includes("補助換算"));
   if(!table)return;
   const names=["Augsberger-II","Young","Clark","von Harnack","BSA / Mosteller"];
   const kinds=["aug","young","clark","von","bsa"];
   [...table.querySelectorAll("tbody tr")].forEach((tr,i)=>{
     if(!names[i])return;
     const td=tr.querySelector("td"); if(!td)return;
     td.innerHTML='<button type="button" class="formulaBtn" data-formula="'+kinds[i]+'">'+names[i]+' ⓘ</button>';
   });
   if(!out.querySelector("#formulaHelp")){
     const d=document.createElement("div");d.id="formulaHelp";d.className="formulaHelp";d.style.display="none";table.insertAdjacentElement("afterend",d);
   }
 };

 function coefVon(a){
   if(a<0.08)return .125;
   if(a<0.75)return .2;
   if(a<2)return .25;
   if(a<5)return 1/3;
   if(a<10)return .5;
   if(a<15)return 2/3;
   return 1;
 }
 function rng(lo,hi){
   const f=x=>Number.isFinite(x)?x.toFixed(1):"—";
   return Math.abs(lo-hi)<.01?f(lo):f(Math.min(lo,hi))+"～"+f(Math.max(lo,hi));
 }
 function explain(kind){
   const d=DB[$("drug").value]; if(!d||!Array.isArray(d.adult))return null;
   const a=+$("age").value,w=+$("wt").value,h=+$("ht").value,[lo,hi]=d.adult;
   const bsa=(h>0&&w>0)?Math.sqrt(h*w/3600):NaN;
   const adult=lo===hi?lo.toFixed(0)+" mg/day":lo.toFixed(0)+"～"+hi.toFixed(0)+" mg/day";
   let title,formula,basis,coef;
   if(kind==="aug"){title="Augsberger-II";formula="小児量 ＝ 成人量 × (4 × 年齢[歳] ＋ 20) ÷ 100";basis="年齢から成人量に対する割合を推定する古典的換算式。";coef=(4*a+20)/100;}
   if(kind==="young"){title="Young式";formula="小児量 ＝ 成人量 × 年齢 ÷ (年齢 ＋ 12)";basis="年齢比から成人量を按分する古典的換算式。";coef=a/(a+12);}
   if(kind==="clark"){title="Clark式";formula="小児量 ＝ 成人量 × 体重[kg] ÷ 68";basis="成人体重を約150 lb（約68 kg）として体重比で按分する方法。";coef=w/68;}
   if(kind==="von"){title="von Harnack式";formula="小児量 ＝ 成人量 × 年齢区分ごとの係数";basis="係数：1か月未満 1/8、1～8か月 1/5、9～23か月 1/4、2～4歳 1/3、5～9歳 1/2、10～14歳 2/3、15歳以上 1。";coef=coefVon(a);}
   if(kind==="bsa"){title="BSA / Mosteller";formula="BSA[m²] ＝ √(身長[cm] × 体重[kg] ÷ 3600)\n小児量 ＝ 成人量 × BSA ÷ 1.73";basis="体表面積を成人標準体表面積1.73m²と比較して按分する方法。BSA算出には複数の式があり、Du Bois式も広く用いられる。本ツールでは簡便なMosteller式を採用。";coef=Number.isFinite(bsa)?bsa/1.73:NaN;}
   const current=Number.isFinite(coef)
     ?(kind==="bsa"?"身長 "+h+"cm・体重 "+w+"kg → BSA "+bsa.toFixed(3)+"m²、係数 "+coef.toFixed(3)+"。":"年齢/体重条件から係数 "+coef.toFixed(3)+"。")
       +" 成人標準量 "+adult+" × "+coef.toFixed(3)+" ＝ "+rng(lo*coef,hi*coef)+" mg/day"
     :"身長・体重を入力すると計算します。";
   return {title,formula,basis,current};
 }

 document.addEventListener("click",e=>{
   const b=e.target.closest(".formulaBtn"); if(!b)return;
   const h=$("formulaHelp"),x=explain(b.dataset.formula); if(!h||!x)return;
   h.innerHTML="<b>"+x.title+"</b><br><b>計算式：</b>"+x.formula.replace(/\n/g,"<br>")+"<br><b>考え方：</b>"+x.basis+"<br><b>今回の計算：</b>"+x.current+'<br><span class="pill warn">承認小児用量の代わりではなく補助評価</span>';
   h.style.display="block";
 });
 render();
})();