 // ===== v45: 물기·섭취 모션 = M3 용수철 꿈틀 (확정) =====
 moStart(k){this.mo={k,t:0,dur:.34}}
 moApply(dt){const g=this.moG||(this.moG=this.add.graphics().setDepth(10.6));g.clear();if(this.over||!this.hd||!this.hd.visible)return;
  const hd=this.hd,S=this.bsc||1;let a=this.ang;
  // 먹는 동안: 머리가 먹이 쪽으로
  const F=this.moEat&&this.moEat.spr?this.moEat:null;if(F){const ta=Math.atan2(F.spr.y-hd.y,F.spr.x-hd.x);this.ang+=Phaser.Math.Angle.Wrap(ta-this.ang)*Math.min(1,dt*12);a=this.ang;hd.setRotation(a)}
  const fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx,now=this.time.now/1000,seg=this.sg,mv=(o,dx,dy)=>o.setPosition(o.x+dx,o.y+dy);
  const mo=this.mo;let q=-1;if(mo){mo.t+=dt;q=mo.t/mo.dur;if(q>=1){this.mo=null;q=-1}}
  let L=0;
  if(q>=0){ // 물기: 움츠렸다(S자) → 잔상 셋을 남기며 튀어 나가 할퀴는 호 → 돌아옴
   L=q<.35?-5*q/.35:q<.6?-5+19*(q-.35)/.25:14*(1-(q-.6)/.4);const curl=q<.35?q/.35:q<.6?1-(q-.35)/.25:0;
   seg.forEach((o,i)=>{const w=Math.sin(i*1.4+1)*6*curl*S;mv(o,fx*L*(.4-.08*i)-fx*curl*3*i+px*w,fy*L*(.4-.08*i)-fy*curl*3*i+py*w)});
   if(q>.35&&q<.75){const back=Math.min(1,(q-.35)/.25);for(let j=1;j<=3;j++)g.fillStyle(0xc890ff,.35-j*.08).fillCircle(hd.x+fx*(L-j*6*back),hd.y+fy*(L-j*6*back),(7-j)*S)}
   if(q>.5&&q<.75){const al=1-(q-.5)/.25;g.lineStyle(3.5*S,0xffd0f0,al).beginPath().arc(hd.x+fx*(L+4),hd.y+fy*(L+4),18*S,a-1.1,a+1.1,false).strokePath()}}
  else if(F){ // 섭취: 몸 전체가 머리→꼬리로 꿈틀 물결, 먹이가 보랏빛 알갱이로 녹아 머리로
   const T=now*6;seg.forEach((o,i)=>o.setScale(S*(1+.16*Math.max(0,Math.sin(T-i*1.2)))));hd.setScale(S*(1+.07*Math.max(0,Math.sin(T+1.2))));
   if(Math.random()<.6){const an=Math.random()*6.283,b=this.add.circle(F.spr.x+Math.cos(an)*8,F.spr.y+Math.sin(an)*8,1.8,0xc070ff,.8).setDepth(12);this.tweens.add({targets:b,x:hd.x,y:hd.y,scale:.3,alpha:0,duration:380,ease:'Quad.in',onComplete:()=>b.destroy()})}}
  if(L)mv(hd,fx*L,fy*L)}
