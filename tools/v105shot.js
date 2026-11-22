const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game105.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
const W=ms=>p.waitForTimeout(ms);const go=async c=>{await p.evaluate(c=>{const s=GAME.scene.scenes[0];s.cdL={p:3,c:1,v:1,lv:10};s.codeGo(c)},c);await W(8000);await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt0=s.hurt;s.hurtN=[];s.hurt=(d,src)=>{s.hurtN.push(src)}})};
// 1) 집게왕 2페이즈 정동 지뢰
await go('c');
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.hp=m.mh*.49;m.st='idle';m.cd=99});await W(1700);
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.pl.body.reset(m.x+40,m.y+200);m.st='idle';m.cd=99;s.gdkPlant(m)});await W(900);await p.screenshot({path:'t105_bud1.png'});
await W(1600);await p.screenshot({path:'t105_bud2.png'});await W(1000);await p.screenshot({path:'t105_bud3.png'});
console.log('bloom hits',await p.evaluate(()=>GAME.scene.scenes[0].hurtN.join(',')));
const st=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.hurtN=[];s.pl.body.reset(m.x+20,m.y+230);m.st='idle';m.cd=99;s.gdkPlant(m);await new Promise(r=>setTimeout(r,700));const hp0=m.hp;const n0=m.bd.length;s.gdkCharge(m,1,0,.3);
 const seq=[];for(let i=0;i<20;i++){await new Promise(r=>setTimeout(r,60));seq.push(m.st)}return {n0,n1:m.bd.length,dhp:Math.round(hp0-m.hp),mh:m.mh,seq:[...new Set(seq)].join('>'),hits:s.hurtN.join(',')}});console.log('charge',st);
await p.screenshot({path:'t105_stag.png'});
// 2) 허기의 왕관
await go('p');
const r=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.pl.body.reset(250,250);m.st='crown';m.cd=99;s.hcRain(m,1);const g=[];for(let i=0;i<14;i++){await new Promise(r=>setTimeout(r,200));g.push(m.gone)}return {gone:g.join(''),st:m.st}});console.log('rain',r);
await p.screenshot({path:'t105_rain.png'});
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.pl.body.reset(400,300);s.pl.setVelocity(120,0)});await W(1800);
console.log('rain hits',await p.evaluate(()=>GAME.scene.scenes[0].hurtN.join(',')));
const mk=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='crown';m.cd=99;for(let i=0;i<3;i++){const f={t:'s',x:m.x+140+i*40,y:m.y+60,p:0,on:1,c:-1,r:-1};f.spr=s.add.image(f.x,f.y,'f_s').setDepth(5);s.cur.food.push(f)}
 s.pl.body.reset(120,300);const g0=m.gr||0,h0=m.hp;m.hp=m.mh*.5;m.st='markW';m.tm=.6;await new Promise(r=>setTimeout(r,1500));const n=s.cur.food.filter(f=>f.hm&&f.on).length;await new Promise(r=>setTimeout(r,3000));return {marked:n,g0,g1:m.gr,heal:Math.round((m.hp-m.mh*.5)/m.mh*100)}});console.log('mark',mk);
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='crown';m.cd=99;for(let i=0;i<2;i++){const f={t:'s',x:120+i*500,y:120,p:0,on:1,c:-1,r:-1};f.spr=s.add.image(f.x,f.y,'f_s').setDepth(5);s.cur.food.push(f)}m.st='markW';m.tm=.6});await W(1300);await p.screenshot({path:'t105_mark.png'});
// 3) 통째 삼키기 원래 그림 (다시 시작 두 번 뒤)
await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='scatter';m.tm=20;m.gone=0;s.pl.body.reset(m.x,m.y+90);s.ang=-Math.PI/2;s.skl='p';s.skCd=0;s.dvUse()});await W(100);await p.screenshot({path:'t105_dv.png'});
console.log('errs',errs);await b.close()})();
