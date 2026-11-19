from PIL import Image, ImageDraw, ImageFont
import math, random
F='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
def ft(s): return ImageFont.truetype(F,s,index=1)
clean=Image.open('ui_clean.png').convert('RGBA')  # 1600x720 (2x)
S=2
crop=clean.crop((0,300,640,720))  # 논리 0..320 x 150..360
W,H=crop.size
def joy(R,K,lab,sub):
    im=crop.copy();L=Image.new('RGBA',im.size,(0,0,0,0));d=ImageDraw.Draw(L)
    cx,cy=150,110  # 논리 좌표(크롭 기준)
    d.ellipse([(cx-R)*S,(cy-R)*S,(cx+R)*S,(cy+R)*S],fill=(36,28,56,80),outline=(160,140,220,130),width=3)
    kx,ky=cx+R*.7,cy-R*.35
    d.ellipse([(kx-K)*S,(ky-K)*S,(kx+K)*S,(ky+K)*S],fill=(166,92,255,170),outline=(224,200,255,160),width=2)
    d.ellipse([(kx-13)*S,(ky-13)*S,(kx+13)*S,(ky+13)*S],fill=(255,255,255,60),outline=(255,255,255,140),width=2)
    im=Image.alpha_composite(im,L);d=ImageDraw.Draw(im)
    d.rectangle([0,0,W,56],fill=(18,14,26,230));d.text((14,8),lab,font=ft(30),fill=(255,233,168));d.text((W-14,14),sub,font=ft(22),fill=(200,190,230),anchor='ra')
    return im
J=[joy(40,15,'지금 (v34)','고리 40'),joy(55,20,'K1','고리 55 · 옛 크기, 반투명'),joy(65,24,'K2','고리 65 · 끝까지 미는 거리 ↑'),joy(78,28,'K3','고리 78 · 가장 크게')]
# 점프 도식
def jump(lab,sub,hops,col=(120,230,150)):
    w,h=640,420;im=Image.new('RGBA',(w,h),(20,15,32,255));d=ImageDraw.Draw(im)
    for x in range(0,w,40):d.line([x,60,x,h],fill=(32,26,48))
    for y in range(60,h,40):d.line([0,y,w,y],fill=(32,26,48))
    d.rectangle([0,0,w,56],fill=(18,14,26));d.text((14,8),lab,font=ft(30),fill=(255,233,168));d.text((w-14,14),sub,font=ft(22),fill=(200,190,230),anchor='ra')
    # 플레이어
    px,py=70,300;d.ellipse([px-14,py-9,px+14,py+9],fill=(166,92,255));d.text((px,py+26),'플레이어',font=ft(18),fill=(200,180,240),anchor='ma')
    x,y=150,280
    for i,(L,ang) in enumerate(hops):
        a=math.radians(ang);nx,ny=x+math.cos(a)*L,y+math.sin(a)*L
        hgt=8+L*.22;pts=[]
        for t in range(21):
            q=t/20;pts.append((x+(nx-x)*q,y+(ny-y)*q-math.sin(math.pi*q)*hgt))
        d.line(pts,fill=col+(255,),width=4)
        d.ellipse([x-7,y-5,x+7,y+5],outline=col,width=2)
        d.text(((x+nx)/2,min(y,ny)-hgt-26),f'{round(L/2)}',font=ft(18),fill=(230,230,230),anchor='ma')
        x,y=nx,ny
    d.ellipse([x-12,y-8,x+12,y+8],fill=col)
    return im
cur=jump('지금','한 번에 약 120px, 매번 같음',[(244,-12)])
j1=jump('J1  짧게 여러 번','30~70px 깡충깡충 2~4번 이어서',[(70,-20),(110,10),(84,-35),(130,5)])
j2=jump('J2  무작위 길이','짧게·중간·길게 섞임 (30~110px)',[(64,-15),(220,0),(110,-40)])
j3=jump('J3  상황 따라','멀면 짧게 · 가까우면 중간 · 물리기 직전 긴 도약',[(60,-10),(60,15),(140,-20),(230,-5)])
G=[cur,j1,j2,j3]
def grid(items,title):
    w,h=items[0].size;o=Image.new('RGB',(w*2+12,h*2+12+70),(8,6,14));d=ImageDraw.Draw(o);d.text((14,14),title,font=ft(34),fill=(255,255,255))
    for i,im in enumerate(items):o.paste(im.convert('RGB'),((i%2)*(w+12),70+(i//2)*(h+12)))
    return o
a=grid(J,'1. 조이스틱 크기 (손가락 = 흰 원)');b=grid(G,'2. 개구리(대 유충) 점프 — 위에서 본 궤적, 숫자 = 거리(px, 논리 좌표)')
o=Image.new('RGB',(max(a.width,b.width),a.height+b.height+20),(8,6,14));o.paste(a,(0,0));o.paste(b,(0,a.height+20))
o=o.resize((o.width*3//4,o.height*3//4),Image.LANCZOS);o.save('/home/claude/void-parasite/docs/options_v35.png');print(o.size)
