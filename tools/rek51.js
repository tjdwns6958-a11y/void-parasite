const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpJoyUsed=1});
await p.goto('file://'+__dirname+'/v51.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});s.pl.body.reset(330,200);s.tweens.getDelta=()=>16.667;
 GAME.loop.sleep();window.__T=performance.now();window.st=(n)=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(10);
 const sp=s.add.image(430,200,'rek').setDepth(9);s.rkBurst({x:430,y:200});window.__sp=sp});
for(const [i,n] of [[0,1],[1,5],[2,12],[3,30]]){await p.evaluate(n=>st(n),n);await p.screenshot({path:`rek51_${i}.png`,clip:{x:380,y:160,width:100,height:80}})}
await b.close()})();
