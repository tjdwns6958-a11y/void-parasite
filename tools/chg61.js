const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:2});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=2;window.__vpJoyUsed=1});await p.goto('file://'+__dirname+'/v61.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();const rm=s.lv.rooms.find(r=>r.en.some(m=>!m.k));s.enter(rm);GAME.loop.sleep();let T=performance.now();window.st=n=>{for(let i=0;i<n;i++){T+=16.667;GAME.step(T,16.667)}};st(3);
 s.foe=function(){for(const m of this.cur.en)if(m.on&&m.spr)m.spr.setPosition(m.x,m.y)};const M=s.cur.en.find(o=>!o.k);s.cur.en.forEach(m=>{if(m!==M){m.on=0;if(m.spr)m.spr.setVisible(false)}});s.cur.food.forEach(f=>{if(f.spr)f.spr.setVisible(false);f.on=0});
 s.lin={p:0,c:3,v:1};s.recalc();s.wormSkin();window.__vpNoAim=1;const K=s.k.SPACE;const out={};
 const place=()=>{M.x=414;M.y=200;M.hp=999;M.mh=999;M.spr.setPosition(414,200);s.pl.body.reset(378,200);s.ang=0;s.hd.setRotation(0);s.sp.forEach((q,i)=>{q.x=378-8*(i+1);q.y=204});s.inv=99;s.bcd=0;st(5)};
 // 짧게(탭)
 place();let h0=M.hp;K.isDown=true;st(3);K.isDown=false;st(30);out.tap=+(h0-M.hp).toFixed(1);
 // 0.6초 차지
 place();h0=M.hp;K.isDown=true;st(36);out.half_spd=Math.round(Math.hypot(s.pl.body.velocity.x,s.pl.body.velocity.y));K.isDown=false;st(30);out.half=+(h0-M.hp).toFixed(1);
 // 1.2초 이상 차지 (중간에 화면 찍기용으로 멈춤)
 place();h0=M.hp;K.isDown=true;st(80);window.__h0=h0;window.__M=M;return out});
await p.screenshot({path:__dirname+'/chg_full.png'});
const r2=await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.k.SPACE.isDown=false;st(4);return null});await p.screenshot({path:__dirname+'/chg_hit.png'});
const r3=await p.evaluate(()=>{st(30);return +(__h0-__M.hp).toFixed(1)});
// 일반(포식) 공격력 비교
const r4=await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.lin={p:3,c:0,v:1};s.recalc();s.wormSkin();const M=__M;M.x=414;M.y=200;M.hp=999;M.spr.setPosition(414,200);s.pl.body.reset(378,200);s.ang=0;s.bcd=0;st(5);const h0=M.hp;s.req=1;st(30);return +(h0-M.hp).toFixed(1)});
console.log(JSON.stringify({...r,full:r3,p3_bite:r4}),errs);await b.close()})();
