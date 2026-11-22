const G=28;function grid(){return Array.from({length:G},()=>Array(G).fill(null))}
function draw(cv,g,bg){const x=cv.getContext('2d'),s=8;x.fillStyle=bg||'#16122a';x.fillRect(0,0,224,224);for(let j=0;j<G;j++)for(let i=0;i<G;i++)if(g[j][i]){x.fillStyle=g[j][i];x.fillRect(i*s,j*s,s,s)}}
function small(cv,g,n,lay){const x=cv.getContext('2d');x.fillStyle='#1c1830';x.fillRect(0,0,140,224);for(let j=0;j<224;j+=10)for(let i=0;i<140;i+=10)if((i+j)/10%2){x.fillStyle='#201b36';x.fillRect(i,j,10,10)}
 x.fillStyle='#8a80aa';x.font='11px sans-serif';x.fillText('게임 속 크기',8,16);
 const tmp=document.createElement('canvas');tmp.width=G;tmp.height=G;const t=tmp.getContext('2d');for(let j=0;j<G;j++)for(let i=0;i<G;i++)if(g[j][i]){t.fillStyle=g[j][i];t.fillRect(i,j,1,1)}
 x.imageSmoothingEnabled=false;lay.forEach(([X,Y,r,sc])=>{x.save();x.translate(X,Y);x.rotate(r);x.drawImage(tmp,-G*sc/2,-G*sc/2,G*sc,G*sc);x.restore()})}
const P=(g,i,j,c)=>{if(i>=0&&j>=0&&i<G&&j<G)g[j][i]=c};
const star=(g,i,j)=>P(g,i,j,'#ffffff');
// 지금
const g0=grid();{const o=8;for(let j=0;j<12;j++)for(let i=0;i<14;i++){}
 const S=(i,j,c)=>P(g0,i+7,j+8,c);for(let i=1;i<5;i++)for(let j=4;j<7;j++)S(i,j,'#3a1c60');for(let i=9;i<13;i++)for(let j=4;j<7;j++)S(i,j,'#3a1c60');for(let i=2;i<5;i++)S(i,5,'#7a4ac0');for(let i=9;i<12;i++)S(i,5,'#7a4ac0');
 for(let j=0;j<12;j++)for(let i=0;i<14;i++){const d=Math.hypot(i-7,j-6);if(d<3.6)S(i,j,d<2.8?'#6a3fa0':'#1a0c2e')}for(let j=0;j<12;j++)for(let i=0;i<14;i++)if(Math.hypot(i-7,j-4.6)<1.4)S(i,j,'#ffe066');S(7,4,'#1a0c2e');S(6,9,'#c070ff');S(6,10,'#c070ff');S(8,9,'#c070ff');S(8,10,'#c070ff')}
// D1 가오리 (위에서 본 모습, 머리 위쪽)
const g1=grid();for(let j=0;j<G;j++)for(let i=0;i<G;i++){const u=(i-13.5)/12,v=(j-11)/8;const w=1-Math.abs(v)*1.05-Math.pow(Math.abs(u),1.6)*.95+(v<0?-.0:0);if(v>-1.1&&v<1&&w>0&&Math.abs(u)<1.05){let c=w<.12?'#2a1450':w<.3?'#4a2a88':'#1a0c38';if(Math.abs(u)<.25&&v<.6)c=w<.3?'#5a34a0':'#22104a';P(g1,i,j,c)}}
 [[9,10],[17,9],[12,14],[16,13],[7,12],[20,12],[14,8],[11,11]].forEach(([i,j])=>star(g1,i,j));[[13,5],[14,5]].forEach(([i,j])=>P(g1,i,j,'#7ff0ff'));
 for(let j=19;j<27;j++){P(g1,13+((j/3|0)%2),j,'#4a2a88')}P(g1,14,27,'#c070ff');for(let i=2;i<26;i++){const u=(i-13.5)/12;const j=Math.round(11+(-.0)+8*(1-Math.pow(Math.abs(u),1.6)*.95-0)*0);}
 for(let i=3;i<25;i++){/*가장자리 빛*/for(let j=0;j<G;j++){if(g1[j][i]&&(!g1[j-1]||!g1[j-1][i])){P(g1,i,j,'#9a70ff');break}}}
// D2 틈 박쥐
const g2=grid();for(let j=0;j<G;j++)for(let i=0;i<G;i++){const u=Math.abs(i-13.5),v=j-9;// 날개
 const top=2+u*.15+Math.sin(u*.9)*1.2,bot=12+(u>3?-Math.abs(Math.sin(u*.75))*4:0)+(u>3?0:3);if(u<13.5&&j>top&&j<bot+(u<4?4:0))P(g2,i,j,u<4?'#2a1450':'#120824')}
 // 찢어진 틈 (별빛)
 [[4,6],[5,6],[5,7],[5,8],[6,8],[6,9],[21,5],[22,5],[22,6],[22,7],[23,8],[23,9],[8,9],[19,8],[19,9]].forEach(([i,j])=>P(g2,i,j,'#05020c'));[[5,7],[6,9],[22,6],[23,9]].forEach(([i,j])=>star(g2,i,j));P(g2,8,9,'#7ff0ff');
 for(let i=1;i<27;i++){for(let j=0;j<G;j++)if(g2[j][i]){P(g2,i,j,'#6a3fc0');break}}
 for(let j=0;j<G;j++)for(let i=0;i<G;i++){const d=Math.hypot(i-13.5,j-10);if(d<4.2)P(g2,i,j,d<3.4?'#3a1c70':'#1a0c2e')}
 for(let j=0;j<G;j++)for(let i=0;i<G;i++){const d=Math.hypot(i-13.5,j-9.5);if(d<2.1)P(g2,i,j,d<1.2?'#ffffff':'#3fe0e0')}P(g2,13,9,'#05020c');
 [[12,15],[15,15],[11,16],[16,16]].forEach(([i,j])=>P(g2,i,j,'#c070ff'));
// D3 칠성장어 (S자 마디)
const g3=grid();const seg=[];for(let k=0;k<16;k++){const t=k/15;seg.push([14+Math.sin(t*4.6+.4)*6.5,5+t*20,5.4-t*3.6])}
 for(let k=seg.length-1;k>=0;k--){const[cx,cy,r]=seg[k];for(let j=0;j<G;j++)for(let i=0;i<G;i++){const d=Math.hypot(i-cx,j-cy);if(d<r)P(g3,i,j,d<r-1.2?(k%2?'#3a1c70':'#4a2a90'):'#1a0c2e')}if(k>1&&k%2==0){P(g3,Math.round(cx+r-1.5),Math.round(cy),'#7ff0ff');P(g3,Math.round(cx-r+1.5),Math.round(cy),'#7ff0ff')}}
 {const[cx,cy]=seg[0];for(let j=0;j<G;j++)for(let i=0;i<G;i++){const d=Math.hypot(i-cx,j-cy+.5);if(d<4.2)P(g3,i,j,d<2.2?'#05020c':d<3.1?'#ffe0ff':'#c070ff')}}
