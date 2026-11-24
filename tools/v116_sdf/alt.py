from common import *
import mon
from mon import TM,LT
def P(x,y,f):return mon.P(x,y,f)
def D(x,y,f):return mon.P(x,y,f)
def R(x,y,f):return mon.Rr(x,y,f)
# ---------- 제르사이 유생 (오른쪽을 봄) ----------
def gna1():  # 결정 메뚜기: 가는 몸, 아주 긴 뒷다리와 더듬이
    S=Scene()
    S.add(ell(P(0,6,-3),R(3.4,3.2,10)),SHELL,1.5,'b');S.add(ell(P(0,6.5,8),R(3.2,3.2,3.4)),SHELL,1.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*2.2,8,9.5),1.3),EYE)
        legs(S,[P(s*2.5,7,-2),P(s*7,12,4),P(s*8,4,-10),P(s*6,0,-16)],2.0,.6)
        legs(S,[P(s*2.5,5,4),P(s*6,3,7),P(s*6.5,0,10)],.9,.5)
        legs(S,[P(s*1.4,8,10.5),P(s*4,9,16),P(s*7,9,21)],.5,.3,BONE)
    for i,f in enumerate([4,0,-4,-8,-12]):S.add(crystal(P(0,8.6-i*.2,f),D(0,1,-.8),4.5-i*.5,1.1),CRY if i%2 else CRY2,0)
    return S
def gna2():  # 갑각 두꺼비: 아주 넓적한 몸, 짧고 굵은 다리, 큰 입
    S=Scene()
    S.add(ell(P(0,4.6,-1),R(11,4,8)),SHELL,2,'b');S.add(ell(P(0,5,6.5),R(9.5,3.6,4.6)),SHELL,1.8,'b')
    S.add(cap(P(-7,5.6,10.6),P(7,5.6,10.6),.9,.9),DARK,0)
    for s in(-1,1):
        S.add(sphere(P(s*5.5,7.6,6.5),1.9),EYE)
        legs(S,[P(s*8,3.6,-5),P(s*13,3.6,-4),P(s*14,0,-9)],2.8,1.3)
        legs(S,[P(s*8,3.6,4),P(s*12,2,6),P(s*13,0,8)],1.8,1.0)
    random.seed(3)
    for k in range(9):
        a=random.uniform(0,6.28);r=random.uniform(1.5,7);S.add(sphere(P(math.cos(a)*r,7.4,-1+math.sin(a)*r*.7),random.uniform(1,1.6)),CRY2 if k%2 else CRY,0)
    return S
def gna3():  # 가시 공벌레: 띠 모양 갑판, 짧은 다리 여럿, 갑판마다 결정 가시
    S=Scene()
    for i in range(6):
        f=7-i*3.6;r=6.4-abs(i-2)*.7
        S.add(ell(P(0,5.6,f),R(r,4.8-abs(i-2)*.4,2.4)),SHELL,.6,'b')
        for s in(-1,1):S.add(crystal(P(s*(r-1.5),7.4,f),D(s*.9,.7,0),3.2,1.0),CRY if (i+(s>0))%2 else CRY2,0)
        for s in(-1,1):legs(S,[P(s*(r-.8),3,f),P(s*(r+2.4),0,f-.8)],.8,.45)
    S.add(ell(P(0,4.6,10),R(3.8,3,2.6)),SHELL,1.2,'b')
    for s in(-1,1):S.add(sphere(P(s*2,6,11),1.1),EYE);S.add(cap(P(s*1.5,5,12),P(s*4,5,15),.5,.3),BONE,0)
    return S
# ---------- 땅울음 (위를 봄) ----------
def rek1():  # 삽머리 지네 (다듬은 지금 안)
    S=Scene()
    S.add(ell(P(0,7,15),(12.5,3.6,7.5)),SHELL,2.5,'b')
    for s in(-1,1):
        S.add(cap(P(s*6,7,19),P(s*10.5,8,28),2.8,1.1),BONE,1,'b');S.add(crystal(P(s*9.5,8,26),D(s*-.6,0,.8),7,1.3,tip=.7),BONE,0)
        S.add(sphere(P(s*7.5,9.6,14),1.5),EYE)
    for i in range(7):
        f=7-i*5.4;r=10.5-i*1.1
        S.add(ell(P(0,6.6-i*.35,f),(r,4.4-i*.3,3.6)),SHELL,1.0,'b')
        S.add(crystal(P(0,9.6-i*.35,f),D(0,1,-.55),7.5-i*.8,1.9-i*.15,tw=.5),CRY2 if i%2 else CRY,0)
        if i<5:
            for s in(-1,1):legs(S,[P(s*(r-1),6,f),P(s*(r+5),5,f-1.5),P(s*(r+8),0,f-3.5)],1.5,.6)
    return S
def rek2():  # 땅강아지형 (큰 굴착 앞발)
    S=Scene()
    S.add(ell(P(0,7.5,6),(9,5.5,8)),SHELL,2.5,'b');S.add(ell(P(0,7,15),(6,4,4.5)),SHELL,2,'b')
    for i in range(4):S.add(ell(P(0,6-i*.4,-5-i*5.2),(8-i*1.3,4.4-i*.4,3.4)),SHELL,1.2,'b')
    for s in(-1,1):
        S.add(sphere(P(s*3.6,9.2,17),1.5),EYE)
        legs(S,[P(s*6,7,11),P(s*13,8,16)],3.4,3.0,SHELL,'arm%d'%s)
        S.add(ell(P(s*15,7.5,20),(5,2.4,4.2)),SHELL,1.5,'arm%d'%s)
        for k in range(4):S.add(crystal(P(s*(12.5+k*1.6),7.5,22.5),D(s*.15,0,1),4.5,1.1,tip=.8),BONE,0)
        S.add(crystal(P(s*6,11,7),D(s*.7,.8,-.2),8,1.8),CRY2,0)
        for i in range(2):legs(S,[P(s*7,5,1-i*6),P(s*12,4,-1-i*6),P(s*14,0,-4-i*6)],1.5,.6)
    for i in range(4):S.add(crystal(P(0,8.5-i*.4,-5-i*5.2),D(0,1,-.6),5-i*.7,1.5),CRY if i%2 else CRY2,0)
    return S
def rek3():  # 네 갈래 아가리: 꽃잎처럼 벌어진 이빨 턱, 짧은 몸
    S=Scene()
    S.add(sphere(P(0,5,18),5.5),DARK,0)
    for k in range(4):
        a=k/4*6.283+.785;dx,dz=math.cos(a),math.sin(a)
        b0=P(dx*4,7,18+dz*4);b1=P(dx*11,8,18+dz*11)
        S.add(cap(b0,b1,3.4,1.6),SHELL,1.5,'h')
        for t in range(3):
            q=(.35+t*.25);S.add(crystal(P(dx*(4+7*q),8.6,18+dz*(4+7*q)),D(-dz,.3,dx),3.2,.9,tip=.8),BONE,0)
            S.add(crystal(P(dx*(4+7*q),8.6,18+dz*(4+7*q)),D(dz,.3,-dx),3.2,.9,tip=.8),BONE,0)
    for i in range(5):
        f=8-i*5.6;r=9.5-i*1.2
        S.add(ell(P(0,6.6-i*.35,f),(r,4.6-i*.3,3.8)),SHELL,1.0,'b')
        for s in(-1,1):
            S.add(crystal(P(s*(r-1),6.8,f),D(s,.3,-.3),6-i*.7,1.6,tip=.6),CRY if (i+(s>0))%2 else CRY2,0)
            if i<4:legs(S,[P(s*(r-1),5,f),P(s*(r+4),4,f-1.5),P(s*(r+6),0,f-3)],1.3,.55)
    S.add(crystal(P(0,5,-20),D(0,.1,-1),7,1.7,tip=.7),CRY2,0)
    return S
if __name__=='__main__':
    E=[((0,14,0),(80,50,190),22,.2)]
    mon.ORI='right'
    for n,f in [('gna1',gna1),('gna2',gna2),('gna3',gna3)]:spr(f(),64,60,.85,(0,6,0),89,n,E,M=TM(),light=LT)
    mon.ORI='up'
    for n,f in [('rek1',rek1),('rek2',rek2),('rek3',rek3)]:spr(f(),80,84,1.0,(0,6,3),89,n,E,M=TM(),light=LT)
    sheet(['gna','gna1','gna2','gna3'],OUT+'/s_gna.png',sc=5)
    sheet(['rek','rek1','rek2','rek3'],OUT+'/s_rek.png',sc=4)
