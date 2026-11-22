const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game99.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1800);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:8};s.codeGo('c')});await p.waitForTimeout(9000);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.en=s.emax*.55;s.enG=s.emax*.7;s.lastHit={src:'t',t:s.time.now}});await p.waitForTimeout(300);
await p.screenshot({path:'h99_boss.png'});console.log(await p.evaluate(()=>{const s=GAME.scene.scenes[0];return {boss:!!s.boss,mb:!!s.mbOn,qv:s.gQ&&s.gQ.visible}}),errs);await b.close()})();
