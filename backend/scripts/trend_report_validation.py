from collections import Counter
from dataclasses import dataclass
import hashlib
import json
import re
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
REQUIRED_REPORT_FIELDS = ("title", "primary_topic", "tldr", "blog_body", "tags")


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


def validate_report(
    report: Mapping[str, object],
    sources: Sequence[Mapping[str, object]],
) -> ValidationResult:
    reasons: list[str] = []

    for field in REQUIRED_REPORT_FIELDS:
        value = report.get(field)
        if value is None or value == "" or value == []:
            reasons.append(f"missing_{field}")

    for field in ("title", "primary_topic", "tldr"):
        value = report.get(field)
        if value is not None and not isinstance(value, str):
            reasons.append(f"invalid_{field}")

    body = report.get("blog_body", "")
    if not isinstance(body, str) or len(body.strip()) < 600:
        reasons.append("short_blog_body")

    body_text = body if isinstance(body, str) else ""
    korean_count = len(re.findall(r"[가-힣]", body_text))
    letter_count = len(re.findall(r"[A-Za-z가-힣]", body_text))
    if letter_count == 0 or korean_count / letter_count < 0.25:
        reasons.append("insufficient_korean")

    tags = report.get("tags")
    if (
        not isinstance(tags, list)
        or not tags
        or not all(isinstance(tag, str) and tag.strip() for tag in tags)
    ):
        reasons.append("invalid_tags")

    if not sources:
        reasons.append("missing_sources")

    unique_reasons = tuple(dict.fromkeys(reasons))
    return ValidationResult(not unique_reasons, unique_reasons)


def _normalize_title(value: object) -> str:
    return " ".join(str(value or "").casefold().split())


def report_fingerprint(
    report: Mapping[str, object],
    sources: Sequence[Mapping[str, object]],
) -> tuple[str, str]:
    normalized_title = _normalize_title(report.get("title"))
    normalized_sources = sorted(
        normalize_url(str(source.get("link") or source.get("url") or ""))
        for source in sources
    )
    title_hash = hashlib.sha256(normalized_title.encode("utf-8")).hexdigest()
    sources_hash = hashlib.sha256(
        json.dumps(normalized_sources, ensure_ascii=False).encode("utf-8")
    ).hexdigest()
    return title_hash, sources_hash


def is_duplicate_report(
    report: Mapping[str, object],
    sources: Sequence[Mapping[str, object]],
    seen_titles: set[str],
    seen_sources: set[str],
) -> bool:
    title_hash, sources_hash = report_fingerprint(report, sources)
    duplicate = title_hash in seen_titles or sources_hash in seen_sources
    seen_titles.add(title_hash)
    seen_sources.add(sources_hash)
    return duplicate
