// Kampo formulation unification + low-priority topical hiding, 2026-09-09.
(function(){
 if(typeof DB==='undefined')return;
 const sel=document.getElementById('drug'), product=document.getElementById('product');
 if(!sel||!product)return;

 // Hide heparinoid/Hirudoid from picker/search surface only; keep DB records intact.
 [...sel.options].forEach(o=>{
   const t=String(o.textContent||'');
   const aliases=(DB[o.value]?.searchAliases||[]).join(' ');
   if(/ヒルドイド|ヘパリン類似物質/.test(t+' '+aliases))o.remove();
 });

 // Preserve original audited/reference records as the source of each adult-standard Kampo type.
 const source={
   k75:DB.kampo75,
   k90:DB.kampo90,
   k180:DB.kampo180
 };
 if(!source.k75||!source.k90)return;

 // 15 g/day type: Tsumura Shokenchuto / Daikenchuto are current 15 g/day products.
 // Pediatric value below follows this tool's existing adult-standard/50 kg proportional reference layer,
 // not an approved pediatric dose.
 if(!DB.kampo150){
   DB.kampo150={
     referenceOnly:true,
     products:{gran:{label:'ツムラ成人標準1日量 15.0gタイプ',unit:'g',mgPerUnit:1000,defaultAmount:5.4}},
     indications:{general:{label:'小児量の参考換算',lo:w=>300*w,hi:w=>300*w,freq:[2,3],desc:'ツムラ医療用漢方の成人標準1日量15.0gタイプ。成人標準量÷50kgの同じ比例換算では0.30g/kg/day（参考）'}},
     adult:[15000,15000],
     source:'ツムラ医療用漢方製剤の分包と用量について（15.0g/日：小建中湯・大建中湯）',
     sourceUrl:'https://medical.tsumura.co.jp/sites/default/files/resources/pdf/support/press/shidosen/material-fukuyaku10.pdf'
   };
 }
 source.k150=DB.kampo150;

 const configs={
   k75:{label:'成人標準 7.5g/日',src:source.k75},
   k90:{label:'成人標準 9.0g/日',src:source.k90},
   k150:{label:'成人標準 15.0g/日（小建中湯／大建中湯）',src:source.k150},
   k180:{label:'成人標準 18.0g/日（黄耆建中湯）',src:source.k180}
 };
 if(!configs.k180.src)delete configs.k180;

 const canonical=source.k75;
 const original75Product=Object.values(source.k75.products||{})[0]||{unit:'g',mgPerUnit:1000,defaultAmount:2.7};
 canonical.products={};
 Object.entries(configs).forEach(([pk,c])=>{
   const p=Object.values(c.src.products||{})[0]||original75Product;
   canonical.products[pk]={label:c.label,unit:p.unit||'g',mgPerUnit:p.mgPerUnit||1000,defaultAmount:p.defaultAmount,_kampoConfig:pk};
 });

 function applyConfig(pk){
   const c=configs[pk]||configs.k75;
   const s=c.src;
   canonical.indications=s.indications;
   canonical.adult=s.adult;
   canonical.source=s.source;
   canonical.sourceUrl=s.sourceUrl;
   canonical.labelUrl=s.labelUrl;
   canonical.referenceOnly=true;
 }
 applyConfig('k75');

 // One visible Kampo parent in the drug list; all adult-standard types live under formulation/specification.
 const parent=sel.querySelector('option[value="kampo75"]');
 if(parent)parent.textContent='ツムラ医療用漢方';
 ['kampo90','kampo180','kampo150'].forEach(k=>sel.querySelector('option[value="'+k+'"]')?.remove());

 document.addEventListener('change',e=>{
   if(e.target!==product||sel.value!=='kampo75')return;
   const pk=product.value;
   if(!configs[pk])return;
   applyConfig(pk);
 },true);

 // Override Kampo search rows after the older global-search renderer to avoid 7.5/9 g duplicate rows.
 function installSearchOverride(){
   const inp=document.getElementById('drugSearch'),box=document.getElementById('drugSuggest');
   if(!inp||!box||inp.dataset.kampoOverride==='1')return;
   inp.dataset.kampoOverride='1';
   const norm=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/[\s　・‐－ー%％()（）「」\[\]【】]/g,'');
   const render=()=>{
     const raw=inp.value||'',q=norm(raw);
     if(/ヒルドイド|ヘパリン類似物質/.test(raw)){
       box.innerHTML='';box.style.display='none';return;
     }
     const tokens=['漢方','ツムラ','7.5','9.0','15.0','18.0','小建中湯','大建中湯','黄耆建中湯'];
     if(!tokens.some(t=>norm(t).includes(q)||q.includes(norm(t))))return;
     const rows=Object.entries(configs).map(([pk,c])=>({pk,label:c.label}));
     box.innerHTML=rows.map((r,i)=>'<button type="button" data-kampo-row="'+i+'" style="display:block;width:100%;border:0;border-bottom:1px solid #eef1f4;background:#fff;padding:9px;text-align:left;font-size:11px;cursor:pointer">'+r.label+'</button>').join('');
     box._kampoRows=rows;box.style.display='block';
   };
   inp.addEventListener('input',()=>setTimeout(render,12));
   box.addEventListener('click',e=>{
     const b=e.target.closest('[data-kampo-row]');if(!b)return;
     e.preventDefault();e.stopImmediatePropagation();
     const r=(box._kampoRows||[])[+b.dataset.kampoRow];if(!r)return;
     sel.value='kampo75';applyConfig(r.pk);
     if(typeof loadDrug==='function')loadDrug(false);else sel.dispatchEvent(new Event('change',{bubbles:true}));
     setTimeout(()=>{product.value=r.pk;product.dispatchEvent(new Event('change',{bubbles:true}));inp.value=r.label;box.style.display='none';},0);
   },true);
 }
 document.addEventListener('DOMContentLoaded',()=>setTimeout(installSearchOverride,30));
 setTimeout(installSearchOverride,60);
})();
