const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const out={};
for(const [f,noaim] of [['v49.html',1],['v50.html',1],['v50.html',0]]){const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(n=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=1;if(n)window.__vpNoAim=1},noaim);
 await p.goto('file://'+__dirname+'/'+f);await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const s=GAME.scene.scenes[0];GAME.loop.sleep();const p=s.pl,res={};
  for(const dist of [30,50]){for(const deg of [0,30,45,55,70]){s.ang=0;const a=deg*Math.PI/180,m={on:1,k:'kha',x:p.x+Math.cos(a)*dist,y:p.y+Math.sin(a)*dist,spr:{visible:true}};s.cur.en.push(m);
   if(s.aimAssist)s.aimAssist();const fx=Math.cos(s.ang),fy=Math.sin(s.ang);res[dist+'/'+deg]=s.inBite(m.x-p.x,m.y-p.y,fx,fy,0)?'O':'x';s.cur.en.pop()}}return res});
 out[f+(noaim?' 보정끔':' 보정켬')]={r,errs};await p.close()}
console.log(JSON.stringify(out,null,0));await b.close()})();
