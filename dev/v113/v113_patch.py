#!/usr/bin/env python3
"""v112 -> v113
1) 갑각 3단계(갑각이 가장 높을 때의 박치기): 재사용 0.6 → C3CD(1.1초) — 공격은 보조, 반사가 주된 피해.
   대신 수정 반사를 3단계에서 최대 체력 3% → C3P(5%).
2) 정동 집게왕 난이도: 사람처럼 노는 봇(SMART: 파편 먹고 · 수정으로 돌진을 받아 막아 기절 · 기절 중 물기)으로 여러 판 돌려 조정 — 값은 아래 GDK_* 상수.
사용: python3 dev/v113/v113_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
# ---- 조정값 (아래에서 봇으로 정함) ----
C3CD = '1.1'; C3P = '.05'
GDK = dict(HPM='1.35', STUNM='1', DMGM='1.1')
for a in sys.argv[2:]:
    k, v = a.split('='); GDK[k] = v
rep('<title>공허 기생충 v112</title>', '<title>공허 기생충 v113</title>')
rep("window.VP_VER='v112';", "window.VP_VER='v113';")
rep("\nconst CRR=", "\nconst C3CD="+C3CD+",C3P="+C3P+",GDK_HPM="+GDK['HPM']+",GDK_STUNM="+GDK['STUNM']+",GDK_DMGM="+GDK['DMGM']+";\nconst CRR=")
# 1) 갑각 3단계 박치기 느리게 · 수정 반사 5%
rep("this.bdmg=b0;this.slamS=0;this.bcd=C.BITE.cd;", "this.bdmg=b0;this.slamS=0;this.bcd=this.lin.c>=3?C3CD:C.BITE.cd;")
rep("const CP=window.__vpCP??CRP;", "const CP=window.__vpCP??(L.c>=3?C3P:CRP);")
rep("['공명 갑각','반사 40% → 75% · 물기 피해 +10% ·", "['공명 갑각','반사 40% → 75% · 수정 반사 최대 체력 3% → 5% · 대신 박치기가 느려짐(재사용 '+C3CD+'초) ·")
# 2) 정동 집게왕 난이도 손잡이: 체력 · 기절 시간 · 피해
rep("E('gdk',400,150,Math.round(490+56*plv),", "E('gdk',400,150,Math.round((490+56*plv)*GDK_HPM),")
rep("m.st='stun';m.tm=m.ph==2?2.4:3;", "m.st='stun';m.tm=(m.ph==2?2.4:3)*GDK_STUNM;")
rep("gdkAI(m,dt,p){this.vShk();const now=this.time.now,D=v=>Math.round(v*m.df),", "gdkAI(m,dt,p){this.vShk();const now=this.time.now,D=v=>Math.round(v*m.df*GDK_DMGM),")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s), GDK)
