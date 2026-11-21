// 물기 0.34초 동안 프레임마다 jawDraw가 그리는 선을 가로채, 두 송곳니 사이 (1) 중심선 교차 수 (2) 테두리 두께까지 뺀 '보이는 틈'의 최솟값을 잰다
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl']});
for(const f of process.argv.slice(2)){const p=await b.newPage({viewport:{width:800,height:360}});
 await p.addInitScript(()=>{window.__vpNoTree=1;window.__vpNoSave=1;window.__vpZ=1});await p.goto('file://'+__dirname+'/'+f);await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const s=GAME.scene.scenes[0];GAME.loop.sleep();s.hd.setPosition(400,200);s.ang=0;
  let col=0,w=0,lines=[],strokes=[];const G={lineStyle(a,c){w=a;col=c;return G},strokePoints(P){if(col===0x3d1b6b)strokes.push({P:P.map(p=>({x:p.x,y:p.y})),w});return G},lineBetween(x1,y1,x2,y2){if(col===0x3d1b6b)lines.push({a:{x:x1,y:y1},b:{x:x2,y:y2},w});return G},fillStyle(){return G},fillCircle(){return G}};
  const sd=(p,a,b)=>{const ux=b.x-a.x,uy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*ux+(p.y-a.y)*uy)/(ux*ux+uy*uy||1)));return Math.hypot(a.x+ux*t-p.x,a.y+uy*t-p.y)};
  const X=(a,b,c,d)=>{const o=(p,q,r)=>Math.sign((q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x));return o(a,b,c)!=o(a,b,d)&&o(c,d,a)!=o(c,d,b)};
  let cross=0,vis=1e9;
  for(let k=0;k<=34;k++){lines=[];strokes=[];s.jawDraw(G,k/34,1);let segs=[];
   for(const st of strokes)for(let i=1;i<st.P.length;i++)segs.push({a:st.P[i-1],b:st.P[i],w:st.w});segs=segs.concat(lines);
   const up=segs.filter(q=>(q.a.y+q.b.y)/2<200),dn=segs.filter(q=>(q.a.y+q.b.y)/2>=200);
   for(const u of up)for(const v of dn){if(X(u.a,u.b,v.a,v.b))cross++;const d=Math.min(sd(u.a,v.a,v.b),sd(u.b,v.a,v.b),sd(v.a,u.a,u.b),sd(v.b,u.a,u.b))-(u.w+v.w)/2;vis=Math.min(vis,d)}}
  return {교차:cross,'테두리 포함 보이는 틈(px)':+vis.toFixed(2)}});
 console.log(f,JSON.stringify(r));await p.close()}
await b.close()})();
