#!/usr/bin/env python3
"""v75 -> v76: 포식 2·3단계 몸통 = D4 작은 돌기 · 포식 중간 보스 '허기의 왕관': 흡수하면 체력 회복 · 물어뜯기 더 어렵게 · 턱마다 톱날 이빨 다무는 모션 · 새 패턴 회전 베기(원 안에 있으면 초당 18 피해)
본체: dev/v76/v76_methods.js · 사용: python3 dev/v76/v76_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v76_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v75</title>', '<title>공허 기생충 v76</title>')
rep("window.VP_VER='v75';", "window.VP_VER='v76';")
# --- 포식 몸통: 등 톱날(B2) → D4 작은 돌기
rep("if(L.p>=2){const big=L.p>=3,h=big?2.6-i*.3:1.6-i*.2;for(let k=-1;k<=1;k++){const bx=c+k*1.7;for(let t=0;t<=h;t+=.5){const w=.9*(1-t/h);for(let q=-w;q<=w;q+=.5)px(x,bx-t*.35+q,c-r+.2-t,t+.5>h?'#ffffff':'#ffe0ea')}px(x,bx+1,c-r,'#3d1b6b')}if(big){for(let k=-1;k<=1;k+=2){const bx=c+k*1.4;for(let t=0;t<=1.4;t+=.5)px(x,bx-t*.3,c+r-.2+t,'#ffd0e0')}}}",
    "if(L.p>=2){const n=L.p>=3?[-1.6,0,1.6]:[-.8,.8];for(const dx of n){px(x,c+dx,c-r-.2,'#e8b0c4');px(x,c+dx,c-r+.6,'#c8889c')}}")
# --- 허기의 왕관
# 1) 흡수하면 체력 회복: 유충 4% · 들숨 끝에 플레이어를 붙잡으면 8%
rep("m.gr=Math.min(3,gr+1);this.dtx(m.x,m.y-56,'유충을 삼켰다 — 턱이 커졌다','#ff7a9a')",
    "m.gr=Math.min(3,gr+1);m.hp=Math.min(m.mh,m.hp+m.mh*.04);this.dtx(m.x,m.y-56,'유충을 삼켰다 — 턱이 커지고 체력 회복','#ff7a9a')")
rep("if(((p.x-m.x)/52)**2+((p.y-m.y)/36)**2<1)this.hurt(D(26),'허기의 들숨',m);",
    "if(((p.x-m.x)/52)**2+((p.y-m.y)/36)**2<1){this.hurt(D(26),'허기의 들숨',m);m.hp=Math.min(m.mh,m.hp+m.mh*.08);this.dtx(m.x,m.y-56,'흡수 — 왕관의 체력 +8%','#7be0a8')}")
# 2) 달려드는 턱: 겨눔 0.55→0.5초, 속도 460→500, 움직이는 쪽을 조금(0.1초) 미리 노림
rep("j.st='aim';j.t=.55*en;j.v=460;j.tx=Phaser.Math.Clamp(p.x+(Math.random()-.5)*50,60,740);j.ty=Phaser.Math.Clamp(p.y+(Math.random()-.5)*40,60,300);",
    "j.st='aim';j.t=.5*en;j.v=500;j.tx=Phaser.Math.Clamp(p.x+p.body.velocity.x*.1+(Math.random()-.5)*44,60,740);j.ty=Phaser.Math.Clamp(p.y+p.body.velocity.y*.1+(Math.random()-.5)*34,60,300);")
# 4) 회전 베기: 턱 상태 'spin' · 보스가 빠르게 다가옴 · 턱 하나하나의 부딪힘 피해는 빼고 원 안 지속 피해로
rep("   else if(j.st=='hold'&&m.st!='scatter'&&m.st!='clamp')j.st='ring';",
    "   else if(j.st=='spin'){const a=j.a+(m.srot||0),R=46*sc,tx=m.x+Math.cos(a)*R,ty=m.y+Math.sin(a)*R*.75,k=Math.min(1,dt*10);j.x+=(tx-j.x)*k;j.y+=(ty-j.y)*k;j.fa=a+Math.PI/2}\n"
    "   else if(j.st=='hold'&&m.st!='scatter'&&m.st!='clamp')j.st='ring';")
rep("if(Math.hypot(p.x-j.x,p.y-j.y)<20*sc&&!(j.hc>now)){j.hc=now+1000;this.hurt(D(j.st=='lunge'?11:5),'허기의 턱',m);if(!m.on)return}}",
    "if(j.st!='spin'&&Math.hypot(p.x-j.x,p.y-j.y)<20*sc&&!(j.hc>now)){j.hc=now+1000;this.hurt(D(j.st=='lunge'?11:5),'허기의 턱',m);if(!m.on)return}}\n  this.hcTeeth(m,now);")
rep("if(d>130){m.x+=dx/d*26*dt;m.y+=dy/d*18*dt}", "if(d>(m.st=='spin'?4:130)){m.x+=dx/d*(m.st=='spin'?78:26)*dt;m.y+=dy/d*(m.st=='spin'?60:18)*dt}")
rep("    else if(r<.8||m.inc>now){m.ns++;this.hcClamp(m,D,en)}",
    "    else if(m.hp<m.mh*.7&&!(m.spc>now)&&r<.45){m.ns++;m.st='spinW';m.tm=.8;m.spc=now+8000;this.dtx(m.x,m.y-50,'회전 베기 — 원 밖으로!','#ff5a7a');m.jw.forEach(j=>{j.st='spin'})}\n"
    "    else if(r<.8||m.inc>now){m.ns++;this.hcClamp(m,D,en)}")
rep("  case 'scatter':if(m.tm<=0){m.st='crown';m.cd=1.2;m.jw.forEach(j=>{j.st='ring'})}break;",
    "  case 'spinW':{const k=1-m.tm/.8,R=46*sc+12;g.lineStyle(2,0xff3a5a,.35+.5*k).strokeEllipse(m.x,m.y,R*2,R*1.5);m.srot=(m.srot||0)+dt*(3+6*k);if(m.tm<=0){m.st='spin';m.tm=3.2}}break;\n"
    "  case 'spin':{m.srot=(m.srot||0)+dt*11;const R=46*sc+12,inr=((p.x-m.x)/R)**2+((p.y-m.y)/(R*.75))**2<1;g.lineStyle(2,0xff3a5a,.4).strokeEllipse(m.x,m.y,R*2,R*1.5);\n"
    "   if(inr){const n=D(18);this.en-=n*dt*(this.dmt||1);this.lastHit={src:'허기의 회전 베기',t:now};m.spT=(m.spT||0)-dt;if(m.spT<=0){m.spT=.5;this.dtx(p.x,p.y-22,'-'+Math.round(n/2),'#ff5a7a');(this.bd||[]).forEach(o=>o.setTint(0xff6a8a));this.time.delayedCall(120,()=>(this.bd||[]).forEach(o=>o.clearTint()))}}\n"
    "   if(m.tm<=0){m.st='crown';m.cd=1;m.jw.forEach(j=>{j.st='ring'})}}break;\n"
    "  case 'scatter':if(m.tm<=0){m.st='crown';m.cd=1.2;m.jw.forEach(j=>{j.st='ring'})}break;")
rep("mbDie(m){if(!m.on)return;m.on=0;m.gone=1;this.kc=(this.kc||0)+1;const x=m.x,y=m.y,s=m.spr;m.spr=null;if(m.g){m.g.destroy();m.g=null}",
    "mbDie(m){if(!m.on)return;m.on=0;m.gone=1;this.kc=(this.kc||0)+1;const x=m.x,y=m.y,s=m.spr;m.spr=null;if(m.g){m.g.destroy();m.g=null}if(m.gb){m.gb.destroy();m.gb=null}")
# 새 hcClamp(뒤에 정의 = 이김) + hcTeeth
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
