 // ===== v29: 분화 3단계 특수 퀘스트 · 중간 보스 · 특수 스킬 =====
 mbTex(){this.emTex();if(this.textures.exists('kzb'))return;
  const BAY=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
  const P=(x,X,Y,c,a)=>{x.globalAlpha=a??1;x.fillStyle=c;x.fillRect(Math.round(X),Math.round(Y),1,1);x.globalAlpha=1};
  const sell=(x,cx,cy,rx,ry,pal,ol,a)=>{const pts=[];for(let y=Math.floor(cy-ry)-1;y<=cy+ry+1;y++)for(let i=Math.floor(cx-rx)-1;i<=cx+rx+1;i++){const nx=(i+.5-cx)/rx,ny=(y+.5-cy)/ry,d=nx*nx+ny*ny;if(d<=1){const v=(nx*.55+ny*.83)*.55+Math.sqrt(1-d)*.55,t=v+(BAY[(y%4+4)%4][(i%4+4)%4]/16-.5)*.18;pts.push([i,y,pal[t<.12?0:t<.45?1:t<.78?2:3]])}}
   if(ol){const S=new Set(pts.map(q=>q[0]+','+q[1]));for(const[i,y]of pts)for(const[u,v]of[[1,0],[-1,0],[0,1],[0,-1]])if(!S.has((i+u)+','+(y+v)))P(x,i+u,y+v,ol,a)}for(const[i,y,c]of pts)P(x,i,y,c,a)};
  const poly=(x,pts,c,a)=>{x.globalAlpha=a??1;x.fillStyle=c;x.beginPath();x.moveTo(pts[0][0],pts[0][1]);for(const q of pts.slice(1))x.lineTo(q[0],q[1]);x.closePath();x.fill();x.globalAlpha=1};
  const line=(x,x0,y0,x1,y1,c,a)=>{const n=Math.ceil(Math.max(Math.abs(x1-x0),Math.abs(y1-y0)))+1;for(let i=0;i<=n;i++)P(x,x0+(x1-x0)*i/n,y0+(y1-y0)*i/n,c,a)};
  const bez=(p,t)=>{while(p.length>1){const q=[];for(let i=0;i<p.length-1;i++)q.push([p[i][0]+(p[i+1][0]-p[i][0])*t,p[i][1]+(p[i+1][1]-p[i][1])*t]);p=q}return p[0]};
  const glow=(x,cx,cy,r,c,a)=>{const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');x.globalAlpha=a;x.globalCompositeOperation='lighter';x.fillStyle=g;x.fillRect(cx-r,cy-r,r*2,r*2);x.globalCompositeOperation='source-over';x.globalAlpha=1};
  const KZ=['#5a1438','#a8306a','#e0508e','#ffa0c8'],RK=['#2a1448','#4a2a7a','#7a50b8','#b090e8'],QN=['#2a1048','#4a2280','#7a44c0','#b088f0'],WD=['#160f26','#30254a','#584a80','#9a8ac8'],CY=['#1a4a6a','#3a8ac0','#8ad8ff','#e8faff'];
  // 각성한 카직스 (머리가 위쪽)
  tex(this,'kzb',56,58,2,x=>{const cx=28,cy=36,S=.66;
   for(const s of[-1,1]){const w=[[cx+s*4*S,cy-2*S],[cx+s*30*S,cy-16*S],[cx+s*40*S,cy+4*S],[cx+s*22*S,cy+14*S],[cx+s*6*S,cy+8*S]];poly(x,w,'#4a1a5a',.6);for(let i=0;i<5;i++){const a=w[i],b=w[(i+1)%5];line(x,a[0],a[1],b[0],b[1],'#ffb0e0',.8)}for(let k=0;k<4;k++)line(x,cx+s*5*S,cy+2*S,cx+s*(16+k*7)*S,cy+(-12+k*7)*S,'#ff9ad0',.5)}
   for(const s of[-1,1])poly(x,[[cx+s*7*S,cy+12*S],[cx+s*16*S,cy+22*S],[cx+s*12*S,cy+24*S],[cx+s*5*S,cy+16*S]],KZ[1]);
   sell(x,cx,cy+4*S,9*S,14*S,KZ,'#1a0610');sell(x,cx,cy-12*S,7*S,6*S,KZ,'#1a0610');for(let k=0;k<4;k++)line(x,cx-6*S,cy+(k*5-2)*S,cx+6*S,cy+(k*5-2)*S,KZ[0],.6);
   for(const s of[-1,1]){const sx=cx+s*6*S,sy=cy-9*S,ex=cx+s*17*S,ey=cy-24*S;poly(x,[[sx-2*S,sy+2*S],[sx+2*S,sy-2*S],[ex+s*2*S,ey-1*S],[ex-s*2*S,ey+2*S]],KZ[2]);
    const o=[];for(let t=0;t<=16;t++)o.push(bez([[ex,ey],[ex+s*14*S,ey-3*S],[ex+s*14*S,ey-17*S],[ex+s*1*S,ey-23*S]],t/16));const inn=[];
    for(let i=0;i<=16;i++){const t=i/16,w=4.2*S*Math.sin(Math.PI*Math.min(1,t*1.15))+.6,nx=(o[Math.min(16,i+1)][0]-o[Math.max(0,i-1)][0]),ny=(o[Math.min(16,i+1)][1]-o[Math.max(0,i-1)][1]),L=Math.hypot(nx,ny)||1;inn.push([o[i][0]+s*ny/L*w,o[i][1]-s*nx/L*w])}
    poly(x,o.concat(inn.slice().reverse()),'#ffd0e4');for(let i=0;i<16;i++)line(x,o[i][0],o[i][1],o[i+1][0],o[i+1][1],'#ffffff',.9);for(let i=3;i<15;i+=2)line(x,inn[i][0],inn[i][1],inn[i][0]+(cx-inn[i][0])*.1,inn[i][1]+2,'#5a1438')}
   for(const s of[-1,1]){const X=cx+s*3*S,Y=cy-13*S;P(x,X,Y,'#ffe066');P(x,X+s,Y,'#000000');glow(x,X,Y,4,'#ffd040',.8);line(x,cx+s*2*S,cy-17*S,cx+s*8*S,cy-28*S,KZ[3])}
   for(const[a,b,c,d]of[[-3,-2,2,8],[2,8,-2,15],[4,0,7,6]])line(x,cx+a*S,cy+b*S,cx+c*S,cy+d*S,'#ffe0ff');glow(x,cx,cy+4*S,10,'#ff3fd0',.5)});
  // 각성한 렉사이 (솟은 모습 / 땅속 둔덕)
  tex(this,'rkb',62,54,2,x=>{const cx=31,cy=34,S=1.15,rx=22*S,ry=14*S;sell(x,cx,cy,rx,ry,RK,'#12061e');
   for(let k=-3;k<=3;k++){const y=cy+k*ry/4,w=rx*Math.sqrt(Math.max(0,1-(k/4)**2));line(x,cx-w+2,y,cx+w-2,y,k%2?RK[0]:RK[3],.7)}
   for(let k=-5;k<=5;k++){const X=cx+k*rx/6,Y=cy-ry*Math.sqrt(Math.max(0,1-(k/6)**2));line(x,X,Y,X+k*.7*S,Y-6*S,'#e8d8ff');P(x,X+k*.7*S,Y-6*S,'#ffffff')}
   const my=cy+ry*.55;poly(x,[[cx-rx*.42,my],[cx,my-ry*.28],[cx+rx*.42,my],[cx,my+ry*.28]],'#0a0210');for(let k=-4;k<=4;k++){line(x,cx+k*rx*.09,my-ry*.2,cx+k*rx*.08,my-ry*.04,'#f4e8ff');line(x,cx+k*rx*.09,my+ry*.2,cx+k*rx*.08,my+ry*.04,'#f4e8ff')}glow(x,cx,my,8,'#ff3f8a',.6);
   for(const s of[-1,1]){line(x,cx+s*5*S,cy-ry,cx+s*8*S,cy-ry-11*S,'#f0e080');line(x,cx+s*6*S,cy-ry,cx+s*9*S,cy-ry-11*S,'#d0b040')}sell(x,cx,cy-ry+1,2*S,2.5*S,['#801040','#ff4f8a','#ff8ab0','#ffd0e0'])});
  tex(this,'rkbm',52,26,2,x=>{sell(x,26,16,22,9,['#140a20','#24163a','#3a2856','#54407a'],'#08040e');for(let k=-4;k<=4;k++){const X=26+k*4.5;line(x,X,16-8*Math.sqrt(Math.max(0,1-(k/5)**2)),X+k*.5,10-8*Math.sqrt(Math.max(0,1-(k/5)**2)),'#c8b8f0')}
   for(let i=0;i<6;i++){const a=i/6*6.283;line(x,26,16,26+Math.cos(a)*24,16+Math.sin(a)*10,'#000000',.5)}});
  // 결정 여왕 (해파리 모양 치마 + 결정 왕관)
  tex(this,'qnb',58,72,2,x=>{const cx=29,cy=32,QP=['#2a0c40','#5a1c7a','#9a3cc0','#e08aff'];
   for(let k=-5;k<=5;k++){const x0=cx+k*3.2,y0=cy+10,L=18+((k*7+11)%9);let X=x0,Y=y0;for(let t=0;t<L;t++){X=x0+Math.sin(t*.35+k)*1.5+k*t*.05;Y=y0+t;P(x,X,Y,t<L*.7?QP[2]:QP[3]);P(x,X+1,Y,QP[1],.8)}P(x,X,Y+1,'#ffe0ff');glow(x,X,Y,3,'#ff6af0',.6)}
   for(let y=cy-2;y<cy+12;y++){const k=Math.max(0,(y-(cy-2))/14),w=10+11*Math.pow(k,.8);for(let i=Math.round(cx-w);i<=Math.round(cx+w);i++){const t=Math.abs(i-cx)/w;P(x,i,y,t>.9?QP[3]:(i+y)%7==0?QP[2]:t>.55?QP[1]:QP[2])}}
   for(let k=-4;k<=4;k++)line(x,cx+k*2.4,cy,cx+k*4.6,cy+11,QP[0],.6);
   sell(x,cx,cy-8,9,9,QN,'#12041e');for(const s of[-1,1]){P(x,cx+s*4,cy-9,'#ffe066');P(x,cx+s*4-s,cy-9,'#000000');glow(x,cx+s*4,cy-9,4,'#ffd040',.8)}line(x,cx,cy-6,cx,cy-2,'#12041e');
   for(let k=0;k<7;k++){const dx=-12+k*4,h=10+(k%2)*5,a=(k-3)*.12;for(let t=0;t<h;t++){const X=cx+dx+Math.sin(a)*t,Y=cy-15+Math.abs(dx)*.3-t;P(x,X,Y,t>h-3?'#ffd0ff':'#c060f0');if(t<h*.5)P(x,X+1,Y,'#8a30c0')}glow(x,cx+dx+Math.sin(a)*h,cy-15+Math.abs(dx)*.3-h,4,'#e080ff',.7)}});
  tex(this,'qcr',10,14,2,x=>{poly(x,[[5,0],[10,6],[5,14],[0,6]],CY[1]);poly(x,[[5,0],[10,6],[5,7]],CY[2]);poly(x,[[5,1],[7,5],[5,6]],CY[3]);line(x,5,0,5,14,CY[0],.5)});
  tex(this,'qsp',14,6,2,x=>{poly(x,[[0,1],[14,3],[0,5]],'#e080ff');line(x,1,3,13,3,'#fff0ff');P(x,0,3,'#7a2a9a')});
  // 각성한 감시자 (머리가 오른쪽)
  tex(this,'wdb',90,54,2,x=>{const cx=40,cy=27,S=1,n=7;
   for(let i=n-1;i>=0;i--){const u=(i-n/2)*7*S,r=(13-Math.abs(i-3)*1.2)*S,X=cx-u;for(const t of[-1,1]){line(x,X,cy+t*(r+1),X-2,cy+t*(r+6),'#9a8ac8');P(x,X-2,cy+t*(r+6),'#e0d8ff')}sell(x,X,cy,4.8*S,r,WD,'#0a0614');line(x,X+3,cy-r+2,X+3,cy+r-2,'#0a0614',.7)}
   const hx=cx+n/2*7*S;sell(x,hx,cy,6,10,['#0a0614','#2a1c40','#4a3a70','#8a78b8'],'#05030a');for(const t of[-1,1])line(x,hx+6,cy+t*6,hx+12,cy+t*2,'#e0d8ff');
   for(let k=0;k<3;k++){const ly=cy+(k-1)*6;sell(x,hx+3,ly,2.6,2.6,['#3a1408','#c05a10','#ffa040','#fff0c0']);glow(x,hx+3,ly,6,'#ff8a20',.8)}
   for(const t of[-1,1]){const X=cx-n/2*7*S-4,Y=cy+t*4;sell(x,X,Y,1.6,1.6,['#806010','#ffd040','#fff4a0','#ffffff']);glow(x,X,Y,5,'#ffe060',.8)}});
 }
 mbBushNear(x,y,R){return(this.cur.zn||[]).some(z=>z[2]==2&&Math.hypot((z[0]+.5)*C.T-x,(z[1]+.5)*C.T-y)<R)}
 mbLos(x1,y1,x2,y2){const n=Math.ceil(Math.hypot(x2-x1,y2-y1)/8);for(let i=1;i<n;i++)if(this.blk(x1+(x2-x1)*i/n,y1+(y2-y1)*i/n,24))return false;return true}
 // ----- 퀘스트 -----
 mqStart(k){if(this.mq||this.boss||this.over)return;this.mq={k,st:'open',room:this.cur,x:null,y:null};this.mqRift(this.cur);const Q=MBQ[k];
  if(this.mqC)this.mqC.destroy();const c=this.mqC=this.add.text(400,150,'★ 특수 퀘스트 — '+Q.q+'\n'+LN[k]+' 3단계에 이르자 둥지에 균열이 열렸다\n'+Q.d+'\n균열 위에 1초 머물면 들어간다 · 이기면 특수 스킬 「'+Q.s+'」',ST({fontSize:'12px',align:'center',color:'#ffe9a8',backgroundColor:'#241c38',padding:{x:12,y:8},lineSpacing:3})).setOrigin(.5).setDepth(64);
  this.tweens.add({targets:c,alpha:0,delay:6500,duration:600,onComplete:()=>{c.destroy();if(this.mqC===c)this.mqC=null}});this.cameras.main.flash(300,200,140,255)}
 mqRift(a){const Q=this.mq;if(!Q||Q.st!='open'||a!==Q.room)return;
  if(Q.x==null){let best=null,bd=1e9;for(let y=80;y<=280;y+=20)for(let x=100;x<=700;x+=20){if(this.blk(x,y,34)||(a.zn||[]).some(z=>Math.abs((z[0]+.5)*C.T-x)<40&&Math.abs((z[1]+.5)*C.T-y)<40))continue;const d=Math.hypot(x-400,y-150)+(Math.hypot(x-636,y-296)<90?500:0);if(d<bd){bd=d;best=[x,y]}}Q.x=best?best[0]:400;Q.y=best?best[1]:150}
  const g=this.add.image(Q.x,Q.y,'wglow').setDepth(.8).setTint(LCN[Q.k]).setAlpha(.7).setScale(.9),im=this.add.image(Q.x,Q.y,'rift').setDepth(5.5).setScale(1.25).setTint(LCN[Q.k]),t=this.add.text(Q.x,Q.y+40,'★ 특수 퀘스트 · 1초 머물기',ST({fontSize:'11px',fontStyle:'bold',color:'#ffe9a8'})).setOrigin(.5).setDepth(45);
  this.dec.push(g,im,t);this.tweens.add({targets:im,scaleX:{from:1.1,to:1.4},duration:700,yoyo:true,repeat:-1,ease:'Sine.inOut'});this.tweens.add({targets:t,alpha:{from:.5,to:1},duration:700,yoyo:true,repeat:-1})}
 // ----- 중간 보스 방 -----
 mbEnter(){const k=this.mq.k,p=this.pl,Q=MBQ[k];this.mbTex();for(const kk of['kzb','rkb','qnb','wdb'])this.seenM[kk]=1;if(this.mqC){this.mqC.destroy();this.mqC=null}
  this.mbRet={lv:this.lv,room:this.cur,x:this.mq.x,y:Math.min(300,this.mq.y+50),t0:this.time.now};
  this.lv.rooms.forEach(m=>{m.food.forEach(f=>{if(f.spr){f.spr.destroy();f.spr=null}});m.en.forEach(e=>{for(const kk of['spr','lvT','ring','mk','lsh'])if(e[kk]){e[kk].destroy();e[kk]=null}if(e.aim){e.aim.forEach(r=>r.destroy());e.aim=null}})});
  (this.prj||[]).forEach(q=>q.o.destroy());this.prj=[];this.tel=[];(this.mbb||[]).forEach(q=>q.o.destroy());this.mbb=[];
  const room={r:0,c:0,d:{N:0,S:0,W:0,E:0},ct:{},hp:{},obs:[],zn:[],food:[],en:[],seen:1,tr:'mb'+k,dd:5};
  for(const[c,r]of[[2,2],[17,2],[2,6],[17,6]])room.food.push({t:'s',c,r,p:0,on:1});
  if(k=='p')for(const[c,r]of[[2,1],[3,1],[2,2],[16,1],[17,1],[17,2],[1,4],[2,4],[17,4],[18,4],[2,7],[3,7],[16,7],[17,7],[9,7],[10,7]])room.zn.push([c,r,2]);
  if(k=='v'){let g=900;for(const[c,r]of[[5,2],[14,2],[5,6],[14,6]])room.obs.push([c,r,3,g++,0,c,r])}
  const plv=this.plv,lv=Math.min(18,plv+2),df=1+.06*(lv-1),E=(kk,x,y,mh,o)=>Object.assign({k:kk,x,y,on:1,mh,hp:mh,lv,df,mb:1,st:'intro',cd:1,tm:0,gone:0},o||{});
  if(k=='p')room.en.push(E('kzb',400,120,Math.round(380+42*plv),{br:18,nm:'각성한 카직스',bi:0}));
  if(k=='c')room.en.push(E('qnb',400,118,Math.round(320+36*plv),{br:30,nm:'결정 여왕',bi:0}));
  if(k=='v')room.en.push(E('wdb',400,180,Math.round(460+50*plv),{br:34,nm:'각성한 감시자',bi:0,fa:Math.PI/2}));
  this.lv={rooms:[room],start:room,exit:null,at:()=>null};this.mbOn=k;this.mbRO=0;this.mbT=0;
  p.setPosition(400,300);p.setVelocity(0,0);this.vx=this.vy=this.jx=this.jy=0;this.ang=-Math.PI/2;this.sp.forEach((q,i)=>{q.x=400;q.y=304+7*(i+1)});this.inv=2;this.en=Math.min(this.emax,this.en+30);
  this.enter(room);if(this.rlb){this.rlb.destroy();this.rlb=null}
  if(!this.telG){this.telG=this.add.graphics().setDepth(1.55)}
  if(k=='c')for(const[x,y,f]of[[60,300,0],[740,300,1],[52,120,1],[748,130,0],[150,330,0],[650,332,1]])this.dec.push(this.add.image(x,y,'cor').setOrigin(.5,1).setDepth(2).setFlipX(!!f).setTint(0xd0b0ff));
  const m=room.en[0],S=m.spr;S.setAlpha(0).setScale(.3);
  const ov=this.add.rectangle(400,180,800,360,0x000000,1).setDepth(150),t1=this.add.text(400,128,'★ 특수 퀘스트 — '+Q.q,ST({fontSize:'13px',fontStyle:'bold',color:'#ffe9a8'})).setOrigin(.5).setDepth(151).setAlpha(0),t2=this.add.text(400,156,Q.b,ST({fontSize:'26px',fontStyle:'bold',color:LCS[k]})).setOrigin(.5).setDepth(151).setAlpha(0),t3=this.add.text(400,188,Q.d,ST({fontSize:'12px',color:'#d8cceb',align:'center',wordWrap:{width:560}})).setOrigin(.5,0).setDepth(151).setAlpha(0);
  let boom=0;
  this.cineStart(4.2,(t)=>{ov.setAlpha(Math.max(0,1-t/.8));
   if(t>.9&&!boom){boom=1;this.tweens.add({targets:S,alpha:1,scale:1,duration:700,ease:'Back.out'});this.cameras.main.shake(600,.01);for(let i=0;i<18;i++){const a=i/18*6.283,b=this.add.circle(m.x,m.y,3,LCN[k],.9).setDepth(12);this.tweens.add({targets:b,x:m.x+Math.cos(a)*120,y:m.y+Math.sin(a)*60,alpha:0,duration:700,onComplete:()=>b.destroy()})}}
   const ta=t<1.4?0:t<1.8?(t-1.4)/.4:t<3.7?1:Math.max(0,1-(t-3.7)/.5);t1.setAlpha(ta);t2.setAlpha(ta);t3.setAlpha(ta)},
   ()=>{ov.destroy();t1.destroy();t2.destroy();t3.destroy();S.setAlpha(1).setScale(1);m.st=k=='p'?'stalk':k=='c'?'idle':'track';m.cd=1;m.flc=this.time.now+6000})}
 mbReturn(){const R=this.mbRet,p=this.pl;if(!R)return;this.mbRet=null;this.mbOn=null;this.mbRO=0;
  this.lv.rooms.forEach(m=>{m.food.forEach(f=>{if(f.spr){f.spr.destroy();f.spr=null}});m.en.forEach(e=>{for(const kk of['spr','lvT','ring','mk','lsh','g','nmT'])if(e[kk]){e[kk].destroy();e[kk]=null}})});
  this.tel=[];(this.mbb||[]).forEach(q=>q.o.destroy());this.mbb=[];if(this.telG)this.telG.clear();
  this.lv=R.lv;this.zt0+=this.time.now-R.t0;p.setPosition(R.x,R.y);p.setVelocity(0,0);this.vx=this.vy=this.jx=this.jy=0;this.sp.forEach((q,i)=>{q.x=R.x;q.y=R.y+4+7*(i+1)});this.inv=1.5;
  this.enter(R.room);const ov=this.add.rectangle(400,180,800,360,0xffffff,.8).setDepth(150);this.tweens.add({targets:ov,alpha:0,duration:700,onComplete:()=>ov.destroy()})}
 mbBar(g,m){const i=m.bi||0,y=6+i*24,r=Math.max(0,m.hp/m.mh);g.fillStyle(0x0d0818,.75).fillRoundedRect(296,y,208,22,5);g.fillStyle(0x3a2f57).fillRect(302,y+14,196,5);g.fillStyle(m.k=='rkb'?0xc070ff:m.k=='qnb'?0x9fd8ff:m.k=='wdb'?0xff9a4a:0xff7a9a).fillRect(302,y+14,196*r,5);
  if(m.k=='qnb'&&m.pl){const n=m.pl.filter(q=>q.on).length;for(let j=0;j<6;j++)g.fillStyle(j<n?0x8ad8ff:0x2a3a4a).fillRect(470+j*5,y+3,4,7)}
  if(!m.nmT)m.nmT=this.add.text(400,y+7,m.nm,ST({fontSize:'9px',fontStyle:'bold',color:'#ffe9f4'})).setOrigin(.5).setDepth(61);m.nmT.setVisible(!this.cine).setPosition(400,y+7)}
 mbMul(m,bt){if(m.gone)return 0;const now=this.time.now,p=this.pl;
  if(m.k=='kzb')return m.st=='rest'?1.35:1;
  if(m.k=='qnb'){if(m.pl&&m.pl.some(q=>q.on)){if(!(m.wkT>now)){m.wkT=now+900;this.dtx(m.x,m.y-50,'결정 갑옷이 막는다 — 가시를 되받아칠 것','#9fd8ff')}return .12}return m.ex>0?1.35:1}
  if(m.k=='wdb'){const df=Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(p.y-m.y,p.x-m.x)-m.fa));if(m.st=='cool')return df>1.9?1.8:1.3;if(df>1.9){if(!(m.wkT>now)){m.wkT=now+600;this.dtx(m.x,m.y-44,'약점!','#ffb070')}return 1.5}if(df<.9){if(!(m.wkT>now)){m.wkT=now+900;this.dtx(m.x,m.y-44,'단단한 앞껍질','#a0a0b8')}return .3}return 1}
  return 1}
 mbDie(m){if(!m.on)return;m.on=0;m.gone=1;this.kc=(this.kc||0)+1;const x=m.x,y=m.y,s=m.spr;m.spr=null;if(m.g){m.g.destroy();m.g=null}if(m.nmT){m.nmT.destroy();m.nmT=null}if(m.lvT){m.lvT.destroy();m.lvT=null}
  if(m.pl)m.pl.forEach(q=>{if(q.o){q.o.destroy();q.o=null}q.on=0});this.tel=this.tel.filter(q=>q.m!==m);
  if(s){s.setTintFill(0xffffff);this.tweens.add({targets:s,alpha:0,scale:1.4,duration:900,onComplete:()=>s.destroy()})}
  for(let i=0;i<22;i++){const a=Math.random()*6.283,b=this.add.circle(x,y,2+Math.random()*2,i%2?0xffffff:LCN[this.mbOn||'v'],.9).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*(60+Math.random()*80),y:y+Math.sin(a)*(40+Math.random()*50),alpha:0,duration:900,onComplete:()=>b.destroy()})}
  this.cameras.main.shake(400,.008);this.gainXp(m.k=='rkb'?50:120);this.en=Math.min(this.emax,this.en+25);this.dtx(x,y-40,m.nm+' 처치','#ffe066');
  if(m.k=='kzb'&&!m.rk){m.rk=1;this.mbRek()}
  if(!this.cur.en.some(e=>e.on&&e.mb))this.time.delayedCall(900,()=>{if(!this.over)this.mbWin()})}
 mbWin(){const k=this.mbOn;if(!k||this.mbRO)return;this.mbRO=1;this.mq.st='done';this.skl=k;this.skCd=0;this.ess(2);this.en=this.emax;(this.mbb||[]).forEach(q=>q.o.destroy());this.mbb=[];this.tel=[];
  const Q=MBQ[k],c=this.add.text(400,120,'특수 퀘스트 완료!\n특수 스킬 「'+Q.s+'」을 얻었다\n'+Q.sd+'\n'+(this.sys.game.device.input.touch?'오른쪽 위 작은 스킬 버튼':'Q 키 · 오른쪽 스킬 버튼')+'으로 쓴다',ST({fontSize:'13px',align:'center',color:'#ffe9a8',backgroundColor:'#241c38',padding:{x:14,y:9},lineSpacing:4})).setOrigin(.5).setDepth(64);
  this.tweens.add({targets:c,alpha:0,delay:6500,duration:600,onComplete:()=>c.destroy()});this.cameras.main.flash(400,255,240,200);
  const pt=this.add.image(400,200,'portal').setDepth(3).setTint(LCN[k]),lt=this.add.text(400,240,'1초 머물면 돌아간다',ST({fontSize:'11px',color:'#ffe9a8',fontStyle:'bold'})).setOrigin(.5).setDepth(45);this.dec.push(pt,lt);this.tweens.add({targets:pt,scale:{from:.9,to:1.15},duration:700,yoyo:true,repeat:-1})}
 // ----- 예고 (원 · 선 · 부채꼴) -----
 telAdd(o){o.t0=o.t;this.tel.push(o);return o}
 telIn(q,x,y){if(q.k=='c')return((x-q.x)/q.r)**2+((y-q.y)/(q.r*(q.sy||1)))**2<1;
  if(q.k=='l'){const ux=q.x2-q.x,uy=q.y2-q.y,L=Math.hypot(ux,uy)||1,t=((x-q.x)*ux+(y-q.y)*uy)/(L*L),n=Math.abs((x-q.x)*uy-(y-q.y)*ux)/L;return t>-.04&&t<1.04&&n<q.w/2+6}
  if(q.k=='s'){const d=Math.hypot(x-q.x,y-q.y);return d<q.r+6&&Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(y-q.y,x-q.x)-q.a))<q.h}return false}
 telU(dt){const g=this.telG;if(!g)return;g.clear();if(!this.tel||!this.tel.length)return;const p=this.pl,now=this.time.now;
  for(const q of this.tel){q.t-=dt;const k=Math.max(0,Math.min(1,1-q.t/q.t0)),col=q.col||0xff3b4f,pu=.5+.5*Math.sin(now/55);
   if(q.k=='c'){const ry=q.r*(q.sy||1);g.fillStyle(col,.1+.14*k).fillEllipse(q.x,q.y,q.r*2,ry*2);g.lineStyle(2,0xff5a7a,.9).strokeEllipse(q.x,q.y,q.r*2,ry*2);g.lineStyle(1.5,0xffffff,.55).strokeEllipse(q.x,q.y,q.r*2*k,ry*2*k)}
   else if(q.k=='l'){g.lineStyle(q.w,col,.1+.16*k+(k>.7?.1*pu:0)).lineBetween(q.x,q.y,q.x2,q.y2);g.lineStyle(2,0xff5a7a,.9).lineBetween(q.x,q.y,q.x2,q.y2)}
   else if(q.k=='s'){g.fillStyle(col,.1+.16*k).slice(q.x,q.y,q.r,q.a-q.h,q.a+q.h,false).fillPath();g.lineStyle(2,0xff5a7a,.9).beginPath().arc(q.x,q.y,q.r,q.a-q.h,q.a+q.h,false).strokePath();g.lineStyle(1.5,0xffffff,.5).beginPath().arc(q.x,q.y,q.r*k,q.a-q.h,q.a+q.h,false).strokePath()}
   if(q.t<=0&&!q.done){q.done=1;if(q.dmg&&this.telIn(q,p.x,p.y)){this.hurt(q.dmg,q.src,q.m);if(q.hit)q.hit(q)}if(q.on)q.on(q);
    if(q.fx!==0){const f=this.add.graphics().setDepth(12);if(q.k=='c')f.fillStyle(0xffffff,.45).fillEllipse(q.x,q.y,q.r*2,q.r*2*(q.sy||1));else if(q.k=='l')f.lineStyle(q.w*.7,0xffffff,.6).lineBetween(q.x,q.y,q.x2,q.y2);else f.fillStyle(0xffffff,.4).slice(q.x,q.y,q.r,q.a-q.h,q.a+q.h,false).fillPath();this.tweens.add({targets:f,alpha:0,duration:260,onComplete:()=>f.destroy()})}}}
  this.tel=this.tel.filter(q=>!q.done)}
 mbbU(dt,p){if(!this.mbb||!this.mbb.length)return;const qn=this.cur.en.find(e=>e.on&&e.k=='qnb');
  for(const q of this.mbb){q.t-=dt;
   if(q.ref&&qn){const tg=(qn.pl||[]).filter(o=>o.on).sort((a,b)=>Math.hypot(a.x-q.x,a.y-q.y)-Math.hypot(b.x-q.x,b.y-q.y))[0]||{x:qn.x,y:qn.y,body:1},a=Math.atan2(tg.y-q.y,tg.x-q.x),v=330;q.vx=Math.cos(a)*v;q.vy=Math.sin(a)*v;
    if(Math.hypot(tg.x-q.x,tg.y-q.y)<16){q.t=0;if(tg.body){this.dmgM(qn,24*(qn.ex>0?1.5:1),1);this.dtx(qn.x,qn.y-40,'되받아친 가시!','#9fd8ff')}else this.qnBreak(qn,tg)}}
   q.x+=q.vx*dt;q.y+=q.vy*dt;q.o.setPosition(q.x,q.y).setRotation(Math.atan2(q.vy,q.vx));
   if(!q.ref&&Math.hypot(p.x-q.x,p.y-q.y)<12){this.hurt(q.dmg,q.src,q.m);q.t=0}
   if(q.x<30||q.x>770||q.y<30||q.y>330||(!q.ref&&this.blk(q.x,q.y,16)))q.t=0;if(q.t<=0)q.o.destroy()}
  this.mbb=this.mbb.filter(q=>q.t>0)}
 mbShot(x,y,a,v,dmg,src,m,tx){const o=this.add.image(x,y,tx||'qsp').setDepth(11).setRotation(a);if(tx=='emo')o.setTint(0xff7ab8);const q={o,x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:3,dmg,src,m,k:tx||'spk'};this.mbb.push(q);return q}
 // ----- 각성한 카직스 -----
 kzbAI(m,dt,p){if(m.st=='intro')return;const s=m.spr,now=this.time.now,dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,en=m.hp<m.mh*.3?.75:1,D=v=>Math.round(v*m.df);if(!m.g)m.g=this.add.graphics().setDepth(1.5);const g=m.g;g.clear();
  m.cd-=dt;m.tm-=dt;m.hc=(m.hc??8)-dt;if(!m.rk&&m.hp<=m.mh*.5){m.rk=1;this.mbRek()}
  const iso=!this.mbBushNear(p.x,p.y,130);m.iso=iso;
  if(iso&&m.st!='hide'&&m.st!='ambush'){const pu=.5+.5*Math.sin(now/90);g.lineStyle(2,0xff3b4f,.45+.4*pu).strokeEllipse(p.x,p.y+6,44,22);g.fillStyle(0xff3b4f,.6).fillTriangle(p.x-5,p.y-30,p.x+5,p.y-30,p.x,p.y-22)}
  let face=Math.atan2(dy,dx);
  switch(m.st){
  case 'stalk':{const want=120,side=m.side||(m.side=1);if(Math.random()<.004)m.side=-side;const rx=dx/d,ry=dy/d;let vx=-ry*side*80+rx*(d-want)*1.4,vy=rx*side*80+ry*(d-want)*1.4,l=Math.hypot(vx,vy);if(l>170){vx*=170/l;vy*=170/l}if(m.y<100&&vy<0)vy=40;this.mv(m,vx*dt,vy*dt,26);
   if(m.cd<=0){if(iso&&!(m.icd>now)){m.st='mark';m.tm=.9;m.icd=now+6500;this.dtx(p.x,p.y-38,'고립되었다! — 덤불 곁으로','#ff6a8a')}
    else if(m.hc<=0){const b=(this.cur.zn||[]).filter(z=>z[2]==2).map(z=>[(z[0]+.5)*C.T,(z[1]+.5)*C.T]).sort((a,b)=>Math.hypot(a[0]-m.x,a[1]-m.y)-Math.hypot(b[0]-m.x,b[1]-m.y))[0];if(b){m.st='hide';m.hx=b[0];m.hy=b[1]}else m.hc=8}
    else if(d<105){m.st='slash';m.tm=.7*en;this.telAdd({k:'s',x:m.x,y:m.y,r:92,a:face,h:.85,t:.7*en,dmg:D(14),src:'카직스의 할퀴기',m})}
    else{m.st='spk';m.tm=.55*en;m.sa=face;this.telAdd({k:'l',x:m.x,y:m.y,x2:m.x+Math.cos(face)*360,y2:m.y+Math.sin(face)*360,w:14,t:.5*en,col:0xa040ff,src:'',fx:0})}}}break;
  case 'mark':if(m.tm<=0){m.ln=0;this.kzLeap(m,en,D)}break;
  case 'leapW':face=Math.atan2(m.ty-m.y,m.tx-m.x);if(m.tm<=0){m.st='leap';m.lh=0}break;
  case 'leap':{const lx=m.tx-m.x,ly=m.ty-m.y,ll=Math.hypot(lx,ly),v=700;face=Math.atan2(ly,lx);if(Math.random()<.7){const b=this.add.image(m.x,m.y,'kzb').setDepth(8.9).setAlpha(.35).setRotation(face+Math.PI/2).setTint(0xff7ab8);this.tweens.add({targets:b,alpha:0,duration:240,onComplete:()=>b.destroy()})}
   if(ll<v*dt){m.x=m.tx;m.y=m.ty;m.ln++;const r=this.add.ellipse(m.x,m.y+10,60,24).setStrokeStyle(2,0xff9ad0,.8).setDepth(1.6);this.tweens.add({targets:r,scale:1.6,alpha:0,duration:300,onComplete:()=>r.destroy()});if(m.ln<3)this.kzLeap(m,en,D);else{m.st='rest';m.tm=1.6;this.dtx(m.x,m.y-50,'지쳤다 — 지금!','#ffe066')}}
   else{m.x+=lx/ll*v*dt;m.y+=ly/ll*v*dt}if(!m.lh&&Math.hypot(p.x-m.x,p.y-m.y)<36){m.lh=1;this.hurt(D(18),'카직스의 도약',m)}}break;
  case 'rest':s.setAlpha(.75+.25*Math.sin(now/80));if(m.tm<=0){s.setAlpha(1);m.st='stalk';m.cd=.8}break;
  case 'recover':if(m.tm<=0){m.st='stalk';m.cd=.5}break;
  case 'slash':if(m.tm<=0){m.st='recover';m.tm=.6;m.cd=.75*en;for(let i=0;i<5;i++){const a=face-.9+i*.45,b=this.add.rectangle(m.x+Math.cos(a)*50,m.y+Math.sin(a)*50,14,3,0xffd0e4).setRotation(a+1.2).setDepth(12);this.tweens.add({targets:b,alpha:0,duration:220,onComplete:()=>b.destroy()})}}break;
  case 'spk':face=m.sa;if(m.tm<=0){for(let i=-2;i<=2;i++)this.mbShot(m.x,m.y,m.sa+i*.22,280,D(9),'카직스의 공허 가시',m,'emo');m.st='recover';m.tm=.45;m.cd=.9*en}break;
  case 'hide':{const hx=m.hx-m.x,hy=m.hy-m.y,hl=Math.hypot(hx,hy);face=Math.atan2(hy,hx);if(hl<8){m.st='ambush';m.gone=1;m.tm=1.4+Math.random()*1.2;this.tweens.add({targets:s,alpha:.08,duration:250})}else{m.x+=hx/hl*Math.min(hl,280*dt);m.y+=hy/hl*Math.min(hl,280*dt)}}break;
  case 'ambush':if(Math.random()<.08){const b=this.add.circle(m.x+(Math.random()-.5)*30,m.y+(Math.random()-.5)*20,1.5,0xff9ad0,.7).setDepth(12);this.tweens.add({targets:b,y:b.y-14,alpha:0,duration:500,onComplete:()=>b.destroy()})}
   if(m.tm<=0){m.st='pounceW';m.tm=.5*en;m.tx=Phaser.Math.Clamp(p.x,70,730);m.ty=Phaser.Math.Clamp(p.y,70,300);this.telAdd({k:'l',x:m.x,y:m.y,x2:m.tx,y2:m.ty,w:40,t:.5*en,src:'',fx:0});this.tweens.add({targets:s,alpha:1,duration:200})}break;
  case 'pounceW':face=Math.atan2(m.ty-m.y,m.tx-m.x);if(m.tm<=0){m.st='pounce';m.gone=0;m.lh=0}break;
  case 'pounce':{const lx=m.tx-m.x,ly=m.ty-m.y,ll=Math.hypot(lx,ly),v=780;face=Math.atan2(ly,lx);if(ll<v*dt){m.x=m.tx;m.y=m.ty;m.st='stalk';m.cd=.9;m.hc=9+Math.random()*3}else{m.x+=lx/ll*v*dt;m.y+=ly/ll*v*dt}if(!m.lh&&Math.hypot(p.x-m.x,p.y-m.y)<38){m.lh=1;this.hurt(D(20),'카직스의 매복',m)}}break}
  s.setPosition(m.x,m.y).setRotation(face+Math.PI/2)}
 kzLeap(m,en,D){const p=this.pl;m.st='leapW';m.tm=(m.ln?.42:.55)*en;m.tx=Phaser.Math.Clamp(p.x,70,730);m.ty=Phaser.Math.Clamp(p.y,70,300);this.telAdd({k:'l',x:m.x,y:m.y,x2:m.tx,y2:m.ty,w:44,t:m.tm,src:'',fx:0});this.telAdd({k:'c',x:m.tx,y:m.ty,r:30,sy:.6,t:m.tm,src:'',fx:0})}
 mbRek(){const p=this.pl,x=p.x<400?680:120,y=250,kz=this.cur.en.find(e=>e.k=='kzb'),mh=Math.round((kz?kz.mh:500)*.4),lv=kz?kz.lv:this.plv+2;
  const e={k:'rkb',x,y,on:1,mh,hp:mh,lv,df:1+.06*(lv-1),mb:1,st:'under',cd:1.5,tm:2,gone:1,br:34,nm:'각성한 렉사이',bi:1};this.cur.en.push(e);this.mkSpr(e);
  this.cameras.main.shake(700,.012);const t=this.add.text(400,96,'땅이 울린다 — 각성한 렉사이가 굴을 파고 다가온다',ST({fontSize:'14px',fontStyle:'bold',color:'#c8a8ff',backgroundColor:'#241c38',padding:{x:10,y:5}})).setOrigin(.5).setDepth(64);this.tweens.add({targets:t,alpha:0,delay:2600,duration:500,onComplete:()=>t.destroy()})}
 // ----- 각성한 렉사이 -----
 rkbAI(m,dt,p){const s=m.spr,now=this.time.now,dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,D=v=>Math.round(v*m.df),en=m.hp<m.mh*.4?.8:1;if(!m.g)m.g=this.add.graphics().setDepth(1.5);const g=m.g;g.clear();m.cd-=dt;m.tm-=dt;
  m.trl=m.trl||[];for(const q of m.trl){q.t-=dt;g.fillStyle(0x3a2856,Math.max(0,q.t/2)*.8).fillEllipse(q.x,q.y,10,5)}m.trl=m.trl.filter(q=>q.t>0);
  switch(m.st){
  case 'under':{m.gone=1;if(s.texture.key!='rkbm')s.setTexture('rkbm');s.setAlpha(.85);const v=125/en;m.x+=dx/d*Math.min(d,v*dt);m.y+=dy/d*Math.min(d,v*dt);m.x=Phaser.Math.Clamp(m.x,70,730);m.y=Phaser.Math.Clamp(m.y,70,300);
   m.tt=(m.tt||0)-dt;if(m.tt<=0){m.tt=.1;m.trl.push({x:m.x+(Math.random()-.5)*10,y:m.y+6,t:2})}
   if(m.tm<=0||d<36){if(!(m.lc>now)&&d>120){m.lc=now+7000;const a=Math.atan2(dy,dx);m.st='line';m.tm=1.6;for(let i=0;i<4;i++){const x=Phaser.Math.Clamp(m.x+Math.cos(a)*(50+i*62),70,730),y=Phaser.Math.Clamp(m.y+Math.sin(a)*(50+i*62),70,300);this.telAdd({k:'c',x,y,r:36,sy:.7,t:.7+i*.22,dmg:D(16),src:'렉사이의 땅굴 줄기',m,on:q=>this.rkPop(q.x,q.y)});m.lx=x;m.ly=y}}
    else{m.st='warn';m.tm=.75*en;this.telAdd({k:'c',x:m.x,y:m.y,r:58,sy:.7,t:.75*en,dmg:D(24),src:'각성한 렉사이의 솟구치기',m,hit:()=>{const kx=p.x-m.x,ky=p.y-m.y,kl=Math.hypot(kx,ky)||1;p.setVelocity(kx/kl*420,ky/kl*420)}})}}}break;
  case 'warn':if(m.tm<=0){this.rkUp(m)}break;
  case 'line':if(m.tm<=0){m.x=m.lx;m.y=m.ly;this.rkUp(m)}break;
  case 'up':{const fa=Math.atan2(dy,dx);if(d<96&&m.cd<=0){m.cd=1.3;this.telAdd({k:'s',x:m.x,y:m.y,r:96,a:fa,h:.8,t:.5,dmg:D(14),src:'각성한 렉사이의 물기',m})}if(m.tm<=0){m.st='dive';m.tm=.35;this.tweens.add({targets:s,scaleY:.3,alpha:.5,duration:300})}}break;
  case 'dive':if(m.tm<=0){s.setScale(1);m.st='under';m.tm=2.4+Math.random();m.gone=1}break}
  s.setPosition(m.x,m.y)}
 rkPop(x,y){const r=this.add.ellipse(x,y,60,28,0xc8b8f0,.4).setDepth(12);this.tweens.add({targets:r,scale:1.5,alpha:0,duration:300,onComplete:()=>r.destroy()});for(let i=0;i<6;i++){const a=Math.random()*6.283,b=this.add.rectangle(x,y,4,3,0x6a4a9a).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*30,y:y+Math.sin(a)*16-10,alpha:0,duration:400,onComplete:()=>b.destroy()})}}
 rkUp(m){const s=m.spr;m.st='up';m.tm=2.2;m.gone=0;m.cd=.6;s.setTexture('rkb').setAlpha(1).setScale(1,.2);this.tweens.add({targets:s,scaleY:1,duration:220,ease:'Back.out'});this.cameras.main.shake(200,.008);this.rkPop(m.x,m.y)}
 // ----- 결정 여왕 -----
 qnbAI(m,dt,p){const s=m.spr,now=this.time.now,dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,D=v=>Math.round(v*m.df),en=m.hp<m.mh*.35?.8:1;if(!m.g)m.g=this.add.graphics().setDepth(1.5);const g=m.g;g.clear();
  if(!m.pl){m.pl=[];for(let i=0;i<6;i++)m.pl.push({a:i/6*6.283,on:1,o:this.add.image(m.x,m.y,'qcr').setDepth(9.5)})}
  if(m.st!='intro'){m.x=400+Math.sin(now/2600)*150;m.y=118+Math.sin(now/1700)*16}s.setPosition(m.x,m.y+Math.sin(now/400)*2);
  for(const q of m.pl){q.a+=dt*.9;q.x=m.x+Math.cos(q.a)*82;q.y=m.y+8+Math.sin(q.a)*34;if(q.o){q.o.setPosition(q.x,q.y).setDepth(Math.sin(q.a)>0?9.5:8.5).setVisible(q.on)}}
  if(m.st=='intro')return;m.cd-=dt;m.tm-=dt;
  const nOn=m.pl.filter(q=>q.on).length;
  if(nOn==0&&!(m.ex>0)&&!m.rg){m.ex=6;this.dtx(m.x,m.y-60,'결정 갑옷이 모두 깨졌다 — 지금 물 것!','#ffe066');this.cameras.main.shake(300,.008)}
  if(m.ex>0){m.ex-=dt;s.setTint(Math.floor(now/120)%2?0xffd0f0:0xffffff);g.lineStyle(2,0xffe066,.5+.3*Math.sin(now/80)).strokeEllipse(m.x,m.y+4,100,120);if(m.ex<=0){s.clearTint();m.rg=1;const n=m.hp<m.mh*.35?4:6;m.pl.forEach((q,i)=>{if(i<n){q.on=1;q.o.setScale(.1);this.tweens.add({targets:q.o,scale:1,duration:600,ease:'Back.out'})}});this.dtx(m.x,m.y-60,'결정 갑옷이 다시 자란다','#9fd8ff');this.time.delayedCall(700,()=>{m.rg=0})}}
  if(m.cg){const C2=m.cg;C2.t-=dt;const k=Math.max(0,1-C2.t/C2.t0),rr=C2.t>0?74:74*(1+C2.t/.3);
   for(let i=0;i<16;i++){const a=i/16*6.283;if(Math.abs(Phaser.Math.Angle.Wrap(a-C2.gap))<.45)continue;const x=C2.x+Math.cos(a)*rr,y=C2.y+Math.sin(a)*rr*.6;g.lineStyle(2,0xe080ff,.9).lineBetween(x,y,x,y-8-4*k);g.fillStyle(0xfff0ff,1).fillCircle(x,y-9-4*k,1.5)}
   g.lineStyle(1.5,0xff5a7a,.5+.3*k).strokeEllipse(C2.x,C2.y,148,148*.6);
   const pd=Math.hypot((p.x-C2.x),(p.y-C2.y)/.6),pa=Math.atan2((p.y-C2.y)/.6,p.x-C2.x);if(C2.t>0&&Math.abs(pd-74)<10&&Math.abs(Phaser.Math.Angle.Wrap(pa-C2.gap))>.45&&!(C2.sc>now)){C2.sc=now+500;this.hurt(D(8),'산호 감옥의 가시',m);this.slow=1}
   if(C2.t<=-.3){if(pd<74)this.hurt(D(22),'산호 감옥',m);const r=this.add.ellipse(C2.x,C2.y,40,24,0xffd0ff,.6).setDepth(12);this.tweens.add({targets:r,scale:2,alpha:0,duration:300,onComplete:()=>r.destroy()});m.cg=null}}
  if(m.cd<=0&&m.st=='idle'){const r=Math.random();
   if(r<.46){m.st='volley';m.vn=0;m.tm=.2}
   else if(r<.64&&!(m.cgc>now)&&!m.cg){m.cgc=now+9000;m.cg={x:p.x,y:p.y,gap:Math.random()*6.283,t:1.5*en,t0:1.5*en};this.dtx(p.x,p.y-40,'산호 감옥 — 틈으로 빠질 것','#e080ff');m.cd=.8;}
   else if(r<.82&&d<230){const a=Math.atan2(dy,dx);this.telAdd({k:'s',x:m.x,y:m.y+20,r:170,a,h:.36,t:.8*en,dmg:D(18),src:'여왕의 촉수',m});m.cd=1.2*en}
   else{for(let i=0;i<4;i++)this.telAdd({k:'c',x:Phaser.Math.Clamp(p.x+(i?(Math.random()-.5)*130:0),70,730),y:Phaser.Math.Clamp(p.y+(i?(Math.random()-.5)*80:0),70,300),r:30,sy:.7,t:.9+i*.1,dmg:D(14),src:'결정 비',m});m.cd=1.1*en}}
  if(m.st=='volley'&&m.tm<=0){m.vn++;m.tm=.28;const a=Math.atan2(p.y-m.y-10,p.x-m.x);this.mbShot(m.x,m.y+10,a+(m.vn-2)*.32,175,D(10),'여왕의 산호 가시',m);const f=this.add.circle(m.x,m.y+10,8,0xe080ff,.7).setDepth(12);this.tweens.add({targets:f,scale:2,alpha:0,duration:250,onComplete:()=>f.destroy()});if(m.vn>=3){m.st='idle';m.cd=1.0*en}}}
 qnBreak(m,q){q.on=0;const x=q.x,y=q.y;for(let i=0;i<8;i++){const a=Math.random()*6.283,b=this.add.rectangle(x,y,4,6,0x8ad8ff).setRotation(a).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*30,y:y+Math.sin(a)*20,angle:200,alpha:0,duration:500,onComplete:()=>b.destroy()})}this.dtx(x,y-14,'갑옷 파괴!','#8ad8ff')}
 // ----- 각성한 감시자 -----
 wdbAI(m,dt,p){if(m.st=='intro')return;const s=m.spr,now=this.time.now,dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,ta=Math.atan2(dy,dx),D=v=>Math.round(v*m.df),en=m.hp<m.mh*.35;if(!m.g)m.g=this.add.graphics().setDepth(39);const g=m.g;g.clear();
  m.cd-=dt;m.tm-=dt;const turn=(goal,r)=>{m.fa+=Phaser.Math.Clamp(Phaser.Math.Angle.Wrap(goal-m.fa),-r*dt,r*dt)},back=Math.abs(Phaser.Math.Angle.Wrap(ta-m.fa))>1.9,lx=m.x+Math.cos(m.fa)*50,ly=m.y+Math.sin(m.fa)*50;
  const bm=(a)=>{let L=10;for(;L<700;L+=8){const x=lx+Math.cos(a)*L,y=ly+Math.sin(a)*L;if(this.blk(x,y,18)||x<24||x>776||y<24||y>336)break}return L};
  const onB=(a,L)=>{const px=p.x-lx,py=p.y-ly,t=px*Math.cos(a)+py*Math.sin(a),n=Math.abs(-px*Math.sin(a)+py*Math.cos(a));return t>0&&t<L&&n<12};
  switch(m.st){
  case 'track':turn(ta,back&&d<140?1.0:en?.95:.7);if(d>230)this.mv(m,Math.cos(m.fa)*32*dt,Math.sin(m.fa)*32*dt,40);
   m.bk=back&&d<130?(m.bk||0)+dt:0;m.hgT=d<100?(m.hgT||0)+dt:Math.max(0,(m.hgT||0)-dt);
   if(m.hgT>1&&m.cd<=0){m.hgT=0;m.cd=1.2;this.telAdd({k:'c',x:m.x,y:m.y,r:110,sy:.75,t:.65,dmg:D(16),src:'감시자의 갑주 가시',m,hit:()=>{p.setVelocity(dx/d*380,dy/d*380)}})}
   else    if(m.bk>.4&&m.cd<=0){m.bk=0;m.cd=1.2;const ba=m.fa+Math.PI;this.telAdd({k:'s',x:m.x,y:m.y,r:112,a:ba,h:1.25,t:.6,dmg:D(20),src:'감시자의 꼬리',m,hit:()=>{p.setVelocity(dx/d*440,dy/d*440)}})}
   else if(m.cd<=0){const r=Math.random();if(r<.42){m.st='sweepW';m.tm=1;m.sd=Phaser.Math.Angle.Wrap(ta-m.fa)>0?1:-1}else if(r<.72){m.st='focusW';m.tm=.85}else if(!(m.flc>now)){m.st='flare';m.tm=2;m.flc=now+12000;this.dtx(m.x,m.y-50,'눈부신 섬광 — 기둥 그림자로!','#ffe066')}else{m.st='sweepW';m.tm=1;m.sd=1}}break;
  case 'sweepW':{const n=en?5:3;for(let i=0;i<n;i++){const a=m.fa+(i-(n-1)/2)*.42,L=bm(a);g.lineStyle(1.5,0xff5a5a,.5+.4*Math.sin(now/50)).lineBetween(lx,ly,lx+Math.cos(a)*L,ly+Math.sin(a)*L)}if(m.tm<=0){m.st='sweep';m.tm=2.6;m.bt=0}}break;
  case 'sweep':{m.fa+=m.sd*.55*dt;const n=en?5:3;let hit=0;m.bt-=dt;for(let i=0;i<n;i++){const a=m.fa+(i-(n-1)/2)*.42,L=bm(a),ex=lx+Math.cos(a)*L,ey=ly+Math.sin(a)*L;g.lineStyle(14,0xff8a40,.35).lineBetween(lx,ly,ex,ey).lineStyle(5,0xfff0d0,.95).lineBetween(lx,ly,ex,ey);g.fillStyle(0xffd0a0,.6).fillCircle(ex,ey,6);if(onB(a,L))hit=1}
   if(hit&&m.bt<=0){m.bt=.3;this.inv=0;this.hurt(D(8),'각성한 감시자의 광선',m)}if(m.tm<=0){m.st='cool';m.tm=2;m.cd=.6;this.dtx(m.x,m.y-44,'과열 — 지금 물 것!','#ffb070')}}break;
  case 'cool':turn(ta,.3);s.setTint(Math.floor(now/150)%2?0xffb080:0xffffff);if(m.tm<=0){s.clearTint();m.st='track'}break;
  case 'focusW':{turn(ta,.35);const L=bm(m.fa);g.lineStyle(2,0xff5a5a,Math.floor(now/70)%2?.9:.3).lineBetween(lx,ly,lx+Math.cos(m.fa)*L,ly+Math.sin(m.fa)*L);s.setTint(Math.floor(now/80)%2?0xff8a8a:0xffffff);
   if(m.tm<=0){s.clearTint();const L2=bm(m.fa),gg=this.add.graphics().setDepth(41);gg.lineStyle(22,0xff5a5a,.5).lineBetween(lx,ly,lx+Math.cos(m.fa)*L2,ly+Math.sin(m.fa)*L2).lineStyle(7,0xfff0f0,1).lineBetween(lx,ly,lx+Math.cos(m.fa)*L2,ly+Math.sin(m.fa)*L2);this.tweens.add({targets:gg,alpha:0,duration:380,onComplete:()=>gg.destroy()});this.cameras.main.shake(160,.007);
    if(onB(m.fa,L2)){this.inv=0;this.hurt(D(26),'각성한 감시자의 집중 광선',m)}m.st='track';m.cd=1}}break;
  case 'flare':{const k=1-m.tm/2;g.fillStyle(0xfff4d0,.05+.18*k+(k>.7?.08*Math.sin(now/40):0)).fillRect(20,20,760,320);
   for(const[c,r]of this.cur.obs.map(o=>[o[0],o[1]])){const px=(c+.5)*C.T,py=(r+.5)*C.T,a=Math.atan2(py-m.y,px-m.x),nx=-Math.sin(a),ny=Math.cos(a),w=22,L=700;g.fillStyle(0x05030a,.55).fillPoints([{x:px+nx*w,y:py+ny*w},{x:px+Math.cos(a)*L+nx*w*4,y:py+Math.sin(a)*L+ny*w*4},{x:px+Math.cos(a)*L-nx*w*4,y:py+Math.sin(a)*L-ny*w*4},{x:px-nx*w,y:py-ny*w}],true)}
   if(m.tm<=0){const f=this.add.rectangle(400,180,800,360,0xffffff,.8).setDepth(140);this.tweens.add({targets:f,alpha:0,duration:450,onComplete:()=>f.destroy()});if(this.mbLos(m.x,m.y,p.x,p.y)){this.inv=0;this.hurt(D(26),'눈부신 섬광',m)}m.st='cool';m.tm=1.4;m.cd=.6;this.dtx(m.x,m.y-44,'눈이 부셨다 — 지금 물 것!','#ffb070')}}break}
  s.setPosition(m.x,m.y).setRotation(m.fa)}
 // ----- 특수 스킬 -----
 skUse(){const k=this.skl;if(!k||this.skCd>0||this.cine||this.over)return;const p=this.pl,a=this.ang,fx=Math.cos(a),fy=Math.sin(a);
  if(k=='p'){this.skCd=6;this.dsh={t:.22,vx:fx*780,vy:fy*780,hit:new Set()};this.inv=Math.max(this.inv,.35);this.dtx(p.x,p.y-26,'포식 돌진!','#ff9ad0')}
  else if(k=='c'){this.skCd=14;this.wallT=2;this.dtx(p.x,p.y-26,'결정 방벽!','#9fd8ff');if(this.wallO)this.wallO.destroy();this.wallO=this.add.graphics().setDepth(11)}
  else{this.skCd=7;let L=140;for(;L>20;L-=10){const x=p.x+fx*L,y=p.y+fy*L;if(x>50&&x<750&&y>50&&y<310&&!this.blk(x,y,22))break}const ox=p.x,oy=p.y,nx=p.x+fx*L,ny=p.y+fy*L;
   const r1=this.add.image(ox,oy,'rift').setDepth(5.5).setTint(0xc98bff);this.tweens.add({targets:r1,scale:0,alpha:0,duration:400,onComplete:()=>r1.destroy()});
   p.body.reset(nx,ny);this.sp.forEach((q,i)=>{q.x=nx-fx*7*(i+1);q.y=ny-fy*7*(i+1)});this.inv=Math.max(this.inv,.3);
   const r2=this.add.circle(nx,ny,64,0xc98bff,.35).setDepth(12).setScale(.2);this.tweens.add({targets:r2,scale:1,alpha:0,duration:350,onComplete:()=>r2.destroy()});this.cameras.main.shake(150,.006);
   for(const m of this.cur.en)if(m.on&&Math.hypot(m.x-nx,m.y-ny)<64+(m.mb?24:0)){this.dmgM(m,22*(1+.04*this.plv));m.slw=1.5}}}
 skU(dt){if(this.skCd>0)this.skCd-=dt;const p=this.pl;
  if(this.dsh){const D=this.dsh;D.t-=dt;p.setVelocity(D.vx,D.vy);if(Math.random()<.8){const b=this.add.circle(p.x,p.y,5,0xff7a9a,.5).setDepth(9);this.tweens.add({targets:b,scale:.2,alpha:0,duration:260,onComplete:()=>b.destroy()})}
   for(const m of this.cur.en)if(m.on&&!D.hit.has(m)&&!m.gone&&Math.hypot(m.x-p.x,m.y-p.y)<44+(m.br||0)){D.hit.add(m);m.bl=3;const k=this.dmgM(m,this.bdmg*1.6);this.dtx(m.x,m.y-20,'물어뜯기','#ff9ad0');if(k)this.en=Math.min(this.emax,this.en+12)}
   if(D.t<=0)this.dsh=null}
  if(this.wallT>0){this.wallT-=dt;const g=this.wallO;g.clear();const pu=.5+.5*Math.sin(this.time.now/70);for(let i=0;i<6;i++){const a=i/6*6.283+this.time.now/400,x=p.x+Math.cos(a)*22,y=p.y+Math.sin(a)*16;g.fillStyle(0x8ad8ff,.8).fillTriangle(x,y-6,x-4,y+3,x+4,y+3)}g.lineStyle(2,0x9fd8ff,.5+.4*pu).strokeEllipse(p.x,p.y,52,40);if(this.wallT<=0){g.destroy();this.wallO=null}}}
 skHud(){const on=!!this.skl&&!this.cine&&!this.treeO;if(!this.skG){this.skG=this.add.graphics().setDepth(50);this.skT=this.add.text(676,228,'',ST({fontSize:'11px',fontStyle:'bold',color:'#12091f',align:'center'})).setOrigin(.5).setDepth(61)}
  const g=this.skG;g.clear();this.skT.setVisible(on);if(this.mqT)this.mqT.setVisible(!!this.mq&&this.mq.st=='open'&&!this.cine&&!this.treeO&&!this.mbOn);
  if(this.mq&&this.mq.st=='open'){if(!this.mqT)this.mqT=this.add.text(712,184,'',ST({fontSize:'10px',fontStyle:'bold',color:'#ffe9a8'})).setOrigin(.5).setDepth(61);this.mqT.setText('★ 특수 퀘스트: 둥지의 균열').setAlpha(.6+.4*Math.sin(this.time.now/300))}
  if(!on)return;const k=this.skl,cd=Math.max(0,this.skCd),mx={p:6,c:14,v:7}[k],rd=cd<=0;
  g.fillStyle(rd?LCN[k]:0x3a2f57,rd?.95:.85).fillCircle(676,228,22);if(!rd){g.fillStyle(LCN[k],.9).slice(676,228,22,-Math.PI/2,-Math.PI/2+6.283*(1-cd/mx),false).fillPath();g.fillStyle(0x241c38,1).fillCircle(676,228,15)}g.lineStyle(2,0xffffff,rd?.8:.3).strokeCircle(676,228,22);
  this.skT.setText(rd?MBQ[k].s.replace(' ','\n'):Math.ceil(cd)+'').setColor(rd?'#12091f':'#ece6f7').setFontSize(rd?'10px':'14px')}
 mbU(dt,p){this.telU(dt);this.mbbU(dt,p);this.skU(dt);
  if(Phaser.Input.Keyboard.JustDown(this.k.Q))this.skUse();
  const Q=this.mq;if(Q&&Q.st=='open'&&this.cur===Q.room&&Q.x!=null&&!this.mbOn){if(Math.hypot(p.x-Q.x,p.y-Q.y)<28){this.mqW=(this.mqW||0)+dt;if(this.mqW>=1){this.mqW=0;this.mbEnter();return}}else this.mqW=0}
  if(this.mbOn){this.mbT+=dt;const f=this.cur.food;this.mbF=(this.mbF??10)-dt;if(this.mbF<=0){this.mbF=12;if(f.filter(q=>q.on).length<4)for(let i=0;i<2;i++){const[cx,cy]=pick([[90,80],[710,80],[90,290],[710,290]]),q={t:'s',x:cx+(Math.random()-.5)*20,y:cy+(Math.random()-.5)*14,c:-1,r:-1,p:0,on:1};q.spr=this.add.image(q.x,q.y,'f_s').setDepth(5);f.push(q)}}
   if(this.mbRO){if(Math.hypot(p.x-400,p.y-200)<30){this.mbRT=(this.mbRT||0)+dt;if(this.mbRT>=1){this.mbRT=0;this.mbReturn()}}else this.mbRT=0}}}
