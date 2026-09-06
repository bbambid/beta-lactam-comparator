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
   syrup:{label:"リンデロンシロップ0.01%（小児）",lo:()=>0.15,hi:()=>4,freq:[1,2,3,4],desc:"小児にはベタメタゾンとして1日0.15～4mgを1～4回に分割経口投与。年齢・症状により適宜増減"},
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
  indications:{general:{label:"副腎皮質ステロイド適応",lo:()=>0.15,hi:()=>4,freq:[1,2,3,4],desc:"小児0.15～4mg/dayを1～4回に分割。年齢・症状により適宜増減"}},
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
 window.STEROID_PRACTICE.dexa=[{title:"疾患別実務用量｜治療薬ハンドブック",disease:"クループ症候群",dose:"1回 0.15～0.3 mg/kg・頓用内服",note:"シロップでは量が多いので、錠剤を粉砕し単シロップと服用させるのも有効。経口投与と筋注投与は同等の効果。",source:"治療薬ハンドブック（ユーザー提示資料）"}];
})();