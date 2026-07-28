import fitz

doc = fitz.open(r"/e/index.html的资料库/广西箩筐信息科技有限公司3折页最终版.pdf")
for i, page in enumerate(doc):
    print(f"--- Page {i+1} ---")
    text = page.get_text()
    print(text)
    print()
