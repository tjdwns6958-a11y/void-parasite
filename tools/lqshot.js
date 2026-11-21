const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const out={};
for(const V of [1,2,3]){for(const sc of ['a','b']){
 const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:2,hasTouch:true,isMobile:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(v=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=2;window.__vpLQ=v;let a=4242;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},V);
 await p.goto('file://'+__dirname+'/v42.html');await p.waitForTimeout(2500);
 await p.evaluate(sc=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.pl.setPosition(400,230);
  if(sc=='a'){s.plv=3;s.xp=Math.round(s.xpn()*.62);s.org=13;s.mn=16;s.ve=1}   // 장면 A: 처음 — 갑각 탈피 가능
  else{s.plv=9;s.xp=Math.round(s.xpn()*.3);s.lin={p:3,c:0,v:1};s.molts=4;s.zi=2;s.recalc&&s.recalc();s.wormSkin&&s.wormSkin();s.org=s.spO+27;s.mn=s.spM+10;s.ve=s.spV+3;s.t0-=30000}}, sc);   // 장면 B: 2구역 포식2·갑각1
 await p.waitForTimeout(900);await p.screenshot({path:`lq${V}${sc}.png`});
 out[V+sc]={errs,info:await p.evaluate(()=>{const s=GAME.scene.scenes[0];return LK.map(k=>{const q=s.lqInfo(k);return q.st+':'+q.tx})})};await ctx.close()}}
console.log(JSON.stringify(out));await b.close()})();
