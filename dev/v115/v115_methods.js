 // ===== v115 틈 너머의 관찰자(공허 앵무조개) 2페이즈 =====
 // 나선 구체: 도는 빠르기가 출렁이고(사인) 중간에 한 번 방향이 뒤집힘 · 곧은 빠른 구체(200)와 휘어 가는 느린 구체(150, 반대로 휨)가 번갈아 → 두 겹이 엇갈리는 길 · 0.85초마다 나를 겨눈 느린 구체 셋(부채꼴)
 obsSpiralU(m,o,dt,D,p){m.st2-=dt;m.sp2=(m.sp2||0)+dt;m.sf=(m.sf||0)-dt;const N=m.hp<m.mh*.5?4:3;
  if(m.st2<=0){m.st2=.13;m.vn=(m.vn||0)+1;const dir=m.sp2<1.4?1:-1,step=(.34+.2*Math.sin(m.sp2*2.4+(m.sseed||0)))*dir;m.sa+=step*(m.fl||1);const odd=m.vn%2;
   for(let k=0;k<N;k++){const q=this.mbShot(o.ax,o.ay,m.sa+k*6.283/N,odd?150:200,D(16),'나선 구체',m,'vdOrb');if(odd){q.av=-.65*dir;q.o.setTint(0xe0c0ff)}}}
  if(m.sf<=0){m.sf=.85;const a=Math.atan2(p.y-o.ay,p.x-o.ax);for(const da of[-.2,0,.2]){const q=this.mbShot(o.ax,o.ay,a+da,125,D(14),'나선 구체',m,'vdOrb');q.o.setTint(0xffb0d0).setScale(1.15)}}}
 // 고리: 14발 · 빠름/느림이 번갈아 · 서로 반대로 휨 → 꼬인 두 겹 고리
 obsNRing(m,o,D,a0){for(let i=0;i<14;i++){const f=i%2,q=this.mbShot(o.ax,o.ay,a0+i/14*6.283,f?210:150,D(16),'나선 구체',m,'vdOrb');q.av=f?.45:-.45;if(!f)q.o.setTint(0xe0c0ff)}}
 // 끊지 못한 촉수: 다음 패턴이 끝날 때까지 남아 위에서 내려찍음
 obsLingerStart(m,L){m.lg={ph:0,list:L.map((q,i)=>({i:q.i,sd:q.i%2?1:-1,st:'hover',t:.7+i*.55,tx:q.tx,ty:q.ty,x:q.tx,y:q.ty}))};this.dtx(m.x,m.y-70,'남은 촉수가 위에서 내려찍는다!','#ff9ac0')}
 obsLingerEnd(m){if(!m.lg)return;const o=this.obsNOff(m);for(const t of m.lg.list)if(!t.dead)for(let i=0;i<5;i++){const b=this.add.circle(t.x,t.y,2,0x9a70d0).setDepth(12);this.tweens.add({targets:b,x:o.ax,y:o.ay,alpha:0,duration:350,onComplete:()=>b.destroy()})}m.lg=null}
 obsLingerU(m,dt,o,g,D,p){const L=m.lg;if(!L)return;if(!m.on||m.st=='grabW'||m.st=='grab'||m.st=='rev'){this.obsLingerEnd(m);return}
  if(L.ph==0&&m.st!='idle')L.ph=1;else if(L.ph==1&&m.st=='idle'){this.obsLingerEnd(m);return}
  const now=this.time.now;
  for(const t of L.list){if(t.dead)continue;t.t-=dt;
   if(t.st=='hover'){const a=-Math.PI/2+t.sd*(.5+.15*Math.sin(now/300+t.i));t.x=o.ax+Math.cos(a)*70;t.y=o.ay+Math.sin(a)*70;if(t.t<=0){t.st='aim';t.t=.75;t.tx=Phaser.Math.Clamp(p.x,60,740);t.ty=Phaser.Math.Clamp(p.y,70,300);
     this.telAdd({k:'c',x:t.tx,y:t.ty,r:34,sy:.8,t:.75,dmg:D(16),src:'촉수 내려찍기',m,fx:0,on:()=>{if(t.dead)return;this.gdkDust?this.gdkDust(t.tx,t.ty,8):0;this.cameras.main.shake(90,.003)}})}}
   else if(t.st=='aim'){const k=1-t.t/.75;t.x=t.tx;t.y=t.ty-150-20*k;if(t.t<=.12){t.st='slam';t.t=.12}}
   else if(t.st=='slam'){const k=1-Math.max(0,t.t)/.12;t.x=t.tx;t.y=t.ty-170+170*k;if(t.t<=0){t.st='lie';t.t=.55;t.x=t.tx;t.y=t.ty}}
   else if(t.st=='lie'){t.x=t.tx;t.y=t.ty;if(this.pprj)for(const q of this.pprj){if(q.t<=0)continue;if(Math.hypot(q.x-t.x,q.y-t.y)<20){q.t=0;this.obsLingerCut(m,t);break}}if(!t.dead&&t.t<=0){t.st='hover';t.t=1.3}}
   if(t.dead)continue;
   // 그리기: 입구에서 위로 높이 휘었다가 끝으로
   const cx=(o.ax+t.x)/2,cy=Math.min(o.ay,t.y)-(t.st=='hover'?40:110),pts=[];for(let j=0;j<=16;j++){const s=j/16,u=1-s;pts.push([u*u*o.ax+2*u*s*cx+s*s*t.x,u*u*o.ay+2*u*s*cy+s*s*t.y])}
   this.obsTent(g,pts,t.st=='lie'?1:2,now,t.sd);if(t.st=='lie'){g.lineStyle(2,0xffe066,.5+.4*Math.sin(now/70)).strokeCircle(t.x,t.y,12)}}
  if(L.list.every(t=>t.dead))m.lg=null}
 obsLingerCut(m,t){t.dead=1;this.dtx(t.x,t.y-14,'촉수를 끊었다','#ffe066');for(let i=0;i<8;i++){const a=Math.random()*6.283,b=this.add.circle(t.x,t.y,2,0x9a70d0).setDepth(12);this.tweens.add({targets:b,x:t.x+Math.cos(a)*24,y:t.y+Math.sin(a)*16,alpha:0,duration:400,onComplete:()=>b.destroy()})}}
 // 물기: 잡기 중 촉수 + 내려찍고 누워 있는 촉수
 obsNBite(m,fx,fy){const p=this.pl,R=C.BITE.range+10;let hit=0;
  if(m.lg)for(const t of m.lg.list){if(t.dead||t.st!='lie')continue;const dx=t.x-p.x,dy=t.y-p.y,d=Math.hypot(dx,dy);if(d<R&&(dx*fx+dy*fy)/(d||1)>.1){this.obsLingerCut(m,t);hit=1}}
  if(!m.tn||m.st!='grab')return hit;const o=this.obsNOff(m);
  for(const q of m.tn){if(!q.on)continue;for(let s=.3;s<=1.001;s+=.1){const pp=q.pts?q.pts[Math.round(s*12)]:null,x=pp?pp[0]:o.ax+(q.x-o.ax)*s,y=pp?pp[1]:o.ay+(q.y-o.ay)*s,dx=x-p.x,dy=y-p.y,d=Math.hypot(dx,dy);if(d<R&&(dx*fx+dy*fy)/(d||1)>.1){q.hp--;hit=1;if(q.hp<=0){q.on=0;this.dtx(x,y-14,'촉수를 끊었다','#ffe066');for(let i=0;i<8;i++){const a=Math.random()*6.283,b=this.add.circle(x,y,2,0x9a70d0).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*24,y:y+Math.sin(a)*16,alpha:0,duration:400,onComplete:()=>b.destroy()})}}break}}}
  return hit}
