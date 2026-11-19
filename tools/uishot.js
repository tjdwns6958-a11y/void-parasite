const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:2,hasTouch:true,isMobile:true});const p=await ctx.newPage();
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;let a=12345;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.pl.setPosition(120,262);s.pl.x=120;s.pl.y=262;
 // 먹이 하나를 조이스틱 자리 근처로
 const f=s.cur.food.find(f=>f.on&&f.spr);if(f){f.x=70;f.y=300;f.spr.setPosition(70,300)}const f2=s.cur.food.filter(f=>f.on&&f.spr)[1];if(f2){f2.x=735;f2.y=275;f2.spr.setPosition(735,275)}});
await p.waitForTimeout(600);
await p.screenshot({path:'ui_now.png'});
// 조이스틱·섭취 버튼을 지운 화면
await p.evaluate(()=>{const s=GAME.scene.scenes[0],g=s.gfx,fc=g.fillCircle,sc=g.strokeCircle;const near=(x,y)=>(Math.hypot(x-84,y-280)<80)||Math.hypot(x-728,y-288)<10;
 g.fillCircle=function(x,y,r){if(near(x,y))return this;return fc.call(this,x,y,r)};g.strokeCircle=function(x,y,r){if(near(x,y))return this;return sc.call(this,x,y,r)};if(s.etx)s.etx.setVisible(false);const h=s.hud;s.hud=function(){h.call(this);if(this.etx)this.etx.setVisible(false)}});
await p.waitForTimeout(400);await p.screenshot({path:'ui_clean.png'});
const info=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return{pl:[Math.round(s.pl.x),Math.round(s.pl.y)],texts:s.children.list.filter(o=>o.type=='Text'&&o.visible&&o.alpha>0).map(o=>[o.text.slice(0,20),Math.round(o.x),Math.round(o.y)]).slice(0,20)}});console.log(JSON.stringify(info));
await b.close()})();
