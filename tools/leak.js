const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const secs=+process.argv[2]||900;
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--enable-precise-memory-info','--js-flags=--expose-gc']});
const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;let a=7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1000);await p.addScriptTag({path:'bot.js'});
await p.evaluate(()=>{botInstall({exitAfter:200,guide:1,lin:'mix'});BOTSTAT.on=true;const s=GAME.scene.getScene('G');const h=s.hurt.bind(s);s.hurt=(d,a,m)=>h(d*.3,a,m)});
const snap=()=>p.evaluate(()=>{const s=GAME.scene.getScene('G');if(window.gc)gc();const tw=s.tweens.getTweens?s.tweens.getTweens().length:(s.tweens._active||[]).length;
 return {t:Math.round(BOTSTAT.t),zi:s.zi,ch:s.children.list.length,tw,tx:Object.keys(GAME.textures.list).length,ev:(s.time._active||[]).length+(s.time._pendingInsertion||[]).length,bod:s.physics.world.bodies.size+s.physics.world.staticBodies.size,dec:(s.dec||[]).length,heap:performance.memory?Math.round(performance.memory.usedJSHeapSize/1e6):-1,txMB:Math.round(Object.values(GAME.textures.list).reduce((a,t)=>{const im=t.getSourceImage&&t.getSourceImage();return a+(im&&im.width?im.width*im.height*4:0)},0)/1e6),over:s.over}});
const out=[];out.push(await snap());
for(let t=0;t<secs;t+=60){for(let k=0;k<6;k++){const st=await p.evaluate(()=>ff(10));if(st.over)break}const s=await snap();out.push(s);if(s.over)break}
for(const o of out)console.log(JSON.stringify(o));
// 큰 목록: 어떤 종류의 객체가 많은지
const kinds=await p.evaluate(()=>{const s=GAME.scene.getScene('G'),c={};for(const o of s.children.list){const k=o.type+(o.texture?':'+o.texture.key:'')+'@'+(o.depth|0);c[k]=(c[k]||0)+1}return Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,15)});
console.log(JSON.stringify(kinds));const big=await p.evaluate(()=>Object.entries(GAME.textures.list).map(([k,t])=>{const im=t.getSourceImage();return [k.slice(0,12),im.width+'x'+im.height,Math.round(im.width*im.height*4/1e3)]}).sort((a,b)=>b[2]-a[2]).slice(0,25));console.log(JSON.stringify(big));const pre=await p.evaluate(()=>{const c={};for(const k of Object.keys(GAME.textures.list)){const m=k.match(/^[a-z_]+/i);const kk=m?m[0]:'?';c[kk]=(c[kk]||0)+1}return Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,15)});console.log(JSON.stringify(pre));console.log(errs.slice(0,3).join('|')||'no errors');await b.close()})();
