const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game105.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:3,c:1,v:1,lv:10};s.codeGo('p')});await p.waitForTimeout(8000);
console.log(await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='crown';m.cd=99;m.hp=m.mh*.5;const f={t:'s',x:m.x+20,y:m.y,p:0,on:1,c:-1,r:-1,hm:1};f.spr=s.add.image(f.x,f.y,'f_s');s.cur.food.push(f);s.hcMarkU(m,.016,m.g);return 'direct gr='+m.gr+' hp%='+Math.round(m.hp/m.mh*100)+' on='+f.on}));
console.log(await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.inv=1e9;s.hurt=()=>{};m.st='crown';m.cd=99;const f={t:'s',x:m.x+160,y:m.y+40,p:0,on:1,c:-1,r:-1};f.spr=s.add.image(f.x,f.y,'f_s').setDepth(5);s.cur.food.push(f);
 s.pl.body.reset(120,300);m.st='markW';m.tm=.6;const L=[];for(let i=0;i<12;i++){await new Promise(r=>setTimeout(r,400));L.push([Math.round(f.x-m.x),Math.round(f.y-m.y),f.hm|0,f.on,m.st,m.gr||0].join('/'))}return L.join(' ')}),errs);await b.close()})();
