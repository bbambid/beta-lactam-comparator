// PMDA final reconciliation — medicines 61–70 (2026-09-06).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(ks,url,note)=>ks.forEach(k=>{if(DB[k])Object.assign(DB[k],{auditStatus:'PMDA最終突合済み',auditDate:'2026-09-06',sourceUrl:url,auditNote:note});});
 const refOnly=(k,desc)=>{if(!DB[k])return;Object.values(DB[k].indications||{}).forEach(i=>{i.referenceOnly=true;i.desc=desc;});};

 if(DB.ebas){DB.ebas.indications.general.lo=()=>NaN;DB.ebas.indications.general.hi=()=>NaN;refOnly('ebas','PMDA電子添文は成人5～10mgを1日1回。小児承認用量なし・小児臨床試験未実施');}
 mark(['ebas','img02_37'],'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490019F2024_1?user=1','誤登録されていた7歳以上用量を撤回し、小児承認用量なしへ変更。');

 if(DB.esome)DB.esome.indications={
   ulcerGerd:{label:'胃潰瘍等／逆流性食道炎（1歳以上）',lo:(w,a)=>a<1?NaN:10,hi:(w,a)=>a<1?NaN:w<20?10:20,freq:[1],desc:'1歳以上：20kg未満10mg、20kg以上10～20mgを1日1回'},
   nerdPrevention:{label:'非びらん性GERD／NSAIDs・低用量ASA潰瘍再発抑制（1歳以上）',lo:(w,a)=>a<1?NaN:10,hi:(w,a)=>a<1?NaN:10,freq:[1],desc:'1歳以上：10mgを1日1回'}
 };
 mark(['esome'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480209_2329029M1051_1_05','小児適応を10～20mg群と10mg固定群に分離し、1歳・20kg境界を実装。');
 mark(['pyr'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6429001R1032?user=1','ピランテル10mg/kg単回とDS10%換算を突合。');

 if(DB.levoT4)DB.levoT4.indications={
   infant:{label:'乳幼児甲状腺機能低下症',lo:w=>0.01*w,hi:w=>0.01*w,freq:[1],desc:'レボチロキシン10μg/kgを1日1回'},
   prematureStart:{label:'未熟児・開始時',lo:w=>0.005*w,hi:w=>0.005*w,freq:[1],desc:'5μg/kgから開始し、8日目から10μg/kgを1日1回'}
 };
 mark(['levoT4'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2431004B1038?user=1','乳幼児10μg/kg/day、未熟児開始5μg/kg/day、散0.01%換算を実装。');

 if(DB.lacto){DB.lacto.indications={infant:{label:'乳児の乳糖不耐（1回量）',lo:()=>125,hi:()=>250,freq:[1],perAdministration:true,desc:'1回0.25～0.5gを哺乳時に投与。50℃以上で溶解しない'},enteral:{label:'経管栄養・流動食の乳糖不耐',lo:()=>500,hi:()=>500,freq:[1],perAdministration:true,desc:'摂取乳糖10gに対し製剤1gを食餌とともに投与'}};}
 mark(['lacto'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2339004C1036?user=1','乳児1回0.25～0.5gと、摂取乳糖10g当たり1gを適応別に実装。');

 for(const k of ['lactoB','lactoR']){refOnly(k,'成人承認製剤量を年齢・症状により増減。小児固有の承認用量なし');Object.values(DB[k].indications||{}).forEach(i=>{i.lo=()=>NaN;i.hi=()=>NaN;});}
 mark(['lactoB'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2316012A1132?user=1','ビオフェルミン配合散とラックビー微粒Nを確認。小児固有用量なしとして区分。');
 mark(['lactoR'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2316004B1036?user=1','耐性乳酸菌製剤の対象抗菌薬・成人製剤量を確認。小児固有用量なしとして区分。');
 for(const k of ['tannin','scop','tepre']){refOnly(k,'PMDA電子添文は成人用量のみ。小児固有の承認用量なし');Object.values(DB[k].indications||{}).forEach(i=>{i.lo=()=>NaN;i.hi=()=>NaN;});}
 mark(['tannin'],'https://www.pmda.go.jp/PmdaSearch/bookSearch/01/14987291840917','成人3～4g/dayのみ。小児承認用量なし、牛乳アレルギー・感染性下痢等の禁忌も確認。');
 mark(['scop'],'https://www.pmda.go.jp/PmdaSearch/iyakuSearch/','成人用量のみ。PMDA現行個別ページを特定できず供給停止情報もあるため、小児換算値を除外し削除候補へ。');
 if(DB.scop)DB.scop.auditStatus='PMDA突合・現行製剤確認待ち';
 mark(['tepre'],'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2329012C1026_1?user=1','成人150mg/day・分3食後のみ。小児承認用量なしとして区分。');

 if(typeof render==='function'){
   const prior=render;render=function(){prior();const d=DB[$('drug').value],ii=d&&d.indications[$('ind').value];if(ii&&ii.perAdministration){const out=$('out');out.innerHTML=out.innerHTML.replaceAll('/day','/回').replaceAll('1日量','1回量').replace('1回量：','投与時量：');const hero=out.querySelector('.hero');if(hero)hero.insertAdjacentHTML('afterend','<div class="note"><b>計算単位：</b>この項目は1日量ではなく、哺乳・食餌1回あたりの製剤量です。</div>');}};render();
 }
 if(!document.querySelector('script[src="pmda-final-batch-08-2026-09.js"]')){const s=document.createElement('script');s.src='pmda-final-batch-08-2026-09.js';document.head.appendChild(s);}
})();
