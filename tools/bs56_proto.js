// 기본 공격(물기) 연출 시안 BS1~BS5 — window.__vpBS (0 = 지금 v55). 판정·피해·넉백은 그대로, 그림만 바꿈.
window.bsInstall=function(s){
 const P=Object.getPrototypeOf(s),DUR=[.34,.2,.36,.24,.3,.2];
 const ob=P.bite;
 s.bite=function(){const hp=new Map(this.cur.en.filter(m=>m.on).map(m=>[m,m.hp]));ob.call(this);
  const BS=window.__vpBS|0;if(!BS)return;let hm=null;for(const [m,h] of hp)if(m.hp<h){hm=m;break}
  if(this.mo&&this.mo.k=='bite'){this.mo.dur=DUR[BS];this.mo.hit=hm}if(this.brFx)this.brFx.hit=hm;
  if(hm&&BS==3)(this.bsMk=this.bsMk||[]).push({m:hm,an:this.ang,t:0,x:hm.x,y:hm.y})};
 s.moApply=function(dt){const BS=window.__vpBS|0,mo=this.mo;if(!BS||!mo||mo.k!='bite')return P.moApply.call(this,dt);
  const g=this.moG||(this.moG=this.add.graphics().setDepth(10.6));g.clear();if(this.over||!this.hd||!this.hd.visible)return;
  const hd=this.hd,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),px=-fy,py=fx,seg=this.sg,mv=(o,dx,dy)=>o.setPosition(o.x+dx,o.y+dy);
  mo.t+=dt;const q=mo.t/mo.dur;if(q>=1){this.mo=null;seg.forEach(o=>o.setScale(S));hd.setScale(S);return}
  let L=0,W=0;
  if(BS==1||BS==3)L=q<.4?0:q<.6?4*(q-.4)/.2:4*(1-(q-.6)/.4);
  if(BS==5)L=q<.4?0:q<.6?3*(q-.4)/.2:3*(1-(q-.6)/.4);
  if(BS==2){L=q<.3?0:q<.42?4*(q-.3)/.12:q<.85?4:4*(1-(q-.85)/.15);if(mo.hit&&q>.42&&q<.9){const r=(q-.42)/.48;W=Math.sin(r*Math.PI*4)*3.2*S*(1-r*.6)}}
  if(BS==4){const n=seg.length,pw=q/.55*(n+1);seg.forEach((o,i)=>{const k=Math.max(0,1-Math.abs(pw-(n-i)));o.setScale(S*(1+.24*k));mv(o,-fx*2*k,-fy*2*k)});
   L=q<.55?-2*Math.min(1,q/.3):6*Math.sin(Math.min(1,(q-.55)/.45)*Math.PI)}
  if(W){mv(hd,px*W,py*W);if(seg[0])mv(seg[0],px*W*.45,py*W*.45);const hs=mo.hit&&mo.hit.spr;if(hs)hs.setPosition(mo.hit.x+px*W*.8,mo.hit.y+py*W*.8)}
  if(L)mv(hd,fx*L,fy*L)};
 s.brDraw=function(dt){const BS=window.__vpBS|0;if(!BS)return P.brDraw.call(this,dt);
  const g=this.brG||(this.brG=this.add.graphics().setDepth(12));g.clear();if(this.over)return;
  // BS3 이빨 자국: 맞은 몬스터 위에 좌우 두 줄 × 3개, 0.45초에 걸쳐 사라짐
  if(this.bsMk)this.bsMk=this.bsMk.filter(k=>{k.t+=dt;if(k.t>.5)return false;if(k.t<.07)return true;const al=k.t<.15?1:1-(k.t-.15)/.35,m=k.m,x=m.spr?m.spr.x:k.x,y=m.spr?m.spr.y:k.y,c=Math.cos(k.an),s2=Math.sin(k.an),px=-s2,py=c;
   for(const sg of[-1,1])for(let j=0;j<3;j++){const ox=x-c*8+c*j*4.5+px*sg*5.5,oy=y-s2*8+s2*j*4.5+py*sg*5.5,tx=ox-px*sg*3.2,ty=oy-py*sg*3.2;g.lineStyle(3,0x2a1040,al*.9).lineBetween(ox,oy,tx,ty);g.lineStyle(1.6,0xfff4fa,al).lineBetween(ox,oy,tx,ty)}return true});
  const E=this.brFx;if(!E)return;E.t+=dt;const D=DUR[BS],q=E.t/D;if(q>=1){this.brFx=null;return}
  if(BS==5){const h=this.brDeg()*Math.PI/180,c=Math.cos(E.an),s2=Math.sin(E.an),al=q<.3?1:1-(q-.3)/.7;const Pp=this.brPoly().map(p=>({x:E.x+c*p.x-s2*p.y,y:E.y+s2*p.x+c*p.y}));g.lineStyle(1.2,0xffffff,.32*al).strokePoints(Pp,true)}
  this.jawDraw(g,BS==2?(q<.42?q/.42*.52:Math.min(.7,.52+(q-.42)/.18*.18)):q,1)};
};
