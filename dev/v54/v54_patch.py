#!/usr/bin/env python3
"""v53 -> v54: 9판 플레이 점검 수정
 ① 퀘스트 창 숫자가 목표를 넘어 '312 / 114'처럼 보이던 것 → 목표에서 멈춤
 ② 땅울음 안내 글씨(발소리/조용히 이동)가 퀘스트 창과 겹치던 것 → 퀘스트 창 바로 밑으로
사용: python3 dev/v54/v54_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v53</title>', '<title>공허 기생충 v54</title>')
rep("window.VP_VER='v53';", "window.VP_VER='v54';")
# ① 퀘스트 숫자: 모은 양이 목표를 넘으면 목표 숫자로 표시
rep("this.lqTx(id+'c',X+W-8,y0+(big?27:23),q.a+' / '+q.c,", "this.lqTx(id+'c',X+W-8,y0+(big?27:23),Math.min(q.a,q.c)+' / '+q.c,")
# ② 땅울음 안내 글씨: 퀘스트 창(높이 lqH) 밑, 처음 25초 '진화 나무' 안내가 있으면 그 밑
rep("if(this.qtx){this.qtx.setVisible(rk);if(rk)",
    "if(this.qtx){this.qtx.setVisible(rk);if(rk)this.qtx.setPosition(16,(this.boss?54:54+(this.lqH||70)+(this.time.now-this.t0<25000?16:6)));if(rk)")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
