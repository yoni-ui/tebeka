from app.config import settings


def chunk_text(text: str) -> list[str]:
    """Split on whitespace into ~chunk_size word windows with overlap."""
    words = text.split()
    if not words:
        return []
    size = max(50, settings.chunk_size)
    overlap = max(0, min(settings.chunk_overlap, size // 2))
    step = size - overlap
    chunks: list[str] = []
    i = 0
    while i < len(words):
        piece = words[i : i + size]
        if piece:
            chunks.append(" ".join(piece))
        i += step
    return chunks
