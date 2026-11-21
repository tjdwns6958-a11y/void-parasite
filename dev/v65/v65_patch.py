#!/usr/bin/env python3
"""v64 -> v65: 포식 3단계 = E-a 이빨 왕관(머리 앞 테두리 송곳니) + 작은 눈 4개 · 분홍 입(D)·비치는 몸(F) 삭제, 마디는 원래 가시
사용: python3 dev/v65/v65_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
def cut(a, b, new):
    global s
    if s.count(a) != 1: raise SystemExit('cut start x%d: %r' % (s.count(a), a[:70]))
    i = s.index(a); j = s.index(b, i) + len(b); s = s[:i] + new + s[j:]
rep('<title>공허 기생충 v64</title>', '<title>공허 기생충 v65</title>')
rep("window.VP_VER='v64';", "window.VP_VER='v65';")
# 머리 그림: 분홍 목구멍(D) → 이빨 왕관 (게임 안 머리 whj_에도 그림 — 왕관은 움직이지 않음)
cut("if(L.p>=3&&!nj){for(let a=0;a<=r+1;a+=.5){", "px(x,c+a,c+w,'#fff')}}",
    "if(L.p>=3){for(let a=-1.25;a<=1.2501;a+=.31){const cx=Math.cos(a),sy=Math.sin(a);px(x,c+cx*(r-.6),c+sy*(r-.6),'#ff9ac0');for(let k=.6;k<=1.8;k+=.8)px(x,c+cx*(r+k),c+sy*(r+k),k+.8>1.8?'#ffe8f0':'#ffffff')}}")
# 눈: 포식 3단계는 작은 눈 4개 (앞 둘 연한 빨강 · 뒤 둘 흐리게)
rep("if(L.p>=3){px(x,c-1,c-4,ec);px(x,c-1,c+3,ec)}", "if(L.p>=3){px(x,c+1,c-2,'#ff7a96');px(x,c+1,c+1,'#ff7a96');px(x,c-1,c-3,'#d0607e');px(x,c-1,c+2,'#d0607e')}")
# 게임 안 물 때: 분홍 입 삭제 (갈고리 턱만 다묾)
cut("if(L.p>=3){const x0=r*.35,", "fillRect(p.x-u*.5,p.y-u*.5,u,u)}}}\n", "")
# 마디: 비치는 몸(F) 삭제
cut("if(L.p>=3){disc(x,c,c+.3,r-1.1,'#3a0a30');", "'#ffd0e0')}", "")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
