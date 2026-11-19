const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const K=process.argv[2]||'p';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push('PAGE '+e.message+' '+(e.stack||'').split('\n').slice(1,3).join(' ')));
await p.addInitScript(()=>{window.__vpNoTree=1});
await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1500);
const S=async(n,w)=>{if(w)await p.waitForTimeout(w);await p.screenshot({path:'s30/'+K+'_'+n+'.png'})};
const E=(f,a)=>p.evaluate(f,a);
await E(k=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=8;s.lin={p:k=='p'?3:1,c:k=='c'?3:1,v:k=='v'?3:0};s.molts=5;s.recalc();s.en=s.emax;s.mqStart(k);s.mbEnter()},K);
await S('a_intro',1800);await p.waitForTimeout(2600);await S('b_fight',400);
await E(()=>{GAME.scene.scenes[0].inv=999});
await S('c1',1500);await S('c2',1500);
if(K=='p'){await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.hcClamp(m,v=>v,1)});await S('d_clamp',600);
 await p.waitForTimeout(1200);await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='crown';m.ns=2;m.cd=0});await S('e_scatter',1300);
 await p.waitForTimeout(5800);await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='inhaleW';m.tm=.8});await S('f_inhale',1500);}
if(K=='c'){await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='exhale';m.tm=1;s.telAdd({k:'b',x:m.x,y:m.y,rx:m.RX,ry:m.RY,k2:1.42,t:1,dmg:1,src:'환초의 숨',m})});await S('d_exhale',600);
 await p.waitForTimeout(800);await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];const q=m.gp[0];s.pl.body.reset(m.x+Math.cos(q.a)*m.RX*1.2,m.y+Math.sin(q.a)*m.RY*1.2)});await p.waitForTimeout(200);
 await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];const q=m.gp[0];s.pl.body.reset(m.x+Math.cos(q.a)*m.RX*.6,m.y+Math.sin(q.a)*m.RY*.6)});await S('e_inside',900);
 await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='inhaleW';m.tm=.8});await S('f_inhale',1300);}
if(K=='v'){await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='sweepW';m.tm=.9;m.sd=1});await S('d_sweep',1500);
 await p.waitForTimeout(1500);await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='watch';m.cd=0;m.eyc=0;m.ey.forEach(q=>q.open=0)});await S('e_eyes',1200);
 await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.ey.filter(q=>q.open).forEach(q=>s.obsClose(m,q))});await S('f_pulled',900);}
await E(()=>{const s=GAME.scene.scenes[0];s.cur.en.forEach(m=>{if(m.on)s.dmgM(m,99999,1)})});await S('g_dead',1500);
await S('h_win',1200);
const st=await E(()=>{const s=GAME.scene.scenes[0];return {mq:s.mq&&s.mq.st,skl:s.skl,mbOn:s.mbOn,room:s.cur.tr,over:s.over}});console.log(K,JSON.stringify(st));
console.log(errs.join('\n')||'no errors');await b.close()})();
