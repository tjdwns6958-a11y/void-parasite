const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpJoyUsed=1});
await p.goto('file://'+__dirname+'/v47.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});s.cur.food.forEach(f=>{if(f.spr)f.spr.setVisible(false);f.on=0});
 s.pl.setPosition(380,200);s.pl.body.reset(380,200);s.ang=0;s.sp.forEach((q,i)=>{q.x=380-8*(i+1);q.y=204});
 GAME.loop.sleep();window.__T=performance.now();window.st=(n)=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(30)});
// 모든 트윈이 프레임 단위로 진행되게
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.tweens.getDelta=()=>16.667});
const x0=await p.evaluate(()=>GAME.scene.scenes[0].pl.x);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.bcd=0;s.bite()});
for(let i=0;i<10;i++){await p.screenshot({path:`mo46/b_${String(i).padStart(2,'0')}.png`,clip:{x:320,y:150,width:180,height:100}});await p.evaluate(()=>st(2))}
await p.evaluate(()=>st(30));const x1=await p.evaluate(()=>GAME.scene.scenes[0].pl.x);
// 벽 앞에서: 벽을 뚫지 않는지 (왼쪽 벽 근처, 왼쪽을 보고 물기)
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.pl.body.reset(56,200);s.ang=Math.PI;st(10);s.bcd=0;s.bite();st(30)});
const xw=await p.evaluate(()=>GAME.scene.scenes[0].pl.x);
console.log(JSON.stringify({lunge:+(x1-x0).toFixed(1),wallX:+xw.toFixed(1),errs}));await b.close()})();
