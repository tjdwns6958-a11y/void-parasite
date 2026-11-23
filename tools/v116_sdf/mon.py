from common import *
import sys
ORI='up'
def P(x,y,f):
    # 지역 좌표(x=오른쪽, y=위, f=앞) → 렌더 좌표. up: 앞=화면 위(-z) / right: 앞=화면 오른쪽(+x)
    return (x,y,-f) if ORI=='up' else (f,y,x)
def Dv(x,y,f):return P(x,y,f)
def Rr(x,y,f):return (x,y,f) if ORI=='up' else (f,y,x)
LT=(-.55,.62,-.56)
def TM():
    M=mats();M[SHELL]=dict(M[SHELL]);M[SHELL].update(amb=.1,dif=.95,rim=.55,fill=.18)
    M[ROCK]=dict(ramp=ramp(0x0c0a12,0x16121e,0x221c2e,0x322a42,0x463c5a,0x5e5274),tex=lambda P:noise3(P,.5,2),texk=.45,rim=.2,amb=.08,dif=.9,gk=.8,dith=.07,fill=.15)
    M[BONE]=dict(M[BONE]);M[BONE].update(amb=.15)
    for c in(CRY,CRY2):M[c]=dict(M[c]);M[c].update(amb=.12,spec=40,rim=.55,dif=.75)
    return M
def top(scene,name,W,H,scale,emit=(),ori='up'):
    return spr(scene,W,H,scale,(0,6,0),89,name,emit,M=TM(),light=LT)

# ---------- 낫그늘 ----------
def kha():
    S=Scene()
    S.add(ell(P(0,8,4),(6.5,4.5,7.5) if ORI=='up' else (7.5,4.5,6.5)),SHELL,2,'b')
    for i,(f,r) in enumerate([(-5,7.5),(-11.5,7.2),(-17.5,6),(-22.5,4.2)]):
        S.add(ell(P(0,8-i*.3,f),(r,4.2-i*.4,3.9)),SHELL,1.0,'b')
    S.add(ell(P(0,9,13),(5.5,3.6,4.2)),SHELL,1.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*3.8,10,14.8),1.8),EYE)
        a=P(s*5.5,9,8);b=P(s*12.5,11,13);c=P(s*12,12,21)
        S.add(cap(a,b,2.7,2.3),SHELL,1.2,'arm%d'%s);S.add(cap(b,c,2.3,1.9),SHELL,1.2,'arm%d'%s)
        S.add(crystal(c,Dv(s*-.75,.05,.55),15,2.4,tip=.75),CRY2,0)
        S.add(crystal(b,Dv(s*.5,.3,.7),8,1.4,tip=.6),CRY,0)
        for k,(f0,df) in enumerate([(2,-3),(-6,-9)]):
            legs(S,[P(s*5.5,8,f0),P(s*13,11,f0+df*.2),P(s*18,0,f0+df)],1.7,.7)
    for i,f in enumerate([3,-5,-11.5,-17.5]):
        for s in(-1,1):
            S.add(crystal(P(s*2.4,10.8-i*.4,f+1),Dv(s*.9,.55,-.8),7-i*.9,1.5),CRY if (i+(s>0))%2 else CRY2,0)
    return S
# ---------- 땅울음 (굴 파는 갑각 포식자) ----------
def rek():
    S=Scene()
    # 넓은 삽 모양 머리판
    S.add(ell(P(0,7,14),(12,4,8)),SHELL,2.5,'b')
    for s in(-1,1):
        S.add(cap(P(s*6,7,18),P(s*10,8,27),2.6,1.2),BONE,1,'b')   # 큰 아래턱
        S.add(crystal(P(s*9,8,25),Dv(s*-.6,0,.8),6,1.2,tip=.7),BONE,0)
        S.add(sphere(P(s*7.5,9.8,13),1.5),EYE)
    for i in range(6):
        f=6-i*6.2;r=11-i*1.2
        S.add(ell(P(0,7-i*.4,f),(r,4.8-i*.35,4.0)),SHELL,1.2,'b')
        S.add(crystal(P(0,10-i*.4,f),Dv(0,1,-.55),8-i*.9,2.0-i*.15,tw=.5),CRY2 if i%2 else CRY,0)
        if i<4:
            for s in(-1,1):
                legs(S,[P(s*(r-1),6,f),P(s*(r+6),5,f-2),P(s*(r+9),0,f-4)],1.6,.7)
    return S
# ---------- 보이드링 ----------
def vdl():
    S=Scene()
    S.add(ell(P(0,7,0),(6,4,7)),SHELL,1.5,'b')
    S.add(ell(P(0,7,-8),(4,3,4)),SHELL,1.5,'b')
    S.add(sphere(P(0,10,3),2.6),GLOW)
    for s in(-1,1):
        S.add(crystal(P(s*4,8,1),Dv(s*1,.25,-.45),12,2.0,tip=.5),CRY2,0)
        S.add(crystal(P(s*3,8,-4),Dv(s*.8,.2,-.9),8,1.4,tip=.5),CRY,0)
        S.add(cap(P(s*2,6,6),P(s*3.5,6,11),1.2,.6),BONE,0)
    return S
# ---------- 칠성장어 머리 / 마디 ----------
def lmpH():
    S=Scene()
    S.add(ell(P(0,6,0),(6.5,4.5,8)),SHELL,1.5,'b')
    S.add(lambda Q:np.maximum(sphere(P(0,8,5),5.2)(Q),-sphere(P(0,10.5,6),3.6)(Q)),SHELL,1,'b')
    S.add(sphere(P(0,7.5,6),3.0),DARK)
    random.seed(2)
    for k in range(10):
        a=k/10*6.283;S.add(crystal(P(math.cos(a)*3.6,9.5,6+math.sin(a)*3.6),Dv(-math.cos(a),.3,-math.sin(a)),2.6,.6,tip=.6),BONE,0)
    for s in(-1,1):S.add(crystal(P(s*4,8,-2),Dv(s*.7,.4,-.6),6,1.2),CRY,0)
    return S
def lmpS():
    S=Scene()
    S.add(ell(P(0,5,0),(5.5,3.6,4.2)),SHELL,1)
    S.add(crystal(P(0,7.5,0),Dv(0,.8,-.6),6,1.3),CRY2,0)
    for s in(-1,1):S.add(crystal(P(s*4.5,5,0),Dv(s,.2,-.3),4,.9),CRY,0)
    return S
# ---------- 먹이: 작은 수정 진드기 / 큰 등껍질 유충 ----------
def f_s():
    S=Scene()
    S.add(ell(P(0,4,0),(3.6,2.6,4.6)),SHELL,1,'b');S.add(ell(P(0,4,4.6),(2.4,2,2)),SHELL,1,'b')
    S.add(crystal(P(0,5.5,-1),Dv(0,1,-.5),4.5,1.3),CRY,0)
    for s in(-1,1):
        for f in(2,-1):legs(S,[P(s*3,3,f),P(s*6,0,f-1)],.8,.5)
    return S
def f_l():
    S=Scene()
    for i in range(4):S.add(ell(P(0,5-i*.3,3-i*4),(5.4-i*.7,3.4-i*.3,3.0)),SHELL,1.4,'b')
    S.add(ell(P(0,5,7),(3.6,2.8,2.6)),SHELL,1,'b')
    for s in(-1,1):
        S.add(sphere(P(s*1.8,6.6,8.4),.9),EYE)
        S.add(crystal(P(s*2,7,-1),Dv(s*.9,.6,-.5),5,1.3),CRY if s>0 else CRY2,0)
        for i in range(3):legs(S,[P(s*(5-i*.6),4,3-i*4),P(s*(8-i*.6),0,2-i*4)],.9,.5)
    S.add(crystal(P(0,7.5,3),Dv(0,1,-.4),4,1.2),CRY2,0)
    return S
# ---------- 제르사이 유생 (오른쪽을 봄): 웅크린 뜀뛰기 갑각 유생 ----------
def gna():
    S=Scene()
    S.add(ell(P(0,6,-1),Rr(6.5,5,8)),SHELL,2,'b');S.add(ell(P(0,6.5,7),Rr(5,4,4.5)),SHELL,1.5,'b')
    for s in(-1,1):
        S.add(sphere(P(s*3.4,9.2,8.5),1.7),EYE)
        legs(S,[P(s*5,5,-4),P(s*10,8,-2),P(s*11,2,-10),P(s*8,0,-13)],2.4,1.0)   # 굵은 뒷다리
        legs(S,[P(s*4,4,5),P(s*8,2,8),P(s*8,0,11)],1.3,.7)
    for i,f in enumerate([4,0,-4,-8]):
        S.add(crystal(P(0,9.5-i*.3,f),Dv(0,.9,-.6),6.5-i*.8,1.6),CRY if i%2 else CRY2,0)
    return S
def gnac():
    S=Scene()
    S.add(sphere((0,7,0),7.2),SHELL,2,'b')
    random.seed(7)
    for k in range(9):
        a=k/9*6.283;S.add(crystal((math.cos(a)*5,9,math.sin(a)*5),(math.cos(a),.9,math.sin(a)),5,1.5),CRY if k%2 else CRY2,0)
    S.add(crystal((0,12,0),(0,1,0),5,1.6),CRY2,0)
    return S
# ---------- 감시자 (오른쪽을 봄): 갑주 등에 큰 빛눈 ----------
def wd():
    S=Scene()
    for i in range(3):S.add(ell(P(0,7-i*.5,-2-i*6),Rr(12-i*2.2,5-i*.5,4.6)),SHELL,1.4,'b')
    S.add(ell(P(0,8,7),Rr(11,6,7.5)),SHELL,2.5,'b')
    S.add(sphere(P(0,10,12),5.4),EYE)
    S.add(sphere(P(0,13,14.5),1.7),GLOW)
    for s in(-1,1):
        S.add(cap(P(s*8,8,10),P(s*11,10,19),2.2,.9),BONE,1)
        S.add(crystal(P(s*11,10,18),Dv(s*-.3,0,1),5,1.1,tip=.7),BONE,0)
        for i in range(3):legs(S,[P(s*(10-i*2),6,4-i*6),P(s*(17-i*2),5,2-i*6),P(s*(20-i*2),0,-1-i*6)],1.7,.8)
        for i in range(3):S.add(crystal(P(s*4.5,10.5-i*.5,4-i*6),Dv(s*.8,.8,-.4),8-i*1.2,1.7),CRY if (i+(s>0))%2 else CRY2,0)
    return S
# ---------- 3/4 시점: 가시 산호충 / 산호 여왕 / 굴 둔덕 / 수정 먹이 ----------
def spn():
    S=Scene()
    S.add(lambda Q:ell((0,3,0),(9,5,8))(Q)+noise3(Q,.4)*1.2,ROCK,2,'b')
    S.add(ell((0,9,0),(5,7,5)),SHELL,2,'b');S.add(sphere((0,15,2),3),SHELL,1.5,'b')
    S.add(sphere((0,15.5,4.6),1.6),EYE)
    random.seed(11)
    for k in range(11):
        a=k/11*6.283;S.add(crystal((math.cos(a)*4,11+random.uniform(-2,3),math.sin(a)*4),(math.cos(a),.6,math.sin(a)),random.uniform(6,10),1.1),CRY2 if k%2 else CRY,0)
    return S
def qn():
    S=Scene()
    S.add(lambda Q:ell((0,4,0),(20,7,16))(Q)+noise3(Q,.3)*2,ROCK,2,'b')
    S.add(ell((0,15,0),(12,13,10)),SHELL,3,'b');S.add(ell((0,27,2),(8,7,7)),SHELL,2,'b')
    S.add(sphere((0,27,8.4),3.4),EYE)
    for s in(-1,1):S.add(sphere((s*5.2,24,7.6),1.6),EYE)
    random.seed(13)
    for k in range(9):
        a=math.pi*(.1+k*.1)+math.pi;S.add(crystal((math.cos(a)*5,32,math.sin(a)*4-1),(math.cos(a)*.6,1,math.sin(a)*.4-.2),random.uniform(9,17),2.2,tw=random.uniform(0,1)),CRY2 if k%2 else CRY,0)
    for k in range(12):
        a=k/12*6.283;S.add(crystal((math.cos(a)*14,6,math.sin(a)*11),(math.cos(a),.7,math.sin(a)),random.uniform(6,11),1.8,tw=random.uniform(0,1)),CRY if k%3 else CRY2,0)
    for s in(-1,1):
        legs(S,[(s*10,18,4),(s*18,16,10),(s*21,8,14)],2.4,1.2)
        S.add(crystal((s*21,8,14),(s*.3,-.3,1),7,1.6,tip=.7),BONE,0)
    return S
def mound():
    S=Scene()
    S.add(lambda Q:ell((0,0,0),(20,7,12))(Q)+noise3(Q,.35)*2.2,ROCK,2,'b')
    random.seed(5)
    for k in range(5):
        a=random.uniform(0,6.28);S.add(crystal((math.cos(a)*9,3,math.sin(a)*6),(math.cos(a)*.5,1,math.sin(a)*.4),random.uniform(4,8),1.3),CRY if k%2 else CRY2,0)
    return S
def f_c():
    S=Scene();S.add(lambda Q:ell((0,0,0),(5,2.5,4))(Q)+noise3(Q,.5)*.8,ROCK,1)
    for k,(a,L) in enumerate([(0,10),(2.1,7),(4.2,6),(1,5)]):
        S.add(crystal((math.cos(a)*1.5,0,math.sin(a)*1.5),(math.cos(a)*.35*(k>0),1,math.sin(a)*.35*(k>0)),L,2 if k==0 else 1.5,tw=k*.3),CRY,0)
    return S
def q34(scene,name,W,H,scale,center,emit=()):
    M=TM();return spr(scene,W,H,scale,center,48,name,emit,M=M)
if __name__=='__main__':
    E=lambda f,y=8:[((0,14,0),(80,50,190),22,.2),(P(0,y+3,f),(255,80,60),6,.4)]
    ORI='up'
    top(kha(),'kha',66,70,1.0,E(15))
    top(rek(),'rek',70,72,1.0,E(13))
    top(vdl(),'vdl',44,40,.95,[((0,10,0),(190,120,255),14,.8)])
    top(lmpH(),'lmpH',30,34,.62)
    top(lmpS(),'lmpS',30,24,.62)
    top(f_s(),'f_s',30,30,.6)
    top(f_l(),'f_l',36,40,.68)
    ORI='right'
    top(gna(),'gna',50,40,.85,[(P(0,12,9),(255,80,60),6,.4)])
    top(wd(),'wd',80,70,.85,[(P(0,12,15),(255,120,60),14,.8)])
    ORI='up'
    top(gnac(),'gnac',34,34,.6)
    q34(spn(),'spn',44,48,.7,(0,9,0),[((0,15,5),(255,90,60),5,.5)])
    q34(qn(),'qn',80,80,.78,(0,18,0),[((0,27,9),(255,90,60),10,.6),((0,32,0),(150,90,255),20,.3)])
    q34(mound(),'mound',56,36,.85,(0,2,0))
    q34(f_c(),'f_c',30,30,.5,(0,4,0),[((0,5,0),(80,180,255),10,.5)])
    sheet(['kha','rek','vdl','lmpH','lmpS','f_s','f_l','gna','gnac','wd','spn','qn','mound','f_c'],OUT+'/s_all.png',sc=3)
