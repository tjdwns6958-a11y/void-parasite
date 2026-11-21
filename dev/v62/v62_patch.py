#!/usr/bin/env python3
"""v61 -> v62: 공허 3단계 모습 = 개발자가 고른 'v3+c1' — 공허 3단계면 갑각이 없어도 머리 뒤·마디 위 연한 초승달 무늬
사용: python3 dev/v62/v62_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v61</title>', '<title>공허 기생충 v62</title>')
rep("window.VP_VER='v61';", "window.VP_VER='v62';")
rep("if(L.c>=1)for(let a=Math.PI*.55;", "if(L.c>=1||L.v>=3)for(let a=Math.PI*.55;")
rep("if(L.c>=1)for(let a=Math.PI*1.1;", "if(L.c>=1||L.v>=3)for(let a=Math.PI*1.1;")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
