const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game91.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;window.__dm={};const h=s.hurt.bind(s);s.hurt=(d,src)=>{__dm[src]=(__dm[src]||0)+d};const m=s.cur.en[0];s.pl.body.reset(400,290);m.x=400;m.y=190;s.gdkClimb(m);window.__st=[];const ai=s.gdkAI.bind(s);s.gdkAI=function(m,dt,p){const a=m.st;ai(m,dt,p);if(m.st!==a)__st.push(m.st)}});
const t0=Date.now();for(const t of[.5,1.4,2.2,3.0,4.0,5.6,6.4,7.0]){const w=t*1000-(Date.now()-t0);if(w>0)await p.waitForTimeout(w);await p.screenshot({path:'c91_'+t+'.png'})}
await p.waitForTimeout(1500);
console.log(JSON.stringify(await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];return {st:__st.join(','),tmp:m.pt.filter(q=>q.tmp).length,dm:__dm,air:m.air}})),errs.slice(0,4));await b.close()})();
