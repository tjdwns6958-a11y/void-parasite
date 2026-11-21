const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game79.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:3,c:1,v:0,lv:10};s.codeGo('p')});await p.waitForTimeout(7500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.inv=999;s.pl.setPosition(400,240);window.__log=[];const m=s.cur.en[0];m.st='crown';m.ns=2;m.cd=0;
 const hp=s.hcPair.bind(s);s.hcPair=function(m,k,en){__log.push([+(6.5-m.tm).toFixed(2),k,m.pn[k]+1]);hp(m,k,en)};
 const hx=s.hcCross.bind(s);s.hcCross=function(...a){__log.push('X');hx(...a);window.__cx=1}});
let shot=0;for(let i=0;i<80;i++){await p.waitForTimeout(100);const c=await p.evaluate(()=>{if(window.__cx==1){window.__cx=2;return 1}return 0});if(c&&shot<2){for(const w of [350,450,250]){await p.waitForTimeout(w);await p.screenshot({path:'cross79_'+shot+'_'+w+'.png'})}shot++}}
console.log(JSON.stringify(await p.evaluate(()=>__log)),errs);await b.close()})();
