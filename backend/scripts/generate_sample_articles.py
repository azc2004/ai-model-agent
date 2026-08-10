import sys
import os
from datetime import datetime, timezone
import uuid

# PYTHONPATH 설정
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal
from app.db_models import NewsArticleDB

SAMPLE_1_BLOG = """# 📌 [Deep-Dive Visual Report] Anthropic 자율 멀티에이전트 Computer Use 및 Agentic Tooling 2.0 파이프라인

> **주요 출처**: Anthropic AI Engineering | **카테고리**: 빅테크 공식 | **검증**: ✅ Multi-Source Cross-Validated | **특집**: 🎨 시각화 다이어그램 포함

---

### 1. 💡 핵심 요약 및 개요 (Executive Summary)
Anthropic이 차세대 AI 자율 에이전트 구축을 위한 **Computer Use 및 Agentic Tooling 2.0 파이프라인**을 공식 발표했습니다. 본 기술 발표는 단순 텍스트/코드 생성을 넘어 에이전트가 직접 브라우저 GUI, 마우스 클릭, 키보드 타이핑, API 오케스트레이션을 스스로 판단하여 수행하는 **엔드투엔드 워크플로우 자동화 아키텍처**를 다룹니다.

```mermaid
flowchart TD
    A[👤 사용자 업무 요청\nUser Goal / Prompt] --> B[🧠 Planner Agent\nTask Breakdown & Reasoning]
    B --> C{🛡️ 보안 검증 가드레일\nHuman-in-the-loop Guardrail}
    C -- ❌ 미승인 / 고위험 --> D[🛑 인간 승인 요청\nUser Approval Gate]
    D -- 승인 완료 --> E[🤖 GUI Worker Agent\nComputer Use & Tool Execution]
    C -- ✅ 자동 승인 --> E
    E --> F[💻 브라우저 / Desktop GUI\nMouse Click & Type Execution]
    F --> G[👁️ Vision Evaluator\nScreen Capture & State Feedback]
    G -- 과업 미완수 --> B
    G -- ✅ 성공 완수 --> H[🎉 최종 업무 완료 리포트 리턴]
```

---

### 2. 🔍 기존 방식 대비 Agentic Computer Use 2.0 비교분석

| 비교 항목 | 기존 수동 조작 (Manual Work) | 전통적 REST API 연동 | Anthropic Computer Use 2.0 |
| :--- | :--- | :--- | :--- |
| **작동 방식** | 사람이 직접 웹사이트 접속 및 클릭 | 전용 백엔드 API 개발 및 유지보수 | 에이전트가 화면 비전 인식 후 자율 조작 |
| **시스템 유연성** | 매우 높음 (사람 판단) | 매우 낮음 (API 개편 시 파손) | 높음 (GUI 변경 시 에이전트 자율 적응) |
| **도입 속도** | 즉시 (인적 자원 소비) | 개발 기간 2~4주 소요 | 1일 이내 프롬프트/가드레일 설정 후 즉시 가동 |
| **보안 통제** | 사내 보안 지침 사람 준수 | IAM Key 권한 관리 | Human-in-the-loop 및 실시간 세션 격리 |

---

### 3. 📊 복잡 업무 완수율 및 벤치마크 성과 (OSWorld & SWE-Bench)

[CHART:bar|OSWorld Task Completion Rate|Legacy Agent:18%|Claude 3.5 Sonnet:38%|Claude 3.7 Sonnet (Thinking):64%|Human Baseline:72%]

* **OSWorld 웹 GUI 복잡 업무**: 기존 18% 수준에서 **64%**로 3.5배 대폭 상승
* **SWE-Bench Verified 코딩 파이프라인**: 70.3% 달성으로 SOTA 기록 수립

---

### 4. 🎯 실무 적용 핵심 체크리스트 (Actionable Checklist)

#### 🚀 컴퓨터 조작 에이전트 이식 및 보안 통제
* **Computer Use SDK 도입**: Anthropic 공식 SDK를 백엔드 워크플로우에 이식하여 GUI 조작 자동화 구축.
* **Human-in-the-loop 승인 가드레일**: 금융 결제, 민감 데이터 변경 시 사용자 모달 승인 가드레일 필수 적용.
* **비전 캡처 토큰 최적화**: 화면 캡처 토큰 소비 절감을 위해 델타 프레임(Delta Frame) 변경 감지 적용.
* **IAM 세션 격리**: 에이전트 전용 격리 브라우저 인스턴스를 부여하여 사내 보안 유출 차단.
"""

SAMPLE_2_BLOG = """# 📌 [Deep-Dive Visual Report] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 및 벤치마크 리포트

> **주요 출처**: DeepSeek AI Lab | **카테고리**: 최신 논문 & 학계 | **검증**: ✅ Multi-Source Cross-Validated | **특집**: 🎨 시각화 다이어그램 포함

---

### 1. 💡 핵심 요약 및 개요 (Executive Summary)
DeepSeek 팀이 오픈소스로 공개한 **DeepSeek R1 및 V3** 모델은 총 671B 파라미터 중 파스당 37B만 활성화하는 **DeepSeekMoE 아키텍처**와 감독 학습(SFT) 없이 오직 강화학습(RL)만으로 복잡 추론 능력을 스스로 학습(Self-Evolution)시킨 혁신적인 모델입니다.

```mermaid
flowchart LR
    subgraph Input_Stage ["1. 입력 처리 단계"]
        Prompt[입력 프롬프트] --> MLA[Multi-Head Latent Attention\n(압축 토큰 메모리 보존)]
    end

    subgraph MoE_Routing ["2. DeepSeekMoE 라우팅"]
        MLA --> Router{Dynamic Router\n(Top-8 Expert Selector)}
        Router --> E1[Shared Expert 1]
        Router --> E2[Routed Expert 12]
        Router --> E3[Routed Expert 48]
    end

    subgraph RL_Reasoning ["3. Chain-of-Thought RL 추론"]
        E1 & E2 & E3 --> CoT[Self-Correction & Reflection\n(아하 순간 CoT 생성)]
        CoT --> Rewards{GRPO Reward Engine\n(수학/코드 정확도 검증)}
    end

    Rewards --> Output[최종 정밀 추론 답변]
```

---

### 2. 🔍 주요 프론티어 추론 모델 성능 벤치마크 비교

| 벤치마크 평가 항목 | DeepSeek R1 (671B MoE) | OpenAI o1 (Latest) | Claude 3.7 Sonnet (Thinking) | GPT-4o |
| :--- | :--- | :--- | :--- | :--- |
| **AIME 2024 (수학 올림피아드)** | **79.8%** | 79.2% | 78.5% | 36.4% |
| **MATH 500 (고난도 고등 수학)** | **97.3%** | 96.4% | 96.2% | 76.6% |
| **Codeforces (알고리즘 코딩)** | **Percentile 96.3** | Percentile 93.0 | Percentile 94.0 | Percentile 62.0 |
| **SWE-Bench Verified (실무 코딩)** | **49.2%** | 48.9% | **70.3%** | 38.8% |
| **추론 API 가격 (1M Input/Output)** | **$0.55 / $2.19** | $15.00 / $60.00 | $3.00 / $15.00 | $2.50 / $10.00 |

---

### 3. 📊 API 비용 및 TCO 절감 효과 (1M 토큰당 비용 비교)

[CHART:bar|API Input Price per 1M Tokens ($)|DeepSeek R1:0.55|Claude 3.7 Sonnet:3.00|OpenAI o1:15.00|GPT-4o:2.50]

* **OpenAI o1 대비 추론 비용 96% 절감**: 동일 성능 수준에서 **1/27 이하의 압도적 가성비** 제공.
* **On-Premise 셀프 호스팅**: 8x H800 GPU 노드만으로 FP8 양자화 서빙 가능.

---

### 4. 🎯 실무 적용 핵심 체크리스트 (Actionable Checklist)

#### 🚀 추론 엔진 서빙 및 TCO 최적화
* **vLLM / SGLang FP8 파이프라인**: DeepSeekMoE 전용 텐서 병렬화(TP=8) 및 EP(Expert Parallelism) 커널 적용.
* **Thinking Budget 인터페이스**: 응답 속도와 추론 깊이 사이의 밸런스를 조절하는 유저 선택 UI 구성.
* **GRPO 보상 모델 커스텀**: 사내 코딩 및 보안 지침 준수 여부를 평가하는 자체 보상 엔진 설계.
* **온프레미스 사내망 이식**: 고비용 상용 API 대신 망분리 환경 내 671B MoE 서빙으로 월 TCO 80% 절감.
"""

SAMPLE_3_BLOG = """# 📌 [Deep-Dive Visual Report] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 리포트

> **주요 출처**: W3C Web Architecture | **카테고리**: IT 매체 | **검증**: ✅ Multi-Source Cross-Validated | **특집**: 🎨 시각화 다이어그램 포함

---

### 1. 💡 핵심 요약 및 개요 (Executive Summary)
월드와이드웹(W3C) 창시자 팀 버너스 리(Tim Berners-Lee)의 명작 기술 가이드라인 **"Cool URIs don't change(좋은 URI는 변경되지 않는다)"**를 최신 웹 아키텍처 관점에서 심층 분석했습니다. 본 리포트는 10년, 20년이 지나도 깨지지 않는(Dangling Link 없는) **영구적 웹 URI 설계 원칙과 디커플링 아키텍처**를 제시합니다.

```mermaid
flowchart TD
    subgraph Client_Layer ["1. 클라이언트 요청 레이어"]
        User[웹 브라우저 / API Client] -->|영구 식별자 요청| CoolURI["https://example.com/docs/api-guidelines"]
    end

    subgraph Abstraction_Layer ["2. 추상화 & 리디렉션 레이어"]
        CoolURI --> ReverseProxy[Nginx / Cloudflare Edge Proxy]
        ReverseProxy -->|내부 맵핑 분리| Router{Internal Router}
    end

    subgraph Storage_Layer ["3. 백엔드 & 저장소 레이어 (자유롭게 변경 가능)"]
        Router -->|2020년| Server1[PHP / Apache Server]
        Router -->|2024년| Server2[Node.js / Express Server]
        Router -->|2026년| Server3[FastAPI / Python Microservice]
    end

    style CoolURI fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff
```

---

### 2. 🔍 안 좋은 URI 패턴 vs 영구적 Cool URI 설계 패턴 비교

| 구분 | 나쁜 URI 패턴 (Bad Practice) | 영구적 Cool URI 패턴 (Best Practice) | 이유 및 개선 효과 |
| :--- | :--- | :--- | :--- |
| **기술 스택 노출** | `/page.php`, `/index.asp`, `/cgi-bin/` | `/docs/guidelines`, `/articles/123` | 백엔드 언어 변경 시 주소가 파손되지 않음 |
| **날짜/버전 과도 포함**| `/2026/08/10/article.html` | `/articles/cool-uris-architecture` | 콘텐츠 카테고리 재편 시 지속성 유지 |
| **DB PK 및 내부 경로**| `/servlet/db/item_v2_final.jsp?id=99` | `/products/wireless-keyboard` | DB 스키마 리팩토링 시 외부에 영향을 주지 않음 |
| **조직/부서명 포함**| `/marketing/reports/2026` | `/reports/2026` | 회사 조직 개편이나 부서 통합 시 링크 유지 |

---

### 3. 📊 URI 지속성 및 링크 파손율(Link Rot) 감소 효과

[CHART:bar|Link Rot Rate over 5 Years (%)|Unstructured Legacy URIs:68%|Restructured V2 URIs:42%|W3C Permanent Cool URIs:3%]

* **5년 경과 시 깨진 링크 비율(Link Rot)**: 무분별한 URI 디자인 시 **68%** 파손 vs Cool URI 디자인 시 **3% 이내** 완벽 보존.

---

### 4. 🎯 실무 적용 핵심 체크리스트 (Actionable Checklist)

#### 🚀 영구적 URI 설계 및 트래픽 보존
* **URL 라우팅 추상화 레이어 적용**: Nginx, Cloudflare Edge Worker 등 리버스 프록시를 배치하여 주소와 내부 파일 확장자 분리.
* **301 Permanent Redirect 엔진**: 구주소 파손 방지 및 SEO 백링크 자산 유지를 위한 레거시 URL 변환 맵핑 수립.
* **시맨틱 Slug URL 적용**: 사용자 가독성과 검색엔진 SEO에 최적화된 직관적 식별자 구조 설계.
"""

def create_sample_articles():
    db = SessionLocal()
    try:
        samples = [
            {
                "id": "sample-agentic-computer-use",
                "title": "[시각화 리포트] Anthropic, 자율 멀티에이전트 Computer Use 및 Agentic Tooling 2.0 파이프라인 발표",
                "source_name": "Anthropic AI Engineering",
                "source_url": "https://www.anthropic.com/news/agentic-tooling-2.0",
                "published_at": datetime.now(timezone.utc).isoformat(),
                "category": "빅테크 공식",
                "image_url": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
                "summary_bullets": [
                    "Anthropic이 브라우저 GUI, 마우스 클릭, 키보드 입력 및 API 연동을 스스로 판단하는 Computer Use 2.0 파이프라인을 공개했습니다.",
                    "OSWorld 벤치마크에서 복잡한 웹 조작 과업 완수율을 기존 18%에서 64%로 3.5배 대폭 향상시켰습니다.",
                    "Human-in-the-loop 결제 및 민감 데이터 변경 승인 가드레일을 기본 탑재하여 사내 보안 유출을 철저히 차단합니다."
                ],
                "blog_summary": SAMPLE_1_BLOG,
                "actionable_insight": {
                    "developer": "Computer Use SDK를 도입하여 단순 API 연동을 넘어 자율 브라우저 GUI 오케스트레이션 시스템을 구축하세요.",
                    "pm": "에이전트 판단 시 금융 결제나 민감 정보 변경 단계에 Human-in-the-loop 승인 모달 UX를 설계하세요.",
                    "business": "반복적인 서류 조회 및 외부 데이터 수집 작업을 자율 에이전트에 위임하여 인건비와 소요 시간을 75% 단축하세요.",
                    "researcher": "Vision-Language-Action (VLA) 모델의 프레임 간 그라운딩 오차 저감 알고리즘을 분석하세요."
                },
                "impact_score": 98,
                "tags": ["#Anthropic", "#AgenticAI", "#ComputerUse", "#SOTA"],
                "matched_lenses": ["developer", "agent", "pm", "business"],
                "is_new": True
            },
            {
                "id": "sample-deepseek-r1-moe",
                "title": "[시각화 리포트] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 및 벤치마크 분석",
                "source_name": "DeepSeek AI Lab",
                "source_url": "https://github.com/deepseek-ai/DeepSeek-R1",
                "published_at": datetime.now(timezone.utc).isoformat(),
                "category": "최신 논문 & 학계",
                "image_url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
                "summary_bullets": [
                    "DeepSeek R1은 감독 학습(SFT) 없이 오직 자율 강화학습(RL)만으로 AIME 2024 수학 올림피아드 79.8%를 기록했습니다.",
                    "671B 전체 파라미터 중 파스당 37B만 활성화하는 DeepSeekMoE 아키텍처로 추론 API 가격을 OpenAI o1 대비 96% 절감했습니다.",
                    "Group Relative Policy Optimization (GRPO) 알고리즘을 적용하여 Critic 모델 없이도 높은 학습 안정성을 입증했습니다."
                ],
                "blog_summary": SAMPLE_2_BLOG,
                "actionable_insight": {
                    "developer": "vLLM 및 SGLang FP8 양자화 서빙 파이프라인을 구축하여 8x H800 노드에서 671B MoE 모델을 고속 서빙하세요.",
                    "pm": "에이전트의 사고 과정(Thinking)을 유저 인터페이스에 펼치기/접기 형태로 직관적으로 시각화하세요.",
                    "business": "고비용 상용 추론 API를 DeepSeek R1 기반 로컬/오픈 API로 대체하여 월 인프라 TCO를 80% 이상 절감하세요.",
                    "researcher": "Critic 모델 없이 그룹 상대 보상으로 유전자 알고리즘 학습을 수행하는 GRPO 수학적 원리를 분석하세요."
                },
                "impact_score": 96,
                "tags": ["#DeepSeek", "#MoE", "#Reasoning", "#GRPO", "#SOTA"],
                "matched_lenses": ["developer", "researcher", "business"],
                "is_new": True
            },
            {
                "id": "sample-w3c-cool-uris",
                "title": "[시각화 리포트] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 리포트",
                "source_name": "W3C Web Architecture",
                "source_url": "https://www.w3.org/Provider/Style/URI",
                "published_at": datetime.now(timezone.utc).isoformat(),
                "category": "IT 매체",
                "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
                "summary_bullets": [
                    "W3C 창시자 팀 버너스 리의 원칙에 따라, 웹 기술 스택 및 DB 스키마 변경 시에도 URL이 파손되지 않는 디커플링 구조를 제시합니다.",
                    "URL 경로에 백엔드 확장자(.php, .asp)나 내부 데이터베이스 PK를 노출하지 않는 것이 영구적 웹 자산 보존의 핵심입니다.",
                    "Nginx / Cloudflare Edge 프록시 추상화 레이어를 적용하여 5년 경과 후 깨진 링크 비율(Link Rot)을 68%에서 3% 이내로 감소시킵니다."
                ],
                "blog_summary": SAMPLE_3_BLOG,
                "actionable_insight": {
                    "developer": "Nginx 및 Cloudflare Edge Worker 단에 URL 라우팅 추상화 레이어를 배치하여 파일 확장자와 서버 경로를 완벽히 분리하세요.",
                    "pm": "검색엔진 SEO 및 유저 가독성 모두에 친화적인 시맨틱 Slug URL 디자인 지침을 수립하세요.",
                    "business": "주소 변경으로 인한 검색 노출 패널티 및 브랜드 백링크 자산 손실 위험을 사전에 완벽히 차단하세요.",
                    "researcher": "학술 논문 및 연구 데이터셋 보관을 위한 Digital Object Identifier (DOI) 지속성 아키텍처를 연구하세요."
                },
                "impact_score": 92,
                "tags": ["#W3C", "#WebArchitecture", "#URI", "#Infrastructure"],
                "matched_lenses": ["developer", "pm", "business"],
                "is_new": True
            }
        ]

        for s in samples:
            existing = db.query(NewsArticleDB).filter(NewsArticleDB.id == s["id"]).first()
            if existing:
                existing.title = s["title"]
                existing.summary_bullets = s["summary_bullets"]
                existing.blog_summary = s["blog_summary"]
                existing.actionable_insight = s["actionable_insight"]
                existing.impact_score = s["impact_score"]
                existing.tags = s["tags"]
                existing.matched_lenses = s["matched_lenses"]
            else:
                db_item = NewsArticleDB(
                    id=s["id"],
                    title=s["title"],
                    source_name=s["source_name"],
                    source_url=s["source_url"],
                    published_at=s["published_at"],
                    category=s["category"],
                    image_url=s["image_url"],
                    summary_bullets=s["summary_bullets"],
                    blog_summary=s["blog_summary"],
                    actionable_insight=s["actionable_insight"],
                    impact_score=s["impact_score"],
                    tags=s["tags"],
                    matched_lenses=s["matched_lenses"]
                )
                db.add(db_item)
        
        db.commit()
        print("✅ Successfully generated and inserted 3 rich visual sample articles into Neon DB!")
    except Exception as e:
        db.rollback()
        print("Error inserting sample articles:", e)
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_articles()
