#!/usr/bin/env python3
"""v94 -> v95: 수정 알 첫 대 '금이 갔다' 글자 없앰 → 금 간 알 그림(gdkEggC) + 찌그러짐 + 껍질 조각 + 작은 번쩍
본체: dev/v95/v95_methods.js · 사용: python3 dev/v95/v95_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v95_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v94</title>', '<title>공허 기생충 v95</title>')
rep("window.VP_VER='v94';", "window.VP_VER='v95';")
# 깨어나기 직전 깜빡임이 금 간 그림을 지우지 않게 (clearTint만 하므로 그대로) — 금 간 알도 하얗게 깜빡임
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
