#!/usr/bin/env python3
"""v45 -> v46: 물기 범위를 사다리꼴로(그림과 판정 모두) · 물 때 몸이 앞으로 살짝 나가며 공격(약 13px).
사다리꼴: 머리 앞 6px에서 반폭 10 → 사거리(64)에서 반폭 34. 판정은 여기에 상대 몸 크기 여유 12(+보스 추가 사거리의 절반)를 더함.
사용: python3 dev/v46/v46_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v45</title>', '<title>공허 기생충 v46</title>')
rep("window.VP_VER='v45';", "window.VP_VER='v46';")
# 범위 표시: 얇은 원 → 사다리꼴 (앞으로 나가는 몸을 따라 조금 밀려남)
rep("this.moStart('bite');const e=this.add.circle(p.x+fx*34,p.y+fy*34,20).setStrokeStyle(1.5,0xffffff,.5).setDepth(12);this.tweens.add({targets:e,alpha:0,scale:1.6,duration:160,onComplete:()=>e.destroy()});",
    "this.moStart('bite');this.lgT=.12;this.lgA=an;{const e=this.add.graphics({x:p.x,y:p.y}).setDepth(12).setRotation(an),P=[{x:6,y:-10},{x:C.BITE.range,y:-34},{x:C.BITE.range,y:34},{x:6,y:10}];e.fillStyle(0xffffff,.13).fillPoints(P,true);e.lineStyle(1.5,0xffffff,.6).strokePoints(P,true);this.tweens.add({targets:e,alpha:0,x:p.x+fx*12,y:p.y+fy*12,duration:200,onComplete:()=>e.destroy()})}")
# 판정: 부채꼴 → 사다리꼴
rep("if(d<C.BITE.range+(m.mb?m.br||0:m.k=='rw'||m.k=='em'?40:m.k=='sw'?18:0)&&(dx*fx+dy*fy)/(d||1)>.3&&",
    "if(this.inBite(dx,dy,fx,fy,m.mb?m.br||0:m.k=='rw'||m.k=='em'?40:m.k=='sw'?18:0)&&")
# 앞으로 살짝: 0.12초 동안 바라보는 쪽으로 속도 +110 (벽 충돌은 그대로)
rep("  p.setVelocity(this.vx,this.vy);\n  // 모서리", "  if(this.lgT>0){this.lgT-=dt;this.lgX=Math.cos(this.lgA)*110;this.lgY=Math.sin(this.lgA)*110;p.setVelocity(this.vx+this.lgX,this.vy+this.lgY)}else{this.lgX=this.lgY=0;p.setVelocity(this.vx,this.vy)}\n  // 모서리")
# 다음 프레임에 몸 속도를 읽을 때 지난 프레임의 '앞으로 밀기'는 빼고 읽는다 (안 빼면 밀기가 프레임마다 쌓임). 벽에 막혀 멈췄으면 0.
rep("this.vx=p.body.velocity.x;this.vy=p.body.velocity.y;", "{const bx=p.body.velocity.x,by=p.body.velocity.y,lx=this.lgX||0,ly=this.lgY||0;this.vx=lx&&Math.abs(bx)<Math.abs(lx)*.99&&Math.sign(bx)!==Math.sign(lx)?0:bx-lx;this.vy=ly&&Math.abs(by)<Math.abs(ly)*.99&&Math.sign(by)!==Math.sign(ly)?0:by-ly;if(lx&&Math.sign(bx)!==Math.sign(lx)&&Math.abs(bx)<1)this.vx=0;if(ly&&Math.sign(by)!==Math.sign(ly)&&Math.abs(by)<1)this.vy=0}")
rep(" moStart(k){", " inBite(dx,dy,fx,fy,ex){const al=dx*fx+dy*fy,lt=Math.abs(dy*fx-dx*fy),R=C.BITE.range+(ex||0);if(al<-6||al>R)return false;const t=Math.max(0,Math.min(1,(al-6)/(R-6)));return lt<=10+24*t+12+(ex||0)*.5}\n moStart(k){")
rep("this.mo=null;this.moG=null;this.moEat=null;", "this.mo=null;this.moG=null;this.moEat=null;this.lgT=0;this.lgX=0;this.lgY=0;")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
