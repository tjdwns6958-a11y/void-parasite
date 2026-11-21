const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const out={};
for(const f of ['v50.html','v51.html']){const r={};for(const spam of [0,1]){const p=await b.newPage({viewport:{width:800,height:360}});
 await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=1;window.__vpJoyUsed=1;let a=7;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 await p.goto('file://'+__dirname+'/'+f);await p.waitForTimeout(2500);
 r[spam?'물기 연타':'그냥 이동']=await p.evaluate(sp=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});
  // 빈 방 가운데 한 줄: 장애물 피하려고 장애물 없앰
  s.pl.body.reset(120,180);GAME.loop.sleep();let T=performance.now();const st=n=>{for(let i=0;i<n;i++){T+=16.667;GAME.step(T,16.667)}};
  const k=s.k;k.RIGHT.isDown=true;st(10);const x0=s.pl.x;for(let i=0;i<60;i++){if(sp&&s.bcd<=0){s.ang=0;s.bite()}st(2)}k.RIGHT.isDown=false;return Math.round(s.pl.x-x0)},spam);await p.close()}
 out[f]=r}
console.log(JSON.stringify(out));await b.close()})();
