#!/usr/bin/env python3
"""v104 -> v105
1) 통째 삼키기 그림: v104의 새 이빨 턱을 빼고 원래(v75~ 픽셀 칼날 턱 pjBlade) 그대로 — 안 보이던 원인(다시 시작 버그)은 v104에서 고쳐졌으므로 원래 그림이 보임.
2) 정동 집게왕 2페이즈: 정동 지뢰(수정 꽃). 2페이즈 순서 = 알 · 거품 · 벽 오르기(홀수 사이클은 돌진) · 심기 → 돌진.
3) 허기의 왕관: 턱 비 · 허기 표식 추가(회전 베기 35% → 턱 비 → 표식 → 맞물림). 턱 비 동안은 가운데 구멍을 물 수 있음.
본체: dev/v105/v105_methods.js · 사용: python3 dev/v105/v105_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v105_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v104</title>', '<title>공허 기생충 v105</title>')
rep("window.VP_VER='v104';", "window.VP_VER='v105';")
# 1) v104 dvU 덮어쓰기 빼기 → 원래 그림
i = s.index(" // 통째 삼키기 모션: 위아래 이빨 턱"); j = s.index("  if(T>.45)this.dvr=null}\n", i) + len("  if(T>.45)this.dvr=null}\n")
s = s[:i] + s[j:]
if s.count(" dvU(dt){") != 1: raise SystemExit('dvU count')
# 2) 정동 지뢰
rep("const CY0=P2?['egg','bubble','climb']:['climb','egg','bubble'],CY=(m.cyN||0)%2?CY0.map(x=>x=='climb'?'charge2':x):CY0,step=(m.ci||0)<3?CY[m.ci||0]:'charge';",
    "const CY0=P2?['egg','bubble','climb','plant']:['climb','egg','bubble'],CY=(m.cyN||0)%2?CY0.map(x=>x=='climb'?'charge2':x):CY0,step=(m.ci||0)<CY.length?CY[m.ci||0]:'charge';")
rep("       else if(step=='bubble')this.gdkBubble(m);\n", "       else if(step=='bubble')this.gdkBubble(m);\n       else if(step=='plant')this.gdkPlant(m);\n")
rep("  case 'sl':if(m.tm<=0){m.st='idle';m.cd=.9*en}break;", "  case 'sl':if(m.tm<=0){m.st='idle';m.cd=.9*en}break;\n  case 'plW':sy=-Math.min(3,(.55-m.tm)*6);if(m.tm<=0){this.gdkPlantGo(m,D);m.st='idle';m.cd=.5}break;")
rep("  // 굴러다니는 정동\n  const b=m.ball;", "  this.gdkBudU(m,dt,D);if(!m.on)return;\n  // 굴러다니는 정동\n  const b=m.ball;")
rep("const up=m.st=='slW'||(m.st=='sl'&&m.tm>.3)||m.st=='thW'||m.st=='call',", "const up=m.st=='slW'||(m.st=='sl'&&m.tm>.3)||m.st=='thW'||m.st=='call'||m.st=='plW',")
rep("체력이 반으로 줄면 정동을 뜯어 굴린다.", "체력이 반으로 줄면 정동이 깨지고 바닥에 수정 봉오리를 심는다 — 봉오리 뒤에 서면 돌진하다 밟고 스스로 맞는다.")
rep("'구르는 정동':'굴러오는 돌알 앞의 점선 방향을 보고 옆으로 비킬 것 — 불러들여 던질 때는 붉은 띠를 피할 것',", "'구르는 정동':'굴러오는 돌알 앞의 점선 방향을 보고 옆으로 비킬 것 — 불러들여 던질 때는 붉은 띠를 피할 것','정동 지뢰':'봉오리가 반짝이면 곧 십자로 터진다 — 붉은 십자 줄 밖으로 · 봉오리 뒤에 서서 돌진을 유도하면 집게왕이 밟는다',")
# 3) 허기의 왕관
rep("else if(!(m.spc>now)&&r<.45){m.ns++;m.st='spinW';", "else if(!(m.spc>now)&&r<.35){m.ns++;m.st='spinW';")
rep("    else{m.ns++;this.hcClamp(m,D,en)}}break;", "    else if(!(m.jrc>now)&&r<.62){m.ns++;this.hcRain(m,en)}\n    else if(!(m.hmc>now)&&r<.8&&this.hcMarkable()){m.ns++;m.st='markW';m.tm=.6;m.hmc=now+13000}\n    else{m.ns++;this.hcClamp(m,D,en)}}break;\n  case 'jrain':this.hcRainU(m,dt,D,en);break;")
rep("m.gone=m.st=='scatter'?0:1;", "m.gone=(m.st=='scatter'||m.st=='jrain')?0:1;")
rep("   else if(j.st=='hold'&&m.st!='scatter'&&m.st!='clamp')j.st='ring';",
    "   else if(j.st=='up'){j.y-=520*dt;j.fa=-Math.PI/2;if(j.y<-60){j.y=-60;j.st='sky'}}\n   else if(j.st=='sky'){j.y=-60}\n   else if(j.st=='fallW'){j.t-=dt;j.x=j.tx;j.fa=Math.PI/2;j.y=j.t>.22?-60:j.ty-(j.ty+60)*(j.t/.22)**2;if(j.t<=0){j.st='land';j.y=j.ty;j.t=.5}}\n   else if(j.st=='land'){j.t-=dt;if(j.t<=0&&m.st!='jrain')j.st='ring'}\n   else if(j.st=='hold'&&m.st!='scatter'&&m.st!='clamp')j.st='ring';")
rep("if(j.st!='spin'&&Math.hypot(p.x-j.x,p.y-j.y)<22*sc&&", "if(j.st!='spin'&&j.st!='up'&&j.st!='sky'&&j.st!='fallW'&&j.st!='land'&&Math.hypot(p.x-j.x,p.y-j.y)<22*sc&&")
rep("  this.hcTeeth(m,now);\n", "  this.hcMarkU(m,dt,g);this.hcTeeth(m,now);\n")
rep("턱들이 흩어져 사냥하는 동안만 가운데 구멍을 물 수 있다 — 맞물리는 두 턱 사이를 피하고, 회전 베기로 다가올 때 유충을 삼키면 커지니 유충을 먼저 먹어 둘 것.",
    "턱들이 흩어져 사냥하거나 하늘에서 내리꽂는 동안 가운데 구멍을 물 수 있다 — 붉은 표식이 붙은 유충은 왕관에 닿기 전에 먼저 먹을 것.")
rep("'허기의 턱 — 맞물림':", "'허기의 턱 — 내리꽂기':'붉은 원이 나를 따라 찍힌다 — 멈추지 말고 계속 움직일 것 · 그동안 가운데 구멍을 물 수 있다','허기의 턱 — 맞물림':")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
