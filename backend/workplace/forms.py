from django import forms
from .models import Workspace

class WorkplaceForm(forms.ModelForm):
   
    class Meta:
        model = Workspace
        fields = '__all__'