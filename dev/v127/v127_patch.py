#!/usr/bin/env python3
"""v126 -> v127: 땅울음 땅속 모습 = B안(낫 턱 끝 + 빛나는 눈) 다듬기 — 가로를 줄이고 앞뒤로 길쭉·울퉁불퉁, 움직이는 방향으로 몸을 돌림
흙덩이 효과 rkClod: 땅속에서 움직일 때 뒤·옆으로 튐, 솟기 직전 조금, 솟구칠 때(공격·그냥 올라올 때) 사방으로 크게, 파고들 때도
그림 dev/v127/img/mound.png — tools/v116_sdf/mound2.py mB2 (pitch 75)
사용: python3 dev/v127/v127_patch.py index.html"""
import sys, os, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v126</title>', '<title>공허 기생충 v127</title>')
rep("window.VP_VER='v126';", "window.VP_VER='v127';")
d = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(H, 'img', 'mound.png'), 'rb').read()).decode()
js = "const V127I={mound:'" + d + "'};window.__v127Im={};for(const k in V127I){const im=new Image();im.src=V127I[k];__v127Im[k]=im}\n"
js += "function v127Tex(s){const L=window.__v127Im||{};for(const k in L){const im=L[k];if(!im.complete||!im.naturalWidth)continue;if(s.textures.exists(k)){if(s.textures.get(k).__v127)continue;s.textures.remove(k)}const t=s.textures.addImage(k,im);t.setFilter(Phaser.Textures.FilterMode.NEAREST);t.__v127=t.__v125=t.__v124=t.__v116=1}}\n"
rep("function v116Tex(s){", js + "function v116Tex(s){")
rep("Object.values(window.__v126Im||{}));", "Object.values(window.__v126Im||{}),Object.values(window.__v127Im||{}));")
rep("v125Tex(this);v126Tex(this);", "v125Tex(this);v126Tex(this);v127Tex(this);")
# 땅속: 움직이는 방향으로 몸을 돌리고(앞쪽 = 낫 턱), 흙덩이를 뒤·옆으로 튀김 (v126 rekAI 사본에만 있는 앵커)
rep(".setRotation(ed>4?Math.sin(now/(v>50?45:90))*.08:0);",
    ";if(ed>4){const ta=Math.atan2(ey,ex);m.mh=m.mh==null?ta:m.mh+Phaser.Math.Angle.Wrap(ta-m.mh)*Math.min(1,dt*6);m.cl=(m.cl||0)-dt;if(m.cl<=0){m.cl=v>50?.06:.15;this.rkClod(m.x,m.y,m.mh+Math.PI+(Math.random()-.5)*2.4,v>50?1:.7)}}s.setRotation((m.mh??-Math.PI/2)+Math.PI/2+(ed>4?Math.sin(now/(v>50?45:90))*.08:0));")
# 솟기 직전: 흙덩이 조금
rep("if(m.du<=0){m.du=.09;this.dirt(m.x+(Math.random()-.5)*20,m.y+(Math.random()-.5)*10)}", "if(m.du<=0){m.du=.09;this.dirt(m.x+(Math.random()-.5)*20,m.y+(Math.random()-.5)*10);if(Math.random()<.6)this.rkClod(m.x,m.y,Math.random()*6.283,.6)}")
# 솟구칠 때(공격): 사방으로 크게 / 그냥 올라올 때: 조금
rep("this.rkBurst(m);", "this.rkBurst(m);for(let i=0;i<22;i++)this.rkClod(m.x,m.y,i/22*6.283+Math.random()*.3,1.8+Math.random()*.8);", 2)
rep("m.st='up';m.tm=2;m.rest=1;s.setTexture(this.skin(m,'rek'))", "m.st='up';m.tm=2;m.rest=1;for(let i=0;i<10;i++)this.rkClod(m.x,m.y,Math.random()*6.283,1.3);s.setTexture(this.skin(m,'rek'))", 2)
# 파고들 때
rep("if(m.du<=0){m.du=.07;this.dirt(m.x+(Math.random()-.5)*18,m.y+4+(Math.random()-.5)*8)}", "if(m.du<=0){m.du=.07;this.dirt(m.x+(Math.random()-.5)*18,m.y+4+(Math.random()-.5)*8);this.rkClod(m.x,m.y,Math.random()*6.283,.8)}")
# 땅속으로 들어간 순간: 방향을 지금 보던 쪽으로
rep("m.st='under';m.cd=3.5;m.tm=0;s.setTexture('mound').setDepth(1.6).setScale(1).setRotation(0)}", "m.st='under';m.cd=3.5;m.tm=0;m.mh=s.rotation-Math.PI/2;s.setTexture('mound').setDepth(1.6).setScale(1).setRotation(s.rotation)}", 2)
rep("\n hud(){\n", """
 // v127 흙덩이: 포물선으로 튀었다가 떨어져 사라짐 (pw = 세기)
 rkClod(x,y,a,pw=1){const CL=[0x5c5068,0x6e6480,0x847a96,0x9a90aa],sz=3+Math.random()*2.4*pw,o=this.add.rectangle(x+Math.cos(a)*6,y+Math.sin(a)*4,sz,sz*(.7+Math.random()*.5),CL[Math.floor(Math.random()*4)]).setDepth(10).setStrokeStyle(1,0x16101e,.8);this.dec.push(o);
  const x0=o.x,y0=o.y,ds=(8+Math.random()*16)*pw,h=(5+Math.random()*9)*pw,dx=Math.cos(a)*ds,dy=Math.sin(a)*ds*.75,rt=(Math.random()-.5)*10;
  this.tweens.addCounter({from:0,to:1,duration:(260+Math.random()*200)*Math.sqrt(pw),onUpdate:t=>{if(!o.scene)return;const q=t.getValue();o.setPosition(x0+dx*q,y0+dy*q-h*4*q*(1-q)).setRotation(rt*q)},onComplete:()=>{if(!o.scene)return;this.tweens.add({targets:o,alpha:0,duration:240,onComplete:()=>o.destroy()})}})}
 hud(){
""")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
