const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game115.html');await p.waitForFunction(()=>window.GAME&&GAME.scene.scenes[0]&&GAME.scene.scenes[0].pl,null,{timeout:30000});await p.waitForTimeout(800);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:0,v:3,lv:10};s.codeGo('v')});await p.waitForTimeout(8500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;window.H={};s.hurt=(d,src)=>{H[src]=(H[src]||0)+1};const m=s.cur.en[0];m.hp=m.mh*.59;s.pl.body.reset(400,300)});await p.waitForTimeout(6500);
// 나선
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];(s.mbb||[]).forEach(q=>q.o.destroy());s.mbb=[];s.tel=[];m.st='spW';m.tm=.5;m.sa=1;m.st2=0;m.sp2=0;m.sf=.4;m.vn=0;m.sseed=0;m.cd=99;s.pl.body.reset(560,290)});
await p.waitForTimeout(1500);await p.screenshot({path:'t115_spiral.png'});await p.waitForTimeout(1400);await p.screenshot({path:'t115_spiral2.png'});
// 고리
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];(s.mbb||[]).forEach(q=>q.o.destroy());s.mbb=[];m.st='idle';m.cd=99;s.obsNRing(m,s.obsNOff(m),v=>v,0)});await p.waitForTimeout(800);await p.screenshot({path:'t115_ring.png'});
// 촉수: 잡기 후 안 끊음 → 남은 촉수 내려찍기
const r=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],w=ms=>new Promise(r=>setTimeout(r,ms));(s.mbb||[]).forEach(q=>q.o.destroy());s.mbb=[];window.H={};s.pl.body.reset(330,300);m.root=0;
 m.st='idle';m.cd=0;m.hdc=1e12;const R=Math.random;let c=0;Math.random=()=>(c++<1?.4:R());await w(80);Math.random=R;const st0=m.st;
 await w(3200);const lg=!!m.lg,n=m.lg?m.lg.list.length:0;m.cd=99;return {st0,lg,n}});console.log('grab→linger',r);
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='spW';m.tm=.5;m.sa=1;m.st2=0;m.sp2=0;m.sf=.4;m.vn=0;s.pl.body.reset(300,290)});
let shots=0;for(let i=0;i<12;i++){await p.waitForTimeout(250);const st=await p.evaluate(()=>{const m=GAME.scene.scenes[0].cur.en[0];return m.lg?m.lg.list.map(t=>t.st).join(','):'none'});if(/aim/.test(st)&&shots<1){await p.screenshot({path:'t115_slamW.png'});shots++}if(/lie/.test(st)&&shots<2&&shots>=1){await p.screenshot({path:'t115_lie.png'});shots++}}
console.log('hits',await p.evaluate(()=>H),'linger now',await p.evaluate(()=>{const m=GAME.scene.scenes[0].cur.en[0];return m.lg?m.lg.list.map(t=>t.st+(t.dead?'x':'')).join(','):'ended'}),errs,'vpErr',await p.evaluate(()=>window.__vpErrN||0));await b.close()})();
