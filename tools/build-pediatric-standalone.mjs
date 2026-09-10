import fs from 'node:fs';
import path from 'node:path';

const repo=path.resolve(import.meta.dirname,'..');
const app=path.join(repo,'pediatric-dose-audit');
const arg=process.argv.find(x=>x.startsWith('--output='));
const output=arg?path.resolve(arg.slice('--output='.length)):path.resolve(repo,'..','handoff','pediatric-dose-audit','index.html');
let html=fs.readFileSync(path.join(app,'index.html'),'utf8');

html=html.replace(/<link rel="stylesheet" href="([^"]+)">/g,(_,href)=>{
 const css=fs.readFileSync(path.join(app,href),'utf8');
 return `<style data-bundled-from="${href}">\n${css}\n</style>`;
});
html=html.replace(/<script src="([^"]+)"><\/script>/g,(_,src)=>{
 const js=fs.readFileSync(path.join(app,src),'utf8').replace(/<\/script/gi,'<\\/script');
 return `<script data-bundled-from="${src}">\n${js}\n</script>`;
});
fs.mkdirSync(path.dirname(output),{recursive:true});
fs.writeFileSync(output,html);
console.log(output);
