const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game85.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1800);
const E=f=>p.evaluate(f);
// 1) 이동 거리
const r1=await E(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.pl.body.reset(300,180);s.ang=0;s.vx=s.vy=0;window.__x0=s.pl.x;s.dshReq=1;return 1});await p.waitForTimeout(600);
const d1=await E(()=>{const s=GAME.scene.scenes[0];return {dx:Math.round(s.pl.x-__x0),cd:+s.dshCd.toFixed(2)}});
// 2) 쿨 중에는 안 됨
await E(()=>{const s=GAME.scene.scenes[0];window.__x1=s.pl.x;s.dshReq=1});await p.waitForTimeout(400);const d2=await E(()=>Math.round(GAME.scene.scenes[0].pl.x-__x1));
await p.screenshot({path:'d85_btn.png'});
// 3) 보스방에서 완벽 회피 / 그냥 피격
await E(()=>{const s=GAME.scene.scenes[0];s.cdL={p:2,c:0,v:0,lv:6};s.codeGo('p')});await p.waitForTimeout(8200);
const r3=await E(()=>new Promise(res=>{const s=GAME.scene.scenes[0];const m=s.cur.en[0];m.st='intro';s.tel=[];s.dshCd=0;s.inv=0;const pl=s.pl;pl.body.reset(400,280);const e0=s.en;
 s.telAdd({k:'c',x:400,y:280,r:40,t:.12,dmg:20,src:'테스트',m});s.dshReq=1;s.ang=Math.PI;
 setTimeout(()=>{const e1=s.en,P=s.dshP,cd=s.dshCd;s.dshCd=0;s.dshI=0;s.inv=0;pl.body.reset(400,280);s.telAdd({k:'c',x:400,y:280,r:40,t:.1,dmg:20,src:'테스트',m});setTimeout(()=>res({perfect:P,lost1:e0-e1,cdAfter:+cd.toFixed(2),lost2:e1-s.en}),500)},600)}));
await p.waitForTimeout(100);await p.screenshot({path:'d85_boss.png'});
console.log(JSON.stringify({d1,d2,r3}),errs);await b.close()})();
