 // ===== v38: 엔딩 B — 진화 기록 카드 =====
 recEp(){const L=this.lin||{p:0,c:0,v:0},EP={p:['굶주린 턱','허기의 사냥꾼','허기의 군주'],c:['결정 껍질','수정 갑주','공명하는 껍질'],v:['틈을 엿보는 자','공허의 눈','틈을 걷는 자']};
  const mx=Math.max(L.p,L.c,L.v);if(!mx)return '이름 없는 기생충';const top=['p','c','v'].filter(k=>L[k]==mx);if(top.length>1)return '뒤섞인 '+(mx>=2?'포식자':'기생충');return EP[top[0]][mx-1]}
 recCard(title,body){const R=this.rec||{m:[]},tm=Math.round((this.time.now-this.t0)/1000),mmss=s=>Math.floor(s/60)+':'+String(s%60).padStart(2,'0'),O=[],A=o=>{O.push(o);return o},D=210,LC={p:0xff7a9a,c:0x9fd8ff,v:0xc98bff},LT={p:'포',c:'갑',v:'공'};
  const ep=this.recEp(),cam=this.cameras.main;
  A(this.add.rectangle(400,180,800,360,0x07040e,.78).setDepth(D));
  const g=A(this.add.graphics().setDepth(D+1));g.fillStyle(0x16102a,.97).fillRoundedRect(20,14,760,332,14);g.lineStyle(2,0x7a5ab4,1).strokeRoundedRect(20,14,760,332,14);
  A(this.add.text(40,26,title,ST({fontSize:'13px',color:'#c8bfe0'})).setDepth(D+2));
  const et=A(this.add.text(40,44,'「'+ep+'」',ST({fontSize:'28px',fontStyle:'bold',color:'#ffe078'})).setDepth(D+2));
  A(this.add.text(40,84,body||'',ST({fontSize:'11px',color:'#a99fc2',wordWrap:{width:520}})).setDepth(D+2));
  // 최종 모습
  g.fillStyle(0x0c0818,1).fillRoundedRect(40,108,190,194,10);g.lineStyle(1,0x5a4690,1).strokeRoundedRect(40,108,190,194,10);
  const wc=this.add.container(135,196).setDepth(D+2);A(wc);const keys=[this.hd.texture.key,...this.sg.map(o=>o.texture.key)],sc=1.7;
  for(let i=keys.length-1;i>=0;i--){const o=this.add.image(46-i*22,Math.sin(i*1.1)*6,keys[i]).setScale(sc).setRotation(Math.cos(i*1.1)*.18);wc.add(o)}
  this.tweens.add({targets:wc,y:{from:200,to:192},duration:1400,yoyo:true,repeat:-1,ease:'Sine.inOut'});
  const ring=A(this.add.ellipse(135,214,150,34).setStrokeStyle(1.5,0xb07aff,.5).setDepth(D+1.5));this.tweens.add({targets:ring,alpha:{from:.3,to:.9},duration:900,yoyo:true,repeat:-1});
  A(this.add.text(135,286,'최종 모습 · Lv.'+this.plv,ST({fontSize:'11px',color:'#c8bfe0'})).setOrigin(.5).setDepth(D+2));
  // 진화 기록 (탈피 순서)
  A(this.add.text(256,108,'진화 기록',ST({fontSize:'14px',fontStyle:'bold'})).setDepth(D+2));
  const M=R.m.slice(0,5),x0=284,dx=M.length>1?Math.min(112,440/(M.length-1)):0;
  if(!M.length)A(this.add.text(256,140,'탈피하지 않았다',ST({fontSize:'12px',color:'#8f86a8'})).setDepth(D+2));
  M.forEach(([k,nm,t],i)=>{const x=x0+i*dx;if(i<M.length-1)g.lineStyle(2,0x4a3a70,1).lineBetween(x+14,148,x+dx-14,148);
   const c=A(this.add.circle(x,148,13,LC[k]).setDepth(D+2).setScale(0)),lt=A(this.add.text(x,148,LT[k],ST({fontSize:'12px',fontStyle:'bold',color:'#140a20'})).setOrigin(.5).setDepth(D+3).setAlpha(0)),
    n=A(this.add.text(x,168,nm,ST({fontSize:'11px'})).setOrigin(.5,0).setDepth(D+2).setAlpha(0)),tt=A(this.add.text(x,184,mmss(t),ST({fontSize:'10px',color:'#a99fc2'})).setOrigin(.5,0).setDepth(D+2).setAlpha(0));
   this.tweens.add({targets:c,scale:1,delay:400+i*260,duration:280,ease:'Back.out'});this.tweens.add({targets:[lt,n,tt],alpha:1,delay:520+i*260,duration:300})});
  // 쓰러뜨린 것
  A(this.add.text(256,212,'쓰러뜨린 것',ST({fontSize:'14px',fontStyle:'bold'})).setDepth(D+2));
  const B=[];if(R.mb&&R.mb.dt!=null)B.push(['★ '+R.mb.nm,mmss(R.mb.dt)]);B.push(['★ 한 몸의 무리',R.swT!=null?mmss(R.swT):'—']);
  B.forEach(([a,b],i)=>{const x=256+i*258;g.fillStyle(0x2a1d46,1).fillRoundedRect(x,236,244,30,8);A(this.add.text(x+10,243,a,ST({fontSize:'12px',fontStyle:'bold',color:'#ffe078'})).setDepth(D+2));A(this.add.text(x+234,244,b,ST({fontSize:'11px'})).setOrigin(1,0).setDepth(D+2))});
  A(this.add.text(256,280,mmss(tm)+'  ·  처치 '+(this.kc||0)+'  ·  먹은 먹이 '+(R.food||0)+'  ·  탈피 '+this.molts,ST({fontSize:'12px',color:'#c8bfe0'})).setDepth(D+2));
  // 기록 저장 (이 기기 안에만)
  let hist=[];try{hist=JSON.parse(localStorage.getItem('vp_rec')||'[]')}catch(e){}
  const me={d:Date.now(),e:title,ep,t:tm,lv:this.plv,lin:this.skinKey(this.lin),mb:R.mb&&R.mb.dt!=null?R.mb.nm+' '+mmss(R.mb.dt):'',sw:R.swT!=null?mmss(R.swT):''};
  if(!this.recSaved){this.recSaved=1;hist.unshift(me);hist=hist.slice(0,20);try{localStorage.setItem('vp_rec',JSON.stringify(hist))}catch(e){}}
  const btn=(x,lb,col,fn)=>{const b=A(this.add.text(x,318,lb,ST({fontSize:'13px',fontStyle:'bold',color:'#140a20',backgroundColor:col,padding:{x:14,y:5}})).setOrigin(.5).setDepth(D+3).setInteractive());b.on('pointerdown',fn);return b};
  btn(660,'처음부터','#a65cff',()=>this.scene.restart());
  let list=null;btn(540,'지난 기록 '+hist.length,'#d8c8f8',()=>{if(list){list.forEach(o=>o.destroy());list=null;return}list=[];const lg=this.add.graphics().setDepth(D+5);lg.fillStyle(0x0c0818,1).fillRoundedRect(400,40,370,250,10);lg.lineStyle(1.5,0xb07aff,1).strokeRoundedRect(400,40,370,250,10);list.push(lg);
   list.push(this.add.text(414,50,'지난 기록 (이 기기)',ST({fontSize:'13px',fontStyle:'bold',color:'#ffe078'})).setDepth(D+6));
   hist.slice(0,8).forEach((h,i)=>{list.push(this.add.text(414,74+i*26,(i==0?'▶ ':'')+'「'+h.ep+'」 '+h.e.replace('엔딩 ','')+'\n   '+mmss(h.t)+' · Lv.'+h.lv+(h.sw?' · 무리 '+h.sw:''),ST({fontSize:'10px',color:i==0?'#ffffff':'#c8bfe0',lineSpacing:0})).setDepth(D+6))});
   const lb=this.add.text(756,52,'✕',ST({fontSize:'14px'})).setOrigin(1,0).setDepth(D+6).setInteractive().on('pointerdown',()=>{list.forEach(o=>o.destroy());list=null});list.push(lb)});
  // 카드 등장
  O.forEach(o=>{if(o.alpha!==undefined&&o.alpha>0&&!(o.scale===0)){const a=o.alpha;o.setAlpha(0);this.tweens.add({targets:o,alpha:a,duration:500})}});cam.flash(250,40,20,70);
  this.tweens.add({targets:et,scale:{from:1.25,to:1},duration:700,ease:'Back.out'})}
 // ===== v38: 1페이즈 세 겹 고리 (틈이 계단처럼 어긋난다) =====
 sw_ring30(m,p,K){K.cx=Phaser.Math.Clamp(p.x,60,740);K.cy=Phaser.Math.Clamp(p.y,60,300);const b=Math.random()*6.283,sd=Math.random()<.5?1:-1,st=()=>sd*(.62+Math.random()*.18);
  K.R=[{R0:118,ga:b}];K.R.push({R0:183,ga:K.R[0].ga+st()});K.R.push({R0:248,ga:K.R[1].ga+st()});K.gw=.56;K.wu=.95;K.v=m.ph==2?88:76;K.ex=1.3;K.src='세 겹 고리';
  if((m.r3N=(m.r3N||0)+1)<=2)this.dtx(400,64,'세 겹 고리 — 안쪽 고리의 금빛 틈부터 차례로 빠져나갈 것','#ffe066')}
 sw_ring3(m,dt,p,K){const g=m.tg,pu=.5+.5*Math.sin(this.time.now/70),tt=Math.max(0,K.t-K.wu);let alive=0;
  const rs=K.R.map(r=>{const R=r.R0-tt*K.v;if(R>14)alive++;return{R:Math.max(14,R),ga:r.ga,on:R>14}});if(!alive)return 1;
  for(const r of rs)if(r.on)this.swRingDraw(g,K.cx,K.cy,r.R,[[r.ga,K.gw]],K.t<K.wu?.35:.75,pu);
  const n=m.P.length,per=Math.ceil(n/3);let j=0;for(let i=0;i<n;i++){const q=m.P[i];if(!q.on)continue;const ri=j%3,r=rs[ri];j++;if(!r.on){q.tx=K.cx+q.bx*.4;q.ty=K.cy+q.by*.4;continue}const a=r.ga+K.gw+((j/3|0)%per)/per*(6.283-2*K.gw);q.tx=K.cx+Math.cos(a)*(r.R+Math.sin(q.ph)*2);q.ty=K.cy+Math.sin(a)*(r.R+Math.sin(q.ph)*2)*.8}
  const out=rs[2],oa=out.ga+Math.PI;m.x=K.cx+Math.cos(oa)*out.R;m.y=K.cy+Math.sin(oa)*out.R*.8;m.gone=1;K.kf=K.t<K.wu?4:12;
  if(K.t>K.wu)for(const r of rs)if(r.on&&this.swOnRing(p.x,p.y,K.cx,K.cy,r.R,[[r.ga,K.gw]],.8,10)){this.swHurt(m,9,K.src,.7);break}
  m.hzF=(x,y)=>rs.some(r=>{if(!r.on)return false;const d=Math.hypot(x-K.cx,(y-K.cy)/.8);return d<r.R+22&&d>r.R-46&&!this.swInGap(Math.atan2((y-K.cy)/.8,x-K.cx),[[r.ga,K.gw*.8]])})}
 // ===== v38: 세포 분열 무리가 다음 패턴이 끝날 때까지 남아 쫓아온다 =====
 swMcFrom(m,K){const keep=[];const dead=new Set();for(const c of K.cl){if(c.real)continue;const objs=c.ids.map(id=>m.P[id]).filter(q=>q&&q.on),k=Math.max(4,Math.round(objs.length*.45)),P=objs.slice(0,k);if(P.length<4)continue;P.forEach(q=>dead.add(q));keep.push({x:c.x,y:c.y,vx:c.vx,vy:c.vy,P,rad:Math.sqrt(P.length)*1.9+4})}
  m.P=m.P.filter(q=>!dead.has(q));m.MC=keep.length?keep:null;m.mcLeft=2;if(m.MC&&(m.mcN=(m.mcN||0)+1)<=2)this.dtx(400,84,'쪼개진 무리는 다음 공격이 끝날 때까지 남는다 — 물면 터진다','#9fe8b0')}
 swMcU(m,dt,p){const now=this.time.now/1000;for(const c of m.MC){const dx=p.x-c.x,dy=p.y-c.y,d=Math.hypot(dx,dy)||1,sp=64;c.vx+=(dx/d*sp-c.vx)*Math.min(1,dt*1.4);c.vy+=(dy/d*sp-c.vy)*Math.min(1,dt*1.4);
   for(const o of m.MC)if(o!==c){const ex=c.x-o.x,ey=c.y-o.y,ed=Math.hypot(ex,ey)||1;if(ed<46){c.vx+=ex/ed*240*dt;c.vy+=ey/ed*240*dt}}
   c.x=Phaser.Math.Clamp(c.x+c.vx*dt,40,760);c.y=Phaser.Math.Clamp(c.y+c.vy*dt,40,320);
   for(const q of c.P){q.tx=c.x+q.bx/30*c.rad+Math.sin(now*3+q.ph)*1.5;q.ty=c.y+q.by/30*c.rad;const f=Math.min(1,dt*8);q.x+=(q.tx-q.x)*f;q.y+=(q.ty-q.y)*f}
   if(Math.hypot(p.x-c.x,p.y-c.y)<c.rad*.8+5)this.swHurt(m,7,'분열한 무리',.8)}}
 swMcMerge(m){if(!m.MC)return;for(const c of m.MC)for(const q of c.P){q.tx=m.x;q.ty=m.y;m.P.push(q)}m.MC=null}
 swMcBite(m,fx,fy){const p=this.pl;for(const c of m.MC.slice()){const dx=c.x-p.x,dy=c.y-p.y,d=Math.hypot(dx,dy);if(d<C.BITE.range+c.rad&&(dx*fx+dy*fy)/(d||1)>.2){
   m.MC.splice(m.MC.indexOf(c),1);c.P.forEach(q=>q.on=0);if(!m.MC.length)m.MC=null;this.swFood(m,c.x,c.y,Math.min(3,Math.max(1,c.P.length/12|0)));this.dtx(c.x,c.y-16,'무리가 터졌다','#9fe8b0');
   for(let i=0;i<10;i++){const a=i/10*6.283,b=this.add.circle(c.x,c.y,2,0x7ae698).setDepth(12);this.tweens.add({targets:b,x:c.x+Math.cos(a)*30,y:c.y+Math.sin(a)*22,alpha:0,duration:300,onComplete:()=>b.destroy()})}return 1}}return 0}
