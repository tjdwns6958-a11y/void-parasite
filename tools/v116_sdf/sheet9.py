exec(open('sheet6.py').read().split("R=['cur_rek'")[0])
R=['rk_etAs','rk_be1s','rk_cr1s','rk_is1s','rk_etAv','rk_be1v','rk_cr1v','rk_is1v']
p1=panel(f1,R,['3-E A','딱정벌레','가재','투구게','3-E A','딱정벌레','가재','투구게'],3,1380,320,gap=30)
g=['cur_kha','cur_gna']+R
g1=gamesize(f1,g,560,170);g2=gamesize(f2,g,560,170)
d=ImageDraw.Draw(g1);d.text((12,6),'1구역 (게임 크기 x2) — 왼쪽 두 마리는 전갈·쥐',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(g2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p1,g1,g2],'rek_opts4.png',1400)
C=['ct%d_c'%i for i in range(1,7)]
p2=panel(f1,C,['1','2','3','4','5','6'],4,1380,260,gap=30)
gg=['cur_gna']+C+['ct%d_e'%i for i in range(1,7)]
h1=gamesize(f1,gg,680,120);h2=gamesize(f2,gg,680,120)
d=ImageDraw.Draw(h1);d.text((12,6),'1구역 (x2) — 맨 왼쪽은 평소 쥐, 1~6 두 가지 색',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(h2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p2,h1,h2],'curl_opts4.png',1400)
