const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
for(const GF of ['game102.html','game103.html']){const p=await b.newPage({viewport:{width:800,height:360},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(GF+' '+e.message));await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1});
 await p.goto('file:///home/claude/play/'+GF,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
 const go=async c=>{await p.evaluate(c=>{const s=GAME.scene.scenes[0];s.cdL={p:3,c:1,v:1,lv:10};s.codeGo(c)},c);await p.waitForTimeout(8000)};
 await go('c');await go('p');
 const r=await p.evaluate(async()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.inv=1e9;s.hurt=()=>{};s.pl.body.reset(400,290);m.st='crown';m.cd=0;m.ns=2;await new Promise(r=>setTimeout(r,1300));
  return {telG:!!(s.telG&&s.telG.scene),tel:s.tel.length,dshG:!!(s.dshG&&s.dshG.scene),dshTx:!!(s.dshTx&&s.dshTx.scene&&s.dshTx.visible),skG:!!(s.skG&&s.skG.scene)}});
 console.log(GF,r);await p.screenshot({path:GF.replace('.html','')+'_scatter.png'});
 if(GF=='game103.html'){await go('c');await p.evaluate(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.inv=1e9;s.hurt=()=>{};m.st='idle';m.cd=99;s.pl.body.reset(400,300);[[250,200],[400,170],[560,220]].forEach(([x,y],i)=>{const P=s.pl,ox=P.x,oy=P.y;P.x=x;P.y=y;s.gdkDrop(m,v=>v,i*3);P.x=ox;P.y=oy})});
  await p.waitForTimeout(350);await p.screenshot({path:'t103_stal1.png'});await p.waitForTimeout(350);await p.screenshot({path:'t103_stal2.png'});
  console.log('dash in gdk',await p.evaluate(()=>{const s=GAME.scene.scenes[0];const c0=s.dshCd;s.dshReq=1;return new Promise(r=>setTimeout(()=>r({before:c0,after:+s.dshCd.toFixed(2),btn:!!(s.dshG&&s.dshG.scene)}),200))}))}
 await p.close()}
console.log('errs',errs);await b.close()})();
