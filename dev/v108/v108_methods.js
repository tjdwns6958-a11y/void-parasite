 // ===== v108 갑각 수정 = 1회 방어 =====
 // 갑각 2단계부터 결정을 먹으면 등에 수정 1개(최대 3). 맞으면 수정 1개가 깨지며 그 공격을 통째로 막고(피해 0 · 0.5초 무적), 막은 피해의 일부를 공격자에게 반사.
 // 반사 비율 CRR(테스트로 정함). window.__vpCR로 바꿔 볼 수 있음.
 cryBlock(d,src,m){const L=this.lin,R=window.__vpCR??CRR,p=this.pl,h=this.hd||p,x=h.x,y=h.y;this.cry--;this.inv=.5;this.lastHit={src:src||'공격',t:this.time.now,blk:1};
  const g=this.add.circle(x,y,20,0x9fd8ff,.35).setStrokeStyle(3,0xdff4ff,.95).setDepth(12);this.tweens.add({targets:g,scale:1.8,alpha:0,duration:280,onComplete:()=>g.destroy()});
  for(let i=0;i<10;i++){const an=Math.random()*6.283,dd=22+Math.random()*26,s=this.add.triangle(x,y,0,-5,3,0,0,5,[0x9fd8ff,0xdff4ff,0xb07aff][i%3]).setDepth(12).setRotation(an);
   this.tweens.add({targets:s,x:x+Math.cos(an)*dd,y:y+Math.sin(an)*dd*.8,angle:Math.random()*360,alpha:0,duration:380+Math.random()*160,ease:'Quad.out',onComplete:()=>s.destroy()})}
  this.bd.forEach(o=>o.setTintFill(0xdff4ff));this.time.delayedCall(90,()=>this.bd.forEach(o=>o.clearTint()));
  this.blkN=(this.blkN||0)+1;
  if(m&&m.on&&d>0&&R>0){const rd=d*this.dmt*R,h0=m.hp;const kd=m.k=='em'&&m.ph==2?this.dmgM(m,rd*.8,1):this.dmgM(m,rd);const real=Math.max(0,h0-Math.max(0,m.hp));this.rflD=(this.rflD||0)+real;
   const ln=this.add.graphics().setDepth(12);ln.lineStyle(2,0xbfeaff,.9).lineBetween(x,y,m.x,m.y);this.tweens.add({targets:ln,alpha:0,duration:220,onComplete:()=>ln.destroy()});
   if(real>=.5)this.dtx(m.x,m.y-18,'반사 '+Math.round(real),'#9fd8ff');if(kd&&L.c>=3&&this.cry<3)this.cry++}}
 // 등의 수정: 더 크고 진한 테두리(옅은 갑각 몸 위에서도 보이게) · 살짝 반짝임
 cryBTex(){if(this.textures.exists('cryB'))return;tex(this,'cryB',9,12,2,x=>{const P=[[4,0],[7,4],[6,10],[4,11],[2,10],[1,4]];x.fillStyle='#14203a';x.beginPath();x.moveTo(P[0][0]+.5,P[0][1]);P.forEach(q=>x.lineTo(q[0]+.5,q[1]+.5));x.closePath();x.fill();
  x.fillStyle='#2f86d0';x.fillRect(2,4,5,6);x.fillRect(3,2,3,9);x.fillStyle='#6fc8ff';x.fillRect(3,3,2,7);x.fillStyle='#dff6ff';x.fillRect(3,3,1,4);x.fillStyle='#ffffff';x.fillRect(4,1,1,2)})}
 wormDeco(){const L=this.lin;if(L.c<2){if(this.cryS)this.cryS.forEach(o=>o.setVisible(false));return}this.cryBTex();if(!this.cryS||!this.cryS[0].scene)this.cryS=[0,1,2].map(()=>this.add.image(0,0,'cryB').setDepth(9.6));const now=this.time.now;
  this.cryS.forEach((o,i)=>{const sg=this.sg[i];o.setVisible(i<this.cry).setPosition(sg.x,sg.y-8*this.bsc).setScale(this.bsc*(1+.07*Math.sin(now/260+i*1.3)))})}
