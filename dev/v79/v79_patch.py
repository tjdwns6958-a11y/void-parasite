#!/usr/bin/env python3
"""v78 -> v79: 허기의 왕관 — 흩어짐 단계 턱 돌진을 쌍 단위로(쌍마다 공격 텀 · 차례로 덮침) · 1쌍은 두 번 돌진 대신 X자로 엇갈려 지나감
본체: dev/v79/v79_methods.js · 사용: python3 dev/v79/v79_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v79_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v78</title>', '<title>공허 기생충 v79</title>')
rep("window.VP_VER='v78';", "window.VP_VER='v79';")
# 흩어짐 시작: 쌍 타이머(차례로 0.3 / 0.9 / 1.5초)
rep("m.jw.forEach((j,i)=>{j.st='rest';j.t=.15+i*.12})}", "m.pt=[.3,.9,1.5];m.pn=[0,0,0];m.cxN=0;m.jw.forEach(j=>{j.st='rest';j.t=0;j.rep=0})}")
# 돌진 끝: 흩어짐에선 잠깐 멈췄다 쌍 차례를 기다림(연속 돌진만 스스로 이어감)
rep("j.st='rest';j.t=j.rep>0?.12:.8+Math.random()*.6;", "j.st='rest';j.t=j.rep>0?.12:m.st=='scatter'?.2:.8+Math.random()*.6;")
rep("else if(j.st=='rest'){j.t-=dt;if(j.t<=0){if(m.st=='scatter')this.hcLunge(m,j,en);else j.st='ring'}}",
    "else if(j.st=='rest'){j.t-=dt;if(j.t<=0){if(m.st=='scatter'){if(j.rep>0)this.hcLunge(m,j,en)}else j.st='ring'}}")
# 쌍 스케줄러: 쌍의 두 턱이 쉬고 있으면 덮치고, 쌍마다 다른 텀
rep("  case 'scatter':if(m.tm<=0){",
    "  case 'scatter':if(m.pt&&m.tm>.9)for(let k=0;k<3;k++){m.pt[k]-=dt;const A=m.jw[k],B=m.jw[k+3];if(m.pt[k]<=0&&[A,B].every(j=>j.st=='rest'&&j.t<=0&&!(j.rep>0))){const lvl=(m.df>=2.1?2:m.df>=1.5?1:0)+(m.hp<m.mh*.5?1:0);m.pt[k]=[1.8,2.4,2-.2*lvl][k]*en;this.hcPair(m,k,en)}}\n   if(m.tm<=0){")
a = " // 턱마다 톱날 이빨 한 쌍(픽셀):"
if s.count(a) != 1: raise SystemExit('anchor hcTeeth')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
