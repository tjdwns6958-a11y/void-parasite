#!/usr/bin/env python3
"""v82 -> v83: 공허 중간 보스 어렵게 — 유일하게 원거리 공격이 되는 계통이라 그에 맞게
- 원거리 견제: 껍데기에 숨은 동안 날아온 플레이어 구체를 튕겨 되돌려 보낸다(피해 14)
- 나선 구체 175→190px/s · 피해 14→16 · 숨을 때/나올 때 구체 고리 165→175 · 14→16
- 촉수 잡기 22→26 · 눈빛 쓸기 12→14 · 블랙홀 끌어당김 40+55k → 50+60k
- 체력 440+48×Lv → 460+50×Lv
사용: python3 dev/v83/v83_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v82</title>', '<title>공허 기생충 v83</title>')
rep("window.VP_VER='v82';", "window.VP_VER='v83';")
rep("const q=this.mbShot(o.ax,o.ay,m.sa+k,175,D(14),'나선 구체',m,'emo')", "const q=this.mbShot(o.ax,o.ay,m.sa+k,190,D(16),'나선 구체',m,'emo')")
rep("this.hurt(D(22),'공허 촉수',m);", "this.hurt(D(26),'공허 촉수',m);")
rep("this.hurt(D(12),'앵무조개의 눈빛',m)", "this.hurt(D(14),'앵무조개의 눈빛',m)")
rep("const q=this.mbShot(o.ax,o.ay,a0+i/12*6.283,165,D(14),'나선 구체',m,'emo')", "const q=this.mbShot(o.ax,o.ay,a0+i/12*6.283,175,D(16),'나선 구체',m,'emo')")
rep("this.emPull.v=40+55*k}", "this.emPull.v=50+60*k}")
rep("  if(m.root>0){m.root-=dt;", "  if((m.st=='hide'||m.st=='hideW')&&this.pprj)for(const q of this.pprj)if(q.t>0&&Math.hypot(q.x-m.x,q.y-m.y)<70){q.t=0;const a=Math.atan2(p.y-q.y,p.x-q.x),b=this.mbShot(q.x,q.y,a,230,D(14),'튕겨 나온 구체',m,'emo');b.o.setTint(0xc070ff);if(!(m.rfT>now)){m.rfT=now+1200;this.dtx(q.x,q.y-16,'껍데기가 구체를 튕겨냈다','#c8a8ff')}}\n  if(m.root>0){m.root-=dt;")
rep("'앵무조개의 눈빛':'눈빛이 방을 쓸 때는 떠 있는 갑주 조각 뒤로',", "'앵무조개의 눈빛':'눈빛이 방을 쓸 때는 떠 있는 갑주 조각 뒤로','튕겨 나온 구체':'껍데기에 숨은 동안 쏜 구체는 튕겨서 돌아온다 — 숨었을 땐 쏘지 말고 피할 것',")
rep("if(k=='v')room.en.push(E('obs',400,116,Math.round(440+48*plv),", "if(k=='v')room.en.push(E('obs',400,116,Math.round(460+50*plv),")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
