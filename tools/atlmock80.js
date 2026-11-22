const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game80.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=999;const m=s.cur.en[0];m.st='intro';s.tel=[];if(s.hudVis)s.hudVis(false);
 s.children.list.forEach(o=>{if(o.type=='Text'&&o.depth>=60&&o.depth<200)o.setVisible(false)});
 s.pl.body.reset(400,300);window.__M=m;
 window.mk=(n)=>{const O=[],A=o=>{O.push(o);return o},T=(x,y,t,sz,col,dp)=>A(s.add.text(x,y,t,ST({fontSize:(sz||11)+'px',fontStyle:'bold',color:col||'#ffffff',backgroundColor:'#0b0716cc',padding:{x:5,y:2}})).setOrigin(.5).setDepth(dp||80)),G=A(s.add.graphics().setDepth(70)),G2=A(s.add.graphics().setDepth(7.9));
  const X=m.x,Y=m.y,RX=m.RX,RY=m.RY,cry=(x,y,sc,col,rot)=>A(s.add.image(x,y,'lc_cry').setScale(sc).setTint(col||0x9fd8ff).setRotation(rot||0).setDepth(9.5));
  const arrow=(x1,y1,x2,y2,col,w)=>{G.lineStyle(w||3,col,1).lineBetween(x1,y1,x2,y2);const a=Math.atan2(y2-y1,x2-x1);G.fillStyle(col,1).fillTriangle(x2,y2,x2-Math.cos(a-.4)*12,y2-Math.sin(a-.4)*12,x2-Math.cos(a+.4)*12,y2-Math.sin(a+.4)*12)};
  const tel=(x1,y1,x2,y2,w,a)=>{G2.lineStyle(w,0xff3b4f,a||.25).lineBetween(x1,y1,x2,y2);G2.lineStyle(2,0xff5a7a,.9).lineBetween(x1,y1,x2,y2)};
  if(n==1){// 수정 갑주 + 수정 기둥에 박치기 유도
   for(const[a,r]of[[0,34],[1.57,26],[3.14,34],[4.71,26]]){const x=X+Math.cos(a)*r*.9,y=Y+Math.sin(a)*r*.8;cry(x,y,2.1,0x9fd8ff,a+1.57)}
   const pil=[[X-80,Y+34],[X+86,Y-20],[X+14,Y+56]];pil.forEach(([x,y])=>{cry(x,y,3.4,0xc8f0ff);G2.fillStyle(0x000000,.35).fillEllipse(x,y+10,26,8)});
   s.pl.body.reset(X+40,Y+74);tel(X,Y,X+10,Y+52,34,.22);arrow(X,Y+4,X+6,Y+36,0xffe066,3);
   for(let i=0;i<10;i++){const a=i/10*6.283;G.lineStyle(2,0xffffff,.9).lineBetween(X+10+Math.cos(a)*8,Y+44+Math.sin(a)*6,X+10+Math.cos(a)*20,Y+44+Math.sin(a)*14)}
   T(X+118,Y-62,'갑주: 물면 「깡!」 튕김',11,'#9fd8ff');T(X+10,Y+RY+40,'가면 돌진을 수정 기둥에 부딪히게 → 갑주 1장 깨짐',11,'#ffe066');T(X-150,Y-62,'2페이즈: 갑주 재생 · 2연속 돌진',11,'#ff9ac0')}
  if(n==2){// 무기물 쟁탈전
   const ore=[[110,90],[690,95],[120,270],[680,265],[400,30],[260,300]];ore.forEach(([x,y],i)=>{A(s.add.image(x,y,'f_c').setScale(1.6).setDepth(9));if(i<3){G.lineStyle(2,0x9fd8ff,.7);for(let k=0;k<8;k++){const t=k/8,t2=t+.06,ex=X+(x-X)*.38,ey=Y+(y-Y)*.38;G.lineBetween(x+(ex-x)*t,y+(ey-y)*t,x+(ex-x)*t2,y+(ey-y)*t2)}}});
   m.cs.forEach((c,i)=>{if(i<11){c.o.setTint(0x9fd8ff);cry(c.o.x,c.o.y-12,1.1,0xc8f0ff)}});
   for(let k=0;k<7;k++){const a=-1.2+k*.25,x=X+Math.cos(a)*RX,y=Y+Math.sin(a)*RY;arrow(x,y,x+Math.cos(a)*48,y+Math.sin(a)*34,0x9fd8ff,2)}
   s.pl.body.reset(170,250);for(let i=0;i<2;i++)A(s.add.circle(158+i*12,226,4,0x9fd8ff).setDepth(80));
   T(470,52,'보스: 광맥을 끌어와 고리를 수정화 (단계마다 단단해지고 파편을 쏜다)',11,'#9fd8ff');T(170,320,'먼저 먹으면 「수정 충전」 → 박치기로 수정 고리를 깬다',11,'#ffe066')}
  if(n==3){// 공명 격자
   const P=[];for(let k=0;k<5;k++){const a=-1.57+k/5*6.283;P.push([X+Math.cos(a)*(RX+70),Y+Math.sin(a)*(RY+52)])}
   for(let k=0;k<5;k++){const [x1,y1]=P[k],[x2,y2]=P[(k+2)%5];if(k<2){G2.lineStyle(10,0x9fd8ff,.35).lineBetween(x1,y1,x2,y2);G2.lineStyle(3,0xffffff,.95).lineBetween(x1,y1,x2,y2)}else tel(x1,y1,x2,y2,16,.18)}
   P.forEach(([x,y],k)=>{cry(x,y,2.6,k==3?0x6a7a8a:0xc8f0ff);if(k==3)T(x,y+26,'금 감 (2/3)',10,'#ffe066')});
   for(let k=1;k<=3;k++){const r=A(s.add.ellipse(X,Y,40+k*34,28+k*24).setStrokeStyle(2,0x9fd8ff,.6-.15*k).setDepth(9.4))}
   T(470,52,'공명: 가면이 박자를 울릴 때마다 수정 기둥 사이에 빛줄기 (별 모양)',11,'#9fd8ff');T(560,330,'기둥을 3번 물어 깨면 그 줄이 끊겨 안전 지대',11,'#ffe066');s.pl.body.reset(560,300)}
  if(n==4){// 구르는 환초
   const dx=-150;for(let k=1;k<=3;k++)G2.lineStyle(2,0xc060f0,.5-.12*k).strokeEllipse(X+dx+k*60,Y,RX*2,RY*2);
   m.cs.forEach(c=>{c.o.x+=dx});m.spr.x+=dx;m.lag.x=dx;m.po.forEach(q=>q.o.x+=dx);
   arrow(X+dx+RX+30,Y,X+dx+RX+30-80,Y,0xffe066,5);
   for(const[x,y]of[[640,120],[610,240],[700,190],[560,300]]){cry(x,y,2.2,0xc8f0ff,.4);cry(x+12,y+4,1.5,0x9fd8ff,-.5);A(s.add.image(x-10,y+6,'peb0').setScale(1.6).setDepth(8))}
   s.pl.body.reset(X+dx-RX+40,Y-30);
   T(X+dx,Y-RY-30,'고리째 몸통박치기: 환초가 굴러서 돌진',12,'#ffe066');T(X+dx-60,Y+RY+30,'틈에 맞춰 서거나 안에 탈 것 — 벽에 깔리면 큰 피해·넉백',11,'#ff9ac0');T(640,80,'부딪힌 자리에 산호·수정 잔해 → 경기장이 좁아짐',11,'#9fd8ff')}
  window.__O=O;return 1};
 window.rm=()=>{(window.__O||[]).forEach(o=>o.destroy());const m=__M;m.cs.forEach(c=>{c.o.clearTint();const x=m.x+Math.cos(c.a)*m.RX;c.o.x=x});m.spr.x=m.x;m.lag.x=0;
  m.po.forEach(q=>q.o.x=q.x)}});
const T={1:'1안 · 수정 갑주 — 돌진을 기둥에 박게 해서 깨기',2:'2안 · 광맥 쟁탈전 — 무기물을 먼저 먹는 쪽이 단단해진다',3:'3안 · 공명 격자 — 수정 기둥 사이 빛줄기 그물',4:'4안 · 구르는 환초 — 고리째 몸통박치기'};
for(const n of[1,2,3,4]){await p.evaluate(n=>{mk(n);const s=GAME.scene.scenes[0];window.__tt=s.add.text(12,12,'',ST({fontSize:'15px',fontStyle:'bold',color:'#ffe9a8',backgroundColor:'#0b0716ee',padding:{x:8,y:4}})).setDepth(90);__O.push(__tt)},n);
 await p.evaluate(t=>__tt.setText(t),T[n]);await p.waitForTimeout(400);await p.screenshot({path:'atlmk_'+n+'.png'});await p.evaluate(()=>rm());await p.waitForTimeout(150)}
console.log(errs);await b.close()})();
