#!/usr/bin/env python3
"""v71 -> v72: 포식 턱 = 톱날(v71 검날보다 두껍게 + 안쪽 톱니 4개) · 물렸을 때 몬스터 피격 이펙트 = 붉은 번쩍 + 톱날 베인 자국 두 줄 + 피 방울 (갑각·공허는 그대로)
사용: python3 dev/v72/v72_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v71</title>', '<title>공허 기생충 v72</title>')
rep("window.VP_VER='v71';", "window.VP_VER='v72';")
# 톱날: 바깥 4점(매끈한 등) + 안쪽 10점(톱니 4개, 끝 → 밑동)
OLD = "[[r-1.4,3.5],[r+.8,4],[r+3,3.6],[r+5.4,1.4],[r+4.3,2],[r+3.4,2.6],[r+2.4,2.9],[r+1.4,3],[r+.3,3],[r-1.2,2.8]]"
NEW = "[[r-1.5,4],[r+.8,4.6],[r+3,4.1],[r+5.4,1.4],[r+4.5,2.3],[r+3.9,1.7],[r+3.4,2.6],[r+2.8,2],[r+2.2,2.9],[r+1.6,2.3],[r+1,3.1],[r+.4,2.5],[r-.3,3.2],[r-1.3,3.1]]"
rep(OLD, NEW, 2)
# 점 수가 늘어서: 흰 날 선 = 끝(3) ~ 마지막 앞(12), 밑동 그늘 삼각형 = 0·1·마지막
rep("for(let i=4;i<=8;i++)", "for(let i=4;i<P.length-1;i++)", 3)
rep("fillTriangle(P[0].x,P[0].y,P[1].x,P[1].y,P[9].x,P[9].y)", "fillTriangle(P[0].x,P[0].y,P[1].x,P[1].y,P[P.length-1].x,P[P.length-1].y)")
rep("g.lineStyle(1.3*u,0x3d1b6b,al).strokePoints(P,true);", "g.lineStyle(1.6*u,0x3d1b6b,al).strokePoints(P,true);")
# 물렸을 때: 갑각 박치기는 흰 번쩍 그대로, 나머지는 붉은 번쩍
rep("m.spr.setTintFill(0xffffff);this.time.delayedCall(80,()=>{if(m.spr)m.spr.clearTint()});", "m.spr.setTintFill(this.domK()=='c'?0xffffff:0xff6a8a);this.time.delayedCall(90,()=>{if(m.spr)m.spr.clearTint()});")
# 이빨 자국 → 톱날 베인 자국(몸을 가로지르는 지그재그 두 줄) + 짧은 붉은 고리 + 물린 방향으로 튀는 피 방울 6개 (0.4초)
rep("if(T<.07)return true;const al=T<.15?1:1-(T-.15)/.35;\n   for(const sg of[-1,1])for(let j=0;j<3;j++){const ox=bx+c*j*4.5+px*sg*5.5,oy=by+s*j*4.5+py*sg*5.5,tx=ox-px*sg*3.2,ty=oy-py*sg*3.2;g.lineStyle(3,0x2a1040,al*.9).lineBetween(ox,oy,tx,ty);g.lineStyle(1.6,0xfff4fa,al).lineBetween(ox,oy,tx,ty)}\n   return true});",
    "if(T>.4)return false;const al=T<.1?1:1-(T-.1)/.3,mx=k.x-c*2,my=k.y-s*2;\n"
    "   if(T<.14){g.lineStyle(2,0xff3a5a,(1-T/.14)*.8).strokeCircle(mx,my,6+T*80)}\n"
    "   for(const sg of[-1,1]){const P=[];for(let j=0;j<=6;j++){const t=j/6-.5,z=(j%2?1.4:-1.4);P.push({x:mx+px*t*18+c*(sg*3+z),y:my+py*t*18+s*(sg*3+z)})}g.lineStyle(3,0x5a0a24,al*.9).strokePoints(P,false);g.lineStyle(1.4,0xffe0ea,al).strokePoints(P,false)}\n"
    "   for(let j=0;j<6;j++){const sp=(j-2.5)*.35+Math.sin(k.sd+j)*.15,d=5+(26+6*Math.sin(k.sd*3+j))*Math.min(1,T/.3),x=mx+(c*Math.cos(sp)-s*Math.sin(sp))*d,y=my+(s*Math.cos(sp)+c*Math.sin(sp))*d+30*T*T;g.fillStyle(j%2?0xff4a6a:0xc0203a,al).fillCircle(x,y,j%3?1.4:2)}\n"
    "   return true});")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
