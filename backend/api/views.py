from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer,UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from accounts.models import CustomUser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.core.mail import send_mail



class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/meinereservierungen/',
        '/api/user/id',
        '/api/resetrequest/',
        '/api/resetpassword/',

    ]
    return Response(routes)

@api_view(['POST'])
def reset_request(request):
    data = request.data
    email = data['email']
    user = CustomUser.objects.get(email=email)
    if CustomUser.objects.filter(email=email).exists():
        # send email with otp
        send_mail(
        'Wiederherstellung des Passworts',
        f'Hier ist dein OTP {user.otp}.',
        'support@bookadesk.de',
        [user.email],
        fail_silently=False,
        )
        message = {
            'detail': 'Success Message'}
        return Response(message, status=status.HTTP_200_OK)
    else:
        message = {
            'detail': 'Some Error Message'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def reset_password(request):
    """reset_password with email, OTP and new password"""
    data = request.data
    user = CustomUser.objects.get(email=data['email'])
    if user.is_active:
        # Check if otp is valid
        if data['otp'] == user.otp:
            if data['password'] != '':
                # Change Password
                user.set_password(data['password'])
                user.save() # Here user otp will also be changed on save automatically
                return Response('any response or you can add useful information with response as well. ')
            else:
                message = {
                    'detail': 'Password cant be empty'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
        else:
            message = {
                'detail': 'OTP did not matched'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        message = {
            'detail': 'Something went wrong'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)





