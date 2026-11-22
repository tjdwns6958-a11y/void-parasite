#!/usr/bin/env python3
"""v110 -> v111
1) 수정 방패 기절 시간 늘림: 1페이즈 2.2 → 3.0초 · 2페이즈 1.6 → 2.4초.
   반사: 막은 피해의 100% → 공격자 최대 체력의 CRP(%) — 갑주 배율 없이 그대로 들어감(무적 상태면 없음). 몸 공격(phy)일 때만은 그대로.
2) 종유석이 떨어져도 수정 기둥 · 파편이 더 생기지 않음(부서지는 연출만).
사용: python3 dev/v111/v111_patch.py index.html [CRP, 기본 0.03]"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
CRP = sys.argv[2] if len(sys.argv) > 2 else '0.03'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v110</title>', '<title>공허 기생충 v111</title>')
rep("window.VP_VER='v110';", "window.VP_VER='v111';")
rep("\nconst CRR=", "\nconst CRP="+CRP+";\nconst CRR=")
# 1) 기절 시간
rep("m.st='stun';m.tm=m.ph==2?1.6:2.2;m.rep=0;this.tel=this.tel.filter(q=>q.m!==m);this.cameras.main.shake(160,.004);", "m.st='stun';m.tm=m.ph==2?2.4:3;m.rep=0;this.tel=this.tel.filter(q=>q.m!==m);this.cameras.main.shake(160,.004);")
# 반사 = 최대 체력의 CRP
rep("if(m&&m.on&&d>0&&R>0&&phy){const rd=d*this.dmt*R,h0=m.hp;const kd=m.k=='em'&&m.ph==2?this.dmgM(m,rd*.8,1):this.dmgM(m,rd);",
    "this.pblkN=(this.pblkN||0)+(phy?1:0);const CP=window.__vpCP??CRP;if(m&&m.on&&d>0&&CP>0&&phy&&this.dmul(m)>0){const rd=(m.mh||MON(m.k).hp||40)*CP,h0=m.hp;const kd=this.dmgM(m,rd,1);")
rep("막은 피해의 '+Math.round(CRR*100)+'%를 공격자에게 반사 (거품·종유석 같은 공격은 막기만)']", "공격자 최대 체력의 '+Math.round(CRP*100)+'%만큼 반사 (거품·종유석 같은 공격은 막기만)']")
# 2) 종유석: 기둥·파편 없음
rep("  if(sz>=1&&Math.hypot(p.x-x,p.y-y)>34*sz&&!m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<52)){const T=m.pt.filter(q=>q.tmp&&q.on&&!q.dead);if(T.length>=5){const q0=T[0];q0.dead=1;q0.on=0;const oo=q0.o;this.tweens.add({targets:oo,alpha:0,scaleY:.15,duration:300,onComplete:()=>oo.destroy()})}const s0=.8*Math.min(1.2,sz),o=this.add.image(x,y+14,'gdkP').setOrigin(.5,.86).setDepth(8.4).setTintFill(0xffffff).setScale(s0,.2);this.tweens.add({targets:o,scaleY:s0,duration:220,ease:'Back.out',onComplete:()=>o.clearTint()});m.pt.push({x,y,hp:1,on:1,rt:0,tmp:1,life:1e9,o})}\n  else if(Math.random()<.35)this.gdkShardFly(x,y,1)}",
    "}")
rep("떨어진 종유석은 새 수정 기둥이 된다. ", "")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s), 'CRP', CRP)
