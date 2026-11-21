#!/usr/bin/env python3
"""v55 -> v56: 기본 공격(물기) 연출을 S3 '이빨 자국'으로 — 효과 4겹(흰 부채꼴·물결 호·잔상/할퀴기 호·몸 돌진) 삭제
본체: dev/v56/v56_methods.js (brDraw 교체 + bmAdd) · 사용: python3 dev/v56/v56_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v56_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
def cut(a, b, new):
    global s
    if s.count(a) != 1: raise SystemExit('cut start: ' + a[:60])
    i = s.index(a); j = s.index(b, i)
    s = s[:i] + new + s[j:]
rep('<title>공허 기생충 v55</title>', '<title>공허 기생충 v56</title>')
rep("window.VP_VER='v55';", "window.VP_VER='v56';")
# 물기 동작 0.34초 → 0.24초 (섭취 등 다른 모션은 그대로)
rep("moStart(k){this.mo={k,t:0,dur:.34}}", "moStart(k){this.mo={k,t:0,dur:k=='bite'?.24:.34}}")
# 몸 모션: S자 움츠림·14px 돌진·잔상·할퀴기 호 삭제 → 송곳니가 다무는 순간 머리만 4px 콕
cut("  if(q>=0){ // 물기: 움츠렸다(S자)", "  else if(F){",
    "  if(q>=0){ // 물기 (v56 S3): 몸은 그대로, 송곳니가 다무는 순간 머리만 4px 콕\n   L=q<.4?0:q<.6?4*(q-.4)/.2:4*(1-(q-.6)/.4)}\n")
# 물기 효과 그림: 부채꼴 + 물결 호 → 송곳니 + 이빨 자국
cut(" // 물기 효과: 부채꼴 + 입에서 퍼지는 물결 호", " // ===== v53: 송곳니 한 쌍", M + '\n')
# 일반 몬스터(중간 보스 포함)를 물어 피해를 주면 이빨 자국
rep("dg*=this.dmul(m,1);m.hp-=dg;if(this.lin.p>=2)this.en=Math.min(this.emax,this.en+dg*.15);m.spr.setTintFill(0xffffff);",
    "dg*=this.dmul(m,1);m.hp-=dg;if(this.lin.p>=2)this.en=Math.min(this.emax,this.en+dg*.15);m.spr.setTintFill(0xffffff);this.bmAdd(m,an);")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
