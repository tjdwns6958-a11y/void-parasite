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
  m.spr.setAlpha(1).setVisible(true).setScale(.92).setPosition(400,140);const bub=(x,y,r,al)=>{G.fillStyle(0x9fd8ff,.12*(al||1)).fillCircle(x,y,r);G.lineStyle(1.5,0xffffff,.85*(al||1)).strokeCircle(x,y,r);G.fillStyle(0xffffff,.9*(al||1)).fillCircle(x-r*.35,y-r*.35,Math.max(1,r*.18))};
  if(n==1){// 거품 분사
   m.spr.setTexture('gdkA0');for(let i=0;i<22;i++){const a=Math.PI/2+(Math.random()-.5)*1.3,d=50+Math.random()*190;bub(400+Math.cos(a)*d,170+Math.sin(a)*d*.75,4+Math.random()*7)}
   G.lineStyle(2,0xff5a7a,.7).beginPath().arc(400,170,250,Math.PI/2-.65,Math.PI/2+.65,false).strokePath();pl.body.reset(560,300);
   T(400,40,'입에서 거품을 부채꼴로 뿜는다 — 거품이 흔들리며 천천히 퍼짐',11,'#ffe066');T(400,330,'닿으면 톡 터지며 작은 피해 + 잠깐 느려짐 · 공격·구체로 터뜨려 길을 냄',11,'#9fd8ff')}
  if(n==2){// 튕기는 거품 대포
   m.spr.setTexture('gdkA0');for(const[x,y,vx,vy]of[[250,220,1,-1],[530,250,-1,1],[620,160,-1,-.6]]){bub(x,y,22);arrow(x+vx*26,y+vy*20,x+vx*60,y+vy*45,0xffffff,2)}
   for(let i=0;i<8;i++){const a=i/8*6.283;bub(330+Math.cos(a)*30,290+Math.sin(a)*20,5,.8);G.lineStyle(1,0xffffff,.5).lineBetween(330,290,330+Math.cos(a)*24,290+Math.sin(a)*16)}
   pl.body.reset(450,300);T(400,40,'큰 거품 3개를 쏴 벽·기둥에 통통 튕기게 한다',11,'#ffe066');T(330,330,'무언가에 닿아 터지면 작은 거품 8개가 사방으로',11,'#9fd8ff')}
  if(n==3){// 연쇄 거품 장판
   m.spr.setTexture('gdkA0');for(let r=0;r<4;r++)for(let c=0;c<9;c++){if((r+c)%4==1&&r==2)continue;const x=170+c*58,y=190+r*34;bub(x,y,9,r==0?.4:1)}
   for(let c=0;c<9;c++){const x=170+c*58;G.lineStyle(2,0xff5a7a,.7).strokeCircle(x,190,13)}arrow(400,170,400,190,0xff5a7a,2);
   pl.body.reset(345,262);T(400,40,'바닥 가득 거품을 깔고 — 집게왕 쪽부터 줄줄이 터져 내려온다',11,'#ffe066');T(400,330,'터지는 줄이 오기 전에 빈 틈(거품 없는 칸)으로 들어갈 것',11,'#9fd8ff')}
  if(n==4){// 수정 거품
   m.spr.setTexture('gdkA0');for(const[x,y]of[[280,230],[520,220],[400,270],[600,280]]){bub(x,y,14);A(s.add.image(x,y,'f_c').setScale(.9).setDepth(9.5))}
   G.lineStyle(1.5,0x9fd8ff,.5);for(const[x,y]of[[280,230],[520,220]]){for(let k=0;k<5;k++){const t=k/5,t2=(k+.5)/5;G.lineBetween(x+(450-x)*t,y+(300-y)*t,x+(450-x)*t2,y+(300-y)*t2)}}
   pl.body.reset(450,300);T(400,40,'수정 조각을 품은 거품이 천천히 나를 따라온다',11,'#ffe066');T(400,330,'물어서 터뜨리면 무기물(수정 박치기 충전) · 몸에 닿으면 파편이 터져 피해',11,'#9fd8ff')}
  window.__O=O};window.rm=()=>{(window.__O||[]).forEach(o=>o.destroy());__M.spr.setVisible(true).setTexture('gdkA0').clearTint().setAlpha(1).setScale(.92).setPosition(400,140)}});
const TT={1:'1 · 거품 분사',2:'2 · 튕기는 거품 대포',3:'3 · 연쇄 거품 장판',4:'4 · 수정 거품'};
for(const n of[1,2,3,4]){await p.evaluate(n=>{mk(n);const s=GAME.scene.scenes[0];__O.push(s.add.text(12,12,'',ST({fontSize:'15px',fontStyle:'bold',color:'#ffe9a8',backgroundColor:'#0b0716ee',padding:{x:8,y:4}})).setDepth(90))},n);
 await p.evaluate(t=>__O[__O.length-1].setText(t),TT[n]);await p.waitForTimeout(300);await p.screenshot({path:'gm_'+n+'.png'});await p.evaluate(()=>rm());await p.waitForTimeout(100)}
console.log(errs);await b.close()})();
