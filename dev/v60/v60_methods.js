 // ===== v60: 그림 도우미 — 진화 나무 · 계통 기초 슬라이드 · 게임 설명에서 같이 씀 =====
 artImg(A,key,x,y,h,dep){const o=this.add.image(x,y,key).setDepth(dep);o.setScale(h/(o.height||1));return A(o)}
 // 벌레 한 마리(머리 + 마디 4, 오른쪽을 봄). 포식 턱이 있는 머리 그림(wh_)을 씀
 artWorm(A,x,y,L,sc,dep){const key='p'+L.p+'c'+L.c+'v'+L.v;if(key!='p0c0v0')skinTex(this,key,L);const nm=n=>key=='p0c0v0'?(n?'ws'+n:'wh'):(n?'ws'+n+'_'+key:'wh_'+key);
  for(let i=4;i>=1;i--)A(this.add.image(x-6.5*sc*i,y+1.5*sc*Math.sin(i*1.3),nm(i)).setScale(.5*sc).setDepth(dep));A(this.add.image(x,y,nm(0)).setScale(.5*sc).setDepth(dep+.01))}
 artLv(k,j){const L={p:0,c:0,v:0};L[k]=j+1;if(j==2)L[k=='p'?'c':'p']=1;return L}
 // 장면 그림: kind 'atk'(기본 공격) | 'sk'(특수 스킬), 계통 k, 가운데 (cx,cy), 배율 s — 대략 가로 ±62 · 세로 ±26
 artScene(A,kind,k,cx,cy,s,dep){const g=A(this.add.graphics().setDepth(dep+.02)),X=v=>cx+v*s,Y=v=>cy+v*s,L=this.artLv(k,2),mob=(x,y,h)=>this.artImg(A,'kha',X(x),Y(y),h*s,dep).setFlipX(true);
  const dia=(x,y,r,c,al)=>{g.fillStyle(0x24304a,al).fillTriangle(x,y-r-1,x+r*.8,y,x,y+r+1);g.fillTriangle(x,y-r-1,x-r*.8,y,x,y+r+1);g.fillStyle(c,al).fillTriangle(x,y-r,x+r*.6,y,x,y+r);g.fillTriangle(x,y-r,x-r*.6,y,x,y+r)};
  if(kind=='atk'){
   if(k=='p'){this.artWorm(A,X(-4),Y(0),L,1.5*s,dep);mob(42,0,26);for(const sg of[-1,1])for(let j=0;j<3;j++){const ox=X(31+j*4.5),oy=Y(sg*5.5),ty=oy-sg*3.2*s;g.lineStyle(3*s,0x2a1040,.9).lineBetween(ox,oy,ox,ty);g.lineStyle(1.6*s,0xfff4fa,1).lineBetween(ox,oy,ox,ty)}}
   else if(k=='c'){for(let i=0;i<3;i++)g.lineStyle(1.5*s,0xbfeaff,.5).lineBetween(X(-62),Y(-8+i*8),X(-46),Y(-8+i*8));this.artWorm(A,X(8),Y(0),L,1.5*s,dep);mob(46,0,26);
    g.lineStyle(2.2*s,0xdff4ff,.85).strokeCircle(X(30),Y(0),9*s);for(let i=0;i<6;i++){const an=Math.PI+(i-2.5)*.6,d=16+5*(i%2);dia(X(30)+Math.cos(an)*d*s,Y(0)+Math.sin(an)*d*s,(i%3?2.2:2.8)*s,i%2?0xbfeaff:0xffffff,1)}}
   else{this.artWorm(A,X(-30),Y(0),L,1.4*s,dep);mob(52,0,26);for(let i=1;i<=5;i++)g.fillStyle(0x3a1060,.9-i*.15).fillCircle(X(14-i*7),Y(Math.sin(i)*1.5),(2.6-i*.3)*s);g.fillStyle(0x0a0412,1).fillCircle(X(16),Y(0),5.5*s);g.lineStyle(1.8*s,0xc070ff,1).strokeCircle(X(16),Y(0),5.5*s)}}
  else{
   if(k=='p'){for(let i=4;i>=1;i--){g.fillStyle(0xff7a9a,.12+.08*(4-i)).fillCircle(X(-4-i*14),Y(0),(7-i*.6)*s)}for(let i=0;i<3;i++)g.lineStyle(1.4*s,0xff9ad0,.6).lineBetween(X(-62),Y(-10+i*10),X(-40),Y(-10+i*10));this.artWorm(A,X(14),Y(0),L,1.5*s,dep);mob(50,0,26);
    for(let i=0;i<3;i++)g.lineStyle(2*s,0xff4a6a,.95).lineBetween(X(42+i*5),Y(-9),X(48+i*5),Y(9))}
   else if(k=='c'){this.artWorm(A,X(14),Y(0),L,1.4*s,dep);g.lineStyle(2*s,0x9fd8ff,.85).strokeEllipse(X(-4),Y(0),70*s,46*s);for(let i=0;i<6;i++){const a=i/6*6.283+.3;dia(X(-4)+Math.cos(a)*35*s,Y(0)+Math.sin(a)*23*s,3*s,0x8ad8ff,1)}
    g.fillStyle(0xff9a4a,1).fillCircle(X(54),Y(-14),3.2*s);g.lineStyle(1.6*s,0xffc890,.9).beginPath().arc(X(44),Y(-4),12*s,-2.4,-.4,false).strokePath();g.fillStyle(0xffc890,.9).fillTriangle(X(53),Y(-8),X(57),Y(-3),X(50),Y(-2))}
   else{this.artImg(A,'rift',X(-50),Y(0),34*s,dep).setTint(0xc98bff);for(let i=1;i<10;i++){const t=i/10,x=X(-50+86*t),y=Y(-28*4*t*(1-t));g.fillStyle(0xe0c0ff,.9).fillCircle(x,y,1.3*s)}g.fillStyle(0xc98bff,.22).fillCircle(X(32),Y(2),26*s);g.lineStyle(1.6*s,0xc98bff,.8).strokeCircle(X(32),Y(2),26*s);
    this.artWorm(A,X(44),Y(0),L,1.3*s,dep);mob(56,16,18)}}}
 // ===== v60: 진화 나무 = 인포그래픽 (T3 배치 + 네모 칸 썸네일 + 특수 스킬 장면 카드, 글은 최소) =====
 treeOpen(st,fp){if(this.treeO||this.over||this.molt||this.tr||(this.paused&&!fp)||this.bsO)return;
  if(!fp){this.paused=true;this.physics.pause();this.tweens.pauseAll();this.time.paused=true;this.joy=null;this.eat=null;if(this.pl)this.pl.setVelocity(0,0)}
  const O=this.treeO=[];O.st=st;O.fp=fp;O.sel=null;O.tx=[];const A=o=>{O.push(o);return o};
  A(this.add.rectangle(400,180,800,360,0x0b0716,.95).setDepth(320).setInteractive());
  A(this.add.text(20,14,'진화 나무',ST({fontSize:'18px',fontStyle:'bold'})).setDepth(321));
  O.cl=A(this.add.text(782,14,this.sys.game.device.input.touch?'✕':'✕  (T)',ST({fontSize:'14px',fontStyle:'bold',color:'#ece6f7',backgroundColor:'#3a2f57',padding:{x:10,y:6}})).setOrigin(1,0).setDepth(321));
  O.fs=A(this.fsBtn(O.cl.x-O.cl.width-8,14,321));O.g=A(this.add.graphics().setDepth(321));this.treeDraw()}
 treePos(k,j){const cx=400,cy=204;return k=='p'?[cx,cy-48*(j+1)]:k=='c'?[cx+84*(j+1),cy+27*(j+1)]:[cx-84*(j+1),cy+27*(j+1)]}
 treeCard(k){return {p:[492,40],c:[662,140],v:[20,140]}[k]}
 treeDraw(){const O=this.treeO,g=O.g;g.clear();O.tx.forEach(t=>t.destroy());O.tx=[];const D=o=>{O.tx.push(o);return o},dep=322,cx=400,cy=204;
  const T=(x,y,s,o,ox,oy)=>D(this.add.text(x,y,s,ST(Object.assign({fontSize:'10px'},o))).setOrigin(ox??.5,oy??.5).setDepth(dep+.1));
  for(const k of LK){const t=this.lin[k];let px=cx,py=cy;for(let j=0;j<3;j++){const[x,y]=this.treePos(k,j),own=j<t;g.lineStyle(own?4:2,LCN[k],own?1:.3).lineBetween(px,py,x,y);px=x;py=y}
   const[x3,y3]=this.treePos(k,2),[qx,qy]=this.treeCard(k);g.lineStyle(1.5,LCN[k],.3).lineBetween(x3,y3,qx+59,qy+35)}
  // 가운데: 지금 내 모습 + 탈피 횟수(점)
  g.fillStyle(0x241c38,1).fillCircle(cx,cy,25);g.lineStyle(2,0xc98bff,1).strokeCircle(cx,cy,25);this.artWorm(D,cx+12,cy,this.lin,.95,dep);
  {const n=this.lmax(),w=n*8;for(let i=0;i<n;i++)g.fillStyle(i<this.molts?0xc98bff:0x3a2f57,1).fillCircle(cx-w/2+4+i*8,cy+33,2.6)}
  // 특수 스킬 장면 카드 (3단계 → 중간 보스 → ★)
  for(const k of LK){const[x,y]=this.treeCard(k),W=118,H=70,dn=this.skl==k,qo=this.mq&&this.mq.k==k&&this.mq.st=='open';
   g.fillStyle(0x140e24,1).fillRoundedRect(x,y,W,H,8);g.lineStyle(dn?2.5:1.5,dn?0xffe066:LCN[k],dn?1:.6).strokeRoundedRect(x,y,W,H,8);
   this.artScene(D,'sk',k,x+W/2,y+29,.6,dep);if(!dn)D(this.add.rectangle(x+W/2,y+29,W-6,52,0x0b0716,qo?.15:.45).setDepth(dep+.06));
   T(x+W/2,y+H-9,(dn?'★ ':'☆ ')+MBQ[k].s,{fontStyle:'bold',color:dn?'#ffe066':qo?'#ff9af4':LCS[k]})}
  // 단계 칸 (네모 썸네일)
  for(const k of LK){const t=this.lin[k];for(let j=0;j<3;j++){const[x,y]=this.treePos(k,j),own=j<t,nx=j==t,ok=nx&&this.nodeOk(k),sel=O.sel&&O.sel[0]==k&&O.sel[1]==j,W=46,H=26;
   if(ok)g.fillStyle(LCN[k],.3).fillRoundedRect(x-W/2-4,y-H/2-4,W+8,H+8,8);
   g.fillStyle(0x1c1430,1).fillRoundedRect(x-W/2,y-H/2,W,H,6);g.lineStyle(sel?3:own?2:1.5,sel?0xffffff:own||nx?LCN[k]:0x4a3e66,own||nx||sel?1:.8).strokeRoundedRect(x-W/2,y-H/2,W,H,6);
   this.artWorm(D,x+10,y,this.artLv(k,j),.8,dep);if(!own)D(this.add.rectangle(x,y,W-3,H-3,0x0b0716,nx?.3:.6).setDepth(dep+.05));
   if(own||ok){g.fillStyle(own?LCN[k]:0x7be0a8,1).fillCircle(x+W/2-1,y-H/2+1,6);T(x+W/2-1,y-H/2+1,own?'✓':'!',{fontSize:'9px',fontStyle:'bold',color:'#12091f'})}
   if(k=='p')T(x+W/2+6,y,ND[k][j][0],{fontSize:'9px',fontStyle:own?'bold':'normal',color:own?LCS[k]:nx?'#c9c0de':'#6a5e86'},0,.5);else T(x,y+H/2+7,ND[k][j][0],{fontSize:'9px',fontStyle:own?'bold':'normal',color:own?LCS[k]:nx?'#c9c0de':'#6a5e86'})}}
  // 재료 칩: 다음 단계까지 모은 양
  const chip=(k,x,y)=>{const q=this.lqInfo(k);g.fillStyle(0x1c1430,1).fillRoundedRect(x-36,y-10,72,20,10);g.lineStyle(1,LCN[k],.7).strokeRoundedRect(x-36,y-10,72,20,10);this.lqIcon(g,k,x-23,y,5,LCN[k],1);
   T(x+6,y,q.t>=3?'완성':Math.min(q.a,q.c)+' / '+q.c,{fontSize:'10px',fontStyle:'bold',color:q.st=='ready'?'#7be0a8':'#ece6f7'})};
  chip('p',400,28);chip('c',730,290);chip('v',70,290);
  // 누른 칸 설명 (말풍선)
  if(O.sel){const[k,j]=O.sel,sk=j==3,t=this.lin[k];g.fillStyle(0x1a1330,.98).fillRoundedRect(180,312,440,44,8);g.lineStyle(1.5,LCN[k],.8).strokeRoundedRect(180,312,440,44,8);
   const h=sk?'★ '+MBQ[k].s:LN[k]+' '+(j+1)+'단계 · '+ND[k][j][0],st=sk?(this.skl==k?'얻음':'3단계 → 「'+MBQ[k].q+'」'):(j<t?'✓ 얻음':j==t?(this.nodeOk(k)?'둥지에서 탈피!':this.nodeLock(k)):'앞 단계 먼저');
   T(192,323,h,{fontSize:'11px',fontStyle:'bold',color:LCS[k]},0,.5);T(608,323,st,{color:'#a99fc2'},1,.5);T(192,343,sk?MBQ[k].sd:ND[k][j][1],{fontSize:'9px',color:'#ece6f7',wordWrap:{width:416}},0,.5)}
  else T(400,336,'칸을 누르면 설명',{fontSize:'9px',color:'#6a5e86'})}
 treeTap(x,y){const O=this.treeO;if(!O)return;if(O.fs&&O.fs.getBounds().contains(x,y))return;if(O.cl&&O.cl.getBounds().contains(x,y)){this.treeClose();return}
  for(const k of LK)for(let j=0;j<3;j++){const[nx,ny]=this.treePos(k,j);if(Math.abs(nx-x)<27&&Math.abs(ny-y)<18){O.sel=[k,j];this.treeDraw();return}}
  for(const k of LK){const[cx0,cy0]=this.treeCard(k);if(x>cx0&&x<cx0+118&&y>cy0&&y<cy0+70){O.sel=[k,3];this.treeDraw();return}}
  if(O.sel){O.sel=null;this.treeDraw();return}this.treeClose()}
 treeClose(){const O=this.treeO;if(!O)return;O.tx.forEach(t=>t.destroy());O.forEach(o=>o.destroy());this.treeO=null;if(!O.fp){this.paused=false;this.physics.resume();this.tweens.resumeAll();this.time.paused=false}}
 // ===== v60: 계통 기초 슬라이드 2장 (처음 시작할 때 · 일시정지 → 게임 설명) — 넘기기 / 화살표 / 아래 단추 =====
 bsOpen(st){if(this.bsO)return;const fp=this.paused;if(!fp){this.paused=true;this.physics.pause();this.tweens.pauseAll();this.time.paused=true;this.joy=null;this.eat=null;if(this.pl)this.pl.setVelocity(0,0)}
  const O=this.bsO={st,fp,pg:0,A:[],D:[]};O.A.push(this.add.rectangle(400,180,800,360,0x0b0716,.97).setDepth(330).setInteractive());this.bsDraw()}
 bsClose(){const O=this.bsO;if(!O)return;O.D.forEach(o=>o.destroy());O.A.forEach(o=>o.destroy());this.bsO=null;if(!O.fp){this.paused=false;this.physics.resume();this.tweens.resumeAll();this.time.paused=false}}
 bsGo(d){const O=this.bsO;if(!O)return;const n=O.pg+d;if(n>=2){this.bsClose();return}O.pg=Math.max(0,n);this.bsDraw()}
 bsTap(x,y){if(this.bsO)this.bsO.dn={x,y}}
 bsUp(P){const O=this.bsO;if(!O||!O.dn)return;const x=P.x/VZ,y=P.y/VZ,dx=x-O.dn.x,dy=y-O.dn.y;O.dn=null;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){this.bsGo(dx<0?1:-1);return}
  if(x>690&&y<44){this.bsClose();return}if(y>318&&Math.abs(x-400)<80){this.bsGo(1);return}
  if(x<70&&Math.abs(y-178)<70){this.bsGo(-1);return}if(x>730&&Math.abs(y-178)<70)this.bsGo(1)}
 bsDraw(){const O=this.bsO;O.D.forEach(o=>o.destroy());O.D=[];const D=o=>{O.D.push(o);return o},dep=331,g=D(this.add.graphics().setDepth(dep)),pg=O.pg;
  const T=(x,y,s,o,ox,oy)=>D(this.add.text(x,y,s,ST(Object.assign({fontSize:'11px'},o))).setOrigin(ox??.5,oy??.5).setDepth(dep+.2));
  T(400,22,pg?'계통마다 싸우는 법':'먹으면 몸이 변한다',{fontSize:'18px',fontStyle:'bold'});
  T(400,42,pg?'★ = 3단계 + 중간 보스를 이기면 얻는 특수 스킬':'먹은 재료에 따라 3갈래 · 섞어서 키워도 된다',{fontSize:'9px',color:'#a99fc2'});
  T(784,16,O.st?'건너뛰기 ▸▸':'✕',{color:'#c9c0de',backgroundColor:'#241c38',padding:{x:8,y:4}},1,0);
  const X=[150,400,650],FD={p:[['f_s',14],['f_l',18],['kha',24]],c:[['f_c',18],['gna',16],['rek',24]],v:[['vdl',22],['cor',24]]},KW={p:['공격 ▲','흡수'],c:['방어 ▲','반사','부활'],v:['원거리','감각','권속']},AT={p:'턱으로 물기',c:'몸통 박치기',v:'검은 구체 (원거리)'};
  LK.forEach((k,i)=>{const x=X[i];g.fillStyle(0x140e24,1).fillRoundedRect(x-112,54,224,252,10);g.lineStyle(1.5,LCN[k],.7).strokeRoundedRect(x-112,54,224,252,10);
   g.fillStyle(LCN[k],1).fillRoundedRect(x-36,64,72,22,11);T(x,75,LN[k],{fontSize:'13px',fontStyle:'bold',color:'#12091f'});
   if(!pg){const F=FD[k],w=F.length*48;F.forEach(([key,h],j)=>this.artImg(D,key,x-w/2+24+j*48,116,h,dep+.1));if(k=='v')this.lqIcon(g,'v',x+48,116,7,LCN.v,1);
    g.fillStyle(0x241c38,1).fillRoundedRect(x-50,134,100,20,10);this.lqIcon(g,k,x-36,144,5,LCN[k],1);T(x+6,144,LRS[k],{fontStyle:'bold',color:LCS[k]});
    g.fillStyle(LCN[k],.8).fillTriangle(x-9,164,x+9,164,x,174);
    g.fillStyle(0x0b0716,1).fillRoundedRect(x-62,182,124,64,8);g.lineStyle(1.5,LCN[k],.9).strokeRoundedRect(x-62,182,124,64,8);this.artWorm(D,x+30,214,this.artLv(k,2),2,dep+.1);
    const kw=KW[k],cw=58;kw.forEach((s,j)=>{const cx2=x-(kw.length-1)*cw/2+j*cw;g.fillStyle(LCN[k],.18).fillRoundedRect(cx2-26,262,52,22,11);T(cx2,273,s,{fontStyle:'bold',color:LCS[k]})})}
   else{g.fillStyle(0x0b0716,1).fillRoundedRect(x-100,94,200,82,8);this.artScene(D,'atk',k,x,135,1,dep+.1);T(x,188,AT[k],{fontSize:'12px',fontStyle:'bold',color:LCS[k]});
    g.fillStyle(0x0b0716,1).fillRoundedRect(x-100,204,200,74,8);g.lineStyle(1,0xffe066,.5).strokeRoundedRect(x-100,204,200,74,8);this.artScene(D,'sk',k,x,241,.95,dep+.1);T(x,291,'★ '+MBQ[k].s,{fontSize:'12px',fontStyle:'bold',color:'#ffe066'})}});
  for(let i=0;i<2;i++)g.fillStyle(i==pg?0xc98bff:0x3a2f57,1).fillCircle(392+i*16,316,3.5);
  T(400,338,pg?(O.st?'시작 ▶':'닫기'):'다음 ▶',{fontSize:'14px',fontStyle:'bold',color:'#12091f',backgroundColor:'#a65cff',padding:{x:18,y:5}});
  if(pg>0)T(28,178,'◀',{fontSize:'22px',color:'#c9c0de'});if(pg<1)T(772,178,'▶',{fontSize:'22px',color:'#c9c0de'})}
 // ===== v60: 일시정지 → 게임 설명 (진화 나무 / 포식·갑각·공허 기초) =====
 helpOpen(){if(this.hpO||!this.pzo)return;const H=this.hpO=[],A=x=>{H.push(x);this.pzo.push(x);return x},dep=305;
  A(this.add.rectangle(400,180,800,360,0x0b0716,.94).setDepth(dep).setInteractive());A(this.add.text(400,36,'게임 설명',ST({fontSize:'20px',fontStyle:'bold'})).setOrigin(.5).setDepth(dep+.2));
  const g=A(this.add.graphics().setDepth(dep+.05));
  const btn=(x,title,draw,fn)=>{g.fillStyle(0x1c1430,1).fillRoundedRect(x-140,70,280,200,12);g.lineStyle(2,0xc98bff,.8).strokeRoundedRect(x-140,70,280,200,12);draw(x);A(this.add.text(x,246,title,ST({fontSize:'15px',fontStyle:'bold'})).setOrigin(.5).setDepth(dep+.2));
   A(this.add.zone(x,170,280,200).setInteractive().setDepth(dep+.3).on('pointerdown',fn))};
  btn(240,'진화 나무',x=>{const c=[x,178];for(const[k,dx,dy]of[['p',0,-62],['c',86,30],['v',-86,30]]){g.lineStyle(3,LCN[k],.9).lineBetween(c[0],c[1],c[0]+dx,c[1]+dy);g.fillStyle(0x0b0716,1).fillRoundedRect(c[0]+dx-24,c[1]+dy-14,48,28,6);g.lineStyle(1.5,LCN[k],1).strokeRoundedRect(c[0]+dx-24,c[1]+dy-14,48,28,6);this.artWorm(A,c[0]+dx+10,c[1]+dy,this.artLv(k,2),.8,dep+.1)}
   g.fillStyle(0x241c38,1).fillCircle(c[0],c[1],18);g.lineStyle(2,0xc98bff,1).strokeCircle(c[0],c[1],18);this.artWorm(A,c[0]+9,c[1],this.lin,.7,dep+.1)},()=>this.treeOpen(0,1));
  btn(560,'포식 · 갑각 · 공허',x=>{LK.forEach((k,i)=>{const y=104+i*44;g.fillStyle(LCN[k],.16).fillRoundedRect(x-110,y-17,220,34,8);this.artWorm(A,x-30,y,this.artLv(k,2),1.1,dep+.1);A(this.add.text(x+40,y,LN[k],ST({fontSize:'13px',fontStyle:'bold',color:LCS[k]})).setOrigin(.5).setDepth(dep+.2))})},()=>this.bsOpen(0));
  A(this.add.text(400,310,'◀ 돌아가기',ST({fontSize:'13px',fontStyle:'bold',color:'#ece6f7',backgroundColor:'#3a2f57',padding:{x:14,y:6}})).setOrigin(.5).setDepth(dep+.2).setInteractive().on('pointerdown',()=>this.helpClose()))}
 helpClose(){const H=this.hpO;if(!H)return;H.forEach(x=>x.destroy());this.pzo=(this.pzo||[]).filter(x=>!H.includes(x));this.hpO=null}
