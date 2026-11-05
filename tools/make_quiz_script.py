import json

# Full generation script for frontend/src/data/quizData.ts
# We will generate all 16 experiments x 10 MCQs = 160 MCQs + 30 final exam questions
with open('tools/generate_all_quizzes.py', 'w', encoding='utf-8') as f:
    f.write('''# Auto-generates frontend/src/data/quizData.ts
import json

# Let's inspect
print("Ready to generate full quiz data")
''')

