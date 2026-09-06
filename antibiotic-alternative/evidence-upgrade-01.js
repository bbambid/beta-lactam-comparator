// Quantitative evidence upgrades: overwrite only where direct human PK evidence is available.
(function(){if(typeof CAUTION==='undefined')return;
const set=(k,pk,url,label)=>{if(CAUTION[k]){CAUTION[k].camPK=pk;CAUTION[k].sources=(CAUTION[k].sources||[]).concat([[label,url]]);}};
set("simva","健康成人試験でCAM併用によりシンバスタチンAUCは約10倍、Cmax約7倍（試験条件によりAUC 3.9～10倍）。","https://pubmed.ncbi.nlm.nih.gov/15518608/","ヒトPK原著");
set("ator","ヒトPK試験でCAM併用によりアトルバスタチンAUCは最大約4.5倍、Cmax約5倍。","https://pubmed.ncbi.nlm.nih.gov/15518608/","ヒトPK原著");
set("riva","健康成人15例：CAM 500mg 1日2回併用でリバーロキサバンAUC 1.54倍（90%CI 1.44–1.64）、Cmax 1.40倍（1.30–1.52）。","https://pmc.ncbi.nlm.nih.gov/articles/PMC3769672/","ヒトPK原著");
set("apix","健康成人19例：CAM 500mg 1日2回併用でアピキサバンAUC 1.595倍（90%CI 1.506–1.698）、Cmax 1.299倍（1.220–1.384）。","https://pmc.ncbi.nlm.nih.gov/articles/PMC6885504/","ヒトPK原著");
set("sild","健康成人12例：CAM前投与でシルデナフィルAUC 1407→3209（約2.28倍）、Cmax 287→694（約2.42倍）。","https://pubmed.ncbi.nlm.nih.gov/16372380/","ヒトPK原著");
const cl=document.getElementById("cautionList");if(cl)cl.innerHTML=Object.values(CAUTION).map(x=>'<div class="row"><b>'+x.name+'</b><br><b>CAM：</b>'+x.camPK+'<br><b>問題：</b>'+x.problem+'<br><b>RXMなら：</b>'+x.rxm+'<br><b>CDS判断：</b>'+x.judgement+'<div class="mini" style="margin-top:5px">根拠：'+x.sources.map(s=>'<a href="'+s[1]+'" target="_blank" rel="noopener">'+s[0]+' ↗</a>').join(' ／ ')+'</div></div>').join("");
})();