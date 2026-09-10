import childProcess from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const repo=path.resolve(import.meta.dirname,'..');
const run=(command,args,{capture=false}={})=>{
 const result=childProcess.spawnSync(command,args,{cwd:repo,encoding:'utf8',stdio:capture?'pipe':'inherit'});
 if(result.status!==0)throw new Error(`${command} ${args.join(' ')} failed${capture?`\n${result.stderr}`:''}`);
 return capture?result.stdout.trim():'';
};

run(process.execPath,['--check','pediatric-dose-audit/pediatric-master-2026-09.js']);
run(process.execPath,['pediatric-dose-audit/tests/run-all.mjs']);
run('git',['diff','--check']);
const outputArg=process.argv.find(x=>x.startsWith('--output='));
const output=outputArg?path.resolve(outputArg.slice('--output='.length)):path.resolve(repo,'..','handoff','pediatric-dose-audit','index.html');
run(process.execPath,['tools/build-pediatric-standalone.mjs',`--output=${output}`]);
const digest=crypto.createHash('sha256').update(fs.readFileSync(output)).digest('hex');
console.log(`Standalone SHA-256: ${digest}`);

if(process.argv.includes('--publish')){
 if(!process.argv.includes('--confirm-production'))throw new Error('Publishing requires --confirm-production.');
 if(run('git',['status','--porcelain'],{capture:true}))throw new Error('Commit changes before publishing; the worktree must be clean.');
 run('git',['fetch','origin','main']);
 const date=new Date().toISOString().slice(0,10).replaceAll('-','');
 const backup=`backup-production-before-v1.0.0-${date}`;
 run('git',['push','origin',`refs/remotes/origin/main:refs/heads/${backup}`]);
 run('git',['push','origin','HEAD:main']);
 console.log(`Published after creating ${backup}.`);
}else{
 console.log('Release checks and standalone build completed. Publishing was not requested.');
}
