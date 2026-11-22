 // ===== v110 정동 집게왕 =====
 // 돌진이 수정 기둥을 부수며 지나감 → 부서진 기둥에서 파편 2개 (원래 기둥은 18초 뒤 다시 자람, 종유석 기둥은 사라짐)
 gdkSmash(m,q){if(!q.on)return;q.on=0;q.rt=18;if(q.tmp){q.dead=1;const o=q.o;this.tweens.add({targets:o,alpha:0,scaleY:.1,duration:200,onComplete:()=>o.destroy()})}else q.o.setVisible(false);
  this.gdkDust(q.x,q.y,10);this.cameras.main.shake(90,.004);const f=this.add.circle(q.x,q.y-20,22,0xffffff,.7).setDepth(12);this.tweens.add({targets:f,scale:1.8,alpha:0,duration:200,onComplete:()=>f.destroy()});
  for(let i=0;i<14;i++){const a=Math.random()*6.283,d=40+Math.random()*50,o=this.add.rectangle(q.x,q.y-20,3+Math.random()*3,6+Math.random()*5,[0x9fd8ff,0xdff4ff,0xb07aff][i%3]).setRotation(a).setDepth(12);
   this.tweens.add({targets:o,x:q.x+Math.cos(a)*d+m.cdx*30,y:q.y-20+Math.sin(a)*d*.7+m.cdy*20+16,angle:260,alpha:0,duration:420+Math.random()*200,ease:'Quad.out',onComplete:()=>o.destroy()})}
  this.gdkShardFly(q.x,q.y,2)}
 // 플레이어의 수정 방패에 몸 공격이 막히면 기절 (3.5초 안에는 다시 안 걸림)
 gdkStunB(m){const now=this.time.now;if(m.air||m.st=='stun'||m.st=='rip'||m.st=='cl'||m.st=='ceil'||m.st=='dropW'||m.st=='clW'||(m.sbc>now))return;m.sbc=now+3500;
  m.st='stun';m.tm=m.ph==2?1.6:2.2;m.rep=0;this.tel=this.tel.filter(q=>q.m!==m);this.cameras.main.shake(160,.004);this.gdkDust(m.x,m.y+30,10);this.dtx(m.x,m.y-70,'수정에 막혔다 — 기절! 지금 물 것','#ffe066');
  for(let i=0;i<10;i++){const a=Math.random()*6.283,o=this.add.rectangle(m.x,m.y,3,7,i%2?0x9fd8ff:0xdff4ff).setRotation(a).setDepth(12);this.tweens.add({targets:o,x:m.x+Math.cos(a)*60,y:m.y+Math.sin(a)*40,angle:200,alpha:0,duration:500,onComplete:()=>o.destroy()})}}
 // 작은 집게 → 입으로 씹기: 앞쪽 짧은 부채꼴 · 닫히는 순간 큰 턱 두 개가 두 번 씹고 부스러기
 gdkSnap(m,D){const p=this.pl,a=Math.atan2(p.y-m.y,p.x-m.x);m.st='snap';m.tm=.62;this.telAdd({k:'s',x:m.x,y:m.y,r:98,a,h:.62,t:.45,dmg:D(11),src:'집게왕의 씹기',m,on:()=>this.gdkChewFx(m,a)})}
 gdkChewFx(m,a){const mx=m.x+Math.cos(a)*34,my=m.y-44+Math.sin(a)*22,g=this.add.graphics().setDepth(12.4),st={k:0},c=Math.cos(a),s=Math.sin(a),nx=-s,ny=c;
  this.tweens.add({targets:st,k:1,duration:360,onUpdate:()=>{g.clear();const op=Math.abs(Math.cos(st.k*Math.PI*2))*16+2;for(const sg of[-1,1]){const bx=mx+nx*sg*op,by=my+ny*sg*op;
    const P=[[-14,0],[-6,-5*sg],[10,-4*sg],[18,2*sg],[6,3*sg],[-6,4*sg]].map(([u,v])=>({x:bx+c*u+nx*v*1,y:by+s*u+ny*v*1}));g.fillStyle(0x1a1030,1).fillPoints(P.map(q=>({x:q.x+1,y:q.y+1})),true);g.fillStyle(0xd8d0f0,1).fillPoints(P,true);
    for(let i=0;i<3;i++){const u=-6+i*8,tx=bx+c*u-nx*sg*5,ty=by+s*u-ny*sg*5;g.fillStyle(0xffffff,1).fillTriangle(tx-c*2,ty-s*2,tx+c*2,ty+s*2,tx-nx*sg*5,ty-ny*sg*5)}}},onComplete:()=>g.destroy()});
  for(let i=0;i<7;i++){const an=a+(Math.random()-.5)*1.6,b=this.add.rectangle(mx,my,2.5,2.5,i%2?0xc8b8a0:0x9fd8ff).setDepth(12.5);this.tweens.add({targets:b,x:mx+Math.cos(an)*(18+Math.random()*16),y:my+Math.sin(an)*(14+Math.random()*12)+8,alpha:0,duration:320,delay:120,onComplete:()=>b.destroy()})}}
 // 2페이즈: 큰 집게 휘두르기 — 집게를 높이 들고(0.85초) 넓은 부채꼴(반지름 250 · 약 130°)을 크게 휩쓴다
 gdkSweep(m,D,en){const p=this.pl,a=Math.atan2(p.y-m.y,p.x-m.x);m.st='swW';m.tm=.85*en;m.swa=a;this.telAdd({k:'s',x:m.x,y:m.y,r:250,a,h:1.15,t:m.tm,dmg:D(24),src:'큰 집게 휘두르기',m,on:()=>this.gdkSweepFx(m,a)})}
 gdkSweepFx(m,a){const sd=Math.random()<.5?1:-1,D=Phaser.Math.RadToDeg,a0=a-sd*1.15,st={k:0};this.cameras.main.shake(140,.005);
  const A=[0,1,2,3].map(j=>{const o=this.add.arc(m.x,m.y,150+j*26,D(a0),D(a0),sd<0).setStrokeStyle(13-j*3,j<2?0xffffff:0xbfe0ff,1-j*.15).setDepth(12.3);o.closePath=false;o.isFilled=false;return o});
  this.tweens.add({targets:st,k:1,duration:260,ease:'Quad.out',onUpdate:()=>{const e=D(a0+sd*2.3*st.k);A.forEach(o=>o.setEndAngle(e))},onComplete:()=>this.tweens.add({targets:A,alpha:0,duration:300,onComplete:()=>A.forEach(o=>o.destroy())})});
  for(let i=0;i<10;i++){const an=a-1.15+2.3*i/9,r=170+Math.random()*70;this.time.delayedCall(i*20,()=>this.gdkDust(m.x+Math.cos(an)*r,m.y+Math.sin(an)*r*.8,2))}}
