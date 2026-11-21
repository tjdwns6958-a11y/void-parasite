 // ===== v52: 머리 턱 = J1 송곳니 한 쌍 확정, 크기 줄임 (길이 12→8, 굵기 약 70%, 간격 5→3.5, 번쩍임 작게) =====
 jawDraw(g,q,al){const hd=this.hd,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx;if(!hd||!hd.visible)return;
  const op=q<.35?q/.35:q<.52?1-(q-.35)/.17:0,snap=q>=.5&&q<.66?1-Math.abs(q-.58)/.08:0,hx=hd.x+fx*7*S,hy=hd.y+fy*7*S,LEN=8;
  for(const sg of[-1,1]){const base={x:hx+px*3.5*sg*S,y:hy+py*3.5*sg*S},sw=.15+op*.95,P=[];for(let i=0;i<=6;i++){const t=i/6,ang=a+sg*sw-sg*t*(.9+sw*.6),r=t*LEN*S;P.push({x:base.x+Math.cos(ang)*r+Math.cos(a)*t*1.4*S,y:base.y+Math.sin(ang)*r+Math.sin(a)*t*1.4*S})}
   g.lineStyle(3.2*S,0x3d1b6b,1).strokePoints(P,false);for(let i=1;i<P.length;i++){g.lineStyle((2.3-1.9*i/P.length)*S,0xfff0f8,1).lineBetween(P[i-1].x,P[i-1].y,P[i].x,P[i].y)}}
  if(snap>0)g.fillStyle(0xffffff,snap).fillCircle(hd.x+fx*15*S,hd.y+fy*15*S,2.5*S)}
