#!/usr/bin/env python3
"""v72 -> v73: 물었을 때 피격 이펙트 단순하게 — 빨간 원(짧게 퍼짐) + 피 세 방울이 몸에서 흘러내림만 (붉은 번쩍·베인 자국·튀는 피 방울 삭제)
사용: python3 dev/v73/v73_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
def cut(a, b, new):
    global s
    if s.count(a) != 1: raise SystemExit('cut start x%d: %r' % (s.count(a), a[:70]))
    i = s.index(a); j = s.index(b, i) + len(b); s = s[:i] + new + s[j:]
rep('<title>공허 기생충 v72</title>', '<title>공허 기생충 v73</title>')
rep("window.VP_VER='v72';", "window.VP_VER='v73';")
# 붉은 번쩍 삭제 (갑각 박치기의 흰 번쩍은 그대로)
# (v72의 번쩍 바꿈은 옛 거울 보스 물기에 잘못 들어갔음 → 원래대로) · 진짜 물기: 흰 번쩍은 갑각 박치기만
rep("m.spr.setTintFill(this.domK()=='c'?0xffffff:0xff6a8a);this.time.delayedCall(90,()=>{if(m.spr)m.spr.clearTint()});",
    "m.spr.setTintFill(0xffffff);this.time.delayedCall(80,()=>{if(m.spr)m.spr.clearTint()});")
rep("m.spr.setTintFill(0xffffff);this.bmAdd(m,an);this.time.delayedCall(80,()=>{if(m.spr)m.spr.clearTint()});",
    "if(this.domK()=='c'){m.spr.setTintFill(0xffffff);this.time.delayedCall(80,()=>{if(m.spr)m.spr.clearTint()})}this.bmAdd(m,an);")
# 베인 자국·튀는 피 → 빨간 원 + 흘러내리는 피 세 방울 (0.55초)
cut("if(T>.4)return false;const al=T<.1?1:1-(T-.1)/.3,mx=k.x-c*2,my=k.y-s*2;", "   return true});",
    "if(T>.55)return false;const mx=k.x,my=k.y;\n"
    "   if(T<.2)g.lineStyle(2,0xff3a5a,(1-T/.2)*.85).strokeCircle(mx,my,7+T*45);\n"
    "   for(let j=0;j<3;j++){const t=T-j*.07;if(t<0)continue;const al=t<.3?1:Math.max(0,1-(t-.3)/.18),x=mx+(j-1)*4+Math.sin(k.sd+j)*1.5,y=my+3+8*t+46*t*t;g.fillStyle(0xc0203a,al).fillCircle(x,y,1.7);g.fillStyle(0xc0203a,al*.6).fillRect(x-.6,y-4-6*t,1.2,4+6*t)}\n"
    "   return true});")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
