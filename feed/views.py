import sys

from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from feed.models import Group
from feed.models import UserProfile
from feed.models import Entry
from feed.models import Annotation

import django_filepicker
from django import forms

from feed.models import PhotoEntry, TipEntry, EventEntry

# Create your views here.


class UploadFileForm(forms.Form):
    file  = django_filepicker.forms.FPFileField()

def feed(request, group_id):
    form  = UploadFileForm()
    group = Group.objects.get(pk=group_id)
    entries = Entry.objects.filter(group=group).order_by('-created_at')
    annotations = [entry.annotations for entry in entries]
    zipped = zip(entries, annotations)
    data = {
            'group': group,
            'entries': zipped,
            'form': form,
            'user': request.user
    }
    return render(request, 'feed/feed.html', data,)

def add_entry(request):
    entry       = None

    if (request.GET['button_id'] == 'photo-button'):
        entry       = PhotoEntry()
        entry.photo = request.GET['file']

    if (request.GET['button_id'] == 'tip-button'):
        entry = TipEntry()

    entry.text  = request.GET['text']
    entry.user  = request.user

    entry.group = Group.objects.get(pk=request.GET['group_id'])

    entry.save()

    return HttpResponse(request.GET['text'])

@csrf_exempt
def add_comment(request):
    text = request.POST.get('text')
    entry = request.POST.get('entry')
    entry_object = Entry.objects.get(pk=entry)
    d = dict(text=text, entry=entry_object, author=request.user)
    annotation = Annotation(**d)
    annotation.save()
    return HttpResponse(request.user)
