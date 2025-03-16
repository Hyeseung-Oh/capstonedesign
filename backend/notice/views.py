from django.http import JsonResponse
from django.db import transaction
from .models import Notice
from .crawler import crawl_school_website


def crawl_notices(request):
    with transaction.atomic():
        # 기존 공지사항 모두 삭제
        Notice.objects.all().delete()

        # 크롤링 작업 실행
        crawl_school_website()

        # 데이터베이스에서 공지사항을 가져온다고 가정
        notices = Notice.objects.all()

        # 공지사항을 직렬화하여 JSON 응답으로 반환
        data = {
            "notices": [
                {"title": notice.title, "link": notice.link} for notice in notices
            ]
        }
        return JsonResponse(data)
