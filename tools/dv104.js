const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game104.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1800);
// 일반 몬스터에게 (번식지)
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.seenM={kha:1,rek:1,gna:1,vdl:1,spn:1,lsp:1,qn:1,wd:1,lmp:1};const rm=s.lv.rooms.find(a=>a.en.some(e=>e.on&&!e.k));s.enter(rm);s.inv=1e9;s.hurt=()=>{};const m=rm.en.find(e=>e.on&&!e.k);m.st='rest';s.pl.body.reset(m.x,m.y+50);s.ang=-Math.PI/2;s.skl='p';s.skCd=0;m.hp=m.mh*.25;window.__m=m;s.lin.p=3;s.dvUse()});
for(const t of [40,110,170,230]){await p.waitForTimeout(t==40?40:60);await p.screenshot({path:'dvn_'+t+'.png',clip:{x:0,y:0,width:800,height:360}})}
console.log('gulped',await p.evaluate(()=>!window.__m.on),errs);await b.close()})();
