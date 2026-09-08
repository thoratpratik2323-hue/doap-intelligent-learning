# 🏛️ Sanjivani LLM Studio
### *Build Sanjivani's Own Large Language Model — Fine-Tuning, Datasets & Serving Suite*

Created for the **"Build Sanjivani's Own Large Language Model"** initiative at **Sanjivani College of Engineering (SCOE) / Sanjivani University**.

---

## 📂 Suite Components

1. **`dataset_curator.py`**: Formats DOAP's 167+ LeetCode and HackerRank challenges into ChatML/ShareGPT training data with step-by-step `<think>` chain-of-thought traces.
2. **`train_unsloth_sanjivani.py`**: 2x faster, 70% less VRAM fine-tuning pipeline powered by **Unsloth** for Qwen2.5-Coder or Llama-3.1.
3. **`serve_vllm.sh`**: Production-grade high-throughput OpenAI-compatible API serving using **vLLM**.
4. **`Modelfile`**: 1-click **Ollama** local CPU/GPU serving configuration for student laptops.

---

## 🚀 Quickstart Guide

### 1. Generate Training Data
```bash
python dataset_curator.py
```
Generates `sanjivani_reasoning_sft.jsonl` containing curated problem statements, Socratic intuition, optimal Big-O complexity, and multi-language solutions.

### 2. Fine-Tune Model (Google Colab or Local GPU)
Install Unsloth:
```bash
pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
pip install --no-deps trl peft accelerate bitsandbytes
```

Run training:
```bash
python train_unsloth_sanjivani.py
```
Automatically exports:
- `sanjivani_coder_7b_merged/`: Full 16-bit merged model
- `sanjivani_coder_gguf/`: 4-bit quantized GGUF file

### 3. Run Locally in Ollama
```bash
ollama create sanjivani-coder -f Modelfile
ollama run sanjivani-coder
```

### 4. Serve on Campus Server with vLLM
```bash
chmod +x serve_vllm.sh
./serve_vllm.sh
```
Then in DOAP, navigate to **Settings > Open-Source AI & Runtimes** and point your LLM endpoint to `http://<campus-ip>:8000/v1`!
