#!/usr/bin/env python3
"""v56 -> v57: 피격 화면 흔들림 줄임 — hurt()의 카메라 흔들림 0.1초·세기 .004 → 0.07초·세기 .0015 (약 1/3)
사용: python3 dev/v57/v57_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v56</title>', '<title>공허 기생충 v57</title>')
rep("window.VP_VER='v56';", "window.VP_VER='v57';")
rep("this.bd.forEach(o=>o.clearTint()));this.cameras.main.shake(100,.004);", "this.bd.forEach(o=>o.clearTint()));this.cameras.main.shake(70,.0015);")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
