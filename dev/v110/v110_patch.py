#!/usr/bin/env python3
"""v109 -> v110 (정동 집게왕 개편)
1) 돌진: 앞의 수정 기둥을 부수며 그대로 지나감(기둥에 박혀 기절 없음) · 부서진 기둥에서 파편 2개(`gdkSmash`) · 기둥 앞에서 비켜 가던 동작 없앰.
   종유석: 중간·큰 것은 땅에 박혀 수정 기둥이 됨(사라지지 않음, 최대 5개 — 넘으면 오래된 것부터 무너짐). 원래 기둥은 부서지면 18초 뒤 다시 자람.
2) 기절: 플레이어의 수정 방패에 몸 공격(돌진 · 씹기 · 큰 집게 · 내리찍기)이 막히면 기절(1페이즈 2.2초 · 2페이즈 1.6초, 3.5초 안에는 다시 안 걸림) — `gdkStunB`.
3) 2페이즈 순서의 수정 지뢰 → 큰 집게 휘두르기(반지름 250 · 약 130° 부채꼴, 예고 0.85초, 피해 24). 작은 집게 → 입으로 씹기(같은 범위 · 턱 두 개가 두 번 씹는 모션 · 부스러기).
본체: dev/v110/v110_methods.js · 사용: python3 dev/v110/v110_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v110_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v109</title>', '<title>공허 기생충 v110</title>')
rep("window.VP_VER='v109';", "window.VP_VER='v110';")
# 1) 돌진이 기둥을 부숨 · 비켜 가기 없앰
rep("const pq=m.pt.find(q=>q.on&&Math.hypot(q.x-m.x,q.y-m.y)<70);\n    if(pq){this.gdkStun(m,pq,P2);break}", "for(const q of m.pt)if(q.on&&Math.hypot(q.x-m.x,q.y-m.y)<70)this.gdkSmash(m,q);")
rep("if(!P2&&inLine&&!m.dodged&&Math.random()<.35){m.dodged=1;m.cd=.5;m.x=Phaser.Math.Clamp(m.x+(Math.random()<.5?-1:1)*40,110,690)}else{m.dodged=0;m.ci=0;m.cyN=(m.cyN||0)+1;this.gdkCharge(m,en,P2?1:0)}", "m.ci=0;m.cyN=(m.cyN||0)+1;this.gdkCharge(m,en,P2?1:0)")
# 종유석 → 고정된 수정 기둥(최대 5)
rep("if(sz>=1&&m.pt.filter(q=>q.tmp&&q.on).length<4&&Math.hypot(p.x-x,p.y-y)>34*sz&&!m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<52)){const s0=.8*Math.min(1.2,sz),o=this.add.image(x,y+14,'gdkP').setOrigin(.5,.86).setDepth(8.4).setTint(0xd8d0f0).setScale(s0,.2);this.tweens.add({targets:o,scaleY:s0,duration:160,ease:'Back.out'});m.pt.push({x,y,hp:1,on:1,rt:0,tmp:1,life:9,o})}",
    "if(sz>=1&&Math.hypot(p.x-x,p.y-y)>34*sz&&!m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<52)){const T=m.pt.filter(q=>q.tmp&&q.on&&!q.dead);if(T.length>=5){const q0=T[0];q0.dead=1;q0.on=0;const oo=q0.o;this.tweens.add({targets:oo,alpha:0,scaleY:.15,duration:300,onComplete:()=>oo.destroy()})}const s0=.8*Math.min(1.2,sz),o=this.add.image(x,y+14,'gdkP').setOrigin(.5,.86).setDepth(8.4).setTintFill(0xffffff).setScale(s0,.2);this.tweens.add({targets:o,scaleY:s0,duration:220,ease:'Back.out',onComplete:()=>o.clearTint()});m.pt.push({x,y,hp:1,on:1,rt:0,tmp:1,life:1e9,o})}")
# 2) 수정 방패에 막히면 기절
rep("if(real>=.5)this.dtx(m.x,m.y-18,'반사 '+Math.round(real),'#9fd8ff');if(kd&&L.c>=3&&this.cry<CRM)this.cry++}}\n", "if(real>=.5)this.dtx(m.x,m.y-18,'반사 '+Math.round(real),'#9fd8ff');if(kd&&L.c>=3&&this.cry<CRM)this.cry++}\n  if(phy&&m&&m.on&&m.k=='gdk')this.gdkStunB(m)}\n")
# 3) 지뢰 → 큰 집게 휘두르기
rep("const CY0=P2?['egg','bubble','climb','plant']", "const CY0=P2?['egg','bubble','climb','sweep']")
rep("       else if(step=='plant')this.gdkPlant(m);\n", "       else if(step=='sweep')this.gdkSweep(m,D,en);\n")
rep("  case 'snap':if(m.tm<=0){m.st='idle';m.cd=.55*en}break;", "  case 'snap':if(m.tm<=0){m.st='idle';m.cd=.55*en}break;\n  case 'swW':sy=-Math.min(4,(.85-m.tm)*6);if(m.tm<=0){m.st='swp';m.tm=.35}break;\n  case 'swp':if(m.tm<=0){m.st='idle';m.cd=.9*en}break;")
rep("const up=m.st=='slW'||(m.st=='sl'&&m.tm>.3)||m.st=='thW'||m.st=='call'||m.st=='plW',", "const up=m.st=='slW'||(m.st=='sl'&&m.tm>.3)||m.st=='thW'||m.st=='call'||m.st=='plW'||m.st=='swW',")
# 문구
rep("'작은 집게':'집게왕에게 바짝 붙어 있으면 작은 집게가 부채꼴로 휩쓴다',", "'작은 집게':'집게왕에게 바짝 붙어 있으면 작은 집게가 부채꼴로 휩쓴다','집게왕의 씹기':'집게왕 앞에 바짝 붙어 있으면 입으로 씹는다 — 앞쪽 붉은 부채꼴 밖으로','큰 집게 휘두르기':'집게를 높이 들면 넓은 붉은 부채꼴 — 멀리 물러나거나 집게왕 등 뒤로',")
rep("'정동 집게왕의 돌진':'넓은 붉은 띠가 깔리면 옆으로 — 수정 기둥 뒤에 서 있으면 돌진이 기둥에 박혀 기절한다',", "'정동 집게왕의 돌진':'넓은 붉은 띠가 깔리면 옆으로 — 등에 수정이 있으면 돌진을 막아 기절시킬 수 있다(부서진 기둥의 파편을 먹을 것)',")
rep("'정동 갑주가 막는다 — 돌진을 수정 기둥에 부딪히게'", "'정동 갑주가 막는다 — 수정으로 돌진을 막아 기절시킬 것'")
rep("d:'등의 정동이 갑주처럼 단단해 물어도 잘 들어가지 않는다 — 돌진을 수정 기둥에 부딪히게 하면 기절한다. 체력이 반으로 줄면 정동이 깨지고 바닥에 수정 봉오리를 심는다 — 봉오리 뒤에 서면 돌진하다 밟고 스스로 맞는다.'",
    "d:'등의 정동이 갑주처럼 단단해 물어도 잘 들어가지 않는다 — 돌진은 수정 기둥을 부수며 달려오고, 부서진 기둥의 파편을 먹어 등에 수정을 채운 뒤 몸 공격을 수정으로 막으면 기절한다. 떨어진 종유석은 새 수정 기둥이 된다. 체력이 반으로 줄면 큰 집게를 넓게 휘두른다.'")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
