#!/usr/bin/env python3
"""v93 -> v94: 정동 집게왕
1) 벽 오르기·종유석 때 화면 흔들림 줄임 (천장 울림 .004→.0012 · 종유석 .004→.0015 · 착지 .014→.007)
2) 종유석(벽 오르기)은 돌진보다 적게: 사이클 두 번에 한 번만 오르고, 오르지 않는 사이클에는 그 자리에 돌진을 한 번 더
3) 수정 알을 부채꼴로 연달아 멀리 던짐(5개 · 2페이즈 6개) · 알과 새끼 게는 두 번 맞아야 없어짐
본체: dev/v94/v94_methods.js · 사용: python3 dev/v94/v94_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v94_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v93</title>', '<title>공허 기생충 v94</title>')
rep("window.VP_VER='v93';", "window.VP_VER='v94';")
# 1) 흔들림
rep("this.cameras.main.shake(3400,.004);this.dtx(400,70,'천장이 울린다", "this.cameras.main.shake(3400,.0012);this.dtx(400,70,'천장이 울린다")
rep("this.gdkDust(x,y,8);this.cameras.main.shake(80,.004);", "this.gdkDust(x,y,8);this.cameras.main.shake(60,.0015);")
rep("m.cyo=0;m.ca=1;this.cameras.main.shake(350,.014);", "m.cyo=0;m.ca=1;this.cameras.main.shake(300,.007);")
# 2) 벽 오르기는 두 사이클에 한 번 — 나머지는 그 자리에 돌진
rep("const CY=P2?['egg','bubble','climb']:['climb','egg','bubble'],step=(m.ci||0)<3?CY[m.ci||0]:'charge';",
    "const CY0=P2?['egg','bubble','climb']:['climb','egg','bubble'],CY=(m.cyN||0)%2?CY0.map(x=>x=='climb'?'charge2':x):CY0,step=(m.ci||0)<3?CY[m.ci||0]:'charge';")
rep("else{m.dodged=0;m.ci=0;this.gdkCharge(m,en,P2?1:0)}}", "else{m.dodged=0;m.ci=0;m.cyN=(m.cyN||0)+1;this.gdkCharge(m,en,P2?1:0)}}")
rep("       if(step=='climb')this.gdkClimb(m);", "       if(step=='climb')this.gdkClimb(m);\n       else if(step=='charge2')this.gdkCharge(m,en,P2?1:0);")
# 3) 두 번 맞아야 없어짐
rep("m.kids.push({x:e.x,y:e.y,life:9,wd:0,", "m.kids.push({x:e.x,y:e.y,life:9,wd:0,hp:2,")
rep("if(e.live&&!e.dead&&Math.hypot(e.x-q.x,e.y-q.y)<12){q.t=0;this.gdkEggBreak(m,e)}", "if(e.live&&!e.dead&&Math.hypot(e.x-q.x,e.y-q.y)<12){q.t=0;this.gdkEggHit(m,e)}")
rep("for(const k of m.kids)if(!k.dead&&Math.hypot(k.x-q.x,k.y-q.y)<12){q.t=0;this.gdkKidKill(k)}", "for(const k of m.kids)if(!k.dead&&Math.hypot(k.x-q.x,k.y-q.y)<12){q.t=0;this.gdkKidHit(k)}")
rep("if(d<R&&(dx*fx+dy*fy)/(d||1)>.1){this.gdkEggBreak(m,e);hit=1}", "if(d<R&&(dx*fx+dy*fy)/(d||1)>.1){this.gdkEggHit(m,e);hit=1}")
rep("if(d<R&&(dx*fx+dy*fy)/(d||1)>.1){this.gdkKidKill(k);hit=1}", "if(d<R&&(dx*fx+dy*fy)/(d||1)>.1){this.gdkKidHit(k);hit=1}")
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
