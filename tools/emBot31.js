// 사용법: node emBot31.js 판수 레벨 계통(p3c1v0) 모드(tank|dodge) 특수스킬(p|c|v|-) 추가XP
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const SK=process.argv[6]||'-',XP=+process.argv[7]||0,P2=false,runs=+process.argv[2]||4,plv=+process.argv[3]||8,lin=process.argv[4]||'p2c1v0',mode=process.argv[5]||'dodge';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const res=[];
for(let r=0;r<runs;r++){const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
 await p.addInitScript(seed=>{window.__vpNoTree=1;let a=seed*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},r+11);
 await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(900);
 const out=await p.evaluate(([plv,lin,mode,P2,SK,XP])=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=plv;const L={p:+lin[1],c:+lin[3],v:+lin[5]};s.lin=L;s.molts=L.p+L.c+L.v;s.zi=2;s.recalc();if(XP)s.gainXp(XP);if(SK!='-'){s.skl=SK;s.skCd=0}s.recalc();s.en=s.emax;const lv0=s.plv;s.bossStart();let sku=0;
  const dmg={};const h0=s.hurt.bind(s);s.hurt=function(d,src,m){const e0=this.en;h0(d,src,m);const l=e0-this.en;if(l>0)dmg[src]=(dmg[src]||0)+Math.round(l)};
  let T=G.loop.time||performance.now();G.loop.sleep();s.tweens.getDelta=function(){return 16.667*this.timeScale};const dt=1000/60,K=s.k;
  const press=(dx,dy)=>{K.LEFT.isDown=dx<-.3;K.RIGHT.isDown=dx>.3;K.UP.isDown=dy<-.3;K.DOWN.isDown=dy>.3};
  const HU=mode=='human';let ps=null,sT=0,sM=false,tNow=0;
  const bul=(x,y,tt)=>{let D=0;const rx=800-x,mir=s.emMir;for(const q of s.emb){if(HU){if(q._m===undefined)q._m=Math.random()<.15;if(q._m||4-q.t<.25)continue}const bx=q.x+q.vx*tt,by=q.y+q.vy*tt;if(Math.hypot(x-bx,y-by)<21||(mir&&Math.hypot(rx-bx,y-by)<21))D+=6}return D};
  const danger=(x,y,tt)=>{const m=s.cur.en[0];if(!m||!m.on)return 0;let D=0;if(HU&&(tNow-sT<.3||sM)&&m.st!='surge'&&m.st!='inhale'&&m.st!='hover'&&m.st!='swim')return HU&&m.ph==2?bul(x,y,tt):0;const rx=800-x,mir=s.emMir,both=f=>f(x,y)||(mir&&f(rx,y));
   if(m.ph==1){if((m.st=='surgeW'||m.st=='surge')&&m.ln){const l=m.ln,g=22;if(x>l.x0-g&&x<l.x0+l.w+g&&y>l.y0-g&&y<l.y0+l.h+g)D+=10}
    if(m.st=='tailW'&&m.tl){const T=m.tl,ux=T.x1-T.x0,uy=T.y1-T.y0,LL=Math.hypot(ux,uy),t=((x-T.x0)*ux+(y-T.y0)*uy)/(LL*LL),q=Math.abs((x-T.x0)*uy-(y-T.y0)*ux)/LL;if(t>-.08&&t<1.08&&q<T.w/2+22)D+=10}
    if(m.st=='spike')for(const q of m.spk)if(q.t>0&&((x-q.x)/50)**2+((y-q.y)/36)**2<1)D+=8;
    if(m.st=='breach'&&m.tm<.55&&((x-m.x)/80)**2+((y-m.hy-60)/42)**2<1)D+=8}
   else{D+=bul(x,y,tt);
    if(m.st=='inhaleW'||m.st=='inhale'){if(((x-m.x)/170)**2+((y-m.y-20)/120)**2<1)D+=10;if(mir&&((rx-m.x)/124)**2+((y-m.y-20)/84)**2<1)D+=6}
    if(m.st=='masks')for(const q of m.mk)if(q.t>0&&q.t<tt+.5&&both((a,c)=>Math.hypot(a-q.x,c-q.y)<38))D+=8;
    if(((x-m.x)/128)**2+((y-m.y-6)/58)**2<1)D+=5;if(m.st=='flipW'&&((rx-m.x)/150)**2+((y-m.y-20)/110)**2<1)D+=4}
   return D};
  let t=0,bites=0,mhit=0,ph2=null,minE=999,lastHp=0;const ph={};
  for(let i=0;i<60*300;i++){T+=dt;t+=dt/1000;const m=s.cur.en[0],pl=s.pl;if(s.over)break;tNow=t;if(m.st!==ps){ps=m.st;sT=t;sM=HU&&Math.random()<.15}minE=Math.min(minE,s.en);
   if(s.cine){G.scene.update(T,dt);continue}if(P2&&m.ph==1&&m.st=='swim'&&!m.p2s){m.p2s=1;m.hp=m.mh*.5}
   let goal=null,bite=false;
   if(m.on){ph[m.ph+':'+m.st]=(ph[m.ph+':'+m.st]||0)+dt/1000;if(m.ph==2&&ph2==null)ph2=t;
    const fx=Math.cos(s.ang),fy=Math.sin(s.ang);
    const food=s.cur.food.filter(f=>f.on&&f.spr);
    if(s.en<s.emax*.4&&food.length){const f=food.sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0];goal=[f.x,f.y];if(Math.hypot(f.x-pl.x,f.y-pl.y)<40)s.eat={isDown:true}}
    else{s.eat=null;
     if(m.ph==1){if(m.st=='breach'&&!m.gone){goal=[m.x,m.hy+64];const dx=m.x-pl.x,dy=m.hy-pl.y,d=Math.hypot(dx,dy);if(d<96&&(dx*fx+dy*fy)/d>.35)bite=true}
      else goal=[Phaser.Math.Clamp(m.x,120,680),Math.min(292,m.y+150)]}
     else{goal=[800-m.x,m.y+74];const rx=800-pl.x,dx=m.x-rx,dy=m.y+10-pl.y,d=Math.hypot(dx,dy);if(d<102&&(dx*(-fx)+dy*fy)/d>.3)bite=true}}}
   let mv=null;
   if(goal){const gx=Phaser.Math.Clamp(goal[0],70,730),gy=Phaser.Math.Clamp(goal[1],70,300);
    if(mode=='dodge'||mode=='human'){const sp=s.spd*40;let best=null,bs=1e9;const gl=Math.hypot(gx-pl.x,gy-pl.y)||1,C=[];for(let k=0;k<16;k++){const a=k/16*6.283;C.push([Math.cos(a),Math.sin(a)])}C.push([0,0]);C.push([(gx-pl.x)/gl,(gy-pl.y)/gl]);
     let Dg=0;C.forEach(([ux,uy],k)=>{let D=0,x=pl.x,y=pl.y;const L=k==17?Math.min(1,gl/(sp*.5)):1;
      for(let j=1;j<=5;j++){x=Phaser.Math.Clamp(pl.x+ux*sp*j*.1*L,66,734);y=Phaser.Math.Clamp(pl.y+uy*sp*j*.1*L,66,304);D+=danger(x,y,j*.1)*(1.4-j*.15)}
      if(k==17)Dg=D;const sc=D*1000+Math.hypot(gx-x,gy-y);if(sc<bs){bs=sc;best=[pl.x+ux*60,pl.y+uy*60]}});
     if(Dg>0){mv=best;bite=bite&&danger(pl.x,pl.y,.1)==0}else mv=[gx,gy]}
    else mv=[gx,gy]}
   if(mv){const dx=mv[0]-pl.x,dy=mv[1]-pl.y,l=Math.hypot(dx,dy);if(l>7)press(dx/l,dy/l);else{const m=s.cur.en[0];if(m&&m.on&&!bite&&goal&&Math.hypot(goal[0]-pl.x,goal[1]-pl.y)<12)press(0,-1);else press(0,0)}}else press(0,0);
   if(s.skl&&s.skCd<=0&&!s.cine&&m&&m.on){const d0=danger(pl.x,pl.y,.1)+danger(pl.x,pl.y,.3);
    if(s.skl=='c'&&d0>0){s.skUse();sku++}
    else if(s.skl=='v'&&d0>0){const fx=Math.cos(s.ang),fy=Math.sin(s.ang),tx=pl.x+fx*140,ty=pl.y+fy*140;if(tx>60&&tx<740&&ty>60&&ty<300&&danger(tx,ty,.2)==0){s.skUse();sku++}}
    else if(s.skl=='p'){const fx=Math.cos(s.ang),fy=Math.sin(s.ang);if(m.ph==1&&m.st=='breach'&&!m.gone){const dx=m.x-pl.x,dy=m.y-pl.y,dd=Math.hypot(dx,dy);if(dd<190&&dd>50&&(dx*fx+dy*fy)/dd>.75){s.skUse();sku++}}else if(d0>0&&danger(pl.x+fx*150,pl.y+fy*150,.2)==0){s.skUse();sku++}}}
   if(bite&&s.bcd<=0){s.req=1;bites++}
   const hp0=m.hp;G.scene.update(T,dt);if(m.ph==2&&m.hp<hp0)mhit++}
  const m=s.cur.en[0];return {win:!m.on,dead:s.over&&m.on,time:+t.toFixed(1),ph2:ph2&&+ph2.toFixed(1),hp:Math.round(Math.max(0,m.hp)),mh:m.mh,en:Math.round(s.en),minE:Math.round(minE),emax:s.emax,bdmg:s.bdmg,dmg,bites,mhit,lv:lv0,sku}},[plv,lin,mode,P2,SK,XP]);
 out.errors=errs.slice(0,3);res.push(out);await p.close()}
for(const r of res)console.log(JSON.stringify(r));
console.log(mode,plv,lin,'WIN',res.filter(r=>r.win).length+'/'+res.length,'avgTime',(res.reduce((a,r)=>a+r.time,0)/res.length).toFixed(1));await b.close()})();
