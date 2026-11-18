 // ===== 보스: 라벤더 아래의 여제 (v28) =====
 emTex(){if(this.textures.exists('emS'))return;let sd=777;const R=()=>{sd=sd*16807%2147483647;return sd/2147483647};
  const D=(x,cx,cy,r,col)=>disc(x,cx,cy,r,col),P=(x,X,Y,c)=>{x.fillStyle=c;x.fillRect(Math.round(X),Math.round(Y),1,1)};
  const mask=(x,cx,cy,rx,ry,cr)=>{const RX=Math.ceil(rx),RY=Math.ceil(ry);for(let j=-RY;j<=RY;j++)for(let i=-RX;i<=RX;i++){const d=i*i/(rx*rx)+j*j/(ry*ry);if(d>1)continue;P(x,cx+i,cy+j,d>.7?'#6a5a74':j<0&&i<0?'#ffffff':d>.4?'#c4b6cc':'#ece2f0')}
   const ex=Math.max(1,Math.round(rx*.45)),ey=Math.round(-ry*.15);P(x,cx-ex,cy+ey,'#0a0210');P(x,cx+ex,cy+ey,'#0a0210');if(rx>2.5){P(x,cx-ex-1,cy+ey,'#0a0210');P(x,cx+ex+1,cy+ey,'#0a0210')}P(x,cx,cy+Math.round(ry*.55),'#2a1a30');
   if(cr){P(x,cx+1,cy-RY+1,'#3a2a40');P(x,cx,cy-RY+2,'#3a2a40');P(x,cx+1,cy-RY+3,'#3a2a40')}};
  const coral=(x,bx,by,h,lean)=>{for(let k=0;k<h;k++){const w=k<h*.5?1:0;for(let i=-w;i<=w;i++)P(x,bx+i+lean*k/h,by-k,k>h-3?'#ffd0ff':i<0?'#9a34d8':'#e080ff')}D(x,bx+lean,by-h,1.1,'#fff0ff')};
  // 라벤더 바다 (경기장 바닥)
  tex(this,'lsea',400,180,2,x=>{for(let y=0;y<180;y++)for(let i=0;i<400;i++){const v=Math.sin(i*.12+Math.sin(y*.2)*1.6+y*.05)+Math.sin(y*.31+i*.02);P(x,i,y,v<1.1?'#2a1846':v<1.6?'#3c2464':v<1.85?'#5a3a8e':'#7a5ab8')}
   for(let k=0;k<420;k++)P(x,R()*400,R()*180,R()<.5?'#e8d6ff':R()<.5?'#ff9ae6':'#7a5ab8')});
  // 1페이즈: 수면 아래를 지나는 거대한 가오리 그림자 (등에 빼앗은 가면들이 비친다)
  tex(this,'emS',110,60,2,x=>{const cx=55,cy=26;for(let y=0;y<60;y++)for(let i=0;i<110;i++){const ad=Math.abs(i-cx)/54,dy=(y-cy)/22;if(ad>=1)continue;
    let f=-.55+.75*Math.pow(ad,1.5);if(ad>.07&&ad<.22)f=-.85+.6*Math.abs(ad-.145)/.075*.5;const b=.5-.42*Math.pow(ad,.7);
    if(dy>f&&dy<b){const e=dy-f<.1||b-dy<.1;x.fillStyle=e?'rgba(200,160,255,.38)':'rgba(10,4,24,.82)';x.fillRect(i,y,1,1)}}
   for(let y=36;y<60;y++){x.fillStyle='rgba(10,4,24,.78)';x.fillRect(cx-1+Math.round(Math.sin(y*.35)*1.5),y,2,1)}
   for(let k=0;k<30;k++){const i=18+R()*74,y=14+R()*14;x.fillStyle='rgba(232,208,255,.5)';x.fillRect(Math.round(i),Math.round(y),1,1)}
   for(let k=-2;k<=2;k++){x.globalAlpha=.35;mask(x,cx+k*9,cy-1+Math.abs(k),2,2.5,0);x.globalAlpha=1}});
  // 1페이즈: 수면 위로 솟은 여제 (긴 베일, 가면 얼굴, 산호 왕관, 빼앗은 가면 목걸이)
  tex(this,'emH',64,74,2,x=>{const cx=32;
   for(let a=-4;a<=4;a++){const an=a*.32,L=9+(4-Math.abs(a))*2.2;const bx=cx+Math.sin(an)*5,by=17-Math.cos(an)*3;for(let t=0;t<L;t++){const X=bx+Math.sin(an)*t,Y=by-Math.cos(an)*t;P(x,X,Y,t>L-3?'#ffd0ff':Math.abs(a)%2?'#c23cff':'#e080ff');if(t<L*.5)P(x,X+1,Y,'#9a34d8')}D(x,bx+Math.sin(an)*L,by-Math.cos(an)*L,1.2,'#fff0ff')}
   for(let y=16;y<66;y++){const k=(y-16)/50,w=5+24*Math.pow(k,1.25)+Math.sin(y*.5)*.8;for(let i=Math.round(cx-w);i<=Math.round(cx+w);i++){const e=Math.abs(i-cx)>w-1.2,t=Math.abs(i-cx)/w;P(x,i,y,e?'#c8a0ff':t<.35?'#3a1450':t<.7?'#2a0f3e':'#1a0828')}}
   for(let s=-1;s<=1;s+=2)for(let k=0;k<6;k++){const X=cx+s*(8+k*3.6),y0=34+k*4;for(let y=y0;y<66;y++)if((y+k)%3)P(x,X+Math.sin(y*.4+k)*.6,y,'#5a2a7a')}
   mask(x,cx,21,6,8,1);for(let j=-1;j<=1;j++){P(x,cx-2,24+j*0+3,'#3a0a40');P(x,cx+2,27,'#3a0a40')}for(let y=22;y<33;y++)P(x,cx-3+Math.round(Math.sin(y)*.4),y+2,'rgba(20,4,30,.5)');
   for(let k=-2;k<=2;k++)mask(x,cx+k*6.5,38+Math.abs(k)*1.6,2.4,3,(k+2)%2==0);
   for(let i=0;i<64;i++){const y=67+Math.sin(i*.5)*1.2;P(x,i,y,'#e8d6ff');P(x,i,y+1,'rgba(232,214,255,.4)');if(i%5==0)P(x,i,y+3,'rgba(232,214,255,.35)')}
   for(let i=4;i<60;i++){x.fillStyle='rgba(18,6,30,.45)';x.fillRect(i,69+((i*7)%4),1,1)}});
  // 2페이즈: 가면이 벗겨진 여제 (세로로 갈라진 몸, 틈 가장자리에 이빨처럼 박힌 가면들)
  tex(this,'emA',128,84,2,x=>{const cx=64,cy=36,inW=(i,y)=>{const dx=(i-cx)/60,dy=(y-cy)/24;if(Math.abs(dx)>=1)return 0;return dy>-.9+.55*Math.pow(Math.abs(dx),1.4)&&dy<.75-.6*Math.pow(Math.abs(dx),.9)};
   const mix=(a,b,t)=>{const A=[1,3,5].map(k=>parseInt(a.substr(k,2),16)),B=[1,3,5].map(k=>parseInt(b.substr(k,2),16));return'rgb('+A.map((v,k)=>Math.round(v+(B[k]-v)*t)).join(',')+')'};
   for(let y=0;y<84;y++)for(let i=0;i<128;i++)if(inW(i,y)){const e=!inW(i-1,y)||!inW(i+1,y)||!inW(i,y-1)||!inW(i,y+1);P(x,i,y,e?'#c8a0ff':mix('#3a1450','#12061e',Math.abs(i-cx)/60))}
   for(let k=-6;k<=6;k++){if(!k)continue;for(let t=0;t<26;t++){const i=cx+k*8.6*t/26+k*1.2,y=cy-17+t*.86+Math.abs(k)*.7;if(inW(Math.round(i),Math.round(y))){x.globalAlpha=.65;P(x,i,y,'#7a40b0');x.globalAlpha=1}}
    const ex=cx+k*8.6+k*1.2,ey=cy+6+Math.abs(k)*.9;if(inW(Math.round(ex),Math.round(ey))){P(x,ex-1,ey,'#0a0210');P(x,ex,ey,'#0a0210');P(x,ex+1,ey,'#0a0210');P(x,ex,ey+1,'#ff6af0')}}
   for(let k=0;k<10;k++){const s=k<5?-1:1,j=k%5;coral(x,cx+s*(40+j*4),cy-11+j*5,5+(j%2)*2,s*1.5)}
   const gl=x.createRadialGradient(cx,cy,0,cx,cy,18);gl.addColorStop(0,'rgba(255,63,208,.42)');gl.addColorStop(1,'rgba(255,63,208,0)');x.fillStyle=gl;x.fillRect(cx-18,cy-18,36,36);
   const sw=y=>6.5*Math.sin((y-(cy-22))/42*Math.PI);
   for(let y=cy-22;y<cy+20;y++){const w=sw(y);for(let i=Math.round(cx-w);i<=Math.round(cx+w);i++){const r=R();P(x,i,y,r<.07?'#ffffff':r<.15?'#c0a8ff':r<.19?'#ff6af0':'#000000')}if(w>.5){P(x,cx-w-1,y,'#ff9af4');P(x,cx+w+1,y,'#ff9af4')}}
   let n=0;for(let y=cy-18;y<=cy+16;y+=5){const w=sw(y);mask(x,cx-w-3.2,y,2.6,3.1,n%3==0);mask(x,cx+w+3.2,y,2.6,3.1,n%3==1);n++}
   P(x,cx,cy-23,'#ff9af4');P(x,cx,cy-24,'#ff9af4');P(x,cx,cy+20,'#ff9af4');P(x,cx,cy+21,'#ff9af4')});
  tex(this,'emM',12,14,2,x=>mask(x,6,7,4,5,1));
  tex(this,'emc',16,24,2,x=>{for(const[b,h,lean]of[[8,20,0],[4,12,-2],[12,14,2]]){for(let k=0;k<h;k++){const w=Math.max(0,Math.round(2.2-k/h*2.2));for(let i=-w;i<=w;i++)P(x,b+i+lean*k/h,23-k,k>h-3?'#ffd0ff':i<0?'#9a34d8':'#e080ff')}D(x,b+lean,23-h,1.3,'#fff0ff')}});
  tex(this,'emo',8,8,2,x=>{D(x,4,4,3.5,'#ff9af4');D(x,4,4,2.4,'#fff0ff')})}
 hudVis(v){[this.gfx,this.gL,this.gR,this.pnL,this.pnR,this.t1,this.t2,this.etx].concat(this.rgT||[],[this.rgL,this.rwNm]).forEach(o=>{if(o)o.setVisible(v)});if(this.mtx&&!v)this.mtx.setVisible(false)}
 cineStart(dur,fn,end){this.cine={t:0,dur,fn,end,skip:1};this.pl.setVelocity(0,0);this.vx=this.vy=this.jx=this.jy=0;this.joy=null;this.eat=null;this.hudVis(false);if(this.hint){this.hint.destroy();this.hint=null}}
 cineU(dt){const c=this.cine;this.pl.setVelocity(0,0);const k=this.k;if(Phaser.Input.Keyboard.JustDown(k.SPACE)||Phaser.Input.Keyboard.JustDown(k.ENTER))c.t=c.dur;
  c.t=Math.min(c.dur,c.t+dt);c.fn(c.t,dt);this.worm(dt,this.time.now,0,1);if(c.t>=c.dur){this.cine=null;this.hudVis(true);c.end()}}
 bossStart(){this.lv.rooms.forEach(m=>{m.food.forEach(f=>{if(f.spr){f.spr.destroy();f.spr=null}});m.en.forEach(e=>{for(const k of['spr','lvT','ring','mk','lsh'])if(e[k]){e[k].destroy();e[k]=null}if(e.aim){e.aim.forEach(r=>r.destroy());e.aim=null}})});
  (this.prj||[]).forEach(q=>q.o.destroy());this.prj=[];this.emTex();
  this.zi=3;this.boss=true;this.exR=0;this.exT=0;this.zt0=this.time.now;if(this.exTx)this.exTx.setVisible(false);if(this.hvT)this.hvT.setVisible(false);
  const room={r:0,c:0,d:{N:0,S:0,W:0,E:0},ct:{},hp:{},obs:[],zn:[],food:[],en:[],seen:1,tr:'void',dd:5};
  for(const[c,r]of[[3,2],[16,2],[3,6],[16,6]])room.food.push({t:'s',c,r,p:0,on:1});
  const lv=Math.min(18,this.plv+2),MH=Math.round(520+60*this.plv);
  room.en.push({k:'em',x:400,y:170,on:1,mh:MH,hp:MH,lv,df:1+.06*(lv-1),ph:1,st:'cine',cd:1,cnt:0,gone:1,L:{N:0,E:0,S:0,W:0}});
  this.lv={rooms:[room],start:room,exit:null,at:(r,c)=>r==0&&c==0?room:null};
  const p=this.pl;p.setPosition(400,292);p.setVelocity(0,0);this.vx=this.vy=this.jx=this.jy=0;this.ang=-Math.PI/2;this.sp.forEach((q,i)=>{q.x=400;q.y=296+7*(i+1)});this.en=Math.min(this.emax,this.en+40);this.inv=2;this.rwo=[];this.emb=[];this.emPull=null;this.emMir=0;
  this.enter(room);if(this.rlb){this.rlb.destroy();this.rlb=null}if(this.mcard){this.mcard.destroy();this.mcard=null}this.seenM.em=1;
  const sea=this.lsea=this.add.image(400,180,'lsea').setDepth(.5).setAlpha(0);this.dec.push(sea);
  const m=room.en[0],S=m.spr;S.setPosition(-280,176).setScale(2.6).setAlpha(.85);m.g=this.add.graphics().setDepth(1.45);this.dec.push(m.g);
  const ov=this.add.rectangle(400,180,800,360,0x000000,1).setDepth(150),cor=[[70,70],[730,74],[60,300],[740,296],[250,46],[560,44]],made=[],rip=[];let lr=0;
  const t1=this.add.text(400,112,'라벤더 아래의 여제',ST({fontSize:'26px',fontStyle:'bold',color:'#ffd0f8'})).setOrigin(.5).setDepth(151).setAlpha(0),t2=this.add.text(400,146,'모든 것을 원하는 자 — 수면 아래에서 너를 보고 있다',ST({fontSize:'13px',color:'#c8b8e8'})).setOrigin(.5).setDepth(151).setAlpha(0);
  this.cineStart(6.8,(t)=>{ov.setAlpha(Math.max(0,1-t/1.1));sea.setAlpha(Math.min(1,t/1.3));
   cor.forEach(([x,y],i)=>{if(t>.8+i*.22&&!made[i]){made[i]=1;const c=this.add.image(x,y+14,'emc').setOrigin(.5,1).setDepth(2).setScale(1,.05);this.dec.push(c);this.tweens.add({targets:c,scaleY:1,duration:500,ease:'Back.out'});this.tweens.add({targets:c,angle:{from:-3,to:3},duration:1600,yoyo:true,repeat:-1,ease:'Sine.inOut'})}});
   if(t>=1&&t<=3.3){const k=(t-1)/2.3;S.setPosition(-280+1360*k,176+Math.sin(k*6)*10);if(t-lr>.14){lr=t;const r=this.add.ellipse(S.x+(Math.random()-.5)*160,S.y-30+(Math.random()-.5)*40,30,10).setStrokeStyle(1.5,0xe8d6ff,.7).setDepth(1.6);this.tweens.add({targets:r,scaleX:4,scaleY:3,alpha:0,duration:900,onComplete:()=>r.destroy()})}if(Math.abs(k-.5)<.02)this.cameras.main.shake(500,.004)}
   if(t>3.3&&t<4.6){const k=(t-3.3)/1.3;S.setPosition(400,170).setScale(2.6-1.6*k).setAlpha(.85*k)}
   m.g.clear();if(t>4.5)this.emLights(m,t);
   const ta=t<4.9?0:t<5.4?(t-4.9)/.5:t<6.2?1:Math.max(0,1-(t-6.2)/.5);t1.setAlpha(ta);t2.setAlpha(ta)},
   ()=>{ov.destroy();t1.destroy();t2.destroy();sea.setAlpha(1);S.setPosition(400,170).setScale(1).setAlpha(.85);m.x=400;m.y=170;m.st='swim';m.cd=1.2;m.wx=400;m.wy=170;
    const c=this.mcard=this.add.text(400,316,'라벤더 아래의 여제\n수면 아래에 있을 때는 닿지 않는다 · 수면 위로 솟을 때 물 것 · 꺼진 불빛 쪽으로는 돌진하지 않는다',ST({fontSize:'12px',align:'center',color:'#ece6f7',backgroundColor:'#2a1f40',padding:{x:12,y:6}})).setOrigin(.5).setDepth(62);this.tweens.add({targets:c,alpha:0,delay:5000,duration:500,onComplete:()=>{c.destroy();if(this.mcard===c)this.mcard=null}})})}
 emLights(m,t){const g=m.g,D={N:[0,-1],E:[1,0],S:[0,1],W:[-1,0]};let i=0;for(const k in D){const on=t==null?m.L[k]<=0:t>4.6+i*.2;const[dx,dy]=D[k],x=m.x+dx*124,y=m.y+dy*44;g.fillStyle(on?0xfff0ff:0x4a3a60,on?.95:.6).fillCircle(x,y,on?4:3);if(on){g.fillStyle(0xff9af4,.25).fillCircle(x,y,9)}i++}}
 emBar(g,m){const r=Math.max(0,m.hp/m.mh);g.fillStyle(0x0d0818,.8).fillRoundedRect(296,6,208,30,6);g.fillStyle(0x3a2f57).fillRect(302,22,196,6);g.fillStyle(m.ph==2?0xff6ab0:0xc070ff).fillRect(302,22,196*r,6);g.fillStyle(0xffffff,.6).fillRect(302+98,20,1,10);
  if(!this.rwNm)this.rwNm=this.add.text(400,14,'',ST({fontSize:'10px',fontStyle:'bold',color:'#ffd0f8'})).setOrigin(.5).setDepth(61);this.rwNm.setText(m.ph==2?'가면이 벗겨진 여제':'라벤더 아래의 여제')}
 emHit(test,dmg,src,m){const p=this.pl;let h=test(p.x,p.y);if(!h&&this.emMir){const rx=800-p.x;if(test(rx,p.y)){h=1;if(this.rfl)this.rfl.forEach(o=>o.setTintFill(0xff6a8a));this.time.delayedCall(140,()=>{if(this.rfl)this.rfl.forEach(o=>o.setTint(0xd8c8ff))});this.dtx(rx,p.y-24,'거울 속 내가 맞았다','#ff9ac0')}}if(h)this.hurt(dmg,src,m);return h}
 emAI(m,dt,p){if(m.st=='cine'||m.st=='trans')return;const s=m.spr,now=this.time.now,g=m.g,dmg=v=>Math.round(v*(m.df||1)),en=m.hp<m.mh*.2?.75:1;m.tm-=dt;m.cd-=dt;g.clear();
  for(const k in m.L)m.L[k]-=dt;
  // 구석에서 유충이 흘러나온다
  m.fd=(m.fd??8)-dt;if(m.fd<=0){m.fd=12;if(this.cur.food.filter(f=>f.on).length<4)for(let i=0;i<2;i++){const[cx,cy]=pick([[90,80],[710,80],[90,290],[710,290]]),f={t:'s',x:cx+(Math.random()-.5)*20,y:cy+(Math.random()-.5)*14,c:-1,r:-1,p:0,on:1};f.spr=this.add.image(f.x,f.y,'f_s').setDepth(5);this.cur.food.push(f)}}
  this.embU(dt,p);
  if(m.ph==1){
   if(m.st!='breach'&&m.st!='surge')s.setPosition(m.x,m.y+Math.sin(now/600)*3);this.emLights(m);
   if(m.hp<=m.mh*.5&&m.st!='surgeW'&&m.st!='surge'){this.emTrans(m);return}
   switch(m.st){
   case 'swim':{const dx=m.wx-m.x,dy=m.wy-m.y,d=Math.hypot(dx,dy);if(d<6){m.wx=Phaser.Math.Clamp(p.x+(Math.random()-.5)*260,160,640);m.wy=Phaser.Math.Clamp(p.y-80+(Math.random()-.5)*80,90,250)}else{const v=m.cnt>=3?150:60;m.x+=dx/d*v*dt;m.y+=dy/d*v*dt}
    if(m.cd<=0){if(m.cnt>=3){if(m.x>190&&m.x<610&&m.y>110&&m.y<230)this.emBreach(m);else{m.wx=400;m.wy=165}break}const dirs=Object.keys(m.L).filter(k=>m.L[k]<=0&&this.emLane(m,k).len>140),r=Math.random();
     if(dirs.length&&r<.5)this.emSurge(m,pick(dirs));else if(r<.78&&Math.hypot(p.x-m.x,p.y-m.y)<330)this.emTail(m);else this.emSpikes(m)}}break;
   case 'surgeW':{const ln=m.ln;g.fillStyle(0xff3b4f,.13+.12*Math.sin(now/60)).fillRect(ln.x0,ln.y0,ln.w,ln.h);g.lineStyle(2,0xff5a7a,.9).strokeRect(ln.x0,ln.y0,ln.w,ln.h);if(m.tm<=0){m.st='surge';m.hitd=0}}break;
   case 'surge':{const ln=m.ln,v=820;const dx=ln.ex-m.x,dy=ln.ey-m.y,d=Math.hypot(dx,dy);g.fillStyle(0xff3b4f,.1).fillRect(ln.x0,ln.y0,ln.w,ln.h);
    if(d<v*dt){m.x=ln.ex;m.y=ln.ey;m.st='swim';m.cd=.55*en;m.cnt++;m.wx=m.x;m.wy=m.y}else{m.x+=dx/d*v*dt;m.y+=dy/d*v*dt}s.setPosition(m.x,m.y);
    if(Math.random()<.6){const r=this.add.ellipse(m.x,m.y-20,40,12).setStrokeStyle(1.5,0xe8d6ff,.8).setDepth(1.6);this.tweens.add({targets:r,scaleX:2.5,scaleY:2,alpha:0,duration:500,onComplete:()=>r.destroy()})}
    if(!m.hitd){const inL=(x,y)=>x>ln.x0&&x<ln.x0+ln.w&&y>ln.y0&&y<ln.y0+ln.h&&Math.hypot(x-m.x,y-m.y)<110;if(this.emHit(inL,dmg(22),'여제의 돌진',m))m.hitd=1}}break;
   case 'tailW':{const T=m.tl;g.lineStyle(T.w,0xff3b4f,.15+.15*Math.sin(now/50)).lineBetween(T.x0,T.y0,T.x1,T.y1);g.lineStyle(2,0xff5a7a,.9).lineBetween(T.x0,T.y0,T.x1,T.y1);
    if(m.tm<=0){const ux=T.x1-T.x0,uy=T.y1-T.y0,L=Math.hypot(ux,uy),inT=(x,y)=>{const t=((x-T.x0)*ux+(y-T.y0)*uy)/(L*L),q=Math.abs((x-T.x0)*uy-(y-T.y0)*ux)/L;return t>0&&t<1&&q<T.w/2+6};
     const sl=this.add.graphics().setDepth(12);sl.lineStyle(T.w,0xe8d6ff,.7).lineBetween(T.x0,T.y0,T.x1,T.y1);this.tweens.add({targets:sl,alpha:0,duration:350,onComplete:()=>sl.destroy()});this.cameras.main.shake(140,.006);
     for(let i=0;i<10;i++){const k=i/9,r=this.add.ellipse(T.x0+ux*k,T.y0+uy*k,14,6).setStrokeStyle(1.5,0xe8d6ff,.8).setDepth(1.6);this.tweens.add({targets:r,scaleX:3,scaleY:2.5,alpha:0,duration:600,onComplete:()=>r.destroy()})}
     if(this.emHit(inT,dmg(18),'여제의 꼬리',m))this.slow=1.6;m.st='swim';m.cd=.7*en;m.cnt++}}break;
   case 'spike':{m.sk-=dt;if(m.sk<=0&&m.sn<(m.hp<m.mh*.75?4:3)){m.sk=.42;m.sn++;m.spk.push({x:p.x,y:p.y,t:.8})}
    for(const q of m.spk){q.t-=dt;if(q.t>0){g.fillStyle(0xff3b4f,.15).fillEllipse(q.x,q.y,64,40);g.lineStyle(2,0xff5a7a,.9).strokeEllipse(q.x,q.y,64*(1-q.t/.8*.5),40*(1-q.t/.8*.5))}else if(!q.done){q.done=1;for(const[ox,oy]of[[0,0],[-12,6],[12,6],[-6,-6],[8,-5]]){const c=this.add.image(q.x+ox,q.y+oy+10,'emc').setOrigin(.5,1).setDepth(8).setScale(1,.1);this.tweens.add({targets:c,scaleY:1,duration:110,yoyo:true,hold:300,onComplete:()=>c.destroy()})}
      this.emHit((x,y)=>((x-q.x)/34)**2+((y-q.y)/22)**2<1,dmg(14),'산호 가시',m)}}
    if(m.sn>=(m.hp<m.mh*.75?4:3)&&m.spk.every(q=>q.done)){m.st='swim';m.cd=.6*en;m.cnt++}}break;
   case 'breach':{const h=m.head;if(m.tm<2.2)h.setPosition(m.x,m.hy+Math.sin(now/200)*1.5);if(m.tm<=0){m.gone=1;this.tweens.add({targets:h,y:m.hy+40,alpha:0,duration:300,onComplete:()=>h.destroy()});m.head=null;m.spr=m.shd;m.spr.setVisible(true);
     const r=this.add.ellipse(m.x,m.hy+60,110,40,0xe8d6ff,.3).setDepth(12);this.tweens.add({targets:r,scale:1.6,alpha:0,duration:400,onComplete:()=>r.destroy()});
     this.emHit((x,y)=>((x-m.x)/60)**2+((y-m.hy-60)/28)**2<1,dmg(12),'수면의 파문',m);m.x=m.bx;m.y=m.by;m.st='swim';m.cd=.8*en;m.cnt=0}}break}
   return}
  // ===== 2페이즈 =====
  this.emMirU(dt,p);{const q=now/3000;for(let r=34;r<124;r+=17){const ry=r*.14+2;for(let a=0;a<6.283;a+=.22)g.fillStyle(0xe8d6ff,.22).fillRect(m.x+Math.cos(a+q)*r,m.y+88+Math.sin(a+q)*ry,2,1)}}const bob=Math.sin(now/500)*3;if(m.st!='switch')s.setPosition(m.x,m.y+bob);
  m.wc=(m.wc||0)-dt;if(m.wc<=0&&((p.x-m.x)/108)**2+((p.y-m.y-6)/42)**2<1){m.wc=.8;this.hurt(dmg(8),'여제의 날개',m)}
  m.sw=(m.sw??12)-dt;
  switch(m.st){
  case 'hover':if(m.cd<=0){if(m.sw<=0){this.emSwitch(m);break}if(m.nx){const f=m.nx;m.nx=null;this[f](m);break}const r=Math.random();if(r<.24&&!(m.flc>now)){this.emFlip(m);break}if(r<.52)this.emChorus(m);else if(r<.72&&!(m.ihc>now))this.emInhale(m);else this.emMasks(m)}break;
  case 'flipW':{const k=1-m.tm/1.1,pu=.5+.5*Math.sin(now/45),rx=800-p.x;g.fillStyle(0xffffff,.25+.5*pu).fillRect(397,40,6,280);g.lineStyle(2,0xffffff,.9).strokeEllipse(p.x,p.y+6,70-50*k,30-20*k).strokeEllipse(rx,p.y+6,70-50*k,30-20*k);
   if(m.tm<=0){const nx=800-p.x;p.body.reset(nx,p.y);this.sp.forEach(q=>{q.x=800-q.x});this.ang=Math.PI-this.ang;this.vx=-this.vx;this.jx=-this.jx;p.setVelocity(this.vx,this.vy);this.inv=Math.max(this.inv,.15);
    const fl=this.add.rectangle(400,180,800,360,0xffffff,.55).setDepth(140);this.tweens.add({targets:fl,alpha:0,duration:350,onComplete:()=>fl.destroy()});this.cameras.main.shake(220,.008);this.dtx(nx,p.y-26,'뒤집혔다!','#ffffff');
    m.flc=now+9000;m.st='hover';m.cd=.15;m.nx=!(m.ihc>now)&&Math.random()<.6?'emInhale':'emChorus'}}break;
  case 'chorus':{m.ck-=dt;const CN=en<1?5:4;if(m.ck<=0&&m.cn<CN){m.ck=.45*en;m.cn++;const tg=m.cn==3||m.cn==5?[800-p.x,p.y]:[p.x,p.y],sx=m.x+(m.cn%2?-7:7),sy=m.y-20+m.cn*9,a0=Math.atan2(tg[1]-sy,tg[0]-sx);
    const fl=this.add.circle(sx,sy,9,0xff9af4,.8).setDepth(12);this.tweens.add({targets:fl,scale:2,alpha:0,duration:300,onComplete:()=>fl.destroy()});
    for(let i=-2;i<=2;i++){const a=a0+i*.26,o=this.add.image(sx,sy,'emo').setDepth(11);this.emb.push({o,x:sx,y:sy,vx:Math.cos(a)*125,vy:Math.sin(a)*125,t:4,src:'가면의 합창',dmg:dmg(12)})}}
    if(m.cn>=CN&&m.ck<=0){m.st='hover';m.cd=.7*en}}break;
  case 'inhaleW':{const k=1-m.tm/.8;for(let i=0;i<8;i++){const a=i/8*6.283+now/400,r=150-110*k;g.fillStyle(0xff5a7a,.8).fillCircle(m.x+Math.cos(a)*r,m.y+20+Math.sin(a)*r*.55,2.5)}
    if(m.tm<=0){m.st='inhale';m.tm=2.4;m.sl=.3;this.emPull={x:m.x,y:m.y+20,v:45}}}break;
  case 'inhale':{if(this.emPull)this.emPull.v=45+35*(1-m.tm/2.4);const pu=.5+.5*Math.sin(now/60);g.lineStyle(2,0xff5a7a,.6+.3*pu).strokeEllipse(m.x,m.y+20,200,124);g.fillStyle(0xff3b4f,.08+.06*pu).fillEllipse(m.x,m.y+20,200,124);
    for(let i=0;i<3;i++){const a=Math.random()*6.283,r=60+Math.random()*120,b=this.add.circle(m.x+Math.cos(a)*r,m.y+20+Math.sin(a)*r*.55,1.5,0xe8d6ff,.8).setDepth(12);this.tweens.add({targets:b,x:m.x,y:m.y+10,alpha:0,duration:500,onComplete:()=>b.destroy()})}
    m.sl-=dt;if(m.sl<=0){m.sl=.6;const r=this.add.ellipse(m.x,m.y+20,200,124).setStrokeStyle(4,0xffd0f8,.9).setDepth(12).setScale(.4);this.tweens.add({targets:r,scale:1,alpha:0,duration:300,onComplete:()=>r.destroy()});this.emHit((x,y)=>((x-m.x)/100)**2+((y-m.y-20)/62)**2<1,dmg(16),'틈의 이빨',m)}
    if(m.tm<=0){this.emPull=null;m.ihc=now+9000;if(((p.x-m.x)/56)**2+((p.y-m.y-14)/30)**2<1){this.hurt(dmg(30),'여제의 들숨 — 삼켜짐',m);m.hp=Math.min(m.mh*.5,m.hp+m.mh*.05);this.dtx(m.x,m.y+100,'가면이 하나 늘었다 (회복)','#ff9ac0')}m.st='hover';m.cd=.7*en}}break;
  case 'masks':{for(const q of m.mk){q.t-=dt;if(q.t>0){g.fillStyle(0xff3b4f,.14).fillCircle(q.x,q.y,26);g.lineStyle(2,0xff5a7a,.9).strokeCircle(q.x,q.y,26*(.4+.6*Math.max(0,1-q.t)))}else if(!q.done){q.done=1;const o=this.add.image(q.x,q.y-90,'emM').setDepth(12).setScale(1.6);this.tweens.add({targets:o,y:q.y,duration:120,onComplete:()=>{const r=this.add.circle(q.x,q.y,26,0xffffff,.5).setDepth(12);this.tweens.add({targets:r,scale:1.4,alpha:0,duration:260,onComplete:()=>r.destroy()});this.tweens.add({targets:o,alpha:0,angle:40,duration:400,onComplete:()=>o.destroy()})}});
     this.time.delayedCall(120,()=>{if(m.on)this.emHit((x,y)=>Math.hypot(x-q.x,y-q.y)<26,dmg(15),'떨어지는 가면',m)})}}
    if(m.mk.every(q=>q.done)){m.st='hover';m.cd=.6*en}}break;
  case 'switch':{const k=Math.min(1,1-m.tm/1.4),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;m.x=m.sx0+(m.sx1-m.sx0)*e;s.setPosition(m.x,m.y-Math.sin(k*Math.PI)*14);
    if(Math.random()<.5){const b=this.add.circle(m.x+(Math.random()-.5)*160,m.y+20,2,0xc070ff,.7).setDepth(12);this.tweens.add({targets:b,y:b.y+40,alpha:0,duration:600,onComplete:()=>b.destroy()})}
    if(m.tm<=0){m.x=m.sx1;m.st='hover';m.cd=.4;m.sw=10+Math.random()*2}}break}}
 emLane(m,k){const pad=32;let x0,y0,w,h,ex,ey;if(k=='E'){x0=m.x;w=740-m.x;y0=m.y-pad;h=pad*2;ex=740;ey=m.y}else if(k=='W'){x0=60;w=m.x-60;y0=m.y-pad;h=pad*2;ex=60;ey=m.y}else if(k=='S'){y0=m.y;h=300-m.y;x0=m.x-60;w=120;ex=m.x;ey=300}else{y0=60;h=m.y-60;x0=m.x-60;w=120;ex=m.x;ey=60}return{x0,y0,w,h,ex,ey,len:k=='E'||k=='W'?w:h}}
 emSurge(m,k){m.ln=this.emLane(m,k);m.L[k]=7;m.st='surgeW';m.tm=m.hp<m.mh*.75?.7:.85}
 emTail(m){const p=this.pl,a=Math.atan2(p.y-m.y,p.x-m.x),L=320;m.tl={x0:m.x+Math.cos(a)*30,y0:m.y+Math.sin(a)*20,x1:m.x+Math.cos(a)*L,y1:m.y+Math.sin(a)*L,w:30};m.st='tailW';m.tm=.8}
 emSpikes(m){m.st='spike';m.sk=0;m.sn=0;m.spk=[]}
 emBreach(m){m.st='breach';m.tm=3;m.gone=0;m.bx=m.x;m.by=m.y;m.hy=m.y-40;this.dtx(m.x,m.y+64,'수면 위로 솟았다 — 지금 물 것!','#ffe066');m.spr.setVisible(false);m.shd=m.spr;
  const h=m.head=m.spr=this.add.image(m.x,m.hy+40,'emH').setDepth(9).setAlpha(0);this.tweens.add({targets:h,y:m.hy,alpha:1,duration:350,ease:'Back.out'});m.y=m.hy;
  for(let i=0;i<14;i++){const a=i/14*6.283,b=this.add.circle(m.x,m.hy+60,2,0xe8d6ff,.9).setDepth(12);this.tweens.add({targets:b,x:m.x+Math.cos(a)*56,y:m.hy+60+Math.sin(a)*20-10,alpha:0,duration:500,onComplete:()=>b.destroy()})}}
 embU(dt,p){if(!this.emb||!this.emb.length)return;for(const q of this.emb){q.t-=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.o.setPosition(q.x,q.y);
   if(this.emHit((x,y)=>Math.hypot(x-q.x,y-q.y)<11,q.dmg,q.src,null))q.t=0;if(q.x<40||q.x>760||q.y<40||q.y>320)q.t=0;if(q.t<=0)q.o.destroy()}
  this.emb=this.emb.filter(q=>q.t>0)}
 emChorus(m){m.st='chorus';m.ck=.3;m.cn=0;this.dtx(m.x,m.y+100,'가면의 합창','#ff9ac0')}
 emInhale(m){m.st='inhaleW';m.tm=.8;this.dtx(m.x,m.y+100,'들숨 — 멀리 떨어질 것!','#ff9ac0')}
 emMasks(m){const p=this.pl,rx=800-p.x;m.mk=[];for(let i=0;i<4;i++)m.mk.push({x:Phaser.Math.Clamp(p.x+(i?(Math.random()-.5)*120:0),70,730),y:Phaser.Math.Clamp(p.y+(i?(Math.random()-.5)*80:0),80,300),t:1+i*.12});
  for(let i=0;i<3;i++)m.mk.push({x:Phaser.Math.Clamp(rx+(i?(Math.random()-.5)*100:0),70,730),y:Phaser.Math.Clamp(p.y+(i?(Math.random()-.5)*70:0),80,300),t:1.06+i*.12});m.st='masks'}
 emFlip(m){m.st='flipW';m.tm=1.1;this.dtx(400,300,'거울이 뒤집힌다 — 내 자리와 거울 속 자리가 바뀐다','#ffffff')}
 emSwitch(m){m.st='switch';m.tm=1.4;m.sx0=m.x;m.sx1=m.x<400?548:252;this.dtx(m.x,m.y+100,'자리를 바꾼다','#c8b8ff')}
 emTrans(m){m.st='trans';m.gone=1;if(m.head){m.head.destroy();m.head=null;m.spr=m.shd}m.g.clear();this.emb.forEach(q=>q.o.destroy());this.emb=[];this.emPull=null;
  const S=m.spr,fl=this.add.rectangle(400,180,800,360,0xffffff,0).setDepth(149),t1=this.add.text(400,64,'가면이 벗겨진 여제',ST({fontSize:'24px',fontStyle:'bold',color:'#ffb0e8'})).setOrigin(.5).setDepth(151).setAlpha(0),t2=this.add.text(400,94,'이제 여제는 거울 너머에 있다 — 거울 속의 나만 여제에게 닿는다',ST({fontSize:'13px',color:'#e0d0ff'})).setOrigin(.5).setDepth(151).setAlpha(0);
  let A=null,ln=this.add.graphics().setDepth(1.25),boom=0;
  this.cineStart(4.6,(t)=>{
   if(t<1.1){S.setVisible(true).setPosition(400,170+Math.sin(t*40)*3).setScale(1+t*.3).setAlpha(.85);if(Math.random()<.5){const r=this.add.ellipse(400+(Math.random()-.5)*200,170+(Math.random()-.5)*60,20,8).setStrokeStyle(1.5,0xe8d6ff,.8).setDepth(1.6);this.tweens.add({targets:r,scaleX:4,scaleY:3,alpha:0,duration:700,onComplete:()=>r.destroy()})}this.cameras.main.shake(60,.004)}
   else if(!boom){boom=1;S.setVisible(false);fl.setAlpha(.85);this.tweens.add({targets:fl,alpha:0,duration:700});this.cameras.main.shake(700,.012);if(this.lsea)this.lsea.setTint(0x9a7ac8);
    A=this.add.image(400,128,'emA').setDepth(9).setScale(.15);this.tweens.add({targets:A,scale:1,duration:1200,ease:'Back.out'});
    for(let i=0;i<16;i++){const o=this.add.image(400,140,'emM').setDepth(13),a=Math.random()*6.283;this.tweens.add({targets:o,x:400+Math.cos(a)*(120+Math.random()*120),y:140+Math.sin(a)*(60+Math.random()*60),angle:Math.random()*360,alpha:0,duration:1400,ease:'Quad.out',onComplete:()=>o.destroy()})}}
   const ta=t<2.2?0:t<2.6?(t-2.2)/.4:t<4.1?1:Math.max(0,1-(t-4.1)/.5);t1.setAlpha(ta);t2.setAlpha(ta);
   ln.clear();if(t>2.6){const k=Math.min(1,(t-2.6)/.8);for(let y=40;y<40+280*k;y+=4)ln.fillStyle(0xe8d6ff,.5).fillRect(399,y,2,2)}},
   ()=>{fl.destroy();t1.destroy();t2.destroy();ln.destroy();S.destroy();m.spr=A;A.setScale(1);m.ph=2;m.x=400;m.y=128;m.gone=1;this.emMirOn();this.emSwitch(m);m.sw=12;m.cd=1;m.flc=this.time.now+6000})}
 emMirOn(){this.emMir=1;const src=[this.hd,...this.sg];this.rfl=src.map(o=>this.add.image(0,0,o.texture.key).setDepth(o.depth-.05).setAlpha(.5).setTint(0xd8c8ff));this.emLn=this.add.graphics().setDepth(1.25);this.dec.push(this.emLn)}
 emMirU(dt,p){if(!this.rfl)return;const src=[this.hd,...this.sg],now=this.time.now;src.forEach((o,i)=>{const r=this.rfl[i];if(r.texture.key!==o.texture.key)r.setTexture(o.texture.key);r.setPosition(800-o.x,o.y).setRotation(Math.PI-o.rotation).setFlipY(true).setScale(o.scaleX,o.scaleY)});
  const g=this.emLn;g.clear();for(let y=40;y<320;y+=4){const a=.25+.2*Math.sin(now/300+y*.05);g.fillStyle(0xe8d6ff,a).fillRect(399,y,2,2)}g.lineStyle(1.5,0xd8c8ff,.4+.2*Math.sin(now/150)).strokeEllipse(800-p.x,p.y+8,30,12)}
 emMirBite(fx,fy){const m=this.cur.en.find(e=>e.on&&e.k=='em');if(!m||m.ph!=2||m.st=='trans')return 0;const p=this.pl,rx=800-p.x,ry=p.y,fxr=-fx,dx=m.x-rx,dy=m.y+10-ry,d=Math.hypot(dx,dy);
  const sw=this.add.circle(rx+fxr*34,ry+fy*34,20,0xd8c8ff,.5).setDepth(12);this.tweens.add({targets:sw,alpha:0,scale:1.6,duration:160,onComplete:()=>sw.destroy()});
  if(d<C.BITE.range+46&&(dx*fxr+dy*fy)/(d||1)>.2){let dg=this.bdmg*.75;const L=this.lin;m.bc=(m.bc||0)+1;if(L.p>=1&&m.bc%2==0)dg+=9;m.hp-=dg;this.dtx(rx,ry-20,'-'+Math.round(dg),'#ffd0f8');if(L.p>=2)this.en=Math.min(this.emax,this.en+dg*.15);
   m.spr.setTintFill(0xffffff);this.time.delayedCall(80,()=>{if(m.spr)m.spr.clearTint()});const o=this.add.image(m.x+(Math.random()-.5)*20,m.y+(Math.random()-.5)*40,'emM').setDepth(13);this.tweens.add({targets:o,y:o.y+60,angle:90,alpha:0,duration:700,onComplete:()=>o.destroy()});
   if(m.hp<=0)this.emDie(m);return 1}
  if(Math.hypot(m.x-p.x,m.y-p.y)<150&&!(this.emNt>this.time.now)){this.emNt=this.time.now+2500;this.dtx(p.x,p.y-30,'거울 너머라 직접은 닿지 않는다 — 거울 속의 나로 물 것','#c8b8ff')}return 0}
 emMirSpit(){const m=this.cur.en.find(e=>e.on&&e.k=='em');if(!m||m.ph!=2||this.spitCd>0)return;const p=this.pl,rx=800-p.x,ry=p.y;if(Math.hypot(m.x-rx,m.y-ry)>280)return;
  this.spitCd=1.5;const a=Math.atan2(m.y-ry,m.x-rx),o=this.add.circle(rx,ry,4,0xe8d6ff,1).setStrokeStyle(1.5,0xc070ff).setDepth(11);this.pprj.push({o,x:rx,y:ry,a,v:310,t:1.1,tg:m,mir:1})}
 emDie(m){if(!m.on)return;if(m.ph==1){if(m.st!='trans'){m.hp=m.mh*.5;this.emTrans(m)}return}m.on=0;m.gone=1;this.kc=(this.kc||0)+1;const x=m.x,y=m.y;this.emPull=null;this.emMir=0;if(m.lvT){m.lvT.destroy();m.lvT=null}if(m.head){m.head.destroy();m.head=null}(this.emb||[]).forEach(q=>q.o.destroy());this.emb=[];if(m.g)m.g.clear();
  if(this.rfl){this.rfl.forEach(o=>this.tweens.add({targets:o,alpha:0,duration:800,onComplete:()=>o.destroy()}));this.rfl=null}if(this.emLn)this.emLn.clear();if(this.rwNm){this.rwNm.destroy();this.rwNm=null}
  const s=m.spr;m.spr=null;if(s){this.tweens.add({targets:s,y:y+70,scaleY:.2,alpha:0,duration:1800,ease:'Quad.in',onComplete:()=>s.destroy()})}
  for(let i=0;i<24;i++){const o=this.add.image(x+(Math.random()-.5)*80,y+(Math.random()-.5)*40,'emM').setDepth(13);this.tweens.add({targets:o,y:o.y+80+Math.random()*60,angle:Math.random()*200-100,alpha:0,delay:Math.random()*600,duration:1200,onComplete:()=>o.destroy()})}
  for(let i=0;i<8;i++){const r=this.add.ellipse(x,y+60,40,14).setStrokeStyle(2,0xe8d6ff,.8).setDepth(1.6);this.tweens.add({targets:r,scaleX:6,scaleY:5,alpha:0,delay:i*160,duration:1100,onComplete:()=>r.destroy()})}
  const rf=this.add.image(400,170,'rift').setDepth(5.5).setTint(0xffffff).setScale(.3).setAlpha(0);this.tweens.add({targets:rf,alpha:1,scaleX:2.2,scaleY:3,delay:900,duration:1600,ease:'Sine.out'});this.cameras.main.shake(500,.007);if(this.lsea)this.lsea.clearTint();
  this.gainXp(220);this.dtx(x,y-90,'여제가 라벤더 아래로 가라앉는다','#ffe066');
  this.time.delayedCall(2800,()=>{if(!this.over)this.ending('라벤더 바다가 잠잠해진 자리에, 바깥으로 이어지는 틈이 열렸다.')})}
