from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('user/<int:pk>/', views.UserDetail.as_view(), name='user'),
    path('meinereservierungen/', views.meinereservierungen, name='meinereservierungen'),
    path('', views.getRoutes)
]
