from os import stat
from django.http import JsonResponse 
from .models import Workspace
from .serializers import WorkspaceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


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
def workspace_edit(request, id):

    workspace = Workspace.objects.get(pkey=id)

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
def workspace_delete(request, id):
  
  workspace = Workspace.objects.get(pkey=id)
  workspace.delete()
  return Response(status=status.HTTP_204_NO_CONTENT)




