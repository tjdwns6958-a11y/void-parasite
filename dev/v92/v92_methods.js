 // ===== v92: 정동 집게왕 — 수정 알과 새끼 게 · 공격 사이클(3가지 → 마지막에 돌진) =====
 // 사이클: 1페이즈 벽 오르기·종유석 → 수정 알 → 집게 공격(가까우면 내리찍기, 멀면 가시 파도) → 돌진 / 2페이즈 수정 알 → 돌알 던지기 → 벽 오르기 → 돌진 2연속
 // 수정 알: 웅크렸다 알 3개(2페이즈 4개)를 포물선으로 낳음 → 4초 뒤 새끼 게가 깨어나 쫓아와 달라붙음(느려짐 + 초당 피해) · 알은 물거나 쏴서 깨면 무기물
 //   달라붙은 새끼 게: 공격 버튼 한 번에 하나씩 떼어냄 · 대시로 한 번에 털어냄 · 최대 3마리
 gdkEggTex(){if(this.textures.exists('gdkEgg'))return;tex(this,'gdkEgg',10,12,2,x=>{const g=x.createRadialGradient(4,4,1,5,6,6);g.addColorStop(0,'#ffffff');g.addColorStop(.35,'#bff0ff');g.addColorStop(.75,'#5aa8e0');g.addColorStop(1,'#2a4a8a');x.fillStyle=g;x.beginPath();x.ellipse(5,6.5,4.4,5.4,0,0,6.283);x.fill();
  x.strokeStyle='#1a2a5a';x.lineWidth=1;x.beginPath();x.ellipse(5,6.5,4.4,5.4,0,0,6.283);x.stroke();x.strokeStyle='rgba(255,255,255,.7)';x.beginPath();x.moveTo(5,2);x.lineTo(3,7);x.lineTo(5,11);x.stroke();x.fillStyle='#b07aff';x.fillRect(6,7,1,2)})}
 gdkEgg(m){this.gdkEggTex();m.st='egg';m.tm=1;m.lay=0;this.dtx(m.x,m.y-70,'수정 알을 낳는다','#bff0ff')}
 gdkLay(m){const p=this.pl,n=m.ph==2?4:3;for(let i=0;i<n;i++){const a=Math.random()*6.283,r=i==0?40:60+Math.random()*90,tx=Phaser.Math.Clamp((i<n-1?p.x:m.x)+Math.cos(a)*r,70,730),ty=Phaser.Math.Clamp((i<n-1?p.y:m.y+60)+Math.sin(a)*r*.6,80,300);
   const o=this.add.image(m.x,m.y+20,'gdkEgg').setDepth(9).setScale(1.1),e={x:tx,y:ty,t:4,o,live:0};m.eggs.push(e);const st={k:0},x0=m.x,y0=m.y+20;
   this.tweens.add({targets:st,k:1,duration:480+i*60,ease:'Sine.out',onUpdate:()=>{o.setPosition(x0+(tx-x0)*st.k,y0+(ty-y0)*st.k-Math.sin(st.k*Math.PI)*50)},onComplete:()=>{e.live=1;this.gdkDust(tx,ty,4)}})}}
 gdkKidsU(m,dt,p,D){const now=this.time.now;
  for(const e of m.eggs){if(!e.live||e.dead)continue;e.t-=dt;const w=e.t<1.2?Math.sin(now/40)*.18:Math.sin(now/200)*.06;e.o.setRotation(w).setScale(1.1+(e.t<1.2?.08*Math.sin(now/30):0));if(e.t<1.2&&Math.floor(now/90)%2)e.o.setTintFill(0xffffff);else e.o.clearTint();
   if(e.t<=0){e.dead=1;e.o.destroy();for(let i=0;i<6;i++){const a=Math.random()*6.283,b=this.add.rectangle(e.x,e.y,2,4,0xbff0ff).setRotation(a).setDepth(12);this.tweens.add({targets:b,x:e.x+Math.cos(a)*14,y:e.y+Math.sin(a)*10,alpha:0,duration:300,onComplete:()=>b.destroy()})}
    m.kids.push({x:e.x,y:e.y,life:9,wd:0,o:this.add.image(e.x,e.y,'gdkB0').setScale(.2).setDepth(9.2).setTint(0xbfe8ff)})}}
  m.eggs=m.eggs.filter(e=>!e.dead);
  const sp=m.ph==2?110:95;
  for(const k of m.kids){if(k.dead)continue;k.life-=dt;const dx=p.x-k.x,dy=p.y-k.y,d=Math.hypot(dx,dy)||1;const v=sp*dt;k.x+=dx/d*v+(Math.random()-.5)*1.5;k.y+=dy/d*v*.85;k.wd+=v;k.o.setPosition(k.x,k.y).setFlipX(dx<0).setTexture('gdkB'+(Math.floor(k.wd/5)%4));
   if(d<14){k.dead=1;k.o.destroy();if(this.dshI>0){this.dshDodge('새끼 게');continue}if((m.latch||0)<3){m.latch=(m.latch||0)+1;this.hurt(D(4),'수정 새끼 게',m);m.lt.push({o:this.add.image(p.x,p.y,'gdkB0').setScale(.16).setDepth(12).setTint(0xbfe8ff),a:Math.random()*6.283})}}
   else if(k.life<=0){k.dead=1;this.tweens.add({targets:k.o,alpha:0,scale:.05,duration:300,onComplete:()=>k.o.destroy()})}}
  m.kids=m.kids.filter(k=>!k.dead);
  // 구체로 알·새끼 깨기
  if(this.pprj)for(const q of this.pprj){if(q.t<=0)continue;for(const e of m.eggs)if(e.live&&!e.dead&&Math.hypot(e.x-q.x,e.y-q.y)<12){q.t=0;this.gdkEggBreak(m,e)}for(const k of m.kids)if(!k.dead&&Math.hypot(k.x-q.x,k.y-q.y)<12){q.t=0;this.gdkKidKill(k)}}
  m.kids=m.kids.filter(k=>!k.dead);m.eggs=m.eggs.filter(e=>!e.dead);
  // 달라붙은 새끼 게: 느려짐 + 초당 피해 · 대시로 털어냄
  if(m.latch>0){this.slow=Math.max(this.slow||0,.12);m.ltT=(m.ltT??1)-dt;if(m.ltT<=0){m.ltT=1;if(!(this.dshI>0)){const n=D(2)*m.latch;this.en-=n*(this.dmt||1);this.lastHit={src:'달라붙은 새끼 게',t:now};this.dtx(p.x,p.y-20,'-'+Math.round(n),'#bfe8ff')}}
   m.lt.forEach((l,i)=>{l.a+=dt*2;l.o.setPosition(p.x+Math.cos(l.a+i*2.1)*9,p.y+Math.sin(l.a+i*2.1)*6-2).setFlipX(Math.cos(l.a+i*2.1)>0)});
   if(this.dshT>0){this.gdkShake(m,m.latch);this.dtx(p.x,p.y-26,'털어냈다','#bfe8ff')}}}
 gdkShake(m,n){const p=this.pl;for(let i=0;i<n&&m.lt.length;i++){const l=m.lt.pop(),o=l.o,a=Math.random()*6.283;this.tweens.add({targets:o,x:p.x+Math.cos(a)*40,y:p.y+Math.sin(a)*28,alpha:0,angle:360,duration:380,onComplete:()=>o.destroy()})}m.latch=m.lt.length}
 gdkEggBreak(m,e){e.dead=1;e.o.destroy();const L=this.lin;if(L.c>=2&&this.cry<3)this.cry++;this.en=Math.min(this.emax,this.en+4);this.dtx(e.x,e.y-14,'알을 깼다 — 무기물','#9fd8ff');for(let i=0;i<8;i++){const a=Math.random()*6.283,b=this.add.triangle(e.x,e.y,0,-3,2,0,0,3,0x9fd8ff).setRotation(a).setDepth(12);this.tweens.add({targets:b,x:e.x+Math.cos(a)*18,y:e.y+Math.sin(a)*12,alpha:0,duration:320,onComplete:()=>b.destroy()})}}
 gdkKidKill(k){k.dead=1;const o=k.o;o.setTintFill(0xffffff);this.tweens.add({targets:o,alpha:0,scale:.3,duration:200,onComplete:()=>o.destroy()})}
 gdkBite(m,fx,fy){const p=this.pl,R=C.BITE.range+12;if(m.latch>0){this.gdkShake(m,1);this.dtx(p.x,p.y-24,'떼어냈다','#bfe8ff');return 1}let hit=0;
  for(const e of m.eggs){if(!e.live||e.dead)continue;const dx=e.x-p.x,dy=e.y-p.y,d=Math.hypot(dx,dy);if(d<R&&(dx*fx+dy*fy)/(d||1)>.1){this.gdkEggBreak(m,e);hit=1}}
  for(const k of m.kids){if(k.dead)continue;const dx=k.x-p.x,dy=k.y-p.y,d=Math.hypot(dx,dy);if(d<R&&(dx*fx+dy*fy)/(d||1)>.1){this.gdkKidKill(k);hit=1}}
  m.eggs=m.eggs.filter(e=>!e.dead);m.kids=m.kids.filter(k=>!k.dead);return hit}
