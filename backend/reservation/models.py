from django.db import models

class Reservation(models.Model):
    res_id = models.CharField(max_length=50)
    username = models.CharField(max_length=20)
    workspacename = models.CharField(max_length=5)
    date = models.DateField()
    slot = models.CharField(max_length= 5)
