// 사용: node run.js <tag> <runs> <seconds> [exitAfter] [html]
const {chromium}=require('playwright');const fs=require('fs');
const [tag,runs='6',secs='300',exitAfter='200',html='game.html']=process.argv.slice(2);fs.mkdirSync('rounds/'+tag,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const out=[];
for(let r=0;r<+runs;r++){const p=await b.newPage({viewport:{width:844,height:390}});const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+((e.stack||'').split('\n')[1]||'').trim()));p.on('console',m=>{if(m.type()=='error'&&errs.length<8)errs.push('C:'+m.text().split('\n').slice(0,2).join(' '))});
 await p.addInitScript(seed=>{window.__vpNoTree=1;let a=seed*7919;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},r+1+(+process.env.SEEDOFF||0));
 await p.goto('file:///home/claude/play/'+html);await p.waitForTimeout(1000);await p.addScriptTag({path:'bot.js'});
 await p.evaluate(([ea,gd,ln,pre])=>{botInstall({exitAfter:+ea,guide:gd,lin:ln});BOTSTAT.on=true;if(pre)new Function('s',pre)(GAME.scene.getScene('G'))},[exitAfter,process.env.GUIDE?1:0,process.env.LIN||'mix',process.env.PRE||'']);
 for(let t=0;t<+secs;t+=10){const st=await p.evaluate(()=>ff(10));if(r==0&&t%60==0){await p.evaluate(()=>snap());await p.screenshot({timeout:120000,path:`rounds/${tag}/run${r}_t${t}.png`})}if(st.over)break}
 await p.evaluate(()=>snap());await p.screenshot({timeout:120000,path:`rounds/${tag}/run${r}_end.png`});
 const s=await p.evaluate(()=>stats());s.errors=errs.slice(0,5);out.push(s);await p.close()}
const N=out.length,avg=f=>+(out.reduce((a,r)=>a+f(r),0)/N).toFixed(1),dm={};out.forEach(r=>{for(const k in r.dmg)dm[k]=(dm[k]||0)+r.dmg[k]/(r.time/60)/N});
const sum={tag,runs:N,survived:out.filter(r=>!r.ended||r.ended.includes('돌파')).length,cleared:out.filter(r=>r.ended&&r.ended.includes('돌파')).length,avgTime:avg(r=>r.time),avgLvl:avg(r=>r.lvl),avgRooms:avg(r=>r.rooms),avgKills:avg(r=>Object.values(r.kills).reduce((a,b)=>a+b,0)),avgEaten:avg(r=>Object.values(r.eaten).reduce((a,b)=>a+b,0)),avgMolts:avg(r=>r.molts),stuckPerMin:avg(r=>r.stuck/(r.time/60)),dmgPerMin:Object.fromEntries(Object.entries(dm).map(([k,v])=>[k,+v.toFixed(1)])),errors:out.flatMap(r=>r.errors).length};
fs.writeFileSync(`rounds/${tag}/stats.json`,JSON.stringify({sum,out},null,1));console.log(JSON.stringify(sum));await b.close()})();
