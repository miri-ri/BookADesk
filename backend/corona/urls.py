from django.urls import path
from .apps import CoronaSendMails
from . import views


urlpatterns = [
    path('sendMailsToTheEndangered/fromUser/<str:uname>/sinceDay/<int:sinceDay>/', views.corona_notifyUsers),
]