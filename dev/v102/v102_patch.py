#!/usr/bin/env python3
"""v101 -> v102
1) 허기의 왕관: 들숨(빨아들여 흡수하고 커지기) 없앰 → 회전 베기로 다가올 때 턱 원에 닿은 유충을 삼키면 커짐(최대 3단계, 회복 없음).
   회전 베기는 체력과 상관없이 나옴(8초 재사용). 회전 속도 11 → 6 · 다가오는 속도 104/80 → 78/60.
2) 갑각: 공격 재사용을 다른 계통과 같게 (박치기 0.9초 → 0.6초 · 수정 박치기 +0.5초 없앰). 피해 배율(×1.3, 수정 ×1.7/×1.9)은 그대로.
3) 종유석: 바닥 그림자가 커지며 진해지고 밝은 테두리 · 실루엣이 처음부터 보이며 점점 빨라져 떨어짐.
4) 새끼 게 체력 2 → 1 (알은 이미 1).
5) 공허 앵무조개 촉수: 문어 다리처럼(굵은 밑동 · 가는 끝 · 말렸다 펴짐 · 흐르는 물결 · 빨판) · 공허 보스전 화면 흔들림 세기 35% · 길이 60%.
본체: dev/v102/v102_methods.js (hud() 바로 앞) · 사용: python3 dev/v102/v102_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v102_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v101</title>', '<title>공허 기생충 v102</title>')
rep("window.VP_VER='v101';", "window.VP_VER='v102';")
# 1) 허기의 왕관
rep("else if(m.hp<m.mh*.7&&!(m.spc>now)&&r<.45){m.ns++;m.st='spinW';", "else if(!(m.spc>now)&&r<.45){m.ns++;m.st='spinW';")
rep("    else if(r<.8||m.inc>now){m.ns++;this.hcClamp(m,D,en)}\n    else{m.ns++;m.st='inhaleW';m.tm=.8;m.inc=now+9000;this.dtx(m.x,m.y-50,'들숨 — 유충을 먼저 먹을 것!','#ff9ac0')}}break;",
    "    else{m.ns++;this.hcClamp(m,D,en)}}break;")
rep("m.srot=(m.srot||0)+dt*(3+6*k);if(m.tm<=0){m.st='spin';m.tm=4}}break;", "m.srot=(m.srot||0)+dt*(2+3.5*k);if(m.tm<=0){m.st='spin';m.tm=4}}break;")
rep("case 'spin':{m.srot=(m.srot||0)+dt*11;", "case 'spin':{m.srot=(m.srot||0)+dt*6;")
rep("m.x+=dx/d*(m.st=='spin'?104:26)*dt;m.y+=dy/d*(m.st=='spin'?80:18)*dt}", "m.x+=dx/d*(m.st=='spin'?78:26)*dt;m.y+=dy/d*(m.st=='spin'?60:18)*dt}")
# 회전 중 턱 원에 닿은 유충을 삼키면 커짐
rep("   if(m.tm<=0){m.st='crown';m.cd=1;m.spR=0;m.jw.forEach(j=>{j.st='ring'})}}break;",
    "   for(const f of this.cur.food)if(f.on&&f.spr&&(f.t=='s'||f.t=='l')&&((f.spr.x-m.x)/R)**2+((f.spr.y-m.y)/(R*.75))**2<1){f.on=0;const fs=f.spr;f.spr=null;this.tweens.add({targets:fs,x:m.x,y:m.y,scale:.2,alpha:0,duration:220,ease:'Quad.in',onComplete:()=>fs.destroy()});\n    if((m.gr||0)<3){m.gr=(m.gr||0)+1;const rg=this.add.ellipse(m.x,m.y,150*bs,104*bs).setStrokeStyle(3,0xff9ac0,.9).setDepth(12);this.tweens.add({targets:rg,scale:1.35,alpha:0,duration:420,onComplete:()=>rg.destroy()});m.hk=.35}}\n   if(m.tm<=0){m.st='crown';m.cd=1;m.spR=0;m.jw.forEach(j=>{j.st='ring'})}}break;")
rep("맞물리는 두 턱 사이를 피하고, 들숨에 빨려 가기 전에 유충을 먼저 먹어 둘 것.", "맞물리는 두 턱 사이를 피하고, 회전 베기로 다가올 때 유충을 삼키면 커지니 유충을 먼저 먹어 둘 것.")
# 2) 갑각 공격 재사용 = 다른 계통과 같게
rep("this.bdmg=b0;this.slamS=0;this.bcd=.9+.3*f;", "this.bdmg=b0;this.slamS=0;this.bcd=C.BITE.cd;")
rep("if(cc&&this.lgT>0){this.cry--;this.bcd+=.5;this.cryFx()}", "if(cc&&this.lgT>0){this.cry--;this.cryFx()}")
# 4) 새끼 게 한 대
rep("m.kids.push({x:e.x,y:e.y,life:9,wd:0,hp:2,", "m.kids.push({x:e.x,y:e.y,life:9,wd:0,hp:1,")
# 5) 공허 보스전 흔들림
rep(" obsAI(m,dt,p){", " obsAI(m,dt,p){this.vShk();")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
