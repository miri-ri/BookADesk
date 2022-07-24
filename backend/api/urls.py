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
    path('resetrequest/', views.reset_request, name='resetrequest'),
    path('resetpassword/', views.reset_password, name='resetpassword'),
    path('', views.getRoutes)
]
