 // ===== v106 허기의 왕관 흩어짐: 3번째 쌍(턱 2·5)은 돌진 대신 '턱 비' 반복 =====
 // 날아올라(rUp) → 위에서 잠깐 대기(rSky) → 나를 따라 찍히는 붉은 원(0.55초) 위로 내리꽂힘(fallW) → 0.5초 박혀 있다(land) → 다시 날아오름 … 흩어짐이 끝날 때까지. 두 턱은 엇갈려서.
 hcPairRain(m,A,B,en){A.rl=1;B.rl=1;A.st='rUp';B.st='rUp';A.t=0;B.t=0;A.wt=.15;B.wt=.75}
 hcRainStrike(m,j,en){const p=this.pl,vx=p.body.velocity.x,vy=p.body.velocity.y,x=Phaser.Math.Clamp(p.x+vx*.22,60,740),y=Phaser.Math.Clamp(p.y+vy*.22,70,300),t=.55*en,D=v=>Math.round(v*m.df*(1+.15*(m.gr||0)));
  j.st='fallW';j.tx=x;j.ty=y;j.t=t;j.x=x;this.telAdd({k:'c',x,y,r:30,sy:.8,t,dmg:D(12),src:'허기의 턱 — 내리꽂기',m,fx:0,on:()=>{const r=this.add.ellipse(x,y,60,48).setStrokeStyle(2,0xffd0e0,.9).setDepth(12);this.tweens.add({targets:r,scale:1.5,alpha:0,duration:220,onComplete:()=>r.destroy()})}})}
