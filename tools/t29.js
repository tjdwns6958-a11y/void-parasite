const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const K=process.argv[2]||'p';
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push('PAGE '+e.message+' '+(e.stack||'').split('\n').slice(1,3).join(' ')));
await p.addInitScript(()=>{window.__vpNoTree=1});
await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1500);
const S=async(n,w)=>{if(w)await p.waitForTimeout(w);await p.screenshot({path:'s29/'+K+'_'+n+'.png'})};
const E=(f,a)=>p.evaluate(f,a);
await E(k=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.plv=8;s.lin={p:k=='p'?3:1,c:k=='c'?3:1,v:k=='v'?3:0};s.molts=5;s.recalc();s.en=s.emax;s.mqStart(k)},K);
await S('a_quest',900);
await E(()=>{const s=GAME.scene.scenes[0];s.treeOpen(0)});await S('b_tree',300);await E(()=>{const s=GAME.scene.scenes[0];s.treeO.sel=[s.mq.k,2];s.treeDraw()});await S('b_tree2',200);await E(()=>{GAME.scene.scenes[0].treeClose()});
await E(()=>{const s=GAME.scene.scenes[0];s.pl.setPosition(s.mq.x,s.mq.y)});await S('c_rift',300);
await p.waitForTimeout(1300);await S('d_intro1',500);await S('d_intro2',1600);await p.waitForTimeout(2500);await S('e_fight',300);
await E(()=>{GAME.scene.scenes[0].inv=999});
await S('f1',1500);await S('f2',1500);await S('f3',1500);
if(K=='p'){await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];s.pl.setPosition(400,200);m.icd=0;m.cd=0;m.st='stalk'});await S('g_mark',1000);await S('g_leap',700);
 await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.hp=m.mh*.49});await S('h_rek',2500);await S('h_rek2',2000);await S('h_rek3',1500);}
if(K=='c'){await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='volley';m.vn=0;m.tm=0});await S('g_volley',700);
 await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.cg={x:s.pl.x,y:s.pl.y,gap:1,t:1.5,t0:1.5}});await S('g_cage',700);
 await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.pl.forEach(q=>q.on=0)});await S('h_exposed',600);}
if(K=='v'){await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='sweepW';m.tm=1;m.sd=1});await S('g_sweep',1400);
 await E(()=>{const s=GAME.scene.scenes[0],m=s.cur.en[0];m.st='flare';m.tm=1.6});await S('h_flare',1100);}
await E(()=>{const s=GAME.scene.scenes[0];s.cur.en.forEach(m=>{if(m.on)s.dmgM(m,99999,1)})});await S('i_dead',600);
if(K=='p'){await p.waitForTimeout(1500);await E(()=>{const s=GAME.scene.scenes[0];s.cur.en.forEach(m=>{if(m.on)s.dmgM(m,99999,1)})})}
await S('j_win',1800);
await E(()=>{const s=GAME.scene.scenes[0];s.pl.setPosition(400,200)});await p.waitForTimeout(1500);await S('k_back',600);
await E(()=>{const s=GAME.scene.scenes[0];s.skCd=0;s.skUse()});await S('l_skill',150);await S('l_skill2',700);
const st=await E(()=>{const s=GAME.scene.scenes[0];return {mq:s.mq&&s.mq.st,skl:s.skl,mbOn:s.mbOn,room:s.cur.tr,over:s.over}});console.log(K,JSON.stringify(st));
console.log(errs.join('\n')||'no errors');await b.close()})();
