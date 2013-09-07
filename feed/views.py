import sys

from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from feed.models import Group
from feed.models import UserProfile
from feed.models import Entry
from feed.models import Annotation

# Create your views here.
def index(request):
    entries = Entry.objects.all().order_by('-created_at')
    annotations = [entry.annotations for entry in entries]
    zipped = zip(entries, annotations)
    data = {
            'entries': zipped
    }
    return render(request, 'feed/feed.html', data,)

@csrf_exempt
def add_comment(request):
    text = request.POST.get('text')
    entry = request.POST.get('entry')
    entry_object = Entry.objects.get(pk=entry)
    d = dict(text=text, entry=entry_object, author=request.user)
    annotation = Annotation(**d)
    annotation.save()
    return HttpResponse(request.user)
