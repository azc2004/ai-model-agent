import sys
import os
from datetime import datetime, timezone

# PYTHONPATH 설정
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal
from app.db_models import NewsArticleDB

SAMPLE_1_BLOG = """# 📊 [심층 기술 분석 & 아키텍처 재구성] Anthropic Computer Use 2.0: GUI 자율 제어 및 Agentic 오케스트레이션 분석

> **분석 대상**: Anthropic AI Engineering 공식 발표 | **분석 유형**: 심층 분석 및 아키텍처 재구성 리포트 | **검증**: ✅ Multi-Source Cross-Validated

---

### 1. 🔍 배경 분석: 왜 단순 API 연동에서 GUI 자율 제어(Computer Use)로 패러다임이 전환되는가?

전통적인 기업 업무 자동화(RPA 및 API Integration)는 시스템이 개편되거나 API 명세가 변경될 때마다 엔지니어가 코드를 수동 수정해야 하는 **'강한 결합(Tight Coupling)과 높은 유지보수 비용'** 한계에 직면해 있었습니다.

Anthropic의 **Computer Use 2.0**은 기존 방식의 한계를 깨고, 인간처럼 웹/데스크톱 화면(GUI)의 픽셀(Pixel)을 시각적으로 인식하여 **마우스 이동, 클릭, 타이핑, API 호출 판단을 스스로 수행하는 자율 오케스트레이션**으로 기술 패러다임을 근본적으로 재구성합니다.

```
[기존 방식: API 연동]      수동 API 개발 (2~4주) ──> 백엔드 강결합 ──> API 변경 시 파손 (Broken)
                                                                 ▼
[개선 방식: Computer Use]   비전 recognition ──> 자율 GUI 판단 ──> UI 변경 시 스스로 추론 교정 (Robust)
```

---

### 2. 🏗️ 재구성된 엔드투엔드 시스템 아키텍처 & 자율 루프 (Reconstructed System Architecture)

장황한 원문 텍스트를 한눈에 파악할 수 있는 **5단계 자율 제어 파이프라인**으로 재구성한 아키텍처입니다:

```mermaid
flowchart TD
    subgraph Step1 ["1단계: 목표 수립 & 분해"]
        A[👤 사용자 업무 요청\nUser Goal / Natural Language] --> B[🧠 Planner Agent\nTask Decomposition & Reasoning]
    end

    subgraph Step2 ["2단계: 실시간 보안 검증"]
        B --> C{🛡️ 보안 검증 가드레일\nHuman-in-the-loop Gate}
        C -- ❌ 민감 데이터/결제 --> D[🛑 사용자 모달 승인 요청\nApproval Gate]
        D -- 승인 완료 --> E[🤖 GUI Worker Agent]
        C -- ✅ 일반 통과 --> E
    end

    subgraph Step3 ["3단계: VLA 조작 실행"]
        E --> F[💻 OS / Browser GUI Execution\nMouse Click, Type, Scroll]
    end

    subgraph Step4 ["4단계: 비전 캡처 평가 & 피드백"]
        F --> G[👁️ Vision Evaluator\nScreen Capture & State Feedback]
        G -- 과업 미완수 / 오차 발생 --> B
        G -- ✅ 최종 과업 달성 --> H[🎉 완료 리포트 및 결과 제출]
    end

    style C fill:#1e293b,stroke:#f59e0b,stroke-width:2px,color:#fff
    style G fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff
```

---

### 3. ⚡ 3대 핵심 메커니즘 심층 분석 (Critical Technical Deep-Dive)

#### 메커니즘 A. 1000x1000 정규화 그리드 좌표 인식 (Vision-Language-Action Grounding)
- **분석**: 화면 해상도가 달라져도 클릭 정확도를 보장하기 위해, 입력 캡처 이미지를 1000x1000 정규화 그리드로 변환한 후 클릭/드래그 대상을 시각적 좌표로 계산합니다.
- **효과**: 마우스 클릭 좌표 오차를 ±2px 이내로 제어하여 웹 상의 미세한 버튼도 정확하게 조작합니다.

#### 메커니즘 B. Self-Correction 오토메이션 피드백 루프
- **분석**: 마우스 클릭 후 팝업 모달이나 로딩 지연이 발생할 경우, 비전 평가기(Vision Evaluator)가 이전 화면과의 델타(Delta)를 비교하여 팝업 닫기나 Scroll Down을 자율 판단합니다.

#### 메커니즘 C. 델타 프레임(Delta Frame) 캡처 기반 토큰 절감
- **분석**: 매 초 전체 고화질 스크린샷을 전송할 때 발생하는 막대한 비전 토큰 비용을 방지하기 위해, 변경된 영역만 크롭(Crop)하여 전송하는 델타 캡처 기술을 채택했습니다.

---

### 4. ⚖️ 기술 방식별 구조적 Trade-off & 실무 비교 분석 Matrix

원문의 텍스트 내용을 토대로 기술 구현 방식별 장단점을 재정리한 분석 표입니다:

| 비교 파라미터 | 전통적 RPA (UiPath 등) | 백엔드 REST API 연동 | Anthropic Computer Use 2.0 (본 기술) |
| :--- | :--- | :--- | :--- |
| **구축 방식** | 수동 클릭 좌표/DOM 엘리먼트 지정 | API 엔드포인트 파싱 & 연동 코드 작성 | **자연어 목표 입력 후 에이전트 자율 시각 조작** |
| **UI 변경 대응력** | DOM 구조 변경 시 100% 오류 발생 | API 스펙 변경 시 연동 장애 발생 | **화면 레이아웃 변경 시에도 시각적 추론으로 자율 적응** |
| **도입 소요 기간** | 2~3주 (스크립트 작성) | 3~4주 (백엔드 개발) | **1일 이내 (SDK 이식 및 가드레일 설정)** |
| **비용 구조** | 솔루션 라이선스 비용 | 백엔드 유지보수 공수 | **비전 캡처 토큰 소비 (델타 캡처 시 60% 절감)** |

---

### 5. 💻 실무 이식 코드 레시피 (Implementation Recipe)

개발자가 사내 시스템에 자율 브라우저 조작 파이프라인을 이식할 수 있도록 재구성한 코드 레시피입니다.

```python
import anthropic
from anthropic import Anthropic

# 1. Anthropic 클라이언트 초기화
client = Anthropic(api_key="YOUR_ANTHROPIC_API_KEY")

# 2. Computer Use 2.0 도구 정의 및 자율 파이프라인 실행
response = client.beta.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=4096,
    tools=[{
        "type": "computer_20241022",
        "name": "computer",
        "display_width_px": 1920,
        "display_height_px": 1080,
        "display_number": 1
    }],
    messages=[{
        "role": "user",
        "content": "사내 ERP 웹사이트에 접속하여 지난달 미결제 매출 명세서를 조회하고 PDF로 다운로드하세요."
    }],
    betas=["computer-use-2024-10-22"]
)

print("📌 Agent Action Plan Execution:", response.content)
```

> 🛡️ **Production Guardrail & Security Warning (실무 경고)**:
> - **Human-in-the-loop 승인**: 금융 결제, 회원 개인정보 삭제 등 파괴적 행동 시 반드시 사용자 승인을 거치도록 IAM 권한을 분리하세요.

---

### 6. 🎯 4개 직무 관점별 실전 대응 전략 (Strategic Action Plan)

* **👩‍💻 엔지니어/개발자**: Anthropic Computer Use SDK를 도입하여 기존 수동 API 연동 대신 비전 자율 조작 파이프라인으로 전환하세요.
* **💡 기획자/PM**: 사용자가 일일이 입력하지 않고 목표만 던져도 결과가 완수되는 Goal-driven 자율 UX를 서비스 로드맵에 우선 편성하세요.
* **💼 비즈니스 리더**: 반복적인 서류 데이터 수집 및 외주 단순 입력 작업을 자율 에이전트에 위임하여 운영 비용을 75% 절감하세요.
* **🔬 연구자/학계**: Vision-Language-Action(VLA) 모델의 픽셀 그라운딩 정확도 향상 및 델타 프레임 최적화 알고리즘 연구를 벤치마킹하세요.
"""

SAMPLE_2_BLOG = """# 📊 [심층 기술 분석 & 아키텍처 재구성] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 분석

> **분석 대상**: DeepSeek AI Lab 공식 논문 & 기술 발표 | **분석 유형**: 심층 분석 및 아키텍처 재구성 리포트 | **검증**: ✅ Multi-Source Cross-Validated

---

### 1. 🔍 배경 분석: 왜 감독 학습(SFT) 중심에서 자율 강화학습(RL)으로 패러다임이 전환되는가?

기존 대형 언어 모델(LLM) 학습은 사람이 직접 작성한 고비용 정답 데이터(Supervised Fine-Tuning)에 종속되어 있어, **'사람의 능력을 넘어서는 초지능 추론'**을 학습시키는 데 한계가 있었습니다.

**DeepSeek R1**은 감독 학습(SFT) 단계를 대폭 건너뛰고, 오직 **자율 강화학습(RL)**만으로 모델이스로 오류를 수정하고 반성(Self-Correction & Reflection)하는 **Chain-of-Thought 자율 진화 아키텍처**를 완성했습니다.

```
[기존 방식: SFT 데이터 학습]    사람이 정답 작성 ──> 데이터 한계에 부딪힘 ──> 고비용 & 확장성 제한
                                                                 ▼
[개선 방식: R1 RL 자율 진화]   수학/코드 보상 부여 ──> 모델 스스로 반성(CoT) ──> SOTA 추론 성능 스스로 달성
```

---

### 2. 🏗️ 재구성된 DeepSeekMoE & RL 추론 파이프라인 (Reconstructed Pipeline)

장황한 논문 텍스트를 한눈에 파악할 수 있도록 **3단계 모듈별 데이터 처리 흐름**으로 재구성했습니다:

```mermaid
flowchart LR
    subgraph Step1 ["1단계: 압축 토큰 보존"]
        Prompt[입력 프롬프트] --> MLA[Multi-Head Latent Attention\n(KV 캐시 메모리 93% 절감)]
    end

    subgraph Step2 ["2단계: DeepSeekMoE 라우팅"]
        MLA --> Router{Dynamic Router\n(Top-8 Expert Selector)}
        Router --> E1[Shared Expert 1]
        Router --> E2[Routed Expert 12]
        Router --> E3[Routed Expert 48]
    end

    subgraph Step3 ["3단계: GRPO 보상 기반 추론"]
        E1 & E2 & E3 --> CoT[Self-Correction & Reflection\n(아하 순간 CoT 자율 생성)]
        CoT --> Rewards{GRPO Reward Engine\n(Critic 모델 없이 상대 보상 측정)}
    end

    Rewards --> Output[최종 정밀 추론 답변 리턴]

    style MLA fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff
    style Rewards fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff
```

---

### 3. ⚡ 3대 핵심 메커니즘 심층 분석 (Critical Technical Deep-Dive)

#### 메커니즘 A. 파스당 37B만 활성화하는 671B DeepSeekMoE 구조
- **분석**: 전체 671B 파라미터 중 요청 1건당 딱 37B 전문가(Expert) 파라미터만 동적으로 선택 활성화합니다.
- **효과**: Dense 모델 대비 서빙 연산량을 1/18로 감축하여 추론 가격을 OpenAI o1 대비 **96% 절감**했습니다.

#### 메커니즘 B. Multi-Head Latent Attention (MLA) 메모리 혁신
- **분석**: KV 캐시 메모리 사용량을 획기적으로 줄이기 위해 Key-Value 벡터를 저차원 잠재 공간(Latent Space)으로 압축 저장합니다.
- **효과**: 동일 GPU 노드에서 동시 처리 가능한 유저 쿼리 수(Throughput)를 4배 이상 확대했습니다.

#### 메커니즘 C. Critic 모델을 제거한 GRPO (Group Relative Policy Optimization)
- **분석**: 기존 PPO 학습 시 필요했던 대형 Critic(가치 평가) 모델을 제거하고, 그룹 내 $Q$개 답변의 상대적 평균/표준편차 보상으로 학습을 진행합니다.
- **효과**: RL 학습 과정에서의 메모리 전력 소비를 절반으로 낮추고 학습 안정성을 극대화했습니다.

---

### 4. ⚖️ 주요 프론티어 추론 모델 성능 및 TCO 비교 분석 Matrix

| 평가 파라미터 | DeepSeek R1 (671B MoE) | OpenAI o1 (Latest) | Claude 3.7 Sonnet (Thinking) |
| :--- | :--- | :--- | :--- |
| **핵심 추론 아키텍처** | DeepSeekMoE + GRPO RL | Closed Frontier MoE | Hybrid Thinking Engine |
| **AIME 2024 (수학 올림피아드)** | **79.8%** | 79.2% | 78.5% |
| **SWE-Bench Verified (코딩)** | 49.2% | 48.9% | **70.3%** |
| **1M 토큰 당 API 비용 (Input/Output)**| **$0.55 / $2.19 (96% 절감)** | $15.00 / $60.00 | $3.00 / $15.00 |
| **온프레미스 사내망 서빙** | **가능 (8x H800 노드)** | 불가능 (클라우드 전용) | 불가능 (클라우드 전용) |

---

### 5. 💻 실무 이식 코드 레시피 (Implementation Recipe)

DeepSeek R1의 Reasoning 사고 과정(Thinking)과 최종 답변을 분리 파싱하는 Python 서빙 파이프라인 코드입니다.

```python
from openai import OpenAI

# 1. DeepSeek OpenAI 호환 API 엔드포인트 세팅
client = OpenAI(
    api_key="YOUR_DEEPSEEK_API_KEY",
    base_url="https://api.deepseek.com/v1"
)

# 2. R1 추론 요청 파이프라인 수행
response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=[{"role": "user", "content": "PostgreSQL 1M TPS 처리를 위한 파티셔닝 전략 수립"}]
)

# 3. 사고 과정(Reasoning)과 최종 결론 분리 출력
print("🧠 === Agent Self-Correction Thinking Process ===")
print(response.choices[0].message.reasoning_content)

print("\n🎯 === Final Reconstructed Architecture Answer ===")
print(response.choices[0].message.content)
```

> 🛡️ **Production Guardrail & Security Warning (실무 경고)**:
> - **UI 펼치기/접기 디자인**: 유저 화면 렌더링 시 장황한 `reasoning_content`는 기본적으로 접힘(Collapsed) 상태로 제공하여 읽기 피로도를 방지하세요.

---

### 6. 🎯 4개 직무 관점별 실전 대응 전략 (Strategic Action Plan)

* **👩‍💻 엔지니어/개발자**: vLLM 및 SGLang FP8 양자화 서빙 커널을 적용하여 8x H800 노드에서 671B MoE 모델을 고속 서빙하세요.
* **💡 기획자/PM**: 추론 시간과 정확도 밸런스를 유저가 직접 조절하는 Thinking Budget 선택 인터페이스를 제공하세요.
* **💼 비즈니스 리더**: 고비용 상용 추론 API를 DeepSeek R1 기반 사내망 오픈 모델 서빙으로 대체하여 월 TCO를 80% 이상 절감하세요.
* **🔬 연구자/학계**: Critic 모델 없이 그룹 상대 보상으로 유전자 알고리즘 학습을 수행하는 GRPO 수학적 원리를 분석하세요.
"""

SAMPLE_3_BLOG = """# 📊 [심층 기술 분석 & 아키텍처 재구성] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 분석

> **분석 대상**: W3C Web Architecture (Tim Berners-Lee) | **분석 유형**: 심층 분석 및 아키텍처 재구성 리포트 | **검증**: ✅ Multi-Source Cross-Validated

---

### 1. 🔍 배경 분석: 왜 개발 프레임워크 변경 시 URL 파손(Link Rot) 문제가 발생하는가?

많은 기업들이 웹 서비스나 백엔드 시스템을 리팩토링(PHP ➔ Node.js ➔ Python/Go)할 때 `/page.php` 또는 `/servlet/item?id=99`와 같은 파일 확장자나 DB PK를 URL 주소에 직접 노출하는 **'강결합 주소 설계'** 오류를 범하고 있습니다.

이로 인해 시스템 개편 시마다 기존 북마크나 검색엔진 인덱스 링크가 깨져 **5년 경과 시 68%의 링크 파손율(Link Rot)**이 발생하고 기업의 디지털 웹 자산 가치가 상실되는 심각한 문제가 일어납니다.

```
[기존 방식: 기술스택 노출 URI]   /page.php ──> Node.js 변환 시 /page.js ──> 주소 파손 (Link Rot 68%)
                                                                ▼
[개선 방식: W3C 영구 Cool URI]  /docs/guidelines ──> 프록시 추상화 ──> 백엔드 변경돼도 주소 유지 (Link Rot 3%)
```

---

### 2. 🏗️ 재구성된 W3C 영구 디커플링 아키텍처 (Reconstructed Architecture)

장황한 W3C 문서의 핵심 원칙을 **3계층 디커플링 라우팅 파이프라인**으로 시각적 재구성했습니다:

```mermaid
flowchart TD
    subgraph Client_Layer ["1계층: 클라이언트 외부 영구 주소"]
        User[웹 브라우저 / 외부 API Client] -->|영구 식별자 요청| CoolURI["https://example.com/docs/api-guidelines"]
    end

    subgraph Abstraction_Layer ["2계층: 추상화 & 프록시 레이어"]
        CoolURI --> ReverseProxy[Nginx / Cloudflare Edge Proxy]
        ReverseProxy -->|내부 주소 맵핑 분리| Router{Internal Router}
    end

    subgraph Storage_Layer ["3계층: 백엔드 & 저장소 (자유롭게 개편 가능)"]
        Router -->|2020년| Server1[PHP / Apache Server]
        Router -->|2024년| Server2[Node.js / Express Server]
        Router -->|2026년| Server3[FastAPI / Python Microservice]
    end

    style CoolURI fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff
    style ReverseProxy fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff
```

---

### 3. ⚡ 3대 핵심 메커니즘 심층 분석 (Critical Technical Deep-Dive)

#### 메커니즘 A. 기술 스택 및 파일 확장자의 완전한 격리
- **분석**: URI 경로에 `.php`, `.asp`, `cgi-bin` 등 백엔드 구현 기술을 완전히 삭제하고, 식별 대상 자원(Resource)의 명사형 이름만 남깁니다.
- **효과**: 백엔드 프레임워크를 전면 재작성하더라도 외부 클라이언트 주소는 단 1px도 변경되지 않습니다.

#### 메커니즘 B. 리버스 프록시(Reverse Proxy) 기반 URL 맵핑 추상화
- **분석**: Edge 리버스 프록시(Nginx / Cloudflare Worker)가 외부 요청 URI를 내부 마이크로서비스 라우트로 실시간 맵핑 릴레이합니다.

#### 메커니즘 C. 301 Permanent Redirect 통한 영구 자산 승계
- **분석**: 불가피한 주소 변경 시 임시 302가 아닌 301 Permanent Redirect 헤더를 응답하여 검색엔진 백링크 점수를 100% 보존합니다.

---

### 4. ⚖️ 나쁜 URI 패턴 vs W3C 영구 Cool URI 패턴 비교 분석 Matrix

| 비교 구분 | 나쁜 URI 패턴 (Bad Practice) | 영구적 Cool URI 패턴 (Best Practice) | 구조적 개선 효과 |
| :--- | :--- | :--- | :--- |
| **기술 스택 노출** | `/page.php`, `/index.asp` | `/docs/guidelines`, `/articles/123` | **백엔드 언어 변경 시 주소가 파손되지 않음** |
| **날짜/버전 과도 포함**| `/2026/08/10/article.html` | `/articles/cool-uris-architecture` | **콘텐츠 카테고리 재편 시 영구 지속성 유지** |
| **DB PK 및 내부 경로**| `/servlet/db/item_v2.jsp?id=99` | `/products/wireless-keyboard` | **DB 스키마 리팩토링 시 외부에 영향을 주지 않음** |
| **조직/부서명 포함**| `/marketing/reports/2026` | `/reports/2026` | **회사 조직 개편이나 부서 통합 시 링크 유지** |

---

### 5. 💻 실무 이식 Nginx 영구 프록시 연동 코드 레시피 (Implementation Recipe)

W3C 영구 URI 원칙을 실제 인프라 레벨에서 구현하는 Nginx 프록시 연동 코드입니다.

```nginx
# W3C Permanent URI Decoupling Proxy Configuration
server {
    listen 80;
    server_name example.com;

    # 외부 노출 영구 URI 라우트 (W3C Best Practice)
    location /docs/api-guidelines {
        # 백엔드 기술 스택이 PHP -> Node.js -> Python으로 개편되어도
        # 외부 클라이언트는 오직 /docs/api-guidelines 주소만 바라봅니다.
        proxy_pass http://internal-microservice-cluster:8000/v3/guidelines;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 레거시 URL 301 영구 리디렉션 (SEO 점수 승계)
    location ~ ^/page\.php$ {
        return 301 https://$host/docs/api-guidelines;
    }
}
```

> 🛡️ **Production Guardrail Warning (실무 경고)**:
> - **Canonical Tag 선언**: 동일 콘텐츠가 복수 주소로 노출될 가능성을 방지하기 위해 HTML `<link rel="canonical" href="...">` 태그를 반드시 선언하세요.

---

### 6. 🎯 4개 직무 관점별 실전 대응 전략 (Strategic Action Plan)

* **👩‍💻 엔지니어/개발자**: Nginx/Cloudflare Edge Worker를 적용하여 외부 영구 URI 주소와 내부 백엔드 파일/기술 스택을 완전히 디커플링하세요.
* **💡 기획자/PM**: 콘텐츠 URL 설계 시 날짜나 부서명 대신 영구 식별자 Slug 방식을 서비스 라우팅 표준으로 채택하세요.
* **💼 비즈니스 리더**: SEO 검색엔진 순위 유지 및 68%의 깨진 링크 발생 방지를 통해 브랜드 디지털 웹 자산 가치를 유지하세요.
* **🔬 연구자/학계**: HTTP Content Negotiation 메커니즘을 적용하여 자원의 식별자와 표상(Representation)을 분리하는 웹 아키텍처 원리를 연구하세요.
"""

def create_sample_articles():
    db = SessionLocal()
    try:
        samples = [
            {
                "id": "sample-agentic-computer-use",
                "title": "[심층 기술 분석] Anthropic Computer Use 2.0: GUI 자율 제어 및 Agentic 오케스트레이션 분석",
                "source_name": "Anthropic AI Engineering",
                "source_url": "https://www.anthropic.com/news/agentic-tooling-2.0",
                "published_at": datetime.now(timezone.utc).isoformat(),
                "category": "빅테크 공식",
                "image_url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
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
                "title": "[심층 기술 분석] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 분석",
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
                "title": "[심층 기술 분석] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 분석",
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
                    "developer": "Nginx/Cloudflare Edge Worker를 적용하여 외부 영구 URI 주소와 내부 백엔드 파일/기술 스택을 완전히 디커플링하세요.",
                    "pm": "콘텐츠 URL 설계 시 날짜나 부서명 대신 영구 식별자 Slug 방식을 서비스 라우팅 표준으로 채택하세요.",
                    "business": "SEO 검색엔진 순위 유지 및 68%의 깨진 링크 발생 방지를 통해 브랜드 디지털 웹 자산 가치를 유지하세요.",
                    "researcher": "HTTP Content Negotiation 메커니즘을 적용하여 자원의 식별자와 표상(Representation)을 분리하는 웹 아키텍처 원리를 연구하세요."
                },
                "impact_score": 92,
                "tags": ["#W3C", "#WebArchitecture", "#URI", "#Infrastructure"],
                "matched_lenses": ["developer", "pm"],
                "is_new": True
            }
        ]

        for s in samples:
            existing = db.query(NewsArticleDB).filter(NewsArticleDB.id == s["id"]).first()
            if existing:
                existing.title = s["title"]
                existing.source_name = s["source_name"]
                existing.source_url = s["source_url"]
                existing.published_at = s["published_at"]
                existing.category = s["category"]
                existing.image_url = s["image_url"]
                existing.summary_bullets = s["summary_bullets"]
                existing.blog_summary = s["blog_summary"]
                existing.actionable_insight = s["actionable_insight"]
                existing.impact_score = s["impact_score"]
                existing.tags = s["tags"]
                existing.matched_lenses = s["matched_lenses"]
                existing.is_new = s["is_new"]
            else:
                db.add(NewsArticleDB(**s))
        db.commit()
        print("✅ Reconstructed Analytical Report sample articles populated successfully!")
    except Exception as e:
        print(f"❌ Error creating sample articles: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_articles()
