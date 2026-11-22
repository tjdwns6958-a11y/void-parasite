const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game107.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:3,c:1,v:1,lv:10};s.codeGo('p')});await p.waitForTimeout(8000);
console.log('still',await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.pl.body.reset(200,280);m.st='crown';m.cd=99;let n=0;s.hurt=(d,src)=>{if(src.includes('내리꽂기'))n++;s.inv=0};s.hcRain(m,1);await new Promise(r=>setTimeout(r,3600));return n}));
const rp=p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.inv=1e9;s.hurt=()=>{};s.cur.food.forEach(f=>{if(f.spr&&f.on&&(f.t=='s'||f.t=='l')){f.on=0;f.spr.destroy();f.spr=null}});m.x=400;m.y=170;m.hp=m.mh*.5;m.gr=0;
 for(const[x,y]of[[560,230],[130,120]]){const f={t:'s',x,y,p:0,on:1,c:-1,r:-1};f.spr=s.add.image(x,y,'f_s').setDepth(5);s.cur.food.push(f)}s.pl.body.reset(200,300);m.st='crown';m.cd=0;m.ns=0;m.spc=0;
 m.ns++;m.st='spinW';m.tm=.8;m.spc=s.time.now+8000;const mk=s.hcMarkable()&&(s.hcMarkGo(m,1),1);s.dtx(m.x,m.y-50,mk?'회전 베기 — 표식 유충을 먼저 먹을 것!':'회전 베기 — 원 밖으로!','#ff5a7a');m.jw.forEach(j=>{j.st='spin'});await new Promise(r=>setTimeout(r,60));const st0=m.st,mk2=s.cur.food.filter(f=>f.hm&&f.on).map(f=>[Math.round(f.spr.x),Math.round(f.spr.y)]);
 window.__shot=1;const path=[];for(let i=0;i<10;i++){await new Promise(r=>setTimeout(r,400));path.push([Math.round(m.x),Math.round(m.y),m.st].join('/'))}
 return {st0,mk:mk2,path:path.join(' '),gr:m.gr,hp:Math.round(m.hp/m.mh*100),left:s.cur.food.filter(f=>f.hm&&f.on).length}});
await p.waitForTimeout(1700);await p.screenshot({path:'t107_spin.png'});const r=await rp;console.log(r);
console.log(errs,'vpErr',await p.evaluate(()=>window.__vpErrN||0));await b.close()})();
