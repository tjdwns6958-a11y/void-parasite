const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1630,height:1250}});
const I=[['돌진이 수정 기둥을 부수며 지나감 → 파편 2개','t110_smash.png'],['등의 수정으로 돌진을 막으면 기절','t110_stun.png'],['떨어진 종유석이 수정 기둥으로 고정 (최대 5)','t110_pillars.png'],['입으로 씹기 (짧은 부채꼴)','t110_chew.png'],['2페이즈 큰 집게 휘두르기: 예고','t110_sweepW.png'],['큰 집게 휘두르기','t110_sweep.png']];
const h='<body style="margin:0;background:#120e1a;display:grid;grid-template-columns:800px 800px;gap:10px 30px;font:bold 22px sans-serif;color:#e8dcff">'+I.map(([t,f])=>'<div><div style="height:38px">'+t+'</div><img width=800 height=360 src="data:image/png;base64,'+fs.readFileSync(f).toString('base64')+'"></div>').join('')+'</body>';
await p.setContent(h);await p.screenshot({path:'/home/user/void-parasite/docs/v110/v110.png',fullPage:true});await b.close()})();
