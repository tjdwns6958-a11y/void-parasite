// 중간 보스 멈춤 재현: node fz.js html K LIN plv runs secs
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const [html='g32.html',K='p',LIN='p3c2v0',plv='5',runs='6',secs='150']=process.argv.slice(2);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const all={};
for(let r=0;r<+runs;r++){const p=await b.newPage({viewport:{width:844,height:390}});const pe=[];p.on('pageerror',e=>pe.push(e.message));
 await p.addInitScript(seed=>{window.__vpNoTree=1;window.__vpNoSave=1;let a=seed*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},r+31);
 await p.goto('file:///home/claude/play/'+html);await p.waitForTimeout(900);
 const out=await p.evaluate(([K,LIN,plv,secs,r])=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=+plv;s.lin={p:+LIN[1],c:+LIN[3],v:+LIN[5]};s.zi=2;s.molts=5;s.recalc();s.en=s.emax;s.mqStart(K);s.mbEnter();
  let T=G.loop.time||performance.now();G.loop.sleep();s.tweens.getDelta=function(){return 16.667*this.timeScale};const dt=1000/60,KB=s.k;const errs={};let firstAt=null;
  const press=(dx,dy)=>{KB.LEFT.isDown=dx<-.3;KB.RIGHT.isDown=dx>.3;KB.UP.isDown=dy<-.3;KB.DOWN.isDown=dy>.3};
  let wa=Math.random()*6.28,wt=0,t=0,lives=0;
  for(let i=0;i<60*secs;i++){T+=dt;t+=dt/1000;
   if(s.over){if(lives<3){lives++;s.over=false;s.en=s.emax}else break}
   if(!s.mbOn||s.mbRO){break}
   if(s.en<40)s.en=s.emax*.8;if(i%300==0)s.cry=3;if(i==60*25&&r%2==1){const Bm=s.cur.en.find(m=>m.on&&m.mb);if(Bm)Bm.hp=10}
   const B=s.cur.en.find(m=>m.on&&m.mb)||s.cur.en.find(m=>m.on);const pl=s.pl;
   wt-=dt/1000;if(wt<=0){wt=.3+Math.random()*1.2;wa=Math.random()*6.28}
   let dx=Math.cos(wa),dy=Math.sin(wa);
   if(B&&Math.random()<(r%3==0?.95:.6)){const a=Math.atan2(B.y-pl.y,B.x-pl.x),d=Math.hypot(B.x-pl.x,B.y-pl.y);if(d>60){dx=Math.cos(a);dy=Math.sin(a)}}
   press(dx,dy);const sp=KB.SPACE;const want=Math.random()<(r%3==2?.02:.25);sp.isDown=want;if(want){sp._justDown=true;sp.timeDown=T}
   if(s.skl&&Math.random()<.01){try{s.skUse()}catch(e){const k='skUse:'+e.message;errs[k]=(errs[k]||0)+1}}
   try{G.step(T,dt)}catch(e){const k=e.message+' @ '+(e.stack||'').split('\n').slice(1,4).map(x=>x.trim()).join(' < ');errs[k]=(errs[k]||0)+1;if(firstAt==null)firstAt=t.toFixed(1)}
   if(false){try{G.step(T,dt)}catch(e){const k='RENDER '+e.message+' @ '+(e.stack||'').split('\n').slice(1,3).join(' < ');errs[k]=(errs[k]||0)+1}}
  }
  const B=s.cur.en.find(m=>m.mb);return {t:t.toFixed(1),win:!!s.mbRO,hp:B?Math.round(B.hp):null,lives,firstAt,errs}},[K,LIN,plv,+secs,r]).catch(e=>({evalErr:e.message}));
 out.pe=pe.slice(0,3);console.log(r,JSON.stringify(out));await p.close()}
await b.close()})();
