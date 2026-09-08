"""
Sanjivani LLM Studio — Unsloth 2x Faster Fine-Tuning Script
Fine-tunes Qwen2.5-Coder-7B-Instruct or Llama-3.1-8B-Instruct on single GPU with 70% less VRAM.
Runs cleanly on free Google Colab (T4/V100/A100) or campus workstations.
"""

import os
import torch
from datasets import load_dataset
from trl import SFTTrainer
from transformers import TrainingArguments

# Ensure Unsloth is imported before any Transformers modules
try:
    from unsloth import FastLanguageModel
    from unsloth.chat_templates import get_chat_template
except ImportError:
    print("[!] Unsloth is not installed. Install via: pip install \"unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git\"")
    exit(1)

# ── 1. Model Configuration ─────────────────────────────────────
MAX_SEQ_LENGTH = 2048
DTYPE = None  # None for auto-detection (Float16 for T4, Bfloat16 for Ampere+)
LOAD_IN_4BIT = True

# Target foundational base models
BASE_MODEL_NAME = "Qwen/Qwen2.5-Coder-7B-Instruct"  # Or "unsloth/Meta-Llama-3.1-8B-Instruct"

print(f"[*] Loading {BASE_MODEL_NAME} with Unsloth 4-bit quantization...")
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name=BASE_MODEL_NAME,
    max_seq_length=MAX_SEQ_LENGTH,
    dtype=DTYPE,
    load_in_4bit=LOAD_IN_4BIT,
)

# ── 2. Add LoRA Adapters (QLoRA) ───────────────────────────────
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=42,
    use_rslora=False,
    loftq_config=None,
)

# ── 3. Configure ChatML Chat Template ──────────────────────────
tokenizer = get_chat_template(
    tokenizer,
    chat_template="chatml",
    mapping={"role": "from", "content": "value", "user": "human", "assistant": "gpt"},
)

def formatting_prompts_func(examples):
    convs = examples["conversations"]
    texts = [tokenizer.apply_chat_template(convo, tokenize=False, add_generation_prompt=False) for convo in convs]
    return {"text": texts}

dataset_path = os.path.join(os.path.dirname(__file__), "sanjivani_reasoning_sft.jsonl")
if not os.path.exists(dataset_path):
    print(f"[*] Generating dataset using dataset_curator.py...")
    import dataset_curator
    dataset_curator.generate_dataset()

dataset = load_dataset("json", data_files=dataset_path, split="train")
dataset = dataset.map(formatting_prompts_func, batched=True)

# ── 4. Training Arguments ──────────────────────────────────────
training_args = TrainingArguments(
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    warmup_steps=5,
    max_steps=60,  # Adjust for full epochs (e.g. num_train_epochs=3)
    learning_rate=2e-4,
    fp16=not torch.cuda.is_bf16_supported(),
    bf16=torch.cuda.is_bf16_supported(),
    logging_steps=1,
    optim="adamw_8bit",
    weight_decay=0.01,
    lr_scheduler_type="linear",
    seed=42,
    output_dir="sanjivani_lora_checkpoints",
)

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=MAX_SEQ_LENGTH,
    dataset_num_proc=2,
    packing=False,
    args=training_args,
)

print("[*] Commencing Sanjivani LLM Fine-Tuning...")
trainer.train()

# ── 5. Save & Export Model ────────────────────────────────────
OUTPUT_MERGED_DIR = "sanjivani_coder_7b_merged"
print(f"[*] Saving 16-bit merged model to {OUTPUT_MERGED_DIR}...")
model.save_pretrained_merged(OUTPUT_MERGED_DIR, tokenizer, save_method="merged_16bit")

print("[*] Exporting GGUF for Ollama / vLLM serving (q4_k_m)...")
model.save_pretrained_gguf("sanjivani_coder_gguf", tokenizer, quantization_method="q4_k_m")
print("[OK] Sanjivani LLM Training Complete! Ready to serve via vLLM or Ollama.")
