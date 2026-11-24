from shapes4 import *
def tbody(S):
    # 끌려오는 몸: 앞이 높고 뒤로 낮아짐
    S.add(ell(P(0,5.6,1),(5.6,4.4,9)),B1,2,'b');S.add(ell(P(0,4.2,-8),(4,3,6)),B1,2,'b')
    S.add(cap(P(0,3.6,-12),P(0,3,-18),2,1),B1,1.5,'b')
    for s in(-1,1):S.add(lambda Q,s=s:ell(P(s*3,3,-19.5),(3.2,.8,1.6))(Q),B2,1,'b')
    for i in range(3):S.add(crystal(P(0,9.6-i*.6,2-i*3.6),D(0,1,-.5),3.4-i*.6,1.2,tip=.8),AC,0)
def thead(S):
    S.add(ell(P(0,6,10.5),(3.6,3.2,4)),B1,1.6,'b');S.add(cap(P(0,5.8,12),P(0,5.2,17),3,.8),B1,1.4,'b')
    S.add(lambda Q:np.maximum(ell(P(0,7.2,14.6),(2.8,.6,2.6))(Q),-(np.array(Q)[...,1]-6.8)),LG,0)
    for k in range(7):x=-2.4+k*.8;S.add(crystal(P(x,7.6,15.8-abs(x)*.7),D(0,.2,-1),1.2,.35,tip=.9),AC,0)
    for s in(-1,1):S.add(sphere(P(s*2.4,8.2,11.6),.7),EY,0)
def shoulder(S,s):
    S.add(ell(P(s*4.6,8,5),(3.4,2.4,3.6)),B2,1,'b')
    S.add(crystal(P(s*5.4,9.8,5.4),D(s*.6,1,-.2),3.2,1.1,tip=.8),AC,0)
def hand(S,s,c,big=1):
    S.add(ell(c,(2.6*big,1.2,2.4*big)),B1,1,'b')
    for k in(-1,0,1):
        h=np.array(c,float);d=np.array(P(s*.45*k,-.25,1),float);d/=np.linalg.norm(d)
        S.add(crystal(tuple(h+d*1.6*big),tuple(d),2.6*big,.65*big,tip=.8),AC,0)
def stance(S,s,kind):
    sh=P(s*5,7,4);el=P(s*11.5,6,3.5);hd=P(s*9,1.4,10.5)
    if kind==1:   # 근육: 굵은 위팔·아래팔 + 근육 혹
        legs(S,[sh,el],3.2,3.0,B1,'b',1.5);legs(S,[el,hd],3.0,2.4,B1,'b',1.5)
        S.add(ell(P(s*8.6,8,3.8),(2.8,2.4,2.6)),B1,1.2,'b');S.add(ell(P(s*10.8,6,6.8),(2.4,2.2,2.4)),B1,1.2,'b')
    elif kind==2: # 갑주 판: 마디마다 단단한 판
        legs(S,[sh,el],2.8,2.6,B1,'b',1.2);legs(S,[el,hd],2.6,2.2,B1,'b',1.2)
        S.add(cap(P(s*6.6,8.6,3.9),P(s*10,8.2,3.6),2.9,2.7),B2,0);S.add(cap(P(s*11.2,7.4,5),P(s*9.8,4.4,8.6),2.7,2.4),B2,0)
        for p in[(s*8.3,11.4,3.8),(s*10.6,10,6.6)]:S.add(crystal(P(*p),D(s*.3,1,0),2.4,.9,tip=.8),AC,0)
    else:         # 둔기: 아래팔이 굵어지며 묵직한 주먹
        legs(S,[sh,el],2.8,2.6,B1,'b',1.2);legs(S,[el,hd],2.4,3.2,B1,'b',1.2)
        S.add(ell(hd,(3.4,2.4,3.4)),B2,1.2,'b')
    S.add(ell(hd,(3,1.2,2.6)),B1,1,'b')
    for k in(-1,0,1):
        h=np.array(hd,float);d=np.array(P(s*.4*k,-.3,1),float);d/=np.linalg.norm(d)
        S.add(crystal(tuple(h+d*1.8),tuple(d),3,.75,tip=.8),AC,0)
def m1():
    S=Scene();tbody(S);thead(S)
    for s in(-1,1):shoulder(S,s);stance(S,s,1)
    return S
def m2():
    S=Scene();tbody(S);thead(S)
    for s in(-1,1):shoulder(S,s);stance(S,s,2)
    return S
def m3():
    S=Scene();tbody(S);thead(S)
    for s in(-1,1):shoulder(S,s);stance(S,s,3)
    return S
if __name__=='__main__':
    M=NM2();mon.ORI='up'
    for n,f in [('t1',m1),('t2',m2),('t3',m3)]:spr(f(),90,100,.85,(0,6,0),89,n,(),M=M,light=LT)
