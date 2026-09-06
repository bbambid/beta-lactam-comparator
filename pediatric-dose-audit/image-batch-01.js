// Pediatric image-derived batch 01
// Drug names were taken from the user-provided pediatric table only.
// Doses/formulations below were re-checked against current PMDA/MHLW sources.
(function(){
  if (typeof DB === 'undefined' || typeof $ === 'undefined') return;

  DB.clav={
    products:{ds:{label:"クラバモックス小児用配合DS（乾燥粉末）",unit:"g",mgPerUnit:636.534,defaultAmount:2.73}},
    indications:{general:{label:"承認感染症",lo:(w,a)=>96.4*w,hi:(w,a)=>96.4*w,freq:[2],desc:"AMPC/CVA合計96.4mg/kg/day（AMPC 90mg/kg/day＋CVA 6.4mg/kg/day）を12時間ごと分2、食直前。表示成分量はAMPC+CVA合計。1.01g中AMPC 600mg＋CVA 42.9mgとして製剤量換算。"}},
    adult:null,source:"PMDA/MHLW クラバモックス小児用配合ドライシロップ",warning:"食直前投与。配合剤のため、画面の成分量はAMPC+CVA合計量です。"
  };
  DB.mino={
    products:{gran2:{label:"ミノマイシン顆粒2%",unit:"g",mgPerUnit:20,defaultAmount:2.7}},
    indications:{general:{label:"承認感染症",lo:(w,a)=>2*w,hi:(w,a)=>4*w,freq:[1,2],desc:"ミノサイクリン2～4mg/kg/day（製剤0.1～0.2g/kg/day）を12時間または24時間ごと。"}},
    adult:[200,200],source:"PMDA ミノマイシン顆粒2% 2026年6月電子添文",warning:"小児、特に歯牙形成期の8歳未満では歯牙着色等のため、他剤が使用できない・無効の場合にのみ適用を考慮。"
  };
  const cyproDose=(a)=>a<2?NaN:a<4?1.2:a<7?1.6:a<10?2.0:a<13?2.6:4.0;
  DB.cypro={
    products:{syr004:{label:"ペリアクチンシロップ0.04%",unit:"mL",mgPerUnit:0.4,defaultAmount:10}},
    indications:{general:{label:"アレルギー性疾患等",lo:(w,a)=>cyproDose(a)*(+$('freq').value||1),hi:(w,a)=>cyproDose(a)*(+$('freq').value||1),freq:[1,2,3],desc:"電子添文のAugsberger式参考量：2～3歳1.2mg/回、4～6歳1.6mg/回、7～9歳2mg/回、10～12歳2.6mg/回。通常1日1～3回。"}},
    adult:[4,12],source:"PMDA ペリアクチンシロップ0.04%電子添文"
  };
  DB.salbu={
    products:{syr004:{label:"ベネトリンシロップ0.04%",unit:"mL",mgPerUnit:0.4,defaultAmount:13.5}},
    indications:{general:{label:"気管支喘息・気管支炎等の気管支攣縮",lo:(w,a)=>a<5?0.3*w:NaN,hi:(w,a)=>a<5?0.3*w:NaN,freq:[3],desc:"乳幼児：サルブタモール0.3mg/kg/day（製剤0.75mL/kg/day）を分3。標準量：1歳未満3～6mL/day、1～<3歳6～9mL/day、3～<5歳9～15mL/day。"}},
    adult:[12,12],source:"PMDA/MHLW ベネトリンシロップ0.04%"
  };
  DB.lope={
    products:{gran005:{label:"ロペミン小児用細粒0.05%",unit:"g",mgPerUnit:0.5,defaultAmount:1.08}},
    indications:{acute:{label:"急性下痢症",lo:(w,a)=>a<0.5?NaN:0.02*w,hi:(w,a)=>a<0.5?NaN:0.04*w,freq:[2,3],desc:"ロペラミド0.02～0.04mg/kg/day（製剤0.04～0.08g/kg/day）を分2～3。"}},
    adult:[1,2],source:"PMDA/MHLW ロペミン小児用細粒0.05%",warning:"6か月未満は禁忌。6か月以上2歳未満は原則として投与を避け、治療上やむを得ない場合に限る。"
  };
  DB.diaSupp={
    products:{supp4:{label:"ダイアップ坐剤4mg",unit:"個",mgPerUnit:4,defaultAmount:1},supp6:{label:"ダイアップ坐剤6mg",unit:"個",mgPerUnit:6,defaultAmount:1},supp10:{label:"ダイアップ坐剤10mg",unit:"個",mgPerUnit:10,defaultAmount:1}},
    indications:{seizure:{label:"熱性けいれん／てんかんのけいれん発作",lo:(w,a)=>0,hi:(w,a)=>1*w,max:(w,a)=>1*w,freq:[1,2],perDoseLo:(w)=>0.4*w,perDoseHi:(w)=>0.5*w,desc:"1回0.4～0.5mg/kgを1日1～2回。1日1mg/kgを超えない。"}},
    adult:null,source:"PMDA/MHLW ダイアップ坐剤"
  };
  DB.mgo={
    products:{gran83:{label:"マグミット細粒83%",unit:"g",mgPerUnit:830,defaultAmount:0.87},tab100:{label:"マグミット錠100mg",unit:"錠",mgPerUnit:100,defaultAmount:4},tab200:{label:"マグミット錠200mg",unit:"錠",mgPerUnit:200,defaultAmount:2},tab250:{label:"マグミット錠250mg",unit:"錠",mgPerUnit:250,defaultAmount:2},tab330:{label:"マグミット錠330mg",unit:"錠",mgPerUnit:330,defaultAmount:2},tab500:{label:"マグミット錠500mg",unit:"錠",mgPerUnit:500,defaultAmount:1}},
    indications:{lax:{label:"緩下剤（1歳以上）",lo:(w,a)=>a<1?NaN:20*w,hi:(w,a)=>a<1?NaN:80*w,freq:[2],desc:"1歳以上：酸化Mg 20～80mg/kg/dayを食後分2。開始量の目安は40mg/kg/day。"}},
    adult:[500,2000],source:"PMDA マグミット細粒83%／錠 2025年小児用量追加",warning:"高Mg血症に注意。腎機能・長期投与・高用量では特に慎重に。"
  };
  DB.mediconCombo={
    products:{syr:{label:"メジコン配合シロップ",unit:"mL",mgPerUnit:2.5,defaultAmount:6}},
    indications:{cough:{label:"気管支炎・感冒/上気道炎等に伴う咳嗽・喀痰",lo:(w,a)=>a<0.25?NaN:a<8?7.5:a<15?22.5:45,hi:(w,a)=>a<0.25?NaN:a<8?20:a<15?40:60,freq:[3,4],desc:"製剤量基準：3か月～7歳 3～8mL/day、8～14歳 9～16mL/dayを分3～4。1mL中デキストロメトルファン2.5mg＋クレゾールスルホン酸K15mg。画面の成分量はデキストロメトルファン量。"}},
    adult:[45,60],source:"厚労省 臨床研究情報ポータル／メジコン配合シロップ"
  };
  Object.assign(DB.apap.products,{supp50:{label:"アンヒバ坐剤小児用50mg",unit:"個",mgPerUnit:50,defaultAmount:1},supp100:{label:"アンヒバ坐剤小児用100mg",unit:"個",mgPerUnit:100,defaultAmount:1},supp200:{label:"アンヒバ坐剤小児用200mg",unit:"個",mgPerUnit:200,defaultAmount:1}});
  const dompSuppDose=(a)=>a<3?10:30;
  DB.dompSupp={
    products:{supp10:{label:"ナウゼリン坐剤10mg",unit:"個",mgPerUnit:10,defaultAmount:2},supp30:{label:"ナウゼリン坐剤30mg",unit:"個",mgPerUnit:30,defaultAmount:2}},
    indications:{general:{label:"小児の悪心・嘔吐等",lo:(w,a)=>dompSuppDose(a)*(+$('freq').value||2),hi:(w,a)=>dompSuppDose(a)*(+$('freq').value||2),freq:[2,3],desc:"3歳未満：1回10mg、3歳以上：1回30mgを1日2～3回直腸内投与。"}},
    adult:null,source:"PMDA ナウゼリン坐剤10/30 2026年8月電子添文"
  };

  const options=[["clav","クラバモックス（AMPC/CVA）"],["mino","ミノサイクリン"],["cypro","シプロヘプタジン（ペリアクチン）"],["salbu","サルブタモール（ベネトリン）"],["lope","ロペラミド（ロペミン）"],["diaSupp","ジアゼパム坐剤（ダイアップ）"],["mgo","酸化マグネシウム（マグミット）"],["mediconCombo","メジコン配合シロップ"],["dompSupp","ドンペリドン坐剤（ナウゼリン）"]];
  const sel=$("drug");
  options.forEach(([v,t])=>{if(!sel.querySelector('option[value="'+v+'"]')){const o=document.createElement('option');o.value=v;o.textContent=t;sel.appendChild(o);}});

  const prevLoad=loadDrug;
  loadDrug=function(reset=true){
    prevLoad(reset);
    const k=$("drug").value;
    if(k==="clav"||k==="mgo") $("freq").innerHTML='<option value="2">分2</option>';
    else if(k==="mino") $("freq").innerHTML='<option value="1">分1</option><option value="2">分2</option>';
    else if(k==="cypro") $("freq").innerHTML='<option value="1">分1</option><option value="2">分2</option><option value="3">分3</option>';
    else if(k==="salbu") $("freq").innerHTML='<option value="3">分3</option>';
    else if(k==="lope"||k==="dompSupp") $("freq").innerHTML='<option value="2">分2</option><option value="3">分3</option>';
    else if(k==="diaSupp") $("freq").innerHTML='<option value="1">1回</option><option value="2">分2</option>';
    else if(k==="mediconCombo") $("freq").innerHTML='<option value="3">分3</option><option value="4">分4</option>';
    render();
  };

  const prevRender=render;
  render=function(){
    prevRender();
    const d=DB[$("drug").value];
    if(d&&d.warning){const out=$("out"); if(out) out.insertAdjacentHTML('beforeend','<div class="note"><b>薬剤固有の注意：</b>'+d.warning+'</div>');}
  };
})();
