const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const res={};
for(const V of [1,2,3]){const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(v=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpJoyUsed=1;window.__vpJaw=v},V);
 await p.goto('file://'+__dirname+'/v51.html');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});s.cur.food.forEach(f=>{if(f.spr)f.spr.setVisible(false);f.on=0});
  s.pl.body.reset(370,200);s.ang=0;s.sp.forEach((q,i)=>{q.x=370-8*(i+1);q.y=204});s.tweens.getDelta=()=>16.667;
  GAME.loop.sleep();window.__T=performance.now();window.st=(n)=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(30);s.bcd=0;s.bite()});
 for(let i=0;i<12;i++){await p.screenshot({path:`jaw51/j${V}_${String(i).padStart(2,'0')}.png`,clip:{x:330,y:165,width:110,height:70}});await p.evaluate(()=>st(2))}
 res[V]=errs;await ctx.close()}
// 땅울음 솟구치기: v50 vs v51
for(const f of ['v50.html','v51.html']){const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:2});const p=await ctx.newPage();
 await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=2;window.__vpJoyUsed=1});
 await p.goto('file://'+__dirname+'/'+f);await p.waitForTimeout(2500);
 const sh=await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});s.pl.body.reset(330,200);s.tweens.getDelta=()=>16.667;
  GAME.loop.sleep();window.__T=performance.now();window.st=(n)=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(10);
  const m={x:420,y:200};const R={};for(const dist of [60,150,300]){m.x=330+dist;const c=s.cameras.main;c.shakeEffect.reset();
   if(s.rkBurst)s.rkBurst(m);else c.shake(150,.006);R[dist]=c.shakeEffect.isRunning?[c.shakeEffect.duration,+c.shakeEffect.intensity.x.toFixed(4)]:'흔들림 없음'}
  m.x=420;s.cameras.main.shakeEffect.reset();if(s.rkBurst)s.rkBurst(m);st(6);return R});
 await p.screenshot({path:`rek_${f.replace('.html','')}.png`,clip:{x:340,y:150,width:160,height:100}});res[f]=sh;await ctx.close()}
console.log(JSON.stringify(res));await b.close()})();
