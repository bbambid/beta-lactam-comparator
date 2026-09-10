/*
 * Pediatric Dose Audit formal runtime master
 * Version: 1.0.0
 * Application updated: 2026-09-11
 * PMDA data baseline: 2026-09-07 (individual records may state later audit dates)
 *
 * This file is the sole production JavaScript extension point after the core
 * bootstrap embedded in index.html. Legacy source files are retained only for
 * rollback/reference and must not be edited for new changes.
 */
window.PEDIATRIC_RELEASE=Object.freeze({version:'1.0.0',appUpdated:'2026-09-11',dataBaseline:'2026-09-07'});

/* ===== Migrated source: image-batch-01.js ===== */
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
    products:{gran83:{label:"マグミット細粒83%",unit:"g",mgPerUnit:833,defaultAmount:0.87},tab100:{label:"マグミット錠100mg",unit:"錠",mgPerUnit:100,defaultAmount:4},tab200:{label:"マグミット錠200mg",unit:"錠",mgPerUnit:200,defaultAmount:2},tab250:{label:"マグミット錠250mg",unit:"錠",mgPerUnit:250,defaultAmount:2},tab330:{label:"マグミット錠330mg",unit:"錠",mgPerUnit:330,defaultAmount:2},tab500:{label:"マグミット錠500mg",unit:"錠",mgPerUnit:500,defaultAmount:1}},
    indications:{lax:{label:"便秘症・緩下剤（1歳以上15歳未満）",lo:(w,a)=>a<1||a>=15?NaN:20*w,hi:(w,a)=>a<1||a>=15?NaN:80*w,max:(w,a)=>a<1||a>=15?NaN:80*w,freq:[2],desc:"通常、1歳以上の小児には酸化マグネシウムとして1日20～80mg/kgを食後の2回に分割経口投与する。小児は1日40mg/kgを開始用量の目安とし、患者の状態に応じて適宜増減する。（マグミット添付文書参照）",clinicalNote:"高マグネシウム血症、腎機能、長期投与、併用薬との服用間隔を確認する。"}},
    adult:[500,2000],source:"PMDA マグミット細粒83%／錠 電子添文（2025年8月改訂）",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/iyakuDetail/731040_2344009C1055_4_04",warning:"高Mg血症に注意。腎機能・長期投与・高用量では特に慎重に。"
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

/* ===== Migrated source: image-batch-02.js ===== */
// Image-derived formulation expansion batch 02.
// Drug/product names originated from the user-provided pediatric table.
// Concentrations/formulations were cross-checked against current PMDA product pages.
// Dosing logic remains ingredient-level and comes from the already-verified DB entries.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined') return;
 const add=(k,p)=>{ if(DB[k]) Object.assign(DB[k].products,p); };
 const src=(k,url,label)=>{ if(DB[k]){DB[k].sourceUrl=url; if(label)DB[k].source=label;} };

 add("keto",{
  zajitenDS:{label:"ザジテンドライシロップ0.1%",unit:"g",mgPerUnit:1,defaultAmount:1.08},
  zajitenSyr:{label:"ザジテンシロップ0.02%",unit:"mL",mgPerUnit:0.2,defaultAmount:5.4}
 });
 src("keto","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490003R1228_2?user=1","PMDA ザジテンドライシロップ0.1%／シロップ0.02%");

 add("meq",{
  zeslanGran:{label:"ゼスラン小児用細粒0.6%",unit:"g",mgPerUnit:6,defaultAmount:0.3},
  nipolazinGran:{label:"ニポラジン小児用細粒0.6%",unit:"g",mgPerUnit:6,defaultAmount:0.3}
 });
 src("meq","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4413004C2022_2?user=1","PMDA ゼスラン小児用細粒0.6%／ニポラジン小児用細粒0.6%");

 if(DB.cypro){
  Object.assign(DB.cypro.products,{
   periaTab4:{label:"ペリアクチン錠4mg",unit:"錠",mgPerUnit:4,defaultAmount:1},
   periaPow1:{label:"ペリアクチン散1%",unit:"g",mgPerUnit:10,defaultAmount:0.25}
  });
  DB.cypro.sourceUrl="https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=441";
 }

 add("olop",{
  alelockGran:{label:"アレロック顆粒0.5%",unit:"g",mgPerUnit:5,defaultAmount:1},
  alelockOD25:{label:"アレロックOD錠2.5mg",unit:"錠",mgPerUnit:2.5,defaultAmount:2},
  alelockOD5:{label:"アレロックOD錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:2}
 });
 src("olop","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490025D1022_2?user=1","PMDA アレロック顆粒／錠／OD錠");

 add("ceti",{
  zyrtecDS:{label:"ジルテックドライシロップ1.25%",unit:"g",mgPerUnit:12.5,defaultAmount:0.4},
  zyrtecTab5:{label:"ジルテック錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1},
  zyrtecTab10:{label:"ジルテック錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1}
 });
 src("ceti","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490020R1027_1?user=1","PMDA ジルテックDS1.25%／錠5・10mg");

 add("fexo",{
  allegraDS:{label:"アレグラドライシロップ5%",unit:"g",mgPerUnit:50,defaultAmount:1.2},
  allegraTab30:{label:"アレグラ錠30mg",unit:"錠",mgPerUnit:30,defaultAmount:2},
  allegraTab60:{label:"アレグラ錠60mg",unit:"錠",mgPerUnit:60,defaultAmount:2}
 });
 src("fexo","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490023F1024_1?user=1","PMDA アレグラDS5%／錠30・60mg");

 add("epi",{
  alegionDS:{label:"アレジオンドライシロップ1%",unit:"g",mgPerUnit:10,defaultAmount:1},
  alegionTab10:{label:"アレジオン錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1},
  alegionTab20:{label:"アレジオン錠20mg",unit:"錠",mgPerUnit:20,defaultAmount:1}
 });
 src("epi","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490014F1025_1?user=1","PMDA アレジオンDS1%／錠10・20mg");

 add("ambro",{
  mucosolbanDS:{label:"小児用ムコソルバンDS1.5%",unit:"g",mgPerUnit:15,defaultAmount:1.08},
  mucosolbanSyr:{label:"小児用ムコソルバンシロップ0.3%",unit:"mL",mgPerUnit:3,defaultAmount:5.4}
 });
 src("ambro","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2239001R1072_1?user=1","PMDA 小児用ムコソルバンDS1.5%／シロップ0.3%");

 add("carbo",{
  mucodyneDS:{label:"ムコダインDS50%",unit:"g",mgPerUnit:500,defaultAmount:1.08},
  mucodyneSyr:{label:"ムコダインシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10.8}
 });
 src("carbo","https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=22","PMDA ムコダインDS50%／シロップ5%");

 add("proc",{
  meptinDS:{label:"メプチンドライシロップ0.005%",unit:"g",mgPerUnit:0.05,defaultAmount:10},
  meptinSyr:{label:"メプチンシロップ5μg/mL",unit:"mL",mgPerUnit:0.005,defaultAmount:5},
  meptinMini:{label:"メプチンミニ錠25μg",unit:"錠",mgPerUnit:0.025,defaultAmount:1},
  meptinTab50:{label:"メプチン錠50μg",unit:"錠",mgPerUnit:0.05,defaultAmount:1}
 });
 src("proc","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2259004Q1111_1?user=1","PMDA メプチンDS／シロップ／ミニ錠／錠");

 add("tulooral",{
  hokunalinDS:{label:"ホクナリンDS0.1%小児用",unit:"g",mgPerUnit:1,defaultAmount:0.72},
  hokunalinTab1:{label:"ホクナリン錠1mg",unit:"錠",mgPerUnit:1,defaultAmount:1}
 });
 src("tulooral","https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=22","PMDA ホクナリン経口製剤");

 add("tulo",{
  hokPatch05:{label:"ホクナリンテープ0.5mg",unit:"枚",mgPerUnit:0.5,defaultAmount:1},
  hokPatch1:{label:"ホクナリンテープ1mg",unit:"枚",mgPerUnit:1,defaultAmount:1},
  hokPatch2:{label:"ホクナリンテープ2mg",unit:"枚",mgPerUnit:2,defaultAmount:1}
 });
 src("tulo","https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=22","PMDA ホクナリンテープ0.5／1／2mg");

 add("txa",{
  transaminSyr:{label:"トランサミンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}
 });
 src("txa","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/3327002Q1062_3?user=1","PMDA トランサミンシロップ5%");

 add("dime",{
  astominSyr:{label:"アストミンシロップ0.25%",unit:"mL",mgPerUnit:2.5,defaultAmount:9},
  astominDS:{label:"アストミン散／DS相当2.5%",unit:"g",mgPerUnit:25,defaultAmount:0.9}
 });
 src("dime","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2229001Q1054_2?user=1","PMDA アストミンシロップ0.25%");

 add("apap",{
  calonalGran20:{label:"カロナール細粒20%",unit:"g",mgPerUnit:200,defaultAmount:1.35},
  calonalGran50:{label:"カロナール細粒50%",unit:"g",mgPerUnit:500,defaultAmount:0.54},
  calonalSupp50:{label:"カロナール坐剤小児用50mg",unit:"個",mgPerUnit:50,defaultAmount:1},
  calonalSupp100:{label:"カロナール坐剤100mg",unit:"個",mgPerUnit:100,defaultAmount:1},
  calonalSupp200:{label:"カロナール坐剤200mg",unit:"個",mgPerUnit:200,defaultAmount:1},
  anhyba50:{label:"アンヒバ坐剤小児用50mg",unit:"個",mgPerUnit:50,defaultAmount:1},
  anhyba100:{label:"アンヒバ坐剤小児用100mg",unit:"個",mgPerUnit:100,defaultAmount:1},
  anhyba200:{label:"アンヒバ坐剤小児用200mg",unit:"個",mgPerUnit:200,defaultAmount:1}
 });
 src("apap","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1141007C1075_5?user=1","PMDA カロナール細粒・坐剤／アンヒバ坐剤");

 add("levo",{
  xyzalSyr:{label:"ザイザルシロップ0.05%",unit:"mL",mgPerUnit:0.5,defaultAmount:5},
  xyzalTab5:{label:"ザイザル錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1}
 });
 src("levo","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490028Q1028_1?user=1","PMDA ザイザルシロップ0.05%／錠5mg");

 add("mont",{
  singGran4:{label:"シングレア細粒4mg",unit:"包",mgPerUnit:4,defaultAmount:1},
  singChew5:{label:"シングレアチュアブル錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1},
  singTab10:{label:"シングレア錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1},
  kipGran4:{label:"キプレス細粒4mg",unit:"包",mgPerUnit:4,defaultAmount:1},
  kipChew5:{label:"キプレスチュアブル錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1},
  kipTab10:{label:"キプレス錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1}
 });
 src("mont","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490026C1021_2?user=1","PMDA モンテルカスト（シングレア／キプレス）");

 add("pran",{
  ononDS:{label:"オノンドライシロップ10%",unit:"g",mgPerUnit:100,defaultAmount:1.26}
 });
 src("pran","https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=449","PMDA オノンドライシロップ10%");

 add("theo",{
  theodurDS:{label:"テオドールDS20%",unit:"g",mgPerUnit:200,defaultAmount:0.9},
  theodurSyr:{label:"テオドールシロップ2%",unit:"mL",mgPerUnit:20,defaultAmount:9}
 });
 src("theo","https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=22","PMDA テオフィリン徐放製剤（テオドール）");

 add("tipe",{
  asverinDS2:{label:"アスベリンドライシロップ2%",unit:"g",mgPerUnit:20,defaultAmount:1.8},
  asverinPow10:{label:"アスベリン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.36},
  asverinSyr05:{label:"アスベリンシロップ0.5%",unit:"mL",mgPerUnit:5,defaultAmount:7.2},
  asverinSyrDisp2:{label:"アスベリンシロップ「調剤用」2%",unit:"mL",mgPerUnit:20,defaultAmount:1.8},
  asverinTab10:{label:"アスベリン錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:3},
  asverinTab20:{label:"アスベリン錠20mg",unit:"錠",mgPerUnit:20,defaultAmount:1.5}
 });
 src("tipe","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2249003B1037_3?user=1","PMDA アスベリン錠／散／DS／シロップ");

 // Keep product selector current after this augmentation.
 if(typeof loadDrug==="function" && typeof render==="function"){
  const prevLoad=loadDrug;
  loadDrug=function(reset=true){prevLoad(reset);render();};
 }
})();

/* ===== Migrated source: nkdesk-batch-01.js ===== */
// NKdesk candidate batch 01 — names from NKdesk; dosing must be verified against authoritative current sources.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const add=(k,name,obj)=>{DB[k]=obj;const s=$("drug");if(!s.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=name;s.appendChild(o);}};
 add("ebas","エバスチン（エバステル）",{products:{tab5:{label:"錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1},tab10:{label:"錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1}},indications:{general:{label:"アレルギー性鼻炎／蕁麻疹等（7歳以上）",lo:(w,a)=>a<7?NaN:5,hi:(w,a)=>a<7?NaN:10,freq:[1],desc:"7歳以上：5～10mgを1日1回"}},adult:[5,10],source:"PMDA エバスチン電子添文"});
 add("esome","エソメプラゾール（ネキシウム）",{products:{cap10:{label:"カプセル10mg",unit:"カプセル",mgPerUnit:10,defaultAmount:1},cap20:{label:"カプセル20mg",unit:"カプセル",mgPerUnit:20,defaultAmount:1}},indications:{gerd:{label:"胃食道逆流症等（1歳以上）",lo:(w,a)=>a<1?NaN:10,hi:(w,a)=>a<1?NaN:(w>=20?20:10),freq:[1],desc:"1歳以上：体重20kg未満10mg、20kg以上10～20mgを1日1回（適応別規定を確認）"}},adult:[10,20],source:"PMDA ネキシウム電子添文"});
 add("pyr","ピランテル（コンバントリン）",{products:{ds10:{label:"ドライシロップ10%",unit:"g",mgPerUnit:100,defaultAmount:1}},indications:{pin:{label:"蟯虫等",lo:(w,a)=>10*w,hi:(w,a)=>10*w,freq:[1],desc:"ピランテルとして10mg/kgを1回投与"}},adult:null,source:"PMDA コンバントリンドライシロップ電子添文"});
 add("levoT4","レボチロキシン（チラーヂンS）",{products:{pow001:{label:"散0.01%",unit:"g",mgPerUnit:0.1,defaultAmount:1}},indications:{hypo:{label:"甲状腺機能低下症",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[1],desc:"年齢・病態・検査値により個別調整。固定mg/kg監査にはしない"}},adult:null,source:"PMDA チラーヂンS散0.01%電子添文"});
 add("lacto","β-ガラクトシダーゼ（ミルラクト）",{products:{gran50:{label:"細粒50%",unit:"g",mgPerUnit:500,defaultAmount:0.5}},indications:{general:{label:"乳糖不耐等",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[1],desc:"哺乳時等の用法を含め、年齢・摂取乳糖量に応じた製剤量監査"}},adult:null,source:"PMDA ミルラクト細粒50%電子添文"});
 add("lactoB","ビフィズス菌・乳酸菌製剤",{products:{biof:{label:"ビオフェルミン配合散",unit:"g",mgPerUnit:1,defaultAmount:1.5},lacb:{label:"ラックビー微粒N",unit:"g",mgPerUnit:1,defaultAmount:1.5}},indications:{general:{label:"腸内菌叢異常による諸症状",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[3],desc:"製剤ごとの承認用量を優先。生菌製剤は成分mg/kg換算を主判定にしない"}},adult:[3,6],source:"各製剤PMDA電子添文"});
 add("lactoR","耐性乳酸菌製剤",{products:{bioR:{label:"ビオフェルミンR散",unit:"g",mgPerUnit:1,defaultAmount:0.75},lacR:{label:"ラックビーR散",unit:"g",mgPerUnit:1,defaultAmount:0.75}},indications:{general:{label:"抗菌薬投与時の腸内菌叢異常",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[3],desc:"併用抗菌薬の適応範囲と各製剤の承認用量を確認"}},adult:[3,3],source:"各製剤PMDA電子添文"});
 add("tannin","タンニン酸アルブミン",{products:{pow:{label:"タンニン酸アルブミン",unit:"g",mgPerUnit:1000,defaultAmount:1}},indications:{diarrhea:{label:"下痢症",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[3,4],desc:"年齢・症状により適宜増減。成人換算のみで小児標準量とはしない"}},adult:[3,4],source:"PMDA タンニン酸アルブミン電子添文"});
 add("scop","ロートエキス",{products:{pow10:{label:"ロートエキス散10%",unit:"g",mgPerUnit:100,defaultAmount:0.1}},indications:{general:{label:"胃腸管の痙攣性疼痛等",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[2,3],desc:"小児は年齢・症状により個別。古典的成人換算は補助表示のみ"}},adult:[0.2,0.9],source:"PMDA ロートエキス散電子添文"});
 add("tepre","テプレノン（セルベックス）",{products:{gran10:{label:"細粒10%",unit:"g",mgPerUnit:100,defaultAmount:0.5}},indications:{general:{label:"胃粘膜病変等",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[3],desc:"小児の承認標準mg/kg量がないため成人換算は補助のみ"}},adult:[150,150],source:"PMDA セルベックス細粒10%電子添文"});
 add("dexa","デキサメタゾン（デカドロンエリキシル）",{products:{elix001:{label:"エリキシル0.01%",unit:"mL",mgPerUnit:0.1,defaultAmount:5}},indications:{general:{label:"各種適応",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[1,2,3,4],desc:"適応・重症度で用量差が大きいため疾患別監査が必要"}},adult:[0.5,8],source:"PMDA デカドロンエリキシル0.01%電子添文"});
 add("feno","フェノテロール（ベロテック）",{products:{syr005:{label:"シロップ0.05%",unit:"mL",mgPerUnit:0.5,defaultAmount:7.5}},indications:{general:{label:"気管支喘息等",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[3],desc:"年齢別・体重別承認用量を確認して監査"}},adult:null,source:"PMDA ベロテックシロップ0.05%電子添文"});
 add("hydroxyz","ヒドロキシジン",{products:{syr:{label:"シロップ剤",unit:"mL",mgPerUnit:1,defaultAmount:5}},indications:{general:{label:"蕁麻疹・皮膚疾患に伴うそう痒等",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[2,3],desc:"製剤・適応・年齢で用量を個別確認"}},adult:null,source:"PMDA ヒドロキシジン製剤電子添文"});
 add("procOral","プロカテロール経口固形剤",{products:{tab25:{label:"錠25μg",unit:"錠",mgPerUnit:0.025,defaultAmount:1}},indications:{general:{label:"気管支喘息等",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[1,2],desc:"年齢別承認用量で監査。シロップとは別製剤として扱う"}},adult:[0.05,0.05],source:"PMDA プロカテロール塩酸塩錠電子添文"});
 add("flutiN","フルチカゾン点鼻液小児用",{products:{nasal25:{label:"点鼻液25μg/噴霧",unit:"噴霧",mgPerUnit:0.025,defaultAmount:2}},indications:{rhinitis:{label:"アレルギー性鼻炎",lo:(w,a)=>a<5?NaN:0.1,hi:(w,a)=>a<5?NaN:0.1,freq:[2],desc:"小児：各鼻腔1噴霧を1日2回（製品の年齢適応を確認）"}},adult:null,source:"PMDA フルチカゾン点鼻液25μg小児用電子添文"});
 add("flutiF","フルチカゾンフランカルボン酸点鼻（アラミスト）",{products:{nasal275:{label:"27.5μg/噴霧",unit:"噴霧",mgPerUnit:0.0275,defaultAmount:2}},indications:{rhinitis:{label:"アレルギー性鼻炎（2歳以上）",lo:(w,a)=>a<2?NaN:(a<15?0.055:0.11),hi:(w,a)=>a<2?NaN:(a<15?0.055:0.11),freq:[1],desc:"2～14歳：各鼻腔1噴霧を1日1回。15歳以上は各鼻腔2噴霧"}},adult:[0.11,0.11],source:"PMDA アラミスト点鼻液電子添文"});
 add("mometN","モメタゾン点鼻（ナゾネックス）",{products:{nasal50:{label:"50μg/噴霧",unit:"噴霧",mgPerUnit:0.05,defaultAmount:2}},indications:{rhinitis:{label:"アレルギー性鼻炎（3歳以上）",lo:(w,a)=>a<3?NaN:(a<12?0.1:0.2),hi:(w,a)=>a<3?NaN:(a<12?0.1:0.2),freq:[1],desc:"3～11歳：各鼻腔1噴霧を1日1回。12歳以上：各鼻腔2噴霧"}},adult:[0.2,0.2],source:"PMDA ナゾネックス点鼻液電子添文"});
 add("ketoN","ケトチフェン点鼻",{products:{nasal:{label:"点鼻液",unit:"噴霧",mgPerUnit:1,defaultAmount:4}},indications:{rhinitis:{label:"アレルギー性鼻炎",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[4],desc:"各鼻腔1噴霧を1日4回。年齢適応は製品電子添文を確認"}},adult:null,source:"PMDA ケトチフェン点鼻液電子添文"});
 add("cromoN","クロモグリク酸点鼻（インタール）",{products:{nasal:{label:"点鼻液",unit:"噴霧",mgPerUnit:1,defaultAmount:6}},indications:{rhinitis:{label:"アレルギー性鼻炎",lo:(w,a)=>NaN,hi:(w,a)=>NaN,freq:[6],desc:"各鼻腔1噴霧を1日6回"}},adult:null,source:"PMDA クロモグリク酸Na点鼻液電子添文"});
 add("budesN","ブデソニド点鼻粉末（リノコート）",{products:{spray:{label:"パウダースプレー",unit:"噴霧",mgPerUnit:1,defaultAmount:2}},indications:{rhinitis:{label:"アレルギー性鼻炎（6歳以上）",lo:(w,a)=>a<6?NaN:NaN,hi:(w,a)=>a<6?NaN:NaN,freq:[2],desc:"小児用法は電子添文の噴霧回数で監査"}},adult:null,source:"PMDA リノコートパウダースプレー電子添文"});
 const prev=loadDrug;
 loadDrug=function(reset=true){prev(reset);const k=$("drug").value;
  const map={ebas:[1],esome:[1],pyr:[1],levoT4:[1],lacto:[1],lactoB:[3],lactoR:[3],tannin:[3,4],scop:[2,3],tepre:[3],dexa:[1,2,3,4],feno:[3],hydroxyz:[2,3],procOral:[1,2],flutiN:[2],flutiF:[1],mometN:[1],ketoN:[4],cromoN:[6],budesN:[2]};
  if(map[k])$("freq").innerHTML=map[k].map(n=>'<option value="'+n+'">'+(n===1?'分1':'分'+n)+'</option>').join('');
  render();
 };
})();

/* ===== Migrated source: nkdesk-batch-02.js ===== */
// NKdesk batch 02 — 20 additional practical formulation/ingredient entries.
// NKdesk used for candidate names only; authoritative dose verification is kept separate.
(function(){if(typeof DB==='undefined'||typeof $==='undefined')return;
const A=(k,n,o)=>{DB[k]=o;const s=$("drug");if(!s.querySelector('option[value="'+k+'"]')){const x=document.createElement("option");x.value=k;x.textContent=n;s.appendChild(x);}};
const hold=(label,prod,src)=>({products:prod,indications:{general:{label,lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"現行電子添文・適応別用量を確認してから数値監査。成人換算値を小児標準量として使用しない。"}},adult:null,source:src});
A("cefalex","セファレキシン（ケフレックス）",hold("感染症", {g100:{label:"シロップ用細粒100",unit:"g",mgPerUnit:100,defaultAmount:2.5},g200:{label:"シロップ用細粒200",unit:"g",mgPerUnit:200,defaultAmount:1.25}},"PMDA セファレキシン電子添文"));
A("minoc","ミノサイクリン（ミノマイシン顆粒2%）",hold("感染症（原則8歳以上を中心に適応確認）",{gran2:{label:"顆粒2%",unit:"g",mgPerUnit:20,defaultAmount:1}},"PMDA ミノサイクリン電子添文"));
A("acy","アシクロビル",hold("単純疱疹／帯状疱疹／水痘",{gran40:{label:"顆粒40%",unit:"g",mgPerUnit:400,defaultAmount:0.5},ds80:{label:"DS80%",unit:"g",mgPerUnit:800,defaultAmount:0.25}},"PMDA アシクロビル電子添文"));
A("osel","オセルタミビル（タミフルDS3%）",hold("インフルエンザ治療・予防",{ds3:{label:"DS3%",unit:"g",mgPerUnit:30,defaultAmount:1.33}},"PMDA タミフルDS3%電子添文"));
A("lani","ラニナミビル（イナビル）",hold("インフルエンザ",{inh20:{label:"吸入粉末20mg",unit:"容器",mgPerUnit:20,defaultAmount:1}},"PMDA イナビル電子添文"));
A("zana","ザナミビル（リレンザ）",hold("インフルエンザ",{disk5:{label:"5mg/ブリスター",unit:"ブリスター",mgPerUnit:5,defaultAmount:2}},"PMDA リレンザ電子添文"));
A("balox","バロキサビル（ゾフルーザ）",hold("インフルエンザ",{tab10:{label:"錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1},tab20:{label:"錠20mg",unit:"錠",mgPerUnit:20,defaultAmount:1},gran2:{label:"顆粒2%分包",unit:"包",mgPerUnit:10,defaultAmount:1}},"PMDA ゾフルーザ電子添文"));
A("movLD","マクロゴール配合剤（モビコールLD）",hold("慢性便秘症（2歳以上）",{ld:{label:"配合内用剤LD",unit:"包",mgPerUnit:1,defaultAmount:1}},"PMDA モビコール配合内用剤電子添文"));
A("movHD","マクロゴール配合剤（モビコールHD）",hold("慢性便秘症",{hd:{label:"配合内用剤HD",unit:"包",mgPerUnit:1,defaultAmount:1}},"PMDA モビコール配合内用剤電子添文"));
A("loper","ロペラミド小児用0.05%",hold("下痢症",{gran005:{label:"細粒小児用0.05%",unit:"g",mgPerUnit:0.5,defaultAmount:0.8}},"PMDA ロペラミド塩酸塩細粒小児用電子添文"));
A("rebS","レベニンS散",hold("腸内菌叢異常",{pow:{label:"散",unit:"g",mgPerUnit:1,defaultAmount:1}},"PMDA レベニンS散電子添文"));
A("reb","レベニン散",hold("腸内菌叢異常",{pow:{label:"散",unit:"g",mgPerUnit:1,defaultAmount:0.75}},"PMDA レベニン散電子添文"));
A("pl","幼児用PL配合顆粒",hold("感冒症状（2歳以上）",{gran:{label:"幼児用PL配合顆粒",unit:"g",mgPerUnit:1,defaultAmount:1}},"PMDA 幼児用PL配合顆粒電子添文"));
A("acet20","アセトアミノフェン細粒20%",hold("解熱鎮痛",{gran20:{label:"細粒20%",unit:"g",mgPerUnit:200,defaultAmount:0.5}},"PMDA アセトアミノフェン電子添文"));
A("acet50","アセトアミノフェン細粒50%",hold("解熱鎮痛",{gran50:{label:"細粒50%",unit:"g",mgPerUnit:500,defaultAmount:0.2}},"PMDA アセトアミノフェン電子添文"));
A("dextMix","メジコン配合シロップ",hold("鎮咳",{syr:{label:"配合シロップ",unit:"mL",mgPerUnit:2.5,defaultAmount:3}},"PMDA メジコン配合シロップ電子添文"));
A("fusk","フスコデ配合シロップ",hold("鎮咳",{syr:{label:"配合シロップ",unit:"mL",mgPerUnit:1,defaultAmount:2.4}},"PMDA フスコデ配合シロップ電子添文"));
A("salb","サルブタモール（ベネトリンシロップ0.04%）",hold("気管支喘息等",{syr004:{label:"シロップ0.04%",unit:"mL",mgPerUnit:0.4,defaultAmount:7.5}},"PMDA ベネトリンシロップ電子添文"));
A("theoS","テオフィリン（テオドールシロップ2%）",hold("気管支喘息等",{syr2:{label:"シロップ2%",unit:"mL",mgPerUnit:20,defaultAmount:4.8}},"PMDA テオドールシロップ2%電子添文"));
A("tuloT","ツロブテロールテープ",hold("気管支喘息等",{t05:{label:"テープ0.5mg",unit:"枚",mgPerUnit:0.5,defaultAmount:1},t1:{label:"テープ1mg",unit:"枚",mgPerUnit:1,defaultAmount:1},t2:{label:"テープ2mg",unit:"枚",mgPerUnit:2,defaultAmount:1}},"PMDA ツロブテロールテープ電子添文"));
})();

/* ===== Migrated source: nkdesk-final.js ===== */
// Final NKdesk recovery + discontinued-product cleanup.
// Candidate names from NKdesk; no NKdesk Augsberger value is promoted to an approved dose.
(function(){if(typeof DB==='undefined'||typeof $==='undefined')return;
const S=$("drug"), add=(k,n,p,label,src)=>{if(!DB[k])DB[k]={products:p,indications:{general:{label,lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"現行の電子添文・適応別用量を優先して監査。NKdesk換算値は承認用量として使用しない。"}},adult:null,source:src};if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
add("cefteram","セフテラム ピボキシル",{ds10:{label:"細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:0.9}},"感染症","PMDA セフテラム ピボキシル電子添文");
add("cefix","セフィキシム",{ds5:{label:"細粒小児用5%",unit:"g",mgPerUnit:50,defaultAmount:1.2}},"感染症","PMDA セフィキシム電子添文");
add("fosfo","ホスホマイシン",{ds40:{label:"DS40%",unit:"g",mgPerUnit:400,defaultAmount:1}},"感染症","PMDA ホスホマイシン電子添文");
add("mide","ミデカマイシン",{ds10:{label:"DS10%",unit:"g",mgPerUnit:100,defaultAmount:1}},"感染症","PMDA ミデカマイシン電子添文");
add("jos","ジョサマイシン",{ds10:{label:"DS10%",unit:"g",mgPerUnit:100,defaultAmount:1}},"感染症","PMDA ジョサマイシン電子添文");
add("dext","デキストロメトルファン",{pow10:{label:"散10%",unit:"g",mgPerUnit:100,defaultAmount:0.1}},"鎮咳","PMDA デキストロメトルファン電子添文");
add("dimem","ジメモルファン",{ds25:{label:"DS2.5%",unit:"g",mgPerUnit:25,defaultAmount:0.9}},"鎮咳","PMDA ジメモルファン電子添文");
add("astomin","ジメモルファン（アストミンシロップ）",{syr025:{label:"シロップ0.25%",unit:"mL",mgPerUnit:2.5,defaultAmount:3}},"鎮咳","PMDA アストミンシロップ電子添文");
add("mgO","酸化マグネシウム",{pow:{label:"原末",unit:"g",mgPerUnit:1000,defaultAmount:0.5},tab250:{label:"錠250mg",unit:"錠",mgPerUnit:250,defaultAmount:2},tab330:{label:"錠330mg",unit:"錠",mgPerUnit:330,defaultAmount:1.5},tab500:{label:"錠500mg",unit:"錠",mgPerUnit:500,defaultAmount:1}},"便秘症等","PMDA 酸化マグネシウム電子添文");
add("gaba","ガバペンチン",{syr5:{label:"シロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:2}},"てんかん（3歳以上）","PMDA ガバペンシロップ電子添文");
add("ensit","エンシトレルビル（ゾコーバ）",{tab125:{label:"錠125mg",unit:"錠",mgPerUnit:125,defaultAmount:1}},"SARS-CoV-2感染症（小児適応・体重別用量を確認）","PMDA ゾコーバ錠電子添文");
add("tosped","トスフロキサシン小児用錠",{tab75:{label:"小児用錠75mg",unit:"錠",mgPerUnit:75,defaultAmount:1}},"感染症","PMDA トスフロキサシン小児用錠電子添文");
add("dompDS","ドンペリドンDS",{ds1:{label:"DS1%",unit:"g",mgPerUnit:10,defaultAmount:0.5}},"消化器症状","PMDA ドンペリドンDS電子添文");
add("fluEye","フルオロメトロン点眼",{eye01:{label:"点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:3}},"眼炎症（小児年齢を確認）","PMDA フルオロメトロン点眼液電子添文");
add("olopEye","オロパタジン点眼",{eye01:{label:"点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:4}},"アレルギー性結膜炎","PMDA オロパタジン点眼液電子添文");
add("tranEye","トラニラスト点眼",{eye05:{label:"点眼液0.5%",unit:"回",mgPerUnit:1,defaultAmount:4}},"アレルギー性結膜炎","PMDA トラニラスト点眼液電子添文");
add("cromoEye","クロモグリク酸Na点眼",{eye2:{label:"点眼液2%",unit:"回",mgPerUnit:1,defaultAmount:4}},"アレルギー性結膜炎","PMDA クロモグリク酸Na点眼液電子添文");
add("diazRect","ジアゼパム坐剤",{s4:{label:"坐剤4mg",unit:"個",mgPerUnit:4,defaultAmount:1},s6:{label:"坐剤6mg",unit:"個",mgPerUnit:6,defaultAmount:1},s10:{label:"坐剤10mg",unit:"個",mgPerUnit:10,defaultAmount:1}},"小児けいれん","PMDA ダイアップ坐剤電子添文");
add("bisac","ビサコジル坐剤",{s2:{label:"坐剤2mg",unit:"個",mgPerUnit:2,defaultAmount:1},s10:{label:"坐剤10mg",unit:"個",mgPerUnit:10,defaultAmount:1}},"便秘症","PMDA ビサコジル坐剤電子添文");
add("chloral","抱水クロラール坐剤",{s250:{label:"坐剤250mg",unit:"個",mgPerUnit:250,defaultAmount:1},s500:{label:"坐剤500mg",unit:"個",mgPerUnit:500,defaultAmount:1}},"鎮静・催眠等","PMDA 抱水クロラール坐剤電子添文");
// Remove known discontinued/transition-completed names if any earlier batch accidentally exposed them.
["アドソルビン","エンテロノンR","アクディーム","ノイチーム","ビソルボンシロップ","フルナーゼ点鼻小児用","アルデシンAQネーザル"].forEach(n=>[...S.options].filter(o=>o.textContent.includes(n)).forEach(o=>o.remove()));
})();

/* ===== Migrated source: image-batch-02-50.js ===== */
// Image table batch 02: 50 formulation/product records.
// Image supplied names only. Product availability/current labels are reconciled against PMDA; dosing reuses the verified ingredient logic where available.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined') return;
 const sel=$("drug");
 const clone=(x)=>JSON.parse(JSON.stringify(x));
 const addAlias=(key,label,base,products,source,sourceUrl)=>{
   if(!DB[base]) return;
   const d=Object.assign({},DB[base],{products,source:source||DB[base].source});
   if(sourceUrl)d.sourceUrl=sourceUrl;
   DB[key]=d;
   if(!sel.querySelector('option[value="'+key+'"]')){const o=document.createElement('option');o.value=key;o.textContent=label;sel.appendChild(o);}
 };
 const addHold=(key,label,products,indication,source,sourceUrl)=>{
   DB[key]={products,indications:{general:{label:indication,lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"現行電子添文の用法・用量を優先。画像表の数値は使用しません。"}},adult:null,source,sourceUrl};
   if(!sel.querySelector('option[value="'+key+'"]')){const o=document.createElement('option');o.value=key;o.textContent=label;sel.appendChild(o);}
 };
 // 1-18 antimicrobials / antivirals
 addAlias("img02_01","ペリアクチン散1%","cypro",{pow1:{label:"ペリアクチン散1%",unit:"g",mgPerUnit:10,defaultAmount:0.25}},"PMDA ペリアクチン散1%電子添文");
 addAlias("img02_02","アスベリン散10%","tipe",{pow10:{label:"アスベリン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.45}},"PMDA アスベリン散10%電子添文");
 addAlias("img02_03","ワイドシリン細粒20%","amox",{gran20:{label:"ワイドシリン細粒20%",unit:"g",mgPerUnit:200,defaultAmount:1.8}},"PMDA ワイドシリン細粒20%電子添文","https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=61");
 addAlias("img02_04","ワイドシリン細粒10%","amox",{gran10:{label:"ワイドシリン細粒10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}},"PMDA ワイドシリン細粒10%電子添文","https://www.info.pmda.go.jp/psearch/PackinsSearch?count=1000&effect=61");
 addAlias("img02_05","パセトシン細粒10%","amox",{gran10:{label:"パセトシン細粒10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}},"PMDA パセトシン細粒10%電子添文");
 addAlias("img02_06","ケフラール細粒小児用20%","ccr",{gran20:{label:"ケフラール細粒小児用20%",unit:"g",mgPerUnit:200,defaultAmount:1.8}},"PMDA ケフラール細粒小児用20%電子添文");
 addAlias("img02_07","トミロン細粒小児用10%","cefteram",{gran10:{label:"トミロン細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"PMDA トミロン細粒小児用10%電子添文");
 addAlias("img02_08","バナンドライシロップ5%","cpdx",{ds5:{label:"バナンドライシロップ5%",unit:"g",mgPerUnit:50,defaultAmount:3.6}},"PMDA バナンドライシロップ5%電子添文");
 addAlias("img02_09","セフゾン細粒小児用10%","cfdn",{gran10:{label:"セフゾン細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"PMDA セフゾン細粒小児用10%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132013C1031_4?user=1");
 addAlias("img02_10","フロモックス小児用細粒100mg","cfpn",{gran10:{label:"フロモックス小児用細粒100mg",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"PMDA フロモックス小児用細粒100mg電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132016C1027_1?user=1");
 addAlias("img02_11","メイアクトMS小児用細粒10%","cdtr",{gran10:{label:"メイアクトMS小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"PMDA メイアクトMS小児用細粒10%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132015C1103_1?user=1");
 addAlias("img02_12","エリスロシンドライシロップ10%","ery",{ds10:{label:"エリスロシンドライシロップ10%",unit:"g",mgPerUnit:100,defaultAmount:5}},"PMDA エリスロシンドライシロップ10%電子添文");
 addAlias("img02_13","クラリスドライシロップ10%小児用","cam",{ds10:{label:"クラリスドライシロップ10%小児用",unit:"g",mgPerUnit:100,defaultAmount:2.7}},"PMDA クラリスドライシロップ10%小児用電子添文");
 addAlias("img02_14","クラリシッドドライシロップ10%小児用","cam",{ds10:{label:"クラリシッドドライシロップ10%小児用",unit:"g",mgPerUnit:100,defaultAmount:2.7}},"PMDA クラリシッドドライシロップ10%小児用電子添文");
 addAlias("img02_15","ホスミシンドライシロップ400","fos",{ds40:{label:"ホスミシンドライシロップ400",unit:"g",mgPerUnit:400,defaultAmount:2.7}},"PMDA ホスミシンドライシロップ400電子添文");
 addAlias("img02_16","ホスミシンドライシロップ200","fos",{ds20:{label:"ホスミシンドライシロップ200",unit:"g",mgPerUnit:200,defaultAmount:5.4}},"PMDA ホスミシンドライシロップ200電子添文");
 addAlias("img02_17","ジスロマック細粒小児用10%","azi",{gran10:{label:"ジスロマック細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.8}},"PMDA ジスロマック細粒小児用10%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6149004C1030_3?user=1");
 addAlias("img02_18","オゼックス細粒小児用15%","tosu",{gran15:{label:"オゼックス細粒小児用15%",unit:"g",mgPerUnit:150,defaultAmount:1.44}},"PMDA オゼックス細粒小児用15%電子添文");

 // 19-29 rectal / skin / inhalation
 addAlias("img02_19","ホクナリンテープ0.5mg","tulo",{p:{label:"ホクナリンテープ0.5mg",unit:"枚",mgPerUnit:0.5,defaultAmount:1}},"PMDA ホクナリンテープ電子添文");
 addAlias("img02_20","ホクナリンテープ1mg","tulo",{p:{label:"ホクナリンテープ1mg",unit:"枚",mgPerUnit:1,defaultAmount:1}},"PMDA ホクナリンテープ電子添文");
 addAlias("img02_21","ホクナリンテープ2mg","tulo",{p:{label:"ホクナリンテープ2mg",unit:"枚",mgPerUnit:2,defaultAmount:1}},"PMDA ホクナリンテープ電子添文");
 addAlias("img02_22","アンヒバ坐剤小児用50mg","apap",{s:{label:"アンヒバ坐剤小児用50mg",unit:"個",mgPerUnit:50,defaultAmount:1}},"PMDA アンヒバ坐剤小児用電子添文");
 addAlias("img02_23","アンヒバ坐剤小児用100mg","apap",{s:{label:"アンヒバ坐剤小児用100mg",unit:"個",mgPerUnit:100,defaultAmount:1}},"PMDA アンヒバ坐剤小児用電子添文");
 addAlias("img02_24","アンヒバ坐剤小児用200mg","apap",{s:{label:"アンヒバ坐剤小児用200mg",unit:"個",mgPerUnit:200,defaultAmount:1}},"PMDA アンヒバ坐剤小児用電子添文");
 addAlias("img02_25","エスクレ坐剤250mg","chloral",{s:{label:"エスクレ坐剤「250」",unit:"個",mgPerUnit:250,defaultAmount:1}},"PMDA エスクレ坐剤電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1123700J1020_2?user=1");
 addAlias("img02_26","エスクレ坐剤500mg","chloral",{s:{label:"エスクレ坐剤「500」",unit:"個",mgPerUnit:500,defaultAmount:1}},"PMDA エスクレ坐剤電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1123700J1020_2?user=1");
 addHold("img02_27","ヒルドイドクリーム0.3%",{tube:{label:"ヒルドイドクリーム0.3%",unit:"g",mgPerUnit:3,defaultAmount:1}},"皮脂欠乏症等","PMDA ヒルドイドクリーム0.3%電子添文");
 addHold("img02_28","ヒルドイドソフト軟膏0.3%",{tube:{label:"ヒルドイドソフト軟膏0.3%",unit:"g",mgPerUnit:3,defaultAmount:1}},"皮脂欠乏症等","PMDA ヒルドイドソフト軟膏0.3%電子添文");
 addHold("img02_29","ヒルドイドローション0.3%",{b:{label:"ヒルドイドローション0.3%",unit:"g",mgPerUnit:3,defaultAmount:1}},"皮脂欠乏症等","PMDA ヒルドイドローション0.3%電子添文");
 addHold("img02_30","ベネトリン吸入液0.5%",{neb:{label:"ベネトリン吸入液0.5%",unit:"mL",mgPerUnit:5,defaultAmount:0.3}},"気管支喘息等","PMDA ベネトリン吸入液0.5%電子添文");
 addHold("img02_31","パルミコート吸入液0.5mg",{neb:{label:"パルミコート吸入液0.5mg",unit:"アンプル",mgPerUnit:0.5,defaultAmount:1}},"気管支喘息","PMDA パルミコート吸入液電子添文");

 // 32-50 allergy/respiratory oral formulations
 addAlias("img02_32","ゼスラン小児用細粒0.6%","meq",{g:{label:"ゼスラン小児用細粒0.6%",unit:"g",mgPerUnit:6,defaultAmount:0.3}},"PMDA ゼスラン小児用細粒0.6%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4413004C2022_2?user=1");
 addAlias("img02_33","ニポラジン小児用細粒0.6%","meq",{g:{label:"ニポラジン小児用細粒0.6%",unit:"g",mgPerUnit:6,defaultAmount:0.3}},"PMDA ニポラジン小児用細粒0.6%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4413004C2030_1?user=1");
 addHold("img02_34","ポララミン散1%",{g:{label:"ポララミン散1%",unit:"g",mgPerUnit:10,defaultAmount:0.2}},"アレルギー性疾患","PMDA d-クロルフェニラミンマレイン酸塩製剤電子添文");
 addAlias("img02_35","ザジテンドライシロップ0.1%","keto",{g:{label:"ザジテンドライシロップ0.1%",unit:"g",mgPerUnit:1,defaultAmount:1.08}},"PMDA ザジテンドライシロップ0.1%電子添文");
 addAlias("img02_36","アレジオンドライシロップ1%","epi",{g:{label:"アレジオンドライシロップ1%",unit:"g",mgPerUnit:10,defaultAmount:1}},"PMDA アレジオンドライシロップ1%電子添文");
 addAlias("img02_37","エバステルドライシロップ1%","ebas",{g:{label:"エバステルドライシロップ1%",unit:"g",mgPerUnit:10,defaultAmount:0.5}},"PMDA エバステルドライシロップ1%電子添文");
 addAlias("img02_38","ジルテックドライシロップ1.25%","ceti",{g:{label:"ジルテックドライシロップ1.25%",unit:"g",mgPerUnit:12.5,defaultAmount:0.4}},"PMDA ジルテックドライシロップ1.25%電子添文");
 addAlias("img02_39","アレロック顆粒0.5%","olop",{g:{label:"アレロック顆粒0.5%",unit:"g",mgPerUnit:5,defaultAmount:1}},"PMDA アレロック顆粒0.5%電子添文");
 addAlias("img02_40","アレグラドライシロップ5%","fexo",{g:{label:"アレグラドライシロップ5%",unit:"g",mgPerUnit:50,defaultAmount:1.2}},"PMDA アレグラドライシロップ5%電子添文");
 addAlias("img02_41","ムコソルバンドライシロップ1.5%","ambro",{g:{label:"ムコソルバンドライシロップ1.5%",unit:"g",mgPerUnit:15,defaultAmount:1.08}},"PMDA ムコソルバンDS1.5%電子添文");
 addAlias("img02_42","ムコダインドライシロップ50%","carbo",{g:{label:"ムコダインドライシロップ50%",unit:"g",mgPerUnit:500,defaultAmount:1.08}},"PMDA ムコダインDS50%電子添文");
 addHold("img02_43","ビソルボン細粒2%",{g:{label:"ビソルボン細粒2%",unit:"g",mgPerUnit:20,defaultAmount:0.5}},"去痰","PMDA ブロムヘキシン塩酸塩細粒2%電子添文");
 addAlias("img02_44","メプチン顆粒0.01%","proc",{g:{label:"メプチン顆粒0.01%",unit:"g",mgPerUnit:0.1,defaultAmount:0.5}},"PMDA メプチン顆粒0.01%電子添文");
 addAlias("img02_45","メプチンミニ錠25μg","proc",{t:{label:"メプチンミニ錠25μg",unit:"錠",mgPerUnit:0.025,defaultAmount:1}},"PMDA メプチンミニ錠25μg電子添文");
 addAlias("img02_46","ホクナリンドライシロップ0.1%小児用","tulooral",{g:{label:"ホクナリンドライシロップ0.1%小児用",unit:"g",mgPerUnit:1,defaultAmount:0.72}},"PMDA ホクナリンドライシロップ0.1%小児用電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2259002F1065_5?user=1");
 addAlias("img02_47","テオドール錠50mg","theo",{t:{label:"テオドール錠50mg",unit:"錠",mgPerUnit:50,defaultAmount:2}},"PMDA テオドール錠50mg電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2251001D1061_1?user=1");
 addHold("img02_48","テオドール錠100mg",{t:{label:"テオドール錠100mg",unit:"錠",mgPerUnit:100,defaultAmount:1}},"気管支喘息等","PMDA テオフィリン徐放錠電子添文");
 addAlias("img02_49","ホクナリン錠1mg","tulooral",{t:{label:"ホクナリン錠1mg",unit:"錠",mgPerUnit:1,defaultAmount:1}},"PMDA ホクナリン錠1mg電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2259002F1065_5?user=1");
 addAlias("img02_50","カロナール細粒20%","apap",{g:{label:"カロナール細粒20%",unit:"g",mgPerUnit:200,defaultAmount:0.5}},"PMDA カロナール細粒20%電子添文");

 // shared frequency handling for exact-product aliases
 const prevLoad=loadDrug;
 loadDrug=function(reset=true){
   prevLoad(reset);
   const k=$("drug").value;
   const baseFreq={
     img02_01:[1,2,3],img02_02:[3],img02_03:[3,4],img02_04:[3,4],img02_05:[3,4],
     img02_06:[3],img02_07:[3],img02_08:[2,3],img02_09:[3],img02_10:[3],img02_11:[3],
     img02_12:[4,5,6],img02_13:[2,3],img02_14:[2,3],img02_15:[3,4],img02_16:[3,4],img02_17:[1],img02_18:[2],
     img02_19:[1],img02_20:[1],img02_21:[1],img02_22:[1,2,3,4],img02_23:[1,2,3,4],img02_24:[1,2,3,4],
     img02_25:[1],img02_26:[1],img02_30:[1,2,3,4],img02_31:[1,2],
     img02_32:[2],img02_33:[2],img02_34:[2,3],img02_35:[2],img02_36:[1],img02_37:[1],img02_38:[2],
     img02_39:[2],img02_40:[2],img02_41:[3],img02_42:[3],img02_43:[3],img02_44:[2,3],img02_45:[1,2],
     img02_46:[2],img02_47:[2],img02_48:[2],img02_49:[2],img02_50:[1,2,3,4]
   };
   if(baseFreq[k]) $("freq").innerHTML=baseFreq[k].map(n=>'<option value="'+n+'">'+(n===1?'分1':'分'+n)+'</option>').join('');
   render();
 };
})();

/* ===== Migrated source: image-final.js ===== */
// Final image-table recovery. Image values are NOT dosing sources.
(function(){if(typeof DB==='undefined'||typeof $==='undefined')return;
const S=$("drug");
const A=(k,n,b,p,src,url)=>{if(!DB[b])return;DB[k]=Object.assign({},DB[b],{products:p,source:src||DB[b].source,sourceUrl:url||DB[b].sourceUrl});if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
const H=(k,n,p,lab,src,url)=>{DB[k]={products:p,indications:{general:{label:lab,lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"現行電子添文の用法・用量を優先。画像表の用量値は使用しません。"}},adult:null,source:src,sourceUrl:url};if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
A("imgF01","リンデロンシロップ0.01%","dexa",{s:{label:"リンデロンシロップ0.01%",unit:"mL",mgPerUnit:0.1,defaultAmount:5}},"PMDA リンデロンシロップ0.01%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454004B1040_2?user=1");
A("imgF02","ザジテンシロップ0.02%","keto",{s:{label:"ザジテンシロップ0.02%",unit:"mL",mgPerUnit:0.2,defaultAmount:5}},"PMDA ザジテンシロップ0.02%電子添文");
A("imgF03","ザイザルシロップ0.05%","levo",{s:{label:"ザイザルシロップ0.05%",unit:"mL",mgPerUnit:0.5,defaultAmount:5}},"PMDA ザイザルシロップ0.05%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490028Q1028_1?user=1");
H("imgF04","ポララミンシロップ0.04%",{s:{label:"ポララミンシロップ0.04%",unit:"mL",mgPerUnit:0.4,defaultAmount:5}},"アレルギー性疾患","PMDA d-クロルフェニラミンマレイン酸塩シロップ電子添文");
A("imgF05","ゼスランシロップ0.03%","meq",{s:{label:"ゼスランシロップ0.03%",unit:"mL",mgPerUnit:0.3,defaultAmount:6}},"PMDA ゼスランシロップ0.03%電子添文");
A("imgF06","ムコダインシロップ5%","carbo",{s:{label:"ムコダインシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10.8}},"PMDA ムコダインシロップ5%電子添文");
A("imgF07","ムコソルバンシロップ0.3%","ambro",{s:{label:"ムコソルバンシロップ0.3%",unit:"mL",mgPerUnit:3,defaultAmount:5.4}},"PMDA ムコソルバンシロップ0.3%電子添文");
A("imgF08","アストミンシロップ0.25%","dime",{s:{label:"アストミンシロップ0.25%",unit:"mL",mgPerUnit:2.5,defaultAmount:3}},"PMDA アストミンシロップ0.25%電子添文");
A("imgF09","メプチンシロップ5μg/mL","proc",{s:{label:"メプチンシロップ5μg/mL",unit:"mL",mgPerUnit:0.005,defaultAmount:3}},"PMDA メプチンシロップ5μg/mL電子添文");
A("imgF10","アスベリンシロップ0.5%","tipe",{s:{label:"アスベリンシロップ0.5%",unit:"mL",mgPerUnit:5,defaultAmount:3}},"PMDA アスベリンシロップ0.5%電子添文");
A("imgF11","トランサミンシロップ5%","txa",{s:{label:"トランサミンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}},"PMDA トランサミンシロップ5%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/3327002Q1062_3?user=1");
A("imgF12","カロナールシロップ2%","apap",{s:{label:"カロナールシロップ2%",unit:"mL",mgPerUnit:20,defaultAmount:13.5}},"PMDA カロナールシロップ2%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1141007Q1048_5?user=1");
A("imgF13","ベネトリンシロップ0.04%","salb",{s:{label:"ベネトリンシロップ0.04%",unit:"mL",mgPerUnit:0.4,defaultAmount:7.5}},"PMDA ベネトリンシロップ0.04%電子添文");
A("imgF14","テオドールシロップ2%","theoS",{s:{label:"テオドールシロップ2%",unit:"mL",mgPerUnit:20,defaultAmount:4.8}},"PMDA テオドールシロップ2%電子添文");
A("imgF15","フスコデ配合シロップ","fusk",{s:{label:"フスコデ配合シロップ",unit:"mL",mgPerUnit:1,defaultAmount:2.4}},"PMDA フスコデ配合シロップ電子添文");
A("imgF16","メジコン配合シロップ","dextMix",{s:{label:"メジコン配合シロップ",unit:"mL",mgPerUnit:2.5,defaultAmount:3}},"PMDA メジコン配合シロップ電子添文");
H("imgF17","セレスタミン配合シロップ",{s:{label:"セレスタミン配合シロップ",unit:"mL",mgPerUnit:1,defaultAmount:5}},"アレルギー性疾患","PMDA セレスタミン配合シロップ電子添文");
H("imgF18","インタール吸入液1%",{a:{label:"インタール吸入液1%",unit:"アンプル",mgPerUnit:20,defaultAmount:1}},"気管支喘息","PMDA クロモグリク酸Na吸入液電子添文");
H("imgF19","メプチン吸入液ユニット0.3mL",{a:{label:"メプチン吸入液ユニット0.3mL",unit:"個",mgPerUnit:0.03,defaultAmount:1}},"気管支喘息等","PMDA メプチン吸入液電子添文");
H("imgF20","ガランターゼ散50%",{g:{label:"ガランターゼ散50%",unit:"g",mgPerUnit:500,defaultAmount:0.5}},"乳糖不耐症","PMDA β-ガラクトシダーゼ製剤電子添文");
const prev=loadDrug;loadDrug=function(reset=true){prev(reset);const k=$("drug").value;const m={imgF01:[1,2,3,4],imgF02:[2],imgF03:[1,2],imgF04:[2,3],imgF05:[2],imgF06:[3],imgF07:[3],imgF08:[3],imgF09:[2,3],imgF10:[3],imgF11:[3,4],imgF12:[1,2,3,4],imgF13:[3],imgF14:[2],imgF15:[3],imgF16:[3],imgF17:[1,2,3,4],imgF18:[4],imgF19:[1,2,3,4],imgF20:[1,2,3]};if(m[k])$("freq").innerHTML=m[k].map(n=>'<option value="'+n+'">'+(n===1?'分1':'分'+n)+'</option>').join("");render();};
})();

/* ===== Migrated source: coverage-audit-2026-09.js ===== */
// Comprehensive pediatric coverage + evidence audit (2026-09).
// NKdesk/user image are candidate-name sources only. Approved doses come from PMDA/MHLW current labeling.
// This layer runs last: removes discontinued/wrong aliases, adds missed current formulations, and upgrades audit metadata.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined') return;
 const S=$("drug");
 const removeKey=(k)=>{ if(DB[k]) delete DB[k]; const o=S.querySelector('option[value="'+k+'"]'); if(o)o.remove(); };
 // Confirmed obsolete / non-current product aliases or erroneous concentration aliases.
 ["jos","mide","img02_06","img02_36","img02_40"].forEach(removeKey);

 const addOption=(k,n)=>{if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
 const alias=(k,n,b,p,src,url,note)=>{
   if(!DB[b]) return;
   DB[k]=Object.assign({},DB[b],{products:p,source:src||DB[b].source,sourceUrl:url||DB[b].sourceUrl,auditStatus:"現行製剤確認済み",auditNote:note||""});
   addOption(k,n);
 };
 const exact=(k,n,p,inds,adult,src,url,note)=>{
   DB[k]={products:p,indications:inds,adult,source:src,sourceUrl:url,auditStatus:"承認用量確認済み",auditNote:note||""};
   addOption(k,n);
 };

 // Antimicrobials: exact current formulation coverage.
 alias("aud_saw10","サワシリン細粒10%","amox",{g:{label:"サワシリン細粒10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}},"PMDA サワシリン細粒10%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_unasin","ユナシン細粒小児用10%","sult",{g:{label:"ユナシン細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:2.7}},"PMDA ユナシン細粒小児用10%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_cefaclor100","ケフラール細粒小児用100mg","ccr",{g:{label:"ケフラール細粒小児用100mg（100mg/g）",unit:"g",mgPerUnit:100,defaultAmount:3.6}},"厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132005C1053","画像表の20%表記ではなく、現行製剤100mg/gで登録");
 alias("aud_cephalex100","ケフレックスシロップ用細粒100","cephalex",{g:{label:"ケフレックスシロップ用細粒100",unit:"g",mgPerUnit:100,defaultAmount:4.5}},"厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132002R1141");
 alias("aud_cephalex200","ケフレックスシロップ用細粒200","cephalex",{g:{label:"ケフレックスシロップ用細粒200",unit:"g",mgPerUnit:200,defaultAmount:2.25}},"PMDA ケフレックスシロップ用細粒200電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 exact("aud_cefrox","オラスポア小児用ドライシロップ10%",{g:{label:"オラスポア小児用ドライシロップ10%",unit:"g",mgPerUnit:100,defaultAmount:3}},
 {general:{label:"承認感染症",lo:w=>30*w,hi:w=>30*w,freq:[3],desc:"セフロキサジンとして30mg/kg/day・分3。症状により適宜増減。"}},null,
 "厚労省 現行添付文書情報（セフロキサジン）","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132006R1093");
 alias("aud_ery20","エリスロシンW顆粒20%","ery",{g:{label:"エリスロシンW顆粒20%",unit:"g",mgPerUnit:200,defaultAmount:2.5}},"PMDA エリスロシンW顆粒20%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_faro","ファロムドライシロップ小児用10%","faro",{g:{label:"ファロムドライシロップ小児用10%",unit:"g",mgPerUnit:100,defaultAmount:2.7}},"PMDA ファロムDS小児用10%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_tebi","オラペネム小児用細粒10%","tebi",{g:{label:"オラペネム小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.44}},"PMDA オラペネム小児用細粒10%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_acy80","アシクロビルドライシロップ80%","acy",{g:{label:"アシクロビルDS80%",unit:"g",mgPerUnit:800,defaultAmount:0.25}},"PMDA アシクロビルDS80%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_zovi40","ゾビラックス顆粒40%","acy",{g:{label:"ゾビラックス顆粒40%",unit:"g",mgPerUnit:400,defaultAmount:0.5}},"PMDA ゾビラックス顆粒40%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_vala","バルトレックス顆粒50%","vala",{g:{label:"バルトレックス顆粒50%",unit:"g",mgPerUnit:500,defaultAmount:1.5}},"PMDA バルトレックス顆粒50%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_tamiflu","タミフルドライシロップ3%","osel",{g:{label:"タミフルドライシロップ3%",unit:"g",mgPerUnit:30,defaultAmount:2.4}},"PMDA タミフルDS3%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");

 // Allergy / respiratory current formulations.
 alias("aud_claritin","クラリチンドライシロップ1%","lora",{g:{label:"クラリチンDS1%",unit:"g",mgPerUnit:10,defaultAmount:1}},"PMDA クラリチンDS1%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_cetiTakata","セチリジン塩酸塩DS1.25%「タカタ」","ceti",{g:{label:"セチリジン塩酸塩DS1.25%「タカタ」",unit:"g",mgPerUnit:12.5,defaultAmount:0.4}},"PMDA セチリジン塩酸塩DS1.25%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_kipres","キプレス細粒4mg","mont",{pack:{label:"キプレス細粒4mg",unit:"包",mgPerUnit:4,defaultAmount:1}},"厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%264490026C1021");
 alias("aud_onon","オノンドライシロップ10%","pran",{g:{label:"オノンドライシロップ10%",unit:"g",mgPerUnit:100,defaultAmount:1.26}},"厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%264490017R1033");
 alias("aud_ketoDS","ケトチフェンドライシロップ0.1%","keto",{g:{label:"ケトチフェンDS0.1%",unit:"g",mgPerUnit:1,defaultAmount:1.08}},"PMDA ケトチフェンDS0.1%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_pemi","アレギサールドライシロップ0.5%","pemi",{g:{label:"アレギサールDS0.5%",unit:"g",mgPerUnit:5,defaultAmount:1.44}},"PMDA アレギサールDS0.5%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490011F1021_5?user=1");
 alias("aud_riza10","リザベン細粒10%","tran",{g:{label:"リザベン細粒10%",unit:"g",mgPerUnit:100,defaultAmount:0.9}},"厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%264490002C1123");
 alias("aud_riza5","リザベンドライシロップ5%","tran",{g:{label:"リザベンDS5%",unit:"g",mgPerUnit:50,defaultAmount:1.8}},"PMDA リザベンDS5%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_theoDS","テオフィリンドライシロップ20%","theo",{g:{label:"テオフィリン徐放性DS20%",unit:"g",mgPerUnit:200,defaultAmount:0.9}},"PMDA テオフィリン徐放性DS20%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_meptinDS","メプチンドライシロップ0.005%","proc",{g:{label:"メプチンDS0.005%",unit:"g",mgPerUnit:0.05,defaultAmount:0.5}},"厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%262259004R2024");
 alias("aud_astominPow","アストミン散10%","dime",{g:{label:"アストミン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.3}},"PMDA アストミン散10%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
 alias("aud_asverinDS","アスベリンドライシロップ2%","tipe",{g:{label:"アスベリンDS2%",unit:"g",mgPerUnit:20,defaultAmount:2.25}},"PMDA アスベリンDS2%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");

 // Newly missed current practical products with approved pediatric regimens.
 exact("aud_fungizone","ファンギゾンシロップ100mg/mL",{mL:{label:"ファンギゾンシロップ100mg/mL",unit:"mL",mgPerUnit:100,defaultAmount:1}},
 {candida:{label:"消化管カンジダ異常増殖",lo:()=>100,hi:()=>400,freq:[2,3,4],perDoseLo:()=>50,perDoseHi:()=>100,desc:"小児1回0.5～1mL（50～100mg）を1日2～4回、食後。"}},null,
 "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266173001Q1047");
 exact("aud_pontal","ポンタールシロップ3.25%",{mL:{label:"ポンタールシロップ3.25%",unit:"mL",mgPerUnit:32.5,defaultAmount:3.6}},
 {uri:{label:"急性上気道炎の解熱・鎮痛",lo:(w)=>6.5*w,hi:(w)=>13*w,max:(w)=>13*w,freq:[1,2],perDoseLo:w=>6.5*w,perDoseHi:w=>6.5*w,desc:"小児1回0.2mL/kg（メフェナム酸6.5mg/kg）。原則1日2回まで。空腹時を避ける。"}},null,
 "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261141005Q1050");
 exact("aud_k2","ケイツーシロップ0.2%",{mL:{label:"ケイツーシロップ0.2%",unit:"mL",mgPerUnit:2,defaultAmount:1}},
 {treat:{label:"新生児出血症等の治療",lo:()=>2,hi:()=>6,freq:[1],desc:"1日1回1mL（2mg）。症状により3mL（6mg）まで。"},prevent:{label:"新生児・乳児ビタミンK欠乏性出血症の予防",lo:()=>2,hi:()=>2,freq:[1],desc:"1回1mL（2mg）。出生後・1週/退院時・1か月時の規定スケジュール。"}},null,
 "PMDA ケイツーシロップ0.2%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530258_3160002Q1040_3_02");
 exact("aud_hemangiol","ヘマンジオルシロップ小児用0.375%",{mL:{label:"ヘマンジオルシロップ小児用0.375%",unit:"mL",mgPerUnit:3.75,defaultAmount:4.8}},
 {hem:{label:"乳児血管腫",lo:w=>1*w,hi:w=>3*w,max:w=>3*w,freq:[2],desc:"1mg/kg/day・分2から開始。2日以上あけて1mg/kgずつ増量し3mg/kg/day・分2で維持。空腹時を避ける。"}},null,
 "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%262900003Q1029");

 // Approved label has age-adjustment but no pediatric fixed mg/kg: keep separate from practical target.
 exact("aud_polaramineS","ポララミンシロップ0.04%",{mL:{label:"ポララミンシロップ0.04%",unit:"mL",mgPerUnit:0.4,defaultAmount:5}},
 {allergy:{label:"アレルギー性疾患",lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"承認添付文書は成人1回2mgを1日1～4回、年齢・症状により適宜増減。小児の固定mg/kg承認量は設定されていない。"}},[2,8],
 "PMDA d-クロルフェニラミンマレイン酸塩電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/","小児mg/kgは実務目安レイヤーで別表示");

 // Practical-dose evidence layer — never mixed with approved dose.
 if(typeof PRACTICE!=='undefined'){
   PRACTICE.tipe={dose:(w)=>2*w,freq:[3],label:"2 mg/kg/day・分3を目安",source:"治療薬ハンドブック（ユーザー提示）",sourceType:"標準的医薬品二次資料",note:"SKGH小児薬用量表では1～2mg/kg/day・分3で補強。承認年齢別量とは別レイヤー。",sourceUrl:"https://www.skgh.jp/wp/wp-content/themes/skgh/department/pharmacy/for-pharmacist/pdf/pediatric-dose.pdf"};
   PRACTICE.cypro={dose:(w)=>0.25*w,freq:[3],label:"0.25 mg/kg/day・分3を目安",source:"治療薬ハンドブック（ユーザー提示）",sourceType:"標準的医薬品二次資料",note:"SKGH小児薬用量表でも0.25mg/kg/dayを確認（同資料は1～3回分割）。承認量とは別レイヤー。",sourceUrl:"https://www.skgh.jp/wp/wp-content/themes/skgh/department/pharmacy/for-pharmacist/pdf/pediatric-dose.pdf"};
   PRACTICE.aud_polaramineS={dose:(w)=>0.15*w,freq:[3],label:"0.15 mg/kg/dayを実務参考",source:"SKGH 小児薬用量表",sourceType:"病院薬剤部公開資料",sourceUrl:"https://www.skgh.jp/wp/wp-content/themes/skgh/department/pharmacy/for-pharmacist/pdf/pediatric-dose.pdf",note:"承認添付文書は小児mg/kg固定量を規定していないため、実務参考としてのみ表示。"};
 }

 // Show direct evidence/audit metadata in every result where available.
 const prevRender=render;
 render=function(){
   prevRender();
   const d=DB[$("drug").value],out=$("out");
   if(!d||!out)return;
   let h="";
   if(d.auditStatus)h+='<div class="note"><b>監査状態：</b>'+d.auditStatus+(d.auditNote?'｜'+d.auditNote:'')+'</div>';
   if(d.sourceUrl)h+='<div class="note"><b>承認根拠：</b><a href="'+d.sourceUrl+'" target="_blank" rel="noopener">'+d.source+' ↗</a></div>';
   if(h)out.insertAdjacentHTML("beforeend",h);
 };

 // Exact frequency overrides for newly added products.
 const prevLoad=loadDrug;
 loadDrug=function(reset=true){
   prevLoad(reset); const k=$("drug").value;
   const M={aud_cefrox:[3],aud_fungizone:[2,3,4],aud_pontal:[1,2],aud_k2:[1],aud_hemangiol:[2],aud_polaramineS:[1,2,3,4],aud_meptinDS:[1,2,3],aud_cefaclor100:[3],aud_cephalex100:[4],aud_cephalex200:[4]};
   if(M[k]) $("freq").innerHTML=M[k].map(n=>'<option value="'+n+'">'+(n===1?'1回/分1':'分'+n)+'</option>').join("");
   render();
 };
})();

/* ===== Migrated source: coverage-audit-local-2026-09.js ===== */
// Local/topical + remaining systemic coverage audit, 2026-09
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const S=$("drug");
 const add=(k,n,obj)=>{DB[k]=obj;if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
 const mk=(products,inds,src,url,note)=>({products,indications:inds,adult:null,source:src,sourceUrl:url,auditStatus:"承認用量確認済み",auditNote:note||""});
 // Current systemic/suppository products not previously represented with exact current label logic.
 add("aud_voltarenSupp","ボルタレンサポ12.5/25/50mg",mk(
  {s125:{label:"ボルタレンサポ12.5mg",unit:"個",mgPerUnit:12.5,defaultAmount:1},s25:{label:"ボルタレンサポ25mg",unit:"個",mgPerUnit:25,defaultAmount:1},s50:{label:"ボルタレンサポ50mg",unit:"個",mgPerUnit:50,defaultAmount:1}},
  {peds:{label:"小児の鎮痛・緊急解熱",lo:w=>0.5*w,hi:w=>2*w,max:w=>2*w,freq:[1,2],perDoseLo:w=>0.5*w,perDoseHi:w=>1*w,desc:"1回0.5～1.0mg/kgを1日1～2回。年齢別目安あり。少量から開始。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261147700J1057"
 ));
 add("aud_telemin2","テレミンソフト坐薬2mg",mk(
  {s2:{label:"テレミンソフト坐薬2mg",unit:"個",mgPerUnit:2,defaultAmount:1}},
  {general:{label:"便秘症等",lo:()=>NaN,hi:()=>NaN,freq:[1,2],desc:"承認添付文書は年齢・症状により適宜増減。固定小児mg/kg量は設定なし。"}},
  "PMDA テレミンソフト坐薬2mg電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2359700J1088_3?user=1"
 ));
 add("aud_depakeneS","デパケンシロップ5%",mk(
  {mL:{label:"デパケンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}},
  {epilepsy:{label:"てんかん等",lo:()=>400,hi:()=>1200,freq:[2,3],desc:"承認量は400～1200mg/day・分2～3、年齢・症状で適宜増減。小児固定mg/kg承認量ではない。"},migraine:{label:"片頭痛発作の発症抑制",lo:()=>400,hi:()=>800,max:()=>1000,freq:[2,3],desc:"400～800mg/day・分2～3、最大1000mg/day。年齢・症状で適宜増減。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261139004Q1100"
 ));
 // Hydroxyzine current formulations: no fixed pediatric approved mg/kg, so do not fabricate one.
 const hydInd={skin:{label:"蕁麻疹・皮膚疾患に伴うそう痒",lo:()=>NaN,hi:()=>NaN,freq:[2,3],desc:"承認添付文書は成人量を示し年齢・症状で適宜増減。小児固定mg/kg承認量なし。"},neuro:{label:"神経症の不安・緊張・抑うつ",lo:()=>NaN,hi:()=>NaN,freq:[3,4],desc:"承認添付文書は成人量を示し年齢・症状で適宜増減。小児固定mg/kg承認量なし。"}};
 add("aud_ataraxDS","アタラックス-Pドライシロップ2.5%",mk({g:{label:"アタラックス-Pドライシロップ2.5%",unit:"g",mgPerUnit:25,defaultAmount:1}},hydInd,"PMDA アタラックス-P DS2.5%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019M1046_3?user=1"));
 add("aud_ataraxPow","アタラックス-P散10%",mk({g:{label:"アタラックス-P散10%",unit:"g",mgPerUnit:100,defaultAmount:0.25}},hydInd,"PMDA アタラックス-P散10%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019B1037_3?user=1"));
 add("aud_ataraxS","アタラックス-Pシロップ0.5%",mk({mL:{label:"アタラックス-Pシロップ0.5%",unit:"mL",mgPerUnit:5,defaultAmount:5}},hydInd,"PMDA アタラックス-Pシロップ0.5%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019Q1030_3?user=1"));

 // Ophthalmic products from the source table — regimen is drops/frequency, not mg/kg.
 add("aud_flumEye","フルメトロン点眼液0.1%",mk(
  {eye:{label:"フルメトロン点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:3}},
  {eye:{label:"外眼部・前眼部炎症",lo:()=>2,hi:()=>4,freq:[2,3,4],desc:"1回1～2滴、1日2～4回。年齢・症状で適宜増減。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261315704Q3126"
 ));
 add("aud_patEye","パタノール点眼液0.1%",mk(
  {eye:{label:"パタノール点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:4}},
  {eye:{label:"アレルギー性結膜炎",lo:()=>4,hi:()=>4,freq:[4],desc:"1回1～2滴、1日4回。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261319752Q1024"
 ));
 add("aud_alesionEye","アレジオン点眼液0.05%",mk(
  {eye:{label:"アレジオン点眼液0.05%",unit:"回",mgPerUnit:1,defaultAmount:4}},
  {eye:{label:"アレルギー性結膜炎",lo:()=>4,hi:()=>4,freq:[4],desc:"1回1滴、1日4回。12歳未満の臨床試験は実施されていない旨も確認。"}},
  "PMDA アレジオン点眼液0.05%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319762Q1028_1_12"
 ));
 add("aud_alesionLX","アレジオンLX点眼液0.1%",mk(
  {eye:{label:"アレジオンLX点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:2}},
  {eye:{label:"アレルギー性結膜炎",lo:()=>2,hi:()=>2,freq:[2],desc:"1回1滴、1日2回（朝・夕）。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261319762Q2024"
 ));
 add("aud_ketasEye","ケタス点眼液0.01%",mk(
  {eye:{label:"ケタス点眼液0.01%",unit:"回",mgPerUnit:1,defaultAmount:4}},
  {eye:{label:"アレルギー性結膜炎",lo:()=>4,hi:()=>4,freq:[4],desc:"1回1～2滴、1日4回。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261319741Q1050"
 ));
 add("aud_tosEye","オゼックス点眼液0.3%",mk(
  {eye:{label:"オゼックス点眼液0.3%",unit:"回",mgPerUnit:1,defaultAmount:3}},
  {eye:{label:"細菌性眼感染症",lo:()=>3,hi:()=>3,freq:[3],desc:"成人・小児とも1回1滴、1日3回。症状により適宜増量。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261319751Q1020"
 ));
 add("aud_ofloxEye","タリビッド点眼液0.3%",mk(
  {eye:{label:"タリビッド点眼液0.3%",unit:"回",mgPerUnit:1,defaultAmount:3}},
  {eye:{label:"細菌性眼感染症",lo:()=>3,hi:()=>3,freq:[3],desc:"1回1滴、1日3回。症状により適宜増減。"}},
  "厚労省/PMDA 現行添付文書","https://rctportal.mhlw.go.jp/drug?id=00052556&sub=001"
 ));
 add("aud_aziEye","アジマイシン点眼液1%",mk(
  {eye:{label:"アジマイシン点眼液1%",unit:"回",mgPerUnit:1,defaultAmount:2}},
  {conj:{label:"結膜炎（7歳以上）",lo:()=>NaN,hi:()=>NaN,freq:[1,2],desc:"7歳以上：1回1滴、1日2回を2日、その後1日1回を5日。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261317714Q1024"
 ));

 // Current topical pediatric products.
 add("aud_protopic03","プロトピック軟膏0.03%小児用",mk(
  {g:{label:"プロトピック軟膏0.03%小児用",unit:"g",mgPerUnit:0.3,defaultAmount:1}},
  {ad:{label:"アトピー性皮膚炎（2歳以上）",lo:()=>NaN,hi:()=>NaN,freq:[1,2],desc:"1日1～2回、適量。1回最大5gだが年齢で減量。2～5歳は1g、6～12歳は2～4g、13歳以上5gが目安上限。"}},
  "厚労省/PMDA 現行添付文書","https://rctportal.mhlw.go.jp/drug?id=00049740&sub=001"
 ));
 add("aud_corectim025","コレクチム軟膏0.25%",mk(
  {g:{label:"コレクチム軟膏0.25%",unit:"g",mgPerUnit:2.5,defaultAmount:1}},
  {ad:{label:"アトピー性皮膚炎（小児）",lo:()=>NaN,hi:()=>NaN,freq:[2],desc:"0.25%製剤を1日2回、適量。症状により0.5%製剤可。1回最大5g、体格考慮。塗布量は体表面積30%までを目安。"}},
  "PMDA コレクチム軟膏電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/340018_2699714M1029_2_01"
 ));
 add("aud_moizerto03","モイゼルト軟膏0.3%",mk(
  {g:{label:"モイゼルト軟膏0.3%",unit:"g",mgPerUnit:3,defaultAmount:1}},
  {ad:{label:"アトピー性皮膚炎（小児）",lo:()=>NaN,hi:()=>NaN,freq:[2],desc:"0.3%製剤を1日2回、適量。症状により1%製剤可。塗布量は皮疹面積0.1m²あたり1gを目安。"}},
  "厚労省/PMDA 現行添付文書","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%262699715M1023"
 ));

 // Explicitly mark known non-current source-table items so they never reappear.
 const obsolete=["セルシンシロップ0.1%","ジョサマイドライシロップ10%","カナマイシンシロップ5%","ビクロックスシロップ8%","ラクスパン散1.8%","エステルチンドライシロップ0.01%","プルスマリンAドライシロップ1.5%","アレグラドライシロップ5%","アレジオンドライシロップ1%"];
 [...S.options].forEach(o=>{if(obsolete.some(n=>o.textContent.includes(n)))o.remove();});

 const prevLoad=loadDrug;
 loadDrug=function(reset=true){
   prevLoad(reset); const k=$("drug").value;
   const M={aud_voltarenSupp:[1,2],aud_telemin2:[1,2],aud_depakeneS:[2,3],aud_ataraxDS:[2,3,4],aud_ataraxPow:[2,3,4],aud_ataraxS:[2,3,4],aud_flumEye:[2,3,4],aud_patEye:[4],aud_alesionEye:[4],aud_alesionLX:[2],aud_ketasEye:[4],aud_tosEye:[3],aud_ofloxEye:[3],aud_aziEye:[1,2],aud_protopic03:[1,2],aud_corectim025:[2],aud_moizerto03:[2]};
   if(M[k])$("freq").innerHTML=M[k].map(n=>'<option value="'+n+'">'+(n===1?'1回/分1':'分'+n)+'</option>').join("");
   render();
 };
})();

/* ===== Migrated source: coverage-audit-final-fixes-2026-09.js ===== */
// Final source-table reconciliation fixes, 2026-09.
(function(){if(typeof DB==='undefined'||typeof $==='undefined')return;
const S=$("drug"),add=(k,n,obj)=>{DB[k]=obj;if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
const alias=(k,n,b,p,src,url,note)=>{if(!DB[b])return;DB[k]=Object.assign({},DB[b],{products:p,source:src,sourceUrl:url,auditStatus:"現行製剤確認済み",auditNote:note||""});add(k,n,DB[k]);};
const mk=(p,i,src,url)=>({products:p,indications:i,adult:null,source:src,sourceUrl:url,auditStatus:"承認用量確認済み"});
// Remove products confirmed non-current or wrong current strength.
["img02_05","img02_07"].forEach(k=>{delete DB[k];const o=S.querySelector('option[value="'+k+'"]');if(o)o.remove();});
// img02_07 was Tomiron 10%; current product is 20%.
alias("aud_tomiron20","トミロン細粒小児用20%","cefteram",{g:{label:"トミロン細粒小児用20%",unit:"g",mgPerUnit:200,defaultAmount:0.81}},"PMDA トミロン細粒小児用20%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132009C2023_2?user=1","10%製剤は薬価削除済み。現行20%へ修正。");
// Current erythromycin products.
alias("aud_eryDSW20","エリスロシンドライシロップW20%","ery",{g:{label:"エリスロシンDS W20%",unit:"g",mgPerUnit:200,defaultAmount:2.5}},"PMDA エリスロシンDS10%/W20%・W顆粒20%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6141001R1120_3?user=1");
alias("aud_eryGran20","エリスロシンW顆粒20%","ery",{g:{label:"エリスロシンW顆粒20%",unit:"g",mgPerUnit:200,defaultAmount:2.5}},"PMDA エリスロシンDS10%/W20%・W顆粒20%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6141001R1120_3?user=1");
// Current allergy formulations.
alias("aud_clemDS","クレマスチンドライシロップ0.1%","clem",{g:{label:"クレマスチンDS0.1%",unit:"g",mgPerUnit:1,defaultAmount:0.7}},"PMDA クレマスチンDS0.1%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008R1128_1?user=1");
if(DB.aud_polaramineS){
 add("aud_polaramineDS","ポララミンドライシロップ0.2%",Object.assign({},DB.aud_polaramineS,{products:{g:{label:"ポララミンDS0.2%",unit:"g",mgPerUnit:2,defaultAmount:0.6}},source:"PMDA ポララミンDS0.2%電子添文",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419002R1031_2?user=1"}));
}
add("aud_lindelonPow","リンデロン散0.1%",mk(
 {g:{label:"リンデロン散0.1%",unit:"g",mgPerUnit:1,defaultAmount:0.5}},
 {general:{label:"各種承認適応",lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"疾患・重症度で用量幅が大きく、年齢・症状により調節。単一小児mg/kg標準値では監査しない。"}},
 "PMDA リンデロン散0.1%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454004B1040_2?user=1"));
alias("aud_mediconPow","メジコン散10%","dext",{g:{label:"メジコン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.15}},"PMDA デキストロメトルファン散10%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/");
// Correct current fexofenadine DS is 5%, not NKdesk 6%.
alias("aud_fexoDS5","フェキソフェナジン塩酸塩DS5%","fexo",{g:{label:"フェキソフェナジン塩酸塩DS5%",unit:"g",mgPerUnit:50,defaultAmount:1.2}},"PMDA フェキソフェナジン塩酸塩DS5%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480235_4490023R2035_1_03","NKdesk記載6%ではなく、現行PMDAで5%製剤を確認。");
// Eye products omitted in prior pass.
add("aud_livostinEye","リボスチン点眼液0.025%",mk(
 {eye:{label:"リボスチン点眼液0.025%",unit:"回",mgPerUnit:1,defaultAmount:4}},
 {eye:{label:"アレルギー性結膜炎",lo:()=>4,hi:()=>4,freq:[4],desc:"1回1～2滴、1日4回を基本とする。"}},
 "PMDA リボスチン点眼液0.025%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319746Q1029_3_02"));
add("aud_alegysalEye","アレギサール点眼液0.1%",mk(
 {eye:{label:"アレギサール点眼液0.1%",unit:"回",mgPerUnit:1,defaultAmount:2}},
 {eye:{label:"アレルギー性結膜炎／春季カタル",lo:()=>2,hi:()=>2,freq:[2],desc:"1回1滴、1日2回（朝、夕）。"}},
 "PMDA アレギサール点眼液0.1%電子添文","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319735Q1071_1_09"));
add("aud_levofEye","クラビット点眼液0.5%",mk(
 {eye:{label:"クラビット点眼液0.5%",unit:"回",mgPerUnit:1,defaultAmount:3}},
 {eye:{label:"細菌性眼感染症",lo:()=>3,hi:()=>3,freq:[3],desc:"通常1回1滴、1日3回。症状により適宜増減。"}},
 "PMDA クラビット点眼液0.5%電子添文","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319742Q1039_1?user=1"));
// Explicit obsolete-source-table entries: remove if any option was created elsewhere.
["パセトシン細粒10%","トミロン細粒小児用10%","フェキソフェナジンドライシロップ6%","ニフランシロップ1.5%","テルバンスドライシロップ20%","ベラチンドライシロップ小児用0.1%"].forEach(n=>[...S.options].filter(o=>o.textContent.includes(n)).forEach(o=>o.remove()));
const prevLoad=loadDrug;loadDrug=function(reset=true){prevLoad(reset);const k=$("drug").value;const M={aud_tomiron20:[3],aud_eryDSW20:[4,5,6],aud_eryGran20:[4,5,6],aud_clemDS:[2],aud_polaramineDS:[1,2,3,4],aud_lindelonPow:[1,2,3,4],aud_mediconPow:[1,2,3,4],aud_fexoDS5:[2],aud_livostinEye:[4],aud_alegysalEye:[2],aud_levofEye:[3]};if(M[k])$("freq").innerHTML=M[k].map(n=>'<option value="'+n+'">'+(n===1?'1回/分1':'分'+n)+'</option>').join("");render();};
})();

/* ===== Migrated source: dose-audit-upgrades-2026-09.js ===== */
// Dose audit upgrades after full source-table reconciliation, 2026-09.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined') return;

 // Levetiracetam: approved age/weight specific pediatric dosing.
 DB.levet={
  products:{ds50:{label:"イーケプラドライシロップ50%",unit:"g",mgPerUnit:500,defaultAmount:0.72}},
  indications:{
   partialInfant:{label:"部分発作（1か月以上6か月未満）",lo:(w,a)=>a<1/12||a>=0.5?NaN:14*w,hi:(w,a)=>a<1/12||a>=0.5?NaN:42*w,max:(w,a)=>42*w,freq:[2],desc:"1か月以上6か月未満：14mg/kg/day・分2で開始し、最大42mg/kg/day・分2。"},
   partialChild:{label:"部分発作（6か月以上・50kg未満）",lo:(w,a)=>a<0.5||w>=50?NaN:20*w,hi:(w,a)=>a<0.5||w>=50?NaN:60*w,max:(w,a)=>60*w,freq:[2],desc:"6か月以上・50kg未満：20mg/kg/day・分2で開始、最大60mg/kg/day・分2。"},
   gtc:{label:"強直間代発作（4歳以上・50kg未満）",lo:(w,a)=>a<4||w>=50?NaN:20*w,hi:(w,a)=>a<4||w>=50?NaN:60*w,max:(w,a)=>60*w,freq:[2],desc:"4歳以上・50kg未満：20mg/kg/day・分2で開始、最大60mg/kg/day・分2。"}
  },
  adult:[1000,3000],source:"PMDA イーケプラドライシロップ50%電子添文",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/iyakuSearch/",auditStatus:"承認用量確認済み"
 };

 // Gabapentin syrup: titration and age-dependent maintenance dose.
 DB.gaba={
  products:{syr5:{label:"ガバペンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:2}},
  indications:{
   d1:{label:"3～12歳：開始1日目",lo:(w,a)=>a<3||a>=13?NaN:10*w,hi:(w,a)=>a<3||a>=13?NaN:10*w,freq:[3],desc:"1日目10mg/kg/day・分3。"},
   d2:{label:"3～12歳：開始2日目",lo:(w,a)=>a<3||a>=13?NaN:20*w,hi:(w,a)=>a<3||a>=13?NaN:20*w,freq:[3],desc:"2日目20mg/kg/day・分3。"},
   maint34:{label:"3～4歳：維持量",lo:(w,a)=>a<3||a>=5?NaN:40*w,hi:(w,a)=>a<3||a>=5?NaN:40*w,max:(w,a)=>50*w,freq:[3],desc:"3～4歳：維持40mg/kg/day・分3。最大50mg/kg/day。"},
   maint512:{label:"5～12歳：維持量",lo:(w,a)=>a<5||a>=13?NaN:25*w,hi:(w,a)=>a<5||a>=13?NaN:35*w,max:(w,a)=>50*w,freq:[3],desc:"5～12歳：維持25～35mg/kg/day・分3。最大50mg/kg/day。"},
   age13:{label:"13歳以上",lo:(w,a)=>a<13?NaN:600,hi:(w,a)=>a<13?NaN:1800,max:(w,a)=>2400,freq:[3],desc:"13歳以上：1日目600mg、2日目1200mg、3日目以降1200～1800mg/day・分3。最大2400mg/day。"}
  },
  adult:[1200,1800],source:"厚労省/PMDA ガバペンシロップ5%電子添文",sourceUrl:"https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261139008Q1024",auditStatus:"承認用量確認済み"
 };

 // Movicol: package-based, not mg/kg based.
 DB.movLD={
  products:{ld:{label:"モビコール配合内用剤LD",unit:"包",mgPerUnit:1,defaultAmount:1}},
  indications:{
   age26:{label:"2歳以上7歳未満",lo:(w,a)=>a<2||a>=7?NaN:1,hi:(w,a)=>a<2||a>=7?NaN:4,max:()=>4,freq:[1,2,3],desc:"初回1包/day。症状に応じ増減、最大4包/day。1回最大2包。増減間隔は原則2日以上。"},
   age711:{label:"7歳以上12歳未満",lo:(w,a)=>a<7||a>=12?NaN:2,hi:(w,a)=>a<7||a>=12?NaN:4,max:()=>4,freq:[1,2,3],desc:"初回2包/day（HDなら1包）。最大4包/day。1回最大2包。"},
   age12:{label:"12歳以上",lo:(w,a)=>a<12?NaN:2,hi:(w,a)=>a<12?NaN:6,max:()=>6,freq:[1,2,3],desc:"初回2包/day（HDなら1包）。最大6包/day。1回最大4包。"}
  },
  adult:null,source:"PMDA モビコール配合内用剤電子添文",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/iyakuSearch/",auditStatus:"承認用量確認済み"
 };
 DB.movHD={
  products:{hd:{label:"モビコール配合内用剤HD",unit:"包",mgPerUnit:1,defaultAmount:1}},
  indications:{
   age26:{label:"2歳以上7歳未満",lo:(w,a)=>a<2||a>=7?NaN:0.5,hi:(w,a)=>a<2||a>=7?NaN:2,max:()=>2,freq:[1,2,3],desc:"LD換算：初回LD1包/day＝HD0.5包相当。最大HD2包/day、1回最大HD1包。実際の分包可否は製剤仕様を確認。"},
   age711:{label:"7歳以上12歳未満",lo:(w,a)=>a<7||a>=12?NaN:1,hi:(w,a)=>a<7||a>=12?NaN:2,max:()=>2,freq:[1,2,3],desc:"初回HD1包/day。最大HD2包/day、1回最大HD1包。"},
   age12:{label:"12歳以上",lo:(w,a)=>a<12?NaN:1,hi:(w,a)=>a<12?NaN:3,max:()=>3,freq:[1,2,3],desc:"初回HD1包/day。最大HD3包/day、1回最大HD2包。"}
  },
  adult:null,source:"PMDA モビコール配合内用剤電子添文",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/iyakuSearch/",auditStatus:"承認用量確認済み"
 };

 // Valaciclovir: indication and weight-dependent frequency.
 DB.vala={
  products:{gran50:{label:"バルトレックス顆粒50%",unit:"g",mgPerUnit:500,defaultAmount:1.5}},
  indications:{
   hsvLow:{label:"単純疱疹（10kg未満）",lo:(w,a)=>w>=10?NaN:75*w,hi:(w,a)=>w>=10?NaN:75*w,freq:[3],perDoseLo:w=>25*w,perDoseHi:w=>Math.min(25*w,500),desc:"10kg未満：1回25mg/kgを1日3回。1回最大500mg。"},
   hsvHigh:{label:"単純疱疹（10kg以上）",lo:(w,a)=>w<10?NaN:50*w,hi:(w,a)=>w<10?NaN:50*w,freq:[2],perDoseLo:w=>25*w,perDoseHi:w=>Math.min(25*w,500),desc:"10kg以上：1回25mg/kgを1日2回。1回最大500mg。"},
   vzv:{label:"水痘／帯状疱疹",lo:w=>75*w,hi:w=>75*w,freq:[3],perDoseLo:w=>25*w,perDoseHi:w=>Math.min(25*w,1000),desc:"1回25mg/kgを1日3回。1回最大1000mg。"}
  },
  adult:[1000,3000],source:"PMDA バルトレックス顆粒50%電子添文",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/iyakuSearch/",auditStatus:"承認用量確認済み"
 };

 // Cefteram pivoxil.
 DB.cefteram={
  products:{ds20:{label:"トミロン細粒小児用20%",unit:"g",mgPerUnit:200,defaultAmount:0.81}},
  indications:{general:{label:"承認感染症",lo:w=>9*w,hi:w=>18*w,max:w=>Math.min(18*w,600),freq:[3],desc:"セフテラム ピボキシル9～18mg/kg/day・分3。成人上限相当600mg/dayを超えないよう確認。"}},
  adult:[300,600],source:"厚労省/PMDA トミロン細粒小児用20%電子添文",sourceUrl:"https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132009C2023",auditStatus:"承認用量確認済み"
 };
 if(DB.aud_tomiron20){
   DB.aud_tomiron20=Object.assign({},DB.cefteram,{products:{g:{label:"トミロン細粒小児用20%",unit:"g",mgPerUnit:200,defaultAmount:0.81}}});
 }

 // Cefditoren pivoxil: respiratory infections can be 3–6 mg/kg/dose TID; not automatically fixed high-dose.
 DB.cdtr={
  products:{gran10:{label:"小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},
  indications:{
   general:{label:"一般感染症",lo:w=>9*w,hi:w=>9*w,max:w=>Math.min(9*w,600),freq:[3],perDoseLo:w=>3*w,perDoseHi:w=>Math.min(3*w,200),desc:"通常1回3mg/kgを1日3回。1回200mgを超えない。"},
   resp:{label:"肺炎・中耳炎・副鼻腔炎",lo:w=>9*w,hi:w=>Math.min(18*w,600),max:w=>Math.min(18*w,600),freq:[3],perDoseLo:w=>3*w,perDoseHi:w=>Math.min(6*w,200),desc:"通常1回3mg/kgを1日3回。必要に応じ1回6mg/kgまで増量可。1回200mgを超えない。"}
  },
  adult:[300,600],source:"厚労省/PMDA セフジトレン ピボキシル小児用細粒10%電子添文",sourceUrl:"https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132015C1103",auditStatus:"承認用量確認済み"
 };
 if(DB.img02_11) DB.img02_11=Object.assign({},DB.cdtr,{products:{gran10:{label:"メイアクトMS小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}}});

 // Frequency engine for upgraded items.
 const prevLoad=loadDrug;
 loadDrug=function(reset=true){
   prevLoad(reset);
   const k=$("drug").value;
   const M={levet:[2],gaba:[3],movLD:[1,2,3],movHD:[1,2,3],vala:[2,3],cefteram:[3],aud_tomiron20:[3],cdtr:[3],img02_11:[3]};
   if(M[k]) $("freq").innerHTML=M[k].map(n=>'<option value="'+n+'">'+(n===1?'1回/分1':'分'+n)+'</option>').join("");
   render();
 };
})();

/* ===== Migrated source: final-reconciliation-2026-09.js ===== */
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

/* ===== Migrated source: drug-search-2026-09.js ===== */
// Searchable pediatric drug selector: generic/brand aliases + L-Keflex, 2026-09-06
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const sel=$("drug"),wrap=sel.parentElement;
 // Add L-Keflex as a distinct current formulation (cephalexin 200 mg/g).
 if(DB.cephalex && !DB.aud_lkeflex){
   DB.aud_lkeflex=Object.assign({},DB.cephalex,{
    products:{g:{label:"L-ケフレックス小児用顆粒（1包1g）",unit:"包",mgPerUnit:200,defaultAmount:1}},
    source:"PMDA L-ケフレックス小児用顆粒 電子添文",
    sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132002E1034_3?user=1",
    auditStatus:"現行製剤確認済み",
    auditNote:"1包（1g）中セファレキシン200mg（力価）。胃溶性粒60mg＋腸溶性粒140mg。"
   });
   const o=document.createElement("option");o.value="aud_lkeflex";o.textContent="L-ケフレックス小児用顆粒";sel.appendChild(o);
 }
 const aliases={
  cam:["クラリス","クラリシッド","clarithromycin","CAM"],
  amox:["サワシリン","パセトシン","ワイドシリン","amoxicillin","AMPC"],
  carbo:["ムコダイン","カルボシステイン"],
  ambro:["ムコソルバン","アンブロキソール"],
  txa:["トランサミン","トラネキサム酸"],
  levo:["ザイザル","レボセチリジン"],
  apap:["カロナール","アンヒバ","アセトアミノフェン"],
  ceti:["ジルテック","セチリジン"],
  mont:["キプレス","シングレア","モンテルカスト"],
  desl:["デザレックス","デスロラタジン"],
  olop:["アレロック","オロパタジン"],
  pran:["オノン","プランルカスト"],
  lora:["クラリチン","ロラタジン"],
  epi:["アレジオン","エピナスチン"],
  fexo:["アレグラ","フェキソフェナジン"],
  meq:["ゼスラン","ニポラジン","メキタジン"],
  tulo:["ホクナリン","ツロブテロール"],
  cfpn:["フロモックス","セフカペン"],
  cdtr:["メイアクト","セフジトレン"],
  cpdx:["バナン","セフポドキシム"],
  cfdn:["セフゾン","セフジニル"],
  ccr:["ケフラール","セファクロル"],
  tipe:["アスベリン","チペピジン"],
  sult:["ユナシン","スルタミシリン"],
  cephalex:["ケフレックス","セファレキシン"],
  aud_cephalex100:["ケフレックス","ケフレックスシロップ用細粒100","セファレキシン"],
  aud_cephalex200:["ケフレックス","ケフレックスシロップ用細粒200","セファレキシン"],
  aud_lkeflex:["L-ケフレックス","Lケフレックス","エルケフレックス","小児用顆粒","セファレキシン"],
  ery:["エリスロシン","エリスロマイシン"],
  azi:["ジスロマック","アジスロマイシン"],
  faro:["ファロム","ファロペネム"],
  tebi:["オラペネム","テビペネム"],
  fos:["ホスミシン","ホスホマイシン"],
  tosu:["オゼックス","トスフロキサシン"],
  keto:["ザジテン","ケトチフェン"],
  tran:["リザベン","トラニラスト"],
  domp:["ナウゼリン","ドンペリドン"],
  acy:["ゾビラックス","アシクロビル"],
  osel:["タミフル","オセルタミビル"],
  theo:["テオドール","テオフィリン"],
  proc:["メプチン","プロカテロール"],
  clem:["クレマスチン"],
  dime:["アストミン","ジメモルファン"],
  vala:["バルトレックス","バラシクロビル"],
  levet:["イーケプラ","レベチラセタム"],
  rupa:["ルパフィン","ルパタジン"],
  meto:["プリンペラン","メトクロプラミド"]
 };
 // Include every option label + product labels as searchable aliases.
 const norm=s=>String(s||"").normalize("NFKC").toLowerCase().replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60)).replace(/[\s　・‐－ー%％()（）「」]/g,"");
 const rows=()=>[...sel.options].map(o=>{
   const d=DB[o.value],a=[o.textContent].concat(aliases[o.value]||[]);
   if(d&&d.products)Object.values(d.products).forEach(p=>a.push(p.label));
   return {value:o.value,label:o.textContent,search:norm(a.join(" "))};
 });
 const inp=document.createElement("input");
 inp.id="drugSearch";inp.type="search";inp.autocomplete="off";inp.placeholder="薬品名を検索（一般名・商品名／3文字程度）";
 inp.style.marginBottom="6px";
 const box=document.createElement("div");
 box.id="drugSuggest";box.style.cssText="display:none;position:absolute;z-index:30;background:#fff;border:1px solid #d6dee8;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.12);max-height:240px;overflow:auto;width:100%;";
 wrap.style.position="relative";wrap.insertBefore(inp,sel);wrap.insertBefore(box,sel);
 const show=()=>{
   const q=norm(inp.value);
   if(q.length<2){box.style.display="none";return;}
   const hit=rows().filter(r=>r.search.includes(q)).slice(0,12);
   if(!hit.length){box.innerHTML='<div style="padding:9px;font-size:10px;color:#667085">候補なし</div>';box.style.display="block";return;}
   box.innerHTML=hit.map(r=>'<button type="button" data-v="'+r.value+'" style="display:block;width:100%;border:0;border-bottom:1px solid #eef1f4;background:#fff;padding:9px;text-align:left;font-size:11px;cursor:pointer">'+r.label+'</button>').join("");
   box.style.display="block";
 };
 inp.addEventListener("input",show);
 box.addEventListener("click",e=>{const b=e.target.closest("[data-v]");if(!b)return;sel.value=b.dataset.v;inp.value=b.textContent.trim();box.style.display="none";sel.dispatchEvent(new Event("change",{bubbles:true}));});
 sel.addEventListener("change",()=>{inp.value=sel.options[sel.selectedIndex]?.textContent||"";});
 document.addEventListener("click",e=>{if(e.target!==inp&&!box.contains(e.target))box.style.display="none";});
})();

/* ===== Migrated source: formula-help-2026-09.js ===== */
// Tappable explanations for classic pediatric dose-conversion formulas.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined'||typeof render!=='function') return;
 const style=document.createElement("style");
 style.textContent=".formulaBtn{border:0;background:transparent;padding:0;color:#2f5d8a;text-decoration:underline;text-underline-offset:2px;font:inherit;font-weight:800;cursor:pointer}.formulaHelp{margin-top:8px;padding:10px;border:1px solid #dfe6ec;border-radius:9px;background:#fff;font-size:10px;line-height:1.7}.formulaHelp b{font-size:11px}";
 document.head.appendChild(style);

 const oldRender=render;
 render=function(){
   oldRender();
   const out=$("out"); if(!out)return;
   const table=[...out.querySelectorAll("table")].find(t=>t.textContent.includes("補助換算"));
   if(!table)return;
   const names=["Augsberger-II","Young","Clark","von Harnack","BSA / Mosteller"];
   const kinds=["aug","young","clark","von","bsa"];
   [...table.querySelectorAll("tbody tr")].forEach((tr,i)=>{
     if(!names[i])return;
     const td=tr.querySelector("td"); if(!td)return;
     td.innerHTML='<button type="button" class="formulaBtn" data-formula="'+kinds[i]+'">'+names[i]+' ⓘ</button>';
   });
   if(!out.querySelector("#formulaHelp")){
     const d=document.createElement("div");d.id="formulaHelp";d.className="formulaHelp";d.style.display="none";table.insertAdjacentElement("afterend",d);
   }
 };

 function coefVon(a){
   if(a<0.08)return .125;
   if(a<0.75)return .2;
   if(a<2)return .25;
   if(a<5)return 1/3;
   if(a<10)return .5;
   if(a<15)return 2/3;
   return 1;
 }
 function rng(lo,hi){
   const f=x=>Number.isFinite(x)?x.toFixed(1):"—";
   return Math.abs(lo-hi)<.01?f(lo):f(Math.min(lo,hi))+"～"+f(Math.max(lo,hi));
 }
 function explain(kind){
   const d=DB[$("drug").value]; if(!d||!Array.isArray(d.adult))return null;
   const a=+$("age").value,w=+$("wt").value,h=+$("ht").value,[lo,hi]=d.adult;
   const bsa=(h>0&&w>0)?Math.sqrt(h*w/3600):NaN;
   const adult=lo===hi?lo.toFixed(0)+" mg/day":lo.toFixed(0)+"～"+hi.toFixed(0)+" mg/day";
   let title,formula,basis,coef;
   if(kind==="aug"){title="Augsberger-II";formula="小児量 ＝ 成人量 × (4 × 年齢[歳] ＋ 20) ÷ 100";basis="年齢から成人量に対する割合を推定する古典的換算式。";coef=(4*a+20)/100;}
   if(kind==="young"){title="Young式";formula="小児量 ＝ 成人量 × 年齢 ÷ (年齢 ＋ 12)";basis="年齢比から成人量を按分する古典的換算式。";coef=a/(a+12);}
   if(kind==="clark"){title="Clark式";formula="小児量 ＝ 成人量 × 体重[kg] ÷ 68";basis="成人体重を約150 lb（約68 kg）として体重比で按分する方法。";coef=w/68;}
   if(kind==="von"){title="von Harnack式";formula="小児量 ＝ 成人量 × 年齢区分ごとの係数";basis="係数：1か月未満 1/8、1～8か月 1/5、9～23か月 1/4、2～4歳 1/3、5～9歳 1/2、10～14歳 2/3、15歳以上 1。";coef=coefVon(a);}
   if(kind==="bsa"){title="BSA / Mosteller";formula="BSA[m²] ＝ √(身長[cm] × 体重[kg] ÷ 3600)\n小児量 ＝ 成人量 × BSA ÷ 1.73";basis="体表面積を成人標準体表面積1.73m²と比較して按分する方法。BSA算出には複数の式があり、Du Bois式も広く用いられる。本ツールでは簡便なMosteller式を採用。";coef=Number.isFinite(bsa)?bsa/1.73:NaN;}
   const current=Number.isFinite(coef)
     ?(kind==="bsa"?"身長 "+h+"cm・体重 "+w+"kg → BSA "+bsa.toFixed(3)+"m²、係数 "+coef.toFixed(3)+"。":"年齢/体重条件から係数 "+coef.toFixed(3)+"。")
       +" 成人標準量 "+adult+" × "+coef.toFixed(3)+" ＝ "+rng(lo*coef,hi*coef)+" mg/day"
     :"身長・体重を入力すると計算します。";
   return {title,formula,basis,current};
 }

 document.addEventListener("click",e=>{
   const b=e.target.closest(".formulaBtn"); if(!b)return;
   const h=$("formulaHelp"),x=explain(b.dataset.formula); if(!h||!x)return;
   h.innerHTML="<b>"+x.title+"</b><br><b>計算式：</b>"+x.formula.replace(/\n/g,"<br>")+"<br><b>考え方：</b>"+x.basis+"<br><b>今回の計算：</b>"+x.current+'<br><span class="pill warn">承認小児用量の代わりではなく補助評価</span>';
   h.style.display="block";
 });
 render();
})();

/* ===== Migrated source: frequency-interpretation-2026-09.js ===== */
// Flexible prescribed frequency + interpretation of daily-dose vs per-dose design.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined'||typeof render!=='function')return;
 const ensureFreq=()=>{
   const s=$("freq"),cur=s.value||"3";
   [1,2,3,4,5,6].forEach(n=>{if(!s.querySelector('option[value="'+n+'"]')){const o=document.createElement("option");o.value=n;o.textContent=n===1?"分1":"分"+n;s.appendChild(o);}});
   s.value=cur;
 };
 ensureFreq();

 const oldLoad=loadDrug;
 loadDrug=function(reset=true){
   oldLoad(reset);
   const cur=$("freq").value;
   [1,2,3,4,5,6].forEach(n=>{if(!$("freq").querySelector('option[value="'+n+'"]')){const o=document.createElement("option");o.value=n;o.textContent=n===1?"分1":"分"+n;$("freq").appendChild(o);}});
   if(cur && $("freq").querySelector('option[value="'+cur+'"]'))$("freq").value=cur;
   render();
 };

 const oldRender=render;
 render=function(){
   oldRender();
   const out=$("out"),d=DB[$("drug").value],ii=d&&d.indications[$("ind").value],p=d&&d.products[$("product").value];
   if(!out||!d||!ii||!p)return;
   const w=+$("wt").value,a=+$("age").value,q=+$("amount").value,f=+$("freq").value,mg=q*p.mgPerUnit;
   const allowed=ii.freqByAge?ii.freqByAge(a):(ii.freq||[]);
   if(!allowed.length)return;
   const lo=ii.lo(w,a),hi=ii.hi(w,a);
   if(!Number.isFinite(lo)||!Number.isFinite(hi))return;
   const stdF=allowed.includes(3)?3:allowed[0];
   const stdDaily=(lo+hi)/2;
   const prescribedPer=mg/f;
   const stdPer=stdDaily/stdF;
   const dailyPct=stdDaily>0?mg/stdDaily*100:NaN;
   const perPct=stdPer>0?prescribedPer/stdPer*100:NaN;
   let interp="";
   const freqOff=!allowed.includes(f);
   if(freqOff){
     if(Math.abs(dailyPct-100)<=15 && f<stdF) interp="1日量は標準量をほぼ維持したまま、投与回数を"+(stdF===1?"1回":"分"+stdF)+"→"+(f===1?"分1":"分"+f)+"へ減らした処方です。そのため1回量は標準設計の約"+Math.round(perPct)+"%。";
     else if(Math.abs(perPct-100)<=15 && f<stdF) interp="1回量は標準設計とほぼ同じまま、投与回数を"+(stdF===1?"1回":"分"+stdF)+"→"+(f===1?"分1":"分"+f)+"へ減らした処方です。1日量は標準量の約"+Math.round(dailyPct)+"%。";
     else interp="承認上の分割回数とは異なります。1日量は標準量の約"+Math.round(dailyPct)+"%、1回量は標準設計の約"+Math.round(perPct)+"%です。";
   }else{
     interp="分割回数は承認用法の範囲内。1日量は標準量の約"+Math.round(dailyPct)+"%、1回量は基準分割（"+(stdF===1?"分1":"分"+stdF)+"）でみた標準設計の約"+Math.round(perPct)+"%。";
   }
   const div=document.createElement("div");
   div.className="note";div.style.cssText="margin-top:8px;padding:9px;border:1px solid #e2e8f0;border-radius:8px;background:#fff";
   div.innerHTML='<b>処方設計の解釈：</b>'+interp+(freqOff?'<br><span class="pill warn">分割は承認用法外／適宜増減とは別に確認</span>':'');
   const nums=out.querySelector(".nums"); if(nums)nums.insertAdjacentElement("afterend",div); else out.appendChild(div);
 };
 render();
})();

/* ===== Migrated source: oral-batch-01-2026-09.js ===== */
// Pharmacy-focused oral batch 01. Adds practical oral formulations to existing audited ingredients.
// Approved dose logic is inherited only from an already-audited ingredient DB entry.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const S=$("drug");
 const addOpt=(k,n)=>{if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
 const clone=(k,n,b,products,note)=>{
  if(!DB[b])return;
  DB[k]=Object.assign({},DB[b],{products:products,auditStatus:"既存承認用量ロジック＋製剤追加監査",auditNote:note||"現行製剤を追加。用量判定は同一成分の監査済みロジックを継承。"});
  addOpt(k,n);
 };
 // 1-15 antimicrobial / antiviral formulations
 clone("ob01_camds","クラリスドライシロップ10%小児用","cam",{g:{label:"クラリスドライシロップ10%小児用",unit:"g",mgPerUnit:100,defaultAmount:2.7}},"PMDA 2026-03改訂確認");
 clone("ob01_camt50","クラリス錠50小児用","cam",{tab:{label:"クラリス錠50小児用",unit:"錠",mgPerUnit:50,defaultAmount:5}});
 clone("ob01_amox10","アモキシシリン細粒10%","amox",{g:{label:"アモキシシリン細粒10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}});
 clone("ob01_amox20","アモキシシリン細粒20%","amox",{g:{label:"アモキシシリン細粒20%",unit:"g",mgPerUnit:200,defaultAmount:1.8}});
 clone("ob01_cfpn","セフカペン ピボキシル小児用細粒10%","cfpn",{g:{label:"セフカペン ピボキシル小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"2026-06安全性改訂対象を確認");
 clone("ob01_cdtr","セフジトレン ピボキシル小児用細粒10%","cdtr",{g:{label:"セフジトレン ピボキシル小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},"2026-06安全性改訂対象を確認");
 clone("ob01_cpdx","セフポドキシム プロキセチルDS5%","cpdx",{g:{label:"セフポドキシム プロキセチルDS5%",unit:"g",mgPerUnit:50,defaultAmount:1.8}});
 clone("ob01_cfdn","セフジニル細粒小児用10%","cfdn",{g:{label:"セフジニル細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}});
 clone("ob01_ccr","セファクロル細粒小児用10%","ccr",{g:{label:"セファクロル細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}});
 clone("ob01_sult","スルタミシリン細粒小児用10%","sult",{g:{label:"スルタミシリン細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:2.7}});
 clone("ob01_faro","ファロペネムDS小児用10%","faro",{g:{label:"ファロペネムDS小児用10%",unit:"g",mgPerUnit:100,defaultAmount:2.7}});
 clone("ob01_tebi","テビペネム ピボキシル細粒小児用10%","tebi",{g:{label:"テビペネム ピボキシル細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.44}},"2026-06安全性改訂対象を確認");
 clone("ob01_tosu","トスフロキサシン細粒小児用15%","tosu",{g:{label:"トスフロキサシン細粒小児用15%",unit:"g",mgPerUnit:150,defaultAmount:1.2}});
 clone("ob01_osel","オセルタミビルDS3%","osel",{g:{label:"オセルタミビルDS3%",unit:"g",mgPerUnit:30,defaultAmount:2.4}});
 clone("ob01_vala","バラシクロビル顆粒50%","vala",{g:{label:"バラシクロビル顆粒50%",unit:"g",mgPerUnit:500,defaultAmount:1.5}});
 // 16-30 respiratory/allergy
 clone("ob01_carboS","カルボシステインシロップ5%","carbo",{mL:{label:"カルボシステインシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10.8}});
 clone("ob01_carboDS","カルボシステインDS50%","carbo",{g:{label:"カルボシステインDS50%",unit:"g",mgPerUnit:500,defaultAmount:1.08}});
 clone("ob01_ambroDS","アンブロキソールDS1.5%","ambro",{g:{label:"アンブロキソールDS1.5%",unit:"g",mgPerUnit:15,defaultAmount:1.08}});
 clone("ob01_tipeDS","チペピジンDS2%","tipe",{g:{label:"チペピジンDS2%",unit:"g",mgPerUnit:20,defaultAmount:2.25}});
 clone("ob01_tipeS","アスベリンシロップ0.5%","tipe",{mL:{label:"アスベリンシロップ0.5%",unit:"mL",mgPerUnit:5,defaultAmount:9}});
 clone("ob01_dimePow","ジメモルファン散10%","dime",{g:{label:"ジメモルファン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.3}});
 clone("ob01_procDS","プロカテロールDS0.005%","proc",{g:{label:"プロカテロールDS0.005%",unit:"g",mgPerUnit:0.05,defaultAmount:0.5}});
 clone("ob01_procS","プロカテロールシロップ5μg/mL","proc",{mL:{label:"プロカテロールシロップ5μg/mL",unit:"mL",mgPerUnit:0.005,defaultAmount:5}});
 clone("ob01_theoDS","テオフィリン徐放DS20%","theo",{g:{label:"テオフィリン徐放DS20%",unit:"g",mgPerUnit:200,defaultAmount:0.9}});
 clone("ob01_levoS","レボセチリジンシロップ0.05%","levo",{mL:{label:"レボセチリジンシロップ0.05%",unit:"mL",mgPerUnit:0.5,defaultAmount:5}});
 clone("ob01_levoDS","レボセチリジンDS0.5%","levo",{g:{label:"レボセチリジンDS0.5%",unit:"g",mgPerUnit:5,defaultAmount:0.5}});
 clone("ob01_cetiDS","セチリジンDS1.25%","ceti",{g:{label:"セチリジンDS1.25%",unit:"g",mgPerUnit:12.5,defaultAmount:0.4}});
 clone("ob01_loraDS","ロラタジンDS1%","lora",{g:{label:"ロラタジンDS1%",unit:"g",mgPerUnit:10,defaultAmount:1}});
 clone("ob01_ketoDS","ケトチフェンDS0.1%","keto",{g:{label:"ケトチフェンDS0.1%",unit:"g",mgPerUnit:1,defaultAmount:1.08}});
 clone("ob01_pranDS","プランルカストDS10%","pran",{g:{label:"プランルカストDS10%",unit:"g",mgPerUnit:100,defaultAmount:1.26}});
 // 31-40 GI / pain / other frequent
 clone("ob01_dompDS","ドンペリドンDS1%","domp",{g:{label:"ドンペリドンDS1%",unit:"g",mgPerUnit:10,defaultAmount:1.8}});
 clone("ob01_metoS","メトクロプラミドシロップ0.1%","meto",{mL:{label:"メトクロプラミドシロップ0.1%",unit:"mL",mgPerUnit:1,defaultAmount:5}});
 clone("ob01_apapDS","アセトアミノフェンDS20%","apap",{g:{label:"アセトアミノフェンDS20%",unit:"g",mgPerUnit:200,defaultAmount:1.35}});
 clone("ob01_apapS","アセトアミノフェンシロップ2%","apap",{mL:{label:"アセトアミノフェンシロップ2%",unit:"mL",mgPerUnit:20,defaultAmount:13.5}});
 clone("ob01_txaS","トラネキサム酸シロップ5%","txa",{mL:{label:"トラネキサム酸シロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}});
 clone("ob01_mont4","モンテルカスト細粒4mg","mont",{pack:{label:"モンテルカスト細粒4mg",unit:"包",mgPerUnit:4,defaultAmount:1}});
 clone("ob01_olop","オロパタジン顆粒0.5%","olop",{g:{label:"オロパタジン顆粒0.5%",unit:"g",mgPerUnit:5,defaultAmount:1}});
 clone("ob01_fexo","フェキソフェナジンDS5%","fexo",{g:{label:"フェキソフェナジンDS5%",unit:"g",mgPerUnit:50,defaultAmount:1.2}});
 clone("ob01_tran","トラニラストDS5%","tran",{g:{label:"トラニラストDS5%",unit:"g",mgPerUnit:50,defaultAmount:1.8}});
 clone("ob01_pemi","ペミロラストDS0.5%","pemi",{g:{label:"ペミロラストDS0.5%",unit:"g",mgPerUnit:5,defaultAmount:1.44}});
 // 41-50 neurologic / sleep / selected practical products
 clone("ob01_levet","レベチラセタムDS50%","levet",{g:{label:"レベチラセタムDS50%",unit:"g",mgPerUnit:500,defaultAmount:0.72}});
 clone("ob01_gaba","ガバペンチンシロップ5%","gaba",{mL:{label:"ガバペンチンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}});
 clone("ob01_mela","メラトニン顆粒0.2%","mela",{g:{label:"メラトニン顆粒0.2%",unit:"g",mgPerUnit:2,defaultAmount:1}});
 clone("ob01_rupa","ルパタジン錠10mg","rupa",{tab:{label:"ルパタジン錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1}});
 clone("ob01_desl","デスロラタジン錠5mg","desl",{tab:{label:"デスロラタジン錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1}});
 clone("ob01_epi","エピナスチンDS1%","epi",{g:{label:"エピナスチンDS1%",unit:"g",mgPerUnit:10,defaultAmount:1}});
 clone("ob01_meq","メキタジンシロップ0.03%","meq",{mL:{label:"メキタジンシロップ0.03%",unit:"mL",mgPerUnit:0.3,defaultAmount:6}});
 clone("ob01_oxa","オキサトミドDS2%","oxa",{g:{label:"オキサトミドDS2%",unit:"g",mgPerUnit:20,defaultAmount:1}});
 clone("ob01_acy","アシクロビルDS80%","acy",{g:{label:"アシクロビルDS80%",unit:"g",mgPerUnit:800,defaultAmount:0.25}});
 clone("ob01_ery","エリスロマイシン顆粒20%","ery",{g:{label:"エリスロマイシン顆粒20%",unit:"g",mgPerUnit:200,defaultAmount:2.5}});

 // SKGH is an evidence layer, not an approved-dose source.
 const sk="https://www.skgh.jp/wp/wp-content/themes/skgh/department/pharmacy/for-pharmacist/pdf/pediatric-dose.pdf";
 const practical={
  carbo:["30 mg/kg/day・分3","湘南鎌倉総合病院 小児薬用量"],
  ambro:["0.9 mg/kg/day・分3","湘南鎌倉総合病院 小児薬用量"],
  tipe:["1～2 mg/kg/day・分3","湘南鎌倉総合病院 小児薬用量"],
  cam:["10～15 mg/kg/day・分2～3","湘南鎌倉総合病院 小児薬用量"],
  amox:["20～40 mg/kg/day（同資料記載の実務域）","湘南鎌倉総合病院 小児薬用量"]
 };
 Object.keys(practical).forEach(k=>{if(DB[k]){DB[k].clinicalPracticeEvidence=DB[k].clinicalPracticeEvidence||[];DB[k].clinicalPracticeEvidence.push({dose:practical[k][0],source:practical[k][1],sourceType:"小児科監修・病院薬剤部作成の臨床実務資料",url:sk});}});

 // Display the SKGH layer when present.
 const oldRender=render;
 render=function(){
  oldRender();
  const key=$("drug").value,d=DB[key],out=$("out");if(!d||!out||!d.clinicalPracticeEvidence||["tipe","cypro"].includes(key))return;
  const h=d.clinicalPracticeEvidence.map(x=>'・'+x.dose+' — <a href="'+x.url+'" target="_blank" rel="noopener">'+x.source+' ↗</a>（'+x.sourceType+'）').join("<br>");
  out.insertAdjacentHTML("beforeend",'<div class="note"><b>臨床実務資料：</b><br>'+h+'<br><span class="pill">承認用量とは別レイヤー</span></div>');
 };
})();

/* ===== Migrated source: cephalexin-brands-2026-09.js ===== */
// Cephalexin brand/formulation reconciliation: Keflex vs Larixin.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined'||!DB.cephalex)return;
 const S=$("drug"), add=(k,n,mg,note)=>{
   DB[k]=Object.assign({},DB.cephalex,{
     products:{g:{label:n,unit:"g",mgPerUnit:mg,defaultAmount:mg===100?4.5:2.25}},
     source:"厚生労働省 薬価基準収載品目／セファレキシン電子添文",
     sourceUrl:"https://www.mhlw.go.jp/topics/2025/04/dl/tp20250716-01_01.pdf",
     auditStatus:"現行収載確認済み",
     auditNote:note
   });
   if(!S.querySelector('option[value="'+k+'"]')){const o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}
 };
 add("larixin10","ラリキシンドライシロップ小児用10%",100,"セファレキシン100mg/g。ケフレックスとは別の商品名・製剤だが同一有効成分。");
 add("larixin20","ラリキシンドライシロップ小児用20%",200,"セファレキシン200mg/g。ケフレックスとは別の商品名・製剤だが同一有効成分。");

 // Enrich aliases used by the search layer so generic and brand searches both hit.
 const aliases={
   cephalex:["セファレキシン","ケフレックス","keflex","cephalexin"],
   aud_cephalex100:["セファレキシン","ケフレックス","ケフレックスシロップ用細粒100","keflex","cephalexin"],
   aud_cephalex200:["セファレキシン","ケフレックス","ケフレックスシロップ用細粒200","keflex","cephalexin"],
   larixin10:["セファレキシン","ラリキシン","ラリキシンドライシロップ","ラリキシンドライシロップ小児用10%","larixin","cephalexin"],
   larixin20:["セファレキシン","ラリキシン","ラリキシンドライシロップ","ラリキシンドライシロップ小児用20%","larixin","cephalexin"]
 };
 Object.keys(aliases).forEach(k=>{if(DB[k])DB[k].searchAliases=aliases[k];});

 // Search UI was loaded before this file; patch its datalist/input matcher without replacing existing behavior.
 const input=document.getElementById("drugSearch");
 if(input){
   const old=input.oninput;
   input.oninput=function(e){
     if(typeof old==="function")old.call(this,e);
     const q=(this.value||"").trim().toLowerCase();
     if(!q)return;
     const hit=Object.keys(aliases).find(k=>aliases[k].some(a=>a.toLowerCase().includes(q)) && DB[k]);
     if(hit && (q.includes("ラリキシ")||q==="larixin")){S.value=hit;loadDrug(true);}
   };
 }
})();
// Correct formulation-specific dosing: L-Keflex is BID; Larixin DS is q6h (QID).
(function(){
 const S=document.getElementById("drug"); if(typeof DB==="undefined"||!S)return;
 const cephDose=(freq,desc)=>({general:{label:"承認感染症",lo:w=>25*w,hi:w=>50*w,max:w=>100*w,freq:[freq],perDoseLo:w=>(25*w/freq),perDoseHi:w=>(50*w/freq),desc}});
 if(DB.aud_lkeflex){
   DB.aud_lkeflex.indications=cephDose(2,"通常25～50mg/kg/dayを2回に分割し朝・夕食後。重症・低感受性では50～100mg/kg/dayを2回に分割。胃溶性粒と腸溶性粒を組み合わせた持続性製剤。");
   DB.aud_lkeflex.auditNote="1包1g中セファレキシン200mg（胃溶性粒60mg＋腸溶性粒140mg）。通常は分2。";
 }
 ["larixin10","larixin20"].forEach(k=>{if(DB[k]){
   DB[k].indications=cephDose(4,"通常25～50mg/kg/dayを分割して6時間毎（分4）に投与。重症・低感受性では50～100mg/kg/dayを同様に分割。");
   DB[k].source="PMDA ラリキシンドライシロップ小児用10%／20% 電子添文";
   DB[k].sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132002R1168_2?user=1";
   DB[k].auditNote="L-ケフレックスとは同成分だが製剤設計・承認投与間隔が異なる。ラリキシンDSは6時間毎（分4）。";
 }});
})();

/* ===== Migrated source: oral-batch-02-2026-09.js ===== */
// Oral batch 02: 50 pharmacy-use oral formulations, favoring audited ingredients.
// New high-complexity ingredients are added only where current PMDA logic is explicitly represented.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const S=$("drug");
 const opt=(k,n)=>{if(!S.querySelector('option[value="'+k+'"]')){let o=document.createElement("option");o.value=k;o.textContent=n;S.appendChild(o);}};
 const clone=(k,n,b,products,aliases=[])=>{if(!DB[b])return;DB[k]=Object.assign({},DB[b],{products,auditStatus:"製剤別監査済み",searchAliases:[n,...aliases]});opt(k,n);};
 // 1-10 allergy/respiratory
 clone("ob02_olop25","アレロック顆粒0.5%","olop",{g:{label:"アレロック顆粒0.5%",unit:"g",mgPerUnit:5,defaultAmount:1}},["オロパタジン"]);
 clone("ob02_lora","クラリチンレディタブ錠10mg","lora",{tab:{label:"クラリチンレディタブ錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1}},["ロラタジン"]);
 clone("ob02_fexo30","アレグラ錠30mg","fexo",{tab:{label:"アレグラ錠30mg",unit:"錠",mgPerUnit:30,defaultAmount:2}},["フェキソフェナジン"]);
 clone("ob02_fexo60","アレグラ錠60mg","fexo",{tab:{label:"アレグラ錠60mg",unit:"錠",mgPerUnit:60,defaultAmount:2}},["フェキソフェナジン"]);
 clone("ob02_epiDS","アレジオンドライシロップ1%相当製剤","epi",{g:{label:"エピナスチン塩酸塩DS1%",unit:"g",mgPerUnit:10,defaultAmount:1}},["アレジオン","エピナスチン"]);
 clone("ob02_ketoS","ザジテンシロップ0.02%相当製剤","keto",{mL:{label:"ケトチフェンシロップ0.02%",unit:"mL",mgPerUnit:0.2,defaultAmount:5.4}},["ザジテン","ケトチフェン"]);
 clone("ob02_ketoDS","ザジテンドライシロップ0.1%相当製剤","keto",{g:{label:"ケトチフェンDS0.1%",unit:"g",mgPerUnit:1,defaultAmount:1.08}},["ザジテン","ケトチフェン"]);
 clone("ob02_pran","オノンドライシロップ10%","pran",{g:{label:"オノンドライシロップ10%",unit:"g",mgPerUnit:100,defaultAmount:1.26}},["プランルカスト"]);
 clone("ob02_mont4","キプレス細粒4mg","mont",{pack:{label:"キプレス細粒4mg",unit:"包",mgPerUnit:4,defaultAmount:1}},["シングレア","モンテルカスト"]);
 clone("ob02_mont5","キプレスチュアブル錠5mg","mont",{tab:{label:"キプレスチュアブル錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1}},["シングレア","モンテルカスト"]);
 // 11-20 cough/mucolytic/bronchodilator
 clone("ob02_mucodyneS","ムコダインシロップ5%","carbo",{mL:{label:"ムコダインシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10.8}},["カルボシステイン"]);
 clone("ob02_mucodyneDS","ムコダインDS50%","carbo",{g:{label:"ムコダインDS50%",unit:"g",mgPerUnit:500,defaultAmount:1.08}},["カルボシステイン"]);
 clone("ob02_mucosolvan","ムコソルバンDS1.5%相当製剤","ambro",{g:{label:"アンブロキソールDS1.5%",unit:"g",mgPerUnit:15,defaultAmount:1.08}},["アンブロキソール"]);
 clone("ob02_asverinPow","アスベリン散10%","tipe",{g:{label:"アスベリン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.45}},["チペピジン"]);
 clone("ob02_asverinS","アスベリンシロップ0.5%","tipe",{mL:{label:"アスベリンシロップ0.5%",unit:"mL",mgPerUnit:5,defaultAmount:9}},["チペピジン"]);
 clone("ob02_astomin","アストミン散10%","dime",{g:{label:"アストミン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.3}},["ジメモルファン"]);
 clone("ob02_meptinDS","メプチンドライシロップ0.005%","proc",{g:{label:"メプチンDS0.005%",unit:"g",mgPerUnit:.05,defaultAmount:.5}},["プロカテロール"]);
 clone("ob02_meptinS","メプチンシロップ5μg/mL","proc",{mL:{label:"メプチンシロップ5μg/mL",unit:"mL",mgPerUnit:.005,defaultAmount:5}},["プロカテロール"]);
 clone("ob02_theodur","テオドールDS20%","theo",{g:{label:"テオドールDS20%",unit:"g",mgPerUnit:200,defaultAmount:.9}},["テオフィリン"]);
 clone("ob02_hokunalin","ホクナリン錠1mg相当経口製剤","tulooral",{tab:{label:"ツロブテロール錠1mg",unit:"錠",mgPerUnit:1,defaultAmount:1}},["ツロブテロール"]);
 // 21-30 GI/antiemetic/analgesic
 clone("ob02_nauzDS","ナウゼリンドライシロップ1%","domp",{g:{label:"ナウゼリンDS1%",unit:"g",mgPerUnit:10,defaultAmount:1.8}},["ドンペリドン"]);
 clone("ob02_primperan","プリンペランシロップ0.1%","meto",{mL:{label:"プリンペランシロップ0.1%",unit:"mL",mgPerUnit:1,defaultAmount:5}},["メトクロプラミド"]);
 clone("ob02_caronal20","カロナール細粒20%","apap",{g:{label:"カロナール細粒20%",unit:"g",mgPerUnit:200,defaultAmount:1.35}},["アセトアミノフェン"]);
 clone("ob02_caronal50","カロナール細粒50%","apap",{g:{label:"カロナール細粒50%",unit:"g",mgPerUnit:500,defaultAmount:.54}},["アセトアミノフェン"]);
 clone("ob02_apap200","アセトアミノフェン錠200mg","apap",{tab:{label:"アセトアミノフェン錠200mg",unit:"錠",mgPerUnit:200,defaultAmount:1}},["カロナール"]);
 clone("ob02_txaS","トランサミンシロップ5%","txa",{mL:{label:"トランサミンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}},["トラネキサム酸"]);
 clone("ob02_txaPow","トランサミン散50%","txa",{g:{label:"トランサミン散50%",unit:"g",mgPerUnit:500,defaultAmount:1}},["トラネキサム酸"]);
 clone("ob02_movLD","モビコール配合内用剤LD","movLD",{pack:{label:"モビコール配合内用剤LD",unit:"包",mgPerUnit:1,defaultAmount:1}},["マクロゴール"]);
 clone("ob02_movHD","モビコール配合内用剤HD","movHD",{pack:{label:"モビコール配合内用剤HD",unit:"包",mgPerUnit:1,defaultAmount:1}},["マクロゴール"]);
 clone("ob02_gaba","ガバペンシロップ5%","gaba",{mL:{label:"ガバペンシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:10}},["ガバペンチン"]);
 // 31-40 antiviral/antibiotic brands
 clone("ob02_tamiflu","タミフルドライシロップ3%","osel",{g:{label:"タミフルDS3%",unit:"g",mgPerUnit:30,defaultAmount:2.4}},["オセルタミビル"]);
 clone("ob02_valtrex","バルトレックス顆粒50%","vala",{g:{label:"バルトレックス顆粒50%",unit:"g",mgPerUnit:500,defaultAmount:1.5}},["バラシクロビル"]);
 clone("ob02_zovirax","ゾビラックス顆粒40%相当製剤","acy",{g:{label:"アシクロビル顆粒40%",unit:"g",mgPerUnit:400,defaultAmount:1}},["アシクロビル"]);
 clone("ob02_fro","フロモックス小児用細粒100mg/g","cfpn",{g:{label:"フロモックス小児用細粒100mg/g",unit:"g",mgPerUnit:100,defaultAmount:1.62}},["セフカペン"]);
 clone("ob02_meiact","メイアクトMS小児用細粒10%","cdtr",{g:{label:"メイアクトMS小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},["セフジトレン"]);
 clone("ob02_banan","バナンドライシロップ5%","cpdx",{g:{label:"バナンDS5%",unit:"g",mgPerUnit:50,defaultAmount:3.6}},["セフポドキシム"]);
 clone("ob02_cefzon","セフゾン細粒小児用10%","cfdn",{g:{label:"セフゾン細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:1.62}},["セフジニル"]);
 clone("ob02_cefaclor","ケフラール細粒小児用10%相当製剤","ccr",{g:{label:"セファクロル細粒小児用10%",unit:"g",mgPerUnit:100,defaultAmount:3.6}},["ケフラール","セファクロル"]);
 clone("ob02_farom","ファロムドライシロップ小児用10%","faro",{g:{label:"ファロムDS小児用10%",unit:"g",mgPerUnit:100,defaultAmount:2.7}},["ファロペネム"]);
 clone("ob02_orapenem","オラペネム小児用細粒10%","tebi",{g:{label:"オラペネム小児用細粒10%",unit:"g",mgPerUnit:100,defaultAmount:1.44}},["テビペネム"]);
 // 41-50 neuro / allergy / current formulations
 clone("ob02_eKeppra","イーケプラドライシロップ50%","levet",{g:{label:"イーケプラDS50%",unit:"g",mgPerUnit:500,defaultAmount:.72}},["レベチラセタム"]);
 clone("ob02_bimpat","ビムパットドライシロップ10%","lacos",{g:{label:"ビムパットDS10%",unit:"g",mgPerUnit:100,defaultAmount:.72}},["ラコサミド"]);
 clone("ob02_lacosJG","ラコサミドドライシロップ10%「JG」","lacos",{g:{label:"ラコサミドDS10%「JG」",unit:"g",mgPerUnit:100,defaultAmount:.72}},["ビムパット","ラコサミド"]);
 clone("ob02_lacosN","ラコサミドドライシロップ10%「日新」","lacos",{g:{label:"ラコサミドDS10%「日新」",unit:"g",mgPerUnit:100,defaultAmount:.72}},["ビムパット","ラコサミド"]);
 clone("ob02_valproS","バルプロ酸ナトリウムシロップ5%","valpro",{mL:{label:"バルプロ酸Naシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:6}},["デパケン","バルプロ酸"]);
 clone("ob02_valproDS","バルプロ酸ナトリウム細粒40%","valpro",{g:{label:"バルプロ酸Na細粒40%",unit:"g",mgPerUnit:400,defaultAmount:.75}},["デパケン","バルプロ酸"]);
 clone("ob02_rupa","ルパフィン錠10mg","rupa",{tab:{label:"ルパフィン錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1}},["ルパタジン"]);
 clone("ob02_desl","デザレックス錠5mg","desl",{tab:{label:"デザレックス錠5mg",unit:"錠",mgPerUnit:5,defaultAmount:1}},["デスロラタジン"]);
 clone("ob02_levo","ザイザルシロップ0.05%","levo",{mL:{label:"ザイザルシロップ0.05%",unit:"mL",mgPerUnit:.5,defaultAmount:5}},["レボセチリジン"]);
 clone("ob02_ceti","セチリジン塩酸塩DS1.25%","ceti",{g:{label:"セチリジンDS1.25%",unit:"g",mgPerUnit:12.5,defaultAmount:.4}},["ジルテック","セチリジン"]);

 // Current PMDA-backed complex oral ingredients if not already present.
 if(!DB.lacos){
   DB.lacos={products:{ds10:{label:"ラコサミドDS10%",unit:"g",mgPerUnit:100,defaultAmount:.72}},indications:{
    peds:{label:"4歳以上・50kg未満",lo:(w,a)=>a<4||w>=50?NaN:2*w,hi:(w,a)=>a<4||w>=50?NaN:(w<30?12*w:8*w),max:(w,a)=>w<30?12*w:8*w,freq:[2],desc:"4歳以上：2mg/kg/dayから開始。維持は30kg未満6mg/kg/day、30～50kg未満4mg/kg/day。最高は各12/8mg/kg/day。分2。"}
   },adult:[200,400],source:"PMDA ラコサミド経口剤電子添文（2026年改訂）",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1139015R1023_1?user=1",auditStatus:"PMDA現行用量確認済み"};
   opt("lacos","ラコサミド");
 }
 if(!DB.valpro){
   DB.valpro={products:{syr5:{label:"バルプロ酸Naシロップ5%",unit:"mL",mgPerUnit:50,defaultAmount:6}},indications:{
    epilepsy:{label:"てんかん等",lo:(w,a)=>10*w,hi:(w,a)=>40*w,freq:[2,3],desc:"用量は患者・適応で個別調整。血中濃度・臨床状態を含め確認する薬剤。ツールでは広い参考域のみ表示。"}
   },adult:[400,1200],source:"PMDA バルプロ酸ナトリウム製剤電子添文（2026-03改訂）",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1139004Q1135_1?user=1",auditStatus:"要TDM・個別調整"};
   opt("valpro","バルプロ酸ナトリウム");
 }
 // Add options for clones whose base became available after their first pass.
 [["ob02_bimpat","ビムパットドライシロップ10%","lacos"],["ob02_lacosJG","ラコサミドドライシロップ10%「JG」","lacos"],["ob02_lacosN","ラコサミドドライシロップ10%「日新」","lacos"],["ob02_valproS","バルプロ酸ナトリウムシロップ5%","valpro"],["ob02_valproDS","バルプロ酸ナトリウム細粒40%","valpro"]].forEach(([k,n,b],i)=>{
  if(DB[k]||!DB[b])return;
  const p=i<3?{g:{label:n,unit:"g",mgPerUnit:100,defaultAmount:.72}}:(i===3?{mL:{label:n,unit:"mL",mgPerUnit:50,defaultAmount:6}}:{g:{label:n,unit:"g",mgPerUnit:400,defaultAmount:.75}});
  clone(k,n,b,p,[b==="lacos"?"ラコサミド":"バルプロ酸"]);
 });
})();

/* ===== Migrated source: pediatric-ui-clarity-2026-09.js ===== */
// Clear approved-dose basis + kana-friendly search + flexible prescribed frequency.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const kana=s=>String(s||"").replace(/[ァ-ン]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0x60));
 const inp=$("drugSearch"),sel=$("drug");
 if(inp){
  const old=inp.oninput;
  inp.addEventListener("input",function(){
   const q=kana(this.value.normalize("NFKC").toLowerCase()).replace(/[\s　・‐－ー%％()（）「」]/g,"");
   if(q.length<2)return;
   const opts=[...sel.options];
   const hit=opts.filter(o=>{
    const d=DB[o.value],texts=[o.textContent];
    if(d&&d.searchAliases)texts.push(...d.searchAliases);
    if(d&&d.products)Object.values(d.products).forEach(p=>texts.push(p.label));
    return kana(texts.join(" ").normalize("NFKC").toLowerCase()).replace(/[\s　・‐－ー%％()（）「」]/g,"").includes(q);
   }).slice(0,12);
   const box=$("drugSuggest");
   if(hit.length&&box){
    box.innerHTML=hit.map(o=>'<button type="button" data-v="'+o.value+'" style="display:block;width:100%;border:0;border-bottom:1px solid #eef1f4;background:#fff;padding:9px;text-align:left;font-size:11px;cursor:pointer">'+o.textContent+'</button>').join("");
    box.style.display="block";
   }
  });
 }
 // Add kana aliases to common brands.
 const aa={cpdx:["バナン","ばなん"],cfpn:["フロモックス","ふろもっくす"],cdtr:["メイアクト","めいあくと"],cfdn:["セフゾン","せふぞん"],ccr:["ケフラール","けふらーる"],cam:["クラリス","くらりす"],amox:["サワシリン","さわしりん"],carbo:["ムコダイン","むこだいん"],ambro:["ムコソルバン","むこそるばん"],domp:["ナウゼリン","なうぜりん"]};
 Object.keys(aa).forEach(k=>{if(DB[k])DB[k].searchAliases=(DB[k].searchAliases||[]).concat(aa[k]);});
 // Prescribed frequency should not be restricted by approved frequency.
 const freq=$("freq");
 if(freq){[1,2,3,4,5,6].forEach(n=>{if(!freq.querySelector('option[value="'+n+'"]')){let o=document.createElement("option");o.value=n;o.textContent="分"+n;freq.appendChild(o);}});}
 // Render an explicit approved-dose calculation basis before auxiliary formula table.
 if(typeof render==="function"){
  const oldRender=render;
  render=function(){
   oldRender();
   const out=$("out"),d=DB[sel.value],ii=d&&d.indications[$("ind").value],p=d&&d.products[$("product").value];
   if(!out||!d||!ii||!p)return;
   if(out.querySelector(".dose-comparison-card"))return;
   const w=+$("wt").value,a=+$("age").value,f=+$("freq").value,q=+$("amount").value,mg=q*p.mgPerUnit;
   const lo=ii.lo(w,a),hi=ii.hi(w,a),allowed=ii.freqByAge?ii.freqByAge(a):(ii.freq||[]);
   const box=document.createElement("div");box.style.cssText="margin:10px 0;padding:12px;border:1px solid #cfdbe7;border-radius:10px;background:#fff";
   let calc=ii.desc||"承認用法・用量に基づく";
   let math=Number.isFinite(lo)&&Number.isFinite(hi)?("体重 "+w+" kg → 承認1日量 "+(Math.abs(lo-hi)<.01?lo.toFixed(1):lo.toFixed(1)+"～"+hi.toFixed(1))+" mg/day"):"年齢・適応条件から承認量を判定";
   if(Number.isFinite(lo)&&Number.isFinite(hi)&&w>0)math+="（"+(lo/w).toFixed(1)+(Math.abs(lo-hi)<.01?"":"～"+(hi/w).toFixed(1))+" mg/kg/day）";
   const freqText=allowed.length?allowed.map(x=>"分"+x).join(" または "):"個別確認";
   box.innerHTML='<div style="font-size:12px;font-weight:900;margin-bottom:5px">承認用法・用量 ─ 判定の根拠</div><div><b>基準：</b>'+calc+'</div><div><b>今回の患者：</b>'+math+'</div><div><b>承認上の分割：</b>'+freqText+'　／　<b>入力処方：</b>分'+f+'</div><div><b>入力処方量：</b>'+q+' '+p.unit+'/day ＝ '+mg.toFixed(1)+' mg/day（'+(w?mg/w:0).toFixed(1)+' mg/kg/day）</div>';
   const hero=out.querySelector(".hero"); if(hero)hero.insertAdjacentElement("afterend",box); else out.prepend(box);
  };
  render();
 }
})();

/* ===== Migrated source: audit-dashboard-2026-09.js ===== */
// DB audit dashboard: designed for final one-by-one PMDA reconciliation.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const btn=document.createElement("button");btn.type="button";btn.textContent="DB監査一覧";btn.className="secondary";
 btn.style.cssText="margin:8px 0;width:100%";
 const host=document.querySelector(".wrap")||document.body;
 const first=host.querySelector(".card"); if(first)first.insertAdjacentElement("beforebegin",btn); else host.prepend(btn);
 const panel=document.createElement("div");panel.style.cssText="display:none;margin:8px 0;padding:10px;background:#fff;border:1px solid #dbe3ea;border-radius:10px;overflow:auto";
 btn.insertAdjacentElement("afterend",panel);
 const esc=s=>String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
 const inferCategory=(k,d)=>{
  const s=(k+" "+JSON.stringify(d.products||{})+" "+JSON.stringify(d.searchAliases||[])).toLowerCase();
  if(/amox|amoxic|ampicillin|cam|clarith|azi|azith|cef|cfd|cfp|cdtr|ccr|cpdx|faro|tebi|tosu|oflx|mino|sult|ery|larixin|widecillin|ワイドシリン|ミノマイシン|オゼックス|オラペネム|クラバモックス|クラリシッド|クラリス|サワシリン|ジスロマック|セフポドキシム|タリビッド|トスフロキサシン|トミロン|バナン|ケフ|セフ|抗菌/.test(s))return"抗菌薬";
  if(/osel|acy|acic|vala|valacic|zana|lani|balo|famc|amena|molnu|nirma|ritonavir|favip|タミフル|リレンザ|イナビル|ゾフルーザ|バルトレックス|ゾビラックス|ファムビル|アメナリーフ|ラゲブリオ|パキロビッド|アビガン|抗ウイルス/.test(s))return"抗ウイルス薬";
  if(/olop|lora|fexo|keto|levo|ceti|mont|pran|epi|meq|rupa|desl|tran|clem|chlorphen|cypro|hydroxyz|oxatom|pemi|クレマスチン|タベジール|クロルフェニラミン|ポララミン|ペリアクチン|アタラックス|オキサトミド|セルテクト|アレ|ザイザル|キプレス/.test(s))return"抗アレルギー・喘息";
  if(/carbo|ambro|tipe|dime|proc|theo|tulo|ムコ|アスベリン|メプチン/.test(s))return"鎮咳・去痰・呼吸器";
  if(/domp|meto|mov|magnesium|lacto|bifido|clostr|miyar|biofer|loper|lactulose|senno|pico|famot|omep|lanso|rebami|酸化|整腸|ミヤ|ビオフェルミン|ラックビー|ロペ|ラクツロース|センノ|ピコスル|ナウゼリン/.test(s))return"消化器";
  if(/levet|lacos|valpro|gaba|mela|diaz|clob|carbamaz|phenob|clonaz|lamot|topira|zonis|てんかん|ダイアップ|デパケン|テグレトール|フェノバール|リボトリール|ラミクタール/.test(s))return"神経・鎮静";
  if(/pred|dexa|beta.*meth|リンデロン|デキサメタゾン|プレドニ|ステロイド/.test(s))return"ステロイド";
  if(/apap|acetamin|ibuprofen|loxopro|txa|カロナール|アセトアミノフェン|イブプロフェン/.test(s))return"解熱鎮痛・抗炎症";
  return"その他";
 };
 // Formal category batch 01 (50 ingredient records): explicit DB attributes, no name inference.
 const formal01={
 cam:"抗菌薬",amox:"抗菌薬",carbo:"鎮咳・去痰・呼吸器",ambro:"鎮咳・去痰・呼吸器",txa:"解熱鎮痛・抗炎症",
 levo:"抗アレルギー・喘息",apap:"解熱鎮痛・抗炎症",ceti:"抗アレルギー・喘息",mont:"抗アレルギー・喘息",desl:"抗アレルギー・喘息",
 olop:"抗アレルギー・喘息",pran:"抗アレルギー・喘息",lora:"抗アレルギー・喘息",epi:"抗アレルギー・喘息",fexo:"抗アレルギー・喘息",
 meq:"抗アレルギー・喘息",tulo:"鎮咳・去痰・呼吸器",cfpn:"抗菌薬",cdtr:"抗菌薬",cpdx:"抗菌薬",
 cfdn:"抗菌薬",ccr:"抗菌薬",tipe:"鎮咳・去痰・呼吸器",sult:"抗菌薬",cephalex:"抗菌薬",
 ery:"抗菌薬",azi:"抗菌薬",faro:"抗菌薬",tebi:"抗菌薬",fos:"抗菌薬",tosu:"抗菌薬",
 keto:"抗アレルギー・喘息",oxa:"抗アレルギー・喘息",pemi:"抗アレルギー・喘息",tran:"抗アレルギー・喘息",domp:"消化器",
 acy:"抗ウイルス薬",osel:"抗ウイルス薬",lani:"抗ウイルス薬",zana:"抗ウイルス薬",balo:"抗ウイルス薬",
 theo:"鎮咳・去痰・呼吸器",proc:"鎮咳・去痰・呼吸器",tulooral:"鎮咳・去痰・呼吸器",clem:"抗アレルギー・喘息",dime:"鎮咳・去痰・呼吸器",
 vala:"抗ウイルス薬",levet:"神経・鎮静",mela:"神経・鎮静",rupa:"抗アレルギー・喘息"
 };
 Object.entries(formal01).forEach(([k,v])=>{if(DB[k]){DB[k].category=v;DB[k].categoryAudit={status:"確定",batch:"01",checked:"2026-09-06"};}});
 // Persist category on each DB record. Dashboard and future sorting read this field first.
 Object.entries(DB).forEach(([k,d])=>{if(!d.category)d.category=inferCategory(k,d);});
 // Category cleanup pass: keep "その他" exceptional, not a dumping ground.
 Object.entries(DB).forEach(([k,d])=>{if(d.category==="その他"){const x=inferCategory(k,d);if(x!=="その他")d.category=x;}});
 const category=(k,d)=>d.category||inferCategory(k,d);
 const kana=s=>String(s).replace(/[ァ-ン]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0x60));
 function draw(){
  const rows=Object.entries(DB).map(([k,d])=>{
   const products=Object.values(d.products||{}).map(p=>p.label+" ["+p.mgPerUnit+" mg/"+p.unit+"]").join(" / ");
   const inds=Object.values(d.indications||{}).map(i=>i.label+"："+(i.desc||"")).join(" ｜ ");
   const freq=[...new Set(Object.values(d.indications||{}).flatMap(i=>i.freq||[]))].map(x=>"分"+x).join(",");
   return {k,d,cat:category(k,d),name:(SName(k,d)),products,inds,freq};
  }).sort((a,b)=>a.cat.localeCompare(b.cat,"ja")||kana(a.name).localeCompare(kana(b.name),"ja"));
  panel.innerHTML='<div style="font-weight:900;font-size:13px;margin-bottom:6px">DB監査一覧 <span style="font-size:10px;font-weight:500">— 最終的に1件ずつPMDA電子添文と突合</span></div>'+
  '<table style="min-width:1250px"><thead><tr><th>分類</th><th>一般名/DB</th><th>商品・規格</th><th>適応/承認用量ロジック</th><th>分割</th><th>実務資料</th><th>根拠</th><th>監査状態</th></tr></thead><tbody>'+
  rows.map(r=>'<tr><td>'+esc(r.cat)+'</td><td><b>'+esc(r.name)+'</b><br><span class="muted">'+esc(r.k)+'</span></td><td>'+esc(r.products)+'</td><td>'+esc(r.inds)+'</td><td>'+esc(r.freq||"—")+'</td><td>'+esc((r.d.clinicalPracticeEvidence||[]).map(x=>x.dose+" / "+x.source).join(" ｜ ")||"—")+'</td><td>'+(r.d.sourceUrl?'<a target="_blank" rel="noopener" href="'+esc(r.d.sourceUrl)+'">'+esc(r.d.source||"根拠")+' ↗</a>':esc(r.d.source||"—"))+'</td><td>'+esc(r.d.auditStatus||"未分類")+'</td></tr>').join("")+'</tbody></table>';
 }
 function SName(k,d){const o=document.querySelector('#drug option[value="'+CSS.escape(k)+'"]');return o?o.textContent:k;}
 btn.addEventListener("click",()=>{const open=panel.style.display!=="none";panel.style.display=open?"none":"block";btn.textContent=open?"DB監査一覧":"DB監査一覧を閉じる";if(!open)draw();});
})();

/* ===== Migrated source: pmda-audit-progress-2026-09.js ===== */
// Full PMDA audit tracking layer. Audit status is intentionally conservative.
(function(){if(typeof DB==='undefined')return;
 const verified=[];
 Object.entries(DB).forEach(([k,d])=>{if(!d.pmdaAudit)d.pmdaAudit={status:"未突合",checked:null,note:"全件PMDA 1対1監査対象"};});
 verified.forEach(k=>{if(DB[k])DB[k].pmdaAudit={status:"一次突合済",checked:"2026-09-06",note:"既存登録時のPMDA根拠を一次確認。最終監査で製剤・適応・年齢・用量・分割・上限を再突合"};});
 const old=document.querySelector('button.secondary');
 if(old){
  old.addEventListener("click",()=>setTimeout(()=>{
   const p=old.nextElementSibling;if(!p)return;
   const totalRecords=Object.keys(DB).length;
   const prog=window.PMDA_FINAL_PROGRESS||{done:131,total:139,status:"進行中"};
   const h=p.querySelector("div");
   const oldBox=p.querySelector(".pmdaProgressBox"); if(oldBox)oldBox.remove();
   if(h)h.insertAdjacentHTML("afterend",'<div class="pmdaProgressBox" style="margin:6px 0;padding:9px;background:#f5f7f9;border-radius:8px"><b>PMDA最終突合：</b>'+prog.done+' / '+prog.total+' 監査単位（'+prog.status+'）<br><span class="muted">現在のDBレコード数：'+totalRecords+'。製剤・商品名別の別レコードを含むため、監査単位の母数とは一致しません。</span></div>');
  },0));
 }

 // Previous premature final01 promotion removed. Final status is granted only after documented one-by-one verification.

 // Final status is assigned only by a documented pmda-final-batch-*.js file.
 // Earlier blanket promotions for records 1-30 were removed because they did not
 // retain record-level source URLs and comparison notes.
})();

/* ===== Migrated source: pmda-final-batch-01-2026-09.js ===== */
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

/* ===== Migrated source: pmda-final-batch-02-2026-09.js ===== */
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
      d.indications.resp.lo=w=>Math.min(9*w,600);
      d.indications.resp.hi=w=>Math.min(18*w,600);
      d.indications.resp.max=()=>600;
      d.indications.resp.perDoseLo=w=>Math.min(3*w,200);
      d.indications.resp.perDoseHi=w=>Math.min(6*w,200);
      d.indications.resp.desc='通常1回3mg/kgを1日3回。必要に応じ1回6mg/kgまで増量可。1回200mg、1日600mgを超えない。';
    }
  });
  mark(['cdtr','img02_11','ob01_cdtr','ob02_meiact'],
    'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/780009_6132015C1103_1_12',
    '通常3mg/kg/回×3、必要時6mg/kg/回×3、1回200mg・1日600mg上限を突合。');

  mark(['cpdx','img02_08','ob01_cpdx','ob02_banan'],
    'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132011R1074_1?user=1',
    '3mg/kg/回を1日2～3回、ドライシロップ5%の製剤量換算を突合。');
})();

/* ===== Migrated source: pmda-final-batch-03-2026-09.js ===== */
// PMDA final reconciliation — dose-logic groups 21–30 (2026-09-06).
(function(){
  if(typeof DB==='undefined') return;
  const mark=(keys,url,note)=>keys.forEach(k=>{if(DB[k])Object.assign(DB[k],{auditStatus:'PMDA最終突合済み',auditDate:'2026-09-06',sourceUrl:url,auditNote:note});});
  const hold=(keys,note)=>keys.forEach(k=>{if(DB[k])Object.assign(DB[k],{auditStatus:'PMDA固定URL確認待ち',auditDate:'2026-09-06',auditNote:note});});
  const apply=(keys,fn)=>keys.forEach(k=>{if(DB[k])fn(DB[k]);});
  mark(['cfdn','img02_09','ob01_cfdn','ob02_cefzon'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/171911_6132013C1031_4_08','9～18mg/kg/day・分3（1回3～6mg/kg相当）と細粒10%換算を突合。');
  mark(['ccr','aud_cefaclor100','ob01_ccr','ob02_cefaclor'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6132005C1053?user=1','20～40mg/kg/day・分3と現行100mg/g製剤を突合。');
  mark(['tipe','img02_02','imgF10','aud_asverinDS','ob01_tipeDS','ob01_tipeS','ob02_asverinPow','ob02_asverinS'],'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2249003B1037_3?user=1','5年齢区分の1日量と分3を突合。');
  mark(['sult','aud_unasin','ob01_sult'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6131008C1033?user=1','15～30mg/kg/day・分3と細粒10%換算を突合。');
  mark(['cephalex','aud_cephalex100','aud_cephalex200'],'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132002R1168_2?user=1','通常25～50mg/kg/day、重症等50～100mg/kg/dayを6時間毎として突合。');
  mark(['ery','img02_12','aud_ery20','aud_eryDSW20','aud_eryGran20','ob01_ery'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/730869_6141001R1120_3_09','25～50mg/kg/day・分4～6、小児用量は成人量を上限として突合。');
  mark(['azi','img02_17'],'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6149004C1030_3?user=1','10mg/kgを1日1回・3日間、成人量500mg/day上限を突合。');
  mark(['faro','aud_faro','ob01_faro','ob02_farom'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6139001R1032?user=1','通常5mg/kg/回×3、増量時10mg/kg/回上限を突合。');
  const tebiKeys=['tebi','aud_tebi','ob01_tebi','ob02_orapenem'];
  apply(tebiKeys,d=>Object.values(d.indications||{}).forEach(i=>{delete i.max;i.desc=i.desc.replace(/[。．]?1回300mg上限[。．]?/g,'。').replace(/。。+/g,'。');}));
  mark(tebiKeys,'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139002C1026_1?user=1','通常4mg/kg/回×2、必要時6mg/kg/回×2を突合。現行電子添文に記載のない1回300mg上限は設定しない。');
  mark(['fos','img02_15','img02_16'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/780009_6135001R1025_1_13','40～120mg/kg/day・分3～4とDS20%・40%換算を突合。');

})();

/* ===== Migrated source: pmda-final-batch-04-2026-09.js ===== */
// PMDA final reconciliation — medicines 31–40 (2026-09-06).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(ks,url,note)=>ks.forEach(k=>{if(DB[k])Object.assign(DB[k],{auditStatus:'PMDA最終突合済み',auditDate:'2026-09-06',sourceUrl:url,auditNote:note});});
 const apply=(ks,fn)=>ks.forEach(k=>{if(DB[k])fn(DB[k]);});
 mark(['tosu','img02_18','ob01_tosu'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6241010F3023?user=1','6mg/kg/回×2、1回180mg・1日360mg上限を突合。');
 mark(['keto','img02_35','imgF02','aud_ketoDS','ob01_ketoDS','ob02_ketoS','ob02_ketoDS'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/4490003R1309?user=1','0.06mg/kg/day・分2とDS0.1%・シロップ0.02%換算を突合。');
 const ox=['oxa','ob01_oxa'];apply(ox,d=>{const i=d.indications.general;i.lo=w=>w;i.hi=w=>1.5*w;i.max=w=>1.5*w;i.desc='通常1回0.5mg/kgを1日2回。1回最高0.75mg/kg';});
 mark(ox,'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/4490005R1448?user=1','通常0.5mg/kg/回×2、1回最高0.75mg/kgを計算へ追加。');
 mark(['pemi','aud_pemi','ob01_pemi'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/4490011R1060?user=1','喘息0.2mg/kg/回×2、鼻炎0.1mg/kg/回×2を適応別に突合。');
 mark(['tran','aud_riza10','aud_riza5','ob01_tran'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/4490002M1315?user=1','5mg/kg/day・分3と細粒10%・DS5%換算を突合。');
 const dk=['domp','ob01_dompDS','ob02_nauzDS'];apply(dk,d=>{const i=d.indications.general;i.hi=(w,a)=>Math.min((a>=6?1:2)*w,30);i.max=(w,a)=>Math.min((a>=6?1:2)*w,30);i.desc='1～2mg/kg/day・分3食前。最大30mg/day、6歳以上は最大1mg/kg/day';});
 mark(dk,'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2399005R1163?user=1','30mg/day上限と6歳以上1mg/kg/day上限を計算へ追加。');
 const ak=['acy','aud_acy80','aud_zovi40','ob01_acy','ob02_zovirax'];apply(ak,d=>{d.indications={simplex:{label:'単純疱疹／性器ヘルペス再発抑制',lo:w=>Math.min(80*w,800),hi:w=>Math.min(80*w,800),max:()=>800,freq:[4],desc:'20mg/kg/回×4。1回200mg上限'},zoster:{label:'帯状疱疹／水痘',lo:w=>Math.min(80*w,3200),hi:w=>Math.min(80*w,3200),max:()=>3200,freq:[4],desc:'20mg/kg/回×4。1回800mg上限'}};});
 mark(ak,'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480235_6250002D1199_1_09','適応別の1回上限200mg/800mg、20mg/kg/回×4を実装。');
 const ok=['osel','aud_tamiflu','ob01_osel','ob02_tamiflu'];apply(ok,d=>{d.indications={treat:{label:'インフルエンザ治療',lo:(w,a)=>Math.min((a<1?6:4)*w,150),hi:(w,a)=>Math.min((a<1?6:4)*w,150),max:()=>150,freq:[2],desc:'1歳未満3mg/kg/回、1歳以上2mg/kg/回を1日2回・5日間。1回75mg上限'},prevent:{label:'インフルエンザ予防（1歳以上）',lo:(w,a)=>a<1?NaN:Math.min(2*w,75),hi:(w,a)=>a<1?NaN:Math.min(2*w,75),max:()=>75,freq:[1],desc:'1歳以上2mg/kg/回を1日1回・10日間。1回75mg上限'}};});
 mark(ok,'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6250021R1024?user=1','治療の1歳未満/以上、予防、回数・期間・75mg上限を分離。');
 if(DB.lani)DB.lani.indications={treat:{label:'治療',lo:(w,a)=>a<10?20:40,hi:(w,a)=>a<10?20:40,freq:[1],desc:'10歳未満20mg、10歳以上40mgを単回吸入'},prevent:{label:'予防',lo:(w,a)=>a<10?20:40,hi:(w,a)=>a<10?20:40,freq:[1],desc:'10歳未満20mg、10歳以上40mgを単回吸入（10歳以上は20mg×1日1回・2日間も可）'}};
 mark(['lani'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6250703G1022?user=1','治療・予防の10歳未満20mg、10歳以上40mgを突合。');
 if(DB.zana)DB.zana.indications={treat:{label:'治療',lo:()=>20,hi:()=>20,freq:[2],desc:'10mg/回を1日2回・5日間吸入'},prevent:{label:'予防',lo:()=>10,hi:()=>10,freq:[1],desc:'10mg/回を1日1回・10日間吸入'}};
 mark(['zana'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6250702G1028?user=1','治療10mg×2・5日、予防10mg×1・10日を分離。');
})();

/* ===== Migrated source: pmda-final-batch-05-2026-09.js ===== */
// PMDA final reconciliation — medicines 41–50 (2026-09-06).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(ks,url,note)=>ks.forEach(k=>{if(DB[k])Object.assign(DB[k],{auditStatus:'PMDA最終突合済み',auditDate:'2026-09-06',sourceUrl:url,auditNote:note});});
 const apply=(ks,fn)=>ks.forEach(k=>{if(DB[k])fn(DB[k]);});
 mark(['balo'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6250047F2029?user=1','12歳未満の体重4区分、12歳以上の体重2区分による単回量と顆粒2%換算を突合。');
 mark(['theo','ob01_theoDS','ob02_theodurDS','ob02_theodurS'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2251001R1123?user=1','4～8mg/kg/回×2、徐放性DS20%換算、血中濃度を考慮した開始用量を確認。');
 mark(['proc','ob01_procS','ob02_meptinDS','ob02_meptinS','ob02_meptinMini','ob02_meptin50'],'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2259004Q1111_1?user=1','6歳未満1.25μg/kg/回×2～3、6歳以上の固定量と各濃度を突合。');
 mark(['tulooral','ob01_tuloDS','ob02_hokunalinDS','ob02_hokunalin1'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/2259002F1065?user=1','0.04mg/kg/day・分2、年齢別標準量、DS0.1%換算を突合。');
 mark(['clem','aud_clemS','ob01_clemS'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/4419008Q1157?user=1','1～15歳未満の5年齢区分の1日量・分2とシロップ0.01%換算を突合。');
 mark(['dime','ob01_dimeS','ob02_astominS','ob02_astominDS'],'https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2229001Q1054_2?user=1','年齢別1日量・分3、シロップ0.25%と散/DS2.5%換算を突合。');
 mark(['vala'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/01/14987246710043','10kg未満/以上の単純疱疹、水痘・帯状疱疹の25mg/kg/回と適応別上限を突合。');
 mark(['levet','ob01_levet'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/1139010R1020?user=1','1～6か月未満14～42mg/kg/day、6か月以上20～60mg/kg/day、発作型・分2を突合。');
 mark(['mela','ob01_mela','ob02_melatobel1','ob02_melatobel2'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/1190028F2023?user=1','6～15歳、1mg就寝前開始、最大4mg/dayと3規格を突合。');
 const rk=['rupa','ob01_rupa'];apply(rk,d=>{const i=d.indications.general;i.lo=(w,a)=>a<12?NaN:10;i.hi=(w,a)=>a<12?NaN:20;i.max=()=>20;});
 mark(rk,'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/4490034F1022?user=1','12歳以上10mg×1、症状により20mgまでの増量を範囲判定へ反映。');
})();

/* ===== Migrated source: pmda-final-batch-06-2026-09.js ===== */
// PMDA final reconciliation — medicines 51–60 (2026-09-06).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(ks,url,note)=>ks.forEach(k=>{if(DB[k])Object.assign(DB[k],{auditStatus:'PMDA最終突合済み',auditDate:'2026-09-06',sourceUrl:url,auditNote:note});});
 const apply=(ks,fn)=>ks.forEach(k=>{if(DB[k])fn(DB[k]);});

 mark(['meto','ob01_metoS','ob02_primperan'],'https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530169_2399004Q1090_2_05','0.38～0.53mg/kg/day・分2～3食前、シロップ0.5～0.7mL/kg/dayを突合。');
 mark(['clav'],'https://www.pmda.go.jp/PmdaSearch/rdSearch/02/6139100R1036?user=1','AMPC 90＋CVA 6.4mg/kg/day、12時間毎分2、食直前、1.01g中600＋42.9mgを突合。');

 apply(['mino'],d=>{const i=d.indications.general;i.lo=w=>Math.min(2*w,200);i.hi=w=>Math.min(4*w,200);i.max=()=>200;i.desc='2～4mg/kg/dayを12時間又は24時間ごと。小児は成人量200mg/dayを上限。特に8歳未満では歯牙の着色・エナメル質形成不全、一過性の骨発育不全を起こすことがあるため、他剤が使用できない又は無効の場合に限る';});
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
})();

/* ===== Migrated source: pmda-final-batch-07-2026-09.js ===== */
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
})();

/* ===== Migrated source: pmda-final-batch-08-2026-09.js ===== */
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
})();

/* ===== Migrated source: pmda-final-batch-09-2026-09.js ===== */
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

/* ===== Migrated source: steroid-master-2026-09.js ===== */
// Steroid master: generic-name parent records + product/brand aliases + practical-dose layer.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const S=$("drug");
 const opt=(k,n)=>{let o=S.querySelector('option[value="'+k+'"]');if(!o){o=document.createElement("option");o.value=k;S.appendChild(o);}o.textContent=n;};

 DB.pred={
  products:{
   pow1:{label:"プレドニゾロン散「タケダ」1%",unit:"g",mgPerUnit:10,defaultAmount:2},
   tab5:{label:"プレドニゾロン錠「タケダ」5mg",unit:"錠",mgPerUnit:5,defaultAmount:1}
  },
  indications:{general:{label:"副腎皮質ステロイド適応",lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],referenceOnly:true,desc:"添付文書は疾患・年齢・症状等に応じて用量を調整する。小児の固定mg/kg承認量としては自動判定せず、疾患別・実務用量を別レイヤーで表示。"}},
  adult:[5,60],
  source:"PMDA プレドニゾロン錠「タケダ」5mg／散「タケダ」1%",
  sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2456001F1353_2?user=1",
  searchAliases:["プレドニゾロン散","プレドニゾロン散1%","プレドニン","プレドニン散"],
  category:"ステロイド",
  auditStatus:"PMDA現行製剤確認済み"
 };
 opt("pred","プレドニゾロン");

 DB.beta={
  products:{
   syrup001:{label:"リンデロンシロップ0.01%",unit:"mL",mgPerUnit:0.1,defaultAmount:5},
   pow01:{label:"リンデロン散0.1%",unit:"g",mgPerUnit:1,defaultAmount:0.5},
   tab05:{label:"リンデロン錠0.5mg",unit:"錠",mgPerUnit:0.5,defaultAmount:1}
  },
  indications:{
   syrup:{label:"リンデロンシロップ0.01%",lo:()=>0.15,hi:()=>4,freq:[1,2,3,4],desc:"通常、成人にはベタメタゾンとして1日0.5～8mgを1～4回に分割経口投与する。小児には1日0.15～4mgを1～4回に分割経口投与する。なお、年齢、症状により適宜増減する。",clinicalNote:"承認範囲が広く、実際の投与量は適応・重症度で大きく異なる。疾患別の治療指針・実務用量も併せて確認する。"},
   solid:{label:"リンデロン錠0.5mg／散0.1%",lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],referenceOnly:true,desc:"錠剤・散剤は通常成人0.5～8mg/dayを1～4回に分割。年齢・症状により適宜増減。小児の固定承認量は設定されていない"}
  },
  adult:null,
  source:"PMDA リンデロン錠0.5mg／散0.1%／シロップ0.01%（2026年3月改訂）",
  sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454004B1040_2?user=1",
  searchAliases:["リンデロン","リンデロンシロップ","リンデロン散","ベタメタゾン"],
  category:"ステロイド",
  auditStatus:"PMDA最終突合済み",
  auditDate:"2026-09-07"
 };
 // Old product-name-only record is removed; generic-name parent is canonical.
 delete DB.aud_lindelonPow;
 const oldL=S.querySelector('option[value="aud_lindelonPow"]');if(oldL)oldL.remove();
 opt("beta","ベタメタゾン");
 // image-final.js が旧デキサメタゾン親レコードから作る製品名レコードを、
 // リンデロンの現行電子添文データで上書きする。
 DB.imgF01=Object.assign({},DB.beta,{
  products:{s:{label:"リンデロンシロップ0.01%",unit:"mL",mgPerUnit:0.1,defaultAmount:5}},
  indications:{syrup:DB.beta.indications.syrup},
  source:"PMDA リンデロンシロップ0.01%電子添文（2026年3月改訂）",
  sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454004B1040_2?user=1",
  searchAliases:["リンデロンシロップ0.01%","リンデロンシロップ","ベタメタゾンシロップ"],
  auditStatus:"PMDA最終突合済み",
  auditDate:"2026-09-08"
 });
 // Keep indication synchronized with the selected formulation.
 document.getElementById("product")?.addEventListener("change",()=>{
   if(document.getElementById("drug")?.value!=="beta")return;
   const ind=document.getElementById("ind"),p=document.getElementById("product")?.value;
   if(ind){ind.value=p==="syrup001"?"syrup":"solid"; if(typeof render==="function")render();}
 });

 DB.dexa=Object.assign({},DB.dexa||{},{
  products:Object.assign({},(DB.dexa&&DB.dexa.products)||{},{
   elixir001:{label:"デキサメタゾンエリキシル0.01%「日新」",unit:"mL",mgPerUnit:0.1,defaultAmount:5}
  }),
  indications:{general:{label:"副腎皮質ステロイド適応",lo:()=>0.15,hi:()=>4,freq:[1,2,3,4],desc:"通常、成人にはデキサメタゾンとして1日0.5～8mgを1～4回に分割経口投与する。小児には1日0.15～4mgを1～4回に分割経口投与する。なお、年齢、症状により適宜増減する。",clinicalNote:"承認範囲が広く、実際の投与量は適応・重症度で大きく異なる。下の疾患別実務用量は承認用量とは分けて確認する。"}},
  adult:[0.5,8],
  source:"PMDA デキサメタゾンエリキシル0.01%「日新」",
  sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454002S1157_1?user=1",
  searchAliases:[...new Set([...(DB.dexa?.searchAliases||[]),"デカドロン","デカドロンエリキシル","デキサメタゾン","デキサメタゾンエリキシル"])],
  category:"ステロイド",
  auditStatus:"PMDA最終突合済み"
 });
 opt("dexa","デキサメタゾン");

 window.STEROID_PRACTICE=window.STEROID_PRACTICE||{};
 window.STEROID_PRACTICE.pred=[{title:"実務用量｜湘南鎌倉総合病院 小児薬用量",dose:"1～2 mg/kg/day・分2",note:"最大 2 mg/kg/day",source:"湘南鎌倉総合病院『小児薬用量』／参考区分C：小児の薬の選び方・使い方"}];
 window.STEROID_PRACTICE.tipe=[{
  title:"実務用量｜治療薬ハンドブック",
  dose:"2 mg/kg/day・分3",
  note:"湘南鎌倉総合病院『小児薬用量』では1～2 mg/kg/day・分3。承認用量とは別に照合する実務目安。",
  source:'治療薬ハンドブック（ユーザー提示）／<a href="https://www.skgh.jp/wp/wp-content/themes/skgh/department/pharmacy/for-pharmacist/pdf/pediatric-dose.pdf" target="_blank" rel="noopener">湘南鎌倉総合病院「小児薬用量」 ↗</a>'
 }];
 window.STEROID_PRACTICE.cypro=[{
  title:"実務用量｜治療薬ハンドブック",
  dose:"0.25 mg/kg/day・分3",
  note:"湘南鎌倉総合病院『小児薬用量』でも0.25 mg/kg/dayを確認（同資料は1～3回分割）。承認用量とは別に照合する実務目安。",
  source:'治療薬ハンドブック（ユーザー提示）／<a href="https://www.skgh.jp/wp/wp-content/themes/skgh/department/pharmacy/for-pharmacist/pdf/pediatric-dose.pdf" target="_blank" rel="noopener">湘南鎌倉総合病院「小児薬用量」 ↗</a>'
 }];
 window.STEROID_PRACTICE.dexa=[{
  title:"疾患別実務用量｜クループ症候群",
  disease:"承認用量とは別に照合する参考用量",
  dose:"デキサメタゾン 1回 0.15～0.3 mg/kg・単回内服",
  note:'<div class="practiceDoseAlert"><b>小児承認上限4mg/dayとの照合：</b>0.15mg/kgでは約26.7kg、0.3mg/kgでは約13.3kgで4mgに達する。これを超える場合は、適応・目標量・処方意図を確認し、必要時は疑義照会する。</div><div class="practiceDoseVolume">エリキシル0.01%は0.1mg/mL。0.15mg/kgは製剤1.5mL/kg、4mgは40mLに相当する。</div><details class="practiceDoseDetails"><summary>服用性・飲めない場合の対応</summary><div class="practiceDoseDetailBody"><b>味・添加剤：</b>製剤はイチゴ様芳香と甘味を持つが、独特の味・苦味で拒否されることがある。エタノール5w/v%を含む（酒類のvol%とは単位が異なるため、「ビールと同じ濃度」とは厳密には表現しない）。<br><b>投薬時：</b>あらかじめ飲みにくさを説明し、単シロップ併用の要否を確認。追加処方が必要なら処方医へ確認する。水などで薄める、冷やす方法も候補。<br><b>混和候補：</b>ココア、ピーチネクター、バニラアイス、チョコアイス、練乳、イチゴジャム、キャラメルソース、バナナ、はちみつ。食品との組合せデータは主に成人官能試験で、小児での検証は限定的。はちみつは1歳未満には使用しない。<br><b>代替案1：</b>目標量1.5mgならデキサメタゾン0.5mg錠3錠を粉砕し、単シロップ5mLを併用する案（錠剤も苦味あり）。用量・剤形変更は処方医確認。<br><b>代替案2：</b>リンデロンシロップ0.01%は甘味があるが、現行電子添文では添加剤にエタノールも記載され、含有量は明記されていない。「アルコールなし」とは案内しない。ベタメタゾンとデキサメタゾンは一般的な糖質コルチコイド換算上ほぼ同等だが、自動的に同量置換せず、適応と用量を処方医へ確認する。</div></details>',
  source:'治療薬ハンドブック（ユーザー提示資料）／極める小児の服薬指導 改訂版 p.210／<a href="https://www.jstage.jst.go.jp/article/jdpt/36/1/36_82/_article/-char/ja" target="_blank" rel="noopener">日本小児臨床薬理学会雑誌 36(1):82–86, 2023 ↗</a>／PMDA電子添文・インタビューフォーム'
 }];
})();

/* ===== Migrated source: pmda-final-batch-10-2026-09.js ===== */
// PMDA final reconciliation — audit units 91–100 (2026-09-07).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};

 mark("aud_voltarenSupp","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1147700J1057_2?user=1","ボルタレンサポ12.5/25/50mg。小児1回0.5～1mg/kg、1日1～2回、少量から開始する承認記載を現行PMDAと再突合。");
 mark("aud_telemin2","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2359700J1088_3?user=1","テレミンソフト坐薬2mg。小児固定mg/kg量を自動生成せず、年齢・症状による適宜増減として区分を維持。");
 mark("aud_depakeneS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1139004Q1100_2?user=1","デパケンシロップ5%（50mg/mL）。承認1日量・分割と片頭痛発症抑制の上限を現行PMDAと再突合。");
 mark("aud_ataraxDS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019M1046_3?user=1","アタラックス-Pドライシロップ2.5%。成人量を年齢・症状で適宜増減する記載で、小児固定mg/kg承認量なしの区分を確認。");
 mark("aud_ataraxPow","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019B1037_3?user=1","アタラックス-P散10%。小児固定mg/kg承認量なしの区分と現行製剤を確認。");
 mark("aud_ataraxS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1179019Q1030_3?user=1","アタラックス-Pシロップ0.5%（5mg/mL）。小児固定mg/kg承認量なしの区分と濃度を確認。");
 mark("aud_flumEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1315704Q1115_1?user=1","フルメトロン点眼液0.1%。1回1～2滴、1日2～4回。2歳未満は慎重投与、臨床試験未実施の注意を確認。");
 mark("aud_patEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319752Q1024_2?user=1","パタノール点眼液0.1%。1回1～2滴、1日4回を現行PMDAと再突合。");
 mark("aud_alesionEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319762Q1028_1?user=1","アレジオン点眼液0.05%。1回1滴、1日4回。12歳未満の臨床試験未実施を確認。");
 mark("aud_alesionLX","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319762Q2024_1?user=1","アレジオンLX点眼液0.1%。1回1滴、1日2回（朝・夕）を現行PMDAと再突合。");
})();

/* ===== Migrated source: pmda-final-batch-11-2026-09.js ===== */
// PMDA final reconciliation — audit units 101–110 (2026-09-07).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};

 mark("aud_ketasEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319741Q1050_3?user=1","ケタス点眼液0.01%。イブジラスト0.1mg/mL、通常1回1～2滴・1日4回（朝、昼、夕方、就寝前）。小児等の臨床試験未実施も確認。");
 mark("aud_tosEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319751Q1020_3?user=1","オゼックス点眼液0.3%。成人及び小児1回1滴・1日3回、疾患・症状により適宜増量。2026年8月更新版を確認。");
 mark("aud_ofloxEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319722Q1163_1?user=1","タリビッド点眼液0.3%。通常1回1滴・1日3回、症状により適宜増減を現行PMDAと突合。");
 mark("aud_aziEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1317714Q1024_1?user=1","アジマイシン点眼液1%。結膜炎は成人及び7歳以上小児で1回1滴、1日2回を2日→1日1回を5日。眼瞼炎・麦粒腫・涙嚢炎の承認用量は成人のみ。");
 mark("aud_protopic03","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2699709M2024_3?user=1","プロトピック軟膏0.03%小児用。2歳以上、通常1日1～2回適量。1回上限は2～5歳1g、6～12歳2～4g、13歳以上5gを確認。");
 mark("aud_corectim025","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2699714M1029_2?user=1","コレクチム軟膏0.25%。小児0.25%を1日2回適量、症状に応じ0.5%可。1回5gまで、体表面積30%までを目安。");
 mark("aud_moizerto03","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2699715M1023_1?user=1","モイゼルト軟膏0.3%。小児0.3%を1日2回適量、症状に応じ1%可。1回塗布量0.1m²あたり1g目安。");
 mark("aud_polaramineDS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419002R1031_2?user=1","ポララミンドライシロップ0.2%。d-クロルフェニラミン2mg/g。承認用量は通常成人1回2mgを1日1～4回、年齢・症状で適宜増減。小児固定mg/kg承認量はない。");
 mark("beta","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454004B1040_2?user=1","ベタメタゾン（リンデロン錠0.5mg／散0.1%／シロップ0.01%）2026年3月版。錠・散は成人0.5～8mg/day・分1～4、小児固定量なし。シロップは小児0.15～4mg/day・分1～4。一般名親レコードへ統合。");
 mark("aud_livostinEye","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1319746Q1029_3?user=1","リボスチン点眼液0.025%。レボカバスチンとして0.25mg/mL、1回1～2滴を1日4回（朝、昼、夕方、就寝前）。");
})();

/* ===== Migrated source: pmda-final-batch-12-2026-09.js ===== */
// PMDA final reconciliation — audit units 111–120 (2026-09-07).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};
 const referenceOnly=(k,desc,freq=[1,2,3,4])=>{if(!DB[k])return;DB[k].indications={general:{label:"承認適応",lo:()=>NaN,hi:()=>NaN,freq,referenceOnly:true,desc}};};

 mark("aud_alegysalEye","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319735Q1071_1_09","アレギサール点眼液0.1%。通常1回1滴、1日2回（朝・夕）。低出生体重児・新生児・乳児の臨床試験未実施を確認。");
 mark("aud_levofEye","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300237_1319742Q1039_1_14","クラビット点眼液0.5%。通常1回1滴、1日3回。症状により適宜増減。");
 if(DB.aud_tomiron20)DB.aud_tomiron20.indications={general:{label:"小児の承認感染症",lo:w=>9*w,hi:w=>18*w,freq:[3],desc:"セフテラム ピボキシルとして9～18mg/kg/dayを3回に分割して経口投与。年齢・症状により適宜増減"}};
 mark("aud_tomiron20","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132009C2023_2?user=1","トミロン細粒小児用20%（200mg/g）。小児9～18mg/kg/day・分3を現行PMDA 2026年6月版で再突合。");
 mark("aud_eryDSW20","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6141001R1120_3?user=1","エリスロシンドライシロップW20%。200mg/g。小児25～50mg/kg/dayを4～6回に分割、成人量を上限。2026年7月版を確認。");
 mark("aud_eryGran20","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6141001R1120_3?user=1","エリスロシンW顆粒20%。200mg/g。小児25～50mg/kg/dayを4～6回に分割、成人量を上限。2026年7月版を確認。");

 // Clemastine syrup has an approved age-banded standard daily volume for children.
 const clemDesc="幼小児の標準1日量（シロップ0.01%）：1歳以上3歳未満4mL、3歳以上5歳未満5mL、5歳以上8歳未満7mL、8歳以上11歳未満10mL、11歳以上15歳未満13mL。1歳未満は体重・症状などを考慮して適宜投与量を決める。";
 const clemInd={general:{label:"アレルギー性鼻炎／皮膚疾患／上気道炎症状",lo:(w,a)=>a<1?NaN:a<3?0.4:a<5?0.5:a<8?0.7:a<11?1:a<15?1.3:2,hi:(w,a)=>a<1?NaN:a<3?0.4:a<5?0.5:a<8?0.7:a<11?1:a<15?1.3:2,freq:[2],desc:clemDesc}};
 if(DB.clem)DB.clem.indications=clemInd;
 if(DB.aud_clemDS){DB.aud_clemDS.indications=clemInd;DB.aud_clemDS.products={g:{label:"クレマスチンドライシロップ0.1%「あゆみ」",unit:"g",mgPerUnit:1,defaultAmount:0.7}};}
 mark("clem","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008Q1157_1?user=1","シロップ0.01%の幼小児年齢別標準1日量と1歳未満の個別調整を反映。");
 mark("aud_clemDS","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008R1128_1?user=1","クレマスチンDS0.1%は1g中クレマスチン1mg。シロップと同一成分の剤形違いとして統合。");

 // Dextromethorphan tablets/powder: adult label only; do not fabricate pediatric fixed dose.
 const dextDesc="通常、成人はデキストロメトルファン臭化水素酸塩水和物として1回15～30mgを1日1～4回。年齢・症状により適宜増減。小児固定承認量はなく、小児等を対象とした臨床試験は実施されていない。";
 referenceOnly("aud_mediconPow",dextDesc,[1,2,3,4]);
 if(DB.aud_mediconPow){DB.aud_mediconPow.products={g:{label:"メジコン散10%",unit:"g",mgPerUnit:100,defaultAmount:0.15}};}
 mark("aud_mediconPow","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2223001B1210_2?user=1","メジコン散10%（100mg/g）。小児固定承認量なし、小児臨床試験未実施を確認。");

 mark("aud_fexoDS5","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490023R2035_1?user=1","フェキソフェナジンDS5%（50mg/g）。6か月～2歳未満15mg/回、2～12歳未満30mg/回、12歳以上60mg/回を各1日2回。");
 mark("aud_saw10","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6131001C1210_2?user=1","サワシリン細粒10%（100mg/g）。小児20～40mg/kg/day・分3～4、最大90mg/kg/dayを確認。");
 mark("aud_unasin","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6131008C1033_3?user=1","ユナシン細粒小児用10%（100mg/g）。スルタミシリン15～30mg/kg/day・分3。30mg/kg/day超で下痢・軟便増加の注意も確認。");
})();

/* ===== Migrated source: pmda-final-batch-13-2026-09.js ===== */
// PMDA final reconciliation — audit units 121–130 (2026-09-07).
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};

 mark("aud_cefrox","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132006R1093","オラスポア小児用DS10%。セフロキサジン30mg/kg/day・分3、症状により適宜増減。");
 mark("aud_fungizone","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266173001Q1047","ファンギゾンシロップ100mg/mL。小児1回0.5～1mL（50～100mg）を1日2～4回、食後。");
 mark("aud_pontal","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%261141005Q1050","ポンタールシロップ3.25%。小児1回0.2mL/kg（メフェナム酸6.5mg/kg）、原則1日2回まで、空腹時を避ける。");
 mark("aud_k2","https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/530258_3160002Q1040_3_02","ケイツーシロップ0.2%。新生児出血症等の治療は2mg/day、症状により6mg/dayまで。予防は1回2mgを規定スケジュールで投与。");
 mark("aud_hemangiol","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%262900003Q1029","ヘマンジオルシロップ小児用0.375%。1mg/kg/day・分2開始、2日以上あけて増量し3mg/kg/day・分2維持。");
 mark("aud_polaramineS","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/","ポララミンシロップ0.04%。承認は成人1回2mg・1日1～4回、年齢・症状で適宜増減。小児固定mg/kg承認量なし。");
 mark("aud_cefaclor100","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132005C1053","ケフラール細粒小児用100mg（100mg/g）。現行製剤濃度と小児承認量を再突合。");
 mark("aud_cephalex100","https://shinryohoshu.mhlw.go.jp/shinryohoshu/yakuzaiMenu/doYakuzaiInfoKobetsu%266132002R1141","ケフレックスシロップ用細粒100（100mg/g）。現行製剤濃度と小児承認量を再突合。");
 mark("aud_cephalex200","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/","ケフレックスシロップ用細粒200（200mg/g）。現行製剤濃度と小児承認量を再突合。");
 mark("aud_faro","https://www.pmda.go.jp/PmdaSearch/iyakuSearch/","ファロムドライシロップ小児用10%（100mg/g）。現行製剤と小児承認量を再突合。");
})();

/* ===== Migrated source: pmda-final-batch-14-2026-09.js ===== */
// PMDA final reconciliation — audit units 131–138 (2026-09-07). Final batch.
(function(){
 if(typeof DB==='undefined')return;
 const mark=(k,url,note)=>{if(DB[k])Object.assign(DB[k],{auditStatus:"PMDA最終突合済み",auditDate:"2026-09-07",sourceUrl:url,auditNote:note});};

 mark("aud_tebi","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139002C1026_1?user=1","オラペネム小児用細粒10%。一般名テビペネム ピボキシル。2026年6月30日改訂の現行PMDA製品ページで製剤・承認用量ロジックを再確認。");
 mark("aud_acy80","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6250002R1056_1?user=1","アシクロビルDS80%。2026年2月10日改訂。小児の適応別20mg/kg/回と1回上限を既存監査済みロジックと再突合。");
 mark("aud_zovi40","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6250002D1024_1?user=1","ゾビラックス顆粒40%。2026年2月10日改訂。アシクロビル400mg/g、適応別小児用量・1回上限を再突合。");
 mark("aud_vala","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6250019D1020_1?user=1","バルトレックス顆粒50%。2026年2月10日改訂。小児25mg/kg/回を1日3回、1回1000mg上限の既存ロジックと再突合。");
 mark("aud_tamiflu","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6250021R1024_1?user=1","タミフルドライシロップ3%。治療・予防、1歳未満/以上の用量区分と1回75mg上限を既存監査済みロジックと再突合。");
 mark("aud_claritin","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490027R1029_4?user=1","クラリチンドライシロップ1%。一般名ロラタジン。小児3歳以上7歳未満5mg、7歳以上10mgを1日1回の既存ロジックと現行PMDAで再突合。");
 mark("aud_cetiTakata","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490020R1035_1?user=1","セチリジン塩酸塩DS1.25%「タカタ」。2～7歳未満2.5mg/回、7～15歳未満5mg/回、各1日2回を現行PMDAと再突合。");
 mark("aud_kipres","https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4490026C1021_2?user=1","キプレス細粒4mg。1歳以上6歳未満の小児気管支喘息に1回4mgを1日1回、就寝前の承認用量を現行PMDAと再突合。");

 window.PMDA_FINAL_PROGRESS={done:139,total:139,status:"完了",date:"2026-09-07"};
})();

/* ===== Migrated source: pmda-final-status-normalizer-2026-09.js ===== */
// Follow-up corrections: product search identity and PMDA dose reconciliation, 2026-09-09.
(function(){
 if(typeof DB==="undefined")return;
 const tagProduct=(drugKey,productKey,values)=>{const p=DB[drugKey]?.products?.[productKey];if(p)Object.assign(p,values);};
 const salbutamolIndications={general:{
   label:"気管支喘息・気管支炎等の気管支攣縮",
   lo:(w,a)=>a<5?0.3*w:NaN,hi:(w,a)=>a<5?0.3*w:NaN,freq:[3],
   desc:"乳幼児：ベネトリンシロップ0.04%を0.75mL/kg/day（サルブタモール0.3mg/kg/day）として分3。標準1日量は1歳未満3～6mL、1～3歳未満6～9mL、3～5歳未満9～15mL。"
 }};
 ["salbu","salb","imgF13"].forEach(k=>{
   if(!DB[k])return;
   DB[k].products={syr004:{label:"ベネトリンシロップ0.04%",unit:"mL",mgPerUnit:0.4,defaultAmount:7.5,defaultAmountByWeight:w=>0.75*w}};
   DB[k].indications=salbutamolIndications;DB[k].adult=null;
   DB[k].source="PMDA ベネトリンシロップ0.04%電子添文（2025年8月改訂）";
   DB[k].sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2254001Q1073_1?user=1";
   DB[k].auditNote="1mL中サルブタモール0.4mg。乳幼児0.75mL/kg/day（0.3mg/kg/day）・分3と年齢別標準1日量を突合。";
   DB[k]._familyDisplayName="ベネトリン（サルブタモール）";
 });
 const clavBands=[
   {min:6,max:10,label:"6～10kg",amount:1.01},
   {min:11,max:16,label:"11～16kg",amount:2.02},
   {min:17,max:23,label:"17～23kg",amount:3.03},
   {min:24,max:30,label:"24～30kg",amount:4.04},
   {min:31,max:36,label:"31～36kg",amount:5.05},
   {min:37,max:39,label:"37～39kg",amount:6.06}
 ];
 const clavBand=w=>Number.isFinite(w)?clavBands.find(x=>w>=x.min&&w<x.max+1)||null:null;
 const clavBandAmount=w=>clavBand(w)?.amount??NaN;
 const doseTable=(rows,headers=["体重","製剤1日量"],compact=false)=>{
   const table='<table class="label-dose-table"><thead><tr>'+headers.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('')+'</tbody></table>';
   return compact?'<div class="label-dose-compact">'+table+'</div>':headers.length>=5?'<div class="label-dose-wide">'+table+'</div>':table;
 };
 if(DB.clav){
   const strength=(600+42.9)/1.01;
   DB.clav.products={ds:{label:"クラバモックス小児用配合ドライシロップ（分包製剤）",unit:"g",mgPerUnit:strength,defaultAmount:2.02,defaultAmountByWeight:clavBandAmount}};
   DB.clav.doseBasis="product_band";
   DB.clav.productDoseBand=clavBand;
   DB.clav.componentMgPerUnit={amoxicillin:600/1.01,clavulanate:42.9/1.01};
   DB.clav.packetSizes=[1.01,0.505];
   DB.clav.indications={general:{label:"承認感染症（分包製剤・体重換算表）",lo:w=>clavBandAmount(w)*strength,hi:w=>clavBandAmount(w)*strength,freq:[2],desc:"通常はAMPC/CVA合計96.4mg/kg/day（AMPC 90＋CVA 6.4mg/kg/day）を12時間ごと・分2・食直前。分包製剤の目安1日量："+doseTable(clavBands.map(x=>[x.label,x.amount.toFixed(2)+"g"]))}};
   DB.clav.source="PMDA クラバモックス小児用配合ドライシロップ電子添文（2024年10月改訂）";
   DB.clav.sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139100R1036_1?user=1";
   DB.clav.warning="分包製剤はPMDA体重換算表で判定。6kg未満・40kg以上は表の範囲外。12時間ごと・分2・食直前。";
   DB.clav.weightEvidence={text:"PMDA分包製剤表：6～10kg 1.01g、11～16kg 2.02g、17～23kg 3.03g、24～30kg 4.04g、31～36kg 5.05g、37～39kg 6.06g／day。",url:DB.clav.sourceUrl,label:"PMDA電子添文"};
 }
 if(typeof setDefaultAmount==="function")setDefaultAmount=function(p){
   const mode=$("amountMode")?.value||"product",byWeight=typeof p.defaultAmountByWeight==="function"?p.defaultAmountByWeight(+$("wt").value):NaN,defaultAmount=Number.isFinite(byWeight)?byWeight:p.defaultAmount;
   $("amountInput").value=mode==="mg"?Number((defaultAmount*p.mgPerUnit*doseScale()).toFixed(3)):defaultAmount;syncAmountValue();
 };
 if(DB.imgF19)DB.imgF19.searchExcluded=true;
 if(DB.azi){
   const packDose=w=>w>=46?500:w>=36?400:w>=26?300:w>=15?200:NaN;
   const desc="アジスロマイシンとして10mg/kgを1日1回、3日間。最大500mg/day。分包製品では体重換算による服用量の概算が電子添文に示されている："+doseTable([["15～25kg","200mg（2包）"],["26～35kg","300mg（3包）"],["36～45kg","400mg（4包）"],["46kg以上","500mg（5包）"]],["体重","1日量（100mg分包）"]);
   DB.azi.indications={
     general:{label:"通常の体重換算",lo:w=>Math.min(10*w,500),hi:w=>Math.min(10*w,500),freq:[1],desc},
     package:{label:"分包製品の体重換算表",lo:packDose,hi:packDose,freq:[1],desc}
   };
   DB.azi.source="PMDA ジスロマック細粒小児用10%電子添文";
   DB.azi.sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6149004C1030_3?user=1";
 }
 if(DB.cdtr){
   DB.cdtr.indications.general.desc="通常1回3mg/kgを1日3回。肺炎・中耳炎・副鼻腔炎では必要に応じ1回6mg/kgまで増量可。1回200mg、1日600mgを超えない。";
   DB.cdtr.indications.resp.desc="通常1回3mg/kgを1日3回。必要に応じ1回6mg/kgまで増量可。1回200mg、1日600mgを超えない。";
 }
 if(DB.cpdx){
   const full="通常1回3mg/kgを1日2～3回。重症又は効果不十分の場合は1回4.5mg/kgを1日3回。";
   DB.cpdx.indications={
     general:{label:"一般感染症",lo:w=>3*w*(+$('freq').value||2),hi:w=>3*w*(+$('freq').value||2),freq:[2,3],perDoseLo:w=>3*w,perDoseHi:w=>3*w,desc:full},
     severe:{label:"重症／効果不十分",lo:w=>13.5*w,hi:w=>13.5*w,freq:[3],perDoseLo:w=>4.5*w,perDoseHi:w=>4.5*w,desc:full}
   };
 }
 if(DB.tebi){
   DB.tebi.indications={
     general:{label:"肺炎／中耳炎／副鼻腔炎",lo:w=>8*w,hi:w=>8*w,freq:[2],perDoseLo:w=>4*w,perDoseHi:w=>4*w,desc:"通常1回4mg/kgを1日2回、食後。必要に応じ1回6mg/kgまで増量可。"},
     high:{label:"必要時の増量",lo:w=>12*w,hi:w=>12*w,freq:[2],perDoseLo:w=>6*w,perDoseHi:w=>6*w,desc:"通常1回4mg/kgを1日2回、食後。必要に応じ1回6mg/kgまで増量可。"}
   };
   DB.tebi.source="PMDA オラペネム小児用細粒10%電子添文（2026年6月改訂）";
   DB.tebi.sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6139002C1026_1?user=1";
   DB.tebi.auditNote="通常4mg/kg/回×2、必要時6mg/kg/回×2。現行電子添文に記載のない1回300mg上限は設定しない。";
 }
 if(DB.tosu){
   DB.tosu.indications={general:{label:"肺炎／中耳炎等",lo:w=>Math.min(12*w,360),hi:w=>Math.min(12*w,360),max:()=>360,freq:[2],perDoseLo:w=>Math.min(6*w,180),perDoseHi:w=>Math.min(6*w,180),desc:"1回6mg/kgを1日2回。1回180mg、1日360mgを上限。"}};
   DB.tosu._familyDisplayName="トスフロキサシン";
   DB.tosu.searchAliases=[...new Set([...(DB.tosu.searchAliases||[]),"トスフロキサシン","オゼックス"] )];
 }
 if(DB.tosped&&DB.tosu){
   DB.tosped.indications=DB.tosu.indications;DB.tosped._familyDisplayName="トスフロキサシン";
   DB.tosped.searchAliases=[...new Set([...(DB.tosped.searchAliases||[]),"トスフロキサシン","トスフロキサシン小児用錠"] )];
   Object.values(DB.tosped.products||{}).forEach(p=>Object.assign(p,{_familyLabel:"小児用錠75mg",_dedupeIdentity:"tosu-tab75"}));
 }
 const cefixConfigs={
   fine:{
     general:{label:"一般感染症（細粒）",lo:w=>3*w,hi:w=>6*w,freq:[2],perDoseLo:w=>1.5*w,perDoseHi:w=>3*w,desc:"通常1回1.5～3mg/kgを1日2回。症状に応じて適宜増減する。重症又は効果不十分の場合は1回6mg/kgを1日2回。"},
     severe:{label:"重症／効果不十分（細粒）",lo:w=>12*w,hi:w=>12*w,freq:[2],perDoseLo:w=>6*w,perDoseHi:w=>6*w,desc:"通常1回1.5～3mg/kgを1日2回。症状に応じて適宜増減する。重症又は効果不十分の場合は1回6mg/kgを1日2回。"}
   },
   capsule:{general:{label:"通常量（体重30kg以上）",lo:(w,a)=>w>=30?100:NaN,hi:(w,a)=>w>=30?200:NaN,freq:[2],perDoseLo:()=>50,perDoseHi:()=>100,desc:"成人及び体重30kg以上の小児：通常1回50～100mgを1日2回。"}}
 };
 if(DB.cefix){
   DB.cefix.products={
     ds5:{label:"セフスパン細粒50mg（5%）",unit:"g",mgPerUnit:50,defaultAmount:1.2,_familyLabel:"細粒50mg（5%）",_cefixConfig:"fine",_dedupeIdentity:"cefix-fine-5"},
     cap50:{label:"セフスパンカプセル50mg",unit:"カプセル",mgPerUnit:50,defaultAmount:2,_familyLabel:"カプセル50mg",_cefixConfig:"capsule",_dedupeIdentity:"cefix-cap-50"},
     cap100:{label:"セフスパンカプセル100mg",unit:"カプセル",mgPerUnit:100,defaultAmount:2,_familyLabel:"カプセル100mg",_cefixConfig:"capsule",_dedupeIdentity:"cefix-cap-100"}
   };
   DB.cefix.indications=cefixConfigs.fine;DB.cefix._familyDisplayName="セフィキシム（セフスパン）";
   DB.cefix.searchAliases=[...new Set([...(DB.cefix.searchAliases||[]),"セフィキシム","セフスパン"] )];
   DB.cefix.source="PMDA セフスパン細粒50mg／カプセル50mg・100mg電子添文";
 }
 window.CEFIX_FORMULATION_CONFIGS=cefixConfigs;
 if(DB.aud_cefrox){
   DB.aud_cefrox._familyDisplayName="オラスポア（セフロキサジン）";
   DB.aud_cefrox.searchAliases=[...new Set([...(DB.aud_cefrox.searchAliases||[]),"オラスポア","セフロキサジン"] )];
   Object.values(DB.aud_cefrox.products||{}).forEach(p=>Object.assign(p,{_familyLabel:"ドライシロップ10%",_dedupeIdentity:"oraspor-ds10"}));
 }
 ["cephalex","cefalex"].forEach(k=>{if(DB[k]?.products)Object.values(DB[k].products).forEach(p=>p._familyExclude=true);});
 if(DB.cephalex){
   DB.cephalex._familyDisplayName="セファレキシン";
   const full="通常25～50mg/kg/dayを分割して6時間毎に投与。重症又は感受性が低い場合は50～100mg/kg/dayを同様に分割。";
   if(DB.cephalex.indications.general)DB.cephalex.indications.general.desc=full;
   if(DB.cephalex.indications.severe)DB.cephalex.indications.severe.desc=full;
 }
 if(DB.cefalex)DB.cefalex.searchExcluded=true;
 [
   ["aud_cephalex100","g","セファレキシン","ケフレックスシロップ用細粒100","keflex-100"],
   ["aud_cephalex200","g","セファレキシン","ケフレックスシロップ用細粒200","keflex-200"],
   ["larixin10","g","ラリキシン（セファレキシン）","ドライシロップ小児用10%","larixin-10"],
   ["larixin20","g","ラリキシン（セファレキシン）","ドライシロップ小児用20%","larixin-20"],
   ["aud_lkeflex","g","L-ケフレックス（セファレキシン）","小児用顆粒（1包1g）","l-keflex"]
 ].forEach(([k,p,name,label,identity])=>{
   if(!DB[k])return;DB[k]._familyDisplayName=name;
   DB[k].searchAliases=[...new Set([...(DB[k].searchAliases||[]),"セファレキシン","ケフレックス"] )];
   tagProduct(k,p,{_familyLabel:label,_dedupeIdentity:identity});
 });
 if(DB.cefteram&&DB.aud_tomiron20)DB.aud_tomiron20.indications=DB.cefteram.indications;
 ["cefteram","aud_tomiron20"].forEach(k=>{
   if(!DB[k])return;DB[k]._familyDisplayName="トミロン（セフテラム）";
   DB[k].searchAliases=[...new Set([...(DB[k].searchAliases||[]),"トミロン","セフテラム","セフテラム ピボキシル"] )];
   Object.values(DB[k].products||{}).forEach(p=>Object.assign(p,{_familyLabel:"細粒小児用20%",_dedupeIdentity:"tomiron-20"}));
 });

 // Follow-up reconciliation: desktop kana aliases, duplicate products, and allergy formulations.
 if(DB.faro?.indications?.general){
   const i=DB.faro.indications.general;
   i.perDoseLo=w=>Math.min(5*w,300);i.perDoseHi=w=>Math.min(10*w,300);i.max=()=>900;
   i.desc="通常1回5mg/kgを1日3回。年齢・症状に応じ1回10mg/kgまで増量可。成人での上限用量1回300mg、1日3回（1日900mg）を超えない。";
 }
 if(DB.fosfo){DB.fosfo.searchExcluded=true;Object.values(DB.fosfo.products||{}).forEach(p=>p._familyExclude=true);}
 if(DB.fos){
   DB.fos._familyDisplayName="ホスホマイシン";
   DB.fos.searchAliases=[...new Set([...(DB.fos.searchAliases||[]),"ホスホマイシン","ホスミシン"] )];
 }
 const minoDesc="通常2～4mg/kg/dayを12時間又は24時間ごとに投与。小児は成人量200mg/dayを上限。特に8歳未満では、歯牙の着色・エナメル質形成不全、また、一過性の骨発育不全を起こすことがあるため、他剤が使用できない又は無効の場合に限り投与を考慮する。";
 if(DB.mino){
   if(DB.mino.indications?.general)DB.mino.indications.general.desc=minoDesc;
   DB.mino._familyDisplayName="ミノサイクリン";
   DB.mino.searchAliases=[...new Set([...(DB.mino.searchAliases||[]),"ミノサイクリン","ミノマイシン"] )];
   DB.mino.warning="特に8歳未満では、歯牙の着色・エナメル質形成不全、また、一過性の骨発育不全を起こすことがあるため、他剤が使用できない又は無効の場合に限り投与を考慮します。";
   Object.values(DB.mino.products||{}).forEach(p=>{p._familyLabel="顆粒2%";p._dedupeIdentity="minocycline-granules-2";});
 }
 if(DB.minoc){DB.minoc.searchExcluded=true;Object.values(DB.minoc.products||{}).forEach(p=>p._familyExclude=true);}
 if(DB.aud_fungizone){
   DB.aud_fungizone._familyDisplayName="ファンギゾン";
   DB.aud_fungizone.searchAliases=[...new Set([...(DB.aud_fungizone.searchAliases||[]),"ファンギゾン","アムホテリシンB"] )];
   Object.values(DB.aud_fungizone.products||{}).forEach(p=>{p._familyLabel="シロップ100mg/mL";p._dedupeIdentity="fungizone-syrup-100";});
 }
 const hydInd={
   skin:{label:"蕁麻疹・皮膚疾患に伴うそう痒（成人量）",lo:()=>NaN,hi:()=>NaN,freq:[2,3],referenceOnly:true,desc:"成人量：ヒドロキシジンパモ酸塩として85～128mg/day（ヒドロキシジン塩酸塩として50～75mg/day）を1日2～3回に分割。年齢・症状により適宜増減する。"},
   neuro:{label:"神経症の不安・緊張・抑うつ（成人量）",lo:()=>NaN,hi:()=>NaN,freq:[3,4],referenceOnly:true,desc:"成人量：ヒドロキシジンパモ酸塩として128～255mg/day（ヒドロキシジン塩酸塩として75～150mg/day）を1日3～4回に分割。年齢・症状により適宜増減する。"}
 };
 ["aud_ataraxDS","aud_ataraxPow","aud_ataraxS"].forEach(k=>{if(!DB[k])return;DB[k].indications=hydInd;DB[k].referenceOnly=true;DB[k]._familyDisplayName="ヒドロキシジン（アタラックス-P）";DB[k].searchAliases=[...new Set([...(DB[k].searchAliases||[]),"ヒドロキシジン","アタラックスP","アタラックスピー"] )];});
 const epiInd={
     rhinitis:{label:"アレルギー性鼻炎",lo:w=>0.25*w,hi:w=>Math.min(0.5*w,20),max:()=>20,freq:[1],desc:"0.25～0.5mg/kg/dayを1日1回。最大20mg/day。"},
     skin:{label:"蕁麻疹・皮膚疾患に伴うそう痒",lo:w=>Math.min(0.5*w,20),hi:w=>Math.min(0.5*w,20),max:()=>20,freq:[1],desc:"0.5mg/kg/dayを1日1回。最大20mg/day。"}
 };
 ["epi","img02_36","ob01_epi","ob02_epiDS"].forEach(k=>{if(!DB[k])return;DB[k].indications=epiInd;DB[k]._familyDisplayName="エピナスチン";DB[k].searchAliases=[...new Set([...(DB[k].searchAliases||[]),"エピナスチン","アレジオン"] )];});
 if(DB.img02_37){DB.img02_37.searchExcluded=true;Object.values(DB.img02_37.products||{}).forEach(p=>p._familyExclude=true);}
 if(DB.ebas){DB.ebas._familyDisplayName="エバスチン（エバステル）";DB.ebas.searchAliases=[...new Set([...(DB.ebas.searchAliases||[]),"エバスチン","エバステル"] )];}
 if(DB.oxa){
   DB.oxa.products=Object.assign({},DB.oxa.products||{},{syr02:{label:"オキサトミドシロップ小児用0.2%",unit:"mL",mgPerUnit:2,defaultAmount:9}});
   DB.oxa._familyDisplayName="オキサトミド";
   DB.oxa.searchAliases=[...new Set([...(DB.oxa.searchAliases||[]),"オキサトミド","セルテクト"] )];
 }
 const clemDesc=(w,a,p)=>{
   const ds=p.unit==="g",amounts=ds?["0.4g","0.5g","0.7g","1.0g","1.3g"]:["4mL","5mL","7mL","10mL","13mL"];
   return "幼小児に対しては、標準的な1日量を2回に分け"+(ds?"、用時溶解して":"")+"経口投与する。"+doseTable([["1歳以上3歳未満",amounts[0]],["3歳以上5歳未満",amounts[1]],["5歳以上8歳未満",amounts[2]],["8歳以上11歳未満",amounts[3]],["11歳以上15歳未満",amounts[4]]],["年齢",(ds?"ドライシロップ0.1%":"シロップ0.01%")+"の1日量"])+"<div class=\"label-dose-note\">1歳未満は体重・症状などを考慮して適宜投与量を決める。</div>";
 };
 const clemInd={general:{label:"アレルギー性鼻炎／皮膚疾患／上気道炎症状",lo:(w,a)=>a<1?NaN:a<3?0.4:a<5?0.5:a<8?0.7:a<11?1:a<15?1.3:2,hi:(w,a)=>a<1?NaN:a<3?0.4:a<5?0.5:a<8?0.7:a<11?1:a<15?1.3:2,freq:[2],desc:clemDesc}};
 ["clem","aud_clemDS"].forEach(k=>{if(!DB[k])return;DB[k].indications=clemInd;DB[k].referenceOnly=false;DB[k]._familyDisplayName="クレマスチン";DB[k].searchAliases=[...new Set([...(DB[k].searchAliases||[]),"クレマスチン","タベジール"] )];});
 if(DB.clem)Object.values(DB.clem.products||{}).forEach(p=>{p._familyLabel="シロップ0.01%";p._dedupeIdentity="clemastine-syrup-001";p._source="PMDA クレマスチンシロップ0.01%電子添文";p._sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008Q1157_1?user=1";});
 if(DB.aud_clemDS)Object.values(DB.aud_clemDS.products||{}).forEach(p=>{p._familyLabel="ドライシロップ0.1%";p._dedupeIdentity="clemastine-ds-01";p._source="PMDA クレマスチンドライシロップ0.1%電子添文";p._sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/4419008R1128_1?user=1";});

 const fmtDose=n=>Number.isInteger(n)?String(n):String(Number(n.toFixed(3)));
 const productDose=(mg,p)=>fmtDose(mg/p.mgPerUnit)+(p.unit==="mL"?"mL":"g");
 const tipeDesc=(w,a,p)=>{
   return "小児はチペピジンクエン酸塩として、1歳未満5～20mg/day、1歳以上3歳未満10～25mg/day、3歳以上6歳未満15～40mg/dayを1日3回に分割。年齢・症状により適宜増減する。"+
     doseTable([
       ["散<br>10%","0.05～<br>0.2g","0.1～<br>0.25g","0.15～<br>0.4g","0.6～<br>1.2g"],
       ["DS<br>2%","0.25～<br>1g","0.5～<br>1.25g","0.75～<br>2g","3～6g"],
       ["シロップ<br>0.5%","1～4mL","2～5mL","3～8mL","12～24mL"],
       ["調剤用<br>シロップ2%","0.25～<br>1mL","0.5～<br>1.25mL","0.75～<br>2mL","3～6mL"]
     ],["剤形<br>1日量","1歳<br>未満","1～<br>3歳未満","3～<br>6歳未満","成人"],true);
 };
 const tipeInd={general:{label:"咳嗽・喀痰喀出困難",lo:(w,a)=>a<1?5:a<3?10:a<6?15:NaN,hi:(w,a)=>a<1?20:a<3?25:a<6?40:NaN,freq:[3],desc:tipeDesc}};
 ["tipe","img02_02","imgF10","aud_asverinDS","ob01_tipeDS","ob01_tipeS","ob02_asverinPow","ob02_asverinS"].forEach(k=>{if(DB[k])DB[k].indications=tipeInd;});
 if(DB.tipe){DB.tipe.source="PMDA アスベリン錠・散・ドライシロップ・シロップ電子添文（2025年4月改訂）";DB.tipe.sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2249003B1037_3?user=1";}

 const ketoDesc=(w,a,p)=>{
   const perKg=0.06/p.mgPerUnit,unit=p.unit;
   const rows=[["6カ月以上3歳未満",productDose(0.8,p)+"（0.8mg）"],["3歳以上7歳未満",productDose(1.2,p)+"（1.2mg）"],["7歳以上",productDose(2,p)+"（2.0mg）"]];
   return "通常、小児には製剤"+fmtDose(perKg)+unit+"/kg/day（ケトチフェンとして0.06mg/kg/day）を1日2回、朝食後及び就寝前に分けて投与する。年齢・症状により適宜増減する。"+doseTable(rows,["年齢","選択製剤の標準1日量（ケトチフェン量）"])+"<div class=\"label-dose-note\">1歳未満は体重・症状などを考慮して適宜投与量を決める。成人通常量はケトチフェンとして2mg/day・分2。</div>";
 };
 const ketoInd={general:{label:"気管支喘息／アレルギー性鼻炎／皮膚疾患",lo:w=>0.06*w,hi:w=>0.06*w,freq:[2],desc:ketoDesc}};
 ["keto","img02_35","imgF02","aud_ketoDS","ob01_ketoDS","ob02_ketoS","ob02_ketoDS"].forEach(k=>{if(DB[k])DB[k].indications=ketoInd;});

 const meqRows=(p,asthma)=>[["1歳以上2歳未満","8kg以上12kg未満",asthma?1.2:0.6],["2歳以上4歳未満","12kg以上17kg未満",asthma?1.8:0.9],["4歳以上7歳未満","17kg以上25kg未満",asthma?2.4:1.2],["7歳以上11歳未満","25kg以上40kg未満",asthma?3.6:1.8],["11歳以上16歳未満","40kg以上",asthma?6:3]].map(([age,wt,mg])=>[age,wt,productDose(mg,p)+"（"+mg.toFixed(1)+"mg）"]);
 const meqDesc=asthma=>(w,a,p)=>"通常、小児1回メキタジンとして"+(asthma?"0.12":"0.06")+"mg/kgを1日2回。年齢・症状に応じて適宜増減する。"+doseTable(meqRows(p,asthma),["年齢","標準体重","選択製剤の1回量（メキタジン量）"]);
 const meqInd={
   asthma:{label:"気管支喘息",lo:w=>0.24*w,hi:w=>0.24*w,freq:[2],perDoseLo:w=>0.12*w,perDoseHi:w=>0.12*w,desc:meqDesc(true)},
   allergy:{label:"アレルギー性鼻炎／蕁麻疹・皮膚疾患に伴うそう痒",lo:w=>0.12*w,hi:w=>0.12*w,freq:[2],perDoseLo:w=>0.06*w,perDoseHi:w=>0.06*w,desc:meqDesc(false)}
 };
 const meqKeys=["meq","img02_32","img02_33","imgF05","ob01_meq"];
 meqKeys.forEach(k=>{if(!DB[k])return;DB[k].indications=meqInd;DB[k]._familyDisplayName="メキタジン";DB[k].searchAliases=[...new Set([...(DB[k].searchAliases||[]),"メキタジン","ゼスラン","ニポラジン"] )];Object.values(DB[k].products||{}).forEach(p=>{const s=String(p.label||"");if(/ニポラジン/.test(s)){p._familyLabel="ニポラジン小児用細粒0.6%";p._dedupeIdentity="nipolazin-gran-06";}else if(/ゼスラン/.test(s)&&/シロップ/.test(s)){p._familyLabel="ゼスランシロップ0.03%";p._dedupeIdentity="zeslan-syr-003";}else if(/ゼスラン/.test(s)){p._familyLabel="ゼスラン小児用細粒0.6%";p._dedupeIdentity="zeslan-gran-06";}else p._familyExclude=true;});});

 const tranDesc=(w,a,p)=>"通常、小児には製剤"+fmtDose(5/p.mgPerUnit)+p.unit+"/kg/day（トラニラストとして5mg/kg/day）を1日3回に分けて投与する。年齢・症状により適宜増減する。";
 const tranInd={general:{label:"気管支喘息／アレルギー性鼻炎／アトピー性皮膚炎",lo:w=>5*w,hi:w=>5*w,freq:[3],desc:tranDesc}};
 ["tran","aud_riza10","aud_riza5","ob01_tran"].forEach(k=>{if(DB[k])DB[k].indications=tranInd;});

 if(DB.imgF17){
   DB.imgF17.indications={general:{label:"アレルギー性疾患（小児承認量）",lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],referenceOnly:true,desc:"小児には1回5mLを1日1～4回経口投与する。年齢・症状により適宜増減する。配合成分は1mL中ベタメタゾン0.05mg、d-クロルフェニラミンマレイン酸塩0.4mg。"}};
   DB.imgF17.referenceOnly=false;DB.imgF17._familyDisplayName="セレスタミン";DB.imgF17.searchAliases=[...new Set([...(DB.imgF17.searchAliases||[]),"セレスタミン"] )];
   Object.values(DB.imgF17.products||{}).forEach(p=>{p._familyLabel="配合シロップ";p._dedupeIdentity="celestamine-syrup";});
   DB.imgF17.sourceUrl="https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2459100Q1036_1?user=1";
 }
})();

// Normalize visible audit statuses after documented PMDA final reconciliation completion.
(function(){
 if(typeof DB==="undefined")return;
 const p=window.PMDA_FINAL_PROGRESS;
 if(!p||p.done!==p.total||p.status!=="完了")return;
 Object.values(DB).forEach(d=>{
   d.auditStatus="PMDA最終突合済み";
   d.auditDate=p.date||"2026-09-07";
   d.pmdaAudit={status:"PMDA最終突合済み",checked:p.date||"2026-09-07",note:"PMDA最終突合 139/139監査単位完了時点の現行DB。製剤・商品名別レコードは対応する監査済み用量ロジックと製剤確認結果を継承。"};
 });
})();

// Global formulation grouping / search deduplication / category normalization, 2026-09-09.
// Source DB records are preserved. Records that share the same dosing logic object are treated
// as formulation siblings; switching a formulation switches back to that original audited record.
(function(){
 if(typeof DB==="undefined"||typeof $==="undefined")return;
 const sel=$("drug"),product=$("product"); if(!sel||!product)return;
 const norm=s=>String(s||"").normalize("NFKC").toLowerCase().replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60)).replace(/[\s　・‐－ー%％()（）「」\[\]【】]/g,"");
 const dosageWord=/(シロップ|ドライシロップ|DS|細粒|顆粒|散|錠|カプセル|チュアブル|レディタブ|液|吸入|坐剤|テープ|クリーム|軟膏|小児用|mg|μg|%)/i;
 const optLabel=k=>sel.querySelector('option[value="'+CSS.escape(k)+'"]')?.textContent||k;
 const displayNames={cam:"クラリス（クラリスロマイシン）",carbo:"ムコダイン（カルボシステイン）",proc:"メプチン（プロカテロール）",pred:"プレドニゾロン"};
 const unitKey=u=>String(u||"").normalize("NFKC").toLowerCase()==="ml"?"mL":String(u||"").normalize("NFKC");
 function formulationKind(label,unit){
   const s=String(label||"").normalize("NFKC");
   if(/(?:ドライシロップ|\bDS\b|DS(?=\d)|シロップ用細粒)/i.test(s))return "dry-syrup";
   if(/シロップ|エリキシル/i.test(s))return "syrup";
   if(/OD錠/i.test(s))return "od-tablet";if(/チュアブル|レディタブ/i.test(s))return "chewable";if(/ミニ錠/i.test(s))return "mini-tablet";
   if(/錠/.test(s))return "tablet";if(/カプセル/.test(s))return "capsule";if(/細粒/.test(s))return "fine-granules";if(/顆粒/.test(s))return "granules";if(/散/.test(s))return "powder";
   if(/坐剤|坐薬|サポ/.test(s))return "suppository";if(/テープ|貼付/.test(s))return "tape";if(/吸入|ネブライザ|噴霧/.test(s))return "inhalation";if(/点眼/.test(s))return "eye-drops";if(/点鼻|点耳|パウダースプレー/.test(s))return "nasal";if(/外用|軟膏|クリーム|ゲル|ローション|塗布/.test(s))return "topical";
   return "unit-"+unitKey(unit);
 }
 const externalKinds=new Set(["suppository","tape","inhalation","eye-drops","nasal","topical"]);
 const externalNamePattern=/(点眼|点鼻|点耳|軟膏|クリーム|ゲル|ローション|塗布|吸入|ネブライザ|噴霧|テープ|貼付|坐剤|坐薬|サポ)/;
 const isSearchableProduct=p=>!externalNamePattern.test(String(p?.label||""))&&!externalKinds.has(formulationKind(p.label,p.unit));
 const externalSearchWords=["外用","軟膏","クリーム","ゲル","ローション","塗布","点眼","点鼻","点耳","吸入","ネブライザ","噴霧","テープ","貼付","坐剤","坐薬","サポ"].map(norm);
 function formulationSignature(p){return [formulationKind(p.label,p.unit),unitKey(p.unit),Number(p.mgPerUnit).toPrecision(12),p._dedupeIdentity||""].join("|");}
 function formulationLabel(p){
   let s=String(p.label||"").normalize("NFKC").replace(/「[^」]+」/g,"").replace(/【[^】]+】/g,"").replace(/相当製剤/g,"").replace(/（1包[^)]*）/g,"").trim();
   const patterns=[/ドライシロップ/i,/DS(?=\d|\s|$)/i,/シロップ用細粒/i,/小児用細粒/i,/細粒/i,/顆粒/i,/散/i,/OD錠/i,/チュアブル錠/i,/レディタブ錠/i,/ミニ錠/i,/錠/i,/カプセル/i,/シロップ/i,/エリキシル/i,/坐剤/i,/坐薬/i,/テープ/i,/吸入/i,/点眼/i,/点鼻/i,/軟膏/i,/クリーム/i];
   let at=-1;patterns.forEach(re=>{const m=s.search(re);if(m>=0&&(at<0||m<at))at=m;});if(at>0)s=s.slice(at);
   return s.replace(/^DS/i,"ドライシロップ").replace(/シロップ用細粒/i,"ドライシロップ").replace(/小児用/g,"").replace(/\s+/g," ").trim()||String(p.label||"");
 }

 // Preserve the explicitly requested canonical formulation sets.
 if(DB.cam){DB.cam.products=Object.assign({},DB.cam.products||{}, {
   ds10:{label:"クラリスドライシロップ10%小児用",unit:"g",mgPerUnit:100,defaultAmount:2.7},
   tab50:{label:"クラリス錠50mg小児用",unit:"錠",mgPerUnit:50,defaultAmount:5}
 });}
 if(DB.proc){DB.proc.products=Object.assign({},DB.proc.products||{}, {
   ds005:{label:"メプチンドライシロップ0.005%",unit:"g",mgPerUnit:0.05,defaultAmount:0.5},
   syrup5:{label:"メプチンシロップ5μg/mL",unit:"mL",mgPerUnit:0.005,defaultAmount:5},
   mini25:{label:"メプチンミニ錠25μg",unit:"錠",mgPerUnit:0.025,defaultAmount:1},
   tab50:{label:"メプチン錠50μg",unit:"錠",mgPerUnit:0.05,defaultAmount:1}
 });}

 const knownCategory={
  cam:"抗菌薬",amox:"抗菌薬",cfpn:"抗菌薬",cdtr:"抗菌薬",cpdx:"抗菌薬",cfdn:"抗菌薬",ccr:"抗菌薬",sult:"抗菌薬",cephalex:"抗菌薬",ery:"抗菌薬",azi:"抗菌薬",faro:"抗菌薬",tebi:"抗菌薬",fos:"抗菌薬",tosu:"抗菌薬",cfix:"抗菌薬",clav:"抗菌薬",
  ceti:"抗アレルギー薬",mont:"抗アレルギー薬",desl:"抗アレルギー薬",olop:"抗アレルギー薬",pran:"抗アレルギー薬",lora:"抗アレルギー薬",epi:"抗アレルギー薬",fexo:"抗アレルギー薬",meq:"抗アレルギー薬",keto:"抗アレルギー薬",oxa:"抗アレルギー薬",pemi:"抗アレルギー薬",tran:"抗アレルギー薬",clem:"抗アレルギー薬",rupa:"抗アレルギー薬",cypro:"抗アレルギー薬",ebas:"抗アレルギー薬",aud_ataraxPow:"抗アレルギー薬",
  carbo:"呼吸器・鎮咳去痰",ambro:"呼吸器・鎮咳去痰",tipe:"呼吸器・鎮咳去痰",tulo:"呼吸器・鎮咳去痰",theo:"呼吸器・鎮咳去痰",theoS:"呼吸器・鎮咳去痰",proc:"呼吸器・鎮咳去痰",tulooral:"呼吸器・鎮咳去痰",dime:"呼吸器・鎮咳去痰",salb:"呼吸器・鎮咳去痰",fusk:"呼吸器・鎮咳去痰",dextMix:"呼吸器・鎮咳去痰",
  apap:"解熱鎮痛・抗炎症",txa:"解熱鎮痛・抗炎症",
  domp:"消化器",meto:"消化器",movLD:"消化器",movHD:"消化器",lactoR:"消化器",
  acy:"抗ウイルス薬",osel:"抗ウイルス薬",lani:"抗ウイルス薬",zana:"抗ウイルス薬",balo:"抗ウイルス薬",vala:"抗ウイルス薬",
  levet:"神経",mela:"神経",lacos:"神経",gaba:"神経",valpro:"神経",
  kampo75:"漢方",kampo90:"漢方",kampo180:"漢方",
  pred:"ステロイド",beta:"ステロイド",dexa:"ステロイド"
 };
 const categoryOrder=["すべて","抗菌薬","抗アレルギー薬","呼吸器・鎮咳去痰","解熱鎮痛・抗炎症","消化器","抗ウイルス薬","漢方","ステロイド","神経","その他"];
 function keywordCategory(text){
   const s=String(text||"");
   if(/プレドニ|リンデロン|デキサメタ|ベタメタ|ステロイド/.test(s))return "ステロイド";
   if(/葛根湯|麻黄湯|小青竜湯|漢方/.test(s))return "漢方";
   if(/アシクロ|バラシクロ|タミフル|オセルタ|ラニナ|ザナミ|バロキサ|抗ウイルス/.test(s))return "抗ウイルス薬";
   if(/セフ|シリン|マイシン|ペネム|ホスホマイ|トスフロ|オゼックス|抗菌/.test(s))return "抗菌薬";
   if(/アレル|ヒスタミン|ザイザル|ジルテック|アレグラ|アレロック|アレジオン|クラリチン|デザレックス|ルパフィン|ザジテン|オノン|キプレス|シングレア/.test(s))return "抗アレルギー薬";
   if(/ムコダイン|カルボシステイン|ムコソルバン|アンブロキソール|アスベリン|アストミン|メプチン|プロカテロール|テオドール|テオフィリン|ホクナリン|ツロブテロール|ベネトリン|吸入|鎮咳|去痰/.test(s))return "呼吸器・鎮咳去痰";
   if(/カロナール|アセトアミノフェン|トランサミン|トラネキサム|解熱|鎮痛|抗炎症/.test(s))return "解熱鎮痛・抗炎症";
   if(/ナウゼリン|ドンペリドン|プリンペラン|メトクロプラミド|モビコール|マクロゴール|整腸|乳酸菌|消化器/.test(s))return "消化器";
   if(/イーケプラ|レベチラ|ビムパット|ラコサミド|ガバペン|バルプロ|デパケン|メラトニン|神経/.test(s))return "神経";
   return "その他";
 }

 // Keep Kampo adult-standard types as separate search/formulation choices, while sharing one
 // stable drug identity. Product changes swap only the matching reference-dose configuration.
 const kampoLabels={kampo75:"成人標準7.5g/日",kampo90:"成人標準9.0g/日",kampo180:"成人標準18.0g/日（黄耆建中湯）"};
 const kampoConfigs={};
 Object.keys(kampoLabels).forEach(k=>{
   const d=DB[k];if(!d)return;
   kampoConfigs[k]={indications:d.indications,adult:d.adult,source:d.source,sourceUrl:d.sourceUrl,labelUrl:d.labelUrl};
   d._familyDisplayName="ツムラ漢方";
   d.searchAliases=[...new Set([...(d.searchAliases||[]),"ツムラ漢方","つむらかんぽう","かんぽう",kampoLabels[k]])];
   Object.values(d.products||{}).forEach(p=>{p._familyLabel=kampoLabels[k];p._kampoConfig=k;p._dedupeIdentity=k;});
 });
 if(DB.kampo75)Object.keys(kampoConfigs).forEach(k=>{DB[k].indications=DB.kampo75.indications;});

 // Group records by shared indication object reference. All clone helpers in this app copy that
 // reference, so this identifies same-ingredient/product variants without merging unrelated drugs.
 const byLogic=new Map();
 Object.entries(DB).forEach(([k,d])=>{
   if(!d||!d.indications)return;
   const ref=d.indications;
   if(!byLogic.has(ref))byLogic.set(ref,[]);
   byLogic.get(ref).push(k);
 });
 const groups=[]; const groupByKey={};
 function canonicalScore(k){
   const label=optLabel(k),d=DB[k]||{};
   let score=0;
   if(knownCategory[k])score-=50;
   if(d.category)score-=20;
   if(dosageWord.test(label))score+=20;
   if(/^(img|ob|aud|nk)/i.test(k))score+=15;
   score+=label.length/100;
   return score;
 }
 byLogic.forEach(keys=>{
   const visible=keys.filter(k=>sel.querySelector('option[value="'+CSS.escape(k)+'"]'));
   if(!visible.length)return;
   visible.sort((a,b)=>canonicalScore(a)-canonicalScore(b));
   const canonical=visible[0];
   const g={canonical,members:visible};groups.push(g);visible.forEach(k=>groupByKey[k]=g);
 });
 // Single records not captured above still get their own group.
 [...sel.options].forEach(o=>{if(!groupByKey[o.value]){const g={canonical:o.value,members:[o.value]};groups.push(g);groupByKey[o.value]=g;}});

 function groupCategory(g){
   for(const k of g.members){if(knownCategory[k])return knownCategory[k];}
   for(const k of g.members){if(DB[k]?.category)return DB[k].category;}
   const txt=g.members.map(k=>optLabel(k)+" "+(DB[k]?.source||"")+" "+(DB[k]?.searchAliases||[]).join(" ")).join(" ");
   return keywordCategory(txt);
 }
 groups.forEach(g=>g.category=groupCategory(g));

 function formulations(g){
   const rows=[],seen=new Set();
   g.members.forEach(k=>{
     const d=DB[k];if(!d?.products)return;
     Object.entries(d.products).forEach(([pk,p])=>{
       if(pk.startsWith("__grp__")||!p?.label||p._familyExclude)return;
       const signature=formulationSignature(p);if(seen.has(signature))return;seen.add(signature);
       let label=p._familyLabel||formulationLabel(p);
       if(g.canonical==="pred"){if(formulationKind(p.label,p.unit)==="powder")label="散「タケダ」1%";if(formulationKind(p.label,p.unit)==="tablet")label="錠5mg";}
       rows.push({drug:g.canonical,sourceDrug:k,sourceProduct:pk,signature,label,rawLabel:p.label,productData:Object.assign({},p)});
     });
   });
   return rows;
 }
 function genericLabel(g){
   if(DB[g.canonical]?._familyDisplayName)return DB[g.canonical]._familyDisplayName;
   if(displayNames[g.canonical])return displayNames[g.canonical];
   const c=optLabel(g.canonical);
   return dosageWord.test(c)?(DB[g.canonical]?.searchAliases?.find(x=>!dosageWord.test(x))||c):c;
 }

 // Merge equivalent records into one stable drug record. Form changes now update synchronously;
 // no hidden switch to a sibling drug record remains to leave the previous unit behind.
 groups.forEach(g=>{
   const d=DB[g.canonical];if(!d)return;
   const rows=formulations(g),merged={};
   rows.forEach((r,i)=>{let key=r.sourceDrug===g.canonical&&!merged[r.sourceProduct]?r.sourceProduct:"form"+String(i+1).padStart(2,"0");while(merged[key])key+="x";merged[key]=Object.assign({},r.productData,{label:r.label,_searchLabel:r.rawLabel,_signature:r.signature});r.product=key;});
   if(rows.length){d.products=merged;d._familyFormulations=rows;d.preferredProductKey=rows[0].product;}
   d._pickerExcluded=rows.length>0&&!rows.some(r=>isSearchableProduct(r.productData));
   d.familyBase=g.canonical;d.displayName=genericLabel(g);
   d.searchAliases=[...new Set(g.members.flatMap(k=>[optLabel(k),...(DB[k]?.searchAliases||[]),...Object.values(DB[k]?.products||{}).flatMap(p=>[p.label,p._searchLabel].filter(Boolean))]))];
   const option=sel.querySelector('option[value="'+CSS.escape(g.canonical)+'"]');if(option)option.textContent=d.displayName;
   if(option&&d._pickerExcluded){option.hidden=true;option.disabled=true;option.dataset.externalOnly="1";}
   g.members.forEach(k=>{if(k!==g.canonical)sel.querySelector('option[value="'+CSS.escape(k)+'"]')?.remove();});
 });

 const kampoCanonical=groupByKey.kampo75?.canonical;
 const cefixCanonical=groupByKey.cefix?.canonical;
 const cefixConfigs=window.CEFIX_FORMULATION_CONFIGS||{};
 function applyCefixConfig(configKey){
   if(!cefixCanonical||!cefixConfigs[configKey])return;
   const d=DB[cefixCanonical],ind=$("ind"),current=ind.value;d.indications=cefixConfigs[configKey];
   ind.innerHTML=Object.entries(d.indications).map(([k,v])=>'<option value="'+k+'">'+v.label+'</option>').join("");
   if(d.indications[current])ind.value=current;
 }
 if(cefixCanonical){
   const previousCefixLoad=loadDrug;
   loadDrug=function(reset=true){
     if(sel.value===cefixCanonical){const selected=DB[cefixCanonical].products[product.value]?._cefixConfig;applyCefixConfig(reset?"fine":selected||"fine");}
     return previousCefixLoad(reset);
   };
   document.addEventListener("change",e=>{if(e.target===product&&sel.value===cefixCanonical){const config=DB[cefixCanonical].products[product.value]?._cefixConfig;if(config)applyCefixConfig(config);}},true);
 }
 function applyKampoConfig(configKey){
   if(!kampoCanonical||!kampoConfigs[configKey])return;
   const d=DB[kampoCanonical],c=kampoConfigs[configKey];
   d.indications=c.indications;d.adult=c.adult;d.source=c.source;d.sourceUrl=c.sourceUrl;d.labelUrl=c.labelUrl;d.referenceOnly=true;
 }
 if(kampoCanonical){
   const defaultProduct=Object.entries(DB[kampoCanonical].products).find(([,p])=>p._kampoConfig==="kampo75")?.[0];
   if(defaultProduct)DB[kampoCanonical].preferredProductKey=defaultProduct;
   const previousLoad=loadDrug;
   loadDrug=function(reset=true){
     if(sel.value===kampoCanonical){const selected=DB[kampoCanonical].products[product.value]?._kampoConfig;applyKampoConfig(reset?"kampo75":selected||"kampo75");}
     return previousLoad(reset);
   };
   document.addEventListener("change",e=>{if(e.target===product&&sel.value===kampoCanonical){const config=DB[kampoCanonical].products[product.value]?._kampoConfig;if(config)applyKampoConfig(config);}},true);
 }

 // Search is formulation-specific, but the selected drug field shows only the canonical drug name.
 function installSearch(){
   const oldInp=document.getElementById("drugSearch"),oldBox=document.getElementById("drugSuggest");
   if(!oldInp||!oldBox||oldInp.dataset.globalGroups==="1")return;
   const inp=oldInp.cloneNode(true),box=oldBox.cloneNode(false);oldInp.replaceWith(inp);oldBox.replaceWith(box);delete inp.dataset.clearButtonBound;inp.dataset.globalGroups="1";
   const render=()=>{
     const q=norm(inp.value);if(q.length<2){box.style.display="none";return;}
     if(externalSearchWords.some(word=>q.includes(word))){box.innerHTML='<div style="padding:9px;font-size:10px;color:#667085">候補なし</div>';box.style.display="block";box._globalRows=[];return;}
     const hits=[];
     groups.forEach(g=>{
       const d=DB[g.canonical],forms=d?._familyFormulations||[];
       if(g.members.every(k=>DB[k]?.searchExcluded))return;
       const labels=[genericLabel(g),...g.members.map(optLabel),...(d?.searchAliases||[]),...forms.flatMap(x=>[x.label,x.rawLabel])];
       if(!labels.some(x=>norm(x).includes(q)))return;
       forms.filter(x=>isSearchableProduct(x.productData)).forEach(x=>hits.push({label:genericLabel(g)+" "+x.label,drug:g.canonical,product:x.product}));
     });
     const seen=new Set();box._globalRows=hits.filter(r=>{const k=r.drug+"|"+r.product;if(seen.has(k))return false;seen.add(k);return true;}).slice(0,20);
     if(!box._globalRows.length){box.innerHTML='<div style="padding:9px;font-size:10px;color:#667085">候補なし</div>';box.style.display="block";return;}
     box.innerHTML=box._globalRows.map((r,i)=>'<button type="button" data-global-row="'+i+'" style="display:block;width:100%;border:0;border-bottom:1px solid #eef1f4;background:#fff;padding:9px;text-align:left;font-size:11px;cursor:pointer">'+r.label+'</button>').join("");
     box.style.display="block";
   };
   inp.addEventListener("input",render);
   box.addEventListener("click",e=>{
     const b=e.target.closest("[data-global-row]");if(!b)return;
     e.preventDefault();
     const r=(box._globalRows||[])[+b.dataset.globalRow];if(!r)return;
     sel.value=r.drug;if(typeof loadDrug==="function")loadDrug(true);else sel.dispatchEvent(new Event("change",{bubbles:true}));
     if(r.product&&product.querySelector('option[value="'+CSS.escape(r.product)+'"]')){product.value=r.product;product.dispatchEvent(new Event("change",{bubbles:true}));}
     inp.value=DB[r.drug]?.displayName||genericLabel(groupByKey[r.drug]);box.style.display="none";
   });
   sel.addEventListener("change",()=>{inp.value=DB[sel.value]?.displayName||optLabel(sel.value);box.style.display="none";});
   document.addEventListener("click",e=>{if(e.target!==inp&&!box.contains(e.target))box.style.display="none";});
   setTimeout(bindDrugSearchClear,0);
 }
 document.addEventListener("DOMContentLoaded",()=>setTimeout(installSearch,0));setTimeout(installSearch,0);

 function bindDrugSearchClear(){
   const inp=document.getElementById("drugSearch"),clear=document.getElementById("drugSearchClear");
   if(!inp||!clear||clear._boundSearchInput===inp)return;
   clear._boundSearchInput=inp;
   const sync=()=>{clear.hidden=!inp.value;};
   inp.addEventListener("input",sync);
   sel.addEventListener("change",()=>setTimeout(sync,0));
   document.addEventListener("click",()=>setTimeout(sync,0));
   clear.onclick=()=>{inp.value="";inp.dispatchEvent(new Event("input",{bubbles:true}));inp.focus();};
   sync();
 }
 document.addEventListener("DOMContentLoaded",()=>setTimeout(bindDrugSearchClear,1));setTimeout(bindDrugSearchClear,1);

 // Re-render the mobile "一覧から選択" sheet with inherited/dynamic categories so clone keys do not fall into "その他".
 function installCategorySheet(){
   const sheet=document.getElementById("drugListSheet"),btn=document.getElementById("drugListBtn");if(!sheet||!btn||sheet.dataset.globalCategories==="1")return;
   sheet.dataset.globalCategories="1";let active="すべて";const collator=new Intl.Collator("ja",{usage:"sort",sensitivity:"base"});
   const visibleGroups=()=>groups.filter(g=>{
     if(!sel.querySelector('option[value="'+CSS.escape(g.canonical)+'"]')||DB[g.canonical]?._pickerExcluded||externalNamePattern.test(genericLabel(g))||g.members.every(k=>DB[k]?.searchExcluded))return false;
     const forms=DB[g.canonical]?._familyFormulations||[];
     return forms.some(x=>isSearchableProduct(x.productData));
   });
   function draw(){
     const gs=visibleGroups().map(g=>({g,label:genericLabel(g),cat:g.category||"その他"})).sort((a,b)=>collator.compare(a.label,b.label));
     const shown=active==="すべて"?gs:gs.filter(x=>x.cat===active);
     const cats=categoryOrder.filter(c=>c==="すべて"||gs.some(x=>x.cat===c));
     document.getElementById("drugCategoryTabs").innerHTML=cats.map(c=>'<button type="button" class="drugCatTab'+(c===active?' active':'')+'" data-global-cat="'+c+'">'+c+'</button>').join("");
     const groupCats=active==="すべて"?categoryOrder.slice(1).filter(c=>shown.some(x=>x.cat===c)):[active];
     document.getElementById("drugListItems").innerHTML=groupCats.map(c=>'<div class="drugCatGroup"><div class="drugCatHead">'+c+'</div>'+shown.filter(x=>x.cat===c).map(x=>'<button type="button" data-v="'+x.g.canonical+'">'+x.label+'</button>').join("")+'</div>').join("");
   }
   btn.addEventListener("click",()=>{active="すべて";setTimeout(draw,0)});
   sheet.addEventListener("click",e=>{const c=e.target.closest("[data-global-cat]");if(!c)return;e.preventDefault();e.stopImmediatePropagation();active=c.dataset.globalCat;draw();},true);
 }
 document.addEventListener("DOMContentLoaded",()=>setTimeout(installCategorySheet,20));setTimeout(()=>installCategorySheet(),20);
})();

/* ===== Migrated inline enhancement: doseUnitAndMagmittCurrentLabel ===== */
(function(){
 if(typeof DB==='undefined')return;
 // Internal master values remain mg; presentation switches to μg for μg-labelled products.
 Object.values(DB).forEach(d=>{
  const products=Object.values(d.products||{}),text=products.map(p=>p.label||"").join(" ")+" "+Object.values(d.indications||{}).map(i=>i.desc||"").join(" ");
  if(products.length&&/μg/.test(text)&&products.every(p=>Number(p.mgPerUnit)<=0.1)){d.displayUnit="μg";d.displayScale=1000;}
 });
 if(!DB.mgo)return;
 if(DB.mgo.products?.gran83)DB.mgo.products.gran83.mgPerUnit=833;
 DB.mgo.indications={lax:{label:"便秘症・緩下剤（1歳以上15歳未満）",lo:(w,a)=>a<1||a>=15?NaN:20*w,hi:(w,a)=>a<1||a>=15?NaN:80*w,max:(w,a)=>a<1||a>=15?NaN:80*w,freq:[2],desc:"通常、1歳以上の小児には酸化マグネシウムとして1日20～80mg/kgを食後の2回に分割経口投与する。小児は1日40mg/kgを開始用量の目安とし、患者の状態に応じて適宜増減する。（マグミット添付文書参照）",clinicalNote:"この小児用量はマグミット細粒83%・100mg錠等の2025年改訂電子添文に基づく。高マグネシウム血症、腎機能、長期投与、併用薬との服用間隔を確認する。"}};
 Object.assign(DB.mgo,{source:"PMDA マグミット細粒83%／錠 電子添文（2025年8月改訂）",sourceUrl:"https://www.pmda.go.jp/PmdaSearch/iyakuDetail/731040_2344009C1055_4_04",auditStatus:"PMDA最終突合済み",auditDate:"2026-09-08",auditNote:"小児承認追加後の電子添文を再突合。1歳以上20～80mg/kg/day・食後分2、開始目安40mg/kg/day。細粒は1g中833mg。"});
})();

/* ===== Migrated inline enhancement: mobilePreviewEnhancer ===== */
(function(){
  const mq=window.matchMedia("(max-width:650px)");
  function enhance(){
    if(!mq.matches) return;
    const out=document.getElementById("out"); if(!out) return;
    const nums=out.querySelector(".nums");
    if(nums && !nums.previousElementSibling?.classList?.contains("mobileSectionLabel")){
      const lab=document.createElement("div");
      lab.className="mobileSectionLabel";
      lab.textContent="今回の処方";
      lab.style.cssText="font-weight:900;font-size:11px;margin-top:8px;margin-bottom:3px;color:#475467";
      nums.before(lab);
    }
    const table=[...out.querySelectorAll("table")].find(t=>t.textContent.includes("補助換算"));
    if(table && !table.previousElementSibling?.classList?.contains("mobileSectionLabel")){
      const lab=document.createElement("div");
      lab.className="mobileSectionLabel";
      lab.textContent="補助換算｜成人標準量からの推定";
      lab.style.cssText="font-weight:900;font-size:11px;margin-top:12px;margin-bottom:4px;color:#475467";
      table.before(lab);
    }
    if(table && !table.nextElementSibling?.classList?.contains("mobileFormulaNote")){
      const n=document.createElement("div");
      n.className="mobileFormulaNote";
      n.textContent="※ すべて補助的な参考値。承認小児用量を主判定に使用";
      n.style.cssText="font-size:9px;line-height:1.4;color:#7b8794;margin:4px 2px 0";
      table.after(n);
    }
  }
  const oldRender=window.render;
  if(typeof oldRender==="function"){
    window.render=function(){ oldRender(); requestAnimationFrame(enhance); };
  }
  document.addEventListener("DOMContentLoaded",()=>setTimeout(enhance,0));
  document.addEventListener("input",()=>setTimeout(enhance,0),true);
  document.addEventListener("change",()=>setTimeout(enhance,0),true);
})();

/* ===== Migrated inline enhancement: approvedDoseCardEnhancer ===== */
(function(){
 function enhanceApproved(){
  if(!matchMedia("(max-width:650px)").matches)return;
  const out=document.getElementById("out"); if(!out)return;
  const boxes=[...out.children].filter(x=>x.tagName==="DIV"&&x.textContent.includes("承認用法・用量")&&x.textContent.includes("判定の根拠"));
  boxes.forEach(box=>{
   if(box.dataset.mobileDone)return;
   const d=DB[$("drug").value],ii=d.indications[$("ind").value],p=d.products[$("product").value];
   const w=+$("wt").value,a=+$("age").value,f=+$("freq").value,q=+$("amount").value,mg=q*p.mgPerUnit;
   const lo=ii.lo(w,a),hi=ii.hi(w,a),allowed=ii.freqByAge?ii.freqByAge(a):(ii.freq||[]);
   const scale=d.displayScale||1,unit=d.displayUnit||"mg",shown=x=>x*scale;
   const shownTxt=x=>Number.isFinite(x)?String(Number(shown(x).toFixed(scale===1000?2:1))):"—";
   const doseTxt=Number.isFinite(lo)&&Number.isFinite(hi)?(Math.abs(lo-hi)<.01?shownTxt(lo):shownTxt(lo)+"–"+shownTxt(hi))+" "+unit:"—";
   const absoluteDoseKeys=new Set(["dexa","beta"]);
   const absoluteDose=absoluteDoseKeys.has($("drug").value)&&Number.isFinite(lo)&&Number.isFinite(hi);
   const kgTxt=absoluteDose?"—":(Number.isFinite(lo)&&Number.isFinite(hi)&&w?(shownTxt(lo/w)+(Math.abs(lo-hi)<.01?"":"–"+shownTxt(hi/w))):"—");
   const freqTxt=allowed.length?allowed.map(x=>"分"+x).join("–"):"個別確認";
   const doseOK=Number.isFinite(lo)&&Number.isFinite(hi)&&mg>=lo-.01&&mg<=hi+.01;
   const freqOK=allowed.includes(f);
   box.className="approvedBasisCard"; box.dataset.mobileDone="1";
   box.innerHTML='<div class="approvedBasisTitle">承認用法・用量</div>'+
    '<div class="approvedPremise"><div class="approvedPremiseTitle">適応どおりの投与量見込み</div><div class="approvedPremiseMain">'+(absoluteDose?doseTxt+'/day（体重によらない承認1日量）':w+' kg × '+kgTxt+' '+unit+'/kg/day → '+doseTxt+'/day')+'</div></div>'+
    '<table class="approvedCompare"><thead><tr><th></th><th>承認基準</th><th>今回</th></tr></thead><tbody>'+
    '<tr><td>1日量</td><td>'+doseTxt+'/day</td><td class="match">'+shownTxt(mg)+' '+unit+'/day '+(doseOK?'✓':'要確認')+'</td></tr>'+
    '<tr><td>'+unit+'/kg/day</td><td>'+kgTxt+'</td><td class="match">'+(w?shownTxt(mg/w):'—')+(absoluteDose?'（参考換算）':' '+(doseOK?'✓':'要確認'))+'</td></tr>'+
    '<tr><td>分割</td><td>'+freqTxt+'</td><td class="match">分'+f+' '+(freqOK?'✓':'要確認')+'</td></tr>'+
    '</tbody></table>';
  });
 }
 const mo=new MutationObserver(()=>enhanceApproved());
 document.addEventListener("DOMContentLoaded",()=>{const out=document.getElementById("out");if(out)mo.observe(out,{childList:true,subtree:false});setTimeout(enhanceApproved,0)});
 document.addEventListener("input",()=>setTimeout(enhanceApproved,0),true);
 document.addEventListener("change",()=>setTimeout(enhanceApproved,0),true);
})();

/* ===== Migrated inline enhancement: mobileRxAndDrugPickerJS ===== */
(function(){
 function setup(){
  const search=document.getElementById("drugSearch"), sel=document.getElementById("drug");
  if(search && !document.getElementById("drugListBtn")){
   const wrap=document.createElement("div");wrap.id="drugSearchWrap";wrap.style.display="flex";
   search.parentNode.insertBefore(wrap,search);
   const shell=document.createElement("div");shell.id="drugSearchInputShell";wrap.appendChild(shell);shell.appendChild(search);
   const clear=document.createElement("button");clear.id="drugSearchClear";clear.type="button";clear.setAttribute("aria-label","検索文字を消去");clear.textContent="×";shell.appendChild(clear);
   const syncClear=()=>{clear.hidden=!search.value};syncClear();
   search.addEventListener("input",syncClear);
   clear.onclick=()=>{search.value="";search.dispatchEvent(new Event("input",{bubbles:true}));search.focus()};
   const b=document.createElement("button");b.id="drugListBtn";b.type="button";b.textContent="一覧から選択";wrap.appendChild(b);
   const sheet=document.createElement("div");sheet.id="drugListSheet";sheet.innerHTML='<div id="drugListPanel"><div style="display:flex;justify-content:space-between;align-items:center;padding:4px 4px 8px"><b>薬剤を選択</b><button id="drugListClose" type="button" style="border:0;background:transparent;font-size:20px">×</button></div><div id="drugCategoryTabs"></div><div id="drugListItems"></div></div>';document.body.appendChild(sheet);
   const categoryMap={
    cam:"抗菌薬",amox:"抗菌薬",cfpn:"抗菌薬",cdtr:"抗菌薬",cpdx:"抗菌薬",cfdn:"抗菌薬",ccr:"抗菌薬",sult:"抗菌薬",cephalex:"抗菌薬",ery:"抗菌薬",azi:"抗菌薬",faro:"抗菌薬",tebi:"抗菌薬",fos:"抗菌薬",tosu:"抗菌薬",
    ceti:"抗アレルギー薬",mont:"抗アレルギー薬",desl:"抗アレルギー薬",olop:"抗アレルギー薬",pran:"抗アレルギー薬",lora:"抗アレルギー薬",epi:"抗アレルギー薬",fexo:"抗アレルギー薬",meq:"抗アレルギー薬",keto:"抗アレルギー薬",oxa:"抗アレルギー薬",pemi:"抗アレルギー薬",tran:"抗アレルギー薬",clem:"抗アレルギー薬",rupa:"抗アレルギー薬",
    carbo:"呼吸器・鎮咳去痰",ambro:"呼吸器・鎮咳去痰",tipe:"呼吸器・鎮咳去痰",tulo:"呼吸器・鎮咳去痰",theo:"呼吸器・鎮咳去痰",proc:"呼吸器・鎮咳去痰",tulooral:"呼吸器・鎮咳去痰",dime:"呼吸器・鎮咳去痰",
    apap:"解熱鎮痛・抗炎症",txa:"解熱鎮痛・抗炎症",
    domp:"消化器",meto:"消化器",
    acy:"抗ウイルス薬",osel:"抗ウイルス薬",lani:"抗ウイルス薬",zana:"抗ウイルス薬",balo:"抗ウイルス薬",vala:"抗ウイルス薬",
    levet:"神経",mela:"神経",
    kampo75:"漢方",kampo90:"漢方",kampo180:"漢方",
    pred:"ステロイド",beta:"ステロイド",dexa:"ステロイド"
   };
   const categoryOrder=["すべて","抗菌薬","抗アレルギー薬","呼吸器・鎮咳去痰","解熱鎮痛・抗炎症","消化器","抗ウイルス薬","漢方","ステロイド","神経","その他"];
   const collator=new Intl.Collator("ja",{usage:"sort",sensitivity:"base"});
   const externalName=/(点眼|点鼻|点耳|軟膏|クリーム|ゲル|ローション|塗布|吸入|ネブライザ|噴霧|テープ|貼付|坐剤|坐薬|サポ)/;
   let activeCategory="すべて";
   function renderDrugList(){
    const opts=[...sel.options].filter(o=>!DB[o.value]?._pickerExcluded&&!externalName.test(o.textContent)).map(o=>({value:o.value,label:o.textContent,cat:categoryMap[o.value]||"その他"})).sort((a,b)=>collator.compare(a.label,b.label));
    const visible=activeCategory==="すべて"?opts:opts.filter(x=>x.cat===activeCategory);
    const groups=activeCategory==="すべて"?categoryOrder.slice(1).filter(cat=>visible.some(x=>x.cat===cat)):[activeCategory];
    document.getElementById("drugCategoryTabs").innerHTML=categoryOrder.filter(cat=>cat==="すべて"||opts.some(x=>x.cat===cat)).map(cat=>'<button type="button" class="drugCatTab'+(cat===activeCategory?' active':'')+'" data-cat="'+cat+'">'+cat+'</button>').join("");
    document.getElementById("drugListItems").innerHTML=groups.map(cat=>'<div class="drugCatGroup"><div class="drugCatHead">'+cat+'</div>'+visible.filter(x=>x.cat===cat).map(x=>'<button type="button" data-v="'+x.value+'">'+x.label+'</button>').join("")+'</div>').join("");
   }
   b.onclick=()=>{activeCategory="すべて";renderDrugList();sheet.classList.add("open")};
   sheet.onclick=e=>{if(e.target===sheet||e.target.id==="drugListClose")sheet.classList.remove("open");const cat=e.target.closest("[data-cat]");if(cat){activeCategory=cat.dataset.cat;renderDrugList();return;}const x=e.target.closest("[data-v]");if(x){sel.value=x.dataset.v;sel.dispatchEvent(new Event("change",{bubbles:true}));search.value=sel.options[sel.selectedIndex].textContent;syncClear();sheet.classList.remove("open")}};
  }
 }
 function enhance(){
  if(!matchMedia("(max-width:650px)").matches)return;
  const out=document.getElementById("out");if(!out)return;
  const w=+document.getElementById("wt").value;
  const d0=DB[$("drug").value],ii0=d0&&d0.indications[$("ind").value];
  if(ii0&&ii0.desc){
   [...out.childNodes].forEach(n=>{
    if(n.nodeType===3 && n.textContent.trim()===String(ii0.desc).trim()) n.textContent="";
    if(n.nodeType===1 && !n.classList.contains("rxLabelCard") && !n.classList.contains("approvedBasisCard") && n.textContent.trim()===String(ii0.desc).trim()) n.style.display="none";
   });
  }
  const nums=out.querySelector(".nums");
  if(nums&&!out.querySelector(".mobileWeightLine")){const x=document.createElement("div");x.className="mobileWeightLine";x.innerHTML='<span>体重</span><b>'+w+' kg</b>';nums.before(x)}
  const d=DB[$("drug").value],ii=d&&d.indications[$("ind").value]; if(!d||!ii)return;
  if(!out.querySelector(".rxLabelCard")){
   const card=document.createElement("div");card.className="rxLabelCard";
   card.innerHTML='<div class="rxLabelHead">添付文書の用法・用量</div><div class="rxLabelText">'+ii.desc+'</div><div class="rxLabelSource">出典：'+d.source+'</div>';
   const basis=out.querySelector(".approvedBasisCard"); if(basis)basis.after(card); else out.appendChild(card);
  }
 }
 document.addEventListener("DOMContentLoaded",()=>{setup();setTimeout(enhance,0);const out=document.getElementById("out");if(out)new MutationObserver(()=>enhance()).observe(out,{childList:true})});
 document.addEventListener("input",()=>setTimeout(enhance,0),true);document.addEventListener("change",()=>setTimeout(enhance,0),true);
})();

/* ===== Migrated inline enhancement: steroidPracticeCards ===== */
(function(){
 function draw(){
  if(!matchMedia("(max-width:650px)").matches||!window.STEROID_PRACTICE)return;
  const out=document.getElementById("out"),key=document.getElementById("drug")?.value;if(!out)return;
  const existing=[...out.querySelectorAll(".practiceDoseCard")];
  const items=window.STEROID_PRACTICE[key];if(!items){existing.forEach(x=>x.remove());return;}
  if(existing.length===items.length&&existing.every(x=>x.dataset.practiceKey===key))return;
  existing.forEach(x=>x.remove());
  const anchor=out.querySelector(".dose-label-card")||out.querySelector(".approvedBasisCard");
  items.slice().reverse().forEach(x=>{const d=document.createElement("div");d.className="practiceDoseCard";d.dataset.practiceKey=key;d.innerHTML='<div class="practiceDoseTitle">'+x.title+'</div>'+(x.disease?'<div class="practiceDoseDisease">'+x.disease+'</div>':'')+'<div class="practiceDoseMain">'+x.dose+'</div>'+(x.note?'<div class="practiceDoseNote">'+x.note+'</div>':'')+'<div class="practiceDoseSource">出典：'+x.source+'</div>';if(anchor)anchor.after(d);else out.appendChild(d);});
 }
 document.addEventListener("DOMContentLoaded",()=>{const out=document.getElementById("out");if(out)new MutationObserver(()=>setTimeout(draw,0)).observe(out,{childList:true});setTimeout(draw,50)});
 document.addEventListener("change",()=>setTimeout(draw,0),true);
})();

/* ===== Migrated inline enhancement: formulaHelpSubstitution ===== */
(function(){
 const f=x=>Number.isFinite(x)?String(Number(x.toFixed(1))):"—";
 const rng=(lo,hi)=>Math.abs(lo-hi)<.01?f(lo):f(Math.min(lo,hi))+"～"+f(Math.max(lo,hi));
 const vonInfo=a=>{
  const exact=[[.5,.2,"1/5","6か月"],[1,.25,"1/4","1歳"],[3,1/3,"1/3","3歳"],[7.5,.5,"1/2","7.5歳"],[12,2/3,"2/3","12歳"]].find(x=>Math.abs(a-x[0])<.001);
  return exact?{factor:exact[1],label:exact[2],ageLabel:exact[3]}:null;
 };
 const vonTable=a=>{
  const cols=[["新生児","1/20～1/10",false],["6か月","1/5",Math.abs(a-.5)<.001],["1歳","1/4",Math.abs(a-1)<.001],["3歳","1/3",Math.abs(a-3)<.001],["7.5歳","1/2",Math.abs(a-7.5)<.001],["12歳","2/3",Math.abs(a-12)<.001],["成人","1",false]];
  return '<div class="formulaReference"><div class="formulaReferenceTitle">参考：von Harnack表</div><table aria-label="von Harnack年齢別割合"><tbody><tr>'+cols.map(c=>'<th class="'+(c[2]?'currentCell':'')+'">'+c[0]+'</th>').join('')+'</tr><tr>'+cols.map(c=>'<td class="'+(c[2]?'currentCell':'')+'">'+c[1]+'</td>').join('')+'</tr></tbody></table><div class="formulaReferenceNote">上段：基準年齢／下段：成人量に対する割合。年齢帯ではなく基準点の表です。中間年齢を独自の範囲へ丸めません。</div></div>';
 };
 function substitution(kind){
  const d=DB[$("drug").value];if(!d||!Array.isArray(d.adult))return null;
  const a=+$("age").value,w=+$("wt").value,h=+$("ht").value,[lo,hi]=d.adult;
  const scale=d.displayScale||1,unit=d.displayUnit||"mg",shown=x=>x*scale,shownRange=(x,y)=>rng(shown(x),shown(y));
  let title="",formula="",equation="",reference="",rlo=NaN,rhi=NaN;
  if(kind==="aug"){const c=(4*a+20)/100;title="Augsberger-II";formula="小児量 ＝ 成人量 ×（4 × 年齢 ＋ 20）÷ 100";equation="成人量 "+shownRange(lo,hi)+" "+unit+"/day ×（4 × "+a+"歳 ＋ 20）÷ 100";rlo=lo*c;rhi=hi*c;}
  if(kind==="young"){const c=a/(a+12);title="Young式";formula="小児量 ＝ 成人量 × 年齢 ÷（年齢 ＋ 12）";equation="成人量 "+shownRange(lo,hi)+" "+unit+"/day × "+a+"歳 ÷（"+a+"歳 ＋ 12）";rlo=lo*c;rhi=hi*c;}
  if(kind==="clark"){const c=w/68;title="Clark式";formula="小児量 ＝ 成人量 × 体重 ÷ 68";equation="成人量 "+shownRange(lo,hi)+" "+unit+"/day × "+w+" kg ÷ 68 kg";rlo=lo*c;rhi=hi*c;}
  if(kind==="von"){const info=vonInfo(a);title="von Harnack表";formula="小児量 ＝ 成人量 × 表の基準年齢に対応する割合";reference=vonTable(a);if(info){equation=info.ageLabel+"は成人量の "+info.label+"：成人量 "+shownRange(lo,hi)+" "+unit+"/day × "+info.label;rlo=lo*info.factor;rhi=hi*info.factor;}else{equation=a+"歳は表の基準年齢に該当しません。表の中間を独自に年齢帯へ置き換えず、他の根拠で確認します。";}}
  if(kind==="bsa"){title="BSA / Mosteller";formula="BSA ＝ √（身長 × 体重 ÷ 3600）／ 小児量 ＝ 成人量 × BSA ÷ 1.73";if(!(h>0&&w>0))return{title,formula,equation:"身長を入力すると、実際の数値を代入した式を表示します。",result:"—"};const bsa=Math.sqrt(h*w/3600),c=bsa/1.73;equation="BSA ＝ √（"+h+" cm × "+w+" kg ÷ 3600）＝ "+bsa.toFixed(3)+" m²<br>成人量 "+shownRange(lo,hi)+" "+unit+"/day × "+bsa.toFixed(3)+" ÷ 1.73";rlo=lo*c;rhi=hi*c;}
  return{title,formula,equation,result:rng(shown(rlo),shown(rhi))+" "+unit+"/day",reference};
 }
 document.addEventListener("click",e=>{const b=e.target.closest(".formulaBtn");if(!b)return;const x=substitution(b.dataset.formula),box=$("formulaHelp");if(!x||!box)return;box.innerHTML='<div class="formulaHelpTitle">'+x.title+'</div><b>計算式</b><div class="formulaEquation">'+x.formula+'<br><br>'+x.equation+'<br>＝ <span class="formulaResult">'+x.result+'</span></div>'+x.reference+'<div style="margin-top:10px"><span class="pill warn">承認小児用量の代わりではなく補助評価</span></div>';box.style.display="block";});
})();

/* ===== Migrated source: palatability-core-2026-09.js ===== */
(function(){
  const INGREDIENT_BY_KEY={
    cam:"クラリスロマイシン",
    amox:"アモキシシリン水和物",
    cfpn:"セフカペン ピボキシル塩酸塩水和物",
    cdtr:"セフジトレン ピボキシル",
    cpdx:"セフポドキシム プロキセチル",
    cfdn:"セフジニル",
    ccr:"セファクロル",
    txa:"トラネキサム酸",
    imgF11:"トラネキサム酸",
    ob01_txaS:"トラネキサム酸",
    ob02_txaS:"トラネキサム酸",
    ob02_txaPow:"トラネキサム酸",
    ob02_meiact:"セフジトレン ピボキシル",
    ob02_fro:"セフカペン ピボキシル塩酸塩水和物",
    ob02_banan:"セフポドキシム プロキセチル",
    ob02_cefzon:"セフジニル",
    ob02_cefaclor:"セファクロル",
    carbo:"L-カルボシステイン",
    ob01_carboS:"L-カルボシステイン",
    ob01_carboDS:"L-カルボシステイン",
    ob02_mucodyneS:"L-カルボシステイン",
    ob02_mucodyneDS:"L-カルボシステイン",
    ambro:"アンブロキソール塩酸塩",
    ob01_ambroDS:"アンブロキソール塩酸塩",
    ob02_mucosolvan:"アンブロキソール塩酸塩",
    dime:"ジメモルファンリン酸塩",
    ob01_dimePow:"ジメモルファンリン酸塩",
    ob02_astomin:"ジメモルファンリン酸塩",
    olop:"オロパタジン塩酸塩",
    ob01_olop:"オロパタジン塩酸塩",
    ob02_olop25:"オロパタジン塩酸塩",
    apap:"アセトアミノフェン",
    tipe:"チペピジンヒベンズ酸塩",
    imgF10:"チペピジンヒベンズ酸塩",
    aud_asverinDS:"チペピジンヒベンズ酸塩",
    ob01_tipeDS:"チペピジンヒベンズ酸塩",
    ob01_tipeS:"チペピジンヒベンズ酸塩",
    ob02_asverinPow:"チペピジンヒベンズ酸塩",
    ob02_asverinS:"チペピジンヒベンズ酸塩",
    cypro:"シプロヘプタジン塩酸塩水和物",
    img02_01:"シプロヘプタジン塩酸塩水和物",
    proc:"プロカテロール塩酸塩水和物",
    imgF09:"プロカテロール塩酸塩水和物",
    ob02_meptinDS:"プロカテロール塩酸塩水和物",
    ob02_meptinS:"プロカテロール塩酸塩水和物",
    levo:"レボセチリジン塩酸塩",
    ob01_levoS:"レボセチリジン塩酸塩",
    ob01_levoDS:"レボセチリジン塩酸塩",
    ob02_levo:"レボセチリジン塩酸塩",
    domp:"ドンペリドン",
    ob02_nauzDS:"ドンペリドン",
    pred:"プレドニゾロン",
    pran:"プランルカスト水和物",
    ob01_pran:"プランルカスト水和物",
    clav:"アモキシシリン水和物・クラブラン酸カリウム",
    lactoR:"耐性乳酸菌"
  };
  let records=[];

  function esc(value){
    return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[ch]);
  }
  function statusLabel(item){
    if(item.status==="direct_statement")return "公式資料に直接記載";
    if(item.status==="additives_only")return "直接記載なし";
    return "公式資料を確認中";
  }
  function itemHtml(item){
    const sensory=[];
    if(item.taste)sensory.push('<span class="palatability-chip"><b>味</b> '+esc(item.taste)+'</span>');
    if(item.aroma)sensory.push('<span class="palatability-chip"><b>香り</b> '+esc(item.aroma)+'</span>');
    if(!sensory.length&&item.status==="additives_only")sensory.push('<span class="palatability-chip muted">味・香りの直接記載なし</span>');
    if(item.status==="pending")sensory.push('<span class="palatability-chip muted">本文抽出待ち</span>');
    return '<details class="palatability-item">'+
      '<summary><span class="palatability-product"><b>'+esc(item.product)+'</b><span>'+esc(item.manufacturer)+'</span></span>'+
      '<span class="palatability-status '+esc(item.status)+'">'+statusLabel(item)+'</span></summary>'+
      '<div class="palatability-body"><div class="palatability-chips">'+sensory.join("")+'</div>'+
      (item.appearance?'<div class="palatability-sub"><b>外観：</b>'+esc(item.appearance)+'</div>':'')+
      (item.detail?'<div class="palatability-sub">'+esc(item.detail)+'</div>':'')+
      '<a class="palatability-source" href="'+esc(item.sourceUrl)+'" target="_blank" rel="noopener">'+esc(item.sourceType)+'を開く ↗</a>'+
      '</div></details>';
  }
  function draw(){
    const out=document.getElementById("out"),drug=document.getElementById("drug");
    if(!out||!drug)return;
    out.querySelectorAll(".palatability-panel").forEach(node=>node.remove());
    const ingredient=INGREDIENT_BY_KEY[drug.value];
    if(!ingredient||!records.length)return;
    const items=records.filter(item=>item.ingredient===ingredient);
    if(!items.length)return;
    const directCount=items.filter(item=>item.status==="direct_statement").length;
    const panel=document.createElement("section");
    panel.className="dose-panel palatability-panel";
    panel.innerHTML='<div class="palatability-heading"><div><div class="dose-panel-title">味・香り（製品・メーカー別）</div><div class="palatability-lead">製品名またはメーカー名をタップすると詳細を確認できます。</div></div><div class="palatability-count"><b>'+items.length+'</b>製品<span>直接記載 '+directCount+'</span></div></div><div class="palatability-policy">同じ成分でも製品ごとに確認。公式資料にない表現は添加物から推定していません。</div>'+items.map(itemHtml).join("");
    const stack=out.querySelector(".dose-stack");
    const support=out.querySelector(".dose-support");
    if(stack&&support)support.after(panel);else if(stack)stack.appendChild(panel);else out.appendChild(panel);
  }
  function schedule(){setTimeout(draw,0);}

  const style=document.createElement("style");
  style.textContent='.palatability-panel{border-color:#d8c9a8;background:#fffdf8}.palatability-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.palatability-lead{font-size:10px;line-height:1.45;color:#667085;margin-top:2px}.palatability-count{flex:none;min-width:62px;padding:5px 7px;border-radius:9px;background:#f8edd3;color:#6d5318;text-align:center;font-size:9px}.palatability-count b{font-size:15px;margin-right:2px}.palatability-count span{display:block;margin-top:1px;font-size:8px;color:#806a39}.palatability-policy{margin-top:8px;padding:7px 8px;border-radius:8px;background:#f7f8fa;color:#667085;font-size:9px;line-height:1.5}.palatability-item{margin-top:8px;border:1px solid #eadfc8;border-radius:11px;background:#fff;overflow:hidden}.palatability-item summary{position:relative;display:block;min-height:38px;padding:10px 32px 10px 10px;cursor:pointer;list-style:none}.palatability-item summary::-webkit-details-marker{display:none}.palatability-item summary:after{content:"＋";position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:16px;font-weight:900;color:#8a6b25}.palatability-item[open] summary:after{content:"−"}.palatability-body{padding:0 10px 10px;border-top:1px solid #f2ead8}.palatability-product{display:flex;flex-direction:column;gap:2px;padding-right:94px;font-size:11px}.palatability-product b{font-size:12px;color:#1f2933}.palatability-product span{color:#667085}.palatability-status{position:absolute;top:9px;right:32px;padding:3px 6px;border-radius:999px;background:#eef5ed;color:#35633b;font-size:8px;font-weight:900}.palatability-status.additives_only,.palatability-status.pending{background:#f2f4f7;color:#667085}.palatability-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.palatability-chip{padding:5px 7px;border-radius:8px;background:#fff5d9;color:#5f470c;font-size:9px;line-height:1.45}.palatability-chip.muted{background:#f2f4f7;color:#475467}.palatability-sub{font-size:9px;line-height:1.55;color:#475467;margin-top:6px}.palatability-source{display:inline-block;margin-top:7px;font-size:9px;font-weight:800}@media(max-width:650px){.palatability-panel{padding:10px}.palatability-heading{gap:6px}.palatability-lead{font-size:9px}.palatability-item summary{padding:9px 29px 9px 9px}.palatability-body{padding:0 9px 9px}.palatability-product{padding-right:76px}.palatability-status{right:29px;max-width:70px;text-align:center;line-height:1.25}}';
  document.head.appendChild(style);

  fetch("palatability-source-audit-2026-09.json")
    .then(response=>response.ok?response.json():Promise.reject(new Error("palatability data unavailable")))
    .then(data=>{records=Array.isArray(data.products)?data.products:[];draw();})
    .catch(()=>{});
  document.addEventListener("DOMContentLoaded",schedule);
  document.addEventListener("input",schedule,true);
  document.addEventListener("change",schedule,true);
})();

/* ===== Migrated source: kampo-formulation-normalizer-2026-09.js ===== */
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
     sourceUrl:'https://medical.tsumura.co.jp/support/knowledge/20221104_2.html'
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
   canonical.sourceUrl='https://medical.tsumura.co.jp/support/knowledge/20221104_2.html';
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
     if(heading){heading.textContent='漢方の小児参考量①';heading.style.fontSize='1.45em';heading.style.fontWeight='900';heading.style.lineHeight='1.15';}

     const main1=referencePanel.querySelector('.dose-label-main')||referencePanel;
     main1.innerHTML='ツムラ医療用漢方の成人標準1日量 <b>'+fmt(adultG,1)+' g/dayタイプ</b><br>'+
       '<div style="margin-top:10px;text-align:center"><span style="font-size:.9em;font-weight:800;color:#556575">小児でよく用いられる参考量</span><br>'+
       '<span style="display:inline-block;margin-top:4px;font-size:1.45em;font-weight:900;line-height:1.08;color:#173f62">'+fmt(rate,2)+' g/kg/day</span></div>'+
       '<div style="text-align:center;margin:9px 0 4px;font-size:1.55em;font-weight:900;color:#556575;line-height:1">↓</div>'+
       '<div style="text-align:center;font-size:.9em;font-weight:800;color:#556575">今回の体重 '+(Number.isFinite(wt)?fmt(wt,1)+' kg':'—')+' での1日量</div>'+
       '<div style="text-align:center;margin-top:3px;font-size:1.45em;font-weight:900;line-height:1.12;color:#173f62">'+(Number.isFinite(daily1)?fmt(daily1,2)+' g/day':'—')+'</div>';

     referencePanel.parentElement?.querySelectorAll('.kampo-reference-yellow-2').forEach(n=>n.remove());
     const yellow2=document.createElement('section');
     yellow2.className=(referencePanel.className||'dose-panel dose-label-card')+' kampo-reference-yellow-2';
     yellow2.style.marginTop='10px';
     yellow2.innerHTML='<div class="dose-panel-title" style="font-size:1.45em;font-weight:900;line-height:1.15">漢方の小児参考量②</div>'+
       '<div class="dose-label-main"><b>Augsberger換算</b><br>'+
       (Number.isFinite(augsG)
         ? '成人標準1日量 <b>'+fmt(adultG,1)+' g/day</b> ×（年齢×4＋20）/100'+
           '<div style="margin-top:10px;text-align:center"><span style="font-size:.9em;font-weight:800;color:#556575">年齢ベースの参考量</span><br>'+
           '<span style="display:inline-block;margin-top:4px;font-size:1.45em;font-weight:900;line-height:1.08;color:#173f62">'+fmt(rate2,2)+' g/kg/day</span></div>'+
           '<div style="text-align:center;margin:9px 0 4px;font-size:1.55em;font-weight:900;color:#556575;line-height:1">↓</div>'+
           '<div style="text-align:center;font-size:.9em;font-weight:800;color:#556575">今回の体重 '+(Number.isFinite(wt)?fmt(wt,1)+' kg':'—')+' での1日量</div>'+
           '<div style="text-align:center;margin-top:3px;font-size:1.45em;font-weight:900;line-height:1.12;color:#173f62">'+fmt(augsG,2)+' g/day</div>'
         : 'Augsberger式は2歳以上で算出する参考量です。')+
       '</div>'+
       '<div class="dose-label-source">出典：<a href="https://www.mhlw.go.jp/content/10800000/001001698.pdf" target="_blank" rel="noopener">厚生労働省資料 ↗</a>　<a href="https://www.shindan.co.jp/np/isbn/9784787825926/" target="_blank" rel="noopener">新 小児薬用量 改訂第10版 ↗</a></div>';
     referencePanel.insertAdjacentElement('afterend',yellow2);
   }
   const title=[...card.querySelectorAll('.dose-panel-title')].find(n=>/小児参考量と処方量/.test(n.textContent||''));
   if(title)title.textContent='漢方の小児参考量①・②と処方量';
   const hero=card.querySelector('.hero');
   if(hero)hero.innerHTML='参考比較：<span class="pill">2つの指標を併記</span>';


   // The yellow reference cards now carry the interpretation needed for Kampo.
   // Hide only the redundant "処方設計の解釈" card for Kampo; leave other drugs untouched.
   [...out.querySelectorAll('.dose-inner-card,.dose-panel,.card,section')].forEach(n=>{
     const h=n.querySelector('h2,h3,h4,.dose-panel-title,.card-title');
     if(h && /処方設計の解釈/.test(h.textContent||'')) n.style.display='none';
   });

   // The two yellow reference cards above now contain both the reference rate and the calculated daily amount.
   // Hide the older gray comparison section to avoid duplicating the same information.
   const grid=card.querySelector('.dose-comparison-grid');
   if(grid){
     // Hide only the redundant gray comparison grid. Never hide its parent card,
     // because the yellow reference cards live in that same parent.
     grid.style.display='none';
   }
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

/* ===== Migrated source: category-picker-final-2026-09.js ===== */
// Final category allocation for the pediatric drug picker, 2026-09-09.
// Runs after all DB/product normalization. It classifies every currently visible drug option
// using key, label, aliases, product labels and source text, then owns the category-sheet drawing.
(function(){
 if(typeof DB==='undefined')return;
 const sel=document.getElementById('drug');
 if(!sel)return;
 const order=['すべて','抗菌薬','抗真菌薬','抗アレルギー薬','呼吸器・鎮咳去痰','解熱鎮痛・抗炎症','消化器','抗ウイルス薬','漢方','ステロイド','神経','その他'];
 const explicit={
  cam:'抗菌薬',amox:'抗菌薬',cfpn:'抗菌薬',cdtr:'抗菌薬',cpdx:'抗菌薬',cfdn:'抗菌薬',ccr:'抗菌薬',sult:'抗菌薬',cephalex:'抗菌薬',ery:'抗菌薬',azi:'抗菌薬',faro:'抗菌薬',tebi:'抗菌薬',fos:'抗菌薬',tosu:'抗菌薬',cfix:'抗菌薬',clav:'抗菌薬',
  ceti:'抗アレルギー薬',mont:'抗アレルギー薬',desl:'抗アレルギー薬',olop:'抗アレルギー薬',pran:'抗アレルギー薬',lora:'抗アレルギー薬',epi:'抗アレルギー薬',fexo:'抗アレルギー薬',meq:'抗アレルギー薬',keto:'抗アレルギー薬',oxa:'抗アレルギー薬',pemi:'抗アレルギー薬',tran:'抗アレルギー薬',clem:'抗アレルギー薬',rupa:'抗アレルギー薬',cypro:'抗アレルギー薬',
  carbo:'呼吸器・鎮咳去痰',ambro:'呼吸器・鎮咳去痰',tipe:'呼吸器・鎮咳去痰',tulo:'呼吸器・鎮咳去痰',theo:'呼吸器・鎮咳去痰',theoS:'呼吸器・鎮咳去痰',proc:'呼吸器・鎮咳去痰',tulooral:'呼吸器・鎮咳去痰',dime:'呼吸器・鎮咳去痰',salb:'呼吸器・鎮咳去痰',fusk:'呼吸器・鎮咳去痰',dextMix:'呼吸器・鎮咳去痰',
  apap:'解熱鎮痛・抗炎症',txa:'解熱鎮痛・抗炎症',
  domp:'消化器',meto:'消化器',movLD:'消化器',movHD:'消化器',lactoR:'消化器',
  acy:'抗ウイルス薬',osel:'抗ウイルス薬',lani:'抗ウイルス薬',zana:'抗ウイルス薬',balo:'抗ウイルス薬',vala:'抗ウイルス薬',
  levet:'神経',mela:'神経',lacos:'神経',gaba:'神経',valpro:'神経',
  kampo75:'漢方',kampo90:'漢方',kampo180:'漢方',pred:'ステロイド',beta:'ステロイド',dexa:'ステロイド'
 };
 function blob(k,o){
  const d=DB[k]||{};
  return [k,o?.textContent||'',d.category||'',d.source||'',...(d.searchAliases||[]),...Object.values(d.products||{}).map(p=>p?.label||'')].join(' ');
 }
 function classify(k,o){
  if(explicit[k])return explicit[k];
  const s=blob(k,o);
  if(/プレドニ|プレドニン|リンデロン|ベタメタ|デキサメタ|デカドロン|フルチカゾン|フルメトロン|フルオロメトロン|ベクロメタゾン|モメタゾン|ステロイド|副腎皮質/.test(s))return 'ステロイド';
  if(/葛根湯|麻黄湯|小青竜湯|五苓散|麦門冬湯|柴胡|漢方|ツムラ|クラシエ/.test(s))return '漢方';
  if(/アシクロ|ゾビラックス|バラシクロ|バルトレックス|オセルタ|タミフル|ラニナ|イナビル|ザナミ|リレンザ|バロキサ|ゾフルーザ|ゾコーバ|エンシトレルビル|抗ウイルス/.test(s))return '抗ウイルス薬';
  if(/ファンギゾン|アムホテリシン|ミコナゾール|フルコナゾール|イトラコナゾール|ボリコナゾール|抗真菌/.test(s))return '抗真菌薬';
  if(/アモキシ|サワシリン|パセトシン|ワイドシリン|クラバモックス|オーグメンチン|クラリス|クラリシッド|セフ|ケフラール|ケフレックス|L-?ケフレックス|フロモックス|メイアクト|バナン|セフゾン|セフスパン|トミロン|ファロム|オラペネム|ユナシン|ジスロマック|エリスロ|ホスミシン|ホスホマイ|オゼックス|トスフロ|ペネム|マイシン|抗菌/.test(s))return '抗菌薬';
  if(/アレル|ヒスタミン|ザイザル|レボセチリ|ジルテック|セチリジン|アレグラ|フェキソ|アレロック|オロパタ|パタノール|アレジオン|エピナスチン|クラリチン|ロラタジン|デザレックス|デスロラタ|ルパフィン|ルパタジン|ザジテン|ケトチフェン|オノン|プランルカスト|キプレス|シングレア|モンテルカスト|ゼスラン|メキタジン|ニポラジン|ケタス|イブジラスト|リボスチン|レボカバスチン|クレマスチン|ペリアクチン|シプロヘプタジン|エバスチン|エバステル|クロモグリク|インタール|セレスタミン/.test(s))return '抗アレルギー薬';
  if(/ムコダイン|カルボシステイン|ムコソルバン|アンブロキソール|ビソルボン|ブロムヘキシン|アスベリン|チペピジン|アストミン|ジメモルファン|デキストロメトルファン|メジコン|メプチン|プロカテロール|フェノテロール|ベロテック|テオドール|テオフィリン|ホクナリン|ツロブテロール|ベネトリン|サルブタモール|フスコデ|鎮咳|去痰|気管支|吸入/.test(s))return '呼吸器・鎮咳去痰';
  if(/カロナール|アセトアミノフェン|アンヒバ|アルピニー|ボルタレン|ジクロフェナク|ポンタール|メフェナム|PL配合|PL顆粒|解熱|鎮痛|抗炎症/.test(s))return '解熱鎮痛・抗炎症';
  if(/ナウゼリン|ドンペリドン|プリンペラン|メトクロプラミド|モビコール|マクロゴール|ミヤBM|ビオフェルミン|ラックビー|レベニン|整腸|乳酸菌|酸化マグネシウム|マグミット|便秘|エソメプラゾール|ネキシウム|テプレノン|セルベックス|タンニン酸アルブミン|テレミン|ビサコジル|ガランターゼ|ロートエキス|消化器/.test(s))return '消化器';
  if(/イーケプラ|レベチラ|ビムパット|ラコサミド|ガバペン|バルプロ|デパケン|メラトニン|抗てんかん|神経/.test(s))return '神経';
  return 'その他';
 }
 const getRows=()=>[...sel.options]
  .filter(o=>!o.hidden&&!o.disabled&&!DB[o.value]?._pickerExcluded&&!DB[o.value]?.searchExcluded)
  .map(o=>({value:o.value,label:o.textContent,cat:classify(o.value,o)}));
 function install(){
  const sheet=document.getElementById('drugListSheet'),btn=document.getElementById('drugListBtn');
  const tabs=document.getElementById('drugCategoryTabs'),items=document.getElementById('drugListItems');
  if(!sheet||!btn||!tabs||!items||sheet.dataset.finalCategoryOwner==='1')return;
  sheet.dataset.finalCategoryOwner='1';
  let active='すべて';
  const collator=new Intl.Collator('ja',{usage:'sort',sensitivity:'base'});
  function draw(){
   const rows=getRows().sort((a,b)=>collator.compare(a.label,b.label));
   const cats=order.filter(c=>c==='すべて'||rows.some(x=>x.cat===c));
   tabs.innerHTML=cats.map(c=>'<button type="button" class="drugCatTab'+(c===active?' active':'')+'" data-final-cat="'+c+'">'+c+'</button>').join('');
   const shown=active==='すべて'?rows:rows.filter(x=>x.cat===active);
   const sections=active==='すべて'?order.slice(1).filter(c=>shown.some(x=>x.cat===c)):[active];
   items.innerHTML=sections.map(c=>'<div class="drugCatGroup"><div class="drugCatHead">'+c+'</div>'+shown.filter(x=>x.cat===c).map(x=>'<button type="button" data-v="'+x.value+'">'+x.label+'</button>').join('')+'</div>').join('');
  }
  btn.addEventListener('click',()=>{active='すべて';setTimeout(draw,0)});
  document.addEventListener('click',e=>{
   const c=e.target.closest('[data-final-cat]');if(!c)return;
   e.preventDefault();e.stopPropagation();
   active=c.dataset.finalCat;draw();
  },true);
  draw();
 }
 document.addEventListener('DOMContentLoaded',()=>setTimeout(install,40));
 setTimeout(install,60);
})();
