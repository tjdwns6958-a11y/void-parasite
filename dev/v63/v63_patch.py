#!/usr/bin/env python3
"""v62 -> v63: 갑각 모습 = A '결정이 박힘' (먹은 결정이 머리·마디에서 돋아남, 단계마다 늘어남) — v61 판갑·범퍼·마디 갑판, 갑각의 연한 초승달 무늬 삭제(공허 3단계 무늬는 그대로)
수정 충전(lc_cry, 마디 위)은 그대로. 사용: python3 dev/v63/v63_patch.py index.html"""
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
rep('<title>공허 기생충 v62</title>', '<title>공허 기생충 v63</title>')
rep("window.VP_VER='v62';", "window.VP_VER='v63';")
# 결정 하나 그리기 (밑동 bx,by에서 ang 방향으로 len, 폭 w — 어두운 테두리 + 밝은 면/그늘 면 + 흰 끝)
rep("function skinTex(s,key,L){", "function skCry(px,x,bx,by,ang,len,w){const ca=Math.cos(ang),sa=Math.sin(ang),C=['#24304a','#e8f6ff','#8fc4ee','#ffffff'];for(const pass of[0,1])for(let t=0;t<=len;t+=.4){const ww=w*(t<len*.35?t/(len*.35):(len-t)/(len*.65))+(pass?0:.7);for(let q=-ww;q<=ww;q+=.4)px(x,bx+ca*t-sa*q,by+sa*t+ca*q,pass?(q<0?C[1]:C[2]):C[0])}px(x,bx+ca*len,by+sa*len,C[3])}\nfunction skinTex(s,key,L){")
# 머리: 판갑(v61) → 결정
cut("  if(L.c>=3){const R=Math.ceil(r)+2;for(let i=-R;i<=R;i++)for(let j=-R;j<=R;j++){const d=Math.hypot(i,j);if(d>r&&d<=r+1.5)", "Math.abs(j)<3?'#ffffff':'#9fd8ff')}}",
    "  if(L.c>=1){const t=L.c;skCry(px,x,c-2,c-r+1,-1.97,t>=3?5:3,t>=3?1.6:1.2);if(t>=2){skCry(px,x,c-2,c+r-1,1.97,t>=3?4.5:3,1.2);skCry(px,x,c+1.5,c-r+1.5,-1.45,2,.9)}if(t>=3){skCry(px,x,c-4,c-r+2,-2.4,3.5,1.1);skCry(px,x,c+.5,c+r-1,1.6,2.5,1);for(const[a,b]of[[-1,1],[1,-1],[-3,0]])px(x,c+a,c+b,'#bfeaff')}}")
# 마디: 갑판(v61) → 결정
cut("if(L.c>=3){const R=Math.ceil(r)+2;for(let i=-R;i<=R;i++)for(let j=-R;j<=R;j++){const d=Math.hypot(i,j);if(d>r&&d<=r+1.4)", "px(x,c+i,c,'#4a5488')}",
    "if(L.c>=1){const t=L.c;if(t==1&&i==1)skCry(px,x,c-.5,c-r+.6,-1.75,2,.9);if(t==2&&i%2==0)skCry(px,x,c-.5,c-r+.6,-1.75,2.6,1);if(t>=3){skCry(px,x,c-.5,c-r+.6,-1.75,3-i*.35,1.1);if(i<2)skCry(px,x,c,c+r-.6,1.75,2-i*.4,.8)}}")
# 연한 초승달 무늬는 이제 공허 3단계만
rep("if(L.c>=1||L.v>=3)for(let a=Math.PI*.55;", "if(L.v>=3)for(let a=Math.PI*.55;")
rep("if(L.c>=1||L.v>=3)for(let a=Math.PI*1.1;", "if(L.v>=3)for(let a=Math.PI*1.1;")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
