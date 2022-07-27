from os import stat
from django.http import JsonResponse
from .models import Group, Workspace, Rating
from .models import Workspace
from .serializers import GroupSerializer, WorkspaceSerializer, RatingSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg
from rest_framework.permissions import IsAuthenticated
from django.contrib.admin.views.decorators import staff_member_required 

# Workspaces

#Get all workspaces (with avg ratings)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def workspace_list(request):
    all_workspaces = Workspace.objects.all()
    for ws in all_workspaces:
        if  Rating.objects.filter(workspace=ws.name).count()>0:
            stars = Rating.objects.filter(workspace=ws.name).aggregate(Avg('star_rating'))
            ws.workspace_rating = stars.get('star_rating__avg')
            ws.save(update_fields=['workspace_rating'])  
    serializer = WorkspaceSerializer(all_workspaces, many=True)
    return Response(serializer.data)

# add a new workspace
@api_view(['POST'])
@staff_member_required
@permission_classes([IsAuthenticated])
def workspace_add(request):
    serializer = WorkspaceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# get one workspace by id (with avg rating)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def workspace_get(request, workspace_id):
    workspace = Workspace.objects.get(id=workspace_id)
    if  Rating.objects.filter(workspace=workspace_id).count()>0:
        stars = Rating.objects.filter(workspace=workspace_id).aggregate(Avg('star_rating'))
        workspace.workspace_rating = stars.get('star_rating__avg')
        workspace.save(update_fields=['workspace_rating'])
    serializer = WorkspaceSerializer(workspace)
    return Response(serializer.data)
    
# edit one workspace (by id)
@api_view(['PUT'])
@staff_member_required
@permission_classes([IsAuthenticated])
def workspace_edit(request, edit_id):

    workspace = Workspace.objects.get(id=edit_id)
    serializer = WorkspaceSerializer(workspace, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete one workspace (by id)
@api_view(['DELETE'])
@staff_member_required
@permission_classes([IsAuthenticated])
def workspace_delete(request, delete_id):

    workspace = Workspace.objects.get(id=delete_id)
    workspace.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Groups
#get all groups
@api_view(['GET'])
@staff_member_required
@permission_classes([IsAuthenticated])
def group_list(request):
    group = Group.objects.all()
    serializer = GroupSerializer(group, many=True)
    return Response(serializer.data)

#add a new group
@api_view(['POST'])
@staff_member_required
@permission_classes([IsAuthenticated])
def group_add(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

#edit or get one group (by id)
@api_view(['GET', 'PUT'])
@staff_member_required
@permission_classes([IsAuthenticated])
def group_edit(request, edit_id):

    group = Group.objects.get(id=edit_id)

    if request.method == "GET":
        serializer = GroupSerializer(group)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = GroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete a group 
@api_view(['DELETE'])
@staff_member_required
@permission_classes([IsAuthenticated])
def group_delete(request, delete_id):

    group = Group.objects.get(id=delete_id)
    group.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Rating
# get all ratings that belong to a specific workspace 
@api_view(['GET'])
def rating_list(request, workspace_id):
    ws = Workspace.objects.get(id=workspace_id)
    ratings = Rating.objects.filter(workspace=ws)
    serializer = RatingSerializer(ratings, many=True)
    return Response(serializer.data)

# add a new rating 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rating_add(request):
    serializer = RatingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

#delete a rating
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def rating_delete(request, delete_id):
    rating = Rating.objects.get(id=delete_id)
    rating.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
