from django.urls import path
from congestion import views

urlpatterns = [
    path("api/congestion/", views.congestion),
]
