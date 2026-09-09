(function(){
  const INGREDIENT_BY_KEY={
    cam:"クラリスロマイシン",
    amox:"アモキシシリン水和物",
    cfpn:"セフカペン ピボキシル塩酸塩水和物",
    cdtr:"セフジトレン ピボキシル",
    cpdx:"セフポドキシム プロキセチル",
    cfdn:"セフジニル",
    ccr:"セファクロル",
    txa:"トラネキサム酸",
    imgF11:"トラネキサム酸",
    ob01_txaS:"トラネキサム酸",
    ob02_txaS:"トラネキサム酸",
    ob02_txaPow:"トラネキサム酸",
    ob02_meiact:"セフジトレン ピボキシル",
    ob02_fro:"セフカペン ピボキシル塩酸塩水和物",
    ob02_banan:"セフポドキシム プロキセチル",
    ob02_cefzon:"セフジニル",
    ob02_cefaclor:"セファクロル",
    carbo:"L-カルボシステイン",
    ob01_carboS:"L-カルボシステイン",
    ob01_carboDS:"L-カルボシステイン",
    ob02_mucodyneS:"L-カルボシステイン",
    ob02_mucodyneDS:"L-カルボシステイン",
    ambro:"アンブロキソール塩酸塩",
    ob01_ambroDS:"アンブロキソール塩酸塩",
    ob02_mucosolvan:"アンブロキソール塩酸塩",
    dime:"ジメモルファンリン酸塩",
    ob01_dimePow:"ジメモルファンリン酸塩",
    ob02_astomin:"ジメモルファンリン酸塩",
    olop:"オロパタジン塩酸塩",
    ob01_olop:"オロパタジン塩酸塩",
    ob02_olop25:"オロパタジン塩酸塩"
  };
  let records=[];

  function esc(value){
    return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[ch]);
  }
  function statusLabel(item){
    if(item.status==="direct_statement")return "公式資料に直接記載";
    if(item.status==="additives_only")return "直接記載なし";
    return "公式資料を確認中";
  }
  function itemHtml(item){
    const sensory=[];
    if(item.taste)sensory.push('<span class="palatability-chip"><b>味</b> '+esc(item.taste)+'</span>');
    if(item.aroma)sensory.push('<span class="palatability-chip"><b>香り</b> '+esc(item.aroma)+'</span>');
    if(!sensory.length&&item.status==="additives_only")sensory.push('<span class="palatability-chip muted">味・香りの直接記載なし</span>');
    if(item.status==="pending")sensory.push('<span class="palatability-chip muted">本文抽出待ち</span>');
    return '<details class="palatability-item">'+
      '<summary><span class="palatability-product"><b>'+esc(item.product)+'</b><span>'+esc(item.manufacturer)+'</span></span>'+
      '<span class="palatability-status '+esc(item.status)+'">'+statusLabel(item)+'</span></summary>'+
      '<div class="palatability-body"><div class="palatability-chips">'+sensory.join("")+'</div>'+
      (item.appearance?'<div class="palatability-sub"><b>外観：</b>'+esc(item.appearance)+'</div>':'')+
      (item.detail?'<div class="palatability-sub">'+esc(item.detail)+'</div>':'')+
      '<a class="palatability-source" href="'+esc(item.sourceUrl)+'" target="_blank" rel="noopener">'+esc(item.sourceType)+'を開く ↗</a>'+
      '</div></details>';
  }
  function draw(){
    const out=document.getElementById("out"),drug=document.getElementById("drug");
    if(!out||!drug)return;
    out.querySelectorAll(".palatability-panel").forEach(node=>node.remove());
    const ingredient=INGREDIENT_BY_KEY[drug.value];
    if(!ingredient||!records.length)return;
    const items=records.filter(item=>item.ingredient===ingredient);
    if(!items.length)return;
    const directCount=items.filter(item=>item.status==="direct_statement").length;
    const panel=document.createElement("section");
    panel.className="dose-panel palatability-panel";
    panel.innerHTML='<div class="palatability-heading"><div><div class="dose-panel-title">味・香り（製品・メーカー別）</div><div class="palatability-lead">製品名またはメーカー名をタップすると詳細を確認できます。</div></div><div class="palatability-count"><b>'+items.length+'</b>製品<span>直接記載 '+directCount+'</span></div></div><div class="palatability-policy">同じ成分でも製品ごとに確認。公式資料にない表現は添加物から推定していません。</div>'+items.map(itemHtml).join("");
    const stack=out.querySelector(".dose-stack");
    const support=out.querySelector(".dose-support");
    if(stack&&support)support.after(panel);else if(stack)stack.appendChild(panel);else out.appendChild(panel);
  }
  function schedule(){setTimeout(draw,0);}

  const style=document.createElement("style");
  style.textContent='.palatability-panel{border-color:#d8c9a8;background:#fffdf8}.palatability-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.palatability-lead{font-size:10px;line-height:1.45;color:#667085;margin-top:2px}.palatability-count{flex:none;min-width:62px;padding:5px 7px;border-radius:9px;background:#f8edd3;color:#6d5318;text-align:center;font-size:9px}.palatability-count b{font-size:15px;margin-right:2px}.palatability-count span{display:block;margin-top:1px;font-size:8px;color:#806a39}.palatability-policy{margin-top:8px;padding:7px 8px;border-radius:8px;background:#f7f8fa;color:#667085;font-size:9px;line-height:1.5}.palatability-item{margin-top:8px;border:1px solid #eadfc8;border-radius:11px;background:#fff;overflow:hidden}.palatability-item summary{position:relative;display:block;min-height:38px;padding:10px 32px 10px 10px;cursor:pointer;list-style:none}.palatability-item summary::-webkit-details-marker{display:none}.palatability-item summary:after{content:"＋";position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:16px;font-weight:900;color:#8a6b25}.palatability-item[open] summary:after{content:"−"}.palatability-body{padding:0 10px 10px;border-top:1px solid #f2ead8}.palatability-product{display:flex;flex-direction:column;gap:2px;padding-right:94px;font-size:11px}.palatability-product b{font-size:12px;color:#1f2933}.palatability-product span{color:#667085}.palatability-status{position:absolute;top:9px;right:32px;padding:3px 6px;border-radius:999px;background:#eef5ed;color:#35633b;font-size:8px;font-weight:900}.palatability-status.additives_only,.palatability-status.pending{background:#f2f4f7;color:#667085}.palatability-chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.palatability-chip{padding:5px 7px;border-radius:8px;background:#fff5d9;color:#5f470c;font-size:9px;line-height:1.45}.palatability-chip.muted{background:#f2f4f7;color:#475467}.palatability-sub{font-size:9px;line-height:1.55;color:#475467;margin-top:6px}.palatability-source{display:inline-block;margin-top:7px;font-size:9px;font-weight:800}@media(max-width:650px){.palatability-panel{padding:10px}.palatability-heading{gap:6px}.palatability-lead{font-size:9px}.palatability-item summary{padding:9px 29px 9px 9px}.palatability-body{padding:0 9px 9px}.palatability-product{padding-right:76px}.palatability-status{right:29px;max-width:70px;text-align:center;line-height:1.25}}';
  document.head.appendChild(style);

  fetch("palatability-source-audit-2026-09.json")
    .then(response=>response.ok?response.json():Promise.reject(new Error("palatability data unavailable")))
    .then(data=>{records=Array.isArray(data.products)?data.products:[];draw();})
    .catch(()=>{});
  document.addEventListener("DOMContentLoaded",schedule);
  document.addEventListener("input",schedule,true);
  document.addEventListener("change",schedule,true);
})();
