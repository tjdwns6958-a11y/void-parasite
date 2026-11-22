#!/usr/bin/env python3
"""v111 -> v112 (정동 집게왕)
1) 정정: 떨어진 종유석(중간·큰)은 다시 수정 기둥이 됨(v110처럼, 최대 5) — 단 그 기둥이 돌진에 부서질 때 파편은 STLP(20%) 확률로만(원래 기둥은 늘 2개).
2) 돌진: 수정 방패에 막혀 기절하지 않았거나 벽에 부딪혔으면 다시 조준해 최대 3번 더 돌진(첫 돌진 포함 최대 4번 · 다시 돌진 예고 0.45초).
   + 버그: 벽 가까이에서 돌진을 막으면 기절이 '휘청'으로 덮어써지던 것 고침.
3) 씹기: 예고 0.45 → 0.7초 · 입을 천천히 크게 벌렸다가 콱 닫힘(번쩍·부스러기·짧은 흔들림) → 문 채로 0.25초 → 한 번 더 우물 (`gdkSnap`/`gdkBiteFx`/`gdkBiteHit`) · 피해 11 → 12.
본체: dev/v112/v112_methods.js · 사용: python3 dev/v112/v112_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v112_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v111</title>', '<title>공허 기생충 v112</title>')
rep("window.VP_VER='v111';", "window.VP_VER='v112';")
rep("\nconst CRR=", "\nconst STLP=.2;\nconst CRR=")
# 1) 종유석 → 수정 기둥 (v110 그대로) · 그 기둥의 파편은 20%
rep("if(sz>=1.3)this.cameras.main.shake(70,.0016);const p=this.pl;\n  for(let i=0;i<Math.round(6*sz);i++){const a=Math.random()*6.283,b=this.add.rectangle(x,y,3,6,i%3?0xd8d0f0:0x9fd8ff).setRotation(a).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*26*sz,y:y+Math.sin(a)*16*sz,alpha:0,angle:160,duration:380,onComplete:()=>b.destroy()})}\n}",
    "if(sz>=1.3)this.cameras.main.shake(70,.0016);const p=this.pl;\n  for(let i=0;i<Math.round(6*sz);i++){const a=Math.random()*6.283,b=this.add.rectangle(x,y,3,6,i%3?0xd8d0f0:0x9fd8ff).setRotation(a).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*26*sz,y:y+Math.sin(a)*16*sz,alpha:0,angle:160,duration:380,onComplete:()=>b.destroy()})}\n  if(sz>=1&&Math.hypot(p.x-x,p.y-y)>34*sz&&!m.pt.some(q=>q.on&&Math.hypot(q.x-x,q.y-y)<52)){const T=m.pt.filter(q=>q.tmp&&q.on&&!q.dead);if(T.length>=5){const q0=T[0];q0.dead=1;q0.on=0;const oo=q0.o;this.tweens.add({targets:oo,alpha:0,scaleY:.15,duration:300,onComplete:()=>oo.destroy()})}const s0=.8*Math.min(1.2,sz),o=this.add.image(x,y+14,'gdkP').setOrigin(.5,.86).setDepth(8.4).setTintFill(0xffffff).setScale(s0,.2);this.tweens.add({targets:o,scaleY:s0,duration:220,ease:'Back.out',onComplete:()=>o.clearTint()});m.pt.push({x,y,hp:1,on:1,rt:0,tmp:1,life:1e9,o})}}")
rep("ease:'Quad.out',onComplete:()=>o.destroy()})}\n  this.gdkShardFly(q.x,q.y,2)}", "ease:'Quad.out',onComplete:()=>o.destroy()})}\n  if(!q.tmp||Math.random()<STLP)this.gdkShardFly(q.x,q.y,2)}")
rep("수정으로 막으면 기절한다. 체력이", "수정으로 막으면 기절한다. 떨어진 종유석은 새 수정 기둥이 된다. 체력이")
# 2) 다시 돌진 최대 3번
rep("this.gdkCharge(m,en,P2?1:0)", "this.gdkCharge(m,en,3)", 2)
# 돌진이 수정에 막혀 기절하면 그 프레임의 벽·끝 처리로 기절이 덮어써지지 않게(벽 가까이서 막으면 '휘청'으로 바뀌던 버그)
rep("this.hurt(D(P2?27:24),'정동 집게왕의 돌진',m);if(!m.on)return;", "this.hurt(D(P2?27:24),'정동 집게왕의 돌진',m);if(!m.on)return;if(m.st!='ch')break;")
# 3) 씹기 (gdkSnap 덮어씀) · 쓰러짐 안내
rep("'집게왕의 씹기':'집게왕 앞에 바짝 붙어 있으면 입으로 씹는다 — 앞쪽 붉은 부채꼴 밖으로',", "'집게왕의 씹기':'집게왕이 입을 크게 벌리면 곧 콱 문다 — 앞쪽 붉은 부채꼴 밖으로',")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
