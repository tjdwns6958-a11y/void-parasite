#!/usr/bin/env python3
"""v66 -> v67: 포식 3단계는 물 때 갈고리 턱이 커짐 — 벌리는 동안 최대 1.75배(평소 1.3배)·더 넓게(약 36°→46°) 벌렸다가 다물며 원래 크기로
사용: python3 dev/v67/v67_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v66</title>', '<title>공허 기생충 v67</title>')
rep("window.VP_VER='v66';", "window.VP_VER='v67';")
# 물기 중 크기: q<.52 동안 커졌다가(벌림 정도 op에 비례), 다문 뒤 0.48 동안 원래로
rep("const S=L.p>=2?1.3:1;", "const big=L.p>=3&&q>=0?(q<.52?Math.max(0,op-.25)/.75:Math.max(0,1-(q-.52)/.3)):0,S=(L.p>=2?1.3:1)*(1+.35*big);")
rep("an=sg*(op*.62-.06)", "an=sg*(op*(.62+.18*big)-.06)")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
