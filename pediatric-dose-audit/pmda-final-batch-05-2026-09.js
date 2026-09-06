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
 if(!document.querySelector('script[src="pmda-final-batch-06-2026-09.js"]')){const s=document.createElement('script');s.src='pmda-final-batch-06-2026-09.js';document.head.appendChild(s);}
})();
