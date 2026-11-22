 // ===== v87: 회피는 회색 작은 'miss'만 (완벽 회피 대사·번쩍임·느려짐 없음, 재사용 절반 회복만 조용히 남김) =====
 dshDodge(src){const now=this.time.now,p=this.pl;if(!(this.dshDt>now)){this.dshDt=now+250;const t=this.add.text(p.x,p.y-18,'miss',ST({fontSize:'9px',color:'#9a92a8'})).setOrigin(.5).setDepth(70);this.tweens.add({targets:t,y:p.y-32,alpha:0,duration:600,onComplete:()=>t.destroy()})}
  if(!this.dshP&&now-(this.dshT0||0)<=200){this.dshP=1;this.dshCd=Math.max(0,this.dshCd-1.25)}}
 // ===== v87: 허기의 왕관 피격 — 살짝 움찔(눌림) · 분홍빛 번쩍 · 맞은 쪽에서 작은 불꽃 · 작은 피해 숫자 =====
 hcHit(m,d){m.hk=.2;const p=this.pl,a=Math.atan2(p.y-m.y,p.x-m.x),bs=1+.12*(m.gr||0),x=m.x+Math.cos(a)*40*bs,y=m.y+Math.sin(a)*28*bs;
  if(m.spr){m.spr.setTintFill(0xffd8e4);this.time.delayedCall(70,()=>{if(m.spr)m.spr.clearTint()})}
  for(let i=0;i<6;i++){const an=a+(Math.random()-.5)*1.6,b=this.add.rectangle(x,y,4,1.6,i%2?0xffffff:0xff9ac0,.95).setRotation(an).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(an)*(14+Math.random()*12),y:y+Math.sin(an)*(10+Math.random()*10),alpha:0,duration:220,onComplete:()=>b.destroy()})}
  if(!(m.hnT>this.time.now)){m.hnT=this.time.now+120;const t=this.add.text(x,y-8,'-'+Math.round(d),ST({fontSize:'10px',fontStyle:'bold',color:'#ffc8d6'})).setOrigin(.5).setDepth(70);this.tweens.add({targets:t,y:y-24,alpha:0,duration:500,onComplete:()=>t.destroy()})}}
 // ===== v87: 공허 구체 — 검은 핵 · 보랏빛 테 · 별 점 · 소용돌이 =====
 vdOrbTex(){if(this.textures.exists('vdOrb'))return;tex(this,'vdOrb',12,12,2,x=>{const g=x.createRadialGradient(6,6,0,6,6,6);g.addColorStop(0,'#000000');g.addColorStop(.55,'#08030f');g.addColorStop(.78,'#5a2aa0');g.addColorStop(.9,'#c8a0ff');g.addColorStop(1,'rgba(120,60,220,0)');x.fillStyle=g;x.beginPath();x.arc(6,6,6,0,6.283);x.fill();
  x.strokeStyle='rgba(200,160,255,.75)';x.lineWidth=.8;x.beginPath();x.arc(6,6,3.2,.4,2.4);x.stroke();x.beginPath();x.arc(6,6,3.2,3.5,5.4);x.stroke();x.fillStyle='#ffffff';x.fillRect(4,5,1,1);x.fillRect(7,7,1,1);x.fillStyle='#b8a0ff';x.fillRect(6,3,1,1)})}
 // ===== v87: 공허 2페이즈 등장 — 눈이 떨다가 감기며 틈으로 빨려 들어감 → 틈이 터짐 → 검은 실루엣의 나선 껍데기가 돌며 빠져나옴 → 색이 돌아옴 → 껍데기 위에서 같은 눈이 뜸 =====
 obsRev(m){this.obsNTex();this.vdOrbTex();m.ph=2;m.st='rev';m.tm=3.4;m.gone=1;m.gz=0;this.tel=this.tel.filter(q=>q.m!==m);(this.mbb||[]).forEach(q=>q.o.destroy());this.mbb=[];this.emPull=null;
  for(const q of m.ey){q.open=0;q.oe.setVisible(false)}m.ex0=m.x;m.ey0=m.y;m.nx=400;m.ny=138;m.fl=1;m.rvB=0;m.rvC=0;m.rvT=0;
  m.N=this.add.image(m.hx,m.hy,'obsN').setDepth(3.05).setAlpha(0).setScale(.2);
  m.rg.forEach(r=>{const a=r.a;this.tweens.add({targets:r.o,x:r.o.x+Math.cos(a)*140,y:r.o.y+Math.sin(a)*90,alpha:0,duration:700,delay:1250})});
  this.cameras.main.shake(700,.004);this.dtx(400,70,'눈이 떨린다…','#c8a8ff')}
 obsRevU(m,dt,p){const now=this.time.now,t=3.4-m.tm,S=m.spr,N=m.N,g=m.g;
  if(t<.7){const k=t/.7;S.setPosition(m.x+Math.sin(now/22)*2.5*k,m.y).setScale(1);m.pu.setPosition(m.x,m.y).setScale(1,1-.5*Math.abs(Math.sin(now/60))*k);S.setTint(Math.floor(now/80)%2?0xffb0b0:0xffffff);
   for(let i=0;i<2;i++){const a=Math.random()*6.283,r=60+Math.random()*60,b=this.add.circle(m.x+Math.cos(a)*r,m.y+Math.sin(a)*r*.7,1.6,0x2a1040,.9).setDepth(12);this.tweens.add({targets:b,x:m.x,y:m.y,alpha:0,duration:350,onComplete:()=>b.destroy()})}}
  else if(t<1.25){const k=(t-.7)/.55,e=k*k;S.clearTint();m.x=m.ex0+(m.hx-m.ex0)*e;m.y=m.ey0+(m.hy-m.ey0)*e;S.setPosition(m.x,m.y).setScale(1-.6*e,Math.max(.06,1-k*1.1));m.pu.setVisible(k<.6).setPosition(m.x,m.y);m.rf.setScale(1-.3*e)}
  else{S.setVisible(false);m.pu.setVisible(false);
   if(!m.rvB){m.rvB=1;this.cameras.main.flash(220,170,110,255);this.cameras.main.shake(500,.012);m.rf.setScale(1.5);this.tweens.add({targets:m.rf,scale:1.1,alpha:.6,duration:900});
    for(let i=0;i<18;i++){const a=i/18*6.283,b=this.add.rectangle(m.hx,m.hy,3,8,i%3?0x9a60ff:0xffffff).setRotation(a+1.57).setDepth(12);this.tweens.add({targets:b,x:m.hx+Math.cos(a)*(90+Math.random()*50),y:m.hy+Math.sin(a)*(60+Math.random()*30),alpha:0,angle:200,duration:600,onComplete:()=>b.destroy()})}
    const w=this.add.ellipse(m.hx,m.hy,40,28).setStrokeStyle(4,0x9a60ff,.9).setDepth(12);this.tweens.add({targets:w,scaleX:7,scaleY:7,alpha:0,duration:650,onComplete:()=>w.destroy()})}
   const k=Math.min(1,(t-1.25)/1.15),e=1-(1-k)**3;m.x=m.hx+(m.nx-m.hx)*e;m.y=m.hy+(m.ny-m.hy)*e;N.setPosition(m.x,m.y).setAlpha(Math.min(1,k*2)).setScale(.2+.8*e).setRotation(-2.4*(1-e));
   if(t<2.4)N.setTintFill(0x07030e);else if(!m.rvC){m.rvC=1;N.setTintFill(0xffffff);this.time.delayedCall(80,()=>{if(m.N)m.N.clearTint()})}
   if(t<2.4){g.lineStyle(2,0x9a60ff,.5+.4*Math.sin(now/60)).strokeEllipse(m.x,m.y,170*(.2+.8*e),130*(.2+.8*e))}
   if(t>=2.7){const o=this.obsNOff(m),q=Math.min(1,(t-2.7)/.35);S.setVisible(true).clearTint().setPosition(o.ex,o.ey).setScale(.62,.04+.58*q);m.pu.setVisible(q>.5).setPosition(o.ex,o.ey).setScale(.62,.5*q);
    if(!m.rvT){m.rvT=1;this.dtx(400,64,'눈은 처음부터 껍데기 속 「공허 앵무조개」의 것이었다','#ffe066');m.nm='공허 앵무조개';if(m.nmT)m.nmT.setText(m.nm)}}}
  if(m.tm<=0){m.st='idle';m.cd=1;m.gone=0;m.br=58;S.setVisible(true).clearTint();N.setRotation(0).clearTint()}}
 // 촉수 채찍: 처음엔 뒤로 휘어 있다가 확 펴지며 끝이 휙 넘어감(감쇠 진동) — 끝에서 짧은 '딱' 연출
 obsWhip(m,q,o,g,dt,now){q.wt=(q.wt||0)+dt;const L=Math.hypot(q.tx-o.ax,q.ty-o.ay),k=q.k=Math.min(1,(q.k||0)+dt*5),a0=Math.atan2(q.ty-o.ay,q.tx-o.ax),sd=q.i%2?1:-1,bend=sd*(1.7*Math.exp(-q.wt*4.5)*Math.cos(q.wt*17)+.1*Math.sin(now/170+q.i));
  const pts=[[o.ax,o.ay]];let x=o.ax,y=o.ay;for(let i=1;i<=12;i++){const s=i/12,an=a0+bend*Math.pow(s,1.6);x+=Math.cos(an)*L*k/12;y+=Math.sin(an)*L*k/12;pts.push([x,y])}q.x=x;q.y=y;q.pts=pts;
  for(const[w,c]of[[9,0x0a0612],[5,q.hp<2?0x9a70d0:0x5a3a8a]]){g.lineStyle(w,c,1);g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.strokePath()}
  for(let i=2;i<12;i+=2)g.fillStyle(0xd8b8ff,.9).fillCircle(pts[i][0],pts[i][1],1.6);g.fillStyle(0xe0457b,1).fillCircle(x,y,3.5);
  if(!q.crk&&q.wt>.17){q.crk=1;const c=this.add.arc(x,y,8,a0-1,a0+1,false).setStrokeStyle(2,0xffffff,.9).setDepth(12);this.tweens.add({targets:c,scale:2.2,alpha:0,duration:200,onComplete:()=>c.destroy()})}}
 // 채찍을 쳐들기: 예고 동안 촉수가 입구 위로 말려 올라감
 obsWhipW(m,o,g,now){const k=1-Math.max(0,m.tm)/(.7);for(const q of m.tn){const a0=Math.atan2(q.ty-o.ay,q.tx-o.ax),sd=q.i%2?1:-1;let x=o.ax,y=o.ay;g.lineStyle(6,0x5a3a8a,1);g.beginPath();g.moveTo(x,y);for(let i=1;i<=8;i++){const s=i/8,an=a0+Math.PI+sd*(1.2+1.6*s)*(.4+.6*k);x+=Math.cos(an)*5;y+=Math.sin(an)*5-1.5*k;g.lineTo(x,y)}g.strokePath();g.fillStyle(0xe0457b,1).fillCircle(x,y,2.6)}}
