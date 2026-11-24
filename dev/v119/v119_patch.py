#!/usr/bin/env python3
"""v118 -> v119: 보스 안내 글을 읽을 수 있게 — 화면 위 가운데 안내는 2.4초 머물고 어두운 바탕, 새 안내가 오면 앞 것을 지움 · 회전 고리의 안내 두 줄 겹침 수정
사용: python3 dev/v119/v119_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v118</title>', '<title>공허 기생충 v119</title>')
rep("window.VP_VER='v118';", "window.VP_VER='v119';")
rep(" dtx(x,y,t,c){const tx=this.add.text(x,y,t,ST({fontSize:'12px',color:c,fontStyle:'bold'})).setOrigin(.5).setDepth(70);this.tweens.add({targets:tx,y:y-24,alpha:0,duration:700,onComplete:()=>tx.destroy()})}",
    " dtx(x,y,t,c){if(x==400&&y<90&&t.length>12){if(this.bHint){this.tweens.killTweensOf(this.bHint);this.bHint.destroy()}"
    "const tx=this.bHint=this.add.text(400,66,t,ST({fontSize:'13px',color:c,fontStyle:'bold',backgroundColor:'#0c0816cc',padding:{x:10,y:5},align:'center',wordWrap:{width:620}})).setOrigin(.5).setDepth(72).setAlpha(0);"
    "this.tweens.add({targets:tx,alpha:1,duration:150});this.tweens.add({targets:tx,alpha:0,delay:2400,duration:400,onComplete:()=>{if(this.bHint===tx)this.bHint=null;tx.destroy()}});return}"
    "const tx=this.add.text(x,y,t,ST({fontSize:'12px',color:c,fontStyle:'bold'})).setOrigin(.5).setDepth(70);this.tweens.add({targets:tx,y:y-24,alpha:0,duration:700,onComplete:()=>tx.destroy()})}")
rep("sw_ringr0(m,p,K){this.sw_ring30(m,p,K);", "sw_ringr0(m,p,K){m.r3N=9;this.sw_ring30(m,p,K);")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
