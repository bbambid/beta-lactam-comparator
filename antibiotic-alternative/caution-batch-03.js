// CAM caution batch 03 — 20 additional current-label interaction targets
(function(){
 if(typeof CAUTION==='undefined')return;
 const CAM="https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480235_6149003F2232_1_14";
 const RXM="https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300119_6149002F1177_1_06";
 const rows=[
 ["tada","タダラフィル","CYP3A阻害により曝露増加が予想される。","頭痛、潮紅、低血圧等。"],
 ["dien","ジエノゲスト","CYP3A阻害により血中濃度上昇の可能性。","不正出血、悪心等の副作用増強。"],
 ["doce","ドセタキセル","CYP3A阻害により血中濃度上昇の可能性。","骨髄抑制、感染症等の毒性増強。"],
 ["abema","アベマシクリブ","CYP3A阻害により活性体を含む曝露増加。","下痢、骨髄抑制、肝障害等。"],
 ["oxyc","オキシコドン","CYP3A阻害により曝露増加の可能性。","傾眠、呼吸抑制。"],
 ["fent","フェンタニル","CYP3A阻害により血中濃度上昇の可能性。","過鎮静、呼吸抑制。"],
 ["ele","エレトリプタン","CYP3A阻害により曝露増加の可能性。","血圧上昇、胸部症状等。"],
 ["nitra","ニトラゼパム","CAM電子添文で併用注意。作用増強の可能性。","過鎮静、転倒等。"],
 ["glime","グリメピリド","CAM併用時に低血糖が報告されている。","重症低血糖。"],
 ["glic","グリクラジド","CAM併用時に低血糖が報告されている。","重症低血糖。"],
 ["repag","レパグリニド","代謝・輸送阻害により作用増強の可能性。","低血糖。"],
 ["saxa","サキサグリプチン","CYP3A阻害により曝露増加の可能性。","低血糖等の副作用増強。"],
 ["bosu","ボスチニブ","CYP3A阻害により曝露増加の可能性。","下痢、肝障害、骨髄抑制等。"],
 ["ibrut","イブルチニブ","CYP3A阻害により曝露増加の可能性。","出血、感染症、不整脈等。"],
 ["crizo","クリゾチニブ","CYP3A阻害により曝露増加の可能性。","QT延長、肝障害等。"],
 ["caboz","カボザンチニブ","CYP3A阻害により曝露増加の可能性。","高血圧、下痢、手足症候群等。"],
 ["axit","アキシチニブ","CYP3A阻害により曝露増加の可能性。","高血圧、肝障害等。"],
 ["methyl","メチルプレドニゾロン","CYP3A阻害によりステロイド曝露増加の可能性。","ステロイド副作用増強。"],
 ["bude","ブデソニド","CYP3A阻害により全身曝露増加の可能性。","副腎抑制、クッシング様症状。"],
 ["cilos","シロスタゾール","CYP3A阻害により活性体を含む曝露増加の可能性。","頭痛、動悸、出血等。"]
 ];
 rows.forEach(([k,n,pk,pr])=>CAUTION[k]={name:n,camPK:pk+" 現段階で信頼できる直接AUC/Cmax値を確認できない場合は倍率を表示しない。",problem:pr,rxm:"RXMはCAMよりCYP3A阻害が弱いが、この薬との直接定量比較を確認できていないため『安全』とは判定しない。",judgement:"CAM電子添文上の相互作用を優先。RXMへの変更は相互作用軽減候補だが、患者背景と対象薬側の添付文書を確認。",sources:[["CAM電子添文",CAM],["RXM電子添文",RXM]]});
 const cl=document.getElementById("cautionList");
 if(cl)cl.innerHTML=Object.values(CAUTION).map(x=>'<div class="row"><b>'+x.name+'</b><br><b>CAM：</b>'+x.camPK+'<br><b>問題：</b>'+x.problem+'<br><b>RXMなら：</b>'+x.rxm+'<br><b>CDS判断：</b>'+x.judgement+'<div class="mini" style="margin-top:5px">根拠：'+x.sources.map(s=>'<a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+' ↗</a>').join(' ／ ')+'</div></div>').join("");
})();