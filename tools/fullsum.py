#!/usr/bin/env python3
"""full.js 결과 요약: python3 fullsum.py <rounds 폴더>"""
import json, glob, sys, collections
D = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/play/rounds/bal2'
rows = []
for f in sorted(glob.glob(D + '/*.json')):
    d = json.load(open(f)); d.pop('monAll', None); rows.append(d)
by = collections.defaultdict(list)
for r in rows: by[r['lin']].append(r)
NM = {'p': '포식', 'c': '갑각', 'v': '공허'}
for k in 'pcv':
    R = by.get(k, [])
    if not R: continue
    end = sum(r['res'] == 'ending' for r in R)
    mbin = [r for r in R if r.get('mb')]; mbw = [r for r in mbin if r['mb']['win']]
    swin = [r for r in R if r.get('sw')]; sww = [r for r in swin if r['sw']['win']]
    early = [r for r in R if r['res'] == 'dead' and not r.get('mb')]
    print(f"[{NM[k]}] {len(R)}판 · 엔딩 {end} · 중간보스 {len(mbw)}/{len(mbin)} (시간 {[r['mb'].get('time') for r in mbw]}, 최저 에너지 {[r['mb']['minE'] for r in mbin]}) · 최종보스 {len(sww)}/{len(swin)} (시간 {[r['sw'].get('time') for r in sww]}, Lv {[r['ev'][[e[0] for e in r['ev']].index('최종보스')][2] for r in swin]}) · 중간보스 전 사망 {len(early)}")
    for r in R:
        dm = r['ended'] or r['res']
        print(f"   {r['seed']}: {r['res']:7s} {r['t']:>6}초 Lv{r['lv']} {r['linEnd']}  끝={dm}  flags={len(r['flags'])} errs={len(r['errs'])}")
fl = [(r['lin'] + str(r['seed']), x) for r in rows for x in r['flags']]
er = [(r['lin'] + str(r['seed']), x) for r in rows for x in r['errs']]
print('flags:', fl[:12]); print('errs:', er[:8])
