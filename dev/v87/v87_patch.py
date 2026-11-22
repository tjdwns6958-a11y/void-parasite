#!/usr/bin/env python3
"""v86 -> v87: 피드백·연출 손질
1) 허기의 왕관 피격 반응(과하지 않게): 살짝 눌림 · 분홍빛 번쩍 · 맞은 쪽 작은 불꽃 · 작은 피해 숫자
2) 공허 2페이즈 등장 연출 3.4초: 눈이 떨림 → 감기며 틈으로 빨려 듦 → 틈이 터짐 → 검은 실루엣의 나선 껍데기가 돌며 빠져나옴 → 색이 돌아옴 → 껍데기 위에서 같은 눈이 뜸
3) 공허 2페이즈 공격 전 빨간 경고: 나선 구체(0.5초, 세 갈래 붉은 줄) · 숨기 전 끌림 범위 붉은 원 · 구체 고리 전 붉은 눈금 · 체력 30% 아래 촉수 중 구체 때 입구가 붉게
4) 대시 회피 시 회색 작은 'miss'만 (완벽 회피 대사·효과 없앰)
5) 촉수 공격 = 채찍: 예고 동안 입구 위로 말려 올라갔다가 확 펴지며 휘어 휘두름 + 끝에서 '딱'
6) 공허 2페이즈 구체 모양: 검은 핵 · 보랏빛 테 · 별 점 · 소용돌이(vdOrb)
본체: dev/v87/v87_methods.js · 사용: python3 dev/v87/v87_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v87_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v86</title>', '<title>공허 기생충 v87</title>')
rep("window.VP_VER='v86';", "window.VP_VER='v87';")
# 1) 허기의 왕관 피격
rep("m.gone=m.st=='scatter'?0:1;m.spr.setPosition(m.x,m.y).setScale((1+.04*Math.sin(now/280))*bs);",
    "m.hk=Math.max(0,(m.hk||0)-dt);if(m.hp0!=null&&m.hp<m.hp0-.5)this.hcHit(m,m.hp0-m.hp);m.hp0=m.hp;m.gone=m.st=='scatter'?0:1;m.spr.setPosition(m.x+(m.hk>0?(Math.random()-.5)*2:0),m.y).setScale((1+.04*Math.sin(now/280))*bs*(1+.4*m.hk),(1+.04*Math.sin(now/280))*bs*(1-.4*m.hk));")
# 2) 등장 연출
rep("  if(m.st=='rev'){const t=3-m.tm;", "  if(m.st=='rev'){this.obsRevU(m,dt,p);return}\n  if(m.st=='revOld'){const t=3-m.tm;")
# 6) 구체 모양
rep("const q=this.mbShot(o.ax,o.ay,m.sa+k,190,D(16),'나선 구체',m,'emo');q.o.setTint(0x6a3ab0)", "this.mbShot(o.ax,o.ay,m.sa+k,190,D(16),'나선 구체',m,'vdOrb')")
rep("const q=this.mbShot(o.ax,o.ay,m.sa,150,D(12),'나선 구체',m,'emo');q.o.setTint(0x6a3ab0)", "this.mbShot(o.ax,o.ay,m.sa,150,D(12),'나선 구체',m,'vdOrb')")
rep("const q=this.mbShot(o.ax,o.ay,a0+i/12*6.283,175,D(16),'나선 구체',m,'emo');q.o.setTint(0x6a3ab0)", "this.mbShot(o.ax,o.ay,a0+i/12*6.283,175,D(16),'나선 구체',m,'vdOrb')")
rep("b=this.mbShot(q.x,q.y,a,230,D(14),'튕겨 나온 구체',m,'emo');b.o.setTint(0xc070ff);", "b=this.mbShot(q.x,q.y,a,230,D(14),'튕겨 나온 구체',m,'vdOrb');")
rep("obsNTex(){for(const k of['N','Nc']){", "obsNTex(){this.vdOrbTex();for(const k of['N','Nc']){")
# 5) 촉수 채찍
rep("  if(m.tn)for(const q of m.tn){if(!q.on)continue;const k=q.k=Math.min(1,(q.k||0)+dt*7);",
    "  if(m.tn&&m.st=='grabW')this.obsWhipW(m,o,g,now);\n  if(m.tn)for(const q of m.tn){if(!q.on)continue;this.obsWhip(m,q,o,g,dt,now);continue;const k=q.k=Math.min(1,(q.k||0)+dt*7);")
rep("m.tn.forEach(q=>{q.on=1;q.k=0});", "m.tn.forEach(q=>{q.on=1;q.k=0;q.wt=0});")
# 촉수 끊기(물기·구체)는 휜 선을 따라
rep("for(let s=.3;s<=1.001;s+=.1){const x=o.ax+(q.x-o.ax)*s,y=o.ay+(q.y-o.ay)*s,dx=x-p.x,dy=y-p.y,d=Math.hypot(dx,dy);",
    "for(let s=.3;s<=1.001;s+=.1){const pp=q.pts?q.pts[Math.round(s*12)]:null,x=pp?pp[0]:o.ax+(q.x-o.ax)*s,y=pp?pp[1]:o.ay+(q.y-o.ay)*s,dx=x-p.x,dy=y-p.y,d=Math.hypot(dx,dy);")
rep("let hitT=0;for(let s2=.3;s2<=1.001;s2+=.1){if(Math.hypot(o.ax+(t.x-o.ax)*s2-q.x,o.ay+(t.y-o.ay)*s2-q.y)<14){hitT=1;break}}",
    "let hitT=0;for(let s2=.3;s2<=1.001;s2+=.1){const pp=t.pts?t.pts[Math.round(s2*12)]:[o.ax+(t.x-o.ax)*s2,o.ay+(t.y-o.ay)*s2];if(Math.hypot(pp[0]-q.x,pp[1]-q.y)<14){hitT=1;break}}")
# 3) 빨간 경고
rep("    else if(r<.8){m.st='spiral';m.tm=2.8;m.sa=Math.random()*6.283;m.st2=0}", "    else if(r<.8){m.st='spW';m.tm=.5;m.sa=Math.random()*6.283;m.st2=0}")
rep("  case 'spiral':m.st2-=dt;", "  case 'spW':{const pu=.5+.5*Math.sin(now/45);for(const k of[0,2.094,4.189]){const a=m.sa+k;g.lineStyle(7,0xff3b4f,.18+.2*pu).lineBetween(o.ax,o.ay,o.ax+Math.cos(a)*110,o.ay+Math.sin(a)*110);g.lineStyle(2,0xff5a7a,.9).lineBetween(o.ax,o.ay,o.ax+Math.cos(a)*110,o.ay+Math.sin(a)*110)}g.lineStyle(2,0xff3b4f,.8).strokeCircle(o.ax,o.ay,14+6*pu);if(m.tm<=0){m.st='spiral';m.tm=2.8}}break;\n  case 'spiral':m.st2-=dt;")
rep("  case 'hideW':if(m.tm<=0){", "  case 'hideW':{const k=1-m.tm/.7;g.fillStyle(0xff3b4f,.1+.12*k).fillCircle(o.ax,o.ay,48);g.lineStyle(2,0xff5a7a,.9).strokeCircle(o.ax,o.ay,48);for(let i=0;i<12;i++){const a=i/12*6.283;g.lineStyle(3,0xff3b4f,.4+.5*k).lineBetween(o.ax+Math.cos(a)*20,o.ay+Math.sin(a)*20,o.ax+Math.cos(a)*(20+26*k),o.ay+Math.sin(a)*(20+26*k))}}if(m.tm<=0){")
rep("    if(Math.hypot(p.x-o.ax,p.y-o.ay)<48&&!(m.bhT>now)){", "    g.lineStyle(2,0xff5a7a,.7).strokeCircle(o.ax,o.ay,48);if(m.tm<.45){const k=1-m.tm/.45;for(let i=0;i<12;i++){const a=.15+i/12*6.283;g.lineStyle(3,0xff3b4f,.4+.5*k).lineBetween(o.ax+Math.cos(a)*20,o.ay+Math.sin(a)*20,o.ax+Math.cos(a)*(20+26*k),o.ay+Math.sin(a)*(20+26*k))}}\n    if(Math.hypot(p.x-o.ax,p.y-o.ay)<48&&!(m.bhT>now)){")
rep("  case 'grab':if(en<1){m.st2=(m.st2||0)-dt;", "  case 'grab':if(en<1){g.lineStyle(2,0xff3b4f,.5+.4*Math.sin(now/60)).strokeCircle(o.ax,o.ay,16);m.st2=(m.st2||0)-dt;")
a = " // ===== 숨 쉬는 산호 환초 ====="   # 앞서 정의된 obsRev·dshDodge보다 뒤에 두어야 덮어씀
if s.count(a) != 1: raise SystemExit('anchor atl')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
