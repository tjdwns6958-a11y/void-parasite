const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
await p.goto('file:///home/claude/play/game78.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
const cv=await p.$('canvas');const bb=await cv.boundingBox();const C=async(x,y)=>{await p.mouse.click(bb.x+x*bb.width/800,bb.y+y*bb.height/360);await p.waitForTimeout(250)};
const S=()=>p.evaluate(()=>{const s=GAME.scene.scenes[0];return JSON.stringify({lin:s.lin,plv:s.plv,mbOn:s.mbOn,boss:s.boss,zi:s.zi,en:s.cur.en.map(m=>m.k+':'+Math.round(m.hp)),codeR:s.codeR,skl:s.skl,paused:s.paused,rec:localStorage.getItem('vp_rec'),sv:localStorage.getItem('vp_save')})});
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.pz()});await p.waitForTimeout(300);
await C(45,26);await C(292,168);await C(292,128);await C(396,128);await C(305,284);await p.waitForTimeout(7000);console.log('1 갑각중보',await S());console.log(await p.evaluate(()=>{const s=GAME.scene.scenes[0];return JSON.stringify({over:s.over,molt:s.molt,tr:!!s.tr,treeO:!!s.treeO,cine:!!s.cine,bsO:!!s.bsO,cdO:!!s.cdO,pzo:!!s.pzo})}));
// 중간 보스 중 다시 코드 → 최종 보스
await C(264,34);await p.waitForTimeout(300);await C(45,26);await p.screenshot({path:'c78_again.png'});await C(240,88);await C(685,284);await p.waitForTimeout(3000);console.log('2 최종',await S());
// 닫기 버튼, 계속하기
await C(264,34);await p.waitForTimeout(300);await C(45,26);await C(400,334);await p.waitForTimeout(200);await C(240,140);await p.waitForTimeout(300);console.log('3 닫기→계속',await S());
// 최종 보스에서 지기 → 기록 저장 안 되는지
await p.evaluate(()=>{const s=GAME.scene.scenes[0];s.en=0;s.hurt&&s.hurt(999,'test')});await p.waitForTimeout(2500);console.log('4 죽음',await S());
console.log(errs);await b.close()})();
