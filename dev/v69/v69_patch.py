#!/usr/bin/env python3
"""v68 -> v69: 포식 턱 = 낫 모양 칼날 + 평소 씹는 움직임(2단계도 물 때 턱이 커짐) · 갑각 특수 스킬 결정 방벽 → 수정 돌진 · 갑각 기본 공격 차지 삭제
본체: dev/v69/v69_methods.js (pjU 교체) · 사용: python3 dev/v69/v69_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v69_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v68</title>', '<title>공허 기생충 v69</title>')
rep("window.VP_VER='v68';", "window.VP_VER='v69';")
# pjU 교체
a = " pjU(){const g=this.pjG;"; b = " pjOn(){"
if s.count(a) != 1 or s.count(b) != 1: raise SystemExit('pjU block')
i = s.index(a); j = s.index(b, i); s = s[:i] + M + '\n' + s[j:]
# 갑각 차지 삭제 (짧게 = 느리지만 강한 박치기만)
rep("if(this.chg){if(dn&&!(this.sil>0)){this.chg.t=Math.min(1.2,this.chg.t+dt);return}const f=this.chg.t/1.2;this.chg=null;this.slamF(f);return}\n  if(this.bcd>0)return;if(dn)this.chg={t:0};else if(jd)this.slamF(0)}",
    "this.chg=null;if(jd&&this.bcd<=0)this.slamF(0)}")
# 갑각 특수 스킬: 결정 방벽 → 수정 돌진 (속도 560 × 0.2초 ≈ 110px, 재사용 7초)
rep("else if(k=='c'){this.skCd=14;this.wallT=2;this.dtx(p.x,p.y-26,'결정 방벽!','#9fd8ff');if(this.wallO)this.wallO.destroy();this.wallO=this.add.graphics().setDepth(11)}",
    "else if(k=='c'){this.skCd=7;this.cdsh={t:.2,vx:fx*560,vy:fy*560};this.inv=Math.max(this.inv,.25)}")
rep(" skU(dt){if(this.skCd>0)this.skCd-=dt;const p=this.pl;", " skU(dt){if(this.skCd>0)this.skCd-=dt;const p=this.pl;this.cdU(dt);")
rep("s:'결정 방벽',", "s:'수정 돌진',")
rep("sd:'2초 동안 피해를 받지 않고, 그동안 받은 공격을 되돌린다 · 재사용 14초'", "sd:'짧게 돌진해 처음 부딪힌 적에게 큰 피해를 주고 멀리 밀쳐 낸다 · 재사용 7초'")
# 진화 나무·슬라이드 특수 스킬 그림(갑각): 수정 고리 → 수정 돌진 (자국 선 + 벌레 + 충격 고리 + 파편 + 밀려나는 몬스터)
rep("else if(k=='c'){this.artWorm(A,X(14),Y(0),L,1.4*s,dep);g.lineStyle(2*s,0x9fd8ff,.85).strokeEllipse(X(-4),Y(0),70*s,46*s);",
    "else if(k=='c'){for(let i=0;i<3;i++)g.lineStyle(1.6*s,0xbfeaff,.55).lineBetween(X(-62),Y(-8+i*8),X(-30),Y(-8+i*8));for(let i=0;i<4;i++)dia(X(-50+i*10),Y(10-i*5),1.6*s,0xbfeaff,.8);this.artWorm(A,X(10),Y(0),L,1.4*s,dep);mob(52,-2,24);g.lineStyle(2.4*s,0xdff4ff,.9).strokeCircle(X(32),Y(0),11*s);for(let i=0;i<7;i++){const an=Math.PI+(i-3)*.5;dia(X(32)+Math.cos(an)*18*s,Y(0)+Math.sin(an)*14*s,(i%2?2.2:2.8)*s,i%2?0xbfeaff:0xffffff,1)}for(let i=0;i<3;i++)g.lineStyle(1.4*s,0xffffff,.6).lineBetween(X(64),Y(-8+i*8),X(72),Y(-8+i*8))}\n   else if(k=='c0'){this.artWorm(A,X(14),Y(0),L,1.4*s,dep);g.lineStyle(2*s,0x9fd8ff,.85).strokeEllipse(X(-4),Y(0),70*s,46*s);")
# 안내 글: 차지 삭제
rep("Space: 공격 (갑각은 누르고 있으면 차지)", "Space: 공격")
rep("갑각이 가장 높으면 공격이 몸통 박치기 — 느리지만 강하고, 누르고 있으면 차지", "갑각이 가장 높으면 공격이 몸통 박치기 — 느리지만 강함")
rep("몸통 박치기 · 꾹 눌러 차지", "몸통 박치기 (느리지만 강함)")

# 고정 그림(진화 창·나무·슬라이드 wh_)의 갈고리 턱도 칼날 모양으로 (픽셀로 다각형 채우기 + 어두운 테두리 + 흰 날)
rep("function skCry(px,x,", "function skBlade(px,x,c,r,sg){const B=[[r-1.8,4.2],[r+1.2,5.1],[r+3.6,4.1],[r+5.1,.9],[r+3.3,2.3],[r+2.8,1.7],[r+2.1,2.6],[r+1.4,2.1],[r+.8,2.9],[r-1.2,2.2]].map(([X,Y])=>[c+X,c+sg*Y-sg*.0]);const ins=(X,Y)=>{let k=false;for(let i=0,j=B.length-1;i<B.length;j=i++){const[a1,b1]=B[i],[a2,b2]=B[j];if((b1>Y)!=(b2>Y)&&X<(a2-a1)*(Y-b1)/(b2-b1)+a1)k=!k}return k};const xs=B.map(p=>p[0]),ys=B.map(p=>p[1]),x0=Math.floor(Math.min(...xs))-1,x1=Math.ceil(Math.max(...xs))+1,y0=Math.floor(Math.min(...ys))-1,y1=Math.ceil(Math.max(...ys))+1;for(let X=x0;X<=x1;X++)for(let Y=y0;Y<=y1;Y++){const I=ins(X+.5,Y+.5);if(I)px(x,X,Y,(sg>0?Y-c<2.6:c-Y<2.6)&&X>c+r?'#ffffff':'#f0c8d8');else if(ins(X+1.5,Y+.5)||ins(X-.5,Y+.5)||ins(X+.5,Y+1.5)||ins(X+.5,Y-.5))px(x,X,Y,'#3d1b6b')}}\nfunction skCry(px,x,")
rep("if(L.p>=1&&!nj){ln(x,c+r-1,c-3,c+r+3,c-4,'#ffe0ea');ln(x,c+r+3,c-4,c+r+4,c-1,'#ffe0ea');ln(x,c+r-1,c+3,c+r+3,c+4,'#ffe0ea');ln(x,c+r+3,c+4,c+r+4,c+1,'#ffe0ea')}",
    "if(L.p>=1&&!nj){skBlade(px,x,c,r,-1);skBlade(px,x,c,r,1)}")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
