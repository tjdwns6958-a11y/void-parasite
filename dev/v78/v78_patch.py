#!/usr/bin/env python3
"""v77 -> v78: 코드 (임시) — 일시정지 → '코드' 단추 → 포식·갑각·공허 단계(0~3)와 레벨을 클릭으로 고르고 보스를 누르면 바로 그 보스와 싸운다
본체: dev/v78/v78_methods.js · 사용: python3 dev/v78/v78_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v78_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v77</title>', '<title>공허 기생충 v78</title>')
rep("window.VP_VER='v77';", "window.VP_VER='v78';")
# 일시정지 화면 왼쪽 위에 '코드' 단추
rep("o.push(b1,b2,b3,this.fsBtn(782,14,301));",
    "const b4=this.add.text(18,14,'⌨ 코드',ST({fontSize:'13px',fontStyle:'bold',color:'#ffe9a8',backgroundColor:'#2a2342',padding:{x:10,y:6}})).setOrigin(0,0).setDepth(301).setInteractive().on('pointerdown',()=>this.codeOpen());o.push(b1,b2,b3,b4,this.fsBtn(782,14,301));")
rep("this.pzo=null;this.hpO=null}}", "this.pzo=null;this.hpO=null;this.cdO=null}}")
# 다시 시작할 때 코드 요청이 있으면 이어하기·시작 슬라이드 대신 바로 보스로
rep("if(!window.__vpNoTree)this.time.delayedCall(30,()=>{const sv=this.loadSave();",
    "if(window.__vpCodeQ){const q=window.__vpCodeQ;window.__vpCodeQ=null;this.time.delayedCall(30,()=>this.codeRun(q))}else if(!window.__vpNoTree)this.time.delayedCall(30,()=>{const sv=this.loadSave();")
rep("this.recSaved=0;", "this.recSaved=0;this.codeR=0;this.cdO=null;")
# 코드 플레이는 이어하기·지난 기록에 남기지 않는다
rep("saveG(){if(this.over||window.__vpNoSave||this.rsO)return;", "saveG(){if(this.over||window.__vpNoSave||this.rsO||this.codeR)return;")
rep("if(!this.recSaved){this.recSaved=1;", "if(!this.recSaved&&!this.codeR){this.recSaved=1;")
a = " helpClose(){"
if s.count(a) != 1: raise SystemExit('anchor helpClose')
s = s.replace(a, M + '\n' + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
