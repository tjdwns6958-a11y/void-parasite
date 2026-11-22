const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game86.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const E=f=>p.evaluate(f);
// (a) 기둥과 아래 벽 사이를 좌→우로 지나가기, 기둥 쪽으로 밀다가 빠져나오기
const a=await E(()=>new Promise(res=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};const m=s.cur.en[0];m.st='intro';s.tel=[];const K=s.k;s.pl.body.reset(200,288);K.RIGHT.isDown=true;
 setTimeout(()=>{K.RIGHT.isDown=false;const x1=s.pl.x;s.pl.body.reset(255,215);K.DOWN.isDown=true;setTimeout(()=>{K.DOWN.isDown=false;K.UP.isDown=true;const y2=s.pl.y;setTimeout(()=>{K.UP.isDown=false;
  // 넉백으로 기둥에 박기
  s.pl.body.reset(185,200);s.gdkKb(0,-600,.4);setTimeout(()=>{const y4=s.pl.y;K.LEFT.isDown=true;setTimeout(()=>{K.LEFT.isDown=false;res({passX:Math.round(x1),pushY:Math.round(y2),upY:Math.round(s.pl.y),kbY:Math.round(y4),afterLeftX:Math.round(s.pl.x)})},500)},500)},500)},600)},1600)}));
// (b) 수정 박치기
const c=await E(()=>{const s=GAME.scene.scenes[0];const m=s.cur.en[0];m.st='stun';m.tm=9;s.pl.body.reset(m.x,m.y+70);s.ang=-Math.PI/2;s.bcd=0;s.cry=2;const h0=m.hp;s.cryAtk(1);const d1=h0-m.hp,c1=s.cry,bcd1=s.bcd;s.bcd=0;s.cry=0;const h1=m.hp;s.cryAtk(1);return {withCry:+d1.toFixed(1),cryLeft:c1,bcd:+bcd1.toFixed(2),noCry:+(h1-m.hp).toFixed(1)}});
await p.waitForTimeout(150);await p.screenshot({path:'g86_hit.png'});
// (c) 걷는 모습
await E(()=>{const s=GAME.scene.scenes[0];const m=s.cur.en[0];m.st='idle';m.cd=99;s.pl.body.reset(400,300);m.x=250;m.y=150});
for(let i=0;i<4;i++){await p.waitForTimeout(220);await p.screenshot({path:'g86_w'+i+'.png'})}
// (d) 기둥에 박기 → 무기물 떨어짐
await E(()=>{const s=GAME.scene.scenes[0];const m=s.cur.en[0];m.x=400;m.y=150;s.cur.food.forEach(f=>{if(f.spr){f.spr.destroy()}f.on=0});s.gdkStun(m,m.pt[3],false)});await p.waitForTimeout(260);await p.screenshot({path:'g86_drop1.png'});await p.waitForTimeout(700);await p.screenshot({path:'g86_drop2.png'});
const n=await E(()=>GAME.scene.scenes[0].cur.food.filter(f=>f.on).length);
console.log(JSON.stringify({a,c,food:n}),errs);await b.close()})();
