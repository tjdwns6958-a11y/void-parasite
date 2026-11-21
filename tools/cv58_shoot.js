// node shoot.js → 각 안(0~5) 맞힘/허공 연속 장면 캡처
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];fs.mkdirSync(__dirname+'/fcv',{recursive:true});
for(const BS of ['c1','c2','c3','v1','v2','v3'])for(const HIT of [1,0]){const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();p.on('crash',()=>console.log('CRASH',BS,HIT));p.on('pageerror',e=>errs.push(BS+' '+e.message));
 await p.addInitScript(v=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpJoyUsed=1;window.__vpK=v;let a=7;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},BS);
 await p.goto('file://'+__dirname+'/v58.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);await p.addScriptTag({path:__dirname+'/proto2.js'});await p.addScriptTag({path:__dirname+'/proto.js'});
 const r=await p.evaluate(HIT=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();
  const rm=s.lv.rooms.find(r=>r.en.some(m=>!m.k));if(!rm)return 'no room';s.enter(rm);GAME.loop.sleep();window.__T=performance.now();window.st=n=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(3);
  s.tweens.getDelta=()=>16.667;s.foe=function(){for(const m of this.cur.en)if(m.on&&m.spr)m.spr.setPosition(m.x,m.y)};
  const M=s.cur.en.find(o=>!o.k);s.cur.en.forEach(m=>{if(m!==M){m.on=0;if(m.spr)m.spr.setVisible(false)}});s.cur.food.forEach(f=>{if(f.spr)f.spr.setVisible(false);f.on=0});
  const m=M;m.x=414;m.y=200;m.hp=999;m.mh=999;if(!HIT){m.x=900}if(m.spr)m.spr.setPosition(m.x,m.y).setFlipX(true);
  for(const o of s.dec||[])if(o&&o.x>320&&o.x<480&&o.y>150&&o.y<250&&o.setVisible)o.setVisible(false);
  s.lin=window.__vpK[0]=='c'?{p:0,c:2,v:0}:{p:0,c:0,v:1};cvInstall(s);s.recalc();s.wormSkin();s.pl.body.reset(378,200);s.ang=0;if(s.hd)s.hd.setRotation(0);s.sp.forEach((q,i)=>{q.x=378-8*(i+1);q.y=204});s.inv=99;st(30);window.__vpNoAim=1;s.bcd=0;s.bite();return 'ok'},HIT);
 if(r!='ok'){errs.push(r);await ctx.close();continue}
 for(let i=0;i<13;i++){await p.screenshot({path:`${__dirname}/fcv/b${BS}_${HIT}_${String(i).padStart(2,'0')}.png`,clip:{x:340,y:172,width:104,height:52}});await p.evaluate(()=>st(2))}
 await ctx.close()}
console.log('errs',JSON.stringify(errs));await b.close()})();
