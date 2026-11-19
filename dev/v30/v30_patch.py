#!/usr/bin/env python3
"""v29 -> v30: 중간 보스 3종 교체 (허기의 왕관 · 숨 쉬는 산호 환초 · 틈 너머의 관찰자)."""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v29</title>', '<title>공허 기생충 v30</title>')
# 퀘스트 설명
rep("p:{q:'사냥꾼들의 둥지',b:'각성한 카직스',", "p:{q:'허기의 왕관',b:'허기의 왕관',")
rep("d:'덤불에서 멀어져 고립되면 카직스가 3번 연속 도약한다 — 덤불 곁에서 싸울 것. 체력이 절반이 되면 각성한 렉사이가 땅속에서 합류한다.'",
    "d:'턱들이 흩어져 사냥하는 동안만 가운데 구멍을 물 수 있다 — 맞물리는 두 턱 사이를 피하고, 들숨에 빨려 가기 전에 유충을 먼저 먹어 둘 것.'")
rep("c:{q:'결정 여왕의 산호굴',b:'결정 여왕',", "c:{q:'숨 쉬는 산호 환초',b:'환초의 가면',")
rep("d:'결정 갑옷 6조각이 여왕을 지킨다 — 날아오는 산호 가시를 마주 보고 물어 되받아쳐서 갑옷을 깰 것. 산호 감옥은 틈으로 빠질 것.'",
    "d:'고리의 틈으로 들어가야 가운데 가면을 물 수 있다 — 고리가 부풀면 점선 안쪽 바깥이 터지고, 안에서는 가면의 눈빛을 피할 것. 묶인 산호충을 물어 끊으면 고리가 무너진다.'")
rep("v:{q:'각성한 감시자의 탑',b:'각성한 감시자',", "v:{q:'틈 너머의 관찰자',b:'틈 너머의 관찰자',")
rep("d:'광선과 섬광은 등불 기둥 뒤 그림자에서 피할 것 — 앞껍질은 단단하니 등 뒤를 노릴 것.'",
    "d:'시선 안에 오래 있으면 응시가 차오른다 — 떠 있는 갑주 조각 그림자에 숨을 것. 가장자리에서 뜬 눈을 모두 물어 감기면 큰 눈이 끌려 나온다.'")
rep("mbp:['사냥꾼들의 둥지 — 덤불 곁에서 싸울 것',0xe8b0d0],mbc:['결정 여왕의 산호굴',0xb8b0f0],mbv:['각성한 감시자의 탑 — 기둥 그림자에 숨을 것',0xd0c0a8]",
    "mbp:['허기의 왕관',0xe8b0d0],mbc:['숨 쉬는 산호 환초',0xb8b0f0],mbv:['틈 너머의 관찰자',0xc0b0e0]")
# 방 · 보스 생성
rep("  if(k=='p')for(const[c,r]of[[2,1],[3,1],[2,2],[16,1],[17,1],[17,2],[1,4],[2,4],[17,4],[18,4],[2,7],[3,7],[16,7],[17,7],[9,7],[10,7]])room.zn.push([c,r,2]);\n", "")
rep("  if(k=='v'){let g=900;for(const[c,r]of[[5,2],[14,2],[5,6],[14,6]])room.obs.push([c,r,3,g++,0,c,r])}\n", "")
rep("  if(k=='p')room.en.push(E('kzb',400,120,Math.round(380+42*plv),{br:18,nm:'각성한 카직스',bi:0}));", "  if(k=='p')room.en.push(E('hcr',400,160,Math.round(380+42*plv),{br:44,nm:'허기의 왕관',bi:0,gone:1}));")
rep("  if(k=='c')room.en.push(E('qnb',400,118,Math.round(320+36*plv),{br:30,nm:'결정 여왕',bi:0}));", "  if(k=='c')room.en.push(E('atl',400,178,Math.round(380+44*plv),{br:34,nm:'환초의 가면',bi:0,gone:1}));")
rep("  if(k=='v')room.en.push(E('wdb',400,180,Math.round(460+50*plv),{br:34,nm:'각성한 감시자',bi:0,fa:Math.PI/2}));", "  if(k=='v')room.en.push(E('obs',400,116,Math.round(380+40*plv),{br:44,nm:'틈 너머의 관찰자',bi:0,gone:1}));")
rep(" mbEnter(){const k=this.mq.k,p=this.pl,Q=MBQ[k];this.mbTex();", " mbEnter(){const k=this.mq.k,p=this.pl,Q=MBQ[k];this.mbTex();this.mb30Tex();")
rep("  const m=room.en[0],S=m.spr;S.setAlpha(0).setScale(.3);", "  const m=room.en[0],S=m.spr;this[m.k+'AI'](m,0,p);S.setAlpha(0).setScale(.3);")
rep("m.st=k=='p'?'stalk':k=='c'?'idle':'track';m.cd=1;", "m.st=k=='p'?'crown':k=='c'?'idle':'watch';m.cd=1;")
rep("else if(e.mb){e.spr=this.add.image(e.x,e.y,e.k=='rkb'&&e.st=='under'?'rkbm':e.k).setDepth(9);e.lvT.setVisible(false)}",
    "else if(e.mb){const tk=({hcr:'hcrH',atl:'atlM',obs:'obsE'})[e.k];e.spr=this.add.image(e.x,e.y,tk||(e.k=='rkb'&&e.st=='under'?'rkbm':e.k)).setDepth(({hcr:1.2,obs:3.05})[e.k]||9);e.lvT.setVisible(false)}")
rep("for(const kk of['kzb','rkb','qnb','wdb'])this.seenM[kk]=1;", "for(const kk of['kzb','rkb','qnb','wdb','hcr','atl','obs'])this.seenM[kk]=1;")
# 피해 배율 · 체력바 · 처치 정리
rep(" mbMul(m,bt){if(m.gone)return 0;", " mbMul(m,bt){if(m.gone)return 0;if(m.k=='hcr')return 1.25;if(m.k=='atl')return 1;if(m.k=='obs')return 1.4;")
rep("g.fillStyle(m.k=='rkb'?0xc070ff:", "g.fillStyle(m.k=='atl'?0x9fd8ff:m.k=='obs'?0xc8a8ff:m.k=='rkb'?0xc070ff:")
rep("if(m.pl)m.pl.forEach(q=>{if(q.o){q.o.destroy();q.o=null}q.on=0});this.tel=this.tel.filter(q=>q.m!==m);",
    "if(m.pl)m.pl.forEach(q=>{if(q.o){q.o.destroy();q.o=null}q.on=0});this.tel=this.tel.filter(q=>q.m!==m);for(const kk of['jw','po','cs','rg','pt','ey'])if(m[kk])m[kk].forEach(q=>{if(q.o)q.o.destroy();if(q.oe)q.oe.destroy()});for(const kk of['rf','pu','lag'])if(m[kk]){m[kk].destroy();m[kk]=null}this.emPull=null;")
# 예고: 고리 띠(b)
rep("  if(q.k=='s'){const d=Math.hypot(x-q.x,y-q.y);return d<q.r+6&&Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(y-q.y,x-q.x)-q.a))<q.h}return false}",
    "  if(q.k=='s'){const d=Math.hypot(x-q.x,y-q.y);return d<q.r+6&&Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(y-q.y,x-q.x)-q.a))<q.h}\n  if(q.k=='b'){const r=Math.hypot((x-q.x)/q.rx,(y-q.y)/q.ry);return r>.96&&r<q.k2}return false}\n ringPts(q,f){const A=[],B=[];for(let i=0;i<=40;i++){const a=i/40*6.283;A.push({x:q.x+Math.cos(a)*q.rx*f,y:q.y+Math.sin(a)*q.ry*f});B.push({x:q.x+Math.cos(-a)*q.rx,y:q.y+Math.sin(-a)*q.ry})}return A.concat(B)}")
rep("   else if(q.k=='s'){g.fillStyle(col,.1+.16*k).slice(",
    "   else if(q.k=='b'){g.fillStyle(col,.1+.14*k).fillPoints(this.ringPts(q,q.k2),true);g.lineStyle(2,0xff5a7a,.9).strokeEllipse(q.x,q.y,q.rx*2*q.k2,q.ry*2*q.k2);g.lineStyle(1.5,0xffffff,.5).strokeEllipse(q.x,q.y,q.rx*2*(1+(q.k2-1)*k),q.ry*2*(1+(q.k2-1)*k))}\n   else if(q.k=='s'){g.fillStyle(col,.1+.16*k).slice(")
rep("else if(q.k=='l')f.lineStyle(q.w*.7,0xffffff,.6).lineBetween(q.x,q.y,q.x2,q.y2);", "else if(q.k=='l')f.lineStyle(q.w*.7,0xffffff,.6).lineBetween(q.x,q.y,q.x2,q.y2);else if(q.k=='b')f.fillStyle(0xffffff,.35).fillPoints(this.ringPts(q,q.k2),true);")
# 물기: 산호충 · 가장자리 눈
rep("this.dtx(q.x,q.y-14,'되받아쳤다!','#8ad8ff');hit=1}}\n", "this.dtx(q.x,q.y-14,'되받아쳤다!','#8ad8ff');hit=1}}\n  if(this.mbOn&&this.mbBite(fx,fy))hit=1;\n")
# 사망 팁
rep("'공허를 걷는 자의 칼날':'바닥에",
    "'허기의 턱':'떠다니는 턱에 닿으면 물린다 — 붉은 선이 깔리면 그 줄에서 비킬 것','허기의 턱 — 맞물림':'두 턱 사이에 붉은 줄이 생기면 줄 밖으로','허기의 들숨':'붉은 점이 모이면 들숨 — 구멍 반대쪽으로 헤엄치고, 유충을 먼저 먹어 둘 것',"
    "'환초의 숨':'고리가 부풀 때는 점선 밖으로 멀리 가거나 고리 안으로 들어갈 것','묶인 산호충':'산호충이 붉은 선을 그으면 옆으로 — 물어서 끊으면 고리가 무너진다','가면의 눈빛':'고리 안에서는 가면이 두 줄의 눈빛을 쏜다 — 붉은 선 사이로 비킬 것','가면의 들숨':'들숨이 끝날 때 가면 곁에 있으면 물린다 — 고리 밖으로 빠질 것',"
    "'관찰자의 응시':'시선 안에 있으면 응시(점 5개)가 찬다 — 떠 있는 갑주 조각 그림자에 숨을 것','관찰자의 광선':'광선이 방을 쓸 때는 갑주 조각 뒤에 숨을 것','가장자리 눈의 빛살':'뜬 눈은 빛살을 쏜다 — 다가가 물어서 감길 것',"
    "'공허를 걷는 자의 칼날':'바닥에")
M = open(sys.argv[2] if len(sys.argv) > 2 else 'dev/v30/v30_methods.js', encoding='utf-8').read().rstrip('\n') + '\n'
rep('\n end(a,b,c,tip){', '\n' + M + ' end(a,b,c,tip){')
open(P, 'w', encoding='utf-8').write(s)
print('ok', len(s))
