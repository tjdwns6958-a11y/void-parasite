 // ===== v82: 공허 중간 보스 2페이즈 — 「공허 앵무조개」 (관찰자의 눈은 처음부터 앵무조개의 것이었다) =====
 // 체력 50%: 눈이 틈으로 되돌아가고, 틈을 찢고 나선 껍데기가 빠져나온다 — 같은 눈이 껍데기 입구 위에 박혀 있다
 // 패턴: 나선 구체 · 촉수 잡기(이때 촉수를 물어 끊을 수 있음, 3개 다 끊으면 기절) · 껍데기 블랙홀(숨음, 끌어당김) · 눈빛 쓸기
 obsNTex(){for(const k of['N','Nc']){const key='obs'+k;if(this.textures.exists(key))continue;const im=window.__obsIm&&__obsIm[k];if(im&&im.complete&&im.naturalWidth){const t=this.textures.addImage(key,im);t.setFilter(Phaser.Textures.FilterMode.NEAREST)}}}
 obsRev(m){this.obsNTex();m.ph=2;m.st='rev';m.tm=3;m.gone=1;m.gz=0;this.tel=this.tel.filter(q=>q.m!==m);(this.mbb||[]).forEach(q=>q.o.destroy());this.mbb=[];this.emPull=null;
  for(const q of m.ey){q.open=0;q.oe.setVisible(false)}m.ex0=m.x;m.ey0=m.y;m.nx=400;m.ny=138;m.fl=1;
  m.N=this.add.image(m.hx,m.hy,'obsN').setDepth(3.05).setAlpha(0).setScale(.25);
  m.rg.forEach((r,i)=>{const a=r.a;this.tweens.add({targets:r.o,x:r.o.x+Math.cos(a)*140,y:r.o.y+Math.sin(a)*90,alpha:0,duration:900,delay:200})});
  this.cameras.main.shake(2600,.007);this.dtx(400,70,'눈이 틈 속으로 끌려 들어간다…','#c8a8ff')}
 obsNOff(m){const f=m.fl;return{ex:m.x+41.8*f,ey:m.y-20.5,ax:m.x+31*f,ay:m.y+4.7}}
 obsN2(m,dt,p){const now=this.time.now,D=v=>Math.round(v*m.df),en=m.hp<m.mh*.3?.8:1,g=m.g,S=m.spr,N=m.N;
  if(m.st=='rev'){const t=3-m.tm;
   if(t<.9){const k=t/.9;m.x=m.ex0+(m.hx-m.ex0)*k;m.y=m.ey0+(m.hy-m.ey0)*k;S.setPosition(m.x+Math.sin(now/30)*2,m.y).setScale(1-.3*k);m.pu.setPosition(m.x,m.y);m.rf.setScale(1+.25*k)}
   else{const k=Math.min(1,(t-.9)/1.4),e=1-(1-k)**3;m.x=m.hx+(m.nx-m.hx)*e;m.y=m.hy+(m.ny-m.hy)*e;N.setPosition(m.x,m.y).setAlpha(Math.min(1,k*1.6)).setScale(.25+.75*e);const o=this.obsNOff(m);
    S.setPosition(m.hx+(o.ex-m.hx)*e,m.hy+(o.ey-m.hy)*e).setScale(.7-.08*e);m.pu.setPosition(S.x,S.y).setScale(.7-.08*e);m.rf.setScale(1.25-.15*k).setAlpha(1-.5*k)
    if(t>2.25&&!m.rvT){m.rvT=1;this.dtx(400,64,'눈은 처음부터 껍데기 속 「공허 앵무조개」의 것이었다','#ffe066');m.nm='공허 앵무조개';if(m.nmT)m.nmT.setText(m.nm)}}
   if(m.tm<=0){m.st='idle';m.cd=1;m.gone=0;m.br=58}return}
  // 떠다니기: 플레이어 쪽으로 천천히, 입구가 플레이어를 보게
  const busy=m.st=='hide'||m.st=='hideW'||m.st=='grab'||m.st=='grabW'||m.st=='stun';
  if(!busy){m.x+=Phaser.Math.Clamp(p.x-m.x,-1,1)*Math.min(Math.abs(p.x-m.x),34*dt);m.y+=((p.y<200?118:150)-m.y)*Math.min(1,dt*.6)}
  m.x=Phaser.Math.Clamp(m.x,170,630);if(!busy&&Math.abs(p.x-m.x)>40)m.fl=p.x>=m.x?1:-1;
  const o=this.obsNOff(m),hid=m.st=='hide';N.setTexture(hid?'obsNc':'obsN').setFlipX(m.fl<0).setPosition(m.x,m.y+Math.sin(now/600)*2).setScale(1).setAlpha(1);
  S.setVisible(!hid).setPosition(o.ex,o.ey).setScale(.62);const ta=Math.atan2(p.y-o.ey,p.x-o.ex);m.pu.setVisible(!hid).setPosition(o.ex+Math.cos(ta)*7,o.ey+Math.sin(ta)*4).setScale(.62,.5);
  m.rf.setPosition(m.hx,m.hy).setAlpha(.5);m.gone=(hid||m.st=='hideW')?1:0;
  // 촉수 그리기 / 잘린 촉수
  if(m.tn)for(const q of m.tn){if(!q.on)continue;const k=q.k=Math.min(1,(q.k||0)+dt*7);const tx=o.ax+(q.tx-o.ax)*k,ty=o.ay+(q.ty-o.ay)*k;q.x=tx;q.y=ty;
   const nx=-(ty-o.ay),ny=tx-o.ax,nl=Math.hypot(nx,ny)||1;g.lineStyle(9,0x0a0612,1);g.beginPath();g.moveTo(o.ax,o.ay);for(let i=1;i<=10;i++){const s=i/10,w=Math.sin(s*Math.PI)*8*Math.sin(now/180+q.i);g.lineTo(o.ax+(tx-o.ax)*s+nx/nl*w,o.ay+(ty-o.ay)*s+ny/nl*w)}g.strokePath();
   g.lineStyle(5,q.hp<2?0x9a70d0:0x5a3a8a,1);g.beginPath();g.moveTo(o.ax,o.ay);for(let i=1;i<=10;i++){const s=i/10,w=Math.sin(s*Math.PI)*8*Math.sin(now/180+q.i);g.lineTo(o.ax+(tx-o.ax)*s+nx/nl*w,o.ay+(ty-o.ay)*s+ny/nl*w)}g.strokePath();
   for(let i=2;i<10;i+=2){const s=i/10;g.fillStyle(0xd8b8ff,.9).fillCircle(o.ax+(tx-o.ax)*s,o.ay+(ty-o.ay)*s,1.6)}g.fillStyle(0xe0457b,1).fillCircle(tx,ty,3.5)}
  if(m.root>0){m.root-=dt;p.body.reset(m.rx,m.ry);g.lineStyle(2,0xc8a8ff,.8).strokeCircle(p.x,p.y,12)}
  switch(m.st){
  case 'idle':if(m.cd<=0){const r=Math.random(),d=Math.hypot(p.x-o.ax,p.y-o.ay);
    if(!(m.hdc>now)&&r<.22){m.st='hideW';m.tm=.7;m.hdc=now+9500;this.dtx(m.x,m.y-70,'껍데기에 숨는다 — 입구에서 멀리!','#c8a8ff')}
    else if(d<300&&r<.55){m.st='grabW';m.tm=.7*en;m.tn=[];for(let i=0;i<3;i++){const a=Math.atan2(p.y-o.ay,p.x-o.ax)+(i-1)*.42,L=Math.min(330,d+40+i*10);const tx=Phaser.Math.Clamp(o.ax+Math.cos(a)*L,50,750),ty=Phaser.Math.Clamp(o.ay+Math.sin(a)*L,60,310);m.tn.push({i,tx,ty,hp:2,on:0,k:0});this.telAdd({k:'l',x:o.ax,y:o.ay,x2:tx,y2:ty,w:26,t:m.tm,src:'',fx:0,m})}}
    else if(r<.8){m.st='spiral';m.tm=2.8;m.sa=Math.random()*6.283;m.st2=0}
    else{m.st='sweepW';m.tm=.9;m.ga=Math.atan2(p.y-o.ey,p.x-o.ex)-.9*(Math.random()<.5?1:-1);m.sd=Phaser.Math.Angle.Wrap(ta-m.ga)>0?1:-1}}break;
  case 'spiral':m.st2-=dt;if(m.st2<=0){m.st2=.11;m.sa+=.38*(m.fl);for(const k of[0,2.094,4.189]){const q=this.mbShot(o.ax,o.ay,m.sa+k,175,D(14),'나선 구체',m,'emo');q.o.setTint(0x6a3ab0)}}if(m.tm<=0){m.st='idle';m.cd=.8*en}break;
  case 'grabW':if(m.tm<=0){m.st='grab';m.tm=2;m.tn.forEach(q=>{q.on=1;q.k=0});this.cameras.main.shake(120,.005);
    for(const q of m.tn){const ux=q.tx-o.ax,uy=q.ty-o.ay,L=Math.hypot(ux,uy)||1,t=((p.x-o.ax)*ux+(p.y-o.ay)*uy)/(L*L),n=Math.abs((p.x-o.ax)*uy-(p.y-o.ay)*ux)/L;if(t>0&&t<1.05&&n<19&&!(m.root>0)){this.hurt(D(22),'공허 촉수',m);if(!m.on)return;m.root=1;m.rx=p.x;m.ry=p.y;this.dtx(p.x,p.y-24,'붙잡혔다!','#c8a8ff')}}
    this.dtx(m.x,m.y-72,'촉수를 물어 끊을 것!','#ffe066')}break;
  case 'grab':if(en<1){m.st2=(m.st2||0)-dt;if(m.st2<=0){m.st2=.35;m.sa=(m.sa||0)+.5;const q=this.mbShot(o.ax,o.ay,m.sa,150,D(12),'나선 구체',m,'emo');q.o.setTint(0x6a3ab0)}}if(m.tm<=0||!m.tn.some(q=>q.on)){if(!m.tn.some(q=>q.on)&&m.tm>0){m.st='stun';m.tm=1.6;this.dtx(m.x,m.y-70,'촉수가 모두 끊겼다 — 기절!','#ffe066');this.cameras.main.shake(250,.01)}else{m.st='idle';m.cd=.9*en}m.tn=null}break;
  case 'stun':for(let i=0;i<4;i++){const a=now/260+i*1.571;g.fillStyle(0xffe066,.9).fillCircle(m.x+Math.cos(a)*40,m.y-66+Math.sin(a)*8,2.6)}if(m.tm<=0){m.st='idle';m.cd=.6}break;
  case 'hideW':if(m.tm<=0){m.st='hide';m.tm=3;this.emPull={x:o.ax,y:o.ay,v:30};this.obsNRing(m,o,D,0)}break;
  case 'hide':{const k=1-m.tm/3;if(this.emPull){this.emPull.x=o.ax;this.emPull.y=o.ay;this.emPull.v=40+55*k}
    for(let i=0;i<3;i++){const R=18+i*14+Math.sin(now/120+i)*3;g.lineStyle(2,0x9a60ff,.6-.15*i).strokeEllipse(o.ax,o.ay,R*2,R*1.4)}
    for(let i=0;i<2;i++){const a=Math.random()*6.283,r=90+Math.random()*120,b=this.add.circle(o.ax+Math.cos(a)*r,o.ay+Math.sin(a)*r*.6,1.6,0xc8b8ff,.8).setDepth(12);this.tweens.add({targets:b,x:o.ax,y:o.ay,alpha:0,duration:500,onComplete:()=>b.destroy()})}
    if(Math.hypot(p.x-o.ax,p.y-o.ay)<48&&!(m.bhT>now)){m.bhT=now+700;this.hurt(D(20),'껍데기 속 공허',m);if(!m.on)return}
    if(m.tm<=0){this.emPull=null;m.st='idle';m.cd=.9*en;this.obsNRing(m,o,D,.15)}}break;
  case 'sweepW':{const L=this.obsNBeam(m,o,m.ga);g.lineStyle(1.5,0xff5a5a,.5+.4*Math.sin(now/50)).lineBetween(o.ex,o.ey,o.ex+Math.cos(m.ga)*L,o.ey+Math.sin(m.ga)*L);if(m.tm<=0){m.st='sweep';m.tm=2.2;m.bt=0}}break;
  case 'sweep':{m.ga+=m.sd*.75*dt;const L=this.obsNBeam(m,o,m.ga),bx=o.ex+Math.cos(m.ga)*L,by=o.ey+Math.sin(m.ga)*L;g.lineStyle(16,0xff8a40,.35).lineBetween(o.ex,o.ey,bx,by).lineStyle(5,0xfff0d0,.95).lineBetween(o.ex,o.ey,bx,by);g.fillStyle(0xffd0a0,.6).fillCircle(bx,by,7);
   m.bt-=dt;const px=p.x-o.ex,py=p.y-o.ey,t=px*Math.cos(m.ga)+py*Math.sin(m.ga),n=Math.abs(-px*Math.sin(m.ga)+py*Math.cos(m.ga));if(t>0&&t<L&&n<13&&m.bt<=0){m.bt=.3;this.inv=0;this.hurt(D(12),'앵무조개의 눈빛',m);if(!m.on)return}
   if(m.tm<=0){m.st='idle';m.cd=1.1*en}}break}}
 obsNRing(m,o,D,a0){for(let i=0;i<12;i++){const q=this.mbShot(o.ax,o.ay,a0+i/12*6.283,165,D(14),'나선 구체',m,'emo');q.o.setTint(0x6a3ab0)}}
 obsNBeam(m,o,a){let L=20;for(;L<720;L+=8){const x=o.ex+Math.cos(a)*L,y=o.ey+Math.sin(a)*L;if(x<24||x>776||y<24||y>336)break;if(m.pt.some(q=>Math.hypot(q.x-x,q.y-y)<20))break}return L}
 obsNBite(m,fx,fy){if(!m.tn||m.st!='grab')return 0;const p=this.pl,o=this.obsNOff(m),R=C.BITE.range+10;let hit=0;
  for(const q of m.tn){if(!q.on)continue;for(let s=.3;s<=1.001;s+=.1){const x=o.ax+(q.x-o.ax)*s,y=o.ay+(q.y-o.ay)*s,dx=x-p.x,dy=y-p.y,d=Math.hypot(dx,dy);if(d<R&&(dx*fx+dy*fy)/(d||1)>.1){q.hp--;hit=1;if(q.hp<=0){q.on=0;this.dtx(x,y-14,'촉수를 끊었다','#ffe066');for(let i=0;i<8;i++){const a=Math.random()*6.283,b=this.add.circle(x,y,2,0x9a70d0).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*24,y:y+Math.sin(a)*16,alpha:0,duration:400,onComplete:()=>b.destroy()})}}break}}}
  return hit}
