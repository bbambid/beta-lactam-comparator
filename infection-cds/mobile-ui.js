(()=> {
const $=id=>document.getElementById(id);
const select=$("syndromeSelect"), main=$("summaryHero");
if(!select||!main)return;
document.body.classList.add("infection-workspace");
const app=document.createElement("div");app.className="infection-app";app.id="infectionApp";
const context=document.createElement("section");context.className="infection-context";
context.innerHTML='<div class="infection-context-title">疾患と患者条件</div><div class="infection-context-grid"><div class="field disease-field"></div><div class="field allergy-field"><label class="field-label" for="allergySelect">βラクタムアレルギー</label></div></div><div id="infectionCondition" class="infection-condition"><div class="infection-condition-head">病態・臨床情報</div><div class="infection-condition-content"></div></div>';
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
const allergyDetails=$("allergyDetails");if(allergyDetails){const allergyMessage=$("allergyMessage"),compareActions=$("compareActions");const detail=document.createElement("details");detail.className="allergy-extra";detail.innerHTML="<summary>アレルギー時の注意と構造比較</summary><div class='details-body'></div>";const body=detail.querySelector(".details-body");if(allergyMessage)body.append(allergyMessage);if(compareActions)body.append(compareActions);context.append(detail);allergyDetails.remove()}
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
function labelSpectrumCells(){panels.spectrum.querySelectorAll(".spectrum-matrix").forEach(table=>{const heads=[...table.querySelectorAll("thead th")].map(h=>h.innerText.trim());table.querySelectorAll("tbody tr").forEach(row=>[...row.children].forEach((cell,i)=>{if(heads[i])cell.setAttribute("data-label",heads[i])}))})}
const spectrumObserver=new MutationObserver(labelSpectrumCells);const spectrumBody=$("spectrumBody");if(spectrumBody)spectrumObserver.observe(spectrumBody,{childList:true,subtree:true});
labelSpectrumCells();
select.addEventListener("change",updateContext);
updateContext();
})();
