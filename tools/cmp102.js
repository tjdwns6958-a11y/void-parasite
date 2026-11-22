const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1630,height:830}});
const I=[['허기의 왕관: 회전 베기로 다가오며 유충을 삼키면 커짐 (회전 느리게)','t102_hcr.png'],['종유석: 위에서부터 보이는 실루엣 + 커지며 진해지는 그림자','t102_stal_450.png'],['공허 앵무조개 촉수: 쳐들기 (말아 쥐고 꿈틀)','t102_grabW.png'],['촉수가 문어 다리처럼 뻗음 (굵은 밑동 · 가는 끝 · 빨판)','t102_lash3.png']];
const h='<body style="margin:0;background:#120e1a;display:grid;grid-template-columns:800px 800px;gap:10px 30px;font:bold 22px sans-serif;color:#e8dcff">'+I.map(([t,f])=>'<div><div style="height:40px">'+t+'</div><img width=800 height=360 src="data:image/png;base64,'+fs.readFileSync(f).toString('base64')+'"></div>').join('')+'</body>';
await p.setContent(h);await p.screenshot({path:'/home/user/void-parasite/docs/v102/v102.png',fullPage:true});await b.close()})();
