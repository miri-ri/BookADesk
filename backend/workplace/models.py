from django.db import models


class Room (models.Model):
    name = models.CharField(max_length=5)
    
class Workspace(models.Model):
    name = models.CharField(max_length=5)
    additionalinfo = models.CharField(max_length=150)
    is_barrier_free = models.BooleanField()
    has_computer = models.BooleanField()
    room = models.ForeignKey(Room,on_delete=models.CASCADE)

