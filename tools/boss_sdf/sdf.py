# 작은 SDF 레이마처 → 픽셀아트 (툰 램프 + 디더 + 외곽선)
import numpy as np, math
from PIL import Image, ImageFilter
BAYER=np.array([[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]])/16-.5
def nrm(v):return v/np.linalg.norm(v)
def length(a):return np.sqrt((a*a).sum(-1))
def sphere(c,r):
    c=np.array(c,float);return lambda P:length(P-c)-r
def ell(c,r):
    c=np.array(c,float);r=np.array(r,float)
    def f(P):
        q=(P-c);k0=length(q/r);k1=length(q/(r*r));return k0*(k0-1)/np.maximum(k1,1e-6)
    return f
def cap(a,b,ra,rb=None):
    a=np.array(a,float);b=np.array(b,float);rb=ra if rb is None else rb;ba=b-a;bb=(ba*ba).sum()
    def f(P):
        pa=P-a;h=np.clip((pa*ba).sum(-1)/bb,0,1);return length(pa-ba*h[...,None])-(ra+(rb-ra)*h)
    return f
def frame(d):
    d=nrm(np.array(d,float));t=np.array([0,1,0.]) if abs(d[1])<.9 else np.array([1,0,0.]);x=nrm(np.cross(t,d));y=np.cross(d,x);return x,y,d
def crystal(base,dirv,L,r,tip=.32,tw=0.0):
    base=np.array(base,float);x,y,z=frame(dirv);c,s=math.cos(tw),math.sin(tw);x,y=x*c+y*s,-x*s+y*c
    def f(P):
        q=P-base;qx=(q*x).sum(-1);qy=(q*y).sum(-1);qz=(q*z).sum(-1)
        hx=np.maximum(np.abs(qx)*.866+np.abs(qy)*.5,np.abs(qy))
        re=np.where(qz<L*(1-tip),r,r*np.clip((L-qz)/(L*tip),0,1))
        return np.maximum.reduce([(hx-re)*.8,-qz,qz-L])
    return f
def plane_y(h):return lambda P:P[...,1]-h
def smin(a,b,k):
    h=np.clip(.5+.5*(b-a)/k,0,1);return b*(1-h)+a*h-k*h*(1-h)
class Scene:
    def __init__(s):s.parts=[]
    def add(s,f,mat,k=0,grp=None,sub=None):s.parts.append((f,mat,k,grp,sub));return s
    def eval(s,P):
        D=np.full(P.shape[:-1],1e9);M=np.zeros(P.shape[:-1],int);groups={}
        for f,mat,k,grp,sub in s.parts:
            d=f(P)
            if sub is not None:d=np.maximum(d,-sub(P))
            if grp is not None and grp in groups:
                gd,gm=groups[grp];nd=smin(gd,d,k) if k>0 else np.minimum(gd,d);gm=np.where(d<gd,mat,gm);groups[grp]=(nd,gm)
            elif grp is not None:groups[grp]=(d,np.full(d.shape,mat))
            else:
                M=np.where(d<D,mat,M);D=np.minimum(D,d)
        for gd,gm in groups.values():M=np.where(gd<D,gm,M);D=np.minimum(D,gd)
        return D,M
def render(scene,W,H,scale=1.0,pitch=38,center=(0,30,0),light=(-.5,.85,.6),mats=None,steps=110,emit_pts=(),bg=None,yaw=0):
    p=math.radians(pitch);yw=math.radians(yaw)
    f=np.array([math.sin(yw)*-math.cos(p)*-1,-math.sin(p),-math.cos(p)*math.cos(yw)]);f=nrm(np.array([-math.sin(yw)*math.cos(p),-math.sin(p),-math.cos(p)*math.cos(yw)]))
    r=nrm(np.cross(f,np.array([0,1,0.])));u=np.cross(r,f)
    xs=(np.arange(W)-W/2+.5)*scale;ys=(H/2-np.arange(H)-.5)*scale
    X,Y=np.meshgrid(xs,ys);O=np.array(center)-f*400+X[...,None]*r+Y[...,None]*u;O=O.reshape(-1,3)
    t=np.zeros(len(O));hit=np.zeros(len(O),bool);alive=np.ones(len(O),bool)
    for i in range(steps):
        idx=np.where(alive)[0]
        if len(idx)==0:break
        P=O[idx]+f*t[idx,None];d,_=scene.eval(P)
        t[idx]+=d*.7;h=d<.05;hit[idx[h]]=True;alive[idx[h]]=False;alive[idx[t[idx]>900]]=False
    P=O+f*t[:,None];D,M=scene.eval(P);e=.15
    N=np.stack([scene.eval(P+np.array(v))[0]-D for v in([e,0,0],[0,e,0],[0,0,e])],-1);N=N/np.maximum(length(N)[...,None],1e-6)
    Ld=nrm(np.array(light));lam=np.clip((N*Ld).sum(-1),0,1)
    # 그림자
    sh=np.ones(len(P));ts=np.full(len(P),.6);idx=np.where(hit)[0]
    for i in range(40):
        if len(idx)==0:break
        Q=P[idx]+N[idx]*.3+Ld*ts[idx,None];d,_=scene.eval(Q);sh[idx]=np.minimum(sh[idx],np.clip(6*d/ts[idx],0,1));ts[idx]+=np.clip(d,.4,6);keep=(ts[idx]<120)&(sh[idx]>.05);idx=idx[keep]
    # AO
    ao=np.ones(len(P))
    for k,dd in enumerate((1.5,3.5,7)):
        d,_=scene.eval(P+N*dd);ao-= (dd-d).clip(0)/dd*.22
    ao=ao.clip(.2,1)
    V=-f;rim=np.clip(1-(N*V).sum(-1),0,1)**3
    Hh=(np.arange(H)[:,None]*np.ones(W)).reshape(-1);Ww=(np.ones(H)[:,None]*np.arange(W)).reshape(-1);bay=BAYER[(Hh%4).astype(int),(Ww%4).astype(int)]
    out=np.zeros((len(P),4),np.uint8)
    # 결정에서 나오는 빛
    glow=np.zeros((len(P),3))
    for (pt,col,rad,inten) in emit_pts:
        d=length(P-np.array(pt));glow+=np.array(col)[None,:]*(inten*np.clip(1-d/rad,0,1)**2)[:,None]
    for mid,m in (mats or {}).items():
        sel=hit&(M==mid)
        if not sel.any():continue
        ramp=np.array(m['ramp']);n=len(ramp)
        li=m.get('amb',.18)+lam*sh*m.get('dif',.85)
        if 'tex' in m:li=li+m['tex'](P)*m.get('texk',.12)
        li=li+np.clip((N*V).sum(-1),0,1)*m.get('fill',.18)*sh**0
        li=li*ao+rim*m.get('rim',.25)
        if m.get('spec'):
            Hv=nrm(Ld+V);spec=np.clip((N*Hv).sum(-1),0,1)**m['spec'];li=li+spec*.6
        if 'band' in m:li=li+m['band'](P)
        k=np.clip(li+bay*m.get('dith',.12),0,.999)*n;ci=np.clip(k.astype(int),0,n-1)
        col=ramp[ci].astype(float)
        if 'alt' in m:
            am=m['alt'][0](P);r2=np.array(m['alt'][1]);k2=np.clip(li*.5+.5+bay*.1,0,.999)*len(r2);col=np.where(am[:,None],r2[np.clip(k2.astype(int),0,len(r2)-1)],col)
        col=col+glow*m.get('gk',1.0)
        if m.get('emit'):col=col+np.array(m['emit'])[None,:]*0
        out[sel,:3]=np.clip(col[sel],0,255);out[sel,3]=255
    img=out.reshape(H,W,4);Mi=M.reshape(H,W);hitI=hit.reshape(H,W);Dp=t.reshape(H,W)
    return img,Mi,hitI,Dp
def outline(img,hitI,Dp,Mi,col=(10,6,18),inner=(28,18,40),skip=()):
    a=img.copy();H,W=hitI.shape
    for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
        hs=np.roll(np.roll(hitI,dy,0),dx,1);ds=np.roll(np.roll(Dp,dy,0),dx,1)
        edge=hitI&(~hs);a[edge]=(*col,255)
        dep=hitI&hs&(Dp-ds>6)
        for s in skip:dep&=Mi!=s
        a[dep]=(*inner,255)
    return a
def hexc(h):return ((h>>16)&255,(h>>8)&255,h&255)
def ramp(*hs):return [hexc(h) for h in hs]
