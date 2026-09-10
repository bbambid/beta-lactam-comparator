import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {parseHTML} from 'linkedom';

const app=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(app,'index.html'),'utf8');
const master=fs.readFileSync(path.join(app,'pediatric-master-2026-09.js'),'utf8');
const {document}=parseHTML(html).window;
const srcs=[...document.querySelectorAll('script[src]')].map(x=>x.getAttribute('src'));
assert.deepEqual(srcs,['pediatric-master-2026-09.js'],'Production must load exactly one extension master');
assert.match(master,/window\.PEDIATRIC_RELEASE=Object\.freeze/);
assert.doesNotMatch(master,/appendChild\(s\).*pmda-final-batch/s);
assert.equal((master.match(/Migrated source:/g)||[]).length,40);
console.log('Formal master source integrity: OK');
