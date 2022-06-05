from django.db import models

class Workspace(models.Model):
    name = models.CharField(max_length=5)
    additionalinfo = models.CharField(max_length=150)
    is_barrier_free = models.BooleanField()
    has_computer = models.BooleanField()

