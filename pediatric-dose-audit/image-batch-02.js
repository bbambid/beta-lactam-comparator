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