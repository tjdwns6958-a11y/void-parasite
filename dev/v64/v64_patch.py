#!/usr/bin/env python3
"""v63 -> v64: 포식 3단계 = D 붉은 목구멍 + F 삼킨 것이 비치는 몸 · 공명 갑각 결정 약 25% 작게 · 갑각 단계마다 이동 속도 −4%
사용: python3 dev/v64/v64_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v63</title>', '<title>공허 기생충 v64</title>')
rep("window.VP_VER='v63';", "window.VP_VER='v64';")
# --- 포식 3단계 머리 그림(진화 창·나무·슬라이드용 wh_): 얼굴을 가리던 검은 쐐기 → 앞쪽만 열린 분홍 목구멍 + 흰 이빨 (D)
rep("if(L.p>=3&&!nj){for(let a=0;a<=r+1;a++){const w=(r+1-a)*.75;for(let b=-w;b<=w;b++)px(x,c+a,c+b,'#1a0414')}for(let a=1;a<=r;a+=2){const w=(r+1-a)*.75;px(x,c+a,c-w,'#fff');px(x,c+a,c+w,'#fff')}}",
    "if(L.p>=3&&!nj){for(let a=0;a<=r+1;a+=.5){const w=Math.max(0,(a-r*.35))*.75;for(let b=-w;b<=w;b+=.5)px(x,c+a,c+b,Math.abs(b)>w-.8?'#ffb0c8':(Math.abs(b)<.6?'#8a1a40':'#d8406e'))}for(let a=Math.ceil(r*.45);a<=r;a+=2){const w=(a-r*.35)*.75;px(x,c+a,c-w,'#fff');px(x,c+a,c+w,'#fff')}}")
# --- 게임 안 포식 3단계 입(pjU): 같은 분홍 목구멍이 물 때 벌어졌다 닫힘
rep("if(L.p>=3){const w0=(r+1)*.75*(.3+.7*op),T=W(r+1+op*1.5,0),A=W(0,-w0),B=W(0,w0);g.fillStyle(0x1a0414,al).fillTriangle(A.x,A.y,B.x,B.y,T.x,T.y);\n   for(let k=1;k<=r;k+=2){const w=w0*(1-k/(r+1+op*1.5));for(const sg of[-1,1]){const p=W(k,sg*w);g.fillStyle(0xffffff,al).fillRect(p.x-u*.5,p.y-u*.5,u,u)}}}",
    "if(L.p>=3){const x0=r*.35,xf=r+1+op*1.2,wf=(xf-x0)*.75*(.35+.65*op),A=W(x0,0),B=W(xf,-wf),C2=W(xf,wf);g.fillStyle(0xffb0c8,al).fillTriangle(A.x,A.y,B.x,B.y,C2.x,C2.y);\n"
    "   const A2=W(x0+.8,0),B2=W(xf-.3,-wf*.72),C3=W(xf-.3,wf*.72);g.fillStyle(0xd8406e,al).fillTriangle(A2.x,A2.y,B2.x,B2.y,C3.x,C3.y);const m1=W(x0+1.2,0),m2=W(xf-.6,0);g.lineStyle(u*.9,0x8a1a40,al).lineBetween(m1.x,m1.y,m2.x,m2.y);\n"
    "   for(let a=x0+1.5;a<=xf;a+=1.8){const w=wf*(a-x0)/(xf-x0);for(const sg of[-1,1]){const p=W(a,sg*w);g.fillStyle(0xffffff,al).fillRect(p.x-u*.5,p.y-u*.5,u,u)}}}")
# --- 포식 3단계 마디: 통째 삼킨 것(결정·벌레·뼈·공허)이 비침 + 윗면 광택 (F)
rep("if(L.v>=2)disc(x,c,c,1.1",
    "if(L.p>=3){disc(x,c,c+.3,r-1.1,'#3a0a30');[()=>{px(x,c-1,c,'#8fc4ee');px(x,c,c-1,'#bfeaff');px(x,c+1,c,'#8fc4ee');px(x,c,c+1,'#5a7ab0')},()=>{px(x,c-1,c,'#e8b0c4');px(x,c,c,'#e8b0c4');px(x,c+1,c,'#e8b0c4');px(x,c-1,c-1,'#c8889c');px(x,c+1,c+1,'#c8889c')},()=>{ln(x,c-1,c+1,c+1,c-1,'#f0e6d8')},()=>{px(x,c,c,'#c070ff')}][i]();for(let a=Math.PI*1.15;a<Math.PI*1.6;a+=.2)px(x,c+Math.cos(a)*(r-.5),c+Math.sin(a)*(r-.5),'#ffd0e0')}"
    "if(L.v>=2)disc(x,c,c,1.1")
# --- 공명 갑각(3단계) 결정 약 25% 작게 (움직일 때 덜 거슬리게)
rep("skCry(px,x,c-2,c-r+1,-1.97,t>=3?5:3,t>=3?1.6:1.2);if(t>=2){skCry(px,x,c-2,c+r-1,1.97,t>=3?4.5:3,1.2);", "skCry(px,x,c-2,c-r+1,-1.97,t>=3?3.8:3,t>=3?1.3:1.2);if(t>=2){skCry(px,x,c-2,c+r-1,1.97,t>=3?3.4:3,t>=3?1.05:1.2);")
rep("if(t>=3){skCry(px,x,c-4,c-r+2,-2.4,3.5,1.1);skCry(px,x,c+.5,c+r-1,1.6,2.5,1);", "if(t>=3){skCry(px,x,c-4,c-r+2,-2.4,2.6,.9);skCry(px,x,c+.5,c+r-1,1.6,1.9,.8);")
rep("if(t>=3){skCry(px,x,c-.5,c-r+.6,-1.75,3-i*.35,1.1);if(i<2)skCry(px,x,c,c+r-.6,1.75,2-i*.4,.8)}", "if(t>=3){skCry(px,x,c-.5,c-r+.6,-1.75,2.3-i*.3,.9);if(i<2)skCry(px,x,c,c+r-.6,1.75,1.5-i*.3,.7)}")
# --- 갑각 단계마다 기본 이동 속도 −4% (방어 계열)
rep("this.spd=3*(1+.015*v)", "this.spd=3*(1+.015*v)*(1-.04*(L.c||0))")
rep("['결정 비늘','받는 피해 −10% · 맞으면 받은 피해의 40%를 공격자에게 반사", "['결정 비늘','받는 피해 −10% · 맞으면 받은 피해의 40%를 공격자에게 반사 · 갑각 단계마다 이동 −4%")
rep("c:['방어 ▲','반사','부활']", "c:['방어 ▲','반사','이동 ▼']")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
