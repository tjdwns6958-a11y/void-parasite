# v125 게임용 최종 그림: 땅울음 가재+결정 C (청회색·남보라 스킨) + 땅속 둔덕 2색, 쥐 웅크림 3-3 (C·E 색)
from rek6 import *
from burrower import mound
if __name__=='__main__':
    mon.ORI='up'
    for n,p in (('rek',SL),('rek2',VI)):
        M=M_(p);m=dict(M[B1]);m.update(spec=10,rim=.4);M[B1]=m
        spr(crC(),130,170,.525,(0,6,-3),89,'v125_'+n,(),M=M,light=(-.4,.8,-.45))
        mm=dict(M[ROCK]);M[ROCK]=mm
        spr(mound(1),80,64,.425,(0,2,0),48,'v125_'+n.replace('rek','mound'),(),M=M)
    for n,rk in (('gnac','rq_c'),('gnac2','rq_e')):
        b,d,c=RT2[rk];spr(rt3('c'),80,80,.54,(0,7,0),89,'v125_'+n,(),M=PAL(b,d,d[:4],c,(0x101010,0x202020,0x707070),CRY),light=LT)
