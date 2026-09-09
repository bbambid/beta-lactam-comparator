// Final category allocation for the pediatric drug picker, 2026-09-09.
// Runs after all DB/product normalization. It classifies every currently visible drug option
// using key, label, aliases, product labels and source text, then owns the category-sheet drawing.
(function(){
 if(typeof DB==='undefined')return;
 const sel=document.getElementById('drug');
 if(!sel)return;
 const order=['すべて','抗菌薬','抗真菌薬','抗アレルギー薬','呼吸器・鎮咳去痰','解熱鎮痛・抗炎症','消化器','抗ウイルス薬','漢方','ステロイド','神経','その他'];
 const explicit={
  cam:'抗菌薬',amox:'抗菌薬',cfpn:'抗菌薬',cdtr:'抗菌薬',cpdx:'抗菌薬',cfdn:'抗菌薬',ccr:'抗菌薬',sult:'抗菌薬',cephalex:'抗菌薬',ery:'抗菌薬',azi:'抗菌薬',faro:'抗菌薬',tebi:'抗菌薬',fos:'抗菌薬',tosu:'抗菌薬',cfix:'抗菌薬',clav:'抗菌薬',
  ceti:'抗アレルギー薬',mont:'抗アレルギー薬',desl:'抗アレルギー薬',olop:'抗アレルギー薬',pran:'抗アレルギー薬',lora:'抗アレルギー薬',epi:'抗アレルギー薬',fexo:'抗アレルギー薬',meq:'抗アレルギー薬',keto:'抗アレルギー薬',oxa:'抗アレルギー薬',pemi:'抗アレルギー薬',tran:'抗アレルギー薬',clem:'抗アレルギー薬',rupa:'抗アレルギー薬',cypro:'抗アレルギー薬',
  carbo:'呼吸器・鎮咳去痰',ambro:'呼吸器・鎮咳去痰',tipe:'呼吸器・鎮咳去痰',tulo:'呼吸器・鎮咳去痰',theo:'呼吸器・鎮咳去痰',theoS:'呼吸器・鎮咳去痰',proc:'呼吸器・鎮咳去痰',tulooral:'呼吸器・鎮咳去痰',dime:'呼吸器・鎮咳去痰',salb:'呼吸器・鎮咳去痰',fusk:'呼吸器・鎮咳去痰',dextMix:'呼吸器・鎮咳去痰',
  apap:'解熱鎮痛・抗炎症',txa:'解熱鎮痛・抗炎症',
  domp:'消化器',meto:'消化器',movLD:'消化器',movHD:'消化器',lactoR:'消化器',
  acy:'抗ウイルス薬',osel:'抗ウイルス薬',lani:'抗ウイルス薬',zana:'抗ウイルス薬',balo:'抗ウイルス薬',vala:'抗ウイルス薬',
  levet:'神経',mela:'神経',lacos:'神経',gaba:'神経',valpro:'神経',
  kampo75:'漢方',kampo90:'漢方',kampo180:'漢方',pred:'ステロイド',beta:'ステロイド',dexa:'ステロイド'
 };
 function blob(k,o){
  const d=DB[k]||{};
  return [k,o?.textContent||'',d.category||'',d.source||'',...(d.searchAliases||[]),...Object.values(d.products||{}).map(p=>p?.label||'')].join(' ');
 }
 function classify(k,o){
  if(explicit[k])return explicit[k];
  const s=blob(k,o);
  if(/プレドニ|プレドニン|リンデロン|ベタメタ|デキサメタ|デカドロン|フルチカゾン|フルメトロン|フルオロメトロン|ベクロメタゾン|モメタゾン|ステロイド|副腎皮質/.test(s))return 'ステロイド';
  if(/葛根湯|麻黄湯|小青竜湯|五苓散|麦門冬湯|柴胡|漢方|ツムラ|クラシエ/.test(s))return '漢方';
  if(/アシクロ|ゾビラックス|バラシクロ|バルトレックス|オセルタ|タミフル|ラニナ|イナビル|ザナミ|リレンザ|バロキサ|ゾフルーザ|ゾコーバ|エンシトレルビル|抗ウイルス/.test(s))return '抗ウイルス薬';
  if(/ファンギゾン|アムホテリシン|ミコナゾール|フルコナゾール|イトラコナゾール|ボリコナゾール|抗真菌/.test(s))return '抗真菌薬';
  if(/アモキシ|サワシリン|パセトシン|ワイドシリン|クラバモックス|オーグメンチン|クラリス|クラリシッド|セフ|ケフラール|ケフレックス|L-?ケフレックス|フロモックス|メイアクト|バナン|セフゾン|セフスパン|トミロン|ファロム|オラペネム|ユナシン|ジスロマック|エリスロ|ホスミシン|ホスホマイ|オゼックス|トスフロ|ペネム|マイシン|抗菌/.test(s))return '抗菌薬';
  if(/アレル|ヒスタミン|ザイザル|レボセチリ|ジルテック|セチリジン|アレグラ|フェキソ|アレロック|オロパタ|パタノール|アレジオン|エピナスチン|クラリチン|ロラタジン|デザレックス|デスロラタ|ルパフィン|ルパタジン|ザジテン|ケトチフェン|オノン|プランルカスト|キプレス|シングレア|モンテルカスト|ゼスラン|メキタジン|ニポラジン|ケタス|イブジラスト|リボスチン|レボカバスチン|クレマスチン|ペリアクチン|シプロヘプタジン|エバスチン|エバステル|クロモグリク|インタール|セレスタミン/.test(s))return '抗アレルギー薬';
  if(/ムコダイン|カルボシステイン|ムコソルバン|アンブロキソール|ビソルボン|ブロムヘキシン|アスベリン|チペピジン|アストミン|ジメモルファン|デキストロメトルファン|メジコン|メプチン|プロカテロール|フェノテロール|ベロテック|テオドール|テオフィリン|ホクナリン|ツロブテロール|ベネトリン|サルブタモール|フスコデ|鎮咳|去痰|気管支|吸入/.test(s))return '呼吸器・鎮咳去痰';
  if(/カロナール|アセトアミノフェン|アンヒバ|アルピニー|ボルタレン|ジクロフェナク|ポンタール|メフェナム|PL配合|PL顆粒|解熱|鎮痛|抗炎症/.test(s))return '解熱鎮痛・抗炎症';
  if(/ナウゼリン|ドンペリドン|プリンペラン|メトクロプラミド|モビコール|マクロゴール|ミヤBM|ビオフェルミン|ラックビー|レベニン|整腸|乳酸菌|酸化マグネシウム|マグミット|便秘|エソメプラゾール|ネキシウム|テプレノン|セルベックス|タンニン酸アルブミン|テレミン|ビサコジル|ガランターゼ|ロートエキス|消化器/.test(s))return '消化器';
  if(/イーケプラ|レベチラ|ビムパット|ラコサミド|ガバペン|バルプロ|デパケン|メラトニン|抗てんかん|神経/.test(s))return '神経';
  return 'その他';
 }
 const getRows=()=>[...sel.options].map(o=>({value:o.value,label:o.textContent,cat:classify(o.value,o)}));
 function install(){
  const sheet=document.getElementById('drugListSheet'),btn=document.getElementById('drugListBtn');
  const tabs=document.getElementById('drugCategoryTabs'),items=document.getElementById('drugListItems');
  if(!sheet||!btn||!tabs||!items||sheet.dataset.finalCategoryOwner==='1')return;
  sheet.dataset.finalCategoryOwner='1';
  let active='すべて';
  const collator=new Intl.Collator('ja',{usage:'sort',sensitivity:'base'});
  function draw(){
   const rows=getRows().sort((a,b)=>collator.compare(a.label,b.label));
   const cats=order.filter(c=>c==='すべて'||rows.some(x=>x.cat===c));
   tabs.innerHTML=cats.map(c=>'<button type="button" class="drugCatTab'+(c===active?' active':'')+'" data-final-cat="'+c+'">'+c+'</button>').join('');
   const shown=active==='すべて'?rows:rows.filter(x=>x.cat===active);
   const sections=active==='すべて'?order.slice(1).filter(c=>shown.some(x=>x.cat===c)):[active];
   items.innerHTML=sections.map(c=>'<div class="drugCatGroup"><div class="drugCatHead">'+c+'</div>'+shown.filter(x=>x.cat===c).map(x=>'<button type="button" data-v="'+x.value+'">'+x.label+'</button>').join('')+'</div>').join('');
  }
  btn.addEventListener('click',()=>{active='すべて';setTimeout(draw,0)});
  document.addEventListener('click',e=>{
   const c=e.target.closest('[data-final-cat]');if(!c)return;
   e.preventDefault();e.stopPropagation();
   active=c.dataset.finalCat;draw();
  },true);
  draw();
 }
 document.addEventListener('DOMContentLoaded',()=>setTimeout(install,40));
 setTimeout(install,60);
})();
