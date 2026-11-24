from PIL import Image
raw = Image.open("build/raw.png").convert("RGB")
if raw.size != (1024, 1024):
    raise SystemExit(f"bad size {raw.size}")
q = raw.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
q.save("entry.png", optimize=True)
size = __import__("os").path.getsize("entry.png")
print(f"palette {size} bytes")
if size < 150_000 or size > 260_000:
    raw.save("entry.png", optimize=True, compress_level=9)
    size = __import__("os").path.getsize("entry.png")
    print(f"24-bit {size} bytes")
if not (150_000 <= size <= 260_000):
    raise SystemExit(f"size {size} outside 150-260 KB")
raw.resize((300, 300), Image.Resampling.LANCZOS).save("build/at300.png")
