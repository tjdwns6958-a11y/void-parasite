#!/usr/bin/env python3
"""v121 -> v122: 탈피 창 글자 겹침 수정 — 단계를 글 높이에 맞춰 차례로 쌓고(11px), 설명은 지금 고를 단계만 펼침(끝난·잠긴 단계는 이름 한 줄)
사용: python3 dev/v122/v122_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v121</title>', '<title>공허 기생충 v122</title>')
rep("window.VP_VER='v121';", "window.VP_VER='v122';")
rep("   for(let t=0;t<3;t++){const tx=M.rw[i][t],[nm,ds]=ND[k][t];let head,col;",
    "   let yy=106;for(let t=0;t<3;t++){const tx=M.rw[i][t],[nm,ds]=ND[k][t];let head,col;")
rep("tx.setText(head+'\\n'+ds).setColor(col);if(t==L[k]&&!lk){g.fillStyle(LCN[k],sel?.22:.1).fillRoundedRect(x0+6,100+t*80,234,78,6)}}});",
    "tx.setText(t==L[k]?head+'\\n'+ds:head).setColor(col).setFontSize(11).setLineSpacing(2).setY(yy);if(t==L[k]&&!lk){g.fillStyle(LCN[k],sel?.22:.1).fillRoundedRect(x0+6,yy-5,234,tx.height+10,6)}yy+=tx.height+12}});")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
