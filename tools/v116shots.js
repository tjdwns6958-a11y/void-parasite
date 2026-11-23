const {chromium}=require('playwright');
const GF=process.env.GF||'game115.html',OUT=process.env.OUT||'v116/cur';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1;let a=7919*3;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
await p.goto('file:///home/claude/play/'+GF);await p.waitForFunction(()=>window.GAME&&GAME.scene.scenes[0]&&GAME.scene.scenes[0].pl,null,{timeout:30000});await p.waitForTimeout(800);
if(process.env.Z2){await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.inv=1e9;s.nextZone()});await p.waitForTimeout(4500)}
const info=await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.inv=1e9;return s.lv.rooms.map((r,i)=>i+':'+r.tr+':'+r.en.map(e=>e.k).join(',')+':'+r.food.map(f=>f.t).join(''))});
console.log(info.join('\n'));
const want=(process.env.ROOMS||'').split(',').filter(Boolean).map(Number);
const idx=want.length?want:info.map((_,i)=>i).slice(0,8);
for(const i of idx){await p.evaluate(i=>{const s=GAME.scene.scenes[0];if(!s.lv.rooms[i])return;s.enter(s.lv.rooms[i]);s.pl.body.reset(400,300);s.inv=1e9},i);await p.waitForTimeout(1500);await p.screenshot({path:`${OUT}_r${i}.png`})}
console.log(errs);await b.close()})();
