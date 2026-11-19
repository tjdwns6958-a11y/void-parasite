#!/usr/bin/env python3
"""v30 -> v31: 변이(탈피) 한계 — 1구역 3번, 2구역부터 5번."""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v30</title>', '<title>공허 기생충 v31</title>')
rep("\n lavail(k){", "\n lmax(){return (this.zi||1)>=2?LMAX:3}\n lavail(k){")
rep("if(this.molts>=LMAX)return '변이 한계';", "if(this.molts>=this.lmax())return (this.zi||1)<2?'1구역 한계 (3번)':'변이 한계';")
rep("'   ·   변이 '+this.molts+' / '+LMAX+' — 탈피할수록 재료가 더 든다'", "'   ·   변이 '+this.molts+' / '+this.lmax()+((this.zi||1)<2?' (2구역부터 5)':'')+' — 탈피할수록 재료가 더 든다'")
rep("'탈피 '+this.molts+'/'+LMAX", "'탈피 '+this.molts+'/'+this.lmax()")
rep("탈피는 최대 5번, 할수록 필요한 재료가 늘어난다", "탈피는 1구역 3번 · 2구역부터 5번까지, 할수록 재료가 늘어난다")
rep("let hint=this.molts>=LMAX?'변이 한계 도달 (5/5)':'진화 완료';", "let hint=this.molts>=this.lmax()?((this.zi||1)<2?'1구역 변이 한계 (3/3)':'변이 한계 도달 (5/5)'):'진화 완료';")
rep("if(this.molts>=LMAX||t>=3||", "if(this.molts>=this.lmax()||t>=3||")
rep("'공허 산호 숲과 심연의 감시탑 · 몬스터가 한층 강하다 · 에너지 +30'", "'공허 산호 숲과 심연의 감시탑 · 몬스터가 한층 강하다 · 에너지 +30'+(this.zi==2?'\\n변이 한계가 3번 → 5번으로 늘었다':'')")
if 'LMAX' in s.replace('LMAX=5','').replace('?LMAX:3',''): raise SystemExit('LMAX left')
open(P, 'w', encoding='utf-8').write(s)
print('ok', len(s))
