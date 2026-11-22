 // ===== v101 공허의 소용돌이: 이웃 방으로 잇는 살아 있는 소용돌이 · 맥박 해류(핏줄) · 공허 칠성장어 =====
 // 두근-두근 맥박 (1.5초마다 두 번). 해류 위의 점은 소용돌이까지 남은 길이만큼 늦게 → 맥박이 바깥에서 안으로 흐른다
 vtxBeat(t){const ph=(((t%1500)+1500)%1500)/1000;return Math.exp(-(((ph-.1)/.07)**2))+.6*Math.exp(-(((ph-.36)/.07)**2))}
 vtxC(a){return a&&a.vx!=null?[a.vx,a.vy]:[400,180]}
 vtxLanes(a){if(a.ln)return a.ln;const[vx,vy]=this.vtxC(a),L=[],n=5,a0=Math.random()*6.283;
  const path=(sx,sy,ex,ey,sd)=>{const P=[[sx,sy]];let x=sx,y=sy;for(let k=1;k<70;k++){const dx=ex-x,dy=ey-y,d=Math.hypot(dx,dy);if(d<18){P.push([ex,ey]);break}const an=Math.atan2(dy,dx)+Math.sin(k*.5+sd)*.5*Math.min(1,d/140);x=Phaser.Math.Clamp(x+Math.cos(an)*18,50,750);y=Phaser.Math.Clamp(y+Math.sin(an)*18,50,310);P.push([x,y])}return P};
  const edge=an=>{let x=vx,y=vy;for(let r=0;r<900;r+=8){const nx=vx+Math.cos(an)*r,ny=vy+Math.sin(an)*r;if(nx<56||nx>744||ny<56||ny>304)break;x=nx;y=ny}return[x,y]};
  for(let i=0;i<n*3&&L.length<n;i++){const an=a0+i/n*6.283+(Math.random()-.5)*.4,[sx,sy]=edge(an);if(Math.hypot(sx-vx,sy-vy)<170)continue;L.push(path(sx,sy,vx,vy,Math.random()*6))}
  for(let i=0;i<3&&L.length;i++){const M=L[i%L.length],j=Math.floor(M.length*(.3+Math.random()*.3)),[ex,ey]=M[j],an=Math.random()*6.283,sx=Phaser.Math.Clamp(ex+Math.cos(an)*170,56,744),sy=Phaser.Math.Clamp(ey+Math.sin(an)*110,56,304);
   if(Math.hypot(sx-vx,sy-vy)<Math.hypot(ex-vx,ey-vy)+50)continue;L.push(path(sx,sy,ex,ey,Math.random()*6).concat(M.slice(j+1)))}
  a.ln=L.map(P=>{const s=new Array(P.length).fill(0);for(let i=P.length-2;i>=0;i--)s[i]=s[i+1]+Math.hypot(P[i+1][0]-P[i][0],P[i+1][1]-P[i][1]);return{P,s}});return a.ln}
 // 소용돌이 그림: 가장자리 밝은 보라 → 안쪽으로 갈수록 어둡게, 나선 팔, 가운데 까만 구멍 + 청록 테두리
 vtxTex(){if(this.textures.exists('vtx'))return;tex(this,'vtx',64,64,2,x=>{for(let v=0;v<64;v++)for(let u=0;u<64;u++){const dx=u-31.5,dy=v-31.5,r=Math.hypot(dx,dy);if(r>31.5)continue;const t=r/31.5,th=Math.atan2(dy,dx),arm=Math.cos(3*(th-Math.log(r+1)*1.9)),bd=Math.floor(r/3.2)%2;
   let c;if(r<5)c='#000000';else if(r<6.4)c='#7ff0ff';else if(arm>.5&&t>.17)c=t>.66?(bd?'#8a5ad0':'#7a4ac0'):t>.4?'#5a2f9a':'#36186a';else c=t>.86?'#3e2c6c':t>.62?(bd?'#2c1a56':'#26164c'):t>.38?(bd?'#1c0c3a':'#180a32'):t>.2?'#0e0522':'#05020a';
   x.globalAlpha=Math.min(1,(31.5-r)/3.5);x.fillStyle=c;x.fillRect(u,v,1,1)}x.globalAlpha=1});
  tex(this,'lmpH',12,14,2,x=>{disc(x,6,8,5.2,'#1a0c2e');disc(x,6,8,4.3,'#3a1c70');x.fillStyle='#4a2a90';x.fillRect(4,8,4,4);disc(x,6,4,3.6,'#1a0c2e');disc(x,6,4,3,'#ffe0ff');disc(x,6,4,1.8,'#05020c');x.fillStyle='#ffffff';x.fillRect(5,2,1,1);x.fillRect(7,2,1,1);x.fillRect(4,4,1,1);x.fillRect(8,4,1,1);x.fillStyle='#7ff0ff';x.fillRect(1,9,1,1);x.fillRect(10,9,1,1)});
  tex(this,'lmpS',10,10,2,x=>{disc(x,5,5,4.4,'#1a0c2e');disc(x,5,5,3.6,'#4a2a90');x.fillStyle='#3a1c70';x.fillRect(2,4,6,2);x.fillStyle='#7ff0ff';x.fillRect(1,5,1,1);x.fillRect(8,5,1,1)})}
 vtxMk(a){this.vtxTex();this.vtxLanes(a);const[vx,vy]=this.vtxC(a),V=this.vtx={a,x:vx,y:vy,gulp:0,eye:this.time.now+6000+Math.random()*8000};
  const gs=this.add.graphics().setDepth(.62);this.dec.push(gs);
  for(const l of a.ln){const P=l.P;for(const[w,c,al]of[[11,0x12061f,.5],[5,0x4a1a78,.9],[2,0x6a2aa0,.8]]){gs.lineStyle(w,c,al).beginPath();gs.moveTo(P[0][0],P[0][1]);for(const q of P)gs.lineTo(q[0],q[1]);gs.strokePath()}
   for(let i=2;i<P.length-2;i+=4)gs.fillStyle(0x2a0c48,.8).fillCircle(P[i][0],P[i][1],3.5)}
  V.sh=this.add.ellipse(vx,vy+5,150,128,0x000000,.4).setDepth(.63);V.im=this.add.image(vx,vy,'vtx').setDepth(.66);V.g=this.add.graphics().setDepth(.67);V.gp=this.add.graphics().setDepth(.64);this.dec.push(V.sh,V.im,V.g,V.gp);
  V.p=[];for(let i=0;i<34;i++){const l=a.ln[i%a.ln.length],o=this.add.circle(0,0,1.2+Math.random(),0xe8b0ff,.9).setDepth(.65);this.dec.push(o);V.p.push({l,i:Math.floor(Math.random()*(l.P.length-1)),f:Math.random(),o})}}
 // 이웃 방 쪽 출구: 작은 소용돌이
 vtxOut(x,y){this.vtxTex();const g=this.add.image(x,y,'wglow').setDepth(.8).setTint(0x9a70ff).setAlpha(.5).setScale(.55),im=this.add.image(x,y,'vtx').setDepth(.9).setScale(.42);this.dec.push(g,im);
  this.tweens.add({targets:im,angle:360,duration:2600,repeat:-1});this.tweens.add({targets:im,scale:{from:.38,to:.46},duration:750,yoyo:true,repeat:-1,ease:'Sine.inOut'})}
 flowAt(x,y){const a=this.cur;if(this.emPull){const P=this.emPull,dx=P.x-x,dy=P.y-y,d=Math.hypot(dx,dy)||1;return[dx/d*P.v,dy/d*P.v]}if(!a||!a.vt)return[0,0];
  const now=this.time.now,[vx,vy]=this.vtxC(a);let fx=0,fy=0;
  if(a.ln){let bd=26,bt=null,bs=0;for(const l of a.ln){const P=l.P;for(let i=0;i<P.length-1;i++){const x1=P[i][0],y1=P[i][1],ex=P[i+1][0]-x1,ey=P[i+1][1]-y1,ll=ex*ex+ey*ey||1;if(Math.abs(x-x1)>44&&Math.abs(x-x1-ex)>44)continue;let t=((x-x1)*ex+(y-y1)*ey)/ll;t=t<0?0:t>1?1:t;const d=Math.hypot(x1+ex*t-x,y1+ey*t-y);if(d<bd){bd=d;const n=Math.sqrt(ll);bt=[ex/n,ey/n];bs=l.s[i]-t*n}}}
   if(bt){const b=this.vtxBeat(now+bs*3.85),k=1-bd/26,v=(30+150*b)*k;fx+=bt[0]*v;fy+=bt[1]*v}}
  const dx=vx-x,dy=vy-y,d=Math.hypot(dx,dy)||1;if(d<100){const q=1-d/100,b=this.vtxBeat(now),v=(25+85*q*q)*(1+.4*b)*(a.vk?1:.5),sv=(a.vd||1)*45*q;fx+=dx/d*v-dy/d*sv;fy+=dy/d*v+dx/d*sv}
  return[fx,fy]}
 // 매 프레임 (소용돌이 방에서만): 맥박 · 섬모 · 가끔 뜨는 눈 · 빛 알갱이 · 먹이 삼키기 · 칠성장어가 기어 나옴
 swirl(dt){const a=this.cur,V=this.vtx;if(!V||V.a!==a||!V.im||!V.im.scene)return;const now=this.time.now,b=this.vtxBeat(now),gl=Math.max(0,V.gulp-now)/400,p=this.pl;
  V.im.rotation+=dt*1.7*(a.vd||1);const sc=1+.06*b-.12*gl;V.im.setScale(sc);V.sh.setScale(sc);
  const g=V.g,gp=V.gp;g.clear();gp.clear();
  // 핏줄 맥박: 빛이 바깥에서 소용돌이로
  for(const l of a.ln){const P=l.P;for(let i=0;i<P.length-1;i++){const bb=this.vtxBeat(now+l.s[i]*3.85);if(bb<.12)continue;gp.lineStyle(7,0xa040e0,.22*bb).lineBetween(P[i][0],P[i][1],P[i+1][0],P[i+1][1]);gp.lineStyle(3,0xe090ff,.85*Math.min(1,bb)).lineBetween(P[i][0],P[i][1],P[i+1][0],P[i+1][1])}}
  // 빛 알갱이: 해류를 타고 안으로 (맥박 때 빨라짐)
  for(const q of V.p){const P=q.l.P,s=q.l.s;if(q.i>=P.length-1){q.i=0;q.f=0}const sl=(s[q.i]-s[q.i+1])||1,bb=this.vtxBeat(now+s[q.i]*3.85);q.f+=(35+220*bb)*dt/sl;while(q.f>=1&&q.i<P.length-1){q.f-=1;q.i++}if(q.i>=P.length-1){q.i=0;q.f=0}
   const A=P[q.i],B=P[q.i+1];q.o.setPosition(A[0]+(B[0]-A[0])*q.f,A[1]+(B[1]-A[1])*q.f).setAlpha(.45+.5*bb)}
  // 섬모 입술: 가장자리에서 안쪽으로 쓸어 넣듯 물결
  const R=58*sc;for(let i=0;i<44;i++){const an=i/44*6.283,w=Math.sin(now/210+i*.75)*.5,L=(9+3*Math.sin(now/330+i*1.3))*(1-.5*gl),bx=V.x+Math.cos(an)*R,by=V.y+Math.sin(an)*R;g.lineStyle(2,0xb07aff,.75).lineBetween(bx,by,bx-Math.cos(an+w)*L,by-Math.sin(an+w)*L);g.fillStyle(0xe8c8ff,.8).fillRect(bx-Math.cos(an+w)*L-1,by-Math.sin(an+w)*L-1,2,2)}
  g.lineStyle(2,0xe6d7ff,.35+.3*b).beginPath();g.arc(V.x,V.y,R+2,Math.PI*1.1,Math.PI*1.9);g.strokePath();
  // 가끔 깊은 곳에서 눈이 뜬다 (2.4초, 중간에 한 번 깜빡) — 플레이어 쪽을 본다
  const et=now-V.eye;if(et>0){if(et>2400){V.eye=now+12000+Math.random()*10000}else{let o=Math.min(1,et/300,(2400-et)/300);if(et>1100&&et<1260)o*=.12;const an=Math.atan2(p.y-V.y,p.x-V.x),ex=V.x+Math.cos(an)*5,ey=V.y+Math.sin(an)*3;
    g.fillStyle(0x05020a,1).fillEllipse(V.x,V.y,34,22*o+1);g.fillStyle(0x3a1468,1).fillEllipse(V.x,V.y,28,17*o+.5);g.fillStyle(0x8a4ae0,1).fillEllipse(V.x,V.y,18,13*o+.5);g.fillStyle(0x000000,1).fillEllipse(ex,ey,4,11*o+.5);if(o>.5)g.fillStyle(0xa0faff,.9).fillRect(ex+1,ey-3,1.5,2)}}
  // 먹이가 가운데 닿으면 꿀꺽
  if(a.vk)for(const f of a.food)if(f.on&&f.spr&&Math.hypot(f.spr.x-V.x,f.spr.y-V.y)<20){f.on=0;const s=f.spr;f.spr=null;this.tweens.add({targets:s,scale:0,alpha:0,angle:200,duration:300,onComplete:()=>s.destroy()});V.gulp=now+400}
  // 칠성장어: 9초마다, 4마리보다 적으면 소용돌이 가장자리에서 기어 나옴 (방마다 4번까지)
  if(a.vq==null)a.vq=4;a.vs=(a.vs??9)-dt;if(a.vs<=0){a.vs=9;if(a.vq>0&&a.en.filter(e=>e.on&&e.k=='lmp').length<4){a.vq--;const an=Math.atan2(180-V.y,400-V.x)+(Math.random()-.5)*1.6,e={k:'lmp',x:V.x+Math.cos(an)*50,y:V.y+Math.sin(an)*50,hp:C.LM.hp,on:1};this.mkSpr(e);e.st='flee';e.tm=1;e.fa=an;a.en.push(e);[e.spr,...e.sg].forEach(o=>{o.setAlpha(0);this.tweens.add({targets:o,alpha:1,duration:500})});V.gulp=now+300}}}
 // 공허 칠성장어: 눈이 없어 좁게만 느낀다 → 다가와 한 입 물고 도망 · 몸이 주기적으로 반투명해짐
 lmpAI(m,dt,p){const Q=C.LM,now=this.time.now,a=this.cur;if(!m.spr)return;m.cd=(m.cd||0)-dt;m.tm=(m.tm||0)-dt;if(m.lhp==null)m.lhp=m.hp;
  const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1,[vx,vy]=this.vtxC(a),ox=m.x,oy=m.y;
  if(m.hp<m.lhp&&m.st!='flee'){m.st='flee';m.tm=1.6;m.cd=Math.max(m.cd,2.5)}m.lhp=m.hp;
  let an=m.ha??Math.random()*6.283,v=Q.v;
  if(m.st=='swim'){if(m.tm<=0||m.wx==null){m.tm=2+Math.random()*2.5;for(let j=0;j<12;j++){const x=80+Math.random()*640,y=80+Math.random()*200;if(Math.hypot(x-vx,y-vy)>130&&!this.blk(x,y,10)){m.wx=x;m.wy=y;break}}}
   if(m.wx!=null){an=Math.atan2(m.wy-m.y,m.wx-m.x);if(Math.hypot(m.wx-m.x,m.wy-m.y)<14)m.tm=0}
   if(d<Q.det&&m.cd<=0&&!this.over&&!this.cine){m.st='dart';m.tm=1.3;this.exc(m)}}
  else if(m.st=='dart'){an=Math.atan2(dy,dx);v=Q.dart;if(d<20){this.hurt(Math.round(Q.dmg*(m.df||1)),'공허 칠성장어',m);this.lmpBite(m);m.st='flee';m.tm=2.2+Math.random()*.8;m.cd=4.5;m.fa=Math.atan2(-dy,-dx)}else if(m.tm<=0){m.st='flee';m.tm=1.2;m.cd=2.5;m.fa=Math.atan2(-dy,-dx)}}
  else{an=m.fa??Math.atan2(-dy,-dx);if(d<160)an=Math.atan2(Math.sin(an)-dy/d,Math.cos(an)-dx/d);v=Q.flee*(.5+.5*Math.max(0,Math.min(1,m.tm/2.4)));if(m.tm<=0){m.st='swim';m.wx=null}}
  const cx=m.x-vx,cy=m.y-vy,cd=Math.hypot(cx,cy)||1;if(cd<95&&m.st!='dart'){const k=1.6*(1-cd/95);an=Math.atan2(Math.sin(an)+cy/cd*k,Math.cos(an)+cx/cd*k)}
  m.ha=an;const wig=Math.sin(now/140+(m.ph??(m.ph=Math.random()*6)))*(m.st=='dart'?.12:.45);
  if(m.st=='dart')this.mv(m,Math.cos(an)*v*dt,Math.sin(an)*v*dt,12);else this.steer(m,an+wig,v,dt,12);
  if(a.vt){const w=this.flowAt(m.x,m.y);this.mv(m,w[0]*.35*dt,w[1]*.35*dt,12)}
  const mx=m.x-ox,my=m.y-oy;if(Math.hypot(mx,my)>.2)m.dir=Math.atan2(my,mx);
  // 반투명 주기 5.2초: 3초 또렷 → 0.5초 흐려짐 → 1.2초 반투명(완전히 사라지지는 않음) → 0.5초 돌아옴
  const t=((now/1000+(m.to||0))%5.2);let al=t<3?1:t<3.5?1-(t-3)/.5*.74:t<4.7?.26+.05*Math.sin(now/90):.26+(t-4.7)/.5*.74;
  const sw=Math.sin(now/90+(m.ph||0))*.08;m.spr.setPosition(m.x,m.y).setRotation((m.dir??an)+Math.PI/2+sw).setAlpha(al);
  let px=m.x,py=m.y;if(m.sg)m.sg.forEach((s,i)=>{const sp=i?5.5:7.5,ex=s.x-px,ey=s.y-py,l=Math.hypot(ex,ey)||1;if(l>sp){s.x=px+ex/l*sp;s.y=py+ey/l*sp}s.setRotation(Math.atan2(py-s.y,px-s.x)+Math.PI/2).setAlpha(al*(1-i*.06));px=s.x;py=s.y})}
 lmpBite(m){const x=this.pl.x,y=this.pl.y,r=this.add.circle(x,y,6,0x000000,0).setStrokeStyle(2.5,0xffe0ff,.95).setDepth(13);this.tweens.add({targets:r,scale:2.6,alpha:0,duration:260,onComplete:()=>r.destroy()});
  for(let i=0;i<6;i++){const an=i/6*6.283,b=this.add.rectangle(x,y,2,2,0xffffff).setDepth(13);this.tweens.add({targets:b,x:x+Math.cos(an)*14,y:y+Math.sin(an)*14,alpha:0,duration:240,onComplete:()=>b.destroy()})}}
