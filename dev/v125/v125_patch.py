#!/usr/bin/env python3
"""v124 -> v125: 땅울음 = 가재 몸 + 결정(광석이 한쪽에 몰려 자란 C안), 청회색·남보라 스킨 / 땅속 둔덕 새 명암
제르사이 유생 웅크림 = C자로 말고 등 바깥에 결정 파편 두 줄 + 작은 귀·주둥이 + 길게 뻗어 끝이 안으로 말린 꼬리(3-3)
그림 dev/v125/img/*.png — tools/v116_sdf/final125.py
사용: python3 dev/v125/v125_patch.py index.html"""
import sys, os, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v124</title>', '<title>공허 기생충 v125</title>')
rep("window.VP_VER='v124';", "window.VP_VER='v125';")
K = ['rek', 'rek2', 'mound', 'gnac', 'gnac2']
d = {k: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(H, 'img', k + '.png'), 'rb').read()).decode() for k in K}
js = 'const V125I={' + ','.join(f"{k}:'{v}'" for k, v in d.items()) + '};window.__v125Im={};for(const k in V125I){const im=new Image();im.src=V125I[k];__v125Im[k]=im}\n'
# 있는 키는 바꾸고 없는 키(rek2)는 새로. __v116·__v124 표시: 소용돌이 방에서 v116Tex가 다시 돌아도 덮어쓰지 않게
js += "function v125Tex(s){const L=window.__v125Im||{};for(const k in L){const im=L[k];if(!im.complete||!im.naturalWidth)continue;if(s.textures.exists(k)){if(s.textures.get(k).__v125)continue;s.textures.remove(k)}const t=s.textures.addImage(k,im);t.setFilter(Phaser.Textures.FilterMode.NEAREST);t.__v125=t.__v124=t.__v116=1}}\n"
rep("function v116Tex(s){", js + "function v116Tex(s){")
rep("Object.values(window.__v124Im||{}));", "Object.values(window.__v124Im||{}),Object.values(window.__v125Im||{}));")
rep("v123Tex(this);v124Tex(this);", "v123Tex(this);v124Tex(this);v125Tex(this);")
# 땅울음 스킨 (2색)
rep("const N={kha:3,gna:2,gnac:2}[b]", "const N={kha:3,gna:2,gnac:2,rek:2}[b]")
rep("m.rest=1;s.setTexture('rek')", "m.rest=1;s.setTexture(this.skin(m,'rek'))")
rep("m.rest=0;s.setTexture('rek')", "m.rest=0;s.setTexture(this.skin(m,'rek'))")
rep("e.spr=this.add.image(e.x,e.y,e.st=='up'?'rek':'mound')", "e.spr=this.add.image(e.x,e.y,e.st=='up'?this.skin(e,'rek'):'mound')")
# 새 땅울음은 키가 조금 커서(69px) 체력바를 조금 위로
rep("({rek:30,vdl:16,spn:20,lsp:16,qn:38,wd:34})[m.k]", "({rek:36,vdl:16,spn:20,lsp:16,qn:38,wd:34})[m.k]")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
