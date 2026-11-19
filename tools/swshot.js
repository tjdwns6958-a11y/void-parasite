const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const L=[['galaxy',1,[1.6]],['rain',1,[1.5]],['press',1,[.9]],['grab',1,[.95]],['wave',1,[1.6]],['ring',1,[1.3]],['palms',2,[1.1]],['hole',2,[2.6,4.6]],['mitosis',2,[3.8]],['orbit',2,[2.4]],['tide',2,[4.2]]];
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
for(const [K,PH,TS] of L){const p=await b.newPage({viewport:{width:800,height:360}});p.on('pageerror',e=>errs.push(K+' '+e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;let a=99;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1500);
await p.evaluate(([K,PH])=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=10;s.lin={p:2,c:2,v:1};s.zi=2;s.molts=5;s.recalc();s.bossStart();
 window.T=performance.now();G.loop.sleep();G.__vpNoDog=1;s.tweens.getDelta=function(){return 16.667*this.timeScale};window.step=n=>{for(let i=0;i<n;i++){T+=16.67;s.en=s.emax;s.inv=1;G.scene.update(T,16.67)}G.renderer.preRender();G.scene.render(G.renderer);G.renderer.postRender()};
 step(60*6);const m=s.swOn;if(PH==2){m.hp=m.mh*.49;step(60*4)}if(s.mcard){s.mcard.destroy();s.mcard=null}s.pl.setPosition(300,200);
 m.st='sk';m.sk={k:K,t:0};s['sw_'+K+'0'](m,s.pl,m.sk);window.tt=0},[K,PH]);
for(const t of TS){await p.evaluate(([t])=>{const n=Math.round((t-tt)*60);tt=t;step(n)},[t]);await p.screenshot({path:`/home/claude/play/ss_${K}_${t}.png`})}
await p.close()}
console.log('errs',errs);await b.close()})();
