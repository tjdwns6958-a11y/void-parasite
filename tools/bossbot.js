const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const runs=+process.argv[2]||5,plv=+process.argv[3]||8,lin=process.argv[4]||'p2c1v0';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const res=[];
for(let r=0;r<runs;r++){const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
 await p.addInitScript(seed=>{window.__vpNoTree=1;let a=seed*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},r+11);
 await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(900);
 const out=await p.evaluate(([plv,lin])=>{const G=GAME,s=G.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=plv;const L={p:+lin[1],c:+lin[3],v:+lin[5]};s.lin=L;s.molts=L.p+L.c+L.v;s.recalc();s.en=s.emax;s.bossStart();
  const dmg={};const h0=s.hurt.bind(s);s.hurt=function(d,src,m){const e0=this.en;h0(d,src,m);const l=e0-this.en;if(l>0)dmg[src]=(dmg[src]||0)+Math.round(l)};
  let T=G.loop.time||performance.now();G.loop.sleep();s.tweens.getDelta=function(){return 16.667*this.timeScale};const dt=1000/60,K=s.k;
  const press=(dx,dy)=>{K.LEFT.isDown=dx<-.3;K.RIGHT.isDown=dx>.3;K.UP.isDown=dy<-.3;K.DOWN.isDown=dy>.3};let t=0,bites=0,tiredT=0,phase={};
  for(let i=0;i<60*240;i++){T+=dt;t+=dt/1000;const m=s.cur.en[0],pl=s.pl;if(s.over)break;
   let gx=0,gy=0,want=null;
   if(m.on){phase[m.st]=(phase[m.st]||0)+dt/1000;
    const bx=m.x,by=m.y+30,d=Math.hypot(bx-pl.x,by-pl.y);
    if(m.st=='split'){want=[400,196]}
    else if(m.wt&&m.wt.rg&&(((pl.x-m.wt.x)/70)**2+((pl.y-m.wt.y-44)/46)**2<1)){const a=Math.atan2(pl.y-m.wt.y-44,pl.x-m.wt.x);want=[pl.x+Math.cos(a)*80,pl.y+Math.sin(a)*80]}
    else if(m.st=='echo'||m.echo>=5){const a=Math.atan2(pl.y-by,pl.x-bx);want=[bx+Math.cos(a)*190,by+Math.sin(a)*190]}
    else{const orb=(s.rwo||[]).find(q=>q.on&&Math.hypot(q.x-pl.x,q.y-pl.y)<80);if(orb){want=[orb.x,orb.y];if(s.bcd<=0&&Math.hypot(orb.x-pl.x,orb.y-pl.y)<55){s.req=1}}
     else if(s.en<s.emax*.35&&s.cur.food.some(f=>f.on&&f.spr)){const f=s.cur.food.filter(f=>f.on&&f.spr).sort((a,b)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(b.x-pl.x,b.y-pl.y))[0];want=[f.x,f.y];if(Math.hypot(f.x-pl.x,f.y-pl.y)<40){s.eat={isDown:true};}}else if(!m.gone){s.eat=null;want=[bx,by];if(d<90&&s.bcd<=0){s.req=1;bites++}}}
    if(m.st=='tired')tiredT+=dt/1000}
   if(want){const dx=Phaser.Math.Clamp(want[0],70,730)-pl.x,dy=Phaser.Math.Clamp(want[1],70,300)-pl.y,l=Math.hypot(dx,dy);if(l>8)press(dx/l,dy/l);else press(0,0)}else press(0,0);
   G.scene.update(T,dt)}
  const m=s.cur.en[0];return {win:!m.on,over:s.over,time:+t.toFixed(1),hp:Math.round(Math.max(0,m.hp)),mh:m.mh,en:Math.round(s.en),emax:s.emax,dmg,bites,tired:+tiredT.toFixed(1),phase:Object.fromEntries(Object.entries(phase).map(([k,v])=>[k,+v.toFixed(1)]))}},[plv,lin]);
 out.errors=errs.slice(0,3);res.push(out);await p.close()}
for(const r of res)console.log(JSON.stringify(r));
console.log('WIN',res.filter(r=>r.win).length+'/'+res.length,'avgTime',(res.reduce((a,r)=>a+r.time,0)/res.length).toFixed(1));await b.close()})();
