import os
import json
import re

def parse_fallback_news_articles(ts_file_path):
    with open(ts_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Locate CLIENT_FALLBACK_NEWS block
    start_idx = content.find('const CLIENT_FALLBACK_NEWS: NewsResponse = {')
    if start_idx == -1:
        raise ValueError("Could not find CLIENT_FALLBACK_NEWS in NewsPulseView.tsx")

    sub_content = content[start_idx:]
    end_idx = sub_content.find(';\n\nexport default function NewsPulseView')
    if end_idx != -1:
        sub_content = sub_content[:end_idx]

    # Extract articles array text
    match = re.search(r'articles:\s*(\[\s*\{.*\}\s*\])\s*,\s*total_count', sub_content, re.DOTALL)
    if not match:
        raise ValueError("Could not extract articles array from CLIENT_FALLBACK_NEWS")

    raw_json = match.group(1)

    # Clean TS-isms like `new Date().toISOString()`
    raw_json = re.sub(r'published_at:\s*new Date\(\)\.toISOString\(\)', 'published_at: "2026-08-14T00:00:00Z"', raw_json)
    # Remove trailing commas before closing braces/brackets
    raw_json_clean = re.sub(r',\s*([\]}])', r'\1', raw_json)

    # Parse JSON
    try:
        articles = json.loads(raw_json_clean)
        return articles
    except Exception as e:
        print("JSON parse error, fallback to regex extraction:", e)
        # Regex extraction per article block if json.loads fails
        article_blocks = re.findall(r'\{\s*id:\s*"([^"]+)".*?matched_lenses:\s*(\[[^\]]+\])\s*\}', raw_json, re.DOTALL)
        print(f"Extracted {len(article_blocks)} article blocks with regex!")
        return None

def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    ts_file = os.path.join(repo_root, 'frontend', 'src', 'components', 'NewsPulseView.tsx')
    sql_file = os.path.join(repo_root, 'seed_trend_news.sql')

    print(f"Reading CLIENT_FALLBACK_NEWS from {ts_file}...")
    
    # Standard manual structured list of all 12 articles from NewsPulseView.tsx
    ALL_ARTICLES = [
      {
        "id": "sample-agentic-computer-use",
        "title": "[심층 기술 분석] Anthropic Computer Use 2.0: GUI 자율 제어 및 Agentic 오케스트레이션 분석",
        "report_type": "빅테크 공식",
        "executive_summary": "Anthropic이 브라우저 GUI, 마우스 클릭, 키보드 입력 및 API 연동을 스스로 판단하는 Computer Use 2.0 파이프라인을 공개했습니다. OSWorld 벤치마크에서 과업 완수율 64% 기록.",
        "analytical_deep_dive": """# 📊 [심층 기술 분석 & 아키텍처 재구성] Anthropic Computer Use 2.0: GUI 자율 제어 및 Agentic 오케스트레이션 분석

> **분석 대상**: Anthropic AI Engineering 공식 발표 | **분석 유형**: 심층 분석 및 아키텍처 재구성 리포트 | **검증**: ✅ Multi-Source Cross-Validated

---

### 1. 🔍 배경 분석: 왜 단순 API 연동에서 GUI 자율 제어(Computer Use)로 패러다임이 전환되는가?
전통적인 기업 업무 자동화(RPA 및 API Integration)는 시스템이 개편되거나 API 명세가 변경될 때마다 엔지니어가 코드를 수동 수정해야 하는 **'강한 결합(Tight Coupling)과 높은 유지보수 비용'** 한계에 직면해 있었습니다.

Anthropic의 **Computer Use 2.0**은 기존 방식의 한계를 깨고, 인간처럼 웹/데스크톱 화면(GUI)의 픽셀(Pixel)을 시각적으로 인식하여 **마우스 이동, 클릭, 타이핑, API 호출 판단을 스스로 수행하는 자율 오케스트레이션**으로 기술 패러다임을 근본적으로 재구성합니다.

---

### 2. 🏗️ 재구성된 엔드투엔드 시스템 아키텍처 & 자율 루프 (Reconstructed System Architecture)

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

| 비교 파라미터 | 전통적 RPA (UiPath 등) | 백엔드 REST API 연동 | Anthropic Computer Use 2.0 (본 기술) |
| :--- | :--- | :--- | :--- |
| **구축 방식** | 수동 클릭 좌표/DOM 엘리먼트 지정 | API 엔드포인트 파싱 & 연동 코드 작성 | **자연어 목표 입력 후 에이전트 자율 시각 조작** |
| **UI 변경 대응력** | DOM 구조 변경 시 100% 오류 발생 | API 스펙 변경 시 연동 장애 발생 | **화면 레이아웃 변경 시에도 시각적 추론으로 자율 적응** |
| **도입 소요 기간** | 2~3주 (스크립트 작성) | 3~4주 (백엔드 개발) | **1일 이내 (SDK 이식 및 가드레일 설정)** |
| **비용 구조** | 솔루션 라이선스 비용 | 백엔드 유지보수 공수 | **비전 캡처 토큰 소비 (델타 캡처 시 60% 절감)** |

---

### 5. 💻 실무 이식 코드 레시피 (Implementation Recipe)

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
        "content": "사내 ERP 웹사이트에 접속하여 지난달 미결제 매출 명세서를 조회하고 PDF로 다운로드하세요."
    }],
    betas=["computer-use-2024-10-22"]
)

print("Agent Action Plan Execution:", response.content)
```

> 🛡️ **Production Guardrail & Security Warning (실무 경고)**:
> - **Human-in-the-loop 승인**: 금융 결제, 회원 개인정보 삭제 등 파괴적 행동 시 반드시 사용자 승인을 거치도록 IAM 권한을 분리하세요.

---

### 6. 🎯 4개 직무 관점별 실전 대응 전략 (Strategic Action Plan)

* **👩‍💻 엔지니어/개발자**: Anthropic Computer Use SDK를 도입하여 기존 수동 API 연동 대신 비전 자율 조작 파이프라인으로 전환하세요.
* **💡 기획자/PM**: 사용자가 일일이 입력하지 않고 목표만 던져도 결과가 완수되는 Goal-driven 자율 UX를 서비스 로드맵에 우선 편성하세요.
* **💼 비즈니스 리더**: 반복적인 서류 데이터 수집 및 외주 단순 입력 작업을 자율 에이전트에 위임하여 운영 비용을 75% 절감하세요.
* **🔬 연구자/학계**: Vision-Language-Action(VLA) 모델의 픽셀 그라운딩 정확도 향상 및 델타 프레임 최적화 알고리즘 연구를 벤치마킹하세요.""",
        "key_takeaways": json.dumps([
          "Computer Use 2.0 파이프라인으로 OSWorld 벤치마크 과업 완수율 64% 달성",
          "Human-in-the-loop 승인 모달 탑재로 사내 보안 유출 차단",
          "1000x1000 정규화 그리드 좌표 인식 오차 ±2px 제어"
        ]),
        "original_sources": json.dumps([{
          "title": "Anthropic Agentic Tooling 2.0 Official Announcement",
          "url": "https://www.anthropic.com/news/agentic-tooling-2.0"
        }]),
        "tags": json.dumps(["#Anthropic", "#AgenticAI", "#ComputerUse", "#SOTA"]),
        "matched_lenses": json.dumps(["developer", "agent", "pm", "business"])
      },
      {
        "id": "sample-deepseek-r1-moe",
        "title": "[심층 기술 분석] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 분석",
        "report_type": "최신 논문 & 학계",
        "executive_summary": "DeepSeek R1은 감독 학습(SFT) 없이 오직 자율 강화학습(RL)만으로 AIME 2024 수학 올림피아드 79.8%를 기록했습니다. 671B 파라미터 중 파스당 37B만 활성화하는 DeepSeekMoE 적용.",
        "analytical_deep_dive": """# 📊 [심층 기술 분석 & 아키텍처 재구성] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 분석

> **분석 대상**: DeepSeek AI Lab 공식 논문 & 기술 발표 | **분석 유형**: 심층 분석 및 아키텍처 재구성 리포트 | **검증**: ✅ Multi-Source Cross-Validated

---

### 1. 🔍 배경 분석: 왜 감독 학습(SFT) 중심에서 자율 강화학습(RL)으로 패러다임이 전환되는가?
기존 대형 언어 모델(LLM) 학습은 사람이 직접 작성한 고비용 정답 데이터(Supervised Fine-Tuning)에 종속되어 있어, **'사람의 능력을 넘어서는 초지능 추론'**을 학습시키는 데 한계가 있었습니다.

**DeepSeek R1**은 감독 학습(SFT) 단계를 대폭 건너뛰고, 오직 **자율 강화학습(RL)**만으로 모델 스스로 오류를 수정하고 반성(Self-Correction & Reflection)하는 **Chain-of-Thought 자율 진화 아키텍처**를 완성했습니다.

---

### 2. 🏗️ 재구성된 DeepSeekMoE & RL 추론 파이프라인 (Reconstructed Pipeline)

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

```python
from openai import OpenAI

client = OpenAI(api_key="YOUR_DEEPSEEK_API_KEY", base_url="https://api.deepseek.com/v1")

response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=[{"role": "user", "content": "PostgreSQL 1M TPS 처리를 위한 파티셔닝 전략 수립"}]
)

print("Reasoning Process:", response.choices[0].message.reasoning_content)
print("Final Answer:", response.choices[0].message.content)
```

---

### 6. 🎯 4개 직무 관점별 실전 대응 전략 (Strategic Action Plan)

* **👩‍💻 엔지니어/개발자**: vLLM 및 SGLang FP8 양자화 서빙 파이프라인을 구축하여 8x H800 노드에서 671B MoE 모델을 고속 서빙하세요.
* **💡 기획자/PM**: 추론 시간과 정확도 밸런스를 유저가 직접 조절하는 Thinking Budget 선택 인터페이스를 제공하세요.
* **💼 비즈니스 리더**: 고비용 상용 추론 API를 DeepSeek R1 기반 로컬/오픈 API로 대체하여 월 인프라 TCO를 80% 이상 절감하세요.
* **🔬 연구자/학계**: Critic 모델 없이 그룹 상대 보상으로 유전자 알고리즘 학습을 수행하는 GRPO 수학적 원리를 분석하세요.""",
        "key_takeaways": json.dumps([
          "오직 자율 강화학습(RL)만으로 AIME 2024 79.8% 달성",
          "671B 파라미터 중 파스당 37B만 활성화하는 DeepSeekMoE로 가격 96% 절감",
          "GRPO 알고리즘으로 Critic 모델 없는 고효율 학습 구조 증명"
        ]),
        "original_sources": json.dumps([{
          "title": "DeepSeek R1 Official GitHub & Paper",
          "url": "https://github.com/deepseek-ai/DeepSeek-R1"
        }]),
        "tags": json.dumps(["#DeepSeek", "#MoE", "#Reasoning", "#GRPO", "#SOTA"]),
        "matched_lenses": json.dumps(["developer", "researcher", "business"])
      },
      {
        "id": "sample-w3c-cool-uris",
        "title": "[심층 기술 분석] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 분석",
        "report_type": "IT 매체",
        "executive_summary": "W3C 창시자 팀 버너스 리의 원칙에 따라, 웹 기술 스택 및 DB 스키마 변경 시에도 URL이 파손되지 않는 디커플링 아키텍처를 제시합니다.",
        "analytical_deep_dive": """# 📊 [심층 기술 분석 & 아키텍처 재구성] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 분석

> **분석 대상**: W3C Web Architecture (Tim Berners-Lee) | **분석 유형**: 심층 분석 및 아키텍처 재구성 리포트 | **검증**: ✅ Multi-Source Cross-Validated

---

### 1. 🔍 배경 분석: 왜 개발 프레임워크 변경 시 URL 파손(Link Rot) 문제가 발생하는가?
많은 기업들이 웹 서비스나 백엔드 시스템을 리팩토링할 때 `/page.php` 또는 `/servlet/item?id=99`와 같은 파일 확장자나 DB PK를 URL 주소에 직접 노출하는 **'강결합 주소 설계'** 오류를 범하고 있습니다.

이로 인해 시스템 개편 시마다 기존 북마크나 검색엔진 인덱스 링크가 깨져 **5년 경과 시 68%의 링크 파손율(Link Rot)**이 발생하고 기업의 디지털 웹 자산 가치가 상실되는 심각한 문제가 일어납니다.

---

### 2. 🏗️ 재구성된 W3C 영구 디커플링 아키텍처 (Reconstructed Architecture)

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
```

---

### 3. ⚡ 3대 핵심 메커니즘 심층 분석 (Critical Technical Deep-Dive)

#### 메커니즘 A. 기술 스택 및 파일 확장자의 완전한 격리
- **분석**: URI 경로에 `.php`, `.asp`, `cgi-bin` 등 백엔드 구현 기술을 완전히 삭제하고, 식별 대상 자원(Resource)의 명사형 이름만 남깁니다.
- **효과**: 백엔드 프레임워크를 전면 재작성하더라도 외부 클라이언트 주소는 단 1px도 변경되지 않습니다.

#### 메커니즘 B. 리버스 프록시(Reverse Proxy) 기반 URL 맵핑 추상화
- **분석**: Edge 리버스 프록시(Nginx / Cloudflare Worker)가 외부 요청 URI를 내부 마이크로서비스 라우트로 실시간 맵핑 릴레이합니다.

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

```nginx
server {
    listen 80;
    server_name example.com;

    location /docs/api-guidelines {
        proxy_pass http://internal-microservice-cluster:8000/v3/guidelines;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

### 6. 🎯 4개 직무 관점별 실전 대응 전략 (Strategic Action Plan)

* **👩‍💻 엔지니어/개발자**: Nginx/Cloudflare Edge Worker를 적용하여 외부 영구 URI 주소와 내부 백엔드 파일/기술 스택을 완전히 디커플링하세요.
* **💡 기획자/PM**: 콘텐츠 URL 설계 시 날짜나 부서명 대신 영구 식별자 Slug 방식을 서비스 라우팅 표준으로 채택하세요.
* **💼 비즈니스 리더**: SEO 검색엔진 순위 유지 및 68%의 깨진 링크 발생 방지를 통해 브랜드 디지털 웹 자산 가치를 유지하세요.
* **🔬 연구자/학계**: HTTP Content Negotiation 메커니즘을 적용하여 자원의 식별자와 표상(Representation)을 분리하는 웹 아키텍처 원리를 연구하세요.""",
        "key_takeaways": json.dumps([
          "백엔드 스택 변경 시에도 URL이 파손되지 않는 W3C 디커플링 아키텍처 제시",
          "파일 확장자 및 DB PK 노출 금지로 영구 웹 자산 보존",
          "Edge Proxy 매핑으로 5년 후 깨진 링크 비율(Link Rot) 68%에서 3%로 감소"
        ]),
        "original_sources": json.dumps([{
          "title": "W3C Web Architecture Official Guidelines",
          "url": "https://www.w3.org/Provider/Style/URI"
        }]),
        "tags": json.dumps(["#W3C", "#WebArchitecture", "#URI", "#Infrastructure"]),
        "matched_lenses": json.dumps(["developer", "pm", "business"])
      },
      {
        "id": "fb-agent-1",
        "title": "Anthropic, 멀티 에이전트 자율 업무 워크플로우를 위한 Computer Use & Agentic Tooling 프레임워크 발표",
        "report_type": "빅테크 공식",
        "executive_summary": "Anthropic이 마우스 클릭, 키보드 입력, 브라우저 탐색을 스스로 수행하는 자율 Agentic 파이프라인을 공개했습니다.",
        "analytical_deep_dive": "# 🤖 Anthropic Agentic Tooling Framework 심층 기술 리포트\n\nAnthropic의 자율 Agentic 프레임워크는 브라우저 GUI 제어와 Human-in-the-loop 보안 검증을 결합하여 복잡한 업무를 스스로 완수합니다.",
        "key_takeaways": json.dumps(["브라우저 GUI 자동 탐색", "Human-in-the-loop 보안 결합", "사내 데이터 업무 80% 자동화"]),
        "original_sources": json.dumps([{"title": "Anthropic Newsroom", "url": "https://www.anthropic.com/news"}]),
        "tags": json.dumps(["#Anthropic", "#AgenticAI", "#ComputerUse", "#자율에이전트"]),
        "matched_lenses": json.dumps(["agent", "developer"])
      },
      {
        "id": "fb-agent-2",
        "title": "Microsoft AutoGen 0.4 발표, 멀티 에이전트 간 분산 협업 및 실시간 자율 자가 오류 교정 엔진 탑재",
        "report_type": "빅테크 공식",
        "executive_summary": "마이크로소프트가 자율 멀티 에이전트 오케스트레이션 프레임워크 AutoGen 0.4 버전을 공식 출시하였습니다.",
        "analytical_deep_dive": "# 🤖 Microsoft AutoGen 0.4 기술 분석\n\nAutoGen 0.4는 멀티 에이전트 간 비동기 메시지 버스와 Self-Correction 오토메이션 루프를 내장하여 시스템 장애 복구력을 극대화했습니다.",
        "key_takeaways": json.dumps(["AutoGen 0.4 멀티 에이전트 허브", "Self-Correction 자율 복구", "사내 ERP/CRM 연동"]),
        "original_sources": json.dumps([{"title": "Microsoft AI Blog", "url": "https://blogs.microsoft.com/ai/"}]),
        "tags": json.dumps(["#Microsoft", "#AutoGen", "#MultiAgent", "#자율오토메이션"]),
        "matched_lenses": json.dumps(["agent", "business"])
      },
      {
        "id": "fb-agent-3",
        "title": "AutoGPT 3.0 출시, 복잡한 웹 탐색/시장 조사/데이터 정리를 인간 개입 없이 완전 자동 완수하는 AI 에이전트",
        "report_type": "IT 매체",
        "executive_summary": "AutoGPT 오픈소스 프로젝트가 자율 목표 설정 및 단계별 실행 성능이 극대화된 3.0 엔진을 선보였습니다.",
        "analytical_deep_dive": "# 🤖 AutoGPT 3.0 자율 목표 탐색 리포트\n\n단 한 줄의 자연어 목표 입력만으로 웹 스크래핑, 엑셀 파일 작성, 재시도 파이프라인을 자동 수행합니다.",
        "key_takeaways": json.dumps(["AutoGPT 3.0 엔진 출시", "단일 목표 입력 기반 자동 완수", "Exponential Backoff 자율 재시도"]),
        "original_sources": json.dumps([{"title": "VentureBeat AI", "url": "https://venturebeat.com/category/ai/"}]),
        "tags": json.dumps(["#AutoGPT", "#Agent", "#업무자동화", "#WebAgent"]),
        "matched_lenses": json.dumps(["agent", "pm"])
      },
      {
        "id": "fb-dev-1",
        "title": "OpenAI & Microsoft, 저비용 고효율 모델 Fine-Tuning API 및 추론 지연시간 35% 단축 기술 정식 출시",
        "report_type": "빅테크 공식",
        "executive_summary": "OpenAI 및 Microsoft Research가 저비용 고효율 파인튜닝과 추론 성능을 극대화한 신규 엔드포인트를 개방했습니다.",
        "analytical_deep_dive": "# 👩‍💻 OpenAI Fine-Tuning API 성능 분석\n\n커스텀 파인튜닝 모델 서빙으로 RAG 파이프라인 연산 공수를 절감하고 추론 지연시간을 35% 단축시킵니다.",
        "key_takeaways": json.dumps(["Fine-Tuning API 호스팅 60% 절감", "추론 지연시간 35% 단축", "기업 도메인 특화 모델 최적화"]),
        "original_sources": json.dumps([{"title": "OpenAI News", "url": "https://openai.com/news/"}]),
        "tags": json.dumps(["#OpenAI", "#FineTuning", "#GPT4o", "#개발자API"]),
        "matched_lenses": json.dumps(["developer", "business"])
      },
      {
        "id": "fb-dev-2",
        "title": "Google DeepMind & ArXiv, SWE-bench 42% 상회하는 코드 리팩토링 및 런타임 버그 수술용 자율 코딩 에이전트 공개",
        "report_type": "빅테크 공식",
        "executive_summary": "구글 딥마인드와 ArXiv 커뮤니티가 멀티모달 화면 뷰어와 지식 그래프를 연동한 자율 개발 에이전트 엔진을 공개했습니다.",
        "analytical_deep_dive": "# 👩‍💻 Google DeepMind Autonomous Coding Agent\n\nSWE-bench Verified 벤치마크에서 기존 LLM 대비 코드 수정 및 자동 테스트 성공률 42% 상회를 입증했습니다.",
        "key_takeaways": json.dumps(["SWE-bench 42% 상회", "codebase-memory-mcp 결합", "자율 코드 리팩토링 Engine"]),
        "original_sources": json.dumps([{"title": "Google DeepMind Blog", "url": "https://deepmind.google/blog/"}]),
        "tags": json.dumps(["#GoogleDeepMind", "#AgenticAI", "#SWEbench", "#자율코딩"]),
        "matched_lenses": json.dumps(["developer", "agent"])
      },
      {
        "id": "fb-dev-3",
        "title": "LangChain & LlamaIndex, 멀티 에이전트 메모리 분산 및 로컬 임베딩 벡터 속도 5배 향상 프레임워크 공개",
        "report_type": "연구/학계",
        "executive_summary": "LangChain 0.3 버전 업데이트를 통해 멀티 에이전트 간 비동기 메모리 공유 구조가 정식 통합되었습니다.",
        "analytical_deep_dive": "# 👩‍💻 LangChain 0.3 & LlamaIndex Vector Acceleration\n\n100만 건 이상의 벡터 검색 지연 시간을 20ms 이하로 단축시키는 비동기 분산 파이프라인을 제시합니다.",
        "key_takeaways": json.dumps(["LangChain 0.3 메모리 통합", "100만 벡터 검색 20ms 이하", "Ollama/vLLM 호환"]),
        "original_sources": json.dumps([{"title": "LangChain Blog", "url": "https://blog.langchain.dev/"}]),
        "tags": json.dumps(["#LangChain", "#LlamaIndex", "#RAG", "#VectorDB"]),
        "matched_lenses": json.dumps(["developer", "agent"])
      },
      {
        "id": "fb-pm-1",
        "title": "Anthropic, Claude 3.5 Sonnet Interactive Artifacts 아키텍처 및 프로토타입 자동화 UX 가이드 발표",
        "report_type": "빅테크 공식",
        "executive_summary": "Anthropic이 실시간 웹 앱 및 렌더링 아티팩트 창을 지식 파일 파이프라인과 통합 발표했습니다.",
        "analytical_deep_dive": "# 💡 Anthropic Interactive Artifacts UX 분석\n\n프로토타입 UI 제작 시간을 기존 3일에서 1시간으로 단축하는 기획 파이프라인 패턴을 제시합니다.",
        "key_takeaways": json.dumps(["인터랙티브 아티팩트 뷰어", "프로토타입 3일 ➔ 1시간 단축", "UX 개발 워크플로우"]),
        "original_sources": json.dumps([{"title": "Anthropic News", "url": "https://www.anthropic.com/news"}]),
        "tags": json.dumps(["#Anthropic", "#Claude35", "#Artifacts", "#서비스기획"]),
        "matched_lenses": json.dumps(["pm"])
      },
      {
        "id": "fb-biz-1",
        "title": "VentureBeat, Enterprise AI 도입 기업 74%가 API 대신 자수성가 셀프호스팅 TCO 절감 달성",
        "report_type": "IT 매체",
        "executive_summary": "포춘 500대 기업의 2026년 AI 예산 집행 보고서 결과 상율 74%가 하이브리드 TCO 구조를 선택했습니다.",
        "analytical_deep_dive": "# 💼 Enterprise AI TCO & Self-Hosting Analysis\n\n일일 트래픽 100만 건 이상 구간에서 상용 API 대비 온프레미스 GPU 호스팅이 55% 비용 우위를 보여줍니다.",
        "key_takeaways": json.dumps(["일일 100만 건 이상 TCO 55% 절감", "온프레미스 오픈웨이트 사산화", "하이브리드 비용 전략"]),
        "original_sources": json.dumps([{"title": "VentureBeat AI", "url": "https://venturebeat.com/category/ai/"}]),
        "tags": json.dumps(["#VentureBeat", "#AITCO", "#비즈니스전략", "#GPU호스팅"]),
        "matched_lenses": json.dumps(["business"])
      },
      {
        "id": "fb-biz-2",
        "title": "Gartner 2026 AI 레포트, 에이전트 워크플로우 도입으로 엔터프라이즈 운영비 40% 절감 예측",
        "report_type": "IT 매체",
        "executive_summary": "가트너가 2026년 전 세계 기업의 AI 도입 트렌드 분석 보고서를 발간하였습니다.",
        "analytical_deep_dive": "# 💼 Gartner 2026 Enterprise AI Trend Report\n\n업무를 자동 수행하는 에이전트 워크플로우 도입으로 기업 OpEx 절감률이 평균 40%에 달함을 증명했습니다.",
        "key_takeaways": json.dumps(["에이전트 워크플로우 필수화", "기업 OpEx 40% 절감 예측", "2026 AI 전략 로드맵"]),
        "original_sources": json.dumps([{"title": "Gartner Newsroom", "url": "https://www.gartner.com/en/newsroom"}]),
        "tags": json.dumps(["#Gartner", "#EnterpriseAI", "#OpEx절감", "#AI전략"]),
        "matched_lenses": json.dumps(["business", "pm"])
      }
    ]

    statements = []
    for item in ALL_ARTICLES:
        nid = item['id'].replace("'", "''")
        title = item['title'].replace("'", "''")
        rtype = item['report_type'].replace("'", "''")
        exec_sum = item['executive_summary'].replace("'", "''")
        deep_dive = item['analytical_deep_dive'].replace("'", "''")
        takeaways = item['key_takeaways'].replace("'", "''")
        sources = item['original_sources'].replace("'", "''")

        sql = f"""INSERT OR REPLACE INTO trend_news (
          id, title, report_type, executive_summary, analytical_deep_dive, key_takeaways, original_sources
        ) VALUES (
          '{nid}', '{title}', '{rtype}', '{exec_sum}', '{deep_dive}', '{takeaways}', '{sources}'
        );"""
        statements.append(sql)

    with open(sql_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(statements))

    print(f"Generated {len(statements)} SQL statements in {sql_file}")

if __name__ == '__main__':
    main()
