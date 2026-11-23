from shapes import *
PUP=35
def NM2():
    M=NM();M[PUP]=dict(ramp=ramp(0x050508,0x0c0c12,0x16161e),amb=.3,dif=.2,rim=0,fill=0,dith=0,gk=0,spec=0);return M
def fin(S,s,base,ln,wd,mat=B2,grp='b'):
    S.add(lambda Q,s=s:ell(base,(wd,1,ln))(Q),mat,1,grp)
def tail(S,f0):
    S.add(cap(P(0,5,f0),P(0,5,f0-6),2,1),B1,1.5,'b')
    for s in(-1,1):S.add(lambda Q,s=s:ell(P(s*3.2,4.8,f0-7.5),(3.4,.9,1.6))(Q),B2,1,'b')
def sh1():  # 망치머리
    S=Scene()
    S.add(ell(P(0,5,0),(4.6,3.8,11)),B1,2,'b');S.add(ell(P(0,5,11),(9,2.4,2.4)),B1,1.5,'b')
    for s in(-1,1):S.add(sphere(P(s*8.6,5.6,11.4),.9),EY,0);fin(S,s,P(s*6,4.4,2),3,4.4)
    S.add(lambda Q:ell(P(0,9.4,0),(.9,3,3.6))(Q),B2,1,'b');tail(S,-9)
    return S
def sh2():  # 갑판 등지느러미 (렉사이처럼 등에 겹친 판과 볏)
    S=Scene()
    S.add(ell(P(0,5,0),(5.4,4,12)),B1,2,'b');S.add(ell(P(0,5,12),(4.4,3.4,3.6)),B1,1.5,'b')
    for i in range(5):S.add(ell(P(0,8.4,7-i*3.6),(4.2-i*.5,1.2,1.8)),B2,.4,'b')
    for i in range(4):S.add(crystal(P(0,9.2,6-i*3.6),D(0,1,-.6),3.4-i*.5,1.2,tip=.8),AC,0)
    for s in(-1,1):
        S.add(sphere(P(s*3,6.6,13.6),.7),EY,0);fin(S,s,P(s*6.4,4.4,4),3.4,4.2)
        for k in range(3):S.add(cap(P(s*9.4,4.4,5+k*1.4-1.4),P(s*10.8,4.4,6+k*1.4-1),.35,.2),AC,0)
    tail(S,-10);return S
def sh3():  # 큰 아가리: 짧고 굵은 몸, 위에서 보이게 벌린 입
    S=Scene()
    S.add(ell(P(0,5.4,-1),(6.4,4.6,9.5)),B1,2,'b');S.add(ell(P(0,5.4,8.5),(6,4,4)),B1,1.5,'b')
    S.add(lambda Q:np.maximum(ell(P(0,7.6,10.4),(4.6,2,3))(Q),-(np.array(Q)[...,1]-7)),LG,0)
    for k in range(6):x=-3.6+k*1.44;S.add(crystal(P(x,8.4,12.4-abs(x)*.35),D(0,-.2,-1),1.8,.5,tip=.9),AC,0);S.add(crystal(P(x*.85,8.4,8.6+abs(x)*.2),D(0,-.2,1),1.4,.45,tip=.9),AC,0)
    for s in(-1,1):S.add(sphere(P(s*4.6,7.2,7),.8),EY,0);fin(S,s,P(s*7.4,4.6,1),3,4.6)
    S.add(lambda Q:ell(P(0,10,-2),(.9,3,3.4))(Q),B2,1,'b');tail(S,-9.5)
    return S
def sh4():  # 넓적 수염상어: 납작한 몸 + 넓은 가슴지느러미 + 머리 술
    S=Scene()
    S.add(ell(P(0,4,0),(5.6,2.4,12)),B1,2,'b');S.add(ell(P(0,4.2,10),(6.2,2.2,3.4)),B1,1.5,'b')
    for s in(-1,1):
        S.add(lambda Q,s=s:ell(P(s*6.6,3.8,4),(4.6,.9,4.2))(Q),B1,1.2,'b')
        S.add(lambda Q,s=s:ell(P(s*4.6,3.8,-5),(3,.8,2.6))(Q),B2,1,'b')
        S.add(sphere(P(s*2.6,5.6,10.4),.7),EY,0)
        for i in range(4):S.add(sphere(P(s*(2+i*.2),5.4,4-i*3.4),.9),B2,0)
    for k in range(9):a=k/8*3.14;S.add(cap(P(math.cos(a)*5.6,4,12.4+math.sin(a)*1.2),P(math.cos(a)*6.6,3.6,13.8+math.sin(a)*1.4),.45,.2),B2,0)
    tail(S,-10);return S
# ---------- 귀여운 청개구리 (위를 봄) ----------
def frogc(v):
    S=Scene()
    w=1.0 if v!=2 else 1.12
    S.add(ell(P(0,5.2,0),(6.4*w,4.8,6.6)),B1,3,'b')
    er=2.6 if v==1 else (3.0 if v==2 else 2.2)
    for s in(-1,1):
        e=P(s*3.6*w,8.6,3.6);S.add(sphere(e,er),AC,0)
        S.add(sphere(P(s*3.6*w,8.6+er*.55,3.6+er*.45),er*.62),PUP,0)
        S.add(sphere(P(s*3.6*w-s*er*.25,8.6+er*.95,3.6+er*.55),er*.18),AC,0)
        if v==3:S.add(sphere(P(s*4.8*w,6.6,6),1.0),B2,0)
        S.add(ell(P(s*6.2*w,2.4,-4.4),(2.4,1.6,2)),B1,1.2,'b');S.add(ell(P(s*7.2*w,.4,-6.2),(1.6,.5,1.3)),B1,.6,'b')
        S.add(ell(P(s*5.6*w,2,4.4),(1.4,1.4,1.4)),B1,1,'b');S.add(ell(P(s*6.6*w,.3,5.6),(1.2,.4,1)),B1,.5,'b')
    S.add(lambda Q:np.abs(ell(P(0,7.2,5.6),(2.2,.5,.6))(Q))-.12,B2,0)
    return S
if __name__=='__main__':
    M=NM2();mon.ORI='up'
    for i,f in enumerate([sh1,sh2,sh3,sh4]):spr(f(),70,90,.85,(0,6,0),89,'zs%d'%(i+1),(),M=M,light=LT)
    for v in (1,2,3):spr(frogc(v),64,64,.58,(0,5,0),89,'zf%d'%v,(),M=M,light=LT)
