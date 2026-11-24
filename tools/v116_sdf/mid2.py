from mid import *
import shapes as SH
def MAPM(acc):
    M=MID();Mx=dict(M)
    Mx[SH.B1]=M[SHELL];Mx[SH.B2]=dict(M[SHELL]);Mx[SH.B2]['ramp']=ramp(0x160e28,0x22183a,0x302450,0x403266,0x52427c)
    Mx[SH.LG]=dict(M[SHELL]);Mx[SH.LG]['ramp']=ramp(0x120a20,0x1c1430,0x281e40,0x342852)
    Mx[SH.EY]=M[EYE];Mx[SH.AC]=M[acc]
    return Mx
if __name__=='__main__':
    mon.ORI='up';spr(SH.sc1(),80,90,.8,(0,6,-2),89,'kha_mid',[(P(0,8,7),(255,90,60),5,.4)],M=MAPM(BONE),light=LT)
    mon.ORI='right';spr(SH.ad4(),70,50,.7,(0,5,0),89,'rat_mid',(),M=MAPM(CRY),light=LT)
