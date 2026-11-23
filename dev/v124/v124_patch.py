#!/usr/bin/env python3
"""v123 -> v124: 일반 몬스터 새 그림 + 스킨(무작위)
- 낫그늘 = 전갈 3색(검정·강철·잉크 남보라, 은은한 광택) kha/kha2/kha3
- 제르사이 유생 = 결정 박힌 쥐 2색(청회색 수정 가루 · 짙은 청회색+빛나는 청록) gna/gna2, 웅크림 gnac/gnac2
- 땅울음 = 개미지옥+상어 (명암 부드럽게) rek, 땅속 둔덕 mound
- 작은 먹이 = 결정 진드기 3색(보랏빛·남보라+청록·짙은 남보라+시안) f_s/f_s2/f_s3
그림 dev/v124/img/*.png — tools/v116_sdf/final124.py
사용: python3 dev/v124/v124_patch.py index.html"""
import sys, os, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v123</title>', '<title>공허 기생충 v124</title>')
rep("window.VP_VER='v123';", "window.VP_VER='v124';")
K = ['kha', 'kha2', 'kha3', 'gna', 'gna2', 'gnac', 'gnac2', 'rek', 'mound', 'f_s', 'f_s2', 'f_s3']
d = {k: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(H, 'img', k + '.png'), 'rb').read()).decode() for k in K}
js = 'const V124I={' + ','.join(f"{k}:'{v}'" for k, v in d.items()) + '};window.__v124Im={};for(const k in V124I){const im=new Image();im.src=V124I[k];__v124Im[k]=im}\n'
# 있는 키(kha·gna·gnac·rek·mound·f_s)는 바꾸고, 없는 키(스킨 2·3번)는 새로 넣음
# __v116 표시도 붙임: 소용돌이 방(vtxTex)에서 v116Tex가 다시 돌 때 옛 그림으로 덮어쓰지 않게
js += "function v124Tex(s){const L=window.__v124Im||{};for(const k in L){const im=L[k];if(!im.complete||!im.naturalWidth)continue;if(s.textures.exists(k)){if(s.textures.get(k).__v124)continue;s.textures.remove(k)}const t=s.textures.addImage(k,im);t.setFilter(Phaser.Textures.FilterMode.NEAREST);t.__v124=t.__v116=1}}\n"
rep("function v116Tex(s){", js + "function v116Tex(s){")
rep("Object.values(window.__v123Im||{}));", "Object.values(window.__v123Im||{}),Object.values(window.__v124Im||{}));")
rep("makeAll(this);v116Tex(this);v123Tex(this);", "makeAll(this);v116Tex(this);v123Tex(this);v124Tex(this);")
# 몬스터 스킨: 처음 만들 때 한 번 정해서 계속 씀 (웅크림·사체도 같은 색)
rep("else{e.st='idle';e.t=0;e.spr=this.add.image(e.x,e.y,'kha').setDepth(9)}", "else{e.st='idle';e.t=0;e.spr=this.add.image(e.x,e.y,this.skin(e,'kha')).setDepth(9)}")
rep("else if(e.k=='gna'){e.st='idle';e.spr=this.add.image(e.x,e.y,'gna').setDepth(6)}", "else if(e.k=='gna'){e.st='idle';e.spr=this.add.image(e.x,e.y,this.skin(e,'gna')).setDepth(6)}")
rep("if(m.tm<=0){m.st='idle';s.setTexture('gna')}", "if(m.tm<=0){m.st='idle';s.setTexture(this.skin(m,'gna'))}")
rep("m.st='curl';m.tm=1.4;m.spr.setTexture('gnac')", "m.st='curl';m.tm=1.4;m.spr.setTexture(this.skin(m,'gnac'))")
rep("o.st='curl';o.tm=1.2;o.spr.setTexture('gnac')", "o.st='curl';o.tm=1.2;o.spr.setTexture(this.skin(o,'gnac'))")
rep("else if(k=='gna'){s.setTexture('gnac')", "else if(k=='gna'){s.setTexture(this.skin(m,'gnac'))")
rep("tex:({gna:'gnac',rek:'rek',spn:'spn',qn:'qn',wd:'wd'})[k]||'kha'", "tex:this.skin(m,({gna:'gnac',rek:'rek',spn:'spn',qn:'qn',wd:'wd'})[k]||'kha')")
# 작은 먹이 스킨
rep("f.spr=this.add.image(f.x,f.y,'f_s').setDepth(5)", "f.spr=this.add.image(f.x,f.y,this.fTex(f)).setDepth(5)", 2)
rep("q.spr=this.add.image(q.x,q.y,'f_s').setDepth(5)", "q.spr=this.add.image(q.x,q.y,this.fTex(q)).setDepth(5)")
rep("f.spr=this.add.image(fx,fy,cr?'f_c':'f_s').setDepth(5)", "f.spr=this.add.image(fx,fy,this.fTex(f)).setDepth(5)")
rep(" fTex(f){if(f.tex)return f.tex;", " fTex(f){if(f.tex)return f.tex;if(f.t=='s'&&this.textures.exists('f_s3')){const n=Math.floor(Math.random()*3);return f.tex=n?'f_s'+(n+1):'f_s'}")
rep("\n hud(){\n", "\n skin(o,b){const N={kha:3,gna:2,gnac:2}[b];if(!N)return b;if(o.skn==null)o.skn=Math.random();const i=Math.floor(o.skn*N),k=i?b+(i+1):b;return this.textures.exists(k)?k:b}\n hud(){\n")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
