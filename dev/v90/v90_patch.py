#!/usr/bin/env python3
"""v89 -> v90: 정동 집게왕 기절 시간 늘림 (1페이즈 1.5→2.2초 · 2페이즈 1.1→1.6초)
사용: python3 dev/v90/v90_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v89</title>', '<title>공허 기생충 v90</title>')
rep("window.VP_VER='v89';", "window.VP_VER='v90';")
rep("m.st='stun';m.tm=P2?1.1:1.5;", "m.st='stun';m.tm=P2?1.6:2.2;")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
