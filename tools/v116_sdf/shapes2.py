from shapes import *
# ================= 땅울음 후보 (위를 봄) =================
def antlion():  # 개미귀신: 둥근 배, 작은 머리, 큰 낫 턱
    S=Scene()
    S.add(ell(P(0,5,-3),(7.5,4.6,8)),B1,2,'b');S.add(ell(P(0,5.4,5.5),(4.6,3.4,3.4)),B2,1.5,'b');S.add(ell(P(0,5.6,9.5),(3.4,2.6,2.6)),B1,1.2,'b')
    for i in range(3):S.add(ell(P(0,7.8,-1-i*3.4),(6-i*.8,.6,.5)),B2,0)
    for s in(-1,1):
        S.add(sphere(P(s*2.4,7,10.4),.7),EY,0)
        legs(S,[P(s*2.4,5.6,11.5),P(s*5.5,5.6,15),P(s*3.8,5.6,19.5),P(s*1.2,5.6,20.5)],1.2,.5,AC,'jw%d'%s,.6)
        for k in range(3):S.add(crystal(P(s*(4.6-k*.4),5.8,15.5+k*1.3),D(-s,.1,.2),1.6,.4,tip=.9),AC,0)
        for f in(7,4.5,2):L(S,[P(s*3.5,4,f),P(s*6.5,2,f-.5),P(s*7.5,0,f-1.5)],.9,.6)
        for k in range(4):S.add(cap(P(s*6.5,5,-1-k*3),P(s*9,5.4,-1.5-k*3),.35,.15),LG,0)
    return S
def landshark():  # 모래상어: 몸통 + 옆 지느러미 + 등지느러미 + 꼬리 지느러미
    S=Scene()
    S.add(ell(P(0,5,2),(5.2,4,13)),B1,2,'b');S.add(ell(P(0,5,13),(4.2,3.4,4)),B1,1.5,'b')
    S.add(cap(P(0,5,-10),P(0,5,-17),2.2,1.2),B1,1.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*3.2,6.6,14),.7),EY,0)
        S.add(lambda Q,s=s:np.maximum(ell(P(s*7,4.4,4),(5,1,3))(Q),0),B2,1,'b')
        S.add(lambda Q,s=s:ell(P(s*4,4.8,-17.5),(4,1,2))(Q),B2,1,'b')
    S.add(lambda Q:ell(P(0,10,1),(.9,3.4,4))(Q),B2,1,'b')
    for i in range(4):S.add(cap(P(-3.6,6.4,10-i*.9),P(3.6,6.4,10-i*.9),.25,.25),B2,0)
    S.add(cap(P(-2.4,4.6,16.6),P(2.4,4.6,16.6),.5,.5),EY,0)
    return S
def pangolin2():  # 천산갑: 겹친 비늘 + 긴 꼬리
    S=Scene()
    for i in range(6):
        f=8-i*3.6;r=6.2-abs(i-2)*.6
        S.add(ell(P(0,5.6,f),(r,4.4-abs(i-2)*.3,2.6)),B1 if i%2 else B2,.4,'b')
        for x in(-r*.5,0,r*.5):S.add(ell(P(x,8.6-abs(i-2)*.3,f+.4),(1.4,.7,1.4)),B1,0)
    for i in range(4):S.add(ell(P(0,5,-14-i*3),(3.2-i*.6,2.6-i*.4,2)),B2,.6,'b')
    S.add(ell(P(0,5.2,12.5),(2.8,2.4,3.6)),B2,1.4,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.5,6.6,14),.8),EY,0)
        L(S,[P(s*5,3,6),P(s*7.5,0,8.5)],1.5,1.2);L(S,[P(s*5,3,-6),P(s*7.5,0,-7)],1.5,1.2)
        for k in range(3):S.add(cap(P(s*7.5,0,8.6),P(s*(7+k*.6),0,10.6),.35,.2),AC,0)
    return S
def mantis_shrimp():  # 갯가재: 마디 몸, 접은 앞발, 꼬리 부채
    S=Scene()
    S.add(ell(P(0,5.6,8),(4,3.2,4)),B1,1.5,'b')
    for i in range(6):S.add(ell(P(0,5.2,3-i*3),(4.4-abs(i-2)*.2,3,1.7)),B1 if i%2 else B2,.5,'b')
    for s in(-1,1):
        S.add(cap(P(s*1,6.4,11),P(s*1.8,7.4,13),.5,.5),B2,0);S.add(sphere(P(s*1.9,7.6,13.4),1.0),EY,0)
        legs(S,[P(s*3,5.6,9),P(s*6,6,12),P(s*5,6,16)],1.4,1.0,B1,'cl%d'%s)
        S.add(crystal(P(s*5,6,16),D(s*-.3,0,-1),5,.9,tip=.85),AC,0)
        for k in range(3):L(S,[P(s*3.8,4.5,5-k*2),P(s*6.5,2,4.5-k*2.2),P(s*7.5,0,4-k*2.4)],.6,.4)
        S.add(lambda Q,s=s:ell(P(s*3.2,4.6,-16),(2.6,.8,3.4))(Q),B2,.8,'b')
    S.add(ell(P(0,4.8,-16.5),(2.2,.9,3.2)),B1,.8,'b')
    S.add(cap(P(-2.6,5,13.6),P(-4,5,17.5),.3,.2),LG,0);S.add(cap(P(2.6,5,13.6),P(4,5,17.5),.3,.2),LG,0)
    return S
# ================= 큰 먹이 후보: 뛰어서 도망 (위를 봄) =================
def grasshopper2():
    S=Scene()
    S.add(ell(P(0,5,-3),(3,2.8,8)),B1,1.5,'b');S.add(ell(P(0,5.6,5.5),(3.2,3,3)),B2,1.2,'b');S.add(ell(P(0,5.6,9.4),(2.6,2.6,2.4)),B1,1.2,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.8,7,10.2),.8),EY,0)
        legs(S,[P(s*2.4,5,1),P(s*5,9,-3),P(s*5.6,2,-11),P(s*4.4,0,-13)],1.6,.6,B1,'hl%d'%s,.6)
        L(S,[P(s*2.4,4.5,6),P(s*5,2,8),P(s*6,0,9)],.7,.5);L(S,[P(s*2.4,4.5,3.5),P(s*5,2,3),P(s*6,0,2)],.7,.5)
        S.add(cap(P(s*1,6.4,11),P(s*3.4,6.4,16),.3,.2),LG,0)
    return S
def cricket():
    S=Scene()
    S.add(ell(P(0,5.4,-2),(4.2,3.4,6.5)),B1,1.5,'b');S.add(ell(P(0,5.8,6),(3.8,3.2,3)),B2,1.2,'b');S.add(ell(P(0,5.8,9.6),(3.2,3,2.6)),B1,1.2,'b')
    for s in(-1,1):
        S.add(sphere(P(s*2,7.4,10.6),.8),EY,0)
        legs(S,[P(s*3,5,0),P(s*6,8,-3),P(s*6.4,2,-9),P(s*5.4,0,-11)],1.7,.7,B1,'hl%d'%s,.6)
        L(S,[P(s*3,4.5,6),P(s*5.5,2,8),P(s*6.5,0,9)],.7,.5)
        legs(S,[P(s*1.2,6.6,11.5),P(s*4,6.6,17),P(s*7,6.6,21)],.3,.2,LG,'an',0)
        S.add(cap(P(s*1.4,5,-8),P(s*3.4,4.6,-12),.4,.2),LG,0)
    return S
def springtail():  # 톡토기: 통통한 몸, 짧은 더듬이, 배 밑 도약 꼬리
    S=Scene()
    for i in range(4):S.add(sphere(P(0,5,4-i*3.4),4-abs(i-1)*.4),B1,1.4,'b')
    S.add(sphere(P(0,5.4,7.6),3),B2,1.2,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.6,7,8.8),.8),EY,0)
        legs(S,[P(s*1,6,10),P(s*2.6,6.6,13),P(s*3.4,6.6,15.5)],.6,.45,B2,'an',.4)
        for f in(4,1.5,-1):L(S,[P(s*3,3,f),P(s*4.6,0,f-.4)],.7,.5)
        S.add(cap(P(s*.8,2.4,-7),P(s*1.4,2.4,-11.5),.5,.3),B2,.5,'b')
    return S
def treefrog():
    S=Scene()
    S.add(ell(P(0,5,-1),(5.4,3.8,6)),B1,2,'b');S.add(ell(P(0,5.2,5),(4.8,3.4,3.4)),B1,1.6,'b')
    for s in(-1,1):
        S.add(sphere(P(s*3,7.6,5.6),1.5),B2,0);S.add(sphere(P(s*3.2,8.6,6),.8),EY,0)
        legs(S,[P(s*4.4,3,-4),P(s*8,3.5,-2),P(s*7.6,1,-8),P(s*5.6,0,-11)],1.4,.7,B1,'hl%d'%s,.6)
        S.add(sphere(P(s*5.6,0,-11.4),.9),B1,0)
        L(S,[P(s*4,3,4),P(s*6.5,1.5,6.5),P(s*7,0,8)],.9,.6);S.add(sphere(P(s*7,0,8.4),.8),B1,0)
    return S
if __name__=='__main__':
    M=NM();mon.ORI='up'
    for i,f in enumerate([antlion,landshark,pangolin2,mantis_shrimp]):spr(f(),70,90,.85,(0,6,0),89,'yr%d'%(i+1),(),M=M,light=LT)
    for i,f in enumerate([grasshopper2,cricket,springtail,treefrog]):spr(f(),56,64,.85,(0,5,0),89,'yf%d'%(i+1),(),M=M,light=LT)
