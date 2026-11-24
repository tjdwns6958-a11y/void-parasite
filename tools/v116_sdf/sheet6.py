from PIL import Image,ImageDraw,ImageFont
import sys
O='out/';F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',20);FK=ImageFont.truetype('/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc',20)
f1=Image.open('/home/claude/play/v116/floor1.png').convert('RGBA');f2=Image.open('/home/claude/play/v116/floor2.png').convert('RGBA')
def panel(bg,keys,labels,sc,W,H,ox=120,oy=80,gap=24):
    crop=bg.crop((ox,oy,ox+W//sc,oy+H//sc)).resize((W,H),Image.NEAREST);d=ImageDraw.Draw(crop);x=20
    for k,l in zip(keys,labels):
        im=Image.open(O+k+'.png');big=im.resize((im.width*sc,im.height*sc),Image.NEAREST);crop.alpha_composite(big,(x,(H-big.height)//2+14));d.text((x,4),l,fill=(255,230,120),font=FK);x+=big.width+gap
    return crop
def gamesize(bg,keys,W,H=150):
    crop=bg.crop((40,60,40+W,60+H)).copy();x=16
    for k in keys:
        im=Image.open(O+k+'.png');crop.alpha_composite(im,(x,H//2-im.height//2+8));x+=im.width+14
    return crop.resize((W*2,H*2),Image.NEAREST)
def build(rows,out,Wt):
    ims=[];
    for r in rows:ims.append(r)
    B=Image.new('RGBA',(Wt,sum(i.height+10 for i in ims)+10),(20,16,30,255));y=10
    for i in ims:B.alpha_composite(i,(10,y));y+=i.height+10
    B.save(O+out)
R=['cur_rek','rk_r1s','rk_r2s','rk_r3s','rk_r1v','rk_r2v','rk_r3v']
p1=panel(f1,R,['지금','1 청회색','2 청회색','3 청회색','1 남보라','2 남보라','3 남보라'],3,1380,300)
g=['cur_kha','cur_gna']+R
g1=gamesize(f1,g,560);g2=gamesize(f2,g,560)
d=ImageDraw.Draw(g1);d.text((12,6),'1구역 (게임 크기 x2) — 왼쪽 두 마리는 전갈·쥐(비교용)',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(g2);d.text((12,6),'깊은 공허 (게임 크기 x2)',fill=(255,230,120),font=FK)
build([p1,g1,g2],'rek_opts.png',1400)
C=['cur_gnac','cu1_c','cu1_e','cu2_c','cu2_e','cu3_c','cu3_e']
p2=panel(f1,C,['지금','A','A','B','B','C','C'],5,1380,260,gap=30)
gg=['cur_gna']+C
h1=gamesize(f1,gg,420,110);h2=gamesize(f2,gg,420,110)
d=ImageDraw.Draw(h1);d.text((12,6),'1구역 (x2) — 맨 왼쪽은 평소 쥐',fill=(255,230,120),font=FK)
d=ImageDraw.Draw(h2);d.text((12,6),'깊은 공허 (x2)',fill=(255,230,120),font=FK)
build([p2,h1,h2],'curl_opts.png',1400)
