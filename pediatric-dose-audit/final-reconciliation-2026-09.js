// Final 1:1 reconciliation + Asverin dual practical references, 2026-09-06.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 // Explicitly attach the hospital pediatric reference range to every tipepidine formulation.
 const asvKeys=["tipe","img02_27","imgF10","aud_asverinDS"];
 asvKeys.forEach(k=>{if(DB[k]){DB[k].practiceReferences=[
   {label:"実務目安（病院小児薬用量表）",dose:"1～2 mg/kg/day・分3",source:"神戸市立医療センター西市民病院 小児薬用量",quality:"病院薬剤部公開資料",url:"https://nmc.kcho.jp/data/media/nmc-kcho/page/department/pharmacy-2/d012bf25fc1fde449f128ef5e969ebe9.pdf"},
   {label:"実務目安（治療薬ハンドブック）",dose:"2 mg/kg/day・分3を目安",source:"治療薬ハンドブック（ユーザー提示）",quality:"標準的医薬品二次資料",url:""}
 ];DB[k].auditStatus="承認用量＋実務目安監査済み";}});
 // Remove explicitly reconciled obsolete/non-current source-table entries if any remain.
 const obsolete=["パセトシン細粒10%","トミロン細粒小児用10%","フェキソフェナジンドライシロップ6%","アレグラドライシロップ5%","アレジオンドライシロップ1%","セルシンシロップ0.1%","ジョサマイシン","リカマイシン","アクディーム","ノイチーム","エンテロノンR","フルナーゼ点鼻液25μg小児用"];
 [...$("drug").options].forEach(o=>{if(obsolete.some(x=>o.textContent.includes(x)))o.remove();});
 const prevRender=render;
 render=function(){
   prevRender(); const key=$("drug").value,d=DB[key],out=$("out"); if(!d||!out||!d.practiceReferences||["tipe","cypro"].includes(key))return;
   let h='<div class="note"><b>実務目安（承認用量とは別）：</b><br>';
   d.practiceReferences.forEach(r=>{h+='・'+r.dose+' — '+r.source+'［'+r.quality+'］'+(r.url?' <a href="'+r.url+'" target="_blank" rel="noopener">根拠 ↗</a>':'')+'<br>';});
   h+='</div>'; out.insertAdjacentHTML("beforeend",h);
 };
})();
