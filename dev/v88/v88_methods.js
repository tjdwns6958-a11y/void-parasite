 // ===== v88: 공허 1페이즈 — 맞을수록 눈이 빨개진다 (obsE → obsE1 핏발 → obsE2 새빨감, 체력 100%→60% 구간을 셋으로) =====
 obsEyeTex(){if(this.textures.exists('obsE2')||!this.textures.exists('obsE'))return;const src=this.textures.get('obsE').getSourceImage();
  for(const[key,lv]of[['obsE1',1],['obsE2',2]]){const c=document.createElement('canvas');c.width=src.width;c.height=src.height;const x=c.getContext('2d'),W=c.width,H=c.height;x.imageSmoothingEnabled=false;x.drawImage(src,0,0);
   x.globalCompositeOperation='source-atop';const gr=x.createRadialGradient(W/2,H/2,H*.28,W/2,H/2,W*.55);gr.addColorStop(0,'rgba(255,40,60,0)');gr.addColorStop(1,lv==1?'rgba(225,40,70,.5)':'rgba(200,0,24,.92)');x.fillStyle=gr;x.fillRect(0,0,W,H);if(lv==2){x.fillStyle='rgba(230,20,40,.35)';x.fillRect(0,0,W,H)}
   let sd=lv*977+13;const R=()=>{sd=sd*16807%2147483647;return sd/2147483647};
   for(let k=0;k<(lv==1?14:30);k++){let X=R()*W,Y=R()*H;x.fillStyle=lv==1?'#c81c3c':(k%3?'#ff1c3c':'#8a0018');for(let j=0;j<12;j++){X+=(W/2-X)*.1+(R()-.5)*7;Y+=(H/2-Y)*.1+(R()-.5)*7;if(Math.hypot((X-W/2)/(W*.24),(Y-H/2)/(H*.34))<1)break;const z=lv==2&&k%2?4:2;x.fillRect(Math.round(X/2)*2,Math.round(Y/2)*2,z,z)}}
   x.globalCompositeOperation='source-over';x.save();x.beginPath();x.arc(W/2,H/2,H*.31,0,6.283);x.clip();x.drawImage(src,0,0);if(lv==2){x.globalCompositeOperation='source-atop';x.fillStyle='rgba(255,0,30,.22)';x.fillRect(0,0,W,H)}x.restore();
   const t=this.textures.addCanvas(key,c);t.setFilter(Phaser.Textures.FilterMode.NEAREST)}}
 obsEyeSet(m){if(m.ph==2||!m.spr)return;const st=m.hp>m.mh*.867?0:m.hp>m.mh*.733?1:2,key=['obsE','obsE1','obsE2'][st];if(m.spr.texture.key!==key&&this.textures.exists(key)){m.spr.setTexture(key);if(st>0){this.cameras.main.shake(140,.004);const f=this.add.ellipse(m.x,m.y,120,86,0xff2040,.35).setDepth(3.2);this.tweens.add({targets:f,alpha:0,scale:1.2,duration:300,onComplete:()=>f.destroy()})}}}
 // ===== v88: 2페이즈 등장 — 눈이 틈 앞으로 돌아가며 세 번 깜빡이고, 감긴 채 사라지면 틈이 크게 열리며 나선 껍데기가 빠져나온다 (대사 없음) =====
 obsRev(m){this.obsNTex();this.vdOrbTex();this.obsEyeTex();m.ph=2;m.st='rev';m.tm=3.2;m.gone=1;m.gz=0;this.tel=this.tel.filter(q=>q.m!==m);(this.mbb||[]).forEach(q=>q.o.destroy());this.mbb=[];this.emPull=null;
  for(const q of m.ey){q.open=0;q.oe.setVisible(false)}m.ex0=m.x;m.ey0=m.y;m.nx=400;m.ny=138;m.fl=1;m.rvB=0;m.rvC=0;m.rvT=0;
  m.N=this.add.image(m.hx,m.hy,'obsN').setDepth(3.05).setAlpha(0).setScale(.2);
  m.rg.forEach(r=>{const a=r.a;this.tweens.add({targets:r.o,x:r.o.x+Math.cos(a)*140,y:r.o.y+Math.sin(a)*90,alpha:0,duration:700,delay:1100})})}
 obsRevU(m,dt,p){const now=this.time.now,t=3.2-m.tm,S=m.spr,N=m.N,g=m.g;
  if(t<1.1){const k=t/1.1,e=k*k*(3-2*k);m.x=m.ex0+(m.hx-m.ex0)*e;m.y=m.ey0+(m.hy-m.ey0)*e;
   // 세 번 깜빡임 (0.25·0.55·0.85초 언저리)
   let op=1;for(const c of[.25,.55,.85]){const d=Math.abs(t-c);if(d<.09)op=Math.min(op,d/.09)}
   S.setVisible(true).setPosition(m.x,m.y).setScale(1,Math.max(.06,op));m.pu.setVisible(op>.4).setPosition(m.x,m.y).setScale(1,Math.max(.1,op))}
  else if(t<1.4){const k=(t-1.1)/.3;S.setPosition(m.hx,m.hy).setScale(1-.4*k,.06).setAlpha(1-k);m.pu.setVisible(false);m.rf.setScale(1+.5*k).setAlpha(1);
   g.lineStyle(3,0x9a60ff,.5+.4*k).strokeEllipse(m.hx,m.hy,90+90*k,110+60*k)}
  else{S.setVisible(false).setAlpha(1);m.pu.setVisible(false);
   if(!m.rvB){m.rvB=1;this.cameras.main.shake(600,.009);const w=this.add.ellipse(m.hx,m.hy,60,40).setStrokeStyle(4,0x9a60ff,.9).setDepth(12);this.tweens.add({targets:w,scaleX:6,scaleY:6,alpha:0,duration:650,onComplete:()=>w.destroy()});this.tweens.add({targets:m.rf,scale:1.15,alpha:.6,duration:1100})}
   const k=Math.min(1,(t-1.4)/1.2),e=1-(1-k)**3;m.x=m.hx+(m.nx-m.hx)*e;m.y=m.hy+(m.ny-m.hy)*e;N.setPosition(m.x,m.y).setAlpha(Math.min(1,k*2)).setScale(.2+.8*e).setRotation(-2.4*(1-e));
   if(t<2.5){N.setTintFill(0x07030e);g.lineStyle(2,0x9a60ff,.5+.4*Math.sin(now/60)).strokeEllipse(m.x,m.y,170*(.2+.8*e),130*(.2+.8*e))}else if(!m.rvC){m.rvC=1;N.setTintFill(0xffffff);this.time.delayedCall(80,()=>{if(m.N)m.N.clearTint()})}
   if(t>=2.7){const o=this.obsNOff(m),q=Math.min(1,(t-2.7)/.35);S.setVisible(true).clearTint().setPosition(o.ex,o.ey).setScale(.62,.04+.58*q);m.pu.setVisible(q>.5).setPosition(o.ex,o.ey).setScale(.62,.5*q);
    if(!m.rvT){m.rvT=1;m.nm='공허 앵무조개';if(m.nmT)m.nmT.setText(m.nm)}}}
  if(m.tm<=0){m.st='idle';m.cd=1;m.gone=0;m.br=58;S.setVisible(true).setAlpha(1).clearTint();N.setRotation(0).clearTint()}}
