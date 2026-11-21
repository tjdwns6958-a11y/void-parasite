#!/usr/bin/env python3
"""v46 -> v47: 물기 범위를 '둥근 사다리꼴'로 — 바깥 끝이 볼록(+8px)하고 네 모서리가 둥글다(차이킨 3번).
네 변에 점을 촘촘히 깔아 모서리만 둥글게(앞쪽 좁은 변은 평평하게 남김). 판정(inBite)도 바깥 끝을 같은 볼록한 곡선으로. 사용: python3 dev/v47/v47_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v46</title>', '<title>공허 기생충 v47</title>')
rep("window.VP_VER='v46';", "window.VP_VER='v47';")
# 그림: 모서리 점 4개 → 둥근 사다리꼴 점 목록
rep("P=[{x:6,y:-10},{x:C.BITE.range,y:-34},{x:C.BITE.range,y:34},{x:6,y:10}];", "P=this.biteShape();")
# 판정: 바깥 끝이 가운데로 갈수록 +8 볼록
rep(" inBite(dx,dy,fx,fy,ex){const al=dx*fx+dy*fy,lt=Math.abs(dy*fx-dx*fy),R=C.BITE.range+(ex||0);if(al<-6||al>R)return false;",
    " inBite(dx,dy,fx,fy,ex){const al=dx*fx+dy*fy,lt=Math.abs(dy*fx-dx*fy),R=C.BITE.range+(ex||0)+8*Math.max(0,1-(lt/34)**2);if(al<-6||al>R)return false;")
rep(" moStart(k){", """ // 둥근 사다리꼴: 앞 6px 반폭 10 → 사거리 64 반폭 34, 바깥 끝은 +8 볼록, 차이킨으로 모서리를 둥글게 (한 번만 계산)
 biteShape(){if(this._bs)return this._bs;const R=C.BITE.range,P0=[],L=(a,b,n)=>{for(let i=0;i<n;i++){const t=i/n;P0.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t})}};
  L({x:6,y:10},{x:6,y:-10},4);L({x:6,y:-10},{x:R,y:-34},6);for(let i=0;i<8;i++){const y=-34+68*i/8;P0.push({x:R+8*(1-(y/34)**2),y})}L({x:R,y:34},{x:6,y:10},6);let P=P0;
  for(let k=0;k<3;k++){const Q=[];for(let i=0;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length];Q.push({x:a.x*.75+b.x*.25,y:a.y*.75+b.y*.25},{x:a.x*.25+b.x*.75,y:a.y*.25+b.y*.75})}P=Q}return this._bs=P}
 moStart(k){""")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
