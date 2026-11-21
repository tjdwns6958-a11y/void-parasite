const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:3});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=1});await p.goto('file://'+__dirname+'/v69.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();GAME.loop.sleep();const D=900;s.add.rectangle(400,180,800,360,0x0b0716,1).setDepth(D);const A=o=>o;const g=s.add.graphics().setDepth(D+3),gb=s.add.graphics().setDepth(D+.5);
 const L={p:3,c:0,v:0},mob=(x,y,h,fl)=>{const o=s.add.image(x,y,'kha').setDepth(D+1);o.setScale(h/o.height).setFlipX(fl!==false);return o};
 const blade=(cx,cy,ang,sc,sg,col)=>{const P=[[-1.8,4.2],[1.2,5.1],[3.6,4.1],[5.1,.9],[3.3,2.3],[2.8,1.7],[2.1,2.6],[1.4,2.1],[.8,2.9],[-1.2,2.2]].map(([x,y])=>{y*=sg;const c=Math.cos(ang),s2=Math.sin(ang);return{x:cx+(x*c-y*s2)*sc,y:cy+(x*s2+y*c)*sc}});g.lineStyle(2.2*sc/3,0x3d1b6b,1).strokePoints(P,true);g.fillStyle(col||0xf0c8d8,1).fillPoints(P,true);g.lineStyle(.9*sc/3,0xffffff,1).beginPath().moveTo(P[3].x,P[3].y);for(let i=4;i<=8;i++)g.lineTo(P[i].x,P[i].y);g.strokePath()};
 const slash=(x,y,n)=>{for(let i=0;i<n;i++)g.lineStyle(2,0xff4a6a,.95).lineBetween(x-6+i*4,y-8,x-1+i*4,y+8)};
 const panel=(i)=>{const x=(i%2)*400,y=Math.floor(i/2)*180;gb.fillStyle(0x140e24,1).fillRoundedRect(x+8,y+8,384,164,10);gb.lineStyle(1.5,0xff7a9a,.6).strokeRoundedRect(x+8,y+8,384,164,10);return[x+200,y+96]};
 // A 포식 난무
 {const[cx,cy]=panel(0);s.artWorm(o=>o,cx+14,cy,L,1.6,D+1);for(let k=0;k<3;k++){const a0=k*2.09;g.lineStyle(2,0xff9ad0,.7).beginPath().arc(cx,cy,42,a0,a0+1.2,false).strokePath();const tx=cx+Math.cos(a0+1.2)*42,ty=cy+Math.sin(a0+1.2)*42;g.fillStyle(0xff9ad0,.8).fillCircle(tx,ty,3)}
  for(const[a,fl]of[[-.4,true],[2.2,false],[3.9,false]]){const mx=cx+Math.cos(a)*78,my=cy+Math.sin(a)*52;mob(mx,my,24,fl);slash(mx,my,3)}for(let k=0;k<5;k++)g.fillStyle(0x7be0a8,.9).fillCircle(cx-30+k*14,cy-30-(k%2)*6,2)}
 // B 통째 삼키기
 {const[cx,cy]=panel(1);s.artWorm(o=>o,cx-40,cy,L,1.6,D+1);const m=mob(cx+30,cy,26);m.setTint(0x6a3a5a);blade(cx+8,cy-4,-.55,4.2,-1);blade(cx+8,cy+4,.55,4.2,1);g.fillStyle(0xffffff,.9).fillCircle(cx+52,cy,3);for(let k=0;k<4;k++)g.fillStyle(0x7be0a8,.9).fillCircle(cx-60+k*10,cy-26-(k%2)*5,2)}
 // C 턱 덫
 {const[cx,cy]=panel(2);s.artWorm(o=>o,cx-90,cy+6,L,1.4,D+1);gb.fillStyle(0x3a0a30,.6).fillEllipse(cx+45,cy+14,120,40);gb.lineStyle(1.5,0xff5a7a,.8).strokeEllipse(cx+45,cy+14,124,44);mob(cx+30,cy+4,22);mob(cx+64,cy+10,20,false);
  blade(cx+45-34,cy+20,-1.95,6,1,0xf0c8d8);blade(cx+45+34,cy+20,-1.19,6,-1,0xf0c8d8);for(let k=0;k<6;k++)g.lineStyle(1.2,0xff9ad0,.6).lineBetween(cx-60+k*6,cy+6,cx-50+k*6,cy+6)}
 // D 연속 물기
 {const[cx,cy]=panel(3);s.artWorm(o=>o,cx-70,cy,L,1.6,D+1);for(let k=0;k<4;k++){const hx=cx-40+k*22,al=.25+k*.2;g.setAlpha?null:0;blade(hx,cy-3,-.2-.2*(k%2),2.6+k*.3,-1,k==3?0xffffff:0xf0c8d8);blade(hx,cy+3,.2+.2*(k%2),2.6+k*.3,1,k==3?0xffffff:0xf0c8d8)}const m=mob(cx+78,cy,26);slash(cx+78,cy,4);g.fillStyle(0xff3a5a,.35).fillCircle(cx+78,cy,18);for(let k=0;k<3;k++)g.fillStyle(0xff4a6a,.9).fillCircle(cx+70+k*6,cy+18+k*3,1.8)}
 GAME.renderer.preRender();GAME.scene.render(GAME.renderer);GAME.renderer.postRender()});
await p.waitForTimeout(200);await p.screenshot({path:__dirname+'/pskill_raw.png'});console.log(JSON.stringify(errs));await b.close()})();
