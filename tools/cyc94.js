const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game94.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};window.__st=[];const ai=s.gdkAI.bind(s);s.gdkAI=function(m,dt,p){const a=m.st;ai(m,dt,p);if(m.st!==a&&['clW','egg','bubW','chW'].includes(m.st))__st.push(m.st)}});
await p.waitForTimeout(60000);console.log(await p.evaluate(()=>__st.join(',')),errs.slice(0,3));await b.close()})();
