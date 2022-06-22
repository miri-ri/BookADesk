from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.workplace_list, name='workplace_list'),
    path('add/', views.workplace_add, name='workplace_add'), 
    path('edit/<int:id>/', views.workplace_edit, name='workplace_edit'),
    path('delete/<int:id>/', views.workplace_delete, name= 'workplace_delete'),
]