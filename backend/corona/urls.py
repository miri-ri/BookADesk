from django.urls import path
#from .views import


urlpatterns = [
    path('sendMailsToTheEndangered/fromUser/<int:pk>/sinceDay/<int:pk>/',CoronaSendMails.searchPeople),
]