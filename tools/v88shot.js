const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game88.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:0,v:3,lv:10};s.codeGo('v')});await p.waitForTimeout(8000);
const E=f=>p.evaluate(f);await E(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};s.pl.body.reset(400,300)});
for(const [i,h] of [[0,.95],[1,.8],[2,.66]]){await E(h=>{const m=GAME.scene.scenes[0].cur.en[0];m.hp=m.mh*h},h);await p.waitForTimeout(500);await p.screenshot({path:'e88_'+i+'.png',clip:{x:300,y:40,width:200,height:150}})}
await E(()=>{const m=GAME.scene.scenes[0].cur.en[0];m.hp=m.mh*.59});const t0=Date.now();
for(const t of[.25,.6,1.0,1.3,1.7,2.3,2.9,3.3]){const w=t*1000-(Date.now()-t0);if(w>0)await p.waitForTimeout(w);await p.screenshot({path:'r88_'+t+'.png'})}
console.log(errs.slice(0,4));await b.close()})();
