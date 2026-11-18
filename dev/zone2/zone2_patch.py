import json, sys
F = '/mnt/user-data/outputs/void-parasite-proto.html'
s = open(F, encoding='utf-8').read()
P = []


def rep(old, new, cnt=1):
    global s
    k = s.count(old)
    assert k == cnt, (k, old[:120])
    s = s.replace(old, new)
    P.append([old, new])


# ---------- 상수 ----------
rep("V:{fl:.6,hp:14,dmg:4,v:150,orb:70,aggro:140,e:4,o:1},",
    "V:{fl:.6,hp:14,dmg:4,v:150,orb:70,aggro:140,e:4,o:1},SP:{hp:30,dmg:5,v:260,cd:2.6,e:6,o:0,m:4},LS:{hp:16,dmg:6,v:330,cd:1.9,e:5,o:2,m:0},QN:{hp:150,dmg:8,e:40,o:12,m:10},WD:{hp:170,dmg:15,e:40,o:10,m:12},")
rep("const TR={haven:",
    "const TR={coral:['공허 산호 숲 (산호는 물어서 부술 수 있다 · 가시 산호충)',0xff8a70],watch:['심연의 감시탑 (빛줄기에 닿으면 들킨다 · 그림자로 다닐 것)',0x78c8d8],haven:")
rep("let gid=0;\n",
    "let gid=0;\nconst MON=k=>({rek:C.R,gna:C.G,vdl:C.V,spn:C.SP,lsp:C.LS,qn:C.QN,wd:C.WD})[k]||C.E;\n")
rep("['통째 삼키기','체력 25% 이하인 적을 물면 즉시 삼켜 처치 · 3초간 이동 +30%']",
    "['통째 삼키기','체력 25% 이하인 적(정예는 12%)을 물면 즉시 삼켜 처치 · 3초간 이동 +30%']")

rep("['공허 침','60~200px 거리의 적에게 버튼을 누르면 공허 침 발사 (피해 8 · 둔화)']","['공허 침','60~200px 거리의 적에게 버튼을 누르면 공허 침 발사 (피해 8 · 둔화) · 산호는 한 방에 녹인다']")
# ---------- 텍스처 ----------
TEX = open('/home/claude/play/z2/z2tex.js', encoding='utf-8').read().strip()
rep("x.fillRect(i,j,1,1)});\n}\n\nfunction rockTex(",
    "x.fillRect(i,j,1,1)});\n z2Tex(s);\n}\n\n// ===== 2구역 텍스처 =====\n" + TEX + "\n\nfunction rockTex(")

# ---------- gen(z) ----------
rep("function gen(){", "function gen(z=1){")
rep("const dgT=['brood','brood','mine','mine','flow','flow','lair'],sfT=['haven','dark','swamp','swamp']",
    "const dgT=z==2?['coral','coral','watch','watch','mine','flow','brood']:['brood','brood','mine','mine','flow','flow','lair'],sfT=['haven','dark','swamp','swamp']")
rep("ord.filter(a=>!a.tr).slice(0,sfT.length).forEach((a,i)=>{a.tr=sfT[i]});",
    "ord.filter(a=>!a.tr).slice(0,sfT.length).forEach((a,i)=>{a.tr=sfT[i]});\n // 2구역 정예: 가장 먼 산호 숲 = 산호 여왕, 가장 먼 감시탑 = 감시자\n if(z==2)for(const t of['coral','watch']){const c=rooms.filter(a=>a.tr==t).sort((u,v)=>dist.get(v)-dist.get(u));if(c.length)c[0].el=t=='coral'?'qn':'wd'}")
rep("if(c<1||c>18||r<1||r>7||a.obs.some(o=>o[0]==c&&o[1]==r)||a.food.some(f=>f.c==c&&f.r==r)||",
    "if(c<1||c>18||r<1||r>7||a.obs.some(o=>o[0]==c&&o[1]==r)||(a.cor||[]).some(o=>o.c==c&&o.r==r)||a.food.some(f=>f.c==c&&f.r==r)||")
rep("for(const a of rooms){if(a.tr=='mine'||a.tr=='swamp'||(a.tr!='haven'&&Math.random()>.3))continue;",
    "for(const a of rooms){if(a.tr=='mine'||a.tr=='swamp'||a.tr=='coral'||a.tr=='watch'||(a.tr!='haven'&&Math.random()>.3))continue;")
rep("gap=(x,y,cs)=>!a.obs.some(o=>Math.abs(o[0]-x)<2&&Math.abs(o[1]-y)<2&&!cs.some(q=>q[0]==o[0]&&q[1]==o[1]));",
    "gap=(x,y,cs)=>!a.obs.some(o=>Math.abs(o[0]-x)<2&&Math.abs(o[1]-y)<2&&!cs.some(q=>q[0]==o[0]&&q[1]==o[1]))&&!(a.cor||[]).some(o=>Math.abs(o.c-x)<2&&Math.abs(o.r-y)<2&&!cs.some(q=>q[0]==o.c&&q[1]==o.r));")
rep("const R=t=='mine'?[4+rnd(2),3,5]:t=='haven'?[rnd(2),2,3]:t=='swamp'?[1+rnd(2),2,3]:[2+rnd(2),2,4],\n   S=t=='mine'?2+rnd(2):t=='haven'?0:1+rnd(2),TG=a.wt?0:t=='mine'?0:t=='haven'?3+rnd(2):t=='swamp'?1:1+rnd(2);",
    "const R=t=='mine'?[4+rnd(2),3,5]:t=='haven'?[rnd(2),2,3]:t=='swamp'?[1+rnd(2),2,3]:t=='coral'?[1+rnd(2),2,3]:t=='watch'?[4+rnd(2),1,2]:[2+rnd(2),2,4],\n   S=t=='mine'?2+rnd(2):t=='haven'?0:t=='coral'?1:1+rnd(2),TG=a.wt?0:t=='mine'||t=='coral'||t=='watch'?0:t=='haven'?3+rnd(2):t=='swamp'?1:1+rnd(2);")
rep("  for(let i=0;i<TG;i++){const cs=grow(1+rnd(3));if(!cs)continue;add(cs,1);for(let q=0;q<(t=='haven'?3:2);q++)near(a,'s',pick(cs))}\n",
    "  for(let i=0;i<TG;i++){const cs=grow(1+rnd(3));if(!cs)continue;add(cs,1);for(let q=0;q<(t=='haven'?3:2);q++)near(a,'s',pick(cs))}\n"
    "  // 공허 산호 숲: 세로 산호벽 1줄 + 산호 덤불 여러 개 (물어서 부술 수 있음)\n"
    "  if(t=='coral'){a.cor=[];const cadd=cs=>cs.forEach(([x,y])=>a.cor.push({c:x,r:y,hp:3,on:1,ess:1}));\n"
    "   for(let tt=0;tt<40;tt++){const c=pick([4,5,6,13,14,15]),n=4+rnd(2),r0=1+rnd(8-n),cs=[];for(let r=r0;r<r0+n;r++)cs.push([c,r]);if(cs.some(([x,y])=>!free(x,y)||!gap(x,y,cs)))continue;cadd(cs);break}\n"
    "   for(let i=4+rnd(3);i>0;i--){const cs=grow(1+rnd(3));if(cs)cadd(cs)}}\n"
    "  // 심연의 감시탑: 회전하는 등불 기둥 (감시자 방은 1개)\n"
    "  if(t=='watch'){a.tw=[];for(let tt=0;tt<80&&a.tw.length<(a.el?1:2);tt++){const c=2+rnd(16),r=1+rnd(7);if(!free(c,r)||!gap(c,r,[])||a.tw.some(w=>Math.abs(w.c-c)<6))continue;add([[c,r]],3);a.tw.push({c,r,x:(c+.5)*C.T,y:(r+.5)*C.T-6,a:Math.random()*6.283,spd:(Math.random()<.5?1:-1)*(.4+Math.random()*.25),hw:.3,len:460})}}\n")
rep("if(s.some(([x,y])=>x>18||y>7||res(x,y)||a.obs.some(o=>Math.abs(o[0]-x)<1&&Math.abs(o[1]-y)<1)||a.zn.some(o=>o[0]==x&&o[1]==y)))continue;",
    "if(s.some(([x,y])=>x>18||y>7||res(x,y)||a.obs.some(o=>Math.abs(o[0]-x)<1&&Math.abs(o[1]-y)<1)||(a.cor||[]).some(o=>o.c==x&&o.r==y)||a.zn.some(o=>o[0]==x&&o[1]==y)))continue;")
rep("if(t=='lair'){nr(a,'c',4,[10,4],3);nr(a,'l',4,[10,4],3)}}",
    "if(t=='lair'){nr(a,'c',4,[10,4],3);nr(a,'l',4,[10,4],3)}\n  if(t=='coral'){nr(a,'s',2);nr(a,'c',2)}\n  if(t=='watch'){nr(a,'c',3);nr(a,'s',3);nr(a,'l',1)}}")
rep("if(c<1||c>18||r<1||r>7||a.obs.some(o=>o[0]==c&&o[1]==r)||(avoid&&res(c,r)))continue;return{x:",
    "if(c<1||c>18||r<1||r>7||a.obs.some(o=>o[0]==c&&o[1]==r)||(a.cor||[]).some(o=>o.c==c&&o.r==r)||(avoid&&res(c,r)))continue;return{x:")
rep("if(a.obs.some(o=>o[0]==c&&o[1]==r))continue;P(a,{x:(c+.5)*C.T,y:(r+.5)*C.T,hp:C.E.hp,ag});break}};",
    "if(a.obs.some(o=>o[0]==c&&o[1]==r)||(a.cor||[]).some(o=>o.c==c&&o.r==r))continue;P(a,{x:(c+.5)*C.T,y:(r+.5)*C.T,hp:C.E.hp,ag});break}};")
rep("const nrk=t=='mine'?1+(Math.random()<.5?1:0):(t!='flow'&&ng>=2",
    "const nrk=t=='mine'?1+(Math.random()<.5?1:0):(t!='flow'&&t!='coral'&&t!='watch'&&ng>=2")
rep("  if(t=='dark'){mk(a,2,150);continue}\n",
    "  // 산호 숲: 산호 속에 숨은 가시 산호충 (+정예 산호 여왕)\n"
    "  if(t=='coral'){const hs=[];for(const o of a.cor.slice().sort(()=>Math.random()-.5)){if(hs.length>=(a.el?1+rnd(2):2+rnd(2)))break;if(hs.some(h=>Math.abs(h.c-o.c)+Math.abs(h.r-o.r)<3))continue;hs.push(o);P(a,{k:'spn',x:(o.c+.5)*C.T,y:(o.r+.5)*C.T,hp:C.SP.hp,home:o,st:'hide',fa:0})}\n"
    "   if(a.el){const p=spot(a,null,1);if(p)P(a,{k:'qn',...p,hp:C.QN.hp,cd:2})}continue}\n"
    "  // 감시탑: 빛 포자 (+정예 감시자, 아니면 그림자 속 카직스)\n"
    "  if(t=='watch'){for(let i=a.el?1+rnd(2):2+rnd(2);i>0;i--){const p=spot(a,null,1);if(p)P(a,{k:'lsp',...p,hp:C.LS.hp})}\n"
    "   if(a.el){const p=spot(a,null,1);if(p)P(a,{k:'wd',...p,hp:C.WD.hp,fa:Math.random()*6.283,sd:Math.random()<.5?1:-1})}else if(dd>=2){const p=spot(a,rocks,1);if(p)P(a,{...p,hp:C.E.hp})}continue}\n"
    "  if(t=='dark'){mk(a,2,150);continue}\n")

# ---------- create / enter ----------
rep("  this.lv=gen();\n", "  this.zi=1;this.zt0=this.time.now;this.eprj=[];this.lit=0;this.litW=0;this.bmD=null;this.bmG=null;this.litTx=null;\n  this.lv=gen(1);\n")
rep(" enter(a){\n  this.cur=a;a.seen=1;",
    " enter(a){\n  this.cur=a;a.seen=1;(this.eprj||[]).forEach(q=>q.o.destroy());this.eprj=[];this.bmD=this.bmG=null;this.lit=0;if(this.litTx)this.litTx.setVisible(false);if(a.cor){const now=this.time.now;a.cor=a.cor.filter(o=>!(o.tmp&&(!o.on||o.tmp<now)));for(const e of a.en)if(e.k=='spn'&&e.home&&!(e.home.on&&a.cor.includes(e.home)))e.home=null}")
rep("this.fl.setTint(a.tr?TR[a.tr][1]:0xffffff);", "this.fl.setTexture(this.zi>1?'floor2':'floor').setTint(a.tr?TR[a.tr][1]:0xffffff);")
rep("if(!door)this.walls.create(x,y,'wall').setDepth(2);", "if(!door)this.walls.create(x,y,'wall').setDepth(2).setTint(this.zi>1?0xa494d8:0xffffff);")
rep("   else{const key='rkc'+g;if(!this.textures.exists(key))rockTex(",
    "   else if(w==3){this.dec.push(this.add.image((ac+.5)*T,(ar+.5)*T+4,'lamp').setDepth(9.5))}\n   else{const key='rkc'+g;if(!this.textures.exists(key))rockTex(")
rep("  this.bushMk(a);\n",
    "  this.bushMk(a);\n  (a.cor||[]).forEach(o=>{if(o.on)this.corMk(o);else if(!o.tmp)this.dec.push(this.add.image((o.c+.5)*C.T,(o.r+.5)*C.T+10,'corS').setDepth(.75))});\n  if(a.tw||a.en.some(e=>e.on&&e.k=='wd')){this.bmD=this.add.graphics().setDepth(39);this.bmG=this.add.graphics().setDepth(39.5).setBlendMode(Phaser.BlendModes.ADD);this.dec.push(this.bmD,this.bmG)}\n")
OLD_SPR = "a.en.forEach(e=>{if(!e.on)return;this.lvl(e);e.lvT=this.add.text(e.x,e.y,'Lv.'+e.lv,ST({fontSize:'10px',fontStyle:'bold'})).setOrigin(1,.5).setDepth(60);e.lvc=null;if(e.k=='rek'){if(e.st!='up')e.st='under';e.tm=0;e.trk=0;e.spr=this.add.image(e.x,e.y,e.st=='up'?'rek':'mound').setDepth(e.st=='up'?9:1.6)}else if(e.k=='gna'){e.st='idle';e.spr=this.add.image(e.x,e.y,'gna').setDepth(6)}else if(e.k=='vdl'){e.st='orbit';e.oa=null;e.spr=this.add.image(e.x,e.y,'vdl').setDepth(12)}else{e.st='idle';e.t=0;e.spr=this.add.image(e.x,e.y,'kha').setDepth(9)}});"
rep(OLD_SPR, "a.en.forEach(e=>{if(e.on)this.mkSpr(e)});")

# ---------- 판정/피해 ----------
rep("blk(x,y,m){return this.cur.obs.some(([c,r])=>Math.abs(x-(c+.5)*C.T)<m&&Math.abs(y-(r+.5)*C.T)<m)}",
    "blk(x,y,m){return this.cur.obs.some(([c,r])=>Math.abs(x-(c+.5)*C.T)<m&&Math.abs(y-(r+.5)*C.T)<m)||(this.cur.cor?this.cur.cor.some(o=>o.on&&Math.abs(x-(o.c+.5)*C.T)<m&&Math.abs(y-(o.r+.5)*C.T)<m):false)}")
rep("const R=({rek:C.R,gna:C.G,vdl:C.V})[m.k]||C.E,z=(m.sz||1)", "const R=MON(m.k),z=(m.sz||1)")
rep("({rek:18,gna:6,vdl:4}[m.k]||12)", "({rek:18,gna:6,vdl:4,spn:10,lsp:6,qn:70,wd:70}[m.k]||12)")
rep("this.gainXp(xp);\n  const vd=m.k=='vdl';if(vd){this.en=Math.min(this.emax,this.en+e);this.org+=o;this.mn+=mi;this.ve++;if(this.lin.v>=1)this.en=Math.min(this.emax,this.en+8);if(this.lin.v>=3&&this.fam.length<2)this.famAdd(x,y)}",
    "this.gainXp(xp);if(m.k=='qn'||m.k=='wd'){this.ess(2);this.en=Math.min(this.emax,this.en+20);this.dtx(x,y-40,'정예 처치! 정수 +2 · 에너지 +20','#ffe066');if(m.k=='qn')for(const c of this.cur.cor||[])if(c.on&&c.tmp)c.tmp=1}\n  const vd=m.k=='vdl'||m.k=='lsp',vv=m.k=='vdl';if(vd){this.en=Math.min(this.emax,this.en+e);this.org+=o;this.mn+=mi;if(vv){this.ve++;if(this.lin.v>=1)this.en=Math.min(this.emax,this.en+8);if(this.lin.v>=3&&this.fam.length<2)this.famAdd(x,y)}}")
rep("tex:k=='gna'?'gnac':k=='rek'?'rek':'kha'", "tex:({gna:'gnac',rek:'rek',spn:'spn',qn:'qn',wd:'wd'})[k]||'kha'")
rep("o&&'유기 +'+o,'정수 +1']", "o&&'유기 +'+o,vv&&'정수 +1']")
rep("const fast=k=='vdl';", "const fast=k=='vdl'||k=='lsp';")
rep("mh=m.mh||((({rek:C.R,gna:C.G,vdl:C.V})[m.k]||C.E).hp);if(L.p>=3&&m.hp<=mh*.25){this.gulp(m);continue}",
    "mh=m.mh||MON(m.k).hp;if(L.p>=3&&m.hp<=mh*(m.k=='qn'||m.k=='wd'?.12:.25)){this.gulp(m);continue}")
rep("m.hp-=dg;if(this.lin.p>=2)this.en=", "dg*=this.dmul(m,1);m.hp-=dg;if(this.lin.p>=2)this.en=")
rep("    if(d>0)this.mv(m,dx/d*18,dy/d*18,30);", "    if(d>0&&!({spn:1,qn:1,wd:1})[m.k])this.mv(m,dx/d*18,dy/d*18,30);")
rep("if(m.hp<=0){this.kill(m);if(this.lin.p>=2)this.feed()}}}if(!hit&&this.lin.v>=2)this.spit()}",
    "if(m.hp<=0){this.kill(m);if(this.lin.p>=2)this.feed()}}}{let bo=null,bq=C.BITE.range;for(const o of this.cur.cor||[])if(o.on){const dx=(o.c+.5)*C.T-p.x,dy=(o.r+.5)*C.T-p.y,d=Math.hypot(dx,dy);if(d<bq&&(dx*fx+dy*fy)/(d||1)>.3){bq=d;bo=o}}if(bo){this.corHit(bo,1);hit=1}}if(!hit&&this.lin.v>=2)this.spit()}")
rep("dmgM(m,d,q){if(!m.on)return 0;m.hp-=d;", "dmgM(m,d,q){if(!m.on)return 0;if(!q)d*=this.dmul(m);m.hp-=d;")
rep("if(m.k){m.k=='rek'?this.rekAI(m,dt,p):m.k=='gna'?this.gnaAI(m,dt,p):this.vdlAI(m,dt,p);continue}", "if(m.k){this[m.k+'AI'](m,dt,p);continue}")
rep("   if(this.blk(q.x,q.y,18)||q.x<40||q.x>760||q.y<40||q.y>320)q.t=0;",
    "   {const co=(this.cur.cor||[]).find(o=>o.on&&Math.abs(q.x-(o.c+.5)*C.T)<18&&Math.abs(q.y-(o.r+.5)*C.T)<18);if(co&&q.t>0){this.corHit(co,3);q.t=0}}\n   if(q.t<=0||this.blk(q.x,q.y,18)||q.x<40||q.x>760||q.y<40||q.y>320)q.t=0;")
rep("lvl(e){if(e.lv!=null)return;const dd=this.cur.dd||0,off=dd<=1?rnd(4)-3:dd<=3?rnd(5)-2:rnd(4);e.lv=Math.max(1,Math.min(18,this.plv+off));const b=(({rek:C.R,gna:C.G,vdl:C.V})[e.k]||C.E).hp;",
    "lvl(e){if(e.mh!=null)return;if(e.lv==null){const dd=this.cur.dd||0,off=(dd<=1?rnd(4)-3:dd<=3?rnd(5)-2:rnd(4))+(this.zi>1?1:0);e.lv=Math.max(1,Math.min(18,this.plv+off));if(e.k=='qn'||e.k=='wd')e.lv=Math.min(18,Math.max(e.lv,this.plv+2))}const b=MON(e.k).hp;")

# ---------- update ----------
rep("this.req=0;this.linPre();this.foe(dt,p);this.linPost(dt);this.prjU(dt,p);",
    "this.req=0;this.linPre();if(this.bmD)this.beamU(dt);else this.lit=0;this.foe(dt,p);this.linPost(dt);this.prjU(dt,p);this.eprjU(dt,p);if(this.cur.cor)this.corU();")
rep("'굶주림으로 쓰러졌다','생존 '", "'굶주림으로 쓰러졌다',(this.zi>1?this.zi+'구역  ·  ':'')+'생존 '")
rep("'보이드링 무리':'소용돌이의 보이드링은 수가 정해져 있다 — 방 가장자리에서 하나씩 상대할 것'})[lh.src]",
    "'보이드링 무리':'소용돌이의 보이드링은 수가 정해져 있다 — 방 가장자리에서 하나씩 상대할 것','가시 산호충의 가시':'노란 조준선이 보이면 옆으로 비킬 것 · 산호를 물어 부수면 산호충이 끌려 나온다','빛 포자의 빛 화살':'빛 포자는 빛줄기에 닿아 있을 때만 쏜다 — 기둥 그림자나 덤불로 숨을 것','산호 여왕의 물기':'붉은 부채꼴이 보이면 옆으로 비킬 것 · 분홍 원이 보이면 원 밖으로 빠질 것','감시자의 광선':'빛이 붉게 좁아지면 빛줄기 밖으로 · 뒤로 돌아가 등의 발광 기관을 물 것','감시자의 꼬리':'감시자 등 뒤에 오래 머물면 꼬리치기가 온다 — 붉은 부채꼴이 보이면 물러날 것'})[lh.src]")
rep("if(this.exT>=1){const tm=Math.round((this.time.now-this.t0)/1000);return this.end('1구역 돌파',",
    "if(this.exT>=1){if(this.zi<2)return this.nextZone();const tm=Math.round((this.time.now-this.t0)/1000);return this.end('2구역 돌파',")
rep("'새 구역','프로토타입은 여기까지 — 2구역은 다음 단계에서 열린다')",
    "'처음부터','프로토타입은 여기까지 — 3구역과 최종 보스는 다음 단계에서 열린다')")
rep("if(!this.exR&&this.time.now-this.t0>300000)", "if(!this.exR&&this.time.now-this.zt0>(this.zi>1?240000:300000))")

rep("  this.bt=(this.bt||0)-dt;", "  if(this.zi>1){this.mt=(this.mt||0)-dt;if(this.mt<=0){this.mt=.28;const x=40+Math.random()*720,y=70+Math.random()*260,b=this.add.circle(x,y,.8+Math.random()*1.2,Math.random()<.5?0x7a8aff:0xc080ff,.55).setDepth(13);this.tweens.add({targets:b,y:y-26-Math.random()*30,x:x+(Math.random()-.5)*20,alpha:0,duration:2600,onComplete:()=>b.destroy()})}}\n  this.bt=(this.bt||0)-dt;")
rep("if(d>=36&&d<bd&&this.los(p.x,p.y,m.x,m.y))","if(d>=36&&d<bd&&(m.k=='spn'&&m.st=='hide'?this.spnLos(m,p,1):this.los(p.x,p.y,m.x,m.y)))")
# ---------- hud / pz ----------
rep("'구역 1 / 3\\n유기 '", "'구역 '+this.zi+' / 3\\n유기 '")
rep("const mh=m.mh||(({rek:C.R,gna:C.G,vdl:C.V})[m.k]||C.E).hp,r=Math.max(0,Math.min(1,m.hp/mh)),w=m.k=='rek'?34:m.k=='gna'?22:m.k=='vdl'?16:28,yy=m.spr.y-(m.k=='rek'?30:m.k=='gna'?18*(m.sz||1):m.k=='vdl'?16:22);",
    "const mh=m.mh||MON(m.k).hp,r=Math.max(0,Math.min(1,m.hp/mh)),w=({rek:34,gna:22,vdl:16,spn:22,lsp:14,qn:46,wd:52})[m.k]||28,yy=m.spr.y-(m.k=='gna'?18*(m.sz||1):({rek:30,vdl:16,spn:20,lsp:16,qn:38,wd:34})[m.k]||22);")
rep("if(m.lvT&&m.k!='vdl')", "if(m.lvT&&m.k!='vdl'&&m.k!='lsp')")
rep("g.fillStyle(m.k=='gna'?0x7cc4ff:m.k=='rek'?0xc070ff:m.k=='vdl'?0xffe066:0xff4a6a)",
    "g.fillStyle(({gna:0x7cc4ff,rek:0xc070ff,vdl:0xffe066,spn:0xd070ff,lsp:0xffe066,qn:0xff6ab0,wd:0xff9a4a})[m.k]||0xff4a6a)")
rep("vdl:['보이드링','소용돌이에서 떼로 나온다 · 나오는 수가 정해져 있다']};",
    "vdl:['보이드링','소용돌이에서 떼로 나온다 · 나오는 수가 정해져 있다'],spn:['가시 산호충','산호 속에 숨어 가시 3발을 쏜다 · 노란 조준선 = 발사 예고 · 산호를 물어 부수면 끌려 나온다'],lsp:['빛 포자','빛줄기에 닿아 있을 때만 빛 화살을 쏜다 · 그림자·기둥 뒤에서는 안전'],qn:['산호 여왕 (정예)','주변에 산호 감옥을 키우고 가시 산호충을 부른다 · 분홍 원 = 감옥 예고'],wd:['감시자 (정예)','빛줄기로 쫓다가 오래 비추면 광선 · 앞껍질은 물기를 막는다 — 뒤로 돌아가 등(약점)을 노릴 것']};")
rep("else if(!m.k&&(m.st=='idle'||m.st=='hunt'||m.st=='eat')){g.lineStyle(1.5,0xc070ff,pu*.8).strokeCircle(m.x,m.y,18)}",
    "else if(!m.k&&(m.st=='idle'||m.st=='hunt'||m.st=='eat')){g.lineStyle(1.5,0xc070ff,pu*.8).strokeCircle(m.x,m.y,18)}else if(m.k=='spn'&&m.st=='hide'){g.lineStyle(1.5,0xc070ff,pu*.8).strokeCircle(m.x,m.y,15)}")
rep("[TR.lair[1],'포식자 둥지',90,7],", "...(this.zi>1?[[TR.coral[1],'산호 숲',70,7],[TR.watch[1],'감시탑',62,7]]:[[TR.lair[1],'포식자 둥지',90,7]]),")
rep("this.add.text(400,94,'생존 '", "this.add.text(400,94,this.zi+'구역  ·  생존 '")

# ---------- 새 메서드 ----------
M = open('/home/claude/play/z2/z2methods.js', encoding='utf-8').read().rstrip() + "\n"
rep(" end(a,b,c,tip){\n", M + " end(a,b,c,tip){\n")

open(F, 'w', encoding='utf-8').write(s)
json.dump(P, open('/home/claude/play/z2/zone2_patch.json', 'w', encoding='utf-8'), ensure_ascii=False)
print('ok', len(P))
