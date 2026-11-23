const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=2});await p.goto('file:///home/claude/play/game117.html');await p.waitForFunction(()=>window.GAME&&GAME.scene.scenes[0]&&GAME.scene.scenes[0].pl,null,{timeout:30000});await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.inv=1e9;const T=[];for(let i=0;i<6;i++){const t0=performance.now();s.enter(s.lv.rooms[i]);T.push(Math.round(performance.now()-t0))}const t0=performance.now();s.textures.remove('fl117A1');s.v117Floor();return {enterMs:T,floorMs:Math.round(performance.now()-t0)}});
console.log(JSON.stringify(r));
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.nextZone()});await p.waitForTimeout(4500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;const i=s.lv.rooms.findIndex(r=>r.tr=='coral');s.enter(s.lv.rooms[i>=0?i:2]);s.pl.body.reset(400,250)});await p.waitForTimeout(1500);await p.screenshot({path:'v116/f117_z2.png'});
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(9000);await p.screenshot({path:'v116/f117_gdk.png'});
console.log(errs);await b.close()})();
