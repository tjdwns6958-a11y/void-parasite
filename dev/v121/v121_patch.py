#!/usr/bin/env python3
"""v120 -> v121: 최종 보스 안내를 한 문장으로('OO을 피하시오' / 'OO을 무시오') · 첫 설명 페이지 몬스터 이름표 · 큰 먹이(등껍질 유충) 새 그림
사용: python3 dev/v121/v121_patch.py index.html"""
import sys, os, re, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v120</title>', '<title>공허 기생충 v121</title>')
rep("window.VP_VER='v120';", "window.VP_VER='v121';")
# 1) 최종 보스 안내: 한 문장
T = [('무리가 은하처럼 돈다 — 팔 사이 빈 곳을 따라 돌 것', '은하 팔을 피하시오'),
     ('유충 비 — 붉은 원이 없는 칸으로!', '유충 비를 피하시오'),
     ('손바닥이 내려온다 — 손가락 사이 틈에 서면 안전', '손바닥을 피하시오'),
     ('발밑이 물결친다 — 원 밖으로!', '발밑 물결을 피하시오'),
     ('손바닥들이 너를 삼키러 온다 — 손 사이 틈으로 붉은 원을 벗어날 것', '손바닥들을 피하시오'),
     ('빨려 든다 — 버티고, 금빛 틈 쪽에 설 것', '금빛 틈 쪽으로 버티시오'),
     ('무리가 쪼개진다 — 금빛 테두리가 진짜 여왕 · 작은 무리는 물어서 먹을 것', '금빛 테두리 여왕을 무시오'),
     ('행성 고리와 빛줄기 — 고리 안쪽 빈 곳으로, 빛줄기를 따라 돌 것', '행성 고리를 피하시오'),
     ('밀물 — 바위 섬 위로! 섬 밑에서 손이 올라오면 다른 섬으로', '바위 섬 위로 피하시오'),
     ('여왕이 무너진다 — 무리가 한 점으로 빨려 든다', '여왕이 무너진다'),
     ('세 겹 고리 — 안쪽 고리의 금빛 틈부터 차례로 빠져나갈 것', '고리의 금빛 틈으로 피하시오'),
     ('쪼개진 무리는 다음 공격이 끝날 때까지 남는다 — 물면 터진다', '금빛 테두리 여왕을 무시오'),
     ('세 겹 고리의 틈이 돈다 — 화살표 방향으로 틈을 따라가며 빠질 것', '도는 고리의 틈으로 피하시오'),
     ('쫓아오는 고리 — 멈추지 말 것! 고리마다 금빛 틈으로', '쫓아오는 고리를 피하시오'),
     ('별똥 은하 — 팔 사이로 피하고, 팔 끝이 빛나면 그 줄에서 비킬 것 · 금빛 유도탄은 크게 돌아 따돌릴 것', '별똥과 금빛 유도탄을 피하시오'),
     ('거대한 손이 바닥을 쓴다 — 손가락 사이 틈 줄에 설 것', '손가락을 피하시오'),
     ('손이 걸어온다 — 박힌 손끝마디(금색)를 물어 터뜨릴 것', '금색 손끝마디를 무시오'),
     ('손이 멈췄다 — 여왕이 드러난다!', '지금 여왕을 무시오'),
     ('무리가 소용돌이치며 모인다 — 붉은 원 밖으로!', '소용돌이를 피하시오'),
     ('수백이 하나처럼 움직인다 — 그 속의 금빛 여왕을 찾아라', '금빛 여왕을 찾아 무시오'),
     ('흩어지던 무리가 여왕의 몸이 된다 — 거대한 유충', '여왕이 거대한 유충이 된다')]
for a, b in T: rep("'" + a + "'", "'" + b + "'")
rep("this.dtx(m.x,m.y-34,'무리가 흩어졌다 — 지금 여왕을 물 것!'", "this.dtx(400,64,'지금 여왕을 무시오'")
# 짧은 안내도 화면 위 안내 방식(2.4초 · 바탕)으로
rep("dtx(x,y,t,c){if(x==400&&y<90&&t.length>12){", "dtx(x,y,t,c){if(x==400&&y<90){")
# 2) 큰 먹이 그림 교체 (V116I 안의 f_l)
b64 = base64.b64encode(open(os.path.join(H, 'img', 'f_l.png'), 'rb').read()).decode()
n = len(re.findall(r"f_l:'data:image/png;base64,[A-Za-z0-9+/=]+'", s))
if n != 1: raise SystemExit('f_l x%d' % n)
s = re.sub(r"f_l:'data:image/png;base64,[A-Za-z0-9+/=]+'", "f_l:'data:image/png;base64," + b64 + "'", s)
# 3) 첫 설명 페이지 이름표
rep("if(pg>0)T(28,178,'◀',{fontSize:'22px',color:'#c9c0de'});if(pg<1)T(772,178,'▶',{fontSize:'22px',color:'#c9c0de'})}",
    "if(pg>0)T(28,178,'◀',{fontSize:'22px',color:'#c9c0de'});if(pg<1)T(772,178,'▶',{fontSize:'22px',color:'#c9c0de'});this.bsNames()}")
# 두 번째 페이지 장면의 낫그늘: 새 그림은 위를 보므로 지렁이 쪽(왼쪽)으로 돌림
rep("mob=(x,y,h)=>this.artImg(A,'kha',X(x),Y(y),h*s,dep).setFlipX(true);", "mob=(x,y,h)=>this.artImg(A,'kha',X(x),Y(y),h*s,dep).setRotation(-Math.PI/2);")
M = open(os.path.join(H, 'v121_methods.js'), encoding='utf-8').read().rstrip('\n')
rep("\n hud(){\n", "\n" + M + "\n hud(){\n")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
