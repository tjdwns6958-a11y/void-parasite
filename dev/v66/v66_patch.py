#!/usr/bin/env python3
"""v65 -> v66: 포식 3단계 눈 4개를 1칸씩 비스듬히 늘림 (뒤 위 → 앞 아래로 비스듬한 짧은 눈 4개, 매서운 눈매)
사용: python3 dev/v66/v66_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v65</title>', '<title>공허 기생충 v66</title>')
rep("window.VP_VER='v65';", "window.VP_VER='v66';")
rep("if(L.p>=3){px(x,c+1,c-2,'#ff7a96');px(x,c+1,c+1,'#ff7a96');px(x,c-1,c-3,'#d0607e');px(x,c-1,c+2,'#d0607e')}",
    "if(L.p>=3){px(x,c+1,c-2,'#ff7a96');px(x,c,c-3,'#ff7a96');px(x,c+1,c+1,'#ff7a96');px(x,c,c+2,'#ff7a96');px(x,c-2,c-3,'#d0607e');px(x,c-3,c-4,'#d0607e');px(x,c-2,c+2,'#d0607e');px(x,c-3,c+3,'#d0607e')}")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
