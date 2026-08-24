from collections import Counter
from dataclasses import dataclass
from typing import Mapping, Sequence
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit


AI_TERMS = (
    "ai",
    "llm",
    "model",
    "agent",
    "inference",
    "gpu",
    "benchmark",
    "openai",
    "anthropic",
    "gemini",
    "인공지능",
    "모델",
    "에이전트",
    "추론",
)


@dataclass(frozen=True)
class ValidationResult:
    valid: bool
    reasons: tuple[str, ...] = ()


def normalize_url(value: str) -> str:
    parts = urlsplit(value.strip())
    kept_query = sorted(
        (key, val)
        for key, val in parse_qsl(parts.query, keep_blank_values=True)
        if not key.lower().startswith("utm_")
    )
    normalized_path = parts.path.rstrip("/") or "/"
    return urlunsplit(
        (
            parts.scheme.lower(),
            parts.netloc.lower(),
            normalized_path,
            urlencode(kept_query),
            "",
        )
    )


def validate_source(article: Mapping[str, object]) -> ValidationResult:
    title = str(article.get("title", "")).strip()
    summary = str(article.get("summary", "")).strip()
    link = str(article.get("link", "")).strip()
    parts = urlsplit(link)
    reasons: list[str] = []

    if not title:
        reasons.append("missing_source_title")
    if parts.scheme.lower() not in {"http", "https"} or not parts.hostname:
        reasons.append("invalid_source_url")
    if not any(term in f"{title} {summary}".lower() for term in AI_TERMS):
        reasons.append("irrelevant_source")

    return ValidationResult(not reasons, tuple(reasons))


def deduplicate_sources(
    articles: Sequence[Mapping[str, object]],
) -> tuple[list[dict[str, object]], Counter[str]]:
    accepted: list[dict[str, object]] = []
    reasons: Counter[str] = Counter()
    seen_urls: set[str] = set()

    for article in articles:
        result = validate_source(article)
        if not result.valid:
            reasons.update(result.reasons)
            continue

        normalized_url = normalize_url(str(article["link"]))
        if normalized_url in seen_urls:
            reasons["duplicate_source"] += 1
            continue

        seen_urls.add(normalized_url)
        accepted.append(dict(article))

    return accepted, reasons
