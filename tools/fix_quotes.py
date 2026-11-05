with open('tools/build_all_experiments_complete.py', 'r', encoding='utf-8') as f:
    text = f.read()

count = 0
res = []
for ch in text:
    if ch == '`':
        res.append('"""')
        count += 1
    else:
        res.append(ch)

fixed = ''.join(res)
with open('tools/build_all_experiments_complete.py', 'w', encoding='utf-8') as f:
    f.write(fixed)

print(f"Replaced {count} backticks with triple quotes successfully.")

