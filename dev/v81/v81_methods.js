 // ===== v81: 갑각 중간 보스 「정동 집게왕」 (수정 동굴의 거대 갑각류) =====
 // 1페이즈: 등의 정동이 갑주 — 물기 ×0.2. 돌진을 수정 기둥에 박게 하면 기절(×1.6)
 // 2페이즈(체력 50%): 정동을 뜯어 굴린다 — 돌알이 벽·기둥에 튕기며 굴러다니고, 가끔 불러들여 던진다. 몸은 맨살(×1.05), 돌진 2연속
 gdkTex(){for(const k of['A','B','G','P']){const key='gdk'+k;if(this.textures.exists(key))continue;const im=window.__gdkIm&&__gdkIm[k];if(im&&im.complete&&im.naturalWidth){const t=this.textures.addImage(key,im);t.setFilter(Phaser.Textures.FilterMode.NEAREST)}}}
 gdkKb(vx,vy,t){this.gkb={vx,vy,t}}
 gdkAI(m,dt,p){const now=this.time.now,D=v=>Math.round(v*m.df),P2=m.ph==2,en=m.hp<m.mh*.25?.85:1;if(!m.g)m.g=this.add.graphics().setDepth(1.5);const g=m.g;g.clear();
  if(!m.pt){m.ph=1;m.br=46;m.gone=0;m.pt=[[170,128],[630,128],[240,272],[560,272]].map(([x,y])=>({x,y,hp:2,on:1,rt:0,o:this.add.image(x,y+14,'gdkP').setOrigin(.5,.86).setDepth(8.4)}))}
  // 수정 기둥: 다시 자람 · 금 · 플레이어 밀어내기
  for(const q of m.pt){if(!q.on){q.rt-=dt;if(q.rt<=0){q.on=1;q.hp=2;q.o.setVisible(true).setAlpha(0).setScale(.4).clearTint();this.tweens.add({targets:q.o,alpha:1,scale:1,duration:500})}continue}
   const dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);if(d<28&&d>.01){p.body.reset(q.x+dx/d*28,q.y+dy/d*28)}}
  if(this.gkb&&this.gkb.t>0){this.gkb.t-=dt;p.body.reset(Phaser.Math.Clamp(p.x+this.gkb.vx*dt,60,740),Phaser.Math.Clamp(p.y+this.gkb.vy*dt,62,300))}
  const S=m.spr;if(m.st=='intro'){S.setPosition(m.x,m.y);return}
  m.cd-=dt;m.tm-=dt;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,busy=m.st!='idle';let sx=0,sy=0;
  // 2페이즈로
  if(!P2&&m.hp<=m.mh*.5&&m.st=='idle'){m.st='rip';m.tm=1.4;this.tel=this.tel.filter(q=>q.m!==m);this.dtx(m.x,m.y-70,'등의 정동을 뜯어낸다!','#ff9ac0');this.cameras.main.shake(1200,.006)}
  switch(m.st){
  case 'idle':{const sp=P2?70:46,far=P2?165:210,near=P2?105:125;if(d>far){m.x+=dx/d*sp*dt;m.y+=dy/d*sp*dt*.7}else if(d<near){m.x-=dx/d*34*dt;m.y-=dy/d*24*dt}m.x=Phaser.Math.Clamp(m.x,110,690);m.y=Phaser.Math.Clamp(m.y,96,250)
    if(m.cd<=0){const r=Math.random();
     if(d<88&&r<.35)this.gdkSnap(m,D);
     else if(P2&&m.ball&&m.ball.st=='roll'&&!(m.thc>now)&&r<.4){m.st='call';m.tm=2.5;m.ball.st='ret';m.thc=now+7000;this.dtx(m.x,m.y-60,'돌알을 불러들인다','#ffd0a0')}
     else if(d<(P2?140:125)&&r<(P2?.6:.5))this.gdkSlam(m,D,en);
     else if(!P2&&!(m.rnc>now)&&r>.8)this.gdkRain(m,D);
     else if(d>=125&&r<(P2?.28:.34))this.gdkWave(m,D,en);
     else if(!P2&&Math.random()<.35&&m.pt.some(q=>{if(!q.on)return false;const ux=p.x-m.x,uy=p.y-m.y,L2=ux*ux+uy*uy||1,t=((q.x-m.x)*ux+(q.y-m.y)*uy)/L2;return t>0&&t<1.3&&Math.hypot(q.x-m.x-ux*t,q.y-m.y-uy*t)<40})){if(!(m.rnc>now))this.gdkRain(m,D);else{m.cd=.5;m.x+=(Math.random()<.5?-1:1)*20}}
     else this.gdkCharge(m,en,P2?1:0)}}break;
  case 'chW':sx=(Math.random()-.5)*3;if(m.tm<=0){m.st='ch';m.cl=560;m.hp0=0}break;
  case 'ch':{const v=(P2?640:560)*dt;m.x+=m.cdx*v;m.y+=m.cdy*v;m.cl-=v;
    if(!(m.chH>now)&&Math.hypot(p.x-m.x,p.y-m.y)<54){m.chH=now+800;this.hurt(D(P2?27:24),'정동 집게왕의 돌진',m);if(!m.on)return;const sd=Math.sign(m.cdx*dy-m.cdy*dx)||1;this.gdkKb((m.cdx-m.cdy*sd*.8)*320,(m.cdy+m.cdx*sd*.8)*320,.22)}
    const pq=m.pt.find(q=>q.on&&Math.hypot(q.x-m.x,q.y-m.y)<62);
    if(pq){this.gdkStun(m,pq,P2);break}
    if(m.x<100||m.x>700||m.y<92||m.y>262){m.x=Phaser.Math.Clamp(m.x,100,700);m.y=Phaser.Math.Clamp(m.y,92,262);m.st='stag';m.tm=.55;this.cameras.main.shake(160,.006);this.gdkDust(m.x,m.y+30,6);break}
    if(m.cl<=0){if(m.rep>0){m.rep--;this.gdkCharge(m,en,0,.45)}else{m.st='idle';m.cd=1.0*en}}}break;
  case 'stag':sx=(Math.random()-.5)*2;if(m.tm<=0){if(m.rep>0){m.rep--;this.gdkCharge(m,en,0,.45)}else{m.st='idle';m.cd=.7*en}}break;
  case 'stun':{sx=Math.sin(now/40)*1.5;const k=m.tm;for(let i=0;i<4;i++){const a=now/260+i*1.571;g.fillStyle(0xffe066,.9).fillCircle(m.x+Math.cos(a)*34,m.y-56+Math.sin(a)*8,2.6)}
    g.lineStyle(2,0xffe066,.5+.4*Math.sin(now/90)).strokeEllipse(m.x,m.y,120,84);if(m.tm<=0){m.st='idle';m.cd=.5}}break;
  case 'slW':sy=-Math.min(3,(1-m.tm)*4);if(m.tm<=0){m.st='sl';m.tm=.5;this.cameras.main.shake(180,.008);this.gdkDust(m.slx,m.sly,10);
    for(let i=1;i<=5;i++){const x=m.slx+m.sdx*i*38,y=m.sly+m.sdy*i*30;if(x<60||x>740||y<60||y>305)break;this.telAdd({k:'c',x,y,r:20,sy:.8,t:.2+i*.08,dmg:D(14),src:'수정 가시',m})}}break;
  case 'sl':if(m.tm<=0){m.st='idle';m.cd=.9*en}break;
  case 'rain':sy=Math.sin(now/50)*1.2;if(m.tm<=0){m.st='idle';m.cd=.8*en}break;
  case 'snap':if(m.tm<=0){m.st='idle';m.cd=.55*en}break;
  case 'rip':sx=(Math.random()-.5)*4;if(m.tm<=0){m.ph=2;S.setTexture('gdkB');const a=Math.PI/2+(Math.random()-.5)*1.6;m.ball={x:m.x,y:m.y-34,vx:Math.cos(a),vy:Math.sin(a),spd:190,st:'roll',hc:0,o:this.add.image(m.x,m.y-34,'gdkG').setDepth(9.3)};
    for(let i=0;i<2;i++)this.gdkShard(m.x+(i?50:-50),m.y+40);this.dtx(m.x,m.y-70,'정동이 굴러간다 — 점선 방향을 보고 피할 것!','#ffe066');m.st='idle';m.cd=1.2;m.thc=now+6000}break;
  case 'call':if(m.ball&&m.ball.st=='held'){m.st='thW';m.tm=.7*en;const a=Math.atan2(p.y-m.y,p.x-m.x);m.tdx=Math.cos(a);m.tdy=Math.sin(a);this.telAdd({k:'l',x:m.x,y:m.y-20,x2:m.x+m.tdx*620,y2:m.y-20+m.tdy*620,w:56,t:m.tm,src:'',fx:0,m,ch:1})}else if(m.tm<=0){if(m.ball)m.ball.st='roll';m.st='idle';m.cd=.6}break;
  case 'thW':if(m.tm<=0&&m.ball){const b=m.ball;b.st='roll';b.vx=m.tdx;b.vy=m.tdy;b.spd=540;b.x=m.x+m.tdx*40;b.y=m.y-20+m.tdy*30;m.st='idle';m.cd=.9*en;this.cameras.main.shake(120,.006)}break}
  // 굴러다니는 정동
  const b=m.ball;if(b){const R=26;
   if(b.st=='roll'){const base=Math.min(320,225+(now-(b.t0||(b.t0=now)))/1000*4);b.spd+= (base-b.spd)*Math.min(1,dt*(b.spd>base?1.2:.5));b.x+=b.vx*b.spd*dt;b.y+=b.vy*b.spd*dt;let bn=0;
     if(b.x<70||b.x>730){b.vx*=-1;b.x=Phaser.Math.Clamp(b.x,70,730);bn=1}if(b.y<78||b.y>298){b.vy*=-1;b.y=Phaser.Math.Clamp(b.y,78,298);bn=1}
     for(const q of m.pt)if(q.on){const qx=b.x-q.x,qy=b.y-q.y,qd=Math.hypot(qx,qy);if(qd<R+18&&qd>0){const nx=qx/qd,ny=qy/qd,dp=b.vx*nx+b.vy*ny;if(dp<0){b.vx-=2*dp*nx;b.vy-=2*dp*ny;bn=1}b.x=q.x+nx*(R+18);b.y=q.y+ny*(R+18)}}
     if(bn){this.cameras.main.shake(60,.003);this.gdkDust(b.x,b.y,4);if(Math.random()<.3)this.gdkShard(b.x,b.y)}
     const L=70;for(let i=1;i<=6;i++){const t=i/6;g.fillStyle(0xffd080,.65-.08*i).fillCircle(b.x+b.vx*(R+L*t),b.y+b.vy*(R+L*t),2)}
     if(Math.hypot(p.x-b.x,p.y-b.y)<R+9&&!(b.hc>now)){b.hc=now+900;this.hurt(D(b.spd>380?30:24),'구르는 정동',m);if(!m.on)return;this.gdkKb(b.vx*260,b.vy*260,.2)}}
   else if(b.st=='ret'){const qx=m.x-b.x,qy=m.y-34-b.y,qd=Math.hypot(qx,qy)||1;if(qd<12){b.st='held'}else{const v=Math.min(qd,460*dt);b.x+=qx/qd*v;b.y+=qy/qd*v}}
   else if(b.st=='held'){b.x=m.x;b.y=m.y-34}
   b.o.setPosition(b.x,b.y).setRotation(b.o.rotation+(b.st=='held'?0:b.spd*dt/R*Math.sign(b.vx||1)))}
  S.setPosition(m.x+sx,m.y+sy+Math.sin(now/420)*1.2);if(m.st!='stun')S.clearTint();else S.setTint(now%300<150?0xfff0c0:0xffffff)}
 gdkCharge(m,en,rep,t){const p=this.pl,vx=p.body.velocity.x,vy=p.body.velocity.y,tx=p.x+vx*.15,ty=p.y+vy*.15,a=Math.atan2(ty-m.y,tx-m.x);m.cdx=Math.cos(a);m.cdy=Math.sin(a);m.st='chW';m.tm=(t||(m.ph==2?.58:.68))*en;if(rep)m.rep=rep;
  this.telAdd({k:'l',x:m.x,y:m.y,x2:m.x+m.cdx*560,y2:m.y+m.cdy*560,w:76,t:m.tm,src:'',fx:0,m,ch:1})}
 gdkSlam(m,D,en){const p=this.pl,a=Math.atan2(p.y-m.y,p.x-m.x);m.sdx=Math.cos(a);m.sdy=Math.sin(a);m.slx=m.x+m.sdx*60;m.sly=m.y+m.sdy*46;m.st='slW';m.tm=.7*en;this.telAdd({k:'c',x:m.slx,y:m.sly,r:56,sy:.8,t:m.tm,dmg:D(28),src:'수정 집게 내리찍기',m})}
 gdkRain(m,D){const p=this.pl;m.st='rain';m.tm=1.3;m.rnc=this.time.now+3800;this.dtx(m.x,m.y-64,'정동이 빛난다 — 발밑을 볼 것','#c8b0ff');
  for(let i=0;i<9;i++){const a=Math.random()*6.283,r=i?45+Math.random()*100:0;this.telAdd({k:'c',x:Phaser.Math.Clamp(p.x+p.body.velocity.x*.3+Math.cos(a)*r,70,730),y:Phaser.Math.Clamp(p.y+p.body.velocity.y*.3+Math.sin(a)*r*.7,70,300),r:26,sy:.8,t:.95+i*.07,dmg:D(15),src:'정동 파편',m})}}
 // 수정 가시 파도: 바닥을 내리쳐 플레이어 쪽으로 가시가 줄지어 솟는다 (멀리서도)
 gdkWave(m,D,en){const p=this.pl,tx=p.x+p.body.velocity.x*.25,ty=p.y+p.body.velocity.y*.25,a=Math.atan2(ty-m.y,tx-m.x),cx=Math.cos(a),cy=Math.sin(a);m.st='sl';m.tm=1.1;this.cameras.main.shake(140,.006);this.gdkDust(m.x,m.y+30,8);
  for(let i=1;i<=11;i++){const x=m.x+cx*(30+i*34),y=m.y+cy*(24+i*28);if(x<60||x>740||y<60||y>305)break;this.telAdd({k:'c',x,y,r:22,sy:.8,t:(.5+i*.06)*en,dmg:D(19),src:'수정 가시',m})}}
 gdkSnap(m,D){const p=this.pl;m.st='snap';m.tm=.6;this.telAdd({k:'s',x:m.x,y:m.y,r:98,a:Math.atan2(p.y-m.y,p.x-m.x),h:.62,t:.45,dmg:D(11),src:'작은 집게',m})}
 gdkStun(m,q,P2){m.st='stun';m.tm=P2?1.3:1.8;m.rep=0;q.hp--;this.cameras.main.shake(320,.014);this.gdkDust(q.x,q.y,12);this.dtx(m.x,m.y-70,'기둥에 박혔다 — 기절! 지금 물 것','#ffe066');
  for(let i=0;i<10;i++){const a=Math.random()*6.283,o=this.add.rectangle(q.x,q.y-10,3,7,i%2?0x9fd8ff:0xb07aff).setRotation(a).setDepth(12);this.tweens.add({targets:o,x:q.x+Math.cos(a)*50,y:q.y-10+Math.sin(a)*34,angle:200,alpha:0,duration:600,onComplete:()=>o.destroy()})}
  if(q.hp<=0){q.on=0;q.rt=18;q.o.setVisible(false);this.gdkShard(q.x-16,q.y+8);this.gdkShard(q.x+16,q.y+8)}else q.o.setTint(0xa0b8ff)}
 gdkShard(x,y){const a=this.cur;if(a.food.filter(f=>f.on).length>=7)return;x=Phaser.Math.Clamp(x,60,740);y=Phaser.Math.Clamp(y,64,300);const f={t:'c',x,y,c:-1,r:-1,p:0,on:1};f.spr=this.add.image(x,y,'f_c').setDepth(5);a.food.push(f)}
 gdkDust(x,y,n){for(let i=0;i<n;i++){const a=Math.random()*6.283,o=this.add.circle(x,y,2+Math.random()*2,0x8a80a8,.7).setDepth(8.6);this.tweens.add({targets:o,x:x+Math.cos(a)*(20+Math.random()*24),y:y+Math.sin(a)*(10+Math.random()*12),alpha:0,duration:420,onComplete:()=>o.destroy()})}}
