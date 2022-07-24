from django.urls import path
from .apps import CoronaSendMails


urlpatterns = [
    path('sendMailsToTheEndangered/fromUser/<str:uname>/sinceDay/<int:sinceDay>/', CoronaSendMails.searchPeople),
]