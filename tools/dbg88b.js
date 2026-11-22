const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game88.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:0,v:3,lv:10};s.codeGo('v')});await p.waitForTimeout(8000);
const d=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return ['obsE','obsE1','obsE2'].map(k=>s.textures.get(k).getSourceImage().toDataURL())});
d.forEach((u,i)=>fs.writeFileSync('tex88_'+i+'.png',Buffer.from(u.split(',')[1],'base64')));await b.close()})();
