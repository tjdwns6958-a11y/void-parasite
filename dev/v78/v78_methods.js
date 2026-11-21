 // ===== v78: 코드 (임시 · 일시정지 → 코드) — 계통 단계·레벨을 고르고 보스를 누르면 바로 그 보스와 싸운다 =====
 codeOpen(){if(this.cdO||!this.pzo)return;const H=this.cdO=[],A=x=>{H.push(x);this.pzo.push(x);return x},dep=310;
  const L=this.cdL||(this.cdL={p:this.lin.p,c:this.lin.c,v:this.lin.v,lv:Math.max(8,this.plv)});
  A(this.add.rectangle(400,180,800,360,0x0b0716,1).setDepth(dep).setInteractive());
  A(this.add.text(400,26,'코드 (임시 · 테스트용)',ST({fontSize:'19px',fontStyle:'bold',color:'#ffe9a8'})).setOrigin(.5).setDepth(dep+.2));
  A(this.add.text(400,50,'① 계통 단계와 레벨을 고르고  ② 보스를 누르면 바로 그 보스와 싸운다  ·  이 판은 기록·이어하기에 저장되지 않는다',ST({fontSize:'11px',color:'#a99fc2'})).setOrigin(.5).setDepth(dep+.2));
  const cells={},W=[];let lvT=null;
  const refresh=()=>{for(const k of LK)cells[k].forEach((c,i)=>{const on=i==L[k];c.r.setFillStyle(i==0?(on?0x8a80a8:0x2a2342):LCN[k],i==0?1:(i<=L[k]?1:.18));c.r.setStrokeStyle(on?2:1,on?0xffffff:0x4a3f6a,1);c.t.setColor(i<=L[k]&&i>0||on?'#12091f':'#8f86a8')});
   lvT.setText('Lv.'+L.lv);W.forEach(o=>o.destroy());W.length=0;this.artWorm(o=>{W.push(o);return A(o)},650,132,{p:L.p,c:L.c,v:L.v},2.6,dep+.2);
   sumT.setText('포식 '+L.p+' · 갑각 '+L.c+' · 공허 '+L.v)};
  LK.forEach((k,j)=>{const y=88+j*40;A(this.add.text(200,y,LN[k],ST({fontSize:'15px',fontStyle:'bold',color:'#'+LCN[k].toString(16).padStart(6,'0')})).setOrigin(1,.5).setDepth(dep+.2));cells[k]=[];
   for(let i=0;i<4;i++){const x=240+i*52,r=A(this.add.rectangle(x,y,44,30,0x2a2342,1).setDepth(dep+.1).setInteractive()),t=A(this.add.text(x,y,i?String(i):'0',ST({fontSize:'14px',fontStyle:'bold'})).setOrigin(.5).setDepth(dep+.2));
    r.on('pointerdown',()=>{L[k]=i;refresh()});cells[k].push({r,t})}});
  const sumT=A(this.add.text(640,186,'',ST({fontSize:'12px',color:'#c8bce0'})).setOrigin(.5).setDepth(dep+.2));
  {const y=210;A(this.add.text(200,y,'레벨',ST({fontSize:'15px',fontStyle:'bold'})).setOrigin(1,.5).setDepth(dep+.2));
   const pm=(x,t,d)=>A(this.add.text(x,y,t,ST({fontSize:'16px',fontStyle:'bold',color:'#ece6f7',backgroundColor:'#3a2f57',padding:{x:12,y:4}})).setOrigin(.5).setDepth(dep+.2).setInteractive().on('pointerdown',()=>{L.lv=Phaser.Math.Clamp(L.lv+d,1,16);refresh()}));
   pm(240,'−',-1);lvT=A(this.add.text(318,y,'',ST({fontSize:'16px',fontStyle:'bold'})).setOrigin(.5).setDepth(dep+.2));pm(396,'+',1)}
  A(this.add.text(400,246,'보스 선택',ST({fontSize:'12px',color:'#8f86a8',fontStyle:'bold'})).setOrigin(.5).setDepth(dep+.2));
  [['p','허기의 왕관','포식 중간 보스','#ff9ab2'],['c','환초의 가면','갑각 중간 보스','#9fd8ff'],['v','틈 너머의 관찰자','공허 중간 보스','#c98bff'],['sw','한 몸의 무리','최종 보스','#ffe0a0']].forEach(([b,nm,sub,col],i)=>{
   A(this.add.text(115+i*190,284,nm+'\n'+sub,ST({fontSize:'14px',fontStyle:'bold',color:'#12091f',backgroundColor:col,align:'center',padding:{x:14,y:8},lineSpacing:2})).setOrigin(.5).setDepth(dep+.2).setInteractive().on('pointerdown',()=>this.codeGo(b)))});
  A(this.add.text(400,334,'닫기',ST({fontSize:'14px',fontStyle:'bold',color:'#ece6f7',backgroundColor:'#3a2f57',padding:{x:20,y:6}})).setOrigin(.5).setDepth(dep+.2).setInteractive().on('pointerdown',()=>this.codeClose()));
  refresh()}
 codeClose(){const H=this.cdO;if(!H)return;H.forEach(x=>x.destroy());this.pzo=(this.pzo||[]).filter(x=>!H.includes(x));this.cdO=null}
 codeGo(b){const L=this.cdL;window.__vpCodeQ={b,p:L.p,c:L.c,v:L.v,lv:L.lv};this.paused=false;this.time.paused=false;this.scene.restart()}
 codeRun(q){this.codeR=1;if(this.hint){this.hint.destroy();this.hint=null}
  this.plv=q.lv;this.lin={p:q.p,c:q.c,v:q.v};this.molts=q.p+q.c+q.v;this.zi=2;this.recalc();this.wormSkin();this.wormDeco&&this.wormDeco();this.en=this.emax;
  if(q.b=='sw'){const k3=LK.filter(k=>this.lin[k]>=3),d=this.domK();this.skl=k3.includes(d)?d:(k3[0]||null);this.skCd=0;this.bossStart()}
  else{this.mq={k:q.b,st:'open',room:this.cur,x:this.pl.x,y:this.pl.y};this.mbEnter()}
  const t=this.add.text(8,346,'코드 플레이 · 기록 저장 안 됨',ST({fontSize:'10px',color:'#ffe9a8'})).setOrigin(0,1).setDepth(62).setAlpha(.7);this.events.once('shutdown',()=>t.destroy())}
