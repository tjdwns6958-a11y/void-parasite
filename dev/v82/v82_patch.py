#!/usr/bin/env python3
"""v81 -> v82: 공허 중간 보스 2페이즈 「공허 앵무조개」 — 관찰자의 눈은 처음부터 앵무조개의 것이었다
본체: dev/v82/v82_methods.js · 그림: dev/v82/obsN.png·obsNc.png (tools/boss_sdf/naut_spr.py) · 사용: python3 dev/v82/v82_patch.py index.html"""
import sys, os, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
M = open(os.path.join(H, 'v82_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v81</title>', '<title>공허 기생충 v82</title>')
rep("window.VP_VER='v81';", "window.VP_VER='v82';")
img = {k: base64.b64encode(open(os.path.join(H, f'obs{k}.png'), 'rb').read()).decode() for k in ('N', 'Nc')}
pre = "const OBSI={" + ",".join(f"{k}:'data:image/png;base64,{v}'" for k, v in img.items()) + "};window.__obsIm={};for(const k in OBSI){const im=new Image();im.src=OBSI[k];__obsIm[k]=im}\n"
rep("\nconst LN={p:'포식',c:'갑각',v:'공허'}", "\n" + pre + "const LN={p:'포식',c:'갑각',v:'공허'}")
# 2페이즈로 갈라지기
rep("  for(const r of m.rg){const a=r.a+m.rot;", "  if(m.ph!=2)for(const r of m.rg){const a=r.a+m.rot;")
rep("  if(m.st=='intro'){m.pu.setPosition(m.x,m.y);return}\n  m.cd-=dt;m.tm-=dt;", "  if(m.st=='intro'){m.pu.setPosition(m.x,m.y);return}\n  m.cd-=dt;m.tm-=dt;if(m.ph!=2&&m.hp<=m.mh*.6)this.obsRev(m);if(m.ph==2)return this.obsN2(m,dt,p);")
rep("this.mbTex();this.mb30Tex();this.gdkTex();", "this.mbTex();this.mb30Tex();this.gdkTex();this.obsNTex();")
# 피해 배율 · 촉수 물기 · 정리
rep("if(m.gone)return 0;if(m.k=='hcr')return 1.25;if(m.k=='atl')return 1;if(m.k=='obs')return 1.4;",
    "if(m.gone){if(m.k=='obs'&&m.ph==2&&m.st!='rev'&&!(m.wkT>this.time.now)){m.wkT=this.time.now+1400;this.dtx(m.x,m.y-70,'단단한 껍데기 — 숨은 동안은 물 수 없다','#c8a8ff')}return 0}if(m.k=='hcr')return 1.25;if(m.k=='atl')return 1;if(m.k=='obs'){if(m.ph!=2)return 1.4;if(m.st=='stun')return 1.4;if(m.st=='grab')return 1.1;if(!(m.wkT>this.time.now)){m.wkT=this.time.now+1600;this.dtx(m.x,m.y-70,'껍데기가 단단하다 — 뻗은 촉수를 끊을 것','#c8a8ff')}return .3}")
rep("   if(m.k=='obs'&&m.ey)for(const q of m.ey)if(q.open){", "   if(m.k=='obs'&&m.ph==2&&this.obsNBite(m,fx,fy))hit=1;\n   if(m.k=='obs'&&m.ey)for(const q of m.ey)if(q.open){")
rep("for(const kk of['rf','pu','lag'])if(m[kk]){m[kk].destroy();m[kk]=null}", "for(const kk of['rf','pu','lag','N'])if(m[kk]){m[kk].destroy();m[kk]=null}")
rep("if(k=='v')room.en.push(E('obs',400,116,Math.round(380+40*plv),", "if(k=='v')room.en.push(E('obs',400,116,Math.round(440+48*plv),")
rep("if(q.ft<=0){q.ft=2.3;const a=Math.atan2(p.y-q.y,p.x-q.x);this.mbShot(q.x,q.y,a,175,D(7),", "if(q.ft<=0){q.ft=1.9;const a=Math.atan2(p.y-q.y,p.x-q.x);this.mbShot(q.x,q.y,a,185,D(10),")
rep("'관찰자의 응시':'시선 안에", "'나선 구체':'껍데기 입구에서 검은 구체가 나선으로 퍼진다 — 구체 사이 빈틈으로 비킬 것','공허 촉수':'붉은 줄 세 개가 깔리면 줄 밖으로 — 뻗은 촉수는 물어서 끊을 수 있고, 셋 다 끊으면 기절한다','껍데기 속 공허':'껍데기에 숨으면 입구가 끌어당긴다 — 입구에서 멀리 헤엄칠 것','앵무조개의 눈빛':'눈빛이 방을 쓸 때는 떠 있는 갑주 조각 뒤로','관찰자의 응시':'시선 안에")
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
