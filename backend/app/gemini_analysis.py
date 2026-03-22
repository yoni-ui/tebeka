import json
import re

import google.generativeai as genai

from app.config import settings
from app.embeddings import configure_genai


def analyze_contract_text(full_text: str) -> dict:
    configure_genai()
    if not settings.gemini_api_key:
        raise RuntimeError("GEMINI_API_KEY is required for analysis")

    from app.prompts import LEGAL_SYSTEM_ANALYSIS

    model = genai.GenerativeModel(
        settings.gemini_chat_model,
        system_instruction=LEGAL_SYSTEM_ANALYSIS,
    )
    prompt = (
        "Analyze the following document. Respond with JSON only.\n\n---\n"
        + full_text[:100_000]
        + "\n---"
    )
    resp = model.generate_content(prompt)
    raw = (resp.text or "").strip()
    # Strip accidental markdown fences
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {
            "summary": raw[:2000],
            "risks": [{"level": "warning", "title": "Parse note", "detail": "Model returned non-JSON; see summary."}],
            "clauses": [],
            "simplified_version": "",
        }
