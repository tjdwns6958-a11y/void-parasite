const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game92.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const E=f=>p.evaluate(f);
await E(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;const m=s.cur.en[0];s.pl.body.reset(560,280);m.x=400;m.y=150;m.st='idle';m.cd=0;m.ci=1;window.__st=[];const ai=s.gdkAI.bind(s);s.gdkAI=function(m,dt,p){const a=m.st;ai(m,dt,p);if(m.st!==a)__st.push(m.st)}});
await p.waitForTimeout(900);await p.screenshot({path:'g92_lay.png'});
await p.waitForTimeout(1200);
const r1=await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];return {eggs:m.eggs.length}});
// 알 하나 물어 깨기
const r2=await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];const e=m.eggs.find(e=>e.live);if(!e)return 'noegg';s.pl.body.reset(e.x,e.y+20);s.ang=-Math.PI/2;const c0=s.cry;const h=s.gdkBite(m,0,-1);return {hit:h,cry:[c0,s.cry],left:m.eggs.length}});
await E(()=>{const s=GAME.scene.scenes[0];s.pl.body.reset(560,280);s.inv=0});await p.waitForTimeout(3600);await p.screenshot({path:'g92_kids.png'});
await p.waitForTimeout(1500);await p.screenshot({path:'g92_latch.png'});
const r3=await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];const l0=m.latch;s.bcd=0;s.req=1;return {latch0:l0,kids:m.kids.length}});await p.waitForTimeout(200);
const r4=await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];const l1=m.latch;s.dshCd=0;s.dshReq=1;return {afterBite:l1}});await p.waitForTimeout(300);
const r5=await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];return {afterDash:m.latch,st:__st.join(',')}});
console.log(JSON.stringify({r1,r2,r3,r4,r5}),errs.slice(0,4));await b.close()})();
