#!/usr/bin/env python3
"""v107 -> v108: 갑각 수정 메커니즘 — 공격 강화 → 1회 방어 + 반사
- 갑각 2단계부터 결정(무기물)·수정 알 등으로 등에 수정이 차오름(최대 3, 예전 그림 그대로).
- 맞으면 수정 1개가 깨지며 그 공격을 막음(피해 0, 0.5초 무적) + 막은 피해 × CRR 을 공격자에게 반사. 대시 회피·방벽이 먼저.
- 기본 공격은 더 이상 수정으로 세지지 않음(수정 박치기 ×1.7/×1.9 · 수정 소모 없앰).
- 등의 수정 그림을 더 크고 진하게(cryB) · 막았을 때 몸 위 체력이 뜨지 않음 · '반사 N'은 보스 갑주 배율을 거친 실제 피해
- 다시 시작하면 등의 수정이 안 보이던 버그(배열 cryS) → create()의 정리를 배열까지 넓힘
- 체력을 직접 깎는 지속 피해(허기의 왕관 회전 베기 안쪽 등)는 막지 않음.
본체: dev/v108/v108_methods.js · 사용: python3 dev/v108/v108_patch.py index.html [CRR]"""
import sys, os
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
CRR = sys.argv[2] if len(sys.argv) > 2 else '1'
s = open(P, encoding='utf-8').read()
M = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'v108_methods.js'), encoding='utf-8').read().rstrip('\n')
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v107</title>', '<title>공허 기생충 v108</title>')
rep("window.VP_VER='v107';", "window.VP_VER='v108';")
rep("\nconst MBQ=", "\nconst CRR="+CRR+";\nconst MBQ=")
rep("if(this.inv>0)return;this.inv=.5;this.lastHit={src:src||'공격',t:this.time.now};const L=this.lin;", "if(this.inv>0)return;if(this.lin.c>=2&&this.cry>0&&d>0){this.cryBlock(d,src,m);return}this.inv=.5;this.lastHit={src:src||'공격',t:this.time.now};const L=this.lin;")
rep("cryAtk(sl){const L=this.lin,cc=L.c>=2&&this.cry>0,b0=this.bdmg;if(cc)this.bdmg=b0*(L.c>=3?1.9:1.7);this.lgT=0;if(sl)this.slamF(0);else this.bite();this.bdmg=b0;\n  if(cc&&this.lgT>0){this.cry--;this.cryFx()}}",
    "cryAtk(sl){this.lgT=0;if(sl)this.slamF(0);else this.bite()}")
rep("['수정 충전','결정을 먹으면 수정 1개 충전(최대 3) — 수정을 실은 박치기: 피해 ×1.7(3단계 ×1.9) · 대신 재사용 +0.5초 · 맞히면 수정 1개 소모']",
    "['수정 방패','결정을 먹으면 등에 수정 1개(최대 3) — 맞을 때 수정 1개가 깨지며 그 공격을 막고, 막은 피해의 '+Math.round(CRR*100)+'%를 공격자에게 반사']")
# 막았을 때는 몸 위 작은 체력이 뜨지 않게
rep("lh=this.lastHit?now-this.lastHit.t:1e9", "lh=this.lastHit&&!this.lastHit.blk?now-this.lastHit.t:1e9")
# 다시 시작: 지워진 게임 오브젝트가 든 배열(등의 수정 cryS 등)도 비움
rep("if(v&&typeof v=='object'&&v instanceof Phaser.GameObjects.GameObject&&!v.scene)this[k]=null}", "if(v&&typeof v=='object'&&((v instanceof Phaser.GameObjects.GameObject&&!v.scene)||(Array.isArray(v)&&v.length&&v[0] instanceof Phaser.GameObjects.GameObject&&!v[0].scene)))this[k]=null}")
a = "\n hud(){\n"
if s.count(a) != 1: raise SystemExit('anchor hud')
s = s.replace(a, '\n' + M + a)
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s), 'CRR', CRR)
