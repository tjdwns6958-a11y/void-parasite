from sdf import *
import numpy as np, math, random
def _h(i):
    v=np.sin((i*np.array([127.1,311.7,74.7])).sum(-1))*43758.5453;return v-np.floor(v)
def vnoise(P):
    i=np.floor(P);f=P-i;u=f*f*(3-2*f);r=0
    for dx in(0,1):
        for dy in(0,1):
            for dz in(0,1):
                w=(u[...,0] if dx else 1-u[...,0])*(u[...,1] if dy else 1-u[...,1])*(u[...,2] if dz else 1-u[...,2]);r=r+w*_h(i+np.array([dx,dy,dz]))
    return r-.5
def noise3(P,f=.25,s=0):
    Q=P*f+s*13.7;return vnoise(Q)*.6+vnoise(Q*2.1+5)*.3+vnoise(Q*4.3+9)*.15
SHELL,ROCK,AGATE,CRY,CRY2,EYE,DARK,BONE=1,2,3,4,5,6,7,8
def chela(S,side,base,dirv,size,mat,cry):
    # 집게: 손바닥(타원) + 고정 손가락 + 움직이는 손가락
    d=np.array(dirv,float);d/=np.linalg.norm(d);b=np.array(base,float);up=np.array([0,1,0.]);sx=np.cross(up,d);sx/=np.linalg.norm(sx)
    palm=b+d*size*.55;S.add(ell(tuple(palm),(size*.42,size*.36,size*.62)),mat,3,'claw%d'%side)
    tipA=palm+d*size*.55-up*size*.12;tipB=palm+d*size*.6+up*size*.2
    S.add(cap(tuple(palm+d*size*.3-up*size*.1),tuple(palm+d*size*1.25-up*size*.05+sx*side*size*.08),size*.2,size*.04),mat,2,'claw%d'%side)
    S.add(cap(tuple(palm+d*size*.25+up*size*.18),tuple(palm+d*size*1.15+up*size*.32-sx*side*size*.06),size*.17,size*.03),mat,2,'claw%d'%side)
    for k in range(5):S.add(crystal(tuple(palm+d*size*(.45+k*.15)-up*size*.02),(0,1,.2),size*.12,size*.04),BONE,0)
    if cry:
        random.seed(31+side)
        for k in range(9):
            o=palm+np.array([random.uniform(-.3,.3),random.uniform(.15,.35),random.uniform(-.4,.3)])*size
            dd=np.array([random.uniform(-.7,.7),1,random.uniform(-.5,.5)]);S.add(crystal(tuple(o),tuple(dd),random.uniform(.3,.7)*size,random.uniform(.06,.11)*size,tw=random.uniform(0,1)),CRY if k%3 else CRY2)
def crab_scene():
    S=Scene()
    # 넓적한 등딱지 + 앞 가장자리 톱니
    S.add(ell((0,24,0),(56,15,40)),SHELL,5,'body');S.add(ell((0,30,-4),(40,10,28)),SHELL,8,'body')
    for k in range(15):
        a=math.pi*(.06+k*.0628);x=math.cos(a)*-56;z=math.sin(a)*38+2
        S.add(crystal((x*.96,23,z*.96),(x/56,.12,z/40),6+3*(k%2),2),SHELL,1.5,'body')
    # 등딱지가 갈라지며 솟은 거대 정동 결정 덩어리
    S.add(lambda P:ell((4,40,-12),(34,18,26))(P)+noise3(P,.3)*4,ROCK,4,'body')
    random.seed(4)
    for k in range(30):
        th=random.uniform(-3.1,3.1);ph=random.uniform(.55,1.45);d=np.array([math.sin(th)*math.cos(ph),math.sin(ph),math.cos(th)*math.cos(ph)])
        c=np.array((4,46,-10))+d*random.uniform(2,10);S.add(crystal(tuple(c),tuple(d),random.uniform(22,56)*(1.15 if abs(th)<.8 else 1),random.uniform(3.2,6),tw=random.uniform(0,1)),CRY if k%3 else CRY2)
    for k in range(6):
        c=(random.uniform(-40,40),30,random.uniform(-30,10));S.add(crystal(c,(random.uniform(-.4,.4),1,random.uniform(-.3,.3)),random.uniform(6,12),random.uniform(1.5,2.4)),CRY2 if k%2 else CRY)
    # 다리 4쌍: 앞다리는 앞쪽으로, 뒷다리는 뒤쪽으로 부채꼴
    up=np.array([0,1,0.])
    for side in(-1,1):
        for k in range(4):
            ang=(-.62+k*.42);dv=np.array([side*math.cos(ang),0,-math.sin(ang)]);a=np.array([side*44*math.cos(ang),22,-30*math.sin(ang)])
            b=a+dv*26+up*(24-k*2);c=b+dv*26-up*6;e=c+dv*14;e[1]=0
            S.add(cap(tuple(a),tuple(b),6.5,5.5),SHELL,2,'legs');S.add(cap(tuple(b),tuple(c),5.5,4.2),SHELL,2,'legs');S.add(cap(tuple(c),tuple(e),4.2,1.2),SHELL,2,'legs')
            S.add(sphere(tuple(b),6),SHELL,1.5,'legs');S.add(sphere(tuple(c),5),SHELL,1.5,'legs')
            S.add(crystal(tuple(b),(side*.2,1,0),9,2.2),BONE,0);S.add(crystal(tuple((b+c)/2),(0,1,.2),6,1.6),BONE,0)
    # 두 집게 (앞으로 쳐든) — 왼쪽은 결정에 잠식된 거대 집게
    S.add(cap((-36,24,30),(-66,48,50),10,9),SHELL,3,'arm');S.add(sphere((-66,48,50),10),SHELL,3,'arm')
    chela(S,-1,(-66,48,50),(.32,.3,1),62,SHELL,True)
    S.add(cap((36,24,30),(60,40,48),8,7),SHELL,3,'arm2');S.add(sphere((60,40,48),8),SHELL,3,'arm2')
    chela(S,1,(60,40,48),(-.25,.25,1),40,SHELL,False)
    # 눈자루
    for side in(-1,1):
        S.add(cap((side*8,30,36),(side*12,44,42),2.6,2.2),SHELL,2,'body');S.add(sphere((side*12.5,46,43),3.6),EYE)
    for k in range(4):S.add(cap((-5+k*3.3,20,39),(-5+k*3.3,12,42),1.4,.8),DARK,0)
    return S
def cave_scene():
    S=Scene();S.add(lambda P:P[...,1]+noise3(P,.1)*2,ROCK)
    S.add(lambda P:(P[...,2]+70)-np.abs(P[...,0])*.35+P[...,1]*.1+noise3(P,.06,1)*14,ROCK)
    random.seed(9)
    for (cx,cz,n) in((-120,-30,6),(130,-20,6),(-95,60,4),(110,70,4),(0,-55,5),(-50,-50,3),(60,-52,3)):
        for k in range(n):
            d=np.array([random.uniform(-.5,.5),1,random.uniform(-.3,.3)]);S.add(crystal((cx+random.uniform(-8,8),-2,cz+random.uniform(-6,6)),d,random.uniform(14,40),random.uniform(3,6),tw=random.uniform(0,1)),CRY if k%2 else CRY2)
    return S
