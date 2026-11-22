const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game84.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:2,c:0,v:0,lv:6};s.codeGo('p')});await p.waitForTimeout(8200);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};const m=s.cur.en[0];m.st='intro';s.tel=[];
 s.children.list.forEach(o=>{if(o.type=='Text'&&o.depth>=60&&o.depth<70&&o.x<300&&o.y<140)o.setVisible(false)});
 window.mk=n=>{const O=[],A=o=>{O.push(o);return o},T=(x,y,t,sz,col)=>A(s.add.text(x,y,t,ST({fontSize:(sz||11)+'px',fontStyle:'bold',color:col||'#fff',backgroundColor:'#0b0716cc',padding:{x:5,y:2}})).setOrigin(.5).setDepth(80)),G=A(s.add.graphics().setDepth(70)),G2=A(s.add.graphics().setDepth(1.6));
  const dir={x:1,y:0},L=78;const P1={x:s.hd.x,y:s.hd.y},P0={x:P1.x-L,y:P1.y};
  G2.fillStyle(0xff3b4f,.22).fillRect(P0.x-18,P0.y-110,36,220);G2.lineStyle(2,0xff5a7a,.9).lineBetween(P0.x,P0.y-110,P0.x,P0.y+110);
  const ghost=(k,al,tint,fill)=>{const parts=[s.hd,...s.sg];parts.forEach(o=>{const g=A(s.add.image(o.x-(P1.x-P0.x)*k,o.y-(P1.y-P0.y)*k,o.texture.key).setRotation(o.rotation).setScale(o.scaleX,o.scaleY).setDepth(8.7).setAlpha(al));if(fill)g.setTintFill(tint);else if(tint)g.setTint(tint)})};
  if(n==1){for(const k of[1,.66,.33])ghost(k,.18+.12*(1-k),0xc8a8ff,1);
   for(let i=0;i<5;i++){const t=i/5;G.lineStyle(2,0xffffff,.5-.08*i).lineBetween(P0.x+dir.x*L*t-6,P0.y+dir.y*L*t+10-i,P0.x+dir.x*L*t+10,P0.y+dir.y*L*t+10-i)}
   T(P1.x+10,P1.y-40,'꿈틀 대시 — 앞으로 78px · 0.16초',11,'#ffe9a8');T(P0.x,P0.y+40,'움직이는 0.3초 동안 무적 → 공격 1회 피함',11,'#c8a8ff')}
  if(n==2){ghost(1,.85,0xf0e8ff,1);const sk=A(s.add.text(P0.x-6,P0.y-30,'허물',ST({fontSize:'10px',fontStyle:'bold',color:'#12091f',backgroundColor:'#f0e8ff',padding:{x:4,y:1}})).setOrigin(.5).setDepth(80));
   for(let i=0;i<8;i++){const a=i/8*6.283;G.lineStyle(2,0xffffff,.7).lineBetween(P0.x+Math.cos(a)*10,P0.y+Math.sin(a)*8,P0.x+Math.cos(a)*18,P0.y+Math.sin(a)*14)}
   T(P1.x+14,P1.y-40,'탈피 회피 — 허물을 벗고 앞으로',11,'#ffe9a8');T(P0.x+20,P0.y+40,'남은 허물이 다음 공격 1회를 대신 맞는다 (0.6초)',11,'#c8a8ff')}
  if(n==3){for(const k of[1,.5])ghost(k,.25,0x9ff0ff,1);G.lineStyle(3,0xffe066,.9).strokeCircle(P1.x,P1.y,26);G.lineStyle(1.5,0xffffff,.7).strokeCircle(P1.x,P1.y,36);
   T(P1.x+4,P1.y-48,'완벽 회피!',15,'#ffe066');
   const cx=P1.x+70,cy=P1.y+6;G.fillStyle(0x241c38,1).fillCircle(cx,cy,13);G.lineStyle(3,0x9ff0ff,1).beginPath().arc(cx,cy,13,-1.57,-1.57+6.283*.5,false).strokePath();A(s.add.text(cx,cy,'↺',ST({fontSize:'13px',fontStyle:'bold',color:'#9ff0ff'})).setOrigin(.5).setDepth(80));
   T(cx+2,cy+26,'재사용 절반 즉시 회복',10,'#9ff0ff');T(P0.x+10,P0.y+40,'공격이 닿기 직전에 쓰면 완벽 회피 — 잠깐 느려지는 연출 + 보상',11,'#c8a8ff')}
  window.__O=O};
 window.rm=()=>{(window.__O||[]).forEach(o=>o.destroy())}});
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.pl.body.reset(300,250);s.k.RIGHT.isDown=true});await p.waitForTimeout(420);await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.k.RIGHT.isDown=false;s.pl.setVelocity(0,0);s.vx=s.vy=0});await p.waitForTimeout(60);await p.evaluate(()=>{GAME.loop.sleep()});
const TT={1:'1안 · 꿈틀 대시 (무적 시간)',2:'2안 · 탈피 회피 (허물이 대신 맞음)',3:'3안 · 완벽 회피 (타이밍 보상)'};
for(const n of[1,2,3]){await p.evaluate(n=>{mk(n);const s=GAME.scene.scenes[0];window.__O.push(s.add.text(12,12,'',ST({fontSize:'15px',fontStyle:'bold',color:'#ffe9a8',backgroundColor:'#0b0716ee',padding:{x:8,y:4}})).setDepth(90))},n);
 await p.evaluate(t=>__O[__O.length-1].setText(t),TT[n]);await p.evaluate(()=>GAME.step(performance.now(),1));await p.waitForTimeout(100);await p.screenshot({path:'dash_'+n+'.png',clip:{x:150,y:110,width:500,height:250}});await p.evaluate(()=>rm());await p.waitForTimeout(100)}
console.log(errs);await b.close()})();
