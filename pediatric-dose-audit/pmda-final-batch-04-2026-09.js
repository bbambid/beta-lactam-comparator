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
 if(!document.querySelector('script[src="pmda-final-batch-05-2026-09.js"]')){const s=document.createElement('script');s.src='pmda-final-batch-05-2026-09.js';document.head.appendChild(s);}
})();
