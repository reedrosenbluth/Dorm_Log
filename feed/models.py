from django.db import models
from django.contrib.auth.models import User

import datetime
from django.utils import timezone

class Group(models.Model):
    name = models.CharField(max_length=200)
    parent = models.ForeignKey("Group", related_name='children', blank=True, null=True)
    administrator = models.ForeignKey(User, related_name='managed_groups')
    def __unicode__(self):
        return "%s" % (self.name)

class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name="profile")

class Entry(models.Model):
    text       = models.TextField('Entry Text');
    user       = models.ForeignKey(UserProfile);
    created_at = models.DateTimeField('Created At')

    def save(self):
        if not self.id:
            if not self.created_at:
                self.created_at = timezone.now()
        super(Entry, self).save()

    def __unicode__(self):
        return self.text

class PhotoEntry(Entry):
    photo = models.ImageField(upload_to='authors/pictures/', blank = True)

class TipEntry(Entry):
    pass

class EventEntry(Entry):
    location   = models.CharField(max_length = 255)
    start_time = models.DateTimeField('Start Time')
    end_time   = models.DateTimeField('End Time')
