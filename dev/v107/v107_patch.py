#!/usr/bin/env python3
"""v106 -> v107 (허기의 왕관)
1) 턱 내리꽂기가 그냥 움직여도 맞던 문제: 원을 내 이동 방향 앞(0.22초 뒤 자리)에 찍어서, 조이스틱을 반쯤 미는 속도(약 70px/초)면 0.55초 뒤 딱 원 안에 들어가 있었음.
   → 원은 지금 내 자리에 찍음(움직이면 초당 약 55px 이상이면 빠져나감, 멈추면 맞음).
   + 내리꽂힌 턱이 제자리로 돌아가는 0.8초 동안은 몸에 닿아도 피해 없음(돌아가는 길에 맞던 '허기의 턱').
2) 허기 표식: 따로 나오던 패턴 없앰 → 회전 베기를 시작할 때만 유충 1마리(왕관에서 100px 넘게 떨어진 것 중 가장 가까운)에 표식. 회전하는 동안 왕관은 나 대신 표식 유충 쪽으로 천천히(52/40px/초) 다가가 회전 원에 닿으면 삼킴(한 단계 커짐 + 체력 6%).
   표식 유충은 그 자리에 붙잡혀(꿈틀거림만) 도망가지도 기어가지도 않음 · 회전이 끝나면 표식 풀림 · 유충이 없으면 예전처럼 나에게 다가감.
사용: python3 dev/v107/v107_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v106</title>', '<title>공허 기생충 v107</title>')
rep("window.VP_VER='v106';", "window.VP_VER='v107';")
# 1) 원은 지금 내 자리 · 돌아가는 턱은 잠깐 안전
rep("vx=p.body.velocity.x,vy=p.body.velocity.y,x=Phaser.Math.Clamp(p.x+vx*.22,60,740),y=Phaser.Math.Clamp(p.y+vy*.22,70,300)", "x=Phaser.Math.Clamp(p.x,60,740),y=Phaser.Math.Clamp(p.y,70,300)", 2)
rep("if(j.t<=0&&m.st!='jrain'){if(j.rl&&m.st=='scatter'){j.st='rUp'}else{j.rl=0;j.st='ring'}}", "if(j.t<=0&&m.st!='jrain'){if(j.rl&&m.st=='scatter'){j.st='rUp'}else{j.rl=0;j.st='ring';j.safe=now+800}}")
rep("if(m.rn>=6&&m.rt<=-.9){m.st='crown';m.cd=1;m.jw.forEach(j=>{if(j.st!='land')j.st='ring'})}", "if(m.rn>=6&&m.rt<=-.9){m.st='crown';m.cd=1;const nw=this.time.now;m.jw.forEach(j=>{if(j.st!='land'){j.st='ring';j.safe=nw+800}})}")
rep("if(m.st=='scatter'&&m.tm>.7)this.hcRainStrike(m,j,en);else{j.rl=0;j.st='ring'}", "if(m.st=='scatter'&&m.tm>.7)this.hcRainStrike(m,j,en);else{j.rl=0;j.st='ring';j.safe=this.time.now+800}")
rep("&&j.st!='rSky'&&Math.hypot(p.x-j.x,p.y-j.y)<22*sc&&!(j.hc>now)", "&&j.st!='rSky'&&!(j.safe>now)&&Math.hypot(p.x-j.x,p.y-j.y)<22*sc&&!(j.hc>now)")
# 2) 표식은 회전할 때만 · 회전 중엔 표식 유충 쪽으로 천천히
rep("    else if(!(m.hmc>now)&&r<.8&&this.hcMarkable()){m.ns++;m.st='markW';m.tm=.6;m.hmc=now+13000}\n", "")
rep("else if(!(m.spc>now)&&r<.35){m.ns++;m.st='spinW';m.tm=.8;m.spc=now+8000;this.dtx(m.x,m.y-50,'회전 베기 — 원 밖으로!','#ff5a7a');m.jw.forEach(j=>{j.st='spin'})}",
    "else if(!(m.spc>now)&&r<.35){m.ns++;m.st='spinW';m.tm=.8;m.spc=now+8000;const mk=this.hcMarkable()&&(this.hcMarkGo(m,1),1);this.dtx(m.x,m.y-50,mk?'회전 베기 — 표식 유충을 먼저 먹을 것!':'회전 베기 — 원 밖으로!','#ff5a7a');m.jw.forEach(j=>{j.st='spin'})}")
rep("if(F.length)this.dtx(m.x,m.y-50,'허기 표식 — 표식 유충을 먼저 먹을 것!','#ff9ac0')}", "if(F.length&&!arguments[1])this.dtx(m.x,m.y-50,'허기 표식 — 표식 유충을 먼저 먹을 것!','#ff9ac0')}")
rep("if(m.st!='inhale'&&m.st!='inhaleW'){const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy)||1;if(d>(m.st=='spin'?4:130)){m.x+=dx/d*(m.st=='spin'?78:26)*dt;m.y+=dy/d*(m.st=='spin'?60:18)*dt}",
    "if(m.st!='inhale'&&m.st!='inhaleW'){const mf=m.st=='spin'?this.cur.food.find(f=>f.hm&&f.on&&f.spr):null,dx=(mf?mf.spr.x:p.x)-m.x,dy=(mf?mf.spr.y:p.y)-m.y,d=Math.hypot(dx,dy)||1;if(d>(m.st=='spin'?4:130)){m.x+=dx/d*(m.st=='spin'?(mf?52:78):26)*dt;m.y+=dy/d*(m.st=='spin'?(mf?40:60):18)*dt}")
rep("   if(m.tm<=0){m.st='crown';m.cd=1;m.spR=0;m.jw.forEach(j=>{j.st='ring'})}}break;", "   if(m.tm<=0){m.st='crown';m.cd=1;m.spR=0;m.jw.forEach(j=>{j.st='ring'});for(const f of this.cur.food)f.hm=0}}break;")
# 표식 유충: 스스로 기어가지 않음 · 회전 원(또는 몸)에 닿으면 삼킴
rep("const dx=m.x-f.x,dy=m.y-f.y,d=Math.hypot(dx,dy)||1;f.x+=dx/d*60*dt;f.y+=dy/d*60*dt;f.spr.setPosition(f.x,f.y);", "f.x=f.spr.x;f.y=f.spr.y;")
rep("if(((f.x-m.x)/(75*bs))**2+((f.y-m.y)/(52*bs))**2<1){f.on=0;const s=f.spr;", "const RR=m.st=='spin'?(m.spR||54)+12:75*bs;if(((f.x-m.x)/RR)**2+((f.y-m.y)/(m.st=='spin'?RR*.75:52*bs))**2<1){f.on=0;const s=f.spr;")
rep("허기 표식: 유충 2~3마리에 붉은 표식 → 왕관 쪽으로 기어감(60px/초) → 닿으면 왕관이 삼키고 커짐(최대 3) + 체력 6% 회복. 내가 먼저 먹으면 끝.", "허기 표식(v107~): 회전 베기를 시작할 때 유충 1마리에 표식 → 회전하는 동안 왕관이 그 유충 쪽으로 다가가 회전 원에 닿으면 삼키고 커짐(최대 3) + 체력 6% 회복. 내가 먼저 먹으면 끝.")
rep(".sort((a,b)=>Math.hypot(b.spr.x-m.x,b.spr.y-m.y)-Math.hypot(a.spr.x-m.x,a.spr.y-m.y)).slice(0,1);", ".filter(f=>!arguments[1]||Math.hypot(f.spr.x-m.x,f.spr.y-m.y)>100).sort((a,b)=>(arguments[1]?-1:1)*(Math.hypot(b.spr.x-m.x,b.spr.y-m.y)-Math.hypot(a.spr.x-m.x,a.spr.y-m.y))).slice(0,1);")
# 회전 원이 맥박처럼 커지는 순간 예전(v102) 회전 먹기가 먼저 삼켜도 표식이면 회복
rep("f.on=0;const fs=f.spr;f.spr=null;this.tweens.add({targets:fs,x:m.x,y:m.y,scale:.2,alpha:0,duration:220,ease:'Quad.in',onComplete:()=>fs.destroy()});", "if(f.hm)m.hp=Math.min(m.mh,m.hp+m.mh*.06);f.on=0;const fs=f.spr;f.spr=null;this.tweens.add({targets:fs,x:m.x,y:m.y,scale:.2,alpha:0,duration:220,ease:'Quad.in',onComplete:()=>fs.destroy()});")
# 표식 유충은 그 자리에 붙잡혀 움직이지 않음(꿈틀거림만)
rep("if(f.t!='c'&&f.t!='h'&&!(hold&&f===tg)){this.flee(f,dt,p);", "if(f.hm&&f.spr){f.spr.setScale(1+.08*Math.sin(t/70),1-.06*Math.sin(t/70))}else if(f.t!='c'&&f.t!='h'&&!(hold&&f===tg)){this.flee(f,dt,p);")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
