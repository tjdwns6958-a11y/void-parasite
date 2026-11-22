from crab import *
from PIL import Image, ImageFilter, ImageDraw
def MATS():
    return {SHELL:dict(ramp=ramp(0x0c0816,0x181026,0x281c3e,0x3c2c5a,0x584280,0x8064a8,0xb49ad6),tex=lambda P:noise3(P,.35),texk=.3,rim=.35,amb=.06,dif=1.0,gk=.6,dith=.08,fill=.22),
 ROCK:dict(ramp=ramp(0x0e0c14,0x1a1622,0x2a2434,0x3e364a,0x564c62,0x766c82),tex=lambda P:noise3(P,.5,2),texk=.45,rim=.15,amb=.06,dif=1.0,gk=.8,dith=.07,fill=.15),
 CRY:dict(ramp=ramp(0x123a5a,0x1c6a96,0x2fa0d0,0x6fd0ff,0xbff0ff,0xffffff),amb=.42,spec=24,rim=.4,dith=.06,gk=.2),
 CRY2:dict(ramp=ramp(0x2a1050,0x4a2290,0x7a44d0,0xa67aff,0xd8c0ff,0xffffff),amb=.42,spec=24,rim=.4,dith=.06,gk=.2),
 EYE:dict(ramp=ramp(0x3a0a10,0x8a1a20,0xe04030,0xff9a50,0xffe0a0),amb=.6,spec=40,rim=.2,gk=0),
 DARK:dict(ramp=ramp(0x1a0c18,0x3a1a30,0x6a3050,0xa05070),amb=.3),
 BONE:dict(ramp=ramp(0x3a3048,0x6a5c80,0xa096b8,0xd8d0ea,0xffffff),amb=.3,spec=16),
 AGATE:dict(ramp=ramp(0x3a2408,0x7a4a10,0xc07a20,0xf0b030,0xffe080),amb=.5,spec=20,gk=.3)}
def go(scene,out,W=240,H=150,scale=1.3,center=(0,34,22),pitch=40,emit=(),shadow=(22,86,218,138),cave=None,mats=None,cm_over=None,yaw=0):
    mats=mats or MATS();img,M,hit,D=render(scene,W,H,scale=scale,center=center,pitch=pitch,mats=mats,emit_pts=emit,yaw=yaw)
    img=outline(img,hit,D,M,skip=(CRY,CRY2))
    cm=dict(mats);cm[ROCK]=dict(ramp=ramp(0x0c0814,0x140e20,0x1e1630,0x2a2042,0x3a2e56,0x4c3e6c),tex=lambda P:noise3(P,.15,3),texk=.5,rim=.05,gk=.9,amb=.1,dif=.5,dith=.06,fill=0)
    if cm_over:cm.update(cm_over)
    bg,bM,bhit,bD=render(cave or cave_scene(),W,H,scale=scale,center=center,pitch=pitch,yaw=yaw,mats=cm,emit_pts=list(emit)+[((0,0,10),(140,80,220),90,.25)],steps=90)
    bg=outline(bg,bhit,bD,bM,col=(8,4,14),inner=(16,10,26),skip=(ROCK,))
    B=Image.fromarray(bg).convert('RGBA');A=Image.fromarray(img).convert('RGBA')
    sh=Image.new('RGBA',(W,H),(0,0,0,0));ImageDraw.Draw(sh).ellipse(shadow,fill=(0,0,0,140));B=Image.alpha_composite(B,sh.filter(ImageFilter.GaussianBlur(4)))
    SC=4;B=Image.alpha_composite(B,A).resize((W*SC,H*SC),Image.NEAREST)
    g=A.resize((W*SC,H*SC),Image.NEAREST);ga=np.array(g).astype(float);lum=ga[...,:3].mean(-1);mask=(lum>190)&(ga[...,2]>200)
    gl=np.zeros_like(ga);gl[mask]=ga[mask];gl[...,3]=mask*160;G=Image.fromarray(gl.astype(np.uint8)).filter(ImageFilter.GaussianBlur(14))
    B=Image.alpha_composite(B,G);B.save(out);return B
