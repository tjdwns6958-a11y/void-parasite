const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const out=[];
for(let seed=1;seed<=5;seed++){const p=await b.newPage({viewport:{width:800,height:360}});
 await p.addInitScript(sd=>{window.__vpNoTree=1;window.__vpZ=1;let a=sd*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},seed);
 await p.goto('file:///home/claude/play/game114.html');await p.waitForFunction(()=>window.GAME&&GAME.scene.scenes[0]&&GAME.scene.scenes[0].pl,null,{timeout:30000});await p.waitForTimeout(500);
 out.push(await p.evaluate(()=>{const s=GAME.scene.scenes[0],c={};for(const r of s.lv.rooms)for(const e of r.en){const k=e.k||'kha';c[k]=(c[k]||0)+1}const flow=s.lv.rooms.filter(r=>r.tr=='flow').length;return {c,flow,lampreysMax:c.lmp+flow*4,husks:Object.entries(c).filter(([k])=>!['lmp','lsp','vdl'].includes(k)).reduce((a,[,v])=>a+v,0)}}));await p.close()}
console.log(JSON.stringify(out));await b.close()})();
