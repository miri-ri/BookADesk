from django.urls import path
from .apps import CoronaSendMails


urlpatterns = [
    path('sendMailsToTheEndangered/fromUser/<int:pk>/sinceDay/<int:pk>/', CoronaSendMails.searchPeople),
]