#!/usr/bin/env python3
"""v52 -> v53: 송곳니 한 쌍이 다물 때 서로 교차하던 문제 수정 — 곡선을 다시 정의(fangPts)해 두 송곳니 중심선 사이 ≥ 4.8px, 테두리를 끝으로 갈수록 가늘게 해 눈에 보이는 틈 ≥ 약 3.8px.
본체: dev/v53/v53_methods.js · 사용: python3 dev/v53/v53_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v53_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v52</title>', '<title>공허 기생충 v53</title>')
rep("window.VP_VER='v52';", "window.VP_VER='v53';")
a = ' // ===== v52: 머리 턱 = J1 송곳니 한 쌍 확정'; b = ' // 땅울음 솟구치기 (v51)'
if s.count(a) != 1 or s.count(b) != 1: raise SystemExit('v52 jaw block')
i = s.index(a); j = s.index(b, i)
s = s[:i] + M.lstrip('\n') + '\n' + s[j:]
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
