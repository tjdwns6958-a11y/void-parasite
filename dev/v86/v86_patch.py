#!/usr/bin/env python3
"""v85 -> v86: 정동 집게왕 손질 + 갑각 수정(무기물) = 공격용
1) 수정 기둥에 끼는 버그: 기둥을 안쪽으로 옮기고, 밀어낼 때 속도를 0으로 만들지 않음(미끄러져 빠져나감) · 넉백이 기둥에 막히면 멈춤 · 기둥이 다시 자랄 때 플레이어가 겹치면 미룸
2) 집게왕이 기둥에 박히면 무기물(결정)이 포물선을 그리며 떨어져 나와 바닥에 박힘(먹을 수 있음) — 박힐 때 1~2개, 부서질 때 3개
3) 갑각: 수정은 막기 대신 공격에 실음 — 수정 박치기 피해 ×1.7(3단계 ×1.9) · 재사용 +0.5초 · 수정 파편 충돌 연출
4) 집게왕 크기 약 1.15배(174px → 200px) · 판정·간격 맞춤
5) 움직임: 걷기 4프레임(다리가 번갈아 들림, 움직인 거리만큼 넘김) · 내리찍기·던지기 때 큰 집게를 쳐든 프레임 · 돌진 준비 웅크림 · 돌진 기울기 · 걸을 때 흙먼지 · 숨쉬기
본체: dev/v86/v86_methods.js · 그림: dev/v86/gdk_*.png (tools/boss_sdf/frames.py) · 사용: python3 dev/v86/v86_patch.py index.html"""
import sys, os, re, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
M = open(os.path.join(H, 'v86_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v85</title>', '<title>공허 기생충 v86</title>')
rep("window.VP_VER='v85';", "window.VP_VER='v86';")
# --- 그림: 몸 프레임 10장으로 교체 (G·P는 그대로)
m = re.search(r"const GDKI=\{A:'data:image/png;base64,[^']*',B:'data:image/png;base64,[^']*',", s)
if not m: raise SystemExit('GDKI')
fr = ['A0','A1','A2','A3','Ar','B0','B1','B2','B3','Br']
s = s[:m.start()] + "const GDKI={" + "".join(f"{k}:'data:image/png;base64," + base64.b64encode(open(os.path.join(H, f'gdk_{k}.png'),'rb').read()).decode() + "'," for k in fr) + s[m.end():]
rep("gdkTex(){for(const k of['A','B','G','P']){", "gdkTex(){for(const k of['A0','A1','A2','A3','Ar','B0','B1','B2','B3','Br','G','P']){")
rep("gdk:'gdkA'})[e.k];", "gdk:'gdkA0'})[e.k];")
# --- 4) 크기·판정 (수정 박치기가 세져서 체력도 올림)
rep("room.en.push(E('gdk',400,150,Math.round(470+54*plv),", "room.en.push(E('gdk',400,150,Math.round(520+60*plv),")
rep("if(!m.pt){m.ph=1;m.br=46;m.gone=0;m.pt=[[170,128],[630,128],[240,272],[560,272]]", "if(!m.pt){m.ph=1;m.br=54;m.gone=0;m.pt=[[185,140],[615,140],[255,248],[545,248]]")
rep("if(!(m.chH>now)&&Math.hypot(p.x-m.x,p.y-m.y)<54){", "if(!(m.chH>now)&&Math.hypot(p.x-m.x,p.y-m.y)<62){")
rep("const pq=m.pt.find(q=>q.on&&Math.hypot(q.x-m.x,q.y-m.y)<62);", "const pq=m.pt.find(q=>q.on&&Math.hypot(q.x-m.x,q.y-m.y)<70);")
rep("m.slx=m.x+m.sdx*60;m.sly=m.y+m.sdy*46;", "m.slx=m.x+m.sdx*70;m.sly=m.y+m.sdy*54;")
rep("for(let i=1;i<=11;i++){const x=m.x+cx*(30+i*34),y=m.y+cy*(24+i*28);", "for(let i=1;i<=11;i++){const x=m.x+cx*(38+i*34),y=m.y+cy*(30+i*28);")
rep("g.lineStyle(2,0xffe066,.5+.4*Math.sin(now/90)).strokeEllipse(m.x,m.y,120,84);", "g.lineStyle(2,0xffe066,.5+.4*Math.sin(now/90)).strokeEllipse(m.x,m.y,140,98);")
rep("const a=Math.PI/2+(Math.random()-.5)*1.6;m.ball={x:m.x,y:m.y-34,", "const a=Math.PI/2+(Math.random()-.5)*1.6;m.ball={x:m.x,y:m.y-40,")
rep("const qx=m.x-b.x,qy=m.y-34-b.y,", "const qx=m.x-b.x,qy=m.y-40-b.y,")
rep("else if(b.st=='held'){b.x=m.x;b.y=m.y-34}", "else if(b.st=='held'){b.x=m.x;b.y=m.y-40}")
rep("this.telAdd({k:'l',x:m.x,y:m.y-20,x2:m.x+m.tdx*620,y2:m.y-20+m.tdy*620,", "this.telAdd({k:'l',x:m.x,y:m.y-24,x2:m.x+m.tdx*620,y2:m.y-24+m.tdy*620,")
rep("m.st='stun';m.tm=P2?1.3:1.8;", "m.st='stun';m.tm=P2?1.1:1.5;")
rep("if(m.k=='gdk'){if(m.st=='stun')return 1.3;if(m.ph==2)return m.st=='rip'?.5:.8;", "if(m.k=='gdk'){if(m.st=='stun')return 1.15;if(m.ph==2)return m.st=='rip'?.5:.7;")
rep("m.st='rain';m.tm=1.3;m.rnc=this.time.now+3800;", "m.st='rain';m.tm=1.3;m.rnc=this.time.now+3000;")
rep("  for(let i=0;i<9;i++){const a=Math.random()*6.283,r=i?45+Math.random()*100:0;", "  for(let i=0;i<11;i++){const a=Math.random()*6.283,r=i?45+Math.random()*110:0;")
rep("     else if(d>=125&&r<(P2?.28:.34))this.gdkWave(m,D,en);", "     else if(d>=125&&r<(P2?.34:.42))this.gdkWave(m,D,en);")
rep("case 'ch':{const v=(P2?640:560)*dt;", "case 'ch':{const v=(P2?660:600)*dt;")
rep("if(m.cl<=0){if(m.rep>0){m.rep--;this.gdkCharge(m,en,0,.45)}else{m.st='idle';m.cd=1.0*en}}", "if(m.cl<=0){if(m.rep>0){m.rep--;this.gdkCharge(m,en,0,.45)}else{m.st='idle';m.cd=.8*en}}")
rep("const base=Math.min(320,225+", "const base=Math.min(330,240+")
# --- 1) 기둥에 끼는 버그
rep("   const dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);if(d<28&&d>.01){p.body.reset(q.x+dx/d*28,q.y+dy/d*28)}}",
    "   const dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);if(d<30){const nx=d>.01?dx/d:0,ny=d>.01?dy/d:1,pen=30-d,B=p.body,vn=B.velocity.x*nx+B.velocity.y*ny;p.x+=nx*pen;p.y+=ny*pen;if(vn<0){B.velocity.x-=vn*nx;B.velocity.y-=vn*ny;this.vx-=vn*nx;this.vy-=vn*ny}if(this.gkb&&this.gkb.t>0&&this.gkb.vx*nx+this.gkb.vy*ny<0)this.gkb.t=0}}")
rep("for(const q of m.pt){if(!q.on){q.rt-=dt;if(q.rt<=0){q.on=1;", "for(const q of m.pt){if(!q.on){q.rt-=dt;if(q.rt<=0&&Math.hypot(p.x-q.x,p.y-q.y)<48)q.rt=.5;if(q.rt<=0){q.on=1;")
rep("if(this.gkb&&this.gkb.t>0){this.gkb.t-=dt;p.body.reset(Phaser.Math.Clamp(p.x+this.gkb.vx*dt,60,740),Phaser.Math.Clamp(p.y+this.gkb.vy*dt,62,300))}\n  const S=m.spr;",
    "if(this.gkb&&this.gkb.t>0){this.gkb.t-=dt;p.x=Phaser.Math.Clamp(p.x+this.gkb.vx*dt,60,740);p.y=Phaser.Math.Clamp(p.y+this.gkb.vy*dt,62,300)}\n  const S=m.spr;")
# --- 2) 무기물이 떨어져 나옴
rep("  if(q.hp<=0){q.on=0;q.rt=18;q.o.setVisible(false);this.gdkShard(q.x-16,q.y+8);this.gdkShard(q.x+16,q.y+8)}else q.o.setTint(0xa0b8ff)}",
    "  if(q.hp<=0){q.on=0;q.rt=18;q.o.setVisible(false);this.gdkShardFly(q.x,q.y,3);this.dtx(q.x,q.y-40,'기둥이 부서졌다','#9fd8ff')}else{q.o.setTint(0xa0b8ff);this.gdkShardFly(q.x,q.y,1+(Math.random()<.5?1:0))}}")
# --- 5) 움직임 (프레임·자세)
rep("  S.setPosition(m.x+sx,m.y+sy+Math.sin(now/420)*1.2);if(m.st!='stun')S.clearTint();",
    "  {const mv=Math.hypot(m.x-(m.lx??m.x),m.y-(m.ly??m.y));m.lx=m.x;m.ly=m.y;m.wd=(m.wd||0)+mv;const up=m.st=='slW'||(m.st=='sl'&&m.tm>.3)||m.st=='thW'||m.st=='call',key=(P2?'gdkB':'gdkA')+(up?'r':String(Math.floor(m.wd/9)%4));if(S.texture.key!==key&&this.textures.exists(key))S.setTexture(key);\n   if(mv>.4&&Math.random()<Math.min(.6,mv*.06))this.gdkDust(m.x+(Math.random()-.5)*150,m.y+48,1);\n   const GS=.92;let scx=GS,scy=GS,rot=0;if(m.st=='chW'){scx*=1.05;scy*=.92}else if(m.st=='ch'){rot=Phaser.Math.Clamp(m.cdx*.1,-.1,.1);scy*=.97}else if(m.st=='sl'&&m.tm<=.3){scy*=.9;scx*=1.06}else if(m.st=='stun'){rot=Math.sin(now/90)*.04}else if(mv<.2)scy*=1+.018*Math.sin(now/320);S.setScale(scx,scy).setRotation(rot)}\n  S.setPosition(m.x+sx,m.y+sy+Math.sin(now/420)*1.2);if(m.st!='stun')S.clearTint();")
rep("case 'rip':sx=(Math.random()-.5)*4;if(m.tm<=0){m.ph=2;S.setTexture('gdkB');", "case 'rip':sx=(Math.random()-.5)*4;if(m.tm<=0){m.ph=2;")
# --- 3) 갑각 수정 = 공격
rep("let cb=1;if(L.c>=2&&this.cry>0){this.cry--;this.shard();cb=.4;this.dtx(this.pl.x,this.pl.y-22,'수정이 막았다','#9fd8ff')}", "let cb=1;")
rep("  if(this.domK()!='c'){this.chg=null;if(jd&&this.bcd<=0)this.bite();return}\n  this.chg=null;if(jd&&this.bcd<=0)this.slamF(0)}",
    "  if(this.domK()!='c'){this.chg=null;if(jd&&this.bcd<=0)this.cryAtk(0);return}\n  this.chg=null;if(jd&&this.bcd<=0)this.cryAtk(1)}")
rep("['수정 충전','결정을 먹으면 수정 1개 충전(최대 3) — 맞을 때 피해 60%를 막고 주변에 파편 피해 6']",
    "['수정 충전','결정을 먹으면 수정 1개 충전(최대 3) — 수정을 실은 박치기: 피해 ×1.7(3단계 ×1.9) · 대신 재사용 +0.5초 · 맞히면 수정 1개 소모']")
a = " slamF(f){"
if s.count(a) != 1: raise SystemExit('anchor slamF')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
