from shapes3 import *
def body(S,ln=12,w=5.4,head=4.4):
    S.add(ell(P(0,5,0),(w,4,ln)),B1,2,'b');S.add(ell(P(0,5,ln),(head,3.4,3.6)),B1,1.5,'b')
def tailf(S,f0,split=False):
    S.add(cap(P(0,5,f0),P(0,5,f0-6),2,1),B1,1.5,'b')
    if split:
        for s in(-1,1):S.add(lambda Q,s=s:ell(P(s*2.6,4.8,f0-8.4),(1.4,.9,3.2))(Q),B2,1,'b')
    else:
        for s in(-1,1):S.add(lambda Q,s=s:ell(P(s*3.2,4.8,f0-7.5),(3.4,.9,1.6))(Q),B2,1,'b')
def eyes(S,ln,x=3):
    for s in(-1,1):S.add(sphere(P(s*x,6.6,ln+1.6),.7),EY,0)
def claws(S,s,f,n=3,ln=1.4):
    for k in range(n):S.add(cap(P(s*9.4,4.4,f+k*1.4-1.4),P(s*(9.4+ln),4.4,f+k*1.4-.6),.35,.2),AC,0)
def v1():  # 2번 다듬기
    S=Scene();body(S)
    for i in range(5):S.add(ell(P(0,8.4,7-i*3.6),(4.2-i*.5,1.2,1.8)),B2,.4,'b')
    for i in range(4):S.add(crystal(P(0,9.2,6-i*3.6),D(0,1,-.6),3.4-i*.5,1.2,tip=.8),AC,0)
    for s in(-1,1):fin(S,s,P(s*6.4,4.4,4),3.4,4.2);claws(S,s,5)
    eyes(S,12);tailf(S,-10);return S
def v2():  # 등 전체 비늘판 + 긴 결정 볏
    S=Scene();body(S)
    for i in range(7):
        for x in(-2.4,0,2.4):S.add(ell(P(x,8.2-abs(x)*.25,9-i*3),(1.6,.9,1.7)),B2,.3,'b')
    for i in range(5):S.add(crystal(P(0,9.4,8-i*3.2),D(0,1,-.5),5-i*.5,1.3,tip=.85),AC,0)
    for s in(-1,1):fin(S,s,P(s*6.4,4.4,4),3.4,4.2);claws(S,s,5)
    eyes(S,12);tailf(S,-10);return S
def v3():  # 넓은 삽 지느러미 + 짧은 몸
    S=Scene();body(S,ln=9,w=6,head=4.8)
    for i in range(4):S.add(ell(P(0,8.6,5-i*3.4),(4.6-i*.6,1.2,1.7)),B2,.4,'b')
    for i in range(3):S.add(crystal(P(0,9.4,4-i*3.4),D(0,1,-.6),3.2-i*.5,1.2,tip=.8),AC,0)
    for s in(-1,1):
        S.add(lambda Q,s=s:ell(P(s*8,4.4,4),(5,1.1,4.8))(Q),B2,1,'b');claws(S,s,6.5,4,1.8)
    eyes(S,9);tailf(S,-7.5);return S
def v4():  # 돛 볏 + 갈라진 꼬리
    S=Scene();body(S,ln=12.5,w=5)
    for i in range(6):S.add(crystal(P(0,8,8-i*2.8),D(0,1,-.25),6.5-abs(i-2)*1.1,1.0,tip=.4),AC,0)
    S.add(lambda Q:ell(P(0,10,2),(.7,4,9))(Q),B2,1,'b')
    for s in(-1,1):fin(S,s,P(s*6,4.4,5),3.6,3.8);claws(S,s,6)
    eyes(S,12.5);tailf(S,-10.5,True);return S
def v5():  # 갑주 머리판 (렉사이)
    S=Scene();body(S,head=5.4)
    S.add(lambda Q:np.maximum(ell(P(0,7.4,12.5),(6.6,2.2,5))(Q),-(np.array(Q)[...,1]-6)),B2,1.5,'b')
    for s in(-1,1):S.add(crystal(P(s*5.6,7.6,14),D(s*.6,.3,.7),4.5,1.3,tip=.8),AC,0)
    for i in range(4):S.add(ell(P(0,8.4,5-i*3.6),(4-i*.5,1.2,1.8)),B2,.4,'b')
    for i in range(3):S.add(crystal(P(0,9.2,4-i*3.6),D(0,1,-.6),3-i*.5,1.2,tip=.8),AC,0)
    for s in(-1,1):fin(S,s,P(s*6.4,4.4,3),3.4,4.2);claws(S,s,4)
    eyes(S,12,3.6);tailf(S,-10);return S
# ---------- 날렵한 개구리 (위를 봄) ----------
def fr1():  # 물방울 몸 + 몸 옆에 접힌 뒷다리(Z자)
    S=Scene()
    S.add(ell(P(0,4.4,0),(4.2,3.4,7.4)),B1,2.5,'b');S.add(ell(P(0,4.4,7.4),(4.4,2.6,3)),B1,2,'b')
    for s in(-1,1):
        legs(S,[P(s*3.2,3.6,-4),P(s*6,3.4,-1),P(s*5,3,-8),P(s*3,2.8,-9.5)],1.4,.8,B1,'hl%d'%s,.8)
        legs(S,[P(s*3,3.4,5),P(s*4.8,2.6,7.4)],.8,.6,B1,'fl%d'%s,.6)
    S.add(lambda Q:np.abs(ell(P(0,6.6,8.4),(3,.5,.6))(Q))-.12,B2,0)
    return S
def fr2():  # 뛰는 자세: 뒷다리를 뒤로 길게
    S=Scene()
    S.add(ell(P(0,4.4,2),(3.8,3,7.5)),B1,2.5,'b');S.add(ell(P(0,4.6,8.4),(3.2,2.6,2.8)),B1,2,'b')
    for s in(-1,1):
        legs(S,[P(s*2.8,3.6,-3),P(s*4.6,3.2,-9),P(s*3.2,3,-15)],1.5,.9,B1,'hl%d'%s,.8)
        S.add(ell(P(s*3,2.8,-16.4),(1.4,.6,1.8)),B2,.6,'hl%d'%s)
        legs(S,[P(s*3,3.4,6),P(s*4.6,2.6,9.6)],.8,.6,B2,'fl%d'%s,.6)
    return S
def fr3():  # 독화살개구리형: 가늘고 매끈, 등 무늬
    S=Scene()
    S.add(ell(P(0,4.6,0),(3.2,3,8.6)),B1,2.5,'b');S.add(ell(P(0,4.8,7.4),(2.8,2.6,2.6)),B1,2,'b')
    for k,(x,f) in enumerate([(0,4),(-1.4,0),(1.4,-1.8),(0,-5)]):S.add(ell(P(x,7.4,f),(1.1,.4,1.3)),B2,0)
    for s in(-1,1):
        legs(S,[P(s*2.6,3.4,-5),P(s*5.4,3,-4),P(s*5,2.4,-9)],1.0,.7,B1,'hl%d'%s,.6)
        legs(S,[P(s*2.4,3.4,4.6),P(s*4.4,2.6,6.6)],.7,.55,B1,'fl%d'%s,.6)
    return S
def fr4():  # 다리 없는 매끈한 몸 (넓은 머리 + 엉덩이 볼록)
    S=Scene()
    S.add(ell(P(0,4.4,-1),(4.2,3.4,7.2)),B1,3,'b');S.add(ell(P(0,4.4,6.6),(4.8,2.8,3.2)),B1,2.4,'b')
    for s in(-1,1):S.add(ell(P(s*3.6,4,-5.4),(2.2,2.4,3)),B1,1.6,'b')
    S.add(lambda Q:np.abs(ell(P(0,6.2,7.6),(3.2,.5,.6))(Q))-.12,B2,0)
    S.add(lambda Q:np.abs(ell(P(0,7.4,-1),(2.4,.5,4))(Q))-.15,B2,0)
    return S
if __name__=='__main__':
    M=NM2();mon.ORI='up'
    for i,f in enumerate([v1,v2,v3,v4,v5]):spr(f(),70,90,.85,(0,6,0),89,'ws%d'%(i+1),(),M=M,light=LT)
    for i,f in enumerate([fr1,fr2,fr3,fr4]):spr(f(),56,70,.62,(0,5,-2),89,'wf%d'%(i+1),(),M=M,light=LT)
