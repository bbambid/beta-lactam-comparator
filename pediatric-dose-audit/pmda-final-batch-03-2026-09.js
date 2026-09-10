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

  if(!document.querySelector('script[src="pmda-final-batch-04-2026-09.js"]')){const s=document.createElement('script');s.src='pmda-final-batch-04-2026-09.js';document.head.appendChild(s);}
})();
