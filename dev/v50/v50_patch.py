#!/usr/bin/env python3
"""v49 -> v50: 물기 부채꼴 ±40° → ±45° + 조준 보정.
조준 보정: 물기 버튼을 누르는 순간, 앞쪽 ±60° 안·거리 84 안에 있는 일반 몬스터 중 가장 가까운 쪽으로 머리를 돌리고 문다.
보스(무리·옛 보스·중간 보스)와 땅속 땅울음은 제외. 사용: python3 dev/v50/v50_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v49</title>', '<title>공허 기생충 v50</title>')
rep("window.VP_VER='v49';", "window.VP_VER='v50';")
rep(" brDeg(){return +(window.__vpBRA||40)}", """ brDeg(){return +(window.__vpBRA||45)}
 // 조준 보정 (v50): 앞쪽 ±60°·거리 84 안의 가장 가까운 일반 몬스터 쪽으로 머리를 돌림. 테스트에서 끄기: window.__vpNoAim=1
 aimAssist(){if(window.__vpNoAim||this.sil>0)return;const p=this.pl,a=this.ang;let best=null,bd=1e9;
  for(const m of this.cur.en){if(!m.on||m.gone||!m.spr||!m.spr.visible||m.mb||m.k=='sw'||m.k=='rw'||m.k=='em'||(m.k=='rek'&&(m.st=='under'||m.st=='warn')))continue;
   const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy);if(d>84||d<1)continue;const da=Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(dy,dx)-a));if(da>Math.PI/3)continue;const sc=d+da*20;if(sc<bd){bd=sc;best=m}}
  if(best){this.ang=Math.atan2(best.y-p.y,best.x-p.x);if(this.hd)this.hd.setRotation(this.ang);this.aimT=best}else this.aimT=null}""")
rep(" bite(){const p=this.pl,an=this.ang,fx=Math.cos(an),fy=Math.sin(an);", " bite(){this.aimAssist();const p=this.pl,an=this.ang,fx=Math.cos(an),fy=Math.sin(an);")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
