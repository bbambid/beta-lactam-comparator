(()=> {
const $=id=>document.getElementById(id);
const select=$("syndromeSelect"), main=$("summaryHero");
if(!select||!main)return;
document.body.classList.add("infection-workspace");
const app=document.createElement("div");app.className="infection-app";app.id="infectionApp";
const context=document.createElement("section");context.className="infection-context";
context.innerHTML='<div class="infection-context-title">疾患と患者条件</div><div class="infection-context-grid"><div class="field disease-field"></div><div class="field allergy-field"><label class="field-label" for="allergySelect">もしβラクタムアレルギーがある場合</label></div></div><div id="infectionCondition" class="infection-condition"><div class="infection-condition-head">病態・臨床情報</div><div class="infection-condition-content"></div></div>';
const diseaseField=context.querySelector(".disease-field");const diseaseLabel=document.querySelector('label[for="syndromeSelect"]');if(diseaseLabel)diseaseField.append(diseaseLabel);diseaseField.append(select);
const quick=$("quickTabs"); if(quick)diseaseField.append(quick);
const allergySelect=$("allergySelect"),allergyLabel=document.querySelector('label[for="allergySelect"]');if(allergyLabel)context.querySelector(".allergy-field").append(allergyLabel);if(allergySelect)context.querySelector(".allergy-field").append(allergySelect);
const tabs=document.createElement("nav");tabs.className="infection-tabs";tabs.setAttribute("role","tablist");tabs.setAttribute("aria-label","感染症情報");
const names=[["choices","薬剤候補","選択肢と理由"],["spectrum","標的菌・スペクトル","菌とカバー範囲"],["guideline","ガイドライン","推奨と根拠"]];
names.forEach(([id,name,sub],i)=>{const b=document.createElement("button");b.type="button";b.className="infection-tab";b.id="tab-"+id;b.setAttribute("role","tab");b.setAttribute("aria-controls","panel-"+id);b.setAttribute("aria-selected",i===0?"true":"false");b.innerHTML=name+"<small>"+sub+"</small>";b.onclick=()=>activate(id);tabs.append(b)});
const panels={};names.forEach(([id])=>{const p=document.createElement("section");p.className="infection-panel";p.id="panel-"+id;p.setAttribute("role","tabpanel");p.setAttribute("aria-labelledby","tab-"+id);p.hidden=id!=="choices";panels[id]=p;app.append(p)});
const conditionContent=context.querySelector(".infection-condition-content");
const move=(node,parent)=>{if(node&&parent)parent.append(node)};
move(main,panels.choices);const decision=$("decisionZone");if(decision){const detail=document.createElement("details");detail.className="candidate-evidence";detail.innerHTML="<summary>薬剤ごとの推奨・適応・注意を詳しく確認</summary><div class='details-body'></div>";detail.querySelector(".details-body").append(decision);panels.choices.append(detail)}move($("betaCard"),panels.choices);move($("nonBetaCard"),panels.choices);move($("warningCard"),panels.choices);
move($("pathogenCard"),panels.spectrum);move($("spectrumDetails"),panels.spectrum);
move($("learningOverview"),panels.guideline);
["sinusBranch","capCds","pharynxCds","aomBranch","utiLearningCds"].forEach(id=>move($(id),panels.guideline));
move($("evidenceDetails"),panels.guideline);
const allergyDetails=$("allergyDetails");if(allergyDetails)allergyDetails.remove();
const branchPanels=[...panels.guideline.querySelectorAll(".sinus-branch,.cap-cds,.pharynx-cds,.aom-branch,.uti-cds")];
const mappings={
 sinus:[".branch-controls","#sinusScore","#sinusChildCheck"],
 cap:[".cap-grid"],
 pharynx:[".ph-qgrid",".ph-test"],
 cystitis:[".uti-grid"],
 pyelo:[],cellulitis:[],odonto:[],chronic_sinus:[],aspiration:[],abscess:[]
};
const movedNodes=new Map();
for(const [disease,selectors] of Object.entries(mappings)){
 const origin=disease==="sinus"?$("sinusBranch"):disease==="cap"?$("capCds"):disease==="pharynx"?$("pharynxCds"):disease==="cystitis"?$("utiLearningCds"):null;
 if(!origin)continue;
 for(const sel of selectors){const node=origin.querySelector(sel);if(node){const slot=document.createElement("div");slot.dataset.contextFor=disease;conditionContent.append(slot);slot.append(node);movedNodes.set(node,origin)}}
}
const disclaimer=document.createElement("div");disclaimer.className="infection-disclaimer";disclaimer.textContent="診断や処方を自動決定するものではありません。起炎菌・薬剤選択は患者背景、培養結果、地域の耐性状況で変わります。";context.append(disclaimer);
const shell=document.querySelector("main.shell");const intro=shell.querySelector(".intro-card");intro?.after(context,tabs,app);
const oldFlow=shell.querySelector(".clinical-flow");if(oldFlow)oldFlow.remove();shell.querySelector(".detail-togglebar")?.remove();shell.querySelector(".guideline-rule")?.remove();
const branchEls={sinus:$("sinusBranch"),cap:$("capCds"),pharynx:$("pharynxCds"),aom:$("aomBranch"),cystitis:$("utiLearningCds")};
function diseaseId(){return select.value||""}
function updateContext(){
 const id=diseaseId();
 conditionContent.querySelectorAll("[data-context-for]").forEach(x=>x.hidden=x.dataset.contextFor!==id);
 const has=conditionContent.querySelector('[data-context-for="'+id+'"]');
 const note=context.querySelector(".infection-condition-note");
 if(note)note.remove();
 if(!has){const n=document.createElement("div");n.className="infection-condition-note";n.textContent=(id==="aom"?"鼓膜所見・年齢・重症度を確認します。評価フローは「ガイドライン」タブにあります。":id==="pyelo"?"上部尿路感染の重症度、妊娠、腎機能、培養結果を確認してください。":id==="cellulitis"||id==="abscess"?"排膿の要否、受傷機序、全身症状、糖尿病などの背景を確認してください。":"この疾患では病態入力を設けていません。臨床情報と培養結果を個別に確認してください。");conditionContent.append(n)}
}
function activate(id){names.forEach(([key])=>{const b=$("tab-"+key),p=panels[key];b.setAttribute("aria-selected",key===id?"true":"false");p.hidden=key!==id})}
const genericNames={AMPC:"アモキシシリン","CVA/AMPC":"アモキシシリン／クラブラン酸",CDTR:"セフジトレン ピボキシル",CFPN:"セフカペン ピボキシル",CFTM:"セフテラム ピボキシル",CTRX:"セフトリアキソン",CCL:"セファクロル",CEX:"セファレキシン",CEZ:"セファゾリン",CXM:"セフロキシム",CTX:"セフォタキシム",CFPM:"セフェピム",CAZ:"セフタジジム",CFDN:"セフジニル",CPDX:"セフポドキシム プロキセチル",CFIX:"セフィキシム",PCG:"ベンジルペニシリン",ABPC:"アンピシリン",PIPC:"ピペラシリン",AZT:"アズトレオナム",LVFX:"レボフロキサシン",LSFX:"ラスクフロキサシン",GRNX:"ガレノキサシン",MFLX:"モキシフロキサシン",STFX:"シタフロキサシン",TFLX:"トスフロキサシン",AZM:"アジスロマイシン",CAM:"クラリスロマイシン",MINO:"ミノサイクリン",CPFX:"シプロフロキサシン",FOM:"ホスホマイシン",AMK:"アミカシン",PZFX:"パズフロキサシン",CLDM:"クリンダマイシン",ST:"スルファメトキサゾール／トリメトプリム"};
const nonbetaCodes=["LVFX","LSFX","GRNX","MFLX","STFX","TFLX","AZM","CAM","MINO","CPFX","FOM","AMK","PZFX","CLDM","ST"];
function node(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function makeCard(code,organisms,disease,role,note,indication,extra){
 const card=node("article","guideline-drug-card"+(extra?" extra-guideline-drug":"")),head=node("header","guideline-drug-head"),name=node("div","");
 name.append(node("b","",code),node("span","drug-generic",genericNames[code]?"（"+genericNames[code]+"）":"（一般名未登録）"));
 head.append(name,node("span","drug-status",role||"疾患別資料に記載"));card.append(head);card.append(node("p","guideline-drug-note",note||"疾患別の記載を参照。"));
 const appr=node("div","drug-approval-summary");appr.append(node("b","","国内適応"),node("span","",indication||"適応症：要確認"));card.append(appr);
 const table=node("table","drug-organism-table"),thead=node("thead",""),trh=node("tr","");["菌種","Kyoto 2024","Sanford","適応菌種"].forEach(v=>trh.append(node("th","",v)));thead.append(trh);table.append(thead);
 const tbody=node("tbody",""),kyoto=(window.KYOTO||{})[code]||{},sf=((window.SANFORD_SPECTRUM||{})[disease]||{}).drugs||{};
 const keyMap={"肺炎球菌（S. pneumoniae）":"sp","インフルエンザ菌（H. influenzae）":"hi","モラクセラ（M. catarrhalis）":"mc","A群溶血性レンサ球菌（GAS）":"gas","肺炎マイコプラズマ（M. pneumoniae）":"mp","マイコプラズマ（M. pneumoniae）":"mp","レジオネラ（Legionella spp.）":"leg","大腸菌（E. coli）":"ec","腐生ブドウ球菌（S. saprophyticus）":"ss","ミラビリス変形菌（P. mirabilis）":"pm","黄色ブドウ球菌（S. aureus）":"sa","緑膿菌（P. aeruginosa）":"pa","口腔レンサ球菌群（Streptococcus spp.）":"oralstrep","Prevotella spp.":"prev","Peptostreptococcus spp.":"pepto"};
 organisms.forEach(o=>{const row=node("tr","");row.append(node("th","",o.name));const ky=node("td","");ky.append(node("span","source-value",kyoto[o.name]||"未登録"));const sv=sf[code],key=keyMap[o.name],value=!sv?"未登録":sv.status==="pending"?"未確認":(key&&sv[key]!=null?String(sv[key]):"未登録");const sd=node("td","");sd.append(node("span","source-value"+(value==="未登録"||value==="未確認"?" pending":""),value));let av="要確認";const approval=(window.APPROVAL_DATA||{})[code];if(approval&&approval.verified){const aliases={"肺炎球菌（S. pneumoniae）":"肺炎球菌","インフルエンザ菌（H. influenzae）":"インフルエンザ菌","モラクセラ（M. catarrhalis）":"モラクセラ","大腸菌（E. coli）":"大腸菌","黄色ブドウ球菌（S. aureus）":"ブドウ球菌属","A群溶血性レンサ球菌（GAS）":"レンサ球菌属"};const q=aliases[o.name]||o.name.split("（")[0];av=approval.organisms.some(x=>x.includes(q)||q.includes(x))?"適応菌種あり":"該当記載なし"}const ap=node("td","");ap.append(node("span","source-value",av));row.append(ky,sd,ap);tbody.append(row)});table.append(tbody);card.append(table);return card;
}
let lastSpectrumTable=null;
function labelSpectrumCells(){
 const body=document.getElementById("spectrumBody"),table=body&&body.querySelector(".spectrum-matrix");if(!body||!table||table===lastSpectrumTable)return;lastSpectrumTable=table;
 const disease=document.getElementById("syndromeSelect").value,organisms=[...document.querySelectorAll("#pathogenCard .organism b")].map(x=>({name:x.textContent.trim()})),rows=[...table.querySelectorAll("tbody tr")].filter(r=>!r.classList.contains("drug-group-row"));
 const primary=rows.filter(r=>!r.classList.contains("extra-spectrum-row")),additional=rows.filter(r=>r.classList.contains("extra-spectrum-row"));
 const getDrug=r=>r.querySelector("th")?.childNodes[0]?.textContent?.trim()||"",roleFor=r=>r.lastElementChild?.querySelector(".matrix-status")?.textContent?.trim()||"疾患別資料に記載",noteFor=r=>r.lastElementChild?.querySelector("small")?.textContent?.trim()||"",indicationFor=r=>r.children[r.children.length-2]?.innerText?.replace(/国内承認：/g,"適応症：").trim()||"適応症：要確認";
 const cardsFor=(list,extra)=>{const f=document.createDocumentFragment();list.forEach(r=>{const d=getDrug(r);if(d)f.append(makeCard(d,organisms,disease,roleFor(r),noteFor(r),indicationFor(r),extra))});return f};
 const wrap=node("div","spectrum-card-groups"),primaryList=node("div","guideline-drug-list");primaryList.append(cardsFor(primary,false));wrap.append(primaryList);
 const seen=new Set(rows.map(getDrug)),pills=[...document.querySelectorAll("#nonBetaCard .pill")].map(p=>p.textContent.trim()),found=[...new Set(pills.flatMap(p=>nonbetaCodes.filter(c=>p.toUpperCase().includes(c))))].filter(c=>!seen.has(c));
 if(found.length){wrap.append(node("h3","spectrum-group-title","疾患別カードに記載された非βラクタム候補"));const list=node("div","guideline-drug-list nonbeta-drug-list"),note=document.querySelector("#nonBetaCard .nonbeta-body")?.textContent?.trim()||"疾患別カードに記載された候補です。";found.forEach(code=>list.append(makeCard(code,organisms,disease,"非βラクタム候補",note,"適応菌種：要確認　／　適応症：要確認",false)));wrap.append(list)}
 const classes=pills.filter(p=>!nonbetaCodes.some(c=>p.toUpperCase().includes(c)));if(classes.length){const c=node("div","spectrum-class-note");c.append(node("b","","薬剤群としての記載"),node("span","",classes.join("、")+"。薬剤別のスペクトル情報は未登録です。"));wrap.append(c)}
 const intro=body.querySelector(".matrix-intro");if(intro){if(intro.querySelector("b"))intro.querySelector("b").textContent="ガイドライン記載薬の標的菌・スペクトル";const p=intro.querySelector("p");if(p)p.textContent="薬剤ごとに菌種を縦に並べ、Kyoto 2024・Sanfordの評価と国内適応を別欄で確認します。感受性とガイドライン上の推奨は別の情報です。"}
 const legend=body.querySelector(".matrix-legend small");if(legend)legend.textContent="KyotoとSanfordは別の評価体系です。未登録・未確認は推測で補完していません。国内適応は電子添文上の適応菌種・適応症を別表示します。";
 const scroll=table.closest(".matrix-scroll");if(scroll)scroll.replaceWith(wrap);body.querySelector(".matrix-sticky-head")?.remove();body.querySelector(".more-spectrum-btn")?.remove();body.querySelector(".structure-launch")?.remove();
 if(additional.length){const d=node("details","additional-spectrum-drugs"),s=node("summary","","その他のβラクタムを表示（"+additional.length+"剤）"),list=node("div","guideline-drug-list");list.append(cardsFor(additional,true));d.append(s,list);wrap.append(d)}
}
const spectrumObserver=new MutationObserver(labelSpectrumCells);const spectrumBody=$("spectrumBody");if(spectrumBody)spectrumObserver.observe(spectrumBody,{childList:true,subtree:true});
labelSpectrumCells();
select.addEventListener("change",updateContext);
updateContext();
})();
