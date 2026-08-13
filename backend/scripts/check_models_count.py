import sys, os, re
sys.path.append(os.path.abspath('.'))

with open('../frontend/src/data/fallbackModels.ts', 'r', encoding='utf-8') as f:
    text = f.read()

count = text.count('"id":')
print(f"Total fallback models in fallbackModels.ts by id count: {count}")
