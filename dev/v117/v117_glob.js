// ===== v117: 플레이어 몸 음영(3안) · 배경(3안) — window.__vpW / __vpBg 로 고름 =====
const V117W='',V117B='';
const v117h=(i,j,s)=>{let h=(i*374761393+j*668265263+s*1442695041)|0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296};
const v117n=(x,y,s)=>{const i=Math.floor(x),j=Math.floor(y),fx=x-i,fy=y-j,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy),a=v117h(i,j,s),b=v117h(i+1,j,s),c=v117h(i,j+1,s),d=v117h(i+1,j+1,s);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v};
const v117f=(x,y,s)=>v117n(x,y,s)*.55+v117n(x*2.1,y*2.1,s+1)*.28+v117n(x*4.3,y*4.3,s+2)*.17;
const V117BAY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v=>v/16-.5);
const V117PAL=new Set(['#c98bff','#b06cf0','#a65cff','#8f4ad8','#7a3cc0','#c77be8','#b05cd8','#9c4fe0','#8540c4','#6e34ac','#c062c8','#a84aa8','#933fa8','#7c3492','#662a7c','#c8509c','#a83a86','#922f78','#7c2868','#64205a','#b998f0','#9f7ce8','#9070e0','#7c5cc8','#6a4cb0','#aeb0ec','#8e88d8','#7f78cc','#6c66b8','#5a54a0','#a7b6e8','#7f8ac8','#707bb8','#5f69a4','#4f588c','#a060ff','#6e28c8','#5e1eb4','#4c1698','#3c107c','#b878ff','#8e3ee8','#7c30d8','#6624bc','#521aa0','#9a50f4','#8240d8','#6c30bc'].map(h=>parseInt(h.slice(1),16)));
function v117Worm(s,keys){const st=window.__vpW!=null?window.__vpW:V117W;if(!st)return;
 for(const k of keys){if(!s.textures.exists(k))continue;const t=s.textures.get(k);if(t.__w117)continue;const cv=t.getSourceImage();if(!cv||!cv.getContext)continue;const W=cv.width,H=cv.height,x=cv.getContext('2d'),im=x.getImageData(0,0,W,H),d=im.data,M=new Uint8Array(W*H);let x0=W,x1=-1,y0=H,y1=-1;
  for(let i=0;i<W*H;i++){if(d[i*4+3]<250)continue;const h=(d[i*4]<<16)|(d[i*4+1]<<8)|d[i*4+2];if(h==0x3d1b6b)M[i]=2;else if(V117PAL.has(h))M[i]=1;else continue;const px=i%W,py=i/W|0;if(px<x0)x0=px;if(px>x1)x1=px;if(py<y0)y0=py;if(py>y1)y1=py}
  if(x1<0)continue;const cx=(x0+x1+1)/2,cy=(y0+y1+1)/2,R=Math.max(x1-x0+1,y1-y0+1)/2-1.6,OL={A:[12,8,20],B:[46,16,80],C:[6,4,12]}[st];
  for(let i=0;i<W*H;i++){if(!M[i])continue;const px=i%W,py=i/W|0,o=i*4;if(M[i]==2){d[o]=OL[0];d[o+1]=OL[1];d[o+2]=OL[2];continue}
   const r=d[o],g=d[o+1],b=d[o+2],rho=Math.min(1,Math.hypot(px+.5-cx,py+.5-cy)/R),nz=Math.sqrt(Math.max(0,1-rho*rho)),by=V117BAY[(py&3)*4+(px&3)];let R2,G2,B2;
   if(st=='A'){let l=.22+.86*nz+(rho>.48&&rho<.6?-.3:0);l=Math.round((l+by*.14)*5)/5;const rim=rho>.74?(rho-.74)/.26:0;R2=r*l+rim*90;G2=g*l+rim*80;B2=b*l+rim*170}
   else if(st=='B'){let l=1.18-.7*rho;l=Math.round((l+by*.12)*6)/6;const core=Math.max(0,.42-rho)*1.9,rim=Math.max(0,rho-.8)*3;R2=r*l*(1-core)+255*core+rim*30;G2=g*l*(1-core)+225*core+rim*150;B2=b*l*(1-core)+255*core+rim*200}
   else{let l=.26+.22*nz;l=Math.round((l+by*.1)*6)/6;const rim=Math.max(0,rho-.6)/.4,sp=v117h(px,py,7)<.05&&rho<.7?1:0;R2=r*l+rim*rim*150+sp*r*.6;G2=g*l+rim*rim*100+sp*g*.6;B2=b*l+rim*rim*255+sp*b*.6}
   d[o]=Math.min(255,R2);d[o+1]=Math.min(255,G2);d[o+2]=Math.min(255,B2)}
  x.putImageData(im,0,0);t.source[0].update();t.__w117=1}}
