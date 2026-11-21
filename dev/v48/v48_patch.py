#!/usr/bin/env python3
"""v47 -> v48: 물기 범위 모양 4안(window.__vpBR, 지금 기본 1) — 모두 예전 판정과 닿는 거리·면적을 맞춤 — + 물기 때 머리 턱을 '딱' 다무는 모션.
v47의 inBite·biteShape(둥근 사다리꼴 하나)를 다각형 판정 + 모양 4안으로 바꾸고, 범위 그림은 매 프레임 brDraw가 그린다.
본체: dev/v48/v48_methods.js · 사용: python3 dev/v48/v48_patch.py index.html"""
import sys, os, re
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v48_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v47</title>', '<title>공허 기생충 v48</title>')
rep("window.VP_VER='v47';", "window.VP_VER='v48';")
# 물기 순간의 범위 그림(한 장짜리 트윈) → 매 프레임 그리는 효과로
rep("{const e=this.add.graphics({x:p.x,y:p.y}).setDepth(12).setRotation(an),P=this.biteShape();e.fillStyle(0xffffff,.13).fillPoints(P,true);e.lineStyle(1.5,0xffffff,.6).strokePoints(P,true);this.tweens.add({targets:e,alpha:0,x:p.x+fx*12,y:p.y+fy*12,duration:200,onComplete:()=>e.destroy()})}",
    "this.brFx={t:0,x:p.x,y:p.y,an};")
# v47의 inBite + biteShape 삭제 (v48 블록이 다시 정의)
i = s.index(' inBite(dx,dy,fx,fy,ex){'); j = s.index(' moStart(k){', i)
s = s[:i] + s[j:]
rep("this.worm(dt,t,spd,sp);this.moApply(dt);", "this.worm(dt,t,spd,sp);this.moApply(dt);this.brDraw(dt);")
rep("this.lgT=0;this.lgX=0;this.lgY=0;", "this.lgT=0;this.lgX=0;this.lgY=0;this.brFx=null;this.brG=null;")
rep("\n end(a,b,c,tip){", "\n" + M + "\n end(a,b,c,tip){")
if 'biteShape' in s: raise SystemExit('leftover biteShape')
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
