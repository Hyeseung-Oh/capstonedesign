import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import schedule
import time
from notice.models import Notice


def crawl_school_website():
    # 학교 공지사항 페이지에서 HTML 가져오기
    url = "https://www.cu.ac.kr/plaza/notice/notice"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    # 링크 추출
    links = soup.select('td>a[href*="notice"]:not(:has(span))')

    # 상위 5개 출력
    top = 5

    for link in links[:top]:
        # 절대 URL로 변환하여 출력
        absolute_url = urljoin(url, link["href"])
        title = link.text.strip()

        # Notice 모델 인스턴스 생성 후 데이터베이스에 저장
        notice_instance = Notice(title=title, link=absolute_url)
        notice_instance.save()


# def schedule_crawler():
# 3시간마다 크롤러 함수 실행
# schedule.every(3).hours.do(crawl_school_website)

# while True:
# schedule.run_pending()
# time.sleep(1)
