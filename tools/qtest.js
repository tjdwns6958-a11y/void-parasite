const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const html=process.argv[2],runs=+process.argv[3]||6;
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const res=[];
for(let r=0;r<runs;r++){const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(seed=>{window.__vpNoTree=1;let a=seed*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},r+1);
 await p.goto('file://'+html);await p.waitForTimeout(900);
 const out=await p.evaluate(()=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=8;s.recalc();s.nextZone();
  const qr=s.lv.rooms.find(a=>a.el=='qn')||s.lv.rooms.find(a=>a.tr=='coral');if(!qr.en.some(e=>e.k=='qn')){qr.en.push({k:'qn',x:400,y:180,on:1,st:'idle'})}s.enter(qr);
  const m=s.cur.en.find(e=>e.k=='qn');s.inv=1e9;s.hurt=function(){};
  let T=G.loop.time||performance.now();G.loop.sleep();s.tweens.getDelta=function(){return 16.667*this.timeScale};
  const dt=1000/60;let stuck=0,maxStill=0,still=0,lx=m.x,ly=m.y,ang=0,inside=0;
  for(let i=0;i<60*120;i++){T+=dt;ang+=dt/1000*.6;s.pl.setPosition(400+Math.cos(ang)*150,190+Math.sin(ang)*80);s.en=s.emax;G.scene.update(T,dt);
   if(!m.on)break;
   if(i%30==0){const mv=Math.hypot(m.x-lx,m.y-ly);const dd=Math.hypot(s.pl.x-m.x,s.pl.y-m.y);if(m.st=='fight'&&(dd<118||dd>207)&&mv<1.5)still+=.5;else still=0;if(still>=2)stuck+=.5;maxStill=Math.max(maxStill,still);lx=m.x;ly=m.y;
    if(s.blk(m.x,m.y,26))inside++}}
  return {maxStill,stuckSec:stuck,inside,cor:(s.cur.cor||[]).filter(o=>o.on).length,alive:m.on}});
 out.errors=errs.slice(0,3);res.push(out);await p.close()}
console.log(JSON.stringify(res));await b.close()})();
