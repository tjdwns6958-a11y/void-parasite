#!/usr/bin/env python3
"""v97 -> v98:
1) 진화 나무 화면 없앰 — T 키 · 퀘스트 패널 누르기 · 게임 설명의 '진화 나무' 카드 (treeOpen 빈 함수로)
2) 정동 집게왕 새끼 게: 돌진에 닿으면 뒤집혀 빙글 돌다 부스러짐 · 알은 플레이어 둘레 사방에 고르게(150~230px) → 여러 방향에서 다가옴 · 수정 기둥을 비켜 돌아서 옴
4) '탈피 재료가 모였다! (적 없을 때 탈피 버튼 F)' 한 줄로
본체: dev/v98/v98_methods.js · 사용: python3 dev/v98/v98_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v98_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v97</title>', '<title>공허 기생충 v98</title>')
rep("window.VP_VER='v97';", "window.VP_VER='v98';")
# 1) 진화 나무: 게임 설명 카드 빼고 남은 카드는 가운데로 · 키 안내에서 T 지움
i = s.index("btn(240,'진화 나무',"); j = s.index(",()=>this.treeOpen(0,1));", i) + len(",()=>this.treeOpen(0,1));")
s = s[:i] + s[j:]
rep("btn(560,'포식 · 갑각 · 공허'", "btn(400,'포식 · 갑각 · 공허'")
rep("  ·  F: 탈피(주변에 적이 없을 때)  ·  T: 진화 나무'", "  ·  F: 탈피(주변에 적이 없을 때)'")
rep("  ·  F: 탈피  ·  T: 진화 나무  ·  P·Esc: 일시정지'", "  ·  F: 탈피  ·  P·Esc: 일시정지'")
# 2) 새끼 게: 기둥 비켜 이동 · 돌진에 깔리면 죽는 모션
rep("const v=sp*dt;k.x+=dx/d*v+(Math.random()-.5)*1.5;k.y+=dy/d*v*.85;k.wd+=v;", "const v=sp*dt;this.gdkKidStep(m,k,p,v);k.wd+=v;if(m.st=='ch'&&Math.hypot(k.x-m.x,k.y-m.y)<66){this.gdkKidDie(k);continue}")
# 4) 탈피 안내 한 줄
rep("tt=this.add.text(400,150,ih?'탈피 재료가 모였다!\\n탈피 버튼'+(this.sys.game.device.input.touch?'':'(F)')+'을 누르면 진화하고 체력이 가득 찬다 — 주변에 적이 없을 때 어디서나':'탈피 재료가 모였다!\\n주변에 적이 없을 때 탈피 버튼'+(this.sys.game.device.input.touch?'':'(F)')+' — 초록 화살표의 둥지는 늘 안전하다'",
    "tt=this.add.text(400,150,'탈피 재료가 모였다! (적 없을 때 탈피 버튼'+(this.sys.game.device.input.touch?')':' F)')")
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
