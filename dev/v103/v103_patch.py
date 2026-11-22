#!/usr/bin/env python3
"""v102 -> v103
1) 버그: 다시 시작(코드 플레이 · 처음부터 · 쓰러진 뒤 다시)하면 공격 범위 예고(telG)·대시 버튼(dshG/dshTx)·특수 스킬 버튼(skG/skT)·퀘스트 표시(mqT)가
   이미 지워진 그림을 계속 써서 안 보였음 → create()에서 함께 비움. (보스전에 대시 버튼이 안 보이던 것도 이 버그)
2) 떨어지는 종유석 그림: 거꾸로 된 수정 기둥 → 새 종유석(바위 원뿔 + 수정 끝, gdkStl). 끝이 그림자 위에 닿게 아래 기준.
본체: dev/v103/v103_methods.js · 사용: python3 dev/v103/v103_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v103_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v102</title>', '<title>공허 기생충 v103</title>')
rep("window.VP_VER='v102';", "window.VP_VER='v103';")
rep("this.gQ=null;this.lqT=null;", "this.gQ=null;this.lqT=null;this.telG=null;this.dshG=null;this.dshTx=null;this.skG=null;this.skT=null;this.mqT=null;")
rep("const o=this.add.image(x,y-260,'gdkP').setFlipY(true).setScale(.75).setTint(0x3a3058).setDepth(13).setAlpha(0)",
    "this.gdkStlTex();const o=this.add.image(x,y-260,'gdkStl').setOrigin(.5,1).setScale(.9).setTint(0x3a3058).setDepth(13).setAlpha(0)")
rep("{r:58,g:48,b:88},{r:216,g:208,b:240},1,q)", "{r:58,g:48,b:88},{r:255,g:255,b:255},1,q)")
rep("for(const dx of[-8,0,8])tr.lineBetween(x+dx,o.y-30-60*q,x+dx,o.y-30)", "for(const dx of[-6,0,6])tr.lineBetween(x+dx,o.y-92-60*q,x+dx,o.y-92)")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
