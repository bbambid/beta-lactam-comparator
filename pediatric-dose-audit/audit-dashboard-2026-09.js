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