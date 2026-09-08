#!/bin/bash
# ---------------------------------------------------------------
# Sanjivani LLM Studio — High-Throughput vLLM Server Launch Script
# Serves Sanjivani-Coder-7B with an OpenAI-compatible /v1 endpoint.
# ---------------------------------------------------------------

MODEL_DIR="./sanjivani_coder_7b_merged"
PORT=8000
HOST="0.0.0.0"

echo "[*] Launching Sanjivani LLM with vLLM on http://$HOST:$PORT ..."
python3 -m vllm.entrypoints.openai.api_server \
    --model $MODEL_DIR \
    --served-model-name "sanjivani-coder-7b" \
    --host $HOST \
    --port $PORT \
    --tensor-parallel-size 1 \
    --gpu-memory-utilization 0.90 \
    --max-model-len 4096 \
    --trust-remote-code
