from django.db import models
from django.db.models import Avg
from reservation.models import Reservation


class Group (models.Model):
    name = models.CharField(max_length=25)


class Workspace(models.Model):
    name = models.CharField(max_length=25)
    comment = models.CharField(max_length=150)
    is_barrier_free = models.BooleanField()
    has_computer = models.BooleanField()
    group = models.CharField(max_length=25)
    workspace_rating = models.FloatField(default=0.0)
    #group = models.ForeignKey(Group, on_delete=models.CASCADE)


class Rating(models.Model):
    workspace = models.CharField(max_length=25)
    reservation = models.CharField(max_length=25)
    review = models.CharField(max_length=500)
    star_rating = models.IntegerField()
