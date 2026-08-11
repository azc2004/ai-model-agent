import sys
import os
from datetime import datetime, timezone
import uuid

# PYTHONPATH 설정
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal
from app.db_models import NewsArticleDB

SAMPLE_1_BLOG = """# 📌 [Super Hybrid Report] Anthropic 자율 멀티에이전트 Computer Use 및 Agentic Tooling 2.0 파이프라인

> **주요 출처**: Anthropic AI Engineering | **카테고리**: 빅테크 공식 | **검증**: ✅ Multi-Source Cross-Validated | **특집**: 🎨 시각화 + 💻 코드 + 💼 Executive + 🔬 Deep-Dive

---

### 1. ⚡ 60초 Executive Summary & Why This Matters (The Pragmatic Engineer & The Batch 스타일)
Anthropic이 차세대 AI 자율 에이전트 구축을 위한 **Computer Use 및 Agentic Tooling 2.0 파이프라인**을 공식 발표했습니다. 기존 텍스트/코드 생성 수준을 넘어 에이전트가 직접 브라우저 GUI, 마우스 클릭, 키보드 타이핑, API 오케스트레이션을 스스로 판단하여 수행하는 **엔드투엔드 업무 자동화 아키텍처**입니다.

> 💡 **Why This Matters (산업 파급력)**: 반복적인 수동 데이터 수집, QA 테스팅, 서류 조회 및 ERP 입력 작업을 자율 에이전트에 위임함으로써 기업 인적 자원 소비를 **최대 75% 절감**하고 업무 처리 속도를 4배 이상 가속화할 수 있습니다.

---

### 2. 🎨 단계별 시스템 아키텍처 & Evolving Data Flow (ByteByteGo & Jay Alammar 스타일)

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

#### 🔍 기술 방식별 Trade-offs 비교표 (Pros vs Cons vs Best For)

| 구현 방식 | 주요 장점 (Pros) | 한계점 (Cons) | 최적 적용 대상 (Best For) |
| :--- | :--- | :--- | :--- |
| **기존 수동 조작 (Manual)** | 사람의 직관적 판단, 예외 처리 뛰어남 | 인건비 높음, 24시간 연속 가동 불가 | 단발성 예외 업무 |
| **전통적 API 연동** | 처리 속도 빠름, 시스템 안정적 | API 개편 시 코드 파손, 연동 개발 기간 4주 | 고정된 백엔드 연동 |
| **Computer Use 2.0 (본 기술)** | **GUI 변경 시 자율 적응, 1일 내 즉시 도입** | 비전 캡처 토큰 소비 발생 | **종합 ERP / 웹 업무 자동화** |

#### 📊 OSWorld 벤치마크 성과 비교
[CHART:bar|OSWorld Task Completion Rate (%)|Legacy Agent:18%|Claude 3.5 Sonnet:38%|Claude 3.7 Sonnet (Thinking):64%|Human Baseline:72%]

---

### 3. 💻 원클릭 SDK 연동 코드 & 프로덕션 서빙 가이던스 (HuggingFace & Chip Huyen 스타일)

아래 Python SDK 코드 스니펫을 사내 에이전트 백엔드 시스템에 이식하면 즉시 자율 GUI 브라우저 조작 파이프라인을 가동할 수 있습니다.

```python
import anthropic
from anthropic import Anthropic

client = Anthropic(api_key="YOUR_ANTHROPIC_API_KEY")

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
        "content": "사내 ERP에 접속하여 지난달 미결제 매출 명세서를 조회하고 PDF로 다운로드하세요."
    }],
    betas=["computer-use-2024-10-22"]
)

print("Agent Action Plan:", response.content)
```

> 🛡️ **Production Guardrail Warning (실무 주의사항)**:
> 1. **Human-in-the-loop 승인 게이트**: 금융 결제, 회원 데이터 삭제 등 파괴적 동작 시 실시간 사용자 모달 승인을 거치도록 IAM 권한을 격리하세요.
> 2. **비전 캡처 토큰 절감**: 매 프레임마다 전체 화면을 전송하지 말고 델타(Delta) 캡처를 적용하여 토큰 비용을 60% 절감하세요.

---

### 4. 🔬 심층 알고리즘 및 작동 원리 분석 (Lilian Weng / Lil'Log 스타일)
Computer Use 2.0의 핵심은 **Vision-Language-Action (VLA)** 멀티모달 그라운딩 알고리즘입니다. 
1. **Screen Co-ordinate Mapping**: 1920x1080 화면을 1000x1000 정규화 그리드 좌표계로 변환하여 클릭 오차를 ±2px 이내로 제어합니다.
2. **Self-Correction Feedback Loop**: 마우스 클릭 후 화면 변화가 없을 경우, 에이전트가 오버레이 팝업이나 로딩 상태를 인식하고 차순위 조작(Press Tab, Scroll Down)을 시도합니다.

---

### 5. 🎯 실무 적용 핵심 체크리스트 (Actionable Checklist)

#### 🚀 컴퓨터 조작 에이전트 이식 및 보안 통제
* **Computer Use SDK 도입**: Anthropic 공식 SDK를 백엔드 워크플로우에 이식하여 GUI 조작 자동화 구축.
* **Human-in-the-loop 승인 가드레일**: 금융 결제, 민감 데이터 변경 시 사용자 모달 승인 가드레일 필수 적용.
* **비전 캡처 토큰 최적화**: 화면 캡처 토큰 소비 절감을 위해 델타 프레임(Delta Frame) 변경 감지 적용.
* **IAM 세션 격리**: 에이전트 전용 격리 브라우저 인스턴스를 부여하여 사내 보안 유출 차단.
"""

SAMPLE_2_BLOG = """# 📌 [Super Hybrid Report] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 및 벤치마크 리포트

> **주요 출처**: DeepSeek AI Lab | **카테고리**: 최신 논문 & 학계 | **검증**: ✅ Multi-Source Cross-Validated | **특집**: 🎨 시각화 + 💻 코드 + 💼 Executive + 🔬 Deep-Dive

---

### 1. ⚡ 60초 Executive Summary & Why This Matters (The Pragmatic Engineer & The Batch 스타일)
DeepSeek 팀이 오픈소스로 공개한 **DeepSeek R1 및 V3** 모델은 총 671B 파라미터 중 파스당 37B만 활성화하는 **DeepSeekMoE 아키텍처**와 감독 학습(SFT) 없이 오직 자율 강화학습(RL)만으로 복잡 추론 능력을 극대화한 혁신적 추론 엔진입니다.

> 💡 **Why This Matters (산업 파급력)**: OpenAI o1 급 최고 성능의 추론 능력을 **1/27 가격 (OpenAI o1 대비 96% 비용 절감)**으로 이용할 수 있어 사내 인프라 TCO를 획기적으로 절감할 수 있습니다.

---

### 2. 🎨 단계별 시스템 아키텍처 & Evolving Data Flow (ByteByteGo & Jay Alammar 스타일)

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

#### 🔍 추론 프론티어 모델 비교표 (Pros vs Cons vs Best For)

| 모델명 | 주요 장점 (Pros) | 한계점 (Cons) | 1M 토큰당 가격 (Input/Output) |
| :--- | :--- | :--- | :--- |
| **DeepSeek R1 (671B MoE)** | **SOTA 성능, 96% 비용 절감, 온프레미스 지원** | 8x H800 GPU 노드 최소 필요 | **$0.55 / $2.19** |
| **OpenAI o1** | 고난도 논리 추론 최고 수준 | 비용 최고가, 클라우드 전용 | $15.00 / $60.00 |
| **Claude 3.7 Sonnet** | 실무 코딩 SWE-Bench 70.3% 1위 | Thinking 사용 시 토큰 소비 증가 | $3.00 / $15.00 |

#### 📊 1M 토큰 당 API 비용 비교
[CHART:bar|API Input Price per 1M Tokens ($)|DeepSeek R1:0.55|Claude 3.7 Sonnet:3.00|OpenAI o1:15.00|GPT-4o:2.50]

---

### 3. 💻 원클릭 SDK 연동 코드 & 프로덕션 서빙 가이던스 (HuggingFace & Chip Huyen 스타일)

사내 서버에서 OpenAI 호환 API로 DeepSeek R1 고속 추론 서빙을 호출하는 cURL 및 Python 코드입니다.

```bash
# OpenAI API 호환 cURL 파이프라인 호출
curl https://api.deepseek.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_DEEPSEEK_API_KEY" \
  -d '{
    "model": "deepseek-reasoner",
    "messages": [
      {"role": "system", "content": "너는 사내 시스템 아키텍트이다."},
      {"role": "user", "content": "PostgreSQL 1M TPS 조회를 위한 파티셔닝 전략을 수립해라."}
    ],
    "thinking_budget": 2048
  }'
```

```python
from openai import OpenAI

client = OpenAI(api_key="YOUR_DEEPSEEK_API_KEY", base_url="https://api.deepseek.com/v1")

response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=[{"role": "user", "content": "복잡한 알고리즘 문제 해결 전략"}]
)

# R1의 사고 과정(Thinking process)과 최종 답변 분리 출력
print("=== Thinking Process ===")
print(response.choices[0].message.reasoning_content)
print("\n=== Final Answer ===")
print(response.choices[0].message.content)
```

> 🛡️ **Production Guardrail Warning (실무 주의사항)**:
> 1. **vLLM FP8 Quantization**: 8x H800 GPU 노드 배치 시 Tensor Parallelism(TP=8)과 Expert Parallelism(EP) 커널을 함께 설정하세요.
> 2. **Reasoning Content 파싱**: 유저 UI 노출 시 사고 과정(`reasoning_content`)은 접기/펼치기 Accordion UI로 배치하여 읽기 불편함을 예방하세요.

---

### 4. 🔬 심층 알고리즘 및 GRPO 보상 원리 분석 (Lilian Weng / Lil'Log 스타일)
DeepSeek R1 학습의 핵심 혁신은 기존 PPO(Proximal Policy Optimization) 학습에서 필요했던 **Critic(가치 평가) 모델을 제거하고 Group Relative Policy Optimization (GRPO)**를 적용한 것입니다.
* **수학적 보상 식**: 그룹 내 $Q$개 샘플 답변의 평균 보상 $\bar{R}$과 표준편차 $\sigma_R$을 기준으로 상대적 이점(Advantage) $A_i = \frac{R_i - \bar{R}}{\sigma_R}$을 직접 구하여 학습 가중치를 업데이트합니다.

---

### 5. 🎯 실무 적용 핵심 체크리스트 (Actionable Checklist)

#### 🚀 추론 엔진 서빙 및 TCO 최적화
* **vLLM / SGLang FP8 파이프라인**: DeepSeekMoE 전용 텐서 병렬화(TP=8) 및 EP(Expert Parallelism) 커널 적용.
* **Thinking Budget 인터페이스**: 응답 속도와 추론 깊이 사이의 밸런스를 조절하는 유저 선택 UI 구성.
* **GRPO 보상 모델 커스텀**: 사내 코딩 및 보안 지침 준수 여부를 평가하는 자체 보상 엔진 설계.
* **온프레미스 사내망 이식**: 고비용 상용 API 대신 망분리 환경 내 671B MoE 서빙으로 월 TCO 80% 절감.
"""

SAMPLE_3_BLOG = """# 📌 [Super Hybrid Report] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 리포트

> **주요 출처**: W3C Web Architecture | **카테고리**: IT 매체 | **검증**: ✅ Multi-Source Cross-Validated | **특집**: 🎨 시각화 + 💻 코드 + 💼 Executive + 🔬 Deep-Dive

---

### 1. ⚡ 60초 Executive Summary & Why This Matters (The Pragmatic Engineer & The Batch 스타일)
월드와이드웹(W3C) 창시자 팀 버너스 리(Tim Berners-Lee)의 명작 기술 가이드라인 **"Cool URIs don't change(좋은 URI는 변경되지 않는다)"**를 최신 웹 아키텍처 관점에서 심층 분석했습니다. 10년, 20년이 지나도 깨지지 않는(Dangling Link 없는) **영구적 웹 URI 설계 원칙과 디커플링 아키텍처**를 제시합니다.

> 💡 **Why This Matters (산업 파급력)**: 무분별한 URL 변경으로 인한 **SEO 검색엔진 순위 하락 및 68%의 링크 파손율(Link Rot)**을 예방하고 사내 디지털 웹 자산 가치를 영구적으로 보존할 수 있습니다.

---

### 2. 🎨 단계별 시스템 아키텍처 & Evolving Data Flow (ByteByteGo & Jay Alammar 스타일)

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

#### 🔍 안 좋은 URI 패턴 vs 영구적 Cool URI 설계 패턴 비교

| 구분 | 나쁜 URI 패턴 (Bad Practice) | 영구적 Cool URI 패턴 (Best Practice) | 이유 및 개선 효과 |
| :--- | :--- | :--- | :--- |
| **기술 스택 노출** | `/page.php`, `/index.asp`, `/cgi-bin/` | `/docs/guidelines`, `/articles/123` | 백엔드 언어 변경 시 주소가 파손되지 않음 |
| **날짜/버전 과도 포함**| `/2026/08/10/article.html` | `/articles/cool-uris-architecture` | 콘텐츠 카테고리 재편 시 지속성 유지 |
| **DB PK 및 내부 경로**| `/servlet/db/item_v2_final.jsp?id=99` | `/products/wireless-keyboard` | DB 스키마 리팩토링 시 외부에 영향을 주지 않음 |
| **조직/부서명 포함**| `/marketing/reports/2026` | `/reports/2026` | 회사 조직 개편이나 부서 통합 시 링크 유지 |

#### 📊 5년 경과 후 깨진 링크 비율(Link Rot) 비교
[CHART:bar|Link Rot Rate over 5 Years (%)|Unstructured Legacy URIs:68%|Restructured V2 URIs:42%|W3C Permanent Cool URIs:3%]

---

### 3. 💻 원클릭 Nginx & Cloudflare 리버스 프록시 연동 코드 (HuggingFace & Chip Huyen 스타일)

백엔드 기술 스택 변경 시에도 외부 URI 주소를 원형 그대로 유지해 주는 Nginx 리버스 프록시 설정 스니펫입니다.

```nginx
# W3C Permanent URI Decoupling Proxy Configuration
server {
    listen 80;
    server_name example.com;

    # 외부 노출 영구 URI 라우트
    location /docs/api-guidelines {
        # 백엔드 기술 스택이 PHP -> Node.js -> Python으로 변경되어도 
        # 외부 클라이언트는 오직 /docs/api-guidelines 주소만 바라봅니다.
        proxy_pass http://internal-microservice-cluster:8000/v3/guidelines;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 레거시 URL 301 영구 리디렉션
    location ~ ^/page\.php$ {
        return 301 https://$host/docs/api-guidelines;
    }
}
```

> 🛡️ **Production Guardrail Warning (실무 주의사항)**:
> 1. **301 vs 302 Redirection**: 주소 변경 시 반드시 SEO 백링크 자산 점수를 100% 승계받도록 302(임시)가 아닌 `301 Permanent Redirect` 헤더를 응답하세요.
> 2. **Canonical Tag 명시**: 동일 콘텐츠가 여러 주소로 조회될 수 있는 경우 HTML `<link rel="canonical" href="...">` 태그를 필수 선언하세요.

---

### 4. 🔬 심층 웹 아키텍처 디커플링 원리 분석 (Lilian Weng / Lil'Log 스타일)
W3C 영구 URI 원칙의 핵심 수학적 개념은 **URI의 지속성(Persistence)은 웹 기술이 아니라 인간 조직과 시스템의 디커플링 관리 설계**에 종속된다는 점입니다.
* **Resource vs Representation**: URI는 물리적 파일이 아닌 '추상적 자원(Resource)'을 지목해야 하며, 내부 구현체(HTML, JSON, PDF)는 HTTP Accept Content Negotiation 헤더로 분리하여 다뤄야 합니다.

---

### 5. 🎯 실무 적용 핵심 체크리스트 (Actionable Checklist)

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
                "title": "[Super Hybrid Report] Anthropic, 자율 멀티에이전트 Computer Use 및 Agentic Tooling 2.0 파이프라인 발표",
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
                "title": "[Super Hybrid Report] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 및 벤치마크 분석",
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
                "title": "[Super Hybrid Report] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 리포트",
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
                    "developer": "Nginx/Cloudflare Edge Worker를 적용하여 외부 영구 URI 주소와 내부 백엔드 파일/기술 스택을 분리하세요.",
                    "pm": "콘텐츠 URL 설계 시 날짜나 부서명 대신 영구 식별자 Slug 방식을 서비스 표준으로 채택하세요.",
                    "business": "SEO 검색엔진 순위 유지 및 68%의 깨진 링크 발생 방지를 통해 브랜드 웹 자산 가치를 유지하세요.",
                    "researcher": "HTTP Content Negotiation 메커니즘을 적용하여 자원의 식별자와 표상(Representation)을 분리하는 원리를 연구하세요."
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
        print("✅ Super Hybrid 4-in-1 sample articles populated successfully!")
    except Exception as e:
        print(f"❌ Error creating sample articles: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_articles()
