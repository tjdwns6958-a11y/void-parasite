#!/usr/bin/env python3
"""v80 -> v81: 갑각 중간 보스를 「정동 집게왕」으로 교체 (수정 동굴의 거대 갑각류)
본체: dev/v81/v81_methods.js · 그림: dev/v81/gdk{A,B,G,P}.png (tools/boss_sdf/sprites.py로 렌더) · 사용: python3 dev/v81/v81_patch.py index.html"""
import sys, os, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
M = open(os.path.join(H, 'v81_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v80</title>', '<title>공허 기생충 v81</title>')
rep("window.VP_VER='v80';", "window.VP_VER='v81';")
# 퀘스트 글
rep("c:{q:'숨 쉬는 산호 환초',b:'환초의 가면',s:'수정 돌진',d:'고리의 틈으로 들어가야 가운데 가면을 물 수 있다 — 고리가 부풀면 점선 안쪽 바깥이 터지고, 안에서는 가면의 눈빛을 피할 것. 묶인 산호충을 물어 끊으면 고리가 무너진다.'",
    "c:{q:'정동 집게왕의 수정 동굴',b:'정동 집게왕',s:'수정 돌진',d:'등의 정동이 갑주처럼 단단해 물어도 잘 들어가지 않는다 — 돌진을 수정 기둥에 부딪히게 하면 기절한다. 체력이 반으로 줄면 정동을 뜯어 굴린다.'")
rep("mbc:['숨 쉬는 산호 환초',0xb8b0f0]", "mbc:['정동 집게왕의 수정 동굴',0x9fd8ff]")
# 그림 미리 불러오기
img = {k: base64.b64encode(open(os.path.join(H, f'gdk{k}.png'), 'rb').read()).decode() for k in 'ABGP'}
pre = "const GDKI={" + ",".join(f"{k}:'data:image/png;base64,{v}'" for k, v in img.items()) + "};window.__gdkIm={};for(const k in GDKI){const im=new Image();im.src=GDKI[k];__gdkIm[k]=im}\n"
rep("\nconst LN={p:'포식',c:'갑각',v:'공허'}", "\n" + pre + "const LN={p:'포식',c:'갑각',v:'공허'}")
# 보스 교체
rep("if(k=='c')room.en.push(E('atl',400,178,Math.round(380+44*plv),{br:34,nm:'환초의 가면',bi:0,gone:1}));",
    "if(k=='c')room.en.push(E('gdk',400,150,Math.round(470+54*plv),{br:46,nm:'정동 집게왕',bi:0,gone:0}));")
rep("const tk=({hcr:'hcrH',atl:'atlM',obs:'obsE'})[e.k];", "const tk=({hcr:'hcrH',atl:'atlM',obs:'obsE',gdk:'gdkA'})[e.k];")
rep("for(const kk of['kzb','rkb','qnb','wdb','hcr','atl','obs'])this.seenM[kk]=1;", "this.gdkTex();for(const kk of['kzb','rkb','qnb','wdb','hcr','atl','obs','gdk'])this.seenM[kk]=1;")
rep("if(k=='c')for(const[x,y,f]of[[60,300,0],[740,300,1],[52,120,1],[748,130,0],[150,330,0],[650,332,1]])this.dec.push(this.add.image(x,y,'cor').setOrigin(.5,1).setDepth(2).setFlipX(!!f).setTint(0xd0b0ff));",
    "if(k=='c')for(const[x,y,f]of[[60,300,0],[740,300,1],[52,120,1],[748,130,0],[150,336,0],[650,338,1],[300,60,1],[500,58,0]])this.dec.push(this.add.image(x,y,'gdkP').setOrigin(.5,1).setDepth(2).setFlipX(!!f).setScale(.55+.1*f).setAlpha(.75).setTint(0xb8a8ff));")
# 받는 피해 배율
rep("mbMul(m,bt){if(m.gone)return 0;", "mbMul(m,bt){if(m.k=='gdk'){if(m.st=='stun')return 1.3;if(m.ph==2)return m.st=='rip'?.5:.8;const now=this.time.now;if(!(m.wkT>now)){m.wkT=now+1400;this.dtx(m.x,m.y-62,'정동 갑주가 막는다 — 돌진을 수정 기둥에 부딪히게','#9fd8ff')}return .2}if(m.gone)return 0;")
rep("g.fillStyle(m.k=='atl'?0x9fd8ff:", "g.fillStyle(m.k=='atl'||m.k=='gdk'?0x9fd8ff:")
rep("if(m.gb){m.gb.destroy();m.gb=null}if(m.nmT)", "if(m.gb){m.gb.destroy();m.gb=null}if(m.ball){m.ball.o.destroy();m.ball=null}this.gkb=null;if(m.nmT)")
# 죽었을 때 도움말
rep("'환초의 숨':'고리가 부풀 때는", "'정동 집게왕의 돌진':'넓은 붉은 띠가 깔리면 옆으로 — 수정 기둥 뒤에 서 있으면 돌진이 기둥에 박혀 기절한다','수정 집게 내리찍기':'집게가 들리면 원 밖으로 — 이어서 앞쪽으로 수정 가시가 줄지어 솟는다','수정 가시':'내리찍기 뒤 앞쪽으로 솟는 가시 줄에서 옆으로 비킬 것','정동 파편':'정동이 빛나면 발밑의 보라 원들을 피할 것','작은 집게':'집게왕에게 바짝 붙어 있으면 작은 집게가 부채꼴로 휩쓴다','구르는 정동':'굴러오는 돌알 앞의 점선 방향을 보고 옆으로 비킬 것 — 불러들여 던질 때는 붉은 띠를 피할 것','환초의 숨':'고리가 부풀 때는")
# 코드 창 이름
rep("['c','환초의 가면','갑각 중간 보스','#9fd8ff']", "['c','정동 집게왕','갑각 중간 보스','#9fd8ff']")
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
