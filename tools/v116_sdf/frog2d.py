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
def frog(pose,W=30,H=32):
    c=C(W,H);cx=W/2;D=G[1:5];L=G[0:4];E=G[3:6]
    for s in(-1,1):
        if pose==1:   # 앉음
            c.poly([(cx+s*4.5,19),(cx+s*10,16),(cx+s*9,24)],1.5,L);toes(c,cx+s*9,24.5,math.pi/2+s*-.5,2.4,L)
            c.poly([(cx+s*4.5,11),(cx+s*8.5,12.5),(cx+s*9,8.5)],1.0,L);toes(c,cx+s*9,8,-math.pi/2+s*.6,2,L)
        elif pose==2: # 엎드려 펼침
            c.poly([(cx+s*4.5,19),(cx+s*11.5,18.5),(cx+s*12,25)],1.3,L);toes(c,cx+s*12,25.5,math.pi/2+s*-.7,2.4,L)
            c.poly([(cx+s*4.5,11),(cx+s*10,10.5),(cx+s*11,6.5)],.95,L);toes(c,cx+s*11,6,-math.pi/2+s*.8,2,L)
        else:         # 뛰기 직전
            c.poly([(cx+s*4,20),(cx+s*8.5,17),(cx+s*6.5,26)],1.6,L);toes(c,cx+s*6.5,26.5,math.pi/2+s*-.4,2.4,L)
            c.poly([(cx+s*4,11),(cx+s*6,9),(cx+s*6.5,5.5)],.95,L);toes(c,cx+s*6.5,5,-math.pi/2+s*.4,1.8,L)
    c.ell(cx,17,6.8,7.6,D);c.ell(cx,10.5,6.4,4.8,D,.6)
    for s in(-1,1):
        c.ell(cx+s*4.4,7.6,2.8,2.6,D,.62);c.ell(cx+s*4.4,7.3,1.3,1.3,[0x14121c],.3)
    # 등 얼굴 무늬: 두 눈 점 + 웃는 입
    for s in(-1,1):c.ell(cx+s*2.5,15.2,1.6,1.8,[0x3e3b4a],.3)
    for t in range(9):
        a=math.pi*(.15+.7*t/8);c.ell(cx+math.cos(a)*2.8,18.2+math.sin(a)*1.6,.38,.38,[0x3e3b4a],.3)
    return c.done()
if __name__=='__main__':
    for p in (1,2,3):frog(p).save(os.path.join(OUT,'vf%d.png'%p));print('vf%d'%p)
