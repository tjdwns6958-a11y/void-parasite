const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const res={};
for(const V of [1,2,3,4]){const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(v=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpJoyUsed=1;window.__vpBR=v},V);
 await p.goto('file://'+__dirname+'/v48.html');await p.waitForTimeout(2500);
 const cov=await p.evaluate(()=>{const s=GAME.scene.scenes[0];let o=0,n=0,bth=0,reach=0;for(let x=-30;x<=100;x++)for(let y=-90;y<=90;y++){const d=Math.hypot(x,y),a=d<64&&x/(d||1)>.3,c=s.inBite(x,y,1,0,0);o+=a;n+=c;bth+=a&&c;if(c&&Math.abs(y)<2)reach=Math.max(reach,x)}return{area:+(n/o).toFixed(3),overlap:+(bth/o).toFixed(3),reach}});
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});s.cur.food.forEach(f=>{if(f.spr)f.spr.setVisible(false);f.on=0});
  s.pl.body.reset(370,200);s.ang=0;s.sp.forEach((q,i)=>{q.x=370-8*(i+1);q.y=204});s.tweens.getDelta=()=>16.667;
  GAME.loop.sleep();window.__T=performance.now();window.st=(n)=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(30);s.bcd=0;s.bite()});
 for(let i=0;i<12;i++){await p.screenshot({path:`br48/v${V}_${String(i).padStart(2,'0')}.png`,clip:{x:320,y:140,width:160,height:120}});await p.evaluate(()=>st(2))}
 res[V]={cov,errs};await ctx.close()}
console.log(JSON.stringify(res));await b.close()})();
