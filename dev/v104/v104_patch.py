#!/usr/bin/env python3
"""v103 -> v104
1) 통째 삼키기 모션이 안 보이던 버그(다시 시작 뒤 dvG가 지워진 그림) → create() 맨 앞에서 지워진 게임 오브젝트를 가리키는 속성을 모두 비움(같은 종류 버그 전부 막음).
   + 모션 새로: 위아래 이빨 턱(반달 둘)이 대상 둘레에서 벌어졌다가 콱 맞물림 · 흰 번쩍 고리 · 파편 (dvU 덮어씀)
2) 정동 집게왕 2페이즈: 등의 정동을 뜯어 굴리고·불러들여 던지는 기믹 없앰 → 뜯기는 순간 산산조각 나는 연출만. ('throw' 차례는 내려찍기/파동으로 대체됨)
   집게왕 전투 화면 흔들림: 공허 보스전처럼 세기 35% · 길이 60% · 천장에 매달릴 때 3.4초 동안 울리던 흔들림 없앰 · 뜯기 흔들림 1.2초 → 0.5초.
3) 종유석 크기 셋(작은 0.7 · 중간 1 · 큰 1.4): 낙하 범위 반지름 17/24/34 · 피해 · 예고 시간이 크기 따라. 흔들림은 큰 것만 아주 약하게, 작은 것은 기둥 없이 부서짐.
본체: dev/v104/v104_methods.js · 사용: python3 dev/v104/v104_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v104_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v103</title>', '<title>공허 기생충 v104</title>')
rep("window.VP_VER='v103';", "window.VP_VER='v104';")
# 1) 다시 시작: 지워진 게임 오브젝트를 가리키는 속성 비우기
rep(" create(){\n  this.cameras.main.setZoom(VZ)", " create(){\n  for(const k in this){const v=this[k];if(v&&typeof v=='object'&&v instanceof Phaser.GameObjects.GameObject&&!v.scene)this[k]=null}\n  this.cameras.main.setZoom(VZ)")
# 2) 정동 굴리기·던지기 없앰
rep("m.ph=2;const a=Math.PI/2+(Math.random()-.5)*1.6;m.ball={x:m.x,y:m.y-40,vx:Math.cos(a),vy:Math.sin(a),spd:190,st:'roll',hc:0,o:this.add.image(m.x,m.y-34,'gdkG').setDepth(9.3)};\n    for(let i=0;i<2;i++)this.gdkShard(m.x+(i?50:-50),m.y+40);this.dtx(m.x,m.y-70,'정동이 굴러간다 — 점선 방향을 보고 피할 것!','#ffe066');",
    "m.ph=2;this.gdkGeoBreak(m);\n    for(let i=0;i<2;i++)this.gdkShard(m.x+(i?50:-50),m.y+40);")
rep("this.dtx(m.x,m.y-70,'등의 정동을 뜯어낸다!','#ff9ac0');this.cameras.main.shake(1200,.006)", "this.dtx(m.x,m.y-70,'등의 정동이 깨진다!','#ff9ac0');this.cameras.main.shake(500,.004)")
# 흔들림
rep("m.st='ceil';m.tm=3.4;m.dn=0;m.ca=0;this.cameras.main.shake(3400,.0012);", "m.st='ceil';m.tm=3.4;m.dn=0;m.ca=0;")
rep("this.mbOn=='v'?o((d||100)*.6", "(this.mbOn=='v'||this.mbOn=='c')?o((d||100)*.6")
rep(" gdkAI(m,dt,p){", " gdkAI(m,dt,p){this.vShk();")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
