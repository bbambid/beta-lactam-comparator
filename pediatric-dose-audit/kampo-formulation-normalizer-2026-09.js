// Kampo formulation unification + low-priority topical hiding + stacked dual pediatric references, 2026-09-09.
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

 let activeConfig='k75';
 function applyConfig(pk){
   const c=configs[pk]||configs.k75;
   activeConfig=configs[pk]?pk:'k75';
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
   setTimeout(augmentKampoResult,0);
 },true);

 // Add two main pediatric reference doses to the Kampo judgment card:
 // ① Tsumura-linked weight proportional reference already used by this tool.
 // ② Augsberger (2 years and older): adult dose × ((age × 4 + 20) / 100).
 // These are reference estimates, not approved pediatric doses.
 function fmt(v,d=2){return Number.isFinite(v)?Number(v.toFixed(d)).toString():'—';}
 function augmentKampoResult(){
   if(sel.value!=='kampo75')return;
   const out=document.getElementById('out');
   const age=Number(document.getElementById('age')?.value);
   const amount=Number(document.getElementById('amount')?.value);
   if(!out||!Number.isFinite(age))return;
   const card=out.querySelector('.dose-comparison-card');
   if(!card)return;

   // Re-running after any calculation should not duplicate the block.
   card.querySelectorAll('.kampo-augsberger-box,.kampo-dual-note,.kampo-reference-yellow-2').forEach(n=>n.remove());

   const cfg=configs[product.value]||configs[activeConfig]||configs.k75;
   const adultMg=Number(cfg?.src?.adult?.[0]);
   const adultG=Number.isFinite(adultMg)?adultMg/1000:NaN;
   const augsG=(age>=2&&Number.isFinite(adultG))?adultG*((age*4+20)/100):NaN;
   const diff=(Number.isFinite(augsG)&&Number.isFinite(amount))?amount-augsG:NaN;

   // Make the upper Kampo reference card scannable: adult standard and g/kg/day are the visual anchors.
   const rateByConfig={k75:0.15,k90:0.18,k150:0.30,k180:0.36};
   const rate=rateByConfig[product.value]??rateByConfig[activeConfig]??0.15;
   const referencePanel=[...card.querySelectorAll('.dose-label-card,.dose-inner-card,.dose-reference-panel,.reference-panel,.dose-panel')].find(n=>/漢方の小児参考量/.test(n.textContent||''));
   if(referencePanel){
     const wt=Number(document.getElementById('wt')?.value);
     const daily1=Number.isFinite(wt)?rate*wt:NaN;
     const rate2=(Number.isFinite(augsG)&&Number.isFinite(wt)&&wt>0)?augsG/wt:NaN;

     const heading=referencePanel.querySelector('.dose-panel-title,.reference-title,h3,h4');
     if(heading)heading.textContent='漢方の小児参考量①';

     const main1=referencePanel.querySelector('.dose-label-main')||referencePanel;
     main1.innerHTML='ツムラ医療用漢方の成人標準1日量 <b>'+fmt(adultG,1)+' g/dayタイプ</b><br>'+
       '<div style="margin-top:10px"><span style="font-size:.9em;font-weight:800;color:#556575">小児でよく用いられる参考量</span><br>'+
       '<span style="display:inline-block;margin-top:4px;font-size:1.7em;font-weight:900;line-height:1.05;color:#173f62">'+fmt(rate,2)+' g/kg/day</span></div>'+
       '<div style="text-align:center;margin:9px 0 4px;font-size:1.55em;font-weight:900;color:#556575;line-height:1">↓</div>'+
       '<div style="text-align:center;font-size:.9em;font-weight:800;color:#556575">今回の体重 '+(Number.isFinite(wt)?fmt(wt,1)+' kg':'—')+' での1日量</div>'+
       '<div style="text-align:center;margin-top:3px;font-size:1.7em;font-weight:900;line-height:1.1;color:#173f62">'+(Number.isFinite(daily1)?fmt(daily1,2)+' g/day':'—')+'</div>';

     referencePanel.parentElement?.querySelectorAll('.kampo-reference-yellow-2').forEach(n=>n.remove());
     const yellow2=document.createElement('section');
     yellow2.className=(referencePanel.className||'dose-panel dose-label-card')+' kampo-reference-yellow-2';
     yellow2.style.marginTop='10px';
     yellow2.innerHTML='<div class="dose-panel-title">漢方の小児参考量②</div>'+
       '<div class="dose-label-main"><b>Augsberger換算</b><br>'+
       (Number.isFinite(augsG)
         ? '成人標準1日量 <b>'+fmt(adultG,1)+' g/day</b> ×（年齢×4＋20）/100'+
           '<div style="margin-top:10px"><span style="font-size:.9em;font-weight:800;color:#556575">年齢ベースの参考量</span><br>'+
           '<span style="display:inline-block;margin-top:4px;font-size:1.7em;font-weight:900;line-height:1.05;color:#173f62">'+fmt(rate2,2)+' g/kg/day</span></div>'+
           '<div style="text-align:center;margin:9px 0 4px;font-size:1.55em;font-weight:900;color:#556575;line-height:1">↓</div>'+
           '<div style="text-align:center;font-size:.9em;font-weight:800;color:#556575">今回の体重 '+(Number.isFinite(wt)?fmt(wt,1)+' kg':'—')+' での1日量</div>'+
           '<div style="text-align:center;margin-top:3px;font-size:1.7em;font-weight:900;line-height:1.1;color:#173f62">'+fmt(augsG,2)+' g/day</div>'
         : 'Augsberger式は2歳以上で算出する参考量です。')+
       '</div>'+
       '<div class="dose-label-source">出典：<a href="https://www.mhlw.go.jp/content/10800000/001001698.pdf" target="_blank" rel="noopener">厚生労働省資料 ↗</a>　<a href="https://www.shindan.co.jp/np/isbn/9784787825926/" target="_blank" rel="noopener">新 小児薬用量 改訂第10版 ↗</a></div>';
     referencePanel.insertAdjacentElement('afterend',yellow2);
   }
   const title=[...card.querySelectorAll('.dose-panel-title')].find(n=>/小児参考量と処方量/.test(n.textContent||''));
   if(title)title.textContent='漢方の小児参考量①・②と処方量';
   const hero=card.querySelector('.hero');
   if(hero)hero.innerHTML='参考比較：<span class="pill">2つの指標を併記</span>';


   const grid=card.querySelector('.dose-comparison-grid');
   if(grid){
     // Stack the two references vertically. Reuse the first box as reference ① and append ② with identical styling.
     grid.style.display='grid';grid.style.gridTemplateColumns='1fr';grid.style.gap='12px';
     const firstBox=grid.querySelector('.dose-compare-box');
     if(firstBox){firstBox.style.width='100%';const l=firstBox.querySelector('.dose-compare-label');if(l)l.textContent='漢方の小児参考量①　ツムラ由来の体重比例';}
     const box=document.createElement('div');
     box.className='dose-compare-box kampo-augsberger-box';
     box.style.width='100%';
     box.innerHTML='<div class="dose-compare-label">漢方の小児参考量②　Augsberger換算</div>'+
       '<div class="dose-compare-main">'+(Number.isFinite(augsG)?fmt(augsG,2)+' g/day':'2歳未満は算出対象外')+'</div>'+
       '<div class="dose-compare-sub">'+(Number.isFinite(augsG)?('成人標準 '+fmt(adultG,1)+' g/day × ((年齢×4＋20)/100)'+(Number.isFinite(diff)?'／処方量との差 '+(diff>=0?'+':'')+fmt(diff,2)+' g/day':'')):'Augsberger式は2歳以上の参考換算として表示')+'</div>';
     grid.appendChild(box);
   }

   const note=document.createElement('div');
   note.className='note kampo-dual-note';
   note.innerHTML='<b>参考量①：</b>ツムラ医療用漢方の成人標準量を基にした体重比例の参考換算。<br>'+
     '<b>参考量②：</b>Augsberger式（2歳以上）＝成人量×（年齢×4＋20）/100。'+
     '<br>※①②はいずれも承認小児用量ではなく、処方妥当性を単独で決める基準ではありません。'+
     '<br><a href="https://www.mhlw.go.jp/content/10800000/001001698.pdf" target="_blank" rel="noopener">Augsberger式：厚生労働省資料 ↗</a>　'+
     '<a href="https://www.shindan.co.jp/np/isbn/9784787825926/" target="_blank" rel="noopener">新 小児薬用量 改訂第10版（診断と治療社）↗</a>';
   const gridParent=grid?.parentElement||card;
   gridParent.appendChild(note);
 }

 // Re-augment after the app redraws its result for age/weight/amount/frequency changes.
 document.addEventListener('input',()=>setTimeout(augmentKampoResult,0),true);
 document.addEventListener('change',()=>setTimeout(augmentKampoResult,0),true);

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
     setTimeout(()=>{product.value=r.pk;product.dispatchEvent(new Event('change',{bubbles:true}));inp.value=r.label;box.style.display='none';augmentKampoResult();},0);
   },true);
 }
 document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{installSearchOverride();augmentKampoResult();},30));
 setTimeout(()=>{installSearchOverride();augmentKampoResult();},60);
})();
