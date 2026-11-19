#!/usr/bin/env python3
"""v33 (2부): 멈춤 대책 — 몬스터 AI별 오류 격리 · 게임 루프 전체 보호 · 감시견 · 오류 표시.
사용: python3 dev/v33/v33b_patch.py index.html  (v33_patch.py 를 적용한 파일에 이어서 적용)"""
import sys
P = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt: raise SystemExit(f'anchor x{n} (want {cnt}): {old[:80]!r}')
    s = s.replace(old, new)

# ---- 0) 전역 오류 보고 · 감시견 (게임 스크립트 맨 앞) ----
GLOBAL = r"""<script>
// ===== 멈춤 대책: 오류 보고 · 루프 보호 · 감시견 (v33) =====
window.VP_VER='v33';
window.vpErr=function(e,where){try{const n=(window.__vpErrN=(window.__vpErrN||0)+1);if(n<=5)console.error('[vpErr]',where||'',e);
  if(n>1)return;const msg=String(e&&e.message||e).slice(0,120),st=String(e&&e.stack||'').split('\n').slice(1,4).map(l=>l.trim().replace(/\(?(file|https?):[^)]*\//,'(')).join(' | ').slice(0,220);
  try{localStorage.setItem('vp_err',JSON.stringify({v:VP_VER,where:where||'',msg,st,at:Date.now()}))}catch(_){}
  let el=document.getElementById('vpErrBox');if(!el){el=document.createElement('div');el.id='vpErrBox';el.style.cssText='position:fixed;left:4px;top:4px;max-width:62vw;padding:3px 6px;background:rgba(40,8,20,.82);color:#ffb0c0;font:10px monospace;z-index:20;border-radius:4px;pointer-events:auto;white-space:pre-wrap';el.onclick=()=>el.remove();document.body.appendChild(el)}
  el.textContent='⚠ 오류 ('+VP_VER+') '+(where||'')+': '+msg+'\n'+st+'\n— 이 화면을 캡처해서 보내 주세요 (눌러서 닫기)'}catch(_){}};
window.addEventListener('error',ev=>vpErr(ev.error||ev.message,'window'));
window.addEventListener('unhandledrejection',ev=>vpErr(ev.reason,'promise'));
// 한 프레임의 어느 단계(입력·트윈·타이머·물리·그리기)에서 오류가 나도 다음 프레임이 계속 돈다
(function(){const st=Phaser.Game.prototype.step;Phaser.Game.prototype.step=function(t,d){try{st.call(this,t,d)}catch(e){vpErr(e,'step');try{this.renderer&&this.renderer.postRender&&this.renderer.postRender()}catch(_){}}}})();
// 감시견: 화면이 보이는데 2초 넘게 프레임이 안 늘면 루프를 다시 켠다. 두 번 실패하면 저장 후 다시 불러오기 안내
(function(){let lf=-1,same=0,tries=0,shown=0;setInterval(()=>{try{const G=window.GAME;if(!G||!G.loop||document.hidden||G.__vpNoDog||!G.loop.running)return;const L=G.loop;
  if(L.frame!==lf){lf=L.frame;same=0;tries=0;return}same++;if(same<2)return;same=0;tries++;
  if(tries<=2){vpErr(new Error('루프가 멈춰 다시 켬 (frame '+L.frame+')'),'watchdog');try{L.sleep();L.wake()}catch(e){try{L.raf.stop();L.raf.start(L.step.bind(L),L.forceSetTimeOut,L._target)}catch(_){}}return}
  if(shown)return;shown=1;try{const sc=G.scene.scenes[0];sc&&sc.saveG&&sc.saveG()}catch(_){}
  const el=document.createElement('div');el.style.cssText='position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(11,7,22,.94);color:#ece6f7;font:15px sans-serif;z-index:19;text-align:center;gap:14px';
  el.innerHTML='게임이 멈췄어요<br><span style="font-size:12px;color:#a99fc2">다시 불러오면 저장된 곳부터 이어서 할 수 있어요</span>';const b=document.createElement('button');b.textContent='다시 불러오기';b.style.cssText='font:15px sans-serif;padding:8px 18px;border-radius:8px;border:1px solid #c9a7ff;background:#2a1d44;color:#fff';b.onclick=()=>location.reload();el.appendChild(b);document.body.appendChild(el)}catch(_){}},1000)})();
</script>
<script>"""
rep('<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>\n<script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>\n' + GLOBAL)

# 감시견이 게임을 찾을 수 있게
rep("\nnew Phaser.Game({type:Phaser.AUTO,", "\nwindow.GAME=new Phaser.Game({type:Phaser.AUTO,")

# 기존 update try/catch 도 같은 보고 창구로
rep("update(t,ms){try{this.upd(t,ms)}catch(e){this.errN=(this.errN||0)+1;if(this.errN<5)console.error(e)}}",
    "update(t,ms){try{this.upd(t,ms)}catch(e){this.errN=(this.errN||0)+1;vpErr(e,'update')}}")

# ---- 1) 몬스터 AI 하나가 오류를 내도 그 몬스터만 건너뛴다 ----
rep("for(const m of this.cur.en)if(m.on){if(m.k){this[m.k+'AI'](m,dt,p);continue}",
    "for(const m of this.cur.en)if(m.on){if(m.k){try{this[m.k+'AI'](m,dt,p)}catch(e){vpErr(e,m.k+'AI '+(m.st||''))}continue}")

# ---- 2) 보스가 자기 AI 도중에 죽으면 바로 멈춘다 ----
# 허기의 왕관: 턱에 닿아 반사·수정 파편으로 보스가 죽은 경우
rep("this.hurt(D(j.st=='lunge'?13:6),'허기의 턱',m)}}",
    "this.hurt(D(j.st=='lunge'?13:6),'허기의 턱',m);if(!m.on)return}}")
rep("if(((p.x-m.x)/52)**2+((p.y-m.y)/36)**2<1)this.hurt(D(26),'허기의 들숨',m);m.st='crown';m.cd=1}",
    "if(((p.x-m.x)/52)**2+((p.y-m.y)/36)**2<1)this.hurt(D(26),'허기의 들숨',m);if(!m.on)return;m.st='crown';m.cd=1}")
# 예고 판정에서 보스가 죽은 뒤 그 보스의 후속 동작(on)을 부르지 않는다
rep("if(q.dmg&&this.telIn(q,p.x,p.y)){this.hurt(q.dmg,q.src,q.m);if(q.hit)q.hit(q)}if(q.on)q.on(q);",
    "if(q.dmg&&this.telIn(q,p.x,p.y)){this.hurt(q.dmg,q.src,q.m);if(q.hit&&!(q.m&&!q.m.on))q.hit(q)}if(q.on&&!(q.m&&!q.m.on))try{q.on(q)}catch(e){vpErr(e,'tel.on')}")

# 다른 중간 보스·여제도 같은 자리
rep("this.hurt(D(10),'묶인 산호충',m)}}", "this.hurt(D(10),'묶인 산호충',m);if(!m.on)return}}")
rep("this.hurt(D(22),'가면의 들숨',m);m.st='idle'", "this.hurt(D(22),'가면의 들숨',m);if(!m.on)return;m.st='idle'")
rep("this.hurt(D(30),'관찰자의 응시',m);const f=", "this.hurt(D(30),'관찰자의 응시',m);if(!m.on)return;const f=")
rep("this.hurt(D(8),'관찰자의 광선',m)}", "this.hurt(D(8),'관찰자의 광선',m);if(!m.on)return}")
rep("this.hurt(dmg(8),'여제의 날개',m)}", "this.hurt(dmg(8),'여제의 날개',m);if(!m.on)return}")

# ---- 3) 포식 유기물: 공격하는 몬스터 처치 보상 더 올림 (v32 → v33a → v33) ----
rep("leapV:380,rest:2,e:10,o:7}", "leapV:380,rest:2,e:10,o:10}")          # 카직스 4 → 7 → 10
rep("up:2.4,v:85,e:14,o:7,m:4}", "up:2.4,v:85,e:14,o:10,m:4}")           # 렉사이 4 → 7 → 10
rep("orb:70,aggro:140,e:4,o:2}", "orb:70,aggro:140,e:4,o:3}")            # 보이드링 1 → 2 → 3
rep("cd:2.6,e:6,o:2,m:4}", "cd:2.6,e:6,o:3,m:4}")                        # 가시 산호충 0 → 2 → 3
rep("cd:1.9,e:5,o:3,m:0}", "cd:1.9,e:5,o:4,m:0}")                        # 빛 포자 2 → 3 → 4
rep("QN:{hp:150,dmg:8,e:40,o:16,m:10}", "QN:{hp:150,dmg:8,e:40,o:20,m:10}")
rep("WD:{hp:170,dmg:15,e:40,o:14,m:12}", "WD:{hp:170,dmg:15,e:40,o:18,m:12}")

# ---- 4) 이름 변경: 카직스 → 낫그늘 · 렉사이 → 땅울음 (내부 열쇠 kha/rek/E/R 는 그대로) ----
import re
s = s.replace('렉사이 땅굴', '땅울음 굴').replace('렉사이의 땅굴', '땅울음의 굴')
J = {'가':'이','는':'은','를':'을','와':'과','로':'으로','야':'이야','다':'이다'}
s = re.sub(r'렉사이([가는를와로야다])(?![가-힣])|렉사이([가는를와])', lambda m: '땅울음' + J[m.group(1) or m.group(2)], s)
s = re.sub(r'카직스([가는를와])', lambda m: '낫그늘' + {'가':'이','는':'은','를':'을','와':'과'}[m.group(1)], s)
s = s.replace('렉사이', '땅울음').replace('카직스', '낫그늘')

open(P, 'w', encoding='utf-8').write(s)
print('ok', P, len(s))
