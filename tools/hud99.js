// v99 HUD 확인: 평소 / 맞은 직후(몸 위 체력) / 퀘스트 펼침 / 체력 낮음 · 사용: GF=game99.html node tools/hud99.js (/home/claude/play 에서)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/'+(process.env.GF||'game99.html'),{waitUntil:'domcontentloaded'});await p.waitForTimeout(1800);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();const rm=s.lv.rooms.find(a=>a.en.filter(m=>m.on).length>=2&&a.tr!='haven');s.enter(rm);s.pl.body.reset(380,200);s.en=s.emax*.62;s.inv=1e9;s.seenM={kha:1,rek:1,gna:1,vdl:1,spn:1,lsp:1,qn:1,wd:1,em:1,rw:1};if(s.mcard){s.mcard.destroy();s.mcard=null}});
await p.waitForTimeout(1500);await p.screenshot({path:'h99_a.png'});
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.en=s.emax*.5;s.enG=s.emax*.62;s.lastHit={src:'t',t:s.time.now}});await p.waitForTimeout(250);await p.screenshot({path:'h99_b.png'});
await p.mouse.click(40,40);await p.waitForTimeout(400);await p.screenshot({path:'h99_c.png'});
const o1=await p.evaluate(()=>GAME.scene.scenes[0].lqO);
await p.mouse.click(100,80);await p.waitForTimeout(300);const o2=await p.evaluate(()=>GAME.scene.scenes[0].lqO);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.en=s.emax*.2;s.lastHit=null});await p.waitForTimeout(3000);await p.screenshot({path:'h99_d.png'});
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.lqO=true;s.lqOt=s.time.now-9500});await p.waitForTimeout(200);const o3=await p.evaluate(()=>GAME.scene.scenes[0].lqO);
console.log({open1:o1,closed2:o2,auto3:o3,errs});await b.close()})();
