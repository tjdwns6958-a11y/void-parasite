// 보고용 장면 캡처 (deviceScaleFactor 2)
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(seed=>{let a=seed*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},+(process.argv[2]||5));
await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1200);await p.addScriptTag({path:'bot.js'});
const shot=async n=>{await p.evaluate(()=>snap());await p.screenshot({path:'z2/shot_'+n+'.png'})};
await p.evaluate(()=>{const s=GAME.scene.getScene('G');s.hint&&s.hint.destroy();s.plv=9;s.molts=3;s.lin={p:2,c:1,v:0};s.recalc();if(s.wormSkin)s.wormSkin();s.en=s.emax;window.S=s;
 window.go=(tr,el,x,y)=>{const r=s.lv.rooms.find(r=>r.tr==tr&&(!!r.el)==!!el);s.pl.setPosition(x,y);s.sp.forEach((q,i)=>{q.x=x-7*(i+1);q.y=y+4});s.enter(r);s.en=s.emax;if(s.rlb){s.rlb.destroy();s.rlb=null}return r};
 window.mute=()=>{for(const k of['kha','rek','gna','vdl','spn','lsp','qn','wd'])s.seenM[k]=1};s.nextZone()});
await p.evaluate(()=>ff(.5));await shot('1_title');
await p.evaluate(()=>ff(3.5));
// 산호 숲: 산호충 조준
await p.evaluate(()=>{mute();const r=go('coral',0,120,180);S.inv=99;S.seenM.spn=0});
for(let i=0;i<40;i++){await p.evaluate(()=>ff(.1));const w=await p.evaluate(()=>S.cur.en.some(e=>e.on&&e.k=='spn'&&e.wu>0&&e.wu<.25));if(w)break}
await shot('2_coral');
// 여왕 감옥
await p.evaluate(()=>{mute();const r=go('coral',1,400,200);const q=r.en.find(e=>e.k=='qn');q.x=600;q.y=170;q.st='fight';q.cd=.5;S.inv=99});
for(let i=0;i<30;i++){await p.evaluate(()=>ff(.1));const c=await p.evaluate(()=>S.cur.en.find(e=>e.k=='qn').st);if(c=='cast'){await p.evaluate(()=>ff(.5));await shot('3_cast');break}}
await p.evaluate(()=>ff(.9));await shot('4_cage');
// 감시탑: 빛줄기와 그림자
await p.evaluate(()=>{mute();S.seenM.lsp=0;const r=go('watch',0,400,180);S.inv=99});await p.evaluate(()=>ff(1.2));await shot('5_watch');
await p.evaluate(()=>ff(1.6));await shot('5b_watch');
// 감시자: 충전 → 광선
await p.evaluate(()=>{mute();S.seenM.wd=0;const r=go('watch',1,560,180);const w=r.en.find(e=>e.k=='wd');w.x=300;w.y=180;w.fa=0;w.st='track';w.lk=.9;S.inv=0});
for(let i=0;i<40;i++){await p.evaluate(()=>ff(.05));const st=await p.evaluate(()=>S.cur.en.find(e=>e.k=='wd').st);if(st=='charge'){await p.evaluate(()=>ff(.5));await shot('6_charge');break}}
for(let i=0;i<20;i++){await p.evaluate(()=>ff(.05));const st=await p.evaluate(()=>S.cur.en.find(e=>e.k=='wd').st);if(st=='fire'){await shot('7_laser');break}}
// 등 뒤 물기
await p.evaluate(()=>{const w=S.cur.en.find(e=>e.k=='wd');w.st='cool';w.tm=3;S.pl.setPosition(w.x-46,w.y+6);S.ang=-0.1;S.bcd=0;S.bite()});await p.evaluate(()=>ff(.15));await shot('8_back');
// 일시정지 지도 범례
await p.evaluate(()=>{S.pz()});await p.waitForTimeout(200);await p.screenshot({path:'z2/shot_9_pause.png'});await p.evaluate(()=>{S.pz()});
// 2구역 출구 → 종료 화면
await p.evaluate(()=>{mute();const r=S.lv.exit;S.pl.setPosition(400,180);S.sp.forEach((q,i)=>{q.x=400-7*(i+1);q.y=184});S.enter(r);S.inv=99;for(const e of r.en)e.on=0});await p.evaluate(()=>ff(1.4));await shot('10_end');
console.log('errors',errs);await b.close()})();
