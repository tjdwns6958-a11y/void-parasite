# v27 패치: 산호 여왕 끼임 수정 · 진화 나무(설명서·퀘스트) · 보스전 '공허를 걷는 자' + 엔딩
# 사용: python3 v27_patch.py <index.html>
import sys,re
F=sys.argv[1]
s=open(F,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    n=s.count(old)
    assert n==cnt,(n,old[:90])
    s=s.replace(old,new)

# ---------- 1. 산호 여왕 끼임 ----------
rep(" blk(x,y,m){return this.cur.obs.some(([c,r])=>Math.abs(x-(c+.5)*C.T)<m&&Math.abs(y-(r+.5)*C.T)<m)||(this.cur.cor?",
    " blk(x,y,m,nc){return this.cur.obs.some(([c,r])=>Math.abs(x-(c+.5)*C.T)<m&&Math.abs(y-(r+.5)*C.T)<m)||(!nc&&this.cur.cor?")
rep(" mv(o,mx,my,m){const x=Phaser.Math.Clamp(o.x+mx,60,740),y=Phaser.Math.Clamp(o.y+my,60,300);\n  if(!this.blk(x,y,m)){o.x=x;o.y=y}else if(!this.blk(x,o.y,m))o.x=x;else if(!this.blk(o.x,y,m))o.y=y}",
    " mv(o,mx,my,m,nc){const x=Phaser.Math.Clamp(o.x+mx,60,740),y=Phaser.Math.Clamp(o.y+my,60,300);\n  // 이미 장애물과 겹쳐 있으면(산호가 다시 자란 경우 등) 빠져나올 수 있게 그대로 움직인다\n  if(this.blk(o.x,o.y,m,nc)){o.x=x;o.y=y;return}\n  if(!this.blk(x,y,m,nc)){o.x=x;o.y=y}else if(!this.blk(x,o.y,m,nc))o.x=x;else if(!this.blk(o.x,y,m,nc))o.y=y}")
# 여왕은 산호 사이를 지나다닌다(산호 숲의 주인) + 바위에 막히면 도는 방향을 바꾼다
rep("if(w)this.mv(m,Math.cos(an)*w*44*dt,Math.sin(an)*w*44*dt,26);",
    "if(w){const ox=m.x,oy=m.y;this.mv(m,Math.cos(an)*w*44*dt,Math.sin(an)*w*44*dt,26,1);if(Math.hypot(m.x-ox,m.y-oy)<44*dt*.3){m.stk=(m.stk||0)+dt;if(m.stk>.6){m.side=-(m.side||1);m.stk=0}}else m.stk=0}")

# ---------- 2. 상태 초기화 · 입력 ----------
rep("this.input.keyboard.off('keydown-P');",
    "this.treeO=null;this.rgT=null;this.rgL=null;this.rwNm=null;this.sil=0;this.boss=false;this.rwo=[];this.input.keyboard.off('keydown-T');this.input.keyboard.on('keydown-T',()=>{if(this.treeO)this.treeClose();else this.treeOpen()});this.input.keyboard.off('keydown-ENTER');this.input.keyboard.on('keydown-ENTER',()=>{if(this.treeO)this.treeClose()});this.input.keyboard.off('keydown-P');")
rep("  this.time.delayedCall(8000,()=>this.hint&&this.hint.destroy());",
    "  this.time.delayedCall(8000,()=>this.hint&&this.hint.destroy());\n  if(!window.__vpNoTree)this.time.delayedCall(30,()=>this.treeOpen(1));")
rep("this.input.on('pointerdown',p=>{if(this.over)return;if(this.paused)return;",
    "this.input.on('pointerdown',p=>{if(this.over)return;if(this.treeO){this.treeTap(p.x,p.y);return}if(this.paused)return;if(!this.molt&&p.x>662&&p.x<788&&p.y>132&&p.y<168){this.treeOpen();return}")
rep(" pz(){if(this.over||this.molt||this.tr)return;"," pz(){if(this.over||this.molt||this.tr||this.treeO)return;")

# ---------- 3. HUD: 진화 고리 3개 + 침묵 표시 ----------
rep("   this.t2.setText('구역 '+this.zi+' / 3\\n유기 '",
    "   {if(!this.rgT)this.rgT=LK.map((k,i)=>this.add.text(684+i*40,150,LN[k][0],ST({fontSize:'11px',fontStyle:'bold',color:LCS[k]})).setOrigin(.5).setDepth(61));\n    const ua=und(724,150,44)?.55:1;LK.forEach((k,i)=>{const x=684+i*40,y=150,t=this.lin[k],lk=this.nodeLock(k),ok=lk==='',r=t>=3?1:Math.max(0,Math.min(1,this.lavail(k)/this.lcost(k)));\n     g.fillStyle(0x0d0818,.75*ua).fillCircle(x,y,15);g.lineStyle(3,0x3a2f57,ua).strokeCircle(x,y,12);if(r>0)g.lineStyle(3,LCN[k],ua*(ok&&t<3?.7+.3*Math.sin(this.time.now/150):1)).beginPath().arc(x,y,12,-Math.PI/2,-Math.PI/2+Math.PI*2*r,false).strokePath();\n     for(let j=0;j<3;j++)g.fillStyle(j<t?LCN[k]:0x3a2f57,ua).fillCircle(x-6+j*6,y+19,2);this.rgT[i].setAlpha(ua)});\n    if(!this.rgL)this.rgL=this.add.text(724,180,this.sys.game.device.input.touch?'눌러서 진화 나무':'T: 진화 나무',ST({fontSize:'9px',color:'#a99fc2'})).setOrigin(.5).setDepth(61);this.rgL.setVisible(this.time.now-this.t0<25000).setAlpha(ua)}\n    if(this.sil>0){g.lineStyle(2,0xb0a0d0,.5+.4*Math.sin(this.time.now/90)).strokeCircle(this.pl.x,this.pl.y,22)}\n   this.t2.setText('구역 '+this.zi+' / 3\\n유기 '")

# ---------- 4. 보스: 출구 · 상수 · 공통 연결 ----------
s,n=re.subn(r"if\(this\.zi<2\)return this\.nextZone\(\);const tm=.*?다음 단계에서 열린다'\)","if(this.zi<2)return this.nextZone();return this.bossStart()",s,count=1,flags=re.S)
assert n==1
rep("  if(!this.exR&&this.time.now-this.zt0>","  if(!this.boss&&!this.exR&&this.time.now-this.zt0>")
rep("lair:['포식자 둥지 (보물 + 카직스)',0xff7a6a]};","lair:['포식자 둥지 (보물 + 카직스)',0xff7a6a],void:['공허의 가장자리 — 바깥으로 이어지는 틈',0x8a78c8]};")
rep("  else if(e.k=='wd'){e.st=e.st=='idle'?'idle':'track';",
    "  else if(e.k=='rw'){e.spr=this.add.image(e.x,e.y,'rw').setDepth(9).setAlpha(0).setScale(1.2);e.lvT.setVisible(false)}\n  else if(e.k=='wd'){e.st=e.st=='idle'?'idle':'track';")
rep("for(const m of this.cur.en)if(m.on&&m.spr&&!(m.k=='rek'&&m.st!='up'&&m.st!='dig')){",
    "for(const m of this.cur.en)if(m.on&&m.spr&&!(m.k=='rek'&&m.st!='up'&&m.st!='dig')){if(m.k=='rw'){this.rwBar(g,m);continue}")
rep("wd:['감시자 (정예)',","rw:['공허를 걷는 자','틈을 밟고 나타난다 · 4번 걷고 나면 지친다 — 그때 물 것 · 곁에서 물거나 침을 쏠수록 메아리(점 5개)가 차오른다'],wd:['감시자 (정예)',")
rep("'감시자의 꼬리':","'공허를 걷는 자의 칼날':'바닥에 틈과 붉은 원이 열리면 그 자리를 벗어날 것 — 잠시 뒤 그곳에 나타나 벤다','어긋난 몸 사이의 선':'몸이 둘로 갈라지면 한가운데 초록 원(틈)으로 갈 것 — 가운데만 선이 끊겨 있다','메아리':'보스 곁에서 물거나 침을 쏠수록 메아리가 찬다(점 5개) — 다 차면 멀리 떨어질 것','떨어진 칼날':'붉은 점선을 따라 칼날이 날아갔다 돌아온다 — 점선 밖으로 비킬 것','무의 구체':'검은 구체는 몸에 닿으면 침묵, 물면 삼킨다 — 마주 보고 물 것','감시자의 꼬리':")
# 물기: 침묵 · 무의 구체 삼키기 · 보스 판정
rep(" bite(){const p=this.pl,an=this.ang,fx=Math.cos(an),fy=Math.sin(an);this.bcd=C.BITE.cd;let hit=0;",
    " bite(){const p=this.pl,an=this.ang,fx=Math.cos(an),fy=Math.sin(an);this.bcd=C.BITE.cd;let hit=0;if(this.sil>0){this.bcd=.3;this.dtx(p.x,p.y-24,'침묵 — 물 수 없다','#b0a0d0');return}this.rwNoise();\n  for(const q of this.rwo||[])if(q.on){const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);if(d<C.BITE.range&&(dx*fx+dy*fy)/(d||1)>.2){q.on=0;q.o.destroy();this.en=Math.min(this.emax,this.en+6);this.dtx(q.x,q.y-14,'무(無)를 삼켰다 · 에너지 +6','#c8b8ff');hit=1}}")
rep("if(d<C.BITE.range&&(dx*fx+dy*fy)/(d||1)>.3&&!(m.k=='rek'&&(m.st=='under'||m.st=='warn'))){",
    "if(d<C.BITE.range+(m.k=='rw'?40:0)&&(dx*fx+dy*fy)/(d||1)>.3&&!m.gone&&!(m.k=='rek'&&(m.st=='under'||m.st=='warn'))){")
rep("if(L.p>=3&&m.hp<=mh*(m.k=='qn'||m.k=='wd'?.12:.25))","if(L.p>=3&&m.hp<=mh*(m.k=='qn'||m.k=='wd'?.12:m.k=='rw'?.06:.25))")
rep("if(d>0&&!({spn:1,qn:1,wd:1})[m.k])","if(d>0&&!({spn:1,qn:1,wd:1,rw:1})[m.k])")
rep(" spit(){if(this.spitCd>0)return;const p=this.pl;let b=null,bd=200;for(const m of this.cur.en)if(m.on&&m.spr&&m.spr.visible!==false&&",
    " spit(){if(this.spitCd>0||this.sil>0)return;this.rwNoise();const p=this.pl;let b=null,bd=200;for(const m of this.cur.en)if(m.on&&m.spr&&m.spr.visible!==false&&!m.gone&&")
rep(" dmul(m,bt){if(m.k=='spn'&&m.st=='hide')return .5;"," dmul(m,bt){if(m.k=='rw'){if(m.gone)return 0;return m.st=='tired'?1.6:1}if(m.k=='spn'&&m.st=='hide')return .5;")
rep("if(hold&&f===tg&&!(f.ready>t))f.p+=dt/C.F[f.t].t;","if(hold&&f===tg&&!(f.ready>t)&&!(this.sil>0))f.p+=dt/C.F[f.t].t;")
rep("this.bcd-=dt;this.inv-=dt;","this.bcd-=dt;this.inv-=dt;this.sil=Math.max(0,(this.sil||0)-dt);")
rep(" kill(m){m.on=0;"," kill(m){if(m.k=='rw')return this.rwDie(m);m.on=0;")

# ---------- 5. 새 메서드 ----------
NEW=open(__file__.replace('v27_patch.py','v27_methods.js'),encoding='utf-8').read()
rep(" end(a,b,c,tip){",NEW+" end(a,b,c,tip){")
s=s.replace('<title>공허 기생충 프로토타입 (1~4단계)</title>','<title>공허 기생충 v27</title>')
open(F,'w',encoding='utf-8').write(s)
print('patched',len(s))
