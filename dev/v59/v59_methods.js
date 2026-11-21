 // ===== v59: 계통별 기본 공격 — 가장 높은 계통(domK, 몸 색깔과 같은 기준)에 따라 =====
 //  n(진화 전) 송곳니 물기 · p 포식 턱(v58 pjU) · c 갑각 몸통 박치기(부딪히면 충격 고리 + 수정 파편) · v 공허 검은 구체 뱉기(orbShoot, 원거리)
 //  판정·피해는 물기 그대로(바로 앞 적은 물기로 맞음 → 보스·특수 장치도 그대로). 공허는 빗나가면 구체가 날아감.
 domK(){const L=this.lin||{p:0,c:0,v:0};return L.p>0&&L.p>=L.c&&L.p>=L.v?'p':L.c>0&&L.c>=L.v?'c':L.v>0?'v':'n'}
 bmAdd(m,an){const L=this.bmk||(this.bmk=[]);if(L.length>10)L.shift();L.push({m,an,t:0,kd:this.domK(),r:m.mb?Math.min(30,(m.br||0)*.5+8):8,rm:this.cur,x:m.x,y:m.y,sd:Math.random()*6.283})}
 orbPop(x,y){const L=this.bmk||(this.bmk=[]);if(L.length>10)L.shift();L.push({m:{},an:0,t:0,kd:'o',r:0,rm:this.cur,x,y,sd:Math.random()*6.283})}
 // 공허 구체: 공허 1단계 = 곧게 날아감 · 2단계부터 앞쪽 ±40° 적을 따라가고 맞으면 둔화. 큰 보스에게는 절반.
 orbShoot(hit){if(hit||this.sil>0)return;const p=this.pl,a=this.ang,L=this.lin,h=this.hd,x=(h?h.x:p.x)+Math.cos(a)*10,y=(h?h.y:p.y)+Math.sin(a)*10;let tg=null;
  if(L.v>=2){let bd=230;for(const m of this.cur.en)if(m.on&&m.spr&&m.spr.visible!==false&&!m.gone&&!(m.k=='rek'&&m.st!='up')){const dx=m.x-x,dy=m.y-y,d=Math.hypot(dx,dy);if(d<bd&&Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(dy,dx)-a))<.7&&this.los(x,y,m.x,m.y)){bd=d;tg=m}}}
  const o=this.add.circle(x,y,5,0x0a0412,1).setStrokeStyle(1.8,0xc070ff).setDepth(11);this.pprj.push({o,x,y,a,v:320,t:.68,tg,dmg:this.bdmg*.6,ns:L.v<2,tc:0x3a1060,bc:0x1a0628,dk:1})}
 brDraw(dt){const g=this.brG||(this.brG=this.add.graphics().setDepth(12));g.clear();if(this.over){this.bmk=null;this.brFx=null;return}
  if(this.bmk)this.bmk=this.bmk.filter(k=>{k.t+=dt;const T=k.t;if(T>.5||k.rm!==this.cur)return false;const m=k.m;if(m.on&&m.spr&&m.spr.active){k.x=m.spr.x;k.y=m.spr.y}
   const c=Math.cos(k.an),s=Math.sin(k.an),px=-s,py=c,bx=k.x-c*k.r,by=k.y-s*k.r;
   if(k.kd=='c'){if(T>.42)return false;if(T<.16){g.lineStyle(2.2,0xdff4ff,(1-T/.16)*.9).strokeCircle(bx,by,3+T*55)}const al=T<.2?1:1-(T-.2)/.22,e=1-(1-Math.min(1,T/.3))**2;
    for(let i=0;i<6;i++){const an=k.an+Math.PI+(i-2.5)*.6+Math.sin(k.sd+i*2)*.25,d=4+(26+8*Math.sin(k.sd*3+i))*e,x=bx+Math.cos(an)*d,y=by+Math.sin(an)*d+22*T*T,r=i%3?2.2:2.8;
     g.fillStyle(0x3a4a7a,al).fillTriangle(x,y-r-.8,x+r*.8,y,x,y+r+.8);g.fillTriangle(x,y-r-.8,x-r*.8,y,x,y+r+.8);g.fillStyle(i%2?0xbfeaff:0xffffff,al).fillTriangle(x,y-r,x+r*.6,y,x,y+r);g.fillTriangle(x,y-r,x-r*.6,y,x,y+r)}return true}
   if(k.kd=='v'||k.kd=='o'){if(T>.36)return false;const x=k.kd=='v'?bx:k.x,y=k.kd=='v'?by:k.y,al=1-T/.36;g.fillStyle(0x0a0412,al*.9).fillCircle(x,y,3+9*Math.min(1,T/.12)*(1-T/.36));g.lineStyle(1.6,0xc070ff,al).strokeCircle(x,y,4+16*T/.36);
    for(let i=0;i<5;i++){const an=k.sd+i*1.257,d=4+20*T/.36;g.fillStyle(0xc070ff,al).fillCircle(x+Math.cos(an)*d,y+Math.sin(an)*d,1.3)}return true}
   if(T<.07)return true;const al=T<.15?1:1-(T-.15)/.35;
   for(const sg of[-1,1])for(let j=0;j<3;j++){const ox=bx+c*j*4.5+px*sg*5.5,oy=by+s*j*4.5+py*sg*5.5,tx=ox-px*sg*3.2,ty=oy-py*sg*3.2;g.lineStyle(3,0x2a1040,al*.9).lineBetween(ox,oy,tx,ty);g.lineStyle(1.6,0xfff4fa,al).lineBetween(ox,oy,tx,ty)}
   return true});
  const E=this.brFx;if(!E)return;E.t+=dt;const q=E.t/.24;if(q>=1){this.brFx=null;return}
  const hd=this.hd;if(!hd||!hd.visible)return;const S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a);
  if(E.k=='c'){if(q>.38&&q<.8){g.lineStyle(2.4*S,0xbfeaff,1-(q-.38)/.42).beginPath().arc(hd.x+fx*3*S,hd.y+fy*3*S,7.5*S,a-1.1,a+1.1,false).strokePath()}}
  else if(E.k=='v'){const x=hd.x+fx*10*S,y=hd.y+fy*10*S;g.lineStyle(1.4*S,0xc070ff,(1-q)*.9).strokeCircle(x,y,(2+7*q)*S);if(q<.3){g.fillStyle(0x0a0412,1).fillCircle(x,y,(1.5+2.5*q/.3)*S)}}
  else if(E.k!='p')this.jawDraw(g,q,1)}
