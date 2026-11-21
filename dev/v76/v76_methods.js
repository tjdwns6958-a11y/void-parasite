 // ===== v76: 허기의 왕관 — 맞물림 더 어렵게 (예고 0.75초, 닫힘 속도 760, 체력 60% 아래면 두 쌍이 엇갈려 닫힘 0.3초 차) =====
 hcClamp(m,D,en){const p=this.pl,ring=m.jw.filter(j=>j.st=='ring');if(ring.length<2){m.st='crown';m.cd=.5;return}
  const pair=(A,B,a,dl)=>{const L=120,ax=Math.cos(a),ay=Math.sin(a)*.8,x1=Phaser.Math.Clamp(p.x+ax*L,60,740),y1=Phaser.Math.Clamp(p.y+ay*L,60,300),x2=Phaser.Math.Clamp(p.x-ax*L,60,740),y2=Phaser.Math.Clamp(p.y-ay*L,60,300),mx=(x1+x2)/2,my=(y1+y2)/2;
   A.st='go';A.tx=x1;A.ty=y1;B.st='go';B.tx=x2;B.ty=y2;this.telAdd({k:'l',x:x1,y:y1,x2,y2,w:38,t:.75*en+dl,dmg:D(22),src:'허기의 턱 — 맞물림',m,on:()=>{for(const J of[A,B]){J.st='lunge';J.v=760;J.tx=mx;J.ty=my}}})};
  const a=Math.random()*3.14;pair(ring[0],ring[Math.floor(ring.length/2)],a,0);m.st='clamp';m.tm=1.5;
  if(m.hp<m.mh*.6&&ring.length>=4){const C=ring[1],E2=ring[1+Math.floor(ring.length/2)]||ring[ring.length-1];if(C!==E2){pair(C,E2,a+Math.PI/2,.3);m.tm=1.8}}}
 // 턱마다 톱날 이빨 한 쌍(픽셀): 평소 다물었다 벌렸다 · 겨눌 때 크게 벌림 · 달려들 때 콱 다묾 · 회전 베기 땐 반쯤
 hcTeeth(m,now){const gb=m.gb||(m.gb=this.add.graphics().setDepth(9.35));gb.clear();const sc=1+.13*(m.gr||0);
  for(const j of m.jw){const op=j.st=='lunge'?0:j.st=='aim'?1:j.st=='spin'?.3:.35+.35*Math.sin(now/1000*5+j.i*1.3),c=Math.cos(j.fa),s=Math.sin(j.fa),K=1.3*sc,bx=j.x+c*7*sc,by=j.y+s*7*sc;
   for(const sg of[-1,1]){const rot=sg*(op*.6-.06),rc=Math.cos(rot),rs=Math.sin(rot),Q=this.pjBlade(sg,0).map(([x,y])=>{const lx=x+1,ly=y-sg*1.8;return[lx*rc-ly*rs,lx*rs+ly*rc]});
    this.pjPix(gb,Q,(X,Y)=>Math.abs(Y+.5)<1.3&&X>1,(X,Y)=>({x:bx+(X*c-Y*s)*K,y:by+(X*s+Y*c)*K}),1)}}}
