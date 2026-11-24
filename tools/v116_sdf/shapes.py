# 1단계: 모양만 보는 시안 (무채색 · 약간 입체)
from common import *
import mon
from mon import LT
P=lambda x,y,f:mon.P(x,y,f);D=P;R=lambda x,y,f:mon.Rr(x,y,f)
B1,B2,LG,EY,AC=30,31,32,33,34
def NM():
    M=mats()
    m=lambda r,**k:{**dict(ramp=r,amb=.26,dif=.78,rim=.3,fill=.08,dith=.04,gk=0,spec=10,tex=lambda Q:noise3(Q,.5),texk=.04),**k}
    M[B1]=m(ramp(0x2c2a34,0x46434f,0x625e6c,0x827d8c,0xa8a2b0,0xcac4d0))
    M[B2]=m(ramp(0x22202a,0x34313c,0x4a4654,0x625e6c,0x7c7786))
    M[LG]=m(ramp(0x1e1c24,0x2e2b34,0x403c48,0x524e5c))
    M[EY]=m(ramp(0x0a0a0e,0x18181e,0x9090a0),amb=.6,dif=.3,rim=0,texk=0)
    M[AC]=m(ramp(0x9a96a6,0xc8c4d2,0xeeeaf6,0xffffff),amb=.45,dif=.6,texk=0)
    return M
def segs(S,pts,r0,r1,mat,grp):
    n=len(pts)
    for i,p in enumerate(pts):S.add(sphere(p,r0+(r1-r0)*i/max(1,n-1)),mat,1.2,grp)
def L(S,pts,r0,r1):legs(S,pts,r0,r1,LG,'lg',.8)
# ================= 전갈 (위를 봄) =================
def claw(S,s,base,mid,tip,size,mat=B1):
    legs(S,[base,mid,tip],size*.32,size*.26,mat,'c%d'%s)
    S.add(ell(tip,(size*.55,size*.36,size*.75)),mat,1.2,'c%d'%s)
    t=np.array(tip,float);fw=np.array(P(0,0,1),float);sd=np.array(P(s,0,0),float)
    S.add(cap(tuple(t+fw*size*.5-sd*size*.18),tuple(t+fw*size*1.25-sd*size*.05),size*.2,size*.06),mat,.8,'c%d'%s)
    S.add(cap(tuple(t+fw*size*.5+sd*size*.22),tuple(t+fw*size*1.1+sd*size*.12),size*.17,size*.05),mat,.8,'c%d'%s)
def sc1():  # 정통형: 꼬리를 등 위로 말아 올림
    S=Scene()
    S.add(ell(P(0,6,5),(5,3.4,5)),B1,1.5,'b')
    for i in range(5):S.add(ell(P(0,5.6,-1-i*3),(5.6-i*.5,3.2,1.8)),B2 if i%2 else B1,.6,'b')
    segs(S,[P(0,7,-15),P(0,11,-15),P(0,14.5,-12),P(0,16.5,-8),P(0,17,-4)],2.2,1.6,B1,'t')
    S.add(ell(P(0,16.5,-.5),(1.8,1.6,2.4)),B2,1,'t');S.add(cap(P(0,16,1.5),P(0,14.5,4),.7,.15),AC,0)
    for s in(-1,1):
        S.add(sphere(P(s*1.4,9,7),.7),EY,0)
        claw(S,s,P(s*4,6,7),P(s*8,6.5,11),P(s*9,6.5,15),4.2)
        for k in range(4):L(S,[P(s*4.5,5,4-k*2.8),P(s*8.5,4,3-k*3.4),P(s*10.5,0,1-k*4)],1.0,.6)
    return S
def sc2():  # 땅딸이: 큰 집게, 짧고 굵은 꼬리
    S=Scene()
    S.add(ell(P(0,6.5,3),(6.5,4,6)),B1,1.5,'b');S.add(ell(P(0,6,-5),(6,3.6,4)),B2,1.2,'b')
    segs(S,[P(0,7,-9.5),P(0,10,-10.5),P(0,12.5,-8.5),P(0,13.5,-5.5)],2.6,2.0,B1,'t')
    S.add(ell(P(0,13,-3),(2,1.8,2.4)),B2,1,'t');S.add(cap(P(0,12.6,-1),P(0,11,1.5),.8,.2),AC,0)
    for s in(-1,1):
        S.add(sphere(P(s*1.6,9.6,6.5),.8),EY,0)
        claw(S,s,P(s*5,6.5,6),P(s*9.5,7,9),P(s*10.5,7,14),6.2)
        for k in range(4):L(S,[P(s*5.5,5,3-k*2.4),P(s*9,4,2-k*2.8),P(s*10.5,0,0-k*3.2)],1.2,.8)
    return S
def sc3():  # 날씬형: 긴 집게 팔, 뒤로 곧게 뻗은 긴 꼬리
    S=Scene()
    S.add(ell(P(0,5.6,6),(3.8,3,4.4)),B1,1.5,'b')
    for i in range(5):S.add(ell(P(0,5.2,1-i*2.6),(4.2-i*.4,2.6,1.5)),B2 if i%2 else B1,.5,'b')
    segs(S,[P(0,5.4,-13),P(0,5.6,-16.5),P(0,5.8,-20),P(0,6,-23.5),P(0,6.3,-27)],1.6,1.3,B1,'t')
    S.add(ell(P(0,6.5,-30),(1.7,1.6,2.2)),B2,1,'t');S.add(cap(P(0,6.4,-32),P(0,6,-34.5),.6,.15),AC,0)
    for s in(-1,1):
        S.add(sphere(P(s*1.2,8.2,8.5),.6),EY,0)
        claw(S,s,P(s*3,5.6,8.5),P(s*7.5,6,15),P(s*7,6,21),3.4)
        for k in range(4):L(S,[P(s*3.6,4.5,5-k*2.4),P(s*8,3.5,4-k*3),P(s*10.5,0,2-k*3.6)],.8,.5)
    return S
def sc4():  # 납작 갑옷형: 넓은 판, 가시 꼬리, 작은 집게
    S=Scene()
    S.add(lambda Q:np.maximum(ell(P(0,5.4,1),(8.5,3.4,10))(Q),-(Q[...,1]-2)),B1,1.5,'b')
    for i in range(4):S.add(cap(P(-7+i*0.3,6.8,4-i*4),P(7-i*0.3,6.8,4-i*4),.45,.45),B2,0)
    for i in range(6):S.add(crystal(P((-1)**i*8.6,5.2,7-i*2.6),D((-1)**i,.1,-.2),2.2,.9,tip=.8),AC,0)
    segs(S,[P(0,5.5,-11),P(0,6,-14),P(0,6.6,-17),P(0,7.4,-20)],2.0,1.7,B1,'t')
    for k in range(4):S.add(crystal(P(0,8,-11-k*3),D(0,1,-.3),2,.8,tip=.8),AC,0)
    S.add(ell(P(0,8,-22.5),(1.8,1.6,2.2)),B2,1,'t');S.add(cap(P(0,8,-24.5),P(0,7.6,-27),.7,.15),AC,0)
    for s in(-1,1):
        S.add(sphere(P(s*1.6,8.2,9),.7),EY,0)
        claw(S,s,P(s*5,5.6,9),P(s*8,5.8,12),P(s*8.6,5.8,15),3.2)
        for k in range(4):L(S,[P(s*8,4,5-k*3.6),P(s*11,2.5,4-k*3.8),P(s*12.5,0,2-k*4)],1.0,.7)
    return S
# ================= 아르마딜로 (오른쪽을 봄) =================
def head(S,f,y,sn=4,ear=True):
    S.add(ell(P(0,y,f),R(3.2,3,3.4)),B2,1.2,'h');S.add(cap(P(0,y-.4,f+2),P(0,y-1,f+2+sn),1.9,.9),B2,1,'h')
    for s in(-1,1):
        S.add(sphere(P(s*1.9,y+1.4,f+1.8),.8),EY,0)
        if ear:S.add(ell(P(s*3.6,y+2,f-1.4),R(1.8,.7,1.5)),B2,.5,'h')
def ad1():  # 세띠형: 앞·뒤 방패 + 띠 세 줄
    S=Scene()
    S.add(ell(P(0,5.6,4.5),R(5.6,4.8,4)),B1,1,'s');S.add(ell(P(0,5.6,-4.5),R(5.6,4.8,4)),B1,1,'s')
    for i in range(3):S.add(ell(P(0,5.8,1.6-i*1.6),R(5.8,5.0,.75)),B2,.3,'s')
    head(S,9.5,4.6);S.add(cap(P(0,4,-8),P(0,3,-13),1.4,.5),B2,1,'t')
    for s in(-1,1):
        for f in(5,-4):L(S,[P(s*4,2.5,f),P(s*5,0,f+.6)],1.3,1.1)
    return S
def ad2():  # 큰 아르마딜로형: 길고 띠 많음, 큰 앞발톱
    S=Scene()
    S.add(ell(P(0,5,0),R(5.4,4.4,11)),B1,1,'s')
    for i in range(9):S.add(ell(P(0,5.2,7-i*1.75),R(5.5-abs(i-4)*.12,4.5-abs(i-4)*.1,.45)),B2,.2,'s')
    head(S,12.5,4.2,3.2);S.add(cap(P(0,3.6,-11),P(0,2.6,-17),1.6,.5),B2,1,'t')
    for s in(-1,1):
        L(S,[P(s*4,2,7),P(s*5.4,0,8.4)],1.5,1.2)
        for k in range(3):S.add(cap(P(s*5.2,0,8.6),P(s*(4.6+k*.7),0,10.6),.35,.2),AC,0)
        L(S,[P(s*4,2,-6),P(s*5.2,0,-6)],1.5,1.2)
    return S
def ad3():  # 공처럼 둥근형
    S=Scene()
    S.add(sphere(P(0,6.5,0),6.8),B1,1,'s')
    for i in range(3):S.add(lambda Q,i=i:np.abs(sphere(P(0,6.5,0),6.95)(Q))-.25+((np.abs((np.array(Q)[...,0] if mon.ORI=='right' else np.array(Q)[...,2])-(1.8-i*1.8))-.35).clip(0)*9),B2,0)
    S.add(ell(P(0,4,6.4),R(2.2,2,2)),B1,1,'h');S.add(cap(P(0,3.6,7.6),P(0,3,10),1.2,.6),B1,.8,'h')
    for s in(-1,1):S.add(sphere(P(s*1.2,4.8,7.6),.5),EY,0);S.add(ell(P(s*1.5,5.8,5.8),R(.8,1.2,.5)),B2,.4,'h')
    S.add(cap(P(0,3,-6),P(1,2,-9),1,.4),B2,1,'t')
    for s in(-1,1):
        for f in(3,-3):L(S,[P(s*3.6,1.6,f),P(s*4.2,0,f+.4)],1.0,.9)
    return S
def ad4():  # 결정 박힌 껍질형: 띠 사이사이 결정 덩어리
    S=Scene()
    S.add(ell(P(0,5.6,0),R(5.8,5,8.5)),B1,1,'s')
    for i in range(5):S.add(ell(P(0,5.8,5-i*2.5),R(5.9,5.1,.55)),B2,.3,'s')
    for (x,f,l) in [(1.5,2.6,3.6),(-2.4,1.4,2.8),(2.6,-2.6,3.2),(-.8,-4.2,2.4),(0,4.8,2.2)]:S.add(crystal(P(x,9.6,f),D(x*.15,1,-.1),l,1.2,tip=.6),AC,0)
    head(S,10,4.6);S.add(cap(P(0,4,-8.5),P(0,3,-13),1.4,.5),B2,1,'t')
    for s in(-1,1):
        for f in(5,-4):L(S,[P(s*4.2,2.5,f),P(s*5.2,0,f+.6)],1.3,1.1)
    return S
# ================= 땅강아지 (위를 봄) =================
def spade(S,s,base,size):
    b=np.array(base,float);sd=np.array(P(s,0,0),float);fw=np.array(P(0,0,1),float)
    legs(S,[tuple(b),tuple(b+sd*size*.8+fw*size*.4)],size*.3,size*.32,B1,'sp%d'%s)
    c=b+sd*size*1.2+fw*size*.7;S.add(ell(tuple(c),(size*.55,size*.3,size*.5)),B1,1,'sp%d'%s)
    for k in range(4):S.add(cap(tuple(c+fw*size*.3+sd*size*(k*.22-.33)),tuple(c+fw*size*.85+sd*size*(k*.3-.45)),size*.11,size*.05),AC,0)
def mc1():  # 정통형
    S=Scene()
    S.add(ell(P(0,6,7.5),(4.4,3.6,4.4)),B1,1.5,'b');S.add(ell(P(0,5.8,11.5),(2.8,2.6,2.4)),B2,1.2,'b')
    for i in range(5):S.add(ell(P(0,5.2,1.5-i*3.2),(4.4-i*.4,3.2-i*.2,1.9)),B2 if i%2 else B1,.6,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.6,7.6,12.4),.7),EY,0);S.add(cap(P(s*1,6.6,13.4),P(s*3.4,6.6,17),.3,.2),LG,0)
        spade(S,s,P(s*3.4,5.6,9.5),4.2)
        L(S,[P(s*3.6,4.5,3),P(s*7,2.5,2),P(s*8,0,-.5)],1.0,.7);L(S,[P(s*3.4,4.5,-2),P(s*7.5,3,-5),P(s*8.5,0,-9)],1.3,.8)
        S.add(cap(P(s*1.4,5,-12),P(s*3,4.6,-16),.5,.2),LG,0)
    return S
def mc2():  # 땅딸이: 큰 앞가슴 방패, 짧은 배, 아주 큰 삽 앞발
    S=Scene()
    S.add(ell(P(0,6.8,5),(6.2,4.6,6.4)),B1,2,'b');S.add(ell(P(0,6.2,11.5),(3.2,2.8,2.4)),B2,1.2,'b')
    for i in range(3):S.add(ell(P(0,5.4,-3-i*3.2),(5-i*.8,3.4-i*.3,2)),B2 if i%2 else B1,.6,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.8,8,12.4),.75),EY,0);S.add(cap(P(s*1.2,7,13.4),P(s*3,7,16),.35,.2),LG,0)
        spade(S,s,P(s*4.4,6,10),5.6)
        L(S,[P(s*4.8,4.5,0),P(s*8.5,2.5,-1.5),P(s*9.5,0,-4)],1.2,.8);L(S,[P(s*4,4.5,-5),P(s*8,3,-8),P(s*9,0,-11)],1.4,.9)
    return S
def mc3():  # 날씬형: 길쭉한 몸, 작은 삽, 긴 더듬이
    S=Scene()
    S.add(ell(P(0,5.6,7),(3.4,3,3.8)),B1,1.5,'b');S.add(ell(P(0,5.6,10.6),(2.4,2.3,2)),B2,1.2,'b')
    for i in range(6):S.add(ell(P(0,5,2-i*3),(3.4-i*.25,2.8-i*.15,1.7)),B2 if i%2 else B1,.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.4,7,11.4),.6),EY,0)
        legs(S,[P(s*.9,6,12),P(s*3,6,17),P(s*6.5,6,22)],.3,.2,LG,'an',0)
        spade(S,s,P(s*2.8,5.4,8.5),3.2)
        L(S,[P(s*3,4.3,3),P(s*6.5,2.5,1.5),P(s*7.5,0,-1)],.9,.6);L(S,[P(s*2.8,4.3,-3),P(s*6.5,3,-7),P(s*7.5,0,-11)],1.1,.7)
    return S
def mc4():  # 날개 접은형: 배 위로 접힌 날개 두 장
    S=Scene()
    S.add(ell(P(0,6,7.5),(4.6,3.6,4.6)),B1,1.5,'b');S.add(ell(P(0,5.8,11.6),(2.8,2.6,2.4)),B2,1.2,'b')
    for i in range(4):S.add(ell(P(0,5,1-i*3.2),(4.2-i*.5,3-i*.2,1.9)),B2,.6,'b')
    for s in(-1,1):S.add(lambda Q,s=s:ell(P(s*1.6,7.4,-3),(2,.5,8.5))(Q),B1,.8,'w')
    for s in(-1,1):
        S.add(sphere(P(s*1.6,7.6,12.5),.7),EY,0);S.add(cap(P(s*1,6.6,13.4),P(s*3,6.6,16.6),.3,.2),LG,0)
        spade(S,s,P(s*3.6,5.6,9.6),4.4)
        L(S,[P(s*3.8,4.5,3),P(s*7,2.5,2),P(s*8,0,-.5)],1.0,.7);L(S,[P(s*3.4,4.5,-2),P(s*7.5,3,-5),P(s*8.5,0,-9)],1.3,.8)
    return S
# ================= 큰 먹이 (위를 봄) =================
def fd1():  # 애벌레: 마디 + 배다리 + 꼬리 뿔
    S=Scene()
    for i in range(5):S.add(sphere(P(0,5.2,7-i*3.8),4.8-abs(i-1.5)*.3),B1,1.4,'b')
    S.add(sphere(P(0,5.6,10.6),3.6),B2,1,'b')
    for s in(-1,1):S.add(sphere(P(s*1.6,7.6,12),.7),EY,0)
    for i in range(5):
        for s in(-1,1):L(S,[P(s*4,2.6,7-i*3.8),P(s*5,0,7-i*3.8)],.9,.7)
    S.add(cap(P(0,8.6,-9),P(0,11,-12),.8,.2),AC,0)
    return S
def fd2():  # 굼벵이: C자로 말린 통통한 몸
    S=Scene();pts=[(0,9),(3,6),(5,2),(5.4,-2.5),(3.8,-6.5),(.5,-8.8)]
    for i,(x,f) in enumerate(pts):S.add(sphere(P(x,4.6,f),4.4-i*.4),B1,1.8,'b')
    S.add(sphere(P(-1.5,5,11.5),3),B2,1,'b')
    for s in(-1,1):legs(S,[P(-1.5+s*2,3,9.5),P(-1.5+s*3.6,0,10.6)],.7,.5,LG,'lg',.6)
    return S
def fd3():  # 달팽이: 나선 껍데기
    S=Scene()
    S.add(ell(P(0,2.2,1),(3.2,2,12)),B2,1.5,'b')
    for s in(-1,1):S.add(cap(P(s*1,3.2,11),P(s*2.4,4.6,15),.45,.35),B2,0);S.add(sphere(P(s*2.4,4.6,15.2),.7),EY,0)
    for k in range(4):S.add(sphere(P(math.cos(k*1.9)*(2.6-k*.6),6.8+k*.8,-1+math.sin(k*1.9)*(2.6-k*.6)),5.4-k*1.2),B1,.6,'s')
    return S
def fd4():  # 민달팽이: 매끈한 긴 몸 + 등 외투막
    S=Scene()
    S.add(ell(P(0,3.2,0),(3.6,3,12)),B1,1.5,'b');S.add(ell(P(0,5.6,3),(3.6,1.6,5)),B2,1.2,'b')
    for s in(-1,1):S.add(cap(P(s*1,4.4,10.5),P(s*2.2,6.4,14),.5,.35),B2,0);S.add(sphere(P(s*2.2,6.5,14.2),.65),EY,0)
    for k in range(5):S.add(sphere(P((-1)**k*1.4,5,-2-k*2),.6),B2,0)
    return S
if __name__=='__main__':
    M=NM()
    mon.ORI='up'
    for i,f in enumerate([sc1,sc2,sc3,sc4]):spr(f(),80,90,.8,(0,6,-2),89,'xs%d'%(i+1),(),M=M,light=LT)
    for i,f in enumerate([mc1,mc2,mc3,mc4]):spr(f(),64,80,.75,(0,6,0),89,'xm%d'%(i+1),(),M=M,light=LT)
    for i,f in enumerate([fd1,fd2,fd3,fd4]):spr(f(),44,52,.75,(0,5,0),89,'xf%d'%(i+1),(),M=M,light=LT)
    mon.ORI='right'
    for i,f in enumerate([ad1,ad2,ad3,ad4]):spr(f(),70,50,.7,(0,5,0),89,'xa%d'%(i+1),(),M=M,light=LT)
