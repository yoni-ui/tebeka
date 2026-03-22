import httpx

from app.config import settings


async def chat_completion(messages: list[dict[str, str]]) -> str:
    if not settings.groq_api_key:
        raise RuntimeError("GROQ_API_KEY is required for chat")
    async with httpx.AsyncClient(timeout=120.0) as client:
        r = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {settings.groq_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": settings.groq_model,
                "messages": messages,
                "temperature": 0.3,
            },
        )
        r.raise_for_status()
        data = r.json()
        return str(data["choices"][0]["message"]["content"] or "").strip()
