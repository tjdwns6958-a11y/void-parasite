 // ===== v79: 허기의 왕관 — 흩어짐 단계를 쌍 단위로: 쌍마다 공격 텀(번갈아 덮침) · 1쌍은 두 번 돌진 대신 X자로 엇갈려 지나감 =====
 // 쌍 k = 턱 k와 k+3 (서로 반대편). 처음 0.3 / 0.9 / 1.5초에 차례로, 그 뒤 쌍마다 1.8 / 2.4 / 2.0(난이도 단계마다 −0.2)초 간격
 hcPair(m,k,en){const A=m.jw[k],B=m.jw[k+3];m.pn[k]++;
  if(k==0&&m.pn[0]>=2&&m.cxN<2){m.cxN++;this.hcCross(m,A,B,en);return}
  this.hcLunge(m,A,en);this.hcLunge(m,B,en)}
 hcCross(m,A,B,en){const p=this.pl,L=125,P={x:Phaser.Math.Clamp(p.x+p.body.velocity.x*.15,90,710),y:Phaser.Math.Clamp(p.y+p.body.velocity.y*.15,80,280)},a=Math.random()*3.14,
   e=an=>[Phaser.Math.Clamp(P.x+Math.cos(an)*L,50,750),Phaser.Math.Clamp(P.y+Math.sin(an)*L*.8,50,310)],w=30*(1+.18*(m.gr||0));
  let tt=0;const go=(J,an)=>{const s=e(an),t2=e(an+Math.PI);J.st='go';J.tx=s[0];J.ty=s[1];J.cx=t2;tt=Math.max(tt,Math.hypot(s[0]-J.x,s[1]-J.y)/400)};
  go(A,a);go(B,a+Math.PI/2);const t=Math.max(.7,tt+.3)*en;
  for(const J of[A,B])this.telAdd({k:'l',x:J.tx,y:J.ty,x2:J.cx[0],y2:J.cx[1],w,t,src:'',fx:0,on:()=>{if(m.st!='scatter'||!m.on)return;J.st='lunge';J.v=720;J.tx=J.cx[0];J.ty=J.cx[1]}});
  this.dtx(P.x,P.y-30,'엇갈림!','#ffb0d0')}
