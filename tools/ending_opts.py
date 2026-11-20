from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, random, textwrap
FB='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'; FR='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
def ft(s,b=True): return ImageFont.truetype(FB if b else FR,s,index=1)
P='/home/claude/play/'; R6=P+'rounds/f6/'
GOLD=(255,224,120); WH=(240,236,255); LAV=(201,139,255)
def crop(f,box,sc=3,key=None):
    im=Image.open(f).convert('RGBA').crop(box)
    if key:  # 배경 어두운 픽셀 투명하게
        px=im.load()
        for y in range(im.height):
            for x in range(im.width):
                r,g,b,a=px[x,y]
                if r+g+b<key: px[x,y]=(0,0,0,0)
    return im.resize((im.width*sc,im.height*sc),Image.NEAREST)
end44=Image.open(P+'end_44.png').convert('RGB'); end63=Image.open(P+'end_63.png').convert('RGB'); end20=Image.open(P+'end_20.png').convert('RGB')
worm=crop(R6+'p11_01_t185.png',(288,190,325,232),3,150)
wormP=crop(R6+'p11_03_t425.png',(55,195,118,265),2,110)
W,H=800,360
def fr(im,cap,sub=None):
    o=im.copy().convert('RGB').resize((W,H)); d=ImageDraw.Draw(o)
    d.rectangle([0,H-40,W,H],fill=(10,6,20)); d.text((14,H-34),cap,font=ft(20),fill=GOLD)
    if sub: d.text((W-14,H-30),sub,font=ft(15,False),fill=(200,190,230),anchor='ra')
    return o
def dark(seed):
    random.seed(seed); o=Image.new('RGB',(W,H),(9,6,18)); d=ImageDraw.Draw(o)
    for _ in range(500): d.point((random.randrange(W),random.randrange(H)),fill=random.choice([(60,50,90),(120,110,170),(220,215,255)]))
    return o,d
# ---------- E1 에필로그: 선택마다 다른 마지막 장면 ----------
def e1():
    # Ⅰ 공허에 남다
    a=end44.copy().convert('RGBA'); a.alpha_composite(worm.rotate(180,expand=True),(380,262))
    a1=fr(a,'1  틈을 등지고 돌아선다')
    b,d=dark(2); d.line([400,40,400,300],fill=(255,240,220),width=3)
    for r in (6,12): d.line([400-r/6,60,400-r/6,280],fill=(180,120,255))
    bb=b.convert('RGBA'); bb.alpha_composite(worm,(365,250)); b2=fr(bb,'2  틈이 가는 선으로 닫힌다')
    c,d=dark(3); cx,cy=400,180
    for k in range(3): d.ellipse([cx-90-k*6,cy-55-k*4,cx+90+k*6,cy+55+k*4],outline=(255,210,120))
    random.seed(4)
    for i in range(22):
        a_=i/22*6.283; x,y=cx+math.cos(a_)*70,cy+math.sin(a_)*42
        d.rounded_rectangle([x-6,y-3,x+6,y+3],radius=3,fill=(122,230,152) if i%2 else (164,110,242))
    cc=c.convert('RGBA'); cc.alpha_composite(worm,(cx-70,cy-55)); d=ImageDraw.Draw(cc); d.text((cx,cy+70),'공허는 새 여왕을 얻었다',font=ft(22),fill=GOLD,anchor='mm')
    c3=fr(cc,'3  무리가 모여든다 — 새 여왕')
    # Ⅱ 밖으로
    x1=end63.copy().convert('RGBA'); d=ImageDraw.Draw(x1); d.rectangle([0,0,W,H],fill=(255,250,240,120)); x1.alpha_composite(worm,(372,150)); x1=fr(x1,'1  틈 속으로 기어 들어간다')
    x2=Image.new('RGB',(W,H),(255,251,242)); x2=fr(x2,'2  하얗게')
    x3=Image.new('RGB',(W,H)); d=ImageDraw.Draw(x3)
    for y in range(H):
        t=y/H; d.line([0,y,W,y],fill=(int(120+120*t),int(160+70*t),int(230-40*t)))
    random.seed(7)
    pts=[(0,230)]+[(x,200+30*math.sin(x/90)+random.randint(-6,6)) for x in range(0,W+20,20)]+[(W,H),(0,H)]
    d.polygon(pts,fill=(70,90,120)); pts2=[(0,270)]+[(x,262+14*math.sin(x/50+1)) for x in range(0,W+20,20)]+[(W,H),(0,H)]; d.polygon(pts2,fill=(60,120,80))
    for x in range(0,W,6): d.line([x,268+14*math.sin(x/50+1)-4,x+2,268+14*math.sin(x/50+1)-10],fill=(90,160,100))
    d.ellipse([320,40,360,80],fill=(255,240,200))
    d.polygon([(390,300),(410,296),(420,302),(398,306)],fill=(30,10,40)); d.line([395,302,415,300],fill=(200,140,255),width=2)
    x3=x3.convert('RGBA'); x3.alpha_composite(worm.rotate(-20,expand=True),(400,262)); d=ImageDraw.Draw(x3)
    d.text((W/2,120),'바깥은 아직 모른다, 공허가 무엇을 내보냈는지',font=ft(20),fill=(255,255,255),anchor='mm',stroke_width=3,stroke_fill=(40,40,70))
    x3=fr(x3,'3  낯선 세상의 땅 틈에서 기어 나온다')
    return [[a1,b2,c3],[x1,x2,x3]],['엔딩 Ⅰ — 공허에 남다','엔딩 Ⅱ — 밖으로']
# ---------- E2 진화 기록 카드 ----------
def e2():
    o,d=dark(11); d.rounded_rectangle([20,16,780,344],radius=14,fill=(22,15,38),outline=(120,90,180),width=2)
    d.text((40,32),'엔딩 Ⅱ — 밖으로',font=ft(16,False),fill=(200,190,230)); d.text((40,54),'「허기의 군주」',font=ft(30),fill=GOLD)
    oo=o.convert('RGBA'); d=ImageDraw.Draw(oo); d.rounded_rectangle([40,104,230,300],radius=10,fill=(12,8,24),outline=(90,70,140))
    big=crop(R6+'p11_01_t185.png',(288,190,325,232),4,150); oo.alpha_composite(big,(135-big.width//2,200-big.height//2)); d.text((135,282),'최종 모습 · Lv.16',font=ft(13,False),fill=(200,190,230),anchor='mm')
    d.text((260,104),'진화 기록',font=ft(17),fill=WH)
    steps=[('포',(240,110,160),'갈고리 턱','1:42'),('공',(170,110,240),'공허 감각','3:05'),('포',(240,110,160),'포식 성장','4:51'),('갑',(130,170,240),'결정 비늘','7:20'),('포',(240,110,160),'통째 삼키기','7:31')]
    for i,(k,col,nm,tm) in enumerate(steps):
        x=280+i*98; d.line([x,150,x+98,150],fill=(80,64,120),width=2) if i<4 else None
        d.ellipse([x-14,136,x+14,164],fill=col); d.text((x,150),k,font=ft(13),fill=(20,10,30),anchor='mm'); d.text((x,176),nm,font=ft(12,False),fill=WH,anchor='ma'); d.text((x,194),tm,font=ft(11,False),fill=(160,150,190),anchor='ma')
    d.text((260,226),'쓰러뜨린 것',font=ft(17),fill=WH)
    for i,(nm,tm) in enumerate([('★ 허기의 왕관','41초'),('★ 한 몸의 무리','2분 20초')]):
        d.rounded_rectangle([260+i*240,254,480+i*240,286],radius=8,fill=(40,28,64)); d.text((272+i*240,262),nm,font=ft(14),fill=GOLD); d.text((468+i*240,264),tm,font=ft(13,False),fill=WH,anchor='ra')
    d.text((260,300),'17:04  ·  처치 186  ·  먹은 먹이 312  ·  탈피 5',font=ft(14,False),fill=(200,190,230))
    d.rounded_rectangle([620,30,760,62],radius=8,fill=(166,92,255)); d.text((690,46),'기록 남기기',font=ft(14),fill=(18,9,31),anchor='mm')
    return oo.convert('RGB')
# ---------- E3 크레딧 행진 + 다음 판 해금 ----------
def e3():
    o,d=dark(21); oo=o.convert('RGBA'); d=ImageDraw.Draw(oo)
    for i,(t,s) in enumerate([('공허 기생충','The Void Parasite'),('기획 · 그림 · 시험','(개발자 이름)'),('코드 · 몬스터 · 보스','Claude')]):
        d.text((400,26+i*40),t,font=ft(18 if i else 24),fill=GOLD if i==0 else WH,anchor='ma'); d.text((400,50+i*40),s,font=ft(12,False),fill=(170,160,200),anchor='ma')
    d.line([40,150,760,150],fill=(60,48,90)); d.text((40,158),'만난 생물들',font=ft(14),fill=(200,190,230))
    crops=[(R6+'p11_01_t185.png',(84,215,120,250),'낫그늘'),(R6+'p11_01_t185.png',(504,90,540,112),'공허 유충'),(R6+'p11_01_t185.png',(560,140,600,170),'대 유충'),(R6+'p11_01_t185.png',(128,46,154,74),'결정'),(R6+'p11_01_t185.png',(330,228,362,262),'땅울음')]
    x=50
    for f,box,nm in crops:
        try: im=crop(f,box,2,90)
        except Exception: continue
        oo.alpha_composite(im,(x,232-im.height//2)); d.text((x+im.width//2,262),nm,font=ft(12,False),fill=WH,anchor='ma'); x+=im.width+34
    for i in range(14): d.point((30+i*55,214),fill=(90,80,130))
    d.rounded_rectangle([40,286,760,344],radius=10,fill=(40,26,60),outline=GOLD,width=2)
    d.text((56,294),'다음 판 해금',font=ft(14),fill=GOLD); d.text((56,316),'엔딩 Ⅰ → 「금빛 여왕 껍질」   ·   엔딩 Ⅱ → 「새벽빛 껍질」  — 다음 판 시작 때 고를 수 있다',font=ft(14,False),fill=WH)
    return oo.convert('RGB')
# ---------- 합치기 ----------
def head(t,sub,h=64):
    o=Image.new('RGB',(W*3//2,h),(13,10,22)); d=ImageDraw.Draw(o); d.text((18,8),t,font=ft(22),fill=(232,200,255)); d.text((18,38),sub,font=ft(14,False),fill=(255,214,140)); return o
BW=W*3//2
blocks=[]
t=Image.new('RGB',(BW,52),(6,4,12)); ImageDraw.Draw(t).text((18,10),'엔딩 마무리 — 대안 3가지 (차원이 열린 뒤 / 엔딩을 고른 뒤에 붙는 것)',font=ft(22),fill=(255,255,255)); blocks.append(t)
rows,lb=e1(); blocks.append(head('A  에필로그 장면 — 고른 엔딩마다 다른 마지막 장면','공허에 남으면 틈이 닫히고 무리가 모여 새 여왕이 된다 / 나가면 하얗게 된 뒤 낯선 세상의 땅 틈에서 기어 나온다'))
for r,l in zip(rows,lb):
    o=Image.new('RGB',(BW,24+H//2),(13,10,22)); d=ImageDraw.Draw(o); d.text((18,2),l,font=ft(15),fill=GOLD)
    for i,im in enumerate(r): o.paste(im.resize((W//2,H//2)),(i*(W//2),24))
    blocks.append(o)
blocks.append(head('B  진화 기록 카드 — 이번 판을 한 장으로','최종 모습 · 계통에 따른 별명 · 탈피 순서 · 쓰러뜨린 보스 · 시간 — 캡처해서 남기기 좋게'))
o=Image.new('RGB',(BW,H),(13,10,22)); o.paste(e2(),((BW-W)//2,0)); blocks.append(o)
blocks.append(head('C  크레딧 행진 + 다음 판 해금','만든 사람과 만난 생물이 지나가고, 고른 엔딩에 따라 다음 판에 쓸 껍질(겉모습)이 열린다'))
o=Image.new('RGB',(BW,H),(13,10,22)); o.paste(e3(),((BW-W)//2,0)); blocks.append(o)
Ht=sum(b.height for b in blocks); out=Image.new('RGB',(BW,Ht),(6,4,12)); y=0
for b in blocks: out.paste(b,(0,y)); y+=b.height
out=out.resize((out.width*2//3,out.height*2//3),Image.LANCZOS); out.save('/home/claude/void-parasite/docs/ending_options_v37.png'); print(out.size)
