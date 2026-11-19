const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const [K='palms',PH='2']=process.argv.slice(2);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text().slice(0,200))});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1});await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1500);
const r=await p.evaluate(([K,PH])=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=10;s.lin={p:2,c:2,v:1};s.zi=2;s.molts=5;s.recalc();s.bossStart();
 let T=performance.now();G.loop.sleep();G.__vpNoDog=1;s.tweens.getDelta=function(){return 16.667*this.timeScale};const step=n=>{for(let i=0;i<n;i++){T+=16.67;s.en=s.emax;G.scene.update(T,16.67)}};
 step(60*6);const m=s.swOn;if(+PH==2){m.hp=m.mh*.49;step(60*4)}
 m.st='sk';m.sk={k:K,t:0};s['sw_'+K+'0'](m,s.pl,m.sk);const log=[];
 for(let f=0;f<60*8;f+=20){step(20);const P=m.P.filter(q=>q.on),nan=P.filter(q=>!isFinite(q.x)||!isFinite(q.y)).length,vis=P.filter(q=>q.x>0&&q.x<800&&q.y>0&&q.y<360).length;log.push([f,m.st,m.sk&&m.sk.k,P.length,nan,vis,Math.round(m.x),Math.round(m.y)].join(' '))}
 return log},[K,PH]);console.log(r.join('\n'),errs);await b.close()})();
