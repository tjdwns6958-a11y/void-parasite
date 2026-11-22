const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
const ctx=await b.newContext({viewport:{width:1200,height:540},recordVideo:{dir:'vid101',size:{width:1200,height:540}}});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpZ=1.5});
await p.goto('file:///home/claude/play/game101.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1800);
await p.evaluate(()=>{const d=document.createElement('div');d.id='cap';d.style.cssText='position:fixed;left:0;right:0;bottom:62px;text-align:center;z-index:99;pointer-events:none';d.innerHTML='<span style="background:rgba(10,6,20,.85);color:#ffe9a8;font:bold 22px sans-serif;padding:6px 14px;border-radius:8px"></span>';document.body.appendChild(d);
 window.cap=t=>{document.querySelector('#cap span').textContent=t;document.querySelector('#cap').style.display=t?'block':'none'};cap('');
 const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();s.seenM={kha:1,rek:1,gna:1,vdl:1,spn:1,lsp:1,qn:1,wd:1,em:1,rw:1};s.seenP={vort:1};
 const rm=s.lv.rooms.find(a=>a.tr=='flow'&&a.vk);window.__rm=rm;s.enter(rm);s.inv=1e9;
 // 칠성장어는 처음엔 멀리
 rm.en.filter(e=>e.k=='lmp').forEach(e=>{e.cd=99});
 // 가장 긴 핏줄 시작점에 플레이어
 const L=rm.ln.slice().sort((a,b)=>b.s[0]-a.s[0])[0];window.__L=L;const P=L.P[Math.min(2,L.P.length-1)];s.pl.body.reset(P[0],P[1]);});
const step=async(t,ms,fn)=>{await p.evaluate(t=>cap(t),t);if(fn)await p.evaluate(fn);await p.waitForTimeout(ms)};
await step('공허의 소용돌이 — 이웃 방 쪽 가장자리에 있다',3500);
await step('바닥 핏줄을 따라 해류가 두근-두근 맥박처럼 흐른다 · 위에 서 있으면 소용돌이 쪽으로 밀린다',6500);
await step('',10,()=>{const s=GAME.scene.scenes[0],rm=window.__rm;const dx=400-rm.vx,dy=180-rm.vy,l=Math.hypot(dx,dy);s.pl.body.reset(rm.vx+dx/l*130,rm.vy+dy/l*130)});
await step('가끔 깊은 곳에서 눈이 떠서 이쪽을 본다',3200,()=>{const s=GAME.scene.scenes[0];s.vtx.eye=s.time.now-200});
await step('먹이가 닿으면 꿀꺽',2600,()=>{const s=GAME.scene.scenes[0],rm=window.__rm,f=rm.food.find(f=>f.on&&f.spr);if(f){f.spr.setPosition(rm.vx+30,rm.vy-10);f.x=rm.vx+30;f.y=rm.vy-10}});
// 칠성장어
await step('공허 칠성장어 — 눈이 없어 가까이 와야 알아챈다',10,()=>{const s=GAME.scene.scenes[0],rm=window.__rm;s.pl.body.reset(420,200);const m=rm.en.find(e=>e.on&&e.k=='lmp');window.__m=m;m.x=600;m.y=220;m.cd=0;m.st='swim';m.wx=470;m.wy=205;m.tm=9;if(m.sg)m.sg.forEach((o,i)=>o.setPosition(608+6*i,220));rm.en.filter(e=>e!==m&&e.k=='lmp').forEach(e=>{e.cd=99;e.x=e.x<400?90:710});s.inv=0;s.hurt=((H)=>function(d,src,mm){H.call(s,d,src,mm);s.en=Math.max(s.en,s.emax*.7)})(s.hurt)});
await p.waitForTimeout(2600);
await step('다가와 한 입 물고 — 도망간다',3600);
await step('몸이 주기적으로 반투명해진다 (완전히 사라지지는 않는다)',10,()=>{const m=window.__m,s=GAME.scene.scenes[0];m.to=(5.2-((s.time.now/1000)%5.2)+2.6+5.2)%5.2;m.st='swim';m.cd=99;m.x=330;m.y=150;m.wx=520;m.wy=150;m.tm=9;s.inv=1e9});
await p.waitForTimeout(4200);
// 소용돌이로 이동
await step('소용돌이에 빨려 들어가면 → 이웃 방',10,()=>{const s=GAME.scene.scenes[0],rm=window.__rm;const dx=400-rm.vx,dy=180-rm.vy,l=Math.hypot(dx,dy);s.pl.body.reset(rm.vx+dx/l*70,rm.vy+dy/l*70)});
await p.waitForTimeout(3600);
await step('이웃 방의 작은 소용돌이 출구로 나온다',3000);
await step('출구로 들어가면 다시 소용돌이 방으로',10,()=>{const s=GAME.scene.scenes[0];const k=Object.keys(s.cur.ct).find(k=>s.cur.ct[k]=='vort'&&s.cur.d[k]);const[hc,hr]=s.cur.hp[k];window.__o=[(hc+.5)*40,(hr+.5)*40]});
// 출구 쪽으로 걸어가기 (방향키)
const o=await p.evaluate(()=>window.__o),pl=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return[s.pl.x,s.pl.y]});
const K=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];for(let i=0;i<60;i++){const st=await p.evaluate(()=>{const s=GAME.scene.scenes[0];return{b:!!s.tr||s.cur===window.__rm,x:s.pl.x,y:s.pl.y}});if(st.b)break;
 const want=[];if(o[0]-st.x<-4)want.push('ArrowLeft');if(o[0]-st.x>4)want.push('ArrowRight');if(o[1]-st.y<-4)want.push('ArrowUp');if(o[1]-st.y>4)want.push('ArrowDown');
 for(const k of K){if(want.includes(k))await p.keyboard.down(k);else await p.keyboard.up(k)}await p.waitForTimeout(60)}
for(const k of K)await p.keyboard.up(k);
await p.waitForTimeout(2800);await step('',300);
console.log('errs',errs,await p.evaluate(()=>GAME.scene.scenes[0].cur===window.__rm));
await ctx.close();await b.close()})();
