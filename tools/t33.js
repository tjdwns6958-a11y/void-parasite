const {chromium}=require('/opt/npm-tools/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const ctx=await b.newContext({viewport:{width:844,height:390}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push('C:'+m.text())});
await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1500);
// 트리 닫고, 2구역 상태로 만들어 저장
const a=await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.treeO)s.treeClose();s.plv=7;s.xp=3;s.lin={p:3,c:1,v:0};s.molts=4;s.org=40;s.spO=30;s.mn=12;s.spM=8;s.feast=2;s.mq={k:'p',st:'done'};s.skl='p';s.recalc();s.zi=1;s.nextZone();return {zi:s.zi,save:!!localStorage.getItem('vp_save')}});
await p.waitForTimeout(800);
await p.reload();await p.waitForTimeout(1500);await p.screenshot({path:'s33/resume.png'});
const b1=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return {ask:!!s.rsO,paused:s.paused,tree:!!s.treeO}});
await p.mouse.click(844*290/800,390*220/360);await p.waitForTimeout(2200);await p.screenshot({path:'s33/resumed.png'});
const c=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return {ask:!!s.rsO,zi:s.zi,plv:s.plv,lin:s.lin,skl:s.skl,org:s.org,en:Math.round(s.en),emax:s.emax,paused:s.paused,bms:s.textures.getTextureKeys().filter(k=>k.startsWith('bm')).length}});
// 보스 저장/이어하기
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.bossStart();});await p.waitForTimeout(600);await p.evaluate(()=>{GAME.scene.scenes[0].saveG()});
await p.reload();await p.waitForTimeout(1500);await p.mouse.click(844*290/800,390*220/360);await p.waitForTimeout(3000);
const d=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return {boss:s.boss,zi:s.zi,plv:s.plv,em:!!(s.cur&&s.cur.en.some(e=>e.k=='em'))}});
// 새로 시작
await p.reload();await p.waitForTimeout(1500);await p.mouse.click(844*520/800,390*220/360);await p.waitForTimeout(600);
const e=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return {tree:!!s.treeO,save:!!localStorage.getItem('vp_save'),plv:s.plv}});
// 예외가 나도 루프가 계속 도는지
const f=await p.evaluate(async()=>{const s=GAME.scene.scenes[0];if(s.treeO)s.treeClose();const o=s.famU;let n=0;s.famU=function(){n++;throw new Error('test')};await new Promise(r=>setTimeout(r,500));s.famU=o;const fr=GAME.loop.frame;await new Promise(r=>setTimeout(r,300));return {thrown:n,running:GAME.loop.frame>fr,errN:s.errN,fps:Math.round(GAME.loop.actualFps)}});
console.log(JSON.stringify({a,b1,c,d,e,f}));console.log(errs.slice(0,6).join('|')||'no errors');await b.close()})();
