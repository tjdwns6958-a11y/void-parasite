#!/usr/bin/env python3
"""v44 -> v45: 물기·섭취 모션을 M3 용수철 꿈틀로 확정. v44의 시안 블록(M1·M2·M3 + window.__vpMo)을 M3만 남긴 블록으로 바꾼다.
본체: dev/v45/v45_methods.js · 사용: python3 dev/v45/v45_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v45_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v44</title>', '<title>공허 기생충 v45</title>')
rep("window.VP_VER='v44';", "window.VP_VER='v45';")
a = ' // ===== v44: 물기·섭취 캐릭터 모션'
b = '\n end(a,b,c,tip){'
if s.count(a) != 1: raise SystemExit('v44 block marker')
i = s.index(a); j = s.index(b, i)
s = s[:i] + M.lstrip('\n') + s[j:]
if '__vpMo' in s: raise SystemExit('leftover __vpMo')
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
