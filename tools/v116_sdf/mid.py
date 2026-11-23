from burrow_soft import *
import mon as MN
def MID():
    M=SM()
    M[SHELL]=dict(ramp=ramp(0x1e1434,0x2c2048,0x3e2e62,0x52407c,0x6a5698,0x8672b2),amb=.26,dif=.68,rim=.3,fill=.12,dith=.04,gk=.35,spec=4,tex=lambda P:noise3(P,.45),texk=.08)
    M[CRY]=dict(ramp=ramp(0x2a7aae,0x50aedc,0x8ad6f6,0xc8f0ff),amb=.48,dif=.48,rim=.25,dith=.02,gk=.1,spec=12)
    M[CRY2]=dict(ramp=ramp(0x5a3aa0,0x845ec8,0xae90e8,0xd8c8fa),amb=.48,dif=.48,rim=.25,dith=.02,gk=.1,spec=12)
    M[BONE]=dict(ramp=ramp(0xa89ebc,0xcac2dc,0xe8e2f4,0xffffff),amb=.5,dif=.45,dith=.02,gk=0,spec=6)
    M[EYE]=dict(ramp=ramp(0xb02818,0xf05a30,0xffa060,0xffd090),amb=.75,dif=.25,dith=0,gk=0)
    M[DARK]=dict(ramp=ramp(0x120a1e,0x1c102c,0x26183a),amb=.5,dif=.3,dith=0,gk=0)
    M[ROCK]=dict(ramp=ramp(0x221c2c,0x2e2638,0x3a3246,0x4a4056,0x5c5068),tex=lambda P:noise3(P,.5,2),texk=.25,rim=.1,amb=.3,dif=.65,gk=.3,dith=.04,fill=.08)
    return M
def FS():  # 작은 먹이: v116 그림에서 명암만 조금 줄임
    M=MN.TM()
    M[SHELL]=dict(M[SHELL]);M[SHELL].update(amb=.28,dif=.62,rim=.32,texk=.06,dith=.03)
    for c in(CRY,CRY2):M[c]=dict(M[c]);M[c].update(amb=.35,dif=.55,spec=14,rim=.3)
    return M
if __name__=='__main__':
    M=MID();mon.ORI='up'
    spr(b1(),80,100,.72,(0,6,0),89,'rk_mid',(),M=M,light=LT)
    spr(mound(1),60,50,.6,(0,2,0),48,'rk_mound_mid',(),M=M)
    MN.ORI='up';spr(MN.f_s(),30,30,.6,(0,6,0),89,'f_s_soft',(),M=FS(),light=LT)
