#!/usr/bin/env python3
"""v37 -> v38: 엔딩 B 진화 기록 카드 · 최종 보스: 밀물/행성 고리+펄서 삭제, 세포 분열 무리 유지, 1페이즈 세 겹 고리.
본체: dev/v38/v38_methods.js · 사용: python3 dev/v38/v38_patch.py index.html"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(__file__), 'v38_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v37</title>', '<title>공허 기생충 v38</title>')
rep("window.VP_VER='v37';", "window.VP_VER='v38';")
# ---- 진화 기록 수집 ----
rep("this.swOn=null;this.swNm=null;", "this.swOn=null;this.swNm=null;this.rec={m:[],mb:null,food:0,swT:null};this.recSaved=0;")
rep("this.lin[k]++;this.molts++;if(this.lin[k]==3&&!this.mq)", "this.lin[k]++;this.molts++;if(this.rec)this.rec.m.push([k,ND[k][this.lin[k]-1][0],Math.round((this.time.now-this.t0)/1000)]);if(this.lin[k]==3&&!this.mq)")
rep("this.en=Math.min(this.emax,this.en+d.e);this.org+=d.o;", "if(this.rec)this.rec.food++;this.en=Math.min(this.emax,this.en+d.e);this.org+=d.o;")
rep("  this.mbRet={lv:this.lv,room:this.cur,", "  if(this.rec)this.rec.mb={nm:Q.b,t0:this.time.now,dt:null};\n  this.mbRet={lv:this.lv,room:this.cur,")
rep("mbWin(){const k=this.mbOn;if(!k||this.mbRO)return;this.mbRO=1;", "mbWin(){const k=this.mbOn;if(!k||this.mbRO)return;this.mbRO=1;if(this.rec&&this.rec.mb)this.rec.mb.dt=Math.round((this.time.now-this.rec.mb.t0)/1000);")
rep("this.swTex();if(!this.swPO){", "if(this.rec)this.rec.sw0=this.time.now;this.swTex();if(!this.swPO){")
rep("m.on=0;m.gone=1;m.st='dead';this.kc=", "m.on=0;m.gone=1;m.st='dead';if(this.rec&&this.rec.sw0)this.rec.swT=Math.round((this.time.now-this.rec.sw0)/1000);this.kc=")
rep("rvU:this.rvU||0,kc:this.kc||0,", "rvU:this.rvU||0,kc:this.kc||0,rec:this.rec?{m:this.rec.m,food:this.rec.food,mb:this.rec.mb&&this.rec.mb.dt!=null?{nm:this.rec.mb.nm,dt:this.rec.mb.dt}:null}:null,")
rep("this.lin=Object.assign({p:0,c:0,v:0},sv.lin);", "this.lin=Object.assign({p:0,c:0,v:0},sv.lin);if(sv.rec)this.rec=Object.assign({m:[],mb:null,food:0,swT:null},sv.rec);")
# ---- 엔딩 선택 → 진화 기록 카드 ----
rep("const fin=(t,body)=>{O.forEach(o=>o.destroy());this.end(t,stat,'처음부터',body)};", "const fin=(t,body)=>{O.forEach(o=>o.destroy());this.clearSave();this.recCard(t,body)};")
# ---- 보스: 밀물 · 행성 고리+펄서 삭제, 기본기 고리 → 세 겹 고리 ----
rep("if(P2&&m.hp<m.mh*.15&&!m.tided)return 'tide';\n  ", "")
rep("if(m.seq%2==1)return pick(['fist','wave','ring']);", "if(m.seq%2==1)return pick(['fist','wave','ring3']);")
rep("m.bag=P2?['hole','mitosis','orbit','palms','press','grab']:['galaxy','rain','press','grab'];if(P2&&m.tided)m.bag.push('tide');", "m.bag=P2?['hole','mitosis','palms','press','grab']:['galaxy','rain','press','grab'];")
# ---- 세포 분열 무리: 다음 패턴이 끝날 때까지 남는다 ----
rep("if(t>7.2){m.ex=0;for(const q of m.P)if(q.on){q.tx=m.x;q.ty=m.y}m.hist=[];return 1}}", "if(t>7.2){m.ex=0;this.swMcFrom(m,K);for(const q of m.P)if(q.on){q.tx=m.x;q.ty=m.y}m.hist=[];return 1}}")
rep("swExpose(m,t,food){for(const q of m.P)q.cc=undefined;", "swExpose(m,t,food){if(m.MC&&--m.mcLeft<=0)this.swMcMerge(m);for(const q of m.P)q.cc=undefined;")
rep("  if(m.st=='trans'){this.swTransU(m,dt);return}\n", "  if(m.st=='trans'){this.swTransU(m,dt);return}\n  if(m.MC)this.swMcU(m,dt,p);\n")
rep("m.rg=(m.rg||0)-dt;if(m.rg<=0){m.rg=.35;if(this.swAlive(m)<m.N)", "m.rg=(m.rg||0)-dt;if(m.rg<=0){m.rg=.35;if(this.swAlive(m)+(m.MC?m.MC.reduce((a,c)=>a+c.P.length,0):0)<m.N)")
rep("swDraw(m){const g=m.pg;g.clear();", "swDraw(m){const g=m.pg;g.clear();const AP=m.MC?m.P.concat(...m.MC.map(c=>c.P)):m.P;")
rep("for(const q of m.P)if(q.on&&(q.cc??q.c)==c){const w=Math.sin(now*8+q.ph);", "for(const q of AP)if(q.on&&(q.cc??q.c)==c){const w=Math.sin(now*8+q.ph);")
rep("swBite(fx,fy){const m=this.swOn;", "swBite(fx,fy){const m=this.swOn;if(m&&m.on&&m.MC&&this.swMcBite(m,fx,fy))return 1;")
rep("swDanger(x,y){const m=this.swOn;if(!m||!m.on)return false;try{", "swDanger(x,y){const m=this.swOn;if(!m||!m.on)return false;try{if(m.MC&&m.MC.some(c=>Math.hypot(x-c.x,y-c.y)<c.rad+18))return true;")
rep("const P=m.P.filter(q=>q.on),g=m.pg;", "const P=m.P.concat(...(m.MC||[]).map(c=>c.P)).filter(q=>q.on),g=m.pg;m.MC=null;")
# 갑각 최종 보스 보정 (세 겹 고리·남는 분열 무리로 싸움이 길어짐)
rep("return bt?(m.ex?(this.lin.c>=3?1.45:1.25):0):(m.ex?1.2:(this.lin.c>=2?1:.8))", "return bt?(m.ex?(this.lin.c>=3?1.6:1.25):0):(m.ex?1.2:(this.lin.c>=2?1.15:.8))")
rep("\n end(a,b,c,tip){", "\n" + M + "\n end(a,b,c,tip){")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
