const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=3;window.__vpJoyUsed=1});await p.goto('file://'+__dirname+'/v69.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();const rm=s.lv.rooms.find(r=>r.en.some(m=>!m.k));s.enter(rm);GAME.loop.sleep();let T=performance.now();window.st=n=>{for(let i=0;i<n;i++){T+=16.667;GAME.step(T,16.667)}};st(3);s.tweens.getDelta=()=>16.667;
 s.foe=function(){for(const m of this.cur.en)if(m.on&&m.spr)m.spr.setPosition(m.x,m.y)};const M=s.cur.en.find(o=>!o.k);s.cur.en.forEach(m=>{if(m!==M){m.on=0;if(m.spr)m.spr.setVisible(false)}});s.cur.food.forEach(f=>{if(f.spr)f.spr.setVisible(false);f.on=0});if(s.mcard){s.mcard.destroy();s.mcard=null}
 for(const o of s.dec||[])if(o&&o.x>280&&o.x<560&&o.y>140&&o.y<260&&o.setVisible)o.setVisible(false);
 s.lin={p:0,c:3,v:1};s.recalc();s.wormSkin();s.skl='c';s.skCd=0;M.x=470;M.y=200;M.hp=999;M.mh=999;M.spr.setPosition(470,200).setFlipX(true);s.pl.body.reset(360,200);s.ang=0;s.hd.setRotation(0);s.sp.forEach((q,i)=>{q.x=360-8*(i+1);q.y=204});s.inv=0;st(20);
 window.__M=M;window.__x0=s.pl.x;window.__h0=M.hp;s.skUse();return {bdmg:+s.bdmg.toFixed(1)}});
for(let i=0;i<7;i++){await p.screenshot({path:`${__dirname}/dash_${i}.png`,clip:{x:300,y:160,width:260,height:80}});await p.evaluate(()=>st(4))}
const r2=await p.evaluate(()=>{st(20);const s=GAME.scene.scenes[0];return {dmg:+(__h0-__M.hp).toFixed(1),monMoved:Math.round(__M.x-470),plMoved:Math.round(s.pl.x-__x0),cd:+s.skCd.toFixed(1)}});
console.log(JSON.stringify({...r,...r2}),errs);await b.close()})();
