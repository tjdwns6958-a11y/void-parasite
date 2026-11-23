from common import *
from mon import TM
def EM():
    M=TM();M[ROCK]=dict(ramp=ramp(0x0a0810,0x14101c,0x201a2c,0x2e263e,0x403654,0x574a6e),tex=lambda P:noise3(P,.4,2),texk=.5,rim=.18,amb=.1,dif=.85,gk=.9,dith=.07,fill=.12)
    M[CRY]=dict(M[CRY]);M[CRY].update(ramp=ramp(0x0e1a30,0x162c4e,0x22446e,0x346490,0x5a8cb8,0x9cc4e4),amb=.1,spec=30,rim=.5,dif=.75,gk=.25)
    M[CRY2]=dict(M[CRY2]);M[CRY2].update(ramp=ramp(0x160a2c,0x261450,0x3c2478,0x5a3ca0,0x8466c8,0xbca8ec),amb=.1,spec=30,rim=.5,dif=.75,gk=.25)
    return M
def spire(seed,n,H,spread):
    S=Scene();random.seed(seed)
    S.add(lambda Q:ell((0,1,0),(spread*1.1,4,spread*.8))(Q)+noise3(Q,.35,seed)*2,ROCK,2,'b')
    for k in range(n):
        if k==0:o=(0,0,0);d=(random.uniform(-.1,.1),1,random.uniform(-.1,.1));L=H;r=H*.13
        else:
            a=random.uniform(0,6.28);rr=random.uniform(.3,1)*spread*.7;o=(math.cos(a)*rr,0,math.sin(a)*rr*.7);d=(math.cos(a)*random.uniform(.2,.6),1,math.sin(a)*random.uniform(.1,.4));L=H*random.uniform(.3,.7);r=L*random.uniform(.12,.18)
        S.add(crystal(o,d,L,r,tip=.28,tw=random.uniform(0,1)),CRY if (k+seed)%3==0 else CRY2,0)
    return S
def geode_spire():
    S=Scene();random.seed(21)
    S.add(lambda Q:cap((0,0,0),(0,34,0),16,7)(Q)+noise3(Q,.22,4)*4,ROCK,4,'b')
    S.add(lambda Q:ell((0,2,0),(30,7,22))(Q)+noise3(Q,.3,5)*3,ROCK,4,'b')
    for k in range(26):
        th=random.uniform(-3.1,3.1);ph=random.uniform(.35,1.45);dd=np.array([math.sin(th)*math.cos(ph),math.sin(ph),math.cos(th)*math.cos(ph)])
        c=np.array((0,38,0))+dd*random.uniform(2,8)
        S.add(crystal(tuple(c),tuple(dd),random.uniform(18,46),random.uniform(3,5.5),tw=random.uniform(0,1)),CRY2 if k%3 else CRY,0)
    for k in range(9):
        a=random.uniform(0,6.28);o=(math.cos(a)*24,0,math.sin(a)*16);S.add(crystal(o,(math.cos(a)*.5,1,math.sin(a)*.3),random.uniform(8,18),random.uniform(1.8,3)),CRY2 if k%2 else CRY,0)
    return S
def lichen(seed):
    S=Scene();random.seed(seed)
    for k in range(7):
        x=random.uniform(-10,10);z=random.uniform(-5,5);S.add(lambda Q,x=x,z=z:ell((x,0,z),(random.uniform(4,7),1.6,random.uniform(3,4.5)))(Q)+noise3(Q,.6,seed)*.8,SHELL,1.5,'b')
    for k in range(9):
        x=random.uniform(-11,11);z=random.uniform(-5,5);S.add(sphere((x,1.8,z),random.uniform(.8,1.4)),GLOW if k%3 else CRY,0)
    return S
def shroom():
    S=Scene();random.seed(31)
    for k,(x,z,h,r) in enumerate([(0,0,9,5),(-6,3,6,3.6),(5,4,5,3)]):
        S.add(cap((x,0,z),(x,h,z),1.2,1),BONE,0)
        S.add(lambda Q,x=x,z=z,h=h,r=r:np.maximum(ell((x,h,z),(r,r*.55,r))(Q),-(Q[...,1]-(h-.6))),CRY if k!=1 else CRY2,0)
    return S
def pebble(seed,n):
    S=Scene();random.seed(seed)
    for k in range(n):S.add(lambda Q,k=k:ell((k*5-3,1,random.uniform(-1,1)),(3,2,2.4))(Q)+noise3(Q,.8,seed)*.6,ROCK,1,'b')
    S.add(crystal((1,1,0),(.3,1,.2),4,1),CRY,0)
    return S
if __name__=='__main__':
    M=EM()
    sp=lambda S,n,W,H,sc,c,e=():spr(S,W,H,sc,c,40,n,e,M=M)
    sp(spire(1,7,40,10),'tree0',60,80,.72,(0,18,0),[((0,16,6),(80,170,255),26,.35)])
    sp(spire(2,6,44,9),'tree1',56,86,.72,(0,20,0),[((0,18,6),(170,110,255),26,.35)])
    sp(geode_spire(),'wtree',130,160,.72,(0,38,0),[((0,44,10),(140,90,255),50,.5),((0,20,24),(80,170,255),40,.35)])
    sp(lichen(3),'moss',60,36,.5,(0,0,0),[((0,4,0),(150,90,255),12,.4)])
    sp(shroom(),'mush',40,40,.5,(0,4,0),[((0,8,4),(90,180,255),12,.5)])
    sp(pebble(4,1),'peb0',20,16,.5,(0,1,0))
    sp(pebble(5,2),'peb1',26,16,.5,(0,1,0))
    sheet(['tree0','tree1','wtree','moss','mush','peb0','peb1'],OUT+'/s_env.png',sc=2)
