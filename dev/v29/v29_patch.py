#!/usr/bin/env python3
"""v28 -> v29: 분화 3단계 특수 퀘스트 + 중간 보스 3종(A 각성체) + 특수 스킬."""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v28</title>', '<title>공허 기생충 v29</title>')
rep("const rnd=n=>Math.random()*n|0,pick=a=>a[rnd(a.length)];",
    "const rnd=n=>Math.random()*n|0,pick=a=>a[rnd(a.length)];\n"
    "const MBQ={p:{q:'사냥꾼들의 둥지',b:'각성한 카직스',s:'포식 돌진',d:'덤불에서 멀어져 고립되면 카직스가 3번 연속 도약한다 — 덤불 곁에서 싸울 것. 체력이 절반이 되면 각성한 렉사이가 땅속에서 합류한다.',sd:'앞으로 돌진하며 지나간 자리의 적을 모두 물어뜯는다 (처치하면 에너지 회복) · 재사용 6초'},"
    "c:{q:'결정 여왕의 산호굴',b:'결정 여왕',s:'결정 방벽',d:'결정 갑옷 6조각이 여왕을 지킨다 — 날아오는 산호 가시를 마주 보고 물어 되받아쳐서 갑옷을 깰 것. 산호 감옥은 틈으로 빠질 것.',sd:'2초 동안 피해를 받지 않고, 그동안 받은 공격을 되돌린다 · 재사용 14초'},"
    "v:{q:'각성한 감시자의 탑',b:'각성한 감시자',s:'균열 도약',d:'광선과 섬광은 등불 기둥 뒤 그림자에서 피할 것 — 앞껍질은 단단하니 등 뒤를 노릴 것.',sd:'바라보는 쪽으로 순간이동하고 도착한 자리에서 균열이 터진다 · 재사용 7초'}};")
rep("TR={coral:", "TR={mbp:['사냥꾼들의 둥지 — 덤불 곁에서 싸울 것',0xe8b0d0],mbc:['결정 여왕의 산호굴',0xb8b0f0],mbv:['각성한 감시자의 탑 — 기둥 그림자에 숨을 것',0xd0c0a8],coral:")
rep("this.treeO=null;this.rgT=null;this.cine=null;", "this.treeO=null;this.rgT=null;this.cine=null;this.mq=null;this.mbOn=null;this.tel=[];this.mbb=[];this.skl=null;this.skCd=0;this.dsh=null;this.wallT=0;")
rep("addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE,E,ONE,TWO,THREE,FOUR,ENTER,ESC,SHIFT')", "addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE,E,ONE,TWO,THREE,FOUR,ENTER,ESC,SHIFT,Q')")
rep("   if(Phaser.Math.Distance.Between(p.x,p.y,728,288)<60){this.eat=p;this.req=1}", "   if(this.skl&&Phaser.Math.Distance.Between(p.x,p.y,676,228)<28){this.skUse();return}\n   if(Phaser.Math.Distance.Between(p.x,p.y,728,288)<60){this.eat=p;this.req=1}")
rep("this.prjU(dt,p);this.eprjU(dt,p);", "this.prjU(dt,p);this.eprjU(dt,p);this.mbU(dt,p);if(this.cine)return;")
rep("this.pop('출구의 기척이 느껴진다 — 지도를 확인할 것',400,140)}\n  this.hud();", "this.pop('출구의 기척이 느껴진다 — 지도를 확인할 것',400,140)}\n  this.hud();this.skHud();")
rep("this.lin[k]++;this.molts++;", "this.lin[k]++;this.molts++;if(this.lin[k]==3&&!this.mq)this.time.delayedCall(1500,()=>this.mqStart(k));")
rep("  if(a.vt){const ey=", "  this.mqRift(a);\n  if(a.vt){const ey=")
rep("this.zi++;this.lv=gen(this.zi);", "this.zi++;this.lv=gen(this.zi);if(this.mq&&this.mq.st=='open'){this.mq.room=this.lv.start;this.mq.x=null}")
rep("  else if(e.k=='em'){", "  else if(e.mb){e.spr=this.add.image(e.x,e.y,e.k=='rkb'&&e.st=='under'?'rkbm':e.k).setDepth(9);e.lvT.setVisible(false)}\n  else if(e.k=='em'){")
rep("if(m.k=='em'){this.emBar(g,m);continue}", "if(m.k=='em'){this.emBar(g,m);continue}if(m.mb){this.mbBar(g,m);continue}")
rep("dmul(m,bt){", "dmul(m,bt){if(m.mb)return this.mbMul(m,bt);")
rep("kill(m){if(m.k=='em')", "kill(m){if(m.mb)return this.mbDie(m);if(m.k=='em')")
rep("C.BITE.range+(m.k=='rw'||m.k=='em'?40:0)", "C.BITE.range+(m.mb?m.br||0:m.k=='rw'||m.k=='em'?40:0)")
rep("m.k=='rw'||m.k=='em'?.06:.25", "m.k=='rw'||m.k=='em'||m.mb?.06:.25")
rep("if(d>0&&!({spn:1,qn:1,wd:1,rw:1,em:1})[m.k])", "if(d>0&&!m.mb&&!({spn:1,qn:1,wd:1,rw:1,em:1})[m.k])")
rep("\n  const e=this.add.circle(p.x+fx*34,p.y+fy*34,20,0xffffff,.55)", "\n  for(const q of this.mbb||[])if(!q.ref&&q.k=='spk'){const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);if(d<C.BITE.range+14&&(dx*fx+dy*fy)/(d||1)>-.1){q.ref=1;q.t=3;q.o.setTint(0x8ad8ff);this.dtx(q.x,q.y-14,'되받아쳤다!','#8ad8ff');hit=1}}\n  const e=this.add.circle(p.x+fx*34,p.y+fy*34,20,0xffffff,.55)")
rep("hurt(d,src,m){if(this.inv>0)return;", "hurt(d,src,m){if(this.wallT>0){if(m&&m.on&&!this.wallR){this.wallR=1;this.time.delayedCall(250,()=>{this.wallR=0});this.dmgM(m,d);this.dtx(m.x,m.y-18,'방벽 반사 '+Math.round(d),'#9fd8ff')}return}if(this.inv>0)return;")
rep(".concat(this.rgT||[],[this.rgL,this.rwNm])", ".concat(this.rgT||[],[this.rgL,this.rwNm,this.skG,this.skT,this.mqT])")
rep("'공허를 걷는 자의 칼날':'바닥에",
    "'카직스의 매복':'카직스가 덤불 속에서 사라지면 곧 덮친다 — 붉은 선이 깔리면 옆으로 비킬 것','렉사이의 땅굴 줄기':'붉은 원이 줄지어 생기면 줄에서 옆으로 비킬 것','각성한 렉사이의 솟구치기':'발밑에 큰 붉은 원이 생기면 원 밖으로 — 둔덕이 다가오는 쪽을 볼 것','각성한 렉사이의 물기':'솟아오른 렉사이 앞의 붉은 부채꼴을 피할 것',"
    "'여왕의 산호 가시':'날아오는 가시를 마주 보고 물면 되받아친다 — 결정 갑옷을 깨는 유일한 방법','산호 감옥':'산호 고리가 생기면 가시가 없는 틈으로 빠져나갈 것','산호 감옥의 가시':'고리의 가시를 그냥 넘으면 긁힌다 — 틈으로 나갈 것','여왕의 촉수':'여왕 앞에 긴 붉은 부채꼴이 깔리면 옆으로','결정 비':'붉은 원 밖으로 — 계속 움직일 것',"
    "'각성한 감시자의 광선':'광선 여러 줄이 방을 쓴다 — 등불 기둥 뒤에 숨거나 광선 사이로 빠질 것','각성한 감시자의 집중 광선':'붉은 선이 깜빡이면 옆으로 비킬 것','감시자의 갑주 가시':'감시자 곁에 오래 붙어 있으면 갑주 가시가 솟는다 — 큰 붉은 원이 보이면 물러날 것','눈부신 섬광':'화면이 밝아지면 등불 기둥 뒤 어두운 그림자로 숨을 것',"
    "'공허를 걷는 자의 칼날':'바닥에")
# 진화 나무: 3단계 옆 ★, 설명
rep("  g.fillStyle(0x241c38,1).fillCircle(cx,cy,20);g.lineStyle(2,0xc98bff,1).strokeCircle(cx,cy,20);",
    "  for(const k of LK){const[x,y]=this.treePos(k,2),q=this.mq&&this.mq.k==k?this.mq.st:null,dn=this.skl==k;T(x+(k=='v'?-17:17),y-13,'★',{fontSize:'13px',fontStyle:'bold',color:dn?'#ffe066':q=='open'?'#ff9af4':'#5a4e72'})}\n"
    "  T(782,50,'★ 분화 3단계 → 특수 퀘스트(중간 보스) → 특수 스킬'+(this.skl?'\\n보유 특수 스킬: 「'+MBQ[this.skl].s+'」':this.mq&&this.mq.st=='open'?'\\n진행 중: 「'+MBQ[this.mq.k].q+'」 — 둥지의 균열':''),{fontSize:'10px',color:'#ffe9a8',align:'right',lineSpacing:2},1,0);\n"
    "  g.fillStyle(0x241c38,1).fillCircle(cx,cy,20);g.lineStyle(2,0xc98bff,1).strokeCircle(cx,cy,20);")
rep("a=LN[k]+' '+(j+1)+'단계 · '+ND[k][j][0];", "a=LN[k]+' '+(j+1)+'단계 · '+ND[k][j][0]+(j==2?'      ★ 특수 퀘스트 「'+MBQ[k].q+'」 → 특수 스킬 「'+MBQ[k].s+'」':'');")
M = open(sys.argv[2] if len(sys.argv) > 2 else 'dev/v29/v29_methods.js', encoding='utf-8').read().rstrip('\n') + '\n'
rep('\n end(a,b,c,tip){', '\n' + M + ' end(a,b,c,tip){')
open(P, 'w', encoding='utf-8').write(s)
print('ok', len(s))
