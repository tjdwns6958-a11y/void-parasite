 // ===== v69: 포식 턱 = 낫 모양 칼날(톱니) + 평소에도 씹는 움직임 · 갑각 특수 스킬 = 수정 돌진 =====
 // 칼날 턱 한쪽(머리 기준 좌표, sg=±1 위/아래): 밑동이 두껍고 바깥으로 휘었다가 끝이 날카롭게 안쪽으로 — 안쪽 날에 톱니 둘
 pjBlade(sg,r){return [[r-1.8,4.2],[r+1.2,5.1],[r+3.6,4.1],[r+5.1,.9],[r+3.3,2.3],[r+2.8,1.7],[r+2.1,2.6],[r+1.4,2.1],[r+.8,2.9],[r-1.2,2.2]].map(([x,y])=>[x,sg*y])}
 pjU(){const g=this.pjG;if(!g||!g.scene)return;g.clear();const L=this.lin,hd=this.hd;if(!L||L.p<1||!hd||!hd.visible||!hd.scene)return;
  const E=this.brFx&&this.brFx.k=='p'?this.brFx:null,q=E?Math.min(1,E.t/.24):-1,T=this.time.now/1000,ph=T%3.2;
  // 평소: 천천히 씹음(±.1) + 3.2초마다 '딱딱' 두 번 / 물 때: 크게 벌렸다(0~.35) 딱 다묾(.35~.52)
  const idle=ph<.36?.18+.4*Math.abs(Math.sin(ph/.18*Math.PI)):.22+.1*Math.sin(T*4.5),op=q<0?idle:q<.35?idle+(1-idle)*q/.35:q<.52?1-(q-.35)/.17:idle*Math.min(1,(q-.52)/.48);
  const a=hd.rotation,fx=Math.cos(a),fy=Math.sin(a),u=hd.displayWidth/24,al=hd.alpha,r=4.9*(1+(L.p>=3?.16:L.p>=2?.06:0)+(L.c>=3?.08:0));
  const W=(x,y)=>({x:hd.x+(fx*x-fy*y)*u,y:hd.y+(fy*x+fx*y)*u});
  const big=q>=0&&L.p>=2?(q<.52?Math.max(0,op-idle)/Math.max(.1,1-idle):Math.max(0,1-(q-.52)/.3))*(L.p>=3?1:.55):0,S=(L.p>=2?1.15:.9)*(1+.35*big);
  for(const sg of[-1,1]){const bx=r-1,by=sg*3,an=sg*(op*(.6+.18*big)-.06),c=Math.cos(an),s=Math.sin(an);
   const P=this.pjBlade(sg,r).map(([x,y])=>{const dx=(x-bx)*S,dy=(y-by)*S;return W(bx+dx*c-dy*s,by+dx*s+dy*c)});
   g.lineStyle(2.2*u,0x3d1b6b,al).strokePoints(P,true);g.fillStyle(0xf0c8d8,al).fillPoints(P,true);
   g.fillStyle(0xb85c84,al).fillTriangle(P[0].x,P[0].y,P[1].x,P[1].y,P[9].x,P[9].y);
   g.lineStyle(.9*u,0xffffff,al).beginPath().moveTo(P[3].x,P[3].y);for(let i=4;i<=8;i++)g.lineTo(P[i].x,P[i].y);g.strokePath()}
  if(q>=.5&&q<.66){const t=W(r+5.5*S,0);g.fillStyle(0xffffff,(1-Math.abs(q-.58)/.08)*al).fillCircle(t.x,t.y,1.1*u)}}
 // 갑각 수정 돌진: 짧게(약 110px) 돌진, 처음 부딪힌 적에게 큰 피해 + 멀리 밀쳐 냄 + 충격 고리·수정 파편, 부딪히면 그 자리에서 멈춤
 cdU(dt){const p=this.pl,D=this.cdsh;if(D){D.t-=dt;p.setVelocity(D.vx,D.vy);if(!this.fxLow&&Math.random()<.9){const b=this.add.rectangle(p.x+(Math.random()-.5)*8,p.y+(Math.random()-.5)*8,3,3,Math.random()<.5?0xbfeaff:0xffffff,.8).setAngle(45).setDepth(9);this.tweens.add({targets:b,scale:.2,alpha:0,duration:280,onComplete:()=>b.destroy()})}
   for(const m of this.cur.en)if(m.on&&!m.gone&&!(m.k=='rek'&&(m.st=='under'||m.st=='warn'))&&Math.hypot(m.x-p.x,m.y-p.y)<30+(m.br||0)){const l=Math.hypot(D.vx,D.vy)||1,ux=D.vx/l,uy=D.vy/l,an=Math.atan2(uy,ux);
    const k=this.dmgM(m,this.bdmg*2.6+8);if(m.spr){m.spr.setTintFill(0xffffff);this.time.delayedCall(110,()=>{if(m.spr)m.spr.clearTint()})}this.dtx(m.x,m.y-22,'수정 돌진!','#9fd8ff');
    if(!k&&!m.mb&&!({spn:1,qn:1,wd:1,rw:1,em:1,sw:1})[m.k])(this.kbL=this.kbL||[]).push({m,vx:ux*500,vy:uy*500,t:.22});this.slamS=1;this.bmAdd(m,an);this.slamS=0;
    p.setVelocity(-ux*90,-uy*90);this.cdsh=null;this.inv=Math.max(this.inv,.3);break}
   if(this.cdsh&&D.t<=0)this.cdsh=null}
  if(this.kbL&&this.kbL.length)this.kbL=this.kbL.filter(o=>{o.t-=dt;if(!o.m.on||o.t<=0)return false;const f=o.t/.22;this.mv(o.m,o.vx*dt*f,o.vy*dt*f,30);if(o.m.spr)o.m.spr.setPosition(o.m.x,o.m.y);return true})}
