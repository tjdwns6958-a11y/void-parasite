#!/usr/bin/env python3
"""v87 -> v88: 공허 중간 보스
1) 1페이즈 눈이 맞을수록 빨개짐 — 3장(보통 obsE · 핏발 obsE1 · 새빨감 obsE2), 체력 100%→60% 구간을 셋으로 나눠 바뀔 때 살짝 붉게 번쩍
2) 2페이즈 등장: 눈이 틈 앞으로 돌아가며 세 번 깜빡이고 감긴 채 사라짐 → 틈이 크게 열리며 나선 껍데기가 빠져나옴
3) '눈이 떨린다…' · '눈은 처음부터…' 대사 지움 (이름만 조용히 바뀜)
본체: dev/v88/v88_methods.js · 사용: python3 dev/v88/v88_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v88_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v87</title>', '<title>공허 기생충 v88</title>')
rep("window.VP_VER='v87';", "window.VP_VER='v88';")
rep("obsNTex(){this.vdOrbTex();for(const k of['N','Nc']){", "obsNTex(){this.vdOrbTex();this.obsEyeTex();for(const k of['N','Nc']){")
rep("m.cd-=dt;m.tm-=dt;if(m.ph!=2&&m.hp<=m.mh*.6)this.obsRev(m);", "m.cd-=dt;m.tm-=dt;this.obsEyeSet(m);if(m.ph!=2&&m.hp<=m.mh*.6)this.obsRev(m);")
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
