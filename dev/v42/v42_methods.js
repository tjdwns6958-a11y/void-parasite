 // ===== v42: 계통 퀘스트 창 (에너지 막대 밑) · 경험치 막대 (화면 맨 밑) =====
 lqInfo(k){const t=this.lin[k],lk=this.nodeLock(k),c=t<3?this.lcost(k):1,a=Math.max(0,this.lavail(k)),r=t>=3?1:Math.min(1,a/c);
  let st='prog',tx=a+' / '+c;if(t>=3){st='done';tx='완성'}else if(lk===''){st='ready';tx='탈피 가능!'}else if(lk.indexOf('한계')>=0){st='cap';tx='한계'}else if(lk.indexOf('다른 계통')>=0){st='need';tx='다른 계통 1단계 필요'}
  return {k,t,st,tx,r,a,c,next:t<3?ND[k][t][0]:'',mat:LRS[k],nm:LN[k]}}
 lqCol(q){return q.st=='ready'?0x7be0a8:q.st=='done'?0xffe066:q.st=='cap'?0x6b6280:LCN[q.k]}
 lqIcon(g,k,x,y,s,col,al){g.fillStyle(col,al);
  if(k=='p'){g.fillTriangle(x-s,y-s*.55,x-s*.15,y-s*.55,x-s*.6,y+s*.8);g.fillTriangle(x+s*.15,y-s*.55,x+s,y-s*.55,x+s*.6,y+s*.8);g.fillRect(x-s,y-s*.8,s*2,s*.35)}
  else if(k=='c'){const P=[];for(let i=0;i<6;i++){const a=i/6*6.283+Math.PI/6;P.push({x:x+Math.cos(a)*s,y:y+Math.sin(a)*s})}g.fillPoints(P,true);g.fillStyle(0x0d0818,al*.55).fillPoints(P.map(p=>({x:x+(p.x-x)*.45,y:y+(p.y-y)*.45})),true)}
  else{g.fillEllipse(x,y,s*2.3,s*1.25);g.fillStyle(0x0d0818,al).fillCircle(x,y,s*.42);g.fillStyle(col,al).fillCircle(x,y,s*.16)}}
 lqTx(id,x,y,s,o){const T=this.lqT||(this.lqT={});let t=T[id];if(!t){t=T[id]=this.add.text(0,0,'',ST(Object.assign({fontSize:'11px'},o||{}))).setDepth(61)}
  t.setVisible(true).setPosition(x,y);if(t.text!==s)t.setText(s);t.__u=1;return t}
 lqDraw(){const g=this.gQ||(this.gQ=this.add.graphics().setDepth(50));g.clear();const T=this.lqT||(this.lqT={});for(const k in T)T[k].__u=0;
  if((this.gfx&&!this.gfx.visible)||this.boss){g.clear();for(const k in T)T[k].setVisible(false);return}
  const V=+(window.__vpLQ||1),now=this.time.now,pu=.6+.4*Math.sin(now/170),Q=LK.map(k=>this.lqInfo(k)),cs=q=>'#'+this.lqCol(q).toString(16).padStart(6,'0');
  const X=8,Y=54,W=232;
  if(V==1){ // Q1 목록형 퀘스트 창
   g.fillStyle(0x0d0818,.6).fillRoundedRect(X,Y,W,68,8);
   Q.forEach((q,i)=>{const y=Y+12+i*21,c=this.lqCol(q),rd=q.st=='ready';
    if(rd){g.fillStyle(0x7be0a8,.12+.1*pu).fillRoundedRect(X+3,y-9,W-6,18,5)}
    this.lqIcon(g,q.k,X+14,y,6,LCN[q.k],1);
    this.lqTx('n'+i,X+25,y,q.nm,{fontSize:'12px',fontStyle:'bold',color:LCS[q.k]}).setOrigin(0,.5);
    for(let j=0;j<3;j++)g.fillStyle(j<q.t?LCN[q.k]:0x3a2f57,1).fillRect(X+58+j*7,y-3,5,6);
    const bx=X+84,bw=62;g.fillStyle(0x3a2f57,1).fillRoundedRect(bx,y-3,bw,6,3);g.fillStyle(c,rd?pu:1).fillRoundedRect(bx,y-3,Math.max(4,bw*q.r),6,3);
    this.lqTx('v'+i,X+W-7,y,q.st=='prog'?q.mat+' '+q.tx:q.tx,{fontSize:q.st=='need'?'10px':'11px',fontStyle:rd?'bold':'normal',color:q.st=='prog'?'#d8d0ea':cs(q)}).setOrigin(1,.5)});
  }else if(V==2){ // Q2 퀘스트 알리미: 지금 가장 가까운 목표 하나 + 작은 탭 셋
   let f=Q.find(q=>q.st=='ready');if(!f){let br=-1;for(const q of Q)if(q.st=='prog'&&q.r>br){br=q.r;f=q}}if(!f)f=Q.find(q=>q.st=='need')||Q[0];
   g.fillStyle(0x0d0818,.6).fillRoundedRect(X,Y,W,70,8);const rd=f.st=='ready';
   g.fillStyle(0xffd34a,1).fillCircle(X+14,Y+13,7);this.lqTx('q',X+14,Y+13,'!',{fontSize:'11px',fontStyle:'bold',color:'#2a1a00'}).setOrigin(.5);
   this.lqTx('t',X+26,Y+13,f.st=='done'?'진화 완료':'['+f.nm+'] '+(f.t+1)+'단계 · '+f.next,{fontSize:'12px',fontStyle:'bold',color:LCS[f.k]}).setOrigin(0,.5);
   const msg=rd?'둥지(초록 방)에서 탈피하자!':f.st=='need'?'다른 계통을 1단계 올려야 열린다':f.st=='cap'?(this.zi<2?'1구역 변이 한계 — 2구역에서 다시':'변이 한계 도달'):f.st=='done'?'모든 단계를 마쳤다':f.mat+(f.k=='v'?'를':'을')+' 모으자';
   this.lqTx('m',X+12,Y+32,msg,{fontSize:'11px',color:rd?'#7be0a8':'#c9c0de',fontStyle:rd?'bold':'normal'}).setOrigin(0,.5);
   if(f.st=='prog'||rd)this.lqTx('c',X+W-8,Y+32,f.a+' / '+f.c,{fontSize:'11px',fontStyle:'bold',color:'#ece6f7'}).setOrigin(1,.5);
   g.fillStyle(0x3a2f57,1).fillRoundedRect(X+10,Y+41,W-20,6,3);g.fillStyle(this.lqCol(f),rd?pu:1).fillRoundedRect(X+10,Y+41,Math.max(4,(W-20)*f.r),6,3);
   Q.forEach((q,i)=>{const x=X+18+i*62,y=Y+59,on=q===f;if(on)g.fillStyle(LCN[q.k],.18).fillRoundedRect(x-11,y-8,50,16,4);this.lqIcon(g,q.k,x,y,5,LCN[q.k],on?1:.6);
    for(let j=0;j<3;j++)g.fillStyle(j<q.t?LCN[q.k]:0x3a2f57,on?1:.7).fillCircle(x+11+j*7,y,2.2);if(q.st=='ready')g.fillStyle(0x7be0a8,pu).fillCircle(x+33,y-5,2.5)});
  }else{ // Q3 아이콘 카드 셋
   Q.forEach((q,i)=>{const x=X+i*79,w=74,h=66,cx=x+w/2,c=this.lqCol(q),rd=q.st=='ready';
    g.fillStyle(0x0d0818,.6).fillRoundedRect(x,Y,w,h,7);g.lineStyle(rd||q.st=='done'?2:1,rd?0x7be0a8:q.st=='done'?0xffe066:LCN[q.k],rd?pu:.45).strokeRoundedRect(x,Y,w,h,7);
    this.lqIcon(g,q.k,cx,Y+14,8,LCN[q.k],1);
    this.lqTx('n'+i,cx,Y+31,q.nm+(q.t?' '+q.t+'단계':''),{fontSize:'11px',fontStyle:'bold',color:LCS[q.k]}).setOrigin(.5);
    g.fillStyle(0x3a2f57,1).fillRoundedRect(x+7,Y+40,w-14,5,2.5);g.fillStyle(c,rd?pu:1).fillRoundedRect(x+7,Y+40,Math.max(3,(w-14)*q.r),5,2.5);
    this.lqTx('v'+i,cx,Y+55,q.st=='need'?'다른 계통 필요':q.tx,{fontSize:q.st=='need'?'9px':'10px',fontStyle:rd?'bold':'normal',color:q.st=='prog'?'#d8d0ea':cs(q)}).setOrigin(.5)});
  }
  if(this.time.now-this.t0<25000)this.lqTx('h',X+W/2,Y+(V==1?75:77),this.sys.game.device.input.touch?'눌러서 진화 나무':'T: 진화 나무',{fontSize:'9px',color:'#a99fc2'}).setOrigin(.5);
  for(const k in T)if(!T[k].__u)T[k].setVisible(false)}
 xpDraw(g){const Y=348,H=12,full=this.plv>=18,r=full?1:Math.min(1,this.xp/this.xpn());
  g.fillStyle(0x07040e,.85).fillRect(0,Y,800,H);g.fillStyle(0x1f5a96,1).fillRect(0,Y+1,800*r,H-1);g.fillStyle(0x3584d0,1).fillRect(0,Y+1,800*r,H-4);g.fillStyle(0x9fd0ff,.7).fillRect(0,Y+1,800*r,1);
  for(let i=1;i<10;i++)g.fillStyle(0x07040e,.7).fillRect(i*80,Y+1,1,H-1);g.lineStyle(1,0x6b5a96,.9).lineBetween(0,Y,800,Y);
  const s=full?'경험치 MAX':'경험치 '+Math.floor(this.xp)+' / '+this.xpn()+'  ['+(r*100).toFixed(2)+'%]';
  if(!this.xpT)this.xpT=this.add.text(400,Y+H/2,'',ST({fontSize:'10px',fontStyle:'bold',color:'#ffffff',stroke:'#07040e',strokeThickness:2})).setOrigin(.5).setDepth(61);if(this.xpT.text!==s)this.xpT.setText(s);
  if(!this.xpL)this.xpL=this.add.text(6,Y+H/2,'',ST({fontSize:'10px',fontStyle:'bold',color:'#ffe066',stroke:'#07040e',strokeThickness:2})).setOrigin(0,.5).setDepth(61);const ls='Lv.'+this.plv;if(this.xpL.text!==ls)this.xpL.setText(ls);const vis=!this.gfx||this.gfx.visible;this.xpT.setVisible(vis);this.xpL.setVisible(vis)}
