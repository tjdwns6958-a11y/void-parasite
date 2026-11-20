// 전체 플레이용 추가 봇 (bot.js 다음에 넣는다): 특수 퀘스트 → 중간 보스 → 돌아오기 → 최종 보스 → 엔딩 선택
// 중간 보스 부분은 mbBot31.js에서 자동으로 옮겨 온 코드 (mode=human)
window.FB={ev:[],mb:null,sw:null,flags:[]};
window.fullInstall=function(opt){opt=opt||{};const s=GAME.scene.getScene('G'),S=BOTSTAT,F=FB,KB=s.k;
 // 탐험 중에만 받는 피해 절반 (봇이 사람보다 무모해서 — 예전 run3.js와 같은 보조). 중간 보스·최종 보스는 그대로
 if(opt.assist){const h1=s.hurt;s.hurt=function(d,...r){return h1.call(this,(this.mbOn||this.swOn)?d:d*.5,...r)}}
 const T0=()=>+S.t.toFixed(0),L=()=>Object.entries(s.lin||{}).map(([a,b])=>a+b).join('');
 const wrap=(nm,f)=>{const o=s[nm].bind(s);s[nm]=function(...a){try{f.apply(this,a)}catch(e){}return o(...a)}};
 wrap('mqStart',k=>F.ev.push(['퀘스트',k,T0(),'Lv'+s.plv,L()]));
 wrap('mbEnter',()=>{F.ev.push(['중간보스',s.mq.k,T0(),'Lv'+s.plv]);F.mb={k:s.mq.k,t0:S.t,minE:1,d0:{...S.dmg}}});
 wrap('mbWin',()=>{if(F.mb&&!F.mb.win){F.mb.win=1;F.mb.time=+(S.t-F.mb.t0).toFixed(0);F.ev.push(['중간보스 승',T0(),F.mb.time+'초'])}});
 wrap('mbReturn',()=>F.ev.push(['복귀',T0()]));
 wrap('nextZone',()=>F.ev.push(['2구역',T0(),'Lv'+s.plv,L()]));
 wrap('bossStart',()=>{F.ev.push(['최종보스',T0(),'Lv'+s.plv,L()]);F.sw={t0:S.t,minE:1,d0:{...S.dmg}}});
 wrap('swTrans',()=>{if(F.sw&&!F.sw.ph2){F.sw.ph2=+(S.t-F.sw.t0).toFixed(0)}});
 wrap('dimOpen',()=>F.ev.push(['차원 열림',T0()]));
 wrap('ending',()=>{F.ev.push(['엔딩 선택',T0()]);F.endT=S.t;if(F.sw){F.sw.win=1;F.sw.time=+(S.t-F.sw.t0).toFixed(0)}});
 wrap('end',(a)=>F.ev.push(['끝',T0(),a]));
 const press=(dx,dy)=>{KB.LEFT.isDown=dx<-.3;KB.RIGHT.isDown=dx>.3;KB.UP.isDown=dy<-.3;KB.DOWN.isDown=dy>.3};
 const clr=()=>{for(const k of['LEFT','RIGHT','UP','DOWN','SPACE'])KB[k].isDown=false};
 // 장애물에 막히면 옆으로 비켜 간다 (bot.js와 같은 방식)
 const G2={h:[],side:0,sd:1};
 const go=(x,y,dz)=>{const p=s.pl;let dx=x-p.x,dy=y-p.y;const l=Math.hypot(dx,dy);if(l<(dz||6)){press(0,0);G2.h=[];return}
  if(G2.side>0){G2.side--;const an=Math.atan2(dy,dx)+Math.PI/2*G2.sd;dx=Math.cos(an);dy=Math.sin(an)}
  G2.h.push([p.x,p.y]);if(G2.h.length>40)G2.h.shift();if(G2.side<=0&&G2.h.length==40&&Math.hypot(p.x-G2.h[0][0],p.y-G2.h[0][1])<8){G2.side=30;G2.sd=Math.random()<.5?1:-1;G2.h=[];F.stuckN=(F.stuckN||0)+1}
  const q=Math.hypot(dx,dy)||1;press(dx/q,dy/q)};
 // 다른 방에 있는 목표 방으로 (bot.js와 같은 BFS)
 const D={N:[-1,0],S:[1,0],W:[0,-1],E:[0,1]};
 const nav=(tg)=>{const a=s.cur,Lv=s.lv;const dist=new Map([[tg,0]]),q=[tg];while(q.length){const r=q.shift();for(const k in D)if(r.d[k]){const b=Lv.at(r.r+D[k][0],r.c+D[k][1]);if(b&&!dist.has(b)){dist.set(b,dist.get(r)+1);q.push(b)}}}
  const opts=Object.keys(D).filter(k=>a.d[k]).map(k=>[k,Lv.at(a.r+D[k][0],a.c+D[k][1])]).sort((u,v)=>(dist.get(u[1])??99)-(dist.get(v[1])??99));if(!opts.length)return;const k=opts[0][0],t0=a.ct[k];
  if(t0=='hole'||t0=='rift'){const[hc,hr]=a.hp[k];go((hc+.5)*40,(hr+.5)*40,2)}else go({N:400,S:400,W:-40,E:840}[k],{N:-40,S:400,W:180,E:180}[k],2)};
 // ---- 중간 보스 (mbBot31) ----
 const mode='human';let bites=0;
 const segD=(px,py,x1,y1,x2,y2)=>{const ux=x2-x1,uy=y2-y1,L2=ux*ux+uy*uy||1,t=Math.max(0,Math.min(1,((px-x1)*ux+(py-y1)*uy)/L2));return Math.hypot(px-x1-ux*t,py-y1-uy*t)};
  const HU=mode=='human';const danger=(x,y,tt)=>{let D=0;const pl0=s.pl;for(const q of s.tel){if(HU){if(q._m===undefined)q._m=Math.random()<.15;if(q._m||q.t0-q.t<.3)continue}if(tt<Math.min(q.t,.5)-.06)continue;const Q=Object.assign({},q);if(Q.k=='c')Q.r+=14;else if(Q.k=='l')Q.w+=24;else if(Q.k=='s')Q.r+=16;if(s.telIn(Q,x,y))D+=q.dmg?10:6}
   for(const q of s.mbb)if(!q.ref){if(HU){if(q._m===undefined)q._m=Math.random()<.15;if(q._m||3-q.t<.25)continue}const bx=q.x+q.vx*tt,by=q.y+q.vy*tt;if(Math.hypot(x-bx,y-by)<22)D+=6}
   const blockRing=(m,x,y)=>{if(m.k!='atl'||!m.cs)return 0;const r0=Math.hypot((pl0.x-m.x)/m.RX,(pl0.y-m.y)/m.RY),r1=Math.hypot((x-m.x)/m.RX,(y-m.y)/m.RY);if((r0<1)!=(r1<1)){const a=Math.atan2((y-m.y)/m.RY,(x-m.x)/m.RX);if(!s.atlGap(m,a))return 1}return 0};
   for(const m of s.cur.en)if(m.on){
    if(m.k=='hcr'&&m.jw){for(const j of m.jw)if(Math.hypot(x-j.x,y-j.y)<(j.st=='ring'?30:36)*(1+.13*(m.gr||0)))D+=5;if((m.st=='inhale'||m.st=='inhaleW')&&Math.hypot(x-m.x,y-m.y)<150)D+=4}
    if(m.k=='atl'&&m.cs){if(blockRing(m,x,y))D+=6;if((m.st=='inhale'||m.st=='inhaleW')&&Math.hypot(x-m.x,y-m.y)<95)D+=5;if(m.po)for(const q of m.po)if(q.on&&(q.st=='aim'||q.st=='lunge')&&Math.hypot(x-q.x,y-q.y)<30)D+=3}
    if(m.k=='obs'&&m.ga!==undefined){const ta=Math.atan2(y-m.y,x-m.x);if(m.st=='watch'&&Math.abs(Phaser.Math.Angle.Wrap(ta-m.ga))<.36&&!m.pt.some(q=>{const ux=x-m.x,uy=y-m.y,L2=ux*ux+uy*uy||1,t=Math.max(0,Math.min(1,((q.x-m.x)*ux+(q.y-m.y)*uy)/L2));return Math.hypot(q.x-m.x-ux*t,q.y-m.y-uy*t)<20&&t>.05&&t<.97}))D+=m.gz>3?3:1;
     if(m.st=='sweep'||m.st=='sweepW'){const a=m.ga+(m.st=='sweep'?m.sd*.6*(tt+.15):0),L=s.obsBeam(m,a);if(segD(x,y,m.x,m.y,m.x+Math.cos(a)*L,m.y+Math.sin(a)*L)<26)D+=8}}
    if(m.k=='kzb'){if((m.st=='leap'||m.st=='pounce'||m.st=='leapW'||m.st=='pounceW')&&segD(x,y,m.x,m.y,m.tx,m.ty)<48)D+=10;if(m.st!='rest'&&Math.hypot(x-m.x,y-m.y)<56)D+=3}
    if(m.k=='rkb'&&m.st=='under'&&Math.hypot(x-m.x,y-m.y)<70)D+=4;
    if(m.k=='qnb'&&m.cg){const C2=m.cg,pd=Math.hypot(x-C2.x,(y-C2.y)/.6),pa=Math.atan2((y-C2.y)/.6,x-C2.x);if(Math.abs(pd-74)<16&&Math.abs(Phaser.Math.Angle.Wrap(pa-C2.gap))>.5)D+=8;if(C2.t<.5&&pd<80)D+=4}
    if(m.k=='wdb'){const lx=m.x+Math.cos(m.fa)*50,ly=m.y+Math.sin(m.fa)*50;const beams=m.st=='sweep'||m.st=='sweepW'?(m.hp<m.mh*.35?5:3):m.st=='focusW'?1:0;
     for(let i=0;i<beams;i++){const a=(m.st=='focusW'?m.fa:m.fa+(m.st=='sweep'?m.sd*.55*(tt+.15):0)+(i-(beams-1)/2)*.42);let L=10;for(;L<700;L+=10){const bx=lx+Math.cos(a)*L,by=ly+Math.sin(a)*L;if(s.blk(bx,by,18)||bx<24||bx>776||by<24||by>336)break}if(segD(x,y,lx,ly,lx+Math.cos(a)*L,ly+Math.sin(a)*L)<24)D+=8}
     if(m.st=='flare'&&s.mbLos(m.x,m.y,x,y))D+=7;if(Math.hypot(x-m.x,y-m.y)<70)D+=3}}
   return D};
 const mbTick=()=>{const pl=s.pl;if(F.mb)F.mb.minE=Math.min(F.mb.minE,s.en/s.emax);
   const ens=s.cur.en.filter(m=>m.on);let goal=null,bite=false,rb=false,turnTo=0;const fx=Math.cos(s.ang),fy=Math.sin(s.ang);
   const food=s.cur.food.filter(f=>f.on&&f.spr);
   if(s.en<s.emax*.35&&food.length){const f=food.sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0];goal=[f.x,f.y];s.eat=Math.hypot(f.x-pl.x,f.y-pl.y)<40?{isDown:true}:null}
   else{s.eat=null;
    // 목표 고르기
    const B=ens[0];let T2=null;
    if(B&&B.k=='hcr'){if(!B.gone)T2={x:B.x,y:B.y,r:C.BITE.range+40};else{let ax,ay;if(B.st=='inhale'||B.st=='inhaleW'){const a=Math.atan2(pl.y-B.y,pl.x-B.x);ax=B.x+Math.cos(a)*230;ay=B.y+Math.sin(a)*150}else{const lv=food.sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0];if(lv&&Math.hypot(lv.x-B.x,lv.y-B.y)>120){ax=lv.x;ay=lv.y;if(Math.hypot(lv.x-pl.x,lv.y-pl.y)<40)s.eat={isDown:true}}else{const a=Math.atan2(pl.y-B.y,pl.x-B.x);ax=B.x+Math.cos(a)*170;ay=B.y+Math.sin(a)*120}}goal=[ax,ay]}}
    if(B&&B.k=='atl'&&B.cs){const rr=Math.hypot((pl.x-B.x)/B.RX,(pl.y-B.y)/B.RY);if(rr<1){if(B.st=='inhale'||B.st=='inhaleW'){const gs0=B.gp.concat(B.cg),pa0=Math.atan2((pl.y-B.y)/B.RY,(pl.x-B.x)/B.RX),g0=gs0.sort((a,c)=>Math.abs(Phaser.Math.Angle.Wrap(a.a-pa0))-Math.abs(Phaser.Math.Angle.Wrap(c.a-pa0)))[0];goal=[B.x+Math.cos(g0.a)*B.RX*1.3,B.y+Math.sin(g0.a)*B.RY*1.3]}else T2={x:B.x,y:B.y,r:C.BITE.range+30}}
     if(!T2&&!goal){const gs=B.gp.concat(B.cg),pa=Math.atan2((pl.y-B.y)/B.RY,(pl.x-B.x)/B.RX);const gg=gs.sort((a,c)=>Math.abs(Phaser.Math.Angle.Wrap(a.a-pa))-Math.abs(Phaser.Math.Angle.Wrap(c.a-pa)))[0];
      const near=B.po&&B.po.find(q=>q.on&&Math.hypot(q.x-pl.x,q.y-pl.y)<C.BITE.range+20);if(near)T2={x:near.x,y:near.y,r:C.BITE.range+12};
      else if(rr>=1&&(B.st=='inhale'||B.st=='inhaleW')){const a=Math.atan2(pl.y-B.y,pl.x-B.x);goal=[B.x+Math.cos(a)*B.RX*1.6,B.y+Math.sin(a)*B.RY*1.6]}
      else if(rr>=1){const ox=B.x+Math.cos(gg.a)*B.RX*1.2,oy=B.y+Math.sin(gg.a)*B.RY*1.2;if(Math.hypot(ox-pl.x,oy-pl.y)<26||rr<1.25&&Math.abs(Phaser.Math.Angle.Wrap(gg.a-pa))<gg.w/2-.05)goal=[B.x+Math.cos(gg.a)*B.RX*.55,B.y+Math.sin(gg.a)*B.RY*.55];else{const a2=pa+Math.sign(Phaser.Math.Angle.Wrap(gg.a-pa))*.35;goal=Math.abs(Phaser.Math.Angle.Wrap(gg.a-pa))<.4?[ox,oy]:[B.x+Math.cos(a2)*B.RX*1.25,B.y+Math.sin(a2)*B.RY*1.25]}}}}
    if(B&&B.k=='obs'&&B.ey){if(!B.gone)T2={x:B.x,y:B.y,r:C.BITE.range+40};else{const oe=B.ey.filter(q=>q.open).sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0];if(oe)T2={x:oe.x,y:oe.y,r:C.BITE.range+16};else{const q=B.pt.slice().sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0],a=Math.atan2(q.y-B.y,q.x-B.x);goal=[q.x+Math.cos(a)*34,q.y+Math.sin(a)*34]}}}
    if(T2){const ex=T2.x-pl.x,ey=T2.y-pl.y,ed=Math.hypot(ex,ey)||1;if(ed<T2.r-4&&(ex*fx+ey*fy)/ed>.35){bite=true;goal=[pl.x,pl.y]}else if(ed<T2.r+30){goal=[T2.x,T2.y];turnTo=1}else goal=[T2.x,T2.y]}
    let tg=(T2||goal||(B&&B.k=='atl'))?null:ens.filter(m=>!m.gone).sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0]||ens[0];
    if(tg){let ax=tg.x,ay=tg.y,R=40+(tg.br||0);
     if(tg.k=='qnb'){const arm=(tg.pl||[]).some(q=>q.on);if(arm){ax=tg.x;ay=tg.y+150;R=0}else{ax=tg.x;ay=tg.y+40;R=60}if(tg.cg&&(mode=='dodge'||mode=='human')){const C2=tg.cg,pd=Math.hypot(pl.x-C2.x,(pl.y-C2.y)/.6);if(pd<84){ax=C2.x+Math.cos(C2.gap)*110;ay=C2.y+Math.sin(C2.gap)*70;R=0}}
      for(const q of s.mbb)if(!q.ref&&q.k=='spk'){const dx=q.x-pl.x,dy=q.y-pl.y,d=Math.hypot(dx,dy);if(d<C.BITE.range+10&&(dx*fx+dy*fy)/(d||1)>0)rb=true}}
     if(tg.k=='wdb'&&tg.st=='cool'){ax=tg.x;ay=tg.y;R=60}else if(tg.k=='wdb'){const sd=Phaser.Math.Angle.Wrap(Math.atan2(pl.y-tg.y,pl.x-tg.x)-tg.fa)>0?1:-1,ba=tg.fa+sd*2.3;ax=tg.x+Math.cos(ba)*85;ay=tg.y+Math.sin(ba)*85;R=0;if(tg.st=='flare'&&(mode=='dodge'||mode=='human')){const pil=s.cur.obs.map(o=>[(o[0]+.5)*40,(o[1]+.5)*40]).sort((a,c)=>Math.hypot(a[0]-pl.x,a[1]-pl.y)-Math.hypot(c[0]-pl.x,c[1]-pl.y))[0];const a=Math.atan2(pil[1]-tg.y,pil[0]-tg.x);ax=pil[0]+Math.cos(a)*40;ay=pil[1]+Math.sin(a)*40}}
     if(tg.k=='kzb'&&(mode=='dodge'||mode=='human')&&tg.st!='rest'){const bs=(s.cur.zn||[]).map(z=>[(z[0]+.5)*40,(z[1]+.5)*40]).sort((a,c)=>Math.hypot(a[0]-tg.x,a[1]-tg.y)-Math.hypot(c[0]-tg.x,c[1]-tg.y))[0];if(bs&&!s.mbBushNear(pl.x,pl.y,120)){ax=(bs[0]*2+tg.x)/3;ay=(bs[1]*2+tg.y)/3;R=0}}
     const dx=ax-pl.x,dy=ay-pl.y,d=Math.hypot(dx,dy)||1;goal=R?[ax-dx/d*R,ay-dy/d*R]:[ax,ay];if(tg.k=='qnb'&&(tg.pl||[]).some(q=>q.on)&&d<16){const qa=Math.atan2(tg.y-pl.y,tg.x-pl.x);if(Math.cos(qa)*fx+Math.sin(qa)*fy<.8){goal=[tg.x,tg.y];turnTo=1}}
     const front=tg.k=='wdb'&&tg.st!='cool'&&Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(pl.y-tg.y,pl.x-tg.x)-tg.fa))<1.0&&(mode=='dodge'||mode=='human');if(!tg.gone&&!front){const ex=tg.x-pl.x,ey=tg.y-pl.y,ed=Math.hypot(ex,ey)||1;if(ed<C.BITE.range+(tg.br||0)-4&&(ex*fx+ey*fy)/ed>.4)bite=true;else if(ed<C.BITE.range+(tg.br||0)-4){goal=[tg.x,tg.y];turnTo=1}else if(ed<C.BITE.range+(tg.br||0)+30&&!bite&&!(tg.k=='wdb'&&tg.st=='flare'&&(mode=='dodge'||mode=='human'))){goal=[tg.x,tg.y]}}}}
   let mv=null;
   if(goal){const gx=Phaser.Math.Clamp(goal[0],66,734),gy=Phaser.Math.Clamp(goal[1],66,300);
    if((mode=='dodge'||mode=='human')){const sp=s.spd*40;let best=null,bs=1e9;const gl=Math.hypot(gx-pl.x,gy-pl.y)||1,CC=[];for(let k=0;k<16;k++){const a=k/16*6.283;CC.push([Math.cos(a),Math.sin(a)])}CC.push([0,0]);CC.push([(gx-pl.x)/gl,(gy-pl.y)/gl]);
     let Dg=0;CC.forEach(([ux,uy],k)=>{let D=0,x=pl.x,y=pl.y;const L=k==17?Math.min(1,gl/(sp*.5)):1;
      for(let j=1;j<=5;j++){x=Phaser.Math.Clamp(pl.x+ux*sp*j*.1*L,66,734);y=Phaser.Math.Clamp(pl.y+uy*sp*j*.1*L,66,300);if(s.blk(x,y,26))D+=2;D+=danger(x,y,j*.1)*(1.4-j*.15)}
      if(k==17)Dg=D;const sc=D*1000+Math.hypot(gx-x,gy-y);if(sc<bs){bs=sc;best=[pl.x+ux*60,pl.y+uy*60]}});
     if(Dg>0){mv=best;bite=bite&&danger(pl.x,pl.y,.1)==0}else mv=[gx,gy]}
    else mv=[gx,gy]}
   if(turnTo&&goal&&danger(pl.x,pl.y,.1)==0&&danger(pl.x,pl.y,.5)==0)mv=goal;if(mv){const dx=mv[0]-pl.x,dy=mv[1]-pl.y,l=Math.hypot(dx,dy);if(l>7||turnTo)press(dx/l,dy/l);else press(0,0)}else press(0,0);
   if((bite||rb)&&s.bcd<=0){s.req=1;bites++}
 };
 // ---- 최종 보스 (swBot human) ----
 const W={lag:[],oops:0};
 const swTick=()=>{const m=s.swOn,pl=s.pl;if(!m)return;if(F.sw)F.sw.minE=Math.min(F.sw.minE,s.en/s.emax);
  let gx=m.x,gy=m.y,want=m.ex?8:150;const food=s.cur.food.filter(f=>f.on&&f.spr).sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0];
  if(food&&(s.en<s.emax*.55||(!m.ex&&Math.hypot(food.x-pl.x,food.y-pl.y)<120))){gx=food.x;gy=food.y;want=0}
  const score=(x,y)=>Math.abs(Math.hypot(x-gx,y-gy)-want);let best=null,bs=1e9;
  for(let i=0;i<=16;i++){const a=i/16*6.283,st=i==16?0:1;for(const Lq of st?[28,56]:[0]){const x=Phaser.Math.Clamp(pl.x+Math.cos(a)*Lq,50,750),y=Phaser.Math.Clamp(pl.y+Math.sin(a)*Lq,50,310);let sc=score(x,y);if(s.swDanger(x,y)||s.swDanger((x+pl.x)/2,(y+pl.y)/2))sc+=5000;if(sc<bs){bs=sc;best=[x,y,a,st]}}}
  if(bs>=5000){let fb=null,fd=1e9;for(let k=0;k<48;k++){const a=k/48*6.283*3.7,Lq=40+(k%6)*36,x=Phaser.Math.Clamp(pl.x+Math.cos(a)*Lq,50,750),y=Phaser.Math.Clamp(pl.y+Math.sin(a)*Lq,50,310);if(!s.swDanger(x,y)&&Lq<fd){fd=Lq;fb=[x,y]}}if(fb)best=[fb[0],fb[1],Math.atan2(fb[1]-pl.y,fb[0]-pl.x),1]}
  let dx=0,dy=0;if(best&&best[3]){dx=Math.cos(best[2]);dy=Math.sin(best[2])}if(Math.hypot(gx-pl.x,gy-pl.y)<8&&!s.swDanger(pl.x,pl.y)){dx=0;dy=0}
  W.lag.push([dx,dy]);const q=W.lag.length>15?W.lag.shift():[0,0];dx=q[0];dy=q[1];if(Math.random()<.002)W.oops=30;if(W.oops>0){W.oops--;dx=Math.cos(S.t);dy=Math.sin(S.t)}
  press(dx,dy);const nearF=food&&Math.hypot(food.x-pl.x,food.y-pl.y)<30;KB.SPACE.isDown=!!nearF;
  if(!nearF&&m.ex&&Math.hypot(m.x-pl.x,m.y-pl.y)<70&&s.bcd<=0){s.ang=Math.atan2(m.y-pl.y,m.x-pl.x);s.req=1}
  else if(!nearF&&s.lin.v>=2&&!m.gone&&Math.hypot(m.x-pl.x,m.y-pl.y)<190&&s.bcd<=0&&(s.spitCd||0)<=0)s.req=1};
 // ---- 매 프레임: bot.js 다음에 돈다 ----
 s.sys.events.on('preupdate',()=>{
  if(s.over){if(F.endT!=null&&!F.chose&&(F.endN=(F.endN||0)+1)>4){const lb=opt.endPick||'공허에 남는다',b=s.children.list.find(o=>o.type=='Text'&&o.text==lb&&o.input);if(b){F.chose=lb;b.emit('pointerdown')}}return}
  if(s.cine||s.tr||s.molt)return;
  if(s.swOn){S.on=false;clr();swTick();return}
  if(s.mbOn){S.on=false;clr();if(s.mbRO)go(400,200);else{s.eat=null;mbTick()}return}
  const Q=s.mq;if(Q&&Q.st=='open'&&!s.boss&&Q.room){if(F.qT==null)F.qT=S.t;S.on=false;clr();if(s.cur===Q.room&&Q.x!=null)go(Q.x,Q.y,4);else nav(Q.room);return}
  S.on=true});
};
