#!/usr/bin/env python3
"""v113 -> v114: 중간 보스 균형(30판 시뮬레이션 기준) + 게임 전체 점검 수정
- 손잡이: HCR_HPM/HCR_DMGM(허기의 왕관) · GDK_HPM/GDK_DMGM(정동 집게왕) · OBS_HPM/OBS_DMGM(틈 너머의 관찰자) — 체력 · 받는 피해 배율
사용: python3 dev/v114/v114_patch.py index.html [키=값 ...]"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
K = dict(SW_HPM='1', HCR_HPM='1.1', HCR_DMGM='1.05', GDK_HPM='1.2', GDK_DMGM='1.05', OBS_HPM='.9', OBS_DMGM='.85')
for a in sys.argv[2:]:
    k, v = a.split('='); K[k] = v
rep('<title>공허 기생충 v113</title>', '<title>공허 기생충 v114</title>')
rep("window.VP_VER='v113';", "window.VP_VER='v114';")
rep("const C3CD=1.1,C3P=.05,GDK_HPM=1.35,GDK_STUNM=1,GDK_DMGM=1.1;", "const C3CD=1.1,C3P=.05,GDK_HPM="+K['GDK_HPM']+",GDK_STUNM=1,GDK_DMGM="+K['GDK_DMGM']+",HCR_HPM="+K['HCR_HPM']+",HCR_DMGM="+K['HCR_DMGM']+",OBS_HPM="+K['OBS_HPM']+",OBS_DMGM="+K['OBS_DMGM']+",SW_HPM="+K['SW_HPM']+";")
rep("E('hcr',400,160,Math.round(380+42*plv)", "E('hcr',400,160,Math.round((380+42*plv)*HCR_HPM)")
rep("E('obs',400,116,Math.round(460+50*plv)", "E('obs',400,116,Math.round((460+50*plv)*OBS_HPM)")
rep("hcrAI(m,dt,p){const now=this.time.now,gr=m.gr||0,bs=1+.12*gr,D=v=>Math.round(v*m.df*(1+.15*gr))", "hcrAI(m,dt,p){const now=this.time.now,gr=m.gr||0,bs=1+.12*gr,D=v=>Math.round(v*m.df*(1+.15*gr)*HCR_DMGM)")
rep(" obsAI(m,dt,p){this.vShk();const now=this.time.now,D=v=>Math.round(v*m.df),", " obsAI(m,dt,p){this.vShk();const now=this.time.now,D=v=>Math.round(v*m.df*OBS_DMGM),")
rep(" obsN2(m,dt,p){const now=this.time.now,D=v=>Math.round(v*m.df),", " obsN2(m,dt,p){const now=this.time.now,D=v=>Math.round(v*m.df*OBS_DMGM),")
rep("const lv=Math.min(18,this.plv+2),MH=Math.round(760+84*this.plv);", "const lv=Math.min(18,this.plv+2),MH=Math.round((760+84*this.plv)*SW_HPM);")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s), K)
