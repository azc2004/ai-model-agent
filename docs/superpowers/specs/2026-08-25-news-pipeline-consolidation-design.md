# News Pipeline Consolidation Design

## Goal

Make the GitHub Actions Python batch the only production path that generates and writes synthesized AI trend reports, while keeping the Cloudflare Worker read-only for news data.

## Scope

This phase covers only news-generation consolidation and its minimum safety and quality controls. Worker-wide authentication, general API tests, broader CI modernization, documentation overhaul, database pagination, frontend decomposition, and bundle optimization remain later phases.

## Architecture Decision

`backend/scripts/generate_trend_reports.py` is the canonical production generator. `.github/workflows/news_batch.yml` invokes it on schedule or manually. The script collects feeds, filters and clusters articles, requests structured reports from the configured LLM gateway, validates each report, and writes only accepted reports to Cloudflare D1.

The uncommitted Worker route `POST /api/v1/news/pulse/batch` is removed. `src/worker.ts` continues to provide news list/detail reads and static asset serving, but it does not collect RSS feeds, call an LLM for news generation, or write generated news.

The untracked root copy `scripts/generate_trend_reports.py` is treated as an accidental duplicate and is not part of the production design. The tracked backend script remains canonical.

## Secret Handling

No API credential may appear in source code. `backend/scripts/generate_trend_reports.py` reads `LITELLM_API_KEY` from the environment and may read `LITELLM_URL` and `LITELLM_MODEL` with non-secret defaults where appropriate. Missing required credentials cause a clear startup failure before network or database work.

The currently exposed LLM credential must be revoked and replaced outside the repository. GitHub Actions receives the replacement through `${{ secrets.LITELLM_API_KEY }}`. Repository history cleanup is a separate, explicitly authorized operation because rewriting history is destructive; rotation is mandatory regardless of history cleanup.

## Components

### Validation module

Create `backend/scripts/trend_report_validation.py` as a dependency-free module containing deterministic validation functions and typed result data. It validates:

- required report fields: `title`, `primary_topic`, `tldr`, `blog_body`, and `tags`;
- minimum useful Korean content and rejection of conspicuous non-Korean leakage;
- minimum body length and non-empty actionable content;
- tags as a non-empty string list;
- HTTP/HTTPS source URLs with hostnames;
- AI relevance using explicit model, agent, inference, research, GPU, cloud-AI, and provider terms;
- duplicate source URLs inside a cluster;
- duplicate reports within the current run using normalized titles and source URL fingerprints.

Validation returns stable machine-readable reason codes so tests, logs, and future metrics use the same vocabulary.

### Batch orchestrator

Refactor `backend/scripts/generate_trend_reports.py` without changing its operational entry point. Network functions remain injectable or separable enough that orchestration behavior can be tested without RSS, LLM, D1, or subprocess access.

The orchestrator performs these stages:

1. Validate configuration.
2. Fetch feeds independently; one failed feed does not abort the run.
3. Normalize and pre-filter invalid, duplicate, and irrelevant source articles.
4. Build clusters only from accepted articles.
5. Generate one report per cluster.
6. Validate the LLM report together with its sources.
7. Write accepted reports to D1.
8. Print a summary containing collected, rejected, generated, saved, and failed counts plus rejection reason counts.

### D1 writer

The initial phase preserves the current Wrangler-based D1 execution to avoid introducing another deployment interface. SQL creation is isolated and tested for correct quote escaping. A D1 write failure rejects only that report and is included in the final failed count.

The schema is not expanded in this phase. Values not represented by `trend_news`, such as `primary_topic` and `impact_score`, are not silently presented as persisted data.

## Data Quality Rules

A source article is accepted only when it has a non-empty title, a valid HTTP/HTTPS URL, and positive AI relevance. Duplicate URLs are reduced to one source before clustering.

A generated report is accepted only when all required fields have correct types, the body is sufficiently substantive, Korean text is present at a useful ratio, tags are usable, and at least one validated source remains. Exact normalized title duplicates or identical source fingerprints within the same run are rejected.

Validation is intentionally deterministic. The quality gate does not make another LLM request.

## Error Handling

- Missing `LITELLM_API_KEY`: fail fast with non-zero exit status.
- RSS timeout or malformed feed: log the feed failure and continue.
- Empty collection or no valid clusters: terminate without D1 writes and return non-zero so scheduled runs are visibly unhealthy.
- Invalid LLM JSON or schema: reject that cluster and continue.
- Quality validation failure: log stable reason codes and continue.
- D1 command failure: log a redacted diagnostic, count the write as failed, and continue.
- Zero successfully saved reports: return non-zero after printing the complete summary.

Logs must never contain authorization headers, API keys, or complete secret-bearing exception payloads.

## Testing

Use Python's built-in `unittest` so the tests run with the repository's declared dependencies and do not require adding pytest in this phase.

Unit tests cover:

- valid report acceptance;
- missing and mistyped fields;
- invalid and duplicate source URLs;
- clearly irrelevant articles;
- insufficient Korean or empty/short body content;
- normalized duplicate report detection;
- SQL quote escaping;
- partial feed, LLM, and D1 failures;
- missing secret fail-fast behavior;
- final non-zero status when nothing is saved.

The GitHub Actions workflow runs these tests before invoking the production batch. The batch itself remains manually triggerable and scheduled.

## Migration and Rollout

1. Revoke the exposed credential and create a new GitHub Actions secret.
2. Add failing validation and orchestration tests.
3. Implement the validation module and refactor the Python batch until tests pass.
4. Update the workflow to provide the secret and run tests.
5. Remove the uncommitted Worker batch route and duplicated secret declarations used only by that route.
6. Remove the accidental root duplicate script after confirming it has no unique changes.
7. Run frontend build/lint and backend tests, then perform a dry run that does not write D1.
8. Run one explicitly authorized manual production batch and inspect its summary before relying on the schedule.

Production D1 writes and credential rotation occur outside local implementation verification and require the corresponding external access or user action.

## Success Criteria

- There is exactly one production news-generation implementation.
- No LLM credential exists in tracked or newly added source files.
- The scheduled workflow supplies credentials through GitHub Secrets and gates execution on tests.
- Invalid, irrelevant, duplicate, or malformed content cannot reach D1 through the canonical batch.
- Individual external failures do not conceal the run outcome.
- A run that saves no reports exits non-zero.
- Deterministic tests cover validation and orchestration without external network or D1 access.
