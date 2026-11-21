#!/usr/bin/env python3
"""v58 -> v59: 계통별 기본 공격 — 갑각 몸통 박치기(충격 고리 + 수정 파편) · 공허 검은 구체 뱉기(원거리)
본체: dev/v59/v59_methods.js (v56 bmAdd/brDraw 교체) · 사용: python3 dev/v59/v59_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v59_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v58</title>', '<title>공허 기생충 v59</title>')
rep("window.VP_VER='v58';", "window.VP_VER='v59';")
# 물기 시작: 계통 기록
rep("this.moStart('bite');this.brFx={t:0,x:p.x,y:p.y,an};", "this.moStart('bite');this.brFx={t:0,x:p.x,y:p.y,an,k:this.domK()};this.mo.bk=this.brFx.k;")
# 물기 끝: 공허면 구체, 아니면 예전처럼 빗나간 물기 → 공허 침(공허 2단계 이상)
rep("if(!hit&&this.lin.v>=2)this.spit()}", "if(this.brFx&&this.brFx.k=='v')this.orbShoot(hit);else if(!hit&&this.lin.v>=2)this.spit()}")
# 몸 모션: 갑각 = 움츠렸다 7px 들이받기 · 공허 = 머리 3px 뒤로 젖힘(뱉는 반동) · 그 밖 = 4px 콕
rep("   L=q<.4?0:q<.6?4*(q-.4)/.2:4*(1-(q-.6)/.4)}", "   L=mo.bk=='c'?(q<.3?-2*q/.3:q<.5?-2+9*(q-.3)/.2:7*(1-(q-.5)/.5)):mo.bk=='v'?(q<.3?-3*q/.3:-3*(1-(q-.3)/.7)):(q<.4?0:q<.6?4*(q-.4)/.2:4*(1-(q-.6)/.4))}")
# 포식 턱은 포식이 가장 높을 때만 물기에 맞춰 움직임
rep("const E=this.brFx,q=E?Math.min(1,E.t/.24):-1,", "const E=this.brFx&&this.brFx.k=='p'?this.brFx:null,q=E?Math.min(1,E.t/.24):-1,")
# 투사체: 공허 구체는 색·피해·둔화 따로 + 맞으면 검은 파열, 큰 보스에게는 절반
rep("const b=this.add.circle(q.x,q.y,1.5,0xc070ff,.6)", "const b=this.add.circle(q.x,q.y,1.5,q.tc||0xc070ff,.6)")
rep("{m.slw=1.5;this.dmgM(m,(m.k=='sw'?(this.lin.v>=3?1.6:1.4):1)*this.sdmg(),q.mir);q.t=0;const r=this.add.circle(q.x,q.y,14,0xc070ff,.35)",
    "{if(!q.ns)m.slw=1.5;this.dmgM(m,q.dmg!=null?q.dmg*(m.mb||m.k=='sw'||m.k=='em'||m.k=='rw'?.5:1):(m.k=='sw'?(this.lin.v>=3?1.6:1.4):1)*this.sdmg(),q.mir);q.t=0;if(q.dk)this.orbPop(q.x,q.y);const r=this.add.circle(q.x,q.y,14,q.bc||0xc070ff,.35)")
# 진화 나무 설명
rep("['결정 비늘','받는 피해 −10% · 맞으면 받은 피해의 40%를 공격자에게 반사']", "['결정 비늘','받는 피해 −10% · 맞으면 받은 피해의 40%를 공격자에게 반사 · 갑각이 가장 높으면 공격이 몸통 박치기']")
rep("['공허 감각','숨은 위협이 보인다(땅속 땅울음, 매복한 낫그늘, 이웃 방 몬스터 수) · 공허 정수를 얻을 때마다 체력 +8']", "['공허 감각','숨은 위협이 보인다(땅속 땅울음, 매복한 낫그늘, 이웃 방 몬스터 수) · 공허 정수를 얻을 때마다 체력 +8 · 공허가 가장 높으면 공격이 검은 구체 뱉기(원거리)']")
rep("['공허 침','60~200px 거리의 적에게 버튼을 누르면 공허 침 발사 (피해 8 · 둔화) · 산호는 한 방에 녹인다']", "['공허 침','검은 구체가 앞쪽 적을 따라가고 맞으면 둔화 (공허가 가장 높지 않으면 빗나간 물기 대신 공허 침, 피해 8) · 산호는 한 방에 녹인다']")
# v56 bmAdd/brDraw → v59
a = " bmAdd(m,an){"; b = " // ===== v58: 포식 턱"
if s.count(a) != 1 or s.count(b) != 1: raise SystemExit('v56 block')
i = s.index(a); j = s.index(b, i); s = s[:i] + M + '\n' + s[j:]
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
