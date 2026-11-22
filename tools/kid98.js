const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game98.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const E=f=>p.evaluate(f);
await E(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};const m=s.cur.en[0];s.pl.body.reset(400,210);m.x=400;m.y=110;m.st='idle';m.cd=0;m.ci=1;m.cyN=0});
await p.waitForTimeout(2300);await p.screenshot({path:'k98_eggs.png'});
await p.waitForTimeout(3300);await p.screenshot({path:'k98_kids.png'});
const r=await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];const n0=m.kids.length;m.st='idle';m.cd=99;m.x=150;m.y=200;s.pl.body.reset(700,200);m.kids.forEach((k,i)=>{k.x=300+i*20;k.y=200});m.pt.forEach(q=>{q.on=0;q.rt=99;q.o.setVisible(false)});m.cdx=1;m.cdy=0;m.st='ch';m.cl=560;return n0});
await p.waitForTimeout(150);await p.screenshot({path:'k98_crush.png'});await p.waitForTimeout(600);
const r2=await E(()=>{const m=GAME.scene.scenes[0].cur.en[0];return {n:m.kids.length,mx:Math.round(m.x),st:m.st,ks:m.kids.map(k=>Math.round(k.x)+','+Math.round(k.y))}});
// T 키
await p.click('canvas');await p.keyboard.press('t');await p.waitForTimeout(200);const r3=await E(()=>!!GAME.scene.scenes[0].treeO);
console.log(JSON.stringify({kidsBefore:r,kidsAfter:r2,tree:r3}),errs.slice(0,4));await b.close()})();
