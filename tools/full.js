// 전체 게임 자동 플레이: 1구역 → (특수 퀘스트 · 중간 보스) → 2구역 → 최종 보스 → 엔딩
// node full.js <태그> <계통 p|c|v> <판수> [시드 시작] [렌더 간격 프레임]
// 멈춤 감시: JS 오류 · 루프 오류(vpErr) · 페이지 충돌 · 같은 자리에 오래 머묾 · 연출/진화창이 안 끝남 · 너무 긴 전투
const {chromium}=require('/opt/npm-tools/node_modules/playwright');const fs=require('fs');
const [tag='full',LIN='p',N='1',SEED='1',RE='4',EXIT='200']=process.argv.slice(2);fs.mkdirSync('/home/claude/play/rounds/'+tag,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--enable-precise-memory-info']});
 for(let r=0;r<+N;r++){const seed=+SEED+r,p=await b.newPage({viewport:{width:800,height:360}});const errs=[];let crash=0;
  p.on('pageerror',e=>errs.push('JS '+e.message+' @'+((e.stack||'').split('\n')[1]||'').trim()));p.on('console',m=>{if(m.type()=='error'&&errs.length<12)errs.push('C '+m.text().split('\n').slice(0,2).join(' ').slice(0,220))});p.on('crash',()=>crash=1);
  await p.addInitScript(sd=>{window.__vpNoTree=1;window.__vpNoSave=1;let a=sd*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},seed);
  await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1200);await p.addScriptTag({path:'/home/claude/play/bot.js'});await p.addScriptTag({path:'/home/claude/play/fullbot.js'});
  await p.evaluate(([LIN,EXIT,pick,AS])=>{botInstall({exitAfter:+EXIT,guide:1,lin:LIN});BOTSTAT.on=true;fullInstall({endPick:pick,assist:AS});GAME.__vpNoDog=1},[LIN,EXIT,r%2?'밖으로 나간다':'공허에 남는다',+(process.env.ASSIST||0)]);
  const t0=Date.now(),mon=[],flags=[];let last=null,sig=null,sigT=0,cineT=0,moltT=0,shot=0,res='timeout';
  for(let i=0;i<400;i++){let st;try{st=await p.evaluate(([re])=>{const o=ff(5,+re);const s=GAME.scene.getScene('G'),S=BOTSTAT,pm=performance.memory;
     return {...o,zi:s.zi||1,room:s.cur?s.cur.r+','+s.cur.c:'',x:Math.round(s.pl.x),y:Math.round(s.pl.y),en:Math.round(s.en),emax:s.emax,lv:s.plv,lin:Object.entries(s.lin||{}).map(([a,b])=>a+b).join(''),mb:s.mbOn||'',mbRO:s.mbRO||0,sw:!!s.swOn,swph:s.swOn?s.swOn.ph:0,swhp:s.swOn?Math.round(s.swOn.hp/s.swOn.mh*100):'',cine:!!s.cine,molt:!!s.molt,tr:!!s.tr,mode:S.mode,
      ch:s.children.list.length,tx:Object.keys(GAME.textures.list).length,tw:s.tweens.getTweens().length,te:s.time._active.length+s.time._pendingInsertion.length,heap:pm?Math.round(pm.usedJSHeapSize/1e6):0,err:document.getElementById('vpErrBox')?.textContent?.slice(0,160)||'',ev:FB.ev.length,chose:FB.chose||'',endT:FB.endT!=null}},[RE])}
   catch(e){errs.push('EVAL '+e.message.slice(0,160));res=crash?'crash':'eval-error';break}
   last=st;const t=+st.t;
   if(i%12==0)mon.push([Math.round(t),st.zi,st.lv,st.lin,st.ch,st.tx,st.tw,st.te,st.heap]);
   // 멈춤 감시
   const sg=[st.zi,st.room,Math.round(st.x/40),Math.round(st.y/40),st.mb,st.sw].join('|');if(sg!==sig){sig=sg;sigT=t}else if(t-sigT>90&&!st.over&&!st.sw&&!st.mb){flags.push(`${Math.round(t)}초: 90초 동안 같은 자리 (구역${st.zi} 방${st.room} ${st.mode})`);sigT=t}
   if(st.cine){cineT+=5;if(cineT>20){flags.push(`${Math.round(t)}초: 연출이 20초 넘게 안 끝남`);cineT=-1e9}}else cineT=0;
   if(st.molt){moltT+=5;if(moltT>20){flags.push(`${Math.round(t)}초: 진화 창이 안 닫힘`);moltT=-1e9}}else moltT=0;
   if(st.err&&!flags.some(f=>f.includes('오류 표시')))flags.push(`${Math.round(t)}초: 오류 표시 — ${st.err}`);
   if((i%24==12)&&shot<14){await p.evaluate(()=>snap()).catch(()=>{});await p.screenshot({path:`/home/claude/play/rounds/${tag}/${LIN}${seed}_${String(shot++).padStart(2,'0')}_t${Math.round(t)}.png`}).catch(()=>{})}
   if(st.chose){await p.evaluate(()=>ff(3,1)).catch(()=>{});await p.screenshot({path:`/home/claude/play/rounds/${tag}/${LIN}${seed}_end.png`}).catch(()=>{});res='ending';break}
   if(st.over&&!st.endT){res='dead';break}
   if(t>1800){flags.push('30분 넘게 안 끝남');break}}
  const F=await p.evaluate(()=>({ev:FB.ev,mb:FB.mb,sw:FB.sw,stats:stats(),chose:FB.chose||null})).catch(e=>({err:e.message}));
  const out={tag,lin:LIN,seed,res,wall:Math.round((Date.now()-t0)/1000),t:last&&+last.t,lv:last&&last.lv,linEnd:last&&last.lin,ended:F.stats&&F.stats.ended,ev:F.ev,mb:F.mb&&{k:F.mb.k,win:!!F.mb.win,time:F.mb.time,minE:+(F.mb.minE||0).toFixed(2)},sw:F.sw&&{win:!!F.sw.win,time:F.sw.time,ph2:F.sw.ph2,minE:+(F.sw.minE||0).toFixed(2),hp:last&&last.swhp},dmgTop:F.stats&&Object.entries(F.stats.dmg).sort((a,b)=>b[1]-a[1]).slice(0,5),flags,errs:errs.slice(0,8),mon:mon.slice(-1)[0],monMax:mon.reduce((a,m)=>[Math.max(a[0],m[4]),Math.max(a[1],m[5]),Math.max(a[2],m[6]),Math.max(a[3],m[7]),Math.max(a[4],m[8])],[0,0,0,0,0])};
  fs.writeFileSync(`/home/claude/play/rounds/${tag}/${LIN}${seed}.json`,JSON.stringify({...out,monAll:mon},null,1));console.log(JSON.stringify(out));await p.close()}
 await b.close()})();
