const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
for(const V of [1,2,3]){const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(v=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpMo=v;window.__vpJoyUsed=1;let a=99;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},V);
 await p.goto('file://'+__dirname+'/v44.html');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});s.cur.food.forEach(f=>{if(f.spr){f.spr.setVisible(false)}f.on=0});
  s.pl.setPosition(390,200);s.pl.body.reset(390,200);s.ang=0;s.sp.forEach((q,i)=>{q.x=390-8*(i+1);q.y=204});
  GAME.loop.sleep();window.__T=performance.now();window.st=(n)=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(30)});
 const shot=async(name)=>{await p.screenshot({path:`mo/${name}.png`,clip:{x:330,y:160,width:140,height:84}})};
 // 물기: 0.4초를 2프레임마다
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.bcd=0;s.bite()});for(let i=0;i<14;i++){await shot(`b${V}_${String(i).padStart(2,'0')}`);await p.evaluate(()=>st(2))}
 await p.evaluate(()=>st(40));
 // 섭취: 앞에 먹이 하나, 꾹 누르기
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];const f=s.cur.food.find(f=>f.spr&&f.t=='s')||s.cur.food.find(f=>f.spr);f.on=1;f.t='s';f.p=0;f.ready=0;f.spr.setVisible(true).setPosition(420,212);f.x=420;f.y=212;s.eat={isDown:true};s.ang=.35});
 for(let i=0;i<14;i++){await shot(`e${V}_${String(i).padStart(2,'0')}`);await p.evaluate(()=>st(4))}
 console.log(V,errs,await p.evaluate(()=>{const s=GAME.scene.scenes[0];return [s.org,s.en]}));await ctx.close()}
await b.close()})();
