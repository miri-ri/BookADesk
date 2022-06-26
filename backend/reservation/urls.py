from django.urls import path
from .views import ReservationDetail, ReservationList

urlpatterns = [
    path('',ReservationList.as_view()),
    path('<int:pk>/', ReservationDetail.as_view())
    ]