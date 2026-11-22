 // ===== v99 HUD: 왼쪽 위는 얇은 체력 한 줄 + 접힌 퀘스트 단추 · 맞았거나 체력이 낮을 때만 몸 위에 작은 체력 =====
 lqOpenGet(){return !!this.lqO}
 lqToggle(){this.lqO=!this.lqO;this.lqOt=this.time.now}
 // 접힘: 단추 누르면 펼침 · 펼침: 창 아무 데나 누르면 접힘
 lqTap(x,y){if(this.boss||!this.gQ||!this.gQ.visible)return false;const X=8,Y=30,W=this.lqO?232:(this.lqW||110),H=this.lqH||20;if(x<X-4||x>X+W+4||y<Y-4||y>Y+H+4)return false;this.lqToggle();return true}
 lqPill(q){return q.st=='ready'?'탈피 준비!':q.st=='done'?'진화 완료':q.st=='prog'?q.nm+' '+Math.min(q.a,q.c)+'/'+q.c:q.st=='cap'?'변이 한계':q.nm+' 잠김'}
 lqDraw(){const g=this.gQ||(this.gQ=this.add.graphics().setDepth(50));g.clear();const T=this.lqT||(this.lqT={});for(const k in T)T[k].__u=0;
  if((this.gfx&&!this.gfx.visible)||this.boss){for(const k in T)T[k].setVisible(false);return}
  const now=this.time.now,pu=.6+.4*Math.sin(now/170),Q=LK.map(k=>this.lqInfo(k)),X=8,Y=30,W=232;
  if(this.lqO&&now-(this.lqOt||0)>9000)this.lqO=false; // 펼친 창은 9초 뒤 저절로 접힘
  const f=this.lqFocus(Q),rd=f.st=='ready',dn=f.st=='done';
  if(!this.lqO){ // 접힌 단추: 표시 + 한 줄 + 아주 얇은 진행 막대
   const t=this.lqTx('p',X+22,Y+8,this.lqPill(f),{fontSize:'10px',fontStyle:'bold',color:rd?'#7be0a8':dn?'#ffe9a8':LCS[f.k]}).setOrigin(0,.5);
   const w=Math.ceil(t.width)+36;this.lqW=w;this.lqH=20;
   g.fillStyle(0x0d0818,.5).fillRoundedRect(X,Y,w,20,6);if(rd)g.lineStyle(1.5,0x7be0a8,pu).strokeRoundedRect(X,Y,w,20,6);
   g.fillStyle(dn?0xffe066:rd?0x7be0a8:0xffd34a,rd?pu:.9).fillCircle(X+11,Y+10,6);this.lqTx('pq',X+11,Y+10,dn?'★':'!',{fontSize:'9px',fontStyle:'bold',color:'#2a1a00'}).setOrigin(.5);
   if(!dn){g.fillStyle(0x3a2f57,1).fillRect(X+22,Y+16,w-36,2);g.fillStyle(this.lqCol(f),rd?pu:1).fillRect(X+22,Y+16,Math.max(1,(w-36)*f.r),2)}
   this.lqTx('pv',X+w-7,Y+10,'▾',{fontSize:'10px',color:'#a99fc2'}).setOrigin(1,.5);
  }else{ // 펼친 창: 세 계통 모두
   const H=24+3*40;this.lqH=H;this.lqW=W;g.fillStyle(0x0d0818,.72).fillRoundedRect(X,Y,W,H,8);
   this.lqTx('hd',X+10,Y+11,'진화 퀘스트',{fontSize:'10px',fontStyle:'bold',color:'#c8b8ff'}).setOrigin(0,.5);this.lqTx('tg',X+W-8,Y+11,'▴ 접기',{fontSize:'9px',fontStyle:'bold',color:'#a99fc2'}).setOrigin(1,.5);
   Q.forEach((q,i)=>{const y0=Y+22+i*40,r=q.st=='ready',d=q.st=='done',id='e'+i;g.fillStyle(0x3a2f57,.7).fillRect(X+10,y0-2,W-20,1);if(r)g.fillStyle(0x7be0a8,.08+.07*pu).fillRoundedRect(X+3,y0,W-6,38,5);
    g.fillStyle(d?0xffe066:r?0x7be0a8:0xffd34a,r?pu:1).fillCircle(X+14,y0+9,6);this.lqTx(id+'q',X+14,y0+9,d?'★':'!',{fontSize:'9px',fontStyle:'bold',color:'#2a1a00'}).setOrigin(.5);
    this.lqTx(id+'t',X+25,y0+9,this.lqTitle(q),{fontSize:'11px',fontStyle:'bold',color:LCS[q.k]}).setOrigin(0,.5);
    this.lqTx(id+'m',X+12,y0+23,this.lqMsg(q),{fontSize:'10px',color:r?'#7be0a8':d?'#ffe9a8':'#c9c0de',fontStyle:r?'bold':''}).setOrigin(0,.5);
    if(q.st=='prog'||r)this.lqTx(id+'c',X+W-8,y0+23,Math.min(q.a,q.c)+' / '+q.c,{fontSize:'10px',fontStyle:'bold',color:'#ece6f7'}).setOrigin(1,.5);
    g.fillStyle(0x3a2f57,1).fillRoundedRect(X+10,y0+31,W-20,4,2);g.fillStyle(this.lqCol(q),r?pu:1).fillRoundedRect(X+10,y0+31,Math.max(4,(W-20)*q.r),4,2)});
  }
  for(const k in T)if(!T[k].__u)T[k].setVisible(false)}
 // 몸 위 작은 체력: 최근 2.5초 안에 맞았거나 체력 35% 미만일 때만
 bodyHp(g){if(this.over||this.cine||this.molt||!this.pl)return;const now=this.time.now,r=Math.max(0,this.en/this.emax),lh=this.lastHit?now-this.lastHit.t:1e9,low=r<.35;
  let a=low?.9:lh<2000?1:lh<2500?(2500-lh)/500:0;if(a<=.01)return;const p=this.pl,w=38,x=Math.round(p.x-w/2),y=Math.round(p.y-30),gr=Math.min(1,(this.enG??this.en)/this.emax);
  g.fillStyle(0x07040e,.75*a).fillRoundedRect(x-2,y-2,w+4,8,3);if(gr>r)g.fillStyle(0xffffff,.55*a).fillRect(x,y,w*gr,4);
  const pu=.5+.5*Math.sin(now/150);g.fillStyle(r<.25?(pu>.5?0xff3a5a:0xd94f8c):0xd94f8c,a).fillRect(x,y,w*r,4)}
