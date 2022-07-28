from django.urls import path
from . import views

urlpatterns = [
    path('', views.workspace_list, name='workspace_list'),
    path('<int:workspace_id>/', views.workspace_get),
    path('add/', views.workspace_add, name='workspace_add'), 
    path('edit/<int:edit_id>/', views.workspace_edit, name='workspace_edit'),
    path('delete/<int:delete_id>/', views.workspace_delete, name= 'workspace_delete'),
    path('group', views.group_list, name='workspace_list'),
    path('group/add/', views.group_add, name='workspace_add'), 
    path('group/edit/<int:edit_id>/', views.group_edit, name='workspace_edit'),
    path('group/delete/<int:delete_id>/', views.group_delete, name= 'workspace_delete'),
    path('rating/<int:workspace_id>/', views.rating_list),
    path('rating/add/', views.rating_add),
    path('rating/delete/<int:delete_id>/', views.rating_delete)
    
]