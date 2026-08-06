import os
import sys

# 백엔드 루트 디렉토리를 파이썬 모듈 검색 경로에 추가
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.news_pipeline import route_template_type, find_related_cross_context, auto_translate_and_format

def main():
    print("=== 1. 4대 전문 기술 블로그 템플릿 라우팅 테스트 ===")
    
    t_sota = route_template_type("DeepSeek R1 SOTA Paper Benchmarks", "MMLU-Pro GPQA reasoning", "빅테크 공식")
    print(f"SOTA Paper -> Template: {t_sota} (Expected: sota_research)")
    assert t_sota == "sota_research", "SOTA Routing Failed"

    t_agent = route_template_type("Anthropic Computer Use Agentic SDK", "browser automation workflow tool call", "빅테크 공식")
    print(f"Agent SDK -> Template: {t_agent} (Expected: agent_sdk)")
    assert t_agent == "agent_sdk", "Agent SDK Routing Failed"

    t_tco = route_template_type("AWS Bedrock Nova Pro GPU TCO", "vllm hosting cost VRAM IAM security", "빅테크 공식")
    print(f"Enterprise TCO -> Template: {t_tco} (Expected: enterprise_tco)")
    assert t_tco == "enterprise_tco", "Enterprise TCO Routing Failed"

    t_issue = route_template_type("OpenAI Cyber Security Community Discussion", "industry trends tech news", "빅테크 공식")
    print(f"Community Issue -> Template: {t_issue} (Expected: community_issue)")
    assert t_issue == "community_issue", "Community Issue Routing Failed"

    print("\n=== 2. Multi-Source Cross-Validation 융합 렌더링 테스트 ===")
    title_kr, bullets, blog_summary = auto_translate_and_format(
        "Anthropic Computer Use Agentic Tooling Framework",
        "Anthropic announced a new agentic framework for browser automation and tool use with human in the loop safety.",
        "Anthropic News",
        "빅테크 공식"
    )

    print(f"Generated Title: {title_kr}")
    print(f"Bullets Count: {len(bullets)}")
    print(f"Blog Summary Length: {len(blog_summary)} chars")
    print("Contains Cross-Validation Box:", "Multi-Source Verified" in blog_summary)
    print("Contains Agent SDK Template Header:", "[Agent SDK]" in blog_summary)

    assert len(blog_summary) >= 1500, "Blog summary length insufficient"
    assert "Multi-Source Verified" in blog_summary, "Cross validation badge missing"

    print("\n✅ ALL MULTI-SOURCE CROSS-VALIDATION & TEMPLATE CHECKS PASSED PERFECTLY!")

if __name__ == "__main__":
    main()
