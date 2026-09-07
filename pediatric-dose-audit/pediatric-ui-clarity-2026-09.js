// Clear approved-dose basis + kana-friendly search + flexible prescribed frequency.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const kana=s=>String(s||"").replace(/[ァ-ン]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0x60));
 const inp=$("drugSearch"),sel=$("drug");
 if(inp){
  const old=inp.oninput;
  inp.addEventListener("input",function(){
   const q=kana(this.value.normalize("NFKC").toLowerCase()).replace(/[\s　・‐－ー%％()（）「」]/g,"");
   if(q.length<2)return;
   const opts=[...sel.options];
   const hit=opts.filter(o=>{
    const d=DB[o.value],texts=[o.textContent];
    if(d&&d.searchAliases)texts.push(...d.searchAliases);
    if(d&&d.products)Object.values(d.products).forEach(p=>texts.push(p.label));
    return kana(texts.join(" ").normalize("NFKC").toLowerCase()).replace(/[\s　・‐－ー%％()（）「」]/g,"").includes(q);
   }).slice(0,12);
   const box=$("drugSuggest");
   if(hit.length&&box){
    box.innerHTML=hit.map(o=>'<button type="button" data-v="'+o.value+'" style="display:block;width:100%;border:0;border-bottom:1px solid #eef1f4;background:#fff;padding:9px;text-align:left;font-size:11px;cursor:pointer">'+o.textContent+'</button>').join("");
    box.style.display="block";
   }
  });
 }
 // Add kana aliases to common brands.
 const aa={cpdx:["バナン","ばなん"],cfpn:["フロモックス","ふろもっくす"],cdtr:["メイアクト","めいあくと"],cfdn:["セフゾン","せふぞん"],ccr:["ケフラール","けふらーる"],cam:["クラリス","くらりす"],amox:["サワシリン","さわしりん"],carbo:["ムコダイン","むこだいん"],ambro:["ムコソルバン","むこそるばん"],domp:["ナウゼリン","なうぜりん"]};
 Object.keys(aa).forEach(k=>{if(DB[k])DB[k].searchAliases=(DB[k].searchAliases||[]).concat(aa[k]);});
 // Prescribed frequency should not be restricted by approved frequency.
 const freq=$("freq");
 if(freq){[1,2,3,4,5,6].forEach(n=>{if(!freq.querySelector('option[value="'+n+'"]')){let o=document.createElement("option");o.value=n;o.textContent="分"+n;freq.appendChild(o);}});}
 // Render an explicit approved-dose calculation basis before auxiliary formula table.
 if(typeof render==="function"){
  const oldRender=render;
  render=function(){
   oldRender();
   const out=$("out"),d=DB[sel.value],ii=d&&d.indications[$("ind").value],p=d&&d.products[$("product").value];
   if(!out||!d||!ii||!p)return;
   if(out.querySelector(".dose-comparison-card"))return;
   const w=+$("wt").value,a=+$("age").value,f=+$("freq").value,q=+$("amount").value,mg=q*p.mgPerUnit;
   const lo=ii.lo(w,a),hi=ii.hi(w,a),allowed=ii.freqByAge?ii.freqByAge(a):(ii.freq||[]);
   const box=document.createElement("div");box.style.cssText="margin:10px 0;padding:12px;border:1px solid #cfdbe7;border-radius:10px;background:#fff";
   let calc=ii.desc||"承認用法・用量に基づく";
   let math=Number.isFinite(lo)&&Number.isFinite(hi)?("体重 "+w+" kg → 承認1日量 "+(Math.abs(lo-hi)<.01?lo.toFixed(1):lo.toFixed(1)+"～"+hi.toFixed(1))+" mg/day"):"年齢・適応条件から承認量を判定";
   if(Number.isFinite(lo)&&Number.isFinite(hi)&&w>0)math+="（"+(lo/w).toFixed(1)+(Math.abs(lo-hi)<.01?"":"～"+(hi/w).toFixed(1))+" mg/kg/day）";
   const freqText=allowed.length?allowed.map(x=>"分"+x).join(" または "):"個別確認";
   box.innerHTML='<div style="font-size:12px;font-weight:900;margin-bottom:5px">承認用法・用量 ─ 判定の根拠</div><div><b>基準：</b>'+calc+'</div><div><b>今回の患者：</b>'+math+'</div><div><b>承認上の分割：</b>'+freqText+'　／　<b>入力処方：</b>分'+f+'</div><div><b>入力処方量：</b>'+q+' '+p.unit+'/day ＝ '+mg.toFixed(1)+' mg/day（'+(w?mg/w:0).toFixed(1)+' mg/kg/day）</div>';
   const hero=out.querySelector(".hero"); if(hero)hero.insertAdjacentElement("afterend",box); else out.prepend(box);
  };
  render();
 }
})();
