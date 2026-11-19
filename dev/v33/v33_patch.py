#!/usr/bin/env python3
"""v32 -> v33 (1부): 오래 하면 꺼지는 문제 대응 · 포식 유기물 증가 · 계통 보정."""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v32</title>', '<title>공허 기생충 v33</title>')
# ---- 1) 오래 하면 꺼지는 문제 ----
# 120Hz 화면에서도 60프레임으로 묶기 (발열·배터리)
rep("new Phaser.Game({type:Phaser.AUTO,parent:'game',width:C.W,height:C.H,backgroundColor:'#120e1a',",
    "new Phaser.Game({type:Phaser.AUTO,parent:'game',width:C.W,height:C.H,backgroundColor:'#120e1a',fps:{target:60,limit:60},render:{antialias:false,powerPreference:'default'},")
# 한 프레임에서 오류가 나도 게임이 멈추지 않게
rep("\n update(t,ms){\n  if(this.over||this.paused)return;",
    "\n update(t,ms){try{this.upd(t,ms)}catch(e){this.errN=(this.errN||0)+1;if(this.errN<5)console.error(e)}}\n upd(t,ms){\n  if(this.over||this.paused)return;")
# 장식 목록 정리 · 입자 과다 방지 · 자동 저장
rep("  const dt=Math.min(ms/1000,.05),p=this.pl,a=this.cur,k=this.k,L=this.lv;",
    "  const dt=Math.min(ms/1000,.05),p=this.pl,a=this.cur,k=this.k,L=this.lv;this.fxLow=this.children.list.length>520;this.hkT=(this.hkT||0)-dt;if(this.hkT<=0){this.hkT=5;this.dec=this.dec.filter(o=>o&&o.scene);this.svN=(this.svN||0)+1;if(this.svN%3==0)this.saveG()}")
import re
n0=s.count("){const b=this.add.circle(")
s=re.sub(r"if\(Math\.random\(\)<([\d.]+)\)\{const b=this\.add\.circle\(", r"if(!this.fxLow&&Math.random()<\1){const b=this.add.circle(", s)
# 덤불 그림 열쇠가 구역마다 겹치던 문제 + 지난 구역 그림 비우기
rep("const key='bm'+a.r+'_'+a.c;", "const key='bm'+(this.zi||1)+'_'+a.r+'_'+a.c;")
rep("this.zi++;this.lv=gen(this.zi);", "const oldLv=this.lv,oldZ=this.zi||1;this.zi++;this.lv=gen(this.zi);")
rep("  this.enter(this.lv.start);\n  const ov=", "  this.enter(this.lv.start);this.freeTex(oldLv,oldZ);this.saveG();\n  const ov=")
# 저장 지우기: 끝날 때
rep("\n end(a,b,c,tip){", "\n end(a,b,c,tip){this.clearSave();")
# 시작: 저장이 있으면 이어하기를 묻는다
rep("if(!window.__vpNoTree)this.time.delayedCall(30,()=>this.treeOpen(1));", "if(!window.__vpNoTree)this.time.delayedCall(30,()=>{const sv=this.loadSave();if(sv)this.resumeAsk(sv);else this.treeOpen(1)});this.glWatch();")
rep("pointerdown',p=>{if(this.over)return;", "pointerdown',p=>{if(this.over||this.rsO)return;")
# ---- 4) 포식: 공격하는 몬스터의 유기물 증가 ----
rep("leapV:380,rest:2,e:10,o:4}", "leapV:380,rest:2,e:10,o:7}")
rep("up:2.4,v:85,e:14,o:4,m:4}", "up:2.4,v:85,e:14,o:7,m:4}")
rep("V:{fl:.6,hp:14,dmg:4,v:150,orb:70,aggro:140,e:4,o:1}", "V:{fl:.6,hp:14,dmg:4,v:150,orb:70,aggro:140,e:4,o:2}")
rep("SP:{hp:30,dmg:5,v:260,cd:2.6,e:6,o:0,m:4}", "SP:{hp:30,dmg:5,v:260,cd:2.6,e:6,o:2,m:4}")
rep("LS:{hp:16,dmg:6,v:330,cd:1.9,e:5,o:2,m:0}", "LS:{hp:16,dmg:6,v:330,cd:1.9,e:5,o:3,m:0}")
rep("QN:{hp:150,dmg:8,e:40,o:12,m:10}", "QN:{hp:150,dmg:8,e:40,o:16,m:10}")
rep("WD:{hp:170,dmg:15,e:40,o:10,m:12}", "WD:{hp:170,dmg:15,e:40,o:14,m:12}")
# ---- 1) 보정 ----
# 거울 물기: 갑각 3단계 1.05 · 공허 3단계 0.9 · 그 밖 0.75, 거울 침 0.8 → 1
rep("let dg=this.bdmg*.75;", "let dg=this.bdmg*(this.lin.c>=3?1.05:this.lin.v>=3?.9:.75);")
rep("this.dmgM(m,this.sdmg()*(q.mir?.8:1),q.mir)", "this.dmgM(m,this.sdmg(),q.mir)")
# 반사 · 결정 방벽이 거울 너머 여제에게도 닿는다
rep("kd=this.dmgM(m,rd)", "kd=m.k=='em'&&m.ph==2?this.dmgM(m,rd*.8,1):this.dmgM(m,rd)")
rep("this.dmgM(m,d);this.dtx(m.x,m.y-18,'방벽 반사 '", "if(m.k=='em'&&m.ph==2)this.dmgM(m,d*.8,1);else this.dmgM(m,d);this.dtx(m.x,m.y-18,'방벽 반사 '")
# 산호 환초: 고리 안을 더 위험하게
rep("m.bt=(m.bt??2)-dt;if(inside&&m.bt<=0&&m.st=='idle'){m.bt=2.6*en;const a=Math.atan2(p.y-m.y,p.x-m.x),L=300;if(Math.hypot(p.x-m.x,p.y-m.y)<75)",
    "m.bt=(m.bt??2)-dt;if(inside&&m.bt<=0&&m.st=='idle'){m.bt=2*en;const a=Math.atan2(p.y-m.y,p.x-m.x),L=300;if(Math.hypot(p.x-m.x,p.y-m.y)>=75&&Math.random()<.5){for(let i=0;i<3;i++)this.telAdd({k:'c',x:Phaser.Math.Clamp(p.x+(i?(Math.random()-.5)*100:0),70,730),y:Phaser.Math.Clamp(p.y+(i?(Math.random()-.5)*60:0),70,300),r:30,sy:.8,t:.85+i*.1,dmg:D(12),src:'석호의 물방울',m})}else if(Math.hypot(p.x-m.x,p.y-m.y)<75)")
rep("'가면의 들숨':'들숨이 끝날 때", "'석호의 물방울':'고리 안에서는 발밑에 물방울 원이 떨어진다 — 붉은 원 밖으로','가면의 들숨':'들숨이 끝날 때")
# 갑각 3단계: 물기 +10% (보스전이 너무 길어지던 문제)
rep("this.bdmg=(C.BITE.dmg+1.5*v)*(L.p>=1?1.25:1);", "this.bdmg=(C.BITE.dmg+1.5*v)*(L.p>=1?1.25:1)*(L.c>=3?1.1:1);")
rep("['공명 갑각','반사 40% → 75% · ", "['공명 갑각','반사 40% → 75% · 물기 피해 +10% · ")
M = r''' // ----- v33: 저장 · 이어하기 · 그래픽 끊김 대응 -----
 saveG(){if(this.over||window.__vpNoSave||this.rsO)return;try{const d={v:1,zi:this.boss?3:(this.zi||1),plv:this.plv,xp:this.xp,lin:this.lin,molts:this.molts,org:this.org,mn:this.mn,ve:this.ve,spO:this.spO,spM:this.spM,spV:this.spV,feast:this.feast,cry:this.cry,skl:this.skl||null,mq:this.mq?{k:this.mq.k,st:this.mq.st}:null,rvU:this.rvU||0,kc:this.kc||0,t:Math.round((this.time.now-this.t0)/1000),at:Date.now()};localStorage.setItem('vp_save',JSON.stringify(d))}catch(e){}}
 clearSave(){try{localStorage.removeItem('vp_save')}catch(e){}}
 loadSave(){try{const d=JSON.parse(localStorage.getItem('vp_save')||'null');return d&&d.v==1&&d.lin?d:null}catch(e){return null}}
 resumeAsk(sv){this.paused=true;this.physics.pause();const O=this.rsO=[],A=o=>{O.push(o);return o};
  A(this.add.rectangle(400,180,800,360,0x0b0716,.94).setDepth(330).setInteractive());
  A(this.add.text(400,92,'이어서 할까요?',ST({fontSize:'22px',fontStyle:'bold'})).setOrigin(.5).setDepth(331));
  const L=sv.lin,where=sv.zi>=3?'보스 앞':sv.zi+'구역 처음';
  A(this.add.text(400,130,'지난 판: Lv.'+sv.plv+' · 포식 '+L.p+' · 갑각 '+L.c+' · 공허 '+L.v+(sv.skl?' · 특수 스킬 「'+MBQ[sv.skl].s+'」':'')+'\n이어하면 '+where+'에서 다시 시작하고, 레벨·진화·재료는 그대로 남는다',ST({fontSize:'12px',color:'#c8bce0',align:'center',lineSpacing:4})).setOrigin(.5).setDepth(331));
  const bt=(x,t,col,fn)=>{const b=A(this.add.text(x,220,t,ST({fontSize:'16px',fontStyle:'bold',color:'#12091f',backgroundColor:col,padding:{x:16,y:10}})).setOrigin(.5).setDepth(332).setInteractive());b.on('pointerdown',()=>{this.time.delayedCall(10,fn)})};
  bt(290,'이어하기 ▶','#a65cff',()=>{this.rsClose();this.resume(sv)});bt(520,'새로 시작','#8a80a8',()=>{this.rsClose();this.clearSave();this.treeOpen(1)});
  this.rsK=e=>{if(!this.rsO)return;if(e.key=='Enter'){this.rsClose();this.resume(sv)}};this.input.keyboard.on('keydown',this.rsK)}
 rsClose(){if(!this.rsO)return;if(this.rsK)this.input.keyboard.off('keydown',this.rsK);this.rsO.forEach(o=>o.destroy());this.rsO=null;this.paused=false;this.physics.resume()}
 resume(sv){for(const k of['plv','xp','molts','org','mn','ve','spO','spM','spV','feast','cry','rvU','kc'])if(sv[k]!=null)this[k]=sv[k];this.lin=Object.assign({p:0,c:0,v:0},sv.lin);this.skl=sv.skl||null;this.skCd=0;this.t0=this.time.now-(sv.t||0)*1000;
  this.recalc();this.wormSkin();this.en=this.emax;if(this.hint){this.hint.destroy();this.hint=null}
  if(sv.zi>=3){this.zi=2;this.bossStart()}else if(sv.zi==2){this.zi=1;this.nextZone()}
  if(sv.mq){this.mq={k:sv.mq.k,st:sv.mq.st,room:this.boss?null:this.lv.start,x:null,y:null};if(this.mq.st=='open'&&!this.boss&&this.cur===this.lv.start)this.mqRift(this.cur)}
  this.pop('이어하기 — Lv.'+this.plv,400,150)}
 freeTex(lv,z){try{const keep=new Set();for(const a of this.lv.rooms){(a.obs||[]).forEach(o=>keep.add('rkc'+o[3]));(a.pl||[]).forEach(q=>keep.add('pl'+q.id))}
   for(const a of lv.rooms){(a.obs||[]).forEach(o=>{const k='rkc'+o[3];if(!keep.has(k)&&this.textures.exists(k))this.textures.remove(k)});(a.pl||[]).forEach(q=>{const k='pl'+q.id;if(!keep.has(k)&&this.textures.exists(k))this.textures.remove(k)});const b='bm'+z+'_'+a.r+'_'+a.c;if(this.textures.exists(b))this.textures.remove(b)}}catch(e){}}
 glWatch(){const cv=this.sys.game.canvas;if(!cv||this.glW)return;this.glW=1;let el=null;
  cv.addEventListener('webglcontextlost',()=>{if(el)return;el=document.createElement('div');el.style.cssText='position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0b0716;color:#ece6f7;font:15px sans-serif;z-index:9;text-align:center;gap:14px';
   el.innerHTML='그래픽이 잠시 끊겼어요<br><span style="font-size:12px;color:#a99fc2">다시 불러오면 저장된 곳부터 이어서 할 수 있어요</span>';const b=document.createElement('button');b.textContent='다시 불러오기';b.style.cssText='font:bold 15px sans-serif;padding:10px 18px;border:0;border-radius:8px;background:#a65cff;color:#12091f';b.onclick=()=>{this.saveG();location.reload()};el.appendChild(b);document.body.appendChild(el);this.saveG()},false);
  cv.addEventListener('webglcontextrestored',()=>{if(el){el.remove();el=null}},false)}
'''
rep('\n end(a,b,c,tip){', '\n' + M + ' end(a,b,c,tip){')
open(P, 'w', encoding='utf-8').write(s)
print('ok', len(s), 'particles', n0)
