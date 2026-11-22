const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game101.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1800);
const info=await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();const R=s.lv.rooms;const fl=R.filter(a=>a.tr=='flow');
 const rifts=R.filter(a=>Object.values(a.ct).includes('rift')).length;const rm=fl.find(a=>a.vk)||fl[0];s.seenM={kha:1,rek:1,gna:1,vdl:1,spn:1,lsp:1,qn:1,wd:1,em:1,rw:1};s.enter(rm);s.inv=1e9;
 const vx=rm.vx,vy=rm.vy;s.pl.body.reset(400+(400-vx)*.3,180+(180-vy)*.3);window.__rm=rm;
 return {flows:fl.length,vk:fl.map(a=>a.vk),rifts,vort:R.reduce((n,a)=>n+Object.values(a.ct).filter(t=>t=='vort').length,0),lmp:rm.en.filter(e=>e.k=='lmp').length,lanes:rm.ln&&rm.ln.length,vx,vy}});
console.log(info);
await p.waitForTimeout(1200);await p.screenshot({path:'v101_a.png'});
// 맥박 순간
await p.waitForTimeout(700);await p.screenshot({path:'v101_b.png'});
// 눈 열기
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.vtx.eye=s.time.now-500});await p.waitForTimeout(250);await p.screenshot({path:'v101_eye.png'});
// 칠성장어: 플레이어 곁으로 데려와 물기 → 도망
const lm=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en.find(e=>e.on&&e.k=='lmp');s.inv=0;s.hurtN=0;const H=s.hurt.bind(s);s.hurt=(d,src,mm)=>{s.hurtN++;s.hurtSrc=src;s.inv=0;s.en=s.emax};
 m.x=s.pl.x+70;m.y=s.pl.y;m.cd=0;m.st='swim';const out=[];for(let i=0;i<30;i++){await new Promise(r=>setTimeout(r,100));out.push(m.st[0]+Math.round(Math.hypot(m.x-s.pl.x,m.y-s.pl.y)))}return {seq:out.join(' '),hurt:s.hurtN,src:s.hurtSrc}});
console.log(lm);
await p.screenshot({path:'v101_lmp.png'});
// 반투명 확인
const al=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en.find(e=>e.on&&e.k=='lmp');const A=[];for(let i=0;i<27;i++){await new Promise(r=>setTimeout(r,200));A.push(m.spr.alpha.toFixed(2))}return A.join(' ')});console.log('alpha',al);
// 처치 보상
const kr=await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en.find(e=>e.on&&e.k=='lmp');const ve=s.ve;s.kill(m);return {ve0:ve,ve1:s.ve}});console.log(kr);
// 소용돌이로 빨려 들어가 이웃 방으로
const tr=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],rm=window.__rm;s.hurt=()=>{};s.pl.body.reset(rm.vx+(400-rm.vx)/Math.hypot(400-rm.vx,180-rm.vy)*60,rm.vy+(180-rm.vy)/Math.hypot(400-rm.vx,180-rm.vy)*60);let t0=Date.now();while(s.cur===rm&&Date.now()-t0<9000)await new Promise(r=>setTimeout(r,100));
 return {moved:s.cur!==rm,ms:Date.now()-t0,to:s.cur.tr,ct:s.cur.ct}});console.log(tr);
await p.waitForTimeout(1200);await p.screenshot({path:'v101_out.png'});
const back=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],rm=window.__rm;const k=Object.keys(s.cur.ct).find(k=>s.cur.ct[k]=='vort'&&s.cur.d[k]);const[hc,hr]=s.cur.hp[k];s.hlk=null;s.pl.body.reset((hc+.5)*40,(hr+.5)*40);let t0=Date.now();while(s.cur!==rm&&Date.now()-t0<4000)await new Promise(r=>setTimeout(r,100));await new Promise(r=>setTimeout(r,1500));return {back:s.cur===rm,d:Math.round(Math.hypot(s.pl.x-rm.vx,s.pl.y-rm.vy))}});console.log(back);
await p.screenshot({path:'v101_back.png'});
console.log('errs',errs);await b.close()})();
