exec(open('sheet6.py').read().split("R=['cur_rek'")[0])
R=['rk_r3as','rk_r3bs','rk_r3cs','rk_r3ds','rk_r3es','rk_r3av','rk_r3bv','rk_r3cv','rk_r3dv','rk_r3ev']
p1=panel(f1,R,['3 (원래)','3-B','3-C','3-D','3-E','3 (원래)','3-B','3-C','3-D','3-E'],3,1380,310,gap=14)
g=['cur_kha','cur_gna']+R
g1=gamesize(f1,g,640,170);g2=gamesize(f2,g,640,170)
d=ImageDraw.Draw(g1);d.text((12,6),'1구역 (게임 크기 x2) — 왼쪽 두 마리는 전갈·쥐',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(g2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p1,g1,g2],'rek_opts2.png',1400)
C=['cur_gnac','cd1_c','cd1_e','cd2_c','cd2_e','cd3_c','cd3_e']
p2=panel(f1,C,['지금','D','D','E','E','F','F'],4,1380,260,gap=40)
gg=['cur_gna']+C
h1=gamesize(f1,gg,440,110);h2=gamesize(f2,gg,440,110)
d=ImageDraw.Draw(h1);d.text((12,6),'1구역 (x2) — 맨 왼쪽은 평소 쥐',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(h2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p2,h1,h2],'curl_opts2.png',1400)
