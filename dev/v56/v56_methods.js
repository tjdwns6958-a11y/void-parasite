 // ===== v56: 물기 효과 = S3 이빨 자국 (개발자 선택 2026-11-21, 시안 docs/v56/bite_options.png) =====
 // 허공: 송곳니만 벌렸다가 다묾 + 머리 4px 콕 (0.24초). 맞으면 몬스터 몸의 물린 쪽에 좌우 이빨 자국 3개씩이 0.07초 뒤 나타나 0.5초에 사라짐(몬스터를 따라감).
 // v55까지의 흰 부채꼴 · 물결 호 두 겹 · 잔상 · 할퀴기 호 · 몸 S자 돌진은 삭제. 판정(brPoly/inBite) · 피해 · 넉백 · 맞았을 때 전진(v51)은 그대로.
 bmAdd(m,an){const L=this.bmk||(this.bmk=[]);if(L.length>8)L.shift();L.push({m,an,t:0,r:m.mb?Math.min(30,(m.br||0)*.5+8):8,rm:this.cur,x:m.x,y:m.y})}
 brDraw(dt){const g=this.brG||(this.brG=this.add.graphics().setDepth(12));g.clear();if(this.over){this.bmk=null;this.brFx=null;return}
  if(this.bmk)this.bmk=this.bmk.filter(k=>{k.t+=dt;if(k.t>.5||k.rm!==this.cur)return false;const m=k.m;if(m.on&&m.spr&&m.spr.active){k.x=m.spr.x;k.y=m.spr.y}if(k.t<.07)return true;
   const al=k.t<.15?1:1-(k.t-.15)/.35,c=Math.cos(k.an),s=Math.sin(k.an),px=-s,py=c,bx=k.x-c*k.r,by=k.y-s*k.r;
   for(const sg of[-1,1])for(let j=0;j<3;j++){const ox=bx+c*j*4.5+px*sg*5.5,oy=by+s*j*4.5+py*sg*5.5,tx=ox-px*sg*3.2,ty=oy-py*sg*3.2;g.lineStyle(3,0x2a1040,al*.9).lineBetween(ox,oy,tx,ty);g.lineStyle(1.6,0xfff4fa,al).lineBetween(ox,oy,tx,ty)}
   return true});
  const E=this.brFx;if(!E)return;E.t+=dt;const q=E.t/.24;if(q>=1){this.brFx=null;return}this.jawDraw(g,q,1)}
