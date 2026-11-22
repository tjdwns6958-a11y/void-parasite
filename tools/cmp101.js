const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1630,height:830}});
const I=[['소용돌이 방: 다음 방 쪽 가장자리의 소용돌이 · 바닥 핏줄에 맥박 해류','v101_b.png'],['가끔 깊은 곳에서 눈이 떠 플레이어를 본다','v101_eye.png'],['공허 칠성장어: 한 입 물고 도망 (몸 마디 · 둥근 이빨 입)','v101_lmp.png'],['빨려 들어가면 이웃 방 — 작은 소용돌이 출구로 나옴','v101_out.png']];
const h='<body style="margin:0;background:#120e1a;display:grid;grid-template-columns:800px 800px;gap:10px 30px;font:bold 24px sans-serif;color:#e8dcff">'+I.map(([t,f])=>'<div><div style="height:40px">'+t+'</div><img width=800 height=360 src="data:image/png;base64,'+fs.readFileSync(f).toString('base64')+'"></div>').join('')+'</body>';
await p.setContent(h);await p.screenshot({path:'/home/user/void-parasite/docs/v101/vortex_v101.png',fullPage:true});await b.close()})();
