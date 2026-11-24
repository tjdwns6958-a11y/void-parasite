 // ===== v116 분위기: 가장자리 어둠 + 떠다니는 빛 티끌 (일반 방) =====
 v116Amb(a){if(this.mbOn||a.tr=='void')return;
  if(!this.textures.exists('v116vig')){const cv=document.createElement('canvas');cv.width=400;cv.height=180;const x=cv.getContext('2d'),g=x.createRadialGradient(200,90,40,200,90,230);g.addColorStop(0,'rgba(6,3,14,0)');g.addColorStop(.55,'rgba(6,3,14,.18)');g.addColorStop(1,'rgba(4,2,10,.78)');x.fillStyle=g;x.fillRect(0,0,400,180);this.textures.addCanvas('v116vig',cv)}
  if(!this.textures.exists('v116mote')){const cv=document.createElement('canvas');cv.width=cv.height=16;const x=cv.getContext('2d'),g=x.createRadialGradient(8,8,0,8,8,8);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,16,16);this.textures.addCanvas('v116mote',cv)}
  this.dec.push(this.add.image(400,180,'v116vig').setDisplaySize(800,360).setDepth(39.2).setAlpha(a.tr=='dark'?0:.9));
  let sd=(a.r*31+a.c*17+5)*2654435761%2147483647||9;const R=()=>{sd=sd*16807%2147483647;return sd/2147483647};
  const n=a.tr=='mine'?16:12;for(let i=0;i<n;i++){const x=40+R()*720,y=40+R()*280,c=R()<.5?0x8a6aff:R()<.6?0x5ab0e8:0xc0a0ff,o=this.add.image(x,y,'v116mote').setDepth(3.2).setTint(c).setBlendMode(Phaser.BlendModes.ADD).setScale(.25+R()*.35).setAlpha(0);this.dec.push(o);
   const T=5000+R()*5000;this.tweens.add({targets:o,y:y-30-R()*40,x:x+(R()-.5)*40,duration:T,repeat:-1,delay:R()*T,onRepeat:()=>{o.setPosition(40+Math.random()*720,60+Math.random()*280)}});
   this.tweens.add({targets:o,alpha:{from:0,to:.35+R()*.4},duration:T/2,yoyo:true,repeat:-1,delay:R()*T})}}
