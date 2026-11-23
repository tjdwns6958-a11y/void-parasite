 // ===== v117 배경: 방 한 장짜리 바닥 + 울퉁불퉁한 동굴 벽 (3안) =====
 v117Bg(){return window.__vpBg!=null?window.__vpBg:V117B}
 v117Floor(){const st=this.v117Bg(),z=this.zi>1?2:1,key='fl117'+st+z;if(this.textures.exists(key))return key;
  const W=800,H=360,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d'),im=x.createImageData(W,H),d=im.data,S=z*31+st.charCodeAt(0),
   base=z==1?[24,19,36]:[18,20,38],q=v=>Math.max(0,Math.min(255,Math.round(v/3)*3));
  const CS=58,seed=[];if(st=='A')for(let j=-1;j<=Math.ceil(H/CS)+1;j++)for(let i=-1;i<=Math.ceil(W/CS)+1;i++)seed.push([i,j,(i+.15+.7*v117h(i,j,S))*CS,(j+.15+.7*v117h(i,j,S+5))*CS]);
  for(let py=0;py<H;py++)for(let px=0;px<W;px++){const o=(py*W+px)*4,n=v117f(px/34,py/34,S),fine=v117h(px,py,S+9);let k=.82+.36*n+(fine-.5)*.1,add=[0,0,0];
   if(st=='A'){const ci=Math.floor(px/CS),cj=Math.floor(py/CS);let d1=1e9,d2=1e9,c1=null;for(let j=cj-1;j<=cj+1;j++)for(let i=ci-1;i<=ci+1;i++){const s=seed[(j+1)*(Math.ceil(W/CS)+3)+(i+1)];if(!s)continue;const dd=Math.hypot(px-s[2],py-s[3]);if(dd<d1){d2=d1;d1=dd;c1=s}else if(dd<d2)d2=dd}
    const e=(d2-d1)/2;k*=.94+.12*v117h(c1[0],c1[1],S+3);if(e<1.1){k*=.66;if(v117h(px,py,S+4)<.012)add=v117h(px,py,S+6)<.5?[60,40,110]:[30,70,100]}else if(e<2.6)k*=.88}
   else if(st=='B'){const v=1-Math.abs(2*v117f(px/90,py/90,S+2)-1),v2=1-Math.abs(2*v117f(px/38,py/38,S+7)-1);if(v>.975)add=[14+30*(v-.975)*40,4,26+40*(v-.975)*40];else if(v2>.985)add=[8,2,16];k*=.9+.2*v117n(px/12,py/12,S+3)}
   else{const rp=Math.sin((px*.55+py)*.11+v117f(px/70,py/70,S+3)*7);k*=.9+.1*rp;if(fine>.993)add=[40,34,60];else if(fine<.004)add=v117h(px,py,S+8)<.5?[20,50,80]:[50,26,80]}
   d[o]=q(base[0]*k+add[0]);d[o+1]=q(base[1]*k+add[1]);d[o+2]=q(base[2]*k+add[2]);d[o+3]=255}
  x.putImageData(im,0,0);const t=this.textures.addCanvas(key,cv);t.setFilter(Phaser.Textures.FilterMode.NEAREST);return key}
 v117Frame(a){const st=this.v117Bg();if(!st)return;const z=this.zi>1?2:1,key='fr117'+st+z+'_'+(this.lv.rooms.indexOf(a))+'_'+a.r+'_'+a.c+(a.tr||'');
  if(!this.textures.exists(key)){const W=800,H=360,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d'),im=x.createImageData(W,H),d=im.data,S=(a.r*7+a.c*13+1)*3+st.charCodeAt(0);
   const cvk=k=>a.d[k]&&(a.ct[k]=='cave'||a.ct[k]=='gate'),gN=cvk('N'),gS=cvk('S'),gW=cvk('W'),gE=cvk('E'),JT=[];for(let k=1;k<=8;k++){const a=new Float32Array(802);for(let t=0;t<802;t++)a[t]=(v117f(t/46,k,S)*2-1)*8+(v117n(t/9,k+3,S)-.5)*3;JT[k]=a}const J=(t,k)=>JT[k][Math.max(0,Math.min(801,t|0))];
   const dep=(px,py)=>{let m=-99;const top=40+J(px,1)-py,bot=py-(320-J(px,2)),lef=40+J(py,3)-px,rig=px-(760-J(py,4));
    const gx=(px<320?320-px:px>480?px-480:-Math.min(px-320,480-px)),gy=(py<120?120-py:py>240?py-240:-Math.min(py-120,240-py));
    m=Math.max(gN?Math.min(top,gx+J(px,5)*.5):top,gS?Math.min(bot,gx+J(px,6)*.5):bot,gW?Math.min(lef,gy+J(py,7)*.5):lef,gE?Math.min(rig,gy+J(py,8)*.5):rig);return m};
   const pal=st=='A'?(z==1?[[24,19,36],[42,34,60],[64,52,90],[110,94,148]]:[[20,20,38],[36,36,66],[56,56,98],[98,98,156]]):st=='B'?(z==1?[[26,12,32],[40,18,48],[56,26,66],[110,54,120]]:[[18,14,36],[30,22,56],[44,32,80],[90,66,140]]):(z==1?[[16,12,22],[34,26,42],[56,44,66],[92,76,104]]:[[12,14,24],[28,30,48],[46,50,76],[80,86,120]]);
   for(let py=0;py<H;py++)for(let px=0;px<W;px++){if(px>70&&px<730&&py>70&&py<290)continue;const o=(py*W+px)*4,m=dep(px,py);
    if(m<=0){if(m>-7){const sh=(dep(px-3,py-4)>0)?.45:0;if(sh){d[o+3]=sh*255*(1+m/7)}}continue}
    const n=v117n(px/9,py/9,S+11)*.7+v117h(px>>1,py>>1,S)*.3,by=V117BAY[(py&3)*4+(px&3)];let c;
    if(st=='A'){const lv=m<2.5?3:m<6?2:(n+by*.25>.55?1:0)+(m>22?-1:0);c=pal[Math.max(0,lv)];const lit=dep(px-2,py-2)<=0&&m<5;if(lit)c=pal[3]}
    else if(st=='B'){const rid=Math.sin(m*.3+n*4);let lv=m<2?3:rid>.75?2:rid>-.5?1:0;if(v117n(px/7,py/7,S+5)>.86&&m>6)lv=3;c=pal[lv]}
    else{const band=Math.floor((py*.8+px*.25+n*14)/7)%3;let lv=m<2.5?3:band==0?2:band==1?1:0;if(m>26)lv=Math.min(lv,1);c=pal[lv]}
    d[o]=c[0];d[o+1]=c[1];d[o+2]=c[2];d[o+3]=255}
   x.putImageData(im,0,0);
   if(st=='A'){const sh=(bx,by,ang,L,w,c1,c2)=>{const ca=Math.cos(ang),sa=Math.sin(ang);x.fillStyle=c1;x.beginPath();x.moveTo(bx-sa*w,by+ca*w);x.lineTo(bx+ca*L,by+sa*L);x.lineTo(bx+sa*w,by-ca*w);x.closePath();x.fill();x.fillStyle=c2;x.beginPath();x.moveTo(bx,by);x.lineTo(bx+ca*L,by+sa*L);x.lineTo(bx+sa*w,by-ca*w);x.closePath();x.fill()};
    let n=0;for(let t=0;t<2400&&n<14;t+=37){const r=v117h(t,n,S);if(r>.16)continue;const side=t%4,u=v117h(t,1,S+1);let px,py,ang;if(side==0){px=60+u*680;py=40+J(px,1)-1;ang=Math.PI/2}else if(side==1){px=60+u*680;py=320-J(px,2)+1;ang=-Math.PI/2}else if(side==2){py=60+u*240;px=40+J(py,3)-1;ang=0}else{py=60+u*240;px=760-J(py,4)+1;ang=Math.PI}
     if(dep(px,py)<-1||dep(px,py)>4)continue;n++;const tl=v117h(t,2,S)<.5,c1=tl?'#22446e':'#3c2478',c2=tl?'#5a8cb8':'#8466c8';for(let k=0;k<3;k++)sh(px+(k-1)*5*Math.abs(Math.sin(ang))+(k-1)*5*Math.abs(Math.cos(ang))*0,py+(k-1)*5*Math.abs(Math.cos(ang)),ang+(k-1)*.45,9+v117h(t,k+3,S)*9-(k!=1?4:0),2.6,c1,c2)}}
   this.textures.addCanvas(key,cv).setFilter(Phaser.Textures.FilterMode.NEAREST)}
  this.dec.push(this.add.image(400,180,key).setDepth(2.05))}
