const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpZ=1});await p.goto('file:///home/claude/play/game121.html');await p.waitForTimeout(4500);
await p.mouse.move(400,116);await p.waitForTimeout(400);await p.screenshot({path:'v116/t121_a.png'});
await p.mouse.move(200,300);await p.waitForTimeout(200);await p.mouse.click(198,116);await p.waitForTimeout(400);await p.screenshot({path:'v116/t121_b.png'});
const pg=await p.evaluate(()=>GAME.scene.scenes[0].bsO.pg);
await p.mouse.click(400,338);await p.waitForTimeout(800);await p.mouse.move(150+46,135);await p.waitForTimeout(400);await p.screenshot({path:'v116/t121_c.png'});
console.log('page after icon tap',pg,errs);
const q=await b.newPage({viewport:{width:800,height:360}});q.on('pageerror',e=>errs.push(e.message));
await q.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await q.goto('file:///home/claude/play/game121.html');await q.waitForFunction(()=>window.GAME&&GAME.scene.scenes[0]&&GAME.scene.scenes[0].pl,null,{timeout:30000});await q.waitForTimeout(800);
await q.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:1,v:0,lv:10};s.codeGo('sw')});await q.waitForTimeout(8000);await q.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{}});
const seen=new Set();for(let i=0;i<40;i++){await q.waitForTimeout(500);const t=await q.evaluate(()=>{const s=GAME.scene.scenes[0];return s.bHint&&s.bHint.scene?s.bHint.text:''});if(t)seen.add(t);if(i==12)await q.screenshot({path:'v116/t121_d.png'})}
console.log([...seen],errs);await b.close()})();
