import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';

export function loadApp(){
 const app=path.resolve(import.meta.dirname,'..');
 const html=fs.readFileSync(path.join(app,'index.html'),'utf8');
 const {window}=parseHTML(html);
 const initialDrug=window.document.querySelector('#drug option[value="cam"]');
 if(initialDrug)initialDrug.setAttribute('selected','');
 const timers=[];
 window.console=console;
 window.setTimeout=fn=>{timers.push(fn);return timers.length;};
 window.clearTimeout=()=>{};
 window.requestAnimationFrame=fn=>{timers.push(fn);return timers.length;};
 window.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
 window.CSS={escape:s=>String(s).replace(/[^a-zA-Z0-9_-]/g,c=>'\\'+c)};
 window.localStorage={getItem(){return null;},setItem(){},removeItem(){}};
 const context=vm.createContext(window);
 for(const [i,script] of [...window.document.querySelectorAll('script')].entries()){
  const src=script.getAttribute('src');
  const code=src?fs.readFileSync(path.join(app,src),'utf8'):script.textContent;
  if(code.trim())vm.runInContext(code,context,{filename:src||script.id||`inline-${i}.js`});
 }
 window.document.dispatchEvent(new window.Event('DOMContentLoaded'));
 let count=0;
 while(timers.length){timers.shift()();if(++count>2000)throw new Error('Timer queue did not settle');}
 return {app,window,document:window.document,context,DB:vm.runInContext('DB',context)};
}

export function setPrescription(app,{drug,product,indication,age,weight,amount,mode='product',frequency,days}){
 const {window,document,context}=app;
 const value=(id,v)=>{
  const el=document.getElementById(id),wanted=String(v);
  if(el.tagName==='SELECT')for(const option of el.options){if(String(option.value)===wanted)option.setAttribute('selected','');else option.removeAttribute('selected');}
  else el.value=wanted;
  return el;
 };
 value('age',age);value('wt',weight);value('drug',drug);
 vm.runInContext('loadDrug(true)',context);
 if(!document.getElementById('product').value&&document.getElementById('product').options[0])value('product',document.getElementById('product').options[0].value);
 if(!document.getElementById('ind').value&&document.getElementById('ind').options[0])value('ind',document.getElementById('ind').options[0].value);
 if(product){
  const option=[...document.getElementById('product').options].find(o=>typeof product==='string'?o.value===product:product.test(o.textContent));
  if(!option)throw new Error(`Product not found for ${drug}: ${product}`);
  value('product',option.value);document.getElementById('product').dispatchEvent(new window.Event('change',{bubbles:true}));
 }
 if(indication)value('ind',indication);
 value('amountMode',mode);document.getElementById('amountMode').dispatchEvent(new window.Event('change',{bubbles:true}));
 value('amountInput',amount);document.getElementById('amountInput').dispatchEvent(new window.Event('input',{bubbles:true}));
 value('freq',frequency);document.getElementById('freq').dispatchEvent(new window.Event('input',{bubbles:true}));
 if(days!==undefined){value('clavDays',days);document.getElementById('clavDays').dispatchEvent(new window.Event('input',{bubbles:true}));}
 vm.runInContext('render()',context);
 return document.getElementById('out').textContent.replace(/\s+/g,' ').trim();
}
