from django.urls import path
from .views import crawl_notices

app_name = "notice"

urlpatterns = [
    path("api/notice/", crawl_notices),
]
