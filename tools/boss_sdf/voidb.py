from runner import *
VOID,VSH,GLOW,PINK=11,12,13,14
def tri(a,b,c,th):
    a,b,c=[np.array(v,float) for v in(a,b,c)];ba=b-a;cb=c-b;ac=a-c;nor=np.cross(ba,ac)
    def f(P):
        pa=P-a;pb=P-b;pc=P-c
        s=np.sign((np.cross(ba,nor)*pa).sum(-1))+np.sign((np.cross(cb,nor)*pb).sum(-1))+np.sign((np.cross(ac,nor)*pc).sum(-1))
        def seg(v,p):h=np.clip((p*v).sum(-1)/(v*v).sum(),0,1);q=v*h[...,None]-p;return (q*q).sum(-1)
        d2=np.where(s<2,np.minimum(np.minimum(seg(ba,pa),seg(cb,pb)),seg(ac,pc)),(pa*nor).sum(-1)**2/(nor*nor).sum())
        return np.sqrt(d2)-th
    return f
def stars(P):
    i=np.floor(P*.9);h=np.sin((i*np.array([12.9898,78.233,37.719])).sum(-1))*43758.5453;h=h-np.floor(h);return h>.93
def VM():
    M=MATS()
    M[VOID]=dict(ramp=ramp(0x05030a,0x0c0818,0x160e2a,0x22163e),amb=.15,dif=.35,rim=.5,dith=.1,gk=.5,fill=0,alt=(stars,ramp(0x8a70d0,0xc8b0ff,0xffffff)))
    M[VSH]=dict(ramp=ramp(0x06030c,0x0e0818,0x181028,0x24183c,0x342456,0x4a3474,0x6c5098,0x9c80c8),tex=lambda P:noise3(P,.3),texk=.22,rim=.5,amb=.02,dif=.72,gk=.35,dith=.08,fill=.06)
    M[GLOW]=dict(ramp=ramp(0x6a2aa0,0xa060e0,0xd8a8ff,0xffffff),amb=.75,spec=20,gk=0)
    M[PINK]=dict(ramp=ramp(0x8a1a4a,0xe0457b,0xff9ac0,0xffffff),amb=.75,spec=20,gk=0)
    return M
CO={ROCK:dict(ramp=ramp(0x06040c,0x0c0816,0x140e22,0x1c1430,0x281c40,0x342652),tex=lambda P:noise3(P,.15,3),texk=.5,rim=.05,gk=.9,amb=.1,dif=.5,dith=.06,fill=0)}
def vcave():
    S=Scene();S.add(lambda P:P[...,1]+noise3(P,.1)*2,ROCK)
    S.add(lambda P:(P[...,2]+80)-np.abs(P[...,0])*.3+P[...,1]*.1+noise3(P,.06,1)*14,ROCK)
    random.seed(19)
    for k in range(9):
        x=random.uniform(-130,130);z=random.uniform(-70,60);y=random.uniform(4,70)
        S.add(sphere((x,y,z),random.uniform(1.2,2.4)),GLOW)
    return S
# 1. 접힌 자 — 종이접기처럼 접힌 별하늘 조각들로 된 가오리
def folded():
    S=Scene();t=1.1;Y=46
    S.add(tri((0,Y+6,40),(-10,Y,-10),(10,Y,-10),t),VOID,0)
    S.add(tri((0,Y+6,40),(0,Y+14,0),(-10,Y,-10),t),VOID,0);S.add(tri((0,Y+6,40),(0,Y+14,0),(10,Y,-10),t),VOID,0)
    for side in(-1,1):
        A=(side*10,Y,-10);B=(0,Y+6,40);C=(side*70,Y+22,6);D=(side*104,Y+8,-26);E=(side*46,Y-4,-36);F=(side*86,Y+34,40)
        S.add(tri(A,B,C,t),VOID,0);S.add(tri(A,C,E,t),VOID,0);S.add(tri(C,D,E,t),VOID,0);S.add(tri(B,C,F,t),VOID,0)
        S.add(tri(A,E,(side*20,Y-10,-46),t),VOID,0)
        S.add(sphere((side*5,Y+9,30),2.2),GLOW)
    S.add(tri((-6,Y-2,-12),(6,Y-2,-12),(0,Y-18,-96),t),VOID,0);S.add(tri((0,Y-18,-96),(-12,Y-8,-110),(12,Y-8,-110),t),VOID,0)
    # 접힌 자리마다 빛 이음매
    for a,b in[((0,Y+6,40),(0,Y+14,0)),((-70,Y+22,6),(-10,Y,-10)),((70,Y+22,6),(10,Y,-10)),((-70,Y+22,6),(-86,Y+34,40)),((70,Y+22,6),(86,Y+34,40))]:S.add(cap(a,b,.9),GLOW,0)
    random.seed(3)
    for k in range(10):S.add(tri(*[(random.uniform(-110,110),random.uniform(Y-10,Y+50),random.uniform(-60,50)) for _ in range(1)]*0+[(x,y,z) for x,y,z in [(lambda x,y,z:((x,y,z),(x+random.uniform(-9,9),y+random.uniform(4,10),z+random.uniform(-6,6)),(x+random.uniform(4,10),y+random.uniform(-6,6),z+random.uniform(-6,6))))(random.uniform(-120,120),random.uniform(Y-6,Y+56),random.uniform(-50,50))][0]],.6),VOID,0)
    return S
# 2. 빛을 먹는 해파리
def jelly():
    S=Scene();c=(0,84,0)
    bell=lambda P:np.maximum(np.maximum(ell(c,(46,34,46))(P),-ell((0,74,0),(40,28,40))(P)),-(P[...,1]-64))
    S.add(lambda P:ell(c,(46,34,46))(P)*0+np.maximum(ell(c,(46,34,46))(P),-(P[...,1]-64))+noise3(P,.25)*.8,VOID,0)
    S.add(lambda P:np.sqrt((np.sqrt(P[...,0]**2+P[...,2]**2)-44)**2+(P[...,1]-66)**2)-1.5,GLOW,0)
    for k in range(14):
        a=k/14*6.283;S.add(sphere((math.cos(a)*44,66,math.sin(a)*44),3.2),VSH,1.5,'rim');S.add(sphere((math.cos(a)*40,64,math.sin(a)*40),1.8),GLOW)
    random.seed(5)
    for k in range(9):
        a=k/9*6.283+.2;r=30+random.uniform(-4,4);x0,z0=math.cos(a)*r,math.sin(a)*r;pts=[(x0,64,z0)]
        for j in range(7):x,y,z=pts[-1];pts.append((x+math.sin(j*.8+k)*5+x0*.05,y-9,z+math.cos(j*.7+k)*4+z0*.04))
        for a1,b1 in zip(pts,pts[1:]):S.add(cap(a1,b1,1.6,1.0),GLOW,0)
    for k in range(4):
        a=k/4*6.283+.7;pts=[(math.cos(a)*10,64,math.sin(a)*10)]
        for j in range(6):x,y,z=pts[-1];pts.append((x+math.cos(a)*3+math.sin(j)*3,y-10,z+math.sin(a)*3))
        for a1,b1 in zip(pts,pts[1:]):S.add(cap(a1,b1,4.5,3.4),VSH,1.5,'o%d'%k)
    return S
# 3. 틈새 아귀 — 미끼가 출구 균열을 흉내 낸다
def angler():
    S=Scene()
    head=lambda P:np.maximum(ell((0,40,0),(48,36,40))(P),-ell((0,32,40),(36,22,26))(P))
    S.add(lambda P:head(P)+noise3(P,.3)*1.4,VSH,3,'h')
    S.add(ell((0,40,-34),(26,22,30)),VSH,6,'h');S.add(tri((0,44,-60),(0,66,-92),(0,18,-92),1.5),VSH,0)
    for side in(-1,1):S.add(ell((side*46,30,-4),(14,4,12)),VSH,2,'h')
    S.add(ell((0,32,22),(32,18,16)),VOID,0)
    for k in range(13):
        a=math.pi*(.1+k*.065);x=math.cos(a)*-33;y=32+math.sin(a)*18;S.add(crystal((x,y,26),(-x*.02,-1,.15),8+3*(k%2),1.6),BONE,0)
        y2=32-math.sin(a)*14;S.add(crystal((x*.95,y2,28),(-x*.02,1,.15),6+2*(k%2),1.4),BONE,0)
    for side in(-1,1):S.add(sphere((side*22,62,24),3.6),EYE)
    pts=[(0,74,8),(0,98,16),(0,108,38),(0,100,62),(0,86,72)]
    for a,b in zip(pts,pts[1:]):S.add(cap(a,b,2.2,1.8),VSH,1,'l')
    S.add(lambda P:np.sqrt((np.sqrt(P[...,0]**2+(P[...,1]-74)**2)-12)**2+(P[...,2]-76)**2)-2.6,PINK,0)
    S.add(sphere((0,74,76),6),VOID,0)
    return S
# 4. 공허 앵무조개 — 나선 껍데기의 입구가 공허로 열려 있다
def nautilus():
    S=Scene()
    shell=lambda P:np.maximum(ell((-6,50,-6),(46,46,24))(P),-ell((30,44,10),(22,28,26))(P))
    S.add(shell,VSH,0)
    S.add(lambda P:np.maximum(ell((30,44,4),(20,26,16))(P),-(P[...,2]-2)),VOID,0)
    for k in range(12):
        a=-1.6+k/12*3.4;S.add(sphere((30+math.cos(a)*21,44+math.sin(a)*27,9),2),GLOW)
    random.seed(9)
    for k in range(8):
        a=random.uniform(-1.5,1.5);pts=[(32+math.cos(a)*8,40+math.sin(a)*10,10)]
        for j in range(6):x,y,z=pts[-1];pts.append((x+6+random.uniform(-2,3),y-5+random.uniform(-2,2),z+5))
        for a1,b1 in zip(pts,pts[1:]):S.add(cap(a1,b1,3,1.4),VSH,1.2,'arm%d'%k)
    S.add(ell((30,70,8),(10,5,8)),VSH,2,'hood');S.add(sphere((36,62,14),5),EYE);S.add(sphere((37,62,18),2.2),VOID)
    return S
def band(P):
    r=np.hypot(P[...,0]+6,P[...,1]-50);a=np.arctan2(P[...,1]-50,P[...,0]+6);return (np.sin(a*7+r*.32)>.8)*.2-(np.abs(np.sin(np.log(r+1)*6-a))<.08)*.35
import sys
w=sys.argv[1];M=VM()
if w=='fold':go(folded(),'v_fold.png',mats=M,cave=vcave(),cm_over=CO,center=(0,44,-20),scale=.85,pitch=62,emit=[((0,60,10),(160,110,255),80,.5)],shadow=(40,96,200,140))
if w=='jelly':go(jelly(),'v_jelly.png',mats=M,cave=vcave(),cm_over=CO,center=(0,70,0),scale=.7,pitch=24,emit=[((0,60,0),(150,90,255),60,.5)],shadow=(70,120,170,146))
if w=='angler':go(angler(),'v_angler.png',mats=M,cave=vcave(),cm_over=CO,center=(0,56,10),scale=.85,pitch=22,yaw=-38,emit=[((0,74,80),(255,90,150),50,.9)],shadow=(55,110,185,146))
if w=='naut':
    M[VSH]=dict(M[VSH]);M[VSH]['band']=band
    go(nautilus(),'v_naut.png',mats=M,cave=vcave(),cm_over=CO,center=(8,48,0),scale=.82,pitch=16,yaw=-20,emit=[((22,40,20),(150,90,255),60,.7)],shadow=(60,112,180,146))
