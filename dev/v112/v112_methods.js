 // ===== v112 정동 집게왕: 확실하게 무는 씹기 =====
 // 입을 천천히 크게 벌림(예고 0.7초, 앞쪽 붉은 부채꼴) → 콱 닫힘(0.06초) + 흰 번쩍 + 부스러기 + 짧은 흔들림 → 0.25초 문 채로 → 한 번 더 우물우물 → 끝
 gdkSnap(m,D){const p=this.pl,a=Math.atan2(p.y-m.y,p.x-m.x),T=.7;m.st='snap';m.tm=T+.65;this.telAdd({k:'s',x:m.x,y:m.y,r:98,a,h:.62,t:T,dmg:D(12),src:'집게왕의 씹기',m,on:()=>this.gdkBiteHit(m,a)});this.gdkBiteFx(m,a,T)}
 gdkBiteFx(m,a,T){const mx=m.x+Math.cos(a)*34,my=m.y-44+Math.sin(a)*22,g=this.add.graphics().setDepth(12.4),c=Math.cos(a),s=Math.sin(a),nx=-s,ny=c,st={t:0},TT=T+.65;
  const jaw=(op,lean,al)=>{g.clear();for(const sg of[-1,1]){const bx=mx+nx*sg*op+c*lean,by=my+ny*sg*op+s*lean,P=[[-16,0],[-7,-6*sg],[11,-5*sg],[21,2*sg],[7,4*sg],[-7,5*sg]].map(([u,v])=>({x:bx+c*u+nx*v,y:by+s*u+ny*v}));
    g.fillStyle(0x1a1030,al).fillPoints(P.map(q=>({x:q.x+1.5,y:q.y+1.5})),true);g.fillStyle(0xd8d0f0,al).fillPoints(P,true);g.lineStyle(1.5,0x6a5a90,al).strokePoints(P,true);
    for(let i=0;i<4;i++){const u=-8+i*7,tx=bx+c*u-nx*sg*5,ty=by+s*u-ny*sg*5;g.fillStyle(0xffffff,al).fillTriangle(tx-c*2.4,ty-s*2.4,tx+c*2.4,ty+s*2.4,tx-nx*sg*7,ty-ny*sg*7)}}};
  this.tweens.add({targets:st,t:TT,duration:TT*1000,onUpdate:()=>{const t=st.t;let op,lean=0,al=1;
    if(t<T){const k=t/T;op=4+20*Math.pow(k,.7);lean=-6*k+Math.sin(t*40)*k*1.2}             // 천천히 크게 벌림 · 뒤로 젖힘 · 떨림
    else if(t<T+.06){op=24*(1-(t-T)/.06)+1;lean=10}                                            // 콱
    else if(t<T+.31){op=1;lean=10-((t-T-.06)/.25)*4}                                           // 문 채로
    else if(t<T+.55){const k=(t-T-.31)/.24;op=1+8*Math.sin(k*Math.PI);lean=6}                   // 한 번 더 우물
    else{op=1;lean=6;al=1-(t-T-.55)/.1}
    jaw(op,lean,Math.max(0,al))},onComplete:()=>g.destroy()})}
 gdkBiteHit(m,a){const mx=m.x+Math.cos(a)*44,my=m.y-40+Math.sin(a)*26;this.cameras.main.shake(90,.004);const f=this.add.circle(mx,my,16,0xffffff,.85).setDepth(12.5);this.tweens.add({targets:f,scale:1.9,alpha:0,duration:180,onComplete:()=>f.destroy()});
  for(let i=0;i<9;i++){const an=a+(Math.random()-.5)*1.8,b=this.add.rectangle(mx,my,3,3,i%2?0xc8b8a0:0x9fd8ff).setDepth(12.5);this.tweens.add({targets:b,x:mx+Math.cos(an)*(20+Math.random()*20),y:my+Math.sin(an)*(16+Math.random()*14)+10,alpha:0,duration:360,onComplete:()=>b.destroy()})}}
