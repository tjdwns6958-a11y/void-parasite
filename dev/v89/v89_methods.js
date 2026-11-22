 // ===== v89: 공허 눈 3단계 색을 누그러뜨림 — 붉은빛 대신 최대 주황빛 (obsE1 연한 살구빛 · obsE2 주황빛) =====
 obsEyeTex(){if(this.textures.exists('obsE2')||!this.textures.exists('obsE'))return;const src=this.textures.get('obsE').getSourceImage();
  for(const[key,lv]of[['obsE1',1],['obsE2',2]]){const c=document.createElement('canvas');c.width=src.width;c.height=src.height;const x=c.getContext('2d'),W=c.width,H=c.height;x.imageSmoothingEnabled=false;x.drawImage(src,0,0);
   x.globalCompositeOperation='source-atop';const gr=x.createRadialGradient(W/2,H/2,H*.28,W/2,H/2,W*.55);gr.addColorStop(0,'rgba(255,150,60,0)');gr.addColorStop(1,lv==1?'rgba(255,170,90,.28)':'rgba(255,130,40,.5)');x.fillStyle=gr;x.fillRect(0,0,W,H);
   let sd=lv*977+13;const R=()=>{sd=sd*16807%2147483647;return sd/2147483647};
   for(let k=0;k<(lv==1?8:16);k++){let X=R()*W,Y=R()*H;x.fillStyle=lv==1?'#d88050':'#e0662c';for(let j=0;j<12;j++){X+=(W/2-X)*.1+(R()-.5)*7;Y+=(H/2-Y)*.1+(R()-.5)*7;if(Math.hypot((X-W/2)/(W*.24),(Y-H/2)/(H*.34))<1)break;x.fillRect(Math.round(X/2)*2,Math.round(Y/2)*2,2,2)}}
   x.globalCompositeOperation='source-over';x.save();x.beginPath();x.arc(W/2,H/2,H*.31,0,6.283);x.clip();x.drawImage(src,0,0);x.restore();
   const t=this.textures.addCanvas(key,c);t.setFilter(Phaser.Textures.FilterMode.NEAREST)}}
