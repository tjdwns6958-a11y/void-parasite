# 귀여운 청개구리: 2D 도형 + 둥근 음영 (플레이어 지렁이와 같은 방식)
import numpy as np, math, os
from PIL import Image
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'out')
G=[(0x3a3846),(0x5a5768),(0x7e7a8e),(0xa29eb2),(0xc8c4d6),(0xeceaf4)]
def hx(h):return ((h>>16)&255,(h>>8)&255,h&255)
class C:
    def __init__(s,W,H,k=4):s.W,s.H,s.k=W,H,k;s.img=np.zeros((H*k,W*k,4),np.uint8);s.id=np.zeros((H*k,W*k),int);s.n=0
    def _shade(s,mask,nx,ny,ramp,base=.55):
        nz=np.sqrt(np.clip(1-nx*nx-ny*ny,0,1));l=np.clip(base+.18*(-.55*nx-.65*ny)+.14*nz,0,.999);idx=(l*len(ramp)).astype(int)
        col=np.array([hx(c) for c in ramp])[idx];s.n+=1;s.img[mask,:3]=col[mask];s.img[mask,3]=255;s.id[mask]=s.n
    def ell(s,cx,cy,rx,ry,ramp,base=.55):
        k=s.k;Y,X=np.mgrid[0:s.H*k,0:s.W*k];x=(X+.5)/k;y=(Y+.5)/k;nx=(x-cx)/rx;ny=(y-cy)/ry;m=nx*nx+ny*ny<=1;s._shade(m,nx,ny,ramp,base)
    def seg(s,ax,ay,bx,by,r,ramp,base=.5):
        k=s.k;Y,X=np.mgrid[0:s.H*k,0:s.W*k];x=(X+.5)/k;y=(Y+.5)/k;dx,dy=bx-ax,by-ay;L=dx*dx+dy*dy or 1;t=np.clip(((x-ax)*dx+(y-ay)*dy)/L,0,1);px=ax+dx*t;py=ay+dy*t
        nx=(x-px)/r;ny=(y-py)/r;m=nx*nx+ny*ny<=1;s._shade(m,nx,ny,ramp,base)
    def poly(s,pts,r,ramp,base=.5):
        for a,b in zip(pts,pts[1:]):s.seg(a[0],a[1],b[0],b[1],r,ramp,base)
    def done(s,outline=(18,14,26)):
        im=Image.fromarray(s.img).resize((s.W,s.H),Image.NEAREST);a=np.array(im);al=a[...,3]>0;idd=np.array(Image.fromarray(s.id.astype(np.uint16)).resize((s.W,s.H),Image.NEAREST)).astype(int)
        out=np.zeros((s.H+2,s.W+2,4),np.uint8);out[1:-1,1:-1]=a;M=np.zeros((s.H+2,s.W+2),bool);M[1:-1,1:-1]=al;ID=np.zeros((s.H+2,s.W+2),int);ID[1:-1,1:-1]=idd
        edge=np.zeros_like(M)
        for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):edge|=(~M)&np.roll(np.roll(M,dy,0),dx,1)
        out[edge]=(*outline,255)
        return Image.fromarray(out)
def toes(c,x,y,ang,ln,ramp,pad=.95):
    for d in(-.55,0,.55):
        a=ang+d;ex,ey=x+math.cos(a)*ln,y+math.sin(a)*ln;c.seg(x,y,ex,ey,.45,ramp);c.ell(ex,ey,pad,pad,ramp,.62)
PALS={
 1:dict(B=[0x2a6a5e,0x3a8a74,0x58aa8a,0x84c8a6],L=[0x1e5248,0x2a6a5e,0x3a8a74],DK=[0x3a2458],LT=[0xc0a8ec],EYE=[0x3a8a74,0x58aa8a,0x84c8a6,0xb4e6c8]),
 2:dict(B=[0x5a4a7a,0x7a68a0,0x9c8cc0,0xbcaedc],L=[0x463a62,0x5a4a7a,0x7a68a0],DK=[0x2a1e44],LT=[0xe0d4f6],EYE=[0x7a68a0,0x9c8cc0,0xbcaedc,0xdccff2]),
 3:dict(B=[0x14303a,0x1e4650,0x2c5e68,0x40787e],L=[0x0e2430,0x14303a,0x1e4650],DK=[0x0a1a22],LT=[0x7ae8ff],EYE=[0x1e4650,0x2c5e68,0x40787e,0x5a9498]),
}
def frog(pose,pat=0,W=30,H=32,pal=1):
    c=C(W,H);cx=W/2;Q=PALS[pal];D=Q['B'];L=Q['L'];DK=Q['DK'];LT=Q['LT']
    for s in(-1,1):
        if pose==4:  # 공중: 뒷다리를 뒤로 쭉 펴고 앞다리는 앞으로 뻗음
            c.poly([(cx+s*4.2,21),(cx+s*6.5,26),(cx+s*5.5,31)],1.4,L);toes(c,cx+s*5.5,31.2,math.pi/2+s*-.25,2.2,L)
            c.poly([(cx+s*4,10),(cx+s*6.5,6.5),(cx+s*6.8,3)],.95,L);toes(c,cx+s*6.8,2.6,-math.pi/2+s*.35,1.7,L)
        elif pose==1:
            c.poly([(cx+s*4.5,19),(cx+s*10,16),(cx+s*9,24)],1.5,L);toes(c,cx+s*9,24.5,math.pi/2+s*-.5,2.4,L)
            c.poly([(cx+s*4.5,11),(cx+s*8.5,12.5),(cx+s*9,8.5)],1.0,L);toes(c,cx+s*9,8,-math.pi/2+s*.6,2,L)
        else:
            c.poly([(cx+s*4,20),(cx+s*8.5,17),(cx+s*6.5,26)],1.6,L);toes(c,cx+s*6.5,26.5,math.pi/2+s*-.4,2.4,L)
            c.poly([(cx+s*4,11),(cx+s*6,9),(cx+s*6.5,5.5)],.95,L);toes(c,cx+s*6.5,5,-math.pi/2+s*.4,1.8,L)
    c.ell(cx,17,6.8,7.6,D);c.ell(cx,10.5,6.4,4.8,D,.6)
    if pat==1:
        for s in(-1,1):
            for t in range(10):y=9+t*1.4;x=cx+s*(5.0-abs(t-4)*.18+(0 if t<3 else .3));c.ell(x+s*.5,y+.4,.85,.85,LT,.3);c.ell(x,y,.9,.9,DK,.3)
    elif pat==2:
        for t in range(12):c.ell(cx,9.5+t*1.2,.75,.75,LT,.3)
        for s in(-1,1):
            for t in range(10):c.ell(cx+s*2.6,11+t*1.2,.8,.8,DK,.3)
    elif pat==3:
        for (x,y,r) in [(-2.6,14,1.1),(2.4,13.2,.9),(.2,17.4,1.2),(-3.2,19.6,.8),(3.4,19,1.0),(-.8,22,.8),(1.8,10.6,.7),(4.6,15.6,.7),(-4.6,16.4,.7)]:c.ell(cx+x,y,r,r,LT,.3)
    for s in(-1,1):
        c.ell(cx+s*4.4,7.6,2.9,2.7,Q['EYE'],.62);c.ell(cx+s*4.6,7.3,1.05,1.05,[0x0c0a12],.3)
    return c.done()
def small(kind,pal):
    if kind==1:  # 올챙이: 둥근 머리 + 흔들리는 꼬리
        c=C(16,22);cx=8;B=pal['B']
        c.poly([(cx,11),(cx+1.2,15),(cx-.6,18.5),(cx+.6,21)],1.6,pal['T']);c.poly([(cx,12),(cx+1,16),(cx-.4,19.5)],.9,pal['T2'])
        c.ell(cx,7.6,4.6,5,B);c.ell(cx-1.4,6.2,1.6,1.6,pal['HL'],.6)
        for s in(-1,1):c.ell(cx+s*2.4,4.6,.8,.8,[0x0c0a12],.3)
        return c.done()
    if kind==2:  # 반딧불이: 빛나는 꽁무니
        c=C(18,22);cx=9;B=pal['B']
        for s in(-1,1):c.ell(cx+s*3.2,9,2.8,4.2,pal['W'],.6)
        c.ell(cx,13.6,3,4,pal['G']);c.ell(cx,9,3.2,3.6,B);c.ell(cx,5,2.6,2.2,pal['H'])
        for s in(-1,1):c.poly([(cx+s*1,3.4),(cx+s*2.6,.8)],.45,pal['H'])
        return c.done()
    if kind==3:  # 무당벌레: 둥근 등딱지 + 무늬
        c=C(18,20);cx=9;B=pal['B']
        for s in(-1,1):
            for y in(7,10,13):c.poly([(cx+s*4.4,y),(cx+s*6.4,y+.8)],.45,pal['L'])
        c.ell(cx,10.6,5.4,6,B);c.ell(cx,4.6,3,2.2,pal['H'])
        for (x,y,r) in[(-2.4,9,1.2),(2.4,9,1.2),(-2.6,13.4,1.0),(2.6,13.4,1.0),(0,6.6,.9)]:c.ell(cx+x,y,r,r,pal['S'],.4)
        return c.done()
    # 톡토기: 통통한 몸 + 짧은 더듬이 + 배 밑 도약 꼬리
    c=C(16,22);cx=8;B=pal['B']
    for s in(-1,1):c.poly([(cx+s*1,16),(cx+s*2,20.5)],.6,pal['L'])
    for i,(y,r) in enumerate([(13,3.6),(10,4),(7,3.6)]):c.ell(cx,y,r,3.2,B)
    c.ell(cx,4.4,2.8,2.4,pal['H'])
    for s in(-1,1):c.poly([(cx+s*1,3),(cx+s*2.6,.6)],.5,pal['L']);c.ell(cx+s*1.4,4,.6,.6,[0x0c0a12],.3)
    return c.done()
SP={
 1:[dict(B=[0x2c2c44,0x3c3c5c,0x4e4e76,0x62628c],T=[0x3c3c5c,0x4e4e76],T2=[0x7a7aa8],HL=[0x8484b4]),dict(B=[0x1c4a52,0x2a6066,0x3c787c,0x509090],T=[0x2a6066,0x3c787c],T2=[0x7ad8d8],HL=[0x78b8b4])],
 2:[dict(B=[0x2a2440,0x3a3256],W=[0x6a6a9a,0x8a8ab8],G=[0xc0e040,0xe8ff80,0xfaffc8],H=[0x5a3a70,0x6e4a86]),dict(B=[0x2a2440,0x3a3256],W=[0x6a6a9a,0x8a8ab8],G=[0x40c8e0,0x80ecff,0xd0faff],H=[0x5a3a70,0x6e4a86])],
 3:[dict(B=[0x6a2a8a,0x8a40aa,0xa85ac4],H=[0x1c1428,0x281e38],S=[0x1c1428],L=[0x281e38]),dict(B=[0x2a7a8a,0x40a0aa,0x60c0c4],H=[0x1c1428,0x281e38],S=[0x1c1428],L=[0x281e38])],
 4:[dict(B=[0x5a5a86,0x7474a2,0x9090bc],H=[0x4a4a74,0x5a5a86],L=[0x3a3a5c]),dict(B=[0x3e7a6a,0x52968a,0x6cb0a2],H=[0x2e6658,0x3e7a6a],L=[0x2a5248])]}
if __name__=='__main__':
    for k in (1,2,3,4):
        for j,pal in enumerate(SP[k]):small(k,pal).save(os.path.join(OUT,'sm%d%d.png'%(k,j+1)))

    for p in (1,2,3):frog(1,p,pal=p).save(os.path.join(OUT,'vc%d.png'%p));frog(3,p,pal=p).save(os.path.join(OUT,'vcj%d.png'%p))
