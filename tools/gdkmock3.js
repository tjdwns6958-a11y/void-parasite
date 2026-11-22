const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game89.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8200);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};const m=s.cur.en[0];m.st='intro';s.tel=[];if(s.hudVis)s.hudVis(false);
 s.children.list.forEach(o=>{if(o.type=='Text'&&o.depth>=60&&o.depth<200)o.setVisible(false)});window.__M=m;
 window.mk=(n)=>{const O=[],A=o=>{O.push(o);return o},T=(x,y,t,sz,col)=>A(s.add.text(x,y,t,ST({fontSize:(sz||11)+'px',fontStyle:'bold',color:col||'#fff',backgroundColor:'#0b0716cc',padding:{x:5,y:2}})).setOrigin(.5).setDepth(80)),G=A(s.add.graphics().setDepth(70)),G2=A(s.add.graphics().setDepth(1.6));
  const cry=(x,y,sc,tint,rot)=>A(s.add.image(x,y,'gdkP').setOrigin(.5,.86).setScale(sc).setDepth(8.6).setTint(tint||0xffffff).setRotation(rot||0));
  const tc=(x,y,r,a)=>{G2.fillStyle(0xff3b4f,a||.2).fillEllipse(x,y,r*2,r*1.6);G2.lineStyle(2,0xff5a7a,.9).strokeEllipse(x,y,r*2,r*1.6)};
  const arrow=(x1,y1,x2,y2,col,w)=>{G.lineStyle(w||3,col,1).lineBetween(x1,y1,x2,y2);const a=Math.atan2(y2-y1,x2-x1);G.fillStyle(col,1).fillTriangle(x2,y2,x2-Math.cos(a-.4)*11,y2-Math.sin(a-.4)*11,x2-Math.cos(a+.4)*11,y2-Math.sin(a+.4)*11)};
  const m=__M;m.x=400;m.y=140;m.spr.setPosition(400,140);const pl=s.pl;
  if(n==1){// 집게 부메랑
   m.spr.setTexture('gdkB0');A(s.add.image(540,250,'gdkP').setScale(.9).setRotation(1.2).setDepth(9.5).setTint(0xbff0ff));
   G.lineStyle(2,0xffffff,.6);G.beginPath();for(let k=0;k<=40;k++){const t=k/40*6.283,x=470+Math.cos(t)*150,y=200+Math.sin(t)*90;if(k==0)G.moveTo(x,y);else G.lineTo(x,y)}G.strokePath();
   arrow(600,230,620,180,0xffffff,2);pl.body.reset(470,300);
   T(400,40,'큰 수정 집게를 떼어 부메랑처럼 던진다 — 방을 크게 돌아 되돌아옴',11,'#ffe066');T(250,320,'집게가 없는 동안은 한 팔 — 앞이 약해짐(×1.5)',11,'#9fd8ff')}
  if(n==2){// 개미지옥
   m.spr.setTexture('gdkA0');m.spr.setPosition(400,185);for(let k=0;k<5;k++)G.lineStyle(2,0xc8a878,.5-.08*k).strokeEllipse(400,190,80+k*60,50+k*36);
   for(let i=0;i<14;i++){const a=i/14*6.283,r1=230,r2=140;G.lineStyle(1.5,0xd8c098,.5);G.lineBetween(400+Math.cos(a)*r1,190+Math.sin(a)*r1*.6,400+Math.cos(a+.25)*r2,190+Math.sin(a+.25)*r2*.6)}
   pl.body.reset(560,290);arrow(560,280,500,240,0xffe066,2);
   T(400,40,'바닥을 파서 모래 구덩이 — 방 전체가 가운데로 미끄러져 내려간다',11,'#ffe066');T(400,328,'바닥에서 집게가 기다림 · 구덩이 가장자리의 무기물 덩이를 물면 구덩이가 메워짐',11,'#9fd8ff')}
  if(n==3){// 수정 알 · 새끼 게
   for(const[x,y]of[[250,230],[330,280],[520,250],[600,200],[450,300]]){G.fillStyle(0x9fd8ff,.35).fillEllipse(x,y,22,26);G.lineStyle(1.5,0xdff4ff,.9).strokeEllipse(x,y,22,26)}
   for(const[x,y]of[[300,200],[480,215]]){A(s.add.image(x,y,'gdkB0').setScale(.16).setDepth(9).setTint(0xb8e8ff))}
   pl.body.reset(380,300);A(s.add.image(392,292,'gdkB0').setScale(.13).setDepth(13).setTint(0xb8e8ff));
   T(400,40,'수정 알을 낳는다 → 4초 뒤 새끼 게가 깨어나 달라붙음(느려짐)',11,'#ffe066');T(400,328,'알을 먼저 먹으면 무기물 · 새끼를 물면 떨어짐',11,'#9fd8ff')}
  if(n==4){// 팽이 드릴
   m.spr.setTexture('gdkB0');m.spr.setScale(.7);G.lineStyle(3,0xffffff,.7);for(let k=0;k<3;k++)G.beginPath().arc(400,150,60+k*8,k,k+2.4,false).strokePath();
   for(let i=0;i<9;i++){const x=400-i*28,y=150+i*15;A(s.add.image(x,y+14,'gdkP').setOrigin(.5,.86).setScale(.35).setDepth(8.4).setTint(0xb8b0e0))}
   pl.body.reset(560,280);T(400,40,'다리를 접고 팽이처럼 돌며 방을 가로지른다',11,'#ffe066');T(250,328,'지나간 자리에 낮은 수정 벽이 남아 길을 막음 (집게왕도 막힘)',11,'#9fd8ff')}
  if(n==5){// 밀물
   G.fillStyle(0x3a6aa8,.28).fillRect(40,200,720,120);for(let k=0;k<12;k++){G.lineStyle(1.5,0x9fd8ff,.5).beginPath().arc(80+k*58,205,14,3.4,6,false).strokePath()}
   arrow(700,260,600,260,0x9fd8ff,3);m.spr.setPosition(300,240).setAlpha(.8);pl.body.reset(560,290);
   T(400,40,'동굴에 물이 밀려든다 — 아래쪽 절반이 물에 잠김',11,'#ffe066');T(400,328,'물속에선 느려지고 물살에 밀림 · 집게왕은 물속에서 더 빠름',11,'#9fd8ff')}
  if(n==6){// 거품 감옥
   m.spr.setTexture('gdkA0');pl.body.reset(470,240);for(let k=0;k<2;k++)G.lineStyle(2,0xffffff,.8-.3*k).strokeCircle(470,240,22+k*4);G.fillStyle(0x9fd8ff,.16).fillCircle(470,240,22);G.fillStyle(0xffffff,.9).fillCircle(462,232,3);
   for(let i=0;i<10;i++){const x=400+Math.random()*120,y=170+Math.random()*60;G.lineStyle(1.2,0xffffff,.6).strokeCircle(x,y,3+Math.random()*4)}arrow(470,240,440,200,0xff9ac0,2);
   for(let i=0;i<5;i++)G.fillStyle(i<2?0xffe066:0x3a2f57,1).fillRect(446+i*10,272,8,5);
   T(400,40,'입에서 거품을 뿜어 플레이어를 거품에 가둔다 — 거품이 집게왕 쪽으로 둥실',11,'#ffe066');T(470,300,'공격 연타로 거품을 터뜨리기 · 늦으면 집게왕이 거품째 삼킴',11,'#9fd8ff')}
  window.__O=O};window.rm=()=>{(window.__O||[]).forEach(o=>o.destroy());__M.spr.setVisible(true).setTexture('gdkA0').clearTint().setAlpha(1).setScale(.92).setPosition(400,140)}});
const TT={1:'1 · 집게 부메랑',2:'2 · 개미지옥 모래 구덩이',3:'3 · 수정 알과 새끼 게',4:'4 · 팽이 드릴 — 수정 벽',5:'5 · 밀물 — 물에 잠기는 동굴',6:'6 · 거품 감옥'};
for(const n of[1,2,3,4,5,6]){await p.evaluate(n=>{mk(n);const s=GAME.scene.scenes[0];__O.push(s.add.text(12,12,'',ST({fontSize:'15px',fontStyle:'bold',color:'#ffe9a8',backgroundColor:'#0b0716ee',padding:{x:8,y:4}})).setDepth(90))},n);
 await p.evaluate(t=>__O[__O.length-1].setText(t),TT[n]);await p.waitForTimeout(300);await p.screenshot({path:'gm_'+n+'.png'});await p.evaluate(()=>rm());await p.waitForTimeout(100)}
console.log(errs);await b.close()})();
