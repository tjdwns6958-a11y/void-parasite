#!/usr/bin/env python3
"""v42 -> v43: 퀘스트 창을 알리미(Q2) 모양으로 고정 + '▼ 모두 / ▲ 접기'로 세 계통 펼치기/접기(마지막 상태 기억 localStorage vp_lq).
경험치 막대는 얇고 연하게(읽기 쉬울 필요 없음 — 개발자 요청).
본체: dev/v43/v43_methods.js (lqDraw·xpDraw를 다시 정의 — 뒤의 정의가 이김) · 사용: python3 dev/v43/v43_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v43_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v42</title>', '<title>공허 기생충 v43</title>')
rep("window.VP_VER='v42';", "window.VP_VER='v43';")
# 퀘스트 창 누르기: 펼치기/접기 단추 or 진화 나무
rep("if(!this.molt&&p.x>8&&p.x<240&&p.y>52&&p.y<122){this.treeOpen();return}", "if(!this.molt&&this.lqTap(p.x,p.y))return;")
# 투명 처리 범위 = 지금 창 높이
rep("const tl=occ(8,6,240,122)?.22:1,", "const tl=occ(8,6,240,54+(this.lqH||70))?.22:1,")
# 장면 다시 시작
rep("this.gQ=null;this.lqT=null;", "this.gQ=null;this.lqT=null;this.lqH=0;")
rep("\n end(a,b,c,tip){", "\n" + M + "\n end(a,b,c,tip){")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
