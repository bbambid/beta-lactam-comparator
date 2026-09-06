// NKdesk batch 02 — 20 additional practical formulation/ingredient entries.
// NKdesk used for candidate names only; authoritative dose verification is kept separate.
(function(){if(typeof DB==='undefined'||typeof $==='undefined')return;
const A=(k,n,o)=>{DB[k]=o;const s=$("drug");if(!s.querySelector('option[value="'+k+'"]')){const x=document.createElement("option");x.value=k;x.textContent=n;s.appendChild(x);}};
const hold=(label,prod,src)=>({products:prod,indications:{general:{label,lo:()=>NaN,hi:()=>NaN,freq:[1,2,3,4],desc:"現行電子添文・適応別用量を確認してから数値監査。成人換算値を小児標準量として使用しない。"}},adult:null,source:src});
A("cefalex","セファレキシン（ケフレックス）",hold("感染症", {g100:{label:"シロップ用細粒100",unit:"g",mgPerUnit:100,defaultAmount:2.5},g200:{label:"シロップ用細粒200",unit:"g",mgPerUnit:200,defaultAmount:1.25}},"PMDA セファレキシン電子添文"));
A("minoc","ミノサイクリン（ミノマイシン顆粒2%）",hold("感染症（原則8歳以上を中心に適応確認）",{gran2:{label:"顆粒2%",unit:"g",mgPerUnit:20,defaultAmount:1}},"PMDA ミノサイクリン電子添文"));
A("acy","アシクロビル",hold("単純疱疹／帯状疱疹／水痘",{gran40:{label:"顆粒40%",unit:"g",mgPerUnit:400,defaultAmount:0.5},ds80:{label:"DS80%",unit:"g",mgPerUnit:800,defaultAmount:0.25}},"PMDA アシクロビル電子添文"));
A("osel","オセルタミビル（タミフルDS3%）",hold("インフルエンザ治療・予防",{ds3:{label:"DS3%",unit:"g",mgPerUnit:30,defaultAmount:1.33}},"PMDA タミフルDS3%電子添文"));
A("lani","ラニナミビル（イナビル）",hold("インフルエンザ",{inh20:{label:"吸入粉末20mg",unit:"容器",mgPerUnit:20,defaultAmount:1}},"PMDA イナビル電子添文"));
A("zana","ザナミビル（リレンザ）",hold("インフルエンザ",{disk5:{label:"5mg/ブリスター",unit:"ブリスター",mgPerUnit:5,defaultAmount:2}},"PMDA リレンザ電子添文"));
A("balox","バロキサビル（ゾフルーザ）",hold("インフルエンザ",{tab10:{label:"錠10mg",unit:"錠",mgPerUnit:10,defaultAmount:1},tab20:{label:"錠20mg",unit:"錠",mgPerUnit:20,defaultAmount:1},gran2:{label:"顆粒2%分包",unit:"包",mgPerUnit:10,defaultAmount:1}},"PMDA ゾフルーザ電子添文"));
A("movLD","マクロゴール配合剤（モビコールLD）",hold("慢性便秘症（2歳以上）",{ld:{label:"配合内用剤LD",unit:"包",mgPerUnit:1,defaultAmount:1}},"PMDA モビコール配合内用剤電子添文"));
A("movHD","マクロゴール配合剤（モビコールHD）",hold("慢性便秘症",{hd:{label:"配合内用剤HD",unit:"包",mgPerUnit:1,defaultAmount:1}},"PMDA モビコール配合内用剤電子添文"));
A("loper","ロペラミド小児用0.05%",hold("下痢症",{gran005:{label:"細粒小児用0.05%",unit:"g",mgPerUnit:0.5,defaultAmount:0.8}},"PMDA ロペラミド塩酸塩細粒小児用電子添文"));
A("rebS","レベニンS散",hold("腸内菌叢異常",{pow:{label:"散",unit:"g",mgPerUnit:1,defaultAmount:1}},"PMDA レベニンS散電子添文"));
A("reb","レベニン散",hold("腸内菌叢異常",{pow:{label:"散",unit:"g",mgPerUnit:1,defaultAmount:0.75}},"PMDA レベニン散電子添文"));
A("pl","幼児用PL配合顆粒",hold("感冒症状（2歳以上）",{gran:{label:"幼児用PL配合顆粒",unit:"g",mgPerUnit:1,defaultAmount:1}},"PMDA 幼児用PL配合顆粒電子添文"));
A("acet20","アセトアミノフェン細粒20%",hold("解熱鎮痛",{gran20:{label:"細粒20%",unit:"g",mgPerUnit:200,defaultAmount:0.5}},"PMDA アセトアミノフェン電子添文"));
A("acet50","アセトアミノフェン細粒50%",hold("解熱鎮痛",{gran50:{label:"細粒50%",unit:"g",mgPerUnit:500,defaultAmount:0.2}},"PMDA アセトアミノフェン電子添文"));
A("dextMix","メジコン配合シロップ",hold("鎮咳",{syr:{label:"配合シロップ",unit:"mL",mgPerUnit:2.5,defaultAmount:3}},"PMDA メジコン配合シロップ電子添文"));
A("fusk","フスコデ配合シロップ",hold("鎮咳",{syr:{label:"配合シロップ",unit:"mL",mgPerUnit:1,defaultAmount:2.4}},"PMDA フスコデ配合シロップ電子添文"));
A("salb","サルブタモール（ベネトリンシロップ0.04%）",hold("気管支喘息等",{syr004:{label:"シロップ0.04%",unit:"mL",mgPerUnit:0.4,defaultAmount:7.5}},"PMDA ベネトリンシロップ電子添文"));
A("theoS","テオフィリン（テオドールシロップ2%）",hold("気管支喘息等",{syr2:{label:"シロップ2%",unit:"mL",mgPerUnit:20,defaultAmount:4.8}},"PMDA テオドールシロップ2%電子添文"));
A("tuloT","ツロブテロールテープ",hold("気管支喘息等",{t05:{label:"テープ0.5mg",unit:"枚",mgPerUnit:0.5,defaultAmount:1},t1:{label:"テープ1mg",unit:"枚",mgPerUnit:1,defaultAmount:1},t2:{label:"テープ2mg",unit:"枚",mgPerUnit:2,defaultAmount:1}},"PMDA ツロブテロールテープ電子添文"));
})();