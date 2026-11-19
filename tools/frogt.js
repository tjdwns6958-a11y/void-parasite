const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1});await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(2000);
const r=await p.evaluate(async()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();const out={};
 const bigs=()=>s.cur.food.filter(f=>f.on&&f.spr&&f.st&&['sit','crouch','air','land'].includes(f.st));
 for(const D of [320,210,120,55]){out[D]=[];
  for(let rep=0;rep<12&&out[D].length<5;rep++){const B=bigs();if(!B.length){out[D].push('no frog');break}const f=B[0];f.x=400;f.y=180;f.st='sit';f.tm=.05;
   s.pl.setPosition(400-D,180);let x0=null;const t0=performance.now();
   while(performance.now()-t0<2500){await new Promise(r=>setTimeout(r,16));s.pl.setPosition(f.x-D,f.y);s.pl.setVelocity(0,0);if(f.st=='air'&&x0==null)x0=[f.x,f.y];if(f.st=='land'&&x0){out[D].push(Math.round(Math.hypot(f.x-x0[0],f.y-x0[1])));break}}}}
 return out});
console.log(JSON.stringify(r),errs);await b.close()})();
