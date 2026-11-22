 // ===== v91: 정동 집게왕 — 벽을 기어올라 천장에서 종유석을 쏟아붓고, 플레이어 위로 떨어진다 =====
 // clW(벽 앞으로) → cl(기어오름 0.9초) → ceil(천장 3.4초: 종유석 12개, 그림자 0.9초 예고, 떨어진 자리는 9초 동안 임시 기둥 최대 4개) → dropW(플레이어 위 그림자 1초) → land(착지 1.1초 빈틈)
 // 벽·천장에 있는 동안(m.air)은 공격이 닿지 않음
 gdkClimb(m){m.st='clW';m.tm=2.2;m.clc=this.time.now+16000;this.tel=this.tel.filter(q=>q.m!==m);this.dtx(m.x,m.y-70,'벽을 기어오른다','#c8b0ff')}
 gdkDrop(m,D,i){const p=this.pl,lead=i%3==0;let x,y,k=0;
  do{x=lead?p.x+p.body.velocity.x*.5+(Math.random()-.5)*30:80+Math.random()*640;y=lead?p.y+p.body.velocity.y*.5+(Math.random()-.5)*20:90+Math.random()*210;k++}while(k<8&&m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<52));
  x=Phaser.Math.Clamp(x,70,730);y=Phaser.Math.Clamp(y,80,300);const t=.9;
  this.telAdd({k:'c',x,y,r:24,sy:.8,t,dmg:D(18),src:'떨어지는 종유석',m,fx:0,on:()=>this.gdkStal(m,x,y)});
  this.time.delayedCall((t-.2)*1000,()=>{if(!m.on)return;const o=this.add.image(x,y-220,'gdkP').setFlipY(true).setScale(.75).setTint(0xd8d0f0).setDepth(13);this.tweens.add({targets:o,y:y-10,duration:200,ease:'Quad.in',onComplete:()=>o.destroy()})})}
 gdkStal(m,x,y){if(!m.on)return;this.gdkDust(x,y,8);this.cameras.main.shake(80,.004);const p=this.pl;
  for(let i=0;i<6;i++){const a=Math.random()*6.283,b=this.add.rectangle(x,y,3,6,0xd8d0f0).setRotation(a).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*26,y:y+Math.sin(a)*16,alpha:0,angle:160,duration:380,onComplete:()=>b.destroy()})}
  if(m.pt.filter(q=>q.tmp&&q.on).length<4&&Math.hypot(p.x-x,p.y-y)>34&&!m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<52)){const o=this.add.image(x,y+14,'gdkP').setOrigin(.5,.86).setDepth(8.4).setTint(0xd8d0f0).setScale(.8,.2);this.tweens.add({targets:o,scaleY:.8,duration:160,ease:'Back.out'});m.pt.push({x,y,hp:1,on:1,rt:0,tmp:1,life:9,o})}
  else if(Math.random()<.35)this.gdkShardFly(x,y,1)}
 gdkClimbU(m,dt,p,D){const now=this.time.now;
  switch(m.st){
  case 'clW':{const ty=90,dy=ty-m.y;if(Math.abs(dy)>3)m.y+=Math.sign(dy)*Math.min(Math.abs(dy),130*dt);if(Math.abs(dy)<=3||m.tm<=0){m.st='cl';m.tm=.9;m.air=1;m.cyo=0}}return 1;
  case 'cl':{const k=1-Math.max(0,m.tm)/.9;m.cyo=k*k*80;m.ca=1-k;m.wd=(m.wd||0)+dt*60;if(Math.random()<.4)this.gdkDust(m.x+(Math.random()-.5)*80,m.y-10-m.cyo,1);if(m.tm<=0){m.st='ceil';m.tm=3.4;m.dn=0;m.ca=0;this.cameras.main.shake(3400,.004);this.dtx(400,70,'천장이 울린다 — 그림자를 피할 것','#ffd0a0')}}return 1;
  case 'ceil':{m.ca=0;m.x+=Phaser.Math.Clamp(p.x-m.x,-1,1)*Math.min(Math.abs(p.x-m.x),40*dt);const e=3.4-m.tm;while(m.dn<12&&e>=.2+m.dn*.23){this.gdkDrop(m,D,m.dn);m.dn++}
    if(Math.random()<.3){const x=60+Math.random()*680,b=this.add.circle(x,40,1.5,0x8a80a8,.8).setDepth(12);this.tweens.add({targets:b,y:40+60+Math.random()*200,alpha:0,duration:600,onComplete:()=>b.destroy()})}
    if(m.tm<=0){m.st='dropW';m.tm=1.2;m.x=Phaser.Math.Clamp(p.x,110,690);m.y=Phaser.Math.Clamp(p.y-10,96,262);this.telAdd({k:'c',x:m.x,y:m.y+10,r:60,sy:.8,t:1.2,dmg:D(24),src:'떨어지는 집게왕',m});m.cyo=320;m.ca=0}}return 1;
  case 'dropW':{const k=Math.max(0,m.tm)/1.2*1;m.ca=k<.3?1:0;m.cyo=k<.3?320*(k/.3)**2:320;if(m.tm<=0){m.st='land';m.tm=1.1;m.air=0;m.cyo=0;m.ca=1;this.cameras.main.shake(350,.014);this.gdkDust(m.x,m.y+40,16);const w=this.add.ellipse(m.x,m.y+34,60,30).setStrokeStyle(3,0xd8d0f0,.9).setDepth(9);this.tweens.add({targets:w,scaleX:3.5,scaleY:3.5,alpha:0,duration:450,onComplete:()=>w.destroy()})}}return 1;
  case 'land':m.cyo=0;m.ca=1;if(m.tm<=0){m.st='idle';m.cd=.8}return 1}
  return 0}
 gdkClimbFx(m,S,g,now){S.y-=m.cyo||0;S.setAlpha(m.st=='cl'||m.st=='ceil'||m.st=='dropW'?(m.ca??1):1);if(m.st=='ceil'){g.fillStyle(0x000000,.25).fillEllipse(m.x,52,120,18)}if(m.st=='land')S.setScale(S.scaleX*1.05,S.scaleY*.92)}
