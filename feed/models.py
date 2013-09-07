from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType

import datetime
from django.utils import timezone

import django_filepicker

class Group(models.Model):
    name          = models.CharField(max_length=200)
    parent        = models.ForeignKey("Group", related_name='children', blank = True, null = True)
    administrator = models.ForeignKey(User, related_name='managed_groups')

    def __unicode__(self):
        return "%s" % (self.name)

class UserProfile(models.Model):
    user  = models.OneToOneField(User, related_name="profile")
    group = models.ForeignKey(Group)

class Entry(models.Model):
    content_type = models.ForeignKey(ContentType,editable=False,null=True)
    text         = models.TextField('Entry Text');
    user         = models.ForeignKey(User);
    group        = models.ForeignKey(Group, null=True, blank=True) #null=True, blank=True should be deleted eventually.
    created_at   = models.DateTimeField('Created At')
    scheduled_at = models.DateTimeField('Scheduled At')

    def save(self):
        if(not self.content_type):
            self.content_type = ContentType.objects.get_for_model(self.__class__)

        if not self.id:
            if not self.created_at:
                self.created_at = timezone.now()
        super(Entry, self).save()

    def as_leaf_class(self):
        content_type = self.content_type
        model = content_type.model_class()
        if(model == Base):
            return self
        return model.objects.get(id=self.id)

    def __unicode__(self):
        return self.text

class PhotoEntry(Entry):
    photo = django_filepicker.models.FPFileField(upload_to='photos', blank=True)

class TipEntry(Entry):
    pass

class EventEntry(Entry):
    location   = models.CharField(max_length = 255)
    start_time = models.DateTimeField('Start Time')
    end_time   = models.DateTimeField('End Time')

class Annotation(models.Model):
    text = models.TextField('Annotation')
    entry = models.ForeignKey(Entry, related_name='annotations')
    author = models.ForeignKey(User, related_name='annotations')
