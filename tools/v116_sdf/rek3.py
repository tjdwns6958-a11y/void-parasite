# 땅울음 3번 변형 + 쥐 웅크림 B·C 섞은 비대칭 시안
from rek2 import *
def body3(S,n=5,ln=3.0,rx=6.6,f0=-3):
    S.add(ell(P(0,5.2,f0),(rx,4.4,ln*n*.6)),B1,2,'b')
    for i in range(n):S.add(ell(P(0,5.4,f0+ln*(n/2-.5)-i*ln),(rx+.3-i*.45,4.7,.6)),B2,.3,'b')
def head3(S,z=7.2,w=5.2,horn=False,big=1.0):
    S.add(ell(P(0,5.8,z),(w,3.6,3.6)),B1,1.2,'h');S.add(ell(P(0,7.4,z+.4),(w-.8,1.4,3)),B2,.5,'h')
    for s in(-1,1):S.add(ell(P(s*2.6,7.6,z+2.4),(.55,.5,.8)),EY,0);sick(S,s,P(s*1.8,5.6,z+3.2),big)
    if horn:
        for s in(-1,1):S.add(crystal(P(s*3.6,7.6,z+.6),D(s*.6,.5,.6),3.2,.9,tip=.7),AC,0)
def legs3(S,fs,sp=5.6):
    for f in fs:
        for s in(-1,1):legs(S,[P(s*sp,4,f),P(s*(sp+3),2.2,f-1),P(s*(sp+3.6),0,f-2.4)],1.2,.9,LG,'l',.8)
def r3b():  # 투구에 결정 뿔 + 갈라진 두 장 등지느러미
    S=Scene();body3(S);head3(S,horn=True)
    for s in(-1,1):S.add(crystal(P(s*1.4,9,-2),D(s*.35,1,-.85),7.6,1.3,tip=.45,tw=s*.3),AC,0)
    for k,(x,f,L) in enumerate([(-2.8,1,3.4),(2.8,.4,3.6),(-2.4,-5.4,3),(2.6,-5.8,3.2)]):S.add(crystal(P(x,8.4,f),D(x*.2,1,-.3),L,1,tip=.6,tw=k),AC,0)
    crescent(S,-12);legs3(S,(3,-2));return S
def r3c():  # 길쭉한 몸 띠 7개 + 띠 끝마다 옆 가시, 등지느러미 낮게
    S=Scene();body3(S,n=7,ln=2.6,rx=6.2,f0=-4);head3(S,z=8)
    for i in range(7):
        for s in(-1,1):S.add(crystal(P(s*(6.4-i*.4),5,4.8-i*2.6),D(s,.2,-.4),2,.6,tip=.85),AC,0)
    S.add(crystal(P(0,9,-2),D(0,1,-1.2),6.4,1.5,tip=.5),AC,0)
    crescent(S,-14);legs3(S,(4,0,-4),5.2);return S
def r3d():  # 짧고 다부진 몸 + 큰 굽은 낫 턱, 등 결정 무더기가 한쪽으로 기움(비대칭)
    S=Scene();body3(S,n=4,ln=3.2,rx=7.2,f0=-2);head3(S,z=6.6,w=5.8,big=1.35)
    for k,(x,f,L,dx) in enumerate([(-1,-1,8,-.3),(1.6,-.6,5.4,.2),(-2.8,-3,4.6,-.6),(.6,-4.4,4,0),(2.8,-3.6,3,.5)]):S.add(crystal(P(x,8.8,f),D(dx,1,-.7),L,1.4,tip=.5,tw=k*.7),AC,0)
    crescent(S,-10.5);legs3(S,(3,-2),6.2);return S
def r3e():  # 띠 사이사이 결정 박힘(쥐처럼) + 높은 등지느러미 + 꼬리 끝 결정 가시
    S=Scene();body3(S);head3(S)
    S.add(crystal(P(0,9.2,-2),D(0,1,-.9),9,1.6,tip=.45),AC,0)
    for k,(x,f) in enumerate([(-3,3.5),(3.2,.5),(-3.4,-2.5),(3,-5.5),(-2.4,-8)]):S.add(crystal(P(x,8.2,f),D(x*.2,1,-.2),2.4,.9,tip=.6,tw=k),AC,0)
    crescent(S,-12)
    S.add(crystal(P(0,4.6,-15),D(0,0,-1),3,1,tip=.8),AC,0)
    legs3(S,(3,-2));return S
# ---- 쥐 웅크림: C자 비대칭 + 두 줄 파편(B) + 쥐 특징(작은 귀·주둥이·꼬리) ----
def curlbody(S,a0,a1,R=3.8,r=2.9,n=11):
    for k in range(n):
        a=a0+k/(n-1)*(a1-a0);S.add(sphere((math.cos(a)*R,6.0,math.sin(a)*R),r*(1-.15*(k/(n-1)))),B2 if k%2 else B1,1.0,'s')
    S.add(sphere((0,6.0,0),R-.8),B1,1.4,'s')
def rathead(S,h,R=3.8,ear=1.0,sn=1.0,out=1.6):
    # 머리를 고리 끝에서 바깥으로 빼서 보이게. 귀는 몸보다 높이(y) 올려서 안 묻히게
    ox,oz=math.cos(h),math.sin(h);tx,tz=-oz,ox
    hx,hz=ox*(R+out),oz*(R+out)
    S.add(ell((hx,7.4,hz),(2.4,2.2,2.4)),B1,.8,'h')
    S.add(cap((hx,7.4,hz),(hx+tx*2.6*sn+ox*1.2,7.0,hz+tz*2.6*sn+oz*1.2),1.6,.6),B1,.6,'h')
    nx,nz=hx+tx*3.1*sn+ox*1.45,hz+tz*3.1*sn+oz*1.45
    S.add(sphere((nx,7.1,nz),.6),EY,0)  # 코
    S.add(sphere((hx+tx*1.2+ox*1.2,9.2,hz+tz*1.2+oz*1.2),.55),EY,0)  # 눈
    for dx,dz in ((ox*1.3-tx*.9,oz*1.3-tz*.9),(-ox*.9-tx*1.1,-oz*.9-tz*1.1)):
        S.add(ell((hx+dx,10.2,hz+dz),(1.3*ear,.45,1.3*ear)),LG,.25,'e')  # 작은 둥근 귀
def tailc(S,pts,r0=1.0,r1=.4):
    for i in range(len(pts)-1):S.add(cap(pts[i],pts[i+1],r0+(r1-r0)*i/(len(pts)-1),r0+(r1-r0)*(i+1)/(len(pts)-1)),LG,.5,'t')
def arc(a0,a1,R,n,y=4.0,R1=None):
    R1=R if R1 is None else R1
    return [(math.cos(a0+k/(n-1)*(a1-a0))*(R+(R1-R)*k/(n-1)),y,math.sin(a0+k/(n-1)*(a1-a0))*(R+(R1-R)*k/(n-1))) for k in range(n)]
def shards2(S,a0,a1,n,R0=6.8,R1=5.4,L0=4.0,L1=2.4,jit=0):
    random.seed(3)
    for k in range(n):
        a=a0+k/(n-1)*(a1-a0);j=1+jit*(random.random()-.5)
        S.add(crystal((math.cos(a)*R0,6.8,math.sin(a)*R0),(math.cos(a),.25,math.sin(a)),L0*j,1.0,tip=.6),AC,0)
    for k in range(n-1):
        a=a0+(k+.5)/(n-1)*(a1-a0);S.add(crystal((math.cos(a)*R1,9.4,math.sin(a)*R1),(math.cos(a),.8,math.sin(a)),L1,.8,tip=.7),AC,0)
def cd1():  # C자 말림, 파편은 등(고리 가운데)에만 두 줄, 머리는 틈 위쪽, 꼬리는 바깥으로 길게 감김
    S=Scene();curlbody(S,-.4,4.2);rathead(S,4.6)
    shards2(S,.5,3.4,7,R0=6.0,R1=4.6)
    tailc(S,[(math.cos(-.4)*4.8,4.4,math.sin(-.4)*4.8)]+arc(-.7,-2.3,7.4,6,R1=8.6))
    return S
def cd2():  # 더 꽉 말림, 파편은 한쪽에 몰리고 길이 들쭉날쭉, 귀 조금 크게, 꼬리 끝이 밖으로 휙
    S=Scene();curlbody(S,.2,4.7,R=3.5);rathead(S,5.15,R=3.5,ear=1.2,out=1.8)
    shards2(S,1.2,3.9,6,R0=5.6,R1=4.3,L0=4.6,jit=.7)
    tailc(S,[(math.cos(.2)*4.4,4.4,math.sin(.2)*4.4)]+arc(-.1,-1.2,7.0,4,R1=7.6)+[(math.cos(-1.5)*10.4,4,math.sin(-1.5)*10.4)])
    return S
def cd3():  # 머리가 틈에서 쑥 나옴(주둥이 길게), 꼬리는 머리 아래쪽으로 감김, 파편 바깥 줄 길게·안쪽 줄 짧게
    S=Scene();curlbody(S,-.8,3.7);rathead(S,4.1,sn=1.3,out=2.2)
    shards2(S,-.3,3.0,7,R0=6.0,R1=4.6,L0=4.2,L1=2.0)
    tailc(S,[(math.cos(-.8)*4.8,4.4,math.sin(-.8)*4.8)]+arc(-1.1,-2.6,7.2,6,R1=6.4),.9,.35)
    return S
if __name__=='__main__':
    mon.ORI='up'
    for n,f in (() if 'curl' in sys.argv else (('r3a',r3),('r3b',r3b),('r3c',r3c),('r3d',r3d),('r3e',r3e))):
        for pn,p in (('s',SL),('v',VI)):spr(f(),120,150,.525,(0,6,-2),89,'rk_%s%s'%(n,pn),(),M=M_(p),light=(-.4,.8,-.45))
    for n,f in (('cd1',cd1),('cd2',cd2),('cd3',cd3)):
        for rk in ('rq_c','rq_e'):
            b,d,c=RT2[rk];spr(f(),52,52,.54,(0,7,0),89,'%s_%s'%(n,rk[-1]),(),M=PAL(b,d,d[:4],c,(0x101010,0x202020,0x707070),CRY),light=LT)
