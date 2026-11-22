const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game109.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const r=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0],W=ms=>new Promise(r=>setTimeout(r,ms));m.st='stun';m.tm=99;m.air=0;m.cd=99;s.pl.body.reset(m.x+20,m.y+90);await W(100);
 const out={};s.cry=0;for(let i=0;i<3;i++){const f={t:'c',x:s.pl.x,y:s.pl.y,p:0,on:1,c:-1,r:-1};f.spr=s.add.image(f.x,f.y,'f_c');s.cur.food.push(f);s.consume(f)}out.cryAfter3=s.cry;
 const T=(src,far)=>{s.cry=2;s.inv=0;if(far)s.pl.body.reset(m.x+320,m.y+150);else s.pl.body.reset(m.x+20,m.y+90);const h0=m.hp,e0=s.en;s.hurt(20,src,m);return {cry:s.cry,taken:Math.round(e0-s.en),refl:Math.round(h0-m.hp)}};
 out.charge=T('정동 집게왕의 돌진');await W(600);out.snap=T('작은 집게');await W(600);out.bubble=T('거품 분사');await W(600);out.stal=T('떨어지는 종유석');await W(600);out.kid=T('수정 새끼 게');await W(600);out.farSnap=T('작은 집게',1);await W(600);
 // 기둥 파편
 m.st='idle';const q=m.pt.find(q=>q.on&&!q.tmp)||m.pt.find(q=>q.on);q.hp=3;const n0=s.cur.food.filter(f=>f.on&&f.t=='c').length;s.gdkStun(m,q,0);await W(1200);out.shards=s.cur.food.filter(f=>f.on&&f.t=='c').length-n0;
 return out});console.log(JSON.stringify(r,null,0));await p.screenshot({path:'t109_shards.png'});
console.log(errs,'vpErr',await p.evaluate(()=>window.__vpErrN||0));await b.close()})();
