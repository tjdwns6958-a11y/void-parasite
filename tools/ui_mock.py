from PIL import Image, ImageDraw, ImageFont, ImageFilter
import glob
FB = [f for f in glob.glob('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc')][0]
FR = (glob.glob('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc') or [FB])[0]
def font(sz, b=True): return ImageFont.truetype(FB if b else FR, sz, index=1)  # index 1 = KR
S = 2  # 화면 2배 캡처
clean = Image.open('ui_clean.png').convert('RGBA')
W, H = clean.size
PURPLE = (166, 92, 255)

def layer(): return Image.new('RGBA', (W, H), (0, 0, 0, 0))
def circ(d, x, y, r, fill=None, outline=None, w=2):
    d.ellipse([(x - r) * S, (y - r) * S, (x + r) * S, (y + r) * S], fill=fill, outline=outline, width=w * S)
def finger(d, x, y):
    # 손가락 터치 표시 (반투명 흰 원 + 점선 고리)
    circ(d, x, y, 13, fill=(255, 255, 255, 70), outline=(255, 255, 255, 150), w=1)
def note(d, x, y, t, sz=11, col=(255, 233, 168, 255), anchor='la'):
    f = font(sz * S)
    d.text((x * S, y * S), t, font=f, fill=col, anchor=anchor, stroke_width=3, stroke_fill=(12, 8, 22, 255))

# ---- U1 떠다니는 조이스틱 ----
def u1():
    im = clean.copy(); L = layer(); d = ImageDraw.Draw(L)
    # 처음 누른 자리(170,250)에 작게 생김 — 손을 떼면 사라짐
    cx, cy = 175, 248
    circ(d, cx, cy, 40, fill=(36, 28, 56, 70), outline=(160, 140, 220, 120), w=1)
    circ(d, cx + 22, cy - 10, 15, fill=PURPLE + (150,))
    finger(d, cx + 22, cy - 10)
    # 섭취 버튼: 작고 반투명, 더 구석으로
    circ(d, 752, 314, 30, fill=PURPLE + (85,), outline=(201, 139, 255, 140), w=1)
    d.text((752 * S, 314 * S), '섭취', font=font(10 * S), fill=(255, 255, 255, 170), anchor='mm')
    im = Image.alpha_composite(im, L); d = ImageDraw.Draw(im)
    note(d, cx - 52, cy + 48, '왼쪽 아무 데나 누르면 그 자리에 생김', 10)
    note(d, cx - 52, cy + 62, '손을 떼면 사라짐 · 크기 ×0.75 · 반투명', 10)
    note(d, 790, 274, '작게 · 반투명', 10, anchor='ra')
    return im

# ---- U2 레터박스 (경기장 축소 + 양옆 조작 칸) ----
def u2():
    k = 0.78
    aw, ah = int(W * k), int(H * k)
    arena = clean.resize((aw, ah), Image.NEAREST)
    im = Image.new('RGBA', (W, H), (14, 10, 24, 255))
    ox, oy = (W - aw) // 2, (H - ah) // 2
    im.alpha_composite(arena, (ox, oy))
    d = ImageDraw.Draw(im)
    d.rectangle([ox - 2, oy - 2, ox + aw + 1, oy + ah + 1], outline=(107, 90, 150, 255), width=2)
    # 왼쪽 여백: 조이스틱 / 오른쪽 여백: 섭취·탈피
    lx = (ox / S) / 2; rx = 800 - lx
    circ(d, lx, 262, 36, fill=(36, 28, 56, 200), outline=(107, 90, 150, 255), w=2)
    circ(d, lx + 8, 256, 15, fill=PURPLE + (255,))
    circ(d, rx, 270, 32, fill=PURPLE + (255,))
    d.text((rx * S, 270 * S), '섭취', font=font(11 * S), fill=(18, 9, 31, 255), anchor='mm')
    circ(d, rx, 196, 18, fill=(58, 47, 87, 255), outline=(107, 90, 150, 255), w=1)
    d.text((rx * S, 196 * S), '탈피', font=font(8 * S), fill=(169, 159, 194, 255), anchor='mm')
    note(d, 400, oy / S + ah / S + 4, '경기장 ×0.78 — 조작 버튼이 경기장을 전혀 가리지 않음 (대신 화면이 조금 작아짐)', 10, anchor='ma')
    return im

# ---- U3 보이지 않는 조작 ----
def u3():
    im = clean.copy(); L = layer(); d = ImageDraw.Draw(L)
    px, py = 120, 262
    # 왼쪽 절반 아무 데나 끌면 이동 — 손가락 위치엔 아무것도 안 그림, 벌레 둘레에 방향 고리만
    fx, fy = 300, 250
    finger(d, fx, fy)
    d.line([(fx - 40) * S, (fy + 10) * S, fx * S, fy * S], fill=(255, 255, 255, 60), width=2 * S)
    circ(d, px, py, 26, outline=(201, 139, 255, 90), w=1)
    # 방향 화살 (오른쪽 위)
    import math
    a = math.atan2(-10, 40); ax, ay = px + math.cos(a) * 26, py + math.sin(a) * 26
    tip = (ax + math.cos(a) * 8, ay + math.sin(a) * 8)
    l = (ax + math.cos(a + 2.4) * 7, ay + math.sin(a + 2.4) * 7); r = (ax + math.cos(a - 2.4) * 7, ay + math.sin(a - 2.4) * 7)
    d.polygon([(tip[0] * S, tip[1] * S), (l[0] * S, l[1] * S), (r[0] * S, r[1] * S)], fill=(201, 139, 255, 220))
    # 오른쪽 가장자리 얇은 물기 탭
    d.rounded_rectangle([780 * S, 200 * S, 796 * S, 340 * S], radius=6 * S, fill=PURPLE + (110,), outline=(201, 139, 255, 170), width=S)
    im = Image.alpha_composite(im, L); d = ImageDraw.Draw(im)
    for i, ch in enumerate('섭취'):
        d.text((788 * S, (258 + i * 16) * S), ch, font=font(10 * S), fill=(255, 255, 255, 220), anchor='mm')
    note(d, fx - 60, fy + 20, '왼쪽 절반 어디든 끌면 이동 (조이스틱 그림 없음)', 10)
    note(d, px - 30, py + 30, '방향은 벌레 둘레 화살로', 10)
    note(d, 772, 186, '오른쪽 끝 얇은 탭 = 섭취/물기', 10, anchor='ra')
    note(d, 772, 200, '(오른쪽 절반 아무 데나 톡 = 물기)', 9, col=(200, 190, 230, 255), anchor='ra')
    return im

def panel(im, title, sub):
    hh = 64 * S // 2
    out = Image.new('RGBA', (W, H + hh), (18, 14, 26, 255))
    out.alpha_composite(im, (0, hh))
    d = ImageDraw.Draw(out)
    d.text((14 * S, 8 * S // 2 + 2), title, font=font(15 * S), fill=(255, 233, 168, 255))
    d.text((W - 14 * S, 12 * S // 2 + 4), sub, font=font(10 * S, False), fill=(200, 190, 230, 255), anchor='ra')
    return out

now = Image.open('ui_now.png').convert('RGBA')
P = [panel(now, '지금 (v33)', '조이스틱 원(반지름 55)이 왼쪽 아래를 덮음'),
     panel(u1(), 'U1  떠다니는 조이스틱', '누른 자리에만 잠깐 · 손 떼면 사라짐 · 바꾸는 양 적음'),
     panel(u2(), 'U2  레터박스', '경기장을 줄이고 양옆 빈칸에 버튼 · 가림 0 · 큰 수정'),
     panel(u3(), 'U3  보이지 않는 조작', '조작 그림을 거의 없앰 · 가장 넓게 보임 · 익숙해지는 시간 필요')]
gap = 10 * S
tot = Image.new('RGBA', (W, sum(p.size[1] for p in P) + gap * (len(P) - 1)), (8, 6, 14, 255))
y = 0
for p in P:
    tot.alpha_composite(p, (0, y)); y += p.size[1] + gap
tot = tot.convert('RGB').resize((W * 3 // 4, tot.size[1] * 3 // 4), Image.LANCZOS)
tot.save('/home/claude/void-parasite/docs/ui_options_v34.png', optimize=True)
print(tot.size)
