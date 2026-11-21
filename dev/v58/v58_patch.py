#!/usr/bin/env python3
"""v57 -> v58: 포식 갈고리 턱(·3단계 큰 입)이 물 때 실제로 벌렸다 다묾 — 머리 그림에서 빼고 매 프레임 직접 그림
본체: dev/v58/v58_methods.js · 사용: python3 dev/v58/v58_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v58_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v57</title>', '<title>공허 기생충 v58</title>')
rep("window.VP_VER='v57';", "window.VP_VER='v58';")
# 머리 그림: 같은 그리기 함수로 wh_(턱 포함, 진화 창 미리보기) + whj_(턱 없음, 게임 안) 두 장
rep(" tex(s,'wh_'+key,24,24,2,x=>{const c=12,r=4.9*", " const HF=nj=>x=>{const c=12,r=4.9*")
rep("  if(L.p>=1){ln(x,c+r-1,c-3,", "  if(L.p>=1&&!nj){ln(x,c+r-1,c-3,")
rep("  if(L.p>=3){for(let a=0;a<=r+1;a++)", "  if(L.p>=3&&!nj){for(let a=0;a<=r+1;a++)")
rep("px(x,c+r+5,c+7,'#f0c8ff')}});\n [3.6,", "px(x,c+r+5,c+7,'#f0c8ff')}};tex(s,'wh_'+key,24,24,2,HF(0));tex(s,'whj_'+key,24,24,2,HF(1));\n [3.6,")
rep("skinTex(this,key,L);this.hd.setTexture('wh_'+key);", "skinTex(this,key,L);this.pjOn();this.hd.setTexture((L.p>=1?'whj_':'wh_')+key);")
# 포식이면 공통 송곳니 대신 포식 턱
rep("const E=this.brFx;if(!E)return;E.t+=dt;const q=E.t/.24;if(q>=1){this.brFx=null;return}this.jawDraw(g,q,1)}",
    "const E=this.brFx;if(!E)return;E.t+=dt;const q=E.t/.24;if(q>=1){this.brFx=null;return}if(!(this.lin&&this.lin.p>=1))this.jawDraw(g,q,1)}")
a = " // ===== v53: 송곳니 한 쌍"
if s.count(a) != 1: raise SystemExit('v53 anchor')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
