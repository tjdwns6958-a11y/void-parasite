from PIL import Image, ImageDraw, ImageFont
import math, random
F='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'; FR='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
def ft(s,b=True): return ImageFont.truetype(F if b else FR,s,index=1)
W,H=330,170; K=2  # 저해상도로 그리고 2배 확대(픽셀 느낌)
def base(seed,bg=(10,7,18)):
    random.seed(seed); im=Image.new('RGB',(W,H),bg); d=ImageDraw.Draw(im)
    for _ in range(260):
        x,y=random.randrange(W),random.randrange(H); c=random.choice([(60,50,90),(90,80,130),(150,140,200),(230,225,255)])
        d.point((x,y),fill=c)
    return im,d
def worm(d,x,y,col=(166,92,255)):
    for i,(dx,r) in enumerate([(0,3),(-4,2.6),(-7,2.2),(-10,1.8)]):
        d.ellipse([x+dx-r,y-r*.8,x+dx+r,y+r*.8],fill=col if i==0 else (130,70,210))
    d.point((x+1,y-1),fill=(255,255,255))
def rift(d,cx,cy,h,w=5,col=(201,139,255)):
    pts=[];random.seed(int(cx*7+cy))
    for i in range(9):
        t=i/8; pts.append((cx+(random.random()-.5)*w*1.6*math.sin(math.pi*t),cy-h/2+h*t))
    right=[(x+w*math.sin(math.pi*i/8),y) for i,(x,y) in enumerate(pts)]
    poly=pts+right[::-1]; d.polygon(poly,fill=(4,2,8),outline=col)
def ring(d,cx,cy,r,ry,gaps,col,w=2):
    n=90
    for i in range(n):
        a0=i/n*2*math.pi; a1=(i+1)/n*2*math.pi; am=(a0+a1)/2
        if any(abs(math.atan2(math.sin(am-g),math.cos(am-g)))<gw for g,gw in gaps): continue
        d.line([cx+math.cos(a0)*r,cy+math.sin(a0)*ry,cx+math.cos(a1)*r,cy+math.sin(a1)*ry],fill=col,width=w)
def stars_in(d,poly_bbox,mask_fn,n=60):
    x0,y0,x1,y1=poly_bbox
    for _ in range(n):
        x,y=random.uniform(x0,x1),random.uniform(y0,y1)
        if mask_fn(x,y): d.point((x,y),fill=random.choice([(200,190,255),(255,255,255),(150,120,220)]))

# ---------- A 침묵의 종지기 ----------
def A():
    im,d=base(1)
    # 양옆 균열과 사슬
    rift(d,40,40,46); rift(d,290,40,46)
    for sx,sy,ex,ey in [(42,58,140,62),(288,58,190,62)]:
        for i in range(14):
            t=i/13;x=sx+(ex-sx)*t;y=sy+(ey-sy)*t+math.sin(math.pi*t)*12
            d.ellipse([x-1.6,y-1.2,x+1.6,y+1.2],outline=(110,95,150))
    # 종 (껍데기 판으로 된 종, 얼굴 없음)
    cx,top,bot=165,48,118
    def bw(y): t=(y-top)/(bot-top); return 14+36*(t**1.6)
    for y in range(top,bot):
        w=bw(y); d.line([cx-w,y,cx+w,y],fill=(34,22,58))
        d.point((cx-w,y),fill=(150,120,210)); d.point((cx+w,y),fill=(150,120,210))
    for k in range(5):  # 껍데기 판 줄무늬
        y=top+8+k*12; w=bw(y); d.line([cx-w+2,y,cx+w-2,y],fill=(70,52,110))
    for k in range(-2,3):  # 세로 판
        d.line([cx+k*8,top+3,cx+k*15,bot-2],fill=(52,38,86))
    # 종의 입: 별빛 공동 + 세로 틈 빛
    d.ellipse([cx-50,bot-7,cx+50,bot+9],fill=(4,2,10),outline=(201,139,255))
    random.seed(5); stars_in(d,(cx-48,bot-6,cx+48,bot+8),lambda x,y:((x-cx)/48)**2+((y-bot-1)/7)**2<1,50)
    d.line([cx,bot-4,cx,bot+6],fill=(255,240,250),width=1)
    # 종 위 작은 가면 모양 고리
    d.ellipse([cx-7,top-12,cx+7,top+2],outline=(201,139,255),width=1)
    # 울림 고리 (틈이 있는 파동)
    ring(d,cx,bot+2,95,42,[(1.9,.32),(-.6,.25)],(255,90,130),2)
    ring(d,cx,bot+2,140,62,[(2.6,.28),(.4,.3)],(200,140,255),1)
    # 플레이어 + 살금살금 발자국 (조용)
    worm(d,70,142)
    for i in range(4): d.point((58-i*5,143+(i%2)),fill=(120,110,160))
    # 시끄러운 발자국 표시 (붉은 음파)
    for r in (4,7): d.arc([248-r,128-r,248+r,128+r],200,340,fill=(255,90,130))
    d.ellipse([244,140,252,146],fill=(60,40,80))
    return im
# ---------- B 별을 잣는 자 ----------
def B():
    im,d=base(2,(8,6,16))
    random.seed(11)
    nodes=[(40,30),(95,22),(160,16),(235,24),(292,38),(300,110),(250,150),(170,158),(80,150),(28,108),(120,90),(215,92)]
    # 실 (일부는 붉게 = 곧 불타오름)
    edges=[(0,1),(1,2),(2,3),(3,4),(4,5),(5,6),(6,7),(7,8),(8,9),(9,0),(1,10),(10,7),(3,11),(11,8),(10,11),(2,11),(9,10)]
    hot={(10,7),(3,11),(4,5)}
    for a,b in edges:
        col=(255,80,110) if (a,b) in hot else (120,100,180)
        d.line([nodes[a],nodes[b]],fill=col,width=1)
    # 몸통: 별로 채운 불규칙한 덩어리 + 얼굴 없는 가면
    cx,cy=165,82
    poly=[(cx+math.cos(a)*(30+8*math.sin(3*a)+4*math.cos(5*a)),cy+math.sin(a)*(20+5*math.cos(4*a))) for a in [i/24*2*math.pi for i in range(24)]]
    d.polygon(poly,fill=(14,8,30),outline=(201,139,255))
    stars_in(d,(cx-40,cy-28,cx+40,cy+28),lambda x,y:((x-cx)/32)**2+((y-cy)/20)**2<1,90)
    # 다리: 몸에서 별 매듭으로 꺾인 선
    for nx,ny in [nodes[1],nodes[3],nodes[5],nodes[6],nodes[8],nodes[9]]:
        mx,my=(cx+nx)/2,(cy+ny)/2-10
        d.line([(cx,cy),(mx,my),(nx,ny)],fill=(200,170,255),width=2)
        d.point((mx,my),fill=(255,255,255))
    d.ellipse([cx-6,cy-14,cx+6,cy-2],fill=(232,226,245),outline=(160,140,200)); d.line([cx,cy-12,cx,cy-4],fill=(90,60,130))
    # 별 매듭
    for i,(x,y) in enumerate(nodes):
        c=(255,240,180) if i in (10,11) else (230,225,255)
        d.ellipse([x-3,y-3,x+3,y+3],fill=c); d.ellipse([x-5,y-5,x+5,y+5],outline=(120,100,180))
    # 플레이어가 매듭 하나를 물어 끊음
    worm(d,96,98); d.arc([110,82,130,98],140,260,fill=(255,233,168),width=1)
    return im
# ---------- C 벗어둔 것들의 왕 ----------
def C():
    im,d=base(3,(9,7,15))
    cx=165
    # 바닥에 벗어둔 허물들
    for x,y,glow in [(48,58,0),(285,50,1),(58,142,0),(282,140,0)]:
        for k in range(4):
            r=7-k*1.3; d.ellipse([x-12+k*6-r,y-r*.7,x-12+k*6+r,y+r*.7],fill=(46,36,66),outline=(120,105,160))
        if glow: d.ellipse([x-3,y-2,x+3,y+2],fill=(255,90,130))
    # 늘어진 빈 다리 껍질 6개 (마디 꺾임)
    for s,ys in [(-1,70),(1,70),(-1,92),(1,92),(-1,112),(1,112)]:
        pts=[(cx+s*22,ys),(cx+s*48,ys-10),(cx+s*66,ys+14),(cx+s*80,ys+30)]
        for (x0,y0),(x1,y1) in zip(pts,pts[1:]): d.line([x0,y0,x1,y1],fill=(110,92,145),width=4); d.line([x0,y0,x1,y1],fill=(36,26,54),width=2)
        d.point(pts[1],fill=(220,210,240))
    # 몸통: 위아래로 휜 마디 껍질 9개 (매미 허물처럼)
    segs=[]
    for k in range(9):
        y=28+k*13; w=16+18*math.sin(math.pi*(k+1)/10)
        segs.append((y,w))
    for k,(y,w) in enumerate(segs):
        col=(70+k*3,56+k*2,98+k*4)
        d.chord([cx-w,y-8,cx+w,y+10],180,360,fill=col,outline=(165,145,205))
        d.line([cx-w+3,y+1,cx+w-3,y+1],fill=(40,30,62))
    # 등이 세로로 갈라진 탈피 균열 — 속은 별빛
    crack=[(cx,22)]+[(cx+(3 if k%2 else -3),28+k*12) for k in range(1,10)]+[(cx,140)]
    left=[(x-5*math.sin(math.pi*i/(len(crack)-1)),y) for i,(x,y) in enumerate(crack)]
    right=[(x+5*math.sin(math.pi*i/(len(crack)-1)),y) for i,(x,y) in enumerate(crack)]
    d.polygon(left+right[::-1],fill=(4,2,10),outline=(255,170,220))
    random.seed(9); stars_in(d,(cx-6,24,cx+6,138),lambda x,y:abs(x-cx)<4,30)
    # 머리 쪽 빈 껍질 가면 (얼굴 없음)
    d.ellipse([cx-11,8,cx+11,30],fill=(200,190,220),outline=(120,100,160)); d.ellipse([cx-6,14,cx+6,24],fill=(14,8,24))
    # 플레이어와 지나온 길 (2초 뒤 터지는 흔적)
    path=[(300,108),(286,118),(270,124),(254,126),(240,120),(232,110)]
    for i,(x,y) in enumerate(path[:-1]):
        a=path[i+1]; d.line([x,y,a[0],a[1]],fill=(255,90,130) if i<3 else (150,110,220),width=2)
    worm(d,230,108)
    return im

def panel(im,title,line,bul,ph2):
    big=im.resize((W*K,H*K),Image.NEAREST)
    w=W*K; tl=ImageDraw.Draw(Image.new('RGB',(1,1)))
    lines=[]
    o=Image.new('RGB',(w+40,90+H*K+40+34*len(bul)+124),(13,10,22)); d=ImageDraw.Draw(o)
    d.text((20,14),title,font=ft(30),fill=(232,200,255)); d.text((20,56),line,font=ft(18,False),fill=(255,214,140))
    o.paste(big,(20,90)); y=90+H*K+16
    for b in bul: d.text((22,y),b,font=ft(19,False),fill=(225,218,240)); y+=34
    d.rectangle([20,y+4,w+20,y+104],fill=(30,22,48)); d.text((32,y+10),'2페이즈',font=ft(19),fill=(255,150,180)); import textwrap
    for n,ln in enumerate(textwrap.wrap(ph2,34)): d.text((32,y+40+n*28),ln,font=ft(18,False),fill=(235,225,250))
    return o

PA=panel(A(),'A  침묵의 종지기','양옆 균열에 사슬로 매달린 껍데기 종 · 종의 입 속은 별빛 공동',
 ['① 울림 — 틈이 있는 고리 파동이 퍼진다. 틈으로 빠져나갈 것',
  '② 귀 기울이기 — 종이 멈춘 동안 빨리 움직이면 들킨다(살금살금 필수)',
  '③ 사슬 끌기 — 종이 사슬을 당겨 균열 쪽으로 휩쓸며 이동',
  '④ 공격 기회: 울린 직후 종 입이 열린 1.5초 — 속의 빛을 문다'],
 '종에 금이 가며 소리가 거꾸로 — 고리가 바깥에서 안으로 좁혀 오고, 벽에 튕긴 메아리 고리가 겹친다')
PB=panel(B(),'B  별을 잣는 자','별빛으로 채운 몸에 얼굴 없는 가면 · 다리 끝이 방 곳곳의 별 매듭에 닿아 있다',
 ['① 실 잇기 — 별 매듭 사이에 실을 잇고, 붉게 변한 실은 곧 불탄다',
  '② 매듭 먹기 — 별 매듭을 물어 먹으면 이어진 실이 모두 끊긴다(먹기 시스템)',
  '③ 별자리 — 실이 삼각형을 이루면 그 안이 통째로 터진다',
  '④ 공격 기회: 매듭을 3개 끊으면 몸이 실에서 떨어져 바닥으로 내려온다'],
 '몸이 풀려 방 전체가 베틀이 된다 — 가로·세로 실이 북처럼 오가며 격자로 좁혀 오고, 빈 칸을 찾아 이동')
PC=panel(C(),'C  벗어둔 것들의 왕','마디마디 쌓인 거대한 빈 허물 · 등의 탈피 균열 속은 별빛 · 바닥엔 벗어둔 껍질들',
 ['① 지나온 길 — 내가 2초 전에 지나온 길이 붉게 빛나다 터진다',
  '② 허물 던지기 — 떨어진 껍질 몇 개가 나중에 깨어나 덮친다',
  '③ 껍질 숨바꼭질 — 왕이 허물 속으로 숨는다. 붉게 빛나는 진짜를 찾아 물 것',
  '④ 탈피 — 체력 30%마다 바깥 껍질을 벗고 작아지는 대신 빨라진다'],
 '마지막 탈피 — 별빛 실루엣만 남은 「벗은 왕」. 방 안의 모든 허물이 벽이 되고, 왕은 그 사이를 미끄러지며 돈다')
o=Image.new('RGB',(PA.width,PA.height*3+60),(6,4,12)); d=ImageDraw.Draw(o)
d.text((20,10),'최종 보스 새 컨셉 3안 — 거울 없음 · 회피가 필요한 2페이즈',font=ft(22),fill=(255,255,255))
y=50
for p in (PA,PB,PC): o.paste(p,(0,y)); y+=p.height+5
o.save('/home/claude/void-parasite/docs/boss_designs/10-12_bell_weaver_husk.png'); print(o.size)
