const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
for(const GF of ['game114.html','game115.html']){const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=2});await p.goto('file:///home/claude/play/'+GF);await p.waitForFunction(()=>window.GAME&&GAME.scene.scenes[0]&&GAME.scene.scenes[0].pl,null,{timeout:30000});await p.waitForTimeout(800);
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:3,c:2,v:1,lv:12};s.codeGo('sw')});await p.waitForTimeout(9000);
 const z=[];await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};const m=s.cur.en.find(e=>e.k=='sw');m.ph=2;m.st='idle';m.hp=0;s.kill(m)});
 for(let i=0;i<18;i++){await p.waitForTimeout(700);z.push((await p.evaluate(()=>GAME.scene.scenes[0].cameras.main.zoom)).toFixed(2))}
 await p.screenshot({path:GF.replace('.html','')+'_end.png'});console.log(GF,'zoom over time',z.join(' '),errs);await p.close()}
await b.close()})();
