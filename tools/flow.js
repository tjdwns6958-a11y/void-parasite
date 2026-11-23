// 처음부터 엔딩까지 진행 단계가 막힘 없이 이어지는지 (보스는 체력을 0으로)
const {chromium}=require('playwright');const K=process.env.K||'c',GF=process.env.GF||'game121.html';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
const log=[];const W=ms=>p.waitForTimeout(ms);const S=(f,a)=>p.evaluate(f,a);const st=async(tag)=>{const r=await S(()=>{const s=GAME.scene.scenes[0];return {zi:s.zi,lin:s.lin&&(s.lin.p+''+s.lin.c+s.lin.v),mq:s.mq&&s.mq.st,mbOn:s.mbOn||null,boss:!!s.boss,over:!!s.over,cine:!!s.cine,bs:!!s.bsO,vpErr:window.__vpErrN||0}});log.push(tag+' '+JSON.stringify(r));console.log(tag,JSON.stringify(r));return r};
await p.addInitScript(K=>{window.__vpZ=1;window.__vpNoSave=1;let a=7919*({p:3,c:5,v:7})[K];Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},K);
await p.goto('file:///home/claude/play/'+GF);await W(4500);await st('설명1');await p.mouse.click(400,338);await W(800);await st('설명2');await p.mouse.click(400,338);await W(1500);await st('시작');
await S(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.inv=1e9;s.hurt=()=>{}});
for(let i=0;i<3;i++){const r=await S(K=>{const s=GAME.scene.scenes[0];s.org=s.mn=s.ve=999;s.spO=s.spM=s.spV=0;s.enter(s.lv.start);s.pl.body.reset(400,250);s.moltOpen();if(!s.molt)return 'no-open';s.molt.sel=K;s.moltDone();return s.lin[K]},K);log.push('탈피 '+r);await W(1200)}
await W(2500);let r=await st('3단계 → 특수 퀘스트');
if(r.mq=='open'){await S(()=>{const s=GAME.scene.scenes[0];if(s.cur!==s.mq.room)s.enter(s.mq.room);s.pl.body.reset(s.mq.x,s.mq.y);s.pl.setVelocity(0,0)});for(let i=0;i<8;i++){await W(500);await S(()=>{const s=GAME.scene.scenes[0];if(!s.mbOn&&s.mq)s.pl.body.reset(s.mq.x,s.mq.y)})}}
await W(6000);r=await st('중간 보스 방');await p.screenshot({path:`v116/flow_${K}_1.png`});
await S(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;const m=s.cur.en.find(e=>e.mb);if(m){m.hp=0}});await W(2500);
await S(()=>{const s=GAME.scene.scenes[0];const m=s.cur.en.find(e=>e.mb&&e.on);if(m&&!s.mbRO)s.mbDie(m)});await W(3000);r=await st('중간 보스 쓰러뜨림');
for(let i=0;i<12&&r.mbOn;i++){await S(()=>{const s=GAME.scene.scenes[0];if(s.mbRO){s.pl.body.reset(400,200);s.pl.setVelocity(0,0)}});await W(500);r=await S(()=>{const s=GAME.scene.scenes[0];return {mbOn:s.mbOn||null,mq:s.mq&&s.mq.st,skl:s.skl}})}
await W(1500);
log.push('귀환 '+JSON.stringify(r));console.log('귀환',JSON.stringify(r));await p.screenshot({path:`v116/flow_${K}_2.png`});
for(let z=1;z<=2;z++){await S(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;if(!s.lv.exit)return;s.enter(s.lv.exit);s.pl.body.reset(400,180);s.pl.setVelocity(0,0)});
 for(let i=0;i<10;i++){await W(500);await S(()=>{const s=GAME.scene.scenes[0];if(s.cur===s.lv.exit&&!s.boss)s.pl.body.reset(400,180)})}
 await W(z==1?5000:9000);r=await st(z==1?'출구 → 2구역':'2구역 출구 → 최종 보스');await p.screenshot({path:`v116/flow_${K}_${2+z}.png`})}
await S(()=>{const s=GAME.scene.scenes[0];s.inv=1e9;s.hurt=()=>{};const m=s.cur.en.find(e=>e.k=='sw');if(m)s.swDie(m)});await W(9000);r=await st('최종 보스 1페이즈 끝');
await S(()=>{const s=GAME.scene.scenes[0];const m=s.cur.en.find(e=>e.k=='sw');if(m&&m.on){m.st='idle';s.swDie(m)}});
for(let i=0;i<40&&!r.over;i++){await W(1000);r=await S(()=>{const s=GAME.scene.scenes[0];return {over:!!s.over,cine:!!s.cine}})}
await W(3000);await st('엔딩 선택');await p.screenshot({path:`v116/flow_${K}_5.png`});
await p.mouse.click(K=='v'?622:178,180);await W(4000);await st('엔딩 고름 → 기록 카드');await p.screenshot({path:`v116/flow_${K}_6.png`});
const btn=await S(()=>{const s=GAME.scene.scenes[0];const t=s.children.list.find(o=>o.type==='Text'&&/처음부터|다시/.test(o.text||''));return t?[t.x,t.y,t.text]:null});log.push('다시 버튼 '+JSON.stringify(btn));
if(btn){await p.mouse.click(btn[0],btn[1]);await W(5000);await st('처음부터')}
console.log(K,log.join('\n'),'\nerrs',errs);await b.close()})();
