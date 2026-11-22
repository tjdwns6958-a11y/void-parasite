const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game94.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};const m=s.cur.en[0];s.pl.body.reset(420,300);m.x=400;m.y=130;m.st='idle';m.cd=0;m.ci=1;m.cyN=0});
await p.waitForTimeout(800);await p.screenshot({path:'e94_a.png'});await p.waitForTimeout(500);await p.screenshot({path:'e94_b.png'});
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];const e=m.eggs.find(e=>e.live);if(e){s.pl.body.reset(e.x,e.y+22);s.gdkBite(m,0,-1)}});await p.waitForTimeout(150);await p.screenshot({path:'e94_c.png'});
await b.close()})();
