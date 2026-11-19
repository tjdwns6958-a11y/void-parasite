from PIL import Image, ImageDraw, ImageFont
import math, random, textwrap
exec(open('/home/claude/play/swarm_sk2.py').read().split("W=700")[0])

def press(stage,seed):  # 누르기 — 위에서 천천히 눌러 온다
    im,L=FF(seed); d=ImageDraw.Draw(L); cx,cy=75,52
    sc=[30,42,50][stage]
    m=palm_tele(d,cx,cy,sc); stamp(L,m.point(lambda v:[50,90,0][stage] if v else 0),cx,cy,(255,60,90,255))
    if stage<2:
        p,_=palm_pts(cx,cy-30+stage*12,[18,30][stage],n=[260,380][stage],seed=2); dots(ImageDraw.Draw(L),p,a=[150,210][stage])
        arrow(ImageDraw.Draw(L),cx+60,8,cx+60,26,WH,1)
    else:
        p,_=palm_pts(cx,cy,sc,n=700,seed=2); dots(d,p)
        for r in (56,62): d.ellipse([cx-r,cy+2-r*.5,cx+r,cy+2+r*.5],outline=(255,255,255,90))
    worm(ImageDraw.Draw(L),83,26 if stage==2 else 70,-math.pi/2); comp(im,L); return im
def grab(stage,seed):  # 밑에서 잡아채기 — 바닥이 물결치고 손가락 끝이 솟는다
    im,L=FF(seed); d=ImageDraw.Draw(L); cx,cy=75,52
    if stage==0:
        tele_circle(d,cx,cy,34,20)
        for r in (9,18,27): d.ellipse([cx-r,cy-r*.6,cx+r,cy+r*.6],outline=(235,215,255,230))
        worm(d,cx+4,cy,0)
    elif stage==1:
        tele_circle(d,cx,cy,34,20)
        for k in range(5):
            a=-math.pi*.95+k*math.pi*.47; x,y=cx+math.cos(a)*28,cy+math.sin(a)*17
            swarm(d,[(x,y),(x,y-4),(x,y-8)],40,1.2,k); d.ellipse([x-2,y-10,x+2,y-6],fill=(240,232,255))
        worm(d,cx+36,cy+20,.6); arrow(d,cx+18,cy+10,cx+30,cy+18,GOLD,1)
    else:
        p,_=palm_pts(cx,cy,34,ang=math.pi,n=520,closed=1.0,seed=3); dots(d,p)
        d.text((cx-30,cy-40),'굳음',font=ft(10),fill=WH); queen(d,cx+44,cy-24,.6); worm(d,cx+40,cy-8,-1.4); bite(d,cx+44,cy-18)
    comp(im,L); return im

# 섞은 스킬 한 컷씩
def M_spiral_ring():
    im,L=FF(81,170,100); d=ImageDraw.Draw(L); cx,cy=85,50
    for arm in range(3):
        pts=[(cx+math.cos(t+arm*2.094)*t*8,cy+math.sin(t+arm*2.094)*t*5) for t in [i/20 for i in range(20,150)]]
        swarm(d,pts,170,1.4,arm,a=170)
    pts=[]
    for i in range(120):
        a=i/120*6.283; x,y=math.cos(a)*78,math.sin(a)*20; t=.3
        pts.append((cx+x*math.cos(t)-y*math.sin(t),cy+x*math.sin(t)+y*math.cos(t)))
    swarm(d,pts,240,1.1,9); queen(d,cx,cy,.7); worm(d,40,82,0); comp(im,L); return im
def M_rain_comet():
    im,L=FF(82,170,100); d=ImageDraw.Draw(L)
    for i in range(5):
        for j in range(3):
            if (i+j)%2: continue
            x,y=20+i*32,22+j*28; tele_circle(d,x,y,10,6)
    trail(d,-10,0,150,95,150,3); swarm(d,[(150,95)],60,2,3); tele_line(d,110,70,168,104,10)
    worm(d,52,50,0); comp(im,L); return im
def M_swallow_hole():
    im,L=FF(83,170,100); d=ImageDraw.Draw(L); cx,cy=85,50
    for r in range(10,72,10): d.ellipse([cx-r,cy-r*.6,cx+r,cy+r*.6],outline=(160,120,240,max(30,150-r*2)))
    swarm(d,[(cx,cy)],300,4,3)
    for i in range(90):
        a0=i/90*6.283;a1=(i+1)/90*6.283
        if abs(math.atan2(math.sin(a0-2.4),math.cos(a0-2.4)))<.3 or abs(math.atan2(math.sin(a0+.5),math.cos(a0+.5)))<.3: continue
        d.line([cx+math.cos(a0)*76,cy+math.sin(a0)*45,cx+math.cos(a1)*76,cy+math.sin(a1)*45],fill=RED,width=2)
    for a in [i/8*6.283 for i in range(8)]: arrow(d,cx+math.cos(a)*62,cy+math.sin(a)*37,cx+math.cos(a)*44,cy+math.sin(a)*26,(200,170,255),1)
    worm(d,150,84,2.6); comp(im,L); return im
def M_mitosis_queen():
    im,L=FF(84,170,100); d=ImageDraw.Draw(L)
    for k,(x,y,s) in enumerate([(30,26,6),(36,74,6),(100,20,5),(136,44,5),(98,76,5),(146,84,5)]):
        swarm(d,[(x,y)],int(s*22),s*.7,k)
        if k==4: queen(d,x,y,.55); d.ellipse([x-12,y-8,x+12,y+8],outline=GOLD)
    worm(d,70,50,0); bite(d,62,44); comp(im,L); return im
def M_ring_pulsar():
    im,L=FF(85,170,100); d=ImageDraw.Draw(L); cx,cy=85,50
    for k,(rx,ry,tilt) in enumerate([(70,22,.35),(52,34,-.6)]):
        pts=[(cx+math.cos(a)*rx*math.cos(tilt)-math.sin(a)*ry*math.sin(tilt),cy+math.cos(a)*rx*math.sin(tilt)+math.sin(a)*ry*math.cos(tilt)) for a in [i/120*6.283 for i in range(120)]]
        swarm(d,pts,230,1.1,k)
    for a in (1.9,1.9+math.pi):
        pts=[(cx+math.cos(a)*r,cy+math.sin(a)*r*.62) for r in range(8,90,2)]; swarm(d,pts,150,1.3,int(a*7),col=((255,200,120),))
    queen(d,cx,cy,.7); worm(d,104,52,0); comp(im,L); return im
def M_tide_grab():
    im,L=FF(86,170,100); d=ImageDraw.Draw(L)
    fill=[(random.uniform(0,60+12*math.sin(y/8)),y) for y in range(0,100) for _ in range(4)]; swarm(d,fill,520,1.2,4)
    for x,y in [(92,32),(130,72)]: d.ellipse([x-13,y-8,x+13,y+8],fill=(90,80,110),outline=(160,150,190))
    tele_circle(d,130,72,22,13)
    for k in range(5):
        a=-math.pi*.95+k*math.pi*.47; x,y=130+math.cos(a)*18,72+math.sin(a)*11; d.ellipse([x-2,y-4,x+2,y],fill=(240,232,255))
    worm(d,92,30,0); comp(im,L); return im

W=700
def head(t,sz=26,col=(255,255,255),h=46,bg=(6,4,12)):
    o=Image.new('RGB',(W,h),bg); ImageDraw.Draw(o).text((20,8),t,font=ft(sz),fill=col); return o
def note(t,col=(225,218,240),sz=16,wrap=42,bg=(13,10,22)):
    ls=[]
    for para in t.split('\n'): ls+=textwrap.wrap(para,wrap) or ['']
    o=Image.new('RGB',(W,10+25*len(ls)),bg); d=ImageDraw.Draw(o)
    for i,l in enumerate(ls): d.text((22,4+i*25),l,font=ft(sz,False),fill=col)
    return o
def row(frames,caps,n,arrows=True):
    fw=(W-40-10*(n-1))//n; h=int(frames[0].height*fw/frames[0].width)
    o=Image.new('RGB',(W,h+28),(13,10,22)); d=ImageDraw.Draw(o)
    for i,f in enumerate(frames):
        x=20+i*(fw+10); o.paste(f.resize((fw,h),Image.NEAREST).convert('RGB'),(x,0)); d.text((x+6,3),str(i+1),font=ft(15),fill=GOLD)
        d.text((x+fw/2,h+5),caps[i],font=ft(13),fill=WH,anchor='ma')
        if arrows and i<n-1: d.text((x+fw+1,h/2),'›',font=ft(18),fill=GOLD,anchor='lm')
    return o
def label(t,sub=''):
    o=Image.new('RGB',(W,32),(13,10,22)); d=ImageDraw.Draw(o); d.text((20,4),t,font=ft(18),fill=GOLD)
    if sub: d.text((W-20,7),sub,font=ft(14,False),fill=(200,190,230),anchor='ra')
    return o
def skillgrid(items):
    cw=(W-40-10)//2; out=[]
    for r in range(0,len(items),2):
        o=Image.new('RGB',(W,cw*100//170+100),(13,10,22)); d=ImageDraw.Draw(o)
        for c in range(2):
            if r+c>=len(items): break
            nm,fn,ph,ds=items[r+c]; x=20+c*(cw+10); im=fn().resize((cw,cw*100//170),Image.NEAREST).convert('RGB'); o.paste(im,(x,0))
            y=im.height+4; d.text((x,y),nm,font=ft(16),fill=GOLD); d.text((x+cw,y+2),ph,font=ft(13),fill=(255,170,200),anchor='ra')
            for i,l in enumerate(textwrap.wrap(ds,23)): d.text((x,y+24+i*20),l,font=ft(13,False),fill=(225,218,240))
        out.append(o)
    return out

B=[head('최종 보스 「한 몸의 무리」 — 정리본'),
   note('수백 마리 공허 유충이 한 몸처럼 흘러 다니며 모양을 바꾼다. 속에는 금빛 여왕이 하나.\n규칙: ① 무리가 만든 모양을 보고 피한다  ② 공격이 끝나 무리가 흩어지면 여왕을 문다  ③ 떨어져 나온 유충은 먹이 — 먹으면 에너지가 차고 무리가 줄어든다',(255,214,140),16,44),
   head('무리의 손바닥 — 세 가지 동작',21,(232,200,255),40,(13,10,22)),
   label('① 달려와 합쳐지기','손 2~6개 · 노린 원에서 손 사이로 탈출'),
   row([palms(4,0,1,px=75,py=58),palms(4,1,2,px=112,py=26),palms(4,2,3,px=130,py=14),burst(4)],['손바닥이 떨어져 나와','나를 노리고 달려온다','합쳐져 꿀꺽','터진 유충은 먹이'],4),
   label('② 누르기','위에서 천천히 · 손가락 사이가 안전'),
   row([press(0,21),press(1,22),press(2,23)],['손바닥 그림자가 진다','그림자가 커지며 내려온다','쾅 — 손가락 틈에 서면 안전'],3),
   label('③ 밑에서 잡아채기','바닥이 물결치면 원 밖으로'),
   row([grab(0,31),grab(1,32),grab(2,33)],['내 발밑 바닥이 물결친다','손가락 끝 다섯이 솟는다','움켜쥔 손이 굳은 틈에 여왕'],3),
   head('1페이즈 — 여왕 체력 100% → 50%',21,(232,200,255),44,(13,10,22)),
   note('기본기: 주먹 돌진 · 파도 · 고리 (사이사이)',(200,190,230),15)]
B+=skillgrid([('은하 소용돌이 → 고리',M_spiral_ring,'은하 + 행성 고리','팔 셋으로 돌다가 끝에 기울어진 고리로 굳어 한 번 쓸고 흩어진다'),
              ('유충 비 + 혜성',M_rain_comet,'유충 비 + 혜성','바둑판 원으로 쏟아진 뒤, 마지막 하나가 혜성처럼 꼬리를 그으며 대각선으로 꽂힌다'),
              ('손바닥 ② 누르기',lambda:press(1,41),'',''),
              ('손바닥 ③ 잡아채기',lambda:grab(1,42),'','')][:2])
B.append(note('손바닥: ② 누르기 · ③ 밑에서 잡아채기 (1페이즈는 손 1개)',(200,190,230),15))
B.append(head('변신 — 여왕이 무리를 몸에 입는다 → 거대 유충',19,(255,150,180),40,(30,22,48)))
B.append(head('2페이즈 — 여왕 체력 50% → 0%',21,(232,200,255),44,(13,10,22)))
B+=skillgrid([('삼켜서 블랙홀 → 초신성',M_swallow_hole,'손바닥① + 블랙홀','손바닥 여럿이 합쳐진 덩어리가 그대로 블랙홀이 돼 끌어당기고, 버티면 틈 있는 고리로 터진다'),
              ('세포 분열 + 진짜 여왕',M_mitosis_queen,'세포 분열 + 심장','거대 유충이 둘→넷→여덟로 쪼개져 쫓아온다. 금빛 테두리 무리에 진짜 여왕 — 작은 무리는 먹을 수 있다'),
              ('행성 고리 + 펄서',M_ring_pulsar,'행성 고리 + 펄서','기울어진 고리 둘이 돌고, 그 사이로 금빛 빛줄기 둘이 시곗바늘처럼 돈다. 고리 안쪽 빈 곳으로'),
              ('밀물 + 잡아채는 손',M_tide_grab,'밀물 + 손바닥③','체력 15% 이하 — 유충이 바다처럼 차오르고 바위 섬으로 피하면, 섬 밑에서 손이 잡아챈다(섬을 옮겨 다닐 것)')])
B.append(note('손바닥: ① 달려와 합쳐지기(2→6개) · ② 누르기 2개 연속 · ③ 잡아채기 연속',(200,190,230),15))
B.append(note('구현: 무리 = 유충 점 약 300개가 목표 모양(손바닥 마스크 · 나선 · 고리 · 원)으로 흘러감. 판정은 예고 모양(원 · 선 · 손바닥 마스크)으로 해서 가볍다. 지금 여제 보스 자리를 교체.',(150,140,180),13,52))
H=sum(b.height for b in B)+16; out=Image.new('RGB',(W,H),(6,4,12)); y=0
for b in B: out.paste(b,(0,y)); y+=b.height
out.save('/home/claude/void-parasite/docs/boss_designs/18_swarm_final.png'); print(out.size)
