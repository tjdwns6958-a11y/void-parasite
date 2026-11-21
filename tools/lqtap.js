const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const res={};
for(const V of [1,2,3]){const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,hasTouch:true,isMobile:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(v=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=2;window.__vpLQ=v},V);
 await p.goto('file://'+__dirname+'/v42.html');await p.waitForTimeout(2500);
 const box=await p.evaluate(()=>{const r=GAME.canvas.getBoundingClientRect();return{l:r.left,t:r.top,w:r.width,h:r.height}});
 await p.touchscreen.tap(box.l+100*box.w/800,box.t+80*box.h/360);await p.waitForTimeout(500);
 const tree=await p.evaluate(()=>!!GAME.scene.scenes[0].treeO);
 // 진화 나무 닫고, 컷신(hudVis false) 중 퀘스트 글자가 숨는지
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.treeClose();s.hudVis(false)});await p.waitForTimeout(300);
 const hidden=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return Object.values(s.lqT||{}).every(t=>!t.visible)&&!s.xpT.visible});
 await p.evaluate(()=>GAME.scene.scenes[0].hudVis(true));await p.waitForTimeout(300);
 const shown=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return Object.values(s.lqT||{}).some(t=>t.visible)&&s.xpT.visible});
 res[V]={tree,hidden,shown,errs};await ctx.close()}
console.log(JSON.stringify(res));await b.close()})();
