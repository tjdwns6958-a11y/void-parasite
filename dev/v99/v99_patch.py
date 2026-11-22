#!/usr/bin/env python3
"""v98 -> v99: HUD 정리 (A+B 섞기)
- 왼쪽 위: 작은 'Lv' · 얇은 체력 막대 한 줄 · 작은 숫자 (패널 높이 44 → 22) · 일시정지 단추도 작게 그 줄 끝으로 (방 이름 띠와 안 겹치게 x 228 앞에서 끝)
- 퀘스트: 평소엔 작은 단추 하나 (지금 목표 한 줄 + 얇은 진행선) · 누르면 세 계통 모두 펼침 · 다시 누르거나 9초 뒤 접힘
- 몸 위 작은 체력: 맞은 뒤 2.5초 / 체력 35% 미만일 때만 · 방금 깎인 양은 흰 잔상
- 바닥 경험치 막대의 'Lv' 글자는 위와 겹쳐서 숨김
본체: dev/v99/v99_methods.js · 사용: python3 dev/v99/v99_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v99_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v98</title>', '<title>공허 기생충 v99</title>')
rep("window.VP_VER='v98';", "window.VP_VER='v99';")
# 왼쪽 위 패널: 얇은 한 줄
rep("this.pnL=this.add.graphics().fillStyle(0x0d0818,.6).fillRoundedRect(8,6,232,44,8).setDepth(49);",
    "this.pnL=this.add.graphics().fillStyle(0x0d0818,.5).fillRoundedRect(8,6,220,20,6).setDepth(49);")
rep("this.t1=this.add.text(16,10,'',ST({fontSize:'13px'})).setDepth(60);",
    "this.t1=this.add.text(15,16,'',ST({fontSize:'10px',fontStyle:'bold'})).setOrigin(0,.5).setDepth(60);this.tHp=this.add.text(146,16,'',ST({fontSize:'10px'})).setOrigin(0,.5).setDepth(60);")
rep("GL.fillStyle(0x3a2f57).fillRoundedRect(16,30,200,12,6);",
    "GL.fillStyle(0x3a2f57).fillRoundedRect(44,13,96,6,3);{const gr=this.enG=this.enG==null||this.enG<this.en?this.en:this.enG-Math.max(.15,(this.enG-this.en)*.05);if(gr>this.en)GL.fillStyle(0xffffff,.5).fillRect(44,13,96*Math.min(1,gr/this.emax),6)}")
rep("GL.fillStyle(lo?(pu>.5?0xff3a5a:0xd94f8c):0xd94f8c).fillRoundedRect(16,30,Math.max(0,200*this.en/this.emax),12,6);this.t1.setColor(lo?'#ff8a9a':'#ece6f7');",
    "GL.fillStyle(lo?(pu>.5?0xff3a5a:0xd94f8c):0xd94f8c).fillRect(44,13,Math.max(0,96*Math.min(1,this.en/this.emax)),6);this.t1.setColor(lo?'#ff8a9a':'#ece6f7');if(this.tHp)this.tHp.setColor(lo?'#ff8a9a':'#c9c0de');")
rep("this.t1.setText('Lv.'+this.plv+'   체력 '+Math.ceil(this.en)+' / '+this.emax+(this.lin.c>=3&&!this.rvU?'   ✦부활 1':''));",
    "{const a='Lv.'+this.plv,b=Math.ceil(this.en)+'/'+this.emax+(this.lin.c>=3&&!this.rvU?' ✦':'');if(this.t1.text!==a)this.t1.setText(a);if(this.tHp&&this.tHp.text!==b)this.tHp.setText(b)}")
# 일시정지 단추: 한 줄 끝에 작게
rep("g.fillStyle(0x0d0818,.6*pa).fillCircle(264,30,17);g.lineStyle(1.5,0x6b5a96,pa).strokeCircle(264,30,17);g.fillStyle(0xece6f7,pa).fillRect(258,23,4,14).fillRect(266,23,4,14)",
    "g.fillStyle(0x2a2342,.9*pa).fillCircle(215,16,8);g.fillStyle(0xece6f7,pa).fillRect(211.5,12,2.5,8).fillRect(216,12,2.5,8)")
rep("Phaser.Math.Distance.Between(p.x,p.y,264,30)<24", "Phaser.Math.Distance.Between(p.x,p.y,215,16)<20")
# 몸 위 체력
rep("  this.xpDraw(g);\n", "  this.xpDraw(g);this.bodyHp(g);\n")
# 가림 투명화 영역 · 알파 대상
rep("const tl=occ(8,6,240,54+(this.lqH||70))?.22:1", "const tl=(occ(8,6,228,26)||occ(8,30,8+(this.lqW||110),30+(this.lqH||20)))?.22:1")
rep("this.t1.setAlpha(this.hA.L);", "this.t1.setAlpha(this.hA.L);if(this.tHp)this.tHp.setAlpha(this.hA.L);")
rep("hudVis(v){[this.gfx,this.gL,this.gR,this.pnL,this.pnR,this.t1,this.t2,", "hudVis(v){[this.gfx,this.gL,this.gR,this.pnL,this.pnR,this.t1,this.tHp,this.t2,")
# 바닥 경험치 막대의 Lv 글자 숨김 (위와 중복)
rep("this.xpT.setVisible(vis);this.xpL.setVisible(vis)}", "this.xpT.setVisible(vis);this.xpL.setVisible(false)}", 2)
# lqDraw·lqTap 옛 정의(2700줄대)보다 뒤에 와야 하므로 hud() 바로 앞에 넣음
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
