exec(open('sheet6.py').read().split("R=['cur_rek'")[0])
R=['cur_mound','rkm_mA','rkm_mB','rkm_mC','rkm_mD']
p1=panel(f1,R,['지금','A','B','C','D'],4,1380,240,gap=30)
p1b=panel(f2,R,['지금','A','B','C','D'],4,1380,240,gap=30)
g=['cur_rek125']+R
g1=gamesize(f1,g,520,120);g2=gamesize(f2,g,520,120)
d=ImageDraw.Draw(g1);d.text((12,6),'1구역 (게임 크기 x2) — 맨 왼쪽은 올라온 땅울음',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(g2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p1,p1b,g1,g2],'mound_opts.png',1400)
