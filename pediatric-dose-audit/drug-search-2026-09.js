// Searchable pediatric drug selector: generic/brand aliases + L-Keflex, 2026-09-06
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const sel=$("drug"),wrap=sel.parentElement;
 // Add L-Keflex as a distinct current formulation (cephalexin 200 mg/g).
 if(DB.cephalex && !DB.aud_lkeflex){
   DB.aud_lkeflex=Object.assign({},DB.cephalex,{
    products:{g:{label:"L-ケフレックス小児用顆粒（1包1g）",unit:"包",mgPerUnit:200,defaultAmount:1}},
    source:"PMDA L-ケフレックス小児用顆粒 電子添文",
    sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/6132002E1034_3?user=1",
    auditStatus:"現行製剤確認済み",
    auditNote:"1包（1g）中セファレキシン200mg（力価）。胃溶性粒60mg＋腸溶性粒140mg。"
   });
   const o=document.createElement("option");o.value="aud_lkeflex";o.textContent="L-ケフレックス小児用顆粒";sel.appendChild(o);
 }
 const aliases={
  cam:["クラリス","クラリシッド","clarithromycin","CAM"],
  amox:["サワシリン","パセトシン","ワイドシリン","amoxicillin","AMPC"],
  carbo:["ムコダイン","カルボシステイン"],
  ambro:["ムコソルバン","アンブロキソール"],
  txa:["トランサミン","トラネキサム酸"],
  levo:["ザイザル","レボセチリジン"],
  apap:["カロナール","アンヒバ","アセトアミノフェン"],
  ceti:["ジルテック","セチリジン"],
  mont:["キプレス","シングレア","モンテルカスト"],
  desl:["デザレックス","デスロラタジン"],
  olop:["アレロック","オロパタジン"],
  pran:["オノン","プランルカスト"],
  lora:["クラリチン","ロラタジン"],
  epi:["アレジオン","エピナスチン"],
  fexo:["アレグラ","フェキソフェナジン"],
  meq:["ゼスラン","ニポラジン","メキタジン"],
  tulo:["ホクナリン","ツロブテロール"],
  cfpn:["フロモックス","セフカペン"],
  cdtr:["メイアクト","セフジトレン"],
  cpdx:["バナン","セフポドキシム"],
  cfdn:["セフゾン","セフジニル"],
  ccr:["ケフラール","セファクロル"],
  tipe:["アスベリン","チペピジン"],
  sult:["ユナシン","スルタミシリン"],
  cephalex:["ケフレックス","セファレキシン"],
  aud_cephalex100:["ケフレックス","ケフレックスシロップ用細粒100","セファレキシン"],
  aud_cephalex200:["ケフレックス","ケフレックスシロップ用細粒200","セファレキシン"],
  aud_lkeflex:["L-ケフレックス","Lケフレックス","エルケフレックス","小児用顆粒","セファレキシン"],
  ery:["エリスロシン","エリスロマイシン"],
  azi:["ジスロマック","アジスロマイシン"],
  faro:["ファロム","ファロペネム"],
  tebi:["オラペネム","テビペネム"],
  fos:["ホスミシン","ホスホマイシン"],
  tosu:["オゼックス","トスフロキサシン"],
  keto:["ザジテン","ケトチフェン"],
  tran:["リザベン","トラニラスト"],
  domp:["ナウゼリン","ドンペリドン"],
  acy:["ゾビラックス","アシクロビル"],
  osel:["タミフル","オセルタミビル"],
  theo:["テオドール","テオフィリン"],
  proc:["メプチン","プロカテロール"],
  clem:["クレマスチン"],
  dime:["アストミン","ジメモルファン"],
  vala:["バルトレックス","バラシクロビル"],
  levet:["イーケプラ","レベチラセタム"],
  rupa:["ルパフィン","ルパタジン"],
  meto:["プリンペラン","メトクロプラミド"]
 };
 // Include every option label + product labels as searchable aliases.
 const norm=s=>String(s||"").normalize("NFKC").toLowerCase().replace(/[\s　・‐－ー%％()（）「」]/g,"");
 const rows=()=>[...sel.options].map(o=>{
   const d=DB[o.value],a=[o.textContent].concat(aliases[o.value]||[]);
   if(d&&d.products)Object.values(d.products).forEach(p=>a.push(p.label));
   return {value:o.value,label:o.textContent,search:norm(a.join(" "))};
 });
 const inp=document.createElement("input");
 inp.id="drugSearch";inp.type="search";inp.autocomplete="off";inp.placeholder="薬品名を検索（一般名・商品名／3文字程度）";
 inp.style.marginBottom="6px";
 const box=document.createElement("div");
 box.id="drugSuggest";box.style.cssText="display:none;position:absolute;z-index:30;background:#fff;border:1px solid #d6dee8;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.12);max-height:240px;overflow:auto;width:100%;";
 wrap.style.position="relative";wrap.insertBefore(inp,sel);wrap.insertBefore(box,sel);
 const show=()=>{
   const q=norm(inp.value);
   if(q.length<2){box.style.display="none";return;}
   const hit=rows().filter(r=>r.search.includes(q)).slice(0,12);
   if(!hit.length){box.innerHTML='<div style="padding:9px;font-size:10px;color:#667085">候補なし</div>';box.style.display="block";return;}
   box.innerHTML=hit.map(r=>'<button type="button" data-v="'+r.value+'" style="display:block;width:100%;border:0;border-bottom:1px solid #eef1f4;background:#fff;padding:9px;text-align:left;font-size:11px;cursor:pointer">'+r.label+'</button>').join("");
   box.style.display="block";
 };
 inp.addEventListener("input",show);
 box.addEventListener("click",e=>{const b=e.target.closest("[data-v]");if(!b)return;sel.value=b.dataset.v;inp.value=b.textContent.trim();box.style.display="none";sel.dispatchEvent(new Event("change",{bubbles:true}));});
 sel.addEventListener("change",()=>{inp.value=sel.options[sel.selectedIndex]?.textContent||"";});
 document.addEventListener("click",e=>{if(e.target!==inp&&!box.contains(e.target))box.style.display="none";});
})();