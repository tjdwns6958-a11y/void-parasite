from voidb import *
import json
def rot(S):
    R=Scene()
    for f,mat,k,grp,sub in S.parts:
        g=(lambda f:(lambda P:f(np.stack([P[...,2],P[...,1],-P[...,0]],-1))))(f)
        sb=None if sub is None else (lambda s2:(lambda P:s2(np.stack([P[...,2],P[...,1],-P[...,0]],-1))))(sub)
        R.parts.append((g,mat,k,grp,sb))
    return R
def naut(open_=True):
    S=Scene()
    shell=lambda P:np.maximum(ell((-6,50,-6),(46,46,24))(P),-ell((30,44,10),(22,28,26))(P))
    S.add(shell,VSH,0)
    S.add(lambda P:np.maximum(ell((30,44,4),(20,26,16))(P),-(P[...,2]-2)),VOID,0)
    for k in range(12):
        a=-1.6+k/12*3.4;S.add(sphere((30+math.cos(a)*21,44+math.sin(a)*27,9),2),GLOW)
    if open_:
        random.seed(9)
        for k in range(8):
            a=-1.4+k/7*2.8;pts=[(32+math.cos(a)*6,40+math.sin(a)*12,10)]
            for j in range(4):x,y,z=pts[-1];pts.append((x+7,y-4+math.sin(a)*3,z+4+random.uniform(-2,2)))
            for a1,b1 in zip(pts,pts[1:]):S.add(cap(a1,b1,3.2,1.8),VSH,1.2,'arm%d'%k)
    S.add(ell((30,72,8),(11,5,9)),VSH,2,'hood')
    return S
M=VM();M[VSH]=dict(M[VSH]);M[VSH]['band']=lambda P:(lambda r,a:(np.sin(a*7+r*.32)>.8)*.2-(np.abs(np.sin(np.log(r+1)*6-a))<.08)*.35)(np.hypot(P[...,0]+6,P[...,1]-50),np.arctan2(P[...,1]-50,P[...,0]+6))
W,H=220,170;SC=.66;CEN=(8,48,0);PI=18;YAW=-22
out={}
for key,op in(('obsN',True),('obsNc',False)):
    S=naut(op);img,Mi,hit,D=render(S,W,H,scale=SC,center=CEN,pitch=PI,yaw=YAW,mats=M,emit_pts=[((30,44,20),(150,90,255),60,.6)])
    img=outline(img,hit,D,Mi,skip=(VOID,GLOW));im=Image.fromarray(img).convert('RGBA');bb=im.getbbox();im=im.crop(bb);im.save(key+'.png');out[key]=bb
# 눈 위치 (모델 (36,62,14) → 회전 후 (−14,62,36))
p=math.radians(PI);yw=math.radians(YAW);f=nrm(np.array([-math.sin(yw)*math.cos(p),-math.sin(p),-math.cos(p)*math.cos(yw)]));r=nrm(np.cross(f,np.array([0,1,0.])));u=np.cross(r,f)
def proj(P):P=np.array(P)-np.array(CEN);return (W/2+np.dot(P,r)/SC-.5,H/2-np.dot(P,u)/SC-.5)
ap=proj((30,44,10));ey=proj((36,62,14))
bb=out['obsN'];im=Image.open('obsN.png')
print(json.dumps({'size':im.size,'eye':[ey[0]-bb[0],ey[1]-bb[1]],'ap':[ap[0]-bb[0],ap[1]-bb[1]],'bbc':out['obsNc'],'bbo':bb}))
