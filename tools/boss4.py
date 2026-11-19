from PIL import Image, ImageDraw, ImageFont
import math, random, textwrap
F='/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'; FR='/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'
def ft(s,b=True): return ImageFont.truetype(F if b else FR,s,index=1)
RED=(255,70,100); GOLD=(255,224,120); LAV=(201,139,255); WH=(240,236,255)

def canvas(w,h,seed,bg=(11,8,20)):
    random.seed(seed); im=Image.new('RGBA',(w,h),bg+(255,)); d=ImageDraw.Draw(im)
    for x in range(0,w,20): d.line([x,0,x,h],fill=(20,15,32))
    for y in range(0,h,20): d.line([0,y,w,y],fill=(20,15,32))
    for _ in range(w*h//200):
        d.point((random.randrange(w),random.randrange(h)),fill=random.choice([(70,60,100),(120,110,170),(220,215,255)]))
    return im
def lay(im): return Image.new('RGBA',im.size,(0,0,0,0))
def comp(im,L): im.alpha_composite(L)
def worm(d,x,y,a=0):
    for i,r in enumerate([3,2.6,2.2,1.8]):
        px,py=x-math.cos(a)*i*3.4,y-math.sin(a)*i*3.4
        d.ellipse([px-r,py-r*.85,px+r,py+r*.85],fill=(166,92,255) if i==0 else (125,68,205))
    d.point((x+math.cos(a)*1.2,y-1),fill=(255,255,255))
def arrow(d,x0,y0,x1,y1,col=GOLD,w=2):
    d.line([x0,y0,x1,y1],fill=col,width=w); a=math.atan2(y1-y0,x1-x0)
    for s in (2.5,-2.5): d.line([x1,y1,x1+math.cos(a+s)*6,y1+math.sin(a+s)*6],fill=col,width=w)
def bite(d,x,y):
    for r,a0,a1 in [(9,200,340),(9,20,160)]: d.arc([x-r,y-r,x+r,y+r],a0,a1,fill=GOLD,width=2)
def tele_circle(d,x,y,r,ry=None):
    ry=ry or r*.6; d.ellipse([x-r,y-ry,x+r,y+ry],fill=(255,60,90,60),outline=RED,width=1)
def tele_line(d,x0,y0,x1,y1,w):
    a=math.atan2(y1-y0,x1-x0); nx,ny=-math.sin(a)*w/2,math.cos(a)*w/2
    d.polygon([(x0+nx,y0+ny),(x1+nx,y1+ny),(x1-nx,y1-ny),(x0-nx,y0-ny)],fill=(255,60,90,55),outline=RED)
def rift(d,cx,cy,h,w=6,glow=False):
    random.seed(int(cx*13+cy))
    pts=[(cx+(random.random()-.5)*w*1.4*math.sin(math.pi*i/8),cy-h/2+h*i/8) for i in range(9)]
    right=[(x+w*math.sin(math.pi*i/8),y) for i,(x,y) in enumerate(pts)]
    if glow: d.ellipse([cx-w*2.5,cy-h*.62,cx+w*3.5,cy+h*.62],fill=(201,139,255,50))
    d.polygon(pts+right[::-1],fill=(3,1,8,255),outline=LAV)

# ---------------- A 부르는 자의 두 손 ----------------
def hand(d,x,y,s=1.0,ang=-math.pi/2,a=255,shadow=False):
    if shadow:
        d.ellipse([x-28*s,y-13*s,x+28*s,y+13*s],fill=(0,0,0,int(a*.45))); return
    # 크게 벌린 손: 넓은 손바닥 + 부채꼴로 펼친 긴 손가락 4개 + 엄지, 손바닥에 별빛 눈
    ca,sa=math.cos(ang),math.sin(ang)
    P=lambda u,v:(x+(u*ca-v*sa)*s,y+(u*sa+v*ca)*s)
    BODY=(64,46,104,a); EDGE=(200,175,245,a)
    d.line([P(-30,0),P(-10,0)],fill=BODY,width=int(10*s)); d.line([P(-30,-5),P(-10,-5)],fill=EDGE,width=1)  # 손목
    for k,fa in enumerate([-.42,-.14,.14,.42]):
        L=24 if k in (1,2) else 20
        b=P(8,fa*22); m=(b[0]+math.cos(ang+fa*.9)*L*.55*s,b[1]+math.sin(ang+fa*.9)*L*.55*s)
        t=(m[0]+math.cos(ang+fa*1.25)*L*.5*s,m[1]+math.sin(ang+fa*1.25)*L*.5*s)
        d.line([b,m],fill=BODY,width=int(5*s)); d.line([m,t],fill=BODY,width=int(4*s)); d.line([b,m,t],fill=EDGE,width=1)
        d.ellipse([m[0]-1.5,m[1]-1.5,m[0]+1.5,m[1]+1.5],fill=EDGE); d.ellipse([t[0]-2*s,t[1]-2*s,t[0]+2*s,t[1]+2*s],fill=(240,232,255,a))
    tb=P(-4,-15); tm=P(4,-27); d.line([tb,tm],fill=BODY,width=int(5*s)); d.line([tb,tm],fill=EDGE,width=1)
    d.ellipse([P(0,0)[0]-14*s,P(0,0)[1]-14*s,P(0,0)[0]+14*s,P(0,0)[1]+14*s],fill=(42,28,74,a),outline=EDGE)
    c=P(0,0); d.ellipse([c[0]-6*s,c[1]-4*s,c[0]+6*s,c[1]+4*s],fill=(8,3,18,a),outline=(255,180,230,a)); d.line([c[0],c[1]-3*s,c[0],c[1]+3*s],fill=(255,110,165,a),width=1)
def mask(d,x,y,s=1.0,a=255,cracked=False):
    d.polygon([(x-14*s,y+6*s),(x,y+34*s),(x+14*s,y+6*s)],fill=(20,12,40,a))  # 별빛 후드
    for _ in range(14): d.point((x+random.uniform(-9,9)*s,y+random.uniform(8,28)*s),fill=(220,210,255,a))
    d.ellipse([x-11*s,y-15*s,x+11*s,y+12*s],fill=(232,226,245,a),outline=(150,130,200,a))
    d.line([x,y-12*s,x,y+8*s],fill=(120,90,170,a),width=1)
    if cracked: d.line([x-6*s,y-10*s,x-1*s,y-2*s,x-5*s,y+6*s],fill=(255,90,140,a),width=1)
def A_main():
    im=canvas(330,170,21); L=lay(im); d=ImageDraw.Draw(L)
    mask(d,165,38)
    # 왼손: 내려찍기 (그림자 예고 + 위에서 떨어지는 모습)
    tele_circle(d,90,128,30,15); hand(d,90,128,1.0,shadow=True,a=200)
    for k,yy in enumerate([66,84]): hand(d,90,yy,1.0,math.pi/2,a=60+k*50)
    hand(d,90,102,1.05,math.pi/2)
    for dx in (-30,30): d.line([90+dx,70,90+dx,96],fill=(255,255,255,90),width=1)
    # 오른손: 쓸기 (오른쪽→왼쪽 잔상)
    tele_line(d,315,118,190,118,26)
    for k,xx in enumerate([300,272]): hand(d,xx,118,1.0,math.pi,a=50+k*45)
    hand(d,240,118,1.0,math.pi)
    arrow(d,222,138,196,138,RED)
    worm(d,150,150,-.3)
    comp(im,L); return im
def A_frames():
    out=[]
    im=canvas(140,90,31); L=lay(im); d=ImageDraw.Draw(L)  # 1 그림자 → 쾅
    tele_circle(d,70,62,26,13); hand(d,70,62,.8,shadow=True,a=220); hand(d,70,30,.8,math.pi/2,a=150); arrow(d,70,12,70,24,WH,1); worm(d,30,78,0)
    comp(im,L); out.append((im,'그림자가 커지면 비켜!'))
    im=canvas(140,90,32); L=lay(im); d=ImageDraw.Draw(L)  # 2 움켜쥐기
    for k,xx in enumerate([120,100]): hand(d,xx,50,.8,math.pi,a=50+k*50)
    hand(d,80,50,.8,math.pi); worm(d,40,52,0); arrow(d,58,72,36,72,RED)
    comp(im,L); out.append((im,'손이 쫓아와 움켜쥔다'))
    im=canvas(140,90,33); L=lay(im); d=ImageDraw.Draw(L)  # 3 손이 박힘 → 가면이 내려옴
    hand(d,30,62,.75,math.pi/2); hand(d,110,62,.75,math.pi/2)
    for x in (30,110): d.text((x-4,72),'×',fill=WH)
    mask(d,70,40,.75,cracked=True); worm(d,70,78,-math.pi/2); bite(d,70,58)
    comp(im,L); out.append((im,'손이 박히면 가면을 문다'))
    return out

# ---------------- B 균열을 달리는 지네 ----------------
def centi(d,pts,a=255,glow_tail=True):
    n=len(pts)
    for i in range(n-1,-1,-1):
        x,y=pts[i]; nx,ny=pts[max(0,i-1)]; ang=math.atan2(y-ny,x-nx)+math.pi/2
        r=6.5 if i else 8
        for s in (-1,1):
            lx,ly=x+math.cos(ang)*s*(r+5),y+math.sin(ang)*s*(r+5)
            d.line([x,y,lx,ly+2],fill=(150,120,200,a),width=1)
        tail=glow_tail and i>=n-2
        d.ellipse([x-r,y-r*.8,x+r,y+r*.8],fill=((255,170,90,a) if tail else (52,36,86,a)),outline=(190,160,240,a))
        if i and not tail: d.line([x-r*.6,y,x+r*.6,y],fill=(110,90,160,a))
    hx,hy=pts[0]; ax,ay=pts[1]; ang=math.atan2(hy-ay,hx-ax)
    for s in (-.5,.5): d.line([hx,hy,hx+math.cos(ang+s)*12,hy+math.sin(ang+s)*12],fill=(240,230,255,a),width=2)
    d.ellipse([hx-3,hy-2,hx+3,hy+2],fill=(255,80,120,a))
def path(cx,cy,R,ry,a0,a1,n):
    return [(cx+math.cos(a0+(a1-a0)*i/(n-1))*R,cy+math.sin(a0+(a1-a0)*i/(n-1))*ry) for i in range(n)]
def B_main():
    im=canvas(330,170,41); L=lay(im); d=ImageDraw.Draw(L)
    rift(d,40,60,50,7,True); rift(d,290,120,50,7,True); rift(d,250,30,34,5)
    # 왼쪽 균열에서 튀어나와 방을 가로질러 크게 휘어 돈다
    pts=path(165,95,115,62,math.pi*0.98,math.pi*0.18,15)[::-1]
    for k in range(3):
        g=[(x+ (2-k)*10,y-(2-k)*3) for x,y in pts[:6]]
    centi(d,pts,glow_tail=False)
    for i in range(1,5):
        x,y=pts[i]; d.line([x+10,y-12,x+22,y-16],fill=(255,255,255,70),width=1)
    # 다음 돌진 예고 (붉은 직선)
    tele_line(d,290,120,40,140,18); worm(d,150,58,.4)
    comp(im,L); return im
def B_frames():
    out=[]
    im=canvas(140,90,51); L=lay(im); d=ImageDraw.Draw(L)
    rift(d,25,45,40,6,True); rift(d,115,45,40,6,True); d.text((104,12),'!',fill=RED); tele_line(d,115,45,25,45,14); worm(d,70,76,0)
    comp(im,L); out.append((im,'균열이 빛나면 그 줄을 비켜!'))
    im=canvas(140,90,52); L=lay(im); d=ImageDraw.Draw(L)
    rift(d,25,45,40,6); rift(d,115,45,40,6)
    centi(d,[(40+i*11,45) for i in range(7)],glow_tail=False)
    for x in (100,108,116): d.line([x,38,x+8,38],fill=(255,255,255,90)); d.line([x,52,x+8,52],fill=(255,255,255,90))
    worm(d,70,78,0); comp(im,L); out.append((im,'쏜살같이 가로지른다'))
    im=canvas(140,90,53); L=lay(im); d=ImageDraw.Draw(L)
    for y in range(10,80,6): d.line([130,y,136,y+3],fill=(150,140,200))
    centi(d,[(126-i*10,40+ (i%2)*3) for i in range(8)])
    d.text((112,20),'쾅',fill=WH,font=ft(11)); worm(d,48,58,-.6); bite(d,56,48)
    comp(im,L); out.append((im,'벽에 박히면 빛나는 꼬리를 문다'))
    return out

# ---------------- C 한 몸의 무리 ----------------
def swarm(d,pts,n,spread,seed,col=((120,230,150),(160,110,240)),a=255):
    random.seed(seed)
    for _ in range(n):
        x,y=random.choice(pts); x+=random.gauss(0,spread); y+=random.gauss(0,spread*.7)
        c=random.choice(col); d.ellipse([x-1.3,y-1,x+1.3,y+1],fill=c+(a,))
def queen(d,x,y,s=1):
    d.ellipse([x-9*s,y-6*s,x+9*s,y+6*s],fill=(255,190,90),outline=(255,240,200)); d.ellipse([x-3*s,y-2*s,x+3*s,y+2*s],fill=(120,40,10))
def C_main():
    im=canvas(330,170,61); L=lay(im); d=ImageDraw.Draw(L)
    # 무리가 거대한 주먹(화살촉) 모양으로 뭉쳐 플레이어에게 돌진 — 뒤로 흐르는 꼬리
    tip=(110,100); pts=[]
    for i in range(40):
        t=i/39; pts.append((tip[0]+t*60,tip[1]+(random.random()-.5)*60*t))
    tail=[(170+i*4,100+math.sin(i/3)*12) for i in range(36)]
    tele_line(d,110,100,30,120,30)
    swarm(d,pts,520,3,1); swarm(d,tail,300,4,2,a=180)
    for y in (88,100,112): d.line([60,y+8,90,y+4],fill=(255,255,255,80))
    worm(d,40,124,-.2); queen(d,200,98,.8)
    d.text((186,72),'여왕',fill=GOLD,font=ft(11))
    comp(im,L); return im
def C_frames():
    out=[]
    im=canvas(140,90,71); L=lay(im); d=ImageDraw.Draw(L)
    wave=[(20+i*2.4,30+math.sin(i/6)*8) for i in range(45)]; swarm(d,wave,300,2.5,3); arrow(d,70,46,70,62,RED); tele_line(d,10,60,130,60,10); worm(d,70,80,-math.pi/2)
    comp(im,L); out.append((im,'파도 — 붉은 줄 밖으로'))
    im=canvas(140,90,72); L=lay(im); d=ImageDraw.Draw(L)
    ring=[(70+math.cos(a)*42,46+math.sin(a)*28) for a in [i/60*6.283 for i in range(60)] if not (-.35<a<.35)]
    swarm(d,ring,380,2,4); worm(d,70,46,0); arrow(d,80,46,118,46,GOLD)
    comp(im,L); out.append((im,'고리 — 열린 틈으로 탈출'))
    im=canvas(140,90,73); L=lay(im); d=ImageDraw.Draw(L)
    sc=[(random.uniform(10,130),random.uniform(10,80)) for _ in range(30)]; swarm(d,sc,200,4,5,a=150)
    queen(d,70,44,1.1); worm(d,48,56,-.5); bite(d,60,48)
    comp(im,L); out.append((im,'흩어진 틈에 여왕을 문다'))
    return out

K=2
def panel(title,one,rule,main,frames,pats,ph2):
    W=main.width*K+40
    lines=[]
    o=Image.new('RGB',(W,2000),(13,10,22)); d=ImageDraw.Draw(o)
    d.text((20,14),title,font=ft(30),fill=(232,200,255)); d.text((20,56),one,font=ft(18,False),fill=(255,214,140))
    o.paste(main.resize((main.width*K,main.height*K),Image.NEAREST).convert('RGB'),(20,90)); y=90+main.height*K+10
    fw=(W-40-2*10)//3
    for i,(f,cap) in enumerate(frames):
        fi=f.resize((fw,int(f.height*fw/f.width)),Image.NEAREST).convert('RGB'); x=20+i*(fw+10)
        o.paste(fi,(x,y)); d.text((x+6,y+4),str(i+1),font=ft(18),fill=GOLD)
        d.text((x+fw/2,y+fi.height+6),cap,font=ft(15),fill=WH,anchor='ma')
        if i<2: d.text((x+fw+1,y+fi.height/2),'›',font=ft(22),fill=GOLD,anchor='lm')
    y+=fi.height+36
    d.rectangle([20,y,W-20,y+40],fill=(44,30,20)); d.text((32,y+8),'규칙 한 줄 — '+rule,font=ft(18),fill=GOLD); y+=52
    for p in pats: d.text((22,y),p,font=ft(17,False),fill=(225,218,240)); y+=30
    d.rectangle([20,y+4,W-20,y+70],fill=(30,22,48)); d.text((32,y+10),'2페이즈',font=ft(18),fill=(255,150,180))
    for n,ln in enumerate(textwrap.wrap(ph2,36)): d.text((112,y+10+n*26),ln,font=ft(17,False),fill=(235,225,250))
    return o.crop((0,0,W,y+86))

PA=panel('A  부르는 자의 두 손','얼굴 없는 가면(부르는 자)이 거대한 두 손으로 방 전체를 휘젓는다',
  '손을 피하고, 손이 박히면 가면을 문다',A_main(),A_frames(),
  ['① 내려찍기 — 그림자 원이 커진 자리에 쾅','② 쓸기 — 손바닥이 한쪽 끝에서 끝까지 쓸고 지나간다','③ 움켜쥐기 — 손이 쫓아오다 움켜쥔다 (옆으로 꺾으면 빗나감)'],
  '가면이 깨지며 손이 넷으로 — 두 손씩 번갈아 박수 치듯 마주 친다(사이 줄을 비킬 것)')
PB=panel('B  균열을 달리는 지네','방 곳곳의 공허 균열을 드나들며 방을 가로질러 내달리는 거대 지네',
  '균열 빛을 보고 줄을 비키고, 벽에 박히면 꼬리를 문다',B_main(),B_frames(),
  ['① 돌진 — 빛나는 균열에서 반대편 균열로 직선으로 내달린다','② 휘감기 — 방 가장자리를 크게 돌며 원을 좁힌다','③ 꼬리 채찍 — 지나간 뒤 꼬리가 옆으로 휩쓴다'],
  '균열이 늘어나 두 마리(머리 둘)가 엇갈려 달린다 — 한쪽 꼬리를 물면 다른 쪽이 화나서 빨라진다')
PC=panel('C  한 몸의 무리','수백 마리 공허 유충이 한 몸처럼 흘러 다니며 모양을 바꾼다 (속에 여왕 하나)',
  '무리가 만든 모양을 보고 피하고, 흩어지면 여왕을 문다',C_main(),C_frames(),
  ['① 주먹 — 뭉쳐서 화살촉처럼 돌진','② 파도·고리 — 줄로 쓸거나 나를 둘러싸 좁힌다 (틈이 있다)','③ 떨어진 유충은 먹이 — 물어 먹으면 에너지가 차고 무리가 줄어든다'],
  '여왕이 무리를 몸에 입어 거대한 유충이 된다 — 몸을 흔들 때마다 조각이 떨어져 작은 무리로 다시 덮친다')
o=Image.new('RGB',(PA.width,PA.height+PB.height+PC.height+70),(6,4,12)); d=ImageDraw.Draw(o)
d.text((20,12),'최종 보스 다시 — 크게 움직이고, 보면 바로 아는 공격',font=ft(24),fill=(255,255,255))
y=56
for p in (PA,PB,PC): o.paste(p,(0,y)); y+=p.height+6
o.save('/home/claude/void-parasite/docs/boss_designs/13-15_hands_centipede_swarm.png'); print(o.size)
