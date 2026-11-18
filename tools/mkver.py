# 사용: python3 mkver.py <out.html> [patch.json ...]  → 현재 소스에서 지정한 패치들을 되돌린 게임 버전 생성
import sys,json
s=open('/mnt/user-data/outputs/void-parasite-proto.html',encoding='utf-8').read()
for pj in reversed(sys.argv[2:]):
    for o,n,*c in reversed(json.load(open(pj,encoding='utf-8'))):
        assert s.count(n)>=1,(pj,n[:80]);s=s.replace(n,o)
g=s.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>','<script src="../lib/phaser.min.js"></script>').replace('new Phaser.Game({','window.GAME=new Phaser.Game({')
open('/home/claude/play/'+sys.argv[1],'w',encoding='utf-8').write(g);print('ok',sys.argv[1])
