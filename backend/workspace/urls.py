from django.urls import path
from . import views

urlpatterns = [
    path('', views.workspace_list, name='workspace_list'),
    path('add/', views.workspace_add, name='workspace_add'), 
    path('edit/<int:edit_id>/', views.workspace_edit, name='workspace_edit'),
    path('delete/<int:delete_id>/', views.workspace_delete, name= 'workspace_delete'),
    path('groups', views.group_list, name='workspace_list'),
    path('addgroup/', views.group_add, name='workspace_add'), 
    path('editgroup/<int:edit_id>/', views.group_edit, name='workspace_edit'),
    path('deletegroup/<int:delete_id>/', views.group_delete, name= 'workspace_delete'),

]