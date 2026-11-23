from shapes4 import *
def shark(head,bt):
    S=Scene()
    ln,w=(9,6) if bt==3 else (12.5 if bt==2 else 12,5 if bt==2 else 5.4)
    S.add(ell(P(0,5,0),(w,4,ln)),B1,2,'b')
    if head=='A':
        S.add(ell(P(0,5,ln),(5.4,3.4,3.6)),B1,1.5,'b')
        S.add(lambda Q:np.maximum(ell(P(0,7.4,ln+.5),(6.6,2.2,5))(Q),-(np.array(Q)[...,1]-6)),B2,1.5,'b')
        for s in(-1,1):S.add(crystal(P(s*5.6,7.6,ln+2),D(s*.6,.3,.7),4.5,1.3,tip=.8),AC,0)
        ey=(3.6,ln+1.6)
    else:
        S.add(cap(P(0,5,ln-2),P(0,4.6,ln+8),w*.8,.6),B1,2,'b')
        ey=(2.2,ln+3)
    for s in(-1,1):S.add(sphere(P(s*ey[0],6.4,ey[1]),.7),EY,0)
    if bt==1:
        for i in range(5):S.add(ell(P(0,8.4,ln-5-i*3.6),(4.2-i*.5,1.2,1.8)),B2,.4,'b')
        for i in range(4):S.add(crystal(P(0,9.2,ln-6-i*3.6),D(0,1,-.6),3.4-i*.5,1.2,tip=.8),AC,0)
        for s in(-1,1):fin(S,s,P(s*6.4,4.4,ln-8),3.4,4.2);claws(S,s,ln-7)
        tailf(S,-ln+2)
    elif bt==2:
        for i in range(6):S.add(crystal(P(0,8,ln-4.5-i*2.8),D(0,1,-.25),6.5-abs(i-2)*1.1,1.0,tip=.4),AC,0)
        S.add(lambda Q:ell(P(0,10,ln-10.5),(.7,4,9))(Q),B2,1,'b')
        for s in(-1,1):fin(S,s,P(s*6,4.4,ln-7.5),3.6,3.8);claws(S,s,ln-6.5)
        tailf(S,-ln+2,True)
    else:
        for i in range(4):S.add(ell(P(0,8.6,ln-4-i*3.4),(4.6-i*.6,1.2,1.7)),B2,.4,'b')
        for i in range(3):S.add(crystal(P(0,9.4,ln-5-i*3.4),D(0,1,-.6),3.2-i*.5,1.2,tip=.8),AC,0)
        for s in(-1,1):S.add(lambda Q,s=s:ell(P(s*8,4.4,ln-5),(5,1.1,4.8))(Q),B2,1,'b');claws(S,s,ln-2.5,4,1.8)
        tailf(S,-ln+1.5)
    return S
# ---------- 작고 귀여운 청개구리 (위를 봄) ----------
def pad(S,c,r=.85):S.add(sphere(c,r),B1,.4,'b')
def toes(S,s,base,ang,ln=1.6):
    for k in (-1,0,1):
        a=ang+k*.55;e=(base[0]+math.cos(a)*ln*s,base[1],base[2]+math.sin(a)*ln)
        e=P(e[0],e[1],e[2]);b=P(*base[:1],*base[1:]) if False else P(base[0],base[1],base[2])
        S.add(cap(b,e,.3,.28),B1,.3,'b');pad(S,e,.7)
def tf(pose):
    S=Scene()
    S.add(ell(P(0,3.6,-2),(3.6,2.8,4.6)),B1,2,'b')
    S.add(ell(P(0,3.9,3.6),(3.4,2.4,3.6)),B1,1.8,'b')
    for s in(-1,1):
        S.add(sphere(P(s*3.0,4.8,3.4),1.7),B1,.5,'b');S.add(sphere(P(s*3.25,5.9,3.8),.95),PUP,0);S.add(sphere(P(s*2.95,6.5,3.7),.32),AC,0)
    S.add(lambda Q:np.abs(ell(P(0,4.9,6.2),(2,.45,.5))(Q))-.1,B2,0)
    for s in(-1,1):
        if pose==1:   # 앉음: 다리 몸에 붙이고 발가락만 펼침
            legs(S,[P(s*3.2,2.6,-4),P(s*5.4,2.4,-2.6),P(s*5,1.2,-6.4)],.9,.7,B1,'b',.6)
            for k in (-.6,0,.6):e=(s*(5+math.sin(k)*1.6),0.8,-6.4-math.cos(k)*1.6);S.add(cap(P(s*5,1.4,-6.4),P(*e),.3,.28),B1,.3,'b');pad(S,P(*e),.6)
            legs(S,[P(s*3,2.6,2.6),P(s*5,1.4,4.4)],.6,.55,B1,'b',.6)
            for k in (-.6,0,.6):e=(s*(5+math.cos(k)*1.4),0.8,4.4+math.sin(k)*1.4);S.add(cap(P(s*5,1.6,4.4),P(*e),.28,.26),B1,.3,'b');pad(S,P(*e),.5)
        elif pose==2: # 엎드려 펼침: 네 다리 모두 옆으로
            legs(S,[P(s*3.4,2.6,-3),P(s*7,2,-2),P(s*8,1.2,-6)],.8,.6,B1,'b',.6)
            for k in (-.6,0,.6):e=(s*(8.4+math.sin(k)*1.5),0.8,-6-math.cos(k)*1.5);S.add(cap(P(s*8.4,1.2,-6),P(*e),.28,.26),B1,.3,'b');pad(S,P(*e),.55)
            legs(S,[P(s*3.2,2.6,2.6),P(s*6.4,1.6,5.6)],.6,.5,B1,'b',.6)
            for k in (-.6,0,.6):e=(s*(6.6+math.cos(k)*1.3),0.8,5.6+math.sin(k)*1.3);S.add(cap(P(s*6.6,1.8,5.6),P(*e),.26,.24),B1,.3,'b');pad(S,P(*e),.5)
        else:         # 뛰기 직전: 뒷다리 접어 모음, 앞다리 앞으로
            legs(S,[P(s*3,2.6,-5),P(s*5.8,2.6,-3),P(s*4.6,1.4,-8.6)],1.0,.7,B1,'b',.6)
            for k in (-.5,0,.5):e=(s*(4.6+math.sin(k)*1.6),0.8,-8.6-math.cos(k)*1.6);S.add(cap(P(s*4.6,1.6,-8.6),P(*e),.3,.28),B1,.3,'b');pad(S,P(*e),.6)
            legs(S,[P(s*2.6,2.6,4),P(s*3.4,1.4,7.6)],.55,.5,B1,'b',.6)
            for k in (-.5,0,.5):e=(s*(3.6+math.sin(k)*1.2),0.8,7.4+math.cos(k)*1.2);S.add(cap(P(s*3.6,1.6,7.4),P(*e),.26,.24),B1,.3,'b');pad(S,P(*e),.48)
    return S
if __name__=='__main__':
    M=NM2();mon.ORI='up'
    for h in 'AB':
        for bt in (1,2,3):spr(shark(h,bt),72,96,.85,(0,6,1),89,'vs%s%d'%(h,bt),(),M=M,light=LT)
    for p in (1,2,3):spr(tf(p),60,60,.55,(0,4,-.5),89,'vf%d'%p,(),M=M,light=LT)
