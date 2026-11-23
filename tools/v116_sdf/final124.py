# v124 게임에 넣을 최종 그림 (기존 그림과 같은 크기로 렌더)
from colors4 import *
from burrow_soft import SOFT, b1, mound
import shutil
R=lambda *a:SH.R(*a)
def adc():  # 웅크린 쥐: 띠 두른 공 + 등 결정
    S=Scene()
    S.add(sphere((0,7,0),7),SH.B1,1,'s')
    for i in range(4):S.add(lambda Q,z=-4.5+i*3:np.maximum(sphere((0,7,0),7.35)(Q),abs(Q[...,2]-z)-.45),SH.B2,.3,'s')
    for (x,z,l) in [(1.6,2.2,3.4),(-2.2,.6,2.8),(2.2,-2.4,3),(-1,-3.6,2.4),(0,4,2)]:S.add(crystal((x,13.2-abs(z)*.25-abs(x)*.2,z),(x*.12,1,z*.08),l,1.15,tip=.6),SH.AC,0)
    S.add(cap((0,4,-6.4),(1.6,2.6,-8.2),1.1,.45),SH.B2,1,'t')
    return S
if __name__=='__main__':
    mon.ORI='up'
    for n,k in (('kha','sk_a'),('kha2','sk_c'),('kha3','sk_e')):
        b,d,l,a,e=SC2[k];spr(SH.sc1(),96,108,.95,(0,6,-2),89,'v124_'+n,(),M=GLOSS2(b,d,l,a,e),light=(-.4,.8,-.45))
    for n,k in (('gna','rq_c'),('gna2','rq_e')):
        b,d,c=RT2[k];M=PAL(b,d,d[:4],c,(0x101010,0x202020,0x707070),CRY)
        mon.ORI='right';spr(SH.ad4(),70,50,.7,(0,5,0),89,'v124_'+n,(),M=M,light=LT)
        mon.ORI='up';spr(adc(),40,40,.6,(0,7,0),89,'v124_'+n.replace('gna','gnac'),(),M=M,light=LT)
    M=SOFT();mon.ORI='up'
    spr(b1(),110,130,1.0,(0,6,0),89,'v124_rek',(),M=M,light=LT)
    spr(mound(1),80,64,.85,(0,2,0),48,'v124_mound',(),M=M)
    MN.ORI='up'
    for n,k in (('f_s','fs_a'),('f_s2','fs_b'),('f_s3','fs_e')):
        sh,cr=MITE[k];M=FS();M[SHELL]=dict(M[SHELL]);M[SHELL]['ramp']=ramp(*sh);M[CRY]=dict(M[CRY]);M[CRY]['ramp']=ramp(*cr)
        spr(MN.f_s(),30,30,.6,(0,6,0),89,'v124_'+n,(),M=M,light=LT)
