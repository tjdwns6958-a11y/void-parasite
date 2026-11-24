#!/usr/bin/env python3
"""v114 -> v115
1) 엔딩 직전 화면이 작아지던 버그: 엔딩 연출의 카메라 zoomTo(1.12 / 1.1 / 1)가 렌더링 배율(VZ, 폰에서 2~3)을 무시 → 배율을 곱함.
2) 관찰자 2페이즈 탄막: 나선(출렁이는 회전 · 중간에 방향 뒤집힘 · 곧은 빠른 구체와 휘는 느린 구체가 번갈아 · 체력 50% 아래 4갈래) + 0.85초마다 나를 겨눈 느린 부채꼴 셋 · 고리는 꼬인 두 겹(14발). 구체가 휘도록 mbb에 각속도 av 추가.
3) 관찰자 촉수: 잡기가 끝날 때 끊지 못한 촉수는 남아서 다음 패턴이 끝날 때까지 위에서 내려찍음(0.75초 붉은 원, 피해 16) · 내려찍고 0.55초 누워 있는 동안 물거나 쏘면 끊김.
4) 대시 재사용 2.5 → DSHCD(4초).
5) 갑각 보스(MBCAR, 지금은 정동 집게왕): 기본 공격은 CAR_BASE(15%)만 들어가고, 기절 중에는 CAR_STUN(200%) — 기믹(수정 방패로 막아 기절 · 반사)으로 깨는 싸움. 앞으로 만들 갑각 보스는 MBCAR에 이름만 넣으면 됨.
본체: dev/v115/v115_methods.js · 사용: python3 dev/v115/v115_patch.py index.html [키=값]"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v115_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
K = dict(DSHCD='4', CAR_BASE='.15', CAR_STUN='2', GDK_HPM='')
for a in sys.argv[2:]:
    k, v = a.split('='); K[k] = v
rep('<title>공허 기생충 v114</title>', '<title>공허 기생충 v115</title>')
rep("window.VP_VER='v114';", "window.VP_VER='v115';")
rep("\nconst CRR=", "\nconst DSHCD="+K['DSHCD']+",CAR_BASE="+K['CAR_BASE']+",CAR_STUN="+K['CAR_STUN']+",MBCAR={gdk:1};\nconst CRR=")
if K['GDK_HPM']:
    import re
    s, n = re.subn(r"GDK_HPM=[0-9.]+,", "GDK_HPM="+K['GDK_HPM']+",", s, count=1)
    if n != 1: raise SystemExit('GDK_HPM')
# 1) 엔딩 줌
for z in ["zoomTo(1,1300,'Sine.easeInOut')", "zoomTo(1,300)", "zoomTo(1,900,'Sine.easeInOut')", "zoomTo(1.1,2200,'Sine.easeInOut')", "zoomTo(1.12,5200,'Sine.easeInOut')"]:
    rep(z, z.replace("zoomTo(", "zoomTo(VZ*"))
# 2) 휘는 구체 · 나선 · 고리
rep("q.x+=q.vx*dt;q.y+=q.vy*dt;q.o.setPosition(q.x,q.y).setRotation(Math.atan2(q.vy,q.vx));", "if(q.av){const qa=Math.atan2(q.vy,q.vx)+q.av*dt,qv=Math.hypot(q.vx,q.vy);q.vx=Math.cos(qa)*qv;q.vy=Math.sin(qa)*qv}q.x+=q.vx*dt;q.y+=q.vy*dt;q.o.setPosition(q.x,q.y).setRotation(Math.atan2(q.vy,q.vx));")
rep("case 'spiral':m.st2-=dt;if(m.st2<=0){m.st2=.11;m.sa+=.38*(m.fl);for(const k of[0,2.094,4.189]){this.mbShot(o.ax,o.ay,m.sa+k,190,D(16),'나선 구체',m,'vdOrb')}}if(m.tm<=0){m.st='idle';m.cd=.8*en}break;",
    "case 'spiral':this.obsSpiralU(m,o,dt,D,p);if(m.tm<=0){m.st='idle';m.cd=.8*en}break;")
rep("else if(r<.8){m.st='spW';m.tm=.5;m.sa=Math.random()*6.283;m.st2=0}", "else if(r<.8){m.st='spW';m.tm=.5;m.sa=Math.random()*6.283;m.st2=0;m.sp2=0;m.sf=.4;m.vn=0;m.sseed=Math.random()*6.283}")
# 3) 끊지 못한 촉수
rep("else{m.st='idle';m.cd=.9*en}m.tn=null}break;", "else{m.st='idle';m.cd=.9*en;const Lq=m.tn.filter(q=>q.on);if(Lq.length)this.obsLingerStart(m,Lq)}m.tn=null}break;")
rep("  if(m.st=='rev'){this.obsRevU(m,dt,p);return}\n", "  if(m.st=='rev'){this.obsRevU(m,dt,p);return}\n  this.obsLingerU(m,dt,this.obsNOff(m),g,D,p);\n")
rep("'공허 촉수':", "'촉수 내려찍기':'끊지 못한 촉수가 남아 위에서 내려찍는다 — 붉은 원 밖으로 · 내려찍은 뒤 누워 있을 때 물거나 쏘면 끊긴다','공허 촉수':")
# 4) 대시
rep("this.dshP=0;this.dshCd=2.5;", "this.dshP=0;this.dshCd=DSHCD;")
rep("cd/2.5", "cd/DSHCD")
# 5) 갑각 보스
rep("if(m.k=='gdk'){if(m.st=='stun')return 1.5;if(m.st=='land')return 1.3;if(m.ph==2)return m.st=='rip'?.5:.7;const now=this.time.now;if(!(m.wkT>now)){m.wkT=now+1400;this.dtx(m.x,m.y-62,'정동 갑주가 막는다 — 수정으로 돌진을 막아 기절시킬 것','#9fd8ff')}return .25}",
    "if(MBCAR[m.k]){if(m.st=='stun')return CAR_STUN;const now=this.time.now;if(!(m.wkT>now)){m.wkT=now+1400;this.dtx(m.x,m.y-62,'갑주가 막는다 — 수정으로 막아 기절시킬 것','#9fd8ff')}return CAR_BASE}")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s), K)
