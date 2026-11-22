#!/usr/bin/env python3
"""v83 -> v84: 공허 중간 보스 — 1페이즈(관찰자)는 근접 특화, 2페이즈(공허 앵무조개)는 원거리전
1페이즈: 물기 ×1.6 · 구체 ×0.25('날아오는 건 다 본다') · 큰 눈 바로 아래(110px)는 사각지대 — 응시 게이지가 줄어든다
2페이즈: 껍데기 물기 ×0.3 · 구체 ×2(중간 보스 구체 절반 보정 포함 실질 ×1) · 눈에 구체 명중 ×1.6 추가 · 다가오면 물러남 · 바짝 붙으면 먹물 파동(밀쳐냄) · 촉수는 구체로도 끊김
사용: python3 dev/v84/v84_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v83</title>', '<title>공허 기생충 v84</title>')
rep("window.VP_VER='v83';", "window.VP_VER='v84';")
# --- 받는 피해: 1페이즈 물기 강하게 / 구체 약하게, 2페이즈 반대
rep("if(m.k=='obs'){if(m.ph!=2)return 1.4;if(m.st=='stun')return 1.4;",
    "if(m.k=='obs'){const nw=this.time.now;if(m.ph!=2){if(bt)return 1.6;if(!(m.wkT>nw)){m.wkT=nw+1600;this.dtx(m.x,m.y-56,'날아오는 건 다 본다 — 가까이서 물 것','#ffb070')}return .25}if(!bt)return m.st=='stun'?2.3:1.7;if(m.st=='stun')return 1.4;")
rep("this.dtx(m.x,m.y-70,'껍데기가 단단하다 — 뻗은 촉수를 끊을 것','#c8a8ff')}return .3}", "this.dtx(m.x,m.y-70,'껍데기가 단단하다 — 멀리서 구체로 눈을 노릴 것','#c8a8ff')}return .3}")
# --- 1페이즈 사각지대: 큰 눈 바로 아래에서는 응시가 줄어든다
rep("m.gz=Phaser.Math.Clamp(m.gz+(inC?dt*.95:-dt*.7),0,5);",
    "const bs=Math.hypot(p.x-ex,p.y-ey)<110;if(bs){g.lineStyle(1,0x9ff0ff,.35).strokeCircle(ex,ey,110)}m.gz=Phaser.Math.Clamp(m.gz+(inC&&!bs?dt*.95:-dt*(bs?1.2:.7)),0,5);")
# --- 2페이즈 원거리전
a = "  if(m.root>0){m.root-=dt;"
rep(a, """  if(this.gkb&&this.gkb.t>0){this.gkb.t-=dt;p.body.reset(Phaser.Math.Clamp(p.x+this.gkb.vx*dt,60,740),Phaser.Math.Clamp(p.y+this.gkb.vy*dt,62,300))}
  if(m.st!='hide'&&m.st!='hideW'&&this.pprj)for(const q of this.pprj){if(q.t<=0)continue;
   if(Math.hypot(q.x-o.ex,q.y-o.ey)<20){q.t=0;this.dmgM(m,(q.dmg!=null?q.dmg:this.sdmg())*1.5,1);this.dtx(o.ex,o.ey-22,'눈 명중!','#ffe066');S.setTintFill(0xffffff);this.time.delayedCall(70,()=>{if(m.spr)m.spr.clearTint()});continue}
   if(m.st=='grab'&&m.tn)for(const t of m.tn){if(!t.on)continue;let hitT=0;for(let s2=.3;s2<=1.001;s2+=.1){if(Math.hypot(o.ax+(t.x-o.ax)*s2-q.x,o.ay+(t.y-o.ay)*s2-q.y)<14){hitT=1;break}}if(hitT){q.t=0;t.hp--;if(t.hp<=0){t.on=0;this.dtx(q.x,q.y-14,'촉수를 끊었다','#ffe066')}break}}}
  if(!busy&&!(m.rpc>now)&&Math.hypot(p.x-m.x,p.y-m.y)<120){m.rpc=now+3200;this.telAdd({k:'c',x:m.x,y:m.y,r:122,sy:.8,t:.55,dmg:D(18),src:'먹물 파동',m,hit:()=>{const a=Math.atan2(p.y-m.y,p.x-m.x);this.gdkKb(Math.cos(a)*420,Math.sin(a)*300,.25)}});this.dtx(m.x,m.y-70,'다가오면 밀쳐낸다 — 멀리서 쏠 것','#c8a8ff')}
  if(m.root>0){m.root-=dt;""")
# 다가오면 물러난다 (떠다니기 바꿈)
rep("if(!busy){m.x+=Phaser.Math.Clamp(p.x-m.x,-1,1)*Math.min(Math.abs(p.x-m.x),34*dt);m.y+=((p.y<200?118:150)-m.y)*Math.min(1,dt*.6)}",
    "if(!busy){const dd=Math.hypot(p.x-m.x,p.y-m.y)||1;if(dd<200){m.x-=(p.x-m.x)/dd*62*dt;m.y-=(p.y-m.y)/dd*40*dt}else m.x+=Phaser.Math.Clamp(p.x-m.x,-1,1)*Math.min(Math.abs(p.x-m.x),24*dt);m.y=Phaser.Math.Clamp(m.y+((p.y<200?118:150)-m.y)*Math.min(1,dt*.4),100,230)}")
# 도움말
rep("'튕겨 나온 구체':'껍데기에 숨은", "'먹물 파동':'앵무조개에게 바짝 붙으면 먹물 파동으로 밀쳐낸다 — 2페이즈는 멀리서 구체로 눈을 노릴 것','튕겨 나온 구체':'껍데기에 숨은")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
