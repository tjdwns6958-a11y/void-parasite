from shapes4 import *
def arm(S,s,sh,fw):
    # fw: +1 앞으로 짚음, -1 뒤로 밀어냄
    el=P(s*9,4.2,sh[2]+(2.5 if fw>0 else -1.5));hd=P(s*10.5,1,sh[2]+(7 if fw>0 else -4.5))
    legs(S,[P(s*sh[0],sh[1],sh[2]),el,hd],2.5,1.8,B1,'b',1.5)
    S.add(ell(hd,(2.3,1.1,2.3)),B1,1,'b')
    for k in(-1,0,1):
        h=np.array(hd,float);d=np.array(P(s*.35*k+s*.2,0,1 if fw>0 else -1),float)*0+np.array(P(s*(.4+.35*k),0,(1 if fw>0 else -1)),float)
        S.add(cap(tuple(h),tuple(h+d/np.linalg.norm(d)*3.0),.6,.2),AC,0)
def body2(S,ln=11,w=4.8):
    S.add(ell(P(0,5,0),(w,3.8,ln)),B1,2,'b')
    for i in range(4):S.add(ell(P(0,8,ln-5-i*3.6),(3.6-i*.5,1.1,1.7)),B2,.4,'b')
    for i in range(3):S.add(crystal(P(0,8.8,ln-6-i*3.6),D(0,1,-.6),3-i*.5,1.1,tip=.8),AC,0)
    tailf(S,-ln+2)
def shA():  # 작은 뾰족 머리 + 두 팔
    S=Scene();body2(S)
    S.add(cap(P(0,5,9),P(0,4.6,15),3,.6),B1,1.8,'b')
    for s in(-1,1):S.add(sphere(P(s*1.6,6,12.6),.6),EY,0)
    arm(S,1,(3.8,4.6,5),1);arm(S,-1,(3.8,4.6,5),-1);return S
def shB():  # 작은 갑주 머리 + 두 팔
    S=Scene();body2(S)
    S.add(ell(P(0,5,12),(3.4,2.8,3)),B1,1.5,'b')
    S.add(lambda Q:np.maximum(ell(P(0,6.8,12.4),(4.2,1.8,3.4))(Q),-(np.array(Q)[...,1]-5.6)),B2,1.2,'b')
    for s in(-1,1):S.add(crystal(P(s*3.6,7,13.4),D(s*.6,.3,.7),3,1.0,tip=.8),AC,0);S.add(sphere(P(s*2.2,6.2,14),.6),EY,0)
    arm(S,1,(3.8,4.6,5),1);arm(S,-1,(3.8,4.6,5),-1);return S
def shC():  # 귀상어: 가는 목으로 몸과 망치 머리를 떼어 놓음
    S=Scene();body2(S)
    S.add(cap(P(0,5,9.5),P(0,5,14.5),1.4,1.2),B1,.6,'n')
    S.add(lambda Q:ell(P(0,5,16),(6.4,1.8,1.6))(Q),B1,.6,'h')
    for s in(-1,1):S.add(sphere(P(s*6.2,5.8,16.2),.65),EY,0)
    arm(S,1,(3.8,4.6,5),1);arm(S,-1,(3.8,4.6,5),-1);return S
def shD():  # 팔이 긴 짧은 몸 (기어가는 느낌 강하게)
    S=Scene();body2(S,ln=9,w=5)
    S.add(cap(P(0,5,7),P(0,4.6,12.5),2.8,.6),B1,1.8,'b')
    for s in(-1,1):S.add(sphere(P(s*1.5,6,10.6),.6),EY,0)
    arm(S,1,(4,4.6,3.5),1);arm(S,-1,(4,4.6,3.5),-1)
    for s in(-1,1):legs(S,[P(s*3.6,4.4,-5),P(s*6,2.4,-8)],1,.8,B2,'b',.6)
    return S
if __name__=='__main__':
    M=NM2();mon.ORI='up'
    for n,f in [('ua',shA),('ub',shB),('uc',shC),('ud',shD)]:spr(f(),80,90,.85,(0,6,1),89,n,(),M=M,light=LT)
