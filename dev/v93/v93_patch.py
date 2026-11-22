#!/usr/bin/env python3
"""v92 -> v93: 정동 집게왕 거품 분사 — 플레이어 쪽에서 보면 천천히 밀려오는 거품 탄막
사이클: 1페이즈 벽 오르기 → 수정 알 → 거품 분사 → 돌진 / 2페이즈 수정 알 → 거품 분사 → 벽 오르기 → 돌진 2연속 (돌알은 계속 굴러다님)
본체: dev/v93/v93_methods.js · 사용: python3 dev/v93/v93_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v93_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v92</title>', '<title>공허 기생충 v93</title>')
rep("window.VP_VER='v92';", "window.VP_VER='v93';")
rep("const CY=P2?['egg','throw','climb']:['climb','egg','strike']", "const CY=P2?['egg','bubble','climb']:['climb','egg','bubble']")
rep("r:60,sy:.8,t:1.35,dmg:D(20),", "r:60,sy:.8,t:1.35,dmg:D(16),")
rep("this.hurt(D(b.spd>380?30:24),'구르는 정동',m)", "this.hurt(D(b.spd>380?26:20),'구르는 정동',m)")
rep("room.en.push(E('gdk',400,150,Math.round(520+60*plv),", "room.en.push(E('gdk',400,150,Math.round(490+56*plv),")
rep("       else if(step=='egg')this.gdkEgg(m);", "       else if(step=='egg')this.gdkEgg(m);\n       else if(step=='bubble')this.gdkBubble(m);")
rep("  case 'egg':sy=Math.sin(now/60)*1.5;", "  case 'bubW':sy=Math.sin(now/50)*1;if(Math.random()<.5){const b=this.add.circle(m.x+(Math.random()-.5)*36,m.y+30,1.5+Math.random()*2.5,0xffffff,.8).setDepth(12);this.tweens.add({targets:b,y:b.y-8,alpha:0,duration:350,onComplete:()=>b.destroy()})}if(m.tm<=0){m.st='bub';m.tm=2.6;m.bt=0}break;\n  case 'bub':m.bt-=dt;if(m.bt<=0){m.bt=.42;this.gdkBubFire(m)}if(m.tm<=0){m.st='idle';m.cd=.8*en}break;\n  case 'egg':sy=Math.sin(now/60)*1.5;")
rep("  if(!m.eggs){m.eggs=[];m.kids=[];m.lt=[];m.latch=0}this.gdkKidsU(m,dt,p,D);if(!m.on)return;", "  if(!m.eggs){m.eggs=[];m.kids=[];m.lt=[];m.latch=0;m.bub=[]}this.gdkKidsU(m,dt,p,D);if(!m.on)return;this.gdkBubU(m,dt,p,D);if(!m.on)return;")
rep("   if(m.k=='gdk'&&m.eggs&&this.gdkBite(m,fx,fy))hit=1;", "   if(m.k=='gdk'&&m.eggs&&this.gdkBite(m,fx,fy))hit=1;\n   if(m.k=='gdk'&&this.gdkBubBite(m,fx,fy))hit=1;")
rep("for(const kk of['jw','po','cs','rg','pt','ey','eggs','kids','lt'])if(m[kk])", "for(const kk of['jw','po','cs','rg','pt','ey','eggs','kids','lt','bub'])if(m[kk])")
rep("'수정 새끼 게':'수정 알은", "'거품 분사':'거품은 천천히 밀려온다 — 사이 빈틈으로 빠지거나 물어서 터뜨려 길을 낼 것 · 수정 기둥 뒤에 숨으면 거품이 기둥에 터진다','수정 새끼 게':'수정 알은")
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
