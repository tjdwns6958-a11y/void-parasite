const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1630,height:830}});
const I=[['v98 (전)','hud_on.png'],['v99 평소 · 맞은 직후 몸 위에 작은 체력','h99_b.png'],['v99 퀘스트 단추를 누르면 펼침','h99_c.png'],['v99 보스전 (맞은 직후 · ✦ = 부활 1번)','h99_boss.png']];
const h='<body style="margin:0;background:#120e1a;display:grid;grid-template-columns:800px 800px;gap:10px 30px;font:bold 26px sans-serif;color:#e8dcff">'+I.map(([t,f])=>'<div><div style="height:40px">'+t+'</div><img width=800 height=360 src="data:image/png;base64,'+fs.readFileSync(f).toString('base64')+'"></div>').join('')+'</body>';
await p.setContent(h);await p.screenshot({path:'/home/user/void-parasite/docs/v99/hud_v99.png',fullPage:true});await b.close()})();
