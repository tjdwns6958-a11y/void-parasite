const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:2});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoSave=1;window.__vpZ=2;window.__vpJoyUsed=1});
await p.goto('file://'+__dirname+'/v60.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
const st=async()=>p.evaluate(()=>{const s=GAME.scene.scenes[0];return {bs:!!s.bsO,pg:s.bsO&&s.bsO.pg,tree:!!s.treeO,paused:s.paused,help:!!s.hpO,pz:!!s.pzo}});
const shot=async n=>{await p.waitForTimeout(400);await p.screenshot({path:__dirname+'/ui_'+n+'.png'})};
await shot('1_slide1');console.log('start',JSON.stringify(await st()));
// 넘기기(스와이프)
await p.mouse.move(600,180);await p.mouse.down();await p.mouse.move(400,185,{steps:5});await p.mouse.up();await shot('2_slide2');console.log('swipe',JSON.stringify(await st()));
await p.mouse.click(400,338);await p.waitForTimeout(300);console.log('start btn',JSON.stringify(await st()));
// 진화 나무 (상태 꾸미기)
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.lin={p:1,c:2,v:0};s.molts=3;s.recalc();s.wormSkin();s.skl='c';s.treeOpen()});await shot('3_tree');
await p.mouse.click(568,258);await shot('4_tree_sel');await p.mouse.click(550,75);await shot('5_tree_card');await p.mouse.click(300,60);await p.mouse.click(300,60);await p.waitForTimeout(300);console.log('tree closed',JSON.stringify(await st()));
// 일시정지 → 게임 설명
await p.mouse.click(264,30);await shot('6_pause');await p.mouse.click(560,140);await shot('7_help');console.log('help',JSON.stringify(await st()));
await p.mouse.click(240,170);await shot('8_help_tree');await p.mouse.click(770,25);await p.waitForTimeout(300);console.log('tree from help closed',JSON.stringify(await st()));
await p.mouse.click(560,170);await shot('9_help_bs');await p.mouse.click(400,338);await p.mouse.click(400,338);await p.waitForTimeout(300);console.log('bs closed',JSON.stringify(await st()));
await p.mouse.click(400,310);await p.waitForTimeout(300);console.log('help back',JSON.stringify(await st()));await p.mouse.click(240,140);await p.waitForTimeout(300);console.log('resume',JSON.stringify(await st()));
console.log('errs',JSON.stringify(errs));await b.close()})();
