 // ===== v77: 허기의 왕관 — 쌍마다 다른 돌진 (턱 번호 %3: 0 지금처럼 · 1 길게 · 2 난이도에 따라) =====
 // 난이도 단계 = 보스 df(레벨 배율) 1.5 / 2.1 기준 + 체력 50% 아래면 한 단계 더: 0 = 30px 앞에서 멈춤 · 1 = 2연속 · 2+ = 3연속(빠르게)
 hcLunge(m,j,en){const p=this.pl,k=j.i%3,vx=p.body.velocity.x,vy=p.body.velocity.y;let tx=p.x+vx*.1+(Math.random()-.5)*44,ty=p.y+vy*.1+(Math.random()-.5)*34,v=500,t=.5*en;
  if(k==1){const dx=p.x-j.x,dy=p.y-j.y,d=Math.hypot(dx,dy)||1;tx=p.x+dx/d*120;ty=p.y+dy/d*120;v=640;t=.55*en}
  else if(k==2){const lvl=(m.df>=2.1?2:m.df>=1.5?1:0)+(m.hp<m.mh*.5?1:0);if(j.rep>0)j.rep--;else j.rep=Math.min(2,lvl);
   if(lvl==0){const dx=p.x-j.x,dy=p.y-j.y,d=Math.hypot(dx,dy)||1;tx=p.x-dx/d*30;ty=p.y-dy/d*30}t=(lvl>=2?.36:.45)*en;v=lvl>=2?620:540}
  j.st='aim';j.t=t;j.v=v;j.tx=Phaser.Math.Clamp(tx,60,740);j.ty=Phaser.Math.Clamp(ty,60,300);this.telAdd({k:'l',x:j.x,y:j.y,x2:j.tx,y2:j.ty,w:30*(1+.18*(m.gr||0)),t:j.t,src:'',fx:0})}
