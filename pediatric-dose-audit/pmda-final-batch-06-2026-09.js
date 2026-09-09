// PMDA final reconciliation — medicines 51–60 (2026-09-06).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(ks,url,note)=>ks.forEach(k=>{if(DB[k])Object.assign(DB[k],{auditStatus:'PMDA最終突合済み',auditDate:'2026-09-06',sourceUrl:url,auditNote:note});});
 const apply=(ks,fn)=>ks.forEach(k=>{if(DB[k])fn(DB[k]);});

 mark(['meto','ob01_metoS','ob02_primperan'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530169_2399004Q1090_2_05','0.38～0.53mg/kg/day・分2～3食前、シロップ0.5～0.7mL/kg/dayを突合。');
 mark(['clav'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6139100R1036?user=1','AMPC 90＋CVA 6.4mg/kg/day、12時間毎分2、食直前、1.01g中600＋42.9mgを突合。');

 apply(['mino'],d=>{const i=d.indications.general;i.lo=w=>Math.min(2*w,200);i.hi=w=>Math.min(4*w,200);i.max=()=>200;i.desc='2～4mg/kg/dayを12時間又は24時間ごと。小児は成人量200mg/dayを上限。特に8歳未満は他剤が使えない場合に限る';});
 mark(['mino'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6152005D1094?user=1','2～4mg/kg/day、成人量上限、8歳未満の歯牙・骨発育上の使用制限を反映。');
 mark(['cypro','img02_01'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/4419005Q1072?user=1','Augsberger式による2～12歳の年齢別1回量、1日1～3回、3剤形換算を突合。');
 mark(['salbu'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2254001Q1073?user=1','乳幼児0.3mg/kg/day・分3、3年齢区分の標準製剤量、0.4mg/mL換算を突合。');
 mark(['lope'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2319001C1080?user=1','急性下痢症0.02～0.04mg/kg/day・分2～3、細粒0.05%換算を突合。');
 mark(['diaSupp'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/1124701J3025?user=1','0.4～0.5mg/kg/回を1日1～2回、1mg/kg/day上限、4/6/10mg坐剤を突合。');

 if(DB.mgo){delete DB.mgo.indications.lax.referenceOnly;delete DB.mgo.indications.lax.referenceMessage;}
 mark(['mgo'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/731040_2344009C1055_4_04','2025年8月改訂電子添文を再突合。1歳以上の小児20～80mg/kg/day・食後分2、開始目安40mg/kg/day、細粒83%は1g中833mg。');
 mark(['mediconCombo'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2249106Q1066?user=1','3か月～7歳3～8mL/day、8～14歳9～16mL/day・分3～4と2成分濃度を突合。');
 mark(['dompSupp'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2399714J3029?user=1','3歳未満10mg/回、3歳以上30mg/回を1日2～3回、坐剤10/30mgを突合。');

 // Distinguish approved ranges from guideline-only pediatric reference ranges.
 if(typeof render==='function'){
   const baseRender=render;
   render=function(){
     baseRender();
     const key=$('drug').value,d=DB[key],ii=d&&d.indications[$('ind').value];
     if(ii&&ii.referenceOnly){
       const pill=document.querySelector('#out .hero .pill');
       if(pill){pill.className='pill warn';pill.textContent='小児承認用量なし（参考域）';}
       const hero=document.querySelector('#out .hero');
       if(hero)hero.insertAdjacentHTML('afterend','<div class="note"><b>位置づけ：</b>'+(ii.referenceMessage||'PMDA電子添文に小児固有の承認用量はありません。表示値は承認小児用量として判定しません。')+'</div>');
     }
     if(key==='mino'&&Number($('age').value)<8){
       const hero=document.querySelector('#out .hero');
       if(hero)hero.insertAdjacentHTML('afterend','<div class="note"><b>8歳未満：</b>歯牙着色・エナメル質形成不全・一過性骨発育不全のおそれがあるため、他剤が使用できない又は無効の場合に限って検討します。</div>');
     }
   };
  render();
 }
 if(!document.querySelector('script[src="pmda-final-batch-07-2026-09.js"]')){const s=document.createElement('script');s.src='pmda-final-batch-07-2026-09.js';document.head.appendChild(s);}
})();
