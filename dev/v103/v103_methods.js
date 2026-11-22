 // ===== v103: 떨어지는 종유석 그림 — 천장 바위 뿌리 · 마디진 바위 원뿔 · 옆에 박힌 수정 · 끝은 날카로운 수정 =====
 gdkStlTex(){if(this.textures.exists('gdkStl'))return;tex(this,'gdkStl',20,50,2,x=>{const H=50;
  for(let y=0;y<H;y++){const t=y/(H-1),c=10+Math.sin(y*.21)*.6,w=Math.max(.6,9.4*Math.pow(1-t,.8)+Math.sin(y*.95)*.7*(1-t)),band=(y%7==3)&&t<.72;
   for(let X=0;X<20;X++){const u=(X+.5-c)/w;if(Math.abs(u)>1)continue;let col;
    if(t>.72){col=Math.abs(u)>.78?'#2a4a8a':u<-.25?'#e8f8ff':u>.35?'#4a8ad0':'#9fd8ff'}
    else{col=Math.abs(u)>.85?'#1a1428':u<-.45?'#8a80aa':u>.4?'#2e2846':'#5a5078';if(band&&Math.abs(u)<.85)col=u>.4?'#221d36':'#463e62';if(y<4)col=Math.abs(u)>.85?'#1a1428':'#3a3352'}
    x.fillStyle=col;x.fillRect(X,y,1,1)}}
  const sh=(a,b,s,d)=>{for(let i=0;i<s;i++){x.fillStyle=i==0?'#e8f8ff':'#9fd8ff';x.fillRect(a+d*i,b-i,1,1);x.fillStyle='#4a8ad0';x.fillRect(a+d*i,b-i+1,1,1)}};sh(4,16,3,-1);sh(15,23,3,1);sh(6,31,2,-1);
  x.fillStyle='#ffffff';x.fillRect(9,47,1,2)})}
