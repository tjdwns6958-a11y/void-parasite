# 땅울음 땅속 모습 시안 (가재+결정 C안과 이어지게)
from rek6 import *
def soil(S,rx,h,rz,cx=0,cz=0,nz=1.3):
    S.add(lambda Q:ell((cx,0,cz),(rx,h,rz))(Q)+noise3(Q,.45)*nz,ROCK,2,'m')
def cracks(S,n,R0,R1,y,seed=1,c=(0,0)):
    return  # 둔덕 밖으로 나간 균열선이 다리처럼 보여서 뺌
    random.seed(seed)
    for k in range(n):
        a=k/n*6.283+random.random()*.5;r0=R0+random.random()*.6;r1=R1+random.random()*2
        mid=a+(random.random()-.5)*.5
        p0=(c[0]+math.cos(a)*r0,y,c[1]+math.sin(a)*r0*.75);p1=(c[0]+math.cos(mid)*(r0+r1)/2,y-.2,c[1]+math.sin(mid)*(r0+r1)/2*.75);p2=(c[0]+math.cos(a+.15)*r1,y-.5,c[1]+math.sin(a+.15)*r1*.75)
        S.add(cap(p0,p1,.32,.26),DARK,.2);S.add(cap(p1,p2,.26,.18),DARK,.2)
def pebbles(S,n,R,seed=2):
    random.seed(seed)
    for k in range(n):
        a=random.random()*6.283;r=R*(.85+random.random()*.4);S.add(sphere((math.cos(a)*r,.2,math.sin(a)*r*.75),.7+random.random()*.6),ROCK,.4)
def mA():  # 결정 등 솟음: 흙 둔덕 + 한쪽으로 몰린 결정 무더기 + 둘레 균열·돌멩이
    S=Scene();soil(S,9,3.2,6.6)
    for k,(x,z,L,dx,dz) in enumerate([(1.6,.4,6.4,.35,-.2),(3.2,-1,4,.7,-.3),(.2,-1.6,3.4,-.1,-.5),(3,1.6,3,.6,.4),(-1.8,.6,2.4,-.5,.1)]):
        S.add(crystal((x,2.2,z),(dx,1,dz),L,1.3,tip=.55,tw=k*.8),AC,0)
    cracks(S,7,8.4,12,.1,3);pebbles(S,5,8.6)
    return S
def mB():  # 낫 턱 매복: 낮은 둔덕 앞쪽으로 낫 턱 끝 두 개 + 빛나는 눈 두 개, 뒤쪽에 결정 몇 개
    S=Scene();soil(S,8.4,2.4,6.4)
    for s in(-1,1):
        legs(S,[(s*2.4,1.6,-4.6),(s*4,2.2,-7.4),(s*2.6,1.8,-9.6)],1.0,.4,B1,'sk%d'%s,.6)
        S.add(crystal((s*3.6,2.2,-7.6),(-s,0,-.2),1.4,.4,tip=.9),AC,0)
        S.add(sphere((s*1.5,2.5,-5.2),.75),EY,0)
    for k,(x,z,L,dx) in enumerate([(2,2,4.4,.5),(3.4,.8,3,.8),(1,3.4,2.6,.2)]):S.add(crystal((x,1.8,z),(dx,1,.4),L,1.1,tip=.55,tw=k),AC,0)
    cracks(S,6,7.6,10.6,.1,5);pebbles(S,4,8)
    return S
def mC():  # 길쭉한 흙길 둔덕 + 등줄기 결정 한 줄 + 뒤끝에 꼬리 부채 끝이 삐죽
    S=Scene();soil(S,6,2.8,10.6,nz=1.1)
    for k,(z,L) in enumerate([(-3,5.2),(.2,4),(3,3),(5.4,2.2)]):S.add(crystal((.8*(k%2)-.4,2.4,z),(.3*(k%2*2-1),1,.45),L,1.2,tip=.55,tw=k),AC,0)
    for s in(-1,1):S.add(ell((s*2.2,1.2,10),(1.6,.5,2.4)),B1,.4,'f');S.add(crystal((s*3,1.4,11.6),(s*.6,0,1),1.4,.5,tip=.85),AC,0)
    cracks(S,6,6,9,.1,7);pebbles(S,4,6.4,6)
    return S
def mD():  # 갈라진 구멍: 어두운 구멍 둘레로 흙덩이가 둘러싸고, 안에서 눈 두 개와 결정 끝이 빛남
    S=Scene()
    S.add(lambda Q:np.maximum(ell((0,0,0),(10,3,7.6))(Q)+noise3(Q,.45)*1.2,-(ell((0,1.6,0),(6.4,3.4,4.6))(Q))),ROCK,1.5,'m')
    S.add(ell((0,.6,0),(6.2,.6,4.4)),DARK,0)
    for s in(-1,1):S.add(sphere((s*1.6,1.4,-.8),.8),EY,0)
    for k,(x,z,L) in enumerate([(2.6,1.6,3.2),(-3,1.2,2.6),(.4,2.6,2.4),(3.6,-1,2.2)]):S.add(crystal((x,.8,z),(x*.15,1,.2),L,.9,tip=.55,tw=k),AC,0)
    random.seed(9)
    for k in range(9):a=k/9*6.283+random.random()*.3;S.add(sphere((math.cos(a)*8.6,1.6,math.sin(a)*6.4),1.2+random.random()*.8),ROCK,.6)
    cracks(S,6,9.6,12.6,.1,11)
    return S
if __name__=='__main__' and 'b2' not in sys.argv:
    M=M_(SL);m=dict(M[B1]);m.update(spec=10,rim=.4);M[B1]=m
    for n,f in (('mA',mA),('mB',mB),('mC',mC),('mD',mD)):
        spr(f(),90,72,.425,(0,2,0),60,'rkm_'+n,(),M=M,light=(-.4,.8,-.45))
def mB2():  # B 다듬기: 가로를 줄이고 앞뒤로 길쭉·울퉁불퉁(앞 둔덕 + 뒤 흙더미 두 덩이), 낫 턱·눈·결정은 그대로
    S=Scene()
    S.add(lambda Q:np.minimum(ell((0,0,-1.6),(5.6,2.6,5.6))(Q),ell((.8,0,4),(4.4,2.2,4.2))(Q))+noise3(Q,.5)*1.2,ROCK,2.2,'m')
    for s in(-1,1):
        legs(S,[(s*2.0,1.6,-5.4),(s*3.4,2.2,-8.2),(s*2.2,1.8,-10.2)],1.0,.4,B1,'sk%d'%s,.6)
        S.add(crystal((s*3.0,2.2,-8.4),(-s,0,-.2),1.4,.4,tip=.9),AC,0)
        S.add(sphere((s*1.3,2.6,-5.8),.75),EY,0)
    for k,(x,z,L,dx) in enumerate([(1.4,1.4,4.4,.5),(2.6,0,3,.8),(.4,3.4,2.6,.2)]):S.add(crystal((x,1.8,z),(dx,1,.4),L,1.1,tip=.55,tw=k),AC,0)
    random.seed(4)
    for k,(x,z) in enumerate([(-4.6,2),(4.4,-2.6),(-3.2,7),(3.4,6.6)]):S.add(sphere((x,.3,z),.8+random.random()*.5),ROCK,.5)
    return S
if __name__=='__main__' and 'b2' in sys.argv:
    M=M_(SL);m=dict(M[B1]);m.update(spec=10,rim=.4);M[B1]=m
    for pt in (60,75,89):spr(mB2(),90,80,.425,(0,2,0),pt,'rkm_mB2_%d'%pt,(),M=M,light=(-.4,.8,-.45))
