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
