from common import *
import mon
from mon import TM
VOID=10;VCR=11
def vmats(style):
    M=TM()
    M[VOID]=dict(ramp=ramp(0x040208,0x0a0614,0x140c26,0x22143e,0x3a2468),amb=.05,dif=.5,rim=.9,fill=.05,dith=.05,gk=.3,
        alt=(lambda P:(noise3(P,1.7,4)>.33),ramp(0x6a4ab0,0xc8b0ff,0xffffff)))
    M[VCR]=dict(ramp=ramp(0x3a1070,0x7a3ad0,0xb880ff,0xf0d8ff,0xffffff),amb=.85,dif=.2,gk=0,dith=.05)
    M[12]=dict(ramp=ramp(0x1a0630,0x3a1070,0x6a2ab0,0xa060f0,0xd8b0ff,0xffffff),amb=.35,dif=.6,spec=30,rim=.6,gk=0,dith=.05)
    return M
def P(x,y,f):return (f,y,x)   # 오른쪽을 봄
# ---------- 허기의 왕관 턱 (뿌리 왼쪽, 끝 오른쪽) ----------
def jaw(style):
    S=Scene();body=SHELL if style!='B' else VOID;edge=CRY2 if style=='A' else (VCR if style=='C' else VCR)
    S.add(sphere(P(0,6,-16),5.5),12 if style=='B' else VCR,0)
    S.add(ell(P(0,6,-9),(7,5,8)),body,2,'b')
    for s in(-1,1):
        pts=[P(s*4,7,-6),P(s*12,8,2),P(s*13,8,10),P(s*8,8,18),P(s*2,7,23)]
        legs(S,pts,4.4,1.0,body,'b',2.2)
        inner=[(s*8.5,2),(s*9.5,8),(s*7,14),(s*3.5,19)]
        for t,(x,f) in enumerate(inner):
            S.add(crystal(P(x,8.5,f),P(-s*1,.15,.35),6.5-t*.9,1.6,tip=.75),edge,0)
        if style=='C':
            for t in range(4):S.add(sphere(pts[t],1.5),VCR,0)
        if style=='A':
            for t in range(3):S.add(crystal(pts[t+1],P(s*.6,1,0),4,1.1),CRY,0)
    return S
def ring(style):
    S=Scene();body=SHELL if style!='B' else VOID;n=36
    for k in range(n):
        a=k/n*6.283;x=math.cos(a)*60;z=math.sin(a)*40
        S.add(lambda Q,x=x,z=z:sphere((x,0,z),8)(Q)+noise3(Q,.4,k)*1.5,body,5,'r')
        if k%2==0:
            tl=12 if style!='B' else 10
            S.add(crystal((x*.9,2,z*.9),(-math.cos(a),.25,-math.sin(a)),tl,2.6,tip=.75),CRY2 if (style=='A' and k%4) else (CRY if style=='A' else (VCR if style=='B' else BONE)),0)
        if style=='B' and k%3==0:S.add(cap((x*1.05,0,z*1.05),(x*1.22,2,z*1.28),2.6,.5),VOID,1.5,'r')
        if style=='C' and k%3==1:S.add(sphere((x,6.5,z),2.4),VCR,0)
    return S
# ---------- 한 몸의 무리 여왕 (오른쪽을 봄) ----------
def queen(style):
    S=Scene();body=SHELL if style!='B' else VOID
    for i in range(5):S.add(ell(P(0,5-i*.3,6-i*5),(6.5-i*.9,4.6-i*.5,3.6)),body,1.4,'b')
    S.add(ell(P(0,6,10),(5.4,4.2,4.2)),body,1.5,'b')
    core=AGATE
    S.add(sphere(P(0,9,4),3.2),core,0)
    for s in(-1,1):
        S.add(sphere(P(s*2.6,8,12.6),1.4),EYE)
        S.add(crystal(P(s*3,8,9),P(s*.6,.8,.5),7,1.4),CRY2 if style=='A' else (VCR if style=='C' else VOID),0)
        for i in range(4):
            if style=='A':S.add(crystal(P(s*3,7.6-i*.3,4-i*5),P(s*.9,.6,-.4),5-i*.8,1.3),CRY if (i+(s>0))%2 else CRY2,0)
            elif style=='C':S.add(sphere(P(s*3.6,6.5-i*.3,4-i*5),1.2),VCR,0)
            else:S.add(sphere(P(s*3.2,6.5-i*.3,4-i*5),.9),VCR,0)
    return S
def glow(name,col=(180,120,255),r=2,al=170):
    from PIL import ImageFilter
    p=os.path.join(OUT,name+'.png');im=Image.open(p).convert('RGBA');W,H=im.size;pad=r+2
    big=Image.new('RGBA',(W+pad*2,H+pad*2),(0,0,0,0));big.paste(im,(pad,pad))
    a=big.split()[3].point(lambda v:255 if v>0 else 0).filter(ImageFilter.MaxFilter(r*2+1)).filter(ImageFilter.GaussianBlur(1))
    g=Image.new('RGBA',big.size,col+(0,));g.putalpha(a.point(lambda v:int(v*al/255)))
    out=Image.alpha_composite(g,big);out.save(p)
if __name__=='__main__':
    import sys
    sts=sys.argv[1] if len(sys.argv)>1 else 'ABC'
    for st in sts:
        M=vmats(st)
        spr(jaw(st),90,90,.7,(0,8,0),89,'hcrJ_'+st,[(P(0,8,-16),(170,100,255),14,.7)],M=M,light=mon.LT)
        spr(queen(st),70,50,.6,(0,6,0),89,'swQ_'+st,[(P(0,10,4),(255,190,80),10,.8)],M=M,light=mon.LT)
        if st!='B' or not os.path.exists(os.path.join(OUT,'hcrR_B.png')) or 'R' in sys.argv:
            spr(ring(st),170,130,.95,(0,0,0),58,'hcrR_'+st,[((0,10,0),(150,90,255),70,.35)],M=M)
            if st in 'BC':glow('hcrR_'+st)
        if st in 'BC':
            glow('hcrJ_'+st,r=1,al=200);glow('swQ_'+st,(230,180,120) if st=='B' else (180,120,255))
    sheet(['hcrJ_'+x for x in sts]+['swQ_'+x for x in sts],OUT+'/s_boss.png',sc=4)
