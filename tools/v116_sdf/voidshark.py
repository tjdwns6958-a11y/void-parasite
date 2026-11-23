# 공허 모래상어: 정동 집게왕 재질 + 렉사이(갑주 볏·갈라진 아가리·낫 발톱·마디 갑각) + 상어(날렵한 몸·등지느러미·초승달 꼬리)
from common import *
import mon
from mon import LT
P=lambda x,y,f:mon.P(x,y,f);D=P
def SM():
    M=mats()
    M[SHELL]=dict(M[SHELL]);M[SHELL].update(amb=.1,dif=.9,rim=.45,fill=.14,texk=.15)
    return M
def plates(S,fs,ws,y0=5):
    for i,(f,w) in enumerate(zip(fs,ws)):
        S.add(ell(P(0,y0-i*.3,f),(w,3.6-i*.25,2.6)),SHELL,.6,'b')
        S.add(ell(P(0,y0+2.2-i*.3,f+.8),(w*.8,1.2,1.4)),SHELL,.4,'b')
def jaw(S,f0,ln=4.5,w=2.4):
    for s in(-1,1):
        S.add(cap(P(s*1.4,5.4,f0),P(s*w*.55,5,f0+ln),1.8,.7),SHELL,1,'j%d'%s)
        for k in range(4):S.add(crystal(P(s*(1.0+k*.12),6.2,f0+.8+k*1.0),D(-s,.1,.3),1.6,.45,tip=.9),BONE,0)
    S.add(lambda Q:ell(P(0,5.4,f0+ln*.45),(.9,1.2,ln*.5))(Q),DARK,0)
def scythe(S,s,sh,el,tip_dir,ln=8):
    legs(S,[sh,el],2.2,1.9,SHELL,'c%d'%s,1)
    S.add(crystal(el,tip_dir,ln,1.8,tip=.85),SHELL,1,'c%d'%s)
    S.add(crystal(el,tip_dir,ln*.9,.9,tip=.9),BONE,0)
def crescent(S,f0):
    S.add(cap(P(0,4,f0),P(0,3.6,f0-5),1.8,1),SHELL,1.2,'b')
    for s in(-1,1):
        S.add(cap(P(0,3.6,f0-5),P(s*4.6,3.6,f0-8.4),1.2,.4),SHELL,1,'b')
        S.add(crystal(P(s*4.2,3.8,f0-8),D(s*.8,0,-.6),2.4,.7,tip=.8),CRY if s>0 else CRY2,0)
def rearlegs(S,fs):
    for f in fs:
        for s in(-1,1):legs(S,[P(s*3.6,4,f),P(s*6.6,2.4,f-1.4),P(s*7.6,0,f-3)],1.1,.7,SHELL,'l',.8)
def eyes(S,f,x):
    for s in(-1,1):S.add(ell(P(s*x,7.4,f),(.6,.5,1.1)),EYE,0)
def bladefin(S,s,root,tip,w=2.2):
    S.add(cap(root,tip,w,.35),SHELL,1.2,'b')
    r=np.array(root,float);t=np.array(tip,float)
    for k in range(3):
        p=r+(t-r)*(.3+k*.25);S.add(crystal(tuple(p),tuple(np.array(P(s*.2,0,1),float)),2.2-k*.4,.55,tip=.85),BONE,0)
def torpedo(S,ln,w):
    S.add(ell(P(0,5,0),(w,3.8,ln)),SHELL,2,'b')
    for i in range(5):S.add(ell(P(0,7.4,ln*.55-i*ln*.25),(w*.78-i*.5,1.2,1.4)),SHELL,.4,'b')
def head(S,f,w,crest):
    S.add(cap(P(0,5.2,f-2),P(0,4.8,f+4),w,.9),SHELL,1.6,'b')
    if crest:
        S.add(lambda Q:np.maximum(ell(P(0,7.6,f),(w+2.6,1.6,3.6))(Q),-(np.array(Q)[...,1]-6.6)),SHELL,.6,'b')
        for s in(-1,1):
            for k in range(3):S.add(crystal(P(s*(w+1.6+k*.3),7.8,f-1+k*1.4),D(s*.8,.6,0),2.6-k*.5,.9,tip=.8),CRY if k%2 else CRY2,0)
    for s in(-1,1):S.add(ell(P(s*w*.62,6.8,f+.8),(.55,.5,1.0)),EYE,0)
    S.add(lambda Q:ell(P(0,6.0,f+3.2),(.7,1.0,1.6))(Q),DARK,0)
    for s in(-1,1):
        for k in range(3):S.add(crystal(P(s*.9,6.4,f+2+k*.9),D(-s,.1,.2),1.1,.35,tip=.9),BONE,0)
def dorsal(S,f,big):
    if big:
        for k,(x,ff,L) in enumerate([(0,f,8.5),(-1,f-1.6,6),(1,f-1.4,6.4),(0,f-3.6,4.6)]):S.add(crystal(P(x,7.6,ff),D(x*.15,1,-.6),L,1.6,tip=.6,tw=k*.4),CRY2 if k%2 else CRY,0)
    else:S.add(crystal(P(0,7.6,f),D(0,1,-.7),6,1.4,tip=.5),CRY2,0)
def sA():  # 결정 등지느러미 + 날 지느러미
    S=Scene();torpedo(S,12,5.2);head(S,12,3.6,False)
    for s in(-1,1):bladefin(S,s,P(s*4.4,4.6,5),P(s*11,3.8,-1),2.4)
    dorsal(S,1,True);crescent(S,-11);return S
def sB():  # 렉사이 갑주 볏 머리 + 짧은 날 지느러미
    S=Scene();torpedo(S,11,5.4);head(S,11.5,3.8,True)
    for s in(-1,1):bladefin(S,s,P(s*4.6,4.6,4),P(s*10,3.8,-1),2.2)
    for i in range(4):S.add(crystal(P(0,8.4-i*.3,3-i*3.4),D(0,1,-.6),3.4-i*.5,1.2,tip=.8),CRY2 if i%2 else CRY,0)
    crescent(S,-10);return S
def sC():  # 날렵한 상어: 긴 몸, 옆 결정 가시, 긴 날 지느러미
    S=Scene();torpedo(S,14,4.4);head(S,14,3.2,False)
    for s in(-1,1):bladefin(S,s,P(s*3.8,4.6,6),P(s*12,3.8,-2.5),2.0)
    for i,f in enumerate([-3,-6.5,-10]):
        for s in(-1,1):S.add(crystal(P(s*(3.6-i*.5),5.2,f),D(s,.25,-.4),2.4,.75,tip=.8),CRY if (i+(s>0))%2 else CRY2,0)
    dorsal(S,1,False);crescent(S,-13);return S
if __name__=='__main__':
    M=SM();mon.ORI='up'
    E=[((0,12,0),(150,90,255),20,.35)]
    for n,f in [('qA',sA),('qB',sB),('qC',sC)]:spr(f(),80,100,.72,(0,6,0),89,n,E+[(P(0,8,11),(255,90,60),5,.5)],M=M,light=LT)
