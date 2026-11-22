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
  if(n==1){// 수정 감옥
   pl.body.reset(400,265);for(let i=0;i<7;i++){const a=i/7*6.283;cry(400+Math.cos(a)*52,272+Math.sin(a)*34,.6,i==2?0x9a8acc:0xffffff)}tc(400,265,40,.28);
   T(400,312,'발밑에 수정 우리가 솟는다 → 2초 뒤 큰 집게가 우리째 내리찍음',11,'#ffe066');T(560,230,'수정 하나를 2번 물어 깨고 탈출',11,'#9fd8ff')}
  if(n==2){// 집게 잡기·던지기
   m.spr.setTexture('gdkAr');pl.body.reset(330,215);G.lineStyle(3,0xffe066,.9).strokeCircle(330,215,16);
   arrow(330,215,190,150,0xffffff,3);cry(185,140,.9);T(330,250,'잡히면 공격 연타로 빠져나오기 (게이지)',11,'#ffe066');T(200,112,'못 빠져나오면 기둥·벽으로 던짐',11,'#ff9ac0');
   for(let i=0;i<5;i++)G.fillStyle(i<2?0xffe066:0x3a2f57,1).fillRect(306+i*10,190,8,5)}
  if(n==3){// 정동 포격
   pl.body.reset(560,290);for(const[x,y]of[[250,250],[520,270],[600,215],[330,295]]){tc(x,y,24,.18);G.lineStyle(1.5,0x9fd8ff,.6);for(let k=0;k<14;k++){const t=k/14,t2=(k+.5)/14;const px=400+(x-400)*t,py=110+(y-110)*t-Math.sin(t*Math.PI)*90,qx=400+(x-400)*t2,qy=110+(y-110)*t2-Math.sin(t2*Math.PI)*90;G.lineBetween(px,py,qx,qy)}}
   cry(250,262,.5);cry(520,282,.5);A(s.add.image(330,300,'f_c').setDepth(9).setScale(1.4));
   T(400,40,'정동에서 결정을 포물선으로 쏘아 올림 → 떨어진 자리에 수정 덩이가 박힘',11,'#ffe066');T(250,300,'3초 뒤 터짐 · 물어서 깨면 무기물',11,'#9fd8ff')}
  if(n==4){// 땅 파고들기
   m.spr.setVisible(false);G.fillStyle(0x2a2238,1).fillEllipse(470,215,120,40);G.lineStyle(2,0x5a4a7a,1).strokeEllipse(470,215,120,40);A(s.add.image(470,200,'gdkG').setScale(.9).setDepth(8.6));
   for(let i=0;i<5;i++)G.fillStyle(0x5a4a7a,.6).fillCircle(470-40-i*30,225+Math.sin(i)*6,6-i*.8);pl.body.reset(300,250);tc(300,250,46,.24);arrow(430,215,330,245,0xffe066,3);
   T(470,170,'땅속으로 파고들어 등의 정동만 드러낸 채 이동',11,'#ffe066');T(300,300,'발밑에서 집게부터 솟구침 · 이동 중 드러난 정동을 물면 큰 피해',11,'#9fd8ff');m.spr.setVisible(false)}
  if(n==5){// 수정 방패 반격
   m.spr.setTexture('gdkAr');G.lineStyle(4,0x9fd8ff,.9).beginPath().arc(400,150,92,.4,2.74,false).strokePath();G.lineStyle(10,0x9fd8ff,.2).beginPath().arc(400,150,92,.4,2.74,false).strokePath();
   pl.body.reset(400,250);T(400,280,'앞에서 치면 수정 반격(파편 폭발)',11,'#ff9ac0');pl.body.reset(400,250);
   A(s.add.image(560,120,'f_c').setScale(0)).setVisible(false);T(600,110,'뒤·옆으로 돌아 치거나 기다릴 것',11,'#9fd8ff');arrow(560,250,560,140,0x7be0a8,3);
   T(400,48,'큰 수정 집게를 방패처럼 세우고 버팀 (2.5초)',11,'#ffe066')}
  if(n==6){// 무기물 자석
   m.spr.setTexture('gdkA0');for(const[x,y]of[[200,260],[620,250],[300,300],[540,300],[150,180]]){A(s.add.image(x,y,'f_c').setScale(1.4).setDepth(9));G.lineStyle(1.5,0x9fd8ff,.55);for(let k=0;k<6;k++){const t=k/6,t2=(k+.5)/6;G.lineBetween(x+(400-x)*t,y+(150-y)*t,x+(400-x)*t2,y+(150-y)*t2)}}
   for(let i=0;i<8;i++){const a=i/8*6.283;A(s.add.image(400+Math.cos(a)*80,150+Math.sin(a)*52,'f_c').setScale(1.1).setDepth(9.4))}G.lineStyle(1,0x9fd8ff,.4).strokeEllipse(400,150,160,104);
   pl.body.reset(300,290);T(400,40,'정동이 바닥의 무기물을 끌어당겨 몸 둘레를 도는 수정 방패로',11,'#ffe066');T(300,320,'먼저 먹어 치우면 방패가 약해지고 내 수정 박치기 충전',11,'#9fd8ff')}
  window.__O=O};window.rm=()=>{(window.__O||[]).forEach(o=>o.destroy());__M.spr.setVisible(true).setTexture('gdkA0')}});
const TT={1:'1 · 수정 감옥',2:'2 · 집게 잡기 → 던지기',3:'3 · 정동 포격',4:'4 · 땅 파고들기',5:'5 · 수정 방패 반격',6:'6 · 무기물 자석'};
for(const n of[1,2,3,4,5,6]){await p.evaluate(n=>{mk(n);const s=GAME.scene.scenes[0];__O.push(s.add.text(12,12,'',ST({fontSize:'15px',fontStyle:'bold',color:'#ffe9a8',backgroundColor:'#0b0716ee',padding:{x:8,y:4}})).setDepth(90))},n);
 await p.evaluate(t=>__O[__O.length-1].setText(t),TT[n]);await p.waitForTimeout(300);await p.screenshot({path:'gm_'+n+'.png'});await p.evaluate(()=>rm());await p.waitForTimeout(100)}
console.log(errs);await b.close()})();
