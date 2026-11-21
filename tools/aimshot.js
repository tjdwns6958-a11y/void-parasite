const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
for(const [tag,noaim] of [['off',1],['on',0]]){const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(n=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpJoyUsed=1;if(n)window.__vpNoAim=1},noaim);
 await p.goto('file://'+__dirname+'/v50.html');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});s.cur.food.forEach(f=>{if(f.spr)f.spr.setVisible(false);f.on=0});
  s.pl.body.reset(370,200);s.ang=0;s.sp.forEach((q,i)=>{q.x=370-8*(i+1);q.y=204});s.tweens.getDelta=()=>16.667;
  const a=55*Math.PI/180,x=370+Math.cos(a)*50,y=200+Math.sin(a)*50;const g=s.add.graphics().setDepth(11);g.fillStyle(0x3a2a5a,1).fillTriangle(x-12,y+6,x-4,y-10,x,y-2).fillTriangle(x,y-2,x+6,y-12,x+12,y+6).fillCircle(x,y+2,9);g.lineStyle(1.5,0xc8a0ff,1).strokeCircle(x,y+2,9);g.fillStyle(0xff5a7a,1).fillCircle(x-3,y+1,1.8).fillCircle(x+3,y+1,1.8);
  s.cur.en.push({on:1,k:'kha',x,y,spr:{visible:true},hp:999,mh:999});
  GAME.loop.sleep();window.__T=performance.now();window.st=(n)=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(20)});
 await p.screenshot({path:`aim/${tag}_0.png`,clip:{x:320,y:140,width:170,height:140}});
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cur.en.pop();s.aimAssist&&0;s.cur.en.push({on:1,k:'kha',x:370+Math.cos(55*Math.PI/180)*50,y:200+Math.sin(55*Math.PI/180)*50,spr:{visible:true}});s.aimAssist();s.cur.en.pop();const ang=s.ang;s.bcd=0;
   // bite()는 몬스터 피해 처리를 하므로, 가짜 몬스터 없이 효과만: aimAssist 결과 각도로 물기
   s.ang=ang;s.bite()});
 for(const i of [3,5]){await p.evaluate(n=>st(n),i==3?3:2);await p.screenshot({path:`aim/${tag}_${i}.png`,clip:{x:320,y:140,width:170,height:140}})}
 console.log(tag,errs);await ctx.close()}
await b.close()})();
