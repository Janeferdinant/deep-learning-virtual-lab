import json

# Define the full set of 160 questions
# We already have questions for Exp 1-4, let's include all 16 experiments (10 questions each)

all_quizzes = []

# Exp 1 to 4 questions
with open('frontend/src/data/quizData.ts', 'r', encoding='utf-8') as f:
    existing_content = f.read()

# Let's extract the questions already in quizData.ts (Exp 1-4) or write a clean complete list of 160 questions
print("Generating complete 160-question quiz data...")

