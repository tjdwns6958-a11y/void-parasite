#!/usr/bin/env python3
"""v41 -> v42: 경험치 막대를 화면 맨 밑(메이플식 가로 막대)으로 · 포식/갑각/공허 계통 표시를 에너지 막대 밑 '퀘스트 창'으로.
오른쪽 위 계통 고리 셋과 자원 줄은 퀘스트 창으로 옮기고, 오른쪽 위에는 구역·변이 횟수·지도만 남긴다.
퀘스트 창 모양은 window.__vpLQ = 1(목록형) / 2(퀘스트 알리미) / 3(아이콘 카드) — 개발자가 고르면 기본값을 그 안으로.
본체: dev/v42/v42_methods.js · 사용: python3 dev/v42/v42_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v42_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v41</title>', '<title>공허 기생충 v42</title>')
rep("window.VP_VER='v41';", "window.VP_VER='v42';")
# 왼쪽 위 패널: 경험치 줄이 빠지므로 낮게
rep("fillRoundedRect(8,6,232,54,8).setDepth(49);", "fillRoundedRect(8,6,232,44,8).setDepth(49);")
# 위쪽 경험치 줄 → 화면 맨 밑 막대
rep("  GL.fillStyle(0x3a2f57).fillRect(16,46,200,4);GL.fillStyle(0x7cc4ff).fillRect(16,46,this.plv>=18?200:200*Math.min(1,this.xp/this.xpn()),4);\n", "  this.xpDraw(g);\n")
# 오른쪽 위 계통 고리 셋 → 끔 (퀘스트 창으로)
rep("   {if(!this.rgT)this.rgT=LK.map(", "   if(0){if(!this.rgT)this.rgT=LK.map(")
rep("this.t2.setText('구역 '+this.zi+' / 3\\n유기 '+this.lavail('p')+' · 무기 '+this.lavail('c')+' · 정수 '+this.lavail('v')+'\\n'+hint)}", "this.t2.setText('구역 '+this.zi+' / 3\\n변이 '+this.molts+' / '+this.lmax());this.lqDraw()}")
# 진화 나무 여는 자리: 오른쪽 고리 → 왼쪽 퀘스트 창
rep("if(!this.molt&&p.x>662&&p.x<788&&p.y>132&&p.y<168){this.treeOpen();return}", "if(!this.molt&&p.x>8&&p.x<240&&p.y>52&&p.y<122){this.treeOpen();return}")
# 패널 투명 처리(밑에 플레이어·몬스터가 있으면)에 퀘스트 창 포함
rep("const tl=occ(8,6,240,60)?.22:1,", "const tl=occ(8,6,240,122)?.22:1,")
rep("this.pnL.setAlpha(this.hA.L);this.gL.setAlpha(this.hA.L);this.t1.setAlpha(this.hA.L);", "this.pnL.setAlpha(this.hA.L);this.gL.setAlpha(this.hA.L);this.t1.setAlpha(this.hA.L);if(this.gQ)this.gQ.setAlpha(this.hA.L);for(const k in this.lqT||{})this.lqT[k].setAlpha(this.hA.L);")
# HUD 숨기기/보이기에 새 요소 포함
rep(" hudVis(v){[this.gfx,this.gL,this.gR,this.pnL,this.pnR,this.t1,this.t2,this.etx]", " hudVis(v){[this.gfx,this.gL,this.gR,this.pnL,this.pnR,this.t1,this.t2,this.etx,this.gQ,this.xpT,this.xpL].concat(Object.values(this.lqT||{}))")
# 장면을 다시 시작하면 새로 만들게
rep("this.rgT=null;this.cine=null;", "this.rgT=null;this.gQ=null;this.lqT=null;this.xpT=null;this.xpL=null;this.cine=null;")
rep("\n end(a,b,c,tip){", "\n" + M + "\n end(a,b,c,tip){")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
