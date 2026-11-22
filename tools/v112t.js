const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game112.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const W=ms=>p.waitForTimeout(ms);
// 돌진 반복: 플레이어가 맞지 않게(무적·수정 없음) → 돌진 몇 번?
const r1=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],w=ms=>new Promise(r=>setTimeout(r,ms));s.inv=1e9;s.hurt=()=>{};s.cry=0;m.air=0;m.st='idle';m.cd=99;m.x=400;m.y=150;s.pl.body.reset(400,290);
 s.gdkCharge(m,1,3);let n=0,prev='';for(let i=0;i<120;i++){await w(60);if(m.st=='chW'&&prev!='chW')n++;prev=m.st;if(m.st=='idle'&&n>0)break}return {charges:n,end:m.st}});console.log('dodged charges',r1);
// 두 번째 돌진에서 막기 → 기절 후 멈춤
const r2=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],w=ms=>new Promise(r=>setTimeout(r,ms));delete s.hurt;s.inv=0;s.cry=0;m.st='idle';m.cd=99;m.x=400;m.y=150;m.sbc=0;s.pl.body.reset(400,290);
 s.gdkCharge(m,1,3);let n=0,prev='',stunAt=0;const L=[];for(let i=0;i<140;i++){await w(60);L.push(m.st[0]+(s.cry));if(m.st=='chW'&&prev!='chW'){n++;if(n==2){s.cry=2;s.inv=0}}if(m.st=='stun'&&!stunAt)stunAt=n;prev=m.st;if(m.st=='idle'&&n>0)break}return {charges:n,stunAt,end:m.st,L:L.join('')}});console.log('blocked 2nd',r2);
// 종유석 기둥 + 부술 때 파편 20%
const r3=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],w=ms=>new Promise(r=>setTimeout(r,ms));s.inv=1e9;s.hurt=()=>{};s.pl.body.reset(60,300);m.st='idle';m.cd=99;
 const n0=m.pt.filter(q=>q.on&&q.tmp).length;s.gdkStal(m,320,110,1.4);s.gdkStal(m,480,300,1);s.gdkStal(m,400,300,.7);await w(300);const made=m.pt.filter(q=>q.on&&q.tmp).length-n0;
 let drops=0;const SF=s.gdkShardFly.bind(s);s.gdkShardFly=()=>{drops++};m.cdx=1;m.cdy=0;for(let i=0;i<200;i++){const q={x:400,y:200,hp:1,on:1,rt:0,tmp:1,life:1e9,o:s.add.image(400,200,'gdkP')};s.gdkSmash(m,q)}const q2={x:400,y:200,hp:1,on:1,rt:0,o:s.add.image(400,200,'gdkP')};let d0=drops;s.gdkSmash(m,q2);s.gdkShardFly=SF;
 return {stalPillars:made,tmpSmashDropRate:drops-(drops-d0)>=0?(d0/200).toFixed(2):0,origDrop:drops-d0}});console.log('stal',r3);
// 씹기 화면
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.inv=1e9;s.hurt=()=>{};m.st='idle';m.cd=99;m.x=400;m.y=160;s.pl.body.reset(400,260);s.gdkSnap(m,v=>v)});
{let k=0;for(const t of [250,450,40,250]){await W(t);await p.screenshot({path:'t112_bite_'+'abcd'[k++]+'.png'})}}
console.log(errs,'vpErr',await p.evaluate(()=>window.__vpErrN||0));await b.close()})();
