 // ===== v95: 수정 알 첫 대 — 글자 대신 금 간 알 그림 + 찌그러짐 + 껍질 조각 + 작은 번쩍 =====
 gdkEggCTex(){if(this.textures.exists('gdkEggC'))return;tex(this,'gdkEggC',10,12,2,x=>{const g=x.createRadialGradient(4,4,1,5,6,6);g.addColorStop(0,'#ffffff');g.addColorStop(.35,'#bff0ff');g.addColorStop(.75,'#5aa8e0');g.addColorStop(1,'#2a4a8a');x.fillStyle=g;x.beginPath();x.ellipse(5,6.5,4.4,5.4,0,0,6.283);x.fill();
  x.strokeStyle='#1a2a5a';x.lineWidth=1;x.beginPath();x.ellipse(5,6.5,4.4,5.4,0,0,6.283);x.stroke();
  x.strokeStyle='#0e1838';x.lineWidth=1;x.beginPath();x.moveTo(1.5,5);x.lineTo(3.5,6.5);x.lineTo(2.8,8);x.lineTo(5,9);x.lineTo(4.6,10.5);x.moveTo(3.5,6.5);x.lineTo(6,5.5);x.lineTo(7,7);x.lineTo(8.6,6.2);x.stroke();
  x.strokeStyle='rgba(255,255,255,.85)';x.beginPath();x.moveTo(2,4.4);x.lineTo(3.9,5.9);x.lineTo(6.2,4.9);x.stroke();x.fillStyle='#0e1838';x.fillRect(6,2,1,1)})}
 gdkEggHit(m,e){e.hp=(e.hp||1)-1;if(e.hp<=0){this.gdkEggBreak(m,e);return}this.gdkEggCTex();const o=e.o;o.setTexture('gdkEggC').clearTint();
  this.tweens.add({targets:o,scaleX:{from:1.45,to:1.1},scaleY:{from:.8,to:1.1},duration:220,ease:'Back.out'});
  const f=this.add.circle(e.x,e.y,9,0xffffff,.8).setDepth(12);this.tweens.add({targets:f,scale:1.8,alpha:0,duration:160,onComplete:()=>f.destroy()});
  for(let i=0;i<5;i++){const a=-Math.PI/2+(Math.random()-.5)*2.4,c=this.add.triangle(e.x,e.y-4,0,-2.5,2,1.5,-2,1.5,i%2?0xbff0ff:0xffffff).setDepth(12).setRotation(Math.random()*6);
   this.tweens.add({targets:c,x:e.x+Math.cos(a)*(10+Math.random()*10),y:{value:e.y+8,ease:'Quad.in'},angle:200,alpha:0,duration:380+Math.random()*120,onComplete:()=>c.destroy()})}}
