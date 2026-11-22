const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
const open=async(code,lv)=>{const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
 await p.goto('file:///home/claude/play/game87.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);await p.evaluate(([c,l])=>{const s=GAME.scene.scenes[0];s.cdL=l;s.codeGo(c)},[code,lv]);await p.waitForTimeout(8000);
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;window.stp=n=>0});return p};const W=ms=>new Promise(r=>setTimeout(r,ms));
// 공허
let p=await open('v',{p:1,c:0,v:3,lv:10});const E=f=>p.evaluate(f);
await E(()=>{const s=GAME.scene.scenes[0];s.hurt=()=>{};s.pl.body.reset(400,300);const m=s.cur.en[0];m.hp=m.mh*.59;stp(1)});
const ts=[.35,.95,1.45,1.9,2.55,3.1];const t0=Date.now();for(const t of ts){const w=t*1000-(Date.now()-t0);if(w>0)await p.waitForTimeout(w);await p.screenshot({path:'r87_'+t+'.png'})}
await p.waitForTimeout(700);
await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='spW';m.tm=.5;m.sa=1;m.st2=0;s.pl.body.reset(300,300)});await p.waitForTimeout(250);await p.screenshot({path:'w87_sp.png'});
await p.waitForTimeout(900);await p.screenshot({path:'w87_orb.png'});
await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];(s.mbb||[]).forEach(q=>q.o.destroy());s.mbb=[];m.st='hideW';m.tm=.7});await p.waitForTimeout(420);await p.screenshot({path:'w87_hide.png'});
await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];(s.mbb||[]).forEach(q=>q.o.destroy());s.mbb=[];s.emPull=null;s.tel=[];m.st='idle';m.cd=0;m.hdc=1e12;Math.random=(()=>{let i=0;return()=>[.4,.3,.3,.3,.3,.3,.3][i++%7]})();s.pl.body.reset(330,300)});await p.waitForTimeout(450);await p.screenshot({path:'w87_grabW.png'});
await p.waitForTimeout(220);await p.screenshot({path:'w87_lash1.png'});await p.waitForTimeout(90);await p.screenshot({path:'w87_lash2.png'});
await p.close();
// 허기의 왕관 피격 + miss
p=await open('p',{p:3,c:1,v:0,lv:10});
await E.call(null,()=>0).catch(()=>0);
const E2=f=>p.evaluate(f);
await E2(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='scatter';m.tm=9;m.gone=0;s.pl.body.reset(m.x,m.y+75);s.ang=-Math.PI/2;s.bcd=0;s.req=1});await p.waitForTimeout(60);await p.screenshot({path:'h87_hit.png'});
await E2(()=>{const s=GAME.scene.scenes[0];s.inv=0;s.dshCd=0;s.dshReq=1;setTimeout(()=>s.hurt(10,'t'),40)});await p.waitForTimeout(200);await p.screenshot({path:'h87_miss.png'});
console.log(errs.slice(0,5));await b.close()})();
