// 사용법: node mbBot.js 판수 레벨 퀘스트(p|c|v) 모드(tank|dodge)
const {chromium}=require('playwright');
const runs=+process.argv[2]||3,plv=+process.argv[3]||8,K=process.argv[4]||'p',mode=process.argv[5]||'dodge',LIN=process.argv[6]||'';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const res=[];
for(let r=0;r<runs;r++){const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
 await p.addInitScript(seed=>{window.__vpNoTree=1;let a=seed*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},r+31);
 await p.goto('file:///home/claude/play/'+(process.env.GF||'game.html')+'');await p.waitForTimeout(900);
 const out=await p.evaluate(([plv,K,mode,LIN])=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=plv;
  s.lin={p:K=='p'?3:1,c:K=='c'?3:1,v:K=='v'?3:K=='p'?1:0};if(K=='c')s.lin.p=1;if(LIN)s.lin={p:+LIN[1],c:+LIN[3],v:+LIN[5]};s.zi=2;s.molts=s.lin.p+s.lin.c+s.lin.v;s.recalc();s.en=s.emax;s.mqStart(K);s.mbEnter();window.__st={};if(s.hcrAI){const ai=s.hcrAI.bind(s);s.hcrAI=function(m,dt,p){const st0=m.st,h0=m.hp;ai(m,dt,p);if(m.st!==st0)__st[m.st]=(__st[m.st]||0)+1;if(m.hp>h0+.5)__st.heal=(__st.heal||0)+Math.round(m.hp-h0)}}
  window.__gst={};if(s.obsN2){const oa=s.obsN2.bind(s);s.obsN2=function(m,dt,p){const a=m.st;const r=oa(m,dt,p);if(m.st!==a)__gst[m.st]=(__gst[m.st]||0)+1;return r}}if(s.gdkAI){const ga=s.gdkAI.bind(s);s.gdkAI=function(m,dt,p){const a=m.st;ga(m,dt,p);if(m.st!==a)__gst[m.st]=(__gst[m.st]||0)+1}};const dmg={};const h0=s.hurt.bind(s);s.hurt=function(d,src,m){const e0=this.en;h0(d,src,m);const l=e0-this.en;if(l>0)dmg[src]=(dmg[src]||0)+Math.round(l)};
  let T=G.loop.time||performance.now();G.loop.sleep();s.tweens.getDelta=function(){return 16.667*this.timeScale};const dt=1000/60,KB=s.k;
  const press=(dx,dy)=>{KB.LEFT.isDown=dx<-.3;KB.RIGHT.isDown=dx>.3;KB.UP.isDown=dy<-.3;KB.DOWN.isDown=dy>.3};
  const segD=(px,py,x1,y1,x2,y2)=>{const ux=x2-x1,uy=y2-y1,L2=ux*ux+uy*uy||1,t=Math.max(0,Math.min(1,((px-x1)*ux+(py-y1)*uy)/L2));return Math.hypot(px-x1-ux*t,py-y1-uy*t)};
  const HU=mode=='human';const GB=()=>s.cur.en.find(m=>m.k=='gdk'&&m.on);const pilBlock=(q,x,y)=>{const m=GB();if(!m||!m.pt)return false;return m.pt.some(P=>{if(!P.on)return false;const ux=x-q.x,uy=y-q.y,L2=ux*ux+uy*uy||1,t=((P.x-q.x)*ux+(P.y-q.y)*uy)/L2;return t>0&&t<1&&Math.hypot(P.x-q.x-ux*t,P.y-q.y-uy*t)<34})};const danger=(x,y,tt)=>{let D=0;const pl0=s.pl;for(const q of s.tel){if(q.ch&&pilBlock(q,x,y))continue;if(HU){if(q._m===undefined)q._m=Math.random()<.15;if(q._m||q.t0-q.t<.3)continue}if(tt<Math.min(q.t,.5)-.06)continue;const Q=Object.assign({},q);if(Q.k=='c')Q.r+=14;else if(Q.k=='l')Q.w+=24;else if(Q.k=='s')Q.r+=16;if(s.telIn(Q,x,y))D+=q.dmg?10:6}
   for(const q of s.mbb)if(!q.ref){if(HU){if(q._m===undefined)q._m=Math.random()<.15;if(q._m||3-q.t<.25)continue}const bx=q.x+q.vx*tt,by=q.y+q.vy*tt;if(Math.hypot(x-bx,y-by)<22)D+=6}
   const blockRing=(m,x,y)=>{if(m.k!='atl'||!m.cs)return 0;const r0=Math.hypot((pl0.x-m.x)/m.RX,(pl0.y-m.y)/m.RY),r1=Math.hypot((x-m.x)/m.RX,(y-m.y)/m.RY);if((r0<1)!=(r1<1)){const a=Math.atan2((y-m.y)/m.RY,(x-m.x)/m.RX);if(!s.atlGap(m,a))return 1}return 0};
   for(const m of s.cur.en)if(m.on){
    if(m.k=='obs'&&m.ph==2){const o=s.obsNOff(m);if((m.st=='hide'||m.st=='hideW')&&Math.hypot(x-o.ax,y-o.ay)<90)D+=6;if(m.st=='sweep'||m.st=='sweepW'){const a=m.ga+(m.st=='sweep'?m.sd*.75*(tt+.15):0),L=s.obsNBeam(m,o,a);if(segD(x,y,o.ex,o.ey,o.ex+Math.cos(a)*L,o.ey+Math.sin(a)*L)<26)D+=8}}
    if(m.k=='gdk'){const b=m.ball;if(b&&b.st=='roll'){const bx=b.x+b.vx*b.spd*tt,by=b.y+b.vy*b.spd*tt;if(Math.hypot(x-bx,y-by)<44)D+=8}if(m.st=='ch'&&Math.hypot(x-m.x-m.cdx*560*tt,y-m.y-m.cdy*560*tt)<64)D+=8}
    if(m.k=='hcr'&&m.jw){for(const j of m.jw)if(Math.hypot(x-j.x,y-j.y)<(j.st=='ring'?30:36)*(1+.13*(m.gr||0)))D+=5;if((m.st=='inhale'||m.st=='inhaleW')&&Math.hypot(x-m.x,y-m.y)<150)D+=4}
    if(m.k=='atl'&&m.cs){if(blockRing(m,x,y))D+=6;if((m.st=='inhale'||m.st=='inhaleW')&&Math.hypot(x-m.x,y-m.y)<95)D+=5;if(m.po)for(const q of m.po)if(q.on&&(q.st=='aim'||q.st=='lunge')&&Math.hypot(x-q.x,y-q.y)<30)D+=3}
    if(m.k=='obs'&&m.ga!==undefined&&m.ph!=2){const ta=Math.atan2(y-m.y,x-m.x);if(m.st=='watch'&&Math.abs(Phaser.Math.Angle.Wrap(ta-m.ga))<.36&&!m.pt.some(q=>{const ux=x-m.x,uy=y-m.y,L2=ux*ux+uy*uy||1,t=Math.max(0,Math.min(1,((q.x-m.x)*ux+(q.y-m.y)*uy)/L2));return Math.hypot(q.x-m.x-ux*t,q.y-m.y-uy*t)<20&&t>.05&&t<.97}))D+=m.gz>3?3:1;
     if(m.st=='sweep'||m.st=='sweepW'){const a=m.ga+(m.st=='sweep'?m.sd*.6*(tt+.15):0),L=s.obsBeam(m,a);if(segD(x,y,m.x,m.y,m.x+Math.cos(a)*L,m.y+Math.sin(a)*L)<26)D+=8}}
    if(m.k=='kzb'){if((m.st=='leap'||m.st=='pounce'||m.st=='leapW'||m.st=='pounceW')&&segD(x,y,m.x,m.y,m.tx,m.ty)<48)D+=10;if(m.st!='rest'&&Math.hypot(x-m.x,y-m.y)<56)D+=3}
    if(m.k=='rkb'&&m.st=='under'&&Math.hypot(x-m.x,y-m.y)<70)D+=4;
    if(m.k=='qnb'&&m.cg){const C2=m.cg,pd=Math.hypot(x-C2.x,(y-C2.y)/.6),pa=Math.atan2((y-C2.y)/.6,x-C2.x);if(Math.abs(pd-74)<16&&Math.abs(Phaser.Math.Angle.Wrap(pa-C2.gap))>.5)D+=8;if(C2.t<.5&&pd<80)D+=4}
    if(m.k=='wdb'){const lx=m.x+Math.cos(m.fa)*50,ly=m.y+Math.sin(m.fa)*50;const beams=m.st=='sweep'||m.st=='sweepW'?(m.hp<m.mh*.35?5:3):m.st=='focusW'?1:0;
     for(let i=0;i<beams;i++){const a=(m.st=='focusW'?m.fa:m.fa+(m.st=='sweep'?m.sd*.55*(tt+.15):0)+(i-(beams-1)/2)*.42);let L=10;for(;L<700;L+=10){const bx=lx+Math.cos(a)*L,by=ly+Math.sin(a)*L;if(s.blk(bx,by,18)||bx<24||bx>776||by<24||by>336)break}if(segD(x,y,lx,ly,lx+Math.cos(a)*L,ly+Math.sin(a)*L)<24)D+=8}
     if(m.st=='flare'&&s.mbLos(m.x,m.y,x,y))D+=7;if(Math.hypot(x-m.x,y-m.y)<70)D+=3}}
   return D};
  let t=0,minE=999,bites=0;const hist=[];
  for(let i=0;i<60*240;i++){T+=dt;t+=dt/1000;const pl=s.pl;if(s.over)break;if(!s.mbOn||s.mbRO)break;minE=Math.min(minE,s.en);
   if(s.cine){G.scene.update(T,dt);continue}
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
    if(B&&B.k=='gdk'&&B.pt){if(B.st=='stun'||(B.ph==2&&B.st!='chW'&&B.st!='ch'&&B.st!='thW'))T2={x:B.x,y:B.y,r:C.BITE.range+B.br-6};else{const ps=B.pt.filter(q=>q.on).sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y));const q=ps[0];if(q){const dx=q.x-B.x,dy=q.y-B.y,dd=Math.hypot(dx,dy)||1;goal=[q.x+dx/dd*44,q.y+dy/dd*40]}else T2={x:B.x,y:B.y,r:C.BITE.range+B.br-6}}}
    if(B&&B.k=='obs'&&B.ph==2){const o=s.obsNOff(B);if(B.st=='hide'||B.st=='hideW'){const a=Math.atan2(pl.y-o.ay,pl.x-o.ax);goal=[o.ax+Math.cos(a)*260,o.ay+Math.sin(a)*200]}else if(B.st=='grab'&&B.tn&&B.tn.some(q=>q.on)){const q=B.tn.filter(q=>q.on).map(q=>({x:o.ax+(q.x-o.ax)*.75,y:o.ay+(q.y-o.ay)*.75})).sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0];T2={x:q.x,y:q.y,r:C.BITE.range+4,mel:1}}else if(B.st!='rev')T2={x:B.x,y:B.y,r:C.BITE.range+B.br-6};else goal=[pl.x,pl.y]}
    else if(B&&B.k=='obs'&&B.ey){if(!B.gone)T2={x:B.x,y:B.y,r:C.BITE.range+40};else{const oe=B.ey.filter(q=>q.open).sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0];if(oe)T2={x:oe.x,y:oe.y,r:C.BITE.range+16,mel:1};else{const q=B.pt.slice().sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0],a=Math.atan2(q.y-B.y,q.x-B.x);goal=[q.x+Math.cos(a)*34,q.y+Math.sin(a)*34]}}}
    if(T2&&s.domK()=='v'&&!T2.mel&&B&&B.k=='obs'&&B.ph==2){T2.r=Math.max(T2.r,190);if(B.st!='grab'){const o=s.obsNOff(B);T2.x=o.ex;T2.y=o.ey}}
    if(T2){const ex=T2.x-pl.x,ey=T2.y-pl.y,ed=Math.hypot(ex,ey)||1;if(ed<T2.r-4&&(ex*fx+ey*fy)/ed>.35){bite=true;goal=[pl.x,pl.y]}else if(ed<T2.r+30){goal=[T2.x,T2.y];turnTo=1}else goal=[T2.x,T2.y]}
    let tg=(T2||goal||(B&&(B.k=='atl'||B.k=='gdk')))?null:ens.filter(m=>!m.gone).sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0]||ens[0];
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
      for(let j=1;j<=5;j++){x=Phaser.Math.Clamp(pl.x+ux*sp*j*.1*L,66,734);y=Phaser.Math.Clamp(pl.y+uy*sp*j*.1*L,66,300);if(s.blk(x,y,26))D+=2;{const gm=GB();if(gm&&gm.pt&&gm.pt.some(P=>P.on&&Math.hypot(P.x-x,P.y-y)<32))D+=2}D+=danger(x,y,j*.1)*(1.4-j*.15)}
      if(k==17)Dg=D;const sc=D*1000+Math.hypot(gx-x,gy-y);if(sc<bs){bs=sc;best=[pl.x+ux*60,pl.y+uy*60]}});
     if(Dg>0){mv=best;bite=bite&&danger(pl.x,pl.y,.1)==0}else mv=[gx,gy]}
    else mv=[gx,gy]}
   if(turnTo&&goal&&danger(pl.x,pl.y,.1)==0&&danger(pl.x,pl.y,.5)==0)mv=goal;if(mv){const dx=mv[0]-pl.x,dy=mv[1]-pl.y,l=Math.hypot(dx,dy);if(l>7||turnTo)press(dx/l,dy/l);else press(0,0)}else press(0,0);
   if((bite||rb)&&s.bcd<=0){s.req=1;bites++}
   G.scene.update(T,dt)}
  return {win:!!s.mbRO,st:window.__gst&&Object.keys(window.__gst).length?window.__gst:window.__st,dead:s.over,time:+t.toFixed(1),hp:s.cur.en.map(m=>m.k+':'+Math.round(Math.max(0,m.hp))+'/'+m.mh).join(' '),minE:Math.round(minE),emax:s.emax,bdmg:+s.bdmg.toFixed(1),dmg,bites,lin:Object.entries(s.lin).map(([a,b])=>a+b).join('')}},[plv,K,mode,LIN]);
 out.errors=errs.slice(0,3);res.push(out);await p.close()}
for(const r of res)console.log(JSON.stringify(r));
console.log(K,mode,plv,'WIN',res.filter(r=>r.win).length+'/'+res.length,'avgTime',(res.reduce((a,r)=>a+r.time,0)/res.length).toFixed(1));await b.close()})();
