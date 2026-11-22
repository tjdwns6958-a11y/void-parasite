from runner import *
up=np.array([0,1,0.])
def isopod():
    S=Scene();random.seed(17)
    for k in range(8):
        z=34-k*11.5;w=44-abs(k-2.5)*3.2-(k>5)*(k-5)*5;y=24-k*.4
        S.add(ell((0,y,z),(w,17-k*.6,10)),SHELL,1.2,'seg')
        for side in(-1,1):S.add(crystal((side*(w-4),y-6,z),(side,-.35,-.25),12,4,tip=.6),SHELL,1.5,'seg')
        if k%1==0:
            n=3 if k%2==0 else 2
            for j in range(n):
                x=(j-(n-1)/2)*16;S.add(crystal((x,y+12,z),(x*.025,1,-.25),(36 if j==(n-1)/2 else 20)*(1-abs(k-3)*.07)+random.uniform(-3,3),3.6 if j==(n-1)/2 else 2.6,tw=random.uniform(0,1)),CRY if (j+k)%2 else CRY2)
    # 꼬리 갈래
    for side in(-1,1):S.add(ell((side*12,16,-62),(7,4,14)),SHELL,1,'seg')
    # 머리
    S.add(ell((0,16,48),(28,12,13)),SHELL,2,'seg')
    for side in(-1,1):
        P=[(side*14,20,56),(side*38,30,74),(side*64,22,90),(side*86,6,98)]
        for a,b in zip(P,P[1:]):S.add(cap(a,b,2.6,2),SHELL,1,'ant');S.add(sphere(b,2.8),SHELL,1,'ant')
        S.add(crystal(P[-1],(side*.3,-1,.2),8,1.8),CRY)
        for j in range(4):S.add(sphere((side*(16+j*2.5),18+(j%2)*3,57),2.2),EYE)
        for k in range(6):
            z=30-k*12;a=(side*32,10,z);b=(side*48,8,z+4);c=(side*54,0,z+8)
            S.add(cap(a,b,3,2.4),SHELL,1,'legs');S.add(cap(b,c,2.4,1),SHELL,1,'legs')
    for side in(-1,1):S.add(cap((side*6,10,58),(side*3,6,66),2.6,1),BONE,0)
    return S
def spider():
    S=Scene();random.seed(23)
    S.add(ell((0,84,0),(34,26,36)),SHELL,4,'body')
    for side in(-1,1):S.add(cap((side*8,90,24),(side*14,98,52),4,1),SHELL,2,'body')
    for k in range(26):
        th=random.uniform(-3.1,3.1);ph=random.uniform(.2,1.3);d=np.array([math.sin(th)*math.cos(ph),math.sin(ph),math.cos(th)*math.cos(ph)])
        S.add(crystal(tuple(np.array((0,84,0))+d*np.array([24,18,26])),tuple(d),random.uniform(5,9),1.6),BONE,1.5,'body')
    for k in range(10):
        th=random.uniform(-2.2,2.2);ph=random.uniform(.9,1.4);d=np.array([math.sin(th)*math.cos(ph),math.sin(ph),math.cos(th)*math.cos(ph)])
        S.add(crystal(tuple(np.array((0,92,-4))+d*14),tuple(d),random.uniform(18,38),random.uniform(2.4,4),tw=random.uniform(0,1)),CRY if k%2 else CRY2)
    for i in range(8):
        side=-1 if i<4 else 1;k=i%4;ang=(-.95+k*.62);dv=np.array([side*math.cos(ang),0,-math.sin(ang)])
        a=np.array([0,80,0])+dv*24;b=a+dv*36+up*42;c=b+dv*44-up*40;e=c+dv*18;e[1]=-2
        S.add(cap(tuple(a),tuple(b),5,3.8),SHELL,2,'legs');S.add(cap(tuple(b),tuple(c),3.8,3),SHELL,2,'legs');S.add(cap(tuple(c),tuple(e),3,1.2),SHELL,2,'legs')
        S.add(sphere(tuple(b),5),SHELL,1.5,'legs');S.add(sphere(tuple(c),4.2),SHELL,1.5,'legs')
        S.add(crystal(tuple(b),tuple(dv*.3+up),10,2.4,tw=i),CRY2 if i%2 else CRY)
        S.add(crystal(tuple(e+up*8),(0,-1,0),12,2.6),CRY)
    for side in(-1,1):
        a=(side*12,74,24);b=(side*22,52,50);c=(side*14,36,62)
        S.add(cap(a,b,4,3.4),SHELL,2,'arm');S.add(cap(b,c,3.4,3),SHELL,2,'arm');S.add(ell(c,(5,4,7)),SHELL,2,'arm');S.add(cap((c[0],c[1]-2,c[2]+4),(c[0]-side*2,c[1]-4,c[2]+14),2,.6),SHELL,1,'arm')
    for side in(-1,1):S.add(sphere((side*8,88,28),3),EYE)
    return S
def kabuto():
    S=Scene();random.seed(29)
    dome=lambda P:np.maximum(ell((0,4,12),(66,26,52))(P),-(P[...,1]-1))
    S.add(dome,SHELL,3,'k')
    for x in(-30,0,30):
        for j in range(5):S.add(crystal((x*(1-j*.05),22-abs(x)*.25-j*1.2,26-j*12),(x*.01,1,-.1),6+(x==0)*4,1.8),BONE,1,'k')
    S.add(ell((0,8,-42),(40,14,24)),SHELL,3,'k')
    for side in(-1,1):
        for j in range(5):S.add(crystal((side*(36-j*3),6,-30-j*7),(side,0,-.3),10,2.2,tip=.6),SHELL,1,'k')
    S.add(crystal((0,8,-58),(.55,.3,-1),84,6,tip=.5),CRY)
    for j in range(15):
        a=math.pi*(.08+j*.06);x=math.cos(a)*-64;z=12+math.sin(a)*50
        S.add(crystal((x*.98,2,z*.98),(x/64,-.25,z/50),9,2.6),CRY if j%2 else CRY2)
    for side in(-1,1):S.add(ell((side*30,22,30),(8,4,5)),EYE)
    S.add(sphere((0,27,40),2.6),EYE)
    return S
vein=lambda P:(np.abs(noise3(P,.045,5))<.022)&(P[...,1]>3)
M=MATS();KM=dict(M);KM[SHELL]=dict(M[SHELL]);KM[SHELL].update(ramp=ramp(0x060a0a,0x0c1614,0x142422,0x1e3634,0x2c4c48,0x426a64,0x6a948c),fill=.1,alt=(vein,ramp(0x7a4a10,0xc07a20,0xf0b030,0xffe080,0xfff4c0)))
IM=dict(M);IM[SHELL]=dict(M[SHELL]);IM[SHELL].update(ramp=ramp(0x07070e,0x10121e,0x1a1e30,0x282e48,0x3a4264,0x56608a,0x8890bc),fill=.12)
SM=dict(M);SM[SHELL]=dict(M[SHELL]);SM[SHELL].update(ramp=ramp(0x140808,0x2a1010,0x461a18,0x682a22,0x904032,0xbc6248,0xe8987a))
import sys
w=sys.argv[1]
if w=='iso':go(isopod(),'iso.png',mats=IM,center=(0,26,0),scale=1.1,pitch=55,emit=[((0,60,0),(120,160,255),90,.5)],shadow=(30,74,210,140))
if w=='spi':go(spider(),'spi.png',mats=SM,center=(0,58,10),scale=1.45,pitch=28,emit=[((0,100,-4),(150,110,255),80,.8)]+[((math.cos(a)*120,0,math.sin(a)*90),(80,180,255),30,.8) for a in np.linspace(0,6.28,9)[:-1]],shadow=(60,105,180,140))
if w=='kab':go(kabuto(),'kab.png',mats=KM,center=(0,16,-4),scale=1.15,pitch=36,emit=[((0,10,-80),(80,180,255),60,.8)],shadow=(30,70,210,140))
