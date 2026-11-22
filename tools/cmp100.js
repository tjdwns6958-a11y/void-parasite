const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1630,height:500}});
const I=[['v99 (전)','n99_flow.png'],['v100 이름만','n100_flow.png']];
const h='<body style="margin:0;background:#120e1a;display:grid;grid-template-columns:800px 800px;gap:10px 30px;font:bold 26px sans-serif;color:#e8dcff">'+I.map(([t,f])=>'<div><div style="height:40px">'+t+'</div><img width=800 height=360 src="data:image/png;base64,'+fs.readFileSync(f).toString('base64')+'"></div>').join('')+'</body>';
await p.setContent(h);await p.screenshot({path:'/home/user/void-parasite/docs/v100/names_v100.png',fullPage:true});await b.close()})();
