#!/usr/bin/env python3
"""v38 -> v39: 1페이즈 R1 회전하는 세 겹 고리 · 2페이즈 R3 쫓아오는 고리(어렵게) · G3 별똥 은하 + 금빛 유도탄.
손 공격 개편: 쓸어 가는 손(P1) → 기어 오는 손(P4, 손끝마디 다섯 개를 터뜨리면 멈춤) · 엔딩 직전 E1 빨려 드는 정적(한 점에서 끝).
본체: dev/v39/v39_methods.js · 사용: python3 dev/v39/v39_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v39_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v38</title>', '<title>공허 기생충 v39</title>')
rep("window.VP_VER='v38';", "window.VP_VER='v39';")
rep("if(m.seq%2==1)return pick(['fist','wave','ring3']);", "if(m.seq%2==1)return pick(['fist','wave',P2?'ringc':'ringr']);")
rep("m.bag=P2?['hole','mitosis','palms','press','grab']:['galaxy','rain','press','grab'];", "m.bag=P2?['hole','mitosis','hand']:['gstar','rain','hand'];")
rep("  if(m.MC)this.swMcU(m,dt,p);\n", "  if(m.MC)this.swMcU(m,dt,p);\n  if(m.ms&&m.ms.length)this.swMsU(m,dt,p);\n")
rep("if(m.MC&&m.MC.some(c=>Math.hypot(x-c.x,y-c.y)<c.rad+18))return true;", "if(m.MC&&m.MC.some(c=>Math.hypot(x-c.x,y-c.y)<c.rad+18))return true;if(m.ms&&m.ms.some(q=>Math.hypot(x-q.x,y-q.y)<34))return true;")
rep(".filter(q=>q.on),g=m.pg;m.MC=null;", ".filter(q=>q.on),g=m.pg;m.MC=null;m.ms=null;")
rep("swTrans(m){m.st='trans';", "swTrans(m){m.ms=null;m.st='trans';")
rep("if(this.lin.v>=1)this.ess(this.lin.v>=3?2:1,m.x,m.y)}", "if(this.lin.v>=1)this.ess(this.lin.v>=3?3:1,m.x,m.y)}")
# 손끝마디 물기
rep("swBite(fx,fy){const m=this.swOn;if(m&&m.on&&m.MC&&this.swMcBite(m,fx,fy))return 1;", "swBite(fx,fy){const m=this.swOn;if(m&&m.on&&m.MC&&this.swMcBite(m,fx,fy))return 1;if(m&&m.on&&m.st=='sk'&&m.sk&&m.sk.k=='hand'&&this.swHandBite(m,fx,fy))return 1;")
# 엔딩 직전: 펑(하얗게 부풀기·금빛 고리·흔들림·차원 열림) 대신 빨려 드는 정적
rep("  if(s){s.setTintFill(0xffffff);this.tweens.add({targets:s,scale:3,alpha:0,angle:180,duration:1400,ease:'Quad.out',onComplete:()=>s.destroy()})}\n", "")
import re
i=s.index("  const P=m.P.concat(...(m.MC||[]).map(c=>c.P)).filter(q=>q.on),g=m.pg;m.MC=null;m.ms=null;let tt=0;");j=s.index("  this.cameras.main.shake(600,.01);\n",i)+len("  this.cameras.main.shake(600,.01);\n")
s=s[:i]+"  const P=m.P.concat(...(m.MC||[]).map(c=>c.P)).filter(q=>q.on);if(m.pg)m.pg.clear();m.MC=null;m.ms=null;\n"+s[j:]
rep("this.dtx(x,y-50,'여왕이 무너지자 무리가 흩어진다','#ffe066');", "this.dtx(x,y-50,'여왕이 무너진다 — 무리가 한 점으로 빨려 든다','#ffe066');")
rep("this.time.delayedCall(1700,()=>{if(!this.over)this.dimOpen('흩어진 무리가 빠져나간 둥지 한가운데에, 바깥으로 이어지는 틈이 열렸다.')})}", "this.time.delayedCall(30,()=>{if(!this.over)this.swImplode(m,x,y,s,P)})}")
rep("'틈 너머에서 바깥의 빛이 새어 든다',ST(", "pt==2?'어둠 한가운데 빛 한 점이 남았다':'틈 너머에서 바깥의 빛이 새어 든다',ST(")
rep("기생충은 틈을 등지고 어둠으로 돌아갔다", "기생충은 빛을 등지고 어둠으로 돌아갔다")
rep("기생충은 틈을 지나 낯선 빛 속으로 기어 나왔다", "기생충은 빛 한 점을 지나 낯선 바깥으로 기어 나왔다")
rep("\n end(a,b,c,tip){", "\n" + M + "\n end(a,b,c,tip){")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
