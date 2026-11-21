const {chromium}=require('playwright');const fs=require('fs');fs.mkdirSync(__dirname+'/f59',{recursive:true});
// [이름, 계통, 몬스터 x, 몬스터 y, clip]
const CASES=[['c_hit',{p:0,c:2,v:0},414,200,{x:340,y:172,width:104,height:52}],['v_hit',{p:0,c:0,v:1},414,200,{x:340,y:172,width:104,height:52}],
 ['v1_far',{p:0,c:0,v:1},540,200,{x:350,y:165,width:220,height:70}],['v2_home',{p:0,c:0,v:2},540,232,{x:350,y:165,width:220,height:90}]];
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
for(const [nm,L,mx,my,clip] of CASES){const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(nm+' '+e.message));
 await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpJoyUsed=1;let a=7;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 await p.goto('file://'+__dirname+'/v59.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(([L,mx,my])=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();const rm=s.lv.rooms.find(r=>r.en.some(m=>!m.k));s.enter(rm);GAME.loop.sleep();window.__T=performance.now();window.st=n=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(3);
  s.tweens.getDelta=()=>16.667;s.foe=function(){for(const m of this.cur.en)if(m.on&&m.spr)m.spr.setPosition(m.x,m.y)};const M=s.cur.en.find(o=>!o.k);s.cur.en.forEach(m=>{if(m!==M){m.on=0;if(m.spr)m.spr.setVisible(false)}});s.cur.food.forEach(f=>{if(f.spr)f.spr.setVisible(false);f.on=0});
  M.x=mx;M.y=my;M.hp=999;M.mh=999;M.spr.setPosition(mx,my).setFlipX(true);for(const o of s.dec||[])if(o&&o.x>320&&o.x<600&&o.y>140&&o.y<270&&o.setVisible)o.setVisible(false);
  s.lin=L;s.recalc();s.wormSkin();s.pl.body.reset(378,200);s.ang=0;if(s.hd)s.hd.setRotation(0);s.sp.forEach((q,i)=>{q.x=378-8*(i+1);q.y=204});s.inv=99;st(30);window.__vpNoAim=1;s.bcd=0;s.bite()},[L,mx,my]);
 for(let i=0;i<16;i++){await p.screenshot({path:`${__dirname}/f59/${nm}_${String(i).padStart(2,'0')}.png`,clip});await p.evaluate(()=>st(2))}
 await ctx.close()}
console.log('errs',JSON.stringify(errs));await b.close()})();
