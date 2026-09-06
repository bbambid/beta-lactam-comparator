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