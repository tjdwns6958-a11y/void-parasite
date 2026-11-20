const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const [LIN='c',SEED='22',RE='0']=process.argv.slice(2);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const p=await b.newPage({viewport:{width:800,height:360}});
await p.addInitScript(sd=>{window.__vpNoTree=1;window.__vpNoSave=1;let a=sd*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},+SEED);
await p.goto('file:///home/claude/play/game.html');await p.waitForTimeout(1200);await p.addScriptTag({path:'bot.js'});await p.addScriptTag({path:'fullbot.js'});
await p.evaluate(([LIN])=>{botInstall({exitAfter:200,guide:1,lin:LIN});BOTSTAT.on=true;fullInstall({assist:1});GAME.__vpNoDog=1},[LIN]);
let prev='';for(let i=0;i<260;i++){const st=await p.evaluate(([re])=>{ff(5,+re);const s=GAME.scene.getScene('G'),a=s.cur,S=BOTSTAT;return {t:Math.round(S.t),zi:s.zi,room:a.r+','+a.c,tr:a.tr,mode:S.mode,x:Math.round(s.pl.x),y:Math.round(s.pl.y),d:a.d,ct:a.ct,hp:a.hp,over:s.over,exit:s.lv.exit?s.lv.exit.r+','+s.lv.exit.c:null,lin:JSON.stringify(s.lin),pk:S.pickK&&S.pickK(),haven:s.lv.rooms.filter(r=>r.tr=='haven').map(r=>r.r+','+r.c)}},[RE]);
 const key=st.zi+'|'+st.room+'|'+st.mode;if(key!==prev||i%20==0){console.log(JSON.stringify(st));prev=key}if(st.over)break}
await b.close()})();
