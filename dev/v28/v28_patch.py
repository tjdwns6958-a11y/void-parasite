#!/usr/bin/env python3
"""v27 -> v28: 보스를 '라벤더 아래의 여제'(2페이즈)로 교체 + 입장/변신 연출."""
import re, sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()

def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt:
        raise SystemExit(f'anchor x{n} (want {cnt}): {old[:70]!r}')
    s = s.replace(old, new)

rep('<title>공허 기생충 v27</title>', '<title>공허 기생충 v28</title>')
# 예전 보스 진입 함수는 이름만 바꿔 남겨 둔다
rep('\n bossStart(){', '\n bossStartRw(){')
# 연출 중에는 게임 정지
rep('if(this.tr){this.tunnel(dt);return}', 'if(this.cine){this.cineU(dt);return}if(this.tr){this.tunnel(dt);return}')
# 들숨: 여제 쪽으로 끌어당기는 흐름
rep(' flowAt(x,y){const a=this.cur;if(!a.vt)return[0,0];',
    ' flowAt(x,y){const a=this.cur;if(this.emPull){const P=this.emPull,dx=P.x-x,dy=P.y-y,d=Math.hypot(dx,dy)||1;return[dx/d*P.v,dy/d*P.v]}if(!a.vt)return[0,0];')
# HUD 체력바
rep("if(m.k=='rw'){this.rwBar(g,m);continue}", "if(m.k=='rw'){this.rwBar(g,m);continue}if(m.k=='em'){this.emBar(g,m);continue}")
# 스프라이트
rep("else if(e.k=='rw'){", "else if(e.k=='em'){e.spr=this.add.image(e.x,e.y,'emS').setDepth(1.3).setAlpha(.85);e.lvT.setVisible(false)}\n  else if(e.k=='rw'){")
# 소개 카드
rep("rw:['공허를 걷는 자',", "em:['라벤더 아래의 여제','수면 아래에서는 닿지 않는다 · 수면 위로 솟을 때 물 것 · 2페이즈: 거울 속의 나로 물 것'],rw:['공허를 걷는 자',")
# 사망 팁
rep("'공허를 걷는 자의 칼날':'바닥에",
    "'여제의 돌진':'붉은 띠가 깔리면 띠 밖으로 — 꺼진 불빛 쪽으로는 다시 돌진하지 않는다','여제의 꼬리':'붉은 선이 그어지면 선에서 옆으로 비킬 것','산호 가시':'발밑에 붉은 원이 생기면 계속 움직일 것 — 멈추면 연달아 맞는다','수면의 파문':'여제가 다시 잠길 때 머리 근처의 물결이 터진다 — 물고 나서 바로 빠질 것',"
    "'가면의 합창':'가면에서 부채꼴로 쏟아진다 — 나와 거울 속의 나 둘 다 탄을 피해야 한다','틈의 이빨':'들숨 동안 여제 곁(나 또는 거울 속의 나)에 있으면 이빨에 베인다','여제의 들숨 — 삼켜짐':'붉은 점이 모이면 들숨 — 여제 반대쪽 끝으로 헤엄칠 것','떨어지는 가면':'붉은 원은 나와 거울 속의 나 양쪽에 생긴다 — 둘 다 원 밖으로','거울 뒤집기':'거울이 하얗게 번쩍이면 곧 자리가 바뀐다 — 바뀐 뒤 바로 들숨이나 합창이 온다','여제의 날개':'여제 몸 근처에 머물면 날개에 베인다 — 반대편에서 거울로 공격할 것',"
    "'공허를 걷는 자의 칼날':'바닥에")
# 물기: 머리 사거리, 넉백 제외, 거울 물기
rep("C.BITE.range+(m.k=='rw'?40:0)", "C.BITE.range+(m.k=='rw'||m.k=='em'?40:0)")
rep("m.k=='rw'?.06:.25", "m.k=='rw'||m.k=='em'?.06:.25")
rep("({spn:1,qn:1,wd:1,rw:1})[m.k]", "({spn:1,qn:1,wd:1,rw:1,em:1})[m.k]")
rep("{let bo=null,bq=C.BITE.range;", "if(this.emMir&&this.emMirBite(fx,fy))hit=1;{let bo=null,bq=C.BITE.range;")
# 공허 계통: 2페이즈에서는 거울 속의 내가 대신 침을 뱉는다
rep("bd=d;b=m}}if(!b)return;\n  this.spitCd=1.5;", "bd=d;b=m}}if(!b){if(this.emMir)this.emMirSpit();return}\n  this.spitCd=1.5;")
rep("this.dmgM(m,this.sdmg());q.t=0;", "this.dmgM(m,this.sdmg()*(q.mir?.8:1),q.mir);q.t=0;")
# 피해 배율
rep("dmul(m,bt){if(m.k=='rw'){", "dmul(m,bt){if(m.k=='em')return m.gone?0:m.st=='breach'?1.2:1;if(m.k=='rw'){")
# 처치
rep("kill(m){if(m.k=='rw')return this.rwDie(m);", "kill(m){if(m.k=='em')return this.emDie(m);if(m.k=='rw')return this.rwDie(m);")
# 엔딩 부제
rep("\n ending(){", "\n ending(sub){")
rep("'공허를 걷는 자가 지키던 틈이 열렸다. 어디로 갈 것인가.'", "sub||'공허를 걷는 자가 지키던 틈이 열렸다. 어디로 갈 것인가.'")
# 연출 건너뛰기 / 일시정지 막기
rep("pointerdown',p=>{if(this.over)return;if(this.treeO)", "pointerdown',p=>{if(this.over)return;if(this.cine){if(this.cine.t>.6)this.cine.t=this.cine.dur;return}if(this.treeO)")
rep("pz(){if(this.over||this.molt||this.tr||this.treeO)return;", "pz(){if(this.over||this.molt||this.tr||this.treeO||this.cine)return;")
# 지역 이름
rep("void:['공허의 가장자리 — 바깥으로 이어지는 틈',0x8a78c8]", "void:['라벤더 바다 — 여제의 영역',0x8a78c8]")
# 초기화
rep("this.treeO=null;this.rgT=null;", "this.treeO=null;this.rgT=null;this.cine=null;this.emb=[];this.emPull=null;this.emMir=0;this.rfl=null;")
# 메서드 삽입
M = open(sys.argv[2] if len(sys.argv) > 2 else 'dev/v28/v28_methods.js', encoding='utf-8').read().rstrip('\n') + '\n'
rep('\n end(a,b,c,tip){', '\n' + M + ' end(a,b,c,tip){')
open(P, 'w', encoding='utf-8').write(s)
print('ok', len(s))
