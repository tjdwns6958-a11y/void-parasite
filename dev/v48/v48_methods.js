 // ===== v48: 물기 범위 모양 4안 (window.__vpBR = 1 둥근 부채꼴 / 2 둥근 타원 / 3 둥근 사다리꼴 / 4 위아래 턱) + 턱 다무는 모션 =====
 // 모든 모양은 예전 판정(반지름 64 · 앞쪽 cos>.3 부채꼴)과 닿는 거리 63~65, 면적 101~105%로 맞춤. 판정 = 모양 안 또는 테두리에서 6px 이내.
 brV(){return +(window.__vpBR||1)}
 brPoly(){const V=this.brV();this._bp=this._bp||{};if(this._bp[V])return this._bp[V];
  const ch=(P,n)=>{for(let k=0;k<n;k++){const Q=[];for(let i=0;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length];Q.push({x:a.x*.75+b.x*.25,y:a.y*.75+b.y*.25},{x:a.x*.25+b.x*.75,y:a.y*.25+b.y*.75})}P=Q}return P};
  const L=(P,a,b,n)=>{for(let i=0;i<n;i++){const t=i/n;P.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t})}};let P=[];
  if(V==2){for(let i=0;i<48;i++){const t=i/48*6.283;P.push({x:28+Math.cos(t)*30,y:Math.sin(t)*42})}}
  else if(V==3){const R=54,h0=22,h1=50,b=6;L(P,{x:6,y:h0},{x:6,y:-h0},4);L(P,{x:6,y:-h0},{x:R,y:-h1},6);for(let i=0;i<8;i++){const y=-h1+2*h1*i/8;P.push({x:R+b*(1-(y/h1)**2),y})}L(P,{x:R,y:h1},{x:6,y:h0},6);P=ch(P,3)}
  else{const r=58,h=1.15;L(P,{x:6,y:8},{x:6,y:-8},3);L(P,{x:6,y:-8},{x:Math.cos(h)*r,y:-Math.sin(h)*r},6);for(let i=0;i<=12;i++){const t=-h+2*h*i/12;P.push({x:Math.cos(t)*r,y:Math.sin(t)*r})}L(P,{x:Math.cos(h)*r,y:Math.sin(h)*r},{x:6,y:8},6);P=ch(P,3)}
  return this._bp[V]=P}
 inBite(dx,dy,fx,fy,ex){const f=(C.BITE.range+(ex||0))/C.BITE.range,x=(dx*fx+dy*fy)/f,y=(dy*fx-dx*fy)/f,P=this.brPoly();
  let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a.y>y)!=(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)c=!c}if(c)return true;
  for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[j],b=P[i],ux=b.x-a.x,uy=b.y-a.y,t=Math.max(0,Math.min(1,((x-a.x)*ux+(y-a.y)*uy)/(ux*ux+uy*uy||1)));if(Math.hypot(a.x+ux*t-x,a.y+uy*t-y)<=6)return true}return false}
 // 물기 효과: 범위 모양 + 모양별 '무는' 움직임 + 머리 턱 다물기 (0.34초, 앞으로 12px 따라 밀림)
 brDraw(dt){const g=this.brG||(this.brG=this.add.graphics().setDepth(12));g.clear();const E=this.brFx;if(!E||this.over)return;E.t+=dt;const D=.34,q=E.t/D;if(q>=1){this.brFx=null;return}
  const V=this.brV(),c=Math.cos(E.an),s=Math.sin(E.an),k=Math.min(1,q/.6),ox=E.x+c*12*k,oy=E.y+s*12*k,W=(x,y)=>({x:ox+c*x-s*y,y:oy+s*x+c*y}),al=q<.55?1:1-(q-.55)/.45;
  const P=this.brPoly().map(p=>W(p.x,p.y));g.fillStyle(0xffffff,.11*al).fillPoints(P,true);g.lineStyle(1.5,0xffffff,.55*al).strokePoints(P,true);
  const tooth=(x,y,ang,len,w)=>{const p=W(x,y),A=ang+E.an;g.fillStyle(0xfff0f8,al).fillTriangle(p.x+Math.cos(A+1.57)*w,p.y+Math.sin(A+1.57)*w,p.x-Math.cos(A+1.57)*w,p.y-Math.sin(A+1.57)*w,p.x+Math.cos(A)*len,p.y+Math.sin(A)*len)};
  if(V==1){for(const d of[0,.18]){const r=10+50*Math.max(0,Math.min(1,(q-d)/.5));if(q>d&&q<d+.6){const w=W(0,0);g.lineStyle(2.5,0xffd0f0,(1-(q-d)/.6)*.9).beginPath().arc(w.x,w.y,r,E.an-1.1,E.an+1.1,false).strokePath()}}}
  else if(V==2){const sq=1-.45*Math.min(1,q/.45);for(let i=0;i<12;i++){const t=i/12*6.283,x=28+Math.cos(t)*30*sq,y=Math.sin(t)*42*sq;tooth(x,y,Math.atan2(-y,28-x),6,2.2)}}
  else if(V==3){const pull=Math.min(1,q/.5),x=58-34*pull;for(let i=0;i<7;i++){const y=(-1+2*i/6)*(22+28*(x-6)/48);tooth(x,y,Math.PI,6,2.2)}}
  else{const cl=Math.min(1,q/.45),h=1.15*(1-cl)+.06;for(const sg of[-1,1]){const pts=[];for(let i=0;i<=8;i++){const r=14+44*i/8;pts.push(W(Math.cos(h*sg)*r,Math.sin(h*sg)*r))}g.lineStyle(5,0x3d1b6b,al).strokePoints(pts,false);g.lineStyle(3,0xffd0f0,al).strokePoints(pts,false);
    for(let i=1;i<=4;i++){const r=14+44*i/5,ang=h*sg;tooth(Math.cos(ang)*r,Math.sin(ang)*r,ang-sg*1.57,6,2)}}if(cl>=1&&q<.6){const w=W(40,0);g.fillStyle(0xffffff,1-(q-.45)/.15).fillCircle(w.x,w.y,7)}}
  // 머리 턱: 움츠릴 때 벌렸다가 튀어 나가는 순간 '딱' 다묾 + 흰 번쩍
  const hd=this.hd,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx;if(!hd||!hd.visible)return;
  const open=q<.35?.2+q/.35*.85:q<.52?1.05-(q-.35)/.17*1.2:-.15,hx=hd.x+fx*6*S,hy=hd.y+fy*6*S;
  for(const sg of[-1,1]){const bx=hx+px*4*sg*S,by=hy+py*4*sg*S,an=a+sg*open*.9,ex=bx+Math.cos(an)*10*S,ey=by+Math.sin(an)*10*S,tx=ex+Math.cos(a-sg*.9)*7*S,ty=ey+Math.sin(a-sg*.9)*7*S;
   g.lineStyle(4.2*S,0x3d1b6b,1).beginPath().moveTo(bx,by).lineTo(ex,ey).lineTo(tx,ty).strokePath();g.lineStyle(2.2*S,0xffd0e8,1).beginPath().moveTo(bx,by).lineTo(ex,ey).lineTo(tx,ty).strokePath()}
  if(q>.48&&q<.62)g.fillStyle(0xffffff,1-Math.abs(q-.55)/.07).fillCircle(hd.x+fx*20*S,hd.y+fy*20*S,5*S)}
