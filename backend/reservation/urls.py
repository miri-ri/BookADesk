from django.urls import path
from .views import ReservationDetail, ReservationList

urlpatterns = [
    path('reservations/',ReservationList.as_view()),
    path('reservations/<int:pk>/', ReservationDetail.as_view())
    ]