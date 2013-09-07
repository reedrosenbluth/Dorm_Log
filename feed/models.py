from django.db import models
from django.contrib.auth.models import User

class Group(models.Model):
    name = models.CharField(max_length=200)
    parent = models.ForeignKey(Group, related_name='children', blank=True)
    admin = models.ForeignKey(User, related_name='groups')
