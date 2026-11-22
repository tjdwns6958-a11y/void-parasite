#!/usr/bin/env python3
"""v108 -> v109 (갑각 수정 · 정동 집게왕)
1) 집게왕이 수정 기둥에 부딪히면(기절) 수정 파편이 늘 2개(기둥이 부서지면 3개) 튀어나와 바닥에 떨어짐 — 전엔 1~2개 · 방에 먹이가 8개 넘으면 안 생겼음(→ 12개).
2) 수정 장전 최대 3 → 2 (CRM). 부활 때도 2개.
3) 수정으로 막았을 때 반사는 몸으로 하는 공격(돌진 · 집게 · 내리찍기 · 떨어지는 집게왕 · 일반 몬스터의 할퀴기·물기 등)에만:
   막기는 모든 공격에 그대로, 반사는 거품 분사 · 떨어지는 종유석 · 새끼 게 · 정동 지뢰 · 수정 가시 · 정동 파편 · 멀리서 날아온 것(공격자가 몸 반지름+100px 밖)이면 없음.
사용: python3 dev/v109/v109_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v108</title>', '<title>공허 기생충 v109</title>')
rep("window.VP_VER='v108';", "window.VP_VER='v109';")
# 2) 최대 2
rep("\nconst CRR=", "\nconst CRM=2,NPHY=new Set(['거품 분사','떨어지는 종유석','수정 새끼 게','달라붙은 새끼 게','정동 지뢰','수정 가시','정동 파편']);\nconst CRR=")
rep("this.cry<3", "this.cry<CRM", 4)
rep("this.cry=3", "this.cry=CRM")
rep("수정 3개)", "수정 2개)")
rep("결정을 먹으면 등에 수정 1개(최대 3) — 맞을 때", "결정을 먹으면 등에 수정 1개(최대 2) — 몸으로 하는 공격(돌진·집게 등)을 맞을 때")
rep("막은 피해의 '+Math.round(CRR*100)+'%를 공격자에게 반사']", "막은 피해의 '+Math.round(CRR*100)+'%를 공격자에게 반사 (거품·종유석 같은 공격은 막기만)']")
# 3) 반사는 몸 공격만
rep("if(m&&m.on&&d>0&&R>0){const rd=d*this.dmt*R,h0=m.hp;", "const phy=m&&!NPHY.has(src)&&Math.hypot(p.x-m.x,p.y-m.y)<=(m.br||40)+100;if(m&&m.on&&d>0&&R>0&&phy){const rd=d*this.dmt*R,h0=m.hp;")
# 1) 기둥에 부딪히면 파편 2개(부서지면 3개) · 먹이 한도 12
rep("this.gdkShardFly(q.x,q.y,1+(Math.random()<.5?1:0))", "this.gdkShardFly(q.x,q.y,2)")
rep("a2.food.filter(f=>f.on).length>=8", "a2.food.filter(f=>f.on).length>=12")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
