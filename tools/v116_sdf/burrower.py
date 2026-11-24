from voidshark import *
def sickle(S,s,base,ln=7):
    b=np.array(base,float)
    pts=[tuple(b),tuple(b+np.array(P(s*2.6,0,2.6))),tuple(b+np.array(P(s*2.0,0,5.4))),tuple(b+np.array(P(s*-.4,0,7.2)))]
    legs(S,pts,1.4,.5,SHELL,'sk%d'%s,.6)
    for k in range(3):p=np.array(pts[1])+ (np.array(pts[2])-np.array(pts[1]))*k*.45;S.add(crystal(tuple(p),D(-s,.1,.2),1.6,.45,tip=.9),BONE,0)
def b1():  # 개미지옥 + 상어
    S=Scene()
    S.add(ell(P(0,5.2,-4),(7.4,4.4,8)),SHELL,2,'b')
    for i in range(3):S.add(ell(P(0,7.6,-1.5-i*3.6),(6-i*.8,1.2,1.4)),SHELL,.4,'b')
    S.add(ell(P(0,5.4,5),(4.4,3.4,3.4)),SHELL,1.4,'b');S.add(ell(P(0,5.6,9),(3.6,3,2.8)),SHELL,1.2,'b')
    for s in(-1,1):S.add(ell(P(s*2.2,7.2,9.8),(.55,.5,.9)),EYE,0);sickle(S,s,P(s*1.8,5.6,11))
    for k,(x,f,L) in enumerate([(0,-3,8),(-1.2,-4.6,5.5),(1.2,-4.4,5.8)]):S.add(crystal(P(x,8,f),D(x*.15,1,-.6),L,1.6,tip=.6,tw=k*.4),CRY2 if k%2 else CRY,0)
    for f in(5,2.5):
        for s in(-1,1):legs(S,[P(s*3.8,4.4,f),P(s*7,2.4,f-1),P(s*8,0,f-2.6)],1.1,.7,SHELL,'l',.8)
    return S
def b2():  # 모래벌레 아가리: 마디 몸 + 세 갈래 아가리 + 굴착 발톱
    S=Scene()
    for i in range(6):S.add(ell(P(0,5,6-i*3.8),(5.2-i*.45,3.8-i*.25,2.4)),SHELL,.5,'b')
    for i in range(6):S.add(crystal(P(0,8.2-i*.3,6-i*3.8),D(0,1,-.5),2.8-i*.25,1.0,tip=.8),CRY if i%2 else CRY2,0)
    S.add(sphere(P(0,5.4,10.4),4.6),SHELL,1.2,'b')
    S.add(lambda Q:ell(P(0,7.4,12),(2.2,1.6,2.2))(Q),DARK,0)
    for k in range(3):
        a=k/3*6.283+math.pi/2;dx,dz=math.cos(a),math.sin(a)
        S.add(cap(P(dx*2.6,6.6,12+dz*2.6),P(dx*5.6,6.2,12+dz*5.6),1.6,.7),SHELL,.8,'b')
        for t in range(2):S.add(crystal(P(dx*(3+t*1.4),7.4,12+dz*(3+t*1.4)),D(-dz,.2,dx),1.4,.4,tip=.9),BONE,0)
    for s in(-1,1):
        S.add(ell(P(s*3.4,7.2,8.6),(.55,.5,.8)),EYE,0)
        legs(S,[P(s*4.4,4.6,6),P(s*8,4,8),P(s*8.6,1,11)],1.8,1.4,SHELL,'c%d'%s,1)
        for k in range(3):S.add(crystal(P(s*8.6,1.2,11),D(s*.4*(k-1),0,1),2.6,.6,tip=.85),BONE,0)
    return S
def b3():  # 두더지 + 상어: 삽 주둥이 판, 큰 굴착 앞발, 상어 꼬리·등지느러미
    S=Scene()
    S.add(ell(P(0,5,0),(5.6,4,10)),SHELL,2,'b')
    for i in range(4):S.add(ell(P(0,7.4,5-i*3.4),(4.4-i*.5,1.2,1.5)),SHELL,.4,'b')
    S.add(cap(P(0,5.2,8),P(0,4.6,13.5),3.6,1.4),SHELL,1.4,'b')
    S.add(lambda Q:np.maximum(ell(P(0,6.6,13),(4.6,.9,3.2))(Q),-(np.array(Q)[...,1]-5.8)),SHELL,.4,'b')
    for k in range(5):S.add(crystal(P(-2.4+k*1.2,6.2,15.6),D(0,0,1),1.6,.5,tip=.8),BONE,0)
    for s in(-1,1):
        S.add(ell(P(s*2.6,7.2,9.4),(.55,.5,.9)),EYE,0)
        legs(S,[P(s*4.6,5,6),P(s*8.6,4.6,8)],2.4,2.2,SHELL,'c%d'%s,1.2)
        S.add(ell(P(s*9.6,3.6,10.6),(3,1.2,2.8)),SHELL,1,'c%d'%s)
        for k in range(4):S.add(crystal(P(s*(8.4+k*.9),3.8,12.6),D(s*.15,0,1),2.4,.6,tip=.85),BONE,0)
    S.add(crystal(P(0,7.6,-1),D(0,1,-.7),6.5,1.5,tip=.5),CRY2,0)
    crescent(S,-9.5);return S
def b4():  # 가시 등 굴착자: 납작하고 넓은 몸 + 등 전체 결정 볏 + 낫 턱
    S=Scene()
    S.add(lambda Q:np.maximum(ell(P(0,4.4,-1),(7.6,3,11))(Q),-(np.array(Q)[...,1]-1.4)),SHELL,2,'b')
    for i in range(7):S.add(crystal(P(0,6.6,7-i*2.6),D(0,1,-.35),6-abs(i-2.5)*1.1,1.1,tip=.5,tw=i*.3),CRY2 if i%2 else CRY,0)
    for i,f in enumerate([5,1,-3,-7]):
        for s in(-1,1):S.add(crystal(P(s*(7-i*.6),4.2,f),D(s,.1,-.3),2.2,.7,tip=.85),BONE,0)
    S.add(ell(P(0,5,10.4),(4,2.6,2.6)),SHELL,1.2,'b')
    for s in(-1,1):S.add(ell(P(s*2.4,6.6,11),(.55,.5,.8)),EYE,0);sickle(S,s,P(s*1.6,5,12.4),6)
    S.add(cap(P(0,4,-11),P(0,3.6,-16),1.4,.6),SHELL,1,'b')
    return S
def mound(kind):  # 땅속에 숨었을 때 땅 위로 보이는 모습: 흙 둔덕 + 결정 볏/지느러미
    S=Scene()
    S.add(lambda Q:ell((0,0,0),(10,3.4,7))(Q)+noise3(Q,.4)*1.4,ROCK,2,'m')
    if kind==1:
        for k,(x,z,L) in enumerate([(0,0,8),(-1.4,1.4,5.6),(1.4,1.2,6)]):S.add(crystal((x,1.5,z),(x*.15,1,.5),L,1.6,tip=.6,tw=k*.4),CRY2 if k%2 else CRY,0)
    else:
        for i in range(5):S.add(crystal((0,1.5,2.6*i-5),(0,1,.3),5-abs(i-2)*1.2,1.0,tip=.5),CRY2 if i%2 else CRY,0)
    return S
if __name__=='__main__':
    M=SM();M[ROCK]=dict(ramp=ramp(0x1a1622,0x2a2434,0x3e364a,0x564c62,0x6e6480),tex=lambda P:noise3(P,.5,2),texk=.4,rim=.15,amb=.1,dif=.9,gk=.6,dith=.06,fill=.12)
    mon.ORI='up';E=[((0,12,0),(150,90,255),20,.35)]
    for n,f in [('w1',b1),('w2',b2),('w3',b3),('w4',b4)]:spr(f(),80,100,.72,(0,6,0),89,n,E,M=M,light=LT)
    for k in (1,2):spr(mound(k),60,50,.6,(0,2,0),48,'wm%d'%k,[((0,6,0),(150,90,255),14,.4)],M=M)
