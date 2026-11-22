from runner import *
import base64, io
def spr(scene,W,H,scale,center,pitch,emit,mats,out):
    img,M,hit,D=render(scene,W,H,scale=scale,center=center,pitch=pitch,mats=mats,emit_pts=emit)
    img=outline(img,hit,D,M,skip=(CRY,CRY2));im=Image.fromarray(img).convert('RGBA')
    bb=im.getbbox();im=im.crop(bb);im.save(out);print(out,im.size);return im
M=MATS()
def crab_nogeo():
    S=crab_scene();S.parts=[p for p in S.parts if not (p[1]==ROCK)]
    # 정동 뽑힌 자리: 빛나는 보라 상처 + 부러진 결정 그루터기 (원래 결정은 지움)
    S2=Scene();S2.parts=[p for p in S.parts]
    return S2
import crab as CB
def crab_scene_ng():
    S=CB.crab_scene()
    keep=[];seen_geo=False
    for p in S.parts:
        f,mat,k,grp,sub=p
        keep.append(p)
    return S
# 정동 없는 몸: crab_scene을 다시 만들되 정동/안쪽 결정 생략
src=open('crab.py',encoding='utf-8').read()
a=src.index("    # 등딱지가 갈라지며 솟은 거대 정동 결정 덩어리");b=src.index("    # 다리 4쌍")
ng=src[:a]+"""    S.add(ell((4,38.5,-8),(24,4,16)),AGATE,0)
    random.seed(5)
    for k in range(10):
        a=k/10*6.283;c=(4+math.cos(a)*22,37,-8+math.sin(a)*14);S.add(crystal(c,(math.cos(a)*.5,1,math.sin(a)*.5),random.uniform(5,10),random.uniform(1.8,2.8)),CRY2 if k%2 else CRY)
"""+src[b:]
ns={};exec(compile(ng.replace('def crab_scene():','def crab_scene_b():'),'ng','exec'),ns)
def geode():
    S=Scene();S.add(lambda P:sphere((0,0,0),30)(P)+noise3(P,.3)*4,ROCK,0)
    random.seed(8)
    for k in range(16):
        th=random.uniform(-3.1,3.1);ph=random.uniform(-1.2,1.4);d=np.array([math.sin(th)*math.cos(ph),math.sin(ph),math.cos(th)*math.cos(ph)])
        S.add(crystal(tuple(d*20),tuple(d),random.uniform(16,28),random.uniform(3.2,5.2),tw=random.uniform(0,1)),CRY if k%3 else CRY2)
    return S
def pillar():
    S=Scene();random.seed(14)
    S.add(lambda P:ell((0,2,0),(20,7,16))(P)+noise3(P,.3)*2,ROCK,0)
    for k in range(7):
        a=k/7*6.283;r=0 if k==0 else 9;d=(math.cos(a)*.25*(k>0),1,math.sin(a)*.25*(k>0))
        S.add(crystal((math.cos(a)*r,0,math.sin(a)*r),d,(60 if k==0 else random.uniform(22,38)),(8 if k==0 else random.uniform(3.5,5.5)),tip=.25,tw=random.uniform(0,1)),CRY if k%2==0 else CRY2)
    return S
RM=dict(M);RM[ROCK]=dict(M[ROCK]);RM[ROCK].update(fill=.25,amb=.12)
AM=dict(M);AM[AGATE]=dict(ramp=ramp(0x12041e,0x2a0a48,0x4a1880,0x7a3ac0,0xb07aff),amb=.2,dif=.6,spec=6,gk=.4,dith=.15)
spr(crab_scene(),300,210,1.25,(0,34,22),40,[((4,70,-10),(150,90,255),100,.6),((-40,80,110),(80,180,255),90,.7),((12,46,44),(255,90,60),14,.6),((-12,46,44),(255,90,60),14,.6)],RM,'gdkA.png')
spr(ns['crab_scene_b'](),300,210,1.25,(0,34,22),40,[((4,40,-10),(190,110,255),60,.9),((-40,80,110),(80,180,255),90,.7),((12,46,44),(255,90,60),14,.6),((-12,46,44),(255,90,60),14,.6)],AM,'gdkB.png')
spr(geode(),110,110,1.05,(0,0,0),40,[((0,0,40),(150,90,255),40,.4)],RM,'gdkG.png')
spr(pillar(),120,160,.72,(0,30,0),36,[((0,30,20),(100,180,255),40,.4)],RM,'gdkP.png')
