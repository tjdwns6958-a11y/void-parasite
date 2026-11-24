const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
for(const st of (process.env.ST||'0,A,B,C').split(',')){const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(st=>{window.__vpNoTree=1;window.__vpZ=1;if(st!='0'){window.__vpW=st;window.__vpBg=st}else{window.__vpW='';window.__vpBg=''}let a=7919*5;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},st);
await p.goto('file:///home/claude/play/game117.html');await p.waitForFunction(()=>window.GAME&&GAME.scene.scenes[0]&&GAME.scene.scenes[0].pl,null,{timeout:30000});await p.waitForTimeout(800);
const R=(process.env.ROOMS||'1,4').split(',').map(Number);
for(const i of R){await p.evaluate(i=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.inv=1e9;s.enter(s.lv.rooms[i]);s.pl.body.reset(400,250);s.inv=1e9},i);await p.waitForTimeout(1600);await p.screenshot({path:`v116/o117_${st}_r${i}.png`})}
// 계통별 몸
const url=await p.evaluate(()=>{const s=GAME.scene.scenes[0],cv=document.createElement('canvas');cv.width=760;cv.height=120;const g=cv.getContext('2d');g.fillStyle='#120e1a';g.fillRect(0,0,760,120);g.imageSmoothingEnabled=false;let X=10;
 for(const L of [{p:0,c:0,v:0},{p:3,c:0,v:0},{p:1,c:3,v:0},{p:0,c:1,v:3},{p:2,c:2,v:1}]){s.lin=L;s.wormSkin();const ks=[s.hd.texture.key,...s.sg.map(o=>o.texture.key)];
  const segs=ks.slice(1).reverse();let x=X;for(const k of segs){const im=s.textures.get(k).getSourceImage();g.drawImage(im,x,60-im.height*1.5/2,im.width*1.5,im.height*1.5);x+=im.width*.7}
  const im=s.textures.get(ks[0]).getSourceImage();g.drawImage(im,x,60-im.height*1.5/2,im.width*1.5,im.height*1.5);X+=150}
 return cv.toDataURL()});require('fs').writeFileSync(`v116/o117_${st}_worm.png`,Buffer.from(url.split(',')[1],'base64'));
console.log(st,errs);await p.close()}
await b.close()})();
