from colors2 import *
def mixw(h,t):
    r,g,b=(h>>16)&255,(h>>8)&255,h&255
    return (int(r+(255-r)*t)<<16)|(int(g+(255-g)*t)<<8)|int(b+(255-b)*t)
def GLOSS(b,d,l,a,e):
    M=PAL(b,d,l,a,e)
    for k,src in ((SH.B1,b),(SH.B2,d),(SH.LG,l)):
        m=dict(M[k]);top=src[-1];m['ramp']=ramp(*src,mixw(top,.45),mixw(top,.75));m.update(spec=14,rim=.35,amb=.14,dif=.5,texk=.02,fill=.06,dith=.03);M[k]=m
    return M
if __name__=='__main__':
    mon.ORI='up'
    for n,(b,d,l,a,e) in SC2.items():spr(SH.sc1(),80,90,.8,(0,6,-2),89,n+'g',(),M=GLOSS(b,d,l,a,e),light=(-.4,.8,-.45))
    # 작은 먹이: 맨 처음 그림 색 그대로, 위에서 고른 빛 + 명암 조금만 낮춤
    M=MN.TM()
    M[SHELL]=dict(M[SHELL]);M[SHELL].update(amb=.24,dif=.7,rim=.35,texk=.08,dith=.04)
    for c in(CRY,CRY2):M[c]=dict(M[c]);M[c].update(amb=.3,dif=.6)
    MN.ORI='up';spr(MN.f_s(),30,30,.6,(0,6,0),89,'f_s_v4',(),M=M,light=(0,1,0.001))
