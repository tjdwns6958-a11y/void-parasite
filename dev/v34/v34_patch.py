#!/usr/bin/env python3
"""v33 -> v34: 모바일 조작 U1 '떠다니는 조이스틱' (개발자 선택).
- 왼쪽 절반 아무 데나 누르면 그 자리에 작은 반투명 조이스틱이 생기고, 손을 떼면 사라진다.
- 손가락이 고리 밖으로 멀리 나가면 고리가 따라온다 (방향 전환이 끊기지 않게).
- 섭취 버튼은 작고 반투명하게, 더 구석으로. 누르는 판정은 넉넉하게 유지.
- 처음 한 번만 왼쪽 아래에 흐린 고리 + '왼쪽을 누르고 끌면 이동' 안내.
사용: python3 dev/v34/v34_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new)

rep('<title>공허 기생충 v33</title>', '<title>공허 기생충 v34</title>')
rep("window.VP_VER='v33';", "window.VP_VER='v34';")

# 조이스틱 규격 (논리 좌표)
JR, KR, KM = 40, 15, 34          # 고리 반지름 · 손잡이 반지름 · 손잡이 최대 이동
EX, EY, ER, EH = 750, 308, 32, 50  # 섭취 버튼 중심 · 반지름 · 누르는 판정 반지름

# ---- 입력: 누른 자리를 조이스틱 중심으로 ----
rep("if(Phaser.Math.Distance.Between(p.x,p.y,728,288)<60){this.eat=p;this.req=1}else if(p.x<420&&(!this.joy||!this.joy.isDown))this.joy=p});",
    f"if(Phaser.Math.Distance.Between(p.x,p.y,{EX},{EY})<{EH}){{this.eat=p;this.req=1}}else if(p.x<420&&(!this.joy||!this.joy.isDown)){{this.joy=p;this.jo={{x:Phaser.Math.Clamp(p.x,{JR+6},400),y:Phaser.Math.Clamp(p.y,{JR+6},{360-JR-6})}};window.__vpJoyUsed=1}}}});")

# ---- 이동: 중심 기준, 고리 밖으로 멀리 나가면 고리가 따라온다 ----
rep("if(J&&J.isDown){const vx=J.x-84,vy=J.y-280,l=Math.hypot(vx,vy);fr=Math.min(1,Math.max(0,(l-6)/38));if(l>0){ix=vx/l;iy=vy/l}}",
    f"if(J&&J.isDown){{const o=this.jo||(this.jo={{x:J.x,y:J.y}});let vx=J.x-o.x,vy=J.y-o.y,l=Math.hypot(vx,vy);if(l>{KM+12}){{const k=(l-{KM+12})/l;o.x+=vx*k;o.y+=vy*k;vx=J.x-o.x;vy=J.y-o.y;l={KM+12}}}fr=Math.min(1,Math.max(0,(l-5)/{KM-4}));if(l>0){{ix=vx/l;iy=vy/l}}}}")

# ---- 그리기 ----
rep("let kx=84,ky=280;const J=this.joy&&this.joy.isDown;\n  if(J){const vx=this.joy.x-84,vy=this.joy.y-280,l=Math.hypot(vx,vy)||1,m=Math.min(l,50);kx+=vx/l*m;ky+=vy/l*m}",
    f"const J=this.joy&&this.joy.isDown,jo=this.jo||{{x:0,y:0}};let kx=jo.x,ky=jo.y;\n  if(J){{const vx=this.joy.x-jo.x,vy=this.joy.y-jo.y,l=Math.hypot(vx,vy)||1,m=Math.min(l,{KM});kx+=vx/l*m;ky+=vy/l*m}}")
rep("this.bA.J+=((und(84,280,55)&&!J?.3:1)-this.bA.J)*kb;this.bA.E+=((und(728,288,46)&&!(this.eat&&this.eat.isDown)?.35:1)-this.bA.E)*kb;",
    f"this.bA.J+=((J?1:0)-this.bA.J)*.35;this.bA.E+=((und({EX},{EY},{ER})&&!(this.eat&&this.eat.isDown)?.3:1)-this.bA.E)*kb;")
rep("g.fillStyle(0x241c38,.7*this.bA.J).fillCircle(84,280,55);g.lineStyle(2,0x6b5a96,this.bA.J).strokeCircle(84,280,55);\n  g.fillStyle(0xa65cff,J?1:this.bA.J).fillCircle(kx,ky,22);\n  g.fillStyle(this.eat&&this.eat.isDown?0xc98bff:0xa65cff,this.bA.E).fillCircle(728,288,46);if(this.etx)this.etx.setAlpha(this.bA.E);",
    f"""if(this.bA.J>.02&&this.jo){{const a=this.bA.J;g.fillStyle(0x241c38,.3*a).fillCircle(jo.x,jo.y,{JR});g.lineStyle(1.5,0xa08cdc,.5*a).strokeCircle(jo.x,jo.y,{JR});g.fillStyle(0xa65cff,.65*a).fillCircle(kx,ky,{KR});g.lineStyle(1,0xe0c8ff,.6*a).strokeCircle(kx,ky,{KR})}}
  // 처음 한 번만: 어디를 눌러야 하는지 흐린 고리로 안내 (터치 기기)
  if(!window.__vpJoyUsed&&this.sys.game.device.input.touch&&!this.boss){{const pu=.5+.5*Math.sin(this.time.now/400);g.lineStyle(1.5,0xa08cdc,.25+.2*pu).strokeCircle(110,276,{JR});g.fillStyle(0xa65cff,.18+.12*pu).fillCircle(110,276,{KR});if(!this.jhT)this.jhT=this.add.text(110,{276-JR-12},'왼쪽을 누르고 끌면 이동',ST({{fontSize:'10px',color:'#c8b8ee'}})).setOrigin(.5).setDepth(61);this.jhT.setAlpha(.55+.3*pu)}}else if(this.jhT){{this.jhT.destroy();this.jhT=null}}
  {{const ed=this.eat&&this.eat.isDown;g.fillStyle(ed?0xc98bff:0xa65cff,(ed?.85:.42)*this.bA.E).fillCircle({EX},{EY},{ER});g.lineStyle(1.5,0xd8b8ff,.6*this.bA.E).strokeCircle({EX},{EY},{ER});if(this.etx)this.etx.setAlpha((ed?1:.75)*this.bA.E)}}""")
rep("this.etx=this.add.text(728,288,'섭취',ST({fontSize:'16px',color:'#12091f',fontStyle:'bold'}))",
    f"this.etx=this.add.text({EX},{EY},'섭취',ST({{fontSize:'12px',color:'#ffffff',fontStyle:'bold'}}))")

open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
