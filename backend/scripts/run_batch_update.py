import os
import sys

# 백엔드 루트 디렉토리를 파이썬 모듈 검색 경로에 추가
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.news_pipeline import refresh_all_articles_in_db, fetch_articles_from_db

def main():
    print("🚀 [배치 실행] 4대 템플릿 & 크로스 검증 파이프라인으로 Neon DB 전체 기사 일괄 배치 가동...")
    
    # 파이프라인 일괄 배치 가동
    updated_count = refresh_all_articles_in_db()
    
    print(f"\n✅ [배치 완료] 총 {updated_count}개 기사가 4대 템플릿 및 크로스 검증 리포트로 Neon DB에 일괄 갱신되었습니다!")
    
    # 갱신된 샘플 기사 검증
    articles = fetch_articles_from_db()
    if articles:
        sample = articles[0]
        print(f"\n[샘플 갱신 기사 확인]")
        print(f"• 제목: {sample.title}")
        print(f"• 출처: {sample.source_name}")
        print(f"• 카테고리: {sample.category}")
        print(f"• 리포트 크기: {len(sample.blog_summary)}자")
        print(f"• 템플릿 포함 여부: {any(h in sample.blog_summary for h in ['[SOTA Research]', '[Agent SDK]', '[Enterprise TCO]', '[Community Trend]'])}")
        print(f"• Multi-Source Cross-Validated 포함 여부: {'Multi-Source Cross-Validated' in sample.blog_summary}")
        header = [l for l in sample.blog_summary.split('\n') if '주요 출처' in l]
        print(f"• 출처 헤더: {header[0] if header else 'NOT FOUND'}")


if __name__ == "__main__":
    main()
