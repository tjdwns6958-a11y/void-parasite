const {chromium}=require('playwright');const fs=require('fs');
const b64=f=>'data:image/png;base64,'+fs.readFileSync(f).toString('base64');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1640,height:900}});
const html=`<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:#120e1a;color:#e8dcff;font-family:sans-serif;width:1640px}
h1{font-size:28px;margin:14px 20px 4px}h2{font-size:19px;margin:6px 0 2px;color:#ffe9a8}p{margin:3px 0 4px;font-size:14.5px;color:#c9c0de;line-height:1.42}.cp{color:#7be0a8;font-size:13.5px}
.row{display:flex;gap:14px;padding:0 20px 10px}.c{width:392px}canvas{display:block;border-radius:6px;width:392px;height:176px}.sub{font-size:15px;color:#a99fc2;margin:0 20px 8px}</style></head><body>
<h1 id=t></h1><div class=sub id=st></div><div class=row id=r></div>
<script>
const P=${JSON.stringify(process.argv[2]||'')};
</script></body></html>`;
await p.setContent(html);
const run=async(title,sub,bg,items,out)=>{await p.evaluate(([title,sub,bg,items])=>{document.getElementById('t').textContent=title;document.getElementById('st').textContent=sub;const r=document.getElementById('r');r.innerHTML='';
 return Promise.all(items.map(it=>new Promise(res=>{const d=document.createElement('div');d.className='c';d.innerHTML='<h2>'+it.n+'</h2>';const cv=document.createElement('canvas');cv.width=800;cv.height=360;d.appendChild(cv);d.insertAdjacentHTML('beforeend','<p>'+it.d+'</p><p class=cp>'+it.cp+'</p>');r.appendChild(d);
  const im=new Image();im.onload=()=>{const x=cv.getContext('2d');x.drawImage(im,0,0,800,360);x.fillStyle='rgba(10,6,20,.35)';x.fillRect(0,0,800,360);try{new Function('x',it.draw)(x)}catch(e){console.log(e)}res()};im.src=bg})))},[title,sub,bg,items]);
 await p.waitForTimeout(300);const h=await p.evaluate(()=>document.body.scrollHeight);await p.setViewportSize({width:1640,height:h});await p.screenshot({path:out,fullPage:true})};
const L=(t,x,y,c)=>`;x.font='bold 22px sans-serif';const w${Math.round(x)}=x.measureText('${t}').width+14;x.fillStyle='rgba(10,6,20,.85)';x.fillRect(${x}-w${Math.round(x)}/2,${y}-16,w${Math.round(x)},28);x.fillStyle='${c||'#ffe9a8'}';x.fillText('${t}',${x}-w${Math.round(x)}/2+7,${y}+6);`;
// 집게왕 2페이즈 대안
await run('정동 집게왕 2페이즈 — 정동 던지기 대신 (안)','등의 정동이 깨진 뒤 새로 쓰는 기믹. 수정 기둥(돌진을 막아 기절시키는 곳)과 엮이게.',b64('t104_rip.png'),[
 {n:'G1 다시 자라는 수정 갑주',d:'깨진 등에 수정 가시가 3단계로 다시 자란다. 다 자라면 사방으로 수정 가시를 쏟아낸다(빈틈 있는 원형 탄막).',cp:'대처: 기절했을 때 등을 물면 가시가 부러져 단계가 내려감',
  draw:`for(let i=0;i<7;i++){const a=-2.6+i*.35;x.fillStyle='#9fd8ff';x.beginPath();x.moveTo(400+Math.cos(a)*40,70+Math.sin(a)*22);x.lineTo(400+Math.cos(a)*78,70+Math.sin(a)*48);x.lineTo(400+Math.cos(a+.12)*40,70+Math.sin(a+.12)*22);x.fill()}
   for(let i=0;i<20;i++){if(i%5==2)continue;const a=i/20*6.283;x.fillStyle='#bff0ff';x.save();x.translate(400+Math.cos(a)*170,110+Math.sin(a)*120);x.rotate(a);x.fillRect(-9,-3,18,6);x.restore()}`+L('다 자라면 → 사방으로',400,330)},
 {n:'G2 정동 지뢰(수정 꽃)',d:'걸어 다니며 바닥에 수정 봉오리를 심는다. 3초 뒤 꽃이 피며 십자로 가시가 터진다. 집게왕이 돌진하다 봉오리를 밟으면 터지며 스스로 맞는다.',cp:'대처: 봉오리 뒤에 서서 돌진을 유도 · 터지는 십자 줄 밖으로',
  draw:`for(const[a,b,k]of[[260,200,1],[520,230,.6],[640,150,.3]]){x.fillStyle='#c8a0ff';x.beginPath();x.arc(a,b,10+8*k,0,7);x.fill();x.fillStyle='#ffffff';x.beginPath();x.arc(a,b,4,0,7);x.fill();if(k==1){x.strokeStyle='rgba(255,90,122,.9)';x.lineWidth=3;x.strokeRect(a-110,b-6,220,12);x.strokeRect(a-6,b-90,12,180)}}`+L('3초 뒤 십자로 터짐',260,330,'#ffb0c0')},
 {n:'G3 공명 울음',d:'집게를 맞부딪쳐 울리면 방 안의 수정 기둥들이 차례로 빛나며 둘레로 충격 고리를 낸다. 안전하던 기둥 곁이 잠깐 위험해진다.',cp:'대처: 빛나는 기둥에서 떨어지기 · 다음에 빛날 기둥을 보고 길 고르기',
  draw:`for(const[a,b,k]of[[255,140,1],[540,140,.7],[255,250,.4],[540,250,.15]]){x.strokeStyle='rgba(255,233,168,'+k+')';x.lineWidth=4;for(let j=0;j<3;j++){x.beginPath();x.ellipse(a,b+20,40+j*22,(40+j*22)*.6,0,0,7);x.stroke()}}`+L('기둥 1 → 2 → 3 → 4 차례로',400,330)}
],'/home/user/void-parasite/docs/v104/gdk_p2_ideas.png');
// 허기의 왕관 새 스킬
await run('허기의 왕관 — 새 스킬 (안)','들숨을 뺀 뒤 너무 쉬워짐 → 턱 6개와 \"허기\"를 살린 패턴.',b64('game103_scatter.png'),[
 {n:'H1 턱 비',d:'턱들이 화면 밖으로 날아올라, 플레이어를 따라오는 붉은 원 위로 차례로 내리꽂힌다(6연속).',cp:'대처: 계속 움직이며 원을 끌고 다니기',
  draw:`for(let i=0;i<6;i++){const a=180+i*70,b=270-i*14;x.strokeStyle='rgba(255,90,122,'+(1-i*.13)+')';x.lineWidth=3;x.beginPath();x.ellipse(a,b,30,22,0,0,7);x.stroke()}x.fillStyle='#ffffff';for(let i=0;i<3;i++){x.fillRect(178+i*70,40,4,40)}`+L('따라오는 원 6개',400,330)},
 {n:'H2 굶주린 돌진',d:'왕관이 입을 벌린 채 일직선으로 돌진. 닿으면 삼켜져 화면이 어두워지고, 연타로 물어 빠져나와야 한다(그동안 왕관 회복).',cp:'대처: 붉은 띠 밖으로 · 삼켜지면 빨리 연타',
  draw:`x.fillStyle='rgba(255,59,79,.25)';x.fillRect(250,150,560,110);x.strokeStyle='#ff5a7a';x.lineWidth=3;x.strokeRect(250,150,560,110);x.fillStyle='#000';x.beginPath();x.ellipse(560,205,50,36,0,0,7);x.fill()`+L('붉은 띠 = 돌진 경로',400,330,'#ffb0c0')},
 {n:'H3 턱 사슬 올가미',d:'턱 6개가 사슬처럼 이어져 방 가장자리에서 원을 그리며 조여 온다. 사슬에 한 칸 빈틈이 있다.',cp:'대처: 빈틈을 찾아 원 밖으로 빠져나가기',
  draw:`x.strokeStyle='rgba(240,230,255,.9)';x.lineWidth=5;x.setLineDash([26,10]);x.beginPath();x.ellipse(400,190,330,150,0,.4,6.1);x.stroke();x.setLineDash([]);x.strokeStyle='rgba(255,90,122,.8)';x.lineWidth=2;x.beginPath();x.ellipse(400,190,250,110,0,0,7);x.stroke()`+L('빈틈 →',690,215,'#7be0a8')},
 {n:'H4 허기 표식',d:'유충 몇 마리에 표식을 건다. 표식 유충은 왕관 쪽으로 기어가고, 닿으면 왕관이 커지고 회복한다.',cp:'대처: 표식 유충을 먼저 먹기(먹이 경쟁 되살림)',
  draw:`for(const[a,b]of[[150,110],[660,280],[130,290]]){x.fillStyle='#3fd08a';x.fillRect(a-8,b-4,16,8);x.strokeStyle='#ff5a7a';x.lineWidth=2;x.beginPath();x.arc(a,b,14,0,7);x.stroke();x.setLineDash([6,6]);x.beginPath();x.moveTo(a,b);x.lineTo(400,170);x.stroke();x.setLineDash([])}`+L('표식 유충 → 왕관으로',400,330,'#ffb0c0')}
],'/home/user/void-parasite/docs/v104/hcr_ideas.png');
await b.close()})();
