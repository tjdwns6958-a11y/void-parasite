const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game110.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const W=ms=>p.waitForTimeout(ms);
// 1) 돌진이 기둥을 부숨
const r1=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],w=ms=>new Promise(r=>setTimeout(r,ms));s.inv=1e9;s.hurt=()=>{};s.cry=0;m.air=0;m.st='idle';m.cd=99;m.x=400;m.y=150;
 const q=m.pt[2];s.pl.body.reset(q.x+(q.x-400)*.9,q.y+(q.y-150)*.9);const f0=s.cur.food.filter(f=>f.on&&f.t=='c').length;s.gdkCharge(m,1,0,.3);const sts=[];for(let i=0;i<20;i++){await w(60);sts.push(m.st)}await w(900);
 return {pillarOn:q.on,shards:s.cur.food.filter(f=>f.on&&f.t=='c').length-f0,states:[...new Set(sts)].join('>')}});console.log('smash',r1);
await p.screenshot({path:'t110_smash.png'});
// 2) 수정 방패로 돌진 막기 → 기절
const r2=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],w=ms=>new Promise(r=>setTimeout(r,ms));delete s.hurt;s.inv=0;s.cry=2;m.st='idle';m.cd=99;m.x=400;m.y=150;s.pl.body.reset(400,290);s.gdkCharge(m,1,0,.3);
 const sts=[];for(let i=0;i<25;i++){await w(60);sts.push(m.st)}return {states:[...new Set(sts)].join('>'),cry:s.cry,hp:Math.round(s.en)}});console.log('block-stun',r2);
await p.screenshot({path:'t110_stun.png'});
// 3) 종유석 기둥 고정 · 최대 5
const r3=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],w=ms=>new Promise(r=>setTimeout(r,ms));s.inv=1e9;s.hurt=()=>{};s.pl.body.reset(60,300);m.st='idle';m.cd=99;
 const pts=[[120,100],[300,110],[480,110],[660,110],[150,220],[650,220],[400,300]];for(const[x,y]of pts)s.gdkStal(m,x,y,1);await w(500);return {tmp:m.pt.filter(q=>q.tmp&&q.on).length,life:m.pt.filter(q=>q.tmp).map(q=>q.life>1e8).every(Boolean)}});console.log('stal pillars',r3);
await W(300);await p.screenshot({path:'t110_pillars.png'});
// 4) 씹기 · 큰 집게
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='idle';m.cd=99;m.x=400;m.y=160;s.pl.body.reset(400,260);s.gdkSnap(m,v=>v)});await W(600);await p.screenshot({path:'t110_chew.png'});
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.ph=2;m.st='idle';m.cd=99;s.pl.body.reset(300,280);s.gdkSweep(m,v=>v,1)});await W(500);await p.screenshot({path:'t110_sweepW.png'});await W(470);await p.screenshot({path:'t110_sweep.png'});
console.log(errs,'vpErr',await p.evaluate(()=>window.__vpErrN||0));await b.close()})();
