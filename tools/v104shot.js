const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/'+(process.env.GF||'game104.html'),{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
const go=async c=>{await p.evaluate(c=>{const s=GAME.scene.scenes[0];s.cdL={p:3,c:1,v:1,lv:10};s.codeGo(c)},c);await p.waitForTimeout(8000)};
await go('c');await go('p');
// 통째 삼키기
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.inv=1e9;s.hurt=()=>{};m.st='scatter';m.tm=20;m.gone=0;s.pl.body.reset(m.x,m.y+90);s.ang=-Math.PI/2;s.skl='p';s.skCd=0;s.dvUse()});
await p.waitForTimeout(90);await p.screenshot({path:(process.env.OUT||'t104')+'_dv1.png'});await p.waitForTimeout(80);await p.screenshot({path:(process.env.OUT||'t104')+'_dv2.png'});
console.log('dvG ok',await p.evaluate(()=>{const s=GAME.scene.scenes[0];return !!(s.dvG&&s.dvG.scene)}));
if(!process.env.OUT){
await go('c');
const sh=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],c=s.cameras.main;s.inv=1e9;s.hurt=()=>{};const L=[];const o=c.shake;c.shake=function(d,i){L.push([d,i]);return o.apply(this,arguments)};
 m.hp=m.mh*.49;m.st='idle';m.cd=99;await new Promise(r=>setTimeout(r,1600));return {L,ball:!!m.ball,ph:m.ph}});console.log('rip',JSON.stringify(sh));
await p.waitForTimeout(100);await p.screenshot({path:'t104_rip.png'});
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='idle';m.cd=99;s.pl.body.reset(400,310);const R=Math.random;const seq=[.1,.5,.9];let i=0;
 [[200,200],[330,170],[470,200],[620,210]].forEach(([x,y],j)=>{const P=s.pl,ox=P.x,oy=P.y;P.x=x;P.y=y;Math.random=()=>j==0?.5:seq[(i++)%3];s.gdkDrop(m,v=>v,j+1);Math.random=R;P.x=ox;P.y=oy})});
await p.waitForTimeout(600);await p.screenshot({path:'t104_stal.png'});}
console.log('errs',errs);await b.close()})();
