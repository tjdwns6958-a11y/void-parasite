#!/usr/bin/env python3
"""v117 -> v118: 구역별 분위기 단계 — 1구역 밝은 수정 동굴 / 2구역 공허가 스며듦 / 3구역(최종) 공허
사용: python3 dev/v118/v118_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v117</title>', '<title>공허 기생충 v118</title>')
rep("window.VP_VER='v117';", "window.VP_VER='v118';")
# 바닥: 구역 3단계
rep("const st=this.v117Bg(),z=this.zi>1?2:1,key='fl117'+st+z;", "const st=this.v117Bg(),z=Math.min(3,this.zi||1),key='fl117'+st+z;")
rep("base=z==1?[24,19,36]:[18,20,38]", "base=z==1?[58,53,70]:z==2?[22,17,36]:[13,10,25]")
rep("if(e<1.1){k*=.66;if(v117h(px,py,S+4)<.012)add=v117h(px,py,S+6)<.5?[60,40,110]:[30,70,100]}",
    "if(e<1.1){k*=z==1?.76:.66;if(v117h(px,py,S+4)<(z==1?.03:.012))add=v117h(px,py,S+6)<(z==1?.25:.5)?[60,40,110]:[30,80,100]}"
    "if(z>=2&&e<2.4){const vv=v117f(px/110,py/110,S+9),th=z==2?.6:.46;if(vv>th){const w=Math.min(1,(vv-th)*9)*(1-e/2.4);add=[add[0]+70*w,add[1]+18*w,add[2]+130*w]}}")
# 벽: 구역 3단계
rep("const st=this.v117Bg();if(!st)return;const z=this.zi>1?2:1", "const st=this.v117Bg();if(!st)return;const z=Math.min(3,this.zi||1)")
rep("const pal=st=='A'?(z==1?[[24,19,36],[42,34,60],[64,52,90],[110,94,148]]:[[20,20,38],[36,36,66],[56,56,98],[98,98,156]]):",
    "const pal=st=='A'?(z==1?[[36,32,46],[64,58,78],[94,86,112],[156,146,178]]:z==2?[[16,11,28],[32,22,52],[52,36,82],[104,74,164]]:[[10,6,18],[22,12,36],[40,22,64],[88,50,144]]):")
# 바위: 1구역은 밝은 돌
rep("const B=v?{ol:'#0a0812'", "const B=s.zi==1?(v?{ol:'#16121f',base:'#5a5270',hi:'#8a80a6',face:'#3c3450',fd:'#2a2438',spk:'#4a4262'}:{ol:'#141224',base:'#545474',hi:'#8280aa',face:'#363654',fd:'#26263e',spk:'#46446a'}):v?{ol:'#0a0812'")
rep("this.v116Amb(a);this.mqRift(a);", "this.v118Amb(a);this.mqRift(a);")
M = open(os.path.join(H, 'v118_methods.js'), encoding='utf-8').read().rstrip('\n')
rep("\n hud(){\n", "\n" + M + "\n hud(){\n")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
