#!/usr/bin/env python3
"""v119 -> v120: 보스 디자인 B(공허 침식) — 허기의 왕관(턱·구멍 테두리) · 한 몸의 무리(여왕·무리 유충)
그림 dev/v120/img/*.png (tools/v116_sdf/boss.py B 로 렌더). 여왕 핵은 금빛 유지(게임 안내 '금빛 여왕')
사용: python3 dev/v120/v120_patch.py index.html"""
import sys, os, base64
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
H = os.path.dirname(os.path.abspath(__file__))
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v119</title>', '<title>공허 기생충 v120</title>')
rep("window.VP_VER='v119';", "window.VP_VER='v120';")
d = {k: 'data:image/png;base64,' + base64.b64encode(open(os.path.join(H, 'img', k + '_B.png'), 'rb').read()).decode() for k in ['hcrJ', 'hcrR', 'swQ']}
js = 'const V120I={' + ','.join(f"{k}:'{v}'" for k, v in d.items()) + '};window.__v120Im={};for(const k in V120I){const im=new Image();im.src=V120I[k];__v120Im[k]=im}\n'
js += ("function v120Tex(s){const L=window.__v120Im||{},ok=k=>L[k]&&L[k].complete&&L[k].naturalWidth;"
       "const mk=(key,w,h,draw)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.imageSmoothingEnabled=false;draw(x);s.textures.remove(key);const t=s.textures.addCanvas(key,c);t.setFilter(Phaser.Textures.FilterMode.NEAREST);t.__v120=1};"
       "const fresh=k=>s.textures.exists(k)&&!s.textures.get(k).__v120;"
       "if(fresh('hcrH')&&ok('hcrR')){const H=s.textures.get('hcrH').getSourceImage(),r=L.hcrR;mk('hcrH',H.width,H.height,x=>{x.drawImage(H,0,0);const w=H.width*1.06,h=w*r.height/r.width;x.drawImage(r,(H.width-w)/2,(H.height-h)/2,w,h)})}"
       "if(fresh('hcrJ')&&ok('hcrJ')){const j=L.hcrJ;mk('hcrJ',68,68,x=>{const w=68,h=w*j.height/j.width;x.drawImage(j,0,(68-h)/2,w,h)})}"
       "if(fresh('swQ')&&ok('swQ')){const q=L.swQ;mk('swQ',40,28,x=>{const w=40,h=w*q.height/q.width;x.drawImage(q,0,(28-h)/2,w,h)})}}\n")
rep("function v116Tex(s){", js + "function v116Tex(s){")
# 게임 시작 전에 그림이 풀리길 기다리는 목록에 더함
rep("{const L=Object.values(window.__v116Im||{});", "{const L=Object.values(window.__v116Im||{}).concat(Object.values(window.__v120Im||{}));")
rep("this.mbTex();this.mb30Tex();this.gdkTex();this.obsNTex();", "this.mbTex();this.mb30Tex();this.gdkTex();this.obsNTex();v120Tex(this);")
rep("swTex(){if(this.textures.exists('swQ'))return;", "swTex(){if(this.textures.exists('swQ')){v120Tex(this);return}this.swTex0();v120Tex(this)}\n swTex0(){")
# 무리 유충: 검은 공허 점 + 보라 빛 번짐, 일부는 별처럼 반짝 · 금빛 무리는 금색 끝
rep("const now=this.time.now/1000,C=[0x7ae698,0xa46ef2,0xffc860];\n  const SZ=[[3,3],[4,2],[3,3]];for(let c=0;c<3;c++){g.fillStyle(C[c],1);const[w0,h0]=SZ[c];for(const q of AP)if(q.on&&(q.cc??q.c)==c){const w=Math.sin(now*8+q.ph);g.fillRect(q.x-w0/2+w*.5,q.y-h0/2,w0,h0)}}}",
    "const now=this.time.now/1000,HL=[0xa060ff,0x8a5af0,0xe0a040],B0=[0x0c0618,0x120a24,0x2a1a08],T0=[0xb48cff,0xffffff,0xffc860];\n"
    "  for(let c=0;c<3;c++){g.fillStyle(HL[c],.72);for(const q of AP)if(q.on&&(q.cc??q.c)==c){const w=Math.sin(now*8+q.ph)*.5;g.fillRect(q.x-2.5+w,q.y-2.5,5,5)}}"
    "for(let c=0;c<3;c++){g.fillStyle(B0[c],1);for(const q of AP)if(q.on&&(q.cc??q.c)==c){const w=Math.sin(now*8+q.ph)*.5;g.fillRect(q.x-1.5+w,q.y-1.5,3,3)}}"
    "for(let c=0;c<3;c++){g.fillStyle(T0[c],1);for(const q of AP)if(q.on&&(q.cc??q.c)==c&&(c==2||Math.sin(now*3+q.ph*7)>.1)){const w=Math.sin(now*8+q.ph)*.5;g.fillRect(q.x+w,q.y-1,1,1)}}}")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P)
