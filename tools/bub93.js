const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game93.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};const m=s.cur.en[0];s.pl.body.reset(400,300);m.x=400;m.y=130;m.st='idle';m.cd=0;m.ci=2;window.__st=[];const ai=s.gdkAI.bind(s);s.gdkAI=function(m,dt,p){const a=m.st;ai(m,dt,p);if(m.st!==a)__st.push(m.st)}});
for(const t of [1300,1100,1200]){await p.waitForTimeout(t);await p.screenshot({path:'b93_'+t+'.png'})}
console.log(JSON.stringify(await p.evaluate(()=>{const m=GAME.scene.scenes[0].cur.en[0];return {st:__st.join(','),bub:m.bub.length}})),errs.slice(0,4));await b.close()})();
