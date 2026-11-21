const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:800,height:360}});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=1;window.__vpJoyUsed=1});
await p.goto('file://'+__dirname+'/v46.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.cur.en.forEach(m=>{m.on=0;if(m.spr)m.spr.setVisible(false)});GAME.loop.sleep();window.T=performance.now();window.st=n=>{for(let i=0;i<n;i++){T+=16.667;GAME.step(T,16.667)}}});
// 1) 그냥 걸어서 왼쪽 벽까지 (y=200 행: 왼쪽 출구가 없는 줄인지 확인 위해 두 줄)
const res={};
for(const y of [100,200,260]){
 await p.evaluate(y=>{const s=GAME.scene.scenes[0];s.pl.body.reset(120,y);st(5)},y);
 await p.keyboard.down('ArrowLeft');await p.evaluate(()=>st(90));await p.keyboard.up('ArrowLeft');await p.evaluate(()=>st(20));
 const walk=await p.evaluate(()=>+GAME.scene.scenes[0].pl.x.toFixed(1));
 // 2) 벽에 붙은 채 왼쪽 보고 물기 3번
 const after=await p.evaluate(()=>{const s=GAME.scene.scenes[0];const r=[];for(let k=0;k<3;k++){s.ang=Math.PI;s.bcd=0;s.bite();st(40);r.push(+s.pl.x.toFixed(1))}return r});
 res[y]={walk,after,room:await p.evaluate(()=>GAME.scene.scenes[0].cur.d.W?'W문':'')}}
console.log(JSON.stringify(res));await b.close()})();
