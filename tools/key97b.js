const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game97.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1800);await p.click('canvas');
const E=f=>p.evaluate(f);
// 적이 있는 방 찾기: 다음 방들 중 적 있는 방으로 이동
const r=await E(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();const rm=s.lv.rooms.find(a=>a.en.some(m=>m.on)&&a.tr!='haven');if(!rm)return 'none';s.enter(rm);const m=rm.en.find(m=>m.on);s.pl.body.reset(m.x+60,m.y);s.org=500;s.mn=500;s.ve=50;return {k:m.k||'basic',safe:s.moltSafe()}});
await p.waitForTimeout(100);await p.keyboard.press('f');await p.waitForTimeout(200);const r2=await E(()=>({molt:!!GAME.scene.scenes[0].molt}));
await p.screenshot({path:'k97_unsafe.png'});
// 먹이 먹기 W
const r3=await E(()=>{const s=GAME.scene.scenes[0];s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});const f={t:'c',x:s.pl.x,y:s.pl.y+12,c:-1,r:-1,p:0,on:1};f.spr=s.add.image(f.x,f.y,'f_c');s.cur.food.push(f);window.__f=f;return {mn0:s.mn}});
await p.keyboard.down('w');await p.waitForTimeout(1600);await p.keyboard.up('w');const r4=await E(()=>({eaten:!__f.on,mn:GAME.scene.scenes[0].mn}));
await p.waitForTimeout(3200);await p.screenshot({path:'k97_safe.png'});
console.log(JSON.stringify({r,r2,r3,r4}),errs.slice(0,3));await b.close()})();
