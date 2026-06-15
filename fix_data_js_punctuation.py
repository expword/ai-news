"""规范化 data.js 里所有 "..." 字符串值的中英文标点。
只动文本内容，不动 JS 结构、URL、tag。"""
import re

p = "assets/data/data.js"
src = open(p, "r", encoding="utf-8").read()


def normalize(s: str) -> str:
    # 中文 + 英文/数字 加半角空格
    s = re.sub(r"([一-鿿])([A-Za-z0-9])", r"\1 \2", s)
    s = re.sub(r"([A-Za-z0-9])([一-鿿])", r"\1 \2", s)
    # 半角括号紧贴中文 → 全角
    s = re.sub(r"([一-鿿])\(", r"\1（", s)
    s = re.sub(r"\)([一-鿿])", r"）\1", s)
    s = re.sub(r"([一-鿿])\)", r"\1）", s)
    s = re.sub(r"\(([一-鿿])", r"（\1", s)
    # 中文标点前后空格清掉
    s = re.sub(r" ([，。！？；：、])", r"\1", s)
    s = re.sub(r"([，。！？；：、]) ", r"\1", s)
    # 数字 + 常见中文单位不留空格
    s = re.sub(r"(\d) (月|日|年|时|分|秒|岁|个|条|篇|次|倍|位|名|元|周)", r"\1\2", s)
    return s


# 匹配所有 "..." 字符串值（不含转义引号；不跨行；不动单引号）
# 排除：URL（含 http）、纯英文、长字符串里没有中文的
fixes = 0


def replace_string(m):
    global fixes
    inner = m.group(1)
    # 跳过 URL、纯 ASCII、太短的
    if "http" in inner or "://" in inner or not re.search(r"[一-鿿]", inner):
        return m.group(0)
    new = normalize(inner)
    if new != inner:
        fixes += 1
    return '"' + new + '"'


src2 = re.sub(r'"([^"\n]*?)"', replace_string, src)
open(p, "w", encoding="utf-8").write(src2)
print(f"规范化 {fixes} 处字符串")
