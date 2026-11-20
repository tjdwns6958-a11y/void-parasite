#!/usr/bin/env python3
"""v36 -> v37: 엔딩 연출 — 공허에 차원이 열린다 (dimOpen). 엔딩 선택 화면은 열린 틈 위에 반투명하게.
본체: dev/v37/v37_methods.js · 사용: python3 dev/v37/v37_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v37_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v36</title>', '<title>공허 기생충 v37</title>')
rep("window.VP_VER='v36';", "window.VP_VER='v37';")
# 보스 처치 → 1.5초 뒤 차원이 열리는 연출 → 엔딩 선택
rep("  const rf=this.add.image(400,170,'rift').setDepth(5.5).setTint(0xffffff).setScale(.3).setAlpha(0);this.tweens.add({targets:rf,alpha:1,scaleX:2.2,scaleY:3,delay:900,duration:1600,ease:'Sine.out'});this.cameras.main.shake(600,.01);\n",
    "  this.cameras.main.shake(600,.01);\n")
rep("this.time.delayedCall(2800,()=>{if(!this.over)this.ending('흩어진 무리가 빠져나간 둥지 한가운데에, 바깥으로 이어지는 틈이 열렸다.')})}",
    "this.time.delayedCall(1700,()=>{if(!this.over)this.dimOpen('흩어진 무리가 빠져나간 둥지 한가운데에, 바깥으로 이어지는 틈이 열렸다.')})}")
# 엔딩 선택: 열린 틈이 보이게
rep("ending(sub){this.over=true;", "ending(sub,pt){this.over=true;")
rep("A(this.add.rectangle(400,180,800,360,0x07040e,.9).setDepth(200));", "A(this.add.rectangle(400,180,800,360,0x07040e,pt?.32:.9).setDepth(200));")
rep("A(this.add.text(400,70,'틈 너머에서 바깥의 빛이 새어 든다',ST({fontSize:'22px',fontStyle:'bold'})).setOrigin(.5).setDepth(201));",
    "A(this.add.text(400,pt?34:70,'틈 너머에서 바깥의 빛이 새어 든다',ST({fontSize:'22px',fontStyle:'bold',backgroundColor:pt?'#0b0716':undefined,padding:pt?{x:12,y:4}:undefined})).setOrigin(.5).setDepth(201));")
rep("A(this.add.text(400,102,sub||'공허를 걷는 자가 지키던 틈이 열렸다. 어디로 갈 것인가.',ST({fontSize:'13px',color:'#a99fc2'})).setOrigin(.5).setDepth(201));",
    "A(this.add.text(400,pt?332:102,sub||'공허를 걷는 자가 지키던 틈이 열렸다. 어디로 갈 것인가.',ST({fontSize:'13px',color:'#c8bfe0',backgroundColor:pt?'#0b0716':undefined,padding:pt?{x:10,y:4}:undefined})).setOrigin(.5).setDepth(201));")
rep("  btn(270,'공허에 남는다'", "  btn(pt?178:270,'공허에 남는다'")
rep("  btn(530,'밖으로 나간다'", "  btn(pt?622:530,'밖으로 나간다'")
# 버그 수정: 출구 화살표(exR)가 켜진 채 중간 보스 방(출구 없음)에 들어가면 hud()가 매 프레임 오류
#  → v32까지는 이 오류로 게임 루프가 통째로 멈춤 ('중간 보스 전투 중 멈춤'의 원인)
rep("if(this.exR&&this.cur!==this.lv.exit&&", "if(this.exR&&this.lv.exit&&this.cur!==this.lv.exit&&")
# 밸런스 (전체 플레이 18판 결과): 공허 중간 보스(관찰자)가 가장 어렵고, 최종 보스는 갑각이 가장 어렵다
rep("if(q.ft<=0){q.ft=1.8;const a=Math.atan2(p.y-q.y,p.x-q.x);this.mbShot(q.x,q.y,a,210,D(9),'가장자리 눈의 빛살'",
    "if(q.ft<=0){q.ft=2.3;const a=Math.atan2(p.y-q.y,p.x-q.x);this.mbShot(q.x,q.y,a,210,D(7),'가장자리 눈의 빛살'")
rep("cr=this.lin.c>=2&&(m.fdN=(m.fdN||0)+1)%3==0", "cr=this.lin.c>=2&&(m.fdN=(m.fdN||0)+1)%2==0")
rep("return bt?(m.ex?1.25:0):(m.ex?1.2:.8)", "return bt?(m.ex?(this.lin.c>=3?1.45:1.25):0):(m.ex?1.2:(this.lin.c>=2?1:.8))")
rep("this.hurt(D(j.st=='lunge'?13:6),'허기의 턱',m);if(!m.on)return}}", "this.hurt(D(j.st=='lunge'?11:5),'허기의 턱',m);if(!m.on)return}}")
rep("\n end(a,b,c,tip){", "\n" + M + "\n end(a,b,c,tip){")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
