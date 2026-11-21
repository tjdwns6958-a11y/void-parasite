 // ===== v53: 송곳니 한 쌍 — 서로 절대 교차하지 않게 다시 그림 =====
 // 각 송곳니 = 머리 앞의 2차 곡선(밑동 → 바깥쪽으로 볼록 → 끝). 가운데 선에서 잰 옆 거리가 모든 점에서 ≥ 2.4px(다물었을 때 끝) → 중심선 사이 ≥ 4.8px.
 // 테두리도 끝으로 갈수록 가늘게(3.2→1.0) → 테두리까지 포함해 눈에 보이는 틈 ≥ 약 3.8px.
 fangPts(sg,op){const L=8,b=3.5,P=[],B={x:0,y:b},Cc={x:L*.6,y:b+1.5+op*5},T={x:L*.95,y:2.4+op*4.6};
  for(let i=0;i<=8;i++){const t=i/8,u=1-t;P.push({x:u*u*B.x+2*u*t*Cc.x+t*t*T.x,y:sg*(u*u*B.y+2*u*t*Cc.y+t*t*T.y)})}return P}
 jawDraw(g,q,al){const hd=this.hd,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx;if(!hd||!hd.visible)return;
  const op=q<.35?q/.35:q<.52?1-(q-.35)/.17:0,snap=q>=.5&&q<.66?1-Math.abs(q-.58)/.08:0,hx=hd.x+fx*7*S,hy=hd.y+fy*7*S;
  for(const sg of[-1,1]){const P=this.fangPts(sg,op).map(p=>({x:hx+(fx*p.x+px*p.y)*S,y:hy+(fy*p.x+py*p.y)*S}));
   for(let i=1;i<P.length;i++){g.lineStyle((3.2-2.2*i/P.length)*S,0x3d1b6b,1).lineBetween(P[i-1].x,P[i-1].y,P[i].x,P[i].y)}for(let i=1;i<P.length;i++){g.lineStyle((2.2-1.8*i/P.length)*S,0xfff0f8,1).lineBetween(P[i-1].x,P[i-1].y,P[i].x,P[i].y)}}
  if(snap>0)g.fillStyle(0xffffff,snap).fillCircle(hd.x+fx*17*S,hd.y+fy*17*S,2.2*S)}
