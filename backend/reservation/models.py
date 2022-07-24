from django.db import models

class Reservation(models.Model):
    res_id = models.CharField(max_length=50)
    user_id = models.IntegerField(default=None)
    seat_id = models.IntegerField(default=None)
    workspacename = models.CharField(max_length=5)
    start = models.DateField()
    duration = models.IntegerField(default=None)
    slot = models.CharField(max_length= 5)
    is_rated = models.BooleanField()
    is_a_group = models.BooleanField()
