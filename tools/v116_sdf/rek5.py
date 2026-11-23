# 땅울음 등껍질: 딱정벌레·갑각류 참고 / 쥐 웅크림 E안 꼬리 위치·방향·길이 변형
from rek4 import *
def head5(S,z,w=5):
    S.add(ell(P(0,5.8,z),(w,3.2,3.2)),B1,1.0,'h')
    for s in(-1,1):S.add(ell(P(s*2.4,7.4,z+1.8),(.55,.5,.8)),EY,0);sick(S,s,P(s*1.8,5.4,z+2.6))
def be1():  # 딱정벌레: 앞가슴 방패(모서리 뿔) + 딱지날개 두 장(가운데 이음매·세로 홈줄) + 짧은 꼬리 가시 Y
    S=Scene()
    S.add(ell(P(0,4.6,-3),(6.2,3.6,8)),B2,2,'b')
    S.add(lambda Q:np.maximum(ell(P(0,6,4.6),(6.4,2.8,3.4))(Q),-(np.array(Q)[...,1]-4.2)),B1,.6,'p')  # 앞가슴 방패
    for s in(-1,1):S.add(crystal(P(s*5.6,6,6.4),D(s*.4,.2,1),2.6,.8,tip=.8),AC,0)
    for s in(-1,1):
        S.add(lambda Q,s=s:np.maximum(ell(P(s*3.05,6.4,-4.2),(3.3,3.4,7.6))(Q),-s*(np.array(Q)[...,0]*(1 if mon.ORI=='up' else 1))-.0),B1,.4,'w%d'%s)  # 딱지날개
        for k in (1.2,2.4):S.add(cap(P(s*k*1.05,9.3-k*.35,1.6),P(s*k*1.15,8.2-k*.3,-9),.22,.2),B2,.15,'w%d'%s)  # 홈줄
    S.add(cap(P(0,9.8,1.8),P(0,8.6,-10.6),.35,.3),B2,.1,'seam')
    head5(S,8.4)
    for k,(x,f,L) in enumerate([(-3.4,-1,2.4),(3.6,-4,2.2),(-2.6,-8,2)]):S.add(crystal(P(x,9.3,f),D(x*.2,1,-.2),L,.8,tip=.6,tw=k),AC,0)
    S.add(cap(P(0,4,-11),P(0,3.8,-13.4),1.4,.9),B2,.8,'t')
    for s in(-1,1):S.add(crystal(P(s*.6,3.9,-13),D(s*.6,0,-.8),4,1,tip=.75),AC,0)
    legs3(S,(4,0,-4),5.4);return S
def cr1():  # 가재: 매끈한 머리가슴 갑옷(이마 가시) + 겹친 배마디 판(옆 가시) + 꼬리 부채(Y를 부채로)
    S=Scene()
    S.add(ell(P(0,5.6,3),(5.4,3.8,5.8)),B1,1.4,'c');S.add(cap(P(0,7.8,7),P(0,7.2,1),.4,.3),B2,.1,'c')
    S.add(crystal(P(0,6.4,8.4),D(0,.1,1),3.2,.9,tip=.8),AC,0)
    for s in(-1,1):S.add(ell(P(s*2.2,7.8,7.4),(.55,.5,.8)),EY,0);sick(S,s,P(s*2,5.4,8.6))
    for i in range(5):
        f=-3-i*2.3;w=5-i*.55
        S.add(ell(P(0,5.4-i*.15,f),(w,3.2-i*.2,1.7)),B1,.25,'a')
        S.add(ell(P(0,5.6-i*.15,f-1.1),(w+.15,3.3-i*.2,.35)),B2,.2,'a')
        for s in(-1,1):S.add(crystal(P(s*w,4.6,f),D(s,.0,-.4),1.8,.6,tip=.85),AC,0)
    e=-3-5*2.3
    S.add(ell(P(0,4.6,e-1),(1.4,.9,2.8)),B1,.6,'f')  # 꼬리 가운데 판
    for s in(-1,1):
        for k,(a,L) in enumerate(((.35,3.6),(.85,3.2))):
            dx,dz=math.sin(a)*s,-math.cos(a);S.add(ell(P(s*1.2+dx*L*.5,4.5,e-.6+dz*L*.5),(1.5,.6,L*.55)),B1 if k==0 else B2,.5,'f')
            S.add(crystal(P(s*1.2+dx*L,4.6,e-.6+dz*L),D(dx,0,dz),1.6,.6,tip=.85),AC,0)
    S.add(crystal(P(0,8.6,2),D(0,1,-.8),6,1.3,tip=.45),AC,0)
    legs3(S,(4.5,1.5,-1.5),5);return S
def is1():  # 투구게·쥐며느리: 넓은 돔 등딱지(겹친 가로 판 7장, 가장자리 가시) + 끝은 칼꼬리
    S=Scene()
    S.add(ell(P(0,4.6,-2),(7,3.6,9)),B2,2,'b')
    for i in range(7):
        f=6-i*2.4;w=7.2-abs(i-2.2)*.55
        S.add(ell(P(0,6.4-abs(i-2.5)*.18,f),(w,2.6,1.8)),B1,.3,'p')
        S.add(ell(P(0,6.6-abs(i-2.5)*.18,f-1.2),(w+.1,2.6,.3)),B2,.2,'p')
        for s in(-1,1):S.add(crystal(P(s*w,5.4,f-.6),D(s,0,-.5),1.8 if i%2 else 1.2,.6,tip=.85),AC,0)
    head5(S,8.6,5.4)
    for k,(x,f) in enumerate([(0,1),(0,-4)]):S.add(crystal(P(x,9,f),D(0,1,-.6),3.6,1.1,tip=.55,tw=k),AC,0)
    S.add(cap(P(0,4.4,-11),P(0,4,-17),1.3,.35),B1,.8,'t');S.add(crystal(P(0,4.4,-16.6),D(0,0,-1),2.6,.8,tip=.8),AC,0)
    legs3(S,(4,0,-4),6.2);return S
# ---- 쥐: E안 고정, 꼬리만 (위치 a0 = 몸 고리 위 각도, 방향, 길이) ----
def tailv(S,base_a,pts):
    tailc(S,[pol(base_a,3.9,4.4)]+pts,1.05,.3)
def cv(base_a,dirs,step=2.4,y=3.8):  # base에서 시작해 각도 dirs를 따라 한 걸음씩
    x,z=math.cos(base_a)*3.9,math.sin(base_a)*3.9;out=[]
    for d in dirs:x+=math.cos(d)*step;z+=math.sin(d)*step;out.append((x,y,z))
    return out
def ct(n):
    S=Scene();ratE(S)
    T={1:(.2,[.4,.5,.6,.7,.75]),                       # 몸 뒤끝 → 오른쪽 아래로 길게(지난번 1)
       2:(.2,[.3,.2,.1]),                               # 몸 뒤끝 → 짧게 오른쪽
       3:(.2,[.2,0,-.3,-.6,-.9,-1.1,-1.2]),            # 몸 뒤끝 → 위로 둘러 머리 위까지 아주 길게(머리와 떨어져서)
       4:(2.4,[2.3,2.3,2.4,2.6,2.8]),                  # 몸 왼쪽 옆구리에서 → 왼쪽으로 쭉
       5:(1.5,[1.4,1.6,1.9,2.2,2.0,1.7]),              # 몸 아래쪽에서 → 아래로 S자
       6:(.6,[.7,.9,1.2,1.6,2.1,2.7,3.2]),             # 몸 뒤끝 → 몸 아래를 크게 휘감아 왼쪽까지(아주 길게)
      }[n]
    a0,ds=T;R0=6.4 if n in(4,5,6) else 3.9
    x,z=math.cos(a0)*R0,math.sin(a0)*R0;pts=[(math.cos(a0)*3.4,4.4,math.sin(a0)*3.4),(x,4.0,z)]
    for d in ds:x+=math.cos(d)*2.3;z+=math.sin(d)*2.3;pts.append((x,3.8,z))
    tailc(S,pts,1.05,.3);return S
if __name__=='__main__':
    mon.ORI='up'
    for n,f in (('be1',be1),('cr1',cr1),('is1',is1)):
        for pn,p in (('s',SL),('v',VI)):
            M=M_(p);m=dict(M[B1]);m.update(spec=10,rim=.4);M[B1]=m
            spr(f(),130,170,.525,(0,6,-3),89,'rk_%s%s'%(n,pn),(),M=M,light=(-.4,.8,-.45))
    for n in range(1,7):
        for rk in ('rq_c','rq_e'):
            b,d,c=RT2[rk];spr(ct(n),80,80,.54,(0,7,0),89,'ct%d_%s'%(n,rk[-1]),(),M=PAL(b,d,d[:4],c,(0x101010,0x202020,0x707070),CRY),light=LT)
