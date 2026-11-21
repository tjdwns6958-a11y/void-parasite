const {chromium}=require('playwright');const fs=require('fs');const IM=JSON.parse(fs.readFileSync(__dirname+'/atk_b64.json'));
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});const errs=[];
for(const T of [1,3]){const ctx=await b.newContext({viewport:{width:800,height:360},deviceScaleFactor:2});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(T+' '+e.message));
 await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=2;window.__vpJoyUsed=1});
 await p.goto('file://'+__dirname+'/v59.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(async([T,IM])=>{const s=GAME.scene.scenes[0];if(s.hint)s.hint.destroy();
  for(const k in IM){await new Promise(r=>{s.textures.once('addtexture',r);s.textures.addBase64(k,'data:image/png;base64,'+IM[k])})}
  s.lin={p:1,c:2,v:0};s.recalc();s.wormSkin();s.treeOpen();const O=s.treeO;
  const add=o=>{O.push(o);return o.setDepth(o.depth>=323?o.depth:323)};
  // 벌레 한 마리 (머리 + 마디 4) — 오른쪽을 봄
  const worm=(x,y,L,sc)=>{const key='p'+L.p+'c'+L.c+'v'+L.v;if(key!='p0c0v0')skinTex(s,key,L);const nm=n=>key=='p0c0v0'?(n?'ws'+n:'wh'):(n?'ws'+n+'_'+key:'wh_'+key);
   for(let i=4;i>=1;i--)add(s.add.image(x-6.5*sc*i,y+1.5*sc*Math.sin(i*1.3),nm(i)).setScale(.5*sc).setDepth(324));add(s.add.image(x,y,nm(0)).setScale(.5*sc).setDepth(324.5))};
  const LV=(k,j)=>{const L={p:0,c:0,v:0};L[k]=j+1;if(j==2)L[k=='p'?'c':'p']=1;return L};
  const tx=(x,y,t,o,ox,oy)=>add(s.add.text(x,y,t,ST(Object.assign({fontSize:'10px'},o))).setOrigin(ox??.5,oy??.5).setDepth(325));
  if(T==1){ // T1 단계마다 작은 모습
   for(const k of LK)for(let j=0;j<3;j++){const[x,y]=s.treePos(k,j),own=j<s.lin[k];const[ox,oy]=k=='p'?[112,0]:[0,-26];const g=add(s.add.graphics().setDepth(323));g.fillStyle(0x1c1430,.9).fillRoundedRect(x+ox-26,y+oy-11,40,22,6);g.lineStyle(1,LCN[k],own?.9:.35).strokeRoundedRect(x+ox-26,y+oy-11,40,22,6);worm(x+ox+6,y+oy,LV(k,j),.85);if(!own)g.fillStyle(0x0b0716,.45).fillRoundedRect(x+ox-26,y+oy-11,40,22,6)}}
  if(T==2){ // T2 선택한 단계 미리보기 창
   O.sel=['c',2];s.treeDraw();const g=add(s.add.graphics().setDepth(323)),X=566,Y=86,W=218,H=150;g.fillStyle(0x140e24,.97).fillRoundedRect(X,Y,W,H,8);g.lineStyle(1.5,LCN.c,.9).strokeRoundedRect(X,Y,W,H,8);
   tx(X+10,Y+12,'갑각 3단계 · 공명 갑각',{fontSize:'12px',fontStyle:'bold',color:LCS.c},0,.5);tx(X+10,Y+27,'이 단계가 되면 이런 모습',{color:'#a99fc2'},0,.5);
   g.fillStyle(0x0b0716,1).fillRoundedRect(X+8,Y+36,96,60,6);worm(X+70,Y+66,LV('c',2),1.6);
   g.fillStyle(0x0b0716,1).fillRoundedRect(X+110,Y+36,100,60,6);add(s.add.image(X+160,Y+66,'ac').setDisplaySize(100,50).setDepth(324));
   tx(X+56,Y+104,'모습',{color:'#c9c0de'});tx(X+160,Y+104,'공격: 몸통 박치기',{color:'#c9c0de'});tx(X+10,Y+126,'부딪히면 수정 파편이 튄다 · 반사 75%\n쓰러지는 순간 한 번 부활',{color:'#ece6f7',lineSpacing:2},0,.5)}
  if(T==3){ // T3 동그라미 = 초상, 가운데 = 지금 내 모습, 계통 끝 = 공격 장면
   const g=add(s.add.graphics().setDepth(323));
   for(const k of LK)for(let j=0;j<3;j++){const[x,y]=s.treePos(k,j),own=j<s.lin[k];g.fillStyle(0x1c1430,1).fillCircle(x,y,13);g.lineStyle(2,LCN[k],own?1:.4).strokeCircle(x,y,13);worm(x+5,y,LV(k,j),.55);if(!own)g.fillStyle(0x0b0716,.5).fillCircle(x,y,13)}
   g.fillStyle(0x241c38,1).fillCircle(400,204,22);g.lineStyle(2,0xc98bff,1).strokeCircle(400,204,22);worm(410,200,s.lin,.9);tx(400,234,'지금 내 모습',{fontSize:'9px',color:'#c9c0de'});
   const card=(x,y,key,cap,k)=>{g.fillStyle(0x140e24,.97).fillRoundedRect(x,y,104,62,6);g.lineStyle(1.2,LCN[k],.8).strokeRoundedRect(x,y,104,62,6);add(s.add.image(x+52,y+27,key).setDisplaySize(96,48).setDepth(324));tx(x+52,y+55,cap,{fontSize:'9px',color:LCS[k]})};
   card(556,150,'ap','포식 — 턱으로 물기','p');card(676,196,'ac','갑각 — 몸통 박치기','c');card(20,196,'av','공허 — 검은 구체','v')}
 },[T,IM]);
 await p.waitForTimeout(500);await p.screenshot({path:`${__dirname}/tree_T${T}.png`});await ctx.close()}
console.log('errs',JSON.stringify(errs));await b.close()})();
