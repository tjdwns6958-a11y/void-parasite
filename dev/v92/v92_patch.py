#!/usr/bin/env python3
"""v91 -> v92: 정동 집게왕 — 수정 알과 새끼 게 + 공격 사이클(3가지 → 마지막에 돌진)
1페이즈: 벽 오르기·종유석 → 수정 알 → 집게 공격(가까우면 내리찍기 / 멀면 가시 파도) → 돌진
2페이즈: 수정 알 → 돌알 불러 던지기 → 벽 오르기·종유석 → 돌진 2연속
(작은 집게는 바짝 붙으면 사이클과 따로 끼어듦 · 정동 파편 비는 빠짐)
본체: dev/v92/v92_methods.js · 사용: python3 dev/v92/v92_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v92_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v91</title>', '<title>공허 기생충 v92</title>')
rep("window.VP_VER='v91';", "window.VP_VER='v92';")
# --- 사이클
old_sel = s[s.index("    if(m.cd<=0){const r=Math.random();\n     if(d<88&&r<.35)this.gdkSnap(m,D);"):s.index("\n  case 'chW':")]
assert s.count(old_sel)==1
rep(old_sel, """    if(m.cd<=0){const r=Math.random();
     if(d<88&&r<.3&&!(m.snc>now)){m.snc=now+2600;this.gdkSnap(m,D)}
     else{const CY=P2?['egg','throw','climb']:['climb','egg','strike'],step=(m.ci||0)<3?CY[m.ci||0]:'charge';
      if(step=='charge'){const inLine=m.pt.some(q=>{if(!q.on)return false;const ux=p.x-m.x,uy=p.y-m.y,L2=ux*ux+uy*uy||1,t=((q.x-m.x)*ux+(q.y-m.y)*uy)/L2;return t>0&&t<1.3&&Math.hypot(q.x-m.x-ux*t,q.y-m.y-uy*t)<40});
       if(!P2&&inLine&&!m.dodged&&Math.random()<.35){m.dodged=1;m.cd=.5;m.x=Phaser.Math.Clamp(m.x+(Math.random()<.5?-1:1)*40,110,690)}else{m.dodged=0;m.ci=0;this.gdkCharge(m,en,P2?1:0)}}
      else{m.ci=(m.ci||0)+1;
       if(step=='climb')this.gdkClimb(m);
       else if(step=='egg')this.gdkEgg(m);
       else if(step=='throw'&&m.ball&&m.ball.st=='roll'){m.st='call';m.tm=2.5;m.ball.st='ret';this.dtx(m.x,m.y-60,'돌알을 불러들인다','#ffd0a0')}
       else if(d<130)this.gdkSlam(m,D,en);else this.gdkWave(m,D,en)}}}}break;""")
# 떨어지는 집게왕 조금 약하게(사이클마다 오르기가 나와서)
rep("m.st='dropW';m.tm=1.2;", "m.st='dropW';m.tm=1.35;")
rep("r:60,sy:.8,t:1.2,dmg:D(24),", "r:60,sy:.8,t:1.35,dmg:D(20),")
rep("case 'dropW':{const k=Math.max(0,m.tm)/1.2*1;", "case 'dropW':{const k=Math.max(0,m.tm)/1.35;")
# 사이클마다 돌진 한 번 → 기절 보상 올림 · 착지 직후 빈틈 ×1.3 · 1페이즈 갑주 ×0.25
rep("if(m.k=='gdk'){if(m.st=='stun')return 1.15;if(m.ph==2)return m.st=='rip'?.5:.7;", "if(m.k=='gdk'){if(m.st=='stun')return 1.5;if(m.st=='land')return 1.3;if(m.ph==2)return m.st=='rip'?.5:.7;")
rep("this.dtx(m.x,m.y-62,'정동 갑주가 막는다 — 돌진을 수정 기둥에 부딪히게','#9fd8ff')}return .2}", "this.dtx(m.x,m.y-62,'정동 갑주가 막는다 — 돌진을 수정 기둥에 부딪히게','#9fd8ff')}return .25}")
# 알 낳기 상태
rep("  case 'chW':sx=(Math.random()-.5)*3;", "  case 'egg':sy=Math.sin(now/60)*1.5;if(!m.lay&&m.tm<=.5){m.lay=1;this.gdkLay(m)}if(m.tm<=0){m.st='idle';m.cd=.7*en}break;\n  case 'chW':sx=(Math.random()-.5)*3;")
# 매 프레임: 알·새끼·달라붙음 (상태와 관계없이)
rep("  const S=m.spr;if(m.st=='intro'){S.setPosition(m.x,m.y);return}\n  m.cd-=dt;m.tm-=dt;", "  const S=m.spr;if(m.st=='intro'){S.setPosition(m.x,m.y);return}\n  if(!m.eggs){m.eggs=[];m.kids=[];m.lt=[];m.latch=0}this.gdkKidsU(m,dt,p,D);if(!m.on)return;\n  m.cd-=dt;m.tm-=dt;")
# 알 낳을 때 웅크림
rep("if(m.st=='land')S.setScale(S.scaleX*1.05,S.scaleY*.92)}", "if(m.st=='land'||m.st=='egg')S.setScale(S.scaleX*1.05,S.scaleY*.92)}")
# 물기: 알·새끼·달라붙은 새끼
rep("   if(m.k=='obs'&&m.ph==2&&this.obsNBite(m,fx,fy))hit=1;", "   if(m.k=='gdk'&&m.eggs&&this.gdkBite(m,fx,fy))hit=1;\n   if(m.k=='obs'&&m.ph==2&&this.obsNBite(m,fx,fy))hit=1;")
# 죽을 때 정리
rep("for(const kk of['jw','po','cs','rg','pt','ey'])if(m[kk])", "for(const kk of['jw','po','cs','rg','pt','ey','eggs','kids','lt'])if(m[kk])")
rep("if(m.ball){m.ball.o.destroy();m.ball=null}this.gkb=null;", "if(m.ball){m.ball.o.destroy();m.ball=null}this.gkb=null;m.latch=0;")
# 도움말
rep("'떨어지는 종유석':'집게왕이", "'수정 새끼 게':'수정 알은 깨어나기 전에 물거나 쏴서 깨면 무기물 — 새끼 게가 달라붙으면 공격 버튼으로 하나씩 떼거나 대시로 한 번에 털어낼 것','달라붙은 새끼 게':'달라붙은 새끼 게는 공격 버튼으로 하나씩 떼거나 대시로 한 번에 털어낼 것','떨어지는 종유석':'집게왕이")
a = " // ===== 숨 쉬는 산호 환초 ====="
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
