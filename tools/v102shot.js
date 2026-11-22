const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
const open=async(code,lv)=>{const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
 await p.goto('file:///home/claude/play/game102.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);await p.evaluate(([c,l])=>{const s=GAME.scene.scenes[0];s.cdL=l;s.codeGo(c)},[code,lv]);await p.waitForTimeout(8000);
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{}});return p};
// 1) 공허 2페이즈 촉수 + 흔들림 기록
let p=await open('v',{p:1,c:0,v:3,lv:10});let E=f=>p.evaluate(f);
await E(()=>{const s=GAME.scene.scenes[0],c=s.cameras.main;window.SH=[];const o=c.shake;c.shake=function(d,i){window.SH.push([Math.round(d),+(i||0).toFixed(4)]);return o.apply(this,arguments)};s.pl.body.reset(400,300);const m=s.cur.en[0];m.hp=m.mh*.59});
await p.waitForTimeout(6000);
await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];(s.mbb||[]).forEach(q=>q.o.destroy());s.mbb=[];s.emPull=null;s.tel=[];m.st='idle';m.cd=0;m.hdc=1e12;window.__R=Math.random;Math.random=(()=>{let i=0;return()=>[.4,.3,.3,.3,.3,.3,.3][i++%7]})();s.pl.body.reset(330,300)});
await p.waitForTimeout(350);await p.screenshot({path:'t102_grabW.png'});await p.evaluate(()=>{Math.random=window.__R});
await p.waitForTimeout(330);await p.screenshot({path:'t102_lash1.png'});await p.waitForTimeout(150);await p.screenshot({path:'t102_lash2.png'});await p.waitForTimeout(500);await p.screenshot({path:'t102_lash3.png'});
console.log('shake(void)',JSON.stringify(await E(()=>window.SH)));await p.close();
// 2) 허기의 왕관 회전 + 유충 삼키기
p=await open('p',{p:3,c:1,v:0,lv:10});E=f=>p.evaluate(f);
const r2=await E(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.pl.body.reset(600,280);m.st='spinW';m.tm=.8;m.spc=s.time.now+8000;m.jw.forEach(j=>{j.st='spin'});
 const W=ms=>new Promise(r=>setTimeout(r,ms));const g0=m.gr||0;await W(900);
 for(let i=0;i<2;i++){const f={t:'s',x:m.x+20+i*10,y:m.y+10,p:0,on:1,c:-1,r:-1};f.spr=s.add.image(f.x,f.y,'f_s').setDepth(5);s.cur.food.push(f)}await W(300);return {g0,g1:m.gr,st:m.st,srot:+m.srot.toFixed(1)}});
await p.screenshot({path:'t102_hcr.png'});console.log('hcr',r2);
// 갑각 재사용
console.log('carapace',await E(()=>{const s=GAME.scene.scenes[0];s.lin.c=3;s.lin.p=0;s.bcd=0;const dk=s.domK();s.cryAtk(1);const a=+s.bcd.toFixed(2);s.lin.c=0;s.lin.p=3;s.bcd=0;s.cryAtk(0);return {dk,cBcd:a,pBcd:+s.bcd.toFixed(2)}}));
await p.close();
// 3) 종유석
p=await open('c',{p:1,c:3,v:0,lv:10});E=f=>p.evaluate(f);
await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='idle';m.cd=99;s.pl.body.reset(400,300);m.pt=m.pt||[];[[250,200],[400,170],[560,220]].forEach(([x,y],i)=>{s.pl.body.velocity.x=0;const P=s.pl;const ox=P.x,oy=P.y;P.x=x;P.y=y;s.gdkDrop(m,v=>v,i*3);P.x=ox;P.y=oy})});
for(const t of [150,450,750]){await p.waitForTimeout(t==150?150:300);await p.screenshot({path:'t102_stal_'+t+'.png'})}
console.log('kid hp',await E(()=>{const s=GAME.scene.scenes[0];return /life:9,wd:0,hp:1,/.test(document.documentElement.innerHTML)}));
await p.close();console.log('errs',errs.slice(0,5));await b.close()})();
