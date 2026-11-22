const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game97.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1800);
await p.click('canvas');const E=f=>p.evaluate(f);const S=()=>E(()=>{const s=GAME.scene.scenes[0];return {x:Math.round(s.pl.x),y:Math.round(s.pl.y),bcd:+(s.bcd||0).toFixed(2),dsh:+(s.dshCd||0).toFixed(2),molt:!!s.molt,room:s.cur.tr||'',en:s.cur.en.filter(m=>m.on).length,safe:s.moltSafe()}});
await E(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy()});
const r={};r.start=await S();
await p.keyboard.down('ArrowRight');await p.waitForTimeout(400);await p.keyboard.up('ArrowRight');r.afterRight=await S();
await p.keyboard.down('d');await p.waitForTimeout(300);await p.keyboard.up('d');r.afterD=await S();
await p.keyboard.press('q');await p.waitForTimeout(80);r.afterQ=await S();
await p.keyboard.press('r');await p.waitForTimeout(80);r.afterR=await S();
// 탈피: 재료 주고 적 없애고 F
await E(()=>{const s=GAME.scene.scenes[0];s.org=500;s.mn=500;s.ve=50;s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});s.lastHit=null});await p.waitForTimeout(200);
r.safeNoEnemy=await S();await p.keyboard.press('f');await p.waitForTimeout(300);r.afterF=await S();
await p.screenshot({path:'k97_molt.png'});
console.log(JSON.stringify(r),errs.slice(0,3));await b.close()})();
