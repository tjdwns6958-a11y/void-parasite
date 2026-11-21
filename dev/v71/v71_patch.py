#!/usr/bin/env python3
"""v70 -> v71: 포식 칼날 턱을 얇은 검날로(도끼처럼 둔탁하던 모양 → 두께 약 절반, 톱니 없앰, 살짝 휜 가는 날) · 통째 삼키기 턱도 같은 날·조금 작게 · 포식 2단계 눈 = Y5(연노랑 눈 + 붉은 눈썹)
사용: python3 dev/v71/v71_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v70</title>', '<title>공허 기생충 v71</title>')
rep("window.VP_VER='v70';", "window.VP_VER='v71';")
OLD = "[[r-1.8,4.2],[r+1.2,5.1],[r+3.6,4.1],[r+5.1,.9],[r+3.3,2.3],[r+2.8,1.7],[r+2.1,2.6],[r+1.4,2.1],[r+.8,2.9],[r-1.2,2.2]]"
NEW = "[[r-1.4,3.5],[r+.8,4],[r+3,3.6],[r+5.4,1.4],[r+4.3,2],[r+3.4,2.6],[r+2.4,2.9],[r+1.4,3],[r+.3,3],[r-1.2,2.8]]"
rep(OLD, NEW, 2)   # 게임 안(pjBlade) + 정지 그림(skBlade)
# 테두리·날 선 가늘게
rep("g.lineStyle(2.2*u,0x3d1b6b,al).strokePoints(P,true);g.fillStyle(0xf0c8d8,al).fillPoints(P,true);", "g.lineStyle(1.3*u,0x3d1b6b,al).strokePoints(P,true);g.fillStyle(0xf0c8d8,al).fillPoints(P,true);")
rep("g.lineStyle(.9*u,0xffffff,al).beginPath().moveTo(P[3].x,P[3].y);", "g.lineStyle(.7*u,0xffffff,al).beginPath().moveTo(P[3].x,P[3].y);")
# 통째 삼키기 턱: 크기 4.4 → 3.8, 테두리 가늘게
rep("K=4.4*(m&&m.mb?1.5:1)", "K=3.8*(m&&m.mb?1.5:1)")
rep("g.lineStyle(2.4,0x3d1b6b,al).strokePoints(P,true);", "g.lineStyle(1.6,0x3d1b6b,al).strokePoints(P,true);")
# 포식 2단계 눈 = Y5
rep("else{px(x,c+2,c-2,ec);px(x,c+2,c+1,ec)}", "else if(L.p==2){px(x,c+2,c-2,'#ffe0a0');px(x,c+2,c+1,'#ffe0a0');px(x,c+1,c-3,'#ff5a7a');px(x,c+1,c+2,'#ff5a7a')}else{px(x,c+2,c-2,ec);px(x,c+2,c+1,ec)}")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
