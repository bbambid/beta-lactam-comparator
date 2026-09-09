// Steroid master: generic-name parent records + product/brand aliases + practical-dose layer.
(function(){
 if(typeof DB==='undefined'||typeof $==='undefined')return;
 const S=$("drug");
 const opt=(k,n)=>{let o=S.querySelector('option[value="'+k+'"]');if(!o){o=document.createElement("option");o.value=k;S.appendChild(o);}o.textContent=n;};

 DB.pred={
  products:{
   pow1:{label:"プレドニゾロン散「タケダ」1%",unit:"g",mgPerUnit:10,defaultAmount:2},
   tab5:{label:"プレドニゾロン錠「タケダ」5mg",unit:"錠",mgPerUnit:5,defaultAmount:1}
  },
  indications:{general:{label:"副腎皮質ステロイド適応",lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],referenceOnly:true,desc:"添付文書は疾患・年齢・症状等に応じて用量を調整する。小児の固定mg/kg承認量としては自動判定せず、疾患別・実務用量を別レイヤーで表示。"}},
  adult:[5,60],
  source:"PMDA プレドニゾロン錠「タケダ」5mg／散「タケダ」1%",
  sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2456001F1353_2?user=1",
  searchAliases:["プレドニゾロン散","プレドニゾロン散1%","プレドニン","プレドニン散"],
  category:"ステロイド",
  auditStatus:"PMDA現行製剤確認済み"
 };
 opt("pred","プレドニゾロン");

 DB.beta={
  products:{
   syrup001:{label:"リンデロンシロップ0.01%",unit:"mL",mgPerUnit:0.1,defaultAmount:5},
   pow01:{label:"リンデロン散0.1%",unit:"g",mgPerUnit:1,defaultAmount:0.5},
   tab05:{label:"リンデロン錠0.5mg",unit:"錠",mgPerUnit:0.5,defaultAmount:1}
  },
  indications:{
   syrup:{label:"リンデロンシロップ0.01%",lo:()=>0.15,hi:()=>4,freq:[1,2,3,4],desc:"通常、成人にはベタメタゾンとして1日0.5～8mgを1～4回に分割経口投与する。小児には1日0.15～4mgを1～4回に分割経口投与する。なお、年齢、症状により適宜増減する。",clinicalNote:"承認範囲が広く、実際の投与量は適応・重症度で大きく異なる。疾患別の治療指針・実務用量も併せて確認する。"},
   solid:{label:"リンデロン錠0.5mg／散0.1%",lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],referenceOnly:true,desc:"錠剤・散剤は通常成人0.5～8mg/dayを1～4回に分割。年齢・症状により適宜増減。小児の固定承認量は設定されていない"}
  },
  adult:null,
  source:"PMDA リンデロン錠0.5mg／散0.1%／シロップ0.01%（2026年3月改訂）",
  sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454004B1040_2?user=1",
  searchAliases:["リンデロン","リンデロンシロップ","リンデロン散","ベタメタゾン"],
  category:"ステロイド",
  auditStatus:"PMDA最終突合済み",
  auditDate:"2026-09-07"
 };
 // Old product-name-only record is removed; generic-name parent is canonical.
 delete DB.aud_lindelonPow;
 const oldL=S.querySelector('option[value="aud_lindelonPow"]');if(oldL)oldL.remove();
 opt("beta","ベタメタゾン");
 // image-final.js が旧デキサメタゾン親レコードから作る製品名レコードを、
 // リンデロンの現行電子添文データで上書きする。
 DB.imgF01=Object.assign({},DB.beta,{
  products:{s:{label:"リンデロンシロップ0.01%",unit:"mL",mgPerUnit:0.1,defaultAmount:5}},
  indications:{syrup:DB.beta.indications.syrup},
  source:"PMDA リンデロンシロップ0.01%電子添文（2026年3月改訂）",
  sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454004B1040_2?user=1",
  searchAliases:["リンデロンシロップ0.01%","リンデロンシロップ","ベタメタゾンシロップ"],
  auditStatus:"PMDA最終突合済み",
  auditDate:"2026-09-08"
 });
 // Keep indication synchronized with the selected formulation.
 document.getElementById("product")?.addEventListener("change",()=>{
   if(document.getElementById("drug")?.value!=="beta")return;
   const ind=document.getElementById("ind"),p=document.getElementById("product")?.value;
   if(ind){ind.value=p==="syrup001"?"syrup":"solid"; if(typeof render==="function")render();}
 });

 DB.dexa=Object.assign({},DB.dexa||{},{
  products:Object.assign({},(DB.dexa&&DB.dexa.products)||{},{
   elixir001:{label:"デキサメタゾンエリキシル0.01%「日新」",unit:"mL",mgPerUnit:0.1,defaultAmount:5}
  }),
  indications:{general:{label:"副腎皮質ステロイド適応",lo:()=>0.15,hi:()=>4,freq:[1,2,3,4],desc:"通常、成人にはデキサメタゾンとして1日0.5～8mgを1～4回に分割経口投与する。小児には1日0.15～4mgを1～4回に分割経口投与する。なお、年齢、症状により適宜増減する。",clinicalNote:"承認範囲が広く、実際の投与量は適応・重症度で大きく異なる。下の疾患別実務用量は承認用量とは分けて確認する。"}},
  adult:[0.5,8],
  source:"PMDA デキサメタゾンエリキシル0.01%「日新」",
  sourceUrl:"https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2454002S1157_1?user=1",
  searchAliases:[...new Set([...(DB.dexa?.searchAliases||[]),"デカドロン","デカドロンエリキシル","デキサメタゾン","デキサメタゾンエリキシル"])],
  category:"ステロイド",
  auditStatus:"PMDA最終突合済み"
 });
 opt("dexa","デキサメタゾン");

 window.STEROID_PRACTICE=window.STEROID_PRACTICE||{};
 window.STEROID_PRACTICE.pred=[{title:"実務用量｜湘南鎌倉総合病院 小児薬用量",dose:"1～2 mg/kg/day・分2",note:"最大 2 mg/kg/day",source:"湘南鎌倉総合病院『小児薬用量』／参考区分C：小児の薬の選び方・使い方"}];
 window.STEROID_PRACTICE.dexa=[{
  title:"疾患別実務用量｜クループ症候群",
  disease:"承認用量とは別に照合する参考用量",
  dose:"デキサメタゾン 1回 0.15～0.3 mg/kg・単回内服",
  note:'<div class="practiceDoseAlert"><b>小児承認上限4mg/dayとの照合：</b>0.15mg/kgでは約26.7kg、0.3mg/kgでは約13.3kgで4mgに達する。これを超える場合は、適応・目標量・処方意図を確認し、必要時は疑義照会する。</div><div class="practiceDoseVolume">エリキシル0.01%は0.1mg/mL。0.15mg/kgは製剤1.5mL/kg、4mgは40mLに相当する。</div><details class="practiceDoseDetails"><summary>服用性・飲めない場合の対応</summary><div class="practiceDoseDetailBody"><b>味・添加剤：</b>製剤はイチゴ様芳香と甘味を持つが、独特の味・苦味で拒否されることがある。エタノール5w/v%を含む（酒類のvol%とは単位が異なるため、「ビールと同じ濃度」とは厳密には表現しない）。<br><b>投薬時：</b>あらかじめ飲みにくさを説明し、単シロップ併用の要否を確認。追加処方が必要なら処方医へ確認する。水などで薄める、冷やす方法も候補。<br><b>混和候補：</b>ココア、ピーチネクター、バニラアイス、チョコアイス、練乳、イチゴジャム、キャラメルソース、バナナ、はちみつ。食品との組合せデータは主に成人官能試験で、小児での検証は限定的。はちみつは1歳未満には使用しない。<br><b>代替案1：</b>目標量1.5mgならデキサメタゾン0.5mg錠3錠を粉砕し、単シロップ5mLを併用する案（錠剤も苦味あり）。用量・剤形変更は処方医確認。<br><b>代替案2：</b>リンデロンシロップ0.01%は甘味があるが、現行電子添文では添加剤にエタノールも記載され、含有量は明記されていない。「アルコールなし」とは案内しない。ベタメタゾンとデキサメタゾンは一般的な糖質コルチコイド換算上ほぼ同等だが、自動的に同量置換せず、適応と用量を処方医へ確認する。</div></details>',
  source:'治療薬ハンドブック（ユーザー提示資料）／極める小児の服薬指導 改訂版 p.210／<a href="https://www.jstage.jst.go.jp/article/jdpt/36/1/36_82/_article/-char/ja" target="_blank" rel="noopener">日本小児臨床薬理学会雑誌 36(1):82–86, 2023 ↗</a>／PMDA電子添文・インタビューフォーム'
 }];
})();
