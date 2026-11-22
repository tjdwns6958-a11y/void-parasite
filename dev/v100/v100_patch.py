#!/usr/bin/env python3
"""v99 -> v100: 소개 글은 이름만
- 처음 보는 몬스터 카드·공허 균열/땅울음 굴 카드·라벤더 아래의 여제·한 몸의 무리 카드 → 이름 한 줄만 (2.5초)
- 방 이름 띠의 괄호 설명 지움 ('번식지 (먹이 많음 · 낫그늘 주의)' → '번식지')
사용: python3 dev/v100/v100_patch.py index.html"""
import sys, re
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v99</title>', '<title>공허 기생충 v100</title>')
rep("window.VP_VER='v99';", "window.VP_VER='v100';")
# 몬스터 카드: 이름만, 굵게, 짧게
rep("this.mcard=this.add.text(400,316,IN[k][0]+'\\n'+IN[k][1],ST({fontSize:'12px',align:'center',color:'#ece6f7',backgroundColor:'#2a1f40',padding:{x:12,y:6}})).setOrigin(.5).setDepth(62);this.tweens.add({targets:c,alpha:0,delay:4500,",
    "this.mcard=this.add.text(400,316,IN[k][0],ST({fontSize:'13px',fontStyle:'bold',align:'center',color:'#ece6f7',backgroundColor:'#2a1f40',padding:{x:12,y:5}})).setOrigin(.5).setDepth(62);this.tweens.add({targets:c,alpha:0,delay:2500,")
rep("'라벤더 아래의 여제\\n수면 아래에 있을 때는 닿지 않는다 · 수면 위로 솟을 때 물 것 · 꺼진 불빛 쪽으로는 돌진하지 않는다',ST({fontSize:'12px',",
    "'라벤더 아래의 여제',ST({fontSize:'13px',fontStyle:'bold',")
rep("'한 몸의 무리\\n무리가 만든 모양을 보고 피할 것 · 무리가 흩어지면 금빛 여왕을 물 것 · 떨어져 나온 유충은 먹이',ST({fontSize:'12px',",
    "'한 몸의 무리',ST({fontSize:'13px',fontStyle:'bold',")
# 통로 카드
rep("(a.ct[kk]=='hole'?'땅울음 굴':'공허 균열')+'\\n들어가면 이어진 방으로 이동',ST({fontSize:'12px',",
    "(a.ct[kk]=='hole'?'땅울음 굴':'공허 균열'),ST({fontSize:'12px',fontStyle:'bold',")
rep("setOrigin(.5,1).setDepth(62);this.tweens.add({targets:tx,alpha:0,delay:4000,", "setOrigin(.5,1).setDepth(62);this.tweens.add({targets:tx,alpha:0,delay:2500,")
# 방 이름: 괄호 설명 지움
i = s.index("const TR={mbp:"); j = s.index("};", i)
seg = s[i:j]
seg2 = re.sub(r"\[('[^'(]*?) \([^']*\)'", r"[\1'", seg).replace("'무리의 둥지 — 여왕의 영역'", "'무리의 둥지'")
if seg2 == seg: raise SystemExit('TR unchanged')
s = s[:i] + seg2 + s[j:]
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s)); print(seg2[:400])
