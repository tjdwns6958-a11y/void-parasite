const {chromium}=require('playwright');const GF=process.argv[2]||'game126.html',TAG=process.argv[3]||'n',OUT='v128mo/';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
const W=ms=>p.waitForTimeout(ms);const S=(f,a)=>p.evaluate(f,a);
await p.addInitScript(()=>{window.__vpZ=1;window.__vpNoSave=1;let a=12345;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
await p.goto('file:///home/claude/play/'+GF);await W(4500);await p.mouse.click(400,338);await W(800);await p.mouse.click(400,338);await W(1500);
await S(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.inv=1e9;s.hurt=()=>{};GAME.loop.sleep();window.__T=performance.now();window.STEP=n=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}}});
const setup=fn=>S(fn);
const shoot=async(name,n,every,clip)=>{for(let i=0;i<n;i++){await S(k=>STEP(k),every);await p.screenshot({path:`${OUT}${TAG}_${name}_${String(i).padStart(3,'0')}.png`,clip})}};
// 공통: 빈 방 하나를 골라 적·먹이 비우고 원하는 것만 둠
let RI=0;const room0=()=>`const s=GAME.scene.scenes[0];const R=s.lv.rooms.filter(r=>r!==s.lv.start&&!r.en.some(e=>e.k=='lmp')&&!r.en.some(e=>e.k=='rek')&&r.t!='dark'&&!r.vt),a=R[${RI++}%R.length];a.en=[];a.food=[];`;
// 3) 땅울음: 올라와서 쫓기·물기 → 파고들기 → 땅속에서 쫓다가 솟구치기
await setup(new Function(room0()+`a.en=[{k:'rek',x:400,y:150,hp:60,lv:2,on:1,st:'up',skn:.2}];s.enter(a);s.pl.body.reset(400,250);s.pl.setVelocity(0,0);const m=s.cur.en[0];m.st='up';m.tm=99;m.rest=0;m.cd=.6;m.spr.setTexture(s.skin(m,'rek')).setDepth(9).setScale(1);`));
await shoot('rekbite',45,2,{x:280,y:90,width:240,height:220});
await S(()=>{const s=GAME.scene.scenes[0];const m=s.cur.en[0];s.pl.body.reset(400,330);m.st='dig';m.tm=.5});
await shoot('rekdig',16,2,{x:280,y:60,width:240,height:220});
await S(()=>{const s=GAME.scene.scenes[0];const m=s.cur.en[0];m.st='under';m.cd=0;m.x=200;m.y=200;s.pl.body.reset(470,170);m.lx=470;m.ly=170;m.trk=2;s.vx=100;s.vy=0});
await shoot('rekwarn',36,2,{x:160,y:60,width:380,height:260});
await S(()=>{const s=GAME.scene.scenes[0];const m=s.cur.en[0];m.x=s.pl.x-50;m.y=s.pl.y;m.trk=2;m.lx=s.pl.x;m.ly=s.pl.y;m.cd=0});
await shoot('rekerupt',50,2,{x:300,y:40,width:340,height:280});
console.log('clods',await S(()=>GAME.scene.scenes[0].children.list.filter(o=>o.type=='Rectangle'&&o.strokeColor==0x16101e).length));
console.log('errs',errs,await S(()=>window.__vpErrN||0));await b.close()})();
