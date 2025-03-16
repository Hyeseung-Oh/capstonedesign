from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from notice.crawler import crawl_school_website  # 절대 경로로 수정


def start():
    scheduler = BackgroundScheduler()
    trigger = IntervalTrigger(hours=3)  # 3시간 주기로 실행
    scheduler.add_job(crawl_school_website, trigger=trigger)
    scheduler.start()
