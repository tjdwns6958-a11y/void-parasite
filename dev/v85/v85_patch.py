#!/usr/bin/env python3
"""v84 -> v85: 기본 대시 — 처음부터 쓸 수 있는 회피 (꿈틀 대시 + 완벽 회피)
C 키 / 터치 '대시' 버튼 · 앞으로 78px(0.16초) · 0.3초 무적(공격 1회 피함) · 재사용 2.5초
완벽 회피: 대시 시작 0.2초 안에 공격이 닿으면 '완벽 회피!' — 0.25초 느려짐 + 재사용 절반 즉시 회복
본체: dev/v85/v85_methods.js · 사용: python3 dev/v85/v85_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v85_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v84</title>', '<title>공허 기생충 v85</title>')
rep("window.VP_VER='v84';", "window.VP_VER='v85';")
# 입력
rep("this.k=this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE,F,E,ONE,TWO,THREE,FOUR,ENTER,ESC,SHIFT,Q');", "this.k=this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE,F,E,ONE,TWO,THREE,FOUR,ENTER,ESC,SHIFT,Q,C');")
rep("   if(Phaser.Math.Distance.Between(p.x,p.y,752,226)<42){this.atk=P;this.req=1}", "   if(Phaser.Math.Distance.Between(p.x,p.y,690,318)<25){this.dshReq=1;return}\n   if(Phaser.Math.Distance.Between(p.x,p.y,752,226)<42){this.atk=P;this.req=1}")
rep("atkU(dt,k){const dn=", "atkU(dt,k){this.dshU(dt,k);const dn=")
# 이동: 대시 중에는 정해진 방향으로 빠르게, 끝나면 보통 속도로 이어감
rep("  if(this.lgT>0){this.lgT-=dt;this.lgX=Math.cos(this.lgA)*110;",
    "  if(this.dshT>0){this.dshT-=dt;const c=Math.cos(this.dshA),sn=Math.sin(this.dshA),v=this.dshT>0?490:sp;p.setVelocity(c*v,sn*v);this.lgX=this.lgY=0;if(this.dshT<=0){this.vx=c*sp;this.vy=sn*sp}}\n  else if(this.lgT>0){this.lgT-=dt;this.lgX=Math.cos(this.lgA)*110;")
# 완벽 회피 느려짐
rep("  const dt=Math.min(ms/1000,.05),p=this.pl,", "  if(this.slowMo>0)this.slowMo-=ms/1000;const dt=Math.min(ms/1000,.05)*(this.slowMo>0?.35:1),p=this.pl,")
# 피격: 대시 무적
rep("hurt(d,src,m){if(this.wallT>0){", "hurt(d,src,m){if(this.dshI>0){this.dshDodge(src);return}if(this.wallT>0){")
# 무적을 우회하던 곳들
rep("   if(inr){const n=D(18);this.en-=", "   if(inr&&!(this.dshI>0)){const n=D(18);this.en-=")
rep("gdkKb(vx,vy,t){this.gkb={vx,vy,t}}", "gdkKb(vx,vy,t){if(this.dshI>0)return;this.gkb={vx,vy,t}}")
rep("m.root=1;m.rx=p.x;m.ry=p.y;this.dtx(p.x,p.y-24,'붙잡혔다!','#c8a8ff')", "if(!(this.dshI>0)){m.root=1;m.rx=p.x;m.ry=p.y;this.dtx(p.x,p.y-24,'붙잡혔다!','#c8a8ff')}")
rep("m.hp=Math.min(m.mh,m.hp+m.mh*.08);this.dtx(m.x,m.y-56,'흡수 — 왕관의 체력 +8%','#7be0a8')", "if(!(this.dshI>0)){m.hp=Math.min(m.mh,m.hp+m.mh*.08);this.dtx(m.x,m.y-56,'흡수 — 왕관의 체력 +8%','#7be0a8')}")
# 안내 글
rep("오른쪽 위 버튼: 공격 · 아래 버튼: 먹이 곁에서 누르고 있으면 섭취':'WASD·방향키: 이동  ·  Shift: 살금살금\\nSpace: 공격  ·  F: 섭취 (먹이 곁에서 누르고 있기)  ·  E: 둥지에서 탈피'",
    "오른쪽 위 버튼: 공격 · 아래 버튼: 먹이 곁에서 누르고 있으면 섭취 · 작은 버튼: 대시(회피)':'WASD·방향키: 이동  ·  Shift: 살금살금  ·  C: 대시(회피)\\nSpace: 공격  ·  F: 섭취 (먹이 곁에서 누르고 있기)  ·  E: 둥지에서 탈피'")
rep("hudVis(v){[this.gfx,this.gL,this.gR,this.pnL,this.pnR,this.t1,this.t2,this.etx,this.atx,", "hudVis(v){[this.gfx,this.gL,this.gR,this.pnL,this.pnR,this.t1,this.t2,this.etx,this.atx,this.dshG,this.dshTx,")
a = " slamF(f){"
if s.count(a) != 1: raise SystemExit('anchor slamF')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
