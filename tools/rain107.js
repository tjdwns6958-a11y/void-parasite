const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/'+(process.env.GF||'game106.html'),{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:3,c:1,v:1,lv:10};s.codeGo('p')});await p.waitForTimeout(8000);
for(const mode of ['line','slow','circle','zigzag']){
 await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.tel=[];s.pl.body.reset(140,280);m.x=400;m.y=150;m.st='crown';m.cd=99;window.H=[];s.inv=0;const o=s.hurt.bind(s);s.hurt=(d,src,mm)=>{window.H.push(src);s.en=s.emax};window.T=[];s.hcRain(m,1)});
 const keys={line:[['ArrowRight',3400]],slow:[['ArrowRight',3400]],circle:[['ArrowRight',600],['ArrowUp',600],['ArrowLeft',600],['ArrowDown',600],['ArrowRight',1000]],zigzag:[['ArrowRight',500],['ArrowUp',500],['ArrowRight',500],['ArrowDown',500],['ArrowRight',500],['ArrowUp',500],['ArrowRight',400]]}[mode];
 if(mode=='slow')await p.keyboard.down('Shift');for(const[k,ms]of keys){await p.keyboard.down(k);await p.waitForTimeout(ms);await p.keyboard.up(k)}
 if(mode=='slow')await p.keyboard.up('Shift');await p.waitForTimeout(600);
 const r=await p.evaluate(()=>({hits:window.H.filter(x=>x.includes('내리꽂기')).length,other:window.H.filter(x=>!x.includes('내리꽂기'))}));console.log(mode,JSON.stringify(r))}
console.log(errs);await b.close()})();
