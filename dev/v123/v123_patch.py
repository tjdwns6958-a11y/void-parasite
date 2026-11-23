#!/usr/bin/env python3
"""v122 -> v123: 큰 먹이 = 청개구리 3종(민트+보라 옆줄 · 연보라+등줄 · 짙은 청록+빛나는 점) 무작위
그림 dev/v123/img/fl1~3.png(앉음) · flj1~3.png(뛰기 직전, 모션용) — tools/v116_sdf/frog2d.py
사용: python3 dev/v123/v123_patch.py index.html"""
import sys, os, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v122</title>', '<title>공허 기생충 v123</title>')
rep("window.VP_VER='v122';", "window.VP_VER='v123';")
K = ['fl1', 'fl2', 'fl3', 'flj1', 'flj2', 'flj3']
d = {k: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(H, 'img', k + '.png'), 'rb').read()).decode() for k in K}
js = 'const V123I={' + ','.join(f"{k}:'{v}'" for k, v in d.items()) + '};window.__v123Im={};for(const k in V123I){const im=new Image();im.src=V123I[k];__v123Im[k]=im}\n'
js += "function v123Tex(s){const L=window.__v123Im||{};for(const k in L){const im=L[k];if(!im.complete||!im.naturalWidth||s.textures.exists(k))continue;s.textures.addImage(k,im).setFilter(Phaser.Textures.FilterMode.NEAREST)}}\n"
rep("function v116Tex(s){", js + "function v116Tex(s){")
rep("{const L=Object.values(window.__v116Im||{}).concat(Object.values(window.__v120Im||{}));", "{const L=Object.values(window.__v116Im||{}).concat(Object.values(window.__v120Im||{}),Object.values(window.__v123Im||{}));")
rep("makeAll(this);v116Tex(this);", "makeAll(this);v116Tex(this);v123Tex(this);")
rep("f.spr=this.add.image(f.x,f.y,f.tex||'f_'+f.t).setDepth(5);", "f.spr=this.add.image(f.x,f.y,this.fTex(f)).setDepth(5);")
rep("const f={t,x,y,p:0,on:1,c:-1,r:-1};f.spr=this.add.image(x,y,'f_'+t)", "const f={t,x,y,p:0,on:1,c:-1,r:-1};f.spr=this.add.image(x,y,this.fTex(f))")
# 첫 설명 페이지: 큰 먹이 아이콘 = 청개구리
rep("FD={p:[['f_s',14],['f_l',18],['kha',24]]", "FD={p:[['f_s',14],['fl1',18],['kha',24]]")
rep("f_l:'등껍질 유충 (큰 먹이)'", "fl1:'청개구리 (큰 먹이)'")
rep("\n hud(){\n", "\n fTex(f){if(f.tex)return f.tex;if(f.t=='l'&&this.textures.exists('fl1'))return f.tex='fl'+(1+Math.floor(Math.random()*3));return 'f_'+f.t}\n hud(){\n")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
