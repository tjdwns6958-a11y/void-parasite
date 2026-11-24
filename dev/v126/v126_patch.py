#!/usr/bin/env python3
"""v125 -> v126: 일반 몬스터 모션
- 개구리(큰 먹이): 앉음 fl → 웅크림 flj(뛸 방향으로 몸을 돌림) → 공중 fla(뒷다리 쭉, 바닥 그림자) → 착지 flj → 앉음
- 제르사이 유생: 걸을 때 뒤뚱(좌우 흔들림·통통 튐), 도망칠 때 빠른 종종걸음 + 흙먼지, 먹을 때 고개 까딱,
  웅크릴 때 결정이 확 곤두섬(커졌다 줄어듦) + 굴러가듯 흔들림, 풀기 직전 부르르
- 땅울음: 땅속 둔덕이 움직일 때 흔들림, 솟기 전 흙 튐, 올라와서 걸을 때 다리 종종(흔들림), 물 때 앞으로 덥석(돌진),
  파고들 때 몸을 비틀며 흙을 튀김
그림 dev/v126/img/fla1~3.png — tools/v116_sdf/frog2d.py pose 4
메서드: 원래 flee·gnaAI·rekAI를 고쳐 뒤에 다시 정의(뒤의 것이 이김)
사용: python3 dev/v126/v126_patch.py index.html"""
import sys, os, base64, re
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1, src=None):
    global s
    t = s if src is None else src
    n = t.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    t = t.replace(old, new)
    if src is None: s = t
    return t
rep('<title>공허 기생충 v125</title>', '<title>공허 기생충 v126</title>')
rep("window.VP_VER='v125';", "window.VP_VER='v126';")
K = ['fla1', 'fla2', 'fla3']
d = {k: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(H, 'img', k + '.png'), 'rb').read()).decode() for k in K}
js = 'const V126I={' + ','.join(f"{k}:'{v}'" for k, v in d.items()) + '};window.__v126Im={};for(const k in V126I){const im=new Image();im.src=V126I[k];__v126Im[k]=im}\n'
js += "function v126Tex(s){const L=window.__v126Im||{};for(const k in L){const im=L[k];if(!im.complete||!im.naturalWidth||s.textures.exists(k))continue;s.textures.addImage(k,im).setFilter(Phaser.Textures.FilterMode.NEAREST)}}\n"
rep("function v116Tex(s){", js + "function v116Tex(s){")
rep("Object.values(window.__v125Im||{}));", "Object.values(window.__v125Im||{}),Object.values(window.__v126Im||{}));")
rep("v124Tex(this);v125Tex(this);", "v124Tex(this);v125Tex(this);v126Tex(this);")
def method(name):
    i = s.index('\n ' + name + '(')
    m = re.compile(r'\n [a-zA-Z_$][\w$]*\([^)]*\)\{').search(s, i + 5)
    return s[i:m.start()]
# ---------- 개구리 ----------
F = method('flee')
F = rep("else{ // 대 유충: 개구리처럼 앉아 있다가 웅크려 뛴다\n   const nr=d<170,", "else{ // 대 유충: 개구리처럼 앉아 있다가 웅크려 뛴다 (v126: 앉음·웅크림·공중·착지 그림 + 뛸 방향으로 몸 돌림 + 그림자)\n   const fk=f.tex&&/^fl\\d$/.test(f.tex)?f.tex[2]:null,ft=k=>{if(fk&&s.texture.key!==k+fk)s.setTexture(k+fk)};if(fk)s.setFlipX(false).setRotation(f.rot||0);\n   const nr=d<170,", src=F)
F = rep("if(f.st=='sit'){const b=", "if(f.st=='sit'){ft('fl');const b=", src=F)
F = rep("f.ux=Math.cos(g2);f.uy=Math.sin(g2);s.setFlipX(f.ux<0)}}", "f.ux=Math.cos(g2);f.uy=Math.sin(g2);if(fk){f.rot=g2+Math.PI/2;s.setRotation(f.rot)}else s.setFlipX(f.ux<0)}}", src=F)
F = rep("else if(f.st=='crouch'){const q=", "else if(f.st=='crouch'){ft('flj');const q=", src=F)
F = rep("if(f.tm<=0){f.st='air';f.tm=f.dur=[.3,.28,.3,.4][f.jk||0]*(.85+Math.random()*.3)}}",
        "if(f.tm<=0){f.st='air';f.tm=f.dur=[.3,.28,.3,.4][f.jk||0]*(.85+Math.random()*.3);if(fk){const sh=this.add.ellipse(f.x,f.y+7,18,7,0x000000,.32).setDepth(4.9);this.dec.push(sh);f.sh=sh;this.time.delayedCall(f.dur*1000+80,()=>{if(sh.scene)sh.destroy()})}}}", src=F)
F = rep("else if(f.st=='air'){const q=1-Math.max(f.tm,0)/f.dur,J=f.jk||0,v=[120,110,230,285][J];this.mv(f,f.ux*v*dt,f.uy*v*dt,30);oy=-Math.sin(Math.PI*q)*[11,9,15,24][J];sx=.82;sy=1.28;",
        "else if(f.st=='air'){ft('fla');const q=1-Math.max(f.tm,0)/f.dur,J=f.jk||0,v=[120,110,230,285][J];this.mv(f,f.ux*v*dt,f.uy*v*dt,30);oy=-Math.sin(Math.PI*q)*[11,9,15,24][J];sx=fk?.94:.82;sy=fk?1.1:1.28;if(f.sh&&f.sh.scene)f.sh.setPosition(f.x,f.y+7).setScale(1-.45*Math.sin(Math.PI*q)).setAlpha(.32-.14*Math.sin(Math.PI*q));", src=F)
F = rep("else if(f.st=='land'){sx=1.32;sy=.72;", "else if(f.st=='land'){ft('flj');if(f.sh&&f.sh.scene){f.sh.destroy();f.sh=null}sx=fk?1.18:1.32;sy=fk?.84:.72;", src=F)
# ---------- 제르사이 유생 ----------
G = method('gnaAI')
G = rep("let sx=1,sy=1;", "let sx=1,sy=1,ox=0,oy=0,wob=0;if(m.st=='curl'&&m.pst!='curl')m.ct=0;m.pst=m.st;m.ct=(m.ct||0)+dt;", src=G)
G = rep("if(m.st=='curl'){sy=1+Math.sin(now/90)*.04;s.setRotation(0);",
        "if(m.st=='curl'){sy=1+Math.sin(now/90)*.04;const pop=Math.max(0,1-m.ct/.18);sx=sy=sy+pop*.35;s.setRotation(Math.sin(now/260+m.x)*.18+(m.ct<.18?(Math.random()-.5)*.3:0));if(m.tm<.35&&m.tm>0)ox=(Math.random()-.5)*2.4;", src=G)
G = rep("m.ph=(m.ph||0)+dt*9;sx=1+Math.sin(m.ph)*.12}", "m.ph=(m.ph||0)+dt*18;sx=1+Math.sin(m.ph)*.1;wob=Math.sin(m.ph)*.2;oy=-Math.abs(Math.sin(m.ph))*1.6;m.du=(m.du||0)-dt;if(m.du<=0){m.du=.12;const b=this.add.circle(m.x-Math.cos(m.hd)*10+(Math.random()-.5)*4,m.y-Math.sin(m.hd)*10+3,1.6+Math.random(),0x8a809a,.7).setDepth(5);this.tweens.add({targets:b,alpha:0,scale:.3,duration:380,onComplete:()=>b.destroy()})}}", src=G)
G = rep("m.ph=(m.ph||0)+dt*14;sy=1+Math.sin(m.ph)*.08;", "m.ph=(m.ph||0)+dt*14;sy=1+Math.sin(m.ph)*.08;{const k=Math.max(0,Math.sin(m.ph))*2;ox=Math.cos(m.hd||0)*k;oy=Math.sin(m.hd||0)*k}", src=G)
G = rep("m.ph=(m.ph||0)+dt*4;sx=1+Math.sin(m.ph)*.06}", "const mv=m.tg||m.go;m.ph=(m.ph||0)+dt*(mv?10:3);sx=1+Math.sin(m.ph)*.05;if(mv){wob=Math.sin(m.ph)*.13;oy=-Math.abs(Math.sin(m.ph))*1}}", src=G)
G = rep("if(m.hd!==undefined&&m.st!='curl')s.setRotation(m.hd).setFlipY(Math.cos(m.hd)<0);", "if(m.hd!==undefined&&m.st!='curl')s.setRotation(m.hd+wob).setFlipY(Math.cos(m.hd)<0);", src=G)
G = rep("s.setScale(sx*z,sy*z).setPosition(m.x,m.y)}", "s.setScale(sx*z,sy*z).setPosition(m.x+ox,m.y+oy)}", src=G)
# ---------- 땅울음 ----------
R = method('rekAI')
R = rep("s.setScale(1+Math.sin(now/(v>50?50:110))*.1,1).setPosition(m.x,m.y);", "s.setScale(1+Math.sin(now/(v>50?50:110))*.1,1).setPosition(m.x,m.y).setRotation(ed>4?Math.sin(now/(v>50?45:90))*.08:0);", src=R)
R = rep("else if(m.st=='warn'){s.setPosition(m.x+(Math.random()-.5)*4,m.y).setScale(1.2,1.1);", "else if(m.st=='warn'){const wq=1-Math.max(0,m.tm)/R.erupt;s.setPosition(m.x+(Math.random()-.5)*(3+wq*5),m.y+(Math.random()-.5)*wq*3).setScale(1.1+wq*.25,1.05+wq*.15);m.du=(m.du||0)-dt;if(m.du<=0){m.du=.09;this.dirt(m.x+(Math.random()-.5)*20,m.y+(Math.random()-.5)*10)}", src=R)
R = rep("if(!m.rest&&d<220){this.steer(m,Math.atan2(dy,dx),45,dt,26);s.setRotation(Math.atan2(dy,dx)+Math.PI/2);if(d<34&&m.cd<=0){m.cd=1.2;this.hurt(Math.round(R.bite*(m.df||1)),'땅울음의 물기',m);m.hg=Math.min(100,m.hg+8);s.setScale(1.15,.9);this.time.delayedCall(120,()=>{if(m.spr)m.spr.setScale(1)})}}\n   else s.setRotation(s.rotation+Math.sin(now/300)*.01);\n   s.setPosition(m.x,m.y);",
        "let lx=0,ly=0;m.lg=Math.max(0,(m.lg||0)-dt);\n   if(!m.rest&&d<220){this.steer(m,Math.atan2(dy,dx),45,dt,26);const fa=Math.atan2(dy,dx);s.setRotation(fa+Math.PI/2+Math.sin(now/55)*.07);if(!m.lg)s.setScale(1+Math.sin(now/55)*.035,1-Math.sin(now/55)*.025);if(d<34&&m.cd<=0){m.cd=1.2;m.lg=.2;m.lga=fa;this.hurt(Math.round(R.bite*(m.df||1)),'땅울음의 물기',m);m.hg=Math.min(100,m.hg+8)}}\n   else{s.setRotation(s.rotation+Math.sin(now/300)*.01);if(!m.lg)s.setScale(1+Math.sin(now/420)*.03,1+Math.sin(now/420)*.03)}\n   if(m.lg){const q=Math.sin(Math.PI*(1-m.lg/.2));lx=Math.cos(m.lga)*q*8;ly=Math.sin(m.lga)*q*8;s.setScale(1-q*.12,1+q*.16)}\n   s.setPosition(m.x+lx,m.y+ly);", src=R)
R = rep("else if(m.st=='dig'){s.setScale(1,Math.max(.3,.5+m.tm)).setPosition(m.x,m.y);", "else if(m.st=='dig'){s.setScale(1,Math.max(.3,.5+m.tm)).setPosition(m.x+(Math.random()-.5)*2,m.y).setRotation(s.rotation+Math.sin(now/40)*.05);m.du=(m.du||0)-dt;if(m.du<=0){m.du=.07;this.dirt(m.x+(Math.random()-.5)*18,m.y+4+(Math.random()-.5)*8)}", src=R)
rep("\n hud(){\n", "\n // ===== v126 모션: 아래 세 메서드가 위의 같은 이름 메서드를 덮어씀 =====" + F + G + R + "\n hud(){\n")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
