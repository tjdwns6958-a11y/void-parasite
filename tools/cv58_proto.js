// 갑각·공허 기본 공격(물기) 연출 시안 — window.__vpK = 'c1'|'c2'|'c3'|'v1'|'v2'|'v3' (없으면 지금 v58). 판정·피해 그대로, 그림만.
window.cvInstall=function(s){const P=Object.getPrototypeOf(s);
 s.bmAdd=function(m,an){if(!window.__vpK)return P.bmAdd.call(this,m,an);(this.vh=this.vh||[]).push({m,an,t:0,x:m.x,y:m.y,sd:Math.random()*6})};
 s.brDraw=function(dt){const K=window.__vpK;if(!K)return P.brDraw.call(this,dt);
  const g=this.brG||(this.brG=this.add.graphics().setDepth(12));g.clear();if(this.over)return;
  const hd=this.hd,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx,S=this.bsc||1,W=(x,y)=>({x:hd.x+(fx*x-fy*y)*S,y:hd.y+(fy*x+fx*y)*S});
  this.vh=(this.vh||[]).filter(k=>{k.t+=dt;const T=k.t,m=k.m;if(m.on&&m.spr&&m.spr.active){k.x=m.spr.x;k.y=m.spr.y}const c=Math.cos(k.an),sn=Math.sin(k.an),hx=k.x-c*8,hy=k.y-sn*8;
   if(K=='c1'){if(T>.4)return false;const al=1-T/.4;for(let i=0;i<4;i++){const an=k.an+(i-1.5)*.7,d=4+30*T,x=hx+Math.cos(an)*d,y=hy+Math.sin(an)*d,r=2.2;g.fillStyle(0xbfeaff,al).fillTriangle(x,y-r,x+r*.7,y,x,y+r);g.fillTriangle(x,y-r,x-r*.7,y,x,y+r)}}
   if(K=='c2'){if(T>.45)return false;const al=T<.1?1:1-(T-.1)/.35;for(let i=0;i<5;i++){let an=k.sd+i*1.257,x=hx,y=hy;g.lineStyle(2.6,0x24304a,al*.8);const pts=[[x,y]];for(let j=0;j<3;j++){an+=(Math.sin(k.sd*7+i*3+j)*.6);x+=Math.cos(an)*4;y+=Math.sin(an)*4;pts.push([x,y])}g.beginPath().moveTo(pts[0][0],pts[0][1]);pts.slice(1).forEach(p=>g.lineTo(p[0],p[1]));g.strokePath();g.lineStyle(1.2,0xdff4ff,al).beginPath().moveTo(pts[0][0],pts[0][1]);pts.slice(1).forEach(p=>g.lineTo(p[0],p[1]));g.strokePath()}}
   if(K=='c3'){if(T>.5)return false;const al=T<.25?1:1-(T-.25)/.25,x=hx,y=hy;g.fillStyle(0x3a4a7a,al).fillTriangle(x-c*7-px*2.6,y-sn*7-py*2.6,x-c*7+px*2.6,y-sn*7+py*2.6,x+c*3,y+sn*3);g.fillStyle(0xdff4ff,al).fillTriangle(x-c*6-px*1.6,y-sn*6-py*1.6,x-c*6+px*1.6,y-sn*6+py*1.6,x+c*2,y+sn*2)}
   if(K=='v1'){if(T>.4)return false;const H=W(10,0);for(let i=0;i<5;i++){const u=Math.min(1,Math.max(0,(T-i*.04)/.28)),x=k.x+(H.x-k.x)*u*u+Math.sin(i*2+T*20)*2,y=k.y+(H.y-k.y)*u*u+Math.cos(i*2+T*20)*2;if(u<1)g.fillStyle(i%2?0xc070ff:0xf0c8ff,.9).fillCircle(x,y,1.8-u)}}
   if(K=='v2'){if(T>.3)return false;g.lineStyle(1.5,0xf0c8ff,1-T/.3).strokeCircle(hx,hy,4+T*30)}
   if(K=='v3'){if(T>.35)return false;g.lineStyle(2,0xc070ff,1-T/.35).strokeCircle(k.x,k.y,6+T*24)}
   return true});
  const E=this.brFx;if(!E)return;E.t+=dt;const q=E.t/.26;if(q>=1){this.brFx=null;return}
  const op=q<.35?q/.35:q<.52?1-(q-.35)/.17:0;
  if(K=='c1'){for(const sg of[-1,1]){const an=sg*op*.5,c=Math.cos(an),s2=Math.sin(an),R=([x,y])=>{const dx=x-5,dy=y;return W(5+dx*c-dy*s2,dx*s2+dy*c)};
    const pts=[[5,sg*3.5],[11,sg*7],[16,sg*2.2],[13,sg*1.4],[10,sg*4]].map(R);g.fillStyle(0x3a4a7a,1).fillPoints(pts.map(p=>({x:p.x,y:p.y})),true);
    const pin=[[6,sg*3.6],[11,sg*6.1],[15,sg*2.4],[12.6,sg*1.9],[10,sg*3.6]].map(R);g.fillStyle(0xbfeaff,1).fillPoints(pin,true)}}
  if(K=='c2'){const L2=q<.3?-2*q/.3:q<.5?-2+9*(q-.3)/.2:7*(1-(q-.5)/.5);hd.setPosition(hd.x+fx*L2*S,hd.y+fy*L2*S);if(q>.38&&q<.75){const al=1-(q-.38)/.37,C=W(3,0);g.lineStyle(2.4*S,0xbfeaff,al).beginPath().arc(C.x,C.y,7.5*S,a-1.1,a+1.1,false).strokePath()}}
  if(K=='c3'){const ext=q<.3?q/.3:q<.6?1:1-(q-.6)/.4,L=6+14*ext,A=W(6,-2.8),B=W(6,2.8),T=W(L,0);if(ext>.02){g.fillStyle(0x3a4a7a,1).fillTriangle(A.x,A.y,B.x,B.y,W(L+1,0).x,W(L+1,0).y);const A2=W(6.5,-1.8),B2=W(6.5,1.8);g.fillStyle(0xdff4ff,1).fillTriangle(A2.x,A2.y,B2.x,B2.y,T.x,T.y);g.lineStyle(.8*S,0x8ab0e0,1).lineBetween(W(7,0).x,W(7,0).y,T.x,T.y)}}
  if(K=='v1'){const R=1.5+4.8*(q<.6?Math.sin(Math.min(1,q/.4)*Math.PI/2):1-(q-.6)/.4),C=W(9,0);g.fillStyle(0xc070ff,.55).fillCircle(C.x,C.y,(R+1.6)*S);g.fillStyle(0x08020e,1).fillCircle(C.x,C.y,R*S);g.lineStyle(1*S,0xf0c8ff,.9).strokeCircle(C.x,C.y,R*S)}
  if(K=='v2'){const re=q<.45?q/.45:1-(q-.45)/.55,L=8+30*re;for(const sg of[-1,1]){const pts=[];for(let i=0;i<=10;i++){const t=i/10,x=6+(L-6)*t,y=sg*(3*(1-t)+Math.sin(t*Math.PI)*4*(1-re*.6))+Math.sin(t*9+q*25+sg)*1.2*t;pts.push(W(x,y))}
    for(let i=1;i<pts.length;i++){g.lineStyle((2.6-1.8*i/pts.length)*S,0x3d1b6b,1).lineBetween(pts[i-1].x,pts[i-1].y,pts[i].x,pts[i].y)}for(let i=1;i<pts.length;i++){g.lineStyle((1.6-1.2*i/pts.length)*S,0xc070ff,1).lineBetween(pts[i-1].x,pts[i-1].y,pts[i].x,pts[i].y)}const t2=pts[10];g.fillStyle(0xf0c8ff,1).fillCircle(t2.x,t2.y,1*S)}}
  if(K=='v3'){const o2=q<.25?q/.25:q<.75?1:1-(q-.75)/.25,C=W(30,0),hl=10*o2,hw=(q<.35?op:q<.52?op:0)*5+1;if(o2>0){const pts=[];for(let i=0;i<=16;i++){const t=i/16*Math.PI*2;pts.push({x:C.x+px*Math.cos(t)*hl+fx*Math.sin(t)*hw,y:C.y+py*Math.cos(t)*hl+fy*Math.sin(t)*hw})}g.fillStyle(0x08020e,.95).fillPoints(pts,true);g.lineStyle(1.4,0xc070ff,.95).strokePoints(pts,true);
    if(hw>1.5)for(const sg of[-1,1])for(let j=-1;j<=1;j++){const b={x:C.x+px*j*4+fx*sg*hw,y:C.y+py*j*4+fy*sg*hw},t={x:b.x-fx*sg*hw*.7,y:b.y-fy*sg*hw*.7};g.fillStyle(0xffffff,1).fillTriangle(b.x+px*1.3,b.y+py*1.3,b.x-px*1.3,b.y-py*1.3,t.x,t.y)}}}
 }};
