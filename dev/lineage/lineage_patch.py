import json, sys
F = '/mnt/user-data/outputs/void-parasite-proto.html'
s = open(F, encoding='utf-8').read()
P = []  # [old,new] 기록


def rep(old, new, cnt=1):
    global s
    k = s.count(old)
    assert k == cnt, (k, old[:90])
    s = s.replace(old, new)
    P.append([old, new])


# ---------- 0. 상수 + 피부 텍스처 함수 ----------
CONST = r"""const LN={p:'포식',c:'갑각',v:'공허'},LCS={p:'#ff7a9a',c:'#9fd8ff',v:'#c98bff'},LCN={p:0xff7a9a,c:0x9fd8ff,v:0xc98bff},LRS={p:'유기물',c:'무기물',v:'공허 정수'},LK=['p','c','v'],
 LCOST={p:[30,60,90],c:[24,48,72],v:[3,6,9]},
 ND={p:[['갈고리 턱','물기 피해 +20% · 같은 적을 3번 물 때마다 찢기(3초간 출혈 6)'],['포식 성장','물어서 처치하면 몸이 커지며 최대 에너지 +6 (최대 5번) · 처치 즉시 에너지 +8'],['통째 삼키기','체력 25% 이하인 적을 물면 즉시 삼켜 처치 · 3초간 이동 +30%']],
  c:[['결정 비늘','받는 피해 −12% · 맞으면 받은 피해의 40%를 공격자에게 반사'],['수정 충전','결정을 먹으면 수정 1개 충전(최대 3) — 공격을 대신 막고 주변에 파편 피해 8'],['공명 갑각','반사 40% → 100% · 반사로 적을 처치하면 수정 1개 회복']],
  v:[['공허 감각','숨은 위협이 보인다 — 땅속 렉사이, 매복한 카직스, 미니맵에 이웃 방 몬스터 수'],['공허 침','60~200px 거리의 적에게 버튼을 누르면 공허 침 발사 (피해 8 · 둔화)'],['공허 권속','보이드링을 처치하면 아군으로 거둔다 (최대 2마리)']]};
// 진화 계통별 몸 모양 (머리 24px · 마디 20px, 2배 확대)
function skinTex(s,key,L){if(s.textures.exists('wh_'+key))return;
 const dom=L.p>0&&L.p>=L.c&&L.p>=L.v?'p':L.c>0&&L.c>=L.v?'c':L.v>0?'v':'n',t=dom=='n'?0:L[dom];
 const PAL={n:['#c98bff','#b06cf0','#a65cff','#8f4ad8','#7a3cc0'],p:[['#c77be8','#b05cd8','#9c4fe0','#8540c4','#6e34ac'],['#c062c8','#a84aa8','#933fa8','#7c3492','#662a7c'],['#c8509c','#a83a86','#922f78','#7c2868','#64205a']],c:[['#b998f0','#9f7ce8','#9070e0','#7c5cc8','#6a4cb0'],['#aeb0ec','#8e88d8','#7f78cc','#6c66b8','#5a54a0'],['#a7b6e8','#7f8ac8','#707bb8','#5f69a4','#4f588c']],v:[['#c98bff','#a65cff','#9a50f4','#8240d8','#6c30bc'],['#b878ff','#8e3ee8','#7c30d8','#6624bc','#521aa0'],['#a060ff','#6e28c8','#5e1eb4','#4c1698','#3c107c']]};
 const pal=dom=='n'?PAL.n:PAL[dom][t-1],px=(x,X,Y,c)=>{x.fillStyle=c;x.fillRect(Math.round(X),Math.round(Y),1,1)},ln=(x,a,b,c,d,col)=>{const n=Math.max(Math.abs(c-a),Math.abs(d-b))||1;for(let i=0;i<=n;i++)px(x,a+(c-a)*i/n,b+(d-b)*i/n,col)};
 tex(s,'wh_'+key,24,24,2,x=>{const c=12,r=4.9*(1+(L.p>=3?.16:L.p>=2?.06:0)+(L.c>=3?.08:0));
  if(L.v>=1)disc(x,c,c,r+2.2,'rgba(200,140,255,.28)');disc(x,c,c,r+.9,'#3d1b6b');disc(x,c,c,r,pal[0]);
  if(L.c>=1)for(let a=Math.PI*.55;a<Math.PI*1.45;a+=.12)px(x,c+Math.cos(a)*(r-.6),c+Math.sin(a)*(r-.6),'#dfe6ff');
  if(L.c>=3){for(let a=-r;a<=r;a++)px(x,c-1,c+a*.9,'#5a6494');ln(x,c+r-2,c-r+1,c+r+3,c-r-3,'#bfeaff');px(x,c+r+3,c-r-4,'#fff');ln(x,c+r-2,c+r-1,c+r+3,c+r+3,'#bfeaff');px(x,c+r+3,c+r+4,'#fff')}
  if(L.p>=1){ln(x,c+r-1,c-3,c+r+3,c-4,'#ffe0ea');ln(x,c+r+3,c-4,c+r+4,c-1,'#ffe0ea');ln(x,c+r-1,c+3,c+r+3,c+4,'#ffe0ea');ln(x,c+r+3,c+4,c+r+4,c+1,'#ffe0ea')}
  if(L.p>=3){for(let a=0;a<=r+1;a++){const w=(r+1-a)*.75;for(let b=-w;b<=w;b++)px(x,c+a,c+b,'#1a0414')}for(let a=1;a<=r;a+=2){const w=(r+1-a)*.75;px(x,c+a,c-w,'#fff');px(x,c+a,c+w,'#fff')}}
  const ec=L.p>=2?'#ff5a7a':'#ffffff';if(L.p>=3){px(x,c-1,c-4,ec);px(x,c-1,c+3,ec)}else{px(x,c+2,c-2,ec);px(x,c+2,c+1,ec)}
  if(L.v>=1){disc(x,c-1,c,1.9,'#ffe0ff');disc(x,c-1,c,1.1,'#c070ff');px(x,c-1,c,'#fff')}
  if(L.v>=2){ln(x,c+r,c-2,c+r+4,c-6,'#c070ff');px(x,c+r+5,c-7,'#f0c8ff');ln(x,c+r,c+2,c+r+4,c+6,'#c070ff');px(x,c+r+5,c+7,'#f0c8ff')}});
 [3.6,3.2,2.6,2].forEach((r0,i)=>tex(s,'ws'+(i+1)+'_'+key,20,20,2,x=>{const c=10,r=r0*(1+(L.p>=2?.12:0)+(L.c>=3?.06:0));
  if(L.v>=3)disc(x,c,c,r+2.4,'rgba(200,140,255,.3)');disc(x,c,c,r+.9,'#3d1b6b');disc(x,c,c,r,pal[i+1]);
  if(L.c>=1)for(let a=Math.PI*1.1;a<Math.PI*1.9;a+=.15)px(x,c+Math.cos(a)*(r-.4),c+Math.sin(a)*(r-.4),'#c8d0ec');
  if(L.p>=2){const h=L.p>=3?4:3;for(let k=0;k<h;k++)px(x,c,c-r-k,k==h-1?'#ffe0ea':'#e8b0c4');px(x,c-1,c-r,'#c8889c')}
  if(L.v>=2)disc(x,c,c,1.1,'#f0c8ff');if(L.v>=3){px(x,c-2,c,'#fff');px(x,c+2,c,'#fff');px(x,c,c-2,'#fff');px(x,c,c+2,'#fff')}}))}
"""
rep("let gid=0;", CONST + "let gid=0;")

# 수정 텍스처
rep("tex(s,'blk',20,20,2,x=>{});", "tex(s,'blk',20,20,2,x=>{});\n tex(s,'lc_cry',6,8,2,x=>{x.fillStyle='#5fa8d8';x.fillRect(2,1,2,6);x.fillRect(1,3,4,3);x.fillStyle='#9fd8ff';x.fillRect(2,2,1,4);x.fillStyle='#fff';x.fillRect(2,1,1,1)});")

# ---------- 1. 초기화 ----------
rep("this.st4=[5,5,5,5];this.lim=20;", "this.st4=[5,5,5,5];this.lin={p:0,c:0,v:0};this.spO=0;this.spM=0;this.spV=0;this.ve=0;this.feast=0;this.cry=0;this.fam=[];this.pprj=[];this.hasteT=0;this.spitCd=0;this.cryS=null;this.lim=20;")

# ---------- 2. recalc (스탯 분배 → 레벨 성장 + 계통 효과) ----------
i = s.find(' recalc(){'); j = s.find('\n', i)
old = s[i:j]
new = " recalc(){const L=this.lin||{p:0,c:0,v:0},v=this.plv-1;this.spd=3*(1+.015*v);this.emax=C.EN+5*v+6*(this.feast||0);this.drm=1;this.dmt=L.c>=1?.88:1;this.bdmg=(C.BITE.dmg+1.5*v)*(L.p>=1?1.2:1);this.bsc=1+.04*(this.feast||0)+(L.p>=3?.08:0)+(L.c>=3?.06:0)}"
rep(old, new)

# ---------- 3. 탈피 화면 전체 교체 (ssum ~ moltDone) ----------
i = s.find(' ssum(){'); j = s.find(' exc(m){', i)
old = s[i:j]
MOLT = r""" lcost(k){return LCOST[k][this.lin[k]]}
 lavail(k){return k=='p'?this.org-this.spO:k=='c'?this.mn-this.spM:this.ve-this.spV}
 nodeLock(k){const t=this.lin[k];if(t>=3)return '완성';if(t==2&&!LK.some(o=>o!=k&&this.lin[o]>=1))return '다른 계통 1단계 필요';if(this.lavail(k)<this.lcost(k))return LRS[k]+' '+Math.max(0,this.lavail(k))+' / '+this.lcost(k);return ''}
 nodeOk(k){return this.nodeLock(k)===''}
 canMolt(){return LK.some(k=>this.nodeOk(k))}
 moltPts(){return this.canMolt()?3:0}
 skinKey(L){return 'p'+L.p+'c'+L.c+'v'+L.v}
 wormSkin(){const L=this.lin,key=this.skinKey(L);if(key=='p0c0v0'){this.hd.setTexture('wh');this.sg.forEach((o,i)=>o.setTexture('ws'+(i+1)));return}skinTex(this,key,L);this.hd.setTexture('wh_'+key);this.sg.forEach((o,i)=>o.setTexture('ws'+(i+1)+'_'+key))}
 wormDeco(){const L=this.lin;if(L.c<2){if(this.cryS)this.cryS.forEach(o=>o.setVisible(false));return}if(!this.cryS)this.cryS=[0,1,2].map(()=>this.add.image(0,0,'lc_cry').setDepth(9.6));
  this.cryS.forEach((o,i)=>{const sg=this.sg[i];o.setVisible(i<this.cry).setPosition(sg.x,sg.y-6*this.bsc).setScale(this.bsc)})}
 moltOpen(){if(this.molt||this.tr)return;if(!this.canMolt()){this.pop('진화할 재료가 부족하다',this.pl.x,this.pl.y);return}
  const M=this.molt={sel:null,o:[]},A=o=>{M.o.push(o);return o};this.pl.setVelocity(0,0);this.vx=this.vy=0;this.joy=null;this.eat=null;
  A(this.add.rectangle(400,180,800,360,0x0d0818,.97).setDepth(400));
  A(this.add.text(30,16,'탈피 — 진화 계통',ST({fontSize:'22px',fontStyle:'bold'})).setDepth(401));
  M.sub=A(this.add.text(30,48,'',ST({fontSize:'12px',color:'#a99fc2'})).setDepth(401));
  A(this.add.rectangle(705,36,130,32,0xa65cff).setDepth(401));A(this.add.text(705,36,'진화 확정',ST({fontSize:'15px',color:'#12091f',fontStyle:'bold'})).setOrigin(.5).setDepth(402));
  A(this.add.rectangle(580,36,96,32,0x3a2f57).setDepth(401));A(this.add.text(580,36,'닫기',ST({fontSize:'14px'})).setOrigin(.5).setDepth(402));
  M.g=A(this.add.graphics().setDepth(401));M.tt=[];M.rw=[];
  LK.forEach((k,i)=>{const x0=24+i*254;M.tt.push(A(this.add.text(x0+12,80,'',ST({fontSize:'15px',fontStyle:'bold',color:LCS[k]})).setDepth(402)));
   M.rw.push([0,1,2].map(t=>A(this.add.text(x0+12,108+t*76,'',ST({fontSize:'12px',color:'#ece6f7',lineSpacing:3,wordWrap:{width:226,useAdvancedWrap:true}})).setDepth(402))))});
  M.pv=[];for(let i=4;i>=1;i--)M.pv.push(A(this.add.image(0,0,'ws'+i).setDepth(402)));M.pv.push(A(this.add.image(0,0,'wh').setDepth(403)));
  M.pvT=A(this.add.text(440,36,'',ST({fontSize:'10px',color:'#a99fc2'})).setOrigin(.5).setDepth(402));
  this.moltRefresh()}
 moltRefresh(){const M=this.molt,g=M.g,L=this.lin;g.clear();
  M.sub.setText('쓸 수 있는 재료: 유기물 '+this.lavail('p')+' · 무기물 '+this.lavail('c')+' · 공허 정수 '+this.lavail('v')+'   ·   탈피 '+(this.molts+1)+'회차 — 계통 하나를 골라 다음 단계를 새긴다');
  LK.forEach((k,i)=>{const x0=24+i*254,sel=M.sel==k,lk=this.nodeLock(k);g.fillStyle(sel?0x2a2040:0x1d1726,1).fillRoundedRect(x0,72,246,272,8);g.lineStyle(sel?3:1,sel?LCN[k]:0x3a2f57,1).strokeRoundedRect(x0,72,246,272,8);
   M.tt[i].setText(LN[k]+' 계통  ·  '+LRS[k]);
   for(let t=0;t<3;t++){const tx=M.rw[i][t],[nm,ds]=ND[k][t];let head,col;
    if(t<L[k]){head='✔ '+(t+1)+'단계 · '+nm;col='#7be0a8'}else if(t==L[k]){head=(lk?'· ':'▶ ')+(t+1)+'단계 · '+nm+(lk?'   ['+lk+']':'   [선택 가능]');col=lk?'#a99fc2':(sel?'#ffe066':'#ece6f7')}else{head='잠김 · '+(t+1)+'단계 · '+nm;col='#6b6280'}
    tx.setText(head+'\n'+ds).setColor(col);if(t==L[k]&&!lk){g.fillStyle(LCN[k],sel?.22:.1).fillRoundedRect(x0+6,102+t*76,234,70,6)}}});
  const pl=M.sel?{...L,[M.sel]:L[M.sel]+1}:L,key=this.skinKey(pl);if(key!='p0c0v0')skinTex(this,key,pl);
  M.pv.forEach((o,i)=>{const n=4-i;o.setTexture(key=='p0c0v0'?(n?'ws'+n:'wh'):(n?'ws'+n+'_'+key:'wh_'+key))});M.pvT.setText(M.sel?'진화 후 모습':'지금 모습');
  M.bs=1+.04*(this.feast||0)+(pl.p>=3?.08:0)+(pl.c>=3?.06:0)}
 moltU(t){const M=this.molt,k=this.k,J=Phaser.Input.Keyboard.JustDown;const bs=1.5*(M.bs||1),fl=(M.sel?{...this.lin,[M.sel]:this.lin[M.sel]+1}:this.lin).v>=3?1.3:1;
  M.pv.forEach((o,i)=>{const n=4-i;o.setPosition(440+16*bs-n*7*bs*fl,58+Math.sin(t/200+n)*2).setScale(bs)});
  ['ONE','TWO','THREE'].forEach((key,i)=>{if(J(k[key]))this.moltTap(24+i*254+100,200)});if(J(k.ENTER))this.moltDone();else if(J(k.ESC))this.moltClose()}
 moltTap(x,y){const M=this.molt;if(!M)return;if(Math.abs(x-705)<65&&Math.abs(y-36)<16)return this.moltDone();if(Math.abs(x-580)<48&&Math.abs(y-36)<16)return this.moltClose();
  if(y>72&&y<344){const i=Math.floor((x-24)/254);if(i<0||i>2)return;const k=LK[i],lk=this.nodeLock(k);if(lk){this.pop(LN[k]+' 계통: '+lk,400,150);return}M.sel=M.sel==k?null:k;this.moltRefresh()}}
 moltClose(){if(!this.molt)return;this.molt.o.forEach(o=>o.destroy());this.molt=null}
 moltDone(){const M=this.molt;if(!M)return;if(!M.sel){this.pop('진화할 계통을 고를 것',400,150);return}
  const k=M.sel,c=this.lcost(k);if(k=='p')this.spO+=c;else if(k=='c')this.spM+=c;else this.spV+=c;this.lin[k]++;this.molts++;
  this.recalc();this.en=this.emax;this.wormSkin();this.moltClose();const p=this.pl,col=LCN[k];
  for(let i=0;i<14;i++){const an=i/14*6.283+Math.random()*.3,b=this.add.rectangle(p.x,p.y,6,4,[0x8f6ab8,0x4a2f6a,col][i%3]).setRotation(an).setDepth(12);this.tweens.add({targets:b,x:p.x+Math.cos(an)*(30+Math.random()*25),y:p.y+Math.sin(an)*(20+Math.random()*20)+10,angle:Math.random()*360,alpha:0,duration:700,ease:'Quad.out',onComplete:()=>b.destroy()})}
  this.bd.forEach(o=>{o.setTintFill(0xffffff);this.time.delayedCall(140,()=>o.clearTint())});
  this.pop(LN[k]+' 계통 '+this.lin[k]+'단계 · '+ND[k][this.lin[k]-1][0],p.x,p.y-10)}
 // ----- 계통 능력 -----
 dtx(x,y,t,c){const tx=this.add.text(x,y,t,ST({fontSize:'12px',color:c,fontStyle:'bold'})).setOrigin(.5).setDepth(70);this.tweens.add({targets:tx,y:y-24,alpha:0,duration:700,onComplete:()=>tx.destroy()})}
 dmgM(m,d,q){if(!m.on)return 0;m.hp-=d;if(!q&&m.spr){m.spr.setTintFill(0xffffff);this.time.delayedCall(70,()=>{if(m.spr)m.spr.clearTint()})}if(m.hp<=0){this.kill(m);return 1}return 0}
 gulp(m){const x=m.x,y=m.y;this.kill(m);this.hasteT=3;this.dtx(x,y-16,'통째 삼키기!','#ff7a9a');for(let i=0;i<8;i++){const an=i/8*6.283,b=this.add.circle(x+Math.cos(an)*22,y+Math.sin(an)*22,2.5,0xff7a9a).setDepth(12);this.tweens.add({targets:b,x:this.pl.x,y:this.pl.y,alpha:0,duration:260,onComplete:()=>b.destroy()})}if(this.lin.p>=2)this.feed()}
 feed(){if(this.feast<5){this.feast++;this.recalc()}this.en=Math.min(this.emax,this.en+8);this.dtx(this.pl.x,this.pl.y-26,'포식 +8','#ff9ac0')}
 shard(){const p=this.pl;for(const m of this.cur.en)if(m.on&&!(m.k=='rek'&&m.st=='under')&&Math.hypot(m.x-p.x,m.y-p.y)<64)this.dmgM(m,8);
  for(let i=0;i<10;i++){const an=i/10*6.283,b=this.add.rectangle(p.x,p.y,5,2,0x9fd8ff).setRotation(an).setDepth(12);this.tweens.add({targets:b,x:p.x+Math.cos(an)*60,y:p.y+Math.sin(an)*60,alpha:0,duration:320,onComplete:()=>b.destroy()})}}
 sdmg(){return 8+1.2*(this.plv-1)}
 spit(){if(this.spitCd>0)return;const p=this.pl;let b=null,bd=200;for(const m of this.cur.en)if(m.on&&m.spr&&m.spr.visible!==false&&!(m.k=='rek'&&m.st!='up')){const d=Math.hypot(m.x-p.x,m.y-p.y);if(d>=36&&d<bd&&this.los(p.x,p.y,m.x,m.y)){bd=d;b=m}}if(!b)return;
  this.spitCd=1.5;const a=Math.atan2(b.y-p.y,b.x-p.x);this.ang=a;const o=this.add.circle(p.x,p.y,4,0xc070ff,1).setStrokeStyle(1.5,0xf0c8ff).setDepth(11);this.pprj.push({o,x:p.x,y:p.y,a,v:310,t:.9,tg:b})}
 pprjU(dt){this.spitCd=Math.max(0,(this.spitCd||0)-dt);this.hasteT=Math.max(0,(this.hasteT||0)-dt);if(!this.pprj.length)return;
  for(const q of this.pprj){q.t-=dt;if(q.tg&&q.tg.on){const df=Phaser.Math.Angle.Wrap(Math.atan2(q.tg.y-q.y,q.tg.x-q.x)-q.a);q.a+=Phaser.Math.Clamp(df,-2.5*dt,2.5*dt)}
   q.x+=Math.cos(q.a)*q.v*dt;q.y+=Math.sin(q.a)*q.v*dt;q.o.setPosition(q.x,q.y);if(Math.random()<.5){const b=this.add.circle(q.x,q.y,1.5,0xc070ff,.6).setDepth(10.5);this.tweens.add({targets:b,alpha:0,scale:.3,duration:220,onComplete:()=>b.destroy()})}
   if(this.blk(q.x,q.y,18)||q.x<40||q.x>760||q.y<40||q.y>320)q.t=0;
   else for(const m of this.cur.en)if(m.on&&m.spr&&!(m.k=='rek'&&m.st!='up')&&Math.hypot(m.x-q.x,m.y-q.y)<16){m.slw=1.5;this.dmgM(m,this.sdmg());q.t=0;const r=this.add.circle(q.x,q.y,14,0xc070ff,.35).setDepth(11);this.tweens.add({targets:r,scale:1.6,alpha:0,duration:240,onComplete:()=>r.destroy()});break}
   if(q.t<=0)q.o.destroy()}this.pprj=this.pprj.filter(q=>q.t>0)}
 linPre(){for(const m of this.cur.en)if(m.on&&m.slw>0){m.x0=m.x;m.y0=m.y}}
 linPost(dt){for(const m of this.cur.en){if(!m.on)continue;if(m.slw>0){m.slw-=dt;if(m.x0!=null){m.x=m.x0+(m.x-m.x0)*.5;m.y=m.y0+(m.y-m.y0)*.5;m.x0=null}if(Math.random()<dt*6){const b=this.add.circle(m.x+(Math.random()-.5)*14,m.y,1.6,0xc070ff,.8).setDepth(12);this.tweens.add({targets:b,y:b.y+10,alpha:0,duration:400,onComplete:()=>b.destroy()})}}
   if(m.bl>0){m.bl-=dt;if(Math.random()<dt*5){const b=this.add.circle(m.x+(Math.random()-.5)*10,m.y,1.5,0xff4a6a,.9).setDepth(12);this.tweens.add({targets:b,y:b.y+12,alpha:0,duration:450,onComplete:()=>b.destroy()})}this.dmgM(m,2*dt,true)}}}
 famAdd(x,y){const spr=this.add.image(x,y,'vdl').setTint(0x9ff0ff).setDepth(12).setScale(.85);this.fam.push({spr,x,y,a:Math.random()*6.283,cd:0});this.dtx(x,y-18,'공허 권속','#9ff0ff')}
 famU(dt){if(!this.fam.length)return;const p=this.pl;for(const f of this.fam){if(f.snap){f.x=p.x;f.y=p.y;f.snap=0}f.cd-=dt;let tg=null,bd=120;
   for(const m of this.cur.en)if(m.on&&m.spr&&!(m.k=='rek'&&m.st!='up')){const d=Math.hypot(m.x-p.x,m.y-p.y);if(d<bd){bd=d;tg=m}}
   let gx,gy,v;if(tg){gx=tg.x;gy=tg.y;v=230;if(Math.hypot(tg.x-f.x,tg.y-f.y)<16&&f.cd<=0){f.cd=.8;this.dmgM(tg,4+.5*(this.plv-1))}}else{f.a+=dt*2.5;gx=p.x+Math.cos(f.a)*30;gy=p.y+Math.sin(f.a)*22;v=260}
   const dx=gx-f.x,dy=gy-f.y,d=Math.hypot(dx,dy)||1,st=Math.min(d,v*dt);f.x+=dx/d*st;f.y+=dy/d*st;f.spr.setPosition(f.x,f.y).setRotation(Math.atan2(dy,dx)+Math.PI/2)}}
"""
rep(old, MOLT)

# ---------- 4. 물기 ----------
rep("this.bcd=C.BITE.cd;\n  const e=this.add.circle(p.x+fx*34", "this.bcd=C.BITE.cd;let hit=0;\n  const e=this.add.circle(p.x+fx*34")
rep("o.spr.setTexture('gnac').setRotation(0)}}m.hp-=dg;", "o.spr.setTexture('gnac').setRotation(0)}}hit=1;{const L=this.lin,mh=m.mh||((({rek:C.R,gna:C.G,vdl:C.V})[m.k]||C.E).hp);if(L.p>=3&&m.hp<=mh*.25){this.gulp(m);continue}m.bc=(m.bc||0)+1;if(L.p>=1&&m.bc%3==0){m.bl=3;this.dtx(m.x,m.y-14,'찢기','#ff7a9a')}}m.hp-=dg;")
rep("if(m.hp<=0)this.kill(m)}}}\n foe(", "if(m.hp<=0){this.kill(m);if(this.lin.p>=2)this.feed()}}}if(!hit&&this.lin.v>=2)this.spit()}\n foe(")

# ---------- 5. 피해 (반사·수정) ----------
i = s.find(' hurt(d,src){'); j = s.find('\n', i)
rep(s[i:j], " hurt(d,src,m){if(this.inv>0)return;this.inv=.5;this.lastHit={src:src||'공격',t:this.time.now};const L=this.lin;\n  if(L.c>=2&&this.cry>0){this.cry--;this.shard();this.dtx(this.pl.x,this.pl.y-22,'수정이 막았다','#9fd8ff');return}\n  const dd=d*this.dmt;this.en-=dd;this.bd.forEach(o=>o.setTint(0xff6a8a));this.time.delayedCall(150,()=>this.bd.forEach(o=>o.clearTint()));this.cameras.main.shake(100,.004);\n  if(L.c>=1&&m&&m.on&&dd>0){const rd=dd*(L.c>=3?1:.4),kd=this.dmgM(m,rd);this.dtx(m.x,m.y-18,'반사 '+Math.round(rd),'#9fd8ff');if(kd&&L.c>=3&&this.cry<3)this.cry++}}")
for src in ['카직스의 도약', '렉사이의 솟구치기', '렉사이의 물기', '보이드링 무리', '카직스의 할퀴기']:
    rep(f"'{src}')", f"'{src}',m)")
rep("'카직스의 공허 가시')", "'카직스의 공허 가시',bm)")
rep(" boom(x,y,p,df){", " boom(x,y,p,df,bm){")
rep("this.boom(q.x,q.y,p,q.df)", "this.boom(q.x,q.y,p,q.df,q.mm)")
rep("(this.prj=this.prj||[]).push({o,x,y,a,", "(this.prj=this.prj||[]).push({o,x,y,a,mm:m,")

# ---------- 6. 갱신 루프 ----------
rep("this.req=0;this.foe(dt,p);this.prjU(dt,p);", "this.req=0;this.linPre();this.foe(dt,p);this.linPost(dt);this.prjU(dt,p);this.pprjU(dt);this.famU(dt);")
rep("const sp=this.spd*C.T*(this.slow>0?.6:1);", "const sp=this.spd*C.T*(this.slow>0?.6:1)*(this.hasteT>0?1.3:1);")
rep("const sl=7*this.bsc;", "const sl=7*this.bsc*(this.lin.v>=3?1.3:1);")
rep("this.sh.setPosition(hx,hy+12)}", "this.sh.setPosition(hx,hy+12);this.wormDeco()}")

# ---------- 7. 섭취·처치: 공허 정수, 수정 충전, 권속 ----------
rep("this.en=Math.min(this.emax,this.en+d.e);this.org+=d.o;this.mn+=d.m;\n  const s=[d.e&&'에너지 +'+d.e,d.o&&'유기 +'+d.o,d.m&&'무기 +'+d.m]",
    "this.en=Math.min(this.emax,this.en+d.e);this.org+=d.o;this.mn+=d.m;if(f.t=='h')this.ve++;if(f.t=='c'&&this.lin.c>=2&&this.cry<3)this.cry++;\n  const s=[d.e&&'에너지 +'+d.e,d.o&&'유기 +'+d.o,d.m&&'무기 +'+d.m,f.t=='h'&&'공허 정수 +1']")
rep("const vd=m.k=='vdl';if(vd){this.en=Math.min(this.emax,this.en+e);this.org+=o;this.mn+=mi}",
    "const vd=m.k=='vdl';if(vd){this.en=Math.min(this.emax,this.en+e);this.org+=o;this.mn+=mi;this.ve++;if(this.lin.v>=3&&this.fam.length<2)this.famAdd(x,y)}")
rep("['경험치 +'+xp].concat(vd?[e&&'에너지 +'+e,o&&'유기 +'+o]:[])", "['경험치 +'+xp].concat(vd?[e&&'에너지 +'+e,o&&'유기 +'+o,'정수 +1']:[])")

# ---------- 8. 방 이동 ----------
rep(" enter(a){\n  this.cur=a;a.seen=1;", " enter(a){\n  this.cur=a;a.seen=1;(this.pprj||[]).forEach(q=>q.o.destroy());this.pprj=[];(this.fam||[]).forEach(f=>f.snap=1);")

# ---------- 9. HUD ----------
i = s.find("{const mt=this.org+this.mn-this.mb;this.t2.setText("); j = s.find('\n', i)
rep(s[i:j], "{let hint='진화 완료';if(this.canMolt())hint='탈피 가능 (둥지에서)';else{let b=null,br=-1;for(const k of LK){const t=this.lin[k];if(t>=3||(t==2&&!LK.some(o=>o!=k&&this.lin[o]>=1)))continue;const r=this.lavail(k)/this.lcost(k);if(r>br){br=r;b=k}}if(b)hint=LN[b]+' '+(this.lin[b]+1)+'단계 '+Math.max(0,this.lavail(b))+' / '+this.lcost(b)}\n   this.t2.setText('구역 1 / 3\\n유기 '+this.lavail('p')+' · 무기 '+this.lavail('c')+' · 정수 '+this.lavail('v')+'\\n'+hint)}\n  if(this.lin.v>=1){const GR2=this.gR,pu=.55+.3*Math.sin(this.time.now/160);for(const m of this.cur.en){if(!m.on)continue;if(m.k=='rek'&&m.st!='up'){g.lineStyle(2,m.trk>0?0xff5a7a:0xc070ff,pu).strokeCircle(m.x,m.y,16)}else if(!m.k&&(m.st=='idle'||m.st=='hunt'||m.st=='eat')){g.lineStyle(1.5,0xc070ff,pu*.8).strokeCircle(m.x,m.y,18)}}\n   const D={N:[-1,0],S:[1,0],W:[0,-1],E:[0,1]};for(const k in D){if(!this.cur.d[k])continue;const b=this.lv.at(this.cur.r+D[k][0],this.cur.c+D[k][1]);if(!b)continue;const n=Math.min(4,b.en.filter(e=>e.on&&e.k!='gna').length);for(let q=0;q<n;q++)GR2.fillStyle(0xff5a7a,1).fillRect(723+b.c*16+q*3,59+b.r*16,2,2)}}")
rep("if(dk&&Math.hypot(m.x-this.pl.x,m.y-this.pl.y)>110)continue;", "if(dk&&this.lin.v<1&&Math.hypot(m.x-this.pl.x,m.y-this.pl.y)>110)continue;")

open(F, 'w', encoding='utf-8').write(s)
json.dump(P, open('/home/claude/play/rL.json', 'w'), ensure_ascii=False)
print('ok', len(P))
