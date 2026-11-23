exec(open('sheet6.py').read().split("R=['cur_rek'")[0])
R=['rk_cr1s','rk_crAs','rk_crBs','rk_crCs','rk_cr1v','rk_crAv','rk_crBv','rk_crCv']
p1=panel(f1,R,['가재 지금','A','B','C','가재 지금','A','B','C'],3,1380,320,gap=30)
g=['cur_kha','cur_gna']+R
g1=gamesize(f1,g,560,170);g2=gamesize(f2,g,560,170)
d=ImageDraw.Draw(g1);d.text((12,6),'1구역 (게임 크기 x2) — 왼쪽 두 마리는 전갈·쥐',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(g2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p1,g1,g2],'rek_opts5.png',1400)
C=['ct3_c','rt3a_c','rt3b_c','rt3c_c','rt3a_e','rt3b_e','rt3c_e']
p2=panel(f1,C,['3 지금','3-1','3-2','3-3','3-1','3-2','3-3'],4,1380,260,gap=8)
gg=['cur_gna']+C
h1=gamesize(f1,gg,560,120);h2=gamesize(f2,gg,560,120)
d=ImageDraw.Draw(h1);d.text((12,6),'1구역 (x2) — 맨 왼쪽은 평소 쥐',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(h2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p2,h1,h2],'curl_opts5.png',1400)
