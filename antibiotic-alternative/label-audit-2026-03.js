// Exact current-label reconciliation for clarithromycin (PMDA 2026-03).
(function(){if(typeof CAUTION==='undefined')return;
const CAM="https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/480235_6149003F2232_1_14";
const RXM="https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300119_6149002F1177_1_06";
const add=(k,n,cam,problem,rxm="RXMはCAMよりCYP3A阻害が弱いが、直接比較データがない限り『相互作用なし』とはしない。")=>{
 if(!CAUTION[k]) CAUTION[k]={name:n,camPK:cam,problem,rxm,judgement:"2026年3月CAM電子添文10.2に明記。対象薬側電子添文・患者背景を確認し、必要に応じ用量調整/TDM。",sources:[["CAM電子添文（2026-03）",CAM],["RXM電子添文",RXM]]};
};
add("amino","アミノフィリン","CAM電子添文10.2でテオフィリンと同群に明記。血中濃度上昇に伴う作用増強の可能性。","悪心、振戦、頻脈、不整脈、痙攣等。");
add("dabig","ダビガトラン エテキシラート","CAMのP-gp阻害により排出が阻害され、血中濃度上昇の可能性。","出血。");
add("edox","エドキサバントシル酸塩水和物","CAMのP-gp阻害により排出が阻害され、血中濃度上昇の可能性。","出血。");
add("rit","リトナビル","相互のCYP3A阻害によりCAM未変化体の血中濃度上昇・作用増強等の可能性。","CAM副作用増強、相互作用全般。");
add("lopirit","ロピナビル・リトナビル","相互のCYP3A阻害によりCAM未変化体の血中濃度上昇・作用増強等の可能性。","CAM副作用増強、相互作用全般。");
add("darun","ダルナビル エタノール付加物","HIVプロテアーゼ阻害薬としてCAM電子添文10.2に明記。相互のCYP3A阻害に注意。","薬物曝露増加。");
add("etra","エトラビリン","CAM電子添文10.2に明記。エトラビリン濃度上昇、CAM未変化体低下・活性代謝物上昇の可能性。","治療効果変動、副作用増強。");
add("rifa","リファブチン","CAM電子添文10.2に明記。リファブチン濃度上昇、CAM未変化体低下・活性代謝物上昇の可能性。","ぶどう膜炎等、CAM治療効果変動。");
add("rifamp","リファンピシン","CYP3A4誘導によりCAM未変化体濃度低下・活性代謝物上昇、作用減弱の可能性。","抗菌効果低下。");
add("efav","エファビレンツ","CYP3A4誘導によりCAM未変化体濃度低下・活性代謝物上昇、作用減弱の可能性。","抗菌効果低下。");
add("nevi","ネビラピン","CYP3A4誘導によりCAM未変化体濃度低下・活性代謝物上昇、作用減弱の可能性。","抗菌効果低下。");
add("alSil","天然ケイ酸アルミニウム","吸着によりCAM吸収が低下すると報告。","CAM曝露低下・抗菌効果低下。","RXMでの同様の吸着影響は製剤側資料を確認。");
const cl=document.getElementById("cautionList");if(cl)cl.innerHTML=Object.values(CAUTION).map(x=>'<div class="row"><b>'+x.name+'</b><br><b>CAM：</b>'+x.camPK+'<br><b>問題：</b>'+x.problem+'<br><b>RXMなら：</b>'+x.rxm+'<br><b>CDS判断：</b>'+x.judgement+'<div class="mini" style="margin-top:5px">根拠：'+x.sources.map(s=>'<a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+' ↗</a>').join(' ／ ')+'</div></div>').join("");
})();