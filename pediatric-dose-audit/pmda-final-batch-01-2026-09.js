// PMDA final reconciliation — dose-logic groups 1–10 (2026-09-06).
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

  // CAM: adult-standard cap (400 mg/day) must constrain both ends of the range.
  if(DB.cam){
    DB.cam.indications.general.lo=w=>Math.min(10*w,400);
    DB.cam.indications.general.hi=w=>Math.min(15*w,400);
    DB.cam.indications.general.max=()=>400;
    DB.cam.indications.general.desc='一般感染症 10–15 mg/kg/day・分2～3。小児の1日量は成人標準量400 mg/dayを上限';
  }
  mark(['cam','img02_13','img02_14','ob01_camds','ob01_camt50'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530169_6149003F1120_1_24',
    '一般感染症、レジオネラ肺炎、播種性MAC症、分割回数、一般感染症の400mg/day上限を突合。');

  mark(['amox','img02_03','img02_04','aud_saw10','ob01_amox10','ob01_amox20'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/171911_6131001C1210_2_09',
    '20～40mg/kg/day・分3～4、適宜増減、最大90mg/kg/dayを突合。');

  mark(['carbo','img02_42','imgF06','ob01_carboS','ob01_carboDS','ob02_mucodyneS','ob02_mucodyneDS'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/581120_2233002R2070_1_03',
    '1回10mg/kg（DS50% 0.02g/kg）・1日3回、シロップ5% 0.6mL/kg/dayを突合。');

  mark(['ambro','img02_41','imgF07','ob01_ambroDS','ob02_mucosolvan'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/470310_2239001R1072_1_08',
    '0.9mg/kg/day（DS1.5% 0.06g/kg/day）・分3を突合。');

  mark(['txa','imgF11','ob01_txaS','ob02_txaS','ob02_txaPow'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/650037_3327002Q1062_3_03',
    '1歳以下、2～3歳、4～6歳、7～14歳、15歳以上の年齢別1日量と分3～4を突合。承認判定は年齢区分を使用し、体重換算は承認基準として扱わない。');

  mark(['levo','imgF03','ob01_levoS','ob01_levoDS','ob02_levo'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/340278_4490028Q1028_1_10',
    '6か月～1歳未満、1～7歳未満、7～15歳未満の1回量・回数を突合。');

  // APAP: pediatric indication has both a per-dose and an absolute daily cap.
  if(DB.apap){
    const i=DB.apap.indications.general;
    i.hi=w=>Math.min(60*w,1500);
    i.max=w=>Math.min(60*w,1500);
    i.perDoseLo=w=>Math.min(10*w,500);
    i.perDoseHi=w=>Math.min(15*w,500);
    i.desc='1回10～15mg/kg（最大500mg）、4～6時間以上あける。1日最大60mg/kgかつ1500mg';
  }
  mark(['apap','img02_22','img02_23','img02_24','imgF12','acet20','acet50','ob01_apapDS','ob01_apapS','ob02_caronal20','ob02_caronal50','ob02_apap200'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/172190_1141007C1075_5_06',
    '1回10～15mg/kg、4～6時間以上、1回500mg上限、1日60mg/kgかつ1500mg上限を突合。');

  mark(['ceti','img02_38','aud_cetiTakata','ob01_cetiDS','ob02_ceti'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/820110_4490020R1027_1_12',
    '2～7歳未満2.5mg×2、7～15歳未満5mg×2を突合。');

  // Montelukast: separate the 4 mg granule and 5 mg chewable age bands.
  if(DB.mont){
    DB.mont.indications.asthma6to14={label:'気管支喘息（6歳以上15歳未満）',lo:(w,a)=>a<6||a>=15?NaN:5,hi:(w,a)=>a<6||a>=15?NaN:5,freq:[1],desc:'6歳以上15歳未満：5mg 1日1回就寝前'};
  }
  mark(['mont','aud_kipres','ob01_mont4','ob02_mont4','ob02_mont5'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/231099_4490026C1021_2_04',
    '1～6歳未満4mg、6～15歳未満チュアブル5mg、いずれも1日1回就寝前を突合。');

  mark(['desl','ob01_desl','ob02_desl'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530213_4490032F1031_2_01',
    '12歳以上5mgを1日1回として突合。');
})();
