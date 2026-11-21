 // ===== v61: 공격 버튼과 섭취 버튼 분리 · 갑각 차지 박치기 =====
 // 공격: 터치 = 오른쪽 위 '공격'(752,226) · 키보드 = Space / 섭취: 터치 = 그 아래 '섭취'(752,310)를 누르고 있기 · 키보드 = F 누르고 있기
 // 갑각(가장 높은 계통): 기본 박치기가 느리지만(재사용 0.9초) 피해 ×1.3. 누르고 있으면 차지(최대 1.2초) — 차지할수록 이동이 느려지고(최대 −55%) 떼면 피해 최대 ×2.8 · 더 멀리 들이받음 · 파편 더 많이
 atkU(dt,k){const dn=(this.atk&&this.atk.isDown)||k.SPACE.isDown,jd=this.req||Phaser.Input.Keyboard.JustDown(k.SPACE);
  if(this.domK()!='c'){this.chg=null;if(jd&&this.bcd<=0)this.bite();return}
  if(this.chg){if(dn&&!(this.sil>0)){this.chg.t=Math.min(1.2,this.chg.t+dt);return}const f=this.chg.t/1.2;this.chg=null;this.slamF(f);return}
  if(this.bcd>0)return;if(dn)this.chg={t:0};else if(jd)this.slamF(0)}
 slamF(f){const b0=this.bdmg;this.bdmg=b0*(1.3+1.5*f);this.slamS=f;this.bite();this.bdmg=b0;this.slamS=0;this.bcd=.9+.3*f;if(this.mo&&this.mo.k=='bite')this.mo.sf=f;if(this.brFx)this.brFx.sf=f}
 // 차지 그림: 머리 둘레 수정 고리가 커지고 수정 셋이 빨라짐, 다 차면 하얗게 깜빡
 chgDraw(g){const C2=this.chg,hd=this.hd;if(!C2||!hd||!hd.visible)return;const f=C2.t/1.2,S=this.bsc||1,a=this.ang,fx=Math.cos(a),fy=Math.sin(a),now=this.time.now/1000;
  hd.setPosition(hd.x-fx*3*f*S,hd.y-fy*3*f*S);const R=(9+5*f)*S,full=f>=1;g.lineStyle((1.4+1.6*f)*S,full&&Math.sin(now*30)>0?0xffffff:0xbfeaff,.35+.5*f).strokeCircle(hd.x,hd.y,R);
  for(let i=0;i<3;i++){const an=now*(3+9*f)+i*2.094,x=hd.x+Math.cos(an)*R,y=hd.y+Math.sin(an)*R,r=(2+1.4*f)*S;g.fillStyle(0x24304a,1).fillTriangle(x,y-r-1,x+r*.8,y,x,y+r+1);g.fillTriangle(x,y-r-1,x-r*.8,y,x,y+r+1);g.fillStyle(full?0xffffff:0xbfeaff,1).fillTriangle(x,y-r,x+r*.6,y,x,y+r);g.fillTriangle(x,y-r,x-r*.6,y,x,y+r)}}
