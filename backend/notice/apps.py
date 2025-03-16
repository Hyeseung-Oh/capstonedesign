from django.apps import AppConfig


class MyAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "notice"

    def ready(self):
        from notice.apscheduler import start  # 절대 경로로 수정

        start()
