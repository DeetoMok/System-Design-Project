
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # path('dashboard/', include('dashboard.urls')),
    path('', include('dashboard.urls')),
    path('admin/', admin.site.urls),
    path('auth/', obtain_auth_token)        #
]
