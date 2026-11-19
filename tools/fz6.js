// 멈춤 재현 (실시간, Chromium 1개): 중간 보스를 실제 시간으로 여러 판 돌리며 오류·페이지 충돌·메모리를 기록한다.
// node fz6.js <html> <보스 p|c|v> <계통 p3c2v0> <레벨> <판수> <판당 초> [inject]
// inject=1 이면 15초에 보스 AI에 일부러 오류를 넣어 루프가 계속 도는지(오류 창이 뜨는지) 본다.
const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const [html='game.html',K='p',LIN='p3c2v0',plv='5',N='3',secs='60',inj='0']=process.argv.slice(2);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--enable-precise-memory-info']});
 for(let r=0;r<+N;r++){const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];let crashed=0;
  p.on('pageerror',e=>errs.push('pageerror '+e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text().slice(0,160))});p.on('crash',()=>{crashed=1});
  await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1});
  await p.goto('file:///home/claude/play/'+html);await p.waitForTimeout(1200);
  await p.evaluate(([K,LIN,plv,inj])=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=+plv;s.lin={p:+LIN[1],c:+LIN[3],v:+LIN[5]};s.zi=2;s.molts=5;s.recalc();s.en=s.emax;s.mqStart(K);s.mbEnter();
   const KB=s.k,S={wa:0,wt:0,t0:performance.now()};
   window.__drv=setInterval(()=>{if(s.over){s.over=false;s.en=s.emax}if(s.en<40)s.en=s.emax*.8;if(Math.random()<.02)s.cry=3;
    const B=s.cur.en.find(m=>m.on&&m.mb)||s.cur.en.find(m=>m.on),pl=s.pl;S.wt-=.05;if(S.wt<=0){S.wt=.3+Math.random();S.wa=Math.random()*6.28}
    let dx=Math.cos(S.wa),dy=Math.sin(S.wa);if(B&&Math.random()<.65){const a=Math.atan2(B.y-pl.y,B.x-pl.x),d=Math.hypot(B.x-pl.x,B.y-pl.y);if(d>60){dx=Math.cos(a);dy=Math.sin(a)}}
    KB.LEFT.isDown=dx<-.3;KB.RIGHT.isDown=dx>.3;KB.UP.isDown=dy<-.3;KB.DOWN.isDown=dy>.3;const w=Math.random()<.25;KB.SPACE.isDown=w;if(w){KB.SPACE._justDown=true;KB.SPACE.timeDown=performance.now()}
    if(+inj&&!S.inj&&performance.now()-S.t0>15000&&B){S.inj=1;const f=s[B.k+'AI'];s[B.k+'AI']=function(m,dt,p){if(Math.random()<.01){m.spr=null}return f.call(this,m,dt,p)}}
   },50)},[K,LIN,plv,inj]);
  let last=null;const t0=Date.now();
  while(Date.now()-t0<+secs*1000){await p.waitForTimeout(2000).catch(()=>{});if(crashed)break;
   try{last=await p.evaluate(()=>{const s=GAME.scene.scenes[0],B=s.cur.en.find(m=>m.on&&m.mb),pm=performance.memory;return{f:GAME.loop.frame,fps:Math.round(GAME.loop.actualFps),st:B&&B.st,hp:B&&Math.round(B.hp/B.mh*100),ch:s.children.list.length,tw:s.tweens.getTweens().length,tel:s.tel.length,heap:pm?Math.round(pm.usedJSHeapSize/1e6):0,done:!!s.mbRO||!B,err:document.getElementById('vpErrBox')?.textContent?.slice(0,90)||''}})}catch(e){errs.push('eval '+e.message.slice(0,80));break}
   if(last.done)break}
  console.log(`#${r} ${crashed?'CRASH':'ok'} ${Math.round((Date.now()-t0)/1000)}s`,JSON.stringify(last),errs.slice(0,3).join(' || '));
  await p.close().catch(()=>{})}
 await b.close().catch(()=>{})})();
