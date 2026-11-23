#!/usr/bin/env python3
"""v115 -> v116: 분위기 개편 — 일반 몬스터·먹이·나무·이끼·바위를 중간 보스(정동 집게왕·관찰자)와 같은 결정 갑각 그림으로
그림: dev/v116/img/*.png (tools/v116_sdf/mon.py · env.py 로 렌더, 정동 집게왕과 같은 SDF 렌더러 tools/boss_sdf)
사용: python3 dev/v116/v116_patch.py index.html"""
import sys, os, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v115</title>', '<title>공허 기생충 v116</title>')
rep("window.VP_VER='v115';", "window.VP_VER='v116';")
KEYS = ['kha','rek','mound','gna','gnac','vdl','lmpH','lmpS','spn','qn','wd','f_s','f_l','f_c',
        'tree0','tree1','wtree','moss','mush','peb0','peb1']
d = {k: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(H, 'img', k + '.png'), 'rb').read()).decode() for k in KEYS}
js = 'const V116I={' + ','.join(f"{k}:'{v}'" for k, v in d.items()) + '};window.__v116Im={};for(const k in V116I){const im=new Image();im.src=V116I[k];__v116Im[k]=im}\n'
js += ("function v116Tex(s){const L=window.__v116Im||{};for(const k in L){const im=L[k];if(!im.complete||!im.naturalWidth)continue;"
       "if(!s.textures.exists(k)||s.textures.get(k).__v116)continue;s.textures.remove(k);"
       "const t=s.textures.addImage(k,im);t.setFilter(Phaser.Textures.FilterMode.NEAREST);t.__v116=1}}\n")
rep("__gdkIm={};for(const k in GDKI){const im=new Image();im.src=GDKI[k];__gdkIm[k]=im}",
    "__gdkIm={};for(const k in GDKI){const im=new Image();im.src=GDKI[k];__gdkIm[k]=im}\n" + js)
rep("if(!this.textures.exists('walk')){makeAll(this);", "if(!this.textures.exists('walk')){makeAll(this);v116Tex(this);")
rep("vtxTex(){if(this.textures.exists('vtx'))return;", "vtxTex(){if(this.textures.exists('vtx'))return;this.vtxTex0();v116Tex(this)}\n vtxTex0(){")
# 그림이 다 풀린 뒤 게임 시작 (못 풀려도 1.5초 뒤엔 시작 — 옛 그림으로)
rep("window.GAME=new Phaser.Game(", "window.__vpBoot=()=>{if(window.GAME)return;window.GAME=new Phaser.Game(")
rep("scene:G});", "scene:G})};{const L=Object.values(window.__v116Im||{});Promise.race([Promise.all(L.map(i=>i.decode?i.decode().catch(()=>0):0)),new Promise(r=>setTimeout(r,1500))]).then(()=>__vpBoot())}")
# 바위: 공허 흑요석 색 + 결정 (보스 방과 같은 보라·청록)
rep("const B=v?{ol:'#1a1426',base:'#5f5270',hi:'#8a7a9c',face:'#3c3149',fd:'#2c2338',spk:'#4d4260'}:{ol:'#16122a',base:'#575478',hi:'#7f7aa6',face:'#363352',fd:'#272440',spk:'#47436a'};",
    "const B=v?{ol:'#0a0812',base:'#2c2440',hi:'#4c4068',face:'#1c1630',fd:'#130f22',spk:'#3c3058'}:{ol:'#080814',base:'#262442',hi:'#423e6c',face:'#181632',fd:'#100e24',spk:'#34305c'};")
rep("x.fillStyle='#2f6aa0';x.fillRect(hx,by-hh,2,hh);x.fillStyle='#9fd8ff'", "x.fillStyle=k%2?'#3c2478':'#22446e';x.fillRect(hx,by-hh,2,hh);x.fillStyle=k%2?'#8466c8':'#5a8cb8'")
rep("x.fillStyle='#a49bc4';x.fillRect(o.x-o.rx*.45|0", "x.fillStyle='#6a5e96';x.fillRect(o.x-o.rx*.45|0")
rep("if(cells.length>1&&Math.random()<.5){", "if(cells.length>1&&Math.random()<.8){")
# 독 늪: 형광 연두 → 어둡고 탁한 독 (공허 색조에 맞춤, 독인 건 그대로 보이게)
rep("let c=ed?'#14300c':Dp(wx,wy)?'#2a6a16':lip?'#6fcf3a':'#45a024';if(!ed&&Math.random()<.03)c='#b6ff7a'", "let c=ed?'#08140c':Dp(wx,wy)?'#123220':lip?'#3e8a46':'#205a30';if(!ed&&Math.random()<.04)c='#8ae6a0'")
rep("disc(x,bx,by,1.4,'#8fe05a');x.fillStyle='#e0ffc0'", "disc(x,bx,by,1.4,'#4aa060');x.fillStyle='#c0ffd0'")
# 방 바닥 색조: 따뜻한 색 → 보스 방처럼 차갑고 어둡게
for a,b in [("haven:['둥지',0xffe9a0]","haven:['둥지',0xd0c4e8]"),("brood:['번식지',0xff9ec0]","brood:['번식지',0xd0a8dc]"),("mine:['광맥 동굴',0xb4b4c8]","mine:['광맥 동굴',0xa0b0d8]"),
            ("swamp:['독 늪',0x8fe070]","swamp:['독 늪',0x90b8a8]"),("lair:['포식자 둥지',0xff7a6a]","lair:['포식자 둥지',0xd890b0]"),("coral:['공허 산호 숲',0xff8a70]","coral:['공허 산호 숲',0xd898c0]"),("watch:['심연의 감시탑',0x78c8d8]","watch:['심연의 감시탑',0x88b8d8]")]:
    rep(a,b)
# 큰 결정 기둥 밑 빛: 분홍 → 보라
rep("this.add.image((ac+1)*T,(ar+2)*T-12,'wglow').setDepth(.8).setAlpha(.75).setScale(1.5)", "this.add.image((ac+1)*T,(ar+2)*T-12,'wglow').setDepth(.8).setAlpha(.6).setScale(1.5).setTint(0x8a70ff)")
# 분위기
rep("  this.mqRift(a);", "  this.v116Amb(a);this.mqRift(a);")
M = open(os.path.join(H, 'v116_methods.js'), encoding='utf-8').read().rstrip('\n')
rep("\n hud(){\n", "\n" + M + "\n hud(){\n")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
