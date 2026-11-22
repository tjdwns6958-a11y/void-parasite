import crab, numpy as np
from runner import *
from PIL import Image
src=open('crab.py',encoding='utf-8').read()
a=src.index("    # 등딱지가 갈라지며 솟은 거대 정동 결정 덩어리");b=src.index("    # 다리 4쌍")
ng=src[:a]+"""    S.add(ell((4,38.5,-8),(24,4,16)),AGATE,0)
    random.seed(5)
    for k in range(10):
        a=k/10*6.283;c=(4+math.cos(a)*22,37,-8+math.sin(a)*14);S.add(crystal(c,(math.cos(a)*.5,1,math.sin(a)*.5),random.uniform(5,10),random.uniform(1.8,2.8)),CRY2 if k%2 else CRY)
"""+src[b:]
ns={};exec(compile(ng.replace('def crab_scene():','def crab_scene_b():'),'ng','exec'),ns)
M=MATS();RM=dict(M);RM[ROCK]=dict(M[ROCK]);RM[ROCK].update(fill=.25,amb=.12)
AM=dict(RM);AM[AGATE]=dict(ramp=ramp(0x12041e,0x2a0a48,0x4a1880,0x7a3ac0,0xb07aff),amb=.2,dif=.6,spec=6,gk=.4,dith=.15)
W,H,SC=300,240,1.0
EA=[((4,70,-10),(150,90,255),100,.6),((-40,80,110),(80,180,255),90,.7),((12,46,44),(255,90,60),14,.6),((-12,46,44),(255,90,60),14,.6)]
EB=[((4,40,-10),(190,110,255),60,.9),((-40,80,110),(80,180,255),90,.7),((12,46,44),(255,90,60),14,.6),((-12,46,44),(255,90,60),14,.6)]
out={}
for geo in('A','B'):
    for f in['0','1','2','3','r']:
        crab.PH=None if f=='r' else int(f)/4;crab.RAISE=1 if f=='r' else 0;ns['PH']=crab.PH;ns['RAISE']=crab.RAISE
        S=crab.crab_scene() if geo=='A' else ns['crab_scene_b']()
        img,Mi,hit,D=render(S,W,H,scale=SC,center=(0,40,22),pitch=40,mats=RM if geo=='A' else AM,emit_pts=EA if geo=='A' else EB)
        img=outline(img,hit,D,Mi,skip=(CRY,CRY2));out[geo+f]=Image.fromarray(img).convert('RGBA');print(geo+f,flush=True)
bb=None
for im in out.values():
    b=im.getbbox();bb=b if bb is None else (min(bb[0],b[0]),min(bb[1],b[1]),max(bb[2],b[2]),max(bb[3],b[3]))
print('bbox',bb)
for k,im in out.items():
    c=im.crop(bb);q=c.quantize(colors=72,method=Image.Quantize.FASTOCTREE);q.save('gdk_'+k+'.png',optimize=True)
