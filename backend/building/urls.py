from django.urls import path
from .views import BuildingList, BuildingListTwo, BuildingDetail

urlpatterns = [
    path("api/building/", BuildingList.as_view()),
    path("api/building/<str:name>/", BuildingListTwo.as_view()),
    path("api/building/<str:name>/<int:floor_number>/", BuildingDetail.as_view()),
]
