#!/usr/bin/env python3
"""v73 -> v74: 포식 2·3단계 몸통 = B2 등줄기 톱날 (마디 가시 하나 → 등을 따라 톱니 셋, 3단계는 더 크게 + 배 쪽 작은 톱니)
사용: python3 dev/v74/v74_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v73</title>', '<title>공허 기생충 v74</title>')
rep("window.VP_VER='v73';", "window.VP_VER='v74';")
rep("if(L.p>=2){const h=L.p>=3?4:3;for(let k=0;k<h;k++)px(x,c,c-r-k,k==h-1?'#ffe0ea':'#e8b0c4');px(x,c-1,c-r,'#c8889c')}",
    "if(L.p>=2){const big=L.p>=3,h=big?2.6-i*.3:1.6-i*.2;for(let k=-1;k<=1;k++){const bx=c+k*1.7;for(let t=0;t<=h;t+=.5){const w=.9*(1-t/h);for(let q=-w;q<=w;q+=.5)px(x,bx-t*.35+q,c-r+.2-t,t+.5>h?'#ffffff':'#ffe0ea')}px(x,bx+1,c-r,'#3d1b6b')}"
    "if(big){for(let k=-1;k<=1;k+=2){const bx=c+k*1.4;for(let t=0;t<=1.4;t+=.5)px(x,bx-t*.3,c+r-.2+t,'#ffd0e0')}}}")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
