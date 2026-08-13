import sys, os, asyncio
sys.path.append(os.path.abspath('.'))

from app.news_pipeline import run_batch_job, fetch_articles_from_db

async def main():
    print("🚀 [Multi-Source Synthesis Batch] Starting automated clustering & synthesis batch pipeline...")
    articles = await run_batch_job(force=True)
    
    synthesized = [a for a in articles if getattr(a, 'is_synthesized', False)]
    print(f"\n✅ Batch Execution Complete!")
    print(f" Total articles in DB: {len(articles)}")
    print(f" 🔮 Multi-Source Synthesized Master Blogs: {len(synthesized)}")

    for i, s in enumerate(synthesized, 1):
        print(f"\n--- [Synthesized Blog #{i}] ---")
        print(f" Title: {s.title}")
        print(f" Sources ({len(s.multi_sources or [])}): {[src.get('name') for src in (s.multi_sources or [])]}")
        print(f" Category: {s.category}")
        print(f" Impact Score: {s.impact_score}")

if __name__ == "__main__":
    asyncio.run(main())
