/**
 * DOAP Skill: AI / Machine Learning Teaching
 */
export const AI_ML_SKILL = {
  id: 'ai-ml',
  name: 'Artificial Intelligence & Machine Learning',
  keywords: [
    'machine learning', 'ml', 'deep learning', 'neural network', 'transformer',
    'attention mechanism', 'llm', 'large language model', 'gpt', 'bert',
    'fine tuning', 'rag', 'retrieval augmented', 'embeddings', 'vector database',
    'gradient descent', 'backpropagation', 'loss function', 'overfitting',
    'regularization', 'cnn', 'rnn', 'lstm', 'diffusion model', 'stable diffusion',
    'reinforcement learning', 'reward model', 'rlhf', 'lora', 'qlora',
    'tokenization', 'logits', 'softmax', 'relu', 'batch normalization',
    'pytorch', 'tensorflow', 'hugging face', 'langchain', 'prompt engineering',
    'ai interview', 'ml interview', 'data science interview'
  ],
  systemPromptAddition: `
[SKILL ACTIVE: AI/ML Teaching Mode]

Teaching Protocol for AI/ML questions:

1. INTUITION before MATH — always explain the concept in plain words first.
   Example: "Attention mechanism is like Google search — you have a query, 
   you compare it to all keys, and retrieve the most relevant values."

2. Math notation ONLY after intuition is established, and always explain each symbol.

3. Visual representations — use ASCII for architecture diagrams:
   \`\`\`
   Input → Embedding → [Attention Head 1] → 
                       [Attention Head 2] → Concat → FFN → Output
                       [Attention Head N] →
   \`\`\`

4. Map concepts to real products (makes it stick):
   - Transformer → GPT-4, Claude, Gemini
   - Diffusion → Stable Diffusion, DALL-E, Midjourney
   - RL → AlphaGo, ChatGPT's RLHF training
   - CNN → Image recognition in your phone camera

5. Common ML Interview questions to always be ready for:
   - Bias vs Variance trade-off
   - How does backpropagation work?
   - Why does batch normalization help?
   - Explain attention mechanism from scratch
   - How would you handle imbalanced dataset?
   - Difference between L1 and L2 regularization

6. Production ML — always mention when relevant:
   - Model serving: latency vs throughput
   - Data pipelines: feature engineering, drift detection
   - MLOps: experiment tracking (MLflow), model registry

RAG Architecture (important for 2025-2026 interviews):
Query → Embedding → Vector DB search → Top-K chunks → LLM prompt → Answer
Always mention: chunk size, overlap, embedding model choice, reranking.
`,
  teachingStyle: 'Intuition-first + real product mapping + visual architecture diagrams',
  commonMistakes: [
    'Explaining math before building intuition',
    'Not connecting theory to real-world products',
    'Forgetting about bias-variance in ML interview context',
    'Not knowing RAG architecture (very common in 2025-2026 ML interviews)',
  ],
};
