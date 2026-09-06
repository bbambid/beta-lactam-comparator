// PMDA final reconciliation — dose-logic groups 11–20 (2026-09-06).
(function(){
  if(typeof DB==='undefined') return;
  const auditedAt='2026-09-06';
  const mark=(keys,url,note)=>keys.forEach(k=>{
    if(!DB[k]) return;
    DB[k].auditStatus='PMDA最終突合済み';
    DB[k].auditDate=auditedAt;
    DB[k].sourceUrl=url;
    DB[k].auditNote=note;
  });
  const apply=(keys,fn)=>keys.forEach(k=>{if(DB[k])fn(DB[k]);});

  mark(['olop','img02_39','ob01_olop','ob02_olop25'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530113_4490025D1022_2_01',
    '2～7歳未満2.5mg×2、7歳以上5mg×2、対象適応と製剤濃度を突合。');

  mark(['pran','aud_onon','ob01_pranDS','ob02_pran'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530169_4490017R1173_1_16',
    '7mg/kg/day・分2、最高10mg/kg/day、成人通常量450mg/dayを超えない条件を突合。');

  mark(['lora','aud_claritin','ob01_loraDS','ob02_lora'],
    'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490027R1020_1?user=1',
    'DSの3～7歳未満5mg、7歳以上10mgを1日1回、錠剤の小児年齢条件を突合。');

  // Epinastine: approved pediatric dose differs by indication.
  const epiKeys=['epi','img02_36','ob01_epi','ob02_epiDS'];
  apply(epiKeys,d=>{d.indications={
    rhinitis:{label:'アレルギー性鼻炎',lo:w=>0.25*w,hi:w=>Math.min(0.5*w,20),max:()=>20,freq:[1],desc:'0.25～0.5mg/kg/dayを1日1回。最大20mg/day'},
    skin:{label:'蕁麻疹／皮膚疾患に伴うそう痒',lo:w=>Math.min(0.5*w,20),hi:w=>Math.min(0.5*w,20),max:()=>20,freq:[1],desc:'0.5mg/kg/dayを1日1回。最大20mg/day'}
  };});
  mark(epiKeys,'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490014F1025_1?user=1',
    'アレルギー性鼻炎と蕁麻疹・皮膚そう痒で承認用量が異なるため適応を分離。20mg/day上限を追加。');

  // Make the infant boundary explicit: 6 months to under 2 years.
  const fexoKeys=['fexo','aud_fexoDS5','ob01_fexo','ob02_fexo30','ob02_fexo60'];
  apply(fexoKeys,d=>{d.indications.general.desc='6か月以上2歳未満：15mg×2、2歳以上12歳未満：30mg×2、12歳以上：60mg×2';});
  mark(fexoKeys,'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480235_4490023R2035_1_03',
    '6か月以上2歳未満、2歳以上12歳未満、12歳以上の1回量・1日2回とDS5%換算を突合。');

  // Mequitazine: asthma is twice the daily dose used for rhinitis/skin indications.
  const meqKeys=['meq','img02_32','img02_33','imgF05','ob01_meq'];
  apply(meqKeys,d=>{d.indications={
    asthma:{label:'気管支喘息',lo:w=>0.24*w,hi:w=>0.24*w,freq:[2],desc:'1回0.12mg/kgを1日2回（0.24mg/kg/day）'},
    allergy:{label:'アレルギー性鼻炎／蕁麻疹・皮膚そう痒',lo:w=>0.12*w,hi:w=>0.12*w,freq:[2],desc:'1回0.06mg/kgを1日2回（0.12mg/kg/day）'}
  };});
  mark(meqKeys,'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530258_4413004C2030_1_17',
    '喘息0.12mg/kg/回×2と、鼻炎・蕁麻疹等0.06mg/kg/回×2を適応別に分離。');

  mark(['tulo','img02_19','img02_20','img02_21'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300119_2259707S1071_1_11',
    '6か月～3歳未満0.5mg、3～9歳未満1mg、9歳以上2mgの1日1回貼付を突合。');

  mark(['cfpn','img02_10','ob01_cfpn','ob02_fro'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/340018_6132016C1027_1_22',
    '通常3mg/kg/回×3、難治性・効果不十分時4.5～6mg/kg/回×3、細粒10%換算を突合。');

  apply(['cdtr','img02_11','ob01_cdtr','ob02_meiact'],d=>{
    if(d.indications.resp){
      d.indications.resp.lo=w=>Math.min(18*w,600);
      d.indications.resp.hi=w=>Math.min(18*w,600);
      d.indications.resp.max=()=>600;
      d.indications.resp.desc='肺炎・中耳炎・副鼻腔炎：1回6mg/kgを1日3回。1回200mg上限';
    }
  });
  mark(['cdtr','img02_11','ob01_cdtr','ob02_meiact'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/780009_6132015C1103_1_12',
    '通常3mg/kg/回×3、肺炎・中耳炎・副鼻腔炎6mg/kg/回×3、1回200mg上限を突合。');

  mark(['cpdx','img02_08','ob01_cpdx','ob02_banan'],
    'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132011R1074_1?user=1',
    '3mg/kg/回を1日2～3回、ドライシロップ5%の製剤量換算を突合。');

  // Keep later reconciliation batches ordered without rewriting the legacy one-line script footer.
  if(!document.querySelector('script[src="pmda-final-batch-03-2026-09.js"]')){
    const s=document.createElement('script');
    s.src='pmda-final-batch-03-2026-09.js';
    document.head.appendChild(s);
  }
})();
