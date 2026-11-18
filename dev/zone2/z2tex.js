function z2Tex(s){
 const el=(x,cx,cy,rx,ry,col)=>{x.fillStyle=col;for(let i=-Math.ceil(rx);i<=rx;i++)for(let j=-Math.ceil(ry);j<=ry;j++)if((i/rx)**2+(j/ry)**2<=1)x.fillRect(Math.round(cx+i),Math.round(cy+j),1,1)};
 const ln=(x,x0,y0,x1,y1,col,w)=>{const n=Math.ceil(Math.hypot(x1-x0,y1-y0)*2);for(let i=0;i<=n;i++){const t=i/n;if(w)disc(x,x0+(x1-x0)*t,y0+(y1-y0)*t,w,col);else{x.fillStyle=col;x.fillRect(Math.round(x0+(x1-x0)*t),Math.round(y0+(y1-y0)*t),1,1)}}};
 // 2구역 바닥: 더 깊은 남보랏빛 + 희미한 발광 점
 tex(s,'floor2',20,20,2,x=>{x.fillStyle='#141629';x.fillRect(0,0,20,20);for(let i=0;i<60;i++){x.fillStyle=Math.random()<.5?'#1a1d36':'#0f1020';x.fillRect(rnd(20),rnd(20),1,1)}if(Math.random()<.7){x.fillStyle='#2c3a66';x.fillRect(rnd(20),rnd(20),1,1)}x.fillStyle='#181a31';x.fillRect(0,0,20,1);x.fillRect(0,0,1,20)});
 // 공허 산호 (부채꼴)
 tex(s,'cor',22,26,2,x=>{el(x,11,23,8,2,'rgba(0,0,0,.45)');
  const br=[[-1,-.5],[-.78,-.85],[-.4,-1.05],[0,-1.12],[.4,-1.05],[.78,-.85],[1,-.5]],ox=11,oy=21;
  for(const[dx,dy]of br)ln(x,ox,oy,ox+dx*10,oy+dy*12,'#24093c',1.3);
  disc(x,ox,oy,3.4,'#24093c');
  for(const[dx,dy]of br)for(let t=0;t<=10;t+=.5){x.fillStyle=t<3?'#5a2088':t<7?'#9a48d0':'#d488f4';x.fillRect(Math.round(ox+dx*t),Math.round(oy+dy*t*1.2),1,1)}
  for(const[dx,dy]of br){const ex=Math.round(ox+dx*10),ey=Math.round(oy+dy*12);x.fillStyle='#f0a8ff';x.fillRect(ex-1,ey,3,1);x.fillStyle='#fff0ff';x.fillRect(ex,ey-1,1,1)}
  for(const[dx,dy]of [[-.6,-.95],[.6,-.95],[-.2,-1.1],[.2,-1.1]]){const ex=Math.round(ox+dx*6),ey=Math.round(oy+dy*7);x.fillStyle='#e8a0ff';x.fillRect(ex,ey,1,1)}
  disc(x,ox,oy,2.4,'#4a1a70');x.fillStyle='#7a38b0';x.fillRect(ox-1,oy-1,2,1)});
 tex(s,'corS',14,7,2,x=>{el(x,7,4,6,2.4,'#1a0628');el(x,7,3.6,4.6,1.6,'#3a1458');x.fillStyle='#7a38b0';x.fillRect(4,2,1,1);x.fillRect(8,1,1,2);x.fillRect(10,2,1,1);x.fillStyle='#c070f0';x.fillRect(8,1,1,1)});
 // 가시 산호충: 가시 왕관 + 노란 눈
 tex(s,'spn',16,16,2,x=>{for(let k=0;k<5;k++){const a=-2.7+k*.6;ln(x,8,9,8+Math.cos(a)*7.4,9+Math.sin(a)*7.4,'#1a0828',1)}
  for(let k=0;k<5;k++){const a=-2.7+k*.6;for(let t=2;t<=7;t+=.5){x.fillStyle=t>5.5?'#ffe0ff':'#c070ff';x.fillRect(Math.round(8+Math.cos(a)*t),Math.round(9+Math.sin(a)*t),1,1)}}
  disc(x,8,10,4.9,'#1a0828');disc(x,8,10,4.1,'#6a2a90');disc(x,7,9,2.2,'#8a4ab8');disc(x,8,10.5,2.1,'#3a1a08');disc(x,8,10.5,1.5,'#ffe066');x.fillStyle='#fff8c0';x.fillRect(7,10,1,1);x.fillStyle='#3a1a08';x.fillRect(8,11,1,1)});
 tex(s,'ndl',9,3,2,x=>{x.fillStyle='#3a1458';x.fillRect(0,0,8,3);x.fillStyle='#e0a0ff';x.fillRect(1,1,6,1);x.fillStyle='#fff0c0';x.fillRect(6,1,3,1)});
 // 산호 여왕 (정예): 둥근 몸 + 산호 왕관
 tex(s,'qn',30,30,2,x=>{el(x,15,26,11,3,'rgba(0,0,0,.45)');
  for(let k=0;k<7;k++){const a=-2.75+k*.4,bx=15+Math.cos(a)*9,by=17+Math.sin(a)*9,L=k==3?8:k%2?6:7;ln(x,bx,by,bx+Math.cos(a)*L,by+Math.sin(a)*L,'#1a0828',1.1)}
  for(let k=0;k<7;k++){const a=-2.75+k*.4,bx=15+Math.cos(a)*9,by=17+Math.sin(a)*9,L=k==3?8:k%2?6:7;for(let t=0;t<=L;t+=.5){x.fillStyle=t>L-1.5?'#ffd0ff':'#c060f0';x.fillRect(Math.round(bx+Math.cos(a)*t),Math.round(by+Math.sin(a)*t),1,1)}const ex=bx+Math.cos(a)*L*.6,ey=by+Math.sin(a)*L*.6;x.fillStyle='#e090ff';x.fillRect(Math.round(ex+Math.cos(a+1.4)*1.5),Math.round(ey+Math.sin(a+1.4)*1.5),1,1)}
  disc(x,15,18,10.6,'#1a0828');disc(x,15,18,9.8,'#4e2484');disc(x,14,17,8,'#5e2c9c');disc(x,12,15,4.4,'#7440b8');disc(x,11,14,1.8,'#9060d0');
  for(const[a,b]of[[19,21],[9,21],[20,15],[16,23]]){x.fillStyle='#3a1868';x.fillRect(a,b,2,1)}
  x.fillStyle='#ffe066';x.fillRect(11,19,1,1);x.fillRect(18,19,1,1);x.fillStyle='#fff8c0';x.fillRect(11,18,1,1);x.fillRect(18,18,1,1);
  x.fillStyle='#24093c';x.fillRect(12,23,6,1);x.fillStyle='#ff9ad8';x.fillRect(13,23,1,1);x.fillRect(16,23,1,1)});
 // 빛 포자
 tex(s,'lsp',12,12,2,x=>{disc(x,6,6,5.6,'rgba(255,214,90,.22)');disc(x,6,6,4.2,'rgba(255,224,102,.45)');disc(x,6,6,2.8,'#ffd040');disc(x,6,6,1.8,'#fff4b0');x.fillStyle='#ffffff';x.fillRect(5,5,1,1);x.fillStyle='#ffcf40';x.fillRect(6,0,1,2);x.fillRect(6,10,1,2);x.fillRect(0,6,2,1);x.fillRect(10,6,2,1)});
 tex(s,'lar',12,3,2,x=>{x.fillStyle='#7a5410';x.fillRect(0,0,11,3);x.fillStyle='#ffd040';x.fillRect(1,1,9,1);x.fillStyle='#ffffff';x.fillRect(8,1,4,1)});
 // 감시자 (정예): 오른쪽을 보는 갑각 생물 · 등의 발광 기관에서 미끼 줄기가 머리 앞으로
 tex(s,'wd',34,28,2,x=>{el(x,16,24,14,3,'rgba(0,0,0,.45)');
  for(const lx of[9,14,19,23]){ln(x,lx,8,lx-2,2,'#140d20',.8);ln(x,lx,19,lx-2,25,'#140d20',.8);x.fillStyle='#4a3a68';x.fillRect(lx-2,2,1,1);x.fillRect(lx-2,25,1,1)}
  el(x,15,13.5,12,9,'#140d20');el(x,15,13.5,11,8,'#3a2d55');el(x,14,10.5,8,3.2,'#4f3f72');el(x,13,9.5,5,1.4,'#6a5890');
  for(const sx of[8,12,16,20]){for(let y=6;y<=21;y++){const dy=(y-13.5)/8;if(Math.abs(dy)<=1&&Math.abs(sx-15)/11<=Math.sqrt(1-dy*dy)){x.fillStyle='#261c3a';x.fillRect(sx,y,1,1)}}}
  el(x,27,13.5,4.6,6,'#140d20');el(x,27,13.5,3.8,5.2,'#4a3a68');el(x,28,12,2,2,'#5e4c80');
  x.fillStyle='#ffe066';x.fillRect(29,9,2,2);x.fillRect(29,16,2,2);x.fillStyle='#fff8c0';x.fillRect(30,9,1,1);x.fillRect(30,16,1,1);
  x.fillStyle='#8a78a8';x.fillRect(31,11,2,1);x.fillRect(31,15,2,1);
  el(x,4,13.5,2.6,4,'#3a1a08');el(x,4,13.5,1.9,3.2,'#ff8a3a');el(x,4,13.5,1,2,'#ffd8a0');
  ln(x,6,13,30,13,'#2a1a10');ln(x,6,14,30,14,'#7a5a30');
  disc(x,32,13.5,1.9,'#fff0a0');x.fillStyle='#ffffff';x.fillRect(32,13,1,1)});
 // 등불 기둥 (감시탑의 고정 광원)
 tex(s,'lamp',18,24,2,x=>{el(x,9,21,7,2.4,'rgba(0,0,0,.45)');x.fillStyle='#1a1426';x.fillRect(4,9,10,13);x.fillStyle='#3c3150';x.fillRect(5,10,8,11);x.fillStyle='#5a4d70';x.fillRect(5,10,2,11);x.fillStyle='#2a2238';x.fillRect(5,14,8,1);x.fillRect(5,18,8,1);
  x.fillStyle='#1a1426';x.fillRect(3,7,12,3);x.fillStyle='#4a3d5c';x.fillRect(4,8,10,1);disc(x,9,5,4.4,'#5a4010');disc(x,9,5,3.6,'#ffd050');disc(x,9,5,2.4,'#fff0a0');disc(x,8,4,1,'#ffffff')});
}
