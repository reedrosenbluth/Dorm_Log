from django.http import Http404
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    c = {}
    return render(request, 'feed/base.html', c,)
