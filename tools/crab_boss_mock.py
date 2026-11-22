from PIL import Image, ImageDraw, ImageFilter, ImageFont
import numpy as np, random, math
W,H,S=200,110,3
FONT='/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'
def C(h,a=255):return ((h>>16)&255,(h>>8)&255,h&255,a)
def new():
    return Image.new('RGBA',(W,H),(0,0,0,0))
def blob(d,box,pal,hl=True):
    x0,y0,x1,y1=box;d.ellipse(box,fill=C(pal[0]))
    d.ellipse((x0+1,y0,x1-1,y1-2),fill=C(pal[1]))
    if hl:d.ellipse((x0+(x1-x0)*.18,y0+(y1-y0)*.1,x0+(x1-x0)*.55,y0+(y1-y0)*.42),fill=C(pal[2]))
def poly(d,pts,c):d.polygon([tuple(p) for p in pts],fill=C(c))
def line(d,a,b,c,w=1):d.line([tuple(a),tuple(b)],fill=C(c),width=w)
def shard(d,x,y,h,w,ang,pal):
    # 결정 하나: 두 면(밝은/어두운) + 끝 하이라이트
    ca,sa=math.cos(ang),math.sin(ang);tip=(x+ca*h,y+sa*h);nx,ny=-sa*w,ca*w
    l=(x+nx,y+ny);r=(x-nx,y-ny);mid=(x+ca*h*.15,y+sa*h*.15)
    poly(d,[l,tip,mid],pal[1]);poly(d,[r,tip,mid],pal[0]);line(d,mid,(x+ca*h*.8,y+sa*h*.8),pal[2])
def outline(img,col=0x0a0612):
    a=np.array(img);al=a[:,:,3]>0;o=np.zeros_like(al)
    for dx,dy in((1,0),(-1,0),(0,1),(0,-1)):o|=np.roll(np.roll(al,dy,0),dx,1)
    o&=~al;a[o]=C(col);return Image.fromarray(a)
def cave(seed,tint):
    random.seed(seed);bg=Image.new('RGBA',(W,H),C(0x120a1e));d=ImageDraw.Draw(bg)
    for y in range(H):
        t=y/H;c=(int(18+10*t),int(10+8*t),int(30+16*t),255);d.line([(0,y),(W,y)],fill=c)
    for _ in range(140):
        x,y=random.randrange(W),random.randrange(30,H);d.point((x,y),fill=C(0x2a1f40))
    d.ellipse((30,70,170,112),fill=C(0x1d1430))
    for (cx,cy,n,sc) in [(10,30,5,1.3),(190,24,5,1.4),(16,100,4,1.1),(186,102,4,1.2),(60,8,3,.8),(150,6,3,.8)]:
        for k in range(n):
            a=-math.pi/2+random.uniform(-.9,.9);shard(d,cx+random.uniform(-6,6),cy+random.uniform(-3,3),random.uniform(10,22)*sc,random.uniform(2.5,4.5)*sc,a,tint[k%2])
    return bg
CY=[(0x2f6f8f,0x6fd0ff,0xe8faff),(0x5a2f8f,0xb07aff,0xf2e0ff)]
GOLD=[(0x8a5a10,0xf0b030,0xfff0b0)]
def glow(base,pts,col,r):
    g=Image.new('RGBA',(W*S,H*S),(0,0,0,0));d=ImageDraw.Draw(g)
    for x,y in pts:d.ellipse((x*S-r,y*S-r,x*S+r,y*S+r),fill=C(col,120))
    return Image.alpha_composite(base,g.filter(ImageFilter.GaussianBlur(r*.6)))
def finish(bg,spr,glows,name,l1,l2,acc):
    big=bg.resize((W*S,H*S),Image.NEAREST)
    sh=Image.new('RGBA',(W*S,H*S),(0,0,0,0));ImageDraw.Draw(sh).ellipse((40*S,82*S,160*S,104*S),fill=(0,0,0,110));big=Image.alpha_composite(big,sh.filter(ImageFilter.GaussianBlur(6)))
    for pts,col,r in glows:big=glow(big,pts,col,r)
    big=Image.alpha_composite(big,outline(spr).resize((W*S,H*S),Image.NEAREST))
    for pts,col,r in glows:
        if r<=10:big=glow(big,pts,col,r)
    cap=Image.new('RGBA',(W*S,86),C(0x0b0716));d=ImageDraw.Draw(cap)
    f1=ImageFont.truetype(FONT,26);f2=ImageFont.truetype(FONT,17)
    d.text((16,8),name,font=f1,fill=C(acc));d.text((16,42),l1,font=f2,fill=C(0xd8d0ee));d.text((16,63),l2,font=f2,fill=C(0xa99fc2))
    out=Image.new('RGBA',(W*S,H*S+86));out.paste(big,(0,0));out.paste(cap,(0,H*S));return out

# ---------- 1. 정동 집게왕 ----------
def crab():
    s=new();d=ImageDraw.Draw(s);SH=(0x2a2440,0x4a4268,0x7a72a0);RK=(0x3a3448,0x5e5870,0x8e88a2)
    for side in(-1,1):
        for k in range(3):
            bx=100+side*(28+k*7);by=70+k*3;kx=bx+side*(16+k*3);ky=by+8+k*2;fx=kx+side*(6);fy=ky+12
            line(d,(bx,by),(kx,ky),SH[0],3);line(d,(kx,ky),(fx,fy),SH[0],2);line(d,(bx,by-1),(kx,ky-1),SH[1],1)
    random.seed(5);G=[]
    for k in range(28):
        an=k/28*6.283;r=1+random.uniform(-.06,.06);G.append((100+math.cos(an)*42*r,34+math.sin(an)*28*r))
    poly(d,G,RK[0]);poly(d,[(x+(100-x)*.05,y+(34-y)*.06-1) for x,y in G],RK[1])
    for k in range(9):
        x=random.uniform(66,134);y=random.uniform(10,28);d.ellipse((x-3,y-1,x+3,y+1),fill=C(RK[2]))
    for k in range(6):x=random.uniform(64,136);y=random.uniform(30,56);d.ellipse((x-2,y-1,x+2,y+1),fill=C(RK[0]))
    crack=[(70,40),(76,28),(84,32),(90,18),(100,25),(108,14),(116,28),(124,22),(132,38),(126,50),(100,54),(76,50)]
    cx,cy=100,38
    for f,col in((1.18,0xe8f4ff),(1.1,0x6fd0ff),(1.03,0x8a5ad0)):poly(d,[(cx+(x-cx)*f,cy+(y-cy)*f) for x,y in crack],col)
    poly(d,crack,0x1a0a30)
    random.seed(3)
    for k in range(26):
        x=random.uniform(78,124);y=random.uniform(32,52);shard(d,x,y,random.uniform(6,14),random.uniform(1.6,2.8),-math.pi/2+(x-100)/40+random.uniform(-.3,.3),CY[1] if k%3 else CY[0])
    d.ellipse((58,54,142,90),fill=C(SH[0]));d.ellipse((60,54,140,87),fill=C(SH[1]));d.ellipse((72,56,108,66),fill=C(SH[2]))
    for k in range(7):x=66+k*11;poly(d,[(x,58),(x+3,52),(x+6,58)],SH[1])
    # 큰 수정 집게(왼쪽)
    line(d,(70,72),(52,80),SH[0],5);line(d,(52,80),(40,74),SH[0],5);line(d,(70,71),(52,79),SH[1],2)
    poly(d,[(44,66),(14,52),(8,62),(22,74),(40,82)],CY[0][0]);poly(d,[(44,66),(14,52),(20,60),(40,72)],CY[0][1]);line(d,(16,55),(38,67),CY[0][2])
    poly(d,[(40,80),(12,84),(10,92),(26,94),(46,88)],CY[0][0]);poly(d,[(40,82),(12,85),(24,90),(44,86)],CY[0][1])
    for x,y in((14,56),(20,58),(26,61),(16,87),(22,86)):shard(d,x,y,4,1.2,math.pi/2,CY[0])
    # 작은 집게(오른쪽)
    line(d,(130,72),(146,80),SH[0],4);line(d,(146,80),(154,74),SH[0],3)
    poly(d,[(152,70),(168,64),(170,70),(158,78)],SH[1]);poly(d,[(156,78),(172,78),(170,84),(156,84)],SH[0])
    # 눈자루 + 입
    for ex in(90,110):
        tx=ex-(100-ex)*.5;line(d,(ex,74),(tx,62),SH[0],3);line(d,(ex,73),(tx,62),SH[2],1);d.ellipse((tx-4,57,tx+4,65),fill=C(0x0a0612));d.ellipse((tx-3,58,tx+2,62),fill=C(0x8ff0ff));d.point((tx-2,59),fill=C(0xffffff))
    for k in range(5):line(d,(92+k*4,84),(93+k*4,90),0xc87898,1)
    return s,[([(100,42)],0xb07aff,70),([(20,70),(24,88)],0x6fd0ff,40),([(85,61),(115,61)],0x8ff0ff,8)]
# ---------- 2. 광맥 투구게 ----------
def kabuto():
    s=new();d=ImageDraw.Draw(s);SH=(0x1f2a2c,0x3c5052,0x6c8486)
    poly(d,[(104,12),(110,12),(168,2),(164,0)],CY[0][0]);poly(d,[(106,12),(110,12),(168,2)],CY[0][1]);line(d,(108,10),(164,2),CY[0][2])
    poly(d,[(74,4),(126,4),(134,22),(100,34),(66,22)],SH[0]);poly(d,[(76,5),(124,5),(130,20),(100,30),(70,20)],SH[1])
    for k in range(4):
        for side in(-1,1):x=100+side*(28+k*1.5);y=7+k*4;poly(d,[(x,y),(x+side*9,y+2),(x,y+3)],SH[0])
    for k in range(3):line(d,(82+k*13,8),(86+k*11,24),SH[0],1)
    for i,(c,ins) in enumerate(((SH[0],0),(SH[1],2),(0x4e6466,10),(0x5e7678,20),(SH[2],32))):
        d.pieslice((28+ins,26+ins*.7,172-ins,130-ins*.4),180,360,fill=C(c))
    d.rectangle((26,78,174,80),fill=C(SH[0]));line(d,(100,30),(100,76),0x2a3638,1)
    for side in(-1,1):d.arc((100-40,34,100+40,120),180 if side<0 else 270,270 if side<0 else 360,fill=C(0x2a3638))
    # 앞 가장자리 수정 이빨
    for k in range(13):x=36+k*10.5;shard(d,x,79,7,2.2,math.pi/2,CY[0])
    # 금빛 광맥
    random.seed(7);V=[]
    for k in range(7):
        a=math.pi+0.25+k*(math.pi-0.5)/6;x,y=100,66
        for st in range(6):
            nx=x+math.cos(a)*7+random.uniform(-2,2);ny=y+math.sin(a)*5+random.uniform(-1.5,1.5);line(d,(x,y),(nx,ny),GOLD[0][1],1);V.append((nx,ny));x,y=nx,ny;a+=random.uniform(-.25,.25)
    # 겹눈 2 + 가운데 홑눈
    for ex in(62,138):d.ellipse((ex-6,48,ex+6,56),fill=C(0x10181a));d.ellipse((ex-4,49,ex+2,53),fill=C(0xff9a40))
    d.ellipse((98,40,102,43),fill=C(0xffe066))
    return s,[(V[::3],0xf0b030,14),([(62,52),(138,52)],0xff9a40,9),([(150,5)],0x6fd0ff,26)]
# ---------- 3. 수정 갑주 쥐며느리 ----------
def isopod():
    s=new();d=ImageDraw.Draw(s);SH=(0x2c2238,0x4c3e62,0x7c6c98)
    # 꼬리 갈래
    for side in(-1,1):poly(d,[(100+side*6,14),(100+side*22,2),(100+side*16,16)],SH[0])
    for side in(-1,1):
        for k in range(7):y=24+k*8;line(d,(100+side*30,y),(100+side*40,y+4),SH[0],2)
    blob(d,(62,10,138,92),SH,hl=False)
    random.seed(11)
    for k in range(8):
        y=16+k*9;w=30-abs(k-4)*1.8
        d.chord((100-w-6,y-2,100+w+6,y+10),180,360,fill=C(SH[2] if k%2 else SH[1]));d.arc((100-w-6,y-2,100+w+6,y+10),180,360,fill=C(SH[0]))
        if k%2==0:
            for j in range(-2,3):shard(d,100+j*9,y+1,5+ (2-abs(j))*2,1.8,-math.pi/2+j*.15,CY[j%2])
    # 머리 + 더듬이 + 큰턱
    d.chord((76,78,124,104),0,180,fill=C(SH[1]));d.arc((76,78,124,104),0,180,fill=C(SH[0]))
    for side in(-1,1):
        pts=[(100+side*12,92),(100+side*30,98),(100+side*44,94),(100+side*54,86)];
        for a,b in zip(pts,pts[1:]):line(d,a,b,SH[0],2)
        shard(d,100+side*54,86,6,1.6,-math.pi/2+side*.4,CY[0])
        poly(d,[(100+side*3,100),(100+side*9,106),(100+side*2,104)],0xd8c8f0)
    for ex in(90,110):d.ellipse((ex-3,88,ex+3,92),fill=C(0x0a0612));d.point((ex-1,89),fill=C(0xff5a7a))
    # 구른 모습(작게, 오른쪽)
    bx,by=172,74;d.ellipse((bx-16,by-16,bx+16,by+16),fill=C(SH[1]))
    for k in range(-3,4):d.arc((bx-16,by-16+k*4,bx+16,by+16+k*4),200,340,fill=C(SH[0]))
    for k in range(5):shard(d,bx-12+k*6,by-14+abs(k-2)*2,6,1.6,-math.pi/2+(k-2)*.35,CY[k%2])
    for k in range(3):line(d,(bx-24-k*6,by+6+k*3),(bx-34-k*6,by+6+k*3),0x6c6488,1)
    return s,[([(100,40),(100,60)],0x9fd8ff,30),([(172,62)],0xb07aff,14),([(90,90),(110,90)],0xff5a7a,6)]
# ---------- 4. 수정 망치새우 ----------
def shrimp():
    s=new();d=ImageDraw.Draw(s);BD=(0x1d4a4a,0x2f8a7a,0x7ad8b8);OR=(0x8a3a18,0xe87a30,0xffc890)
    # 꼬리 부채(뒤)
    for k in range(7):a=math.pi/2+(k-3)*.32;poly(d,[(100,86),(100+math.cos(a)*30-3,86+math.sin(a)*18),(100+math.cos(a)*30+3,86+math.sin(a)*18)],OR[k%2])
    # 몸통 마디
    for k in range(5):y=72-k*11;w=20-k*1.5;blob(d,(100-w,y-7,100+w,y+7),BD)
    for k in range(5):y=72-k*11;line(d,(100-14+k,y+5),(100+14-k,y+5),OR[1],1)
    # 눈자루(무지개 줄무늬 겹눈)
    for side in(-1,1):
        line(d,(100+side*5,26),(100+side*17,10),BD[0],4);line(d,(100+side*5,25),(100+side*17,10),BD[2],1)
        cx=100+side*18;d.ellipse((cx-7,0,cx+7,12),fill=C(0x2a1a40))
        for j,c in enumerate((0xff5a7a,0xffe066,0x7be0a8,0x6fd0ff)):d.line([(cx-6,2+j*3),(cx+6,2+j*3)],fill=C(c),width=1)
    # 접힌 팔 + 수정 망치 주먹
    for side in(-1,1):
        line(d,(100+side*16,44),(100+side*36,54),BD[0],5);line(d,(100+side*36,54),(100+side*42,40),BD[0],5);line(d,(100+side*16,43),(100+side*35,53),BD[1],2)
        fx=100+side*46;fy=36
        poly(d,[(fx-10,fy-10),(fx+10,fy-12),(fx+14,fy+2),(fx+6,fy+12),(fx-10,fy+8)],CY[0][0])
        poly(d,[(fx-10,fy-10),(fx+10,fy-12),(fx+4,fy),(fx-8,fy+2)],CY[0][1]);line(d,(fx-6,fy-8),(fx+6,fy-9),CY[0][2])
        for k in range(3):shard(d,fx-6+k*6,fy-10,5,1.4,-math.pi/2,CY[0])
    # 충격파
    for r in(12,20,28):d.arc((100-r-60,40-r*.6,100+r-60+0,40+r*.6),110,250,fill=C(0xbff4ff,200))
    for r in(12,20,28):d.arc((100-r+60,40-r*.6,100+r+60,40+r*.6),-70,70,fill=C(0xbff4ff,200))
    # 작은 다리들
    for side in(-1,1):
        for k in range(3):line(d,(100+side*14,62+k*8),(100+side*24,68+k*8),BD[0],2)
    return s,[([(54,36),(146,36)],0x6fd0ff,32),([(82,6),(118,6)],0xffe066,8)]
def spider():
    s=new();d=ImageDraw.Draw(s);SH=(0x4a2020,0x8a3a30,0xd87a5a)
    random.seed(21)
    feet=[(22,92),(44,102),(70,106),(88,108),(112,108),(130,106),(156,102),(178,92)]
    for i,(fx,fy) in enumerate(feet):
        side=-1 if fx<100 else 1;bx=100+side*12;by=36;kx=bx+side*(22+abs(fx-100)*.35);ky=10+abs(i-3.5)*3
        line(d,(bx,by),(kx,ky),SH[0],3);line(d,(kx,ky),(fx,fy-10),SH[0],2);line(d,(bx,by-1),(kx,ky-1),SH[2],1);line(d,(kx+side,ky),(fx+side,fy-10),SH[1],1)
        d.ellipse((kx-2,ky-2,kx+2,ky+2),fill=C(SH[1]))
        shard(d,fx,fy-11,10,2,math.pi/2,CY[i%2])
        d.ellipse((fx-4,fy-1,fx+4,fy+2),fill=C(0x6fd0ff,90))
    for side in(-1,1):
        line(d,(100+side*8,44),(100+side*20,62),SH[0],3);line(d,(100+side*20,62),(100+side*14,74),SH[0],2)
        poly(d,[(100+side*14,72),(100+side*20,80),(100+side*12,78)],SH[1]);poly(d,[(100+side*12,74),(100+side*8,80),(100+side*12,80)],SH[0])
    blob(d,(80,20,120,50),SH)
    for k in range(9):x=84+k*4;poly(d,[(x,24),(x+2,18-(k%3)*2),(x+4,24)],SH[1])
    for k in range(5):shard(d,90+k*5,24,8+(2-abs(k-2))*3,1.8,-math.pi/2+(k-2)*.2,CY[k%2])
    for ex in(95,105):d.ellipse((ex-2,42,ex+2,46),fill=C(0x0a0612));d.point((ex,43),fill=C(0xffe066))
    for x,y in((60,96),(140,96),(100,100)):
        for r in(5,9):d.ellipse((x-r,y-r*.45,x+r,y+r*.45),outline=C(0xff5a7a,200))
    return s,[([(100,26)],0x9fd8ff,26)]+[([(fx,fy)],0x6fd0ff,10) for fx,fy in feet]
designs=[(crab,1,'1 · 정동 집게왕','등에 갈라진 거대 정동(돌알)을 지고 다닌다 · 한쪽만 거대한 수정 집게','돌진 → 집게로 바닥 내리찍기 · 약점: 정동의 갈라진 틈(빛나는 결정)',0xb07aff),
 (kabuto,2,'2 · 광맥 투구게','말굽 방패에 금빛 광맥이 흐른다 · 앞 가장자리는 수정 이빨','방패째 땅을 갈며 돌진, 꼬리 가시로 찌르기 · 약점: 뒤집히면 배',0xf0b030),
 (isopod,3,'3 · 수정 갑주 쥐며느리','마디마다 수정이 박힌 갑주 · 몸을 말아 공처럼 구른다','구르기 몸통박치기(벽 튕김) · 약점: 펼친 순간의 머리',0x9fd8ff),
 (shrimp,4,'4 · 수정 망치새우','무지개 겹눈 · 접은 팔 끝에 수정 망치 주먹','순간 펀치 충격파(원뿔) · 약점: 펀치 뒤 팔이 굳는 짧은 틈',0x7be0a8),
 (spider,5,'5 · 수정 장대 거미게','작은 몸이 수정 장대 같은 긴 다리 8개 위 높이 떠 있다','다리를 바닥에 찍어 내리기(붉은 원) · 약점: 다리가 박혀 굳으면 몸이 내려온다',0xff9a80)]
outs=[]
for fn,seed,name,l1,l2,acc in designs:
    spr,gl=fn();bg=cave(seed,(CY[0],CY[1]));o=finish(bg,spr,gl,name,l1,l2,acc);o.save(f'boss_{seed}.png');outs.append(o)
w,h=outs[0].size;g=Image.new('RGBA',(w*3+20,h*2+10),C(0x05030a))
card=Image.new('RGBA',(w,h),C(0x0b0716));cd=ImageDraw.Draw(card);fa=ImageFont.truetype(FONT,34);fb=ImageFont.truetype(FONT,19)
cd.text((30,60),'수정 동굴의 주인',font=fa,fill=C(0xffe9a8));cd.text((30,110),'갑각 보스 새 디자인 시안 5가지',font=fb,fill=C(0xd8d0ee))
for i,t in enumerate(['· 픽셀 크기는 게임 안 보스와 같은 비율','· 파란·보라 결정 = 무기물 (먹으면 회복·충전 가능)','· 노란·빨간 표시 = 이 보스만의 대표 공격 예고','· 이름과 모습은 모두 이 게임용 새 디자인']):cd.text((30,170+i*34),t,font=fb,fill=C(0xa99fc2))
outs.append(card)
for i,o in enumerate(outs):g.paste(o,((i%3)*(w+10),(i//3)*(h+10)))
g.save('boss_grid.png');print(g.size)
