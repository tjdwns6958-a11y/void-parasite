#!/usr/bin/env python3
"""v48 -> v49: 물기 범위를 R1 둥근 부채꼴로 확정하고 각도를 좁힘(±66° → ±40°, 반지름 58 그대로 = 닿는 거리 63).
v48의 모양 4안 블록(R1~R4, window.__vpBR)을 R1만 남긴 블록(dev/v49/v49_methods.js)으로 바꾼다. 사용: python3 dev/v49/v49_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v49_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v48</title>', '<title>공허 기생충 v49</title>')
rep("window.VP_VER='v48';", "window.VP_VER='v49';")
a = ' // ===== v48: 물기 범위 모양 4안'; b = '\n end(a,b,c,tip){'
if s.count(a) != 1: raise SystemExit('v48 block marker')
i = s.index(a); j = s.index(b, i)
s = s[:i] + M.lstrip('\n') + s[j:]
if '__vpBR=' in s or 'brV()' in s: raise SystemExit('leftover v48 options')
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
