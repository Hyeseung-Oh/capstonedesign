from django.db import models


class Notice(models.Model):
    title = models.CharField(max_length=200)
    link = models.URLField(max_length=500)

    def __str__(self):
        return self.title
