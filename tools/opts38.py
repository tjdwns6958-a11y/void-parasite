from PIL import Image, ImageDraw, ImageFont
import math, random, textwrap
src=open('/home/claude/void-parasite/tools/boss4.py').read(); exec(src[:src.index('# ---------------- A')])
src2=src[src.index('# ---------------- C'):src.index('K=2')]; exec(src2[:src2.index('def C_main')])
W0,H0=150,96
def fr(seed): im=canvas(W0,H0,seed); return im,lay(im)
def ringpts(cx,cy,R,ga,gw,sy=.8,n=120):
    return [(cx+math.cos(a)*R,cy+math.sin(a)*R*sy) for a in [ga+gw+(i/n)*(6.283-2*gw) for i in range(n)]]
def ringd(d,cx,cy,R,ga,gw,sy=.8,col=RED,al=200):
    pts=ringpts(cx,cy,R,ga,gw,sy,90)
    for a,b in zip(pts,pts[1:]): d.line([a,b],fill=col+(al,),width=1)
    for k in range(9):
        a0=ga-gw+2*gw*k/9;a1=ga-gw+2*gw*(k+1)/9;d.line([cx+math.cos(a0)*R,cy+math.sin(a0)*R*sy,cx+math.cos(a1)*R,cy+math.sin(a1)*R*sy],fill=GOLD+(255,),width=2)
def rot_arrow(d,cx,cy,R,a,sgn,sy=.8,col=WH):
    a2=a+sgn*.5;pts=[(cx+math.cos(a+sgn*k*.05)*R,cy+math.sin(a+sgn*k*.05)*R*sy) for k in range(11)]
    d.line(pts,fill=col,width=1);x,y=pts[-1];ang=math.atan2(pts[-1][1]-pts[-2][1],pts[-1][0]-pts[-2][0])
    for s in (2.5,-2.5): d.line([x,y,x+math.cos(ang+s)*4,y+math.sin(ang+s)*4],fill=col,width=1)
# ---------- 2페이즈 고리 ----------
def RA():  # 회전하는 세 겹 고리
    out=[]
    for k,(Rs,cap) in enumerate([((44,62,80),'세 고리 · 틈이 돈다'),((30,48,66),'틈이 엇갈려 돈다'),((16,34,52),'움직이는 틈을 따라 빠짐')]):
        im,L=fr(10+k);d=ImageDraw.Draw(L);cx,cy=75,50
        for i,R in enumerate(Rs):
            ga=1.0+i*.8+k*(.7 if i%2==0 else -.7);ringd(d,cx,cy,R,ga,.45);swarm(d,ringpts(cx,cy,R,ga,.45),90,1,i+k)
            rot_arrow(d,cx,cy,R+4,ga+.5,1 if i%2==0 else -1)
        worm(d,cx+[0,22,40][k],cy+[0,-10,-16][k],-.5);comp(im,L);out.append((im,cap))
    return out
def RB():  # 안팎으로 엇갈리는 고리
    out=[]
    for k,(Rin,Rout,cap) in enumerate([(8,80,'바깥 고리는 조여 오고'),(30,58,'안쪽 고리는 퍼져 나온다'),(46,40,'두 고리가 나를 지나치는 순간')]):
        im,L=fr(20+k);d=ImageDraw.Draw(L);cx,cy=75,50
        ringd(d,cx,cy,Rout,.8,.45);swarm(d,ringpts(cx,cy,Rout,.8,.45),110,1,k)
        ringd(d,cx,cy,Rin,3.6,.5,col=(255,120,200));swarm(d,ringpts(cx,cy,Rin,3.6,.5),70,1,k+5,col=((255,200,120),))
        arrow(d,cx+Rout+6,cy,cx+Rout-6,cy,RED);arrow(d,cx+Rin*1.0,cy-Rin*.8-2,cx+Rin*1.0+6,cy-Rin*.8-8,(255,140,200))
        worm(d,cx-36,cy+[18,14,10][k],0);comp(im,L);out.append((im,cap))
    return out
def RC():  # 쫓아오는 고리 다섯
    out=[]
    for k,cap in enumerate(['내가 선 자리에 고리','0.6초마다 새 고리가 뒤따른다','멈추면 겹친 고리에 갇힌다']):
        im,L=fr(30+k);d=ImageDraw.Draw(L)
        path=[(40,60),(62,48),(86,42),(108,46),(126,56)]
        for i in range(k*2+1):
            if i>=len(path):break
            cx,cy=path[i];R=34-i*0+k*0-(k*2-i)*5;R=max(10,R);ringd(d,cx,cy,R,1.6+i*.9,.5,al=230-i*20)
        px,py=path[min(len(path)-1,k*2)];worm(d,px+8,py-4,-.3);comp(im,L);out.append((im,cap))
    return out
# ---------- 은하 소용돌이 ----------
def gal(d,cx,cy,rot,arms=3,tw=.06,sy=.62,RM=70,n=120,seed=0):
    for a_ in range(arms):
        pts=[(cx+math.cos(rot+r*tw+a_*6.283/arms)*r,cy+math.sin(rot+r*tw+a_*6.283/arms)*r*sy) for r in [6+i*(RM-6)/n for i in range(n)]]
        swarm(d,pts,150,1.0,seed+a_)
def GA():  # 숨 쉬는 은하: 방향이 뒤집히고 팔이 감겼다 풀린다
    out=[]
    for k,(rot,tw,sg,cap) in enumerate([(0,.05,1,'시계 방향으로 돌다'),(.6,.11,0,'번쩍 — 팔이 감기며 멈칫'),(.2,.03,-1,'반대로 돌며 팔이 풀린다')]):
        im,L=fr(40+k);d=ImageDraw.Draw(L);gal(d,75,50,rot,tw=tw,seed=k)
        if sg: rot_arrow(d,75,50,40,0.3,sg,.62,GOLD)
        else: d.ellipse([67,44,83,56],outline=(255,255,255,220))
        queen(d,75,50,.5);worm(d,112,74,2.4);comp(im,L);out.append((im,cap))
    return out
def GB():  # 떠도는 은하: 중심이 나를 향해 움직인다
    out=[]
    for k,(cx,cap) in enumerate([(42,'은하가 돌면서'),(70,'나를 향해 떠온다'),(98,'안전한 길이 계속 바뀐다')]):
        im,L=fr(50+k);d=ImageDraw.Draw(L);gal(d,cx,48,k*.7,seed=10+k,RM=60)
        queen(d,cx,48,.5);arrow(d,cx+4,82,cx+24,82,RED);worm(d,124,62,3.0);comp(im,L);out.append((im,cap))
    return out
def GC():  # 별똥 은하: 팔 끝에서 별똥이 튀어 나온다
    out=[]
    for k,cap in enumerate(['팔 넷이 빠르게 돈다','팔 끝이 빛나면','별똥이 팔을 따라 튀어 나온다']):
        im,L=fr(60+k);d=ImageDraw.Draw(L);gal(d,75,50,k*.5,arms=4,seed=20+k,RM=64)
        if k>=1:
            a=k*.5+64*.06;x,y=75+math.cos(a)*64,50+math.sin(a)*64*.62;d.ellipse([x-4,y-4,x+4,y+4],outline=GOLD)
        if k==2:
            for j in range(3):
                a=1.2+j*2.1;x0,y0=75+math.cos(a)*20,50+math.sin(a)*12;x1,y1=75+math.cos(a)*74,50+math.sin(a)*46;tele_line(d,x0,y0,x1,y1,8);swarm(d,[(x1,y1)],24,1.4,j,col=((255,200,120),))
        queen(d,75,50,.5);worm(d,30,80,0);comp(im,L);out.append((im,cap))
    return out
WW=700
def head(t,sz=24,col=(255,255,255),h=44,bg=(6,4,12)):
    o=Image.new('RGB',(WW,h),bg);ImageDraw.Draw(o).text((18,8),t,font=ft(sz),fill=col);return o
def row(title,sub,frames):
    fw=(WW-40-20)//3;h=int(H0*fw/W0)
    o=Image.new('RGB',(WW,h+86),(13,10,22));d=ImageDraw.Draw(o);d.text((20,6),title,font=ft(18),fill=GOLD);d.text((20,32),sub,font=ft(13,False),fill=(225,218,240))
    for i,(f,cap) in enumerate(frames):
        x=20+i*(fw+10);o.paste(f.resize((fw,h),Image.NEAREST).convert('RGB'),(x,56));d.text((x+5,59),str(i+1),font=ft(14),fill=GOLD);d.text((x+fw/2,56+h+4),cap,font=ft(12),fill=WH,anchor='ma')
        if i<2:d.text((x+fw+1,56+h/2),'›',font=ft(18),fill=GOLD,anchor='lm')
    return o
B=[head('보스 개선 시안 — 하나씩 골라 주세요'),
   head('① 2페이즈 고리 (1페이즈는 세 겹 고리로 적용 완료)',18,(232,200,255),36,(13,10,22)),
   row('R1  회전하는 세 겹 고리','세 고리의 금빛 틈이 서로 반대 방향으로 돌면서 조여 온다 — 틈을 따라가며 빠져나갈 것',RA()),
   row('R2  안팎으로 엇갈리는 고리','바깥 고리는 조여 오고, 안쪽(여왕 쪽)에서 고리가 퍼져 나온다 — 두 고리의 틈 위치가 다르다',RB()),
   row('R3  쫓아오는 고리 다섯','0.6초마다 내가 선 자리에 새 고리가 생겨 조여 온다 — 계속 움직이며 틈으로 빠질 것',RC()),
   head('② 은하 소용돌이 (정적 → 어렵게)',18,(232,200,255),36,(13,10,22)),
   row('G1  숨 쉬는 은하','2초마다 번쩍이며 도는 방향이 뒤집히고, 팔이 감겼다 풀렸다 한다 — 따라 돌던 길이 갑자기 막힌다',GA()),
   row('G2  떠도는 은하','은하 전체가 돌면서 나를 향해 천천히 떠온다 — 안전한 길이 계속 움직인다',GB()),
   row('G3  별똥 은하','팔이 넷으로 늘고 빨라지며, 팔 끝이 빛나면 별똥이 팔을 따라 바깥으로 튀어 나온다',GC())]
H=sum(b.height for b in B)+10;out=Image.new('RGB',(WW,H),(6,4,12));y=0
for b in B: out.paste(b,(0,y));y+=b.height
out.save('/home/claude/void-parasite/docs/boss_designs/19_ring_galaxy_options.png');print(out.size)
