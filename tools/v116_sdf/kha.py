from common import *
def kha():
    S=Scene()
    S.add(ell((0,8,4),(6.5,4.5,7.5)),SHELL,2,'b')
    for i,(z,r) in enumerate([(-5,7.5),(-11.5,7.2),(-17.5,6),(-22.5,4.2)]):
        S.add(ell((0,8-i*.3,z),(r,4.2-i*.4,3.9)),SHELL,1.0,'b')
    S.add(ell((0,9,13),(5.5,3.6,4.2)),SHELL,1.5,'b')
    for s in(-1,1):
        S.add(sphere((s*4,10,14.5),1.8),EYE)
        a=(s*5.5,9,8);b=(s*12,11,15);c=(s*9,12,24)
        S.add(cap(a,b,2.6,2.2),SHELL,1.2,'arm%d'%s);S.add(cap(b,c,2.2,1.8),SHELL,1.2,'arm%d'%s)
        # 낫날: 결정 날 (안쪽으로 굽음)
        S.add(crystal(c,(s*-.55,.05,.8),13,2.2,tip=.7),CRY2,0)
        S.add(crystal(b,(s*.3,.3,.9),9,1.4,tip=.6),CRY2,0)
        for k,(z0,dz) in enumerate([(2,-3),(-6,-9)]):
            p0=(s*5.5,8,z0);p1=(s*13,11,z0+dz*.2);p2=(s*18,0,z0+dz)
            legs(S,[p0,p1,p2],1.7,.7)
    for i,z in enumerate([3,-5,-11.5,-17.5]):
        for s in(-1,1):
            S.add(crystal((s*2.4,10.8-i*.4,z+1),(s*.9,.55,-.8),7-i*.9,1.5),CRY if (i+(s>0))%2 else CRY2,0)
    return S
E=[((0,14,0),(90,60,200),22,.25),((0,11,15),(255,80,60),7,.5)]
spr(kha(),60,70,.62,(0,8,2),88,'kha',E,M=tmats(),light=(-.55,.62,-.56));flip('kha')
sheet(['kha'],OUT+'/s_kha.png',sc=5)
