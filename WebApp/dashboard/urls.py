from django.urls import path, include
from . import views
# from .views import Another, AedViewSet
from rest_framework import routers

# # Create router for serializer
# router = routers.DefaultRouter()
# # register 'aeds' url to pass AedViewSet
# router.register('aeds', AedViewSet)

urlpatterns = [
    # path('', include(router.urls)),          #path with router to a ViewSet
    path('aeds/update', views.updateAeds, name="updateaeds"),
    path('aeds/delete', views.deleteAeds, name="deleteaeds"),    
    path('aeds/', views.getAeds, name='aeds'),
    path('aeds/<str:pk>', views.getAed, name='aed'),
    path('aedcandidates/update/<str:pk>', views.updateAedCandidate, name="updateaedcandidate"),
    path('aedcandidates/update', views.updateAedCandidates, name="updateaedcandidates"),
    path('aedcandidates/delete', views.deleteAedCandidates, name="deleteaedcandidates"),
    path('aedcandidates/', views.getAedCandidates, name="aedcandidates"),
    path('ohcas/optimal', views.optimalOhcas, name='optimalohcas'),
    path('ohcas/update', views.updateOhcas, name="updateOhcacandidates"),
    path('ohcas/delete', views.deleteOhcas, name="deleteOhcacandidates"),    
    path('ohcas/', views.getOhcas, name="ohcas"),
    path('ohcajson/update', views.updateOhcaJson, name="updateOhcaJson"),    
    path('ohcajson/', views.getOhcaJson, name="ohcajson"),      
    path('regions/', views.getRegions, name="regions"),
    path('planningareas/', views.getPlanningareas, name="planningareas"),
    path('subzones/', views.getSubzones, name='subzones'),

]
