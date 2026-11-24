# 땅울음 3-E 꼬리 개선 + 쥐 웅크림 E안 꼬리 길게
from rek3 import *
def r3e_body(S):
    body3(S);head3(S)
    S.add(crystal(P(0,9.2,-2),D(0,1,-.9),9,1.6,tip=.45),AC,0)
    for k,(x,f) in enumerate([(-3,3.5),(3.2,.5),(-3.4,-2.5),(3,-5.5),(-2.4,-8)]):S.add(crystal(P(x,8.2,f),D(x*.2,1,-.2),2.4,.9,tip=.6,tw=k),AC,0)
    legs3(S,(3,-2))
def tseg(S,f0,n,ln,r0,r1):  # 갑주 꼬리 마디
    for i in range(n):
        r=r0+(r1-r0)*i/max(1,n-1);f=f0-i*ln
        S.add(ell(P(0,4.6,f),(r,r*.8,ln*.62)),B1,.7,'t');S.add(ell(P(0,4.7,f-ln*.5),(r+.25,r*.8+.2,.35)),B2,.3,'t')
    return f0-n*ln
def tA():  # 갑주 꼬리 + 끝에 큰 결정 창날, 양옆 갈고리 가시
    S=Scene();r3e_body(S);e=tseg(S,-11.2,4,2,2.4,1.4)
    S.add(crystal(P(0,4.8,e+.6),D(0,0,-1),7,1.9,tip=.55),AC,0)
    for s in(-1,1):S.add(crystal(P(s*1,4.8,e+1),D(s*.9,0,-.25),3.4,.9,tip=.8),AC,0);S.add(crystal(P(s*1.6,4.8,e+4.4),D(s,.1,-.5),2.2,.7,tip=.85),AC,0)
    return S
def tB():  # 굵은 꼬리자루 + 넓게 뒤로 젖힌 초승달 지느러미(갑각 판), 가장자리 톱날 결정
    S=Scene();r3e_body(S);e=tseg(S,-11.2,2,2,2.4,1.9)
    for s in(-1,1):
        S.add(cap(P(0,4.4,e+.6),P(s*6.4,4.2,e-4.8),2.2,.6),B1,1,'t')
        S.add(cap(P(s*.6,4.6,e),P(s*5.2,4.4,e-3.4),.8,.3),B2,.6,'t')
        for k in range(4):
            u=.25+k*.22;S.add(crystal(P(s*6.4*u,4.6,e+.6-5.4*u),D(s*.55,.1,.8),2,.6,tip=.85),AC,0)
        S.add(crystal(P(s*6.2,4.4,e-4.6),D(s*.7,0,-.7),3,.9,tip=.75),AC,0)
    return S
def tC():  # 마디 꼬리 끝에 결정 가시 철퇴
    S=Scene();r3e_body(S);e=tseg(S,-11.2,3,2,2.2,1.4)
    S.add(sphere(P(0,4.8,e-1.6),2.6),B1,1,'t')
    for k in range(8):
        a=k/8*6.283;S.add(crystal(P(math.cos(a)*2,4.8+math.sin(a)*.6,e-1.6+math.sin(a)*2),D(math.cos(a),.15,math.sin(a)),3.2,.9,tip=.7),AC,0)
    S.add(crystal(P(0,5.6,e-3.6),D(0,0,-1),3.4,1,tip=.7),AC,0)
    return S
# 쥐 E안 + 길게 뻗은 꼬리 (머리 반대쪽 = 말린 고리의 뒤끝에서 바깥으로)
def ratE(S):
    curlbody(S,.2,4.7,R=3.5);rathead(S,5.15,R=3.5,ear=1.2,out=1.8)
    shards2(S,1.2,3.9,6,R0=5.6,R1=4.3,L0=4.6,jit=.7)
def tpath(S,pts,r0=1.05,r1=.3):tailc(S,pts,r0,r1)
pol=lambda a,R,y=3.8:(math.cos(a)*R,y,math.sin(a)*R)
def ce1():  # 꼬리가 몸 뒤끝에서 바깥으로 길고 완만하게 쭉
    S=Scene();ratE(S);tpath(S,[pol(.2,4.0,4.4),pol(.45,6.4),pol(.62,9),pol(.72,11.6),pol(.78,14)]);return S
def ce2():  # 길게 S자로 휘어짐
    S=Scene();ratE(S);tpath(S,[pol(.2,4.0,4.4),pol(.5,6.4),pol(.75,8.8),pol(.68,11.2),pol(.5,13.2),pol(.48,15)]);return S
def ce3():  # 길게 뻗다가 끝이 갈고리처럼 말림
    S=Scene();ratE(S);tpath(S,[pol(.2,4.0,4.4),pol(.45,6.6),pol(.6,9.4),pol(.66,12),pol(.62,13.6),pol(.48,14.2),pol(.4,13.2)]);return S
if __name__=='__main__':
    mon.ORI='up'
    for n,f in (('tA',tA),('tB',tB),('tC',tC)):
        for pn,p in (('s',SL),('v',VI)):spr(f(),130,170,.525,(0,6,-4),89,'rk_e%s%s'%(n,pn),(),M=M_(p),light=(-.4,.8,-.45))
    for n,f in (('ce1',ce1),('ce2',ce2),('ce3',ce3)):
        for rk in ('rq_c','rq_e'):
            b,d,c=RT2[rk];spr(f(),70,70,.54,(0,7,0),89,'%s_%s'%(n,rk[-1]),(),M=PAL(b,d,d[:4],c,(0x101010,0x202020,0x707070),CRY),light=LT)
