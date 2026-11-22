 // ===== v85: 기본 대시 (처음부터) — C 키 / 터치 '대시' 버튼(690,318) =====
 // 앞으로 78px(0.16초) · 0.3초 무적 → 공격 1회를 피함 · 재사용 2.5초
 // 완벽 회피: 공격이 닿기 직전(대시 시작 0.2초 안)에 피하면 '완벽 회피!' — 0.25초 느려지는 연출 + 재사용 절반 즉시 회복
 dshU(dt,k){this.dshCd=Math.max(0,(this.dshCd||0)-dt);if(this.dshI>0)this.dshI-=dt;
  const jd=this.dshReq||Phaser.Input.Keyboard.JustDown(k.C);this.dshReq=0;
  if(jd&&this.dshCd<=0&&!this.molt&&!this.tr&&!this.cine&&!this.over){const p=this.pl;let a=this.ang;if(Math.hypot(this.jx||0,this.jy||0)>.2)a=Math.atan2(this.jy,this.jx);
   this.dshA=a;this.dshT=.16;this.dshI=.3;this.dshT0=this.time.now;this.dshP=0;this.dshCd=2.5;this.ang=a;this.dshFx(p.x,p.y,a)}
  this.dshBtn()}
 dshFx(x,y,a){const parts=[this.hd,...this.sg].filter(o=>o&&o.visible);
  for(let i=0;i<3;i++)this.time.delayedCall(i*45,()=>{for(const o of parts){const g=this.add.image(o.x,o.y,o.texture.key).setRotation(o.rotation).setScale(o.scaleX,o.scaleY).setDepth(8.7).setTintFill(0xc8a8ff).setAlpha(.45-.1*i);this.tweens.add({targets:g,alpha:0,duration:260,onComplete:()=>g.destroy()})}});
  for(let i=0;i<5;i++){const s=this.add.rectangle(x-Math.cos(a)*(6+i*5)+(Math.random()-.5)*10,y-Math.sin(a)*(6+i*5)+(Math.random()-.5)*10,10+Math.random()*8,1.6,0xffffff,.7).setRotation(a).setDepth(12);this.tweens.add({targets:s,x:s.x-Math.cos(a)*24,y:s.y-Math.sin(a)*24,alpha:0,duration:240,onComplete:()=>s.destroy()})}}
 dshDodge(src){const now=this.time.now,p=this.pl;if(!(this.dshDt>now)){this.dshDt=now+250;this.dtx(p.x,p.y-24,'회피','#d8c8ff')}
  if(!this.dshP&&now-(this.dshT0||0)<=200){this.dshP=1;this.dshCd=Math.max(0,this.dshCd-1.25);this.slowMo=.25;this.dtx(p.x,p.y-40,'완벽 회피!','#ffe066');this.cameras.main.flash(120,255,240,190);
   const r=this.add.circle(p.x,p.y,10).setStrokeStyle(3,0xffe066,.9).setDepth(12);this.tweens.add({targets:r,scale:3.2,alpha:0,duration:380,onComplete:()=>r.destroy()})}}
 dshBtn(){const g=this.dshG||(this.dshG=this.add.graphics().setDepth(60));g.clear();if(!this.dshTx)this.dshTx=this.add.text(690,318,'',ST({fontSize:'10px',fontStyle:'bold',color:'#ffffff',align:'center'})).setOrigin(.5).setDepth(61);
  const vis=!this.cine&&!this.molt&&!this.over&&!!(this.atx&&this.atx.visible);this.dshTx.setVisible(vis);if(!vis)return;const x=690,y=318,r=22,cd=this.dshCd||0,rd=cd<=0;
  g.fillStyle(rd?0x7a5ad0:0x241c38,rd?.75:.55).fillCircle(x,y,r);g.lineStyle(1.5,rd?0xe0c8ff:0x5a4a7a,.9).strokeCircle(x,y,r);if(!rd)g.lineStyle(3,0x9ff0ff,.9).beginPath().arc(x,y,r-2,-Math.PI/2,-Math.PI/2+6.283*(1-cd/2.5),false).strokePath();
  const t=this.sys.game.device.input.touch?'대시':'대시\nC';if(this.dshTx.text!==t)this.dshTx.setText(t);this.dshTx.setAlpha(rd?1:.55)}
