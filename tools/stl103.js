const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/game103.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.cdL={p:1,c:3,v:0,lv:10};s.codeGo('c')});await p.waitForTimeout(8000);
const urls=await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.inv=1e9;s.hurt=()=>{};m.st='idle';m.cd=99;s.pl.body.reset(400,310);s.gdkStlTex();
 const im=k=>{const src=s.textures.get(k).getSourceImage();const c=document.createElement('canvas');c.width=src.width;c.height=src.height;c.getContext('2d').drawImage(src,0,0);return c.toDataURL()};
 [[300,250],[480,230]].forEach(([x,y],i)=>{const P=s.pl,ox=P.x,oy=P.y;P.x=x;P.y=y;s.gdkDrop(m,v=>v,i*3);P.x=ox;P.y=oy});return {old:im('gdkP'),neu:im('gdkStl')}});
await p.waitForTimeout(640);await p.screenshot({path:'t103_mid.png'});
const q=await b.newPage({viewport:{width:1000,height:420}});
await q.setContent(`<body style="margin:0;background:#120e1a;color:#e8dcff;font:bold 22px sans-serif;display:flex;gap:24px;padding:14px;align-items:flex-start">
<div><div>전 (거꾸로 된 수정 기둥)</div><div style="background:#16122a;width:200px;height:330px;display:flex;align-items:center;justify-content:center;margin-top:8px"><img src="${urls.old}" style="transform:scaleY(-1);width:${0}px;image-rendering:pixelated;height:auto" id=o></div></div>
<div><div>후 (종유석)</div><div style="background:#16122a;width:200px;height:330px;display:flex;align-items:center;justify-content:center;margin-top:8px"><img src="${urls.neu}" style="image-rendering:pixelated;height:300px"></div></div>
<div><div>떨어지는 중 (게임 화면)</div><img src="data:image/png;base64,${require('fs').readFileSync('t103_mid.png').toString('base64')}" style="width:520px;margin-top:8px"></div></body>`);
await q.evaluate(()=>{const o=document.getElementById('o');o.onload=null;o.style.width=(o.naturalWidth*1.3)+'px'});
await q.waitForTimeout(200);await q.screenshot({path:'/home/user/void-parasite/docs/v103/stal_v103.png',fullPage:true});await b.close()})();
