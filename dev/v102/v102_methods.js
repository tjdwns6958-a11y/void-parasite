 // ===== v102 =====
 // 종유석: 바닥 그림자가 처음엔 작고 옅다가 떨어질수록 크고 진해짐 + 종유석 실루엣이 처음부터 위에서 보이며 점점 빨라져 떨어짐(꼬리 줄무늬)
 gdkDrop(m,D,i){const p=this.pl,lead=i%3==0;let x,y,k=0;
  do{x=lead?p.x+p.body.velocity.x*.5+(Math.random()-.5)*30:80+Math.random()*640;y=lead?p.y+p.body.velocity.y*.5+(Math.random()-.5)*20:90+Math.random()*210;k++}while(k<8&&m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<52));
  x=Phaser.Math.Clamp(x,70,730);y=Phaser.Math.Clamp(y,80,300);const t=.9;
  this.telAdd({k:'c',x,y,r:24,sy:.8,t,dmg:D(18),src:'떨어지는 종유석',m,fx:0,on:()=>this.gdkStal(m,x,y)});
  const sh=this.add.ellipse(x,y,50,40,0x000000,1).setDepth(1.54).setAlpha(.18).setScale(.3),rim=this.add.ellipse(x,y,50,40).setStrokeStyle(1.5,0xe8e0ff,.6).setDepth(1.545).setScale(.3);
  const o=this.add.image(x,y-260,'gdkP').setFlipY(true).setScale(.75).setTint(0x3a3058).setDepth(13).setAlpha(0),tr=this.add.graphics().setDepth(12.9),st={k:0};
  this.tweens.add({targets:o,alpha:1,duration:220});
  this.tweens.add({targets:st,k:1,duration:t*1000,ease:'Quad.in',onUpdate:()=>{const q=st.k;o.setY(y-260+250*q);sh.setScale(.3+.7*q).setAlpha(.18+.6*q);rim.setScale(.3+.7*q).setAlpha(.6*(1-q*.5));
    const c=Phaser.Display.Color.Interpolate.ColorWithColor({r:58,g:48,b:88},{r:216,g:208,b:240},1,q);o.setTint(Phaser.Display.Color.GetColor(c.r,c.g,c.b));
    tr.clear();if(q>.15){tr.lineStyle(2,0xe8e0ff,.25+.35*q);for(const dx of[-8,0,8])tr.lineBetween(x+dx,o.y-30-60*q,x+dx,o.y-30)}},
   onComplete:()=>{o.destroy();tr.destroy();this.tweens.add({targets:[sh,rim],alpha:0,duration:180,onComplete:()=>{sh.destroy();rim.destroy()}})}})}
 // 공허 앵무조개 촉수: 고무줄 튕김 대신 문어 다리 — 밑동이 굵고 끝이 가늘며, 끝이 말려 있다가 펴지며 뻗고, 물결이 밑동에서 끝으로 흐름 · 안쪽에 빨판
 obsTent(g,pts,hp,now,sd){const n=pts.length-1;for(const out of[1,0])for(let i=0;i<n;i++){const s=i/n,w=(out?12:8)*(1-s*.78)+(out?1.5:0);g.lineStyle(w,out?0x0a0612:(hp<2?0x9a70d0:0x5a3a8a),1);g.lineBetween(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1])}
  for(let i=1;i<n-1;i+=2){const s=i/n,a=Math.atan2(pts[i+1][1]-pts[i][1],pts[i+1][0]-pts[i][0])+sd*Math.PI/2,r=2.6*(1-s*.75),o=4*(1-s*.7);g.fillStyle(0xe8c8ff,.9).fillCircle(pts[i][0]+Math.cos(a)*o,pts[i][1]+Math.sin(a)*o,r);g.fillStyle(0x5a3a8a,1).fillCircle(pts[i][0]+Math.cos(a)*o,pts[i][1]+Math.sin(a)*o,r*.4)}}
 obsWhip(m,q,o,g,dt,now){q.wt=(q.wt||0)+dt;const L=Math.hypot(q.tx-o.ax,q.ty-o.ay),k=q.k=Math.min(1,(q.k||0)+dt*3.2),ke=1-Math.pow(1-k,3),a0=Math.atan2(q.ty-o.ay,q.tx-o.ax),sd=q.i%2?1:-1,N=16;
  const pts=[[o.ax,o.ay]];let x=o.ax,y=o.ay;
  for(let i=1;i<=N;i++){const s=i/N,curl=sd*(1-ke)*2.6*s*s,wave=.22*s*Math.sin(now/260-s*5+q.i*1.7),tip=s>.8?sd*(s-.8)*3.2*(.35+.65*(1-ke)):0,an=a0+curl+wave+tip;x+=Math.cos(an)*L*(.25+.75*ke)/N;y+=Math.sin(an)*L*(.25+.75*ke)/N;pts.push([x,y])}
  q.x=x;q.y=y;q.pts=[];for(let j=0;j<=12;j++)q.pts.push(pts[Math.round(j*N/12)]);
  this.obsTent(g,pts,q.hp,now,sd);
  if(!q.crk&&k>=1){q.crk=1;const c=this.add.circle(x,y,6,0x000000,0).setStrokeStyle(2,0xe8c8ff,.8).setDepth(12);this.tweens.add({targets:c,scale:2,alpha:0,duration:260,onComplete:()=>c.destroy()})}}
 // 쳐들기(예고): 촉수 셋이 입구 위로 올라와 끝을 말아 쥐며 꿈틀
 obsWhipW(m,o,g,now){const k=1-Math.max(0,m.tm)/(.7);for(const q of m.tn){const a0=Math.atan2(q.ty-o.ay,q.tx-o.ax),sd=q.i%2?1:-1,N=12,pts=[[o.ax,o.ay]];let x=o.ax,y=o.ay;
   for(let i=1;i<=N;i++){const s=i/N,an=a0+Math.PI*.5*sd*(.3+.7*k)*s+sd*2.8*s*s*(.5+.5*k)+.25*Math.sin(now/200-s*4+q.i);x+=Math.cos(an)*(4+3*k);y+=Math.sin(an)*(4+3*k)-1.2*k;pts.push([x,y])}
   this.obsTent(g,pts,q.hp||2,now,sd)}}
 // 공허 보스전(틈 너머의 관찰자 · 공허 앵무조개): 화면 흔들림을 세기 35% · 길이 60%로
 vShk(){const c=this.cameras.main;if(c.__vs)return;const o=c.shake.bind(c);c.shake=(d,i,...r)=>this.mbOn=='v'?o((d||100)*.6,(i==null?.005:i)*.35,...r):o(d,i,...r);c.__vs=1}
