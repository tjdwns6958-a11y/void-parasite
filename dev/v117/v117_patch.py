#!/usr/bin/env python3
"""v116 -> v117: 플레이어 몸 음영 · 배경(방 한 장 바닥 + 동굴 벽) — 3안 시안(window.__vpW / __vpBg = 'A'|'B'|'C')
사용: python3 dev/v117/v117_patch.py index.html  (개발자 선택: 지렁이 A · 배경 A — 기본값)"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
A = dict(W="A", B="A"); A.update(a.split("=") for a in sys.argv[2:])
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v116</title>', '<title>공허 기생충 v117</title>')
rep("window.VP_VER='v116';", "window.VP_VER='v117';")
G = open(os.path.join(H, 'v117_glob.js'), encoding='utf-8').read().rstrip('\n')
G = G.replace("const V117W='',V117B='';", "const V117W='%s',V117B='%s';" % (A.get('W', ''), A.get('B', '')))
rep("function v116Tex(s){", G + "\nfunction v116Tex(s){")
rep("function skinTex(s,key,L){if(s.textures.exists('wh_'+key))return;",
    "function skinTex(s,key,L){if(s.textures.exists('wh_'+key))return;skinTex0(s,key,L);v117Worm(s,['wh_','whj_','ws1_','ws2_','ws3_','ws4_'].map(p=>p+key))}\nfunction skinTex0(s,key,L){")
rep("makeAll(this);v116Tex(this);", "makeAll(this);v116Tex(this);v117Worm(this,['wh','ws1','ws2','ws3','ws4']);")
rep("this.walls.create(x,y,'wall').setDepth(2).setTint(this.zi>1?0xa494d8:0xffffff);",
    "this.walls.create(x,y,'wall').setDepth(2).setTint(this.zi>1?0xa494d8:0xffffff).setVisible(!this.v117Bg());")
rep("this.fl.setTexture(this.zi>1?'floor2':'floor').setTint(a.tr?TR[a.tr][1]:0xffffff);",
    "this.fl.setTexture(this.v117Bg()?this.v117Floor():this.zi>1?'floor2':'floor').setTint(a.tr?TR[a.tr][1]:0xffffff);")
rep("  (a.gm||[]).forEach", "  this.v117Frame(a);\n  (a.gm||[]).forEach")
M = open(os.path.join(H, 'v117_methods.js'), encoding='utf-8').read().rstrip('\n')
rep("\n hud(){\n", "\n" + M + "\n hud(){\n")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
