 // ===== v43: 퀘스트 창 = 알리미(Q2) 고정 + 세 계통 펼치기/접기 · 경험치 막대 연하게 =====
 lqFocus(Q){let f=Q.find(q=>q.st=='ready');if(!f){let br=-1;for(const q of Q)if(q.st=='prog'&&q.r>br){br=q.r;f=q}}return f||Q.find(q=>q.st=='need')||Q.find(q=>q.st!='done')||Q[0]}
 lqMsg(q){return q.st=='ready'?'둥지(초록 방)에서 탈피하자!':q.st=='need'?'다른 계통을 1단계 올려야 열린다':q.st=='cap'?((this.zi||1)<2?'1구역 변이 한계 — 2구역에서 다시':'변이 한계 도달'):q.st=='done'?'모든 단계를 마쳤다':q.mat+(q.k=='v'?'를':'을')+' 모으자'}
 lqTitle(q){return q.st=='done'?'['+q.nm+'] 완성':'['+q.nm+'] '+(q.t+1)+'단계 · '+q.next}
 // 글자 재사용 시 색·크기·굵기도 갱신 (v42 lqTx는 처음 만들 때만 스타일을 정함)
 lqTx(id,x,y,s,o){const T=this.lqT||(this.lqT={});let t=T[id];o=o||{};if(!t){t=T[id]=this.add.text(0,0,'',ST(Object.assign({fontSize:'11px'},o))).setDepth(61)}
  else{if(o.color&&t.style.color!==o.color)t.setColor(o.color);const fs=o.fontSize||'11px';if(t.style.fontSize!==fs)t.setFontSize(fs);const st=o.fontStyle||'';if(t.style.fontStyle!==st)t.setFontStyle(st)}
  t.setVisible(true).setPosition(x,y);if(t.text!==s)t.setText(s);t.__u=1;return t}
 lqOpenGet(){if(this.lqO==null){try{this.lqO=localStorage.getItem('vp_lq')==='1'}catch(_){this.lqO=false}}return this.lqO}
 lqToggle(){this.lqO=!this.lqOpenGet();try{localStorage.setItem('vp_lq',this.lqO?'1':'0')}catch(_){}}
 // 퀘스트 창 누르기: 오른쪽 위 펼치기/접기 단추면 토글, 창 나머지는 진화 나무 · 처리했으면 true
 lqTap(x,y){const X=8,Y=54,W=232,H=this.lqH||70;if(this.boss||x<X||x>X+W||y<Y-2||y>Y+H)return false;if(x>X+W-58&&y<Y+24)this.lqToggle();else this.treeOpen();return true}
 lqDraw(){const g=this.gQ||(this.gQ=this.add.graphics().setDepth(50));g.clear();const T=this.lqT||(this.lqT={});for(const k in T)T[k].__u=0;
  if((this.gfx&&!this.gfx.visible)||this.boss){for(const k in T)T[k].setVisible(false);return}
  const now=this.time.now,pu=.6+.4*Math.sin(now/170),Q=LK.map(k=>this.lqInfo(k)),X=8,Y=54,W=232,open=this.lqOpenGet();
  const mark=(x,y,rd,dn)=>{g.fillStyle(dn?0xffe066:rd?0x7be0a8:0xffd34a,rd?pu:1).fillCircle(x,y,6.5)};
  const entry=(q,y0,id,big)=>{const rd=q.st=='ready',dn=q.st=='done';
   mark(X+14,y0+9,rd,dn);this.lqTx(id+'q',X+14,y0+9,dn?'★':'!',{fontSize:'10px',fontStyle:'bold',color:'#2a1a00'}).setOrigin(.5);
   this.lqTx(id+'t',X+25,y0+9,this.lqTitle(q),{fontSize:big?'12px':'11px',fontStyle:'bold',color:LCS[q.k]}).setOrigin(0,.5);
   this.lqTx(id+'m',X+12,y0+(big?27:23),this.lqMsg(q),{fontSize:big?'11px':'10px',color:rd?'#7be0a8':dn?'#ffe9a8':'#c9c0de',fontStyle:rd?'bold':'normal'}).setOrigin(0,.5);
   if(q.st=='prog'||rd)this.lqTx(id+'c',X+W-8,y0+(big?27:23),q.a+' / '+q.c,{fontSize:big?'11px':'10px',fontStyle:'bold',color:'#ece6f7'}).setOrigin(1,.5);
   const by=y0+(big?36:30),bh=big?6:4;g.fillStyle(0x3a2f57,1).fillRoundedRect(X+10,by,W-20,bh,bh/2);g.fillStyle(this.lqCol(q),rd?pu:1).fillRoundedRect(X+10,by,Math.max(bh,(W-20)*q.r),bh,bh/2)};
  let H;
  if(!open){const f=this.lqFocus(Q);H=70;g.fillStyle(0x0d0818,.6).fillRoundedRect(X,Y,W,H,8);entry(f,Y+4,'f',1);
   Q.forEach((q,i)=>{const x=X+18+i*52,y=Y+59,on=q===f;if(on)g.fillStyle(LCN[q.k],.18).fillRoundedRect(x-11,y-8,48,16,4);this.lqIcon(g,q.k,x,y,5,LCN[q.k],on?1:.6);
    for(let j=0;j<3;j++)g.fillStyle(j<q.t?LCN[q.k]:0x3a2f57,on?1:.7).fillCircle(x+11+j*7,y,2.2);if(q.st=='ready')g.fillStyle(0x7be0a8,pu).fillCircle(x+33,y-5,2.5)});
  }else{H=6+3*42;g.fillStyle(0x0d0818,.66).fillRoundedRect(X,Y,W,H,8);
   Q.forEach((q,i)=>{const y0=Y+4+i*42;if(i)g.fillStyle(0x3a2f57,.7).fillRect(X+10,y0-3,W-20,1);if(q.st=='ready')g.fillStyle(0x7be0a8,.08+.07*pu).fillRoundedRect(X+3,y0-1,W-6,40,5);entry(q,y0,'e'+i,0)})}
  this.lqH=H;
  // 펼치기/접기 단추 (창 오른쪽 위)
  g.fillStyle(0x2a2342,.95).fillRoundedRect(X+W-52,Y+3,46,15,4);this.lqTx('tg',X+W-29,Y+10.5,open?'▲ 접기':'▼ 모두',{fontSize:'9px',fontStyle:'bold',color:'#c8b8ff'}).setOrigin(.5);
  if(this.time.now-this.t0<25000)this.lqTx('h',X+W/2,Y+H+7,this.sys.game.device.input.touch?'창을 누르면 진화 나무':'창 누르기 / T: 진화 나무',{fontSize:'9px',color:'#a99fc2'}).setOrigin(.5);
  for(const k in T)if(!T[k].__u)T[k].setVisible(false)}
 // 경험치 막대: 화면 맨 밑, 얇고 연하게
 xpDraw(g){const Y=355,H=5,full=this.plv>=18,r=full?1:Math.min(1,this.xp/this.xpn());
  g.fillStyle(0x07040e,.35).fillRect(0,Y,800,H);g.fillStyle(0x7cc4ff,.28).fillRect(0,Y,800*r,H);g.fillStyle(0xbfe4ff,.25).fillRect(0,Y,800*r,1);
  const s=full?'경험치 MAX':'경험치 '+Math.floor(this.xp)+' / '+this.xpn()+'  ['+(r*100).toFixed(2)+'%]';
  if(!this.xpT)this.xpT=this.add.text(400,Y-1,'',ST({fontSize:'8px',color:'#ffffff'})).setOrigin(.5,1).setDepth(61).setAlpha(.4);if(this.xpT.text!==s)this.xpT.setText(s);
  if(!this.xpL)this.xpL=this.add.text(6,Y-1,'',ST({fontSize:'8px',color:'#ffe9a8'})).setOrigin(0,1).setDepth(61).setAlpha(.45);const ls='Lv.'+this.plv;if(this.xpL.text!==ls)this.xpL.setText(ls);
  const vis=!this.gfx||this.gfx.visible;this.xpT.setVisible(vis);this.xpL.setVisible(vis)}
