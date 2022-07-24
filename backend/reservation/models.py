from django.db import models


class Reservation(models.Model):
    res_id = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    seat_id = models.CharField(max_length=50)
    group_id = models.CharField(max_length=25)
    start = models.CharField(max_length=200)
    duration = models.IntegerField(default=None)
    is_rated = models.BooleanField()
