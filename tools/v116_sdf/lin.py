from common import *
import mon
from mon import LT
P=lambda x,y,f:mon.P(x,y,f);D=P;R=lambda x,y,f:mon.Rr(x,y,f)
FL=16;SH=17;CL=18;EYB=19
def LM():
    M=mats()
    M[FL]=dict(ramp=ramp(0x3a0c1e,0x6e1a36,0xa8344e,0xe06474,0xffa8b0),tex=lambda Q:noise3(Q,.5),texk=.08,amb=.14,dif=.85,rim=.35,fill=.12,dith=.04,gk=.2,spec=8)
    M[SH]=dict(ramp=ramp(0x0a1626,0x16304e,0x244c74,0x386c98,0x5a92bc,0x90c4e4),tex=lambda Q:noise3(Q,.4),texk=.06,amb=.06,dif=.8,rim=.35,fill=.1,dith=.04,gk=.2,spec=10)
    M[CRY]=dict(ramp=ramp(0x3a8ac0,0x7cd0f4,0xc8f2ff,0xffffff),amb=.4,dif=.55,spec=20,rim=.3,dith=.02,gk=0)
    M[BONE]=dict(ramp=ramp(0x8a7a6a,0xd8ccb8,0xfff6e8,0xffffff),amb=.4,dif=.6,spec=10,dith=.02,gk=0)
    M[CL]=dict(ramp=ramp(0x2a0810,0x5a1424,0x8a2a3a),amb=.3,dif=.6,dith=.02,gk=0)
    M[EYE]=dict(ramp=ramp(0xa01818,0xff4a2a,0xffd060),amb=.75,dif=.2,gk=0,dith=0)
    M[EYB]=dict(ramp=ramp(0x081420,0x1c3a5a,0x9ae8ff),amb=.5,dif=.4,spec=40,gk=0,dith=0)
    M[DARK]=dict(ramp=ramp(0x1a0610,0x3a0c1e),amb=.5,dif=.3,gk=0,dith=0)
    return M
# ================= 낫그늘 (포식, 위를 봄) =================
def k1():  # 낫 사마귀: 가는 분홍 몸, 크게 접은 뼈 낫
    S=Scene()
    S.add(ell(P(0,6,-6),(4.6,3.8,8)),FL,2,'b');S.add(ell(P(0,7,5),(3.2,3,5)),FL,1.6,'b')
    S.add(lambda Q:ell(P(0,8,11.5),(4.4,3.2,3))(Q),FL,1.6,'b')
    for s in(-1,1):
        S.add(sphere(P(s*3.2,9.4,12),1.4),EYE,0)
        sh=P(s*3,8,7);el=P(s*8+(1 if s>0 else 0),10,13+(1.5 if s<0 else 0))
        legs(S,[sh,el],2.0,1.8,FL,'a%d'%s)
        S.add(crystal(el,D(s*-.55,.05,-.85+(0.15 if s>0 else 0)),12,2.0,tip=.85),BONE,0)
        legs(S,[P(s*3.5,5,2),P(s*8,2,1+(2 if s>0 else -1)),P(s*10,0,-1)],1.3,.9,CL)
        legs(S,[P(s*3.8,5,-7),P(s*8,2,-9+(1 if s<0 else -1)),P(s*10,0,-12)],1.3,.9,CL)
    return S
def k2():  # 이빨 사냥꾼: 큰 머리와 벌린 턱, 짧은 낫
    S=Scene()
    S.add(ell(P(0,6,-6),(5.5,4.2,7)),FL,2,'b');S.add(ell(P(0,7.2,6),(7,4.4,6)),FL,2,'b')
    S.add(sphere(P(0,7,11.5),2.6),DARK,0)
    for s in(-1,1):
        S.add(sphere(P(s*4,10,8),1.6),EYE,0)
        S.add(cap(P(s*3.5,7,10),P(s*2,7,15.5),1.6,.6),BONE,1)
        for t in range(3):S.add(crystal(P(s*(3.2-t*.6),7.5,11+t*1.5),D(-s,.1,.2),2.2,.6,tip=.9),BONE,0)
        legs(S,[P(s*5,7,2),P(s*9,8,4+(1 if s>0 else 0))],1.8,1.5,FL)
        S.add(crystal(P(s*9,8,4+(1 if s>0 else 0)),D(s*.3,0,1),7,1.6,tip=.85),BONE,0)
        legs(S,[P(s*4.5,5,-4),P(s*9,2,-6),P(s*10.5,0,-9)],1.4,.9,CL)
    for i in range(3):S.add(crystal(P(0,9.6,-2-i*3.6),D(0,1,-.6),3,1.1,tip=.8),BONE,0)
    return S
def k3():  # 가시 등 사냥꾼: 웅크린 몸, 등뼈 가시, 비대칭 낫
    S=Scene()
    S.add(ell(P(0,7,-4),(6,5,9)),FL,2.5,'b');S.add(ell(P(0,7.5,8),(4,3.6,4)),FL,2,'b')
    for s in(-1,1):S.add(sphere(P(s*2,9.6,10),1.3),EYE,0)
    for i in range(5):S.add(crystal(P((i%2-.5)*1.6,11-i*.3,4-i*3.6),D((i%2-.5)*.6,1,-.5),4.5-i*.4,1.4,tip=.85),BONE,0)
    legs(S,[P(4,8,6),P(9,10,11)],1.9,1.6,FL);S.add(crystal(P(9,10,11),D(-.4,.1,.9),11,1.9,tip=.85),BONE,0)
    legs(S,[P(-4,8,6),P(-8,9,4)],1.9,1.6,FL);S.add(crystal(P(-8,9,4),D(-.2,.1,1),8,1.7,tip=.85),BONE,0)
    for s in(-1,1):
        for f,df in((-2,1),(-9,-1)):legs(S,[P(s*5,5,f),P(s*9.5,2,f+df),P(s*11,0,f-2)],1.4,1.0,CL)
    return S
# ================= 제르사이 유생 (갑각, 오른쪽을 봄) =================
def g1():  # 갑옷 메뚜기: 겹친 판 갑옷 + 굵은 뒷다리 결정 박차
    S=Scene()
    for i in range(3):S.add(ell(P(0,6.5-i*.3,3-i*4.2),R(4.6-i*.3,4.2,3.2)),SH,1.2,'b')
    S.add(ell(P(0,6.8,7.5),R(4,3.8,3.4)),SH,1.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*2.6,8.4,9.2),1.3),EYB,0)
        legs(S,[P(s*4,6,-2),P(s*8,9.5,1+(1 if s>0 else 0)),P(s*8.5,2.5,-7),P(s*7,0,-10)],2.4,1.2,SH)
        S.add(crystal(P(s*8,9.5,1+(1 if s>0 else 0)),D(s*.3,1,-.3),4,1.3,tip=.7),CRY,0)
        legs(S,[P(s*3.2,4,4),P(s*6,1.5,6+(1 if s<0 else 0))],1.3,1.0,SH)
    S.add(crystal(P(0,9.8,0),D(0,1,-.5),4.5,1.8,tip=.6),CRY,0)
    return S
def g2():  # 결정 두꺼비: 둥근 껍질 등딱지 + 결정 돌기
    S=Scene()
    S.add(ell(P(0,5.4,-.5),R(8,5,8)),SH,2.5,'b');S.add(ell(P(0,5,7),R(6,3.6,3.6)),SH,2,'b')
    S.add(cap(P(-4,5.4,9.6),P(4,5.4,9.6),.7,.7),DARK,0)
    for s in(-1,1):
        S.add(sphere(P(s*3.5,8,6),1.6),EYB,0)
        legs(S,[P(s*6,3.5,-4),P(s*10,3,-6+(1 if s>0 else 0)),P(s*10.5,0,-9)],2.2,1.6,SH)
        legs(S,[P(s*6,3.5,4),P(s*8.5,1.5,6)],1.6,1.3,SH)
    for k,(x,f,L) in enumerate([(0,-2,5),(-3,-4.5,3.6),(3.2,-3.6,3.4),(-1.5,1.5,3)]):S.add(crystal(P(x,9,f),D(x*.1,1,-.3),L,1.6,tip=.6),CRY,0)
    return S
def g3():  # 가시 공벌레: 띠 껍질, 띠마다 짧은 결정 (웅크리면 공)
    S=Scene()
    for i in range(5):
        f=6-i*3.4;r=5.8-abs(i-1.8)*.6
        S.add(ell(P(0,5.4,f),R(r,5-abs(i-1.8)*.45,2.2)),SH,.4,'b')
        for s in(-1,1):S.add(crystal(P(s*(r-1.2),8,f),D(s*.8,.8,0),2.4,1.0,tip=.7),CRY,0)
    S.add(ell(P(0,4.4,9),R(3.8,3,2.4)),SH,1.2,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.8,6,10.4),1.1),EYB,0)
        for i in range(3):legs(S,[P(s*4.6,2.5,3-i*3.6),P(s*6.6,0,2.4-i*3.6)],1.0,.8,SH)
    return S
# ================= 땅울음 (갑각, 위를 봄) =================
def r1():  # 삽머리 지네: 결정 날 삽머리, 겹친 판, 짧은 다리
    S=Scene()
    S.add(ell(P(0,6.6,14),(10,3.4,6)),SH,2,'b')
    for k in range(5):S.add(crystal(P(-6+k*3,6.6,19.5),D(0,.1,1),3,1.2,tip=.7),CRY,0)
    for s in(-1,1):S.add(sphere(P(s*4.5,8.8,12.6),1.5),EYB,0)
    for i in range(5):
        f=6-i*5.2;r=8.6-i*1.1
        S.add(ell(P(0,6.4-i*.35,f),(r,4.4-i*.3,3.2)),SH,.8,'b')
        if i<4:
            for s in(-1,1):legs(S,[P(s*(r-1),4.5,f),P(s*(r+3),1.5,f-1+(1 if (i+s)%2 else -1))],1.5,1.1,SH)
    S.add(crystal(P(0,10,4),D(0,1,-.5),5,1.8,tip=.6),CRY,0)
    return S
def r2():  # 땅강아지형: 결정 날 굴착 앞발, 둥근 갑옷 등
    S=Scene()
    S.add(ell(P(0,7,2),(8.5,6,9.5)),SH,2.5,'b');S.add(ell(P(0,7.4,11.5),(6,4.4,4.4)),SH,2,'b')
    for s in(-1,1):
        S.add(sphere(P(s*2.8,10,13),1.5),EYB,0)
        legs(S,[P(s*6,6,8),P(s*11,6.5,12+(1 if s>0 else 0))],2.8,2.6,SH)
        S.add(ell(P(s*13,6.5,15+(1 if s>0 else 0)),(4,2.2,3.4)),SH,1.4,'b')
        for k in range(3):S.add(crystal(P(s*(11.5+k*1.6),6.6,18+(1 if s>0 else 0)),D(s*.1,0,1),3.2,1.0,tip=.75),CRY,0)
        legs(S,[P(s*7,4.5,-4),P(s*10,2,-6+(1 if s<0 else 0))],1.8,1.4,SH)
    S.add(crystal(P(0,12,1),D(0,1,-.3),5,2.2,tip=.6),CRY,0);S.add(crystal(P(2.5,11,-4),D(.3,1,-.4),3.4,1.5,tip=.6),CRY,0)
    return S
def r3():  # 투구게형: 넓은 방패 머리 + 꼬리 가시
    S=Scene()
    S.add(lambda Q:np.maximum(ell(P(0,4,6),(12,5,10))(Q),-(Q[...,1]-1)),SH,2,'b')
    S.add(ell(P(0,5,-6),(7,3.6,5)),SH,2,'b')
    S.add(cap(P(0,5,-9),P(0,4,-20),1.6,.6),SH,1,'b');S.add(crystal(P(0,4.6,-18),D(0,.1,-1),5,1.2,tip=.8),CRY,0)
    for s in(-1,1):
        S.add(sphere(P(s*4,8.2,10),1.4),EYB,0)
        S.add(cap(P(s*5,8,2),P(s*9,7,10),.8,.8),CRY,0)
        S.add(crystal(P(s*6.5,4,-7),D(s,.2,-.3),4,1.3,tip=.7),CRY,0)
    S.add(crystal(P(0,9.4,4),D(0,1,.2),4,1.6,tip=.6),CRY,0)
    return S
# ================= 큰 먹이 (포식 쪽, 살빛) =================
def fl():
    S=Scene()
    segs=[(8,5.6),(2.5,7.2),(-3.5,7.6),(-9.5,6.6),(-14.5,4.8)]
    for i,(f,r) in enumerate(segs):S.add(ell(P(0,5,f),(r,4.6-i*.25,3.4)),FL,1.6,'b')
    S.add(ell(P(0,5.6,13),(4.4,3.6,3.4)),FL,1.4,'b')
    for s in(-1,1):S.add(sphere(P(s*1.9,7.6,14.6),1.0),DARK,0)
    for i,(f,r) in enumerate(segs[1:4]):
        for s in(-1,1):S.add(sphere(P(s*(r-1.6),7.2,f),1.7),AGATE,0)
    for i,(f,r) in enumerate(segs[:4]):
        for s in(-1,1):legs(S,[P(s*(r-.5),3.5,f),P(s*(r+2.2),0,f-1.2)],.9,.6,FL)
    return S
if __name__=='__main__':
    M=LM()
    mon.ORI='up'
    for n,f in [('lk1',k1),('lk2',k2),('lk3',k3)]:spr(f(),70,72,.85,(0,6,2),89,n,(),M=M,light=LT)
    for n,f in [('lr1',r1),('lr2',r2),('lr3',r3)]:spr(f(),80,84,.9,(0,6,3),89,n,(),M=M,light=LT)
    spr(fl(),46,52,1.0,(0,5,-2),89,'lfl',[(P(0,9,-3),(255,200,90),16,.4)],M=M,light=LT)
    mon.ORI='right'
    for n,f in [('lg1',g1),('lg2',g2),('lg3',g3)]:spr(f(),64,60,.78,(0,6,0),89,n,(),M=M,light=LT)
