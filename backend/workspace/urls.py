from django.urls import path
from . import views

urlpatterns = [
    path('', views.workspace_list, name='workspace_list'),
    path('add/', views.workspace_add, name='workspace_add'), 
    path('edit/<int:edit_id>/', views.workspace_edit, name='workspace_edit'),
    path('delete/<int:delete_id>/', views.workspace_delete, name= 'workspace_delete'),
]