from django.urls import path
from .apps import CoronaSendMails


urlpatterns = [
    path('sendMailsToTheEndangered/fromUser/<int:user_id>/sinceDay/<int:sinceDay>/', CoronaSendMails.searchPeople),
]