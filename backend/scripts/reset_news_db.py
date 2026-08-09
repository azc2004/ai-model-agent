import asyncio
from app.database import SessionLocal
from app.db_models import NewsArticleDB
from app.news_pipeline import run_batch_job, _news_cache

async def main():
    print("Deleting all old articles from DB...")
    db = SessionLocal()
    try:
        count = db.query(NewsArticleDB).delete()
        db.commit()
        print(f"Deleted {count} old articles from DB.")
    except Exception as e:
        db.rollback()
        print(f"Error deleting: {e}")
    finally:
        db.close()

    print("Forcing batch job to fetch fresh articles...")
    # This will fetch from RSS, process with LLM, insert to DB, and update _news_cache
    articles = await run_batch_job(force=True)
    print(f"Batch job complete. Refreshed {len(articles)} articles.")

if __name__ == "__main__":
    asyncio.run(main())
