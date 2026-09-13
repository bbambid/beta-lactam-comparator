import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {parseHTML} from 'linkedom';

const app=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(app,'index.html'),'utf8');
const master=fs.readFileSync(path.join(app,'pediatric-master-2026-09.js'),'utf8');
const palatability=JSON.parse(fs.readFileSync(path.join(app,'palatability-source-audit-2026-09.json'),'utf8'));
const embeddedMatch=master.match(/const MASTER=Object\.freeze\((\{.*\})\);\n  window\.PEDIATRIC_PALATABILITY_MASTER=MASTER;/s);
assert.ok(embeddedMatch,'Embedded taste master must be readable');
assert.deepEqual(JSON.parse(embeddedMatch[1]),palatability,'Embedded and audit-copy taste masters must match exactly');
const {document}=parseHTML(html).window;
const srcs=[...document.querySelectorAll('script[src]')].map(x=>x.getAttribute('src'));
assert.deepEqual(srcs,['pediatric-master-2026-09.js'],'Production must load exactly one extension master');
assert.match(master,/window\.PEDIATRIC_RELEASE=Object\.freeze/);
assert.doesNotMatch(master,/appendChild\(s\).*pmda-final-batch/s);
assert.equal((master.match(/Migrated source:/g)||[]).length,40);
assert.match(master,/window\.PEDIATRIC_PALATABILITY_MASTER=MASTER/);
assert.doesNotMatch(master,/fetch\(["']palatability-source-audit/,'Standalone must not fetch the palatability master at runtime');
assert.equal(palatability.products.length,43);
assert.equal(palatability.products.flatMap(product=>product.foods).length,61);
const sourceUrls=palatability.products.flatMap(product=>[
 ...product.sources.map(source=>source.url),
 ...product.foods.map(food=>food.sourceUrl)
]);
assert.ok(sourceUrls.every(url=>url.startsWith('https://')),'Every taste source must use a direct HTTPS link');
assert.ok(sourceUrls.every(url=>!url.includes('/ResultDataSetPDF/')),'Version-dependent PMDA PDF links must not remain');
assert.equal(new Set(sourceUrls).size,60);
const byId=Object.fromEntries(palatability.products.map(product=>[product.id,product]));
assert.equal(byId['ABX-001'].sweetness,null,'Widesilin sweetness must not be inferred beyond the reachable primary text');
assert.equal(byId['ABX-002'].sweetness,null,'Widesilin 20% sweetness must not be inferred beyond the reachable primary text');
assert.equal(byId['ABX-007'].sweetness,'水等に混ぜると甘味が増す');
assert.equal(byId['ABX-007'].bitterness,'水等に混ぜると感じにくくなる');
assert.equal(byId['ABX-027'].flavor,'ストロベリー風味');
assert.equal(byId['ABX-028'].bitterness,'酸性飲料との混合で苦く感じることあり');
assert.equal(byId['ABX-029'].sweetness,null,'Sweeteners must not be promoted to a direct finished-product taste claim');
assert.equal(byId['ABX-030'].sweetness,null,'Sweetener ingredients must not be treated as a direct finished-product taste claim');
assert.equal(byId['ABX-032'].evidenceStatus,'no_direct_statement');
assert.equal(byId['ABX-038'].sweetness,null,'Farom must stay at the manufacturer wording: palatable orange taste');
assert.match(master,/\["苦味・対策",item\.bitterness\]/,'Masking and conditional bitterness need an explicit combined label');
console.log('Formal master source integrity: OK');
