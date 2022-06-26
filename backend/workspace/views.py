from os import stat
from django.http import JsonResponse
from .models import Group
from .models import Workspace
from .serializers import GroupSerializer
from .serializers import WorkspaceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Workspaces

@api_view(['GET'])
def workspace_list(request):
    workspace = Workspace.objects.all()
    serializer = WorkspaceSerializer(workspace, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def workspace_add(request):
    serializer = WorkspaceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
def workspace_edit(request, edit_id):

    workspace = Workspace.objects.get(id=edit_id)

    if request.method == "GET":
        serializer = WorkspaceSerializer(workspace)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = WorkspaceSerializer(workspace, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def workspace_delete(request, delete_id):

    workspace = Workspace.objects.get(id=delete_id)
    workspace.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Groups

@api_view(['GET'])
def group_list(request):
    group = Group.objects.all()
    serializer = GroupSerializer(group, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def group_add(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
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


@api_view(['DELETE'])
def group_delete(request, delete_id):

    group = Group.objects.get(id=delete_id)
    group.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
