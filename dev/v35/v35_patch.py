#!/usr/bin/env python3
"""v34 -> v35: 조이스틱 고리 K1(55) · 개구리 점프 J3(상황 따라) · 중간 보스 이름 연출 +0.5초.
사용: python3 dev/v35/v35_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new, cnt)

rep('<title>공허 기생충 v34</title>', '<title>공허 기생충 v35</title>')
rep("window.VP_VER='v34';", "window.VP_VER='v35';")

# ---- 1) 조이스틱 K1: 고리 40→55, 손잡이 15→20, 최대 이동 34→46 ----
rep("y:Phaser.Math.Clamp(p.y,46,314)};", "y:Phaser.Math.Clamp(p.y,61,299)};")
rep("this.jo={x:Phaser.Math.Clamp(p.x,46,400)", "this.jo={x:Phaser.Math.Clamp(p.x,61,400)")
rep("if(l>46){const k=(l-46)/l;o.x+=vx*k;o.y+=vy*k;vx=J.x-o.x;vy=J.y-o.y;l=46}fr=Math.min(1,Math.max(0,(l-5)/30));",
    "if(l>58){const k=(l-58)/l;o.x+=vx*k;o.y+=vy*k;vx=J.x-o.x;vy=J.y-o.y;l=58}fr=Math.min(1,Math.max(0,(l-6)/40));")
rep("m=Math.min(l,34);kx+=vx/l*m;ky+=vy/l*m}", "m=Math.min(l,46);kx+=vx/l*m;ky+=vy/l*m}")
rep("g.fillStyle(0x241c38,.3*a).fillCircle(jo.x,jo.y,40);g.lineStyle(1.5,0xa08cdc,.5*a).strokeCircle(jo.x,jo.y,40);g.fillStyle(0xa65cff,.65*a).fillCircle(kx,ky,15);g.lineStyle(1,0xe0c8ff,.6*a).strokeCircle(kx,ky,15)",
    "g.fillStyle(0x241c38,.3*a).fillCircle(jo.x,jo.y,55);g.lineStyle(1.5,0xa08cdc,.5*a).strokeCircle(jo.x,jo.y,55);g.fillStyle(0xa65cff,.65*a).fillCircle(kx,ky,20);g.lineStyle(1,0xe0c8ff,.6*a).strokeCircle(kx,ky,20)")
rep("strokeCircle(110,276,40);g.fillStyle(0xa65cff,.18+.12*pu).fillCircle(110,276,15);if(!this.jhT)this.jhT=this.add.text(110,224,",
    "strokeCircle(110,270,55);g.fillStyle(0xa65cff,.18+.12*pu).fillCircle(110,270,20);if(!this.jhT)this.jhT=this.add.text(110,203,")

# ---- 2) 개구리(대 유충) 점프 J3: 거리에 따라 짧게·중간·긴 도약 ----
# jk: 0 한가로이(36px) · 1 경계(가까워지면 짧게 31px) · 2 도망(중간 69px) · 3 물리기 직전 긴 도약(114px)
rep("const nr=d<170;if(!f.st||f.st=='rest'||f.st=='charge'||f.st=='dash')f.st='sit';",
    "const nr=d<170,jk=d<75?3:d<170?2:d<250?1:0;if(!f.st||f.st=='rest'||f.st=='charge'||f.st=='dash')f.st='sit';")
rep("if(nr)f.tm=Math.min(f.tm,.25);\n    if(f.tm<=0){f.big=nr;f.st='crouch';f.tm=f.cd0=nr?.4:.22;let g=nr?Math.atan2(dy,dx)+(Math.random()-.5)*.9:Math.random()*6.283;if(nr){const pp=this.nearPool(f,th);if(pp)g=Math.atan2(pp[1]-f.y,pp[0]-f.x)}const g2=this.pickDir(f,g,nr?80:45);",
    "if(jk)f.tm=Math.min(f.tm,jk==1?.5:.25);\n    if(f.tm<=0){f.jk=jk;f.big=jk==3;f.st='crouch';f.tm=f.cd0=[.22,.18,.25,.4][jk];let g=jk?Math.atan2(dy,dx)+(Math.random()-.5)*(jk==1?1.4:.9):Math.random()*6.283;if(jk>=2){const pp=this.nearPool(f,th);if(pp)g=Math.atan2(pp[1]-f.y,pp[0]-f.x)}const g2=this.pickDir(f,g,jk?80:45);")
rep("if(f.tm<=0){f.st='air';f.tm=f.dur=f.big?.42:.3}}",
    "if(f.tm<=0){f.st='air';f.tm=f.dur=[.3,.28,.3,.4][f.jk||0]*(.85+Math.random()*.3)}}")
rep("const q=1-Math.max(f.tm,0)/f.dur,v=f.big?290:120;this.mv(f,f.ux*v*dt,f.uy*v*dt,30);oy=-Math.sin(Math.PI*q)*(f.big?24:11);",
    "const q=1-Math.max(f.tm,0)/f.dur,J=f.jk||0,v=[120,110,230,285][J];this.mv(f,f.ux*v*dt,f.uy*v*dt,30);oy=-Math.sin(Math.PI*q)*[11,9,15,24][J];")
rep("if(f.tm<=0){f.st='sit';f.tm=nr?.3:1.1+Math.random()*2.4}}}",
    "if(f.tm<=0){f.st='sit';f.tm=jk>=2?.25:jk==1?.45:1.1+Math.random()*2.4}}}")

# ---- 3) 중간 보스 이름 연출 +0.5초 (이름이 다 보이는 시간 1.9 → 2.4초) ----
rep("this.cineStart(4.2,(t)=>{ov.setAlpha(Math.max(0,1-t/.8));", "this.cineStart(4.7,(t)=>{ov.setAlpha(Math.max(0,1-t/.8));")
rep("const ta=t<1.4?0:t<1.8?(t-1.4)/.4:t<3.7?1:Math.max(0,1-(t-3.7)/.5);t1.setAlpha(ta);",
    "const ta=t<1.4?0:t<1.8?(t-1.4)/.4:t<4.2?1:Math.max(0,1-(t-4.2)/.5);t1.setAlpha(ta);")

open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
