from django.urls import path, include
from . import views
from .views import Another, AedViewSet
from rest_framework import routers

# Create router for serializer
router = routers.DefaultRouter()
# register 'aeds' url to pass AedViewSet
router.register('aeds', AedViewSet)

urlpatterns = [
    path('', include(router.urls))          #path with router to a ViewSet

    # path('', views.first),                #path to normal url
    # path('another', Another.as_view())    #path to class url
]
