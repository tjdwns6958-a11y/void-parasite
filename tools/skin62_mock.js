const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()=='error')errs.push(m.text())});
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=1});await p.goto('file://'+__dirname+'/v62.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
for(const PART of ['c','p']){
const out=await p.evaluate((PART)=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();GAME.loop.sleep();
 let src=skinTex.toString();src=src.split("'wh_'+key").join("'wh_'+key+V.sf").split("'whj_'+key").join("'whj_'+key+V.sf").split("'_'+key").join("'_'+key+V.sf");
 const R=(a,b)=>{if(!src.includes(a))throw new Error('anchor '+a);src=src.split(a).join(b)};
 R("function skinTex(s,key,L){","function(s,key,L,V){");R("const pal=dom=='n'?PAL.n:PAL[dom][t-1]","const pal=V.pal&&V.pal[dom]?V.pal[dom][t-1]:(dom=='n'?PAL.n:PAL[dom][t-1])");
 R("if(L.c>=1||L.v>=3)for","if((L.c>=1&&!V.c)||L.v>=3)for");R("if(L.c>=3){const R","if(L.c>=3&&!V.c){const R");R("if(L.p>=3&&!nj)","if(L.p>=3&&!nj&&!V.pm)");R("if(L.p>=2){const h=","if(L.p>=2&&!V.ps){const h=");
 R("const ec=","V.h&&V.h(x,c,r,L,px,ln,disc,pal);const ec=");R("if(L.v>=2)disc(x,c,c,1.1","V.g&&V.g(x,c,r,L,px,ln,disc,pal,i);if(L.v>=2)disc(x,c,c,1.1");
 const SK=eval('('+src+')');
 // ---- 도우미 ----
 const hs=(i,j)=>{let h=(i*374761393+j*668265263)|0;h=(h^(h>>>13))*1274126177|0;return((h^(h>>>16))>>>0)/4294967296};
 const cry=(x,px,bx,by,ang,len,w,cl)=>{const ca=Math.cos(ang),sa=Math.sin(ang),C=cl||['#24304a','#e8f6ff','#8fc4ee','#ffffff'];for(const pass of[0,1])for(let t=0;t<=len;t+=.4){const ww=w*(t<len*.35?t/(len*.35):(len-t)/(len*.65))+(pass?0:.7);for(let q=-ww;q<=ww;q+=.4){px(x,bx+ca*t-sa*q,by+sa*t+ca*q,pass?(q<0?C[1]:C[2]):C[0])}}px(x,bx+ca*len,by+sa*len,C[3])};
 const V={};
 // 갑각 A 결정이 박힘
 V.cA={sf:'_cA',c:1,h:(x,c,r,L,px)=>{const t=L.c;if(t>=1)cry(x,px,c-2,c-r+1,-1.97,t>=3?5:3,t>=3?1.6:1.2);if(t>=2){cry(x,px,c-2,c+r-1,1.97,t>=3?4.5:3,1.2);cry(x,px,c+1.5,c-r+1.5,-1.45,2,.9)}if(t>=3){cry(x,px,c-4,c-r+2,-2.4,3.5,1.1);cry(x,px,c+.5,c+r-1,1.6,2.5,1);for(const[a,b]of[[-1,1],[1,-1],[-3,0]])px(x,c+a,c+b,'#bfeaff')}},
  g:(x,c,r,L,px,ln,disc,pal,i)=>{const t=L.c;if(t==1&&i==1)cry(x,px,c-.5,c-r+.6,-1.75,2,.9);if(t==2&&i%2==0)cry(x,px,c-.5,c-r+.6,-1.75,2.6,1);if(t>=3){cry(x,px,c-.5,c-r+.6,-1.75,3-i*.35,1.1);if(i<2)cry(x,px,c,c+r-.6,1.75,2-i*.4,.8)}}};
 // 갑각 B 광맥 껍질 (돌 껍질 + 빛나는 광맥)
 const ST2={c:[['#a9a6c0','#9491ad','#86839f','#75728f','#65627f'],['#9c98b0','#848098','#76728a','#66627a','#56526a'],['#8e8aa0','#767288','#68647a','#58546a','#48445a']]};
 const crust=(x,px,c,r,top,dens,col)=>{const Rr=Math.ceil(r);for(let i=-Rr;i<=Rr;i++)for(let j=-Rr;j<=Rr;j++){const d=Math.hypot(i,j);if(d>r-.2||(top&&j>.5))continue;if(hs(i+9,j+5)<dens)px(x,c+i,c+j,col)}};
 V.cB={sf:'_cB',c:1,pal:ST2,h:(x,c,r,L,px,ln)=>{const t=L.c;crust(x,px,c,r,t<3,t==1?.15:t==2?.4:.6,'#4e4a62');if(t>=1)ln(x,c-r+1.5,c-1,c-1,c-r+1.5,'#7fe8ff');if(t>=2){ln(x,c-1,c-r+1.5,c+1,c-2,'#7fe8ff');px(x,c-1,c-r+1.5,'#d8faff')}
   if(t>=3){ln(x,c-r+1,c+1,c,c+r-1,'#7fe8ff');ln(x,c,c+r-1,c+2,c+2,'#7fe8ff');px(x,c,c+r-1,'#d8faff');px(x,c-2,c+1,'#d8faff');cry(x,px,c-3,c-r+1.5,-2,2.2,1);cry(x,px,c-2,c+r-1.5,2,2,.9)}},
  g:(x,c,r,L,px,ln,disc,pal,i)=>{const t=L.c;if(t>=2||i==1)crust(x,px,c,r,t<3,t==1?.2:t==2?.45:.6,'#4e4a62');if(t>=2&&i<3)ln(x,c-r+1,c-1,c+r-1.5,c-1.5,'#7fe8ff');if(t>=3)px(x,c,c-1,'#d8faff')}};
 // 갑각 C 정동 (바위 속 자수정)
 const GE={c:[['#a59ab8','#8e84a4','#7f7596','#6e6486','#5e5476'],['#8e84a4','#766c8e','#685e80','#5a5070','#4c4262'],['#7a7090','#5e5674','#544c6a','#4a4260','#403856']]};
 const geo=(x,px,cx,cy,r,half)=>{const Rr=Math.ceil(r);for(let i=-Rr;i<=Rr;i++)for(let j=-Rr;j<=Rr;j++){const d=Math.hypot(i,j);if(d>r||(half&&j>0))continue;px(x,cx+i,cy+j,d>r-.8?'#2a2438':d>r-1.6?'#7a6ad0':d>r-2.4?'#b8a8f0':'#e8e0ff')}px(x,cx,cy-(half?1:0),'#ffffff')};
 V.cC={sf:'_cC',c:1,pal:GE,h:(x,c,r,L,px)=>{const t=L.c;if(t==1)geo(x,px,c-2,c-r+2,1.4,0);if(t==2)geo(x,px,c-1.5,c-1.5,2.6,1);
   if(t>=3){const Rr=Math.ceil(r);for(let i=-Rr;i<=Rr;i++)for(let j=-Rr;j<=Rr;j++){const d=Math.hypot(i,j),open=i>-r*.15&&Math.abs(j)<(i+r*.15)*.95+1;if(d>r-.4)continue;if(open){const e=Math.abs(j)>(i+r*.15)*.95+.1||d>r-1.3;px(x,c+i,c+j,e?'#2a2438':((i+j)%3==0?'#e8e0ff':(i%2?'#b8a8f0':'#8fd8ff')))}}px(x,c+r-1,c,'#ffffff');px(x,c+2,c-1,'#ffffff')}},
  g:(x,c,r,L,px,ln,disc,pal,i)=>{const t=L.c;if(t==1&&i==1)geo(x,px,c,c-.5,1.4,0);if(t==2)geo(x,px,c,c,r-.3,1);if(t>=3)geo(x,px,c,c,r-.2,0)}};
 // 포식 A 둥근 흡입 입
 V.pA={sf:'_pA',pm:1,h:(x,c,r,L,px,ln,disc)=>{if(L.p<3)return;disc(x,c+r-1.5,c,3.2,'#3d1b6b');disc(x,c+r-1.5,c,2.6,'#1a0414');for(let k=0;k<10;k++){const a=k/10*6.283;px(x,c+r-1.5+Math.cos(a)*2.3,c+Math.sin(a)*2.3,'#ffffff')}disc(x,c+r-1.5,c,1,'#c0304a')}};
 // 포식 B 부푼 위장 (통째 삼킨 것이 비침)
 V.pB={sf:'_pB',h:null,g:(x,c,r,L,px,ln,disc,pal,i)=>{if(L.p<3)return;disc(x,c,c+.3,r-1.1,'#3a0a30');const pr=[()=>{px(x,c-1,c,'#8fc4ee');px(x,c,c-1,'#bfeaff');px(x,c+1,c,'#8fc4ee');px(x,c,c+1,'#5a7ab0')},()=>{px(x,c-1,c,'#e8b0c4');px(x,c,c,'#e8b0c4');px(x,c+1,c,'#e8b0c4');px(x,c-1,c-1,'#c8889c');px(x,c+1,c+1,'#c8889c')},()=>{ln(x,c-1,c+1,c+1,c-1,'#f0e6d8')},()=>{px(x,c,c,'#c070ff')}];pr[i]&&pr[i]();for(let a=Math.PI*1.15;a<Math.PI*1.6;a+=.2)px(x,c+Math.cos(a)*(r-.5),c+Math.sin(a)*(r-.5),'#ffd0e0')}};
 // 포식 C 뼈 가시 포식자
 V.pC={sf:'_pC',ps:1,pal:{p:[null,null,['#b03a6a','#8e2a58','#7a2250','#661c44','#521638']]},h:(x,c,r,L,px)=>{if(L.p<3)return;for(let a=Math.PI*.6;a<Math.PI*1.4;a+=.16){const rr=r-.8+((a*10|0)%2?1.4:0);px(x,c+Math.cos(a)*rr,c+Math.sin(a)*rr,'#f0e6d8')}px(x,c-2,c-4,'#ff3a5a');px(x,c-2,c-3,'#ff3a5a');px(x,c-2,c+3,'#ff3a5a');px(x,c-2,c+2,'#ff3a5a')},
  g:(x,c,r,L,px,ln)=>{if(L.p<2)return;const h=L.p>=3?4:3;for(const sg of[-1,1]){for(let k=0;k<h;k++){const X=c-k*.6,Y=c+sg*(r+k);px(x,X-1,Y,'#3d1b6b');px(x,X,Y,k==h-1?'#ffffff':'#f0e6d8')}}}};
 // ---- 그리기 ----
 s.add.rectangle(400,180,800,360,0x0b0716,1).setDepth(500);const TX=(x,y,t,o)=>s.add.text(x,y,t,ST(Object.assign({fontSize:'15px',color:'#ece6f7'},o||{}))).setOrigin(.5).setDepth(503);
 const worm=(x,y,L,v,sc)=>{const key='p'+L.p+'c'+L.c+'v'+L.v;let sf='';if(v){SK(s,key,L,v);sf=v.sf}else skinTex(s,key,L);for(let n=4;n>=1;n--)s.add.image(x-6.5*sc*n,y+1.5*sc*Math.sin(n*1.3),'ws'+n+'_'+key+sf).setScale(.5*sc).setDepth(501);s.add.image(x,y,'wh_'+key+sf).setScale(.5*sc).setDepth(502)};
 if(PART=='c'){const rows=[['지금 (v61)',null],['A 결정이 박힘',V.cA],['B 광맥 껍질',V.cB],['C 정동 (바위 속 자수정)',V.cC]];
  rows.forEach(([nm,v],ri)=>{const y=62+ri*84;TX(88,y,nm,{fontSize:'13px',color:ri?'#ffe082':'#ff9a9a'});for(let t=1;t<=3;t++){worm(130+t*215,y,{p:0,c:t,v:0},v,2.9);if(ri==0)TX(85+t*215,16,'갑각 '+t+'단계'+(t==3?' (공명 갑각)':''),{fontSize:'12px',color:'#9fd8ff'})}})}
 else{const rows=[['지금 (v61)',null],['A 둥근 흡입 입',V.pA],['B 부푼 위장',V.pB],['C 뼈 가시 포식자',V.pC]];
  rows.forEach(([nm,v],ri)=>{const x=(ri%2)*400,y=Math.floor(ri/2)*180;TX(x+200,y+24,nm,{fontSize:'14px',color:ri?'#ffe082':'#ff9a9a'});worm(x+275,y+110,{p:3,c:0,v:0},v,4.6)})}
 GAME.renderer.preRender();GAME.scene.render(GAME.renderer);GAME.renderer.postRender();return 'ok'},PART);
 await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/skinopt_'+PART+'.png'});await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(2500)}
console.log(JSON.stringify(errs));await b.close()})();
