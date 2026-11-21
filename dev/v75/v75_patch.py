#!/usr/bin/env python3
"""v74 -> v75: 게임 안 포식 톱날 턱(·통째 삼키기 큰 턱)을 정지 그림처럼 픽셀 칸으로 그림 — 매끈한 벡터 도형 대신 머리 픽셀 격자에 맞춘 칸(같은 색·흰 날·어두운 테두리 규칙)
사용: python3 dev/v75/v75_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v74</title>', '<title>공허 기생충 v75</title>')
rep("window.VP_VER='v74';", "window.VP_VER='v75';")
PIX = (" // 픽셀 칼날 (v75): 머리 기준 좌표의 다각형 Q를 1칸 격자로 채움 — 정지 그림 skBlade와 같은 규칙(흰 날 wf · 둘레 어두운 테두리). toW = 칸 좌표 → 화면 좌표\n"
       " pjPix(g,Q,wf,toW,al){const xs=Q.map(p=>p[0]),ys=Q.map(p=>p[1]),x0=Math.floor(Math.min(...xs))-1,x1=Math.ceil(Math.max(...xs))+1,y0=Math.floor(Math.min(...ys))-1,y1=Math.ceil(Math.max(...ys))+1;\n"
       "  const ins=(X,Y)=>{let k=false;for(let i=0,j=Q.length-1;i<Q.length;j=i++){const[a1,b1]=Q[i],[a2,b2]=Q[j];if((b1>Y)!=(b2>Y)&&X<(a2-a1)*(Y-b1)/(b2-b1)+a1)k=!k}return k};\n"
       "  const quad=(X,Y,col)=>{g.fillStyle(col,al).fillPoints([toW(X,Y),toW(X+1,Y),toW(X+1,Y+1),toW(X,Y+1)],true)};\n"
       "  for(let X=x0;X<=x1;X++)for(let Y=y0;Y<=y1;Y++){if(ins(X+.5,Y+.5))quad(X,Y,wf(X,Y)?0xffffff:0xf0c8d8);else if(ins(X+1.5,Y+.5)||ins(X-.5,Y+.5)||ins(X+.5,Y+1.5)||ins(X+.5,Y-.5))quad(X,Y,0x3d1b6b)}}\n")
rep(" pjU(){const g=this.pjG;", PIX + " pjU(){const g=this.pjG;")
# 게임 안 턱: 다각형을 머리 기준 좌표로 돌린 뒤 픽셀 칸으로
rep("   const P=this.pjBlade(sg,r).map(([x,y])=>{const dx=(x-bx)*S*.86,dy=(y-by)*S;return W(bx+dx*c-dy*s,by+dx*s+dy*c)});\n"
    "   g.lineStyle(1.6*u,0x3d1b6b,al).strokePoints(P,true);g.fillStyle(0xf0c8d8,al).fillPoints(P,true);\n"
    "   g.fillStyle(0xb85c84,al).fillTriangle(P[0].x,P[0].y,P[1].x,P[1].y,P[P.length-1].x,P[P.length-1].y);\n"
    "   g.lineStyle(.7*u,0xffffff,al).beginPath().moveTo(P[3].x,P[3].y);for(let i=4;i<P.length-1;i++)g.lineTo(P[i].x,P[i].y);g.strokePath()}",
    "   const Q=this.pjBlade(sg,r).map(([x,y])=>{const dx=(x-bx)*S*.86,dy=(y-by)*S;return[bx+dx*c-dy*s,by+dx*s+dy*c]});\n"
    "   this.pjPix(g,Q,(X,Y)=>Math.abs(Y+.5)<2.6&&X>r,(X,Y)=>W(X,Y),al)}")
# 통째 삼키기 큰 턱도 픽셀 칸 (칸 크기 = K)
rep("   const P=this.pjBlade(sg,0).map(([x,y])=>{const lx=(x+1)*K,ly=(y-sg*3)*K+sg*1.2*K,rx=lx*rc-ly*rs,ry=lx*rs+ly*rc;return{x:bx+rx*c-ry*s,y:by+rx*s+ry*c}});\n"
    "   g.lineStyle(1.6,0x3d1b6b,al).strokePoints(P,true);g.fillStyle(0xf0c8d8,al).fillPoints(P,true);g.lineStyle(1.2,0xffffff,al).beginPath().moveTo(P[3].x,P[3].y);for(let i=4;i<P.length-1;i++)g.lineTo(P[i].x,P[i].y);g.strokePath()}",
    "   const Q=this.pjBlade(sg,0).map(([x,y])=>{const lx=x+1,ly=y-sg*1.8;return[lx*rc-ly*rs,lx*rs+ly*rc]});\n"
    "   this.pjPix(g,Q,(X,Y)=>Math.abs(Y+.5)<1.3&&X>1,(X,Y)=>({x:bx+(X*c-Y*s)*K,y:by+(X*s+Y*c)*K}),al)}")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
