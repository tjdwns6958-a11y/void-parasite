#!/usr/bin/env python3
"""v76 -> v77: 허기의 왕관 — 회전 베기 어렵게(크고 빠르게, 1초마다 칼날 원이 퍼짐) · 흡수 = 몸 테두리 안 · 쌍마다 다른 돌진 길이 · 커지면 공격 범위·피해 증가
본체: dev/v77/v77_methods.js · 사용: python3 dev/v77/v77_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v77_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v76</title>', '<title>공허 기생충 v77</title>')
rep("window.VP_VER='v76';", "window.VP_VER='v77';")
# --- 4) 크기: 몸 bs = 1+.12×커짐, 턱 sc = 1+.18×커짐, 피해 +15%×커짐, 플레이어가 물 수 있는 거리도 몸 크기만큼
rep("D=v=>Math.round(v*m.df*(1+.12*gr)),en=", "bs=1+.12*gr,D=v=>Math.round(v*m.df*(1+.15*gr)),en=")
rep("setScale(1+.04*Math.sin(now/280)+.05*gr)", "setScale((1+.04*Math.sin(now/280))*bs);m.br=44*bs;m.spr")
rep("strokeEllipse(m.x,m.y,150,104)", "strokeEllipse(m.x,m.y,150*bs,104*bs)")
rep("const sc=1+.13*gr;", "const sc=1+.18*gr;")
rep("const gb=m.gb||(m.gb=this.add.graphics().setDepth(9.35));gb.clear();const sc=1+.13*(m.gr||0);", "const gb=m.gb||(m.gb=this.add.graphics().setDepth(9.35));gb.clear();const sc=1+.18*(m.gr||0);")
rep("if(j.st!='spin'&&Math.hypot(p.x-j.x,p.y-j.y)<20*sc&&", "if(j.st!='spin'&&Math.hypot(p.x-j.x,p.y-j.y)<22*sc&&")
rep("this.telAdd({k:'l',x:x1,y:y1,x2,y2,w:38,t:.75*en+dl,", "this.telAdd({k:'l',x:x1,y:y1,x2,y2,w:38*(1+.18*(m.gr||0)),t:.75*en+dl,")
# --- 2) 흡수 = 몸 테두리(노란 타원) 안 · 들숨 끝 붙잡기도 같은 범위, 들숨 동안 그 테두리를 표시
rep("strokeEllipse(m.x,m.y,96,64)", "strokeEllipse(m.x,m.y,150*bs,104*bs)")
rep("if(fd<26){f.on=0;", "if(((f.x-m.x)/(75*bs))**2+((f.y-m.y)/(52*bs))**2<1){f.on=0;")
rep("if(((p.x-m.x)/52)**2+((p.y-m.y)/36)**2<1){this.hurt(D(26),'허기의 들숨',m);", "if(((p.x-m.x)/(75*bs))**2+((p.y-m.y)/(52*bs))**2<1){this.hurt(D(26),'허기의 들숨',m);")
# --- 3) 쉬는 턱: 흩어진 동안 6개 모두 쌍별 돌진, 연속 돌진이 남았으면 0.12초 만에 다시
rep("else if(j.st=='rest'){j.t-=dt;if(j.t<=0){if(m.st=='scatter'&&j.i%3!=2)this.hcLunge(m,j,en);else if(m.st=='scatter'){j.st='go';j.tx=j.i<3?90:710;j.ty=j.i<3?80:290}else j.st='ring'}}",
    "else if(j.st=='rest'){j.t-=dt;if(j.t<=0){if(m.st=='scatter')this.hcLunge(m,j,en);else j.st='ring'}}")
rep("j.st='rest';j.t=.8+Math.random()*.6;", "j.st='rest';j.t=j.rep>0?.12:.8+Math.random()*.6;")
# --- 1) 회전 베기: 원 반지름 54·sc(+1초마다 0.3초 동안 30px 확 퍼짐, 0.25초 전 바깥 원 번쩍) · 보스 104/80px/s · 4초
rep("const a=j.a+(m.srot||0),R=46*sc,", "const a=j.a+(m.srot||0),R=m.spR||54*sc,")
rep("if(d>(m.st=='spin'?4:130)){m.x+=dx/d*(m.st=='spin'?78:26)*dt;m.y+=dy/d*(m.st=='spin'?60:18)*dt}", "if(d>(m.st=='spin'?4:130)){m.x+=dx/d*(m.st=='spin'?104:26)*dt;m.y+=dy/d*(m.st=='spin'?80:18)*dt}")
rep("  case 'spinW':{const k=1-m.tm/.8,R=46*sc+12;", "  case 'spinW':{const k=1-m.tm/.8;m.spR=54*sc;const R=m.spR+12;")
rep("if(m.tm<=0){m.st='spin';m.tm=3.2}}break;", "if(m.tm<=0){m.st='spin';m.tm=4}}break;")
rep("  case 'spin':{m.srot=(m.srot||0)+dt*11;const R=46*sc+12,inr=",
    "  case 'spin':{m.srot=(m.srot||0)+dt*11;const ph=(4-m.tm)%1,base=54*sc;m.spR+=((ph>=.7?base+30:base)-m.spR)*Math.min(1,dt*18);if(ph>=.45&&ph<.7)g.lineStyle(2,0xffffff,.35+.5*Math.sin((ph-.45)/.25*Math.PI)).strokeEllipse(m.x,m.y,(base+42)*2,(base+42)*1.5);const R=m.spR+12,inr=")
rep("if(m.tm<=0){m.st='crown';m.cd=1;m.jw.forEach(j=>{j.st='ring'})}}break;\n  case 'scatter':", "if(m.tm<=0){m.st='crown';m.cd=1;m.spR=0;m.jw.forEach(j=>{j.st='ring'})}}break;\n  case 'scatter':")
a = " // 턱마다 톱날 이빨 한 쌍(픽셀):"
if s.count(a) != 1: raise SystemExit('anchor hcTeeth')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
