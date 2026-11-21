#!/usr/bin/env python3
"""v67 -> v68: 포식 3단계 이빨 왕관을 턱 밑(앞쪽 ±0.63rad, 5개)만 남기고 얼굴 옆으로 뻗은 이빨·잇몸 점 삭제 — 갈고리 턱은 그대로
사용: python3 dev/v68/v68_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v67</title>', '<title>공허 기생충 v68</title>')
rep("window.VP_VER='v67';", "window.VP_VER='v68';")
rep("if(L.p>=3){for(let a=-1.25;a<=1.2501;a+=.31){", "if(L.p>=3){for(let a=-.63;a<=.6301;a+=.31){")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
