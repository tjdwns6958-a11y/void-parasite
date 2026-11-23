import sys,os,math,random,time
sys.path.insert(0,os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','boss_sdf'))
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','boss_sdf'))
from sdf import *
from crab import SHELL,ROCK,AGATE,CRY,CRY2,EYE,DARK,BONE,noise3
from runner import MATS
import numpy as np
from PIL import Image
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'out');os.makedirs(OUT,exist_ok=True)
GLOW=9
def mats(**over):
    M=MATS()
    M[GLOW]=dict(ramp=ramp(0x6a2a90,0xb070ff,0xe0c0ff,0xffffff),amb=.9,dif=.2,gk=0,dith=.05)
    for k,v in over.items():M[int(k[1:])]=v
    return M
def spr(scene,W,H,scale,center,pitch,name,emit=(),M=None,yaw=0,light=(-.5,.85,.6),crop=True):
    t=time.time();M=M or mats()
    img,Mi,hit,D=render(scene,W,H,scale=scale,center=center,pitch=pitch,mats=M,emit_pts=emit,yaw=yaw,light=light)
    img=outline(img,hit,D,Mi,skip=(CRY,CRY2,GLOW))
    im=Image.fromarray(img).convert('RGBA')
    if crop:
        bb=im.getbbox();im=im.crop(bb)
    p=os.path.join(OUT,name+'.png');im.save(p);print(name,im.size,'%.1fs'%(time.time()-t));return im
def legs(S,pts,r0,r1,mat=SHELL,grp='legs',k=1.2):
    for i in range(len(pts)-1):
        S.add(cap(pts[i],pts[i+1],r0+(r1-r0)*i/(len(pts)-1),r0+(r1-r0)*(i+1)/(len(pts)-1)),mat,k,grp)
def sheet(names,out,bg=(20,16,30),sc=3):
    ims=[Image.open(os.path.join(OUT,n+'.png')) for n in names];W=sum(i.width*sc+16 for i in ims)+16;H=max(i.height*sc for i in ims)+32
    B=Image.new('RGBA',(W,H),bg+(255,));x=16
    for i in ims:
        B.alpha_composite(i.resize((i.width*sc,i.height*sc),Image.NEAREST),(x,16));x+=i.width*sc+16
    B.save(out);return B
def flip(name):
    p=os.path.join(OUT,name+'.png');Image.open(p).transpose(Image.FLIP_TOP_BOTTOM).save(p)
TOPL=(-.55,.62,.56)  # 위에서 볼 때: 화면 왼쪽 위에서 비스듬히 (뒤집은 뒤 기준)
def tmats():
    M=mats();M[SHELL]=dict(M[SHELL]);M[SHELL].update(amb=.0,dif=.95,rim=.5,fill=.05)
    return M
