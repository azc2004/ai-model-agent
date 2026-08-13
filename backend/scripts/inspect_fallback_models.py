import sys, os, re, json

with open('../frontend/src/data/fallbackModels.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# match every object in array
ids = re.findall(r'"id":\s*"([^"]+)"', text)
print(f"Total 'id' occurrences in fallbackModels.ts: {len(ids)}")
unique_ids = set(ids)
print(f"Unique IDs count: {len(unique_ids)}")
print(f"Duplicates: {len(ids) - len(unique_ids)}")

# Check provider distribution
providers = re.findall(r'"provider_id":\s*"([^"]+)"', text)
from collections import Counter
print("Provider distribution:")
for p, c in Counter(providers).most_common(10):
    print(f"  - {p}: {c}")

# Check if there are open weights vs proprietary
is_open = re.findall(r'"is_open_weight":\s*(true|false)', text)
print("Open weight distribution:")
print(f"  - Open: {is_open.count('true')}")
print(f"  - Proprietary: {is_open.count('false')}")
