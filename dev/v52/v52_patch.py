#!/usr/bin/env python3
"""v51 -> v52: 머리 턱 모션을 J1 송곳니 한 쌍으로 확정하고 송곳니를 작게. v51의 jawDraw(J1~J3 + window.__vpJaw)를 J1만 남긴 작은 송곳니로 바꾼다.
본체: dev/v52/v52_methods.js · 사용: python3 dev/v52/v52_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v52_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v51</title>', '<title>공허 기생충 v52</title>')
rep("window.VP_VER='v51';", "window.VP_VER='v52';")
a = ' // ===== v51: 머리 턱(씹는) 모션 시안'; b = ' // 땅울음 솟구치기 (v51)'
if s.count(a) != 1 or s.count(b) != 1: raise SystemExit('v51 jaw block')
i = s.index(a); j = s.index(b, i)
s = s[:i] + M.lstrip('\n') + '\n' + s[j:]
if '__vpJaw' in s: raise SystemExit('leftover __vpJaw')
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
