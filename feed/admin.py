from django.contrib import admin
from feed.models import Group, UserProfile, Entry, PhotoEntry, TipEntry, EventEntry, Annotation, Favorite

admin.site.register(Group)
admin.site.register(UserProfile)
admin.site.register(Entry)
admin.site.register(PhotoEntry)
admin.site.register(TipEntry)
admin.site.register(EventEntry)
admin.site.register(Annotation)
admin.site.register(Favorite)
