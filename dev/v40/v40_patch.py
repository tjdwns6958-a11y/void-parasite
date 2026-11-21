#!/usr/bin/env python3
"""v39 -> v40: 글자 깨짐 수정 — 고해상도 렌더링.
게임 판 크기는 그대로 800x360(논리 좌표)이지만, 실제 그리는 캔버스를 화면 픽셀 밀도에 맞춰 VZ배(1~3)로 키우고
카메라를 VZ배 확대해 같은 장면을 그린다. 글자 해상도도 VZ에 맞춘다. 터치 좌표는 VZ로 나눠 논리 좌표로 바꾼다.
사용: python3 dev/v40/v40_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v39</title>', '<title>공허 기생충 v40</title>')
rep("window.VP_VER='v39';", "window.VP_VER='v40';\n// 렌더링 배율: 화면의 실제 픽셀 수에 맞춰 캔버스를 키운다 (0.5 단위, 1~3). 테스트에서 window.__vpZ로 고정 가능\nwindow.VZ=window.__vpZ||Math.max(1,Math.min(3,Math.ceil(Math.max(screen.width,screen.height,innerWidth,innerHeight)*(window.devicePixelRatio||1)/800*2)/2));")
# 글자 해상도
rep("const ST=o=>Object.assign({fontFamily:FF,resolution:2,", "const ST=o=>Object.assign({fontFamily:FF,resolution:Math.max(2,VZ),")
# 캔버스 크기 = 논리 크기 x VZ
rep("new Phaser.Game({type:Phaser.AUTO,parent:'game',width:C.W,height:C.H,", "new Phaser.Game({type:Phaser.AUTO,parent:'game',width:C.W*VZ,height:C.H*VZ,")
# 느린 기기 안전장치: 게임 속도가 프레임 수에 묶여 있으므로, fps가 4초 연속 42 아래면 배율을 0.5씩 낮춘다 (최저 1 = v39와 같은 화질)
rep("scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:G});", "scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:G});\nsetInterval(()=>{try{const g=window.GAME;if(!g||document.hidden||window.__vpZ||VZ<=1||!g.loop.running)return;window.__vpLowN=g.loop.actualFps<42?(window.__vpLowN||0)+1:0;if(window.__vpLowN<4)return;window.__vpLowN=0;\n const z=Math.max(1,VZ-.5);window.VZ=z;g.scale.resize(C.W*z,C.H*z);for(const s of g.scene.scenes)if(s.cameras&&s.cameras.main)s.cameras.main.setSize(C.W*z,C.H*z).setZoom(z).centerOn(C.W/2,C.H/2);console.log('[vp] 렌더링 배율 낮춤 →',z)}catch(e){}},1000);")
# 카메라: VZ배 확대, 논리 화면(0~800, 0~360)이 캔버스 전체에 맞게
rep(" create(){\n", " create(){\n  this.cameras.main.setZoom(VZ).centerOn(C.W/2,C.H/2);\n")
# 터치 좌표 → 논리 좌표
rep("this.input.on('pointerdown',p=>{if(this.over||this.rsO)return;", "this.input.on('pointerdown',P=>{const p={x:P.x/VZ,y:P.y/VZ};if(this.over||this.rsO)return;")
rep("{this.eat=p;this.req=1}else if(p.x<420&&(!this.joy||!this.joy.isDown)){this.joy=p;", "{this.eat=P;this.req=1}else if(p.x<420&&(!this.joy||!this.joy.isDown)){this.joy=P;")
rep("const vx=this.joy.x-jo.x,vy=this.joy.y-jo.y,", "const vx=this.joy.x/VZ-jo.x,vy=this.joy.y/VZ-jo.y,")
rep("  const J=this.joy;\n  if(J&&J.isDown){const o=this.jo||(this.jo={x:J.x,y:J.y});", "  const J0=this.joy,J=J0&&{x:J0.x/VZ,y:J0.y/VZ,isDown:J0.isDown};\n  if(J&&J.isDown){const o=this.jo||(this.jo={x:J.x,y:J.y});")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
