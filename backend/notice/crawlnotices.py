from django.core.management.base import BaseCommand
from notice.crawler import schedule_crawler
import threading


class Command(BaseCommand):
    help = "Crawls school website for notices"

    def handle(self, *args, **options):
        # 크롤러를 백그라운드 스레드로 실행
        crawler_thread = threading.Thread(target=schedule_crawler)
        crawler_thread.daemon = True
        crawler_thread.start()
