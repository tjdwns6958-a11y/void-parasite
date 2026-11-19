const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const [html='g32.html',K='p',LIN='p3c1v1',plv='5',R='2',secs='120']=process.argv.slice(2);(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});for(const r of R.split(',').map(Number)){const p=await b.newPage({viewport:{width:844,height:390}});
 await p.addInitScript(seed=>{window.__vpNoTree=1;window.__vpNoSave=1;let a=seed*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},r+31);
 await p.goto('file:///home/claude/play/'+html);await p.waitForTimeout(900);
 await p.evaluate(([K,LIN,plv,r])=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=+plv;s.lin={p:+LIN[1],c:+LIN[3],v:+LIN[5]};s.zi=2;s.molts=5;s.recalc();s.en=s.emax;s.mqStart(K);s.mbEnter();
  window.__T=G.loop.time||performance.now();G.loop.sleep();s.tweens.getDelta=function(){return 16.667*this.timeScale};
  window.__st={wa:Math.random()*6.28,wt:0,t:0,i:0};
  window.chunk=function(n){const KB=s.k,dt=1000/60,S=window.__st;const press=(dx,dy)=>{KB.LEFT.isDown=dx<-.3;KB.RIGHT.isDown=dx>.3;KB.UP.isDown=dy<-.3;KB.DOWN.isDown=dy>.3};
   for(let k=0;k<n;k++){const i=S.i++;window.__T+=dt;S.t+=dt/1000;if(s.over){s.over=false;s.en=s.emax}if(!s.mbOn||s.mbRO)return 'done';
    if(s.en<40)s.en=s.emax*.8;if(i%300==0)s.cry=3;if(i==60*25&&r%2==1){const Bm=s.cur.en.find(m=>m.on&&m.mb);if(Bm)Bm.hp=10}
    const B=s.cur.en.find(m=>m.on&&m.mb)||s.cur.en.find(m=>m.on);const pl=s.pl;S.wt-=dt/1000;if(S.wt<=0){S.wt=.3+Math.random()*1.2;S.wa=Math.random()*6.28}
    let dx=Math.cos(S.wa),dy=Math.sin(S.wa);if(B&&Math.random()<(r%3==0?.95:.6)){const a=Math.atan2(B.y-pl.y,B.x-pl.x),d=Math.hypot(B.x-pl.x,B.y-pl.y);if(d>60){dx=Math.cos(a);dy=Math.sin(a)}}
    press(dx,dy);const sp=KB.SPACE;const want=Math.random()<(r%3==2?.02:.25);sp.isDown=want;if(want){sp._justDown=true;sp.timeDown=window.__T}
    window.__last={i,t:S.t.toFixed(2),st:B&&B.st,hp:B&&Math.round(B.hp),en:s.cur.en.length,tel:s.tel.length,mbb:(s.mbb||[]).length,food:s.cur.food.length,ch:s.children.list.length,tw:s.tweens.getTweens().length,px:Math.round(pl.x),py:Math.round(pl.y),jw:B&&B.jw&&B.jw.map(j=>j.st).join(',')};
    G.step(window.__T,dt)}return 'ok'}},[K,LIN,plv,r]);
 let last=null;for(let t=0;t<+secs*4;t++){try{const res=await p.evaluate(()=>{const r=chunk(15);return [r,window.__last]});last=res[1];if(res[0]=='done'){console.log(r,'done',res[1].t,res[1].ch,res[1].tw);break}}catch(e){console.log(r,'CRASH after',JSON.stringify(last),e.message.slice(0,80));break}}
 await p.close().catch(()=>{})}
 await b.close().catch(()=>{})})();
