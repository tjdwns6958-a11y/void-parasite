#!/usr/bin/env python3
"""v43 -> v44: 물기(탭)·섭취(꾹)에 캐릭터 모션. 먹는 동안 머리가 먹이 쪽으로 돈다.
모션 시안 window.__vpMo = 1 턱 집게 / 2 원형 아가리 / 3 용수철 꿈틀 (지금 기본 1 — 개발자가 고르면 고정).
본체: dev/v44/v44_methods.js · 사용: python3 dev/v44/v44_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v44_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v43</title>', '<title>공허 기생충 v44</title>')
rep("window.VP_VER='v43';", "window.VP_VER='v44';")
# 물기 → 모션 시작
# 범위 표시: 꽉 찬 흰 원 → 얇은 고리 (모션을 가리지 않게)
rep("  const e=this.add.circle(p.x+fx*34,p.y+fy*34,20,0xffffff,.55).setDepth(12);", "  this.moStart('bite');const e=this.add.circle(p.x+fx*34,p.y+fy*34,20).setStrokeStyle(1.5,0xffffff,.5).setDepth(12);")
# 섭취 중인 먹이 기억
rep("const hold=(this.eat&&this.eat.isDown)||k.SPACE.isDown;let tg=null,bd=34;", "const hold=(this.eat&&this.eat.isDown)||k.SPACE.isDown;let tg=null,bd=34;this.moEat=null;")
rep("f.p+=dt/C.F[f.t].t;else", "{f.p+=dt/C.F[f.t].t;this.moEat=f}else")
# 몸 그린 뒤 모션 덧입히기
rep("  this.worm(dt,t,spd,sp);", "  this.worm(dt,t,spd,sp);this.moApply(dt);")
rep("this.gQ=null;this.lqT=null;this.lqH=0;", "this.gQ=null;this.lqT=null;this.lqH=0;this.mo=null;this.moG=null;this.moEat=null;")
rep("\n end(a,b,c,tip){", "\n" + M + "\n end(a,b,c,tip){")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
