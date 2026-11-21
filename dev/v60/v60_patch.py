#!/usr/bin/env python3
"""v59 -> v60: 진화 나무 인포그래픽(T3 + 네모 썸네일 + 특수 스킬 카드) · 시작할 때 계통 기초 슬라이드 2장 · 일시정지 '게임 설명'
본체: dev/v60/v60_methods.js (treeOpen~treeClose 교체) · 사용: python3 dev/v60/v60_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v60_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v59</title>', '<title>공허 기생충 v60</title>')
rep("window.VP_VER='v59';", "window.VP_VER='v60';")
# 처음 시작: 진화 나무 대신 계통 기초 슬라이드
rep("const sv=this.loadSave();if(sv)this.resumeAsk(sv);else this.treeOpen(1)})", "const sv=this.loadSave();if(sv)this.resumeAsk(sv);else this.bsOpen(1)})")
rep("this.rsClose();this.clearSave();this.treeOpen(1)})", "this.rsClose();this.clearSave();this.bsOpen(1)})")
# 입력: 슬라이드가 열려 있으면 슬라이드로
rep("if(this.treeO){this.treeTap(p.x,p.y);return}if(this.paused)return;", "if(this.bsO){this.bsTap(p.x,p.y);return}if(this.treeO){this.treeTap(p.x,p.y);return}if(this.paused)return;")
rep("this.input.on('pointerup',p=>{", "this.input.on('pointerup',p=>{if(this.bsO)this.bsUp(p);")
rep("this.input.keyboard.on('keydown-ENTER',()=>{if(this.treeO)this.treeClose()", "this.input.keyboard.on('keydown-ENTER',()=>{if(this.bsO){this.bsGo(1);return}if(this.treeO)this.treeClose()")
# 일시정지: 슬라이드 중엔 안 열림 · 단추 셋(계속하기 / 처음부터 / 게임 설명)
rep("pz(){if(this.over||this.molt||this.tr||this.treeO||this.cine)return;", "pz(){if(this.over||this.molt||this.tr||this.treeO||this.cine||this.bsO)return;")
rep("const b1=this.add.text(320,140,'계속하기'", "const b1=this.add.text(240,140,'계속하기'")
rep("const b2=this.add.text(480,140,'처음부터'", "const b2=this.add.text(400,140,'처음부터'")
rep("o.push(b1,b2,this.fsBtn(782,14,301));", "const b3=this.add.text(560,140,'게임 설명 ?',ST({fontSize:'17px',color:'#12091f',fontStyle:'bold',backgroundColor:'#7be0a8',padding:{x:22,y:11}})).setOrigin(.5).setDepth(301).setInteractive().on('pointerdown',()=>this.helpOpen());o.push(b1,b2,b3,this.fsBtn(782,14,301));")
rep("(this.pzo||[]).forEach(x=>x.destroy());this.pzo=null}}", "(this.pzo||[]).forEach(x=>x.destroy());this.pzo=null;this.hpO=null}}")
# 진화 나무 교체 (treeOpen ~ treeClose) + 새 함수들
a = " treeOpen(st){if(this.treeO"; b = " // ===== 보스: 공허를 걷는 자 ====="
if s.count(a) != 1 or s.count(b) != 1: raise SystemExit('tree block')
i = s.index(a); j = s.index(b, i); s = s[:i] + M + '\n' + s[j:]
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
