#!/usr/bin/env python3
"""v90 -> v91: 정동 집게왕 — 벽 오르기 → 종유석 대량 낙하 → 플레이어 위로 떨어지기 (정동 파편 비 자리를 대신함)
본체: dev/v91/v91_methods.js · 사용: python3 dev/v91/v91_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v91_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v90</title>', '<title>공허 기생충 v91</title>')
rep("window.VP_VER='v90';", "window.VP_VER='v91';")
# 패턴 고르기: 정동 파편 비 대신 벽 오르기 (두 페이즈 모두, 16초에 한 번)
rep("     else if(!P2&&!(m.rnc>now)&&r>.8)this.gdkRain(m,D);", "     else if(!(m.clc>now)&&r>.74)this.gdkClimb(m);")
# 상태 처리
rep("  switch(m.st){\n  case 'idle':{const sp=P2?70:46,", "  if(this.gdkClimbU(m,dt,p,D)){}else switch(m.st){\n  case 'idle':{const sp=P2?70:46,")
rep("if(m.st!='stun')S.clearTint();else S.setTint(now%300<150?0xfff0c0:0xffffff)}", "if(m.st!='stun')S.clearTint();else S.setTint(now%300<150?0xfff0c0:0xffffff);this.gdkClimbFx(m,S,g,now)}")
# 2페이즈 전환은 땅에 있을 때만 (idle에서만 — 그대로) · 벽·천장에서는 피해 없음
rep("if(m.k=='gdk'){if(m.st=='stun')return 1.15;", "if(m.k=='gdk'&&m.air){const nw=this.time.now;if(!(m.wkT>nw)){m.wkT=nw+1400;this.dtx(m.x,90,'천장에 매달려 있다 — 그림자를 피할 것','#c8b0ff')}return 0}if(m.k=='gdk'){if(m.st=='stun')return 1.15;")
# 임시 기둥(종유석): 수명 · 부서지면 사라짐
rep("  // 수정 기둥: 다시 자람 · 금 · 플레이어 밀어내기\n", "  // 수정 기둥: 다시 자람 · 금 · 플레이어 밀어내기\n  for(const q of m.pt)if(q.tmp&&!q.dead&&q.on){q.life-=dt;if(q.life<=0){q.dead=1;q.on=0;const o=q.o;this.tweens.add({targets:o,alpha:0,scaleY:.15,duration:300,onComplete:()=>o.destroy()})}}if(m.pt.some(q=>q.dead))m.pt=m.pt.filter(q=>!q.dead);\n")
rep("  if(q.hp<=0){q.on=0;q.rt=18;q.o.setVisible(false);", "  if(q.hp<=0){q.on=0;q.rt=18;q.o.setVisible(false);if(q.tmp){q.dead=1;q.o.destroy()}")
# 도움말
rep("'구르는 정동':'굴러오는 돌알", "'떨어지는 종유석':'집게왕이 천장에 매달리면 바닥의 붉은 그림자 원을 피할 것 — 떨어진 종유석은 잠시 기둥이 된다','떨어지는 집게왕':'종유석이 그치면 집게왕이 내 위로 떨어진다 — 큰 그림자 밖으로, 착지 직후가 빈틈','구르는 정동':'굴러오는 돌알")
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
