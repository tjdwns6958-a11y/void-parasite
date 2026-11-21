#!/usr/bin/env python3
"""v60 -> v61: 공격/섭취 버튼 분리(공격이 위) · 갑각 차지 박치기(느리지만 강함) · 공명 갑각 단단한 모습 · 공허 2단계+ 머리 앞 선(턱처럼 보임) → 공허 구슬 · 그림에서 3단계 조건용 다른 계통 빼기
본체: dev/v61/v61_methods.js · 사용: python3 dev/v61/v61_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v61_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v60</title>', '<title>공허 기생충 v61</title>')
rep("window.VP_VER='v60';", "window.VP_VER='v61';")
# --- 입력 ---
rep("addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE,E,", "addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE,F,E,")
rep("if(Phaser.Math.Distance.Between(p.x,p.y,750,308)<50){this.eat=P;this.req=1}else if(",
    "if(Phaser.Math.Distance.Between(p.x,p.y,752,226)<42){this.atk=P;this.req=1}else if(Phaser.Math.Distance.Between(p.x,p.y,752,310)<36){this.eat=P}else if(")
rep("this.input.on('pointerup',p=>{if(this.bsO)this.bsUp(p);if(this.joy===p)this.joy=null;if(this.eat===p)this.eat=null",
    "this.input.on('pointerup',p=>{if(this.bsO)this.bsUp(p);if(this.joy===p)this.joy=null;if(this.eat===p)this.eat=null;if(this.atk===p)this.atk=null")
rep("const hold=(this.eat&&this.eat.isDown)||k.SPACE.isDown;", "const hold=(this.eat&&this.eat.isDown)||k.F.isDown;")
rep("if((this.req||Phaser.Input.Keyboard.JustDown(k.SPACE))&&!tg&&this.bcd<=0)this.bite();", "this.atkU(dt,k);")
# 차지 중엔 느려짐
rep("const sp=this.spd*C.T*(this.slow>0?.6:1)*(this.hasteT>0?1.3:1);", "const sp=this.spd*C.T*(this.slow>0?.6:1)*(this.hasteT>0?1.3:1)*(this.chg?1-.55*this.chg.t/1.2:1);")
# --- 버튼 그림: 공격(위) · 섭취(아래) ---
rep("this.etx=this.add.text(750,308,'섭취',", "this.atx=this.add.text(752,226,'공격',ST({fontSize:'13px',color:'#ffffff',fontStyle:'bold'})).setOrigin(.5).setDepth(61);this.etx=this.add.text(752,310,'섭취',")
rep("[this.gfx,this.gL,this.gR,this.pnL,this.pnR,this.t1,this.t2,this.etx,", "[this.gfx,this.gL,this.gR,this.pnL,this.pnR,this.t1,this.t2,this.etx,this.atx,")
rep("this.bA=this.bA||{J:1,E:1,M:1};const kb=.2;this.bA.J+=((J?1:0)-this.bA.J)*.35;this.bA.E+=((und(750,308,32)&&!(this.eat&&this.eat.isDown)?.3:1)-this.bA.E)*kb;",
    "this.bA=this.bA||{J:1,E:1,M:1,A:1};const kb=.2;this.bA.J+=((J?1:0)-this.bA.J)*.35;this.bA.E+=((und(752,310,26)&&!(this.eat&&this.eat.isDown)?.3:1)-this.bA.E)*kb;this.bA.A=(this.bA.A??1)+((und(752,226,34)&&!(this.atk&&this.atk.isDown)?.3:1)-(this.bA.A??1))*kb;")
rep("{const ed=this.eat&&this.eat.isDown;g.fillStyle(ed?0xc98bff:0xa65cff,(ed?.85:.42)*this.bA.E).fillCircle(750,308,32);g.lineStyle(1.5,0xd8b8ff,.6*this.bA.E).strokeCircle(750,308,32);if(this.etx)this.etx.setAlpha((ed?1:.75)*this.bA.E)}",
    "{const ed=this.eat&&this.eat.isDown;g.fillStyle(ed?0x7be0a8:0x3f8a66,(ed?.85:.42)*this.bA.E).fillCircle(752,310,26);g.lineStyle(1.5,0xb8f0d0,.6*this.bA.E).strokeCircle(752,310,26);if(this.etx)this.etx.setAlpha((ed?1:.75)*this.bA.E)}"
    "{const ad=(this.atk&&this.atk.isDown)||this.chg,cf=this.chg?this.chg.t/1.2:0,ac=this.domK()=='c'?0x6f8fd8:0xd94f8c;g.fillStyle(ad?0xffffff:ac,(ad?.35+.3*cf:.45)*this.bA.A).fillCircle(752,226,34);g.lineStyle(2,ac,.8*this.bA.A).strokeCircle(752,226,34);if(cf>0)g.lineStyle(4,0xbfeaff,.95).beginPath().arc(752,226,38,-Math.PI/2,-Math.PI/2+cf*6.283,false).strokePath();"
    "if(this.atx)this.atx.setText(this.domK()=='c'?'박치기':this.domK()=='v'?'구체':'공격').setAlpha((ad?1:.8)*this.bA.A)}")
# --- 안내 글 ---
rep("Space: 물기 (먹이 곁에서 누르고 있으면 섭취)  ·  E: 둥지에서 탈피'", "Space: 공격 (갑각은 누르고 있으면 차지)  ·  F: 섭취 (먹이 곁에서 누르고 있기)  ·  E: 둥지에서 탈피'")
rep("오른쪽 버튼: 탭하면 물기 · 먹이 곁에서 누르고 있으면 섭취'", "오른쪽 위 버튼: 공격 · 아래 버튼: 먹이 곁에서 누르고 있으면 섭취'")
rep("섭취 버튼: 탭 = 물기, 누르고 있기 = 섭취'", "위 버튼 = 공격, 아래 버튼 누르고 있기 = 섭취'")
rep("Space: 물기/섭취", "Space: 공격  ·  F: 섭취")
# --- 갑각 차지 그림 · 강한 박치기 ---
rep("const E=this.brFx;if(!E)return;E.t+=dt;const q=E.t/.24;if(q>=1){this.brFx=null;return}\n  const hd=this.hd;", "this.chgDraw(g);const E=this.brFx;if(!E)return;E.t+=dt;const q=E.t/.24;if(q>=1){this.brFx=null;return}\n  const hd=this.hd;")
rep("L.push({m,an,t:0,kd:this.domK(),", "L.push({m,an,t:0,sf:this.slamS||0,kd:this.domK(),")
rep("if(T<.16){g.lineStyle(2.2,0xdff4ff,(1-T/.16)*.9).strokeCircle(bx,by,3+T*55)}", "const sf=k.sf||0,n=6+Math.round(6*sf);if(T<.16){g.lineStyle(2.2+2*sf,0xdff4ff,(1-T/.16)*.9).strokeCircle(bx,by,3+T*55*(1+sf))}")
rep("for(let i=0;i<6;i++){const an=k.an+Math.PI+(i-2.5)*.6+Math.sin(k.sd+i*2)*.25,d=4+(26+8*Math.sin(k.sd*3+i))*e,", "for(let i=0;i<n;i++){const an=k.an+Math.PI+(i-(n-1)/2)*(3.6/n)*(1+.4*sf)+Math.sin(k.sd+i*2)*.25,d=4+(26+8*Math.sin(k.sd*3+i))*e*(1+.7*sf),")
rep("L=mo.bk=='c'?(q<.3?-2*q/.3:q<.5?-2+9*(q-.3)/.2:7*(1-(q-.5)/.5))", "L=mo.bk=='c'?(q<.3?-2*q/.3:q<.5?-2+9*(q-.3)/.2:7*(1-(q-.5)/.5))*(1+(mo.sf||0))")
rep("this.mv(m,dx/d*18,dy/d*18,30)", "this.mv(m,dx/d*18*(1+(this.slamS||0)),dy/d*18*(1+(this.slamS||0)),30)")
# --- 머리·마디 그림 ---
rep("  if(L.c>=3){for(let a=-r;a<=r;a++)px(x,c-1,c+a*.9,'#5a6494');ln(x,c+r-2,c-r+1,c+r+3,c-r-3,'#bfeaff');px(x,c+r+3,c-r-4,'#fff');ln(x,c+r-2,c+r-1,c+r+3,c+r+3,'#bfeaff');px(x,c+r+3,c+r+4,'#fff')}",
    "  if(L.c>=3){const R=Math.ceil(r)+2;for(let i=-R;i<=R;i++)for(let j=-R;j<=R;j++){const d=Math.hypot(i,j);if(d>r&&d<=r+1.5)px(x,c+i,c+j,'#1e2442');else if(d<=r&&i>=-r*.25)px(x,c+i,c+j,d>r-1.2?'#cfdaff':Math.abs(j)<.6?'#4a5488':'#8d98cc')}"
    "for(let j=-Math.floor(r*.8);j<=Math.floor(r*.8);j++)px(x,c-Math.round(r*.25)-1,c+j,'#3a4270');for(let j=-3;j<=3;j++){px(x,c+Math.ceil(r)+1,c+j,'#9fd8ff');px(x,c+Math.ceil(r)+2,c+j,Math.abs(j)<3?'#ffffff':'#9fd8ff')}}")
rep("if(L.c>=1)for(let a=Math.PI*1.1;a<Math.PI*1.9;a+=.15)px(x,c+Math.cos(a)*(r-.4),c+Math.sin(a)*(r-.4),'#c8d0ec');",
    "if(L.c>=1)for(let a=Math.PI*1.1;a<Math.PI*1.9;a+=.15)px(x,c+Math.cos(a)*(r-.4),c+Math.sin(a)*(r-.4),'#c8d0ec');"
    "if(L.c>=3){const R=Math.ceil(r)+2;for(let i=-R;i<=R;i++)for(let j=-R;j<=R;j++){const d=Math.hypot(i,j);if(d>r&&d<=r+1.4)px(x,c+i,c+j,'#1e2442');else if(d<=r&&j<0)px(x,c+i,c+j,d>r-1.1?'#cfdaff':'#8d98cc')}for(let i=-Math.floor(r);i<=Math.floor(r);i++)px(x,c+i,c,'#4a5488')}")
rep("ln(x,c+r,c-2,c+r+4,c-6,'#c070ff');px(x,c+r+5,c-7,'#f0c8ff');ln(x,c+r,c+2,c+r+4,c+6,'#c070ff');px(x,c+r+5,c+7,'#f0c8ff')",
    "disc(x,c-1,c-r-2.2,1.3,'#c070ff');px(x,c-1,c-r-2,'#f0c8ff');disc(x,c-1,c+r+2.2,1.3,'#c070ff');px(x,c-1,c+r+2,'#f0c8ff')")
# 그림(진화 나무·슬라이드)에서는 그 계통만 (3단계 조건용 다른 계통의 갈고리 턱 등이 섞이지 않게)
rep("artLv(k,j){const L={p:0,c:0,v:0};L[k]=j+1;if(j==2)L[k=='p'?'c':'p']=1;return L}", "artLv(k,j){const L={p:0,c:0,v:0};L[k]=j+1;return L}")
# 설명 문구
rep("갑각이 가장 높으면 공격이 몸통 박치기']", "갑각이 가장 높으면 공격이 몸통 박치기 — 느리지만 강하고, 누르고 있으면 차지']")
rep("AT={p:'턱으로 물기',c:'몸통 박치기',v:'검은 구체 (원거리)'}", "AT={p:'턱으로 물기',c:'몸통 박치기 · 꾹 눌러 차지',v:'검은 구체 (원거리)'}")
a = " // ===== v60: 계통 기초 슬라이드"
if s.count(a) != 1: raise SystemExit('anchor v60')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
