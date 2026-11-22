#!/usr/bin/env python3
"""v96 -> v97:
1) PC 키: 방향키 이동 · Q 공격 · W 섭취(누르고 있기) · E 특수 스킬 · R 대시 · F 탈피 · T 진화 나무 · Shift 살금살금 · P/Esc 일시정지 (WASD·Space·C 이동/공격/대시는 없앰, Space·Enter는 연출 넘기기만)
2) 탈피: 둥지에서만 → 안전하면 어디서나 — 둥지이거나, 보스방이 아니고 3초 안에 맞지 않았고 240px 안에 적이 없고 쫓아오는 적도 없을 때 (moltSafe)
   탈피 버튼(터치 636,296)은 안전할 때 나타남(재료가 모이면 초록) · 위험하면 F를 눌렀을 때 '주변에 적이 있어 탈피할 수 없다' · 둥지 화살표는 재료가 모였는데 위험할 때만
3) 정동 집게왕: 수정 알은 한 대 맞으면 깨짐 (새끼 게는 그대로 두 대)
사용: python3 dev/v97/v97_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v96</title>', '<title>공허 기생충 v97</title>')
rep("window.VP_VER='v96';", "window.VP_VER='v97';")
# --- 1) 키
rep("addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE,F,E,ONE,TWO,THREE,FOUR,ENTER,ESC,SHIFT,Q,C')", "addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,SPACE,F,E,ONE,TWO,THREE,FOUR,ENTER,ESC,SHIFT,Q,C,R')")
rep("const kx=(k.RIGHT.isDown||k.D.isDown)-(k.LEFT.isDown||k.A.isDown),ky=(k.DOWN.isDown||k.S.isDown)-(k.UP.isDown||k.W.isDown);", "const kx=(k.RIGHT.isDown)-(k.LEFT.isDown),ky=(k.DOWN.isDown)-(k.UP.isDown);")
rep("const dn=(this.atk&&this.atk.isDown)||k.SPACE.isDown,jd=this.req||Phaser.Input.Keyboard.JustDown(k.SPACE);", "const dn=(this.atk&&this.atk.isDown)||k.Q.isDown,jd=this.req||Phaser.Input.Keyboard.JustDown(k.Q);")
rep("const hold=(this.eat&&this.eat.isDown)||k.F.isDown;", "const hold=(this.eat&&this.eat.isDown)||k.W.isDown;")
rep("if(Phaser.Input.Keyboard.JustDown(this.k.Q))this.skUse();", "if(Phaser.Input.Keyboard.JustDown(this.k.E))this.skUse();")
rep("const jd=this.dshReq||Phaser.Input.Keyboard.JustDown(k.C);", "const jd=this.dshReq||Phaser.Input.Keyboard.JustDown(k.R);")
rep("const t=this.sys.game.device.input.touch?'대시':'대시\\nC';", "const t=this.sys.game.device.input.touch?'대시':'대시\\nR';")
rep("'WASD·방향키: 이동  ·  Shift: 살금살금  ·  C: 대시(회피)\\nSpace: 공격  ·  F: 섭취 (먹이 곁에서 누르고 있기)  ·  E: 둥지에서 탈피'",
    "'방향키: 이동  ·  Shift: 살금살금  ·  Q: 공격  ·  W: 섭취(먹이 곁에서 누르고 있기)\\nE: 특수 스킬  ·  R: 대시(회피)  ·  F: 탈피(주변에 적이 없을 때)  ·  T: 진화 나무'")
rep("'WASD·방향키: 이동  ·  Shift: 살금살금  ·  Space: 공격  ·  F: 섭취  ·  E: 탈피  ·  P·Esc: 일시정지'", "'방향키: 이동  ·  Shift: 살금살금  ·  Q: 공격  ·  W: 섭취  ·  E: 특수 스킬  ·  R: 대시  ·  F: 탈피  ·  T: 진화 나무  ·  P·Esc: 일시정지'")
rep("'Q 키 · 오른쪽 스킬 버튼'", "'E 키 · 오른쪽 스킬 버튼'")
# --- 2) 탈피: 안전하면 어디서나
rep("if(a.tr=='haven'&&Phaser.Input.Keyboard.JustDown(k.E))this.moltOpen();", "if(Phaser.Input.Keyboard.JustDown(k.F)){if(this.moltSafe())this.moltOpen();else if(!(this.msT>this.time.now)){this.msT=this.time.now+1200;this.pop('주변에 적이 있어 탈피할 수 없다',this.pl.x,this.pl.y)}}")
rep("if(this.cur&&this.cur.tr=='haven'&&Phaser.Math.Distance.Between(p.x,p.y,636,296)<34){this.moltOpen();return}", "if(this.cur&&this.moltSafe()&&(this.cur.tr=='haven'||this.moltPts()>=3)&&Phaser.Math.Distance.Between(p.x,p.y,636,296)<34){this.moltOpen();return}")
rep("  if(this.cur.tr=='haven'){const ok=this.moltPts()>=3;", "  const msf=this.moltSafe();if(msf&&(this.cur.tr=='haven'||this.moltPts()>=3)){const ok=this.moltPts()>=3;")
rep("const ih=this.cur.tr=='haven',tt=this.add.text(400,150,ih?'탈피 재료가 모였다!\\n탈피 버튼'+(this.sys.game.device.input.touch?'':'(E)')+'을 누르면 진화하고 체력이 가득 찬다':'탈피 재료가 모였다!\\n초록 화살표를 따라 둥지로 가서 탈피하면 진화하고 체력이 가득 찬다'",
    "const ih=this.moltSafe(),tt=this.add.text(400,150,ih?'탈피 재료가 모였다!\\n탈피 버튼'+(this.sys.game.device.input.touch?'':'(F)')+'을 누르면 진화하고 체력이 가득 찬다 — 주변에 적이 없을 때 어디서나':'탈피 재료가 모였다!\\n주변에 적이 없을 때 탈피 버튼'+(this.sys.game.device.input.touch?'':'(F)')+' — 초록 화살표의 둥지는 늘 안전하다'")
rep("  if(this.cur.tr!='haven'&&this.moltPts()>=3){const hv=", "  if(!msf&&this.moltPts()>=3){const hv=")
rep("if(this.exR&&this.lv.exit&&this.cur!==this.lv.exit&&!(this.cur.tr!='haven'&&this.moltPts()>=3)){", "if(this.exR&&this.lv.exit&&this.cur!==this.lv.exit&&!(!msf&&this.moltPts()>=3)){")
rep(" moltOpen(){if(this.molt||this.tr)return;", """ moltSafe(){if(this.boss||this.mbOn||this.over||this.cine||!this.cur)return false;if(this.cur.tr=='haven')return true;const p=this.pl,now=this.time.now;if(this.lastHit&&now-this.lastHit.t<3000)return false;
  return !this.cur.en.some(m=>m.on&&(Math.hypot(m.x-p.x,m.y-p.y)<240||m.st=='chase'||m.st=='fight'||m.st=='track'))}
 moltOpen(){if(this.molt||this.tr)return;""")
# 안내 문구: 둥지 → 적이 없는 곳
rep("(this.nodeOk(k)?'둥지에서 탈피!':this.nodeLock(k))", "(this.nodeOk(k)?'적이 없을 때 탈피!':this.nodeLock(k))")
rep("const msg=rd?'둥지(초록 방)에서 탈피하자!':", "const msg=rd?'적이 없는 곳에서 탈피하자!':")
rep("lqMsg(q){return q.st=='ready'?'둥지(초록 방)에서 탈피하자!':", "lqMsg(q){return q.st=='ready'?'적이 없는 곳에서 탈피하자!':")
rep("if(this.canMolt())hint='탈피 가능 (둥지에서)';", "if(this.canMolt())hint='탈피 가능 (적이 없을 때)';")
# --- 3) 알 한 대
rep("const o=this.add.image(m.x,m.y+24,'gdkEgg').setDepth(11).setScale(1.1),e={x:tx,y:ty,t:4,o,live:0,hp:2};", "const o=this.add.image(m.x,m.y+24,'gdkEgg').setDepth(11).setScale(1.1),e={x:tx,y:ty,t:4,o,live:0,hp:1};")
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
