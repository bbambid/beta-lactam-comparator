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