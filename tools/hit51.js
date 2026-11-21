const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:800,height:360}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=1;window.__vpJoyUsed=1});
await p.goto('file://'+__dirname+'/v51.html');await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();
 const rm=s.lv.rooms.find(r=>r.en.some(m=>m.on&&(m.k=='kha'||!m.k)));if(!rm)return 'no room';s.enter(rm);GAME.loop.sleep();let T=performance.now();const st=n=>{for(let i=0;i<n;i++){T+=16.667;GAME.step(T,16.667)}};st(5);
 const m=s.cur.en.find(m=>m.on&&m.spr&&(m.k=='kha'||!m.k));if(!m)return 'no mon';
 // 몬스터 정면 40px 앞에 세우고 그 자리에서 물기
 const px=m.x-40,py=m.y;s.pl.body.reset(px,py);s.ang=0;s.sp.forEach((q,i)=>{q.x=px-8*(i+1);q.y=py+4});st(1);
 const x0=s.pl.x,hp0=m.hp;s.bcd=0;s.bite();st(20);return {k:m.k||'kha',hit:m.hp<hp0,moved:+(s.pl.x-x0).toFixed(1)}});
console.log(JSON.stringify(r),errs);await b.close()})();
