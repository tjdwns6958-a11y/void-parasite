from PIL import Image, ImageDraw, ImageFont
import math, random, textwrap
exec(open('/home/claude/play/swarm_sk.py').read().split('def P1():')[0])

def palm_to(d,x,y,tx,ty,s,n=260,closed=0.0,seed=1,a=255):
    ang=math.atan2(tx-x,-(ty-y)); p,_=palm_pts(x,y,s,ang,n=n,closed=closed,seed=seed); dots(d,p,a=a)
def trail(d,x0,y0,x1,y1,n=40,seed=0):
    random.seed(seed)
    for i in range(n):
        t=random.random(); x=x0+(x1-x0)*t+random.gauss(0,2); y=y0+(y1-y0)*t+random.gauss(0,2)
        d.point((x,y),fill=(160,120,240,int(60+120*t)))

def FF(seed,w=150,h=96): im=canvas(w,h,seed); return im,lay(im)
def palms(Npalm,stage,seed,w=150,h=96,px=None,py=None):
    im,L=FF(seed,w,h); d=ImageDraw.Draw(L); tx,ty=w/2,h/2+4
    R={0:58,1:30,2:0}[stage]
    if stage<2:
        d.ellipse([tx-22,ty-14,tx+22,ty+14],fill=(255,60,90,50),outline=RED)
    for k in range(Npalm):
        a=k/Npalm*2*math.pi+.4; x,y=tx+math.cos(a)*R*1.25,ty+math.sin(a)*R*.8
        if stage<2:
            sx,sy=tx+math.cos(a)*90,ty+math.sin(a)*60; trail(d,sx,sy,x,y,50,k)
            palm_to(d,x,y,tx,ty,15 if stage==0 else 17,n=220,closed=.15*stage,seed=k)
    if stage==2:
        # 합쳐진 덩어리 (삼킨 자리) + 퍼지는 충격
        swarm(d,[(tx,ty)],520,5.5,9)
        for r in (26,34): d.ellipse([tx-r,ty-r*.62,tx+r,ty+r*.62],outline=(255,255,255,110))
    if px is not None: worm(d,px,py,math.atan2(py-ty,px-tx))
    comp(im,L); return im
def burst(seed,w=150,h=96):
    im,L=FF(seed,w,h); d=ImageDraw.Draw(L); tx,ty=w/2,h/2+4; random.seed(4)
    for i in range(26):
        a=random.random()*6.283; r=random.uniform(18,60); x,y=tx+math.cos(a)*r,ty+math.sin(a)*r*.62
        d.line([tx+math.cos(a)*10,ty+math.sin(a)*6,x,y],fill=(255,255,255,40)); d.ellipse([x-1.5,y-1,x+1.5,y+1],fill=(120,230,150))
    queen(d,tx,ty,.6); worm(d,30,80,-.8); bite(d,38,72); comp(im,L); return im

# ---- 우주형 스킬 후보 ----
def T_comet():
    im,L=FF(61,170,100); d=ImageDraw.Draw(L)
    for k,(x0,y0,x1,y1) in enumerate([(-10,10,120,70),(30,-10,170,60),(-10,60,90,100)]):
        trail(d,x0,y0,x1,y1,160,k); swarm(d,[(x1,y1)],80,2.2,k)
        tele_line(d,x1,y1,x1+(x1-x0)*.5,y1+(y1-y0)*.5,10)
    worm(d,150,88,3); comp(im,L); return im
def T_hole():
    im,L=FF(62,170,100); d=ImageDraw.Draw(L); cx,cy=85,50
    for r in range(8,70,9): d.ellipse([cx-r,cy-r*.6,cx+r,cy+r*.6],outline=(160,120,240,max(30,140-r*2)))
    swarm(d,[(cx,cy)],260,3,3); d.ellipse([cx-6,cy-4,cx+6,cy+4],fill=(0,0,0))
    for a in [i/10*6.283 for i in range(10)]: arrow(d,cx+math.cos(a)*64,cy+math.sin(a)*38,cx+math.cos(a)*44,cy+math.sin(a)*26,(200,170,255),1)
    worm(d,150,80,2.6); arrow(d,140,76,160,88,GOLD,1); comp(im,L); return im
def T_ring():
    im,L=FF(63,170,100); d=ImageDraw.Draw(L); cx,cy=85,50
    for k,(rx,ry,tilt) in enumerate([(70,22,.35),(52,34,-.6)]):
        pts=[]
        for i in range(120):
            a=i/120*6.283; x,y=math.cos(a)*rx,math.sin(a)*ry
            pts.append((cx+x*math.cos(tilt)-y*math.sin(tilt),cy+x*math.sin(tilt)+y*math.cos(tilt)))
        swarm(d,pts,300,1.2,k)
    queen(d,cx,cy,.7); worm(d,98,52,0); d.text((102,38),'안전',font=ft(9),fill=GOLD); comp(im,L); return im
def T_tide():
    im,L=FF(64,170,100); d=ImageDraw.Draw(L)
    edge=[(40+12*math.sin(y/8),y) for y in range(0,100,2)]
    fill=[(random.uniform(0,40+12*math.sin(y/8)),y) for y in range(0,100,1) for _ in range(4)]
    swarm(d,fill,500,1.2,4); swarm(d,edge,150,1,5)
    for x,y in [(80,30),(118,70)]: d.ellipse([x-12,y-8,x+12,y+8],fill=(90,80,110),outline=(160,150,190))
    arrow(d,50,50,74,50,RED); worm(d,120,52,3); comp(im,L); return im
def T_pulsar():
    im,L=FF(65,170,100); d=ImageDraw.Draw(L); cx,cy=85,50
    for a in (.4,.4+math.pi):
        pts=[(cx+math.cos(a)*r,cy+math.sin(a)*r*.62) for r in range(10,95,2)]; swarm(d,pts,220,1.6,int(a*10))
    d.arc([cx-60,cy-37,cx+60,cy+37],30,80,fill=GOLD,width=2); queen(d,cx,cy,.7); worm(d,40,84,0); comp(im,L); return im
def T_mitosis():
    im,L=FF(66,170,100); d=ImageDraw.Draw(L)
    for (x,y,s) in [(40,30,7),(40,70,7),(110,24,5),(130,46,5),(104,72,5),(140,80,5)]:
        swarm(d,[(x,y)],int(s*20),s*.7,int(x+y))
    for (x0,y0,x1,y1) in [(40,30,40,70),(110,24,130,46),(104,72,140,80)]: d.line([x0,y0,x1,y1],fill=(200,170,255,60))
    worm(d,80,50,0); comp(im,L); return im

W=700
def head(t,sz=26,col=(255,255,255),h=46,bg=(6,4,12)):
    o=Image.new('RGB',(W,h),bg); ImageDraw.Draw(o).text((20,8),t,font=ft(sz),fill=col); return o
def note(t,col=(225,218,240),sz=16,wrap=42):
    ls=textwrap.wrap(t,wrap); o=Image.new('RGB',(W,10+26*len(ls)),(13,10,22)); d=ImageDraw.Draw(o)
    for i,l in enumerate(ls): d.text((22,4+i*26),l,font=ft(sz,False),fill=col)
    return o
def row(frames,caps,n):
    fw=(W-40-10*(n-1))//n; h=int(frames[0].height*fw/frames[0].width)
    o=Image.new('RGB',(W,h+30),(13,10,22)); d=ImageDraw.Draw(o)
    for i,f in enumerate(frames):
        x=20+i*(fw+10); o.paste(f.resize((fw,h),Image.NEAREST).convert('RGB'),(x,0)); d.text((x+6,3),str(i+1),font=ft(15),fill=GOLD)
        d.text((x+fw/2,h+5),caps[i],font=ft(13),fill=WH,anchor='ma')
        if i<n-1: d.text((x+fw+1,h/2),'›',font=ft(18),fill=GOLD,anchor='lm')
    return o
B=[head('한 몸의 무리 — 스킬 시안 2'),head('1. 삼키는 손바닥 — 여러 손이 달려와 하나로 합쳐진다',21,(232,200,255),40,(13,10,22))]
B.append(row([palms(4,0,1,px=75,py=58),palms(4,1,2,px=112,py=26),palms(4,2,3,px=130,py=14),burst(4)],
             ['무리에서 손바닥이 떨어져 나와','나를 노리고 달려온다','한가운데서 합쳐져 꿀꺽','터진 유충은 먹이'],4))
B.append(note('규칙: 손바닥들이 노리는 붉은 원(달려오기 시작할 때 내 위치)을 손이 닫히기 전에 손과 손 사이 틈으로 빠져나간다. 원 안에 남으면 삼켜짐(큰 피해 + 잠깐 못 움직임).'))
B.append(head('손바닥 수는 상황 따라 — 많을수록 틈이 좁고 빠르다',17,GOLD,34,(13,10,22)))
B.append(row([palms(2,1,11,px=75,py=20),palms(3,1,12,px=40,py=30),palms(6,1,13,px=75,py=90)],['2개 — 양쪽에서 박수','3개 — 세모로 조인다','6개 — 2페이즈, 틈이 아주 좁다'],3))
B.append(head('2. 은하 소용돌이 · 유충 비 계열 — 화면 전체를 쓰는 우주형 스킬',21,(232,200,255),46,(13,10,22)))
cands=[('T1 혜성',T_comet,'★★★ ●●●','무리가 꼬리 긴 혜성 셋이 되어 대각선으로 내리꽂힌다. 지나간 꼬리는 잠깐 남아 길을 막음'),
       ('T2 블랙홀 → 초신성',T_hole,'★★★ ●●','한 점으로 빨려 들며 나와 먹이를 끌어당긴다. 버티다가 터지면 틈 있는 고리가 퍼짐'),
       ('T3 행성 고리',T_ring,'★★ ●●●','여왕 둘레에 기울어진 고리 둘이 돈다. 고리 안쪽 빈 곳이 안전, 고리가 기울며 쓸고 지나감'),
       ('T4 밀물',T_tide,'★★ ●●●','유충이 바다처럼 한쪽에서 차오른다. 바위 위가 섬 — 밀려왔다 빠지는 때를 노림'),
       ('T5 펄서',T_pulsar,'★★ ●●●','여왕에서 양쪽으로 뻗은 빛줄기처럼 무리가 늘어서 시계처럼 돈다. 점점 빨라짐'),
       ('T6 세포 분열',T_mitosis,'★★★ ●●','무리가 둘 → 넷 → 여덟로 쪼개지며 쫓아온다. 작은 무리는 물어서 먹을 수 있다')]
cw=(W-40-10)//2
for r in range(3):
    o=Image.new('RGB',(W,cw*100//170+96),(13,10,22)); d=ImageDraw.Draw(o)
    for c in range(2):
        nm,fn,st,ds=cands[r*2+c]; x=20+c*(cw+10); im=fn().resize((cw,cw*100//170),Image.NEAREST).convert('RGB'); o.paste(im,(x,0))
        y=im.height+4; d.text((x,y),nm,font=ft(16),fill=GOLD); d.text((x+cw,y+2),st,font=ft(14),fill=(255,200,220),anchor='ra')
        for i,l in enumerate(textwrap.wrap(ds,23)): d.text((x,y+24+i*20),l,font=ft(13,False),fill=(225,218,240))
    B.append(o)
B.append(note('★ 독특함 · ● 구현 쉬움 (3개 만점) · 이미 고른 것: 은하 소용돌이 · 유충 비',(255,214,140)))
H=sum(b.height for b in B)+16; out=Image.new('RGB',(W,H),(6,4,12)); y=0
for b in B: out.paste(b,(0,y)); y+=b.height
out.save('/home/claude/void-parasite/docs/boss_designs/17_swarm_skills2.png'); print(out.size)
