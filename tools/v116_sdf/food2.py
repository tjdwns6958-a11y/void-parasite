from common import *
import mon
from mon import TM,P,Dv,LT
mon.ORI='up'
MEM=13;SAC=14
def M2():
    M=TM()
    M[MEM]=dict(ramp=ramp(0x2a1c3a,0x4a3660,0x6e5688,0x9a82b4,0xc8b8de),tex=lambda Q:noise3(Q,.6),texk=.12,amb=.12,dif=.85,rim=.45,fill=.2,dith=.06,gk=.4,spec=10)
    M[SAC]=dict(ramp=ramp(0x5a3a08,0xa06a10,0xe0a830,0xffe070,0xfff8c0),amb=.55,dif=.5,spec=30,rim=.3,gk=0,dith=.05)
    return M
def f_l():
    S=Scene()
    segs=[(8,5.6),(2.5,7.2),(-3.5,7.6),(-9.5,6.6),(-14.5,4.8)]
    for i,(f,r) in enumerate(segs):S.add(ell(P(0,5,f),(r,4.6-i*.25,3.4)),MEM,1.6,'b')
    S.add(ell(P(0,5.6,13),(4.4,3.6,3.4)),SHELL,1.4,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.9,7.6,14.6),1.0),EYE)
        S.add(cap(P(s*2.4,5,15.5),P(s*4.2,4,18.5),1.0,.4),BONE,0)
    for i,(f,r) in enumerate(segs[1:4]):
        for s in(-1,1):S.add(sphere(P(s*(r-1.6),7.4,f),1.7),SAC,0)
        S.add(crystal(P(0,8.6,f),Dv(0,1,-.4),3.2,1.0),CRY2 if i%2 else CRY,0)
    for i,(f,r) in enumerate(segs[:4]):
        for s in(-1,1):legs(S,[P(s*(r-.5),3.5,f),P(s*(r+2.5),0,f-1.2)],.8,.45)
    return S
if __name__=='__main__':
    M=M2()
    spr(f_l(),46,52,1.0,(0,5,-2),89,'f_l2',[(P(0,9,-3),(255,200,90),16,.45)],M=M,light=LT)
    sheet(['f_s','f_l','f_l2'],OUT+'/s_food.png',sc=5)
