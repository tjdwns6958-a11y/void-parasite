exec(open('sheet6.py').read().split("R=['cur_rek'")[0])
R=['rk_r3es','rk_etAs','rk_etBs','rk_etCs','rk_r3ev','rk_etAv','rk_etBv','rk_etCv']
p1=panel(f1,R,['3-E 지금','A','B','C','3-E 지금','A','B','C'],3,1380,320,gap=30)
g=['cur_kha','cur_gna']+R
g1=gamesize(f1,g,560,170);g2=gamesize(f2,g,560,170)
d=ImageDraw.Draw(g1);d.text((12,6),'1구역 (게임 크기 x2) — 왼쪽 두 마리는 전갈·쥐',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(g2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p1,g1,g2],'rek_opts3.png',1400)
C=['cd2_c','ce1_c','ce1_e','ce2_c','ce2_e','ce3_c','ce3_e']
p2=panel(f1,C,['E 지금','1','1','2','2','3','3'],4,1380,240,gap=36)
gg=['cur_gna']+C
h1=gamesize(f1,gg,440,110);h2=gamesize(f2,gg,440,110)
d=ImageDraw.Draw(h1);d.text((12,6),'1구역 (x2) — 맨 왼쪽은 평소 쥐',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(h2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p2,h1,h2],'curl_opts3.png',1400)
