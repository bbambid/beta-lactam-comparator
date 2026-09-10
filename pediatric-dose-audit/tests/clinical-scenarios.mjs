import assert from 'node:assert/strict';
import {loadApp,setPrescription} from './load-app.mjs';

const app=loadApp();
const {DB,document,window}=app;
const scenario=(name,input,checks)=>{
 const text=setPrescription(app,input);
 for(const expected of checks)assert.match(text,expected,`${name}: ${expected}`);
};

scenario('クラリスロマイシン・通常量下限',{drug:'cam',product:/ドライシロップ10%/,indication:'general',age:4,weight:18,amount:1.8,frequency:2},[/判定：ちょうどいい/,/180 mg\/day/,/10 mg\/kg\/day/]);
scenario('アモキシシリン・通常量下限',{drug:'amox',product:/細粒10%/,indication:'general',age:4,weight:18,amount:3.6,frequency:3},[/判定：ちょうどいい/,/360 mg\/day/,/20 mg\/kg\/day/]);
scenario('カルボシステイン・シロップ',{drug:'carbo',product:/^シロップ5%$/,indication:'general',age:4,weight:18,amount:10.8,frequency:3},[/判定：ちょうどいい/,/540 mg\/day/,/製剤 10\.80 mL\/day/]);
assert.equal(document.getElementById('productUnitTile').textContent,'mL','Formulation switch must update the product unit');
scenario('アセトアミノフェン・1回量',{drug:'apap',product:/ドライシロップ20%/,indication:'general',age:4,weight:18,amount:1.35,frequency:1},[/判定：ちょうどいい/,/270 mg\/回/,/15 mg\/kg\/回/]);
scenario('アスベリン・2歳',{drug:'tipe',product:/シロップ0\.5%/,indication:'general',age:2,weight:12,amount:4,frequency:3},[/添付文書の用法・用量/,/1歳以上3歳未満/,/今回の用法・用量/]);
scenario('ケトチフェン・DS',{drug:'keto',product:/ドライシロップ|DS/,indication:'general',age:2,weight:10,amount:0.6,frequency:2},[/製剤0\.06g\/kg\/day/,/6カ月以上3歳未満/,/成人通常量はケトチフェンとして2mg\/day/]);
scenario('ファロペネム・増量上限内',{drug:'faro',product:/ドライシロップ/,indication:'general',age:8,weight:30,amount:9,frequency:3},[/900 mg\/day/,/上限用量1回300mg、1日3回（1日900mg）/]);
scenario('トスフロキサシン・上限',{drug:'tosu',product:/細粒/,indication:'general',age:10,weight:30,amount:2.4,frequency:2},[/360 mg\/day/,/1回180mg/,/1日360mg/]);
scenario('レボセチリジン・乳児境界',{drug:'levo',product:/シロップ/,indication:'general',age:0.5,weight:7,amount:2.5,frequency:1},[/判定：ちょうどいい/,/1.3 mg\/day/,/6ヵ月以上1歳未満/]);

assert.equal(DB.clav.doseBasis,'product_band');
scenario('クラバモックス・12kg・5日',{drug:'clav',age:3,weight:12,amount:2.02,frequency:2,days:5},[/体重 11～16kg/,/製剤 2.02 g\/day/,/1.01g包 × 10包/,/アモキシシリン/,/クラブラン酸/]);

const external=/点眼|点鼻|点耳|軟膏|クリーム|ゲル|ローション|塗布|吸入|ネブライザ|噴霧|テープ|貼付|坐剤|坐薬|サポ/;
document.getElementById('drugListBtn').click();
assert.equal([...document.querySelectorAll('#drugListItems button[data-v]')].filter(x=>external.test(x.textContent)).length,0);
for(const query of ['あすべりん','くらばもっくす','むこだいん']){
 const input=document.getElementById('drugSearch');input.value=query;input.dispatchEvent(new window.Event('input',{bubbles:true}));
 assert.ok(document.querySelectorAll('#drugSuggest [data-global-row]').length>0,`Kana search: ${query}`);
}
console.log('Clinical prescription scenarios: OK');
