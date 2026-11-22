#!/usr/bin/env python3
"""v88 -> v89: 공허 1페이즈 눈 3단계 색 — 붉은빛이 과해서 최대 주황빛으로 (단계 바뀔 때 번쩍임도 주황)
본체: dev/v89/v89_methods.js · 사용: python3 dev/v89/v89_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v89_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v88</title>', '<title>공허 기생충 v89</title>')
rep("window.VP_VER='v88';", "window.VP_VER='v89';")
rep("const f=this.add.ellipse(m.x,m.y,120,86,0xff2040,.35).setDepth(3.2);", "const f=this.add.ellipse(m.x,m.y,120,86,0xffa050,.28).setDepth(3.2);")
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
