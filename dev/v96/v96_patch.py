#!/usr/bin/env python3
"""v95 -> v96: 정동 집게왕 돌진 화면 흔들림 줄임
기둥에 박힘(기절) .014 → .004 · 벽에 박힘 .006 → .0025 · 돌알 던지기 .006 → .0025 · 돌알 튕김 .003 → .0012
사용: python3 dev/v96/v96_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v95</title>', '<title>공허 기생충 v96</title>')
rep("window.VP_VER='v95';", "window.VP_VER='v96';")
rep("m.st='stun';m.tm=P2?1.6:2.2;m.rep=0;q.hp--;this.cameras.main.shake(320,.014);", "m.st='stun';m.tm=P2?1.6:2.2;m.rep=0;q.hp--;this.cameras.main.shake(220,.004);")
rep("m.st='stag';m.tm=.55;this.cameras.main.shake(160,.006)", "m.st='stag';m.tm=.55;this.cameras.main.shake(120,.0025)")
rep("m.cd=.9*en;this.cameras.main.shake(120,.006)", "m.cd=.9*en;this.cameras.main.shake(100,.0025)")
rep("if(bn){this.cameras.main.shake(60,.003)", "if(bn){this.cameras.main.shake(50,.0012)")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
