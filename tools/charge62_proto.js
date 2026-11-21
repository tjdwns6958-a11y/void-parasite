// 갑각 차지 모션 시안 — window.__vpM: 0 지금 · 1 웅크려 구르기 · 2 수정 쌓기 · 3 몸 압축 스프링
window.cmInstall=function(s){const P=Object.getPrototypeOf(s);
 const dia=(g,x,y,r,c)=>{g.fillStyle(0x24304a,1).fillTriangle(x,y-r-1,x+r*.8,y,x,y+r+1);g.fillTriangle(x,y-r-1,x-r*.8,y,x,y+r+1);g.fillStyle(c,1).fillTriangle(x,y-r,x+r*.6,y,x,y+r);g.fillTriangle(x,y-r,x-r*.6,y,x,y+r)};
 s.chgDraw=function(g){const M=window.__vpM|0;if(!M)return P.chgDraw.call(this,g);const C2=this.chg,hd=this.hd;if(!C2||!hd||!hd.visible)return;
  const f=C2.t/1.2,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx,now=this.time.now/1000,sg=this.sg,full=f>=1;
  if(M==1){ // 몸을 공처럼 말아 머리 뒤에서 빙글빙글 — 다 차면 하얗게
   const cx=hd.x-fx*7*S,cy=hd.y-fy*7*S,sp=now*(4+16*f);sg.forEach((o,i)=>{const an=sp+i*1.257,tx=cx+Math.cos(an)*7*S,ty=cy+Math.sin(an)*7*S,k=Math.min(1,f*2.2);o.setPosition(o.x+(tx-o.x)*k,o.y+(ty-o.y)*k)});
   if(f>.3)g.lineStyle(1.5*S,full&&Math.sin(now*30)>0?0xffffff:0xbfeaff,.25+.5*f).strokeCircle(cx,cy,11*S);for(let i=0;i<3;i++){const an=-sp*1.3+i*2.09;g.lineStyle(1.2*S,0xdff4ff,.5*f).beginPath().arc(cx,cy,13*S,an,an+.6,false).strokePath()}}
  if(M==2){ // 머리 앞에 수정 뿔이 자라고, 마디마다 수정이 하나씩 돋음
   const L=(3+11*f)*S,w=(2+1.6*f)*S,bx=hd.x+fx*6*S,by=hd.y+fy*6*S,tx=bx+fx*L,ty=by+fy*L;g.fillStyle(0x24304a,1).fillTriangle(bx+px*(w+1),by+py*(w+1),bx-px*(w+1),by-py*(w+1),tx+fx*1.2,ty+fy*1.2);g.fillStyle(full&&Math.sin(now*30)>0?0xffffff:0xbfeaff,1).fillTriangle(bx+px*w,by+py*w,bx-px*w,by-py*w,tx,ty);g.fillStyle(0xffffff,.8).fillTriangle(bx+px*w*.3,by+py*w*.3,bx,by,tx,ty);
   sg.forEach((o,i)=>{if(f*5>i+.5)dia(g,o.x-px*5*S,o.y-py*5*S,(2.4-i*.25)*S,i%2?0xbfeaff:0xffffff)})}
  if(M==3){ // 몸이 머리 쪽으로 꾹 눌려 짧아지고 떨림 — 용수철
   const k=.6*f,j=(Math.random()-.5)*1.6*f*S;hd.setPosition(hd.x-fx*2*f*S+px*j,hd.y-fy*2*f*S+py*j);sg.forEach((o,i)=>{o.setPosition(hd.x+(o.x-hd.x)*(1-k)+px*j*(i%2?-1:1),hd.y+(o.y-hd.y)*(1-k)+py*j*(i%2?-1:1))});
   if(full){g.lineStyle(1.2*S,0xffffff,.6).strokeCircle(hd.x,hd.y,8*S)}}};
 s.moApply=function(dt){const mo=this.mo;P.moApply.call(this,dt);const M=window.__vpM|0;if(!mo||mo.k!='bite'||mo.bk!='c'||!mo.sf)return;const q=mo.t/mo.dur,hd=this.hd,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a);
  if(M==3&&q<.7){const st=1+.9*mo.sf*(1-q/.7);this.sg.forEach(o=>o.setPosition(hd.x+(o.x-hd.x)*st,hd.y+(o.y-hd.y)*st))}
  if(M==1&&q<.45){const cx=hd.x-fx*7*S,cy=hd.y-fy*7*S,k=1-q/.45,sp=this.time.now/1000*20;this.sg.forEach((o,i)=>{const an=sp+i*1.257,tx=cx+Math.cos(an)*7*S,ty=cy+Math.sin(an)*7*S;o.setPosition(o.x+(tx-o.x)*k,o.y+(ty-o.y)*k)})}}};
