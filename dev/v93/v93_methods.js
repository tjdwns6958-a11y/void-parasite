 // ===== v93: 정동 집게왕 — 거품 분사(천천히 밀려오는 거품 탄막) · 사이클: 벽 오르기 → 수정 알 → 거품 분사 → 돌진 =====
 // bubW 0.6초(입가에 거품이 부글) → bub 2.6초: 0.42초마다 플레이어 쪽 부채꼴(±1.05rad)로 거품 11개(2페이즈 13개)를 엇갈리게 뿜음
 // 거품: 55~80px/s로 흔들리며 천천히 다가옴 · 닿으면 톡 터지며 피해 7 + 잠깐 느려짐 · 수정 기둥·벽에 닿으면 터짐 · 물거나 구체로 터뜨릴 수 있음 · 8초 뒤 사라짐
 gdkBubTex(){if(this.textures.exists('gdkBub'))return;tex(this,'gdkBub',12,12,2,x=>{const g=x.createRadialGradient(6,6,2,6,6,6);g.addColorStop(0,'rgba(160,220,255,.08)');g.addColorStop(.8,'rgba(170,220,255,.28)');g.addColorStop(1,'rgba(220,245,255,.9)');x.fillStyle=g;x.beginPath();x.arc(6,6,5.6,0,6.283);x.fill();
  x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=.8;x.beginPath();x.arc(6,6,5.4,0,6.283);x.stroke();x.fillStyle='#ffffff';x.fillRect(3,3,2,1);x.fillRect(3,4,1,1);x.fillStyle='rgba(200,160,255,.8)';x.fillRect(8,8,1,1)})}
 gdkBubble(m){this.gdkBubTex();m.st='bubW';m.tm=.6;m.bv=0;this.dtx(m.x,m.y-70,'거품을 뿜는다','#bff0ff')}
 gdkBubFire(m){const p=this.pl,n=m.ph==2?13:11,a0=Math.atan2(p.y-(m.y+30),p.x-m.x),sp=1.05,off=(m.bv%2)*.5;m.bv++;
  for(let i=0;i<n;i++){const a=a0-sp+(i+off)/(n-1)*sp*2,v=(m.bv%2?60:76)+Math.random()*6,r=7+Math.random()*2.5,x=m.x+Math.cos(a)*40,y=m.y+30+Math.sin(a)*24;
   m.bub.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.85,r,ph:Math.random()*6.283,t:8,o:this.add.image(x,y,'gdkBub').setDepth(11).setScale(r/6)})}
  for(let i=0;i<5;i++){const b=this.add.circle(m.x+(Math.random()-.5)*30,m.y+30,2+Math.random()*2,0xffffff,.7).setDepth(12);this.tweens.add({targets:b,y:b.y+14,alpha:0,duration:300,onComplete:()=>b.destroy()})}}
 gdkBubPop(b,big){b.dead=1;const o=b.o;this.tweens.add({targets:o,scale:o.scale*1.6,alpha:0,duration:140,onComplete:()=>o.destroy()});for(let i=0;i<(big?6:4);i++){const a=Math.random()*6.283,s=this.add.circle(b.x,b.y,1.2,0xffffff,.9).setDepth(12);this.tweens.add({targets:s,x:b.x+Math.cos(a)*(b.r+8),y:b.y+Math.sin(a)*(b.r+6),alpha:0,duration:220,onComplete:()=>s.destroy()})}}
 gdkBubU(m,dt,p,D){if(!m.bub||!m.bub.length)return;const now=this.time.now;
  for(const b of m.bub){if(b.dead)continue;b.t-=dt;const l=Math.hypot(b.vx,b.vy)||1,w=Math.sin(now/260+b.ph)*14;b.x+=(b.vx+(-b.vy/l)*w)*dt;b.y+=(b.vy+(b.vx/l)*w)*dt;b.o.setPosition(b.x,b.y+Math.sin(now/180+b.ph)*1.5);
   if(Math.hypot(p.x-b.x,p.y-b.y)<b.r+7){this.gdkBubPop(b,1);if(this.dshI>0){this.dshDodge('거품');continue}this.hurt(D(7),'거품 분사',m);this.slow=Math.max(this.slow||0,.6);continue}
   if(b.t<=0||b.x<46||b.x>754||b.y<56||b.y>316||m.pt.some(q=>q.on&&Math.hypot(q.x-b.x,q.y-b.y)<22+b.r)){this.gdkBubPop(b,0);continue}
   if(this.pprj)for(const q of this.pprj)if(q.t>0&&Math.hypot(q.x-b.x,q.y-b.y)<b.r+4){this.gdkBubPop(b,0);break}}
  m.bub=m.bub.filter(b=>!b.dead)}
 gdkBubBite(m,fx,fy){if(!m.bub)return 0;const p=this.pl,R=C.BITE.range+14;let hit=0;for(const b of m.bub){if(b.dead)continue;const dx=b.x-p.x,dy=b.y-p.y,d=Math.hypot(dx,dy);if(d<R&&(dx*fx+dy*fy)/(d||1)>0){this.gdkBubPop(b,0);hit=1}}m.bub=m.bub.filter(b=>!b.dead);return hit}
