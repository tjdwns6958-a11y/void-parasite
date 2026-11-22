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
  if(n==1){// 탈피 분신
   m.spr.setTintFill(0xb8b0c8).setAlpha(.95);T(400,62,'빈 허물 (단단함 · 곧 터짐)',11,'#c8c0d8');
   const r=A(s.add.image(610,250,'gdkB0').setScale(.62).setDepth(8.8).setAlpha(.55).setTint(0xb080ff));G.lineStyle(1.5,0xffe066,.7).strokeEllipse(610,250,120,70);
   pl.body.reset(470,300);T(610,300,'진짜는 말랑한 속살 — 어둠에 숨어 이동 (×2 피해)',11,'#ffe066');T(400,328,'허물을 때리면 튕김 · 6초 뒤 허물이 산산이 터짐',11,'#ff9ac0')}
  if(n==2){// 딱총 기포
   m.spr.setTexture('gdkA0');pl.body.reset(380,300);const bx=420,by=230;
   for(let k=0;k<3;k++)G.lineStyle(2,0xffffff,.8-.2*k).strokeCircle(bx,by,14+k*5);G.fillStyle(0x9fd8ff,.18).fillCircle(bx,by,14);G.fillStyle(0xffffff,.9).fillCircle(bx-5,by-5,3);
   for(let k=0;k<8;k++){G.fillStyle(0xffffff,.5).fillCircle(470+k*6-30,190+k*5,1.5)}tc(bx,by,52,.12);
   arrow(390,288,412,246,0x7be0a8,3);arrow(430,214,470,160,0x7be0a8,2);
   T(470,150,'작은 집게를 「딱!」 — 공기방울이 천천히 다가오다 번쩍 터짐(충격파)',11,'#ffe066');T(250,300,'방울을 물면 되받아쳐 집게왕 쪽으로 — 맞으면 기절',11,'#7be0a8')}
  if(n==3){// 굴절 광선
   m.spr.setTexture('gdkA0');const P1=[185,140],P2=[255,248],P3=[545,248];
   const beam=(a,b,al)=>{G.lineStyle(8,0x9fd8ff,.25*al).lineBetween(a[0],a[1],b[0],b[1]);G.lineStyle(2.5,0xffffff,.95*al).lineBetween(a[0],a[1],b[0],b[1])};
   beam([400,112],[P1[0],P1[1]-20],1);beam([P1[0],P1[1]-20],[P2[0],P2[1]-20],1);beam([P2[0],P2[1]-20],[P3[0],P3[1]-20],.6);
   G.lineStyle(2,0xffe066,.9).beginPath().arc(P2[0],P2[1]-14,22,3.6,5.6,false).strokePath();A(s.add.text(P2[0],P2[1]-46,'↻',ST({fontSize:'16px',fontStyle:'bold',color:'#ffe066'})).setOrigin(.5).setDepth(80));
   pl.body.reset(290,260);T(400,40,'정동이 빛을 쏘면 수정 기둥마다 꺾이며 방을 가른다',11,'#ffe066');T(300,318,'기둥을 물어 돌리면 빛줄기 방향이 바뀜 → 집게왕에게 되돌리면 큰 피해',11,'#9fd8ff')}
  if(n==4){// 종유석 낙하
   m.spr.setTexture('gdkAr');const pts=[[250,190],[330,270],[480,230],[600,290],[160,280]];pts.forEach(([x,y],i)=>{G.fillStyle(0x000000,.35+.1*(i<2)).fillEllipse(x,y,46-i*4,20-i*1.5);A(s.add.text(x,y,String(i+1),ST({fontSize:'10px',fontStyle:'bold',color:'#ff9ac0'})).setOrigin(.5).setDepth(80))});
   A(s.add.image(250,120,'gdkP').setFlipY(true).setScale(.7).setDepth(9).setTint(0xc8c0e0));A(s.add.image(330,170,'gdkP').setFlipY(true).setScale(.55).setDepth(9).setTint(0xc8c0e0));
   cry(160,292,.8,0xd8d0f0);pl.body.reset(420,300);T(400,40,'집게로 바닥을 두드리면 천장 종유석이 그림자 순서대로 떨어진다',11,'#ffe066');T(170,320,'떨어진 종유석 = 새 기둥 (돌진을 박을 곳이 늘어남)',11,'#9fd8ff')}
  if(n==5){// 기둥 뽑아 휘두르기
   m.spr.setTexture('gdkAr');A(s.add.image(330,86,'gdkP').setScale(1).setRotation(-1.1).setDepth(9.5));
   G.fillStyle(0xff3b4f,.15).slice(400,150,170,Math.PI*.15,Math.PI*.85,false).fillPath();G.lineStyle(2,0xff5a7a,.9).beginPath().arc(400,150,170,Math.PI*.15,Math.PI*.85,false).strokePath();
   arrow(250,250,330,300,0xffffff,2);pl.body.reset(560,300);T(400,40,'방의 수정 기둥을 뽑아 들고 크게 휘두른다 (기둥이 하나 줄어듦)',11,'#ffe066');T(420,330,'휘두른 뒤 기둥을 바닥에 꽂으면 그 자리가 새 기둥 · 휘두르는 동안 등은 빈틈',11,'#9fd8ff')}
  if(n==6){// 농게 박자
   m.spr.setTexture('gdkAr');for(let k=0;k<3;k++)G.lineStyle(2,0xffe066,.6-.15*k).strokeEllipse(400,150,140+k*60,100+k*42);
   for(let i=0;i<4;i++){const x=330+i*46;G.fillStyle(i==2?0xffe066:0x3a2f57,1).fillRoundedRect(x,300,36,12,4)}
   [[185,140],[615,140],[255,248],[545,248]].forEach(([x,y],i)=>{G.fillStyle(0x9fd8ff,i%2?.5:.15).fillCircle(x,y-24,26)});
   pl.body.reset(300,250);T(400,40,'큰 집게를 흔들며 박자를 맞추면 동굴 수정이 박자마다 진동파',11,'#ffe066');T(400,328,'박자(노란 칸)에 맞춰 치면 진동을 끊음 · 엇박에 치면 반사',11,'#9fd8ff')}
  window.__O=O};window.rm=()=>{(window.__O||[]).forEach(o=>o.destroy());__M.spr.setVisible(true).setTexture('gdkA0').clearTint().setAlpha(1)}});
const TT={1:'1 · 탈피 분신 — 어느 쪽이 진짜?',2:'2 · 딱총 기포 — 되받아치기',3:'3 · 굴절 광선 — 기둥을 돌려라',4:'4 · 종유석 낙하 — 지형이 바뀐다',5:'5 · 기둥 뽑아 휘두르기',6:'6 · 농게 박자 — 리듬 맞추기'};
for(const n of[1,2,3,4,5,6]){await p.evaluate(n=>{mk(n);const s=GAME.scene.scenes[0];__O.push(s.add.text(12,12,'',ST({fontSize:'15px',fontStyle:'bold',color:'#ffe9a8',backgroundColor:'#0b0716ee',padding:{x:8,y:4}})).setDepth(90))},n);
 await p.evaluate(t=>__O[__O.length-1].setText(t),TT[n]);await p.waitForTimeout(300);await p.screenshot({path:'gm_'+n+'.png'});await p.evaluate(()=>rm());await p.waitForTimeout(100)}
console.log(errs);await b.close()})();
