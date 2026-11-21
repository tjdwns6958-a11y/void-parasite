 // ===== v70: 포식 특수 스킬 = 통째 삼키기 (포식 돌진 대체) =====
 // 앞 ±55°·80px 안 적 하나 → 큰 칼날 턱 둘이 위아래에서 감쌌다(0~0.14초) 콱 닫힘(0.14~0.24초).
 // 닫히는 순간: 체력 30% 이하 일반 몬스터 = 통째로 삼킴(gulp) + 체력 25% 회복 / 그 밖 = 물기 ×3 피해 + 출혈 + 체력 6. 재사용 6초(빗나가면 2.5초)
 dvUse(){const p=this.pl,a=this.ang;let best=null,bd=1e9;
  for(const m of this.cur.en){if(!m.on||m.gone||!m.spr||m.spr.visible===false||(m.k=='rek'&&(m.st=='under'||m.st=='warn')))continue;const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy)-(m.br||0);if(d>80)continue;const da=Math.abs(Phaser.Math.Angle.Wrap(Math.atan2(dy,dx)-a));if(da>.95)continue;const sc=d+da*30;if(sc<bd){bd=sc;best=m}}
  const tx=best?best.x:p.x+Math.cos(a)*50,ty=best?best.y:p.y+Math.sin(a)*50;if(best){this.ang=Math.atan2(ty-p.y,tx-p.x);if(this.hd)this.hd.setRotation(this.ang)}
  this.dvr={t:0,m:best,x:tx,y:ty,an:this.ang,done:0,rm:this.cur};this.skCd=best?6:2.5;this.inv=Math.max(this.inv,.3);this.moStart('bite');this.mo.bk='p';this.brFx={t:0,x:p.x,y:p.y,an:this.ang,k:'p'}}
 dvU(dt){const D=this.dvr,g=this.dvG||(this.dvG=this.add.graphics().setDepth(12.5));g.clear();if(!D)return;if(this.over||D.rm!==this.cur){this.dvr=null;return}D.t+=dt;const m=D.m;if(m&&m.on&&m.spr){D.x=m.x;D.y=m.y}
  const T=D.t,op=T<.14?T/.14:T<.24?1-(T-.14)/.1:0,K=4.4*(m&&m.mb?1.5:1)*(1+.2*Math.min(1,T/.14)),al=T<.3?1:Math.max(0,1-(T-.3)/.15),c=Math.cos(D.an),s=Math.sin(D.an);
  if(al>0)for(const sg of[-1,1]){const rot=sg*(op*.75-.08),rc=Math.cos(rot),rs=Math.sin(rot),bx=D.x-c*K*2.2,by=D.y-s*K*2.2;
   const P=this.pjBlade(sg,0).map(([x,y])=>{const lx=(x+1)*K,ly=(y-sg*3)*K+sg*1.2*K,rx=lx*rc-ly*rs,ry=lx*rs+ly*rc;return{x:bx+rx*c-ry*s,y:by+rx*s+ry*c}});
   g.lineStyle(2.4,0x3d1b6b,al).strokePoints(P,true);g.fillStyle(0xf0c8d8,al).fillPoints(P,true);g.lineStyle(1.2,0xffffff,al).beginPath().moveTo(P[3].x,P[3].y);for(let i=4;i<=8;i++)g.lineTo(P[i].x,P[i].y);g.strokePath()}
  if(T>=.22&&!D.done){D.done=1;g.fillStyle(0xffffff,.9).fillCircle(D.x,D.y,6);
   if(m&&m.on){const mh=m.mh||MON(m.k).hp,boss=m.mb||({sw:1,em:1,rw:1,qn:1,wd:1})[m.k];
    if(!boss&&m.hp<=mh*.3){this.gulp(m);this.en=Math.min(this.emax,this.en+this.emax*.25)}
    else{this.dmgM(m,this.bdmg*3);if(m.on){m.bl=3;if(m.spr){m.spr.setTintFill(0xffffff);this.time.delayedCall(90,()=>{if(m.spr)m.spr.clearTint()})}this.bmAdd(m,D.an)}this.en=Math.min(this.emax,this.en+6);this.dtx(D.x,D.y-24,'물어뜯기!','#ff9ad0')}}}
  if(T>.45)this.dvr=null}
