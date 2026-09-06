// PMDA final reconciliation — medicines 71–80 (2026-09-06).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(ks,url,note)=>ks.forEach(k=>{if(DB[k])Object.assign(DB[k],{auditStatus:'PMDA最終突合済み',auditDate:'2026-09-06',sourceUrl:url,auditNote:note});});
 const setFixed=(k,lo,hi,freq,desc)=>{if(!DB[k])return;const i=DB[k].indications.general||DB[k].indications.rhinitis;i.lo=lo;i.hi=hi;i.freq=freq;i.desc=desc;};

 setFixed('dexa',()=>0.15,()=>4,[1,2,3,4],'小児0.15～4mg/dayを1～4回に分割。年齢・症状により適宜増減');
 mark(['dexa'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2454002S1157?user=1','小児0.15～4mg/day・分1～4、エリキシル0.01%（0.1mg/mL）を突合。');

 setFixed('feno',w=>0.375*w,w=>0.375*w,[3],'フェノテロール0.375mg/kg/day（ベロテックシロップ0.05%として0.75mL/kg/day）を3回に分割');
 mark(['feno'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/400186_2252006R2057_1_02','0.375mg/kg/day・分3とシロップ0.05%換算を突合。');

 if(DB.hydroxyz){
   DB.hydroxyz.products={syr005:{label:'アタラックス-Pシロップ0.5%',unit:'mL',mgPerUnit:5,defaultAmount:10}};
   const i=DB.hydroxyz.indications.general;i.lo=()=>NaN;i.hi=()=>NaN;i.referenceOnly=true;i.desc='PMDA電子添文は成人用量のみ。小児固有の承認用量なし（1mL中、ヒドロキシジン塩酸塩5mg相当）';
 }
 mark(['hydroxyz'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/672212_1179019Q1030_3_04','誤っていた濃度1mg/mLを5mg/mLへ訂正。小児固有承認用量なしとして区分。');

 if(DB.procOral)DB.procOral.indications.general={label:'気管支喘息等（6歳以上）',lo:(w,a)=>a<6?NaN:0.025,hi:(w,a)=>a<6?NaN:0.05,perDoseLo:()=>0.025,perDoseHi:()=>0.025,freq:[1,2],desc:'6歳以上：1回25μgを就寝前1回、または朝・就寝前の1日2回'};
 mark(['procOral'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2259004F1110?user=1','6歳以上25μg/回、1日1～2回、25μg錠換算を突合。');

 // Nasal amounts are total sprays across both nostrils per day.
 if(DB.flutiN){DB.flutiN.products.nasal25.defaultAmount=4;DB.flutiN.indications.rhinitis={label:'アレルギー性鼻炎／血管運動性鼻炎',lo:()=>0.1,hi:()=>0.1,max:()=>0.2,freq:[2],desc:'各鼻腔1噴霧を1日2回（両鼻合計4噴霧＝100μg/day）。5歳未満は臨床試験未実施。最大8噴霧/day'};}
 mark(['flutiN'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/340278_1329707Q2030_1_11','初期値を両鼻合計4噴霧/dayへ訂正。5歳未満は承認外ではなく臨床試験未実施として注記。');

 if(DB.flutiF)DB.flutiF.indications.rhinitis={label:'アレルギー性鼻炎',lo:(w,a)=>a>=15?0.11:0.055,hi:(w,a)=>a>=15?0.11:0.055,freq:[1],desc:'小児：各鼻腔1噴霧を1日1回（55μg/day）。15歳以上は成人量110μg/day。2歳未満は臨床試験未実施'};
 mark(['flutiF'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/340278_1329711Q1021_1_13','小児55μg/day、成人110μg/dayを突合。2歳未満を機械的に承認外扱いせず、臨床試験未実施として注記。');

 if(DB.mometN)DB.mometN.indications.rhinitis={label:'アレルギー性鼻炎',lo:(w,a)=>a>=12?0.2:0.1,hi:(w,a)=>a>=12?0.2:0.1,freq:[1],desc:'12歳未満：各鼻腔1噴霧を1日1回（100μg/day）。12歳以上：各鼻腔2噴霧（200μg/day）。3歳未満は国内臨床試験未実施'};
 mark(['mometN'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/181615_1329710Q1027_2_06','12歳境界の100/200μg/dayを突合。3歳未満は承認外ではなく国内臨床試験未実施として注記。');

 if(DB.ketoN){DB.ketoN.products.nasal={label:'点鼻液0.05%（0.05mg/噴霧）',unit:'噴霧',mgPerUnit:0.05,defaultAmount:8};DB.ketoN.indications.rhinitis={label:'アレルギー性鼻炎',lo:()=>0.4,hi:()=>0.4,freq:[4],desc:'1回各鼻腔1噴霧（各0.05mg）を1日4回。両鼻合計8噴霧＝0.4mg/day'};}
 mark(['ketoN'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/460028_1329705Q1352_1_02','誤っていた1mg/噴霧を0.05mg/噴霧へ、初期値を両鼻合計8噴霧/dayへ訂正。');

 if(DB.cromoN){DB.cromoN.products.nasal={label:'点鼻液2%（2.6mg/噴霧）',unit:'噴霧',mgPerUnit:2.6,defaultAmount:12};DB.cromoN.indications.rhinitis={label:'アレルギー性鼻炎',lo:()=>31.2,hi:()=>31.2,freq:[6],desc:'1回各鼻腔1噴霧（各2.6mg）を1日6回。両鼻合計12噴霧＝31.2mg/day'};}
 mark(['cromoN'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/1329700Q1228?user=1','誤っていた1mg/噴霧を2.6mg/噴霧へ、初期値を両鼻合計12噴霧/dayへ訂正。');

 if(DB.budesN){
   DB.budesN.products={spray25:{label:'ベクロメタゾン鼻用パウダー25μg/噴霧',unit:'噴霧',mgPerUnit:0.025,defaultAmount:4}};
   DB.budesN.indications.rhinitis={label:'アレルギー性鼻炎／血管運動性鼻炎',lo:()=>0.1,hi:()=>0.1,freq:[2],desc:'各鼻腔1噴霧を1日2回。両鼻合計4噴霧＝100μg/day。5歳以下は器具操作・吸入困難のため臨床試験未実施'};
   const o=document.querySelector('select#drug option[value="budesN"]');if(o)o.textContent='ベクロメタゾン点鼻粉末（旧リノコート系）';
 }
 mark(['budesN'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480235_1329702R7034_1_05','成分名の誤登録（ブデソニド）をベクロメタゾンへ訂正。25μg/噴霧、両鼻合計4噴霧/dayを実装。');

 if(typeof loadDrug==='function'){
   const priorLoad=loadDrug;
   loadDrug=function(reset=true){priorLoad(reset);if(reset){const k=document.getElementById('drug').value,a=Number(document.getElementById('age').value);if((k==='flutiF'&&a>=15)||(k==='mometN'&&a>=12)){document.getElementById('amount').value=4;if(typeof render==='function')render();}}};
   loadDrug(false);
 }
 if(!document.querySelector('script[src="pmda-final-batch-09-2026-09.js"]')){const s=document.createElement('script');s.src='pmda-final-batch-09-2026-09.js';document.head.appendChild(s);}
})();
