const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text().slice(0,200))});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1});await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=10;s.lin={p:2,c:2,v:1};s.zi=2;s.molts=5;s.recalc();s.bossStart();
 let T=performance.now();G.loop.sleep();G.__vpNoDog=1;s.tweens.getDelta=function(){return 16.667*this.timeScale};const step=n=>{for(let i=0;i<n;i++){T+=16.67;s.en=s.emax;s.inv=1;G.scene.update(T,16.67)}};
 step(60*6);const m=s.swOn;m.hp=m.mh*.49;step(60*4);m.st='sk';m.sk={k:'mitosis',t:0};s.sw_mitosis0(m,s.pl,m.sk);const log=[];
 for(let f=0;f<60*22;f+=60){step(60);log.push([f/60+1,m.st,m.sk&&m.sk.k,m.MC?m.MC.length:0,m.MC?m.MC.reduce((a,c)=>a+c.P.length,0):0,m.P.filter(q=>q.on).length,m.mcLeft].join(' '))}
 return log});console.log(r.join('\n'),errs);await b.close()})();
