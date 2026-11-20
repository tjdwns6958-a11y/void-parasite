from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, random
src=open('/home/claude/void-parasite/tools/boss4.py').read(); exec(src[:src.index('# ---------------- A')])
src2=src[src.index('# ---------------- C'):src.index('K=2')]; exec(src2[:src2.index('def C_main')])
W0,H0=150,96
def fr(seed,bg=(11,8,20)): im=canvas(W0,H0,seed,bg); return im,lay(im)
SKY0,SKY1=(110,160,235),(250,232,190)
def sky(w=W0,h=H0):
    s=Image.new('RGBA',(w,h)); d=ImageDraw.Draw(s)
    for y in range(h):
        t=y/h; d.line([0,y,w,y],fill=tuple(int(SKY0[i]+(SKY1[i]-SKY0[i])*t) for i in range(3))+(255,))
    pts=[(0,h*.78)]+[(x,h*.72+4*math.sin(x/9)) for x in range(0,w+6,6)]+[(w,h),(0,h)]
    d.polygon(pts,fill=(70,120,90,255)); d.ellipse([w*.58,h*.18,w*.58+9,h*.18+9],fill=(255,246,214,255))
    return s
def eye(cx,cy,hh,ww,n=40):  # 세로로 긴 눈(렌즈) 모양
    L=[(cx-ww*math.sin(math.pi*i/n),cy-hh+2*hh*i/n) for i in range(n+1)]
    R=[(cx+ww*math.sin(math.pi*i/n),cy-hh+2*hh*i/n) for i in range(n+1)]
    return L+R[::-1]
def paste_sky(im,poly):
    m=Image.new('L',im.size,0); ImageDraw.Draw(m).polygon(poly,fill=255); im.paste(sky(*im.size),(0,0),m)
# ---- 무리로 만든 손 (게임 속 손과 같은 방식: 유충 점들이 손 모양으로 뭉침) ----
FING=[(-7.5,-8,15,-.22),(-2.6,-10.5,18,-.07),(2.6,-10.5,17,.07),(7.5,-8,14,.22),(10.5,2,11,1.15)]
def palm_pts(cx,cy,s=1,ang=0,spread=1.0,curl=0.0,seed=0):
    random.seed(seed); pts=[]
    for _ in range(70):
        a=random.random()*6.283; r=math.sqrt(random.random()); pts.append((math.cos(a)*10*r,math.sin(a)*10*r+1))
    for bx,by,L,fa in FING:
        fa*=spread; L*=1-curl*.55
        for i in range(16):
            t=i/15; pts.append((bx+math.sin(fa)*t*L,by-math.cos(fa)*t*L))
    ca,sa=math.cos(ang),math.sin(ang)
    return [(cx+(u*ca-v*sa)*s,cy+(u*sa+v*ca)*s) for u,v in pts]
def phand(d,cx,cy,s=1,ang=0,spread=1.0,curl=0,seed=0,n=None,a=255,outline=False):
    P=palm_pts(cx,cy,s,ang,spread,curl,seed)
    if outline:
        for x,y in P[::2]: d.point((x,y),fill=(255,90,120,90))
    swarm(d,P,n or int(160*s),.6*s,seed,a=a)
def tips(cx,cy,s,ang,spread=1.0):
    out=[]
    for bx,by,L,fa in FING:
        fa*=spread; u,v=bx+math.sin(fa)*L,by-math.cos(fa)*L; ca,sa=math.cos(ang),math.sin(ang); out.append((cx+(u*ca-v*sa)*s,cy+(u*sa+v*ca)*s))
    return out
def glow(d,x,y,r,col=GOLD,a=90):
    for k in (2,1,0): rr=r*(1+k*.6); d.ellipse([x-rr,y-rr,x+rr,y+rr],fill=col+(int(a/(k+1)),))
def rays(im,cx,cy,angs,L=130,w=7,col=(255,236,180),bl=3):
    from PIL import ImageChops
    r=Image.new('RGB',im.size,(0,0,0));d=ImageDraw.Draw(r)
    for a in angs: d.line([cx,cy,cx+math.sin(a)*L,cy+math.cos(a)*L],fill=tuple(int(c*.45) for c in col),width=w)
    r=r.filter(ImageFilter.GaussianBlur(bl));rgb=ImageChops.add(im.convert('RGB'),r);im.paste(rgb.convert('RGBA'),(0,0))
def shake(d,x,y,r=16):
    for a in (0,1.57,3.14,4.71,.78,2.35,3.93,5.5):
        d.line([x+math.cos(a)*r,y+math.sin(a)*r*.7,x+math.cos(a)*(r+5),y+math.sin(a)*(r+5)*.7],fill=WH+(200,),width=1)

# =================== ① 손바닥 개편 ===================
def P1():  # 쓸어 가는 거대한 손 (갈퀴)
    out=[];lanes=[16,32,48,64,80]
    for k,cap in enumerate(['화면 끝에 거대한 손 — 손가락 다섯 줄 예고','손가락이 바닥을 긁으며 쓸고 간다','틈에서 버티면 손이 주먹 쥐며 물러난다']):
        im,L=fr(110+k);d=ImageDraw.Draw(L)
        if k==0:
            for y in lanes: tele_line(d,150,y,0,y,9)
            for y in lanes[:-1]: d.line([0,y+8,150,y+8],fill=GOLD+(140,),width=1)
            phand(d,150,48,3.2,-math.pi/2,1.0,0,seed=1,n=360)
        elif k==1:
            hx=68
            for i,y in enumerate(lanes): swarm(d,[(x,y) for x in range(hx-26+(abs(i-2))*4,152,3)],70,1.4,i)
            swarm(d,[(x,48+v) for x in range(hx+8,152,4) for v in range(-30,31,6)],160,2,9)
            for i,y in enumerate(lanes): arrow(d,hx-24+abs(i-2)*4,y,hx-36+abs(i-2)*4,y,RED,1)
            worm(d,40,56,0)
        else:
            phand(d,140,48,2.6,-math.pi/2,.4,.9,seed=3,n=260)
            for y in lanes: d.line([0,y,96,y],fill=(255,80,110,40),width=1)
            worm(d,40,56,0);d.ellipse([33,48,47,64],outline=GOLD)
        comp(im,L);out.append((im,cap))
    return out
def palm_lines(cx,cy,s):  # 손금 3줄 (생명선·두뇌선·감정선)
    f=lambda pts:[(cx+u*s,cy+v*s) for u,v in pts]
    life=f([(-2,-6),(-6,-2),(-8,3),(-7,8),(-3,11)]); head=f([(-8,-3),(-3,-1),(2,1),(8,3)]); heart=f([(9,-5),(4,-7),(-1,-7),(-5,-8)])
    return [life,head,heart]
def P2():  # 손금 폭발
    out=[];cx,cy,s=75,60,2.3
    for k,cap in enumerate(['바닥에 거대한 손바닥 도장이 찍힌다','손금이 한 줄씩 붉게 빛나다 터진다','손가락 끝 다섯 곳이 마지막으로 터진다']):
        im,L=fr(120+k);d=ImageDraw.Draw(L)
        P=palm_pts(cx,cy,s,0,1.0,0,seed=5)
        for x,y in P: d.ellipse([x-1,y-1,x+1,y+1],fill=(120,80,200,150))
        lines=palm_lines(cx,cy,s)
        for i,ln in enumerate(lines):
            if k==0: d.line(ln,fill=(200,170,255,160),width=1)
            elif k==1:
                if i==0: d.line(ln,fill=RED+(255,),width=5);swarm(d,ln,90,2.4,i,col=((255,120,140),(255,220,160)))
                elif i==1: d.line(ln,fill=RED+(200,),width=3)
                else: d.line(ln,fill=(200,170,255,160),width=1)
            else: d.line(ln,fill=(90,60,130,200),width=2)
        if k==1: worm(d,cx+12,cy+20,-1.0)
        if k==2:
            for x,y in tips(cx,cy,s,0): tele_circle(d,x,y,9,7);swarm(d,[(x,y)],22,2.5,int(x),col=((255,120,140),(255,220,160)))
            worm(d,cx-6,cy+12,-1.2);d.text((cx-26,cy+24),'터진 손금 = 안전',font=ft(8),fill=GOLD+(255,))
        comp(im,L);out.append((im,cap))
    return out
def P3():  # 깍지 박수
    out=[]
    for k,cap in enumerate(['양옆에서 두 손이 나를 겨눈다','박수! 손가락이 서로 깍지 낀다','깍지 사이 빈칸에 서면 산다']):
        im,L=fr(130+k);d=ImageDraw.Draw(L);cy=50
        if k==0:
            d.rectangle([0,cy-24,150,cy+24],fill=(255,60,90,40),outline=RED)
            phand(d,8,cy,2.6,math.pi/2,1.0,0,seed=6,n=230);phand(d,142,cy,2.6,-math.pi/2,1.0,0,seed=7,n=230)
            worm(d,80,cy+4,0)
            for yy in (cy-15,cy-3,cy+9): d.ellipse([72,yy-3,80,yy+3],outline=GOLD)
        else:
            gx=[75]
            ys=[cy-18,cy-6,cy+6,cy+18]
            for i,y in enumerate(ys):  # 왼손 손가락(→)과 오른손 손가락(←)이 번갈아
                if i%2==0: swarm(d,[(x,y) for x in range(20 if k==2 else 34,96)],60,1.0,i)
                else: swarm(d,[(x,y) for x in range(56,132 if k==2 else 118)],60,1.0,i+9)
            swarm(d,[(x,cy+v) for x in range(0,26) for v in range(-20,21,5)],120,2,3);swarm(d,[(x,cy+v) for x in range(124,150) for v in range(-20,21,5)],120,2,4)
            if k==1:
                arrow(d,30,cy-30,48,cy-30,RED);arrow(d,120,cy+30,102,cy+30,RED)
                for yy in (cy-12,cy,cy+12): d.rectangle([62,yy-2,88,yy+2],outline=GOLD)
            else:
                shake(d,75,cy,30)
                for yy in (cy-12,cy,cy+12): d.rectangle([60,yy-2,90,yy+2],fill=GOLD+(50,))
                worm(d,78,cy,0)
        comp(im,L);out.append((im,cap))
    return out
def P4():  # 기어 오는 손
    out=[]
    for k,(hx,cap) in enumerate([(116,'손가락 끝으로 거미처럼 걸어 온다'),(84,'손끝이 찍힐 자리에 붉은 원 — 쿵쿵쿵'),(70,'세 걸음 뒤 엎드려 쉰다 — 빛나는 손등을 물 것')]):
        im,L=fr(140+k);d=ImageDraw.Draw(L);cy=50
        if k<2:
            T=tips(hx,cy,1.7,-math.pi/2,1.25)
            if k==1:
                for x,y in tips(hx-20,cy,1.7,-math.pi/2,1.25): tele_circle(d,x,y,6,4)
            for x,y in T: swarm(d,[(x,y)],18,1.2,int(x*7))
            phand(d,hx,cy,1.7,-math.pi/2,1.25,.35,seed=8+k,n=220)
            arrow(d,hx+30,cy+36,hx+12,cy+36,RED)
            worm(d,18 if k==0 else 26,84,0)
        else:
            phand(d,hx,cy,2.4,-math.pi/2,1.0,0,seed=10,n=300)
            glow(d,hx+4,cy,6);bite(d,hx-8,cy);worm(d,hx-14,cy,0)
            d.text((hx-4,cy+22),'약점',font=ft(9),fill=GOLD+(255,))
        comp(im,L);out.append((im,cap))
    return out

# =================== ② 엔딩 직전 연출 ===================
def E1():  # 빨려 드는 정적
    out=[]
    im,L=fr(200);d=ImageDraw.Draw(L)
    for a_ in range(5):
        pts=[(75+math.cos(r*.09+a_*1.256)*r,48+math.sin(r*.09+a_*1.256)*r*.62) for r in range(4,80,2)]
        swarm(d,pts,90,1.0,a_)
    queen(d,75,48,.5);worm(d,22,80,0);comp(im,L);out.append((im,'무리가 소용돌이치며 여왕 한 점으로'))
    im=Image.new('RGBA',(W0,H0),(2,1,5,255));d=ImageDraw.Draw(im)
    glow(d,75,48,2,WH,140);d.point((75,48),fill=(255,255,255));worm(d,22,80,0)
    d.text((75,70),'· · ·',font=ft(10),fill=(150,140,180),anchor='mm');out.append((im,'모든 빛이 꺼진다 — 0.6초 정적'))
    im,L=fr(202,(4,2,9));paste_sky(im,eye(75,48,40,16));d=ImageDraw.Draw(im)
    d.polygon(eye(75,48,40,16),outline=(255,236,190));worm(d,22,80,0);out.append((im,'그 점이 세로로 찢어지며 천천히 열린다'))
    return out
def cracks(d,cx,cy,n,L,seed,col=(230,225,255,230)):
    random.seed(seed);segs=[]
    for i in range(n):
        a=i/n*6.283+random.random()*.4;x,y=cx,cy
        for j in range(5):
            a+=random.uniform(-.4,.4);l=L/5*random.uniform(.7,1.3);x2,y2=x+math.cos(a)*l,y+math.sin(a)*l*.7
            d.line([x,y,x2,y2],fill=col,width=1);segs.append((x2,y2));x,y=x2,y2
    return segs
def E2():  # 유리 공허가 깨진다
    out=[]
    im,L=fr(210);d=ImageDraw.Draw(L)
    swarm(d,[(75+math.cos(a/10)*18,48+math.sin(a/10)*12) for a in range(63)],120,3,2);queen(d,75,48,.5)
    cracks(d,75,48,7,30,1);worm(d,22,80,0);comp(im,L);out.append((im,'무리가 굳고, 공허에 금이 간다'))
    im,L=fr(211);s=sky()
    random.seed(4);holes=[]
    for (x,y) in [(60,30),(92,36),(78,62),(48,56),(104,64)]:
        poly=[(x+math.cos(a)*random.uniform(9,15),y+math.sin(a)*random.uniform(7,12)) for a in [i*1.2566+random.random()*.3 for i in range(5)]];holes.append(poly)
    m=Image.new('L',im.size,0);md=ImageDraw.Draw(m)
    for p in holes: md.polygon(p,fill=255)
    im.paste(s,(0,0),m);d=ImageDraw.Draw(L);cracks(d,75,48,9,70,1)
    for i,p in enumerate(holes[:3]):
        q=[(x+(i-1)*4,y+16+i*4) for x,y in p];d.polygon(q,fill=(30,22,52,230),outline=(200,190,240,255))
        arrow(d,sum(x for x,_ in q)/5,max(y for _,y in q)+1,sum(x for x,_ in q)/5,max(y for _,y in q)+7,WH,1)
    worm(d,22,80,0);comp(im,L);out.append((im,'조각이 떨어지며 바깥 하늘이 보인다'))
    im=sky().copy();L=lay(im);d=ImageDraw.Draw(L)
    for (x,y,r) in [(20,70,8),(118,82,6),(70,90,7)]:
        d.polygon([(x-r,y-r*.4),(x+r*.3,y-r),(x+r,y+r*.2),(x-r*.2,y+r*.7)],fill=(30,22,52,230),outline=(200,190,240,255))
    d.polygon([(0,0),(28,0),(14,14),(0,22)],fill=(14,10,26,255));d.polygon([(150,0),(124,0),(140,18)],fill=(14,10,26,255))
    worm(d,74,70,0);comp(im,L);out.append((im,'마지막 조각이 떨어지면 엔딩'))
    return out
def E3():  # 금빛 먼지와 빛의 커튼
    out=[];GD=((255,224,120),(255,200,90),(255,246,200))
    im,L=fr(220);d=ImageDraw.Draw(L)
    swarm(d,[(75+math.cos(a/10)*24,52+math.sin(a/10)*16) for a in range(63)],90,4,2)
    swarm(d,[(75+math.cos(a/10)*30,40+math.sin(a/10)*14-a/3) for a in range(63)],120,3,3,col=GD)
    for x in (52,66,88,100): d.line([x,30,x,16],fill=GOLD+(120,),width=1)
    queen(d,75,52,.5);worm(d,22,80,0);comp(im,L);out.append((im,'무리가 금빛 먼지로 바스러져 떠오른다'))
    im,L=fr(221);d=ImageDraw.Draw(L)
    swarm(d,[(75,y) for y in range(4,92)],140,1.2,4,col=GD);d.line([75,4,75,92],fill=(255,250,225,255),width=1)
    worm(d,22,80,0);comp(im,L);rays(im,75,48,(-.5,-.25,.25,.5,2.64,2.9,3.38,3.64),90,4);out.append((im,'먼지가 모여 한 줄기 빛이 된다'))
    im,L=fr(222);paste_sky(im,[(52,0),(98,0),(98,96),(52,96)]);d=ImageDraw.Draw(L)
    for x0,sg in ((52,-1),(98,1)):
        for j in range(6): d.line([x0+sg*j*3,0,x0+sg*j*3+sg*4*math.sin(j),96],fill=(255,224,120,200-j*30),width=2)
    worm(d,75,74,-1.57);comp(im,L);rays(im,75,-10,(-.6,-.3,0,.3,.6),140,8);out.append((im,'빛의 커튼이 양옆으로 걷힌다 — 흰 번쩍임 없이'))
    return out
def E4():  # 눈이 뜨인다
    out=[]
    im,L=fr(230);d=ImageDraw.Draw(L)
    random.seed(9)
    for i in range(70):
        x=random.uniform(30,120);y=random.uniform(30,90);a=(140+int(115*(1-(y-30)/60)))
        d.ellipse([x-1.3,y-1,x+1.3,y+1],fill=random.choice([(120,230,150),(160,110,240)])+(a,))
    for x in (40,70,100): arrow(d,x,30,x+3,42,(160,150,200),1)
    queen(d,75,60,.4);worm(d,22,80,0);comp(im,L);out.append((im,'무리가 낙엽처럼 흩어져 가라앉는다'))
    im,L=fr(231,(4,2,9));paste_sky(im,eye(75,48,34,3));d=ImageDraw.Draw(L)
    d.polygon(eye(75,48,34,3),outline=(255,236,190,255));d.arc([60,10,90,86],100,260,fill=(201,139,255,160))
    d.text((96,40),'깜빡',font=ft(9),fill=(220,210,255,255));d.text((96,52),'깜빡',font=ft(9),fill=(220,210,255,200))
    worm(d,22,80,0);comp(im,L);out.append((im,'공허에 세로 눈이 생겨 두 번 깜빡인다'))
    im,L=fr(232,(4,2,9));d=ImageDraw.Draw(L);E=eye(75,48,46,40)
    d.polygon(E,fill=(235,226,250,255),outline=(201,139,255,255))
    m=Image.new('L',im.size,0);ImageDraw.Draw(m).ellipse([53,26,97,70],fill=255);comp(im,L);im.paste(sky(),(0,0),m)
    L=lay(im);d=ImageDraw.Draw(L);d.ellipse([53,26,97,70],outline=(120,70,200,255),width=2)
    for k in range(4): d.arc([40-k*6,14-k*6,110+k*6,82+k*6],200,240,fill=(255,255,255,90))
    worm(d,75,58,-1.57);comp(im,L);out.append((im,'눈이 뜨이고 — 눈동자 속 바깥세상으로'))
    return out

WW=700
def head(t,sz=24,col=(255,255,255),h=44,bg=(6,4,12)):
    o=Image.new('RGB',(WW,h),bg);ImageDraw.Draw(o).text((18,8),t,font=ft(sz),fill=col);return o
def note(t,h=30):
    o=Image.new('RGB',(WW,h),(13,10,22));ImageDraw.Draw(o).text((20,6),t,font=ft(13,False),fill=(200,190,230));return o
def row(title,sub,frames):
    fw=(WW-40-20)//3;h=int(H0*fw/W0)
    o=Image.new('RGB',(WW,h+86),(13,10,22));d=ImageDraw.Draw(o);d.text((20,6),title,font=ft(18),fill=GOLD);d.text((20,32),sub,font=ft(13,False),fill=(225,218,240))
    for i,(f,cap) in enumerate(frames):
        x=20+i*(fw+10);o.paste(f.resize((fw,h),Image.NEAREST).convert('RGB'),(x,56));d.text((x+5,59),str(i+1),font=ft(14),fill=GOLD);d.text((x+fw/2,56+h+4),cap,font=ft(12),fill=WH,anchor='ma')
        if i<2:d.text((x+fw+1,56+h/2),'›',font=ft(18),fill=GOLD,anchor='lm')
    return o
def sheet(blocks,path):
    H=sum(b.height for b in blocks)+10;out=Image.new('RGB',(WW,H),(6,4,12));y=0
    for b in blocks: out.paste(b,(0,y));y+=b.height
    out.save(path);print(path,out.size)
sheet([head('엔딩 직전 연출 — 「펑」 대신 고를 4가지'),
   note('지금: 여왕이 하얗게 부풀며 펑 + 금빛 고리 + 마지막 흰 번쩍임 → 이 세 가지를 통째로 바꿉니다'),
   row('E1  빨려 드는 정적','터지는 대신 안으로 빨려 든다. 빛이 다 꺼진 짧은 정적 뒤 한 점이 세로로 찢어지며 바깥이 열린다',E1()),
   row('E2  유리 공허가 깨진다','화면 전체가 유리처럼 금 가고, 조각이 하나씩 떨어지며 그 뒤의 바깥 하늘이 드러난다',E2()),
   row('E3  금빛 먼지와 빛의 커튼','무리가 먼지처럼 바스러져 떠오르고, 모인 빛이 커튼처럼 양옆으로 걷힌다 (가장 조용하고 부드러움)',E3()),
   row('E4  눈이 뜨인다','무리는 낙엽처럼 가라앉고, 공허에 생긴 세로 눈이 깜빡이다 뜨인다 — 눈동자가 바깥세상',E4())],
   '/home/claude/void-parasite/docs/boss_designs/20_ending_burst_options.png')
sheet([head('손바닥 공격 개편 — 4가지 기술 (여러 개 골라도 됩니다)'),
   note('지금: 달려와 합쳐지기 · 내려 누르기 · 밑에서 잡아채기 → 골라 주신 것으로 바꾸거나 섞습니다'),
   row('P1  쓸어 가는 거대한 손','화면 끝에서 손이 나와 손가락 다섯 줄로 바닥을 쓸고 간다 — 손가락 사이 틈 줄에 설 것 · 2페이즈엔 양쪽에서',P1()),
   row('P2  손금 폭발','바닥 전체에 손바닥 도장 → 손금이 한 줄씩 터지고 마지막엔 손끝 다섯 곳 — 이미 터진 줄 위로 옮겨 다닐 것',P2()),
   row('P3  깍지 박수','양옆의 두 손이 나를 향해 박수 치며 손가락이 깍지 낀다 — 깍지 사이 빈칸(금색)에 정확히 설 것',P3()),
   row('P4  기어 오는 손','손이 손가락 끝으로 거미처럼 걸어와 쿵쿵 찍는다 — 세 걸음 뒤 엎드려 쉬면 빛나는 손등을 물어 큰 피해',P4())],
   '/home/claude/void-parasite/docs/boss_designs/21_palm_overhaul_options.png')
