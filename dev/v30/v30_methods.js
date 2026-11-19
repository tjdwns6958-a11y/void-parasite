 // ===== v30: 중간 보스 교체 (허기의 왕관 · 숨 쉬는 산호 환초 · 틈 너머의 관찰자) =====
 mb30Tex(){this.emTex();if(this.textures.exists('hcrH'))return;
  const BAY=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];let sd=4242;const R=()=>{sd=sd*16807%2147483647;return sd/2147483647};
  const P=(x,X,Y,c,a)=>{x.globalAlpha=a??1;x.fillStyle=c;x.fillRect(Math.round(X),Math.round(Y),1,1);x.globalAlpha=1};
  const sell=(x,cx,cy,rx,ry,pal,ol)=>{const pts=[];for(let y=Math.floor(cy-ry)-1;y<=cy+ry+1;y++)for(let i=Math.floor(cx-rx)-1;i<=cx+rx+1;i++){const nx=(i+.5-cx)/rx,ny=(y+.5-cy)/ry,d=nx*nx+ny*ny;if(d<=1){const v=(nx*.55+ny*.83)*.55+Math.sqrt(1-d)*.55,t=v+(BAY[(y%4+4)%4][(i%4+4)%4]/16-.5)*.18;pts.push([i,y,pal[t<.12?0:t<.45?1:t<.78?2:3]])}}
   if(ol){const S=new Set(pts.map(q=>q[0]+','+q[1]));for(const[i,y]of pts)for(const[u,v]of[[1,0],[-1,0],[0,1],[0,-1]])if(!S.has((i+u)+','+(y+v)))P(x,i+u,y+v,ol)}for(const[i,y,c]of pts)P(x,i,y,c)};
  const poly=(x,pts,c,a)=>{x.globalAlpha=a??1;x.fillStyle=c;x.beginPath();x.moveTo(pts[0][0],pts[0][1]);for(const q of pts.slice(1))x.lineTo(q[0],q[1]);x.closePath();x.fill();x.globalAlpha=1};
  const line=(x,x0,y0,x1,y1,c,a)=>{const n=Math.ceil(Math.max(Math.abs(x1-x0),Math.abs(y1-y0)))+1;for(let i=0;i<=n;i++)P(x,x0+(x1-x0)*i/n,y0+(y1-y0)*i/n,c,a)};
  const bez=(p,t)=>{while(p.length>1){const q=[];for(let i=0;i<p.length-1;i++)q.push([p[i][0]+(p[i+1][0]-p[i][0])*t,p[i][1]+(p[i+1][1]-p[i][1])*t]);p=q}return p[0]};
  const glow=(x,cx,cy,r,c,a)=>{const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=a;x.globalCompositeOperation='lighter';x.fillStyle=g;x.fillRect(cx-r,cy-r,r*2,r*2);x.globalCompositeOperation='source-over';x.globalAlpha=1};
  const stars=(x,cx,cy,rx,ry,base,dens)=>{for(let y=Math.floor(cy-ry);y<=cy+ry;y++)for(let i=Math.floor(cx-rx);i<=cx+rx;i++){if(((i-cx)/rx)**2+((y-cy)/ry)**2>1)continue;const r=R();P(x,i,y,r<dens*.15?'#ffffff':r<dens*.5?(R()<.5?'#c0a8ff':'#8a7ab8'):r<dens?'#2a2040':base)}};
  const MASK=['#6a6080','#a89ec0','#d8d0e8','#f4f0fa'],CHI=['#3a3048','#6e6484','#b0a6c8','#ece6f8'],WD=['#160f26','#30254a','#584a80','#9a8ac8'];
  // 허기의 왕관: 가운데 텅 빈 구멍
  tex(this,'hcrH',72,50,2,x=>{stars(x,36,25,30,20,'#000000',.07);for(let a=0;a<6.283;a+=.02){const X=36+Math.cos(a)*30,Y=25+Math.sin(a)*20;P(x,X,Y,'#ff6af0');P(x,36+Math.cos(a)*28.5,25+Math.sin(a)*19,'#ffd0f8',.5)}glow(x,36,25,30,'#ff3fd0',.35);
   for(let k=0;k<14;k++){const a=k/14*6.283;line(x,36+Math.cos(a)*22,25+Math.sin(a)*14,36+Math.cos(a)*27,25+Math.sin(a)*17.5,'#f4e8ff',.8)}});
  // 송곳니 턱 한 쌍 (오른쪽을 봄)
  tex(this,'hcrJ',34,34,2,x=>{const cx=8,cy=17;for(const s of[-1,1]){const P0=[cx,cy+s*3],P1=[cx+10,cy+s*13],P2=[cx+24,cy+s*4];const o=[];for(let t=0;t<=14;t++)o.push(bez([P0,P1,P2],t/14));const inn=o.map((q,i)=>{const w=4.2*(1-i/15)+.5;return[q[0]+(i<14?-(o[i+1][1]-q[1]):0)*0+0,q[1]-s*w]});
    poly(x,o.concat(inn.slice().reverse()),CHI[2]);for(let i=0;i<14;i++){line(x,o[i][0],o[i][1],o[i+1][0],o[i+1][1],CHI[3]);P(x,inn[i][0],inn[i][1],CHI[1])}for(let i=3;i<13;i+=3)line(x,inn[i][0],inn[i][1],inn[i][0]+1,inn[i][1]-s*2,'#ffffff')}
   sell(x,cx,cy,4.5,4.5,['#1a0a2e','#40206e','#7a50b8','#c8a8ff'],'#0a0610');P(x,cx,cy,'#ff9af4');glow(x,cx,cy,6,'#ff3fd0',.6)});
  // 환초의 가면 (감은 눈 / 뜬 눈)
  const mask=(x,open)=>{const cx=19,cy=24;sell(x,cx,cy,15,20,MASK,'#12051a');for(const s of[-1,1]){const ex=cx+s*6,ey=cy-5;if(open){line(x,ex-3,ey,ex+3,ey,'#000000');line(x,ex-2,ey+1,ex+2,ey+1,'#000000');P(x,ex,ey,'#ff6af0');glow(x,ex,ey,5,'#ff3fd0',.9)}else{line(x,ex-3,ey,ex+3,ey+1,'#1a0a2e')}}
   line(x,cx,cy+4,cx,cy+15,'#000000');line(x,cx+1,cy+5,cx+1,cy+14,'#2a0a30')};
  tex(this,'atlM',38,46,2,x=>mask(x,0));tex(this,'atlMo',38,46,2,x=>mask(x,1));
  tex(this,'atlP',18,18,2,x=>{sell(x,9,9,5.5,5.5,['#3a1048','#7a2a8a','#c060d0','#ffb0f0'],'#100818');for(let t=0;t<8;t++){const a=t/8*6.283;line(x,9+Math.cos(a)*5.5,9+Math.sin(a)*5.5,9+Math.cos(a)*8.5,9+Math.sin(a)*8.5,'#e080ff')}P(x,9,9,'#000000');glow(x,9,9,7,'#ff3fd0',.5)});
  // 틈 너머의 관찰자: 큰 틈 · 눈 · 동공 · 갑주 조각 · 가장자리 작은 틈
  tex(this,'obsR',70,84,2,x=>{const pts=[];for(let k=0;k<32;k++){const t=k/32*6.283,r=1+(R()-.5)*.35;pts.push([35+Math.cos(t)*30*r*(.62+.38*Math.abs(Math.cos(t))),42+Math.sin(t)*38*r])}poly(x,pts,'#000000');
   for(let i=0;i<260;i++){const X=5+R()*60,Y=4+R()*76;const c=x.getImageData(X|0,Y|0,1,1).data;if(c[3]>200)P(x,X,Y,R()<.2?'#ffffff':'#8a7ab8')}
   for(let k=0;k<32;k++){const a=pts[k],b=pts[(k+1)%32];line(x,a[0],a[1],b[0],b[1],'#e0a0ff');line(x,(a[0]*2+35)/3,(a[1]*2+42)/3,(b[0]*2+35)/3,(b[1]*2+42)/3,'#ffffff',.15)}glow(x,35,42,40,'#8a3aff',.35)});
  tex(this,'obsE',56,40,2,x=>{for(let y=0;y<40;y++)for(let i=0;i<56;i++){const d=((i-28)/27)**2+((y-20)/19)**2;if(d>1)continue;const t=Math.min(1,Math.pow(d,1.5)*1.1),c0=[200,190,214],c1=[42,26,58];P(x,i,y,'rgb('+c0.map((v,k)=>Math.round(v+(c1[k]-v)*t)).join(',')+')')}
   for(let k=0;k<9;k++){let X=4+R()*48,Y=6+R()*28;for(let j=0;j<6;j++){const nX=X+(28-X)*.12+(R()-.5)*3,nY=Y+(20-Y)*.12+(R()-.5)*3;if(((nX-28)/27)**2+((nY-20)/19)**2<.95)line(x,X,Y,nX,nY,'#c03050',.6);X=nX;Y=nY}}
   sell(x,28,20,12,12,['#7a3a0a','#d07a1a','#ffa040','#ffd890']);glow(x,28,20,14,'#ff8a20',.5)});
  tex(this,'obsP',8,18,2,x=>{sell(x,4,9,2.6,8,['#000000','#000000','#1a0a10','#3a1a20']);P(x,3,4,'#ffffff')});
  tex(this,'obsS',14,20,2,x=>{sell(x,7,10,5.5,8.5,WD,'#05030a');line(x,7,3,7,17,'#9a8ac8',.8);P(x,5,5,'#e0d8ff')});
  tex(this,'obsr',22,24,2,x=>{const pts=[];for(let k=0;k<20;k++){const t=k/20*6.283,r=1+(R()-.5)*.3;pts.push([11+Math.cos(t)*8*r,12+Math.sin(t)*10*r])}poly(x,pts,'#000000');for(let k=0;k<20;k++){const a=pts[k],b=pts[(k+1)%20];line(x,a[0],a[1],b[0],b[1],'#9a60ff')}glow(x,11,12,12,'#8a3aff',.4)});
  tex(this,'obse',14,10,2,x=>{sell(x,7,5,6,4,['#2a1a3a','#8a7a9a','#d8d0e0','#f4f0fa']);sell(x,7,5,2.2,2.2,['#7a3a0a','#d07a1a','#ffa040','#ffd890']);P(x,7,5,'#000000');P(x,7,4,'#000000')})}
 // ===== 허기의 왕관 =====
 hcrAI(m,dt,p){const now=this.time.now,gr=m.gr||0,D=v=>Math.round(v*m.df*(1+.12*gr)),en=m.hp<m.mh*.3?.8:1;if(!m.g)m.g=this.add.graphics().setDepth(1.5);const g=m.g;g.clear();
  if(!m.jw){m.jw=[];for(let i=0;i<6;i++)m.jw.push({i,o:this.add.image(m.x,m.y,'hcrJ').setDepth(9.2),x:m.x,y:m.y,a:i/6*6.283,st:'ring',fa:0})}
  if(m.st=='intro'){for(const j of m.jw){j.x=m.x+Math.cos(j.a)*88;j.y=m.y+Math.sin(j.a)*58;j.fa=j.a;j.o.setPosition(j.x,j.y).setRotation(j.a)}return}
  m.cd-=dt;m.tm-=dt;m.rot=(m.rot||0)+dt*.45;
  if(m.st!='inhale'&&m.st!='inhaleW'){const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1;if(d>130){m.x+=dx/d*26*dt;m.y+=dy/d*18*dt}m.x=Phaser.Math.Clamp(m.x,190,610);m.y=Phaser.Math.Clamp(m.y,120,230)}
  m.gone=m.st=='scatter'?0:1;m.spr.setPosition(m.x,m.y).setScale(1+.04*Math.sin(now/280)+.05*gr).setAlpha(m.gone?.9:1);
  if(!m.gone){const pu=.5+.5*Math.sin(now/90);g.lineStyle(2,0xffe066,.4+.4*pu).strokeEllipse(m.x,m.y,150,104)}
  const sc=1+.13*gr;
  for(const j of m.jw){
   if(j.st=='ring'){const a=j.a+m.rot,tx=m.x+Math.cos(a)*88,ty=m.y+Math.sin(a)*58,k=Math.min(1,dt*5);j.x+=(tx-j.x)*k;j.y+=(ty-j.y)*k;j.fa=a}
   else if(j.st=='go'){const lx=j.tx-j.x,ly=j.ty-j.y,ll=Math.hypot(lx,ly);if(ll<400*dt){j.x=j.tx;j.y=j.ty;j.st='hold'}else{j.x+=lx/ll*400*dt;j.y+=ly/ll*400*dt}j.fa=Math.atan2(p.y-j.y,p.x-j.x)}
   else if(j.st=='aim'){j.t-=dt;j.fa=Math.atan2(j.ty-j.y,j.tx-j.x);if(j.t<=0)j.st='lunge'}
   else if(j.st=='lunge'){const lx=j.tx-j.x,ly=j.ty-j.y,ll=Math.hypot(lx,ly),v=j.v||460;if(ll<v*dt){j.x=j.tx;j.y=j.ty;j.st='rest';j.t=.8+Math.random()*.6;const r=this.add.circle(j.x,j.y,10,0xffd0f0,.5).setDepth(12);this.tweens.add({targets:r,scale:2,alpha:0,duration:220,onComplete:()=>r.destroy()})}else{j.x+=lx/ll*v*dt;j.y+=ly/ll*v*dt}j.fa=Math.atan2(ly,lx)}
   else if(j.st=='rest'){j.t-=dt;if(j.t<=0){if(m.st=='scatter'&&j.i%3!=2)this.hcLunge(m,j,en);else if(m.st=='scatter'){j.st='go';j.tx=j.i<3?90:710;j.ty=j.i<3?80:290}else j.st='ring'}}
   else if(j.st=='hold'&&m.st!='scatter'&&m.st!='clamp')j.st='ring';
   j.o.setPosition(j.x,j.y).setRotation(j.fa).setScale(sc);
   if(Math.hypot(p.x-j.x,p.y-j.y)<20*sc&&!(j.hc>now)){j.hc=now+1000;this.hurt(D(j.st=='lunge'?13:6),'허기의 턱',m)}}
  switch(m.st){
  case 'crown':if(m.cd<=0){const r=Math.random();m.ns=m.ns||0;
    if(m.ns>=2||(m.ns>=1&&r<.5)){m.st='scatter';m.tm=6.5;m.ns=0;this.dtx(m.x,m.y-50,'왕관이 풀렸다 — 지금 구멍을 물 것!','#ffe066');m.jw.forEach((j,i)=>{j.st='rest';j.t=.15+i*.12})}
    else if(r<.8||m.inc>now){m.ns++;this.hcClamp(m,D,en)}
    else{m.ns++;m.st='inhaleW';m.tm=.8;m.inc=now+9000;this.dtx(m.x,m.y-50,'들숨 — 유충을 먼저 먹을 것!','#ff9ac0')}}break;
  case 'scatter':if(m.tm<=0){m.st='crown';m.cd=1.2;m.jw.forEach(j=>{j.st='ring'})}break;
  case 'clamp':if(m.tm<=0){m.st='crown';m.cd=.9*en}break;
  case 'inhaleW':{const k=1-m.tm/.8;for(let i=0;i<10;i++){const a=i/10*6.283+now/300,r=220-160*k;g.fillStyle(0xff5a7a,.8).fillCircle(m.x+Math.cos(a)*r,m.y+Math.sin(a)*r*.6,2.5)}if(m.tm<=0){m.st='inhale';m.tm=2.2;this.emPull={x:m.x,y:m.y,v:40}}}break;
  case 'inhale':{if(this.emPull)this.emPull.v=40+38*(1-m.tm/2.2);g.lineStyle(2,0xff5a7a,.5).strokeEllipse(m.x,m.y,96,64);
   for(let i=0;i<3;i++){const a=Math.random()*6.283,r=60+Math.random()*180,b=this.add.circle(m.x+Math.cos(a)*r,m.y+Math.sin(a)*r*.6,1.5,0xe8d8ff,.8).setDepth(12);this.tweens.add({targets:b,x:m.x,y:m.y,alpha:0,duration:450,onComplete:()=>b.destroy()})}
   for(const f of this.cur.food)if(f.on&&f.spr){const fx=m.x-f.x,fy=m.y-f.y,fd=Math.hypot(fx,fy);if(fd<320){f.x+=fx/fd*95*dt;f.y+=fy/fd*95*dt;f.spr.setPosition(f.x,f.y)}if(fd<26){f.on=0;f.spr.destroy();f.spr=null;m.gr=Math.min(3,gr+1);this.dtx(m.x,m.y-56,'유충을 삼켰다 — 턱이 커졌다','#ff7a9a')}}
   if(m.tm<=0){this.emPull=null;if(((p.x-m.x)/52)**2+((p.y-m.y)/36)**2<1)this.hurt(D(26),'허기의 들숨',m);m.st='crown';m.cd=1}}break}}
 hcLunge(m,j,en){const p=this.pl;j.st='aim';j.t=.55*en;j.v=460;j.tx=Phaser.Math.Clamp(p.x+(Math.random()-.5)*50,60,740);j.ty=Phaser.Math.Clamp(p.y+(Math.random()-.5)*40,60,300);this.telAdd({k:'l',x:j.x,y:j.y,x2:j.tx,y2:j.ty,w:30,t:j.t,src:'',fx:0})}
 hcClamp(m,D,en){const p=this.pl,ring=m.jw.filter(j=>j.st=='ring');if(ring.length<2){m.st='crown';m.cd=.5;return}const a=Math.random()*3.14,L=120,ax=Math.cos(a),ay=Math.sin(a)*.8,
  x1=Phaser.Math.Clamp(p.x+ax*L,60,740),y1=Phaser.Math.Clamp(p.y+ay*L,60,300),x2=Phaser.Math.Clamp(p.x-ax*L,60,740),y2=Phaser.Math.Clamp(p.y-ay*L,60,300),A=ring[0],B=ring[Math.floor(ring.length/2)];
  A.st='go';A.tx=x1;A.ty=y1;B.st='go';B.tx=x2;B.ty=y2;m.st='clamp';m.tm=1.5;const t=.9*en,mx=(x1+x2)/2,my=(y1+y2)/2;
  this.telAdd({k:'l',x:x1,y:y1,x2,y2,w:38,t,dmg:D(22),src:'허기의 턱 — 맞물림',m,on:()=>{for(const J of[A,B]){J.st='lunge';J.v=700;J.tx=mx;J.ty=my}this.cameras.main.shake(150,.008)}})}
 // ===== 숨 쉬는 산호 환초 =====
 atlGap(m,a){for(const q of m.gp)if(Math.abs(Phaser.Math.Angle.Wrap(a-q.a))<q.w/2)return true;for(const q of m.cg)if(Math.abs(Phaser.Math.Angle.Wrap(a-q.a))<q.w/2)return true;return false}
 atlAI(m,dt,p){if(m.st=='intro'&&m.cs)return;const now=this.time.now,D=v=>Math.round(v*m.df),en=m.hp<m.mh*.35?.8:1;if(!m.g)m.g=this.add.graphics().setDepth(1.5);const g=m.g;g.clear();
  if(!m.cs){m.RX=150;m.RY=86;m.gp=[{a:.3,w:.5},{a:3.45,w:.5}];m.cg=[];m.cs=[];for(let k=0;k<28;k++){const a=k/28*6.283;m.cs.push({a,o:this.add.image(0,0,'emc').setOrigin(.5,1).setDepth(8)})}
   m.po=[];for(const a of[1.2,2.6,5.1])m.po.push({a,on:1,hp:3,o:this.add.image(0,0,'atlP').setDepth(9.3),st:'idle',t:0,ox:0,oy:0});m.lag=this.add.graphics().setDepth(.95);this.dec.push(m.lag)}
  const br=1+.035*Math.sin(now/650),RX=m.RX*br,RY=m.RY*br;
  for(const q of m.gp)q.a+=dt*.16;for(const q of m.cg)q.t-=dt;m.cg=m.cg.filter(q=>q.t>0);
  m.lag.clear();m.lag.fillStyle(0x04020a,.85).fillEllipse(m.x,m.y,RX*1.8,RY*1.8);for(let k=1;k<=3;k++)m.lag.lineStyle(1,0x3a2a6a,.6).strokeEllipse(m.x,m.y,RX*1.8*k/4,RY*1.8*k/4);
  for(const c of m.cs){const x=m.x+Math.cos(c.a)*RX,y=m.y+Math.sin(c.a)*RY;c.o.setPosition(x,y+10).setVisible(!this.atlGap(m,c.a)).setDepth(Math.sin(c.a)>0?9.6:8).setScale(1,1+.08*Math.sin(now/300+c.a*3))}
  if(m.st=='intro')return;m.cd-=dt;m.tm-=dt;
  // 고리를 가로지르는지 (틈이 아니면 막힘)
  const rr=Math.hypot((p.x-m.x)/RX,(p.y-m.y)/RY),ins=rr<1;
  if(m.pin!==undefined&&ins!==m.pin){const a=Math.atan2((p.y-m.y)/RY,(p.x-m.x)/RX);if(!this.atlGap(m,a)){p.body.reset(m.px,m.py);p.setVelocity(0,0);this.vx=this.vy=0;if(!(m.bkT>now)){m.bkT=now+700;this.dtx(p.x,p.y-24,'산호에 막혔다 — 틈으로','#e080ff')}}else m.pin=ins}else m.pin=ins;
  m.px=p.x;m.py=p.y;const inside=Math.hypot((p.x-m.x)/RX,(p.y-m.y)/RY)<1;
  m.gone=inside?0:1;const mk=inside?'atlMo':'atlM';if(m.spr.texture.key!=mk)m.spr.setTexture(mk);m.spr.setPosition(m.x,m.y+Math.sin(now/500)*2);
  // 묶인 산호충
  for(const q of m.po){const ax=m.x+Math.cos(q.a)*RX,ay=m.y+Math.sin(q.a)*RY;q.ax=ax;q.ay=ay;
   if(!q.on){q.t-=dt;q.o.setVisible(false);if(q.t<=0){q.on=1;q.hp=3;q.st='idle';q.o.setVisible(true).setScale(.2);this.tweens.add({targets:q.o,scale:1,duration:400})}continue}
   const hx=ax+Math.cos(q.a)*36,hy=ay+Math.sin(q.a)*26;
   if(q.st=='idle'){q.x=hx+Math.sin(now/400+q.a*2)*4;q.y=hy+Math.cos(now/350+q.a)*3;q.t-=dt;if(q.t<=0&&!inside&&Math.hypot(p.x-ax,p.y-ay)<150){q.st='aim';q.t=.55;q.tx=p.x;q.ty=p.y;this.telAdd({k:'l',x:q.x,y:q.y,x2:q.tx,y2:q.ty,w:26,t:.55,src:'',fx:0})}}
   else if(q.st=='aim'){q.t-=dt;if(q.t<=0){q.st='lunge';q.lh=0}}
   else if(q.st=='lunge'){const lx=q.tx-q.x,ly=q.ty-q.y,ll=Math.hypot(lx,ly);if(ll<520*dt){q.st='back'}else{q.x+=lx/ll*520*dt;q.y+=ly/ll*520*dt}if(!q.lh&&Math.hypot(p.x-q.x,p.y-q.y)<18){q.lh=1;this.hurt(D(10),'묶인 산호충',m)}}
   else if(q.st=='back'){const lx=hx-q.x,ly=hy-q.y,ll=Math.hypot(lx,ly);if(ll<300*dt){q.st='idle';q.t=2.2+Math.random()}else{q.x+=lx/ll*300*dt;q.y+=ly/ll*300*dt}}
   g.lineStyle(2,0xc060f0,.8).lineBetween(ax,ay,q.x,q.y);q.o.setPosition(q.x,q.y).setVisible(true)}
  // 안에 있으면 가면이 눈빛을 쏜다
  m.bt=(m.bt??2)-dt;if(inside&&m.bt<=0&&m.st=='idle'){m.bt=2.6*en;const a=Math.atan2(p.y-m.y,p.x-m.x),L=300;if(Math.hypot(p.x-m.x,p.y-m.y)<75)this.telAdd({k:'c',x:m.x,y:m.y,r:78,sy:.8,t:.8,dmg:D(14),src:'가면의 눈빛',m});else this.telAdd({k:'l',x:m.x,y:m.y-8,x2:m.x+Math.cos(a)*L,y2:m.y-8+Math.sin(a)*L,w:22,t:.75,dmg:D(14),src:'가면의 눈빛',m})}
  switch(m.st){
  case 'idle':if(m.cd<=0){const r=Math.random();if(r<.55||m.inc>now){m.st='exhale';m.tm=1;this.telAdd({k:'b',x:m.x,y:m.y,rx:RX,ry:RY,k2:1.42,t:1,dmg:D(16),src:'환초의 숨',m});this.dtx(m.x,m.y-RY-16,'고리가 부푼다 — 점선 밖이나 안으로!','#ff9ac0')}
    else{m.st='inhaleW';m.tm=.8;m.inc=now+9000;this.dtx(m.x,m.y-RY-16,'가면의 들숨','#ff9ac0')}}break;
  case 'exhale':if(m.tm<=0){m.st='idle';m.cd=1.6*en;for(let k=0;k<20;k++){const a=k/20*6.283,b=this.add.rectangle(m.x+Math.cos(a)*RX,m.y+Math.sin(a)*RY,3,8,0xe080ff).setRotation(a+1.57).setDepth(12);this.tweens.add({targets:b,x:m.x+Math.cos(a)*RX*1.42,y:m.y+Math.sin(a)*RY*1.42,alpha:0,duration:260,onComplete:()=>b.destroy()})}}break;
  case 'inhaleW':{const k=1-m.tm/.8;for(const q of m.gp)for(let i=0;i<3;i++){const r=(1.6-.6*k)+i*.15;g.fillStyle(0xff5a7a,.8).fillCircle(m.x+Math.cos(q.a)*RX*r,m.y+Math.sin(q.a)*RY*r,2.5)}if(m.tm<=0){m.st='inhale';m.tm=2.2;this.emPull={x:m.x,y:m.y,v:40}}}break;
  case 'inhale':{if(this.emPull)this.emPull.v=40+35*(1-m.tm/2.2);for(let i=0;i<3;i++){const q=pick(m.gp),r=1.5+Math.random()*.5,b=this.add.circle(m.x+Math.cos(q.a)*RX*r,m.y+Math.sin(q.a)*RY*r,1.5,0xe8d8ff,.8).setDepth(12);this.tweens.add({targets:b,x:m.x,y:m.y,alpha:0,duration:500,onComplete:()=>b.destroy()})}
   if(m.tm<=0){this.emPull=null;if(Math.hypot(p.x-m.x,p.y-m.y)<62)this.hurt(D(22),'가면의 들숨',m);m.st='idle';m.cd=1.2}}break}}
 atCut(m,q){q.on=0;q.t=12;m.cg.push({a:q.a,w:.55,t:12});this.dtx(q.x,q.y-16,'줄기를 끊었다 — 고리가 무너진다','#9fd8ff');this.cameras.main.shake(200,.006);
  for(let i=0;i<10;i++){const a=Math.random()*6.283,b=this.add.rectangle(q.ax,q.ay,3,6,0xe080ff).setRotation(a).setDepth(12);this.tweens.add({targets:b,x:q.ax+Math.cos(a)*30,y:q.ay+Math.sin(a)*20,alpha:0,angle:180,duration:500,onComplete:()=>b.destroy()})}}
 // ===== 틈 너머의 관찰자 =====
 obsAI(m,dt,p){const now=this.time.now,D=v=>Math.round(v*m.df),en=m.hp<m.mh*.35?.8:1;if(!m.g)m.g=this.add.graphics().setDepth(39);const g=m.g;g.clear();
  if(!m.rf){m.hx=m.x;m.hy=m.y;m.rf=this.add.image(m.x,m.y,'obsR').setDepth(2.9);m.pu=this.add.image(m.x,m.y,'obsP').setDepth(3.2);m.ga=Math.PI/2;m.gz=0;
   m.rg=[];for(let k=0;k<12;k++)m.rg.push({a:k/12*6.283,o:this.add.image(m.x,m.y,'obsS').setDepth(3.1)});
   m.pt=[];for(const[x,y]of[[200,150],[600,150],[250,265],[550,265]])m.pt.push({x,y,vx:(Math.random()-.5)*30,vy:(Math.random()-.5)*20,o:this.add.image(x,y,'obsS').setDepth(8.5).setScale(1.6)});
   m.ey=[];for(const[x,y]of[[76,74],[724,74],[64,188],[736,188],[150,298],[650,298]])m.ey.push({x,y,open:0,ft:0,o:this.add.image(x,y,'obsr').setDepth(2.9),oe:this.add.image(x,y,'obse').setDepth(3).setScale(1,.1).setVisible(false)})}
  m.rot=(m.rot||0)+dt*.35;const ex=m.x,ey=m.y;
  for(const r of m.rg){const a=r.a+m.rot;r.o.setPosition(m.hx+Math.cos(a)*78,m.hy+Math.sin(a)*42).setDepth(Math.sin(a)>0?3.3:2.8)}
  for(const q of m.pt){q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.x<120||q.x>680)q.vx*=-1;if(q.y<140||q.y>285)q.vy*=-1;q.o.setPosition(q.x,q.y)}
  m.rf.setPosition(m.hx,m.hy).setScale(1+.03*Math.sin(now/400));
  if(m.st=='intro'){m.pu.setPosition(m.x,m.y);return}
  m.cd-=dt;m.tm-=dt;
  const blocked=(x0,y0,x1,y1)=>{for(const q of m.pt){const ux=x1-x0,uy=y1-y0,L2=ux*ux+uy*uy||1,t=Math.max(0,Math.min(1,((q.x-x0)*ux+(q.y-y0)*uy)/L2));if(Math.hypot(q.x-x0-ux*t,q.y-y0-uy*t)<20&&t>.05&&t<.97)return true}return false};
  const ta=Math.atan2(p.y-ey,p.x-ex);
  // 가장자리의 눈
  let anyOpen=false;
  for(const q of m.ey){if(q.open){anyOpen=true;q.ot+=dt;q.ft-=dt;if(q.ft<=0){q.ft=1.8;const a=Math.atan2(p.y-q.y,p.x-q.x);this.mbShot(q.x,q.y,a,210,D(9),'가장자리 눈의 빛살',m,'emo').o.setTint(0xffb060)}
    if(q.ot>14){q.open=0;this.tweens.add({targets:q.oe,scaleY:.1,duration:200,onComplete:()=>q.oe.setVisible(false)})}}}
  if(m.st=='pulled'){m.gone=0;const k=Math.min(1,(m.pt0-m.tm)/.6);m.x=m.hx+(400-m.hx)*k;m.y=m.hy+(205-m.hy)*k;m.spr.setPosition(m.x+Math.sin(now/60)*2,m.y).setScale(1.15);m.pu.setPosition(m.x,m.y).setScale(1,.6);
   g.lineStyle(2,0xffe066,.5+.3*Math.sin(now/80)).strokeEllipse(m.x,m.y,130,94);if(m.tm<=0){m.st='back';m.tm=.6}return}
  if(m.st=='back'){const k=Math.min(1,1-m.tm/.6);m.x=400+(m.hx-400)*k;m.y=205+(m.hy-205)*k;m.spr.setPosition(m.x,m.y).setScale(1);m.pu.setScale(1);if(m.tm<=0){m.x=m.hx;m.y=m.hy;m.st='watch';m.cd=1.2}m.gone=1;return}
  m.gone=1;m.spr.setPosition(m.x,m.y);
  // 응시: 시선을 천천히 나에게로
  if(m.st!='sweep'&&m.st!='sweepW')m.ga+=Phaser.Math.Clamp(Phaser.Math.Angle.Wrap(ta-m.ga),-.9*dt,.9*dt);
  const ca=Math.cos(m.ga),sa=Math.sin(m.ga);m.pu.setPosition(ex+ca*12,ey+sa*8);
  if(m.st=='watch'){const h=.32,L=440;g.fillStyle(0xffb060,.07).fillTriangle(ex,ey,ex+Math.cos(m.ga-h)*L,ey+Math.sin(m.ga-h)*L,ex+Math.cos(m.ga+h)*L,ey+Math.sin(m.ga+h)*L);g.lineStyle(1,0xffb060,.35).lineBetween(ex,ey,ex+Math.cos(m.ga-h)*L,ey+Math.sin(m.ga-h)*L).lineBetween(ex,ey,ex+Math.cos(m.ga+h)*L,ey+Math.sin(m.ga+h)*L);
   const inC=Math.abs(Phaser.Math.Angle.Wrap(ta-m.ga))<h&&Math.hypot(p.x-ex,p.y-ey)<L&&!blocked(ex,ey,p.x,p.y);m.gz=Phaser.Math.Clamp(m.gz+(inC?dt*.95:-dt*.7),0,5);
   if(m.gz>=5){m.gz=0;this.inv=0;this.hurt(D(30),'관찰자의 응시',m);const f=this.add.rectangle(400,180,800,360,0xffd0a0,.5).setDepth(140);this.tweens.add({targets:f,alpha:0,duration:350,onComplete:()=>f.destroy()});this.cameras.main.shake(250,.01)}}
  for(let i=0;i<5;i++)g.fillStyle(i<Math.floor(m.gz)?0xff6af0:0x3a2a44,i<m.gz?.95:.7).fillCircle(p.x-16+i*8,p.y-26,2.6);
  switch(m.st){
  case 'watch':if(m.cd<=0){if(!anyOpen&&!(m.eyc>now)){m.eyc=now+4000;const cl=m.ey.filter(q=>!q.open);Phaser.Utils.Array.Shuffle(cl);cl.slice(0,3).forEach(q=>{q.open=1;q.ot=0;q.ft=1+Math.random();q.oe.setVisible(true);this.tweens.add({targets:q.oe,scaleY:1,duration:250})});m.need=3;this.dtx(400,64,'가장자리의 눈이 떴다 — 물어서 감길 것','#ffb060');m.cd=1.4}
    else{m.st='sweepW';m.tm=.9;m.sd=Phaser.Math.Angle.Wrap(ta-m.ga)>0?1:-1}}break;
  case 'sweepW':{const L=this.obsBeam(m,m.ga);g.lineStyle(1.5,0xff5a5a,.5+.4*Math.sin(now/50)).lineBetween(ex,ey,ex+Math.cos(m.ga)*L,ey+Math.sin(m.ga)*L);if(m.tm<=0){m.st='sweep';m.tm=2.4;m.bt=0}}break;
  case 'sweep':{m.ga+=m.sd*.6*dt;const L=this.obsBeam(m,m.ga),bx=ex+Math.cos(m.ga)*L,by=ey+Math.sin(m.ga)*L;g.lineStyle(16,0xff8a40,.35).lineBetween(ex,ey,bx,by).lineStyle(5,0xfff0d0,.95).lineBetween(ex,ey,bx,by);g.fillStyle(0xffd0a0,.6).fillCircle(bx,by,7);
   m.bt-=dt;const px=p.x-ex,py=p.y-ey,t=px*Math.cos(m.ga)+py*Math.sin(m.ga),n=Math.abs(-px*Math.sin(m.ga)+py*Math.cos(m.ga));if(t>0&&t<L&&n<13&&m.bt<=0){m.bt=.3;this.inv=0;this.hurt(D(8),'관찰자의 광선',m)}
   if(m.tm<=0){m.st='watch';m.cd=1.3*en}}break}}
 obsBeam(m,a){let L=20;for(;L<720;L+=8){const x=m.x+Math.cos(a)*L,y=m.y+Math.sin(a)*L;if(x<24||x>776||y<24||y>336)break;if(m.pt.some(q=>Math.hypot(q.x-x,q.y-y)<20))break}return L}
 obsClose(m,q){q.open=0;this.tweens.add({targets:q.oe,scaleY:.1,duration:150,onComplete:()=>q.oe.setVisible(false)});this.dtx(q.x,q.y-20,'눈을 감겼다','#ffe066');
  if(!m.ey.some(e=>e.open)&&m.st!='pulled'){m.st='pulled';m.tm=6;m.pt0=6;m.gz=0;this.dtx(400,150,'큰 눈이 틈 밖으로 끌려 나왔다 — 지금!','#ffe066');this.cameras.main.shake(300,.01)}}
 mbBite(fx,fy){const p=this.pl,R=C.BITE.range+12;let hit=0;
  for(const m of this.cur.en){if(!m.on)continue;
   if(m.k=='hcr'&&m.gone){const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy);if(d<C.BITE.range+50&&(dx*fx+dy*fy)/(d||1)>.3&&!(this.hcT>this.time.now)){this.hcT=this.time.now+1500;this.dtx(p.x,p.y-26,'턱이 막고 있다 — 흩어질 때 물 것','#ffb0d0')}}
   if(m.k=='atl'&&m.po)for(const q of m.po)if(q.on){const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);if(d<R&&(dx*fx+dy*fy)/(d||1)>.2){q.hp--;hit=1;q.o.setTintFill(0xffffff);this.time.delayedCall(80,()=>q.o.clearTint());if(q.hp<=0)this.atCut(m,q)}}
   if(m.k=='obs'&&m.ey)for(const q of m.ey)if(q.open){const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);if(d<R+10&&(dx*fx+dy*fy)/(d||1)>.1){hit=1;this.obsClose(m,q)}}}
  return hit}
