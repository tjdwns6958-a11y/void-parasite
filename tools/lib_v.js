const R=(a,b)=>a+Math.random()*(b-a);let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
function floor(x,W,H,col1,col2,crack){for(let j=0;j<H;j+=13)for(let i=0;i<W;i+=13){x.fillStyle=((i/13+j/13)%2)?col1:col2;x.fillRect(i,j,13,13)}
 if(crack){x.strokeStyle='rgba(0,0,0,.35)';x.lineWidth=1;for(let k=0;k<14;k++){let a=rnd()*W,b=rnd()*H;x.beginPath();x.moveTo(a,b);for(let s=0;s<4;s++){a+=R(-14,14);b+=R(-10,10);x.lineTo(a,b)}x.stroke()}}}
function px(x,X,Y,s,c){x.fillStyle=c;x.fillRect(Math.round(X),Math.round(Y),s,s)}
function worm(x,X,Y,dir){for(let i=5;i>=0;i--){const xx=X-Math.cos(dir)*i*6,yy=Y-Math.sin(dir)*i*6;x.fillStyle=i?'#7a4ac0':'#b080ff';x.beginPath();x.arc(xx,yy,i?4.5:6,0,7);x.fill()}x.fillStyle='#fff';x.fillRect(X+Math.cos(dir)*3-1,Y+Math.sin(dir)*3-2,2,2)}
function rock(x,X,Y,s,dk){x.fillStyle=dk?'#2c2640':'#5a5470';x.beginPath();x.moveTo(X-s,Y+s*.4);x.lineTo(X-s*.6,Y-s*.6);x.lineTo(X+s*.4,Y-s*.8);x.lineTo(X+s,Y);x.lineTo(X+s*.5,Y+s*.7);x.closePath();x.fill();x.fillStyle=dk?'#3a3354':'#7b7593';x.fillRect(X-s*.5,Y-s*.5,s*.6,s*.25)}
function vdl(x,X,Y){x.fillStyle='#3a1c60';x.fillRect(X-6,Y-1,4,3);x.fillRect(X+2,Y-1,4,3);x.fillStyle='#6a3fa0';x.beginPath();x.arc(X,Y,3.5,0,7);x.fill();x.fillStyle='#ffe066';x.fillRect(X-1,Y-2,2,2)}
// 깔때기
function funnel(x,cx,cy,R0,k,glow,squeeze){const D=R0*.32,off=t=>Math.pow(t,1.6)*D;
 x.fillStyle='rgba(0,0,0,.35)';x.beginPath();x.ellipse(cx,cy+4,R0+6,(R0+6)*.55,0,0,7);x.fill();
 for(let r=R0;r>3;r-=1.5){const t=1-r/R0,band=Math.floor(r/9)%2,l=(30-t*29)*(band?1:.86);x.fillStyle=`hsl(${265-t*15},${50+t*10}%,${Math.max(0,l)}%)`;x.beginPath();x.ellipse(cx,cy+off(t),r,r*.55,0,0,7);x.fill()}
 x.lineWidth=1.3;for(let i=0;i<70;i++){const r=R(10,R0*.98),t=1-r/R0,a=rnd()*6.283,len=(.25+t*.6)*k;x.strokeStyle=`rgba(${200-t*90},${170-t*110},255,${.15+.55*(1-t)})`;x.beginPath();x.ellipse(cx,cy+off(t),r,r*.55,0,a,a+len,k<0);x.stroke()}
 x.strokeStyle='rgba(230,215,255,.55)';x.lineWidth=1.5;x.beginPath();x.ellipse(cx,cy,R0,R0*.55,0,Math.PI*1.05,Math.PI*1.95);x.stroke();
 const hr=R0*.12*squeeze/(R0/128),h=Math.max(6,13*squeeze);x.fillStyle='#000';x.beginPath();x.ellipse(cx,cy+D*.93,h,h*.55,0,0,7);x.fill();x.strokeStyle=glow;x.lineWidth=1.5;x.beginPath();x.ellipse(cx,cy+D*.93,h+1,(h+1)*.55,0,0,7);x.stroke()}
