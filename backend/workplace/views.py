from os import stat
from django.http import JsonResponse 
from .models import Workspace
from .serializers import WorkplaceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view('GET')
def workplace_list(request):
    workplaces = Workspace.objects.all()
    serializer = WorkplaceSerializer(workplaces, many=True)
    return Response(serializer.data)

@api_view('POST')
def workplace_add(request):
    serializer = WorkplaceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
def workplace_edit(request, id):

    workplace = Workspace.objects.get(pkey=id)

    if request.method == "GET":
        serializer = WorkplaceSerializer(workplace)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = WorkplaceSerializer(workplace, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
@api_view('DELETE')
def workplace_delete(request, id):
  
  workplace = Workspace.objects.get(pkey=id)
  workplace.delete()
  return Response(status=status.HTTP_204_NO_CONTENT)




