 // ===== v58: 포식 턱이 실제로 다문다 =====
 // 포식 1단계부터 머리 그림(whj_)에는 갈고리 턱·큰 입을 그리지 않고, 여기서 매 프레임 직접 그림 (진화 창 미리보기 wh_는 예전 그대로).
 // 평소 살짝 벌림(.25) → 물기: 크게 벌렸다(0~.35) → '딱' 다묾(.35~.52) → 천천히 평소로. 포식이면 공통 송곳니(jawDraw)는 안 그림.
 // 1단계 갈고리 한 쌍 · 2단계 갈고리 1.3배 · 3단계 갈고리 + 큰 입(검은 쐐기·흰 이빨)이 같이 벌어졌다 닫힘.
 pjU(){const g=this.pjG;if(!g||!g.scene)return;g.clear();const L=this.lin,hd=this.hd;if(!L||L.p<1||!hd||!hd.visible||!hd.scene)return;
  const E=this.brFx,q=E?Math.min(1,E.t/.24):-1,op=q<0?.25:q<.35?.25+.75*q/.35:q<.52?1-(q-.35)/.17:.25*Math.min(1,(q-.52)/.48);
  const a=hd.rotation,fx=Math.cos(a),fy=Math.sin(a),u=hd.displayWidth/24,al=hd.alpha,r=4.9*(1+(L.p>=3?.16:L.p>=2?.06:0)+(L.c>=3?.08:0));
  const W=(x,y)=>({x:hd.x+(fx*x-fy*y)*u,y:hd.y+(fy*x+fx*y)*u});
  if(L.p>=3){const w0=(r+1)*.75*(.3+.7*op),T=W(r+1+op*1.5,0),A=W(0,-w0),B=W(0,w0);g.fillStyle(0x1a0414,al).fillTriangle(A.x,A.y,B.x,B.y,T.x,T.y);
   for(let k=1;k<=r;k+=2){const w=w0*(1-k/(r+1+op*1.5));for(const sg of[-1,1]){const p=W(k,sg*w);g.fillStyle(0xffffff,al).fillRect(p.x-u*.5,p.y-u*.5,u,u)}}}
  const S=L.p>=2?1.3:1;
  for(const sg of[-1,1]){const bx=r-1,by=sg*3,an=sg*(op*.62-.06),c=Math.cos(an),s=Math.sin(an);
   const P=[[r-1,sg*3],[r+3,sg*4],[r+4,sg*1]].map(([x,y])=>{const dx=(x-bx)*S,dy=(y-by)*S;return W(bx+dx*c-dy*s,by+dx*s+dy*c)});
   g.lineStyle(2.6*u,0x3d1b6b,al).beginPath().moveTo(P[0].x,P[0].y).lineTo(P[1].x,P[1].y).lineTo(P[2].x,P[2].y).strokePath();
   g.lineStyle(1.3*u,0xffe0ea,al).beginPath().moveTo(P[0].x,P[0].y).lineTo(P[1].x,P[1].y).lineTo(P[2].x,P[2].y).strokePath()}
  if(q>=.5&&q<.66){const t=W(r+5*S,0);g.fillStyle(0xffffff,(1-Math.abs(q-.58)/.08)*al).fillCircle(t.x,t.y,1.1*u)}}
 pjOn(){if(this.pjG&&this.pjG.scene)return;this.pjG=this.add.graphics().setDepth(10.05);this.events.off('postupdate',this.pjU,this);this.events.on('postupdate',this.pjU,this)}
