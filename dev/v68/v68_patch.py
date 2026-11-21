#!/usr/bin/env python3
"""v67 -> v68: 포식 3단계 얼굴 둘레의 흰 송곳니(이빨 왕관의 흰 부분) 삭제 — 갈고리 턱·분홍 잇몸 점은 그대로
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
rep("px(x,c+cx*(r-.6),c+sy*(r-.6),'#ff9ac0');for(let k=.6;k<=1.8;k+=.8)px(x,c+cx*(r+k),c+sy*(r+k),k+.8>1.8?'#ffe8f0':'#ffffff')}}",
    "px(x,c+cx*(r-.6),c+sy*(r-.6),'#ff9ac0')}}")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
