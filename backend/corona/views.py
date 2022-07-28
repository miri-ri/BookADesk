from .apps import CoronaSendMails

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def corona_notifyUsers(request, sinceDay, user_id):

    CoronaSendMails().searchPeople(sinceDay, user_id)
    return Response()
