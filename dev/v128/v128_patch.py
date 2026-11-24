#!/usr/bin/env python3
"""v127 -> v128: 땅울음 땅속 모습 2가지(75°·89° — 개발자 선택) 무작위 + 지나온 길에 흙덩이 자국(잔상) + 움직일 때 흙덩이 더 많이
그림 dev/v128/img/mound.png(75°), mound2.png(89°) — tools/v116_sdf/mound2.py mB2
사용: python3 dev/v128/v128_patch.py index.html"""
import sys, os, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v127</title>', '<title>공허 기생충 v128</title>')
rep("window.VP_VER='v127';", "window.VP_VER='v128';")
K = ['mound', 'mound2']
d = {k: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(H, 'img', k + '.png'), 'rb').read()).decode() for k in K}
js = 'const V128I={' + ','.join(f"{k}:'{v}'" for k, v in d.items()) + '};window.__v128Im={};for(const k in V128I){const im=new Image();im.src=V128I[k];__v128Im[k]=im}\n'
js += "function v128Tex(s){const L=window.__v128Im||{};for(const k in L){const im=L[k];if(!im.complete||!im.naturalWidth)continue;if(s.textures.exists(k)){if(s.textures.get(k).__v128)continue;s.textures.remove(k)}const t=s.textures.addImage(k,im);t.setFilter(Phaser.Textures.FilterMode.NEAREST);t.__v128=t.__v127=t.__v125=t.__v124=t.__v116=1}}\n"
rep("function v116Tex(s){", js + "function v116Tex(s){")
rep("Object.values(window.__v127Im||{}));", "Object.values(window.__v127Im||{}),Object.values(window.__v128Im||{}));")
rep("v126Tex(this);v127Tex(this);", "v126Tex(this);v127Tex(this);v128Tex(this);")
# 땅속 모습 2가지 무작위 (skin)
rep("const N={kha:3,gna:2,gnac:2,rek:2}[b]", "const N={kha:3,gna:2,gnac:2,rek:2,mound:2}[b]")
rep("s.setTexture('mound').setDepth(1.6)", "s.setTexture(this.skin(m,'mound')).setDepth(1.6)", 2)
rep("e.st=='up'?this.skin(e,'rek'):'mound')", "e.st=='up'?this.skin(e,'rek'):this.skin(e,'mound'))")
# 움직일 때 흙덩이 더 많이 + 지나온 길에 흙덩이 자국
rep("m.cl=(m.cl||0)-dt;if(m.cl<=0){m.cl=v>50?.06:.15;this.rkClod(m.x,m.y,m.mh+Math.PI+(Math.random()-.5)*2.4,v>50?1:.7)}",
    "m.cl=(m.cl||0)-dt;if(m.cl<=0){m.cl=v>50?.035:.09;for(let i=0;i<2;i++)this.rkClod(m.x,m.y,m.mh+Math.PI+(Math.random()-.5)*2.6,v>50?1:.7)}m.tr=(m.tr||0)-dt;if(m.tr<=0){m.tr=v>50?.04:.08;this.rkTrail(m)}")
rep("\n hud(){\n", """
 // v128 지나온 길의 흙덩이 자국: 둔덕 뒤쪽 바닥에 흙덩이를 깔고 천천히 사라짐(잔상)
 rkTrail(m){const a=(m.mh??0),bx=m.x-Math.cos(a)*13,by=m.y-Math.sin(a)*13,px=-Math.sin(a),py=Math.cos(a),CL=[0x4a4056,0x5c5068,0x6e6480,0x847a96];
  for(let i=0;i<2;i++){const o=(Math.random()-.5)*14,sz=2.5+Math.random()*3,r=this.add.rectangle(bx+px*o+(Math.random()-.5)*4,by+py*o+(Math.random()-.5)*4,sz,sz*(.6+Math.random()*.5),CL[Math.floor(Math.random()*4)]).setDepth(1.5).setRotation(Math.random()*3).setStrokeStyle(1,0x16101e,.7);this.dec.push(r);
   this.tweens.add({targets:r,alpha:0,scale:.6,delay:500+Math.random()*400,duration:1300+Math.random()*500,onComplete:()=>r.destroy()})}}
 hud(){
""")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
