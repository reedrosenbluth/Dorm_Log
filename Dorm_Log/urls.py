from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Dorm_Log.views.home', name='home'),
    # url(r'^Dorm_Log/', include('Dorm_Log.foo.urls')),

	#url(r'^$', 'feed.views.index'),
	url(r'^feed/(?P<group_id>.+)', 'feed.views.feed'),
	url(r'^entries/new/$', 'feed.views.entry'),
	url(r'^ws/add_comment', 'feed.views.add_comment'),
    url(r'^ws/add_favorite', 'feed.views.add_favorite'),
    # Uncomment the admin/doc line below to enable admin documentation:
     url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     url(r'^admin/', include(admin.site.urls)),
)
