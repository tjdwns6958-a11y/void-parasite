import re,sys,shutil,os
src='/mnt/user-data/outputs/void-parasite-proto.html'
s=open(src,encoding='utf-8').read()
g=s.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>','<script src="../lib/phaser.min.js"></script>').replace('new Phaser.Game({','window.GAME=new Phaser.Game({')
open('/home/claude/play/game.html','w',encoding='utf-8').write(g)
js=re.findall(r'<script>(.*?)</script>',s,re.S)[-1];open('/home/claude/play/chk.js','w',encoding='utf-8').write(js)
if len(sys.argv)>1: shutil.copy(src,'/home/claude/play/rounds/'+sys.argv[1]+'.html')
