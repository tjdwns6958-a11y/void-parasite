// 범위 모양 (앞 = +x, 원점 = 플레이어 중심). 판정 = 다각형 안 또는 테두리에서 M 이내
const M=6;
function chaikin(P,n){for(let k=0;k<n;k++){const Q=[];for(let i=0;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length];Q.push({x:a.x*.75+b.x*.25,y:a.y*.75+b.y*.25},{x:a.x*.25+b.x*.75,y:a.y*.25+b.y*.75})}P=Q}return P}
function line(P,a,b,n){for(let i=0;i<n;i++){const t=i/n;P.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t})}}
function fan(r,h,x0){const P=[];line(P,{x:x0,y:Math.tan(h)*x0*.0+8},{x:x0,y:-8},3);const a0={x:x0,y:-8},a1={x:Math.cos(h)*r,y:-Math.sin(h)*r};line(P,a0,a1,6);for(let i=0;i<=12;i++){const t=-h+2*h*i/12;P.push({x:Math.cos(t)*r,y:Math.sin(t)*r})}line(P,{x:Math.cos(h)*r,y:Math.sin(h)*r},{x:x0,y:8},6);return chaikin(P,3)}
function circ(c,r){const P=[];for(let i=0;i<48;i++){const t=i/48*6.283;P.push({x:c+Math.cos(t)*r,y:Math.sin(t)*r})}return P}
function trap(R,h0,h1,b){const P=[];line(P,{x:6,y:h0},{x:6,y:-h0},4);line(P,{x:6,y:-h0},{x:R,y:-h1},6);for(let i=0;i<8;i++){const y=-h1+2*h1*i/8;P.push({x:R+b*(1-(y/h1)**2),y})}line(P,{x:R,y:h1},{x:6,y:h0},6);return chaikin(P,3)}
function inPoly(P,x,y){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a.y>y)!=(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)c=!c}return c}
function dPoly(P,x,y){let m=1e9;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[j],b=P[i],dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy||1))),ex=a.x+dx*t-x,ey=a.y+dy*t-y;m=Math.min(m,Math.hypot(ex,ey))}return m}
const hit=(P,x,y)=>inPoly(P,x,y)||dPoly(P,x,y)<=M;
const old=(x,y)=>{const d=Math.hypot(x,y);return d<64&&x/(d||1)>.3};
function score(P){let o=0,n=0,b=0,reach=0;for(let x=-30;x<=100;x++)for(let y=-90;y<=90;y++){const a=old(x,y),c=hit(P,x,y);o+=a;n+=c;b+=a&&c;if(c&&Math.abs(y)<2)reach=Math.max(reach,x)}return {area:+(n/o).toFixed(3),overlap:+(b/o).toFixed(3),reach}}
module.exports={fan,circ,trap,score,chaikin};
if(require.main===module){
 const C={R1:[fan,[[56,1.2,6],[57,1.22,6],[58,1.2,6],[58,1.15,6]]],R2:[circ,[[30,30],[31,32],[30,33],[32,32]]],R3:[trap,[[56,12,38,8],[57,13,40,6],[58,13,42,6],[56,14,44,6]]]};
 for(const k in C){for(const p of C[k][1])console.log(k,JSON.stringify(p),JSON.stringify(score(C[k][0](...p))))}
}
