from real import *
import real
def pal(base,body,dark,leg,acc=None,eye=None,cry=None):
    M=dict(base)
    M[FL]=flat(ramp(*body));M[SH]=flat(ramp(*body))
    M[FL2]=flat(ramp(*dark));M[SH2]=flat(ramp(*dark))
    M[CL]=flat(ramp(*leg))
    if acc:M[BONE]=flat(ramp(*acc),amb=.75,dif=.3)
    if eye:M[EYE]=flat(ramp(*eye),amb=.9,dif=.1);M[EYB]=flat(ramp(*eye),amb=.85,dif=.15)
    if cry:M[CRY]=flat(ramp(*cry),amb=.75,dif=.3)
    return M
B0=FM()
SC={ # 낫그늘 전갈
 'sc1':pal(B0,(0x2a2632,0x3c3646,0x524a5e),(0x1c1824,0x2a2534,0x383044),(0x18141e,0x241e2c,0x2e2838),(0xc8b888,0xf0e0b0,0xfff4d0),(0xff8a20,0xffb848,0xffe090)),
 'sc2':pal(B0,(0x8a6430,0xb08648,0xcca664),(0x5e4020,0x7a5630,0x946a3c),(0x4a3218,0x5e4020,0x6e4c28),(0x3a2410,0x5a3a1c,0x7a5230),(0x101010,0x202020,0x606060)),
 'sc3':pal(B0,(0x24342e,0x34483e,0x486250),(0x18241e,0x22322a,0x2c4034),(0x141e18,0x1c2a22,0x24362c),(0xa8e8c8,0xd8fff0,0xffffff),(0x50ff90,0xa0ffc0,0xe0ffe8)),
}
AR={ # 제르사이 유생 아르마딜로
 'ar1':pal(B0,(0x6e6256,0x8a7c6c,0xa49684),(0x4e4438,0x625648,0x766a5a),(0x8a6a5a,0xa8887a,0xc4a698),eye=(0x101010,0x202020,0x707070),cry=(0x58b8e8,0x9ae0ff,0xe8faff)),
 'ar2':pal(B0,(0xa08a62,0xbca47a,0xd4be94),(0x7a6648,0x947e5a,0xa8926c),(0xb88a70,0xd0a48a,0xe4bea4),eye=(0x101010,0x202020,0x707070),cry=(0xd8d8e0,0xf4f4ff,0xffffff)),
 'ar3':pal(B0,(0x3e4856,0x52606e,0x687888),(0x2c3440,0x3a4452,0x485464),(0x7a6a6a,0x948282,0xac9a9a),eye=(0x101010,0x202020,0x707070),cry=(0x70d8c8,0xa8f4e8,0xe8fffa)),
}
MC={ # 땅울음 땅강아지
 'mc1':pal(B0,(0x5a3a22,0x7a5232,0x96683e),(0x3e2616,0x523420,0x66422a),(0x2e1c10,0x3e2616,0x4e321e),eye=(0x101010,0x303030,0xa0a0a0),cry=(0x58b8e8,0x9ae0ff,0xe8faff)),
 'mc2':pal(B0,(0x8a7a5a,0xa69470,0xc0ae88),(0x645638,0x7a6a48,0x8e7e5a),(0x4e4430,0x645638,0x7a6a48),eye=(0x101010,0x303030,0xa0a0a0),cry=(0xe8e8f0,0xf8f8ff,0xffffff)),
 'mc3':pal(B0,(0x2a2622,0x3a3430,0x4c443e),(0x1c1816,0x26221e,0x302a26),(0x1a1614,0x24201c,0x2e2824),eye=(0xff6a20,0xffa040,0xffd080),cry=(0xffa848,0xffd08a,0xfff0d0)),
}
# ---------- 큰 먹이 (위를 봄) ----------
SKN=22;SPT=23
def caterpillar():
    S=Scene()
    for i in range(4):S.add(sphere(P(0,5,6-i*4.6),5.6-abs(i-1.2)*.5),SKN,1.6,'b')
    S.add(sphere(P(0,5.6,10),4.2),SH2,1.2,'b')
    for i in range(4):
        for s in(-1,1):S.add(sphere(P(s*3.4,8.6,6-i*4.6),1.2),SPT,0)
    for s in(-1,1):S.add(sphere(P(s*1.8,8.4,12),1.0),EYB,0)
    for i in range(3):
        for s in(-1,1):legs(S,[P(s*4.4,3,5-i*4.6),P(s*6,0,4.5-i*4.6)],1.0,.8,SH2)
    return S
def grub():
    S=Scene()
    pts=[(0,9),(2,5),(3.5,0.5),(3.6,-4),(2.4,-8),(0,-11)]
    for i,(x,f) in enumerate(pts):S.add(sphere(P(x,4.4,f),4.2-i*.35),SKN,1.6,'b')
    S.add(sphere(P(-1,5,12),3.2),SH2,1,'b')
    for i,(x,f) in enumerate(pts[:5]):S.add(ell(P(x+.3,4.6,f-1.8),(3.6-i*.3,3.4,.4)),SPT,0)
    for s in(-1,1):legs(S,[P(-1+s*2.2,3,10),P(-1+s*3.8,0,11.5)],.8,.5,SH2)
    return S
def snail():
    S=Scene()
    S.add(ell(P(0,2.4,0),(3.6,2.2,13)),SKN,1.5,'b')
    for s in(-1,1):S.add(cap(P(s*1.2,3.5,11),P(s*2.6,5,15.5),.5,.4),SKN,0);S.add(sphere(P(s*2.6,5,15.6),.8),EYB,0)
    S.add(lambda Q:ell(P(0,6.6,-2),(6.4,5.4,6.4))(Q),SH,1.2,'s')
    for k in range(3):
        a=k*2.1;S.add(crystal(P(math.cos(a)*2,10,-2+math.sin(a)*2),D(math.cos(a)*.5,1,math.sin(a)*.5),4-k*.6,1.4,tip=.6),CRY,0)
    S.add(lambda Q:np.abs(ell(P(0,6.7,-2),(4,3.4,4))(Q))-.25,SH2,0)
    return S
FOOD=pal(B0,(0x6aa030,0x88c040,0xa8dc58),(0x3a5a1a,0x4a7020,0x5a8428),(0x3a5a1a,0x4a7020,0x5a8428),eye=(0x101010,0x202020,0x606060),cry=(0x58b8e8,0x9ae0ff,0xe8faff))
if __name__=='__main__':
    mon.ORI='up'
    for n,M in SC.items():spr(scorpion(),70,76,.85,(0,6,0),89,n,(),M=M,light=LT)
    for n,M in MC.items():spr(mole_cricket(),80,84,.9,(0,6,0),89,n,(),M=M,light=LT)
    F1=dict(FOOD);F1[SKN]=flat(ramp(0x6aa030,0x88c040,0xa8dc58));F1[SPT]=flat(ramp(0xe0b020,0xffd040,0xfff090),amb=.85,dif=.2);F1[SH2]=flat(ramp(0x3a5a1a,0x4a7020,0x5a8428))
    spr(caterpillar(),40,48,.8,(0,4,0),89,'bf1',(),M=F1,light=LT)
    F2=dict(FOOD);F2[SKN]=flat(ramp(0xd8c8a8,0xeee0c4,0xfff6e4));F2[SPT]=flat(ramp(0xb8a688,0xc8b698,0xd8c8a8));F2[SH2]=flat(ramp(0x8a5a2a,0xa86e34,0xc08040))
    spr(grub(),44,48,.8,(0,4,0),89,'bf2',(),M=F2,light=LT)
    F3=dict(FOOD);F3[SKN]=flat(ramp(0x9a8a7a,0xb4a494,0xcabcac));F3[SH]=flat(ramp(0x7a5a3a,0x9a7450,0xb48c64));F3[SH2]=flat(ramp(0x5a3e24,0x6e4c2c,0x82583a))
    spr(snail(),44,50,.8,(0,5,0),89,'bf3',(),M=F3,light=LT)
    mon.ORI='right'
    for n,M in AR.items():spr(armadillo(),64,60,.78,(0,6,0),89,n,(),M=M,light=LT)
