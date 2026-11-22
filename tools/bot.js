// 페이지 안에서 도는 자동 플레이어 + 빨리감기 스텝퍼 + 지표 수집
window.BOTSTAT={t:0,rooms:new Set(),kills:{},eaten:{},dmg:{},deaths:0,stuck:0,molts:0,lvl:1,ended:null,energyMin:999,starve:0,tunnels:0,log:[]};
window.botInstall=function(opt){opt=opt||{};const s=GAME.scene.getScene('G');s.hint&&s.hint.destroy();const S=BOTSTAT;S.opt=opt;const mem={};
 const K=s.k;const keys=['LEFT','RIGHT','UP','DOWN','SPACE','W'];
 // 피해 출처 기록
 const h0=s.hurt.bind(s);s.hurt=function(d,src0,mm){const src=src0||'기타';const e0=this.en,r=h0(d,src0,mm),lost=e0-this.en;if(lost>0)S.dmg[src]=(S.dmg[src]||0)+lost;return r};
 const k0=s.kill.bind(s);s.kill=function(m){const k=m.k||'kha';S.kills[k]=(S.kills[k]||0)+1;return k0(m)};
 const c0=s.consume.bind(s);s.consume=function(f){S.eaten[f.t]=(S.eaten[f.t]||0)+1;return c0(f)};
 const e0=s.enter.bind(s);s.enter=function(a){if((s.zi||1)!==(mem.zi||1)){mem.zi=s.zi;S.zoneAt=(S.zoneAt||[]).concat(+S.t.toFixed(1));S.rooms1=S.rooms.size;S.rooms=new Set();S.zt=S.t;S.kz=0}S.rooms.add(a.r*4+a.c);mem.roomT=S.t;return e0(a)};S.rooms.add(s.cur.r*4+s.cur.c);
 const md=s.moltDone.bind(s);s.moltDone=function(){const r=md();if(!this.molt){S.molts=this.molts;if(S.firstMolt==null)S.firstMolt=+S.t.toFixed(1);(S.mT=S.mT||[]).push(Math.round(S.t));if(this.lin){(S.lt=S.lt||[]).push(Object.entries(this.lin).map(([k,v])=>k+v).join('')+'@'+Math.round(S.t)+'L'+this.plv+'Z'+this.zi)}}return r};const mo=s.moltOpen.bind(s);s.moltOpen=function(){if(S.firstReady==null)S.firstReady=+S.t.toFixed(1);return mo()};
 const en0=s.end.bind(s);s.end=function(a,...r){S.ended=a;return en0(a,...r)};
 S.pickK=()=>{if(!s.lin)return null;const pref=opt.lin||'mix',L=s.lin;let ord;if(pref=='mix')ord=['p','c','v','p','c','v'].slice(s.molts%3,s.molts%3+3);else{const oth=['p','c','v'].filter(k=>k!=pref).sort((a,b)=>s.lcost(a)-s.lcost(b));ord=L[pref]<2||L[pref]>=3||oth.some(o=>L[o]>=1)?[pref,...(L[pref]>=3?oth:[])]:oth}return ord.find(k=>s.nodeOk(k))||null};
 let stuckT=0,side=0,sdir=1,lastP=[0,0],eatHold=0,goal=null,hist=[];
 s.sys.events.on('preupdate',()=>{if(!S.on)return;const p=s.pl,a=s.cur;keys.forEach(k=>K[k].isDown=false);if(s.over||s.tr)return;
  if(s.molt){const k=S.pickK();if(k){s.molt.sel=k;s.moltDone()}else s.moltClose();return}
  if(a.tr=='haven'&&S.pickK()){s.moltOpen();return}
  S.energyMin=Math.min(S.energyMin,s.en);if(S.readyAt==null&&s.moltPts()>=3)S.readyAt=+S.t.toFixed(1);
  const now=s.time.now,foods=a.food.filter(f=>f.on&&f.spr&&!(f.ready>now)),ens=a.en.filter(m=>m.on&&m.spr&&!(m.k=='rek'&&(m.st=='under'||m.st=='warn'))&&!(m.k=='vdl'&&m.st!='dive'));
  let tx=null,ty=null,mode='explore';
  // 위험 회피: 카직스 도약 예고·가시
  const kz=a.en.find(m=>m.on&&!m.k&&(m.st=='wind'||m.st=='spit'));
  const nearE=ens.map(m=>[m,Math.hypot(m.x-p.x,m.y-p.y)]).sort((u,v)=>u[1]-v[1])[0];
  const nearF=foods.map(f=>[f,Math.hypot(f.x-p.x,f.y-p.y)]).sort((u,v)=>u[1]-v[1])[0];
  const hungry=s.en<s.emax*.6;
  const rw=a.en.find(m=>m.on&&m.k=='rek'&&m.st=='warn'&&Math.hypot(m.x-p.x,m.y-p.y)<70);
  if(rw){const an=Math.atan2(p.y-rw.y,p.x-rw.x);tx=p.x+Math.cos(an)*90;ty=p.y+Math.sin(an)*90;mode='dodge-rek'}
  else if((()=>{const sw=a.en.find(m=>m.on&&(m.k=='spn'||m.k=='lsp')&&m.wu>0&&Math.hypot(m.x-p.x,m.y-p.y)<320),wc=a.en.find(m=>m.on&&m.k=='wd'&&(m.st=='charge'||m.st=='tail')),qc=a.en.find(m=>m.on&&m.k=='qn'&&m.st=='cast');let an=null;if(wc&&wc.st=='tail')an=Math.atan2(p.y-wc.y,p.x-wc.x);else if(wc)an=wc.fa+Math.PI/2*(((p.x-wc.x)*-Math.sin(wc.fa)+(p.y-wc.y)*Math.cos(wc.fa))>0?1:-1);else if(qc)an=Math.atan2(p.y-qc.cy,p.x-qc.cx)+(Math.hypot(p.x-qc.cx,p.y-qc.cy)<5?1:0);else if(sw)an=Math.atan2(p.y-sw.y,p.x-sw.x)+Math.PI/2*(mem.ds||1);if(an==null)return false;if(Math.random()<.02)mem.ds=-(mem.ds||1);tx=p.x+Math.cos(an)*90;ty=p.y+Math.sin(an)*90;mode='dodge2';return true})()){}
  else if(kz&&Math.hypot(kz.x-p.x,kz.y-p.y)<220){const an=Math.atan2(p.y-kz.y,p.x-kz.x)+Math.PI/2;tx=p.x+Math.cos(an)*80;ty=p.y+Math.sin(an)*80;mode='dodge'}
  else if(nearE&&nearE[1]<(opt.guide&&S.pickK()&&a.tr!='haven'?90:170)&&(!hungry||!nearF||nearF[1]>nearE[1])){tx=nearE[0].x;ty=nearE[0].y;mode='fight'}
  else if(nearF&&!(mem.skip>now)&&(opt.guide&&S.pickK()?nearF[1]<40||hungry&&nearF[1]<50:(hungry||nearF[1]<110&&S.t-(mem.roomT||0)<60||(S.t-(mem.roomT||0))<12))){tx=nearF[0].x;ty=nearF[0].y;mode='eat'}
  else{ // 탐험: 안 가 본 이웃방 우선, 일정 시간 지나면 출구로
   const L=s.lv,D={N:[-1,0],S:[1,0],W:[0,-1],E:[0,1]};
   if(opt.stay){tx=400+Math.cos(S.t*.4)*230;ty=180+Math.sin(S.t*.4)*110;mode='stay'}
   else if(a===L.exit&&((S.t-(S.zt||0))>opt.exitAfter||S.rooms.size>=16)){tx=400;ty=180;mode='exit'}
   else if(!Object.keys(D).some(k=>a.d[k])){tx=400+Math.cos(S.t)*150;ty=180+Math.sin(S.t*.7)*90;mode='arena'}
   else{const opts=Object.keys(D).filter(k=>a.d[k]).map(k=>{const b=L.at(a.r+D[k][0],a.c+D[k][1]);return[k,b]});
    const key='g'+a.r+a.c;const hv=S.opt.guide&&S.pickK()&&a.tr!='haven'?L.rooms.find(r=>r.tr=='haven'):null;if(hv){const dist=new Map([[hv,0]]),q=[hv];while(q.length){const r=q.shift();for(const k in D)if(r.d[k]){const b=L.at(r.r+D[k][0],r.c+D[k][1]);if(!dist.has(b)){dist.set(b,dist.get(r)+1);q.push(b)}}}const best=opts.slice().sort((u,v)=>(dist.get(u[1])??99)-(dist.get(v[1])??99))[0];mem[key]={k:best[0],t:now+3000}}
    if(!mem[key]||mem[key].t<now){let c=opts.filter(([k,b])=>!S.rooms.has(b.r*4+b.c));if(!c.length){// 출구 쪽으로: BFS
       const dist=new Map(L.exit?[[L.exit,0]]:[]),q=L.exit?[L.exit]:[];while(q.length){const r=q.shift();for(const k in D)if(r.d[k]){const b=L.at(r.r+D[k][0],r.c+D[k][1]);if(!dist.has(b)){dist.set(b,dist.get(r)+1);q.push(b)}}}
       c=opts.slice().sort((u,v)=>(dist.get(u[1])??99)-(dist.get(v[1])??99)).slice(0,1);if(Math.random()<.25)c=opts}
     mem[key]={k:c[Math.floor(Math.random()*c.length)][0],t:now+15000}}
    const k=mem[key].k,ty0=a.ct[k];
    if(ty0=='hole'||ty0=='rift'||ty0=='vort'){const[hc,hr]=a.hp[k];tx=(hc+.5)*40;ty=(hr+.5)*40}else{tx={N:400,S:400,W:-40,E:840}[k];ty={N:-40,S:400,W:180,E:180}[k]}mode='go '+k}}
  S.mode=mode;
  if(tx!==null){let dx=tx-p.x,dy=ty-p.y;const d=Math.hypot(dx,dy);
   if(mode=='eat'&&d<30){K.W.isDown=true;eatHold++;if(eatHold>200){nearF[0].p=0;mem.skip=now+2000;eatHold=0}if(d<12)return}else eatHold=0;
   if(mode=='fight'&&s.lin&&s.lin.v>=2&&nearE&&nearE[0].k!='gna'){if(s.spitCd<=0&&d<200)s.req=1;if(d<95&&!(d<46&&s.spitCd>0)){dx=-dx;dy=-dy}}
   if(mode=='fight'&&d<46){if(now%600<20||!s.bcd||s.bcd<=0)s.req=1;}
   if(side>0){side-=1;const an=Math.atan2(dy,dx)+Math.PI/2*sdir;dx=Math.cos(an);dy=Math.sin(an)}
   const l=Math.hypot(dx,dy)||1;K.RIGHT.isDown=dx/l>.38;K.LEFT.isDown=dx/l<-.38;K.DOWN.isDown=dy/l>.38;K.UP.isDown=dy/l<-.38;
   if(a.cor&&hist.length>=12&&s.bcd<=0){const h=hist[hist.length-12];if(Math.hypot(p.x-h[0],p.y-h[1])<8&&a.cor.some(o=>o.on&&Math.hypot((o.c+.5)*40-p.x,(o.r+.5)*40-p.y)<56)){s.ang=Math.atan2(dy,dx);s.req=1}}
   hist.push([p.x,p.y]);if(hist.length>30)hist.shift();if(side<=0&&hist.length==30&&Math.hypot(p.x-hist[0][0],p.y-hist[0][1])<12){const rk='r'+a.r+a.c;S.stk=S.stk&&S.stk.k==rk&&now-S.stk.t<12000?{k:rk,n:S.stk.n+1,t:now}:{k:rk,n:1,t:now};side=Math.min(240,35*S.stk.n);sdir=S.stk.n>1?-sdir:(Math.random()<.5?1:-1);if(S.stk.n>=3)mem['g'+a.r+a.c]=null;S.stuck++;(S.stR=S.stR||{})[(a.tr||'-')+(s.zi||1)]=((S.stR||{})[(a.tr||'-')+(s.zi||1)]||0)+1;hist=[]}}});
};
// 빨리감기: RAF 루프를 멈추고 직접 스텝 (렌더 생략)
window.ff=function(sec,renderEvery){const G=GAME;if(!window.__T){window.__T=G.loop.time||performance.now();G.loop.sleep();const tw=G.scene.getScene('G').tweens;tw.getDelta=function(){return 16.667*this.timeScale}}const dt=1000/60,n=Math.round(sec*60);const s=G.scene.getScene('G');
 for(let i=0;i<n;i++){window.__T+=dt;if(renderEvery&&i%renderEvery==0)G.step(window.__T,dt);else G.scene.update(window.__T,dt);BOTSTAT.t+=dt/1000;if(s.over)break}
 return {t:BOTSTAT.t.toFixed(1),over:s.over,ended:BOTSTAT.ended}};
window.snap=function(){const G=GAME;window.__T+=16.7;G.step(window.__T,16.7)};
window.stats=function(){const s=GAME.scene.getScene('G'),S=BOTSTAT;return {time:+S.t.toFixed(1),ended:S.ended,lvl:s.plv,energy:Math.round(s.en),energyMin:Math.round(S.energyMin),rooms:S.rooms.size,kills:S.kills,eaten:S.eaten,dmg:Object.fromEntries(Object.entries(S.dmg).map(([k,v])=>[k,Math.round(v)])),molts:s.molts,stats:s.st4,stuck:S.stuck,lin:s.lin?{...s.lin}:null,ve:s.ve,firstMolt:S.firstMolt??null,moltTimes:S.mT||[],capAt:S.capAt??null,linT:S.lt||[],firstReadyAt:S.readyAt??null,exitKnown:!!((s.lv.exit&&s.lv.exit.seen)||s.exR),mbOn:s.mbOn||null,mq:s.mq?s.mq.k+":"+s.mq.st:null,skl:s.skl||null,zone:s.zi||1,stR:S.stR||{},zoneAt:S.zoneAt||[],rooms1:S.rooms1??null,ve2:s.ve,org:s.org,mn:s.mn,mode:S.mode}};
