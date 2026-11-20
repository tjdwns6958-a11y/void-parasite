 // ===== v39: 1페이즈 R1 — 회전하는 세 겹 고리 =====
 sw_ringr0(m,p,K){this.sw_ring30(m,p,K);const s0=Math.random()<.5?1:-1;K.R.forEach((r,i)=>{r.w=(i%2?-1:1)*s0*(.45+i*.1)});K.src='회전하는 세 겹 고리';K.wu=1.0;
  if((m.rrN=(m.rrN||0)+1)<=2)this.dtx(400,64,'세 겹 고리의 틈이 돈다 — 화살표 방향으로 틈을 따라가며 빠질 것','#ffe066')}
 sw_ringr(m,dt,p,K){const g=m.tg,pu=.5+.5*Math.sin(this.time.now/70),tt=Math.max(0,K.t-K.wu);let alive=0;
  const rs=K.R.map(r=>{const R=r.R0-tt*K.v;if(R>14)alive++;return{R:Math.max(14,R),ga:r.ga+r.w*tt,w:r.w,on:R>14}});if(!alive)return 1;
  for(const r of rs)if(r.on){this.swRingDraw(g,K.cx,K.cy,r.R,[[r.ga,K.gw]],K.t<K.wu?.35:.75,pu);
   // 틈이 도는 방향 (금빛 화살)
   const sg=Math.sign(r.w),a0=r.ga+sg*(K.gw+.06),a1=a0+sg*.32,R2=r.R+9;g.lineStyle(2,0xffe066,.55+.4*pu);g.beginPath();for(let k=0;k<=6;k++){const a=a0+(a1-a0)*k/6,x=K.cx+Math.cos(a)*R2,y=K.cy+Math.sin(a)*R2*.8;if(k)g.lineTo(x,y);else g.moveTo(x,y)}g.strokePath();
   const ax=K.cx+Math.cos(a1)*R2,ay=K.cy+Math.sin(a1)*R2*.8,ta=Math.atan2(Math.cos(a1)*R2*.8*sg,-Math.sin(a1)*R2*sg);g.fillStyle(0xffe066,.55+.4*pu).fillTriangle(ax+Math.cos(ta)*5,ay+Math.sin(ta)*5,ax+Math.cos(ta+2.4)*4,ay+Math.sin(ta+2.4)*4,ax+Math.cos(ta-2.4)*4,ay+Math.sin(ta-2.4)*4)}
  const n=m.P.length,per=Math.ceil(n/3);let j=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;const r=rs[j%3];j++;if(!r.on){q.tx=K.cx+q.bx*.4;q.ty=K.cy+q.by*.4;continue}const a=r.ga+K.gw+((j/3|0)%per)/per*(6.283-2*K.gw);q.tx=K.cx+Math.cos(a)*r.R;q.ty=K.cy+Math.sin(a)*r.R*.8}
  const out=rs[2],oa=out.ga+Math.PI;m.x=K.cx+Math.cos(oa)*out.R;m.y=K.cy+Math.sin(oa)*out.R*.8;m.gone=1;K.kf=K.t<K.wu?4:14;K.snap=K.t>K.wu;
  if(K.t>K.wu)for(const r of rs)if(r.on&&this.swOnRing(p.x,p.y,K.cx,K.cy,r.R,[[r.ga,K.gw]],.8,10)){this.swHurt(m,8,K.src,.7);break}
  m.hzF=(x,y)=>rs.some(r=>{if(!r.on)return false;const d=Math.hypot(x-K.cx,(y-K.cy)/.8);return d<r.R+22&&d>r.R-46&&!this.swInGap(Math.atan2((y-K.cy)/.8,x-K.cx),[[r.ga+r.w*.25,K.gw*.75]])})}
 // ===== v39: 2페이즈 R3 — 쫓아오는 고리 (어렵게) =====
 sw_ringc0(m,p,K){K.rs=[];K.n=0;K.N=6;K.iv=.5;K.nx=0;K.ex=1.5;K.src='쫓아오는 고리';K.gw=.48;K.v=106;K.R0=126;K.wu=.42;
  if((m.rcN=(m.rcN||0)+1)<=2)this.dtx(400,64,'쫓아오는 고리 — 멈추지 말 것! 고리마다 금빛 틈으로','#ffe066')}
 sw_ringc(m,dt,p,K){const g=m.tg,pu=.5+.5*Math.sin(this.time.now/60),b=this.pl.body,vx=b?b.velocity.x:0,vy=b?b.velocity.y:0;
  K.nx-=dt;if(K.n<K.N&&K.nx<=0){K.nx=K.iv;const lead=K.n%2?.5:.15;K.rs.push({x:Phaser.Math.Clamp(p.x+vx*lead,40,760),y:Phaser.Math.Clamp(p.y+vy*lead,40,320),ga:Math.random()*6.283,t:0});K.n++}
  let act=0;for(const r of K.rs){r.t+=dt;const tt=Math.max(0,r.t-K.wu);r.R=K.R0-tt*K.v;r.on=r.R>12;if(r.on)act++}
  if(K.n>=K.N&&!act)return 1;
  for(const r of K.rs)if(r.on){this.swRingDraw(g,r.x,r.y,r.R,[[r.ga,K.gw]],r.t<K.wu?.28:.78,pu);if(r.t<K.wu){g.fillStyle(0xff3b4f,.5).fillCircle(r.x,r.y,3)}}
  const A=K.rs.filter(r=>r.on),n=m.P.length;let j=0;
  for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;if(!A.length){q.tx=m.x+q.bx;q.ty=m.y+q.by;continue}const r=A[j%A.length],k=((j/A.length|0)%60)/60,a=r.ga+K.gw+k*(6.283-2*K.gw);q.tx=r.x+Math.cos(a)*r.R;q.ty=r.y+Math.sin(a)*r.R*.8}
  K.kf=16;K.snap=1;m.gone=1;const L=K.rs[K.rs.length-1];if(L){m.x=L.x;m.y=L.y}
  for(const r of A)if(r.t>K.wu&&this.swOnRing(p.x,p.y,r.x,r.y,r.R,[[r.ga,K.gw]],.8,10)){this.swHurt(m,8,K.src,.6);break}
  m.hzF=(x,y)=>A.some(r=>{const d=Math.hypot(x-r.x,(y-r.y)/.8);return d<r.R+22&&d>r.R-50&&!this.swInGap(Math.atan2((y-r.y)/.8,x-r.x),[[r.ga,K.gw*.75]])})||(K.n<K.N&&Math.hypot(x-p.x,y-p.y)<20)}
 // ===== v39: G3 별똥 은하 + 은하 끝의 금빛 유도탄 =====
 sw_gstar0(m,p,K){K.cx=400;K.cy=180;K.rot=Math.random()*6.283;K.mv=.7;K.wu=1.0;K.dur=5.6;K.ex=2.4;K.food=4;K.cn=1.1;K.mn=1.6;K.cm=[];K.dir=Math.random()<.5?1:-1;
  this.dtx(400,64,'별똥 은하 — 팔 사이로 피하고, 팔 끝이 빛나면 그 줄에서 비킬 것 · 금빛 유도탄은 크게 돌아 따돌릴 것','#ffe066')}
 sw_gstar(m,dt,p,K){const g=m.tg,now=this.time.now/1000,n=m.P.length,RM=300,AK=.017,AR=4,SP=6.283/AR;
  if(K.t<K.mv){m.x+=(K.cx-m.x)*Math.min(1,dt*4);m.y+=(K.cy-m.y)*Math.min(1,dt*4);for(const q of m.P)if(q.on){q.tx=m.x+q.bx;q.ty=m.y+q.by}return}
  const t=K.t-K.mv;if(t>K.dur+.2&&!K.cm.length)return 1;const sp=(.5+.25*Math.min(1,t/K.dur))*K.dir;K.rot+=sp*dt;
  const tip=(arm)=>K.rot+RM*AK+arm*SP,armHit=(x,y,th)=>{const dx=x-K.cx,dy=(y-K.cy)/.62,r=Math.hypot(dx,dy);if(r<22||r>RM+8)return false;const a=Math.atan2(dy,dx);for(let k=0;k<AR;k++)if(Math.abs(Phaser.Math.Angle.Wrap(a-(K.rot+r*AK+k*SP)))*r<th)return true;return false};
  // 팔 (4개)
  const al=t<K.wu?.3:1;let j=0;const CM=Math.floor(n*.06);
  for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;if(j<=CM&&K.cm.length){const c=K.cm[j%K.cm.length];if(c.t>0){const b=(j%8)/8*40;q.tx=K.cx+Math.cos(c.a)*Math.max(20,c.r-b);q.ty=K.cy+Math.sin(c.a)*Math.max(20,c.r-b)*.62;q.cc=2;continue}}q.cc=q.c;
   const arm=i%AR,r=24+((i/AR|0)/(n/AR))*(RM-24),a=K.rot+r*AK+arm*SP+Math.sin(now*2+q.ph)*.025;q.tx=K.cx+Math.cos(a)*r;q.ty=K.cy+Math.sin(a)*r*.62}
  K.kf=t<K.wu?3:12;K.snap=t>K.wu+.3;m.x=K.cx;m.y=K.cy;m.gone=1;
  if(t<K.wu)for(let arm=0;arm<AR;arm++){g.lineStyle(2,0xff3b4f,.22);g.beginPath();for(let r=24;r<=RM;r+=14){const a=K.rot+r*AK+arm*SP,x=K.cx+Math.cos(a)*r,y=K.cy+Math.sin(a)*r*.62;if(r>24)g.lineTo(x,y);else g.moveTo(x,y)}g.strokePath()}
  if(t>=K.wu&&t<K.dur){
   // 별똥: 팔 끝이 빛난 뒤 바깥 방향 직선으로 튀어 나간다
   K.cn-=dt;if(K.cn<=0){K.cn=1.25;const arms=Phaser.Utils.Array.Shuffle([0,1,2,3]).slice(0,2);for(const arm of arms){const a=tip(arm)+K.dir*.35;K.cm.push({a,r:30,t:-.6,arm});this.telAdd({k:'l',x:K.cx+Math.cos(a)*30,y:K.cy+Math.sin(a)*30*.62,x2:K.cx+Math.cos(a)*460,y2:K.cy+Math.sin(a)*460*.62,w:20,t:.6,src:'',fx:0,m})}}
   // 금빛 유도탄: 은하 끝에서
   K.mn-=dt;if(K.mn<=0){K.mn=1.5;m.ms=m.ms||[];for(const arm of Phaser.Utils.Array.Shuffle([0,1,2,3]).slice(0,2)){const a=tip(arm),x=K.cx+Math.cos(a)*RM,y=K.cy+Math.sin(a)*RM*.62;if(x<20||x>780||y<20||y>340)continue;m.ms.push({x,y,a:a+K.dir*Math.PI/2,v:115,t:0,tr:[]});const fl=this.add.circle(x,y,9,0xffe066,.8).setDepth(12);this.tweens.add({targets:fl,scale:2.2,alpha:0,duration:350,onComplete:()=>fl.destroy()})}}
   if(armHit(p.x,p.y,9))this.swHurt(m,6,'별똥 은하',.8)}
  for(const c of K.cm){c.t+=dt;if(c.t>0){c.r+=560*dt;const hx=K.cx+Math.cos(c.a)*c.r,hy=K.cy+Math.sin(c.a)*c.r*.62;g.fillStyle(0xffe066,.9).fillCircle(hx,hy,5);g.fillStyle(0xffc860,.35).fillCircle(hx,hy,10);if(Math.hypot(p.x-hx,p.y-hy)<15)this.swHurt(m,10,'별똥',.6)}}
  K.cm=K.cm.filter(c=>c.r<480);
  // 끝: 팔이 고리로 굳어 조여 온다 (틈 넷 = 팔 사이)
  if(t>=K.dur){const k=Math.min(1,(t-K.dur)/1.4),R=RM*(1-k)+18*k,G=[0,1,2,3].map(i=>[K.rot+RM*AK*.5+i*SP+SP/2,.36]);if(t-K.dur>1.5&&!K.cm.length)return 1;
   this.swRingDraw(g,K.cx,K.cy,R,G,.6,.5+.5*Math.sin(now*12),.62);let jj=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;jj++;let a=(jj/n)*6.283;for(const[c,w]of G)if(Math.abs(Phaser.Math.Angle.Wrap(a-c))<w)a=c+w*(Phaser.Math.Angle.Wrap(a-c)>0?1.05:-1.05);q.tx=K.cx+Math.cos(a)*R;q.ty=K.cy+Math.sin(a)*R*.62;q.cc=q.c}
   if(this.swOnRing(p.x,p.y,K.cx,K.cy,R,G,.62,10))this.swHurt(m,9,'은하의 고리',.6);
   m.hzF=(x,y)=>{const d=Math.hypot(x-K.cx,(y-K.cy)/.62);return d<R+24&&d>R-60&&!this.swInGap(Math.atan2((y-K.cy)/.62,x-K.cx),G.map(([c,w])=>[c,w*.8]))};return}
  m.hzF=(x,y)=>armHit(x,y,26)||Math.hypot(x-K.cx,y-K.cy)<30||K.cm.some(c=>{const ux=Math.cos(c.a),uy=Math.sin(c.a)*.62,ul=Math.hypot(ux,uy),dx=x-K.cx,dy=y-K.cy,al=(dx*ux+dy*uy)/ul;return al>c.r*ul-30&&Math.abs(dx*uy-dy*ux)/ul<22})}
 // 금빛 유도탄 (패턴이 끝나도 수명 동안 쫓아온다)
 swMsU(m,dt,p){const f=m.fg;for(const q of m.ms){q.t+=dt;const ta=Math.atan2(p.y-q.y,p.x-q.x),turn=q.t<.5?0:2.1;q.a+=Phaser.Math.Clamp(Phaser.Math.Angle.Wrap(ta-q.a),-turn*dt,turn*dt);q.v=Math.min(165,q.v+30*dt);q.x+=Math.cos(q.a)*q.v*dt;q.y+=Math.sin(q.a)*q.v*dt;
   q.tr.push([q.x,q.y]);if(q.tr.length>9)q.tr.shift();q.tr.forEach(([x,y],i)=>f.fillStyle(0xffc860,.08+.05*i).fillCircle(x,y,2+i*.25));f.fillStyle(0xfff0b0,1).fillCircle(q.x,q.y,4);f.lineStyle(1.5,0xffb030,.9).strokeCircle(q.x,q.y,6.5);
   if(Math.hypot(p.x-q.x,p.y-q.y)<11){q.dead=1;this.swHurt(m,8,'금빛 유도탄');const b=this.add.circle(q.x,q.y,5,0xffe066).setDepth(12);this.tweens.add({targets:b,scale:3,alpha:0,duration:260,onComplete:()=>b.destroy()})}
   if(q.t>4.2||q.x<-20||q.x>820||q.y<-20||q.y>380)q.dead=1}
  m.ms=m.ms.filter(q=>!q.dead)}
 // ===== v39 손 공격: 쓸어 가는 손(P1) → 기어 오는 손(P4) =====
 // ① 화면 끝에서 거대한 손이 손가락 다섯 줄로 바닥을 쓴다 (손가락 사이 틈 줄이 안전, 2페이즈는 반대쪽에서 한 번 더)
 // ② 그 손이 손가락 끝으로 서서 나를 따라 걸어오며 찍는다 → 박혀 있는 손끝마디를 물면 터지고 느려진다 → 다섯 개를 다 터뜨리면 멈추고 무너진다
 sw_hand0(m,p,K){const P2=m.ph==2;K.dir=p.x<400?-1:1;K.sw=0;K.nsw=P2?2:1;K.st='sweep';K.t0=0;K.pop=0;K.sp=1;K.stp=0;K.maxS=P2?7:6;K.ex=2;K.food=2;this.swHandLanes(K);
  if((m.hdN=(m.hdN||0)+1)<=2)this.dtx(400,64,'거대한 손이 바닥을 쓴다 — 손가락 사이 틈 줄에 설 것','#ffe066')}
 swHandLanes(K){const o=(Math.random()-.5)*30+(K.sw%2?31:0);K.L=[0,1,2,3,4].map(i=>50+i*64+o)}
 sw_hand(m,dt,p,K){if(K.st!='sweep')return this.swHandWalk(m,dt,p,K);
  const g=m.tg,n=m.P.length,now=this.time.now/1000,t=K.t-K.t0,TEL=K.sw?.8:.9,EXT=.5,HOLD=.18,RET=.42,X1=K.dir<0?14:786,PX=K.dir<0?772:28;let tip;
  if(t<TEL)tip=PX;else if(t<TEL+EXT){const k=(t-TEL)/EXT;tip=PX+(X1-PX)*(k*k*(3-2*k))}else if(t<TEL+EXT+HOLD)tip=X1;else{const k=Math.min(1,(t-TEL-EXT-HOLD)/RET);tip=X1+(PX-X1)*k*k}
  const pu=.5+.5*Math.sin(now*14);
  for(const l of K.L){g.fillStyle(0xff3b4f,t<TEL?.08+.16*(t/TEL):.1).fillRect(0,l-14,800,28);g.lineStyle(1.5,0xff5a7a,t<TEL?.45+.4*pu:.3).strokeRect(-4,l-14,808,28)}
  if(t>=TEL){const lo=Math.min(tip,PX),hi=Math.max(tip,PX);for(const l of K.L){g.fillStyle(0x3a1d66,.55).fillRoundedRect(lo,l-11,hi-lo,22,10);g.lineStyle(1,0xc8a8ff,.5).strokeRoundedRect(lo,l-11,hi-lo,22,10)}}
  if(t<TEL)for(let i=0;i<4;i++){const y=(K.L[i]+K.L[i+1])/2;for(let x=16;x<790;x+=24)g.lineStyle(1.5,0xffe066,.55).lineBetween(x,y,x+11,y)}
  // 점: 손등은 화면 끝, 손가락 다섯 줄은 손끝까지
  let j=0;const pa=Math.floor(n*.3);
  for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;
   if(j<=pa){q.tx=PX-K.dir*(16+Math.abs(q.bx)*1.3);q.ty=K.L[2]+q.by*3.2}
   else{const f=j%5,u=((j*7)%37)/37;q.tx=PX+(tip-PX)*u+K.dir*Math.sin(q.ph)*3;q.ty=K.L[f]+Math.sin(q.ph+u*9)*6}}
  // 손끝 (금빛 손톱)
  if(t>=TEL)for(const l of K.L){m.fg.fillStyle(0xffe8b0,.9).fillCircle(tip,l,5);m.fg.lineStyle(2,0xffffff,.5).strokeCircle(tip,l,8)}
  K.kf=t<TEL?6:t<TEL+EXT?22:14;m.gone=1;m.x=PX;m.y=K.L[2];
  const lo=Math.min(tip,PX),hi=Math.max(tip,PX);
  if(t>=TEL&&p.x>lo-6&&p.x<hi+6&&K.L.some(l=>Math.abs(p.y-l)<16))this.swHurt(m,10,'쓸어 가는 손가락',1.0);
  m.hzF=(x,y)=>K.L.some(l=>Math.abs(y-l)<26)&&(t<TEL||(x>lo-30&&x<hi+30));
  if(t>=TEL+EXT+HOLD+RET){K.sw++;if(K.sw<K.nsw){K.dir=-K.dir;this.swHandLanes(K);K.t0=K.t;return}this.swHandStart(m,p,K)}}
 swHandStart(m,p,K){K.st='walk';const mir=Math.random()<.5?1:-1;
  K.F=[[-1.2,.72],[-.48,.95],[-.16,1.05],[.16,.98],[.48,.82]].map(([da,l])=>({da:da*mir,l,on:1}));
  const x=K.dir<0?690:110,y=Phaser.Math.Clamp(p.y,110,250);K.H={x,y,a:Math.atan2(p.y-y,p.x-x)};K.tp=this.swHandTipsAt(K,K.H);this.swHandStep(m,p,K);
  if((m.hwN=(m.hwN||0)+1)<=2)this.dtx(400,64,'손이 걸어온다 — 박힌 손끝마디(금색)를 물어 터뜨릴 것','#ffe066')}
 swHandTipsAt(K,H){return K.F.map(f=>({x:H.x+Math.cos(H.a+f.da)*(26+62*f.l),y:H.y+Math.sin(H.a+f.da)*(26+62*f.l)*.85}))}
 swHandStep(m,p,K){const H=K.H,P2=m.ph==2,sp=K.sp;K.T=(P2?1.25:1.45)/sp;K.ft=0;K.stomped=0;
  const vx=P2&&p.body?p.body.velocity.x*.25:0,vy=P2&&p.body?p.body.velocity.y*.25:0,tx=p.x+vx,ty=p.y+vy,dx=tx-H.x,dy=ty-H.y,d=Math.hypot(dx,dy)||1;
  const mv=Math.min(Math.max(0,d-80),(P2?100:88)*sp),nx=Phaser.Math.Clamp(H.x+dx/d*mv,80,720),ny=Phaser.Math.Clamp(H.y+dy/d*mv,80,280);
  K.H0={x:H.x,y:H.y,a:H.a};K.H1={x:nx,y:ny,a:Math.atan2(ty-ny,tx-nx)};K.nt=this.swHandTipsAt(K,K.H1);K.stp++}
 swHandWalk(m,dt,p,K){const g=m.tg,n=m.P.length,now=this.time.now/1000,H=K.H;
  if(K.st=='fall'){K.fa+=dt;for(const q of m.P)if(q.on){q.tx=H.x+q.bx*1.9;q.ty=H.y+q.by*1.7+K.fa*24}K.kf=4;m.gone=K.fa<.3?1:0;m.x=H.x;m.y=H.y;m.hzF=null;return K.fa>.5}
  K.ft+=dt;const LIFT=.48,f=K.ft/K.T;
  if(f<LIFT){const k=f/LIFT,e=k*k*(3-2*k);H.x=K.H0.x+(K.H1.x-K.H0.x)*e;H.y=K.H0.y+(K.H1.y-K.H0.y)*e;H.a=K.H0.a+Phaser.Math.Angle.Wrap(K.H1.a-K.H0.a)*e}
  else if(!K.stomped){K.stomped=1;H.x=K.H1.x;H.y=K.H1.y;H.a=K.H1.a;K.tp=K.nt;this.cameras.main.shake(110,.004);let hit=0;
   K.F.forEach((fg,i)=>{if(!fg.on)return;const c=K.tp[i];if(!hit&&((p.x-c.x)/25)**2+((p.y-c.y)/19)**2<1){hit=1;this.swHurt(m,10,'손끝 찍기')}
    const r=this.add.ellipse(c.x,c.y,30,20).setStrokeStyle(2,0xe8d6ff,.7).setDepth(12);this.tweens.add({targets:r,scaleX:2,scaleY:2,alpha:0,duration:320,onComplete:()=>r.destroy()})})}
  const lift=f<LIFT?Math.sin(Math.PI*f/LIFT):0,cur=f<LIFT?this.swHandTipsAt(K,H):K.tp,al=K.F.map((x,i)=>x.on?i:-1).filter(i=>i>=0);
  if(f<LIFT){const k=f/LIFT;for(const i of al){const c=K.nt[i];g.fillStyle(0xff3b4f,.08+.2*k).fillEllipse(c.x,c.y,54,40);g.lineStyle(2,0xff5a7a,.5+.4*k).strokeEllipse(c.x,c.y,54,40)}}
  else for(const i of al){const c=K.tp[i],pu=.5+.5*Math.sin(now*10+i);g.fillStyle(0xffe066,.22+.2*pu).fillCircle(c.x,c.y,9);m.fg.lineStyle(2,0xffe066,.55+.35*pu).strokeCircle(c.x,c.y,10+2*pu)}
  // 점: 손바닥(들림) + 남은 손가락
  let j=0;const pa=Math.floor(n*(.34+.12*(5-al.length)/5));
  for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;j++;
   if(j<=pa||!al.length){q.tx=H.x+q.bx*1.05;q.ty=H.y+q.by*1.05-lift*6}
   else{const fi=al[j%al.length],c=cur[fi],da=K.F[fi].da,bx=H.x+Math.cos(H.a+da)*22,by=H.y+Math.sin(H.a+da)*22*.85,u=((j*7)%29)/29;
    q.tx=bx+(c.x-bx)*u+Math.sin(q.ph)*2;q.ty=by+(c.y-by)*u-lift*18*Math.sin(Math.PI*Math.min(1,u*1.1))}}
  m.gone=1;m.x=H.x;m.y=H.y;K.kf=f<LIFT?10:16;
  m.hzF=f<LIFT?(x,y)=>al.some(i=>Math.hypot(x-K.nt[i].x,y-K.nt[i].y)<36):null;
  if(K.ft>=K.T){if(K.stp>=K.maxS){K.ex=2;K.food=2;K.st='fall';K.fa=0;this.dtx(H.x,H.y-40,'손이 지쳐 무너진다','#c8b8e8');return}this.swHandStep(m,p,K)}}
 // 박혀 있는 손끝마디 (자동 테스트·물기 판정용)
 swHandTips(){const m=this.swOn;if(!m||!m.on||m.st!='sk'||!m.sk||m.sk.k!='hand')return null;const K=m.sk;if(K.st!='walk'||K.ft/K.T<.48||!K.tp)return null;return K.F.map((f,i)=>f.on?K.tp[i]:null).filter(Boolean)}
 swHandBite(m,fx,fy){const K=m.sk;if(!this.swHandTips())return 0;const p=this.pl;
  for(let i=0;i<5;i++){const fg=K.F[i];if(!fg.on)continue;const c=K.tp[i],dx=c.x-p.x,dy=c.y-p.y,d=Math.hypot(dx,dy);
   if(d<50&&(dx*fx+dy*fy)/(d||1)>.1){fg.on=0;K.pop++;K.sp=1-.1*K.pop;let k=0;for(const q of m.P)if(q.on&&k<14&&Math.hypot(q.x-c.x,q.y-c.y)<40){q.on=0;k++}
    this.swFood(m,c.x,c.y,1);m.hp=Math.max(1,m.hp-m.mh*.02);this.dtx(c.x,c.y-18,'손끝마디가 터졌다 ('+K.pop+'/5)','#ffe066');
    for(let s=0;s<10;s++){const a=s/10*6.283,b=this.add.circle(c.x,c.y,2,0xffe066).setDepth(12);this.tweens.add({targets:b,x:c.x+Math.cos(a)*28,y:c.y+Math.sin(a)*20,alpha:0,duration:300,onComplete:()=>b.destroy()})}
    if(K.pop>=5){K.st='fall';K.fa=0;K.ex=3.2;K.food=4;this.cameras.main.shake(260,.008);this.dtx(K.H.x,K.H.y-46,'손이 멈췄다 — 여왕이 드러난다!','#ffe066')}
    return 1}}return 0}
 // 블랙홀: 손바닥 없이 무리가 바로 소용돌이치며 빨려 든다
 sw_hole0(m,p,K){const n0=m.paN;m.paN=9;this.sw_palms0(m,p,K);m.paN=n0;if((m.hoN=(m.hoN||0)+1)<=2)this.dtx(400,64,'무리가 소용돌이치며 모인다 — 붉은 원 밖으로!','#ffe066')}
 sw_hole(m,dt,p,K){const t=K.t,FORM=.55,RUN=1.25,MERGE=FORM+RUN;
  if(t<MERGE){const g=m.tg,c=K.c,now=this.time.now/1000,k=t<FORM?0:Math.min(1,(t-FORM)/RUN),e=k*k*(3-2*k),pu=.5+.5*Math.sin(now*14);
   g.fillStyle(0xff3b4f,.08+.14*(t/MERGE)).fillEllipse(c.x,c.y,K.R*2,K.R*1.44);g.lineStyle(2,0xff5a7a,.6+.3*pu).strokeEllipse(c.x,c.y,K.R*2,K.R*1.44);
   let j=0;const n=m.P.length;for(const q of m.P){if(!q.on)continue;j++;const a=j/n*6.283*3+t*(2+5*e),r=(250*(1-e)+10)*(.6+.4*((j*13)%17)/17);q.tx=c.x+Math.cos(a)*r;q.ty=c.y+Math.sin(a)*r*.75}
   K.kf=t<FORM?5:10;m.gone=1;m.x=c.x;m.y=c.y-200;m.hzF=(x,y)=>((x-c.x)/(K.R+18))**2+((y-c.y)/(K.R*.72+14))**2<1;return}
  return this.sw_palms(m,dt,p,K)}
 // ===== v39 엔딩 직전: 빨려 드는 정적 (E1) — 무리가 여왕 한 점으로 빨려 들고, 빛이 꺼진 뒤 그 한 점에서 끝난다 =====
 swImplode(m,x,y,s,P){if(this.impS||this.over)return;const cam=this.cameras.main,g=this.add.graphics().setDepth(8.7),dk=this.add.rectangle(400,180,800,360,0x000000,1).setDepth(8.4).setAlpha(0),pt=this.add.graphics().setDepth(8.8);
  const I=this.impS={g,dk,pt,P},CX=400,CY=168,sc0=s?s.scaleX:1.9;
  for(const q of P){q.r=Math.hypot(q.x-x,(q.y-y)/.8);q.a=Math.atan2((q.y-y)/.8,q.x-x)}
  if(s){s.clearTint();s.setTint(0xffe8a0)}
  const drawPt=(px,py,r,al)=>{pt.clear();pt.fillStyle(0xfff4dc,.07*al).fillCircle(px,py,r*7);pt.fillStyle(0xfff4dc,.18*al).fillCircle(px,py,r*3.2);pt.fillStyle(0xffffff,al).fillCircle(px,py,r)};
  const kill=()=>{if(s&&s.scene)s.destroy();s=null};
  this.cineStart(4.6,(t,dt)=>{dt=dt||.016;const now=this.time.now/1000;
   if(t<2.1){const k=t/2.1,w=1.5+9*k*k,sh=Math.exp(-dt*(.15+9*k*k*k*k));g.clear();
    for(const q of P){if(q.r<=0)continue;q.a+=w*dt*(60/(q.r+40));q.r*=sh;if(q.r<6)q.r=0;q.x=x+Math.cos(q.a)*q.r;q.y=y+Math.sin(q.a)*q.r*.8;g.fillStyle(q.c?0xa46ef2:0x7ae698,Math.min(1,q.r/30+.25)).fillRect(q.x-1,q.y-1,q.r>40?3:2,2)}
    dk.setAlpha(.9*k*k);if(s)s.setScale(sc0*(1-.55*k)).setRotation(t*t*2)}
   else if(t<2.45){g.clear();const k=(t-2.1)/.35;dk.setAlpha(.9+.1*k);if(s)s.setScale(sc0*.45*(1-k)).setAlpha(1-k*.5);drawPt(x,y,1.2+1.2*k,k)}
   else if(t<3.1){kill();g.clear();dk.setAlpha(1);drawPt(x,y,2.4,1)}
   else{kill();g.clear();dk.setAlpha(1);const k=Math.min(1,(t-3.1)/1.3),e=k*k*(3-2*k);drawPt(x+(CX-x)*e,y+(CY-y)*e,2.4+.4*Math.sin(now*2.2),1)}
   if(t>.3&&t<.32)cam.zoomTo(1.1,2200,'Sine.easeInOut');if(t>3.1&&t<3.12)cam.zoomTo(1,1300,'Sine.easeInOut')},
   ()=>{kill();g.clear();dk.setAlpha(1);cam.zoomTo(1,300);this.hudVis(false);this.ending('흩어진 무리가 빨려 든 자리에, 빛 한 점만이 남았다.',2);
    let tt=0;I.ev=this.time.addEvent({delay:16,loop:true,callback:()=>{tt+=.016;if(!pt.scene){I.ev.remove();return}drawPt(CX,CY,2.4+.4*Math.sin(tt*2.2),1)}})})}
