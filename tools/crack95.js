const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:3});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game94.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};const m=s.cur.en[0];s.pl.body.reset(420,300);m.x=400;m.y=130;m.st='idle';m.cd=0;m.ci=1;m.cyN=0});
await p.waitForTimeout(1700);const pos=await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='intro';const e=m.eggs.find(e=>e.live);s.pl.body.reset(e.x,e.y+22);return [e.x,e.y]});
await p.screenshot({path:'k0.png',clip:{x:pos[0]-45,y:pos[1]-40,width:90,height:80}});
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.gdkBite(m,0,-1)});
for(const t of[60,160,450]){await p.waitForTimeout(t==60?60:t-(t==160?60:160));await p.screenshot({path:'k'+t+'.png',clip:{x:pos[0]-45,y:pos[1]-40,width:90,height:80}})}
console.log(errs);await b.close()})();
