from colors3 import *
from mid import FS
def GLOSS2(b,d,l,a,e):
    # 광택 절반 정도: 반사점은 남기되 크기·밝기 줄임
    M=PAL(b,d,l,a,e)
    for k,src in ((SH.B1,b),(SH.B2,d),(SH.LG,l)):
        m=dict(M[k]);top=src[-1];m['ramp']=ramp(*src,mixw(top,.25),mixw(top,.42));m.update(spec=8,rim=.3,amb=.16,dif=.55,texk=.025,fill=.06,dith=.03);M[k]=m
    return M
# 작은 먹이 색 (껍질 ramp 7단, 수정 ramp 6단) — 지금 색(보랏빛 껍질 + 하늘색 수정) 계열
SH7=lambda *c:c
MITE={
 'fs_a':(SH7(0x0c0816,0x181026,0x281c3e,0x3c2c5a,0x584280,0x8064a8,0xb49ad6),(0x123a5a,0x1c6a96,0x2fa0d0,0x6fd0ff,0xbff0ff,0xffffff)), # 지금 색
 'fs_b':(SH7(0x0a0a18,0x14162a,0x202442,0x30365e,0x464e80,0x6670a6,0x98a2d2),(0x0e4450,0x16788a,0x26aabc,0x5cd8e4,0xb4f4f8,0xffffff)), # 남보라 + 청록
 'fs_c':(SH7(0x100816,0x1e1028,0x301a40,0x46265c,0x643880,0x8a52a8,0xbc86d4),(0x14345e,0x1e5ca0,0x3088d8,0x68b4ff,0xb8dcff,0xffffff)), # 자주보라 + 푸른 수정
 'fs_d':(SH7(0x0c0a14,0x181524,0x262238,0x383250,0x50486c,0x6e6690,0x9c94b8),(0x163c56,0x22688c,0x3896bc,0x70c4e0,0xc0ecf8,0xffffff)), # 잿빛 라벤더 + 옅은 하늘색
 'fs_e':(SH7(0x0a0818,0x14102e,0x22184a,0x34226a,0x4c3090,0x6c46b8,0xa07ce4),(0x0e3c58,0x147090,0x20a8c8,0x50dcf0,0xaaf6ff,0xffffff)), # 짙은 남보라 + 밝은 시안
}
if __name__=='__main__':
    mon.ORI='up'
    for n,(b,d,l,a,e) in SC2.items():spr(SH.sc1(),80,90,.8,(0,6,-2),89,n+'g2',(),M=GLOSS2(b,d,l,a,e),light=(-.4,.8,-.45))
    MN.ORI='up'
    for n,(sh,cr) in MITE.items():
        M=FS();M[SHELL]=dict(M[SHELL]);M[SHELL]['ramp']=ramp(*sh)
        M[CRY]=dict(M[CRY]);M[CRY]['ramp']=ramp(*cr)
        spr(MN.f_s(),30,30,.6,(0,6,0),89,n,(),M=M,light=LT)
