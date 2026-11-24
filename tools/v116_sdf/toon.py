from common import *
import mon
from mon import LT
P=lambda x,y,f:mon.P(x,y,f);D=P;R=lambda x,y,f:mon.Rr(x,y,f)
EYW=15
def TMATS():
    M=mats()
    M[SHELL]=dict(ramp=ramp(0x2a1c48,0x4a3478,0x7058a8,0x9c84d0),amb=.18,dif=.85,rim=.25,fill=.1,dith=.02,gk=.3)
    M[CRY]=dict(ramp=ramp(0x2a6a9a,0x58b8e0,0xb8f0ff),amb=.35,dif=.6,spec=0,rim=.2,dith=.0,gk=.1)
    M[CRY2]=dict(ramp=ramp(0x5a3aa0,0x9a70e0,0xe0c8ff),amb=.35,dif=.6,spec=0,rim=.2,dith=.0,gk=.1)
    M[EYE]=dict(ramp=ramp(0xd06020,0xffa040,0xffe8a0),amb=.7,dif=.3,gk=0,dith=0)
    M[EYW]=dict(ramp=ramp(0xd8d0ec,0xffffff),amb=.8,dif=.3,gk=0,dith=0)
    M[DARK]=dict(ramp=ramp(0x140a20,0x2a1638),amb=.5,dif=.3,gk=0,dith=0)
    M[BONE]=dict(ramp=ramp(0xb0a4c8,0xeae4f6,0xffffff),amb=.5,dif=.5,gk=0,dith=0)
    return M
def eye(S,c,r):
    S.add(sphere(c,r),EYW,0);S.add(sphere((c[0]+(r*.45 if mon.ORI=='right' else 0),c[1]+r*.55,c[2]-(r*.45 if mon.ORI=='up' else 0)),r*.6),DARK,0)
def toon(scene,name,W,H,scale,center):
    # 절반 해상도로 그린 뒤 2배 (플레이어처럼 큰 픽셀)
    return spr(scene,W,H,scale,center,89,name,(),M=TMATS(),light=LT)
# ---------- 제르사이 유생 (오른쪽을 봄) ----------
def g1():  # 통통 메뚜기
    S=Scene()
    S.add(ell(P(0,6,-1),R(5.5,5,8)),SHELL,2,'b');S.add(ell(P(0,7,7.5),R(5,4.6,4.4)),SHELL,2,'b')
    for s in(-1,1):
        eye(S,P(s*2.8,9.5,9),1.9)
        legs(S,[P(s*4.5,6,-2),P(s*8,9.5,0),P(s*8.5,2,-8)],2.4,1.6)
        legs(S,[P(s*3.5,4,5),P(s*6,1,7)],1.4,1.2)
    S.add(crystal(P(0,10,-2),D(0,1,-.5),5,2.2,tip=.5),CRY,0);S.add(crystal(P(0,9.5,-6.5),D(0,1,-.7),3.6,1.8,tip=.5),CRY2,0)
    return S
def g2():  # 올챙이 두꺼비
    S=Scene()
    S.add(ell(P(0,5,0),R(8,4.6,8)),SHELL,2.5,'b')
    S.add(cap(P(-4.5,5.5,7.4),P(4.5,5.5,7.4),.8,.8),DARK,0)
    for s in(-1,1):
        eye(S,P(s*3.6,8.6,4.5),2.2)
        legs(S,[P(s*6,3.5,-4),P(s*9.5,3,-5),P(s*10,0,-8)],2.0,1.6)
        legs(S,[P(s*6,3.5,3),P(s*8.5,1.5,5)],1.5,1.3)
    S.add(crystal(P(0,8.8,-3),D(0,1,-.4),5,2.4,tip=.5),CRY2,0)
    return S
def g3():  # 공벌레
    S=Scene()
    for i in range(4):
        f=4.5-i*4;r=6.2-abs(i-1.5)*.6
        S.add(ell(P(0,5.4,f),R(r,5.2-abs(i-1.5)*.5,2.6)),SHELL,.5,'b')
        S.add(crystal(P(0,9.6-abs(i-1.5)*.5,f),D(0,1,-.2),2.6,1.4,tip=.5),CRY if i%2 else CRY2,0)
    S.add(ell(P(0,4.6,8),R(4.4,3.6,2.8)),SHELL,1.2,'b')
    for s in(-1,1):
        eye(S,P(s*2.2,6.6,9.6),1.5)
        for i in range(3):legs(S,[P(s*5,2.5,3-i*4),P(s*7,0,2.5-i*4)],1.2,1.0)
    return S
def k1():  # 낫그늘 (같은 화풍 견본)
    S=Scene()
    S.add(ell(P(0,7,3),(6,5,7)),SHELL,2,'b');S.add(ell(P(0,6.5,-7),(5,4.4,5.5)),SHELL,2,'b');S.add(ell(P(0,7.5,11),(4.6,4,3.8)),SHELL,2,'b')
    for s in(-1,1):
        eye(S,P(s*2.4,10,12),1.8)
        legs(S,[P(s*4.5,8,7),P(s*9,10,12)],2.0,1.8)
        S.add(crystal(P(s*9,10,12),D(s*-.5,.1,1),9,2.4,tip=.8),CRY2,0)
        legs(S,[P(s*5,5,0),P(s*9,1,-2)],1.6,1.3);legs(S,[P(s*4.5,5,-6),P(s*8,1,-9)],1.6,1.3)
    S.add(crystal(P(0,11.5,1),D(0,1,-.5),4.5,2.2,tip=.5),CRY,0)
    return S
# ---------- 땅울음 (위를 봄) ----------
def r1():  # 삽머리 애벌레
    S=Scene()
    S.add(ell(P(0,7,13),(10,3.8,6)),SHELL,2,'b')
    for s in(-1,1):
        eye(S,P(s*4.5,9.6,12.5),2.0)
        S.add(cap(P(s*4,7,17),P(s*3,7,21),1.8,1.0),BONE,1)
    for i in range(4):
        f=5-i*6;r=8.5-i*1.3
        S.add(ell(P(0,6.5-i*.4,f),(r,5-i*.4,4)),SHELL,1.4,'b')
        if i<3:
            for s in(-1,1):legs(S,[P(s*(r-1),5,f),P(s*(r+3),2,f-1)],1.8,1.5)
    S.add(crystal(P(0,11,4),D(0,1,-.4),5.5,2.4,tip=.5),CRY,0);S.add(crystal(P(0,10,-3),D(0,1,-.5),4.5,2.0,tip=.5),CRY2,0)
    return S
def r2():  # 두더지 귀뚜라미
    S=Scene()
    S.add(ell(P(0,7,3),(9,6,10)),SHELL,2.5,'b');S.add(ell(P(0,7.5,12),(6,4.6,4.6)),SHELL,2,'b')
    for s in(-1,1):
        eye(S,P(s*2.8,10.4,13.6),1.8)
        legs(S,[P(s*6,6,9),P(s*11,6.5,13)],3.0,3.0)
        S.add(ell(P(s*13,6.5,16),(4,2.2,3.4)),SHELL,1.4,'b')
        for k in range(3):S.add(cap(P(s*(11.5+k*1.5),6.5,18.5),P(s*(11.5+k*1.6),6.5,21),.9,.5),BONE,0)
        legs(S,[P(s*7,4.5,-3),P(s*10,2,-5)],1.8,1.5)
    S.add(crystal(P(0,12,2),D(0,1,-.3),6,2.6,tip=.5),CRY2,0)
    return S
def r3():  # 아가리 지렁이
    S=Scene()
    S.add(sphere(P(0,6,15),3.6),DARK,0)
    for k in range(4):
        a=k/4*6.283+.785;dx,dz=math.cos(a),math.sin(a)
        S.add(ell(P(dx*4.6,7.4,15+dz*4.6),(3.4,2.2,3.4)),SHELL,1.4,'h')
        S.add(crystal(P(dx*3,7.6,15+dz*3),D(-dx,.2,-dz),2.2,.9,tip=.8),BONE,0)
    for i in range(5):
        f=8-i*5;r=7.5-i*.9
        S.add(ell(P(0,6.4-i*.35,f),(r,5-i*.4,3.8)),SHELL,1.2,'b')
    for s in(-1,1):
        S.add(crystal(P(s*6.6,6.5,6),D(s,.3,-.2),4,1.8,tip=.5),CRY if s>0 else CRY2,0)
        S.add(crystal(P(s*5.2,6,-4),D(s,.3,-.2),3.2,1.5,tip=.5),CRY2 if s>0 else CRY,0)
    return S
if __name__=='__main__':
    mon.ORI='right'
    for n,f in [('tg1',g1),('tg2',g2),('tg3',g3)]:toon(f(),n,64,60,.72,(0,6,0))
    mon.ORI='up'
    for n,f in [('tr1',r1),('tr2',r2),('tr3',r3)]:toon(f(),n,80,84,.8,(0,6,3))
    toon(k1(),'tk1',60,70,.8,(0,6,2))
