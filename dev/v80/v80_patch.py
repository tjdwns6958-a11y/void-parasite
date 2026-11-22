#!/usr/bin/env python3
"""v79 -> v80: 허기의 왕관 난이도 조절 — 회피 봇 3판 중 1승 이상 (쌍 공격 텀 늘림 · 한 쌍의 두 턱 0.25초 차 · 돌진 예고 길게 · 돌진 피해 11→8)
값은 환경 변수 PT/PS/AIM/LD/CD/PG로 바꿔 시험할 수 있음(기본값 = 채택안 d)
사용: python3 dev/v80/v80_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
T = dict(PT=os.environ.get('PT', '2.6,3.2,2.8'), PS=os.environ.get('PS', '.2'), AIM=os.environ.get('AIM', '.65'), LD=os.environ.get('LD', '8'), CD=os.environ.get('CD', '5'), PG=os.environ.get('PG', '.25'))
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v79</title>', '<title>공허 기생충 v80</title>')
rep("window.VP_VER='v79';", "window.VP_VER='v80';")
# 쌍 공격 텀 (1쌍 / 2쌍 / 3쌍 − 난이도 단계마다)
rep("m.pt[k]=[1.8,2.4,2-.2*lvl][k]*en;", "m.pt[k]=[%s][k]*en-(k==2?%s*lvl:0);" % (T['PT'], T['PS']))
# 돌진 예고(겨누기) 시간: 1쌍 .5 → AIM, 2쌍 .55 → AIM+.05, 3쌍 .45/.36 → +.05
rep("v=500,t=.5*en;", "v=500,t=%s*en;" % T['AIM'])
rep("v=640;t=.55*en}", "v=640;t=(%s+.05)*en}" % T['AIM'])
rep("t=(lvl>=2?.36:.45)*en;", "t=(lvl>=2?.41:.5)*en;")
# 턱 피해: 돌진 11 → LD, 그 밖 5 → CD
rep("this.hurt(D(j.st=='lunge'?11:5),'허기의 턱',m)", "this.hurt(D(j.st=='lunge'?%s:%s),'허기의 턱',m)" % (T['LD'], T['CD']))
# 한 쌍의 두 턱 사이 텀: 둘째 턱은 PG초 늦게 덮침 (돌진만, 엇갈림은 동시)
if T['PG'] != '0':
    rep("this.hcLunge(m,A,en);this.hcLunge(m,B,en)}", "this.hcLunge(m,A,en);this.hcLunge(m,B,en);B.t+=%s;this.tel[this.tel.length-1].t+=%s;this.tel[this.tel.length-1].t0+=%s}" % (T['PG'],T['PG'],T['PG']))
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s), T)
