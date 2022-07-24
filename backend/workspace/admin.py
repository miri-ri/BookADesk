from django.contrib import admin
from .models import Group, Workspace, Rating

# Register your models here.

admin.site.register(Group)
admin.site.register(Workspace)
admin.site.register(Rating)