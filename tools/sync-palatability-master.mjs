import fs from 'node:fs';
import path from 'node:path';

const repo=path.resolve(import.meta.dirname,'..');
const auditPath=path.join(repo,'pediatric-dose-audit','palatability-source-audit-2026-09.json');
const masterPath=path.join(repo,'pediatric-dose-audit','pediatric-master-2026-09.js');
const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));
let master=fs.readFileSync(masterPath,'utf8');
const pattern=/const MASTER=Object\.freeze\((\{.*\})\);\n  window\.PEDIATRIC_PALATABILITY_MASTER=MASTER;/s;
if(!pattern.test(master))throw new Error('Embedded palatability master not found');
master=master.replace(pattern,`const MASTER=Object.freeze(${JSON.stringify(audit)});\n  window.PEDIATRIC_PALATABILITY_MASTER=MASTER;`);
fs.writeFileSync(masterPath,master);
console.log(`Synced ${audit.products.length} palatability products into the formal master.`);
