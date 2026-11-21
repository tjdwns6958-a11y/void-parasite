const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const mk=async(name,fn,wait=1200)=>{const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:2});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=2;let a=4242;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 await p.goto('file://'+__dirname+'/v40.html');await p.waitForTimeout(2500);
 await p.evaluate(fn);await p.waitForTimeout(wait);
 await p.screenshot({path:'bg/'+name+'.png'});
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.hudVis(false);const h=s.hud;s.hud=function(){h.apply(this,arguments);this.hudVis(false);this.gfx&&this.gfx.clear()}});await p.waitForTimeout(300);
 await p.screenshot({path:'bg/'+name+'_clean.png'});console.log(name,errs);await ctx.close()};
// 1구역: 먹이 많은 방으로 — 시작 방 그대로, 플레이어 위치 조정
await mk('z1',()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.pl.setPosition(330,200)});
// 2구역
await mk('z2',()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=8;s.lin={p:2,c:1,v:0};s.molts=3;s.recalc();s.wormSkin&&s.wormSkin();s.nextZone()},2500);
// 보스
await mk('boss',()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=13;s.lin={p:3,c:0,v:2};s.zi=2;s.molts=5;s.recalc();s.wormSkin&&s.wormSkin();s.en=s.emax;s.bossStart()},7000);
await b.close()})();
