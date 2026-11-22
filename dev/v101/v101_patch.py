#!/usr/bin/env python3
"""v100 -> v101: 공허의 소용돌이 = 방과 방을 잇는 길 · 공허 칠성장어
1) 공허 균열(차원 이동) 없앰. 소용돌이 방은 이웃 방 쪽 가장자리에 소용돌이를 두고(빨려 들어가면 그 방으로), 이웃 방에는 작은 소용돌이 출구(들어가면 돌아옴).
   바닥 핏줄을 따라 해류가 맥박처럼 흐른다(두근-두근, 1.5초): 해류 위에서는 소용돌이 쪽으로 밀리고, 맥박 때 세다. 소용돌이 가까이는 끌어당김.
   살아 있는 느낌: 가장자리 섬모가 물결치며 쓸어 넣음 · 먹이가 닿으면 꿀꺽 수축 · 가끔 깊은 곳에서 눈이 떠서 플레이어를 보고 깜빡.
2) 소용돌이 방의 보이드링 → 공허 칠성장어: 눈이 없어 좁게(90px)만 느낌 → 다가와 한 입 물고 도망. 몸이 5.2초마다 반투명(완전히 사라지지는 않음).
   처치하면 공허 정수 +1(보이드링과 같음). 소용돌이에서 9초마다 기어 나옴(4마리 미만일 때, 방마다 4번).
본체: dev/v101/v101_methods.js (hud() 바로 앞) · 사용: python3 dev/v101/v101_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v101_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v100</title>', '<title>공허 기생충 v101</title>')
rep("window.VP_VER='v100';", "window.VP_VER='v101';")
# 1) 맵 생성: 균열 없앰 → 소용돌이 방의 이웃 방 쪽 통로 하나를 소용돌이로
rep("for(const a of rooms)if(a.tr=='flow'&&!has(a,'rift')){const c=links(a).filter(([k,b])=>!has(b,'rift'));if(c.length){const[k,b,o]=pick(c);a.ct[k]=b.ct[o]='rift'}}\n for(const a of rooms)for(const[k,b,o]of links(a))if(a.ct[k]=='cave'&&!has(a,'rift')&&!has(b,'rift')&&Math.random()<.12)a.ct[k]=b.ct[o]='rift';",
    "// v101: 공허 균열(차원 이동) 없앰 → 소용돌이 방은 이웃 방 쪽 가장자리에 소용돌이 (이웃 방에는 작은 출구)\n for(const a of rooms)if(a.tr=='flow'){const c=links(a).filter(([k,b,o])=>a.ct[k]=='cave'&&b.ct[o]=='cave');if(c.length){const[k,b,o]=pick(c);a.ct[k]=b.ct[o]='vort';a.vk=k;a.hp[k]={N:[8+rnd(4),2],S:[8+rnd(4),6],W:[2,3+rnd(3)],E:[17,3+rnd(3)]}[k];a.vx=(a.hp[k][0]+.5)*C.T;a.vy=(a.hp[k][1]+.5)*C.T}}")
rep("for(const k in (a.hp||{}))if(a.d[k]&&(a.ct[k]=='hole'||a.ct[k]=='rift'))EP.push(", "for(const k in (a.hp||{}))if(a.d[k]&&(a.ct[k]=='hole'||a.ct[k]=='rift'||a.ct[k]=='vort'))EP.push(")
# 2) 칠성장어: 설정 · 배치
rep("const MON=k=>({rek:C.R,gna:C.G,vdl:C.V,", "C.LM={hp:22,dmg:9,v:70,dart:300,flee:240,det:90,e:5,o:3};\nconst MON=k=>({rek:C.R,gna:C.G,vdl:C.V,lmp:C.LM,")
rep("for(const a of rooms)if(a.vt)for(let i=3+rnd(2);i>0;i--){const an=Math.random()*6.283,r=90+Math.random()*70;P(a,{k:'vdl',x:400+Math.cos(an)*r,y:180+Math.sin(an)*r*.75,hp:C.V.hp,st:'orbit',or:r,oa:an})}",
    "for(const a of rooms)if(a.vt){const vx=a.vx??400,vy=a.vy??180;for(let i=3+rnd(2);i>0;i--)for(let j=0;j<40;j++){const x=90+Math.random()*620,y=80+Math.random()*200,c=Math.floor(x/C.T),r=Math.floor(y/C.T);if(Math.hypot(x-vx,y-vy)<160||a.obs.some(o=>Math.abs(o[0]-c)<=1&&Math.abs(o[1]-r)<=1))continue;P(a,{k:'lmp',x,y,hp:C.LM.hp,st:'swim'});break}}")
# 방 그리기: 소용돌이(가운데 그림 대신) · 출구
rep("if(a.vt){const ey=this.add.image(400,180,'veye').setDepth(.9);this.dec.push(ey);this.tweens.add({targets:ey,angle:(a.vd||1)*360,duration:4000,repeat:-1})}", "if(a.vt)this.vtxMk(a);")
rep("\n    else{const g=this.add.image(x,y,'wglow').setDepth(.8).setTint(0xb070ff)", "\n    else if(ty=='vort'){if(!(a.vt&&a.vk==k))this.vtxOut(x,y)}\n    else{const g=this.add.image(x,y,'wglow').setDepth(.8).setTint(0xb070ff)")
rep("CC={hole:0xa07850,rift:0xc070ff,", "CC={hole:0xa07850,rift:0xc070ff,vort:0x7ff0ff,")
# 들어가기 · 이동 연출 · 도착 위치(소용돌이에서 떨어진 곳)
rep("(a.ct[kk]!='hole'&&a.ct[kk]!='rift'))continue;", "(a.ct[kk]!='hole'&&a.ct[kk]!='rift'&&a.ct[kk]!='vort'))continue;")
rep("(a.ct[kk]=='hole'?'땅울음 굴':'공허 균열')", "(a.ct[kk]=='hole'?'땅울음 굴':a.ct[kk]=='vort'?'소용돌이':'공허 균열')")
rep("tunnel(dt){const T=this.tr,p=this.pl,rf=T.kind=='rift',", "tunnel(dt){const T=this.tr,p=this.pl,rf=T.kind=='rift'||T.kind=='vort',")
rep("else if(!T.done){T.done=1;this.enter(T.b);const[hc,hr]=T.b.hp[T.o],x=(hc+.5)*C.T,y=(hr+.5)*C.T;",
    "else if(!T.done){T.done=1;this.enter(T.b);const[hc,hr]=T.b.hp[T.o];let x=(hc+.5)*C.T,y=(hr+.5)*C.T;if(T.kind=='vort'){const dx=400-x,dy=180-y,l=Math.hypot(dx,dy)||1,o=T.b.vt&&T.b.vk==T.o?112:46;x+=dx/l*o;y+=dy/l*o}")
rep("(this.cur.ct[k]=='hole'||this.cur.ct[k]=='rift')", "(this.cur.ct[k]=='hole'||this.cur.ct[k]=='rift'||this.cur.ct[k]=='vort')")
# 칠성장어: 그림 · 처치 보상(공허 정수 +1) · 마디 정리 · 반투명일 때 체력바 숨김 · 소개 카드
rep("else if(e.k=='vdl'){e.st='orbit';e.oa=null;e.spr=this.add.image(e.x,e.y,'vdl').setDepth(12)}",
    "else if(e.k=='lmp'){this.vtxTex();e.st='swim';e.wx=null;e.spr=this.add.image(e.x,e.y,'lmpH').setDepth(12);e.sg=[];for(let i=0;i<6;i++)e.sg.push(this.add.image(e.x,e.y+7+5.5*i,'lmpS').setDepth(11.9-i*.01).setScale(1-i*.1));if(e.to==null)e.to=Math.random()*5.2}\n  else if(e.k=='vdl'){e.st='orbit';e.oa=null;e.spr=this.add.image(e.x,e.y,'vdl').setDepth(12)}")
rep("{rek:18,gna:6,vdl:4,", "{rek:18,gna:6,vdl:4,lmp:8,")
rep("const vd=m.k=='vdl'||m.k=='lsp',vv=m.k=='vdl';", "const vd=m.k=='vdl'||m.k=='lsp'||m.k=='lmp',vv=m.k=='vdl'||m.k=='lmp';")
rep("kill(m){if(m.mb)return this.mbDie(m);", "kill(m){if(m.mb)return this.mbDie(m);if(m.sg){const S=m.sg;m.sg=null;S.forEach((o,i)=>this.tweens.add({targets:o,alpha:0,scale:.2,delay:i*45,duration:320,onComplete:()=>o.destroy()}))}")
rep("else{const fast=k=='vdl'||k=='lsp';", "else{const fast=k=='vdl'||k=='lsp'||k=='lmp';")
rep("m.en.forEach(e=>{if(e.spr){e.spr.destroy();e.spr=null}", "m.en.forEach(e=>{if(e.sg){e.sg.forEach(o=>o.destroy());e.sg=null}if(e.spr){e.spr.destroy();e.spr=null}")
rep("if(dk&&this.lin.v<1&&Math.hypot(m.x-this.pl.x,m.y-this.pl.y)>110)continue;", "if(dk&&this.lin.v<1&&Math.hypot(m.x-this.pl.x,m.y-this.pl.y)>110)continue;if(m.k=='lmp'&&m.spr.alpha<.6)continue;")
rep("vdl:['보이드링',", "lmp:['공허 칠성장어',''],vdl:['보이드링',")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
