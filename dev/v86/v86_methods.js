 // ===== v86: 갑각 — 수정(무기물)은 막기가 아니라 공격에 싣는다 =====
 // 수정이 있으면 기본 공격(박치기/물기)이 '수정 박치기': 피해 ×1.7(갑각 3단계 ×1.9) · 재사용 +0.5초(느리지만 강함) · 맞히면 수정 1개 소모 + 수정 파편이 튀는 충돌 연출
 cryAtk(sl){const L=this.lin,cc=L.c>=2&&this.cry>0,b0=this.bdmg;if(cc)this.bdmg=b0*(L.c>=3?1.9:1.7);this.lgT=0;if(sl)this.slamF(0);else this.bite();this.bdmg=b0;
  if(cc&&this.lgT>0){this.cry--;this.bcd+=.5;this.cryFx()}}
 cryFx(){const h=this.hd||this.pl,a=this.lgA??this.ang,x=h.x+Math.cos(a)*16,y=h.y+Math.sin(a)*16,now=this.time.now;
  this.cameras.main.shake(120,.005);const r=this.add.ellipse(x,y,16,12).setStrokeStyle(3,0xdff4ff,.95).setDepth(12);this.tweens.add({targets:r,scaleX:3.4,scaleY:3.4,alpha:0,duration:300,onComplete:()=>r.destroy()});
  const f=this.add.circle(x,y,9,0xffffff,.9).setDepth(12);this.tweens.add({targets:f,scale:.2,alpha:0,duration:180,onComplete:()=>f.destroy()});
  for(let i=0;i<14;i++){const an=a+Math.PI+(Math.random()-.5)*2.6,d=26+Math.random()*34,s=this.add.triangle(x,y,0,-5,3,0,0,5,[0x9fd8ff,0xdff4ff,0xb07aff][i%3]).setDepth(12).setRotation(an);
   this.tweens.add({targets:s,x:x+Math.cos(an)*d,y:y+Math.sin(an)*d*.8+10,angle:Math.random()*360,alpha:0,duration:420+Math.random()*200,ease:'Quad.out',onComplete:()=>s.destroy()})}
  if(!(this.cfT>now)){this.cfT=now+2500;this.dtx(x,y-22,'수정 박치기!','#9fd8ff')}}
 // ===== v86: 정동 집게왕 — 수정 기둥에서 무기물이 떨어져 나온다 =====
 gdkShardFly(x0,y0,n){for(let i=0;i<n;i++){const a=Math.random()*6.283,d=34+Math.random()*30,tx=Phaser.Math.Clamp(x0+Math.cos(a)*d,64,736),ty=Phaser.Math.Clamp(y0+20+Math.sin(a)*d*.6,70,298);
   const o=this.add.image(x0,y0-30,'f_c').setDepth(9.5).setScale(1.2);const st={t:0};
   this.tweens.add({targets:st,t:1,duration:520+i*60,ease:'Sine.out',onUpdate:()=>{const k=st.t;o.setPosition(x0+(tx-x0)*k,(y0-30)+(ty-(y0-30))*k-Math.sin(k*Math.PI)*34).setRotation(k*7)},
    onComplete:()=>{o.destroy();const a2=this.cur;if(!this.mbOn||a2.food.filter(f=>f.on).length>=8)return;const f={t:'c',x:tx,y:ty,c:-1,r:-1,p:0,on:1};f.spr=this.add.image(tx,ty,'f_c').setDepth(5);a2.food.push(f);this.gdkDust(tx,ty,4);
     this.tweens.add({targets:f.spr,y:ty-6,duration:110,yoyo:true})}})}}
