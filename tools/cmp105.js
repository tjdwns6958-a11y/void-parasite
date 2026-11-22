const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1630,height:1250}});
const I=[['정동 지뢰: 봉오리 3개 · 마지막 1초 붉은 십자 예고','t105_bud2.png'],['꽃이 피며 십자로 터짐','t105_bud3.png'],['돌진하다 봉오리를 밟으면 스스로 맞고 휘청','t105_stag.png'],['허기의 왕관 턱 비: 나를 따라 찍히는 원 위로 턱이 내리꽂힘','t105_rain.png'],['허기 표식: 표식 유충이 왕관으로 기어감 (먼저 먹을 것)','t105_mark.png'],['통째 삼키기: 원래 그림(픽셀 칼날 턱)으로 복구','t105_dv.png']];
const h='<body style="margin:0;background:#120e1a;display:grid;grid-template-columns:800px 800px;gap:10px 30px;font:bold 22px sans-serif;color:#e8dcff">'+I.map(([t,f])=>'<div><div style="height:38px">'+t+'</div><img width=800 height=360 src="data:image/png;base64,'+fs.readFileSync(f).toString('base64')+'"></div>').join('')+'</body>';
await p.setContent(h);await p.screenshot({path:'/home/user/void-parasite/docs/v105/v105.png',fullPage:true});await b.close()})();
