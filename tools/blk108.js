const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game108.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='idle';m.air=0;m.cd=99;s.cry=3;s.pl.body.reset(m.x+30,m.y+120)});await p.waitForTimeout(400);await p.screenshot({path:'t108_cry3.png'});
const r=await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];const e0=s.en,h0=m.hp;s.inv=0;s.hurt(24,'정동 집게왕의 돌진',m);return {cry:s.cry,dmgTaken:Math.round(e0-s.en),reflect:Math.round(h0-m.hp)}});
await p.waitForTimeout(90);await p.screenshot({path:'t108_block.png'});
const r2=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];await new Promise(r=>setTimeout(r,600));s.cry=0;const e0=s.en;s.inv=0;s.hurt(24,'정동 집게왕의 돌진',m);return {noCryTaken:Math.round(e0-s.en)}});
console.log(r,r2,errs,'vpErr',await p.evaluate(()=>window.__vpErrN||0));await b.close()})();
