# 땅울음 갑각 시안 + 쥐 웅크림 시안 (색·명암은 전갈·쥐와 같은 PAL 방식)
from colors4 import *
from final124 import adc
B1,B2,LG,AC,EY=SH.B1,SH.B2,SH.LG,SH.AC,SH.EY
D=SH.D
def sick(S,s,base,ln=1.0):  # 낫 턱 (갑각 판 + 안쪽 결정 이빨)
    b=np.array(base,float);pts=[tuple(b),tuple(b+np.array(P(s*2.6*ln,0,2.6*ln))),tuple(b+np.array(P(s*2.0*ln,0,5.4*ln))),tuple(b+np.array(P(s*-.4*ln,0,7.2*ln)))]
    legs(S,pts,1.5,.5,B1,'sk%d'%s,.6)
    for k in range(3):p=np.array(pts[1])+(np.array(pts[2])-np.array(pts[1]))*k*.45;S.add(crystal(tuple(p),D(-s,.1,.2),1.6,.45,tip=.9),AC,0)
def plate(S,c,rx,rz,h=1.3,mat=B1,k=.5,grp='b'):  # 납작한 갑각 판 (가장자리 살짝 솟음)
    S.add(ell(c,(rx,h,rz)),mat,k,grp)
def r1():  # 판갑형: 겹친 등판 4장 + 삽 머리방패 + 등줄기 결정
    S=Scene()
    S.add(ell(P(0,4.6,-3),(7,3.8,8.4)),B2,2,'b')
    for i in range(4):plate(S,P(0,7.2-i*.25,2-i*3.6),6.8-i*.7,2.4,1.5,B1,.35)
    for i in range(4):
        for s in(-1,1):S.add(crystal(P(s*(6.6-i*.7),6.6,2-i*3.6),D(s,.15,-.35),1.8,.55,tip=.85),AC,0)
    S.add(lambda Q:ell(P(0,6.2,7.4),(5.4,1.6,4))(Q),B1,.8,'b')  # 머리방패
    for s in(-1,1):S.add(ell(P(s*2.2,7.6,8.6),(.55,.5,.8)),EY,0);sick(S,s,P(s*1.8,5.6,10.6))
    for k,(f,L) in enumerate([(-.5,5),(-4,6.5),(-7.6,4.5)]):S.add(crystal(P(0,8.2,f),D(0,1,-.5),L,1.3,tip=.55,tw=k*.4),AC,0)
    S.add(cap(P(0,4.4,-11),P(0,4,-15),1.6,.6),B2,1,'t');S.add(crystal(P(0,4.4,-14.6),D(0,0,-1),2.6,1.2,tip=.8),AC,0)
    for f in(4,0,-4):
        for s in(-1,1):legs(S,[P(s*5,4,f),P(s*8,2.2,f-1),P(s*8.8,0,f-2.4)],1.0,.7,LG,'l',.8)
    return S
def r2():  # 가시 방패형: 넓은 한 장 등딱지(게처럼 가장자리 가시) + 큰 낫 턱 + 짧은 상어 꼬리
    S=Scene()
    S.add(ell(P(0,4.6,-2),(6.6,3.6,8)),B2,2,'b')
    S.add(lambda Q:np.maximum(ell(P(0,6.4,0),(8.6,2.4,8.4))(Q),-(np.array(Q)[...,1]-4.6)),B1,.6,'b')
    for k in range(9):
        a=-.25+k/8*(3.14+.5);x,z=math.cos(a)*8.6,-math.sin(a)*8.4+0
        if z>5:continue
        S.add(crystal(P(x,5.8,z),D(math.cos(a),.1,-math.sin(a)),2.2,.7,tip=.85),AC,0)
    for s in(-1,1):S.add(ell(P(s*3.4,7.2,-1),(2.4,.6,4.6)),B2,.5,'b')
    S.add(ell(P(0,5.6,8.4),(4.6,2.8,3)),B1,1.2,'b')
    for s in(-1,1):S.add(ell(P(s*2.4,7.4,9.2),(.55,.5,.8)),EY,0);sick(S,s,P(s*2,5.6,10.6),1.2)
    for k,(x,f,L) in enumerate([(0,-1,7),(-1.4,-3,5),(1.4,-3.2,5.4)]):S.add(crystal(P(x,8,f),D(x*.15,1,-.5),L,1.5,tip=.6,tw=k*.4),AC,0)
    S.add(cap(P(0,4.4,-9),P(0,4,-13),1.8,.8),B2,1,'t')
    for s in(-1,1):S.add(crystal(P(0,4.2,-12.6),D(s,0,-.7),3,1,tip=.7),B1,0)
    for f in(5,1,-3):
        for s in(-1,1):legs(S,[P(s*7,3.8,f),P(s*9.6,2,f-1),P(s*10.2,0,f-2.4)],1.0,.7,LG,'l',.8)
    return S
def r3():  # 마디 갑주형: 쥐처럼 띠 두른 몸 + 무거운 투구 머리 + 높은 결정 등지느러미
    S=Scene()
    S.add(ell(P(0,5.2,-3),(6.6,4.4,9)),B1,2,'b')
    for i in range(5):S.add(ell(P(0,5.4,3-i*3),(6.9-i*.5,4.7,.6)),B2,.3,'b')
    S.add(ell(P(0,5.8,7.2),(5.2,3.6,3.6)),B1,1.2,'h');S.add(ell(P(0,7.4,7.6),(4.4,1.4,3)),B2,.5,'h')
    for s in(-1,1):S.add(ell(P(s*2.6,7.6,9.6),(.55,.5,.8)),EY,0);sick(S,s,P(s*1.8,5.6,10.4))
    S.add(crystal(P(0,9.2,-2),D(0,1,-.9),9,1.6,tip=.45),AC,0)
    for k,(x,f,L) in enumerate([(-2.6,0,4),(2.6,-.6,4.2),(-2.2,-5,3.4),(2.4,-5.4,3.6)]):S.add(crystal(P(x,8.6,f),D(x*.2,1,-.3),L,1.1,tip=.6,tw=k),AC,0)
    crescent(S,-12)
    for f in(3,-2):
        for s in(-1,1):legs(S,[P(s*5.6,4,f),P(s*8.6,2.2,f-1),P(s*9.2,0,f-2.4)],1.2,.9,LG,'l',.8)
    return S
# 쥐 웅크림 시안
def cu1():  # 공 + 적도 둘레로 결정 파편이 고르게 뻗음
    S=Scene();S.add(sphere((0,7,0),6.4),B1,1,'s')
    for i in range(3):S.add(lambda Q,z=-3+i*3:np.maximum(sphere((0,7,0),6.7)(Q),abs(Q[...,2]-z)-.4),B2,.3,'s')
    for k in range(12):a=k/12*6.283;S.add(crystal((math.cos(a)*5.6,7,math.sin(a)*5.6),(math.cos(a),.15,math.sin(a)),3.6,.9,tip=.7),AC,0)
    return S
def cu2():  # 공 + 두 줄로 엇갈린 결정 파편 (안쪽 줄 짧게)
    S=Scene();S.add(sphere((0,7,0),6.2),B1,1,'s')
    for i in range(3):S.add(lambda Q,z=-3+i*3:np.maximum(sphere((0,7,0),6.5)(Q),abs(Q[...,2]-z)-.4),B2,.3,'s')
    for k in range(10):a=k/10*6.283;S.add(crystal((math.cos(a)*5.4,6.6,math.sin(a)*5.4),(math.cos(a),.1,math.sin(a)),4.2,1.0,tip=.6),AC,0)
    for k in range(10):a=(k+.5)/10*6.283;S.add(crystal((math.cos(a)*4.4,9.6,math.sin(a)*4.4),(math.cos(a),.7,math.sin(a)),2.8,.8,tip=.7),AC,0)
    return S
def cu3():  # 몸을 C자로 둥글게 말고(띠 마디) 등 바깥 둘레를 따라 결정이 줄지어 섬, 머리·꼬리는 안쪽
    S=Scene()
    n=11
    for k in range(n):
        a=-.2+k/(n-1)*5.0;S.add(sphere((math.cos(a)*4.6,6.4,math.sin(a)*4.6),3.3),B2 if k%2 else B1,1.0,'s')
    S.add(sphere((0,6.4,0),3.4),B1,1.4,'s')
    S.add(ell((math.cos(-.5)*2.6,7.4,math.sin(-.5)*2.6),(2.2,1.8,1.6)),B2,.8,'h');S.add(sphere((math.cos(-.75)*3.2,8.6,math.sin(-.75)*3.2),.5),EY,0)
    for k in range(11):a=-.1+k/10*4.8;S.add(crystal((math.cos(a)*7.2,7.2,math.sin(a)*7.2),(math.cos(a),.35,math.sin(a)),3.8,1.0,tip=.65),AC,0)
    return S
SL=((0x262e3c,0x323c4e,0x404c62,0x505e76,0x62728c,0x7888a2),(0x1a2030,0x222a3c,0x2c364a,0x38445a,0x46526a),(0x161c28,0x1e2532,0x283040,0x323c4e),(0x40c0f0,0x78dcff,0xb8f0ff,0xf0fcff),(0xe04020,0xff7040,0xffb080))  # 짙은 청회색 갑주 + 청록 결정
VI=((0x2a2240,0x362c54,0x443a68,0x54487e,0x665a94,0x7c70ac),(0x1e1830,0x282040,0x322a52,0x3e3464,0x4a4076),(0x181428,0x201a34,0x2a2242,0x342a50),(0x40c0f0,0x78dcff,0xb8f0ff,0xf0fcff),(0xe04020,0xff7040,0xffb080))  # 어두운 남보라 갑주 + 청록 결정 (원래 땅울음 색)
def M_(p):b,d,l,a,e=p;return PAL(b,d,l,a,e,CRY)
if __name__=='__main__':
    mon.ORI='up'
    for n,f in (('r1',r1),('r2',r2),('r3',r3)):
        for pn,p in (('s',SL),('v',VI)):spr(f(),120,140,.525,(0,6,-2),89,'rk_%s%s'%(n,pn),(),M=M_(p),light=(-.4,.8,-.45))
    for n,f in (('cu1',cu1),('cu2',cu2),('cu3',cu3)):
        for rk in ('rq_c','rq_e'):
            b,d,c=RT2[rk];spr(f(),48,48,.54,(0,7,0),89,'%s_%s'%(n,rk[-1]),(),M=PAL(b,d,d[:4],c,(0x101010,0x202020,0x707070),CRY),light=LT)
