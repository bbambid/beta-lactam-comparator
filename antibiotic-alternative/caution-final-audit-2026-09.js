// Final reconciliation against Clarith tablets 200 PMDA label, revised 2026-03-17.
(function(){
 if(typeof CAUTION==='undefined')return;
 const CAM="https://www.pmda.go.jp/PmdaSearch/iyakuDetail/400059_6149003F2038_1_38";
 const RXM="https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/300119_6149002F1177_1_06";
 CAUTION.veneMaint={name:"ベネトクラクス（維持投与期／AML）",camPK:"2026年3月CAM電子添文10.2に明記。CYP3A阻害によりベネトクラクス曝露が上昇し、副作用が増強するおそれ。維持投与期等では減量と慎重な観察が必要。用量漸増期のCLL/SLL・再発/難治MCLは10.1併用禁忌であり別扱い。",problem:"腫瘍崩壊症候群、骨髄抑制、感染症など。治療フェーズにより『禁忌』と『併用注意』が切り替わる。",rxm:"RXMはCAMよりCYP3A阻害が弱いが、ベネトクラクスは阻害薬併用時の用量調整が治療設計に直結するため、単純置換で安全とはしない。",judgement:"治療フェーズを必ず確認。維持投与期/AMLでは対象薬側の用量調整規定を優先し、血液内科へ確認。",sources:[["CAM電子添文 2026-03",CAM],["RXM電子添文",RXM]],labelListed:true};
 const exact=["dig","su","carb","theo","amino","cyclo","tac","ever","ator","sim","col","tri","mid","que","ari","blon","diso","tolv","epl","ele","nif","vera","rio","dien","sild","tada","war2","doce","abema","oxyc","fent","veneMaint","api","riv","dabig","edox","itr","rit","lopirit","darun","rifa","etra","rifamp","efav","nevi","alSil"];
 exact.forEach(k=>{if(CAUTION[k])CAUTION[k].labelListed=true;});
 const cl=document.getElementById("cautionList");
 if(cl){
  const listed=exact.filter(k=>CAUTION[k]);
  cl.insertAdjacentHTML("beforebegin",'<div class="condbox"><b>2026年3月17日 CAM電子添文 10.2 突合</b><br>電子添文に明記された併用注意を薬剤・薬効群単位で突合済み。<b>'+listed.length+'データ項目</b>を現行10.2レイヤーとして管理。定量PKは直接データが確認できたものだけ倍率表示し、確認できないものは推定しません。<br><span class="mini">ベネトクラクスは治療フェーズにより10.1禁忌／10.2併用注意が切り替わるため別データ化。</span></div>');
  cl.innerHTML=Object.values(CAUTION).map(x=>'<div class="row"><b>'+x.name+'</b> '+(x.labelListed?'<span class="tag">CAM 10.2明記</span>':'<span class="mini">拡張評価</span>')+'<br><b>CAM：</b>'+x.camPK+'<br><b>問題：</b>'+x.problem+'<br><b>RXMなら：</b>'+x.rxm+'<br><b>CDS判断：</b>'+x.judgement+'<div class="mini" style="margin-top:5px">根拠：'+x.sources.map(s=>'<a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+' ↗</a>').join(' ／ ')+'</div></div>').join("");
 }
})();