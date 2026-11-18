 // ===== 2구역 =====
 nextZone(){this.lv.rooms.forEach(m=>{m.food.forEach(f=>{if(f.spr){f.spr.destroy();f.spr=null}});m.en.forEach(e=>{for(const k of['spr','lvT','ring','mk','lsh'])if(e[k]){e[k].destroy();e[k]=null}if(e.aim){e.aim.forEach(r=>r.destroy());e.aim=null}})});
  (this.prj||[]).forEach(q=>q.o.destroy());this.prj=[];
  this.zi++;this.lv=gen(this.zi);this.zt0=this.time.now;this.exR=0;this.exT=0;this.seenP={};if(this.exTx)this.exTx.setVisible(false);
  const p=this.pl;p.setPosition(400,180);p.setVelocity(0,0);this.vx=this.vy=this.jx=this.jy=0;this.sp.forEach((q,i)=>{q.x=400-7*(i+1);q.y=184});this.en=Math.min(this.emax,this.en+30);this.inv=1.5;
  this.enter(this.lv.start);
  const ov=this.add.rectangle(400,180,800,360,0x05030a,1).setDepth(150);this.tweens.add({targets:ov,alpha:0,duration:1000,onComplete:()=>ov.destroy()});
  const t1=this.add.text(400,138,this.zi+'구역 — 심연 산호초',ST({fontSize:'24px',fontStyle:'bold',color:'#e8d0ff'})).setOrigin(.5).setDepth(151),t2=this.add.text(400,174,'공허 산호 숲과 심연의 감시탑 · 몬스터가 한층 강하다 · 에너지 +30',ST({fontSize:'13px',color:'#b8aed2'})).setOrigin(.5).setDepth(151);
  this.tweens.add({targets:[t1,t2],alpha:0,delay:2800,duration:700,onComplete:()=>{t1.destroy();t2.destroy()}})}
 mkSpr(e){this.lvl(e);e.lvT=this.add.text(e.x,e.y,'Lv.'+e.lv,ST({fontSize:'10px',fontStyle:'bold'})).setOrigin(1,.5).setDepth(60);e.lvc=null;
  if(e.k=='rek'){if(e.st!='up')e.st='under';e.tm=0;e.trk=0;e.spr=this.add.image(e.x,e.y,e.st=='up'?'rek':'mound').setDepth(e.st=='up'?9:1.6)}
  else if(e.k=='gna'){e.st='idle';e.spr=this.add.image(e.x,e.y,'gna').setDepth(6)}
  else if(e.k=='vdl'){e.st='orbit';e.oa=null;e.spr=this.add.image(e.x,e.y,'vdl').setDepth(12)}
  else if(e.k=='spn'){e.st=e.home&&e.home.on?'hide':'out';e.wu=0;e.bn=0;e.cd=Math.max(e.cd||0,.8);e.spr=this.add.image(e.x,e.y,'spn').setDepth(8.7)}
  else if(e.k=='lsp'){e.wu=0;e.cd=Math.max(e.cd||0,1);e.spr=this.add.image(e.x,e.y,'lsp').setDepth(41).setScale(1.3)}
  else if(e.k=='qn'){e.st=e.st=='idle'?'idle':'fight';e.spr=this.add.image(e.x,e.y,'qn').setDepth(9)}
  else if(e.k=='wd'){e.st=e.st=='idle'?'idle':'track';e.fa=e.fa||0;e.spr=this.add.image(e.x,e.y,'wd').setDepth(9).setRotation(e.fa)}
  else{e.st='idle';e.t=0;e.spr=this.add.image(e.x,e.y,'kha').setDepth(9)}}
 ess(n,x,y){this.ve+=n;if(this.lin.v>=1)this.en=Math.min(this.emax,this.en+8*n);if(x!=null)this.dtx(x,y,'정수 +'+n,'#c98bff')}
 // 산호: 물어서 부수고(3번), 부서지면 25초 뒤 다시 자람 · 처음 부술 때만 가끔 공허 정수
 corMk(o,grow){const T=C.T,x=(o.c+.5)*T,y=(o.r+.5)*T;o.b=this.walls.create(x,y,'blk').setVisible(false);const im=o.im=this.add.image(x,(o.r+1)*T+3,'cor').setOrigin(.5,1).setDepth(8.5+o.r*.01).setFlipX((o.c+o.r)%2==1);this.dec.push(im);
  if(o.tmp)im.setTint(0xff90c8);else if(o.hp<3)im.setTint(o.hp==2?0xd8b0f0:0xa880c8);
  if(grow){im.setScale(.15);this.tweens.add({targets:im,scale:1,duration:380,ease:'Back.out'})}
  this.tweens.add({targets:im,angle:{from:-2.5,to:2.5},duration:1300+((o.c*7+o.r*13)%700),yoyo:true,repeat:-1,ease:'Sine.inOut'})}
 corHit(o,n){if(!o.on)return;o.hp-=n;const x=(o.c+.5)*C.T,y=(o.r+.5)*C.T;
  if(o.im){o.im.setTint(o.tmp?0xff80c0:o.hp>=2?0xd8b0f0:0xa880c8);this.tweens.add({targets:o.im,scaleX:1.12,scaleY:.9,duration:60,yoyo:true})}
  for(let i=0;i<5;i++){const an=Math.random()*6.283,b=this.add.rectangle(x,y-6,3,3,i%2?0xe0a0ff:0x7a38b0).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(an)*20,y:y-6+Math.sin(an)*20,alpha:0,duration:280,onComplete:()=>b.destroy()})}
  if(o.hp<=0)this.corBrk(o)}
 corBrk(o,q){o.on=0;o.hp=0;o.t=this.time.now;const x=(o.c+.5)*C.T,y=(o.r+.5)*C.T;
  if(o.b){this.walls.remove(o.b,true,true);o.b=null}
  if(o.im){const im=o.im;o.im=null;this.tweens.killTweensOf(im);this.tweens.add({targets:im,scaleY:.05,alpha:0,duration:q?500:220,onComplete:()=>im.destroy()})}
  if(!o.tmp)this.dec.push(this.add.image(x,y+10,'corS').setDepth(.75));
  if(!q){for(let i=0;i<9;i++){const an=Math.random()*6.283,b=this.add.rectangle(x,y,3,3,[0xe0a0ff,0x9a48d0,0xfff0ff][i%3]).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(an)*30,y:y+Math.sin(an)*30,alpha:0,duration:380,onComplete:()=>b.destroy()})}
   if(o.ess){o.ess=0;if(Math.random()<.45)this.ess(1,x,y-24)}}
  for(const m of this.cur.en)if(m.on&&m.k=='spn'&&m.home===o){m.home=null;m.st='stun';m.tm=2;m.wu=0;m.bn=0;if(m.aim){m.aim.forEach(r=>r.destroy());m.aim=null}if(m.spr)m.spr.setScale(1);this.dtx(m.x,m.y-20,'끌려 나왔다!','#ffd0a0')}}
 corU(){const a=this.cur,now=this.time.now,p=this.pl;let rm=0;
  for(const o of a.cor){if(o.on){if(o.tmp&&now>o.tmp){this.corBrk(o,1);rm=1}continue}if(o.tmp){rm=1;continue}
   if(now-o.t>25000){const x=(o.c+.5)*C.T,y=(o.r+.5)*C.T;if(Math.abs(p.x-x)<46&&Math.abs(p.y-y)<46)continue;if(a.en.some(m=>m.on&&m.k!='spn'&&m.k!='lsp'&&Math.hypot(m.x-x,m.y-y)<34))continue;if(a.food.some(f=>f.on&&f.x!=null&&Math.hypot(f.x-x,f.y-y)<26))continue;
    o.on=1;o.hp=3;this.corMk(o,true);for(const m of a.en)if(m.on&&m.k=='spn'&&!m.home&&m.st=='out'&&Math.hypot(m.x-x,m.y-y)<30){m.home=o;m.st='hide';m.x=x;m.y=y}}}
  if(rm)a.cor=a.cor.filter(o=>o.on||!o.tmp)}
 // 받는 피해 배율: 숨은 산호충 ×0.5 · 감시자 등(약점) ×1.6 / 앞껍질 ×0.5
 dmul(m,bt){if(m.k=='spn'&&m.st=='hide')return .5;
  if(m.k=='wd'){const p=this.pl,df=Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(p.y-m.y,p.x-m.x)-m.fa)),now=this.time.now;
   if(df>1.9){if(!(m.wkT>now)){m.wkT=now+600;this.dtx(m.x,m.y-34,'약점!','#ffb070')}return 1.6}
   if(df<1.1&&bt){if(!(m.wkT>now)){m.wkT=now+900;this.dtx(m.x,m.y-34,'단단한 앞껍질','#a0a0b8')}return .5}}return 1}
 eshot(x,y,a,o){const im=this.add.image(x,y,o.tx).setDepth(o.dp||11).setRotation(a);this.eprj.push(Object.assign({o:im,x,y,a,t:1.7},o))}
 eprjU(dt,p){if(!this.eprj.length)return;for(const q of this.eprj){q.t-=dt;q.x+=Math.cos(q.a)*q.v*dt;q.y+=Math.sin(q.a)*q.v*dt;q.o.setPosition(q.x,q.y);
   if(Math.random()<.45){const b=this.add.circle(q.x,q.y,1.3,q.c,.7).setDepth(q.dp||10.5);this.tweens.add({targets:b,alpha:0,scale:.3,duration:220,onComplete:()=>b.destroy()})}
   if(Math.hypot(q.x-p.x,q.y-p.y)<13){this.hurt(q.dmg,q.src,q.m);q.t=0}
   else if(this.blk(q.x,q.y,17)||q.x<28||q.x>772||q.y<28||q.y>332)q.t=0;
   if(q.t<=0){const r=this.add.circle(q.x,q.y,8,q.c,.5).setDepth(q.dp||11);this.tweens.add({targets:r,scale:1.8,alpha:0,duration:200,onComplete:()=>r.destroy()});q.o.destroy()}}
  this.eprj=this.eprj.filter(q=>q.t>0)}
 // 가시 산호충: 산호 속(받는 피해 ×0.5)에서 노란 조준선 0.55초 → 가시 3연발 · 산호가 부서지면 2초 기절 후 노출
 spnAI(m,dt,p){const S=C.SP,s=m.spr,now=this.time.now;m.cd-=dt;m.tm=(m.tm||0)-dt;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,hid=m.st=='hide';
  if(m.st=='stun'){s.setPosition(m.x+Math.sin(now/35)*2,m.y).setRotation(Math.sin(now/80)*.4);if(m.tm<=0){m.st='out';m.cd=Math.max(m.cd,.8)}return}
  if(m.wu>0){m.wu-=dt;const k=Math.min(1,1-m.wu/.55);if(m.aim)m.aim.forEach(r=>r.setAlpha(.15+.55*k));s.setScale(1+.2*k);
   if(m.wu<=0){if(m.aim){m.aim.forEach(r=>r.destroy());m.aim=null}s.setScale(1);m.bn=3;m.bt=0}}
  else if(m.bn>0){m.bt-=dt;if(m.bt<=0){m.bn--;m.bt=.17;m.fa+=Phaser.Math.Clamp(Phaser.Math.Angle.Wrap(Math.atan2(dy,dx)-m.fa),-.1,.1);const o=hid?30:12;this.eshot(m.x+Math.cos(m.fa)*o,m.y+Math.sin(m.fa)*o,m.fa,{tx:'ndl',v:S.v,dmg:Math.round(S.dmg*(m.df||1)),src:'가시 산호충의 가시',m,c:0xe0a0ff});if(m.bn<=0)m.cd=S.cd+(hid?0:.5)+Math.random()*.4}}
  else{if(!hid&&d<150)this.mv(m,-dx/d*34*dt,-dy/d*34*dt,16);
   if(m.cd<=0&&d<280&&this.spnLos(m,p,hid)){m.wu=.55;m.fa=Math.atan2(dy,dx);const o=hid?30:12;m.aim=[this.add.rectangle(m.x+Math.cos(m.fa)*o,m.y+Math.sin(m.fa)*o,240,2,0xffe066,.2).setOrigin(0,.5).setRotation(m.fa).setDepth(1.4),this.add.circle(m.x,m.y+(hid?-3:1),6,0xffe066,.2).setDepth(8.8)]}}
  s.setPosition(m.x,m.y+(hid?-3:0)+Math.sin(now/300+m.x)*1);if(!m.wu&&!m.bn)s.setRotation(Math.sin(now/500+m.y)*.15)}
 spnLos(m,p,hid){const a=Math.atan2(p.y-m.y,p.x-m.x),o=hid?34:0;return this.los(m.x+Math.cos(a)*o,m.y+Math.sin(a)*o,p.x,p.y)}
 // 빛 포자: 플레이어가 빛줄기에 닿아 있을 때만 0.4초 예고 후 빛 화살
 lspAI(m,dt,p){const S=C.LS,s=m.spr,now=this.time.now;m.cd-=dt;m.tm=(m.tm||0)-dt;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1;
  if(m.wu>0){m.wu-=dt;const k=Math.min(1,1-m.wu/.4);s.setScale(1.3+.7*k);if(m.aim)m.aim.forEach(r=>r.setAlpha(.15+.5*k));
   if(m.wu<=0){if(m.aim){m.aim.forEach(r=>r.destroy());m.aim=null}s.setScale(1.3);this.eshot(m.x,m.y,m.fa,{tx:'lar',v:S.v,dmg:Math.round(S.dmg*(m.df||1)),src:'빛 포자의 빛 화살',m,c:0xffe066,dp:41});m.cd=S.cd+Math.random()*.5}}
  else{if(m.tm<=0||m.wx==null){m.tm=2+Math.random()*2.5;m.wx=80+Math.random()*640;m.wy=70+Math.random()*220}
   let tx=m.wx-m.x,ty=m.wy-m.y;const L=this.lit&&d<340;if(L){const k=d<140?-1:d>220?1:0;tx=dx*k-dy*.7;ty=dy*k+dx*.7}const tl=Math.hypot(tx,ty)||1,v=L?50:26;m.x=Phaser.Math.Clamp(m.x+tx/tl*v*dt,50,750);m.y=Phaser.Math.Clamp(m.y+ty/tl*v*dt,50,310);
   if(L&&m.cd<=0&&this.los(m.x,m.y,p.x,p.y)){m.wu=.4;m.fa=Math.atan2(dy,dx);m.aim=[this.add.rectangle(m.x,m.y,Math.min(d,300),1.5,0xffe066,.2).setOrigin(0,.5).setRotation(m.fa).setDepth(40.5)]}
   s.setScale(1.3+Math.sin(now/200+m.x)*.12)}
  s.setPosition(m.x,m.y+Math.sin(now/350+m.y)*3)}
 // 산호 여왕 (정예): 거리를 두고 맴돌다 7.5초마다 분홍 원 1초 예고 → 산호 감옥 + 감옥 벽에 가시 산호충 소환 · 붙으면 물기
 qnAI(m,dt,p){const Q=C.QN,s=m.spr,now=this.time.now;m.cd-=dt;m.tm=(m.tm||0)-dt;m.bc2=(m.bc2||0)-dt;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1;
  if(m.st=='idle'){if(d<330){m.st='fight';this.exc(m);m.cd=Math.min(m.cd,2)}}
  else if(m.st=='fight'){const w=d<125?-1:d>200?1:0;if(Math.random()<dt*.4)m.side=-(m.side||1);const an=Math.atan2(dy,dx)+(w<0?.6:.35)*(m.side||1);if(w)this.mv(m,Math.cos(an)*w*44*dt,Math.sin(an)*w*44*dt,26);
   if(d<46&&m.bc2<=0){m.st='bite';m.tm=.45;s.setTint(0xff6a8a);const ca=m.ba=Math.atan2(dy,dx),wg=this.add.graphics().setDepth(1.6);wg.fillStyle(0xff5a7a,.45).slice(m.x,m.y,60,ca-.8,ca+.8,false).fillPath();wg.lineStyle(2,0xff8aa0,.9).beginPath().arc(m.x,m.y,60,ca-.8,ca+.8,false).strokePath();this.tweens.add({targets:wg,alpha:{from:.35,to:1},duration:450,onComplete:()=>wg.destroy()})}
   else if(m.cd<=0&&d<360){m.st='cast';m.tm=1;m.cx=p.x;m.cy=p.y;m.ring=this.add.ellipse(p.x,p.y,150,136).setStrokeStyle(3,0xff8ad8,.9).setDepth(1.5);this.tweens.add({targets:m.ring,scale:{from:1.35,to:1},alpha:{from:.3,to:1},duration:900})}}
  else if(m.st=='bite'){if(m.tm<=0){s.clearTint();m.st='fight';m.bc2=1.5;const r=this.add.circle(m.x+Math.cos(m.ba)*26,m.y+Math.sin(m.ba)*26,16,0xffd0e8,.5).setDepth(12);this.tweens.add({targets:r,alpha:0,scale:1.5,duration:180,onComplete:()=>r.destroy()});if(d<60&&Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(dy,dx)-m.ba))<.95)this.hurt(Math.round(Q.dmg*(m.df||1)),'산호 여왕의 물기',m)}}
  else if(m.st=='cast'){if(m.tm<=0){if(m.ring){m.ring.destroy();m.ring=null}this.cage(m,m.cx,m.cy);m.st='fight';m.cd=7.5}}
  s.setPosition(m.x,m.y+Math.sin(now/400)*2).setScale(m.st=='cast'?1+Math.sin(now/50)*.04:1)}
 cage(m,cx,cy){const a=this.cur,T=C.T,p=this.pl,made=[];a.cor=a.cor||[];
  for(let r=1;r<=7;r++)for(let c=1;c<=18;c++){const x=(c+.5)*T,y=(r+.5)*T,q=Math.hypot(x-cx,(y-cy)*1.1);if(q<50||q>98)continue;
   if(a.obs.some(o=>o[0]==c&&o[1]==r)||a.cor.some(o=>o.c==c&&o.r==r))continue;
   if(Math.abs(p.x-x)<36&&Math.abs(p.y-y)<36)continue;if(a.en.some(e=>e.on&&e.k!='spn'&&e.k!='lsp'&&Math.hypot(e.x-x,e.y-y)<34))continue;
   if(a.food.some(f=>f.on&&f.x!=null&&Math.hypot(f.x-x,f.y-y)<24))continue;if(Object.values(a.hp||{}).some(h=>h[0]==c&&h[1]==r))continue;
   const o={c,r,hp:2,on:1,tmp:this.time.now+9000};a.cor.push(o);this.corMk(o,true);made.push(o)}
  if(made.length){const sh=this.add.circle(cx,cy,90,0xff8ad8,.25).setDepth(1.5);this.tweens.add({targets:sh,alpha:0,scale:1.2,duration:400,onComplete:()=>sh.destroy()});this.cameras.main.shake(120,.003)}
  if(made.length&&a.en.filter(e=>e.on&&e.k=='spn').length<3){const o=pick(made),e={k:'spn',x:(o.c+.5)*T,y:(o.r+.5)*T,home:o,on:1,cd:1.4,st:'hide',fa:0,t:0,hit:0,lv:Math.max(1,(m.lv||1)-2)};a.en.push(e);this.mkSpr(e)}}
 // 감시자 (정예): 빛줄기로 플레이어를 쫓고(선회 느림), 1.2초 비추면 0.85초 붉은 충전 → 광선 · 등 뒤에 붙어 있으면 꼬리치기
 wdAI(m,dt,p){const s=m.spr,now=this.time.now;m.cd-=dt;m.tm=(m.tm||0)-dt;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,ta=Math.atan2(dy,dx),tr=m.hp<m.mh*.5?1.2:.8,
   turn=(g,r)=>{m.fa+=Phaser.Math.Clamp(Phaser.Math.Angle.Wrap(g-m.fa),-r*dt,r*dt)},back=Math.abs(Phaser.Math.Angle.Wrap(ta-m.fa))>1.9;
  if(m.st=='idle'){m.fa+=dt*.45*(m.sd||1);if(this.lit||d<160){m.st='track';this.exc(m)}}
  else if(m.st=='track'){turn(ta,tr);if(d>120)this.mv(m,Math.cos(m.fa)*28*dt,Math.sin(m.fa)*28*dt,28);
   m.lk=m.wlit?(m.lk||0)+dt:Math.max(0,(m.lk||0)-dt*.6);m.bk=back&&d<80?(m.bk||0)+dt:0;
   if(m.bk>.9&&m.cd<=0){m.st='tail';m.tm=.5;m.bk=0;s.setTint(0xff8a8a);const ba=m.fa+Math.PI;m.ring=this.add.graphics().setDepth(1.6);m.ring.fillStyle(0xff5a5a,.45).slice(m.x,m.y,84,ba-1.3,ba+1.3,false).fillPath();m.ring.lineStyle(2,0xff8a8a,.9).beginPath().arc(m.x,m.y,84,ba-1.3,ba+1.3,false).strokePath();this.tweens.add({targets:m.ring,alpha:{from:.35,to:1},duration:500})}
   else if(m.lk>=1.2&&m.cd<=0){m.st='charge';m.tm=.85;m.lk=0}
   else if(d>460&&!this.lit)m.st='idle'}
  else if(m.st=='charge'){turn(ta,.3);s.setTint(Math.floor(now/80)%2?0xff8a8a:0xffffff);if(m.tm<=0){s.clearTint();m.st='fire';m.tm=.3;this.laser(m)}}
  else if(m.st=='fire'){if(m.tm<=0){m.st='cool';m.tm=1.8}}
  else if(m.st=='cool'){if(m.tm<=0){m.st='track';m.cd=.6}}
  else if(m.st=='tail'){if(m.tm<=0){s.clearTint();if(m.ring){m.ring.destroy();m.ring=null}const ba=m.fa+Math.PI;
    for(let i=0;i<7;i++){const an=ba-1.2+i*.4,b=this.add.rectangle(m.x+Math.cos(an)*40,m.y+Math.sin(an)*40,8,3,0xffc0c0).setRotation(an).setDepth(12);this.tweens.add({targets:b,x:m.x+Math.cos(an)*84,y:m.y+Math.sin(an)*84,alpha:0,duration:220,onComplete:()=>b.destroy()})}
    if(d<88&&Math.abs(Phaser.Math.Angle.Wrap(ta-ba))<1.35){this.hurt(Math.round(10*(m.df||1)),'감시자의 꼬리',m);this.pl.setVelocity(dx/d*420,dy/d*420)}m.st='track';m.cd=1.4}}
  s.setPosition(m.x,m.y).setRotation(m.fa)}
 laser(m){const a=m.fa,ox=m.x+Math.cos(a)*32,oy=m.y+Math.sin(a)*32;let L=8;for(;L<460;L+=8){const x=ox+Math.cos(a)*L,y=oy+Math.sin(a)*L;if(this.blk(x,y,14)||x<30||x>770||y<30||y>330)break}
  const ex=ox+Math.cos(a)*L,ey=oy+Math.sin(a)*L,g=this.add.graphics().setDepth(41);g.lineStyle(16,0xff5a5a,.5).lineBetween(ox,oy,ex,ey).lineStyle(5,0xfff0f0,1).lineBetween(ox,oy,ex,ey);this.tweens.add({targets:g,alpha:0,duration:350,onComplete:()=>g.destroy()});this.cameras.main.shake(140,.006);
  const p=this.pl,px=p.x-ox,py=p.y-oy,t=px*Math.cos(a)+py*Math.sin(a),n=Math.abs(-px*Math.sin(a)+py*Math.cos(a));if(t>-6&&t<L+10&&n<18){this.inv=0;this.hurt(Math.round(C.WD.dmg*(m.df||1)),'감시자의 광선',m)}}
 // 빛줄기: 등불 기둥(회전) + 감시자의 미끼 등불 · 기둥·바위가 그림자를 만든다
 beams(){const a=this.cur,B=[];for(const w of a.tw||[])B.push({x:w.x,y:w.y,a:w.a,hw:w.hw,len:w.len,c:0xfff0b0,o:28});
  for(const m of a.en)if(m.on&&m.k=='wd'&&m.spr&&(m.wlit=0,m.st!='cool'&&m.st!='fire'))B.push({x:m.x+Math.cos(m.fa)*32,y:m.y+Math.sin(m.fa)*32,a:m.fa,hw:m.st=='charge'?.09:.24,len:460,c:m.st=='charge'?0xff4a4a:0xfff0b0,o:4,m});return B}
 beamU(dt){const a=this.cur,p=this.pl,D=this.bmD,G=this.bmG,now=this.time.now;for(const w of a.tw||[])w.a+=w.spd*dt;
  D.clear().fillStyle(0x05030c,.52).fillRect(0,0,800,360);G.clear();let lit=0;
  for(const b of this.beams()){const n=20,pts=[{x:b.x,y:b.y}],rl=[];
   for(let i=0;i<=n;i++){const an=b.a-b.hw+2*b.hw*i/n,cs=Math.cos(an),sn=Math.sin(an);let r=b.o;for(;r<b.len;r+=10){const x=b.x+cs*r,y=b.y+sn*r;if(x<40||x>760||y<40||y>320||this.blk(x,y,15))break}rl.push(r);pts.push({x:b.x+cs*r,y:b.y+sn*r})}
   G.fillStyle(b.c,.15).fillPoints(pts,true);
   const p2=[{x:b.x,y:b.y}];for(let i=0;i<=n;i++){const an=b.a-b.hw+2*b.hw*i/n,r=Math.min(rl[i],b.len*.5);p2.push({x:b.x+Math.cos(an)*r,y:b.y+Math.sin(an)*r})}G.fillStyle(b.c,.1).fillPoints(p2,true);
   G.fillStyle(b.c,.35).fillCircle(b.x,b.y,9).fillStyle(0xffffff,.5).fillCircle(b.x,b.y,4);
   const pa=Phaser.Math.Angle.Wrap(Math.atan2(p.y-b.y,p.x-b.x)-b.a),pd=Math.hypot(p.x-b.x,p.y-b.y);let h=0;if(Math.abs(pa)<b.hw&&pd>b.o-8&&this.zone(p.x,p.y+4)!=2){const i=Math.round((pa+b.hw)/(2*b.hw)*n);h=pd<rl[i]+8?1:0}
   if(h)lit=1;if(b.m)b.m.wlit=h}
  for(const m of a.en)if(m.on&&m.k=='lsp'&&m.spr)G.fillStyle(0xffe066,.16).fillCircle(m.spr.x,m.spr.y,16);
  if(lit&&!this.lit){for(const m of a.en)if(m.on&&!m.k&&(m.st=='idle'||m.st=='hunt'||m.st=='eat')){m.st='chase';m.prey=null;m.side=Math.random()<.5?1:-1;this.exc(m)}}
  this.lit=lit;if(!this.litTx)this.litTx=this.add.text(0,0,'빛에 노출됨',ST({fontSize:'10px',color:'#ffe066',fontStyle:'bold'})).setOrigin(.5).setDepth(61);this.litTx.setVisible(!!lit).setPosition(p.x,p.y-26)}
