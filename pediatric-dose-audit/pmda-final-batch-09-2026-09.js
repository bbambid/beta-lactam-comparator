// PMDA final reconciliation — medicines 81–90 (2026-09-06).
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const mark=(ks,url,note)=>ks.forEach(k=>{if(DB[k])Object.assign(DB[k],{auditStatus:'PMDA最終突合済み',auditDate:'2026-09-06',sourceUrl:url,auditNote:note});});
 const referenceOnly=(k,desc)=>{if(!DB[k])return;Object.values(DB[k].indications||{}).forEach(i=>{i.lo=()=>NaN;i.hi=()=>NaN;i.referenceOnly=true;i.desc=desc;});};

 if(DB.cefalex)DB.cefalex.indications={
   general:{label:'一般感染症',lo:w=>25*w,hi:w=>50*w,freq:[4],desc:'25～50mg/kg/dayを分割し6時間毎に投与'},
   severe:{label:'重症／感受性が比較的低い場合',lo:w=>50*w,hi:w=>100*w,freq:[4],desc:'50～100mg/kg/dayを分割し6時間毎に投与'}
 };
 mark(['cefalex'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/400022_6132002R1168_2_05','10%・20%製剤、通常25～50mg/kg/day、重症等50～100mg/kg/day、6時間毎を突合。');

 if(DB.minoc)DB.minoc.indications={general:{label:'承認感染症',lo:w=>Math.min(2*w,200),hi:w=>Math.min(4*w,200),max:()=>200,freq:[1,2],desc:'2～4mg/kg/dayを12時間又は24時間ごと。小児は成人量200mg/dayを上限。特に8歳未満では歯牙の着色・エナメル質形成不全、一過性の骨発育不全を起こすことがあるため、他剤が使用できない又は無効の場合に限る'}};
 mark(['minoc'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/672212_6152005D1094_3_07','顆粒2%（20mg/g）、2～4mg/kg/day、成人量上限、8歳未満の使用制限を突合。');

 if(DB.balox){
   DB.balox.products={gran2:{label:'顆粒2%分包（10mg/0.5g）',unit:'g',mgPerUnit:20,defaultAmount:0.5},tab10:{label:'錠10mg',unit:'錠',mgPerUnit:10,defaultAmount:1},tab20:{label:'錠20mg',unit:'錠',mgPerUnit:20,defaultAmount:1}};
   const treatmentDose=(w,a)=>a<12?(w<10?w:w<20?10:w<40?20:40):(w<80?40:80);
   const preventionDose=(w,a)=>a<12?(w<20?NaN:w<40?20:40):(w<80?40:80);
   DB.balox.indications={
     treat:{label:'インフルエンザ治療（単回）',lo:treatmentDose,hi:treatmentDose,freq:[1],productAllowed:(p,w,a,dose)=>!(p==='tab10'&&dose>=20),desc:'単回投与。12歳未満：10kg未満1mg/kg、10～20kg未満10mg、20～40kg未満20mg、40kg以上40mg。12歳以上：80kg未満40mg、80kg以上80mg'},
     prevent:{label:'インフルエンザ予防（単回）',lo:preventionDose,hi:preventionDose,freq:[1],disallowedProducts:['tab10'],desc:'接触後2日以内に単回投与。12歳未満は20kg以上が承認対象（20～40kg未満20mg、40kg以上40mg）。12歳以上は80kg未満40mg、80kg以上80mg。錠10mgは予防の適応なし'}
   };
 }
 mark(['balox'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/340018_6250047F1022_1_20','2026年改訂版で治療・予防を分離。予防の12歳未満20kg境界と錠10mgの適応制限を実装。');

 if(DB.movLD){
   const perMax=(w,a)=>a<12?2:4;
   DB.movLD.indications={
     age26:{label:'2歳以上7歳未満',lo:(w,a)=>a<2||a>=7?NaN:1,hi:(w,a)=>a<2||a>=7?NaN:4,max:()=>4,perDoseLo:()=>0,perDoseHi:perMax,freq:[1,2,3],quantityBased:true,quantityUnit:'包',desc:'初回LD 1包を1日1回。最大LD 4包/day、1回最大2包。増量は2日以上あけ、1日量LD 1包まで'},
     age711:{label:'7歳以上12歳未満',lo:(w,a)=>a<7||a>=12?NaN:2,hi:(w,a)=>a<7||a>=12?NaN:4,max:()=>4,perDoseLo:()=>0,perDoseHi:perMax,freq:[1,2,3],quantityBased:true,quantityUnit:'包',desc:'初回LD 2包を1日1回。最大LD 4包/day、1回最大2包。増量は2日以上あける'},
     age12:{label:'12歳以上',lo:(w,a)=>a<12?NaN:2,hi:(w,a)=>a<12?NaN:6,max:()=>6,perDoseLo:()=>0,perDoseHi:perMax,freq:[1,2,3],quantityBased:true,quantityUnit:'包',desc:'初回LD 2包を1日1回。最大LD 6包/day、1回最大4包。増量は2日以上あける'}
   };
 }
 if(DB.movHD){
   const perMax=(w,a)=>a<12?1:2;
   DB.movHD.indications={
     age26:{label:'2歳以上7歳未満（増量後）',lo:(w,a)=>a<2||a>=7?NaN:1,hi:(w,a)=>a<2||a>=7?NaN:2,max:()=>2,perDoseLo:()=>0,perDoseHi:perMax,freq:[1,2,3],quantityBased:true,quantityUnit:'包',desc:'初回はLD 1包で開始し、HDは初回用量に用いない。増量後の最大HD 2包/day、1回最大1包'},
     age711:{label:'7歳以上12歳未満',lo:(w,a)=>a<7||a>=12?NaN:1,hi:(w,a)=>a<7||a>=12?NaN:2,max:()=>2,perDoseLo:()=>0,perDoseHi:perMax,freq:[1,2,3],quantityBased:true,quantityUnit:'包',desc:'初回HD 1包を1日1回。最大HD 2包/day、1回最大1包。増量は2日以上あける'},
     age12:{label:'12歳以上',lo:(w,a)=>a<12?NaN:1,hi:(w,a)=>a<12?NaN:3,max:()=>3,perDoseLo:()=>0,perDoseHi:perMax,freq:[1,2,3],quantityBased:true,quantityUnit:'包',desc:'初回HD 1包を1日1回。最大HD 3包/day、1回最大2包。増量は2日以上あける'}
   };
 }
 mark(['movLD','movHD'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/111890_2359110B2025_1_01','2～7歳未満、7～12歳未満、12歳以上の初回量・1日上限・1回上限・増量間隔をLD/HD別に突合。');

 if(DB.loper)DB.loper.indications={acute:{label:'急性下痢症',lo:(w,a)=>a<0.5?NaN:0.02*w,hi:(w,a)=>a<0.5?NaN:0.04*w,freq:[2,3],desc:'0.02～0.04mg/kg/day（製剤0.04～0.08g/kg/day）を分2～3。6か月未満は禁忌、6か月以上2歳未満は原則投与しない'}};
 mark(['loper'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/800155_2319001C1080_1_10','0.05%（0.5mg/g）、0.02～0.04mg/kg/day・分2～3、6か月未満禁忌と2歳未満の制限を突合。');

 referenceOnly('rebS','PMDA電子添文は成人3～6g/day・分3のみ。小児固有の承認用量なし');
 if(DB.rebS){DB.rebS.products.pow={label:'レベニンS配合散',unit:'g',mgPerUnit:1,defaultAmount:1};Object.values(DB.rebS.indications).forEach(i=>{i.quantityBased=true;i.quantityUnit='g';});}
 mark(['rebS'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/890016_2316003B1066_1_03','成人3～6g/day・分3のみ。小児固有承認用量なしとして区分。');

 referenceOnly('reb','PMDA電子添文は成人3g/day・分3のみ。小児固有の承認用量なし。適応は指定抗菌薬投与時の腸内菌叢異常');
 if(DB.reb){DB.reb.products.pow={label:'レベニン散（耐性乳酸菌18mg/g）',unit:'g',mgPerUnit:1,defaultAmount:1};Object.values(DB.reb.indications).forEach(i=>{i.quantityBased=true;i.quantityUnit='g';});}
 mark(['reb'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/890016_2316016B1039_2_05','成人3g/day・分3のみ。小児固有承認用量なし、対象抗菌薬の範囲を確認。');

 if(DB.pl){DB.pl.products.gran={label:'幼児用PL配合顆粒',unit:'g',mgPerUnit:1,defaultAmount:4};DB.pl.indications={general:{label:'感冒・上気道炎に伴う諸症状',lo:(w,a)=>a<2||a>=12?NaN:a<5?4:a<9?8:12,hi:(w,a)=>a<2||a>=12?NaN:a<5?4:a<9?8:12,freq:[4],quantityBased:true,quantityUnit:'g',desc:'2～4歳1回1g、5～8歳1回2g、9～11歳1回3gを各1日4回。2歳未満は禁忌。水痘・インフルエンザでは原則投与しない'}};}
 mark(['pl'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/343018_1180108D1039_2_09','2026年8月版で年齢別1回量・分4、2歳未満禁忌、水痘・インフルエンザ時の制限を突合。');

 if(DB.acet20){DB.acet20.products={gran20:{label:'アセトアミノフェン細粒20%',unit:'g',mgPerUnit:200,defaultAmount:0.5}};DB.acet20.indications={general:{label:'小児科領域の解熱・鎮痛',lo:()=>0,hi:w=>Math.min(60*w,1500),max:w=>Math.min(60*w,1500),perDoseLo:w=>Math.min(10*w,500),perDoseHi:w=>Math.min(15*w,500),freq:[1,2,3,4,5,6],desc:'1回10～15mg/kg（最大500mg）、4～6時間以上あける。1日最大60mg/kgかつ1500mg'}};}
 mark(['acet20'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480235_1141007C1156_1_06','2026年8月版で20%（200mg/g）、1回10～15mg/kg、1回500mg・1日60mg/kgかつ1500mg上限を再突合。');

 if(typeof render==='function'){
   const priorRender=render;
   render=function(){
     priorRender();
     const key=$('drug').value,d=DB[key],ii=d&&d.indications[$('ind').value],pkey=$('product').value,w=Number($('wt').value),a=Number($('age').value),dose=ii&&ii.lo(w,a),out=$('out');
     if(ii&&ii.quantityBased){const u=ii.quantityUnit||'製剤単位';out.innerHTML=out.innerHTML.replaceAll(' mg/kg/day',' '+u+'/kg/day').replaceAll(' mg/day',' '+u+'/day').replaceAll(' mg（製剤 ',' '+u+'（製剤 ');const nums=out.querySelectorAll('.nums .num');if(nums[1])nums[1].firstChild.textContent='判定用製剤量';if(nums[2])nums[2].innerHTML='判定方式<br><b>製剤量基準</b>';}
     const disallowed=ii&&(ii.disallowedProducts||[]).includes(pkey);const productBad=ii&&typeof ii.productAllowed==='function'&&!ii.productAllowed(pkey,w,a,dose);
     if(disallowed||productBad){const pill=out.querySelector('.hero .pill');if(pill){pill.className='pill ng';pill.textContent='この規格は適応・用量条件外';}out.querySelector('.hero')?.insertAdjacentHTML('afterend','<div class="note"><b>規格制限：</b>錠10mgは予防の適応がなく、20mg以上の投与時にも使用しません。</div>');}
     if((key==='minoc'&&a<8)||(key==='loper'&&a>=0.5&&a<2)){const msg=key==='minoc'?'8歳未満は歯牙着色・エナメル質形成不全・一過性骨発育不全のおそれがあり、他剤が使えない又は無効の場合に限ります。':'6か月以上2歳未満は、治療上やむを得ない場合を除き投与しません。';out.querySelector('.hero')?.insertAdjacentHTML('afterend','<div class="note"><b>年齢上の注意：</b>'+msg+'</div>');}
   };
   render();
 }
})();
