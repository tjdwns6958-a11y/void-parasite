from common import *
import mon
from mon import LT
P=lambda x,y,f:mon.P(x,y,f);D=P;R=lambda x,y,f:mon.Rr(x,y,f)
FL=16;SH=17;CL=18;EYB=19;SH2=20;FL2=21
def flat(r,**k):
    d=dict(ramp=r,amb=.62,dif=.42,rim=0,fill=0,dith=0,gk=0,spec=0);d.update(k);return d
def FM():
    M=mats()
    M[FL]=flat(ramp(0xb0384e,0xe06474,0xf48c96));M[FL2]=flat(ramp(0x7a1e34,0xa8344e,0xc84a60))
    M[SH]=flat(ramp(0x2a5a8a,0x3c78aa,0x5a96c4));M[SH2]=flat(ramp(0x1c3e64,0x2a5680,0x386c98))
    M[CRY]=flat(ramp(0x7cd0f4,0xb8ecff,0xffffff),amb=.75,dif=.3)
    M[BONE]=flat(ramp(0xd8ccb8,0xfff6e8,0xffffff),amb=.75,dif=.3)
    M[CL]=flat(ramp(0x5a1424,0x7a2232,0x8a2a3a))
    M[EYE]=flat(ramp(0xff4a2a,0xffb040,0xffe080),amb=.9,dif=.1)
    M[EYB]=flat(ramp(0x0c1828,0x14243a,0x9ae8ff),amb=.8,dif=.2)
    M[DARK]=flat(ramp(0x200814,0x300c1c,0x401024),amb=.8,dif=.2)
    return M
# ================= 낫그늘 (포식) — 위를 봄 =================
def mantis():
    S=Scene()
    S.add(ell(P(0,6,-7),(4.4,3.4,8)),FL,1.5,'b');S.add(cap(P(0,7,0),P(0,7,8),2.4,2.2),FL,1,'b')
    S.add(lambda Q:np.maximum(ell(P(0,7.5,11),(5,3,2.8))(Q),0),FL,1.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*4.2,8.2,11.4),1.6),EYE,0)
        legs(S,[P(s*2,7,6),P(s*7,8.5,10+(1 if s>0 else 0))],1.8,1.6,FL2,'a%d'%s)
        S.add(crystal(P(s*7,8.5,10+(1 if s>0 else 0)),D(s*-.45,0,-.9),9,1.7,tip=.85),BONE,0)
        legs(S,[P(s*2.5,5,1),P(s*8,2,3),P(s*10,0,0)],1.0,.8,CL);legs(S,[P(s*3,5,-3),P(s*8,2,-7),P(s*10,0,-11)],1.0,.8,CL)
    return S
def tiger_beetle():
    S=Scene()
    S.add(ell(P(0,6,-4),(6,4,8)),FL,2,'b');S.add(ell(P(0,6.5,6),(4.6,3.6,3.6)),FL2,1.5,'b');S.add(ell(P(0,6.6,11),(4.4,3.2,3)),FL,1.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*3.8,8.2,12),1.5),EYE,0)
        S.add(cap(P(s*2,6.5,13),P(s*4.5,6.5,17),1.2,.7),BONE,1);S.add(cap(P(s*4.5,6.5,17),P(s*1.5,6.5,19.5),.8,.4),BONE,1)
        for k,(f,df) in enumerate([(6,3),(1,-1),(-4,-6)]):legs(S,[P(s*4,5,f),P(s*10,3,f+df*.4),P(s*13,0,f+df)],1.0,.7,CL)
    for s in(-1,1):S.add(sphere(P(s*2.5,9.6,-5),1.3),BONE,0)
    return S
def scorpion():
    S=Scene()
    S.add(ell(P(0,6,1),(6,4,8)),FL,2,'b');S.add(ell(P(0,6.4,9),(4,3.2,3)),FL,1.5,'b')
    for i in range(5):S.add(sphere(P(.6*i,7.5+i*.8,-8-i*3.2),2.3-i*.2),FL2,1,'t')
    S.add(crystal(P(2.8,11.5,-22),D(.2,.3,1),5,1.4,tip=.9),BONE,0)
    for s in(-1,1):
        S.add(sphere(P(s*1.8,8.2,10.5),1.1),EYE,0)
        legs(S,[P(s*3.5,6,9),P(s*8,6.5,13),P(s*9,6.5,17)],1.6,1.4,FL2,'c%d'%s)
        S.add(ell(P(s*9.5,6.6,19.5),(3.6,2.4,4.4)),FL,1.4,'c%d'%s)
        S.add(cap(P(s*8.2,6.8,22.5),P(s*7.6,6.8,27),1.3,.4),FL2,.6,'c%d'%s);S.add(cap(P(s*11,6.8,22.5),P(s*10.6,6.8,26),1.1,.4),FL2,.6,'c%d'%s)
        for k in range(3):legs(S,[P(s*5,5,4-k*4),P(s*10,2,4-k*4-1),P(s*12,0,4-k*4-3)],1.0,.7,CL)
    return S
# ================= 제르사이 유생 (갑각) — 오른쪽을 봄 =================
def horned_frog():
    S=Scene()
    S.add(ell(P(0,5,0),R(8,4.4,8)),SH,2.5,'b');S.add(ell(P(0,5,7),R(7,3.6,4)),SH,2,'b')
    S.add(cap(P(-5,5.4,10.4),P(5,5.4,10.4),.6,.6),DARK,0)
    for s in(-1,1):
        S.add(sphere(P(s*4,8,6),1.8),EYB,0);S.add(crystal(P(s*4,9.2,5.5),D(s*.3,1,-.3),3,1.1,tip=.7),CRY,0)
        legs(S,[P(s*6,3.4,-5),P(s*11,3,-4+(1 if s>0 else 0)),P(s*12,0,-9)],2.2,1.6,SH2)
        legs(S,[P(s*6,3.4,4),P(s*9,1.5,7)],1.5,1.2,SH2)
    for k,(x,f) in enumerate([(0,-1),(-2.5,-4),(2.5,-4)]):S.add(sphere(P(x,8.6,f),1.3),CRY,0)
    return S
def grasshopper():
    S=Scene()
    S.add(ell(P(0,6,-3),R(3.6,3.4,9)),SH,1.5,'b');S.add(ell(P(0,6.6,6),R(3.6,3.6,3.4)),SH,1.5,'b');S.add(ell(P(0,6.6,10.4),R(3,3,2.6)),SH2,1.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*2.2,8,10.4),1.2),EYB,0)
        legs(S,[P(s*2.8,7,-1),P(s*6.5,11,3),P(s*7,4,-10),P(s*5.5,0,-14)],1.9,.9,SH2)
        legs(S,[P(s*2.5,5,5),P(s*5.5,2,7+(1 if s<0 else 0))],1.0,.8,SH2)
        S.add(cap(P(s*1.3,8,12),P(s*4,8.5,18),.45,.3),SH2,0)
    S.add(ell(P(0,8.4,-2),R(2.6,1.2,7)),CRY,1)
    return S
def armadillo():
    S=Scene()
    for i in range(5):
        f=6-i*3.2;r=6.4-abs(i-1.8)*.5
        S.add(ell(P(0,5.4,f),R(r,5-abs(i-1.8)*.4,2.2)),SH if i%2 else SH2,.4,'b')
    S.add(ell(P(0,4.4,9.6),R(2.8,2.6,3.2)),SH,1.2,'b')
    S.add(cap(P(0,4,-10),P(0,3,-15),1.6,.6),SH2,1)
    for (x,f,L) in [(1.5,2.6,3.6),(-1,1.8,2.8),(2,-3.6,3.2),(0,-4.6,2.4)]:S.add(crystal(P(x,9.2,f),D(x*.2,1,-.2),L,1.2,tip=.6),CRY,0)
    for s in(-1,1):
        S.add(sphere(P(s*1.6,5.8,11.4),1.0),EYB,0);S.add(cap(P(s*1.6,6,10),P(s*2.6,7.6,10.5),.7,.4),SH2,0)
        for f in(4,-6):legs(S,[P(s*5.2,2.5,f),P(s*7,0,f-.5)],1.3,1.1,SH2)
    return S
# ================= 땅울음 (갑각) — 위를 봄 =================
def mole_cricket():
    S=Scene()
    S.add(ell(P(0,7,4),(7,5,7)),SH,2.5,'b');S.add(ell(P(0,6,-7),(6,4,7)),SH2,1.5,'b');S.add(ell(P(0,7.2,11.5),(4.6,3.6,3.6)),SH,2,'b')
    for s in(-1,1):
        S.add(sphere(P(s*2.6,9.4,13),1.3),EYB,0)
        legs(S,[P(s*5,6,8),P(s*9,6.5,12)],2.6,2.4,SH2)
        for k in range(3):S.add(crystal(P(s*(8+k*1.4),6.6,13.5),D(s*.2,0,1),3.4,1.0,tip=.75),CRY,0)
        legs(S,[P(s*5,4.5,-2),P(s*9,2,-4+(1 if s<0 else 0))],1.4,1.1,SH2);legs(S,[P(s*4.5,4.5,-9),P(s*9,2,-12)],1.4,1.1,SH2)
        S.add(cap(P(s*2,6,-13),P(s*4,5,-18),.6,.3),SH2,0)
    for (x,f,L) in [(1.5,5,3.6),(-1.8,3,3),(0.5,1,2.6)]:S.add(crystal(P(x,11.5,f),D(x*.15,1,-.3),L,1.3,tip=.6),CRY,0)
    return S
def pangolin():
    S=Scene()
    for i in range(6):
        f=8-i*3.6;r=6.4-abs(i-2)*.6
        S.add(ell(P(0,5.6,f),(r,4.4-abs(i-2)*.3,2.6)),SH if i%2 else SH2,.4,'b')
        for x in(-r*.45,0,r*.45):S.add(sphere(P(x,9.2-abs(i-2)*.35,f+.6),1.0),CRY,0)
    for i in range(4):S.add(ell(P(0,5,-14-i*3),(3.2-i*.6,2.6-i*.4,2)),SH2,.6,'b')
    S.add(ell(P(0,5.2,12.5),(3,2.6,3.6)),SH,1.4,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.6,6.6,14),.9),EYB,0)
        legs(S,[P(s*5,3,6),P(s*7.5,0,8.5)],1.5,1.2,SH2);legs(S,[P(s*5,3,-6),P(s*7.5,0,-7)],1.5,1.2,SH2)
    return S
def horseshoe():
    S=Scene()
    S.add(lambda Q:np.maximum(ell(P(0,4.5,5),(11,4.6,9))(Q),-(Q[...,1]-1.5)),SH,2,'b')
    S.add(lambda Q:np.maximum(ell(P(0,4.2,-6),(7,3.6,5))(Q),-(Q[...,1]-1.5)),SH2,2,'b')
    S.add(cap(P(0,4,-10),P(0,3,-22),1.4,.4),SH2,.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*4.5,7.8,8),1.2),EYB,0)
        S.add(cap(P(s*3,7.6,0),P(s*7,6.6,9),.7,.7),CRY,0)
        for k in range(3):S.add(crystal(P(s*7,3,-4-k*2),D(s,.2,-.2),2.6,1.0,tip=.7),CRY,0)
    S.add(cap(P(0,8.4,-2),P(0,8.6,10),.9,.9),CRY,0)
    return S
if __name__=='__main__':
    M=FM()
    mon.ORI='up'
    for n,f in [('fk1',mantis),('fk2',tiger_beetle),('fk3',scorpion)]:spr(f(),70,76,.85,(0,6,0),89,n,(),M=M,light=LT)
    for n,f in [('fr1',mole_cricket),('fr2',pangolin),('fr3',horseshoe)]:spr(f(),80,84,.9,(0,6,0),89,n,(),M=M,light=LT)
    mon.ORI='right'
    for n,f in [('fg1',horned_frog),('fg2',grasshopper),('fg3',armadillo)]:spr(f(),64,60,.78,(0,6,0),89,n,(),M=M,light=LT)
