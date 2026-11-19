 // ===== 최종 보스: 한 몸의 무리 (v36) =====
 // 무리 = 유충 점(m.P) 수백 개가 목표 위치(q.tx,q.ty)로 흘러간다. 판정은 점이 아니라 예고 모양으로 한다.
 swTex(){if(this.textures.exists('swQ'))return;
  tex(this,'swQ',20,14,2,x=>{const R=[4.4,4,3.5,3,2.4];for(let i=4;i>=0;i--)disc(x,14-i*2.6,7,R[i]+.9,'#4a2006');for(let i=4;i>=0;i--)disc(x,14-i*2.6,7,R[i],i==0?'#ffe0a0':i%2?'#ffae3a':'#ffc85a');
   x.fillStyle='#2a0c00';x.fillRect(15,6,1,1);x.fillRect(15,8,1,1);x.fillStyle='#fff6d0';x.fillRect(16,2,1,2);x.fillRect(14,1,1,2);x.fillRect(12,2,1,2)});
  tex(this,'swF',400,180,2,x=>{const im=x.createImageData(400,180),D=im.data;let sd=4242;const R=()=>{sd=sd*16807%2147483647;return sd/2147483647};
   for(let y=0;y<180;y++)for(let i=0;i<400;i++){const n=Math.sin(i*.031+Math.sin(y*.05)*1.7)+Math.sin(y*.043+i*.012)*1.1+Math.sin((i+y)*.018),e=((i-200)/200)**2+((y-90)/90)**2,k=(i*7+y*13)%4;
    let r=14,g=10,b=26;if(n>1.1){r=30;g=18;b=52}else if(n>.4){r=21;g=14;b=38}if(n>1.9&&k==0){r=46;g=26;b=74}
    if(e>.82){const w=Math.min(1,(e-.82)/.18);r=r*(1-w)+38*w;g=g*(1-w)+16*w;b=b*(1-w)+46*w;if(e>.9&&(Math.sin(i*.3+y*.2)>.6))r+=14}
    const o=(y*400+i)*4;D[o]=r;D[o+1]=g;D[o+2]=b;D[o+3]=255}
   for(let s=0;s<260;s++){const i=R()*400|0,y=R()*180|0,o=(y*400+i)*4,v=R()<.15?230:120;D[o]=v;D[o+1]=v*.9;D[o+2]=255}
   x.putImageData(im,0,0)})}
 swCaps(cl){const C=[],F=[[-.27,.6,-.62],[-.09,.74,-.21],[.09,.76,.21],[.27,.62,.62]];
  for(const[bx,L,a]of F){const aa=a*(1-.85*cl),LL=L*(1-.55*cl);C.push([bx,-.18,bx+Math.sin(aa)*LL,-.18-Math.cos(aa)*LL,.085])}
  C.push([-.34,.18,-.34-.4*(1-.7*cl),.18-.3*(1-.4*cl),.09]);C.push([0,.5,0,.82,.19]);return C}
 swInPalm(u,v,cl){if(u*u+(v-.12)**2<.1764)return true;for(const c of this.swCaps(cl)){const ux=c[2]-c[0],uy=c[3]-c[1],L=ux*ux+uy*uy||1;let t=((u-c[0])*ux+(v-c[1])*uy)/L;t=t<0?0:t>1?1:t;if((u-c[0]-ux*t)**2+(v-c[1]-uy*t)**2<c[4]*c[4])return true}return false}
 swPalmPts(cl,n){const o=[];let g=0;while(o.length<n&&g++<n*60){const u=Math.random()*2-1,v=Math.random()*2.1-1.1;if(this.swInPalm(u,v,cl))o.push([u,v])}return o}
 swHitPalm(x,y,H){const dx=x-H.x,dy=y-H.y,ca=Math.cos(H.a),sa=Math.sin(H.a);return this.swInPalm((dx*ca+dy*sa)/H.s,(-dx*sa+dy*ca)/H.s,H.cl||0)}
 swPalmW(H,u,v){const ca=Math.cos(H.a),sa=Math.sin(H.a);return[H.x+(u*ca-v*sa)*H.s,H.y+(u*sa+v*ca)*H.s]}
 swPalmDraw(g,H,col,al){const W=(u,v)=>this.swPalmW(H,u,v),c0=W(0,.12);g.fillStyle(col,al).fillCircle(c0[0],c0[1],.42*H.s);
  for(const c of this.swCaps(H.cl||0)){const a=W(c[0],c[1]),b=W(c[2],c[3]);g.lineStyle(c[4]*2*H.s,col,al).lineBetween(a[0],a[1],b[0],b[1]);g.fillStyle(col,al).fillCircle(b[0],b[1],c[4]*H.s)}}
 // 손바닥 모양으로 점 목표 배치 (i0부터 n개)
 swToPalm(m,H,i0,n,oy){const S=H.cl>.5?this.swPC:this.swPO;for(let k=0;k<n;k++){const q=m.P[(i0+k)%m.P.length];if(!q.on)continue;const pt=S[(i0+k)%S.length],w=this.swPalmW(H,pt[0],pt[1]);q.tx=w[0];q.ty=w[1]+(oy||0)}}
 swStart(){this.lv.rooms.forEach(r=>{r.food.forEach(f=>{if(f.spr){f.spr.destroy();f.spr=null}});r.en.forEach(e=>{for(const k of['spr','lvT','ring','mk','lsh'])if(e[k]){e[k].destroy();e[k]=null}if(e.aim){e.aim.forEach(o=>o.destroy());e.aim=null}})});
  (this.prj||[]).forEach(q=>q.o.destroy());this.prj=[];this.swTex();if(!this.swPO){this.swPO=this.swPalmPts(0,420);this.swPC=this.swPalmPts(1,420)}
  this.zi=3;this.boss=true;this.exR=0;this.exT=0;this.zt0=this.time.now;if(this.exTx)this.exTx.setVisible(false);if(this.hvT)this.hvT.setVisible(false);
  const room={r:0,c:0,d:{N:0,S:0,W:0,E:0},ct:{},hp:{},obs:[],zn:[],food:[],en:[],seen:1,tr:'void',dd:5};
  for(const[c,r]of[[3,2],[16,2],[3,6],[16,6]])room.food.push({t:'s',c,r,p:0,on:1});
  const lv=Math.min(18,this.plv+2),MH=Math.round(760+84*this.plv);
  room.en.push({k:'sw',x:400,y:170,on:1,mh:MH,hp:MH,lv,df:1+.025*(lv-1),ph:1,st:'intro',cd:1,gone:1,ex:0});
  this.lv={rooms:[room],start:room,exit:null,at:(r,c)=>r==0&&c==0?room:null};
  const p=this.pl;p.setPosition(400,292);p.setVelocity(0,0);this.vx=this.vy=this.jx=this.jy=0;this.ang=-Math.PI/2;this.sp.forEach((q,i)=>{q.x=400;q.y=296+7*(i+1)});this.en=Math.min(this.emax,this.en+40);this.inv=2;this.rwo=[];this.emb=[];this.emPull=null;this.emMir=0;
  this.enter(room);if(this.rlb){this.rlb.destroy();this.rlb=null}if(this.mcard){this.mcard.destroy();this.mcard=null}this.seenM.sw=1;
  const fl=this.add.image(400,180,'swF').setDepth(.5).setAlpha(0);this.dec.push(fl);
  const m=room.en[0],S=m.spr;this.swOn=m;S.setAlpha(0);m.pg=this.add.graphics().setDepth(8.6);m.tg=this.add.graphics().setDepth(1.5);m.fg=this.add.graphics().setDepth(39);this.dec.push(m.pg,m.tg,m.fg);
  m.N=340;m.P=[];for(let i=0;i<m.N;i++){const a=Math.random()*6.283,r=Math.abs((Math.random()+Math.random()+Math.random()-1.5))*30,cr=[[60,60],[740,60],[60,300],[740,300]][i%4];
   m.P.push({x:cr[0]+(Math.random()-.5)*40,y:cr[1]+(Math.random()-.5)*30,tx:400,ty:170,bx:Math.cos(a)*r,by:Math.sin(a)*r*.75,ph:Math.random()*6.283,c:i%2,on:1,k:2+Math.random()*2})}
  m.hist=[];m.seq=0;m.sp=[];m.tm=0;
  const ov=this.add.rectangle(400,180,800,360,0x000000,1).setDepth(150),t1=this.add.text(400,112,'한 몸의 무리',ST({fontSize:'26px',fontStyle:'bold',color:'#ffe0a0'})).setOrigin(.5).setDepth(151).setAlpha(0),t2=this.add.text(400,146,'수백이 하나처럼 움직인다 — 그 속의 금빛 여왕을 찾아라',ST({fontSize:'13px',color:'#c8b8e8'})).setOrigin(.5).setDepth(151).setAlpha(0);
  this.cineStart(5.2,(t,dt)=>{ov.setAlpha(Math.max(0,1-t/1.0));fl.setAlpha(Math.min(1,t/1.2));
   for(const q of m.P){if(t>.6){q.tx=400+q.bx+Math.sin(t*3+q.ph)*3;q.ty=170+q.by}const f=Math.min(1,(dt||.016)*(t>.6?q.k*.8:0));q.x+=(q.tx-q.x)*f;q.y+=(q.ty-q.y)*f;q.ph+=.1}
   if(t>2.4){S.setAlpha(Math.min(1,(t-2.4)/.6)).setScale(1.2)}if(Math.abs(t-2.5)<.02)this.cameras.main.shake(400,.006);this.swDraw(m);
   const ta=t<3.0?0:t<3.4?(t-3)/.4:t<4.7?1:Math.max(0,1-(t-4.7)/.5);t1.setAlpha(ta);t2.setAlpha(ta)},
   ()=>{ov.destroy();t1.destroy();t2.destroy();fl.setAlpha(1);S.setAlpha(1).setScale(1.2);m.x=400;m.y=170;m.st='idle';m.cd=1.4;m.gone=0;
    const c=this.mcard=this.add.text(400,318,'한 몸의 무리\n무리가 만든 모양을 보고 피할 것 · 무리가 흩어지면 금빛 여왕을 물 것 · 떨어져 나온 유충은 먹이',ST({fontSize:'12px',align:'center',color:'#ece6f7',backgroundColor:'#2a1f40',padding:{x:12,y:6}})).setOrigin(.5).setDepth(62);this.tweens.add({targets:c,alpha:0,delay:5500,duration:500,onComplete:()=>{c.destroy();if(this.mcard===c)this.mcard=null}})})}
 swBar(g,m){const r=Math.max(0,m.hp/m.mh);g.fillStyle(0x0d0818,.8).fillRoundedRect(296,6,208,30,6);g.fillStyle(0x3a2f57).fillRect(302,22,196,6);g.fillStyle(m.ph==2?0xffae3a:0xffd070).fillRect(302,22,196*r,6);g.fillStyle(0xffffff,.6).fillRect(302+98,20,1,10);
  if(!this.swNm||!this.swNm.scene)this.swNm=this.add.text(400,14,'',ST({fontSize:'10px',fontStyle:'bold',color:'#ffe0a0'})).setOrigin(.5).setDepth(61);this.swNm.setText((m.ph==2?'무리를 입은 여왕':'한 몸의 무리')+(m.ex?'  ·  지금 물 것!':''))}
 swDraw(m){const g=m.pg;g.clear();const now=this.time.now/1000,C=[0x7ae698,0xa46ef2,0xffc860];
  const SZ=[[3,3],[4,2],[3,3]];for(let c=0;c<3;c++){g.fillStyle(C[c],1);const[w0,h0]=SZ[c];for(const q of m.P)if(q.on&&(q.cc??q.c)==c){const w=Math.sin(now*8+q.ph);g.fillRect(q.x-w0/2+w*.5,q.y-h0/2,w0,h0)}}}
 swMove(m,dt,k){const sn=m.st=='sk'&&m.sk&&m.sk.snap;for(const q of m.P){if(!q.on)continue;const f=sn?1:Math.min(1,dt*(k||q.k*1.4));q.x+=(q.tx-q.x)*f;q.y+=(q.ty-q.y)*f}}
 swAlive(m){let n=0;for(const q of m.P)if(q.on)n++;return n}
 // 공격 판정 도우미: 플레이어가 맞으면 피해
 swHurt(m,v,src,cd){const now=this.time.now;if(cd&&(m.hc||0)>now)return;if(cd)m.hc=now+cd*1000;this.hurt(Math.round(v*m.df),src,m)}
 swFood(m,x,y,n){for(let i=0;i<n;i++){let q=null;for(const o of m.P)if(o.on&&Math.random()<.2){q=o;break}if(q)q.on=0;if(this.cur.food.filter(f=>f.on).length>=6)break;
  const fx=Phaser.Math.Clamp((q?q.x:x)+(Math.random()-.5)*50,60,740),fy=Phaser.Math.Clamp((q?q.y:y)+(Math.random()-.5)*36,60,300),cr=this.lin.c>=2&&(m.fdN=(m.fdN||0)+1)%3==0,f={t:cr?'c':'s',x:fx,y:fy,c:-1,r:-1,p:0,on:1};f.spr=this.add.image(fx,fy,cr?'f_c':'f_s').setDepth(5);this.cur.food.push(f)}}
 swExpose(m,t,food){for(const q of m.P)q.cc=undefined;m.st='expose';m.tm=t;m.ex=1;m.gone=0;m.sk=null;m.hzF=null;this.emPull=null;if(food){this.swFood(m,m.x,m.y,food);if(this.lin.v>=1)this.ess(1,m.x,m.y)}
  m.exN=(m.exN||0)+1;if(m.exN<=3)this.dtx(m.x,m.y-34,'무리가 흩어졌다 — 지금 여왕을 물 것!','#ffe066')}
 swPick(m){const P2=m.ph==2;m.seq++;
  if(P2&&m.hp<m.mh*.15&&!m.tided)return 'tide';
  if(m.seq%2==1)return pick(['fist','wave','ring']);
  if(!m.bag||!m.bag.length){m.bag=P2?['hole','mitosis','orbit','palms','press','grab']:['galaxy','rain','press','grab'];if(P2&&m.tided)m.bag.push('tide');Phaser.Utils.Array.Shuffle(m.bag);if(m.last&&m.bag[0]==m.last)m.bag.push(m.bag.shift())}
  return m.last=m.bag.shift()}
 swAI(m,dt,p){const s=m.spr,now=this.time.now;if(m.st=='intro'||m.st=='dead')return;const tg=m.tg,fg=m.fg;tg.clear();fg.clear();
  if(m.st=='trans'){this.swTransU(m,dt);return}
  // 다시 자라는 무리
  m.rg=(m.rg||0)-dt;if(m.rg<=0){m.rg=.35;if(this.swAlive(m)<m.N){const q=m.P.find(o=>!o.on);if(q){q.on=1;q.x=m.x;q.y=m.y}}}
  if(m.ph==1&&m.hp<=m.mh*.5){this.swTrans(m);return}
  m.hzF=null;
  if(m.st=='idle'){m.ex=0;this.swIdle(m,dt,p);m.cd-=dt;if(m.cd<=0){const k=this.swPick(m);m.st='sk';m.sk={k,t:0};this['sw_'+k+'0'](m,p,m.sk)}}
  else if(m.st=='expose'){m.tm-=dt;this.swScatter(m,dt);if(m.tm<=0){m.ex=0;m.st='idle';m.cd=m.ph==2?.6:.9}}
  else if(m.st=='sk'){const K=m.sk;K.t+=dt;if(this['sw_'+K.k](m,dt,p,K)){K.done=1}if(K.done&&m.st=='sk')this.swExpose(m,K.ex??1,K.food||0)}
  this.swMove(m,dt,m.st=='sk'?(m.sk&&m.sk.kf):0);
  // 여왕
  if(s){s.setVisible(!m.gone);const a=m.ph==2?Math.atan2(m.vy||0,m.vx||1):0;s.setPosition(m.x,m.y).setRotation(m.ph==2?a:Math.sin(now/300)*.15).setScale(m.ph==2?1.9:1.2);
   if(m.ex){const pu=.5+.5*Math.sin(now/90);s.setTint(pu>.5?0xffffff:0xffe080);fg.lineStyle(2,0xffe066,.5+.4*pu).strokeCircle(m.x,m.y,24+4*pu)}else if(!m.fl)s.clearTint()}
  this.swDraw(m)}
 // 평소: 여왕이 무리에 싸여 떠다닌다 (2페이즈는 거대 유충 몸)
 swIdle(m,dt,p){const now=this.time.now/1000,dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1;
  if(m.ph==1){const want=170,tx=p.x-dx/d*want+Math.cos(now*.7)*60,ty=p.y-dy/d*want+Math.sin(now*.9)*40;const ex=tx-m.x,ey=ty-m.y,el=Math.hypot(ex,ey)||1,v=Math.min(70,el*2);m.x=Phaser.Math.Clamp(m.x+ex/el*v*dt,90,710);m.y=Phaser.Math.Clamp(m.y+ey/el*v*dt,80,280);
   for(const q of m.P)if(q.on){q.tx=m.x+q.bx*1.15+Math.sin(now*2+q.ph)*4;q.ty=m.y+q.by*1.15+Math.cos(now*2.3+q.ph)*3}
   if(d<30)this.swHurt(m,4,'무리에 부딪힘',1.0);m.hzF=(x,y)=>Math.hypot(x-m.x,y-m.y)<44}
  else this.swBody(m,dt,p,1)}
 swBody(m,dt,p,chase){const now=this.time.now/1000;if(chase){const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,wa=Math.atan2(dy,dx)+Math.sin(now*1.3)*.9;m.hd=m.hd??wa;m.hd+=Phaser.Math.Angle.Wrap(wa-m.hd)*Math.min(1,dt*2.2);const v=d>140?95:60;m.vx=Math.cos(m.hd)*v;m.vy=Math.sin(m.hd)*v;m.x=Phaser.Math.Clamp(m.x+m.vx*dt,70,730);m.y=Phaser.Math.Clamp(m.y+m.vy*dt,70,290)}
  const H=m.hist;if(!H.length||Math.hypot(H[0][0]-m.x,H[0][1]-m.y)>7)H.unshift([m.x,m.y]);if(H.length>28)H.length=28;
  const n=m.P.length,NS=Math.max(2,H.length);for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;const j=Math.min(H.length-1,Math.floor(i/n*NS)),h=H[j]||[m.x,m.y],r=(1-j/NS)*15+4;q.tx=h[0]+q.bx/30*r+Math.sin(now*3+q.ph)*2;q.ty=h[1]+q.by/30*r}
  if(chase){let hit=Math.hypot(p.x-m.x,p.y-m.y)<26;for(let j=3;j<H.length&&!hit;j+=2)if(Math.hypot(p.x-H[j][0],p.y-H[j][1])<15*(1-j/NS)+6)hit=1;if(hit)this.swHurt(m,6,'거대 유충의 몸',1.0);
   m.hzF=(x,y)=>{if(Math.hypot(x-m.x,y-m.y)<40)return true;for(let j=3;j<H.length;j+=2)if(Math.hypot(x-H[j][0],y-H[j][1])<24)return true;return false}}}
 swScatter(m,dt){const now=this.time.now/1000;if(m.ph==2){this.swBody(m,dt,this.pl,0);for(const q of m.P)if(q.on){q.tx+=q.bx*2.2;q.ty+=q.by*2.2}return}
  for(const q of m.P)if(q.on){q.tx=m.x+q.bx*3.4+Math.sin(now*1.5+q.ph)*10;q.ty=m.y+q.by*3.4+Math.cos(now*1.7+q.ph)*8}}
 // ---------- 기본기 ----------
 sw_fist0(m,p,K){const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1;K.ux=dx/d;K.uy=dy/d;let L=40;for(;L<560;L+=10){const x=m.x+K.ux*L,y=m.y+K.uy*L;if(x<60||x>740||y<60||y>300)break}K.L=L;K.x0=m.x;K.y0=m.y;K.wu=m.ph==2?.6:.75;
  this.telAdd({k:'l',x:m.x,y:m.y,x2:m.x+K.ux*L,y2:m.y+K.uy*L,w:40,t:K.wu,src:'',fx:0,m});K.ex=m.ph==2?.9:1.1}
 sw_fist(m,dt,p,K){const n=m.P.length;if(K.t<K.wu){for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;const s=i/n;q.tx=m.x-K.ux*(s*36)+q.bx*.45;q.ty=m.y-K.uy*(s*36)+q.by*.45}if(m.ph==2)this.swBody(m,dt,p,0);K.kf=8;m.hzF=(x,y)=>this.telIn({k:'l',x:K.x0,y:K.y0,x2:K.x0+K.ux*K.L,y2:K.y0+K.uy*K.L,w:44},x,y);return}
  const v=m.ph==2?620:560,tr=(K.t-K.wu)*v;if(tr>=K.L){return 1}m.x=K.x0+K.ux*tr;m.y=K.y0+K.uy*tr;m.vx=K.ux;m.vy=K.uy;
  if(m.ph==2)this.swBody(m,dt,p,0);else for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;const s=i/n;q.tx=m.x-K.ux*(s*60)+q.bx*.5;q.ty=m.y-K.uy*(s*60)+q.by*.5}K.kf=14;
  if(Math.hypot(p.x-m.x,p.y-m.y)<28)this.swHurt(m,16,'무리의 주먹',.6);m.hzF=(x,y)=>this.telIn({k:'l',x:m.x,y:m.y,x2:K.x0+K.ux*K.L,y2:K.y0+K.uy*K.L,w:48},x,y)}
 sw_wave0(m,p,K){K.hor=Math.random()<.65;K.dir=K.hor?(p.x<400?-1:1):(p.y<180?-1:1);K.gap=K.hor?Phaser.Math.Clamp(p.y+(Math.random()-.5)*120,90,270):Phaser.Math.Clamp(p.x+(Math.random()-.5)*240,110,690);K.gw=K.hor?46:58;K.wu=1.0;K.v=m.ph==2?300:250;K.ex=1}
 sw_wave(m,dt,p,K){const g=m.tg,H=K.hor,from=K.dir>0?(H?20:20):(H?780:340),to=K.dir>0?(H?780:340):(H?20:20),span=Math.abs(to-from),pos=K.t<K.wu?from:from+Math.sign(to-from)*(K.t-K.wu)*K.v;
  if(K.t>K.wu&&Math.abs(pos-from)>=span)return 1;const pu=.5+.5*Math.sin(this.time.now/80);
  // 금빛 안전 통로 + 붉은 띠
  if(H){g.fillStyle(0xffe066,.1+.08*pu).fillRect(20,K.gap-K.gw,760,K.gw*2);g.lineStyle(1,0xffe066,.5).lineBetween(20,K.gap-K.gw,780,K.gap-K.gw).lineBetween(20,K.gap+K.gw,780,K.gap+K.gw);g.fillStyle(0xff3b4f,K.t<K.wu?.18:.28).fillRect(pos-14,20,28,K.gap-K.gw-20).fillRect(pos-14,K.gap+K.gw,28,340-K.gap-K.gw)}
  else{g.fillStyle(0xffe066,.1+.08*pu).fillRect(K.gap-K.gw,20,K.gw*2,320);g.lineStyle(1,0xffe066,.5).lineBetween(K.gap-K.gw,20,K.gap-K.gw,340).lineBetween(K.gap+K.gw,20,K.gap+K.gw,340);g.fillStyle(0xff3b4f,K.t<K.wu?.18:.28).fillRect(20,pos-14,K.gap-K.gw-20,28).fillRect(K.gap+K.gw,pos-14,780-K.gap-K.gw,28)}
  const n=m.P.length;let j=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;let a=20+(j*37%n)/n*(H?320:760);const inG=Math.abs(a-K.gap)<K.gw;if(inG)a=a<K.gap?K.gap-K.gw-4-(i%5)*3:K.gap+K.gw+4+(i%5)*3;
   const w=Math.sin(this.time.now/120+q.ph)*6;if(H){q.tx=pos+w;q.ty=a}else{q.tx=a;q.ty=pos+w}}
  K.kf=K.t<K.wu?3:16;if(H){m.x=pos;m.y=K.gap<180?300:60}else{m.y=pos;m.x=K.gap<400?740:60}m.gone=1;
  const hit=(x,y)=>(H?Math.abs(x-pos)<18&&Math.abs(y-K.gap)>K.gw:Math.abs(y-pos)<18&&Math.abs(x-K.gap)>K.gw);if(K.t>K.wu&&hit(p.x,p.y))this.swHurt(m,12,'무리의 파도',.6);
  m.hzF=(x,y)=>H?(Math.abs(y-K.gap)>K.gw-6&&(K.dir>0?x>pos-30:x<pos+30)):(Math.abs(x-K.gap)>K.gw-6&&(K.dir>0?y>pos-30:y<pos+30))}
 sw_ring0(m,p,K){K.cx=p.x;K.cy=p.y;K.ga=Math.random()*6.283;K.gw=.6;K.R0=140;K.wu=.7;K.dur=1.6;K.ex=1;K.dmgv=12;K.src='무리의 고리'}
 sw_ring(m,dt,p,K){const g=m.tg,k=Math.max(0,(K.t-K.wu)/K.dur),R=K.R0*(1-k)+14*k,pu=.5+.5*Math.sin(this.time.now/70);if(K.t>K.wu+K.dur)return 1;
  this.swRingDraw(g,K.cx,K.cy,R,[[K.ga,K.gw]],K.t<K.wu?.35:.7,pu);
  const n=m.P.length;let j=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;let a=K.ga+K.gw+(j/n)*(6.283-2*K.gw)+Math.sin(this.time.now/200+q.ph)*.01;q.tx=K.cx+Math.cos(a)*(R+Math.sin(q.ph)*3);q.ty=K.cy+Math.sin(a)*(R+Math.sin(q.ph)*3)*.8}
  const oa=K.ga+Math.PI;m.x=K.cx+Math.cos(oa)*R;m.y=K.cy+Math.sin(oa)*R*.8;m.gone=1;K.kf=K.t<K.wu?4:12;
  if(K.t>K.wu&&this.swOnRing(p.x,p.y,K.cx,K.cy,R,[[K.ga,K.gw]],.8,10))this.swHurt(m,K.dmgv,K.src,.6);
  m.hzF=(x,y)=>{const d=Math.hypot(x-K.cx,(y-K.cy)/.8);return d<R+20&&d>Math.max(0,R-80)&&!this.swInGap(Math.atan2((y-K.cy)/.8,x-K.cx),[[K.ga,K.gw*.8]])}}
 swInGap(a,G){for(const[c,w]of G)if(Math.abs(Phaser.Math.Angle.Wrap(a-c))<w)return true;return false}
 swOnRing(x,y,cx,cy,R,G,sy,th){const dx=x-cx,dy=(y-cy)/sy,d=Math.hypot(dx,dy);return Math.abs(d-R)<th&&!this.swInGap(Math.atan2(dy,dx),G)}
 swRingDraw(g,cx,cy,R,G,al,pu,sy){sy=sy||.8;const N=72;for(let i=0;i<N;i++){const a0=i/N*6.283,a1=(i+1)/N*6.283,am=(a0+a1)/2;if(this.swInGap(am,G))continue;g.lineStyle(3,0xff3b4f,al).lineBetween(cx+Math.cos(a0)*R,cy+Math.sin(a0)*R*sy,cx+Math.cos(a1)*R,cy+Math.sin(a1)*R*sy)}
  for(const[c,w]of G){g.lineStyle(3,0xffe066,.5+.4*(pu||0));g.beginPath();for(let k=0;k<=8;k++){const a=c-w+2*w*k/8,x=cx+Math.cos(a)*R,y=cy+Math.sin(a)*R*sy;if(k)g.lineTo(x,y);else g.moveTo(x,y)}g.strokePath()}}
 // ---------- 1페이즈: 은하 소용돌이 → 고리 ----------
 sw_galaxy0(m,p,K){K.cx=400;K.cy=180;K.rot=Math.random()*6.283;K.mv=.7;K.wu=1.1;K.dur=4.2;K.ex=2.6;K.food=4;this.dtx(400,64,'무리가 은하처럼 돈다 — 팔 사이 빈 곳을 따라 돌 것','#ffe066')}
 sw_galaxy(m,dt,p,K){const g=m.tg,now=this.time.now/1000;
  if(K.t<K.mv){m.x+=(K.cx-m.x)*Math.min(1,dt*4);m.y+=(K.cy-m.y)*Math.min(1,dt*4);for(const q of m.P)if(q.on){q.tx=m.x+q.bx;q.ty=m.y+q.by}return}
  const t=K.t-K.mv,sp=.32+.12*Math.min(1,t/K.dur);K.rot+=sp*dt;const n=m.P.length,RM=330,AK=.016;
  if(t<K.dur){const al=t<K.wu?.3:1;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;const arm=i%3,r=28+((i/3|0)/(n/3))*(RM-28),a=K.rot+r*AK+arm*2.094+Math.sin(now*2+q.ph)*.03;q.tx=K.cx+Math.cos(a)*r;q.ty=K.cy+Math.sin(a)*r*.62}
   K.kf=t<K.wu?2.5:9;if(t<K.wu){for(let arm=0;arm<3;arm++){g.lineStyle(2,0xff3b4f,.25);g.beginPath();for(let r=28;r<=RM;r+=12){const a=K.rot+r*AK+arm*2.094,x=K.cx+Math.cos(a)*r,y=K.cy+Math.sin(a)*r*.62;if(r>28)g.lineTo(x,y);else g.moveTo(x,y)}g.strokePath()}}
   const arm=(x,y,th)=>{const dx=x-K.cx,dy=(y-K.cy)/.62,r=Math.hypot(dx,dy);if(r<20||r>RM+8)return false;const a=Math.atan2(dy,dx);for(let k=0;k<3;k++){if(Math.abs(Phaser.Math.Angle.Wrap(a-(K.rot+r*AK+k*2.094)))*r<th)return true}return false};
   if(t>=K.wu&&arm(p.x,p.y,8))this.swHurt(m,6,'은하 소용돌이',.8);m.hzF=(x,y)=>arm(x,y,30)||Math.hypot(x-K.cx,y-K.cy)<34;m.x=K.cx;m.y=K.cy;m.gone=1;return}
  // 팔이 고리로 굳어 좁혀 온다 (틈 셋 = 팔 사이)
  const k=Math.min(1,(t-K.dur)/1.6),R=RM*(1-k)+20*k,G=[0,1,2].map(j=>[K.rot+RM*AK*.5+j*2.094+1.047,.42]);if(t-K.dur>1.7)return 1;
  this.swRingDraw(g,K.cx,K.cy,R,G,.6,.5+.5*Math.sin(now*12),.62);
  let j=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;let a=(j/n)*6.283;for(const[c,w]of G)if(Math.abs(Phaser.Math.Angle.Wrap(a-c))<w)a=c+w*(Phaser.Math.Angle.Wrap(a-c)>0?1.05:-1.05);q.tx=K.cx+Math.cos(a)*R;q.ty=K.cy+Math.sin(a)*R*.62}K.kf=8;
  if(this.swOnRing(p.x,p.y,K.cx,K.cy,R,G,.62,10))this.swHurt(m,10,'은하의 고리',.6);m.hzF=(x,y)=>{const d=Math.hypot(x-K.cx,(y-K.cy)/.62);return d<R+24&&d>R-70&&!this.swInGap(Math.atan2((y-K.cy)/.62,x-K.cx),G.map(([c,w])=>[c,w*.8]))}}
 // ---------- 1페이즈: 유충 비 + 혜성 ----------
 sw_rain0(m,p,K){K.cells=[];for(let j=0;j<3;j++)for(let i=0;i<5;i++)K.cells.push({x:104+i*148,y:84+j*96,s:(i+j)%2});K.st=0;K.ex=2.6;K.food=4;m.gone=1;this.dtx(400,64,'유충 비 — 붉은 원이 없는 칸으로!','#ffe066')}
 sw_rain(m,dt,p,K){const g=m.tg,n=m.P.length,t=K.t,W=[1.85,3.05];
  if(t<.7){for(const q of m.P)if(q.on){q.tx=q.x+(Math.random()-.5)*4;q.ty=-40}K.kf=3;m.y-=200*dt;return}
  for(let w=0;w<2;w++){const t0=W[w],set=w;if(t>t0-1.0&&t<t0+.25){const k=Math.min(1,(t-(t0-1.0))/1.0);for(const c of K.cells)if(c.s==set){if(t<t0){g.fillStyle(0xff3b4f,.08+.16*k).fillEllipse(c.x,c.y,92,64);g.lineStyle(2,0xff5a7a,.9).strokeEllipse(c.x,c.y,92,64);g.lineStyle(1,0xffffff,.5).strokeEllipse(c.x,c.y,92*k,64*k)}else{g.fillStyle(0xffffff,.25).fillEllipse(c.x,c.y,92,64)}}
    if(!K['h'+w]&&t>=t0){K['h'+w]=1;this.cameras.main.shake(140,.005);for(const c of K.cells)if(c.s==set&&((p.x-c.x)/46)**2+((p.y-c.y)/32)**2<1){this.swHurt(m,14,'유충 비');break}}}}
  // 점: 다음에 떨어질 칸 위에서 대기하다 떨어진다
  const cur=t<W[0]+.25?0:t<W[1]+.25?1:2;let j=0;
  for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;if(cur<2){const cs=K.cells.filter(c=>c.s==cur),c=cs[j%cs.length],t0=W[cur],k=Phaser.Math.Clamp((t-(t0-.35))/.35,0,1);q.tx=c.x+q.bx*1.1;q.ty=c.y+q.by*.8-(1-k)*120;q.cc=q.c}}
  K.kf=10;const setNow=t<W[0]+.25?0:1,tnext=W[t<W[0]+.25?0:1];m.hzF=(x,y)=>{if(t>W[1]+.25)return false;for(const c of K.cells)if(c.s==setNow&&t>tnext-1.0&&((x-c.x)/58)**2+((y-c.y)/42)**2<1)return true;return false};
  if(t<W[1]+.6)return;
  // 혜성
  if(!K.cm){const sx=p.x<400?760:40,sy=40,dx=p.x-sx,dy=p.y-sy,d=Math.hypot(dx,dy)||1;let L=d;for(;L<900;L+=10){const x=sx+dx/d*L,y=sy+dy/d*L;if(x<30||x>770||y<30||y>330)break}K.cm={x0:sx,y0:sy,ux:dx/d,uy:dy/d,L,t:0,tr:[]};this.telAdd({k:'l',x:sx,y:sy,x2:sx+dx/d*L,y2:sy+dy/d*L,w:34,t:.75,src:'',fx:0,m})}
  const C=K.cm;C.t+=dt;const tr=Math.max(0,C.t-.75)*660,hx=C.x0+C.ux*Math.min(tr,C.L),hy=C.y0+C.uy*Math.min(tr,C.L);
  if(C.t>.75&&tr<C.L+10){if(!C.tr.length||Math.hypot(C.tr[C.tr.length-1][0]-hx,C.tr[C.tr.length-1][1]-hy)>12)C.tr.push([hx,hy,this.time.now]);if(Math.hypot(p.x-hx,p.y-hy)<20)this.swHurt(m,16,'혜성',.6)}
  C.tr=C.tr.filter(q=>this.time.now-q[2]<1300);for(const q of C.tr){const a=1-(this.time.now-q[2])/1300;g.fillStyle(0xc070ff,.35*a).fillCircle(q[0],q[1],11);if(C.t>.75&&Math.hypot(p.x-q[0],p.y-q[1])<11)this.swHurt(m,6,'혜성의 꼬리',.7)}
  j=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;if(C.t<.75){q.tx=C.x0+q.bx*.5;q.ty=C.y0+q.by*.5}else{const b=(j%60)/60*Math.min(tr,C.L)*.55;q.tx=hx-C.ux*b+q.bx*.25;q.ty=hy-C.uy*b+q.by*.25}}K.kf=C.t<.75?5:16;
  m.hzF=(x,y)=>this.telIn({k:'l',x:C.x0,y:C.y0,x2:C.x0+C.ux*C.L,y2:C.y0+C.uy*C.L,w:46},x,y)||C.tr.some(q=>Math.hypot(x-q[0],y-q[1])<16);
  if(tr>=C.L&&!C.tr.length||C.t>3.2){m.x=Phaser.Math.Clamp(hx,80,720);m.y=Phaser.Math.Clamp(hy,80,280);for(const q of m.P)if(q.on){q.x=m.x+q.bx;q.y=m.y+q.by}return 1}}
 // ---------- 손바닥 ② 누르기 ----------
 sw_press0(m,p,K){K.n=m.ph==2?2:1;K.i=0;K.ex=m.ph==2?2.4:2.6;K.food=3;this.swPressNew(m,p,K);if((m.prN=(m.prN||0)+1)<=2)this.dtx(400,64,'손바닥이 내려온다 — 손가락 사이 틈에 서면 안전','#ffe066')}
 swPressNew(m,p,K){K.H={x:Phaser.Math.Clamp(p.x+(this.jx||0)*30,110,690),y:Phaser.Math.Clamp(p.y+(this.jy||0)*20,90,270),s:78,a:Math.random()*6.283,cl:0};K.t0=K.t;K.hit=0}
 sw_press(m,dt,p,K){const g=m.tg,t=K.t-K.t0,H=K.H,FALL=1.25,n=m.P.length;
  const k=Math.min(1,t/FALL),sh={x:H.x,y:H.y,a:H.a,s:H.s*(.6+.4*k),cl:0};
  if(t<FALL){this.swPalmDraw(g,sh,0x000000,.28+.3*k);this.swPalmDraw(g,{...sh,s:sh.s},0xff3b4f,.1+.16*k);this.swToPalm(m,{...H,s:H.s*(.5+.5*k)},0,n,-110*(1-k)*(1-k));K.kf=5+6*k;m.gone=1;m.x=H.x;m.y=H.y-60*(1-k)}
  else{if(!K.hit){K.hit=1;this.cameras.main.shake(220,.009);if(this.swHitPalm(p.x,p.y,H))this.swHurt(m,22,'무리의 손바닥 — 누르기');for(let i=0;i<3;i++){const r=this.add.ellipse(H.x,H.y,60,36).setStrokeStyle(2,0xffffff,.6).setDepth(12);this.tweens.add({targets:r,scaleX:3+i,scaleY:3+i,alpha:0,duration:420+i*120,onComplete:()=>r.destroy()})}}
   this.swToPalm(m,H,0,n,0);K.kf=20;this.swPalmDraw(g,H,0xffffff,Math.max(0,.25-(t-FALL)));m.x=H.x;m.y=H.y;m.gone=0;
   if(t>FALL+.45){K.i++;if(K.i<K.n){this.swPressNew(m,p,K);return}return 1}}
  m.hzF=t<FALL?(x,y)=>this.swHitPalm(x,y,{...H,s:H.s*1.08}):null}
 // ---------- 손바닥 ③ 밑에서 잡아채기 ----------
 sw_grab0(m,p,K){K.n=m.ph==2?3:1;K.i=0;K.ex=2.2;K.food=3;this.swGrabNew(m,p,K);if((m.grN=(m.grN||0)+1)<=2)this.dtx(400,64,'발밑이 물결친다 — 원 밖으로!','#ffe066')}
 swGrabNew(m,p,K){K.c={x:p.x,y:p.y};K.t0=K.t;K.hit=0;K.wu=K.i?.8:1.0}
 sw_grab(m,dt,p,K){const g=m.tg,t=K.t-K.t0,c=K.c,n=m.P.length,now=this.time.now/1000,RX=46,RY=32,W=K.wu,UP=W+.35;
  if(t<UP){const k=Math.min(1,t/W);g.fillStyle(0xff3b4f,.06+.16*k).fillEllipse(c.x,c.y,RX*2,RY*2);g.lineStyle(2,0xff5a7a,.9).strokeEllipse(c.x,c.y,RX*2,RY*2);
    for(let r=0;r<3;r++){const rr=((now*1.6+r/3)%1);g.lineStyle(1.5,0xe8d6ff,.7*(1-rr)).strokeEllipse(c.x,c.y,RX*2*rr,RY*2*rr)}
    // 손가락 끝 다섯이 솟는다
    const tips=[-2.75,-2.2,-1.6,-1.0,.35],up=Phaser.Math.Clamp((t-W*.75)/(UP-W*.75),0,1);let j=0;
    for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;if(j%3==0&&up>0){const a=tips[j%5],h=(j%11)/11*14*up;q.tx=c.x+Math.cos(a)*RX*.85;q.ty=c.y+Math.sin(a)*RY*.85-h}else{q.tx=c.x+q.bx*1.6+Math.cos(now+q.ph)*40;q.ty=c.y+60+q.by}}K.kf=6;m.gone=1;m.x=c.x+60;m.y=c.y-20;
    m.hzF=(x,y)=>((x-c.x)/(RX+14))**2+((y-c.y)/(RY+12))**2<1}
  else{if(!K.hit){K.hit=1;this.cameras.main.shake(160,.007);if(((p.x-c.x)/RX)**2+((p.y-c.y)/RY)**2<1){this.swHurt(m,18,'밑에서 잡아채는 손');this.slow=Math.max(this.slow||0,.9)}}
   const H={x:c.x,y:c.y-18,a:0,s:50,cl:1};this.swToPalm(m,H,0,n,0);K.kf=18;m.x=c.x+46;m.y=c.y-34;m.gone=0;
   if(K.i+1<K.n&&t>UP+.25){K.i++;this.swGrabNew(m,p,K);return}if(t>UP+.3)return 1}}
 // ---------- 2페이즈: 손바닥 ① 달려와 합쳐지기 (+ 블랙홀 → 초신성) ----------
 sw_palms0(m,p,K){K.hole=K.k=='hole';const r=m.hp/m.mh;K.np=K.hole?(r<.3?5:4):(r<.3?6:r<.4?4:3);K.c={x:Phaser.Math.Clamp(p.x,90,710),y:Phaser.Math.Clamp(p.y,80,280)};K.base=Math.random()*6.283;K.ex=K.hole?2.8:2.4;K.food=K.hole?5:4;K.R=50;
  if((m.paN=(m.paN||0)+1)<=2)this.dtx(400,64,'손바닥들이 너를 삼키러 온다 — 손 사이 틈으로 붉은 원을 벗어날 것','#ffe066')}
 sw_hole0(m,p,K){this.sw_palms0(m,p,K)}
 sw_hole(m,dt,p,K){return this.sw_palms(m,dt,p,K)}
 sw_palms(m,dt,p,K){const g=m.tg,t=K.t,c=K.c,n=m.P.length,FORM=.55,RUN=1.25,MERGE=FORM+RUN,now=this.time.now/1000,D0=240;
  if(t<MERGE){const k=t<FORM?0:Math.min(1,(t-FORM)/RUN),e=k*k*(3-2*k),rr=D0*(1-e)+8*e,pu=.5+.5*Math.sin(now*14);
   g.fillStyle(0xff3b4f,.08+.14*(t/MERGE)).fillEllipse(c.x,c.y,K.R*2,K.R*1.44);g.lineStyle(2,0xff5a7a,.6+.3*pu).strokeEllipse(c.x,c.y,K.R*2,K.R*1.44);
   const per=Math.floor(n/K.np),Hs=[];for(let h=0;h<K.np;h++){const a=K.base+h/K.np*6.283,hx=c.x+Math.cos(a)*rr*1.15,hy=c.y+Math.sin(a)*rr*.8,H={x:hx,y:hy,s:40,a:Math.atan2(c.x-hx,-(c.y-hy)),cl:.0};Hs.push(H);if(t>FORM*.5)this.swPalmDraw(g,H,0x5a2a90,.32);
    g.lineStyle(1,0xff5a7a,.22).lineBetween(c.x+Math.cos(a)*D0*1.15,c.y+Math.sin(a)*D0*.8,c.x,c.y);this.swToPalm(m,H,h*per,per,0)}
   K.kf=t<FORM?5:14;m.gone=1;m.x=c.x;m.y=c.y-200;if(t>FORM)for(const H of Hs)if(this.swHitPalm(p.x,p.y,H)){this.swHurt(m,10,'달려드는 손바닥',.6);break}
   m.hzF=(x,y)=>((x-c.x)/(K.R+18))**2+((y-c.y)/(K.R*.72+14))**2<1||Hs.some(H=>this.swHitPalm(x,y,{...H,s:H.s*1.3}));return}
  if(!K.m){K.m=1;this.cameras.main.shake(260,.01);if(((p.x-c.x)/K.R)**2+((p.y-c.y)/(K.R*.72))**2<1){this.swHurt(m,24,'손바닥에 삼켜졌다');this.slow=Math.max(this.slow||0,1.2)}m.x=c.x;m.y=c.y;
   if(K.hole){K.G=[[Math.random()*6.283,.34],[0,.34]];K.G[1][0]=K.G[0][0]+2.4+Math.random()*1.4}}
  if(!K.hole){for(const q of m.P)if(q.on){q.tx=c.x+q.bx*1.5;q.ty=c.y+q.by*1.5}K.kf=16;m.gone=t<MERGE+.3?1:0;return t>MERGE+.35}
  // 블랙홀: 끌어당긴다 → 초신성 고리 (틈 둘은 미리 금빛으로 보인다)
  const th=t-MERGE,PULL=2.2;
  if(th<PULL){this.emPull={x:c.x,y:c.y,v:50+40*(th/PULL)};const pu=.5+.5*Math.sin(now*10);for(let r=0;r<5;r++){const rr=1-((now*.8+r/5)%1);g.lineStyle(1.5,0xb07aff,.5*rr).strokeEllipse(c.x,c.y,320*rr,200*rr)}
    g.fillStyle(0x000000,.9).fillCircle(c.x,c.y,10+4*pu);this.swRingDraw(g,c.x,c.y,90,K.G,.0,pu,.8);for(const[a,w]of K.G){g.lineStyle(2,0xffe066,.35+.3*pu).lineBetween(c.x+Math.cos(a)*30,c.y+Math.sin(a)*24,c.x+Math.cos(a)*380,c.y+Math.sin(a)*300)}
    for(const q of m.P)if(q.on){const a=Math.atan2(q.y-c.y,q.x-c.x)+dt*3,r=Math.max(6,Math.hypot(q.x-c.x,q.y-c.y)*.96);q.tx=c.x+Math.cos(a)*r;q.ty=c.y+Math.sin(a)*r*.8}K.kf=12;
    for(const f of this.cur.food)if(f.on&&f.spr){const fx=c.x-f.x,fy=c.y-f.y,fd=Math.hypot(fx,fy)||1;if(fd<320){f.x+=fx/fd*60*dt;f.y+=fy/fd*60*dt;f.spr.setPosition(f.x,f.y)}}
    if(Math.hypot(p.x-c.x,p.y-c.y)<22)this.swHurt(m,8,'블랙홀',.5);m.gone=1;m.hzF=(x,y)=>Math.hypot(x-c.x,y-c.y)<60;
    if(th<.1&&!K.ht){K.ht=1;this.dtx(c.x,c.y-50,'빨려 든다 — 버티고, 금빛 틈 쪽에 설 것','#ffe066')}return}
  this.emPull=null;const k=Math.min(1,(th-PULL)/1.4),R=24+k*440;if(th-PULL>1.45)return 1;
  this.swRingDraw(g,c.x,c.y,R,K.G,.8,.8,.8);let j=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;let a=(j/n)*6.283;for(const[gc,w]of K.G)if(Math.abs(Phaser.Math.Angle.Wrap(a-gc))<w)a=gc+w*1.05;q.tx=c.x+Math.cos(a)*R;q.ty=c.y+Math.sin(a)*R*.8;q.x=q.tx;q.y=q.ty}
  if(this.swOnRing(p.x,p.y,c.x,c.y,R,K.G,.8,12))this.swHurt(m,18,'초신성',.8);m.hzF=(x,y)=>{const d=Math.hypot(x-c.x,(y-c.y)/.8);return d>R-14&&d<R+70&&!this.swInGap(Math.atan2((y-c.y)/.8,x-c.x),K.G.map(([a,w])=>[a,w*.8]))};
  m.x=c.x;m.y=c.y;m.gone=0}
 // ---------- 2페이즈: 세포 분열 + 진짜 여왕 ----------
 sw_mitosis0(m,p,K){K.cl=[{x:m.x,y:m.y,vx:0,vy:0,ids:m.P.map((q,i)=>i),real:1}];K.stg=0;K.ex=1.6;K.food=2;this.dtx(400,64,'무리가 쪼개진다 — 금빛 테두리가 진짜 여왕 · 작은 무리는 물어서 먹을 것','#ffe066')}
 sw_mitosis(m,dt,p,K){const g=m.tg,t=K.t,now=this.time.now/1000;
  const want=t<.4?1:t<1.9?2:t<3.4?4:8;while(K.cl.length<want&&K.stg<3){const nc=[];for(const c of K.cl){const a=Math.random()*6.283,h=c.ids.length>>1,A={x:c.x,y:c.y,vx:Math.cos(a)*160,vy:Math.sin(a)*120,ids:c.ids.slice(0,h),real:0},B={x:c.x,y:c.y,vx:-Math.cos(a)*160,vy:-Math.sin(a)*120,ids:c.ids.slice(h),real:0};if(c.real)(Math.random()<.5?A:B).real=1;nc.push(A,B)}K.cl=nc;K.stg++;this.cameras.main.shake(120,.004)}
  const sp=46+12*K.stg;for(const c of K.cl){const dx=p.x-c.x,dy=p.y-c.y,d=Math.hypot(dx,dy)||1;c.vx+=(dx/d*sp-c.vx)*Math.min(1,dt*1.6);c.vy+=(dy/d*sp-c.vy)*Math.min(1,dt*1.6);
   for(const o of K.cl)if(o!==c){const ex=c.x-o.x,ey=c.y-o.y,ed=Math.hypot(ex,ey)||1;if(ed<50){c.vx+=ex/ed*90*dt*4;c.vy+=ey/ed*90*dt*4}}
   c.x=Phaser.Math.Clamp(c.x+c.vx*dt,50,750);c.y=Phaser.Math.Clamp(c.y+c.vy*dt,50,310);const rad=Math.sqrt(c.ids.length)*1.7+4;c.rad=rad;
   for(const id of c.ids){const q=m.P[id];if(!q.on)continue;q.tx=c.x+q.bx/30*rad;q.ty=c.y+q.by/30*rad}
   if(c.real){const pu=.5+.5*Math.sin(now*9);g.lineStyle(2,0xffe066,.5+.4*pu).strokeCircle(c.x,c.y,rad+7);m.x=c.x;m.y=c.y;m.vx=c.vx;m.vy=c.vy}
   if(Math.hypot(p.x-c.x,p.y-c.y)<rad*.8+4)this.swHurt(m,7,'분열한 무리',.8)}
  K.kf=7;m.gone=0;m.ex=1;m.hzF=(x,y)=>K.cl.some(c=>Math.hypot(x-c.x,y-c.y)<(c.rad||10)+18);
  if(t>7.2){m.ex=0;for(const q of m.P)if(q.on){q.tx=m.x;q.ty=m.y}m.hist=[];return 1}}
 // 무는 동작: 가짜 무리는 터져 먹이가 된다
 swBite(fx,fy){const m=this.swOn;if(!m||!m.on||m.st!='sk'||!m.sk||m.sk.k!='mitosis')return 0;const p=this.pl,K=m.sk;let hit=0;
  for(const c of K.cl.slice()){if(c.real)continue;const dx=c.x-p.x,dy=c.y-p.y,d=Math.hypot(dx,dy);if(d<C.BITE.range+(c.rad||8)&&(dx*fx+dy*fy)/(d||1)>.2){
   K.cl.splice(K.cl.indexOf(c),1);let k=0;for(const id of c.ids){const q=m.P[id];if(q.on&&k<3){k++}q.on=0}this.swFood(m,c.x,c.y,Math.min(3,Math.max(1,c.ids.length/25|0)));this.dtx(c.x,c.y-16,'가짜 무리가 터졌다','#9fe8b0');
   for(let i=0;i<10;i++){const a=i/10*6.283,b=this.add.circle(c.x,c.y,2,0x7ae698).setDepth(12);this.tweens.add({targets:b,x:c.x+Math.cos(a)*30,y:c.y+Math.sin(a)*22,alpha:0,duration:300,onComplete:()=>b.destroy()})}hit=1;break}}
  return hit}
 // ---------- 2페이즈: 행성 고리 + 펄서 ----------
 sw_orbit0(m,p,K){K.cx=400;K.cy=180;K.wu=1.1;K.dur=6.2;K.ex=2.6;K.food=4;K.b0=Math.atan2(p.y-180,p.x-400)+1.6;this.dtx(400,64,'행성 고리와 빛줄기 — 고리 안쪽 빈 곳으로, 빛줄기를 따라 돌 것','#ffe066')}
 sw_orbit(m,dt,p,K){const g=m.tg,t=K.t,now=this.time.now/1000,n=m.P.length;if(t<.6){m.x+=(K.cx-m.x)*Math.min(1,dt*4);m.y+=(K.cy-m.y)*Math.min(1,dt*4);this.swBody(m,dt,p,0);return}
  const tt=t-.6;if(tt>K.dur)return 1;const RG=[[235,58,.35*tt+.2],[165,96,-.28*tt+1.1]],ba=K.b0+tt*(.5+.04*tt),pt=(r,a)=>{const[rx,ry,ti]=r,x=Math.cos(a)*rx,y=Math.sin(a)*ry;return[K.cx+x*Math.cos(ti)-y*Math.sin(ti),K.cy+x*Math.sin(ti)+y*Math.cos(ti)]};
  let j=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;if(j%10<6){const r=RG[j%2],a=(j/n)*6.283*3+now*.4,w=pt(r,a);q.tx=w[0];q.ty=w[1];q.cc=q.c}else{const s=(j%2?1:-1),L=20+((j*37)%170)/170*380,a=ba+(s<0?Math.PI:0);q.tx=K.cx+Math.cos(a)*L;q.ty=K.cy+Math.sin(a)*L*.62;q.cc=2}}
  K.kf=tt<K.wu?3:12;K.snap=tt>K.wu*.8;m.x=K.cx;m.y=K.cy;m.gone=0;
  if(tt>=K.wu){for(const r of RG){g.lineStyle(6,0xa46ef2,.18);g.beginPath();for(let k=0;k<=48;k++){const w=pt(r,k/48*6.283);if(k)g.lineTo(w[0],w[1]);else g.moveTo(w[0],w[1])}g.strokePath()}for(const s of[0,Math.PI])g.lineStyle(10,0xffc860,.22).lineBetween(K.cx,K.cy,K.cx+Math.cos(ba+s)*400,K.cy+Math.sin(ba+s)*400*.62)}
  if(tt<K.wu){for(const r of RG){g.lineStyle(2,0xff3b4f,.25);g.beginPath();for(let k=0;k<=40;k++){const w=pt(r,k/40*6.283);if(k)g.lineTo(w[0],w[1]);else g.moveTo(w[0],w[1])}g.strokePath()}for(const s of[0,Math.PI])g.lineStyle(2,0xffe066,.3).lineBetween(K.cx,K.cy,K.cx+Math.cos(ba+s)*400,K.cy+Math.sin(ba+s)*400*.62)}
  const onR=(x,y,th)=>{for(const r of RG)for(let k=0;k<48;k++){const w=pt(r,k/48*6.283);if(Math.hypot(x-w[0],y-w[1])<th)return true}return false},
   onB=(x,y,th)=>{for(const s of[0,Math.PI]){const ux=Math.cos(ba+s),uy=Math.sin(ba+s)*.62,ul=Math.hypot(ux,uy),dx=x-K.cx,dy=y-K.cy,al=(dx*ux+dy*uy)/ul;if(al>20&&Math.abs(dx*uy-dy*ux)/ul<th)return true}return false};
  if(tt>=K.wu){if(onR(p.x,p.y,10))this.swHurt(m,8,'행성 고리',.6);else if(onB(p.x,p.y,9))this.swHurt(m,10,'펄서',.6)}
  if(Math.hypot(p.x-K.cx,p.y-K.cy)<26)this.swHurt(m,7,'거대 유충의 몸',.8);m.hzF=(x,y)=>onR(x,y,24)||onB(x,y,26)||Math.hypot(x-K.cx,y-K.cy)<40}
 // ---------- 2페이즈 (체력 15% 이하): 밀물 + 잡아채는 손 ----------
 sw_tide0(m,p,K){m.tided=1;K.isl=[{x:230,y:110},{x:560,y:96},{x:400,y:240},{x:660,y:262},{x:150,y:262}];K.L2R=Math.random()<.5;K.ex=3.0;K.food=5;K.gt=0;K.gc=null;this.dtx(400,64,'밀물 — 바위 섬 위로! 섬 밑에서 손이 올라오면 다른 섬으로','#ffe066')}
 sw_tide(m,dt,p,K){const g=m.tg,t=K.t,n=m.P.length,now=this.time.now/1000,IN=3.0,HOLD=6.2,OUT=7.6;if(t>OUT)return 1;
  const fr=t<IN?t/IN:t<HOLD?1:Math.max(0,1-(t-HOLD)/(OUT-HOLD)),edge=K.L2R?-40+fr*880:840-fr*880,inT=(x)=>K.L2R?x<edge:x>edge;
  for(const s of K.isl){g.fillStyle(0x5a5070,1).fillEllipse(s.x,s.y+4,80,52);g.fillStyle(0x857aa0,1).fillEllipse(s.x,s.y,76,48);g.lineStyle(1.5,0xc8c0e0,.8).strokeEllipse(s.x,s.y,76,48)}
  g.fillStyle(0x3a8a5a,.18).fillRect(K.L2R?0:Math.max(0,edge),0,K.L2R?Math.max(0,edge):800-Math.max(0,edge),360);
  const onIsl=(x,y)=>K.isl.find(s=>((x-s.x)/38)**2+((y-s.y)/24)**2<1);
  let j=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;const yy=20+((j*53)%n)/n*320,band=K.L2R?Math.max(0,edge):800-Math.max(0,800-edge);let xx;if(j%3==0)xx=edge+Math.sin(now*3+yy*.05)*10;else{const w=K.L2R?Math.max(10,edge):Math.max(10,800-edge);xx=K.L2R?(j*97%1000)/1000*w:800-(j*97%1000)/1000*w}
   const isl=onIsl(xx,yy);if(isl)xx+=(xx<isl.x?-40:40);q.tx=xx;q.ty=yy}K.kf=6;m.gone=1;m.x=K.L2R?Math.max(40,edge-30):Math.min(760,edge+30);m.y=180;
  if(inT(p.x)&&!onIsl(p.x,p.y))this.swHurt(m,3,'밀물',.8);
  // 서 있는 섬 밑에서 손이 올라온다
  if(t>IN+.3&&t<HOLD){K.gt-=dt;const me=onIsl(p.x,p.y);if(!K.gc&&K.gt<=0&&me){K.gc={s:me,t:0};K.gt=1.7}
   if(K.gc){const G=K.gc;G.t+=dt;const k=Math.min(1,G.t/.9),pu=.5+.5*Math.sin(now*14);g.fillStyle(0xff3b4f,.1+.2*k).fillEllipse(G.s.x,G.s.y,70,44);g.lineStyle(2,0xff5a7a,.6+.3*pu).strokeEllipse(G.s.x,G.s.y,70,44);
    if(G.t>=.9&&!G.h){G.h=1;this.cameras.main.shake(140,.006);if(onIsl(p.x,p.y)===G.s){this.swHurt(m,16,'섬 밑에서 잡아채는 손');this.slow=Math.max(this.slow||0,.8)}}if(G.t>1.5)K.gc=null}}
  m.hzF=(x,y)=>(inT(x)&&!onIsl(x,y))||(K.gc&&onIsl(x,y)===K.gc.s)}
 // ---------- 변신: 여왕이 무리를 입는다 ----------
 swTrans(m){m.st='trans';m.tm=0;m.sk=null;m.ex=0;this.emPull=null;this.tel=this.tel.filter(q=>q.m!==m);m.hp=Math.max(m.hp,m.mh*.5);this.inv=Math.max(this.inv,3);
  const t1=this.add.text(400,74,'무리를 입은 여왕',ST({fontSize:'24px',fontStyle:'bold',color:'#ffc860'})).setOrigin(.5).setDepth(151).setAlpha(0),t2=this.add.text(400,104,'흩어지던 무리가 여왕의 몸이 된다 — 거대한 유충',ST({fontSize:'12px',color:'#e8d8c0'})).setOrigin(.5).setDepth(151).setAlpha(0);m.tt=[t1,t2];this.tweens.add({targets:[t1,t2],alpha:1,duration:400})}
 swTransU(m,dt){m.tm+=dt;const t=m.tm,now=this.time.now/1000;m.x+=(400-m.x)*Math.min(1,dt*2);m.y+=(170-m.y)*Math.min(1,dt*2);
  for(const q of m.P){if(!q.on&&t>.5&&Math.random()<.02){q.on=1;q.x=Math.random()*800;q.y=Math.random()<.5?-10:370}if(!q.on)continue;const a=Math.atan2(q.y-m.y,q.x-m.x)+dt*4,r=Math.max(4,Math.hypot(q.x-m.x,q.y-m.y)*(t<1.6?.95:1.0));q.tx=m.x+Math.cos(a)*r;q.ty=m.y+Math.sin(a)*r}
  this.swMove(m,dt,10);if(m.spr)m.spr.setPosition(m.x,m.y).setScale(1.2+.7*Math.min(1,t/2)).setRotation(t*3).setTint(0xffffff);
  if(t>1.9&&!m.fl2){m.fl2=1;this.cameras.main.flash(300,255,220,160);this.cameras.main.shake(500,.012);m.N=420;while(m.P.length<m.N){const a=Math.random()*6.283,r=Math.abs(Math.random()+Math.random()+Math.random()-1.5)*30;m.P.push({x:m.x,y:m.y,tx:m.x,ty:m.y,bx:Math.cos(a)*r,by:Math.sin(a)*r*.75,ph:Math.random()*6.283,c:m.P.length%2,on:1,k:2+Math.random()*2})}for(const q of m.P)q.on=1}
  this.swDraw(m);if(t>2.8){m.ph=2;m.st='idle';m.cd=1;m.hist=[];m.bag=null;m.seq=0;if(m.spr)m.spr.clearTint();(m.tt||[]).forEach(o=>this.tweens.add({targets:o,alpha:0,duration:500,onComplete:()=>o.destroy()}));m.tt=null}}
 // ---------- 처치 ----------
 swDie(m){if(!m.on)return;if(m.ph==1){if(m.st!='trans'){m.hp=m.mh*.5;this.swTrans(m)}return}m.on=0;m.gone=1;m.st='dead';this.kc=(this.kc||0)+1;this.emPull=null;this.tel=this.tel.filter(q=>q.m!==m);if(m.lvT){m.lvT.destroy();m.lvT=null}if(this.swNm){this.swNm.destroy();this.swNm=null}
  const x=m.x,y=m.y,s=m.spr;m.spr=null;if(m.tg)m.tg.clear();if(m.fg)m.fg.clear();
  if(s){s.setTintFill(0xffffff);this.tweens.add({targets:s,scale:3,alpha:0,angle:180,duration:1400,ease:'Quad.out',onComplete:()=>s.destroy()})}
  const P=m.P.filter(q=>q.on),g=m.pg;let tt=0;const ev=this.time.addEvent({delay:16,loop:true,callback:()=>{tt+=.016;g.clear();for(const q of P){const a=Math.atan2(q.y-y,q.x-x),v=(140+(q.ph*30))*.016;q.x+=Math.cos(a)*v;q.y+=Math.sin(a)*v+tt*1.5}const al=Math.max(0,1-tt/1.6);g.fillStyle(0x7ae698,al);for(const q of P)if(q.c==0)g.fillRect(q.x-1.5,q.y-1,3,2);g.fillStyle(0xa46ef2,al);for(const q of P)if(q.c==1)g.fillRect(q.x-1.5,q.y-1,3,2);if(tt>1.7){ev.remove();g.clear()}}});
  for(let i=0;i<8;i++){const r=this.add.ellipse(x,y,40,26).setStrokeStyle(2,0xffe0a0,.8).setDepth(12);this.tweens.add({targets:r,scaleX:6,scaleY:5,alpha:0,delay:i*150,duration:1100,onComplete:()=>r.destroy()})}
  const rf=this.add.image(400,170,'rift').setDepth(5.5).setTint(0xffffff).setScale(.3).setAlpha(0);this.tweens.add({targets:rf,alpha:1,scaleX:2.2,scaleY:3,delay:900,duration:1600,ease:'Sine.out'});this.cameras.main.shake(600,.01);
  this.gainXp(220);this.dtx(x,y-50,'여왕이 무너지자 무리가 흩어진다','#ffe066');this.swOn=null;
  this.time.delayedCall(2800,()=>{if(!this.over)this.ending('흩어진 무리가 빠져나간 둥지 한가운데에, 바깥으로 이어지는 틈이 열렸다.')})}
 // 자동 테스트용: 지금 위험한 자리인가 (예고 포함)
 swDanger(x,y){const m=this.swOn;if(!m||!m.on)return false;try{if(m.hzF&&m.hzF(x,y))return true;for(const q of this.tel)if(q.dmg&&this.telIn(q,x,y))return true}catch(e){}return false}
