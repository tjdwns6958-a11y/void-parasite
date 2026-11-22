 // ===== v105 정동 집게왕 2페이즈: 정동 지뢰(수정 꽃) =====
 // 2페이즈 공격 순서 끝(돌진 바로 앞)에 '심기': 집게를 들었다 내려치면 봉오리 3개(집게왕과 나 사이 1 + 내 양옆 2)가 솟음.
 // 봉오리는 3.2초 뒤 꽃이 피며 십자(가로 240 · 세로 200)로 가시가 터짐(마지막 1초는 붉은 십자 예고). 돌진하던 집게왕이 봉오리를 밟으면 그 자리에서 터지고 집게왕이 맞아 휘청(최대 체력 4% · 1.1초).
 gdkBudTex(){if(this.textures.exists('gdkBud'))return;tex(this,'gdkBud',16,16,2,x=>{x.fillStyle='#3a2f4a';x.fillRect(3,13,10,3);x.fillStyle='#5a4a6a';x.fillRect(4,12,8,2);
  const sh=(a,b,w,h,c1,c2)=>{for(let i=0;i<h;i++){const ww=Math.max(1,Math.round(w*(1-i/h)));x.fillStyle=i<h*.3?'#ffffff':c1;x.fillRect(a-Math.floor(ww/2),b-i,ww,1);x.fillStyle=c2;x.fillRect(a+Math.ceil(ww/2)-1,b-i,1,1)}};
  sh(5,12,3,7,'#c8a0ff','#7a4ac0');sh(11,12,3,6,'#c8a0ff','#7a4ac0');sh(8,12,4,11,'#e0c8ff','#8a5ad0')})}
 gdkPlant(m){m.st='plW';m.tm=.55;this.tel=this.tel.filter(q=>q.m!==m||q.bud)}
 gdkPlantGo(m,D){const p=this.pl,ux=p.x-m.x,uy=p.y-m.y,L=Math.hypot(ux,uy)||1,nx=-uy/L,ny=ux/L,ok=(x,y)=>!m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<46)&&!(m.bd||[]).some(b=>Math.hypot(b.x-x,b.y-y)<60);
  const S=[[m.x+ux*.6,m.y+uy*.6],[p.x+nx*80,p.y+ny*60],[p.x-nx*80,p.y-ny*60]];m.bd=m.bd||[];this.gdkBudTex();this.gdkDust(m.x,m.y+40,8);this.cameras.main.shake(120,.003);
  for(let[x,y]of S){x=Phaser.Math.Clamp(x,80,720);y=Phaser.Math.Clamp(y,90,295);if(!ok(x,y)||m.bd.filter(b=>!b.done).length>=5)continue;
   const o=this.add.image(x,y,'gdkBud').setOrigin(.5,.9).setDepth(8.6).setScale(.2);this.dec.push(o);this.gdkDust(x,y,4);const b={x,y,t:0,T:3.2,o,tl:null,done:0};m.bd.push(b)}}
 gdkBudFx(b){const x=b.x,y=b.y;b.o.destroy();const f=this.add.circle(x,y-8,14,0xffffff,.85).setDepth(12);this.tweens.add({targets:f,scale:2,alpha:0,duration:200,onComplete:()=>f.destroy()});
  for(const[dx,dy,L]of[[1,0,120],[-1,0,120],[0,1,100],[0,-1,100]])for(let i=1;i<=5;i++){const sx=x+dx*L*i/5,sy=y+dy*L*i/5,s=this.add.image(sx,sy+6,'gdkBud').setOrigin(.5,.9).setDepth(8.7).setScale(.15).setTint(0xe0c8ff);
   this.tweens.add({targets:s,scale:.85,duration:90,delay:i*35,ease:'Back.out',onComplete:()=>this.tweens.add({targets:s,alpha:0,scale:.5,duration:260,delay:120,onComplete:()=>s.destroy()})})}}
 gdkBudU(m,dt,D){if(!m.bd||!m.bd.length)return;const p=this.pl,now=this.time.now;
  for(const b of m.bd){if(b.done)continue;b.t+=dt;const k=Math.min(1,b.t/1.1);b.o.setScale(.25+.75*k);if(b.t>b.T-1){b.o.setTint(Math.floor(now/90)%2?0xffffff:0xffd0f0)}
   if(!b.tl&&b.t>=b.T-1){const q1=this.telAdd({k:'l',x:Phaser.Math.Clamp(b.x-120,50,750),y:b.y,x2:Phaser.Math.Clamp(b.x+120,50,750),y2:b.y,w:22,t:1,dmg:D(16),src:'정동 지뢰',m,fx:0,bud:1,on:()=>{if(!b.done){b.done=1;this.gdkBudFx(b)}}}),q2=this.telAdd({k:'l',x:b.x,y:Phaser.Math.Clamp(b.y-100,55,305),x2:b.x,y2:Phaser.Math.Clamp(b.y+100,55,305),w:22,t:1,dmg:D(16),src:'정동 지뢰',m,fx:0,bud:1});b.tl=[q1,q2]}
   // 돌진하던 집게왕이 밟으면 그 자리에서 터지고 스스로 맞음
   if(m.st=='ch'&&Math.hypot(b.x-m.x,b.y-(m.y+30))<60){b.done=1;if(b.tl)this.tel=this.tel.filter(q=>!b.tl.includes(q));const H={k:'l',x:b.x-120,y:b.y,x2:b.x+120,y2:b.y,w:22},V={k:'l',x:b.x,y:b.y-100,x2:b.x,y2:b.y+100,w:22};
    if(this.telIn(H,p.x,p.y)||this.telIn(V,p.x,p.y))this.hurt(D(16),'정동 지뢰',m);this.gdkBudFx(b);if(!m.on)return;this.dmgM(m,m.mh*.04,1);if(!m.on)return;
    m.st='stag';m.tm=1.1;m.rep=0;this.cameras.main.shake(160,.004);this.dtx(m.x,m.y-70,'지뢰를 밟았다!','#ffe066')}}
  m.bd=m.bd.filter(b=>!b.done)}
 // ===== v105 허기의 왕관: 턱 비 · 허기 표식 =====
 // 턱 비: 턱 6개가 화면 위로 날아올랐다가, 나를 따라 찍히는 붉은 원(0.55초 예고) 위로 0.38초 간격으로 하나씩 내리꽂힘. 그동안 가운데 구멍이 열려 물 수 있음.
 hcRain(m,en){m.st='jrain';m.rn=0;m.rt=.7;m.jrc=this.time.now+11000;m.jw.forEach(j=>{j.st='up'});this.dtx(m.x,m.y-50,'턱 비 — 멈추지 말 것!','#ff5a7a')}
 hcRainU(m,dt,D,en){const p=this.pl;m.rt-=dt;
  if(m.rn<6&&m.rt<=0){const j=m.jw[m.rn],vx=p.body.velocity.x,vy=p.body.velocity.y,x=Phaser.Math.Clamp(p.x+vx*.22,60,740),y=Phaser.Math.Clamp(p.y+vy*.22,70,300),t=.55*en;
   j.st='fallW';j.tx=x;j.ty=y;j.t=t;j.x=x;this.telAdd({k:'c',x,y,r:30,sy:.8,t,dmg:D(14),src:'허기의 턱 — 내리꽂기',m,fx:0,on:()=>{this.gdkDust?this.gdkDust(x,y,6):0;const r=this.add.ellipse(x,y,60,48).setStrokeStyle(2,0xffd0e0,.9).setDepth(12);this.tweens.add({targets:r,scale:1.5,alpha:0,duration:220,onComplete:()=>r.destroy()})}});m.rn++;m.rt=.38*en}
  if(m.rn>=6&&m.rt<=-.9){m.st='crown';m.cd=1;m.jw.forEach(j=>{if(j.st!='land')j.st='ring'})}}
 // 허기 표식: 유충 2~3마리에 붉은 표식 → 왕관 쪽으로 기어감(60px/초) → 닿으면 왕관이 삼키고 커짐(최대 3) + 체력 6% 회복. 내가 먼저 먹으면 끝.
 hcMarkable(){return this.cur.food.some(f=>f.on&&f.spr&&(f.t=='s'||f.t=='l')&&!f.hm)}
 hcMarkGo(m){const F=this.cur.food.filter(f=>f.on&&f.spr&&(f.t=='s'||f.t=='l')&&!f.hm).sort((a,b)=>Math.hypot(b.spr.x-m.x,b.spr.y-m.y)-Math.hypot(a.spr.x-m.x,a.spr.y-m.y)).slice(0,3);
  for(const f of F){f.hm=1;if(f.x==null){f.x=f.spr.x;f.y=f.spr.y}const r=this.add.circle(f.spr.x,f.spr.y,16,0xff3a5a,0).setStrokeStyle(2,0xff5a7a,1).setDepth(12);this.tweens.add({targets:r,scale:{from:2.2,to:1},duration:300,onComplete:()=>r.destroy()})}
  if(F.length)this.dtx(m.x,m.y-50,'허기 표식 — 표식 유충을 먼저 먹을 것!','#ff9ac0')}
 hcMarkU(m,dt,g){const now=this.time.now,gr=m.gr||0,bs=1+.12*gr;
  if(m.st=='markW'){const k=1-Math.max(0,m.tm)/.6;g.lineStyle(3,0xff3a5a,.3+.6*k).strokeEllipse(m.x,m.y,150*bs*(1+.15*k),104*bs*(1+.15*k));if(m.tm<=0){this.hcMarkGo(m);m.st='crown';m.cd=.5}}
  for(const f of this.cur.food){if(!f.hm||!f.on||!f.spr)continue;const dx=m.x-f.x,dy=m.y-f.y,d=Math.hypot(dx,dy)||1;f.x+=dx/d*60*dt;f.y+=dy/d*60*dt;f.spr.setPosition(f.x,f.y);
   const pu=.5+.5*Math.sin(now/120);g.lineStyle(2,0xff5a7a,.6+.4*pu).strokeCircle(f.x,f.y,13);g.lineStyle(1,0xff5a7a,.25).lineBetween(f.x,f.y,m.x,m.y);
   if(((f.x-m.x)/(75*bs))**2+((f.y-m.y)/(52*bs))**2<1){f.on=0;const s=f.spr;f.spr=null;this.tweens.add({targets:s,x:m.x,y:m.y,scale:.2,alpha:0,duration:220,onComplete:()=>s.destroy()});
    if((m.gr||0)<3)m.gr=(m.gr||0)+1;m.hp=Math.min(m.mh,m.hp+m.mh*.06);const rg=this.add.ellipse(m.x,m.y,150*bs,104*bs).setStrokeStyle(3,0xff9ac0,.9).setDepth(12);this.tweens.add({targets:rg,scale:1.35,alpha:0,duration:420,onComplete:()=>rg.destroy()});m.hk=.35;this.dtx(m.x,m.y-56,'표식 유충을 삼켰다','#ff7a9a')}}}
