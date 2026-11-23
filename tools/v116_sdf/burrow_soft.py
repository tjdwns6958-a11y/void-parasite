from burrower import *
def SOFT():
    M=SM()
    M[SHELL]=dict(ramp=ramp(0x2a1e44,0x3a2c5c,0x4c3c74,0x5e4c8a,0x7462a0),amb=.42,dif=.45,rim=.18,fill=.1,dith=.02,gk=.2,spec=0,tex=lambda P:noise3(P,.5),texk=.03)
    M[CRY]=dict(ramp=ramp(0x3a90c0,0x6cc4ea,0xa8e6fa),amb=.55,dif=.35,rim=.1,dith=0,gk=0,spec=0)
    M[CRY2]=dict(ramp=ramp(0x6a4ab0,0x9a7ad8,0xc6b0f0),amb=.55,dif=.35,rim=.1,dith=0,gk=0,spec=0)
    M[BONE]=dict(ramp=ramp(0xb8aec8,0xd8d0e6,0xf0ecf8),amb=.6,dif=.3,dith=0,gk=0,spec=0)
    M[EYE]=dict(ramp=ramp(0xd04020,0xff7040,0xffa060),amb=.8,dif=.2,dith=0,gk=0)
    M[DARK]=dict(ramp=ramp(0x160c22,0x1e1230),amb=.6,dif=.2,dith=0,gk=0)
    M[ROCK]=dict(ramp=ramp(0x2a2434,0x342d40,0x3e364a,0x483f56),tex=lambda P:noise3(P,.5,2),texk=.12,rim=.05,amb=.45,dif=.45,gk=0,dith=.02,fill=.05)
    return M
if __name__=='__main__':
    M=SOFT();mon.ORI='up'
    spr(b1(),80,100,.72,(0,6,0),89,'rk_up',(),M=M,light=LT)
    spr(mound(1),60,50,.6,(0,2,0),48,'rk_mound',(),M=M)
