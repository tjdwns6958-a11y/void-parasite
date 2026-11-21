 // ===== v49: 물기 범위 = R1 둥근 부채꼴 확정, 각도 좁힘 (반지름 58 · 기본 ±40°, 테스트용 window.__vpBRA = 각도) + 턱 다무는 모션 =====
 brDeg(){return +(window.__vpBRA||40)}
 brPoly(){const D=this.brDeg();this._bp=this._bp||{};if(this._bp[D])return this._bp[D];
  const ch=(P,n)=>{for(let k=0;k<n;k++){const Q=[];for(let i=0;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length];Q.push({x:a.x*.75+b.x*.25,y:a.y*.75+b.y*.25},{x:a.x*.25+b.x*.75,y:a.y*.25+b.y*.75})}P=Q}return P};
  const L=(P,a,b,n)=>{for(let i=0;i<n;i++){const t=i/n;P.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t})}};const r=58,h=D*Math.PI/180;let P=[];
  L(P,{x:6,y:8},{x:6,y:-8},3);L(P,{x:6,y:-8},{x:Math.cos(h)*r,y:-Math.sin(h)*r},6);for(let i=0;i<=12;i++){const t=-h+2*h*i/12;P.push({x:Math.cos(t)*r,y:Math.sin(t)*r})}L(P,{x:Math.cos(h)*r,y:Math.sin(h)*r},{x:6,y:8},6);
  return this._bp[D]=ch(P,3)}
 // 판정 = 부채꼴 안 또는 테두리 6px 이내 (보스 추가 사거리 ex는 (64+ex)/64배로 키움)
 inBite(dx,dy,fx,fy,ex){const f=(C.BITE.range+(ex||0))/C.BITE.range,x=(dx*fx+dy*fy)/f,y=(dy*fx-dx*fy)/f,P=this.brPoly();
  let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a.y>y)!=(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)c=!c}if(c)return true;
  for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[j],b=P[i],ux=b.x-a.x,uy=b.y-a.y,t=Math.max(0,Math.min(1,((x-a.x)*ux+(y-a.y)*uy)/(ux*ux+uy*uy||1)));if(Math.hypot(a.x+ux*t-x,a.y+uy*t-y)<=6)return true}return false}
 // 물기 효과: 부채꼴 + 입에서 퍼지는 물결 호 두 겹 + 머리 턱 다물기 (0.34초, 앞으로 12px 따라 밀림)
 brDraw(dt){const g=this.brG||(this.brG=this.add.graphics().setDepth(12));g.clear();const E=this.brFx;if(!E||this.over)return;E.t+=dt;const D=.34,q=E.t/D;if(q>=1){this.brFx=null;return}
  const h=this.brDeg()*Math.PI/180,c=Math.cos(E.an),s=Math.sin(E.an),k=Math.min(1,q/.6),ox=E.x+c*12*k,oy=E.y+s*12*k,W=(x,y)=>({x:ox+c*x-s*y,y:oy+s*x+c*y}),al=q<.55?1:1-(q-.55)/.45;
  const P=this.brPoly().map(p=>W(p.x,p.y));g.fillStyle(0xffffff,.11*al).fillPoints(P,true);g.lineStyle(1.5,0xffffff,.55*al).strokePoints(P,true);
  for(const d of[0,.18]){const r=10+46*Math.max(0,Math.min(1,(q-d)/.5));if(q>d&&q<d+.6){const w=W(0,0);g.lineStyle(2.5,0xffd0f0,(1-(q-d)/.6)*.9).beginPath().arc(w.x,w.y,r,E.an-h*.92,E.an+h*.92,false).strokePath()}}
  const hd=this.hd,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx;if(!hd||!hd.visible)return;
  const open=q<.35?.2+q/.35*.85:q<.52?1.05-(q-.35)/.17*1.2:-.15,hx=hd.x+fx*6*S,hy=hd.y+fy*6*S;
  for(const sg of[-1,1]){const bx=hx+px*4*sg*S,by=hy+py*4*sg*S,an=a+sg*open*.9,ex=bx+Math.cos(an)*10*S,ey=by+Math.sin(an)*10*S,tx=ex+Math.cos(a-sg*.9)*7*S,ty=ey+Math.sin(a-sg*.9)*7*S;
   g.lineStyle(4.2*S,0x3d1b6b,1).beginPath().moveTo(bx,by).lineTo(ex,ey).lineTo(tx,ty).strokePath();g.lineStyle(2.2*S,0xffd0e8,1).beginPath().moveTo(bx,by).lineTo(ex,ey).lineTo(tx,ty).strokePath()}
  if(q>.48&&q<.62)g.fillStyle(0xffffff,1-Math.abs(q-.55)/.07).fillCircle(hd.x+fx*20*S,hd.y+fy*20*S,5*S)}
