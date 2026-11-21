 // ===== v44: 물기·섭취 캐릭터 모션 (시안 M1 턱 집게 / M2 원형 아가리 / M3 용수철 꿈틀 — window.__vpMo) =====
 moStart(k){this.mo={k,t:0,dur:{1:.24,2:.3,3:.34}[this.moV()]||.26}}
 moV(){return +(window.__vpMo||1)}
 moApply(dt){const V=this.moV(),g=this.moG||(this.moG=this.add.graphics().setDepth(10.6));g.clear();if(this.over||!this.hd||!this.hd.visible)return;
  const hd=this.hd,S=this.bsc||1;let a=this.ang;
  // 먹는 동안: 머리가 먹이 쪽으로
  const F=this.moEat&&this.moEat.spr?this.moEat:null;if(F){const ta=Math.atan2(F.spr.y-hd.y,F.spr.x-hd.x);this.ang+=Phaser.Math.Angle.Wrap(ta-this.ang)*Math.min(1,dt*12);a=this.ang;hd.setRotation(a)}
  const fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx,now=this.time.now/1000;
  const mo=this.mo;let q=-1;if(mo){mo.t+=dt;q=mo.t/mo.dur;if(q>=1){this.mo=null;q=-1}}
  const seg=this.sg,mv=(o,dx,dy)=>o.setPosition(o.x+dx,o.y+dy);
  const tooth=(x,y,ang,len,w,col)=>{g.fillStyle(col,1).fillTriangle(x+Math.cos(ang+1.57)*w,y+Math.sin(ang+1.57)*w,x-Math.cos(ang+1.57)*w,y-Math.sin(ang+1.57)*w,x+Math.cos(ang)*len,y+Math.sin(ang)*len)};
  if(V==1){ // ── M1 턱 집게
   let L=0,open=.25;
   if(q>=0){L=9*Math.sin(Math.PI*Math.min(1,q*1.15));open=q<.4?.25+q/.4*.75:q<.6?1-(q-.4)/.2*1.15:-.15;seg.forEach((o,i)=>mv(o,fx*L*(.55-.12*i),fy*L*(.55-.12*i)))}
   else if(F){const c=Math.sin(now*22);L=1.6*c;open=.45+.4*c;if(Math.random()<.35){const b=this.add.circle(F.spr.x+(Math.random()-.5)*8,F.spr.y+(Math.random()-.5)*8,1.6,0x9fe8b8,.9).setDepth(12);this.tweens.add({targets:b,x:b.x+(Math.random()-.5)*26,y:b.y-6-Math.random()*12,alpha:0,duration:320,onComplete:()=>b.destroy()})}}
   if(L)mv(hd,fx*L,fy*L);
   if(q>=0||F){const hx=hd.x+fx*6*S,hy=hd.y+fy*6*S;for(const s of[-1,1]){const bx=hx+px*4*s*S,by=hy+py*4*s*S,an=a+s*open*.9;g.lineStyle(4.2*S,0x3d1b6b,1).beginPath().moveTo(bx,by).lineTo(bx+Math.cos(an)*10*S,by+Math.sin(an)*10*S).lineTo(bx+Math.cos(an)*10*S+Math.cos(a-s*.9)*7*S,by+Math.sin(an)*10*S+Math.sin(a-s*.9)*7*S).strokePath();
     g.lineStyle(2.2*S,0xffd0e8,1).beginPath().moveTo(bx,by).lineTo(bx+Math.cos(an)*10*S,by+Math.sin(an)*10*S).lineTo(bx+Math.cos(an)*10*S+Math.cos(a-s*.9)*7*S,by+Math.sin(an)*10*S+Math.sin(a-s*.9)*7*S).strokePath()}
    if(q>.4&&q<.62){g.fillStyle(0xffffff,1-(Math.abs(q-.5)/.12)).fillCircle(hd.x+fx*20*S,hd.y+fy*20*S,5*S)}}
  }else if(V==2){ // ── M2 원형 아가리
   let L=0,r=0,sc=1;
   if(q>=0){sc=1+.35*Math.sin(Math.PI*Math.min(1,q/.55));L=12*Math.sin(Math.PI*Math.min(1,q*1.1));r=q<.45?q/.45*9:q<.65?9*(1-(q-.45)/.2):0;seg.forEach((o,i)=>{mv(o,fx*L*(.5-.1*i),fy*L*(.5-.1*i));o.setScale(S*(1+.18*Math.max(0,Math.sin(Math.PI*(q*1.6-i*.18)))))})}
   else if(F){r=5.2+Math.sin(now*14)*.8;L=2;const k=(now*5)%1,bi=Math.floor(((now*5)|0)%5);seg.forEach((o,i)=>o.setScale(S*(i==bi-1?1.32:1)));
    if(Math.random()<.5){const b=this.add.circle(F.spr.x+(Math.random()-.5)*10,F.spr.y+(Math.random()-.5)*10,1.4,0x9fe8b8,.9).setDepth(12);this.tweens.add({targets:b,x:hd.x+fx*10*S,y:hd.y+fy*10*S,alpha:.2,duration:220,onComplete:()=>b.destroy()})}}
   if(L)mv(hd,fx*L,fy*L);if(sc!=1)hd.setScale(S*sc);
   if(r>.3){const cx=hd.x+fx*(9+r*.4)*S,cy=hd.y+fy*(9+r*.4)*S,R=r*S;g.fillStyle(0x3d1b6b,1).fillCircle(cx,cy,R+2*S);g.fillStyle(0x12061e,1).fillCircle(cx,cy,R);for(let i=0;i<8;i++){const an=i/8*6.283+now*2;tooth(cx+Math.cos(an)*R,cy+Math.sin(an)*R,an+Math.PI,R*.55,1.3*S,0xfff0f8)}}
   if(q>.6&&q<.8){g.lineStyle(2*S,0xffffff,1-(q-.6)/.2).strokeCircle(hd.x+fx*14*S,hd.y+fy*14*S,(4+(q-.6)*60)*S)}
  }else{ // ── M3 용수철 꿈틀
   let L=0;
   if(q>=0){L=q<.35?-5*q/.35:q<.6?-5+19*(q-.35)/.25:14*(1-(q-.6)/.4);const curl=q<.35?q/.35:q<.6?1-(q-.35)/.25:0;
    seg.forEach((o,i)=>{const w=Math.sin(i*1.4+1)*6*curl*S;mv(o,fx*L*(.4-.08*i)-fx*curl*3*i+px*w,fy*L*(.4-.08*i)-fy*curl*3*i+py*w)});
    if(q>.35&&q<.75){const back=Math.min(1,(q-.35)/.25);for(let j=1;j<=3;j++){g.fillStyle(0xc890ff,.35-j*.08).fillCircle(hd.x+fx*(L-j*6*back)*1+0,hd.y+fy*(L-j*6*back),(7-j)*S)}}
    if(q>.5&&q<.75){const al=1-(q-.5)/.25;g.lineStyle(3.5*S,0xffd0f0,al).beginPath().arc(hd.x+fx*(L+4),hd.y+fy*(L+4),18*S,a-1.1,a+1.1,false).strokePath()}}
   else if(F){const T=now*6;seg.forEach((o,i)=>o.setScale(S*(1+.16*Math.max(0,Math.sin(T-i*1.2)))));hd.setScale(S*(1+.07*Math.max(0,Math.sin(T+1.2))));
    if(Math.random()<.6){const ang=Math.random()*6.283,b=this.add.circle(F.spr.x+Math.cos(ang)*8,F.spr.y+Math.sin(ang)*8,1.8,0xc070ff,.8).setDepth(12);this.tweens.add({targets:b,x:hd.x,y:hd.y,scale:.3,alpha:0,duration:380,ease:'Quad.in',onComplete:()=>b.destroy()})}}
   if(L)mv(hd,fx*L,fy*L);
  }}
