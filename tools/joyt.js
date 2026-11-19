const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:2,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text().slice(0,120))});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;let a=12345;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.pl.setPosition(520,250)});await p.waitForTimeout(300);
await p.screenshot({path:'j0_hint.png'});
const pos=()=>p.evaluate(()=>{const s=GAME.scene.scenes[0];return[Math.round(s.pl.x),Math.round(s.pl.y),s.jo&&[Math.round(s.jo.x),Math.round(s.jo.y)]]});
console.log('start',await pos());
await p.mouse.move(260,250);await p.mouse.down();await p.mouse.move(290,236,{steps:4});await p.waitForTimeout(500);
await p.screenshot({path:'j1_drag.png'});console.log('drag',await pos());
await p.mouse.move(400,236,{steps:6});await p.waitForTimeout(300);console.log('far drag (ring follows)',await pos());
await p.mouse.move(380,236,{steps:2});await p.mouse.move(372,240,{steps:2});await p.waitForTimeout(400);console.log('half push',await pos());
await p.mouse.up();await p.waitForTimeout(500);await p.screenshot({path:'j2_up.png'});console.log('released',await pos());
// 섭취 버튼 판정
await p.mouse.move(752,310);await p.mouse.down();await p.waitForTimeout(150);const eat=await p.evaluate(()=>!!(GAME.scene.scenes[0].eat));await p.mouse.up();console.log('eat pressed',eat);
console.log('errors',errs);await b.close()})();
