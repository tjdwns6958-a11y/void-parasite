const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game108.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const pos=await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='idle';m.air=0;m.cd=99;s.inv=1e9;s.hurt=()=>{};s.cry=3;s.pl.body.reset(250,300);return 1});
await p.keyboard.down('ArrowRight');await p.waitForTimeout(700);const xy=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return[s.pl.x,s.pl.y]});await p.screenshot({path:'t108_move.png'});await p.keyboard.up('ArrowRight');
const {x,y}={x:xy[0],y:xy[1]};require('child_process').execSync(`python3 -c "from PIL import Image;a=Image.open('t108_move.png');a.crop((${Math.round(x*2-170)},${Math.round(y*2-110)},${Math.round(x*2+70)},${Math.round(y*2+90)})).resize((480,400),Image.NEAREST).save('cryzoom2.png')"`);
await b.close()})();
