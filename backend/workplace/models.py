from django.db import models


class Group (models.Model):
    name = models.CharField(max_length=5)

class Workspace(models.Model):
    name = models.CharField(max_length=5)
    comment = models.CharField(max_length=150)
    is_barrier_free = models.BooleanField()
    has_computer = models.BooleanField()
    group = models.ForeignKey(Group,on_delete=models.CASCADE)

