from PIL import Image, ImageDraw, ImageFont
import math, random, textwrap
src=open('/home/claude/play/boss4.py').read(); exec(src[:src.index('# ---------------- A')])
src2=src[src.index('# ---------------- C'):src.index('K=2')]; exec(src2[:src2.index('def C_main')])

# 손바닥(위에서 본 모양) 마스크 → 점 뽑기
def palm_pts(cx,cy,s,ang=0,n=500,closed=0.0,seed=1):
    m=Image.new('L',(200,200),0); d=ImageDraw.Draw(m)
    d.ellipse([60,80,140,170],fill=255)                         # 손바닥
    d.rectangle([80,160,120,195],fill=255)                     # 손목
    for k,(fx,fl,fa) in enumerate([(64,66,-.55),(87,82,-.19),(113,84,.19),(136,70,.55)]):
        fa*= (1-closed); x0,y0=fx,95; x1,y1=x0+math.sin(fa)*fl,y0-math.cos(fa)*fl
        d.line([x0,y0,x1,y1],fill=255,width=18); d.ellipse([x1-9,y1-9,x1+9,y1+9],fill=255)
    tx,ty=28+closed*26,112+closed*10; d.line([66,140,tx,ty],fill=255,width=16); d.ellipse([tx-8,ty-8,tx+8,ty+8],fill=255)
    px=[(x,y) for y in range(0,200,2) for x in range(0,200,2) if m.getpixel((x,y))]
    random.seed(seed); out=[]
    ca,sa=math.cos(ang),math.sin(ang)
    for _ in range(n):
        x,y=random.choice(px); u,v=(x-100)/100*s,(y-110)/100*s
        out.append((cx+u*ca-v*sa+random.gauss(0,.25),cy+u*sa+v*ca+random.gauss(0,.25)))
    return out,m
def dots(d,pts,col=((120,230,150),(160,110,240)),a=255):
    for x,y in pts: c=random.choice(col); d.ellipse([x-1.2,y-.9,x+1.2,y+.9],fill=c+(a,))
def palm_tele(d,cx,cy,s,ang=0,closed=0.0):
    pts,m=palm_pts(cx,cy,s,ang,n=1,closed=closed)
    mm=m.resize((int(2*s),int(2*s))).rotate(-math.degrees(ang),expand=False)
    return mm
def stamp(L,mask,cx,cy,col):
    w,h=mask.size; layer=Image.new('RGBA',(w,h),col); L.paste(layer,(int(cx-w/2),int(cy-h*.55)),mask)

def P1():  # 하늘에서 떨어지는 손바닥 — 손가락 사이가 안전
    fr=[]
    im=canvas(140,90,1); L=lay(im); d=ImageDraw.Draw(L)
    sw=[(random.uniform(10,130),random.uniform(10,40)) for _ in range(30)]; swarm(d,sw,260,3,2)
    arrow(d,70,40,70,58,GOLD); worm(d,70,72,-math.pi/2); comp(im,L); fr.append((im,'무리가 위로 솟는다'))
    im=canvas(140,90,2); L=lay(im); d=ImageDraw.Draw(L)
    m=palm_tele(d,70,50,48); stamp(L,m.point(lambda v:90 if v else 0),70,50,(255,60,90,255))
    p,_=palm_pts(70,28,28,n=420); dots(ImageDraw.Draw(L),p,a=200)
    worm(ImageDraw.Draw(L),80,30,-math.pi/2); comp(im,L); fr.append((im,'바닥에 손바닥 그림자'))
    im=canvas(140,90,3); L=lay(im); d=ImageDraw.Draw(L)
    p,_=palm_pts(70,50,48,n=700); dots(d,p)
    for r in (52,58): d.ellipse([70-r,54-r*.5,70+r,54+r*.5],outline=(255,255,255,90))
    worm(d,80,30,-math.pi/2); d.text((90,8),'안전!',font=ft(10),fill=GOLD); arrow(d,92,14,84,24,GOLD,1); comp(im,L); fr.append((im,'쾅 — 손가락 사이는 안전'))
    return fr
def P2():  # 연속 장타 — 세 번 따라오며 점점 크게
    fr=[]
    for k in range(3):
        im=canvas(140,90,10+k); L=lay(im); d=ImageDraw.Draw(L)
        for j in range(k):
            p,_=palm_pts(28+j*40,52,14+j*6,n=160,seed=j); dots(d,p,a=90)
        m=palm_tele(d,28+k*40,52,14+k*6); stamp(L,m.point(lambda v:110 if v else 0),28+k*40,52,(255,60,90,255))
        worm(ImageDraw.Draw(L),48+k*40,64,0); comp(im,L)
        fr.append((im,['작은 손바닥이 찍고','따라오며 더 크게','세 번째는 방 절반']))
    return fr
def P3():  # 쓸어 잡기 — 미끄러져 와서 움켜쥠
    fr=[]
    im=canvas(140,90,21); L=lay(im); d=ImageDraw.Draw(L)
    p,_=palm_pts(118,46,26,ang=-math.pi/2,n=400); dots(d,p); arrow(d,92,46,62,46,RED); worm(d,40,46,0); comp(im,L); fr.append((im,'손바닥이 미끄러져 온다'))
    im=canvas(140,90,22); L=lay(im); d=ImageDraw.Draw(L)
    p,_=palm_pts(70,46,30,ang=-math.pi/2,n=480,closed=.5); dots(d,p); worm(d,48,40,0); comp(im,L); fr.append((im,'손가락이 오므라든다'))
    im=canvas(140,90,23); L=lay(im); d=ImageDraw.Draw(L)
    p,_=palm_pts(70,46,30,ang=-math.pi/2,n=480,closed=1.0); dots(d,p); worm(d,30,22,-2.4); arrow(d,44,32,30,22,GOLD); comp(im,L); fr.append((im,'닫히기 전 틈으로 탈출'))
    return fr

# ---- 그 밖의 스킬 후보 (한 컷씩) ----
def S_spiral():
    im=canvas(160,100,31); L=lay(im); d=ImageDraw.Draw(L)
    for arm in range(3):
        pts=[(80+math.cos(t+arm*2.094)*t*9,50+math.sin(t+arm*2.094)*t*5.5) for t in [i/20 for i in range(1,160)]]
        swarm(d,pts,240,1.6,arm)
    queen(d,80,50,.7); d.arc([20,10,140,90],200,250,fill=GOLD,width=2); worm(d,116,74,2.2); comp(im,L); return im
def S_rain():
    im=canvas(160,100,32); L=lay(im); d=ImageDraw.Draw(L)
    for i in range(5):
        for j in range(3):
            if (i+j)%2: continue
            x,y=20+i*30,22+j*28; tele_circle(d,x,y,11,7); d.line([x,y-14,x,y-6],fill=(160,240,180,200))
    worm(d,50,50,0); comp(im,L); return im
def S_snake():
    im=canvas(160,100,33); L=lay(im); d=ImageDraw.Draw(L)
    path=[(140-i*3,80-25*math.sin(i/10)) for i in range(40)]+[(20,80-i*1.5) for i in range(30)]
    swarm(d,path,420,1.4,3); queen(d,20,36,.6); d.ellipse([136,76,146,84],outline=GOLD); bite(d,146,80); worm(d,150,72,2.6)
    comp(im,L); return im
def S_hearts():
    im=canvas(160,100,34); L=lay(im); d=ImageDraw.Draw(L)
    for k,(x,y) in enumerate([(36,40),(80,64),(124,38)]):
        swarm(d,[(x,y)],160,7,k);
        if k==1: queen(d,x,y,.7); d.ellipse([x-14,y-10,x+14,y+10],outline=GOLD)
        else: d.ellipse([x-5,y-3,x+5,y+3],fill=(200,120,255))
    worm(d,80,90,-math.pi/2); comp(im,L); return im
def S_eye():
    im=canvas(160,100,35); L=lay(im); d=ImageDraw.Draw(L)
    ell=[(80+math.cos(a)*44,46+math.sin(a)*20) for a in [i/80*6.283 for i in range(80)]]; swarm(d,ell,300,1.4,5)
    swarm(d,[(80,46)],120,4,6,col=((255,190,90),)); tele_line(d,80,46,140,90,14); worm(d,24,84,0)
    comp(im,L); return im
def S_bait():
    im=canvas(160,100,36); L=lay(im); d=ImageDraw.Draw(L)
    random.seed(7)
    for i in range(9):
        x,y=random.uniform(20,140),random.uniform(20,80); bad=i in (2,5,7)
        d.ellipse([x-3,y-2,x+3,y+2],fill=(255,110,130) if bad else (120,230,150))
        if bad: d.ellipse([x-7,y-5,x+7,y+5],outline=(255,90,120,150))
    worm(d,80,50,0); comp(im,L); return im

K=2
def grid3(frames,W):
    fw=(W-40-20)//3; h=int(frames[0][0].height*fw/frames[0][0].width)
    o=Image.new('RGB',(W,h+30),(13,10,22)); d=ImageDraw.Draw(o)
    for i,(f,cap) in enumerate(frames):
        o.paste(f.resize((fw,h),Image.NEAREST).convert('RGB'),(20+i*(fw+10),0)); d.text((26+i*(fw+10),3),str(i+1),font=ft(16),fill=GOLD)
        d.text((20+i*(fw+10)+fw/2,h+5),cap[i] if isinstance(cap,list) else cap,font=ft(14),fill=WH,anchor='ma')
    return o
W=700
blocks=[]
def head(t,sz=26,col=(255,255,255),h=46,bg=(6,4,12)):
    o=Image.new('RGB',(W,h),bg); ImageDraw.Draw(o).text((20,8),t,font=ft(sz),fill=col); return o
def note(t,col=(225,218,240),sz=16):
    ls=textwrap.wrap(t,42); o=Image.new('RGB',(W,10+26*len(ls)),(13,10,22)); d=ImageDraw.Draw(o)
    for i,l in enumerate(ls): d.text((22,4+i*26),l,font=ft(sz,False),fill=col)
    return o
blocks+= [head('한 몸의 무리 — 스킬 시안'), head('1. 무리의 손바닥 (여래신장) — 방식 3안',22,(232,200,255),40,(13,10,22))]
for nm,fn,desc in [('P1  내려찍는 손바닥',P1,'유충이 위로 솟았다가 거대한 손바닥으로 떨어진다. 바닥 그림자로 예고 · 손가락 사이 틈에 서면 안전'),
                   ('P2  연속 장타',P2,'손바닥이 세 번 연달아 찍으며 따라온다. 갈수록 커져 세 번째는 방 절반 — 앞에서 미리 빠질 자리를 봐야 함'),
                   ('P3  쓸어 잡기',P3,'옆에서 손바닥이 미끄러져 와 오므라들며 움켜쥔다. 손가락이 닫히기 전 틈으로 빠져나감')]:
    blocks+= [head(nm,19,GOLD,34,(13,10,22)), grid3(fn(),W), note(desc)]
blocks+= [head('2. 그 밖의 스킬 후보 — ★ 독특함 / ● 구현 쉬움',22,(232,200,255),46,(13,10,22))]
cands=[('S1 은하 소용돌이',S_spiral,'★★★ ●●●','무리가 팔 셋 달린 은하처럼 돈다. 팔 사이 빈 곳을 따라 함께 돌며 피함'),
       ('S2 유충 비',S_rain,'★★ ●●●','하늘로 흩어졌다 바둑판 모양 원으로 쏟아진다. 빈 칸으로'),
       ('S3 줄지은 뱀',S_snake,'★★★ ●●','한 줄로 늘어서 나를 쫓는다. 꼬리 유충을 먹으면 짧아지고, 머리가 지나간 자리는 잠깐 벽'),
       ('S4 세 개의 심장',S_hearts,'★★ ●●','셋으로 갈라진다. 금빛으로 뛰는 진짜 여왕을 물면 기절 · 가짜를 물면 터짐'),
       ('S5 무리의 눈',S_eye,'★★ ●●●','무리가 거대한 눈을 만들고 동공(여왕)이 나를 따라보다 빛줄기를 쏜다'),
       ('S6 죽은 척',S_bait,'★★★ ●●','떨어진 유충 중 몇 개는 미끼 — 붉게 떨면 물지 말 것. 먹기 시스템을 비튼 함정')]
cw=(W-40-10)//2
for r in range(3):
    o=Image.new('RGB',(W,cw*100//160+92),(13,10,22)); d=ImageDraw.Draw(o)
    for c in range(2):
        nm,fn,st,ds=cands[r*2+c]; x=20+c*(cw+10); im=fn().resize((cw,cw*100//160),Image.NEAREST).convert('RGB'); o.paste(im,(x,0))
        y=im.height+4; d.text((x,y),nm,font=ft(16),fill=GOLD); d.text((x+cw,y+2),st,font=ft(14),fill=(255,200,220),anchor='ra')
        for i,l in enumerate(textwrap.wrap(ds,22)): d.text((x,y+24+i*20),l,font=ft(13,False),fill=(225,218,240))
    blocks.append(o)
blocks.append(note('기본기(항상): 주먹 돌진 · 파도 · 고리 (이전 시안) / 2페이즈: 여왕이 무리를 입은 거대 유충 — 몸을 흔들면 조각이 떨어져 작은 무리로',(255,214,140)))
H=sum(b.height for b in blocks)+20; out=Image.new('RGB',(W,H),(6,4,12)); y=0
for b in blocks: out.paste(b,(0,y)); y+=b.height
out.save('/home/claude/void-parasite/docs/boss_designs/16_swarm_skills.png'); print(out.size)
