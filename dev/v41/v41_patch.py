#!/usr/bin/env python3
"""v40 -> v41: 전체 화면 버튼 (화면 크기 시안 Z1).
일시정지 창과 진화 나무(시작 설명서) 오른쪽 위에 '⛶ 전체 화면' 버튼. 손을 뗄 때(pointerup) 켠다 — 폰 브라우저는
터치를 뗄 때만 전체 화면을 허락하기 때문. 안드로이드는 켜면서 가로 고정을 시도. 전체 화면을 쓸 수 없는 곳
(아이폰 사파리, 전체 화면을 막는 앱 미리보기 창)에서는 안내 글을 띄운다.
사용: python3 dev/v41/v41_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v40</title>', '<title>공허 기생충 v41</title>')
rep("window.VP_VER='v40';", """window.VP_VER='v41';
// 전체 화면 (v41)
window.vpFS={ok(){return !!(document.fullscreenEnabled||document.webkitFullscreenEnabled)},on(){return !!(document.fullscreenElement||document.webkitFullscreenElement)},
 toggle(){try{if(this.on()){const f=document.exitFullscreen||document.webkitExitFullscreen;f&&f.call(document);return true}if(!this.ok())return false;const e=document.documentElement,f=e.requestFullscreen||e.webkitRequestFullscreen;const r=f.call(e,{navigationUI:'hide'});
  const lock=()=>{try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{})}catch(_){}};if(r&&r.then)r.then(lock).catch(()=>{});else lock();return true}catch(_){return false}}};""")
# 버튼 만들기 · 누르기 (장면 메서드)
rep("\n end(a,b,c,tip){", """
 fsBtn(x,y,dp){const lb=()=>vpFS.on()?'전체 화면 끄기':'⛶ 전체 화면';const b=this.add.text(x,y,lb(),ST({fontSize:'13px',fontStyle:'bold',color:'#ece6f7',backgroundColor:'#2a2342',padding:{x:10,y:6}})).setOrigin(1,0).setDepth(dp).setInteractive();
  b.on('pointerup',()=>{const was=vpFS.on();if(vpFS.toggle()){setTimeout(()=>{if(b.scene)b.setText(vpFS.on()?'전체 화면 끄기':'⛶ 전체 화면')},400);if(!was)setTimeout(()=>{if(b.scene&&!vpFS.on())this.fsMsg(b)},700)}else this.fsMsg(b)});return b}
 fsMsg(b){if(b.msg&&b.msg.scene)return;const t=this.add.text(782,b.y+b.height+6,'이 화면에서는 전체 화면을 쓸 수 없어요\\n링크를 크롬·사파리 같은 브라우저에서 열어 주세요\\n(아이폰: 사파리 공유 → 홈 화면에 추가)',ST({fontSize:'11px',color:'#ffe9a8',backgroundColor:'#1a1428',padding:{x:8,y:6},align:'right',lineSpacing:3})).setOrigin(1,0).setDepth(b.depth+1);
  b.msg=t;(this.pzo||this.treeO||[]).push(t);setTimeout(()=>{if(t.scene)t.destroy()},5000)}
 end(a,b,c,tip){""")
# 일시정지 창
rep("o.push(b1,b2);", "o.push(b1,b2,this.fsBtn(782,14,301));")
# 진화 나무(시작 설명서): 닫기/시작 버튼 왼쪽
rep("  O.g=A(this.add.graphics().setDepth(321));this.treeDraw()}", "  {const cl=O[O.length-1];O.fs=A(this.fsBtn(cl.x-cl.width-8,14,321))}\n  O.g=A(this.add.graphics().setDepth(321));this.treeDraw()}")
rep("treeTap(x,y){const O=this.treeO;if(!O)return;", "treeTap(x,y){const O=this.treeO;if(!O)return;if(O.fs&&O.fs.getBounds().contains(x,y))return;")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
