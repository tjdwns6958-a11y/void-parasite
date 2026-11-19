// 최종 보스 '한 몸의 무리' 자동 전투 (빨리 감기, 그리기 생략)
// node swBot.js <html> <판수> <레벨> <계통 p3c2v0> <모드 dodge|human|tank> [최대 초] [스크린샷 0|1]
//  dodge: 위험(예고 포함)을 피하고, 흩어지면 여왕을 문다 · human: dodge인데 반응이 0.25초 늦고 가끔 실수 · tank: 피하지 않고 여왕만 쫓는다
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const [html='game.html',N='3',plv='10',LIN='p2c2v1',MODE='dodge',MAXS='420',SHOT='0']=process.argv.slice(2);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const res=[];
 for(let r=0;r<+N;r++){const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));p.on('console',m=>{if(m.type()=='error')errs.push(m.text().slice(0,160))});
  await p.addInitScript(seed=>{window.__vpNoTree=1;window.__vpNoSave=1;let a=seed*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},r+5+(+process.env.SEED||0));
  await p.goto('file:///home/claude/play/'+html);await p.waitForTimeout(1500);
  await p.evaluate(([plv,LIN,MODE])=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=+plv;s.lin={p:+LIN[1],c:+LIN[3],v:+LIN[5]};s.zi=2;s.molts=5;s.recalc();s.wormSkin&&s.wormSkin();s.en=s.emax;s.bossStart();
   window.__T=G.loop.time||performance.now();G.loop.sleep();G.__vpNoDog=1;s.tweens.getDelta=function(){return 16.667*this.timeScale};
   const S=window.__S={t:0,dmg:{},minE:1,hits:0,bites:0,lag:[],ph2:0,skills:{},mode:MODE};const oh=s.hurt.bind(s);s.hurt=function(d,src,m){const e0=this.en;oh(d,src,m);if(this.en<e0){S.dmg[src]=(S.dmg[src]||0)+Math.round(e0-this.en);S.hits++}};
   const KB=s.k;const press=(dx,dy)=>{KB.LEFT.isDown=dx<-.3;KB.RIGHT.isDown=dx>.3;KB.UP.isDown=dy<-.3;KB.DOWN.isDown=dy>.3};
   window.chunk=function(n,draw){const dt=1000/60;for(let k=0;k<n;k++){window.__T+=dt;S.t+=dt/1000;
     if(s.over){return s.swOn?'dead':'win'}
     const m=s.swOn,pl=s.pl;if(!m){G.scene.update(window.__T,dt);continue}
     if(m.ph==2&&!S.ph2)S.ph2=S.t;if(m.sk&&m.sk.t<.02)S.skills[m.sk.k]=(S.skills[m.sk.k]||0)+1;S.minE=Math.min(S.minE,s.en/s.emax);
     // 목표: 흩어졌으면 여왕, 아니면 거리 유지 · 에너지가 적으면 먹이
     let gx=m.x,gy=m.y,want=m.ex?8:150;const food=s.cur.food.filter(f=>f.on&&f.spr).sort((a,c)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(c.x-pl.x,c.y-pl.y))[0];
     if(food&&(s.en<s.emax*.55||(!m.ex&&Math.hypot(food.x-pl.x,food.y-pl.y)<120))){gx=food.x;gy=food.y;want=0}
     const score=(x,y)=>{const d=Math.hypot(x-gx,y-gy);return Math.abs(d-want)};
     let best=null,bs=1e9;const smart=MODE!='tank',hum=MODE=='human';
     const look=hum?S.lag:null;
     for(let i=0;i<=16;i++){const a=i/16*6.283,st=i==16?0:1;for(const L of st?[28,56]:[0]){const x=Phaser.Math.Clamp(pl.x+Math.cos(a)*L,50,750),y=Phaser.Math.Clamp(pl.y+Math.sin(a)*L,50,310);
       let sc=score(x,y);if(smart){const dz=s.swDanger(x,y)||s.swDanger((x+pl.x)/2,(y+pl.y)/2);if(dz)sc+=5000}if(sc<bs){bs=sc;best=[x,y,a,st]}}}
     if(smart&&bs>=5000){let fb=null,fd=1e9;for(let k=0;k<48;k++){const a=k/48*6.283*3.7,L=40+(k%6)*36,x=Phaser.Math.Clamp(pl.x+Math.cos(a)*L,50,750),y=Phaser.Math.Clamp(pl.y+Math.sin(a)*L,50,310);if(!s.swDanger(x,y)&&L<fd){fd=L;fb=[x,y]}}if(fb){best=[fb[0],fb[1],Math.atan2(fb[1]-pl.y,fb[0]-pl.x),1]}}
     let dx=0,dy=0;if(best&&best[3]){dx=Math.cos(best[2]);dy=Math.sin(best[2])}if(Math.hypot(gx-pl.x,gy-pl.y)<8&&!(smart&&s.swDanger(pl.x,pl.y))){dx=0;dy=0}
     if(hum){S.lag.push([dx,dy]);const q=S.lag.length>15?S.lag.shift():[0,0];dx=q[0];dy=q[1];if(Math.random()<.002){S.oops=30}if(S.oops>0){S.oops--;dx=Math.cos(S.t);dy=Math.sin(S.t)}}
     press(dx,dy);
     const nearF=food&&Math.hypot(food.x-pl.x,food.y-pl.y)<30;KB.SPACE.isDown=!!nearF;
     if(!nearF&&m.ex&&Math.hypot(m.x-pl.x,m.y-pl.y)<70&&s.bcd<=0){s.ang=Math.atan2(m.y-pl.y,m.x-pl.x);s.req=1;S.bites++}
     else if(!nearF&&MODE=='tank'&&Math.hypot(m.x-pl.x,m.y-pl.y)<70&&s.bcd<=0){s.ang=Math.atan2(m.y-pl.y,m.x-pl.x);s.req=1;S.bites++}
     else if(!nearF&&s.lin.v>=2&&!m.gone&&Math.hypot(m.x-pl.x,m.y-pl.y)<190&&s.bcd<=0&&(s.spitCd||0)<=0){s.req=1}
     if(MODE=='tank'){const a=Math.atan2(m.y-pl.y,m.x-pl.x);press(Math.cos(a),Math.sin(a))}
     G.scene.update(window.__T,dt)}
    if(draw){G.renderer.preRender();G.scene.render(G.renderer);G.renderer.postRender()}
    const m=s.swOn;return {t:+S.t.toFixed(1),hp:m?Math.round(m.hp/m.mh*100):0,ph:m?m.ph:0,st:m&&(m.sk?m.sk.k:m.st),en:Math.round(s.en),n:m?s.swAlive(m):0}}},[plv,LIN,MODE]);
  let last=null,out='timeout',shotN=0;const t0=Date.now();
  for(let i=0;i<+MAXS*2;i++){let v;try{v=await p.evaluate(([d])=>chunk(30,d),[+SHOT&&i%14==7]);}catch(e){errs.push('eval '+e.message.slice(0,90));out='crash';break}
   if(typeof v=='string'){out=v;break}last=v;if(+SHOT&&i%14==7&&shotN<12){await p.screenshot({path:`/home/claude/play/sw_${r}_${shotN++}_${v.st}.png`})}}
  const S=await p.evaluate(()=>window.__S).catch(()=>({}));
  res.push({r,out,t:S.t&&+S.t.toFixed(0),ph2:S.ph2&&+S.ph2.toFixed(0),minE:S.minE&&+S.minE.toFixed(2),hits:S.hits,bites:S.bites,last,dmg:S.dmg,sk:S.skills,errs:errs.slice(0,4),wall:Math.round((Date.now()-t0)/1000)});
  console.log(JSON.stringify(res[res.length-1]));await p.close()}
 await b.close()})();
