 // ===== 진화 나무 (시작 설명서 + 플레이 중 퀘스트창) =====
 treeOpen(st){if(this.treeO||this.over||this.molt||this.tr||this.paused)return;
  this.paused=true;this.physics.pause();this.tweens.pauseAll();this.time.paused=true;this.joy=null;this.eat=null;if(this.pl)this.pl.setVelocity(0,0);
  const O=this.treeO=[];O.st=st;O.sel=null;O.tx=[];const A=o=>{O.push(o);return o};
  A(this.add.rectangle(400,180,800,360,0x0b0716,.92).setDepth(320).setInteractive());
  A(this.add.text(20,12,'진화 나무',ST({fontSize:'20px',fontStyle:'bold'})).setDepth(321));
  A(this.add.text(20,40,'먹은 것에 따라 몸이 3갈래로 분화한다\n재료를 모아 둥지(초록 방)에서 탈피하면 한 단계',ST({fontSize:'11px',color:'#a99fc2',lineSpacing:3})).setDepth(321));
  A(this.add.text(782,14,st?'화면을 누르면 시작 ▶':(this.sys.game.device.input.touch?'닫기 ✕':'닫기 ✕  (T)'),ST({fontSize:'13px',fontStyle:'bold',color:st?'#12091f':'#ece6f7',backgroundColor:st?'#a65cff':'#3a2f57',padding:{x:10,y:6}})).setOrigin(1,0).setDepth(321));
  O.g=A(this.add.graphics().setDepth(321));this.treeDraw()}
 treePos(k,j){const cx=400,cy=204;return k=='p'?[cx,cy-48*(j+1)]:k=='c'?[cx+84*(j+1),cy+27*(j+1)]:[cx-84*(j+1),cy+27*(j+1)]}
 treeDraw(){const O=this.treeO,g=O.g;g.clear();O.tx.forEach(t=>t.destroy());O.tx=[];
  const T=(x,y,s,o,ox,oy)=>{const t=this.add.text(x,y,s,ST(o)).setOrigin(ox??.5,oy??.5).setDepth(322);O.tx.push(t);return t},cx=400,cy=204;
  for(const k of LK){const t=this.lin[k];let px=cx,py=cy;
   for(let j=0;j<3;j++){const[x,y]=this.treePos(k,j),own=j<t;g.lineStyle(own?4:2,LCN[k],own?1:.35).lineBetween(px,py,x,y);px=x;py=y}
   for(let j=0;j<3;j++){const[x,y]=this.treePos(k,j),own=j<t,nx=j==t,ok=nx&&this.nodeOk(k),sel=O.sel&&O.sel[0]==k&&O.sel[1]==j;
    if(ok)g.fillStyle(LCN[k],.28).fillCircle(x,y,18);
    g.fillStyle(own?LCN[k]:0x1c1430,1).fillCircle(x,y,10);g.lineStyle(sel?3:2,own||nx?LCN[k]:0x4a3e66,1).strokeCircle(x,y,sel?13:10);
    if(own)T(x,y,'✓',{fontSize:'11px',fontStyle:'bold',color:'#12091f'});else T(x,y,String(j+1),{fontSize:'10px',fontStyle:'bold',color:nx?'#ece6f7':'#6a5e86'});
    const col=own?LCS[k]:nx?'#ece6f7':'#7d7196';
    if(k=='p')T(x+18,y,ND[k][j][0],{fontSize:'12px',fontStyle:'bold',color:col},0,.5);else T(x,y+20,ND[k][j][0],{fontSize:'12px',fontStyle:'bold',color:col})}
   const lk=this.nodeLock(k),hd=LN[k]+' · '+LRS[k],pr=t>=3?'완성':lk===''?'탈피 가능!':lk;
   if(k=='p')T(cx-18,cy-48*3,hd+'\n'+pr,{fontSize:'11px',color:LCS[k],align:'right',lineSpacing:2},1,.5);
   else{const[x,y]=this.treePos(k,2);T(k=='c'?x+20:x-20,y-12,hd+'\n'+pr,{fontSize:'11px',color:LCS[k],align:k=='c'?'left':'right',lineSpacing:2},k=='c'?0:1,.5)}}
  g.fillStyle(0x241c38,1).fillCircle(cx,cy,20);g.lineStyle(2,0xc98bff,1).strokeCircle(cx,cy,20);T(cx,cy-4,'나',{fontSize:'13px',fontStyle:'bold'});T(cx,cy+9,'탈피 '+this.molts+'/'+LMAX,{fontSize:'8px',color:'#a99fc2'});
  g.fillStyle(0x1a1330,1).fillRoundedRect(16,312,768,44,8);let a,b;
  if(O.sel){const[k,j]=O.sel,t=this.lin[k];a=LN[k]+' '+(j+1)+'단계 · '+ND[k][j][0];b=ND[k][j][1]+'   —   '+(j<t?'획득함':j==t?(this.nodeOk(k)?'재료가 모였다 — 둥지에서 탈피하면 얻는다':this.nodeLock(k)):'앞 단계를 먼저 얻어야 한다')}
  else{a='포식 = 유기물 (유충·몬스터 껍질)    갑각 = 무기물 (결정·유생·렉사이 껍질)    공허 = 공허 정수 (껍질·보이드링·산호·정예)';b='3단계는 다른 계통 1단계가 있어야 열린다 · 탈피는 최대 5번, 할수록 필요한 재료가 늘어난다 · 동그라미를 누르면 자세한 설명'}
  T(28,323,a,{fontSize:'11px',fontStyle:'bold',color:'#ece6f7'},0,.5);T(28,343,b,{fontSize:'10px',color:'#a99fc2',wordWrap:{width:750}},0,.5)}
 treeTap(x,y){const O=this.treeO;if(!O)return;let best=null,bd=22;for(const k of LK)for(let j=0;j<3;j++){const[nx,ny]=this.treePos(k,j),d=Math.hypot(nx-x,ny-y);if(d<bd){bd=d;best=[k,j]}}
  if(best){O.sel=best;this.treeDraw();return}if(y>308&&!O.st)return;this.treeClose()}
 treeClose(){const O=this.treeO;if(!O)return;O.tx.forEach(t=>t.destroy());O.forEach(o=>o.destroy());this.treeO=null;this.paused=false;this.physics.resume();this.tweens.resumeAll();this.time.paused=false}
 // ===== 보스: 공허를 걷는 자 =====
 rwTex(){if(this.textures.exists('rw'))return;let sd=12345;const R=()=>{sd=sd*16807%2147483647;return sd/2147483647};
  const body=(x,half)=>{sd=12345;
   for(let y=20;y<72;y++){const w=6+(y-20)*.42+Math.sin(y*.45)*1.3,fd=y>56?(y-56)/16:0;
    for(let i=Math.floor(28-w);i<=Math.ceil(28+w);i++){const r1=R(),r2=R();if(half=='L'&&i>=28||half=='R'&&i<28)continue;if(fd>0&&r1<fd*.95)continue;
     const yy=y+(i>=28?-3:0),edge=Math.abs(i-28)>w-1.3;x.fillStyle=edge?'#7a4ac0':r2<.05?'#ffffff':r2<.12?'#b8a0ff':r2<.2?'#2a1a48':'#0b0516';x.fillRect(i,yy,1,1)}}
   if(!half)for(let y=18;y<70;y++){x.fillStyle='#000000';x.fillRect(28,y-1,1,1);x.fillStyle='rgba(224,160,255,.8)';x.fillRect(27,y,1,1);x.fillRect(29,y-2,1,1)}
   const sh=(cx,cy,f)=>{x.fillStyle='#2a1448';x.fillRect(cx-6,cy,12,4);x.fillStyle='#5a2e8e';x.fillRect(cx-5,cy-1,10,3);x.fillStyle='#9a6ad0';x.fillRect(cx-4+f,cy-2,6,2);x.fillStyle='#e0c8ff';x.fillRect(cx-2+f,cy-3,3,1)};
   if(half!='R')sh(17,24,-1);if(half!='L')sh(40,20,1);
   if(half!='L'){for(let j=-9;j<=9;j++)for(let i=-7;i<=7;i++){const d=i*i/49+j*j/81;if(d>1)continue;x.fillStyle=d>.8?'#4a3e5e':j<-3&&i<0?'#f4f0fa':d>.5?'#a89ec0':'#d8d0e8';x.fillRect(29+i,11+j,1,1)}
    x.fillStyle='#000000';x.fillRect(23,10,13,2);x.fillStyle='#b070ff';x.fillRect(25,10,9,1)}};
  tex(this,'rw',56,72,2,x=>body(x));tex(this,'rwL',56,72,2,x=>body(x,'L'));tex(this,'rwR',56,72,2,x=>body(x,'R'));
  tex(this,'rwb',44,18,2,x=>{for(let i=0;i<60;i++){const t=i/59,a=Math.PI*(.15+.7*t),cx=22-Math.cos(a)*18,cy=16-Math.sin(a)*13,w=2.2*Math.sin(t*Math.PI)+.5;disc(x,cx,cy,w,'#d8b0ff');x.fillStyle='#ffffff';x.fillRect(Math.round(cx),Math.round(cy-w+.5),1,1)}});
  tex(this,'rwo',14,14,2,x=>{disc(x,7,7,6,'#e0c8ff');disc(x,7,7,5,'#000000');x.fillStyle='#8a5ad0';x.fillRect(4,4,2,1);x.fillStyle='#ffffff';x.fillRect(9,9,1,1)})}
 bossStart(){this.lv.rooms.forEach(m=>{m.food.forEach(f=>{if(f.spr){f.spr.destroy();f.spr=null}});m.en.forEach(e=>{for(const k of['spr','lvT','ring','mk','lsh'])if(e[k]){e[k].destroy();e[k]=null}if(e.aim){e.aim.forEach(r=>r.destroy());e.aim=null}})});
  (this.prj||[]).forEach(q=>q.o.destroy());this.prj=[];this.rwTex();
  this.zi=3;this.boss=true;this.exR=0;this.exT=0;this.zt0=this.time.now;if(this.exTx)this.exTx.setVisible(false);if(this.hvT)this.hvT.setVisible(false);
  const room={r:0,c:0,d:{N:0,S:0,W:0,E:0},ct:{},hp:{},obs:[],zn:[],food:[],en:[],seen:1,tr:'void',dd:5};
  for(const[c,r]of[[3,2],[16,2],[3,6],[16,6],[8,7],[11,7]])room.food.push({t:'s',c,r,p:0,on:1});
  const lv=Math.min(18,this.plv+2),MH=Math.round(520+60*this.plv);
  room.en.push({k:'rw',x:400,y:150,on:1,mh:MH,hp:MH,lv,df:1+.06*(lv-1),st:'intro',tm:2.6,chain:0,echo:0,cd:1});
  this.lv={rooms:[room],start:room,exit:null,at:(r,c)=>r==0&&c==0?room:null};
  const p=this.pl;p.setPosition(400,292);p.setVelocity(0,0);this.vx=this.vy=this.jx=this.jy=0;this.sp.forEach((q,i)=>{q.x=400;q.y=292+7*(i+1)});this.en=Math.min(this.emax,this.en+40);this.inv=2;this.rwo=[];
  this.enter(room);
  for(const[x,y,sc]of[[110,92,.8],[690,96,.9],[118,282,.7],[684,286,.85]]){const im=this.add.image(x,y,'rift').setDepth(1).setTint(0x9a70ff).setAlpha(.45).setScale(sc);this.dec.push(im);this.tweens.add({targets:im,alpha:{from:.25,to:.6},duration:1400+Math.random()*600,yoyo:true,repeat:-1})}
  const ov=this.add.rectangle(400,180,800,360,0x000000,1).setDepth(150);this.tweens.add({targets:ov,alpha:0,duration:1400,onComplete:()=>ov.destroy()});
  const t1=this.add.text(400,118,'공허의 가장자리',ST({fontSize:'24px',fontStyle:'bold',color:'#e8d0ff'})).setOrigin(.5).setDepth(151),t2=this.add.text(400,152,'바깥으로 이어지는 틈 앞에, 무언가가 서 있다 · 에너지 +40',ST({fontSize:'13px',color:'#b8aed2'})).setOrigin(.5).setDepth(151);
  this.tweens.add({targets:[t1,t2],alpha:0,delay:2600,duration:700,onComplete:()=>{t1.destroy();t2.destroy()}})}
 rwNoise(){if(!this.boss||!this.cur)return;const m=this.cur.en.find(e=>e.on&&e.k=='rw');if(!m||m.gone||m.st=='echo'||m.st=='intro')return;if(Math.hypot(this.pl.x-m.x,this.pl.y-m.y)<230&&m.echo<5)m.echo++}
 rwBar(g,m){const r=Math.max(0,m.hp/m.mh);g.fillStyle(0x0d0818,.8).fillRoundedRect(296,6,208,40,6);g.fillStyle(0x3a2f57).fillRect(302,22,196,6);g.fillStyle(m.st=='tired'?0xffe066:0xb070ff).fillRect(302,22,196*r,6);
  if(!this.rwNm)this.rwNm=this.add.text(400,14,'공허를 걷는 자',ST({fontSize:'10px',fontStyle:'bold',color:'#e0c8ff'})).setOrigin(.5).setDepth(61);
  for(let i=0;i<5;i++)g.fillStyle(i<m.echo?0xff6af0:0x3a2f57,.95).fillCircle(372+i*14,37,3.2)}
 rwAI(m,dt,p){const s=m.spr,now=this.time.now,P2=m.hp<m.mh*.6,P3=m.hp<m.mh*.3,dmg=v=>Math.round(v*(m.df||1));m.tm-=dt;m.cd-=dt;
  if(!m.bld){m.bld=this.add.image(m.x+50,m.y-20,'rwb').setDepth(9.5);m.ba=0}
  if(m.st!='throw'&&m.st!='split'){m.ba+=dt*1.2;m.bld.setPosition(m.x+Math.cos(m.ba)*58,m.y-6+Math.sin(m.ba)*22).setRotation(m.ba+1.6).setVisible(!m.gone&&m.st!='intro').setAlpha(m.st=='tired'?.4:1)}
  switch(m.st){
  case 'intro':s.setAlpha(Math.min(1,Math.max(0,1-m.tm/2.6)));if(m.tm<=0){m.st='idle';m.cd=.8;this.exc(m)}break;
  case 'idle':s.setPosition(m.x,m.y+Math.sin(now/500)*3);
   if(m.echo>=5){this.rwEcho(m);break}
   if(m.cd<=0){
    if(m.chain>=4){m.st='tired';m.tm=3.2;m.chain=0;s.setTint(0x6a5a90);this.dtx(m.x,m.y-86,'지쳤다 — 지금 물 것!','#ffe066');break}
    if(P2&&m.needSplit){m.needSplit=0;this.rwSplit(m);break}
    if(P3&&!m.thr&&Math.random()<.5){this.rwThrow(m);break}
    if(Math.random()<(P2?.3:.22)&&!this.rwo.some(q=>q.on)){this.rwOrb(m);m.cd=.6;break}
    this.rwWalk(m)}break;
  case 'walk':if(m.tm<=0){const q=m.wt;m.x=q.x;m.y=q.y;m.gone=0;s.setPosition(m.x,m.y).setAlpha(1);m.chain++;
    if(q.rf){const rf=q.rf;this.tweens.add({targets:rf,alpha:0,scaleX:.3,duration:900,onComplete:()=>rf.destroy()})}if(q.rg)q.rg.destroy();m.wt=null;
    const sl=this.add.ellipse(m.x,m.y+44,124,77,0xe0b0ff,.4).setDepth(12);this.tweens.add({targets:sl,alpha:0,scale:1.2,duration:260,onComplete:()=>sl.destroy()});this.cameras.main.shake(90,.004);
    if(((p.x-m.x)/62)**2+((p.y-m.y-44)/38)**2<1)this.hurt(dmg(14),'공허를 걷는 자의 칼날',m);
    m.st='idle';m.cd=P3?.35:.6}break;
  case 'tired':s.setPosition(m.x,m.y+6+Math.sin(now/300)*1.5);if(m.tm<=0){s.clearTint();m.st='idle';m.cd=.5;if(P2)m.needSplit=1}break;
  case 'echo':if(m.tm<=0){if(m.rg){m.rg.destroy();m.rg=null}const b=this.add.circle(m.x,m.y+20,140,0xc070ff,.35).setDepth(12);this.tweens.add({targets:b,alpha:0,scale:1.15,duration:350,onComplete:()=>b.destroy()});this.cameras.main.shake(160,.006);
    if(Math.hypot(p.x-m.x,p.y-m.y-20)<140)this.hurt(dmg(18),'메아리',m);m.echo=0;m.st='idle';m.cd=.8}break;
  case 'split':this.rwSplitU(m,dt,p);break;
  case 'throw':this.rwThrowU(m,dt,p);break}
  if(m.st!='split'&&m.st!='intro')s.setVisible(!m.gone);
  // 구석의 틈에서 유충이 흘러나온다 (보스전 에너지 공급)
  m.fd=(m.fd??6)-dt;if(m.fd<=0){m.fd=11;const fo=this.cur.food.filter(f=>f.on).length;if(fo<5)for(let i=0;i<2;i++){const[cx,cy]=pick([[110,92],[690,96],[118,282],[684,286]]),f={t:'s',x:cx+(Math.random()-.5)*20,y:cy+(Math.random()-.5)*14,c:-1,r:-1,p:0,on:1};f.spr=this.add.image(f.x,f.y,'f_s').setDepth(5);this.cur.food.push(f)}}
  this.rwOrbU(dt,p)}
 rwWalk(m){const p=this.pl;let tx=400,ty=150;for(let i=0;i<24;i++){const a=Math.random()*6.283,r=70+Math.random()*50;tx=Phaser.Math.Clamp(p.x+Math.cos(a)*r,110,690);ty=Phaser.Math.Clamp(p.y+Math.sin(a)*r*.7-44,92,236);if(Math.hypot(tx-m.x,ty-m.y)>120)break}
  const T=m.hp<m.mh*.3?.55:.75;m.st='walk';m.tm=T;m.gone=1;
  const gh=this.add.image(m.x,m.spr.y,'rw').setDepth(8.9).setAlpha(.85).setScale(1.2);this.tweens.add({targets:gh,scaleX:.05,alpha:0,duration:260,onComplete:()=>gh.destroy()});
  const old=this.add.image(m.x,m.y+10,'rift').setDepth(1.2).setTint(0x9a70ff).setAlpha(.7);this.dec.push(old);this.tweens.add({targets:old,alpha:0,duration:2600,onComplete:()=>old.destroy()});
  const rf=this.add.image(tx,ty+8,'rift').setDepth(5.5).setTint(0xe0a0ff).setScale(.2);this.tweens.add({targets:rf,scaleX:1.3,scaleY:1.7,duration:T*1000});
  const rg=this.add.ellipse(tx,ty+44,124,77).setStrokeStyle(2,0xff5a7a,.95).setFillStyle(0xff3b4f,.12).setDepth(1.5);this.tweens.add({targets:rg,alpha:{from:.35,to:1},duration:T*1000});
  m.wt={x:tx,y:ty,rf,rg}}
 rwEcho(m){m.st='echo';m.tm=1.1;m.rg=this.add.circle(m.x,m.y+20,140).setStrokeStyle(3,0xff5a7a,.95).setFillStyle(0xff3b4f,.1).setDepth(1.5).setScale(.3);this.tweens.add({targets:m.rg,scale:1,duration:1050});this.dtx(m.x,m.y-86,'메아리!','#ff9ac0')}
 rwOrb(m){const o=this.add.image(m.x,m.y-10,'rwo').setDepth(11);this.tweens.add({targets:o,scale:{from:.9,to:1.2},duration:400,yoyo:true,repeat:-1});this.rwo.push({o,x:m.x,y:m.y-10,v:62,t:7,on:1});this.dtx(m.x,m.y-86,'무의 구체','#c8b8ff')}
 rwOrbU(dt,p){for(const q of this.rwo){if(!q.on)continue;q.t-=dt;const a=Math.atan2(p.y-q.y,p.x-q.x);q.x+=Math.cos(a)*q.v*dt;q.y+=Math.sin(a)*q.v*dt;q.o.setPosition(q.x,q.y);
   if(Math.random()<.3){const b=this.add.circle(q.x,q.y,1.5,0x8a5ad0,.7).setDepth(10.5);this.tweens.add({targets:b,alpha:0,duration:300,onComplete:()=>b.destroy()})}
   if(Math.hypot(p.x-q.x,p.y-q.y)<15){q.on=0;q.o.destroy();this.sil=2.6;this.dtx(p.x,p.y-28,'침묵 — 2.6초 동안 물기·섭취 불가','#b0a0d0');this.hurt(3,'무의 구체',null)}
   else if(q.t<=0){q.on=0;const o=q.o;this.tweens.add({targets:o,alpha:0,scale:.2,duration:300,onComplete:()=>o.destroy()})}}
  this.rwo=this.rwo.filter(q=>q.on)}
 rwSplit(m){m.st='split';m.ss=0;m.tm=1.1;m.sa=Math.random()*Math.PI;m.sd=Math.random()<.5?1:-1;m.spr.setVisible(false);m.gone=0;
  m.hL=this.add.image(m.x,m.y,'rwL').setDepth(9).setScale(1.2);m.hR=this.add.image(m.x,m.y,'rwR').setDepth(9).setScale(1.2);m.ln=this.add.graphics().setDepth(8.8);m.bld.setVisible(false);
  this.dtx(400,62,'몸이 갈라진다 — 가운데 틈(초록 원)으로!','#c9f7dd')}
 rwSplitU(m,dt,p){const cx=400,cy=196,R=150,g=m.ln,V=.55;g.clear();const pos=()=>[[cx+Math.cos(m.sa)*R,cy+Math.sin(m.sa)*R*V],[cx-Math.cos(m.sa)*R,cy-Math.sin(m.sa)*R*V]];
  g.lineStyle(2,0x7be0a8,.85).strokeEllipse(cx,cy,56,32);
  if(m.ss==0){const k=1-Math.max(0,m.tm)/1.1,[a,b]=pos();m.hL.setPosition(Phaser.Math.Linear(m.x,b[0],k),Phaser.Math.Linear(m.y,b[1]-40,k));m.hR.setPosition(Phaser.Math.Linear(m.x,a[0],k),Phaser.Math.Linear(m.y,a[1]-40,k));
   for(let t=-1;t<=1.001;t+=.04){if(Math.abs(t)*R<28)continue;const x=cx+Math.cos(m.sa)*R*t,y=cy+Math.sin(m.sa)*R*V*t;if(Math.round(t*25)%2)g.fillStyle(0xff5a7a,.85).fillRect(x-1.5,y-1.5,3,3)}
   if(m.tm<=0){m.ss=1;m.tm=4.4}}
  else if(m.ss==1){m.sa+=m.sd*.85*dt;const[a,b]=pos();m.hR.setPosition(a[0],a[1]-40);m.hL.setPosition(b[0],b[1]-40);m.x=a[0];m.y=a[1]-40;
   for(const sg of[-1,1]){const x0=cx+Math.cos(m.sa)*28*sg,y0=cy+Math.sin(m.sa)*28*V*sg,x1=cx+Math.cos(m.sa)*R*sg,y1=cy+Math.sin(m.sa)*R*V*sg;g.lineStyle(8,0x8a3aff,.35).lineBetween(x0,y0,x1,y1);g.lineStyle(3,0xe8d0ff,.95).lineBetween(x0,y0,x1,y1)}
   const ux=Math.cos(m.sa),uy=Math.sin(m.sa)*V,L=Math.hypot(ux,uy),nx=ux/L,ny=uy/L,rx=p.x-cx,ry=p.y-cy,t=rx*nx+ry*ny,dd=Math.abs(rx*ny-ry*nx);
   if(Math.abs(t)>28*L&&Math.abs(t)<R*L&&dd<9)this.hurt(Math.round(12*(m.df||1)),'어긋난 몸 사이의 선',m);
   if(m.tm<=0){m.ss=2;m.tm=.7}}
  else{const k=Math.min(1,dt*6);m.hL.setPosition(Phaser.Math.Linear(m.hL.x,400,k),Phaser.Math.Linear(m.hL.y,150,k));m.hR.setPosition(Phaser.Math.Linear(m.hR.x,400,k),Phaser.Math.Linear(m.hR.y,150,k));m.x=m.hR.x;m.y=m.hR.y;
   if(m.tm<=0){m.hL.destroy();m.hR.destroy();m.ln.destroy();m.hL=m.hR=m.ln=null;m.x=400;m.y=150;m.spr.setPosition(m.x,m.y).setVisible(true);m.st='idle';m.cd=.6}}}
 rwThrow(m){m.st='throw';m.thr=1;m.tm=.6;m.ts=0;const p=this.pl;m.tx0=m.bld.x;m.ty0=m.bld.y;m.tx1=p.x;m.ty1=p.y;const c=m.tc=[(m.tx0+m.tx1)/2+(m.ty1-m.ty0)*.4,(m.ty0+m.ty1)/2-(m.tx1-m.tx0)*.4],g=m.tg=this.add.graphics().setDepth(1.6);
  for(let i=0;i<=26;i++){const t=i/26,x=(1-t)**2*m.tx0+2*(1-t)*t*c[0]+t*t*m.tx1,y=(1-t)**2*m.ty0+2*(1-t)*t*c[1]+t*t*m.ty1;if(i%2==0)g.fillStyle(0xff5a7a,.9).fillRect(x-1.5,y-1.5,3,3)}}
 rwThrowU(m,dt,p){if(m.ts==0){if(m.tm<=0){m.ts=1;m.tt=0;if(m.tg){m.tg.destroy();m.tg=null}}return}
  m.tt+=dt/1.5;const t=m.tt<.5?m.tt*2:2-m.tt*2,c=m.tc,x=(1-t)**2*m.tx0+2*(1-t)*t*c[0]+t*t*m.tx1,y=(1-t)**2*m.ty0+2*(1-t)*t*c[1]+t*t*m.ty1;m.bld.setPosition(x,y).setRotation(m.tt*25).setVisible(true).setAlpha(1);
  if(Math.hypot(p.x-x,p.y-y)<18)this.hurt(Math.round(12*(m.df||1)),'떨어진 칼날',m);
  if(m.tt>=1){m.st='idle';m.cd=.4;this.time.delayedCall(6000,()=>{m.thr=0})}}
 rwDie(m){m.on=0;m.gone=1;this.kc=(this.kc||0)+1;const x=m.x,y=m.y;if(m.lvT){m.lvT.destroy();m.lvT=null}if(m.bld){m.bld.destroy();m.bld=null}
  for(const k of['hL','hR','ln','rg','tg'])if(m[k]){m[k].destroy();m[k]=null}if(m.wt){if(m.wt.rf)m.wt.rf.destroy();if(m.wt.rg)m.wt.rg.destroy();m.wt=null}
  this.rwo.forEach(q=>{if(q.on){q.on=0;q.o.destroy()}});this.rwo=[];if(this.rwNm){this.rwNm.destroy();this.rwNm=null}
  if(m.spr){m.spr.destroy();m.spr=null}
  const L=this.add.image(x,y,'rwL').setDepth(9).setScale(1.2),Rr=this.add.image(x,y,'rwR').setDepth(9).setScale(1.2);
  this.tweens.add({targets:L,x:x-44,alpha:0,angle:-8,duration:1700,ease:'Quad.in'});this.tweens.add({targets:Rr,x:x+44,y:y-6,alpha:0,angle:8,duration:1700,ease:'Quad.in'});
  for(let i=0;i<60;i++){const b=this.add.rectangle(x+(Math.random()-.5)*50,y+(Math.random()-.5)*110,2,2,[0xffffff,0xb8a0ff,0x8a5ad0][i%3]).setDepth(13);this.tweens.add({targets:b,x:b.x+(Math.random()-.5)*170,y:b.y+(Math.random()-.5)*90,alpha:0,duration:1400+Math.random()*900,onComplete:()=>b.destroy()})}
  const rf=this.add.image(x,y+10,'rift').setDepth(5.5).setTint(0xffffff).setScale(.3);this.tweens.add({targets:rf,scaleX:2.2,scaleY:3,duration:1800,ease:'Sine.out'});this.cameras.main.shake(400,.006);
  this.gainXp(200);this.dtx(x,y-90,'공허를 걷는 자를 쓰러뜨렸다','#ffe066');
  this.time.delayedCall(2400,()=>{if(!this.over)this.ending()})}
 ending(){this.over=true;this.pl.setVelocity(0,0);this.pl.anims.stop();const tm=Math.round((this.time.now-this.t0)/1000),stat='생존 '+Math.floor(tm/60)+':'+String(tm%60).padStart(2,'0')+'  ·  Lv.'+this.plv+'  ·  탈피 '+this.molts+'회  ·  처치 '+(this.kc||0);
  const O=[],A=o=>{O.push(o);return o};A(this.add.rectangle(400,180,800,360,0x07040e,.9).setDepth(200));
  A(this.add.text(400,70,'틈 너머에서 바깥의 빛이 새어 든다',ST({fontSize:'22px',fontStyle:'bold'})).setOrigin(.5).setDepth(201));
  A(this.add.text(400,102,'공허를 걷는 자가 지키던 틈이 열렸다. 어디로 갈 것인가.',ST({fontSize:'13px',color:'#a99fc2'})).setOrigin(.5).setDepth(201));
  const fin=(t,body)=>{O.forEach(o=>o.destroy());this.end(t,stat,'처음부터',body)};
  const btn=(x,lb,sub,col,fn)=>{A(this.add.text(x,180,lb,ST({fontSize:'18px',fontStyle:'bold',color:'#12091f',backgroundColor:col,padding:{x:22,y:12}})).setOrigin(.5).setDepth(201).setInteractive().on('pointerdown',fn));A(this.add.text(x,222,sub,ST({fontSize:'11px',color:'#8f86a8'})).setOrigin(.5).setDepth(201))};
  btn(270,'공허에 남는다','이 몸은 이미 공허의 일부다','#a65cff',()=>fin('엔딩 Ⅰ — 공허에 남다','기생충은 틈을 등지고 어둠으로 돌아갔다 · 공허는 또 하나의 포식자를 얻었다'));
  btn(530,'밖으로 나간다','아무도 모르는 바깥으로','#e8d8ff',()=>fin('엔딩 Ⅱ — 밖으로','기생충은 틈을 지나 낯선 빛 속으로 기어 나왔다 · 바깥은 아직 모른다, 공허가 무엇을 내보냈는지'))}
