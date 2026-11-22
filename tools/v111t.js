const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game111.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const r=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],w=ms=>new Promise(r=>setTimeout(r,ms));const out={mh:Math.round(m.mh)};
 s.inv=0;s.cry=2;m.st='idle';m.air=0;m.cd=99;m.x=400;m.y=150;s.pl.body.reset(400,290);const h0=m.hp;s.gdkCharge(m,1,0,.3);
 const SQ=[];let t0=0,t1=0;for(let i=0;i<80;i++){await w(50);SQ.push(m.st+':'+Math.round(Math.hypot(s.pl.x-m.x,s.pl.y-m.y)));if(m.st=='stun'&&!t0)t0=performance.now();if(t0&&m.st!='stun'&&!t1){t1=performance.now();break}}
 out.reflect=Math.round(h0-m.hp);out.cry=s.cry;out.sq=SQ.slice(0,14).join(' ');out.stunSec=+((t1-t0)/1000).toFixed(1);
 s.inv=1e9;s.hurt=()=>{};const n0=m.pt.filter(q=>q.on).length,f0=s.cur.food.filter(f=>f.on&&f.t=='c').length;for(const[x,y]of[[150,120],[650,120],[400,300]])s.gdkStal(m,x,y,1.4);await w(1200);
 out.pillarsAdded=m.pt.filter(q=>q.on).length-n0;out.shardsAdded=s.cur.food.filter(f=>f.on&&f.t=='c').length-f0;return out});
console.log(r,errs,'vpErr',await p.evaluate(()=>window.__vpErrN||0));await b.close()})();
