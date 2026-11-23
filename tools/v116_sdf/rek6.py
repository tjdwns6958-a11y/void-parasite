# 땅울음 가재 + 무기물(결정) 붙이기 / 쥐 꼬리 3번 끝을 안쪽으로
from rek5 import *
def crb(S):  # 가재 몸(결정 없이)
    S.add(ell(P(0,5.6,3),(5.4,3.8,5.8)),B1,1.4,'c');S.add(cap(P(0,7.8,7),P(0,7.2,1),.4,.3),B2,.1,'c')
    S.add(crystal(P(0,6.4,8.4),D(0,.1,1),3.2,.9,tip=.8),AC,0)
    for s in(-1,1):S.add(ell(P(s*2.2,7.8,7.4),(.55,.5,.8)),EY,0);sick(S,s,P(s*2,5.4,8.6))
    for i in range(5):
        f=-3-i*2.3;w=5-i*.55
        S.add(ell(P(0,5.4-i*.15,f),(w,3.2-i*.2,1.7)),B1,.25,'a');S.add(ell(P(0,5.6-i*.15,f-1.1),(w+.15,3.3-i*.2,.35)),B2,.2,'a')
        for s in(-1,1):S.add(crystal(P(s*w,4.6,f),D(s,.0,-.4),1.8,.6,tip=.85),AC,0)
    e=-3-5*2.3
    S.add(ell(P(0,4.6,e-1),(1.4,.9,2.8)),B1,.6,'f')
    for s in(-1,1):
        for k,(a,L) in enumerate(((.35,3.6),(.85,3.2))):
            dx,dz=math.sin(a)*s,-math.cos(a);S.add(ell(P(s*1.2+dx*L*.5,4.5,e-.6+dz*L*.5),(1.5,.6,L*.55)),B1 if k==0 else B2,.5,'f')
            S.add(crystal(P(s*1.2+dx*L,4.6,e-.6+dz*L),D(dx,0,dz),1.6,.6,tip=.85),AC,0)
    legs3(S,(4.5,1.5,-1.5),5);return e
def X(S,x,y,f,dx,dy,df,L,r,tw=0):S.add(crystal(P(x,y,f),D(dx,dy,df),L,r,tip=.55,tw=tw),AC,0)
def crA():  # 등딱지 뒤쪽에 결정 무더기 3개(뒤로 기움) + 배마디마다 가운데 작은 결정 한 줄
    S=Scene();e=crb(S)
    X(S,0,8.6,1.6,0,1,-.8,5.4,1.3);X(S,-1.8,8.2,2.4,-.4,1,-.5,3.4,1,.6);X(S,1.9,8.2,2.2,.4,1,-.5,3.8,1,1.2)
    for i in range(5):X(S,0,8.4-i*.35,-3-i*2.3,0,1,-.4,2.2-i*.25,.75,i)
    return S
def crB():  # 양 어깨에 결정 한 쌍 + 등딱지 가운데에 박힌 납작한 결정 판 + 꼬리 부채 가운데 결정
    S=Scene();e=crb(S)
    for s in(-1,1):X(S,s*3.8,7.6,4,s*.7,1,-.3,3.6,1.1,s*.5)
    S.add(lambda Q:np.maximum(ell(P(0,8.9,2.6),(1.8,.6,3.4))(Q),-(np.array(Q)[...,1]-8.5)),AC,0)
    for i in (1,3):
        for s in(-1,1):X(S,s*1.6,8.1-i*.35,-3-i*2.3,s*.3,1,-.3,1.8,.7)
    X(S,0,5.2,e-1.4,0,.5,-1,3,.9)
    return S
def crC():  # 광석이 자라난 듯 한쪽(오른쪽)으로 몰린 결정 덩어리 + 배에 몇 개만 비대칭
    S=Scene();e=crb(S)
    for k,(x,f,L,dx) in enumerate([(2.2,3,5.6,.4),(3.6,1.6,3.8,.8),(1,1.2,3.4,.1),(3.2,4.6,2.8,.7),(-1.6,2.4,2.4,-.4)]):X(S,x,8.2,f,dx,1,-.4,L,1.15,k*.8)
    for i,(x,L) in enumerate([(1.8,2.6),(-1.4,2),(2,1.8)]):X(S,x,8.2-i*.4,-4-i*3.4,x*.2,1,-.3,L,.8,i)
    return S
def rt3(n):  # 쥐 3번 꼬리, 끝을 안쪽(몸 쪽)으로 조금씩 더 말아 넣음
    S=Scene();ratE(S)
    ds={'a':[.2,0,-.3,-.6,-1.0,-1.4,-1.8],'b':[.2,0,-.3,-.7,-1.2,-1.8,-2.3],'c':[.2,-.1,-.5,-1.0,-1.6,-2.2,-2.8]}[n]
    a0=.2;x,z=math.cos(a0)*3.9,math.sin(a0)*3.9;pts=[(math.cos(a0)*3.4,4.4,math.sin(a0)*3.4),(x,4.0,z)]
    for d in ds:x+=math.cos(d)*2.3;z+=math.sin(d)*2.3;pts.append((x,3.8,z))
    tailc(S,pts,1.05,.3);return S
if __name__=='__main__':
    mon.ORI='up'
    for n,f in (('crA',crA),('crB',crB),('crC',crC)):
        for pn,p in (('s',SL),('v',VI)):
            M=M_(p);m=dict(M[B1]);m.update(spec=10,rim=.4);M[B1]=m
            spr(f(),130,170,.525,(0,6,-3),89,'rk_%s%s'%(n,pn),(),M=M,light=(-.4,.8,-.45))
    for n in 'abc':
        for rk in ('rq_c','rq_e'):
            b,d,c=RT2[rk];spr(rt3(n),80,80,.54,(0,7,0),89,'rt3%s_%s'%(n,rk[-1]),(),M=PAL(b,d,d[:4],c,(0x101010,0x202020,0x707070),CRY),light=LT)
