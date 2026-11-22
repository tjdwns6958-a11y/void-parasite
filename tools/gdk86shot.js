const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game86.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const E=f=>p.evaluate(f);
await E(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};s.tel=[];const m=s.cur.en[0];m.st='idle';m.cd=99;m.x=400;m.y=140;s.pl.body.reset(400,300);GAME.loop.sleep();window.T=performance.now();window.stp=n=>{for(let i=0;i<n;i++){T+=16.7;GAME.step(T,16.7)}}});
const crop={x:520,y:110,width:560,height:300};
for(let i=0;i<4;i++){await E(i=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.x+=9;m.wd=i*9;stp(1)},i);await p.screenshot({path:'gk_w'+i+'.png',clip:{x:crop.x/2+(i*9)/1,y:crop.y/2,width:280,height:150}})}
await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];const D=v=>Math.round(v*m.df);s.gdkSlam(m,D,1);stp(20)});await p.screenshot({path:'gk_raise.png'});
await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.tel=[];m.st='idle';m.cd=99;m.x=470;m.y=180;s.gdkStun(m,m.pt[3],false);stp(14)});await p.screenshot({path:'gk_drop.png'});
await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.pl.body.reset(m.x,m.y+64);s.ang=-Math.PI/2;stp(2);s.bcd=0;s.cry=2;s.cryAtk(1);stp(5)});await p.screenshot({path:'gk_slam.png'});
console.log(errs);await b.close()})();
