#!/usr/bin/env python3
"""v105 -> v106
1) 허기 표식: 유충 3마리 → 1마리 (가장 먼 것)
2) 정동 집게왕 거품: 한 번에 11개(2페이즈 13) → 9개(2페이즈 11)
3) 허기의 왕관 흩어짐: 1·2번째 쌍만 돌진 · 3번째 쌍(턱 2·5)은 하늘로 올라갔다가 나를 따라 찍히는 원 위로 내리꽂히고 다시 올라가기를 반복(엇갈려서), 흩어짐이 끝날 때까지
본체: dev/v106/v106_methods.js · 사용: python3 dev/v106/v106_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v106_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v105</title>', '<title>공허 기생충 v106</title>')
rep("window.VP_VER='v105';", "window.VP_VER='v106';")
# 1) 표식 1마리
rep("Math.hypot(b.spr.x-m.x,b.spr.y-m.y)-Math.hypot(a.spr.x-m.x,a.spr.y-m.y)).slice(0,3);", "Math.hypot(b.spr.x-m.x,b.spr.y-m.y)-Math.hypot(a.spr.x-m.x,a.spr.y-m.y)).slice(0,1);")
rep("'허기 표식 — 표식 유충을 먼저 먹을 것!'", "'허기 표식 — 표식 유충을 먼저 먹을 것!'")
# 2) 거품 수
rep("gdkBubFire(m){const p=this.pl,n=m.ph==2?13:11,", "gdkBubFire(m){const p=this.pl,n=m.ph==2?11:9,")
# 3) 3번째 쌍은 턱 비 반복
rep("hcPair(m,k,en){const A=m.jw[k],B=m.jw[k+3];m.pn[k]++;", "hcPair(m,k,en){const A=m.jw[k],B=m.jw[k+3];m.pn[k]++;if(k==2){this.hcPairRain(m,A,B,en);return}")
rep("   else if(j.st=='land'){j.t-=dt;if(j.t<=0&&m.st!='jrain')j.st='ring'}",
    "   else if(j.st=='land'){j.t-=dt;if(j.t<=0&&m.st!='jrain'){if(j.rl&&m.st=='scatter'){j.st='rUp'}else{j.rl=0;j.st='ring'}}}\n   else if(j.st=='rUp'){j.y-=520*dt;j.fa=-Math.PI/2;if(j.y<-60){j.y=-60;j.st='rSky';j.t=j.wt??.35;j.wt=.35}}\n   else if(j.st=='rSky'){j.y=-60;j.t-=dt;if(j.t<=0){if(m.st=='scatter'&&m.tm>.7)this.hcRainStrike(m,j,en);else{j.rl=0;j.st='ring'}}}")
rep("if(j.st!='spin'&&j.st!='up'&&j.st!='sky'&&j.st!='fallW'&&j.st!='land'&&Math.hypot", "if(j.st!='spin'&&j.st!='up'&&j.st!='sky'&&j.st!='fallW'&&j.st!='land'&&j.st!='rUp'&&j.st!='rSky'&&Math.hypot")
rep("   if(m.tm<=0){m.st='crown';m.cd=1.2;m.jw.forEach(j=>{j.st='ring'})}break;", "   if(m.tm<=0){m.st='crown';m.cd=1.2;m.jw.forEach(j=>{j.rl=0;if(j.st!='fallW'&&j.st!='land')j.st='ring'})}break;")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
