from backend.workplace.models import Workspace
from rest_framework import serializers
from .models import Workspace

class WorkplaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ('__all__')