#!/usr/bin/env python3
"""v69 -> v70: 포식 칼날 턱 앞뒤 길이 −14%(3단계 약 1px) + 단계별 크기(1단계 0.72 · 2단계 0.92 · 3단계 1.15) · 포식 특수 스킬 = 통째 삼키기(포식 돌진 대체)
본체: dev/v70/v70_methods.js · 사용: python3 dev/v70/v70_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v70_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
def cut(a, b, new):
    global s
    if s.count(a) != 1: raise SystemExit('cut start x%d: %r' % (s.count(a), a[:70]))
    i = s.index(a); j = s.index(b, i) + len(b); s = s[:i] + new + s[j:]
rep('<title>공허 기생충 v69</title>', '<title>공허 기생충 v70</title>')
rep("window.VP_VER='v69';", "window.VP_VER='v70';")
# --- 턱 크기 (게임 안)
rep("S=(L.p>=2?1.15:.9)*(1+.35*big)", "S=(L.p>=3?1.15:L.p>=2?.92:.72)*(1+.35*big)")
rep("const dx=(x-bx)*S,dy=(y-by)*S;return W(", "const dx=(x-bx)*S*.86,dy=(y-by)*S;return W(")
# --- 턱 크기 (정지 그림)
rep("function skBlade(px,x,c,r,sg){const B=[[r-1.8,4.2],[r+1.2,5.1],[r+3.6,4.1],[r+5.1,.9],[r+3.3,2.3],[r+2.8,1.7],[r+2.1,2.6],[r+1.4,2.1],[r+.8,2.9],[r-1.2,2.2]].map(([X,Y])=>[c+X,c+sg*Y-sg*.0]);",
    "function skBlade(px,x,c,r,sg,K){K=K||1;const B=[[r-1.8,4.2],[r+1.2,5.1],[r+3.6,4.1],[r+5.1,.9],[r+3.3,2.3],[r+2.8,1.7],[r+2.1,2.6],[r+1.4,2.1],[r+.8,2.9],[r-1.2,2.2]].map(([X,Y])=>[c+(r-1)+(X-(r-1))*K*.86,c+sg*(3+(Y-3)*K)]);")
rep("skBlade(px,x,c,r,-1);skBlade(px,x,c,r,1)", "{const K=L.p>=3?1:L.p>=2?.82:.66;skBlade(px,x,c,r,-1,K);skBlade(px,x,c,r,1,K)}")
# --- 통째 삼키기
rep("if(k=='p'){this.skCd=6;this.dsh={t:.22,vx:fx*780,vy:fy*780,hit:new Set()};this.inv=Math.max(this.inv,.35);this.dtx(p.x,p.y-26,'포식 돌진!','#ff9ad0')}", "if(k=='p'){this.dvUse()}")
rep("this.cdU(dt);", "this.cdU(dt);this.dvU(dt);")
rep("s:'포식 돌진',", "s:'통째 삼키기',")
rep("sd:'앞으로 돌진하며 지나간 자리의 적을 모두 물어뜯는다 (처치하면 체력 회복) · 재사용 6초'", "sd:'앞의 적 하나를 큰 칼날 턱으로 물어 삼킨다 — 체력 30% 이하 일반 몬스터는 통째로 삼키고 체력 25% 회복, 그 밖엔 물기 ×3 피해 + 출혈 · 재사용 6초'")
# 진화 나무·슬라이드 그림: 돌진 → 큰 칼날 턱이 몬스터를 감쌈
cut("if(k=='p'){for(let i=4;i>=1;i--){g.fillStyle(0xff7a9a", "X(48+i*5),Y(9))}",
    "if(k=='p'){this.artWorm(A,X(-36),Y(0),L,1.5*s,dep);mob(30,0,26).setTint(0x6a3a5a);for(const sg of[-1,1]){const an=sg*.55,ca=Math.cos(an),sa=Math.sin(an),P=this.pjBlade(sg,0).map(([x,y])=>({x:X(8)+(x*ca-y*sa)*4*s,y:Y(sg*4)+(x*sa+y*ca)*4*s}));g.lineStyle(1.8*s,0x3d1b6b,1).strokePoints(P,true);g.fillStyle(0xf0c8d8,1).fillPoints(P,true);g.lineStyle(.9*s,0xffffff,1).beginPath().moveTo(P[3].x,P[3].y);for(let i=4;i<=8;i++)g.lineTo(P[i].x,P[i].y);g.strokePath()}for(let i=0;i<4;i++)g.fillStyle(0x7be0a8,.9).fillCircle(X(-58+i*10),Y(-22-(i%2)*5),2*s)}")
a = " // 갑각 수정 돌진:"
if s.count(a) != 1: raise SystemExit('anchor v69 dash')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
