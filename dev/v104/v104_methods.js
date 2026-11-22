 // ===== v104 =====
 // 종유석 크기 셋: 작은(0.7) · 중간(1) · 큰(1.4) — 크기에 따라 낙하 범위(반지름 17/24/34) · 피해 · 예고 시간 · 그림 크기가 다름
 gdkDrop(m,D,i){const p=this.pl,lead=i%3==0;let x,y,k=0;
  do{x=lead?p.x+p.body.velocity.x*.5+(Math.random()-.5)*30:80+Math.random()*640;y=lead?p.y+p.body.velocity.y*.5+(Math.random()-.5)*20:90+Math.random()*210;k++}while(k<8&&m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<52));
  x=Phaser.Math.Clamp(x,70,730);y=Phaser.Math.Clamp(y,80,300);const r=Math.random(),sz=lead?1:r<.4?.7:r<.75?1:1.4,t=.75+.18*sz,R=Math.round(24*sz);
  this.telAdd({k:'c',x,y,r:R,sy:.8,t,dmg:D(Math.round(18*(.6+.4*sz))),src:'떨어지는 종유석',m,fx:0,on:()=>this.gdkStal(m,x,y,sz)});
  const sh=this.add.ellipse(x,y,R*2.1,R*1.7,0x000000,1).setDepth(1.54).setAlpha(.18).setScale(.3),rim=this.add.ellipse(x,y,R*2.1,R*1.7).setStrokeStyle(1.5,0xe8e0ff,.6).setDepth(1.545).setScale(.3);
  this.gdkStlTex();const H=100*.9*sz,o=this.add.image(x,y-260,'gdkStl').setOrigin(.5,1).setScale(.9*sz).setTint(0x3a3058).setDepth(13).setAlpha(0),tr=this.add.graphics().setDepth(12.9),st={k:0};
  this.tweens.add({targets:o,alpha:1,duration:220});
  this.tweens.add({targets:st,k:1,duration:t*1000,ease:'Quad.in',onUpdate:()=>{const q=st.k;o.setY(y-260+250*q);sh.setScale(.3+.7*q).setAlpha(.18+.6*q);rim.setScale(.3+.7*q).setAlpha(.6*(1-q*.5));
    const c=Phaser.Display.Color.Interpolate.ColorWithColor({r:58,g:48,b:88},{r:255,g:255,b:255},1,q);o.setTint(Phaser.Display.Color.GetColor(c.r,c.g,c.b));
    tr.clear();if(q>.15){tr.lineStyle(2,0xe8e0ff,.25+.35*q);for(const dx of[-6,0,6])tr.lineBetween(x+dx*sz,o.y-H-8-60*q,x+dx*sz,o.y-H-8)}},
   onComplete:()=>{o.destroy();tr.destroy();this.tweens.add({targets:[sh,rim],alpha:0,duration:180,onComplete:()=>{sh.destroy();rim.destroy()}})}})}
 // 떨어짐: 흔들림은 큰 종유석만 아주 약하게 · 작은 것은 부서져 흩어지고(기둥 없음) · 중간·큰 것은 크기만큼 임시 기둥
 gdkStal(m,x,y,sz){if(!m.on)return;sz=sz||1;this.gdkDust(x,y,Math.round(6*sz));if(sz>=1.3)this.cameras.main.shake(70,.0016);const p=this.pl;
  for(let i=0;i<Math.round(6*sz);i++){const a=Math.random()*6.283,b=this.add.rectangle(x,y,3,6,i%3?0xd8d0f0:0x9fd8ff).setRotation(a).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*26*sz,y:y+Math.sin(a)*16*sz,alpha:0,angle:160,duration:380,onComplete:()=>b.destroy()})}
  if(sz>=1&&m.pt.filter(q=>q.tmp&&q.on).length<4&&Math.hypot(p.x-x,p.y-y)>34*sz&&!m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<52)){const s0=.8*Math.min(1.2,sz),o=this.add.image(x,y+14,'gdkP').setOrigin(.5,.86).setDepth(8.4).setTint(0xd8d0f0).setScale(s0,.2);this.tweens.add({targets:o,scaleY:s0,duration:160,ease:'Back.out'});m.pt.push({x,y,hp:1,on:1,rt:0,tmp:1,life:9,o})}
  else if(Math.random()<.35)this.gdkShardFly(x,y,1)}
 // 2페이즈: 등의 정동이 뜯겨 나가며 산산조각 (굴리기·불러들여 던지기 없음)
 gdkGeoBreak(m){const x=m.x,y=m.y-40,o=this.add.image(x,y+6,'gdkG').setDepth(9.4);
  this.tweens.add({targets:o,y:y-26,scale:1.15,duration:220,ease:'Quad.out',onComplete:()=>{o.destroy();const f=this.add.circle(x,y-26,26,0xffffff,.8).setDepth(13);this.tweens.add({targets:f,scale:2,alpha:0,duration:240,onComplete:()=>f.destroy()});
    for(let i=0;i<16;i++){const a=i/16*6.283+Math.random()*.3,d=50+Math.random()*80,b=this.add.rectangle(x,y-26,4+Math.random()*4,3+Math.random()*3,[0xffd080,0xc8a0ff,0x9fd8ff,0x8a6a4a][i%4]).setRotation(a).setDepth(13);
     this.tweens.add({targets:b,x:x+Math.cos(a)*d,y:y-26+Math.sin(a)*d*.7+30,angle:300,alpha:0,duration:520+Math.random()*200,ease:'Quad.out',onComplete:()=>b.destroy()})}}})}
 // 통째 삼키기 모션: 위아래 이빨 턱(반달 두 개)이 대상 둘레에서 벌어졌다가 콱 맞물림 + 흰 번쩍 고리 · 크기는 대상 크기에 맞춤
 dvU(dt){const D=this.dvr,g=this.dvG||(this.dvG=this.add.graphics().setDepth(12.5));g.clear();if(!D)return;if(this.over||D.rm!==this.cur){this.dvr=null;return}D.t+=dt;const m=D.m;if(m&&m.on&&m.spr){D.x=m.x;D.y=m.y}
  const T=D.t,R=Math.max(24,Math.min(62,(m&&m.br?m.br*.9:0)||(m?26:22))),op=T<.12?1:T<.22?1-(T-.12)/.1:0,al=T<.06?T/.06:T<.3?1:Math.max(0,1-(T-.3)/.15),c=Math.cos(D.an),s=Math.sin(D.an),W=(lx,ly)=>[D.x+lx*c-ly*s,D.y+lx*s+ly*c];
  if(al>0)for(const sg of[-1,1]){const gap=sg*R*.85*op,a0=sg<0?Math.PI+.3:.3,a1=sg<0?2*Math.PI-.3:Math.PI-.3,N=14,out=[],inn=[];
   for(let i=0;i<=N;i++){const a=a0+(a1-a0)*i/N;out.push(W(Math.cos(a)*R,Math.sin(a)*R*.8+gap));inn.push(W(Math.cos(a)*R*.62,Math.sin(a)*R*.5+gap))}
   const poly=out.concat(inn.reverse()).map(([x,y])=>({x,y}));g.fillStyle(0x2a0a1a,al).fillPoints(poly.map(q=>({x:q.x+(q.x-D.x)*.08,y:q.y+(q.y-D.y)*.08})),true);g.fillStyle(0xff7a9a,al).fillPoints(poly,true);
   g.lineStyle(1.5,0xffd0e0,al*.8).beginPath();g.moveTo(out[0][0],out[0][1]);for(const q of out)g.lineTo(q[0],q[1]);g.strokePath();
   for(let i=1;i<6;i++){const a=a0+(a1-a0)*i/6,b=W(Math.cos(a)*R*.6,Math.sin(a)*R*.48+gap),l=W(Math.cos(a-.12)*R*.66,Math.sin(a-.12)*R*.53+gap),r=W(Math.cos(a+.12)*R*.66,Math.sin(a+.12)*R*.53+gap),tp=W(Math.cos(a)*R*.3,Math.sin(a)*R*.24+gap*.6);g.fillStyle(0xffffff,al).fillTriangle(l[0],l[1],r[0],r[1],tp[0],tp[1])}}
  if(T>=.22&&!D.done){D.done=1;const f=this.add.ellipse(D.x,D.y,R*1.6,R*1.3).setStrokeStyle(3,0xffffff,.95).setDepth(12.6);this.tweens.add({targets:f,scale:1.6,alpha:0,duration:240,onComplete:()=>f.destroy()});
   for(let i=0;i<7;i++){const a=Math.random()*6.283,b=this.add.rectangle(D.x,D.y,3,3,i%2?0xffffff:0xff9ac0).setDepth(12.6);this.tweens.add({targets:b,x:D.x+Math.cos(a)*R,y:D.y+Math.sin(a)*R*.8,alpha:0,duration:260,onComplete:()=>b.destroy()})}
   if(m&&m.on){const mh=m.mh||MON(m.k).hp,boss=m.mb||({sw:1,em:1,rw:1,qn:1,wd:1})[m.k];
    if(!boss&&m.hp<=mh*.3){this.gulp(m);this.en=Math.min(this.emax,this.en+this.emax*.25)}
    else{this.dmgM(m,this.bdmg*3);if(m.on){m.bl=3;if(m.spr){m.spr.setTintFill(0xffffff);this.time.delayedCall(90,()=>{if(m.spr)m.spr.clearTint()})}this.bmAdd(m,D.an)}this.en=Math.min(this.emax,this.en+6);this.dtx(D.x,D.y-24,'물어뜯기!','#ff9ad0')}}}
  if(T>.45)this.dvr=null}
