 // ===== v98: 진화 나무 화면 없앰 (T 키 · 퀘스트 패널 누르기 · 게임 설명 버튼 모두) =====
 treeOpen(){return}
 // ===== v98: 수정 알을 플레이어 둘레 사방에 고르게 던짐 → 새끼 게가 여러 방향에서 다가옴 =====
 gdkLay(m){const p=this.pl,n=m.ph==2?6:5,a0=Math.random()*6.283;
  for(let i=0;i<n;i++)this.time.delayedCall(i*110,()=>{if(!m.on)return;let tx,ty,k=0;
   do{const a=a0+i/n*6.283+(Math.random()-.5)*.5,r=150+Math.random()*80;tx=Phaser.Math.Clamp(p.x+Math.cos(a)*r,70,730);ty=Phaser.Math.Clamp(p.y+Math.sin(a)*r*.75,80,300);k++}while(k<6&&m.pt.some(q=>q.on&&Math.hypot(q.x-tx,q.y-ty)<40));
   const d=Math.hypot(tx-m.x,ty-m.y),o=this.add.image(m.x,m.y+24,'gdkEgg').setDepth(11).setScale(1.1),e={x:tx,y:ty,t:4,o,live:0,hp:1};m.eggs.push(e);const st={k:0},x0=m.x,y0=m.y+24,h=50+d*.25;
   for(let j=0;j<3;j++){const b=this.add.circle(x0+(Math.random()-.5)*20,y0,2,0xbff0ff,.8).setDepth(12);this.tweens.add({targets:b,y:y0-12,alpha:0,duration:250,onComplete:()=>b.destroy()})}
   this.tweens.add({targets:st,k:1,duration:520+d*.9,ease:'Sine.out',onUpdate:()=>{o.setPosition(x0+(tx-x0)*st.k,y0+(ty-y0)*st.k-Math.sin(st.k*Math.PI)*h).setRotation(st.k*9)},onComplete:()=>{o.setRotation(0);e.live=1;this.gdkDust(tx,ty,4)}})})}
 // 새끼 게 이동: 플레이어 쪽 + 수정 기둥을 비켜 돌아감
 gdkKidStep(m,k,p,v){let dx=p.x-k.x,dy=p.y-k.y;const d=Math.hypot(dx,dy)||1;dx/=d;dy/=d;
  for(const q of m.pt){if(!q.on)continue;const qx=k.x-q.x,qy=k.y-q.y,qd=Math.hypot(qx,qy)||1;if(qd<56){const w=(56-qd)/56*2.2,sx=-dy,sy=dx,sd=(qx*sx+qy*sy)>=0?1:-1;dx+=qx/qd*w*.6+sx*sd*w;dy+=qy/qd*w*.6+sy*sd*w}}
  const l=Math.hypot(dx,dy)||1;k.x+=dx/l*v+(Math.random()-.5)*1.2;k.y+=dy/l*v*.85;
  for(const q of m.pt){if(!q.on)continue;const qx=k.x-q.x,qy=k.y-q.y,qd=Math.hypot(qx,qy);if(qd<24&&qd>.01){k.x=q.x+qx/qd*24;k.y=q.y+qy/qd*24}}return d}
 // 돌진에 깔린 새끼 게: 뒤집히며 빙글 돌다 부스러짐
 gdkKidDie(k){k.dead=1;const o=k.o;o.setFlipY(true).setTintFill(0xdff4ff);this.time.delayedCall(70,()=>{if(o.active)o.setTint(0x8ab0e0)});
  this.tweens.add({targets:o,y:o.y-14,angle:(Math.random()<.5?-1:1)*220,duration:260,ease:'Quad.out',onComplete:()=>this.tweens.add({targets:o,y:o.y+18,alpha:0,scale:.08,duration:300,ease:'Quad.in',onComplete:()=>o.destroy()})});
  for(let i=0;i<6;i++){const a=Math.random()*6.283,b=this.add.triangle(k.x,k.y,0,-2.5,2,1.5,-2,1.5,0xbff0ff).setDepth(12).setRotation(a);this.tweens.add({targets:b,x:k.x+Math.cos(a)*16,y:k.y+Math.sin(a)*12,alpha:0,angle:180,duration:360,onComplete:()=>b.destroy()})}}
