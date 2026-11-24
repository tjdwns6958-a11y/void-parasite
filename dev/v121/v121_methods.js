 // ===== v121: 첫 설명 페이지 — 몬스터 그림에 이름표 (PC는 마우스를 올리면, 폰은 누르면) =====
 bsNames(){const O=this.bsO;if(!O)return;const NM={f_s:'결정 진드기 (작은 먹이)',f_l:'등껍질 유충 (큰 먹이)',kha:'낫그늘',f_c:'결정 (무기물)',gna:'제르사이 유생',rek:'땅울음',vdl:'보이드링',cor:'공허 산호'},dep=334;
  let tip=null;const show=(t,x,y)=>{if(tip)tip.destroy();tip=this.add.text(x,Math.max(14,y),t,ST({fontSize:'12px',fontStyle:'bold',color:'#ffffff',backgroundColor:'#2a2044',padding:{x:8,y:4}})).setOrigin(.5,1).setDepth(dep+1);O.D.push(tip)},hide=()=>{if(tip){tip.destroy();tip=null}};
  const add=(x,y,w,h,t)=>{const z=this.add.zone(x,y,Math.max(26,w),Math.max(26,h)).setDepth(dep).setInteractive({useHandCursor:true});O.D.push(z);const ty=y-Math.max(26,h)/2-2;z.on('pointerover',()=>show(t,x,ty));z.on('pointerout',hide);z.on('pointerdown',()=>show(t,x,ty))};
  for(const o of O.D.slice())if(o.type==='Image'&&o.texture&&NM[o.texture.key])add(o.x,o.y,o.displayWidth+6,o.displayHeight+6,NM[o.texture.key]);
  if(!O.pg)add(650+48,116,22,18,'공허 정수')}
