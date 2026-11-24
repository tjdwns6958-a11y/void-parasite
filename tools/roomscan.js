const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const out=[];
for(let seed=1;seed<=4;seed++){const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+((e.stack||'').split('\n')[1]||'').trim()));
 await p.addInitScript(sd=>{window.__vpNoTree=1;window.__vpZ=1;let a=sd*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},seed);
 await p.goto('file:///home/claude/play/'+(process.env.GF||'game114.html'));await p.waitForFunction(()=>window.GAME&&GAME.scene.scenes[0]&&GAME.scene.scenes[0].pl,null,{timeout:30000});await p.waitForTimeout(800);
 for(const zone of [1,2]){
  const r=await p.evaluate(async(zone)=>{const s=GAME.scene.scenes[0],w=ms=>new Promise(r=>setTimeout(r,ms));if(s.hint)s.hint.destroy();s.inv=1e9;
   if(zone==2){try{s.nextZone()}catch(e){return {err:'nextZone '+e.message}}await w(4000);s.inv=1e9}
   const types={};for(const rm of s.lv.rooms){try{s.enter(rm);s.pl.body.reset(400,180);s.inv=1e9}catch(e){return {err:'enter '+rm.tr+' '+e.message}}await w(700);types[rm.tr]=(types[rm.tr]||0)+1}
   return {types,vpErr:window.__vpErrN||0,box:(document.getElementById('vpErrBox')||{}).textContent||''}},zone);
  out.push({seed,zone,...r,errs:errs.splice(0)})}
 await p.close()}
console.log(JSON.stringify(out,null,0));await b.close()})();
