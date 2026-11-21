#!/usr/bin/env python3
"""v50 -> v51: ① 물기 전진은 '맞았을 때만' 약 6px (허공 물기로 이동 못 하게) ② 땅울음 솟구치기 화면 흔들림 축소(가까울 때만 약하게) + 땅 갈라짐·흙 튐
③ 머리 턱 모션 시안 J1~J3 (window.__vpJaw, 기본 1) — 서로 맞물려 겹치던 v48 턱 대신. 본체: dev/v51/v51_methods.js · 사용: python3 dev/v51/v51_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v51_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v50</title>', '<title>공허 기생충 v51</title>')
rep("window.VP_VER='v50';", "window.VP_VER='v51';")
# ① 전진: 시작에서 빼고, 맞았을 때만 0.06초(약 6px)
rep("this.moStart('bite');this.lgT=.12;this.lgA=an;", "this.moStart('bite');")
rep("if(!hit&&this.lin.v>=2)this.spit()}", "if(hit){this.lgT=.06;this.lgA=an}if(!hit&&this.lin.v>=2)this.spit()}")
# ② 땅울음 솟구치기
rep("    this.cameras.main.shake(150,.006);for(let i=0;i<8;i++){const a=i/8*6.283,b=this.add.circle(m.x,m.y,3,0x8a7aa0).setDepth(12);this.tweens.add({targets:b,x:m.x+Math.cos(a)*40,y:m.y+Math.sin(a)*40,alpha:0,duration:400,onComplete:()=>b.destroy()})}",
    "    this.rkBurst(m);")
# ③ 턱: brDraw 끝의 v48 턱 그림 → jawDraw
a = "  const hd=this.hd,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx;if(!hd||!hd.visible)return;\n  const open="
if s.count(a) != 1: raise SystemExit('jaw block')
i = s.index(a); e = "fillCircle(hd.x+fx*20*S,hd.y+fy*20*S,5*S)}"; j = s.index(e, i) + len(e)
s = s[:i] + "  this.jawDraw(g,q,al)}" + s[j:]
rep("\n end(a,b,c,tip){", "\n" + M + "\n end(a,b,c,tip){")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
