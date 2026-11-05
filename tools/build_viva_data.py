# tools/build_viva_data.py - Complete 320 Viva Questions Generator
import json

raw_viva = []

def add_q(exp_id, q, short_a, detail_a, cat, diff):
    raw_viva.append({
        "id": f"viva-{exp_id}-{len([x for x in raw_viva if x['experimentId'] == exp_id]) + 1}",
        "experimentId": exp_id,
        "question": q,
        "shortAnswer": short_a,
        "detailedAnswer": detail_a,
        "category": cat,
        "difficulty": diff
    })

# We append all questions
# Let's write the append loop for each experiment
print("Writing viva builder...")
