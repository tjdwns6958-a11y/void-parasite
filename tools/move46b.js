const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=1;window.__vpJoyUsed=1});
await p.goto('file://'+__dirname+'/v46.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});s.pl.body.reset(300,200);GAME.loop.sleep();window.T=performance.now();window.st=n=>{for(let i=0;i<n;i++){T+=16.667;GAME.step(T,16.667)}}});
await p.keyboard.down('ArrowRight');await p.evaluate(()=>st(40));
const r=await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.bcd=0;s.bite();const L=[];for(let i=0;i<16;i++){st(1);L.push([Math.round(s.pl.x),Math.round(s.pl.body.velocity.x),Math.round(s.vx),+(s.lgT).toFixed(3),Math.round(s.lgX||0),s.cine?'cine':'',s.molt?'molt':'',s.paused?'P':''])}return L});
console.log(JSON.stringify(r),errs);await b.close()})();
