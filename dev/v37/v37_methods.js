 // ===== 엔딩: 공허에 차원이 열린다 (v37) =====
 // 금이 번지고 → 세로로 찢어진 틈이 열리며 → 바깥의 빛·별이 쏟아지고 → 부서진 공허 조각이 빨려 든다
 dimOpen(sub){if(this.dimS||this.over)return;const cx=400,cy=168,cam=this.cameras.main,R=()=>Math.random();
  const g=this.add.graphics().setDepth(150),gl=this.add.graphics().setDepth(151).setBlendMode(Phaser.BlendModes.ADD),vg=this.add.graphics().setDepth(149);
  const cr=[],branch=(x,y,a,len,dp,t0)=>{const pts=[[x,y]];let L=0;while(L<len){const st=9+R()*14;a+=(R()-.5)*1.1;x+=Math.cos(a)*st;y+=Math.sin(a)*st*.78;L+=st;pts.push([x,y,L]);if(dp<2&&R()<.11)branch(x,y,a+(R()<.5?1:-1)*(.5+R()*.7),len*.45,dp+1,t0+L/380)}cr.push({pts,t0,w:Math.max(1,2.6-dp*.8)})};
  for(let i=0;i<7;i++)branch(cx,cy,i/8*6.283+R()*.5,240+R()*200,0,i*.05);
  const sh=[];for(let i=0;i<30;i++){const a=R()*6.283,r=140+R()*320;sh.push({x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r*.62,a:R()*6.283,s:5+R()*12,va:(R()-.5)*5,t0:2.9+R()*2.2,v:0,c:R()<.5?0x2a1a40:0x3d2660})}
  const st=[];for(let i=0;i<120;i++)st.push({a:R()*6.283,r:R(),v:.18+R()*.5,c:R()<.25?0xffe6b0:R()<.5?0xcfe8ff:0xffffff});
  const ray=[];for(let i=0;i<12;i++)ray.push({a:i/12*6.283+R()*.3,w:.04+R()*.05,l:300+R()*240});
  const S=this.dimS={g,gl,vg,cx,cy,cr,sh,st,ray,t:0};
  const ease=k=>k<0?0:k>1?1:k*k*(3-2*k),OPEN0=2.7,OPEN1=5.2;
  // 틈 모양(세로로 긴 눈꼴): 높이 H, 폭 W
  const eye=(H,W,n)=>{const P=[];for(let i=0;i<=n;i++){const a=i/n*Math.PI;P.push({x:cx+Math.sin(a)*W*(i<=n?1:0),y:cy-Math.cos(a)*H})}for(let i=0;i<=n;i++){const a=i/n*Math.PI;P.push({x:cx-Math.sin(a)*W,y:cy+Math.cos(a)*H})}return P};
  const inEye=(x,y,H,W)=>{if(H<1)return false;const v=(y-cy)/H;if(Math.abs(v)>1)return false;return Math.abs(x-cx)<W*Math.sqrt(1-v*v)};
  S.draw=(t,dt)=>{g.clear();gl.clear();vg.clear();const now=this.time.now/1000;
   // 어두워지는 가장자리
   const dk=Math.min(.55,t*.18);vg.fillStyle(0x05020c,dk*.6).fillRect(0,0,800,360);
   // 금
   for(const c of cr){const vis=(t-.5-c.t0)*420;if(vis<=0)continue;const op=t<OPEN1?1:Math.max(.25,1-(t-OPEN1)*.5);let prev=c.pts[0];
    for(let i=1;i<c.pts.length;i++){const q=c.pts[i];if(q[2]>vis)break;gl.lineStyle(c.w+5,0x9a5cff,.18*op).lineBetween(prev[0],prev[1],q[0],q[1]);g.lineStyle(c.w,0xf4ecff,.9*op).lineBetween(prev[0],prev[1],q[0],q[1]);prev=q}}
   // 틈
   const k=ease((t-OPEN0)/(OPEN1-OPEN0)),pul=1+.03*Math.sin(now*3),H=(14+216*k)*pul,W=(3+92*k)*pul;
   if(t>OPEN0-.4){
    for(const r of ray){const ra=r.a+now*.05,l=r.l*k,a1=ra-r.w,a2=ra+r.w;gl.fillStyle(0xfff0d0,.09*k).fillTriangle(cx,cy,cx+Math.cos(a1)*l,cy+Math.sin(a1)*l*.7,cx+Math.cos(a2)*l,cy+Math.sin(a2)*l*.7)}
    const lay=[[1.22,0x7a3cff,.35],[1.1,0xc89bff,.55],[1.0,0xfff4e0,1],[.9,0xd8e8ff,1],[.78,0x9cc2f2,1],[.6,0x6f9fe0,1],[.4,0x88b4ee,1],[.18,0xfff2d8,.9]];
    for(const[f,col,al]of lay){g.fillStyle(col,al).fillPoints(eye(H*f,W*f,22),true)}
    // 바깥의 별이 쏟아져 나온다
    for(const s of st){s.r+=s.v*dt*(.4+k);if(s.r>1){s.r=0;s.a=R()*6.283}const rr=s.r*s.r,x=cx+Math.cos(s.a)*W*1.6*rr,y=cy+Math.sin(s.a)*H*1.05*rr;if(inEye(x,y,H*.9,W*.9)){g.fillStyle(s.c,1).fillRect(x-1,y-1,2,2)}else if(k>.6&&rr<1.6){gl.fillStyle(s.c,.5*(1-rr/1.6)).fillRect(x-1,y-1,2,2)}}
    gl.lineStyle(3,0xffe6b0,.5+.3*Math.sin(now*9)).strokePoints(eye(H,W,22),true,true);gl.lineStyle(10,0xb07aff,.16).strokePoints(eye(H*1.06,W*1.12,22),true,true)}
   // 부서진 공허 조각이 빨려 든다
   for(const q of sh){if(t<q.t0)continue;const dx=cx-q.x,dy=cy-q.y,d=Math.hypot(dx,dy)||1;q.v+=dt*(120+300*k);q.x+=dx/d*q.v*dt;q.y+=dy/d*q.v*dt;q.a+=q.va*dt;const sc=Math.min(1,d/90);if(d<10||sc<=.05)continue;const s2=q.s*sc,ca=Math.cos(q.a),sa=Math.sin(q.a);
    const P=[[1,0],[-.6,.8],[-.5,-.9]].map(([u,v])=>({x:q.x+(u*ca-v*sa)*s2,y:q.y+(u*sa+v*ca)*s2}));g.fillStyle(q.c,.95*sc).fillPoints(P,true);g.lineStyle(1,0xc8a8ff,.8*sc).strokePoints(P,true,true)}};
  // 남은 먹이·무리 점도 틈으로
  const food=(this.cur.food||[]).filter(f=>f.on&&f.spr);
  this.cineStart(6.8,(t,dt)=>{S.t=t;S.draw(t,dt||.016);const p=this.pl;this.ang=Math.atan2(cy-p.y,cx-p.x);
    if(t>.4&&t<.45)cam.zoomTo(1.12,5200,'Sine.easeInOut');for(const tt of[1.0,1.7,2.3,2.75])if(Math.abs(t-tt)<.009)cam.shake(220,.004+tt*.002);
    if(t>3.2)for(const f of food){if(!f.on||!f.spr)continue;const dx=cx-f.x,dy=cy-f.y,d=Math.hypot(dx,dy);if(d<14){f.spr.setVisible(false);continue}f.x+=dx/d*Math.min(d,(t-3.2)*70)*(dt||.016);f.y+=dy/d*Math.min(d,(t-3.2)*70)*(dt||.016);f.spr.setPosition(f.x,f.y).setRotation(t*4)}
    if(Math.abs(t-5.25)<.009){cam.flash(700,255,244,224);cam.shake(400,.008)}},
   ()=>{cam.zoomTo(1,900,'Sine.easeInOut');this.hudVis(false);this.ending(sub,1);
    // 엔딩 화면 뒤에서도 틈이 계속 숨 쉰다
    let tt=6.8;S.ev=this.time.addEvent({delay:16,loop:true,callback:()=>{tt+=.016;if(!g.scene){S.ev.remove();return}S.draw(tt,.016)}})})}
