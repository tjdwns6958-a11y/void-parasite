const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game78.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
const cv=await p.$('canvas');const bb=await cv.boundingBox();const C=async(x,y)=>{await p.mouse.click(bb.x+x*bb.width/800,bb.y+y*bb.height/360);await p.waitForTimeout(250)};
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.pz()});await p.waitForTimeout(300);
await p.screenshot({path:'c78_pause.png'});
await C(45,26);// 코드
await C(396,88);await C(292,128);await C(240,168);await C(396,210);await C(396,210);// 포식3 갑각1 공허0 Lv10
await p.screenshot({path:'c78_code.png'});
const which=process.argv[2]||'p',X={p:115,c:305,v:495,sw:685}[which];
await C(X,284);await p.waitForTimeout(3500);
const st=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return {lin:s.lin,plv:s.plv,mbOn:s.mbOn,boss:s.boss,en:s.cur.en.map(m=>m.k+':'+m.hp),codeR:s.codeR,skl:s.skl,sv:localStorage.getItem('vp_save')}});
await p.screenshot({path:'c78_'+which+'.png'});
console.log(JSON.stringify(st),errs);await b.close()})();
