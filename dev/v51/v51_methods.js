 // ===== v51: 머리 턱(씹는) 모션 시안 J1 송곳니 한 쌍 / J2 둥근 입 / J3 이빨 자국 — window.__vpJaw (기본 1) =====
 // q = 물기 진행(0~1, 0.34초), al = 사라지는 정도. 움츠릴 때(q<.35) 벌리고, 튀어 나갈 때(.35~.52) 다문다. 서로 겹치지 않게 '닿기 직전'에서 멈춘다.
 jawDraw(g,q,al){const V=+(window.__vpJaw||1),hd=this.hd,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx;if(!hd||!hd.visible)return;
  const op=q<.35?q/.35:q<.52?1-(q-.35)/.17:0,snap=q>=.5&&q<.66?1-Math.abs(q-.58)/.08:0,hx=hd.x+fx*7*S,hy=hd.y+fy*7*S;
  if(V==1){ // 송곳니 한 쌍: 휘어진 송곳니 둘이 벌어졌다가 가운데 닿기 직전까지 모임
   for(const sg of[-1,1]){const base={x:hx+px*5*sg*S,y:hy+py*5*sg*S},sw=.15+op*.95,P=[];for(let i=0;i<=6;i++){const t=i/6,ang=a+sg*sw-sg*t*(.9+sw*.6),r=t*12*S;P.push({x:base.x+Math.cos(ang)*r*1+Math.cos(a)*t*2*S,y:base.y+Math.sin(ang)*r+Math.sin(a)*t*2*S})}
    g.lineStyle(4.6*S,0x3d1b6b,1).strokePoints(P,false);for(let i=1;i<P.length;i++){g.lineStyle((3.2-2.6*i/P.length)*S,0xfff0f8,1).lineBetween(P[i-1].x,P[i-1].y,P[i].x,P[i].y)}}
   if(snap>0)g.fillStyle(0xffffff,snap).fillCircle(hd.x+fx*19*S,hd.y+fy*19*S,3.5*S)}
  else if(V==2){ // 둥근 입: 머리 앞 동그란 입이 벌어졌다가 이빨이 가운데로 모이며 닫힘
   const r=(1.5+op*6.5)*S,cx=hd.x+fx*11*S,cy=hd.y+fy*11*S;if(r>1.6*S){g.fillStyle(0x3d1b6b,1).fillCircle(cx,cy,r+1.8*S);g.fillStyle(0x12061e,1).fillCircle(cx,cy,r);
    for(let i=0;i<7;i++){const an=i/7*6.283+a,x=cx+Math.cos(an)*r,y=cy+Math.sin(an)*r,inn=an+Math.PI,w=1.1*S,len=Math.min(r*.75,4*S);g.fillStyle(0xfff0f8,1).fillTriangle(x+Math.cos(inn+1.57)*w,y+Math.sin(inn+1.57)*w,x-Math.cos(inn+1.57)*w,y-Math.sin(inn+1.57)*w,x+Math.cos(inn)*len,y+Math.sin(inn)*len)}}
   if(snap>0)g.lineStyle(2*S,0xffffff,snap).strokeCircle(cx,cy,(3+(1-snap)*8)*S)}
  else{ // 이빨 자국: 머리엔 없음. 물리는 자리(앞 22)에 위·아래 이빨 줄이 나타나 가운데로 조여 물린 자국을 남김
   if(q>.3){const k=Math.min(1,(q-.3)/.22),gap=(1-k)*9+1.5,cx=hd.x+fx*22*S,cy=hd.y+fy*22*S,A=q<.75?1:al;
    for(const sg of[-1,1]){for(let i=-2;i<=2;i++){const ox=cx+fx*i*3.6*S+px*gap*sg*S,oy=cy+fy*i*3.6*S+py*gap*sg*S,tip={x:ox-px*sg*4*S,y:oy-py*sg*4*S};
      g.fillStyle(0xfff0f8,A).fillTriangle(ox+fx*1.6*S,oy+fy*1.6*S,ox-fx*1.6*S,oy-fy*1.6*S,tip.x,tip.y)}
     g.lineStyle(1.4*S,0xffd0e8,A*.8).lineBetween(cx-fx*9*S+px*(gap+.5)*sg*S,cy-fy*9*S+py*(gap+.5)*sg*S,cx+fx*9*S+px*(gap+.5)*sg*S,cy+fy*9*S+py*(gap+.5)*sg*S)}
    if(snap>0)g.fillStyle(0xffffff,snap*.8).fillCircle(cx,cy,3*S)}}}
 // 땅울음 솟구치기 (v51): 화면 흔들림은 가까울 때만 약하게, 대신 솟은 자리에 땅 갈라짐 + 흙 튐
 rkBurst(m){const p=this.pl,d=Math.hypot(m.x-p.x,m.y-p.y);if(d<170)this.cameras.main.shake(90,.0022*(1-d/170)+.0006);
  const g=this.add.graphics().setDepth(1.6);let sd=(m.x*7+m.y*13)|0;const R=()=>{sd=(sd*16807+11)%2147483647;return (sd%1000)/1000};
  g.lineStyle(2.2,0x2a1a3a,.95);for(let i=0;i<7;i++){let a=i/7*6.283+R()*.6,x=m.x,y=m.y+6;g.beginPath().moveTo(x,y);for(let j=0;j<3;j++){a+=(R()-.5)*.8;const L=8+R()*10;x+=Math.cos(a)*L;y+=Math.sin(a)*L*.6;g.lineTo(x,y)}g.strokePath()}
  g.fillStyle(0x1a1024,.55).fillEllipse(m.x,m.y+6,46,22);this.tweens.add({targets:g,alpha:0,delay:350,duration:700,onComplete:()=>g.destroy()});
  for(let i=0;i<10;i++){const a=i/10*6.283,b=this.add.rectangle(m.x,m.y+4,3+R()*2,3,i%2?0x8a7aa0:0x5a4a70).setDepth(12);this.tweens.add({targets:b,x:m.x+Math.cos(a)*(26+R()*18),y:m.y+Math.sin(a)*(14+R()*10)-10,alpha:0,angle:R()*180,duration:420,ease:'Quad.out',onComplete:()=>b.destroy()})}}
