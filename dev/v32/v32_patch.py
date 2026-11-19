#!/usr/bin/env python3
"""v31 -> v32: 갑각 3단계 '갑각 폭발 탈피' — 한 판에 1번, 쓰러지는 순간 껍질이 터지며 부활."""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v31</title>', '<title>공허 기생충 v32</title>')
rep("['공명 갑각','반사 40% → 75% · 반사로 적을 처치하면 수정 1개 회복']", "['공명 갑각','반사 40% → 75% · 반사로 적을 처치하면 수정 1개 회복 · 한 판에 1번, 쓰러지는 순간 껍질이 터지며 부활 (주변을 밀어내고 피해, 에너지 35% · 수정 3개)']")
rep("  if(this.en<=0){this.en=0;this.hud();", "  if(this.en<=0&&this.lin.c>=3&&!this.rvU)this.revive();\n  if(this.en<=0){this.en=0;this.hud();")
rep("this.t1.setText('Lv.'+this.plv+'   에너지 '+Math.ceil(this.en)+' / '+this.emax);", "this.t1.setText('Lv.'+this.plv+'   에너지 '+Math.ceil(this.en)+' / '+this.emax+(this.lin.c>=3&&!this.rvU?'   ✦부활 1':''));")
M = r''' revive(){this.rvU=1;const p=this.pl,R=120,x=p.x,y=p.y;this.en=this.emax*.35;this.inv=2;this.cry=3;this.slow=0;this.emPull=null;
  // 벗은 껍질: 몸 모양 그대로 하얗게 남았다가 사라진다
  for(const o of[this.hd,...this.sg]){const h=this.add.image(o.x,o.y,o.texture.key).setRotation(o.rotation).setScale(o.scaleX*1.15,o.scaleY*1.15).setDepth(8.8).setTintFill(0xe8e0f8).setAlpha(.8);this.tweens.add({targets:h,alpha:0,duration:1600,delay:300,onComplete:()=>h.destroy()})}
  // 충격파 + 껍질 조각
  for(let k=0;k<3;k++){const r=this.add.ellipse(x,y,40,26).setStrokeStyle(3-k,0xe8d8ff,.9).setDepth(12);this.tweens.add({targets:r,scaleX:6-k,scaleY:6-k,alpha:0,delay:k*90,duration:520,onComplete:()=>r.destroy()})}
  for(let i=0;i<18;i++){const a=i/18*6.283+Math.random()*.2,b=this.add.rectangle(x,y,6,4,[0xb0a6c8,0xece6f8,0x6e6484][i%3]).setRotation(a).setDepth(12);this.tweens.add({targets:b,x:x+Math.cos(a)*(R*.7+Math.random()*50),y:y+Math.sin(a)*(R*.45+Math.random()*30),angle:Math.random()*360,alpha:0,duration:700,ease:'Quad.out',onComplete:()=>b.destroy()})}
  const f=this.add.rectangle(400,180,800,360,0xd8f0ff,.6).setDepth(140);this.tweens.add({targets:f,alpha:0,duration:450,onComplete:()=>f.destroy()});this.cameras.main.shake(350,.012);
  for(const m of this.cur.en)if(m.on){const dx=m.x-x,dy=m.y-y,d=Math.hypot(dx,dy)||1;if(d<R+(m.br||0)){this.dmgM(m,this.emax*.3);if(m.on&&!m.mb&&!({spn:1,qn:1,wd:1,rw:1,em:1})[m.k])this.mv(m,dx/d*70,dy/d*70,30)}}
  for(const L of[this.eprj,this.emb,this.mbb,this.prj])if(L)for(const q of L)if(Math.hypot(q.x-x,q.y-y)<R){q.t=0;if(q.o)q.o.setVisible(false)}
  this.bd.forEach(o=>{o.setTintFill(0xbfeaff);this.time.delayedCall(220,()=>o.clearTint())});
  const t=this.add.text(x,y-34,'갑각 폭발 탈피! — 껍질을 벗고 되살아났다',ST({fontSize:'14px',fontStyle:'bold',color:'#bfeaff'})).setOrigin(.5).setDepth(70);this.tweens.add({targets:t,y:y-64,alpha:0,delay:900,duration:800,onComplete:()=>t.destroy()})}
'''
rep('\n end(a,b,c,tip){', '\n' + M + ' end(a,b,c,tip){')
open(P, 'w', encoding='utf-8').write(s)
print('ok', len(s))
