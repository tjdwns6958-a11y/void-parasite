#!/usr/bin/env python3
"""v54 -> v55: 배고픔(시간이 지나면 에너지가 줄어드는 것) 삭제 — 막대는 '체력'으로만 쓴다
 - 매 프레임 C.DRAIN(초당 0.5) 감소 삭제. 독 웅덩이(초당 1.5)·피격은 그대로
 - 화면 글씨 '에너지' → '체력' (조사도 맞춤), 굶주림 쓰러짐 문구·팁 정리
사용: python3 dev/v55/v55_patch.py index.html"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:90]!r}')
    s = s.replace(old, new)
rep('<title>공허 기생충 v54</title>', '<title>공허 기생충 v55</title>')
rep("window.VP_VER='v54';", "window.VP_VER='v55';")
# 배고픔 삭제
rep("this.en-=C.DRAIN*this.drm*dt;", "")
# 쓰러짐 문구 · 팁 (피격도 독도 아닌데 0이 되는 일은 이제 거의 없음)
rep("'굶주림으로 쓰러졌다'", "'힘이 다해 쓰러졌다'")
rep("'에너지는 시간이 지나면 줄어든다 — 먹이를 꾸준히 섭취할 것'", "'체력은 먹이를 섭취하거나 탈피하면 회복된다'")
rep("'에너지 부족 — 먹이를 찾아 섭취할 것'", "'체력 부족 — 먹이를 섭취해 회복할 것'")
rep("'솟아오른 땅울음은 느리다 — 에너지가 적으면 거리를 벌릴 것'", "'솟아오른 땅울음은 느리다 — 체력이 적으면 거리를 벌릴 것'")
rep("'독 웅덩이 위에서는 에너지가 초당 1.5씩 빠진다", "'독 웅덩이 위에서는 체력이 초당 1.5씩 빠진다")
rep("에너지가 가득 찬다", "체력이 가득 찬다", 2)
rep("에너지로 흡수", "체력으로 흡수")
rep("잡으면 에너지와 무기물", "잡으면 체력과 무기물")
rep("SNM=['속도','무게','에너지 효율','공격력']", "SNM=['속도','무게','체력 효율','공격력']")
# 나머지 화면 글씨 (조사 없는 '에너지 ')
n0 = s.count('에너지')
for a, b in [("'에너지 +'", "'체력 +'"), ("에너지 +", "체력 +"), ("최대 에너지", "최대 체력"), ("에너지 회복", "체력 회복"), ("에너지 35%", "체력 35%"), ("'Lv.'+this.plv+'   에너지 '", "'Lv.'+this.plv+'   체력 '")]:
    s = s.replace(a, b)
left = [l for l in s.split('\n') if '에너지' in l and not l.strip().startswith('//')]
import re
bad = [m.group() for l in left for m in re.finditer(r"'[^'\n]*에너지[^'\n]*'", l)]
if bad: raise SystemExit('남은 에너지 글씨: ' + repr(bad))
open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s), '에너지 남음(주석)', s.count('에너지'))
