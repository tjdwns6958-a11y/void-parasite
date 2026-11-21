const {chromium}=require('playwright');const fs=require('fs');fs.mkdirSync(__dirname+'/fcm',{recursive:true});
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
for(const M of [0,1,2,3]){const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(M+' '+e.message));
 await p.addInitScript(m=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpJoyUsed=1;window.__vpM=m;let a=7;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},M);
 await p.goto('file://'+__dirname+'/v62.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);await p.addScriptTag({path:__dirname+'/proto3.js'});
 await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();cmInstall(s);const rm=s.lv.rooms.find(r=>r.en.some(m=>!m.k));s.enter(rm);GAME.loop.sleep();window.__T=performance.now();window.st=n=>{for(let i=0;i<n;i++){__T+=16.667;GAME.step(__T,16.667)}};st(3);
  s.tweens.getDelta=()=>16.667;s.foe=function(){for(const m of this.cur.en)if(m.on&&m.spr)m.spr.setPosition(m.x,m.y)};const M=s.cur.en.find(o=>!o.k);s.cur.en.forEach(m=>{if(m!==M){m.on=0;if(m.spr)m.spr.setVisible(false)}});s.cur.food.forEach(f=>{if(f.spr)f.spr.setVisible(false);f.on=0});
  M.x=428;M.y=200;M.hp=999;M.mh=999;M.spr.setPosition(428,200).setFlipX(true);for(const o of s.dec||[])if(o&&o.x>300&&o.x<500&&o.y>140&&o.y<260&&o.setVisible)o.setVisible(false);if(s.mcard){s.mcard.destroy();s.mcard=null}
  s.lin={p:0,c:3,v:0};s.recalc();s.wormSkin();s.pl.body.reset(378,200);s.ang=0;s.hd.setRotation(0);s.sp.forEach((q,i)=>{q.x=378-8*(i+1);q.y=204});s.inv=99;window.__vpNoAim=1;st(20);s.bcd=0;s.k.SPACE.isDown=true});
 const plan=[['h',6],['h',24],['h',30],['h',15],['r',2],['s',3],['s',4],['s',7]];let i=0;
 for(const [k,n] of plan){await p.evaluate(([k,n])=>{const s=GAME.scene.scenes[0];if(k=='r')s.k.SPACE.isDown=false;st(n)},[k,n]);await p.screenshot({path:`${__dirname}/fcm/m${M}_${i++}.png`,clip:{x:328,y:168,width:132,height:64}})}
 await ctx.close()}
console.log('errs',JSON.stringify(errs));await b.close()})();
