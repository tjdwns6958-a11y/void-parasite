#!/usr/bin/env python3
"""v35 -> v36: 최종 보스 교체 — '라벤더 아래의 여제' → '한 몸의 무리' (docs/boss_designs/18_swarm_final.png).
보스 본체는 dev/v36/v36_methods.js. 여제 코드는 그대로 두고(emStart) 보스방 진입만 바꾼다.
사용: python3 dev/v36/v36_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v36_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v35</title>', '<title>공허 기생충 v36</title>')
rep("window.VP_VER='v35';", "window.VP_VER='v36';")
rep("void:['라벤더 바다 — 여제의 영역',0x8a78c8]", "void:['무리의 둥지 — 여왕의 영역',0x8a78c8]")
# 보스방 진입 → 무리 (여제는 emStart로 남김)
rep("\n bossStart(){this.lv.rooms.forEach(m=>{", "\n bossStart(){return this.swStart()}\n emStart(){this.lv.rooms.forEach(m=>{")
# 판 초기화
rep("this.sil=0;this.boss=false;this.rwo=[];", "this.sil=0;this.boss=false;this.rwo=[];this.swOn=null;this.swNm=null;")
# 처치 · 체력바 · 그림
rep("kill(m){if(m.mb)return this.mbDie(m);if(m.k=='em')return this.emDie(m);", "kill(m){if(m.mb)return this.mbDie(m);if(m.k=='em')return this.emDie(m);if(m.k=='sw')return this.swDie(m);")
rep("if(m.k=='em'){this.emBar(g,m);continue}", "if(m.k=='em'){this.emBar(g,m);continue}if(m.k=='sw'){this.swBar(g,m);continue}")
rep("  else if(e.k=='em'){e.spr=", "  else if(e.k=='sw'){e.spr=this.add.image(e.x,e.y,'swQ').setDepth(9).setScale(1.2);e.lvT.setVisible(false)}\n  else if(e.k=='em'){e.spr=")
rep("[this.rgL,this.rwNm,this.skG", "[this.rgL,this.rwNm,this.swNm,this.skG")
# 받는 피해: 무리에 싸여 있으면 물기 0 (반사·침은 절반), 흩어지면 물기 ×1.3
rep("dmul(m,bt){if(m.mb)return this.mbMul(m,bt);",
    "dmul(m,bt){if(m.mb)return this.mbMul(m,bt);if(m.k=='sw'){if(m.st=='trans'||m.st=='intro'||m.st=='dead'||m.gone)return 0;if(bt&&!m.ex&&!(this.swNt>this.time.now)){this.swNt=this.time.now+2200;this.dtx(m.x,m.y-30,'무리가 여왕을 감싸고 있다 — 흩어질 때 물 것','#c8b8ff')}return bt?(m.ex?1.25:0):(m.ex?1.2:.8)}")
# 물기: 사거리 · 통째 삼키기(흩어졌을 때만) · 밀려나지 않음 · 가짜 무리 물기
rep("m.k=='rw'||m.k=='em'?40:0)", "m.k=='rw'||m.k=='em'?40:m.k=='sw'?18:0)")
rep("m.k=='rw'||m.k=='em'||m.mb?.06:.25", "m.k=='sw'?(m.ex?.06:-1):m.k=='rw'||m.k=='em'||m.mb?.06:.25")
rep("({spn:1,qn:1,wd:1,rw:1,em:1})[m.k]", "({spn:1,qn:1,wd:1,rw:1,em:1,sw:1})[m.k]", 2)
rep("if(this.mbOn&&this.mbBite(fx,fy))hit=1;", "if(this.mbOn&&this.mbBite(fx,fy))hit=1;if(this.swOn&&this.swBite(fx,fy))hit=1;")
# 공허 침 · 권속은 무리를 뚫는다 (공허 계통 보정)
rep("m.slw=1.5;this.dmgM(m,this.sdm", "m.slw=1.5;this.dmgM(m,(m.k=='sw'?1.4:1)*this.sdm")
rep("f.cd=.8;this.dmgM(tg,4+", "f.cd=.8;this.dmgM(tg,(tg.k=='sw'?1.5:1)*4+")
# 본체
rep("\n end(a,b,c,tip){", "\n" + M + "\n end(a,b,c,tip){")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
