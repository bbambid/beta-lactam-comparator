// CAM caution batch 04 — 20 additional label-based targets, no invented PK multipliers
(function(){if(typeof CAUTION==='undefined')return;
const CAM="https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300119_6149003F2100_1_28",RXM="https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300119_6149002F1177_1_06";
const R=[
["alp","アルプラゾラム","CYP3A阻害で作用増強の可能性","過鎮静、転倒"],
["brot","ブロチゾラム","CYP3A阻害で作用増強の可能性","過鎮静、転倒"],
["zopi","ゾピクロン","代謝阻害による作用増強の可能性","過鎮静、持越し"],
["zolp","ゾルピデム","鎮静作用増強に注意","過鎮静、転倒"],
["amlo","アムロジピン","CYP3A阻害により降圧作用増強の可能性","低血圧、AKI"],
["dilt","ジルチアゼム","CYP3A相互作用と薬力学的循環抑制に注意","徐脈、低血圧、伝導障害"],
["dig","ジゴキシン","P-gp阻害等により血中濃度上昇の報告","悪心、徐脈、不整脈"],
["cyclo","シクロスポリン","CYP3A/P-gp阻害により濃度上昇","腎障害、神経毒性"],
["tacro","タクロリムス","CYP3A/P-gp阻害により濃度上昇","腎障害、神経毒性"],
["sirol","シロリムス","CYP3A/P-gp阻害により曝露増加","骨髄抑制、感染症等"],
["pred","プレドニゾロン","代謝阻害による作用増強の可能性","ステロイド副作用"],
["dex","デキサメタゾン","CYP3A関連相互作用に注意","ステロイド副作用"],
["quini","キニジン","代謝/輸送阻害およびQT延長の重複","QT延長、TdP"],
["prop","プロパフェノン","代謝阻害と不整脈リスクに注意","徐脈、伝導障害、不整脈"],
["theo","テオフィリン","血中濃度上昇が報告されるマクロライド相互作用","悪心、振戦、痙攣、不整脈"],
["valp","バルプロ酸","血中濃度・臨床症状の変動に注意","中枢神経症状等"],
["omep","オメプラゾール","相互に薬物動態へ影響する可能性","副作用増強"],
["itr","イトラコナゾール","双方がCYP3A阻害/基質で曝露変化","肝障害、QT関連リスク"],
["fluco","フルコナゾール","CYP阻害作用が重なり相互作用増強の可能性","併用薬曝露増加、QT関連"],
["rifa","リファブチン","CAM濃度低下・リファブチン濃度上昇が起こり得る","ぶどう膜炎、治療効果変動"]
];
R.forEach(([k,n,pk,pr])=>CAUTION[k]={name:n,camPK:pk+"。直接の定量PK値を確認できない場合は倍率を表示しない。",problem:pr,rxm:"RXMは一般にCAMよりCYP3A阻害が弱いが、対象薬との直接比較データがない限り『相互作用なし』とはしない。",judgement:"CAM側・対象薬側双方の電子添文と患者背景を確認。TDM対象薬は濃度測定を優先。",sources:[["CAM電子添文",CAM],["RXM電子添文",RXM]]});
const cl=document.getElementById("cautionList");if(cl)cl.innerHTML=Object.values(CAUTION).map(x=>'<div class="row"><b>'+x.name+'</b><br><b>CAM：</b>'+x.camPK+'<br><b>問題：</b>'+x.problem+'<br><b>RXMなら：</b>'+x.rxm+'<br><b>CDS判断：</b>'+x.judgement+'<div class="mini" style="margin-top:5px">根拠：'+x.sources.map(s=>'<a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+' ↗</a>').join(' ／ ')+'</div></div>').join("");
})();