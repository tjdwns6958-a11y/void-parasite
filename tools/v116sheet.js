const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const out={};
for(const GF of ['game115.html','game116.html']){const p=await b.newPage({viewport:{width:800,height:360}});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});await p.goto('file:///home/claude/play/'+GF);await p.waitForFunction(()=>window.GAME&&GAME.scene.scenes[0]&&GAME.scene.scenes[0].pl,null,{timeout:30000});await p.waitForTimeout(800);
out[GF]=await p.evaluate((KEYS)=>{const s=GAME.scene.scenes[0];s.vtxTex();const SC=3,cv=document.createElement('canvas');cv.width=1800;cv.height=260;const g=cv.getContext('2d');g.fillStyle='#120e1a';g.fillRect(0,0,1800,260);g.imageSmoothingEnabled=false;let x=10;
 for(const k of KEYS.split(',')){const src=s.textures.get(k).getSourceImage();const w=src.width,h=src.height;// 화면 크기 그대로(1:1 논리 px) ×SC
  const ow=s.textures.get(k).__v116?w:w,oh=h;g.drawImage(src,x,120-oh*SC/2,ow*SC/ (src.width>=0?1:1)*(s.textures.get(k).__v116?1:1),oh*SC);x+=ow*SC+12}
 return cv.toDataURL()},process.env.K)}
const fs=require('fs');fs.writeFileSync('v116/m_old.png',Buffer.from(out['game115.html'].split(',')[1],'base64'));fs.writeFileSync('v116/m_new.png',Buffer.from(out['game116.html'].split(',')[1],'base64'));await b.close()})();
