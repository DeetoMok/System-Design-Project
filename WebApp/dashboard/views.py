from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import CurrentAED
from rest_framework import viewsets
from .serializers import AedSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getRoutes(request):

    routes = []

    return Response(routes)

@api_view(['GET'])
def getAeds(request):
    aeds = CurrentAED.objects.all()
    # convert object to json
    serializer = AedSerializer(aeds, many=True)             #many=True means return multiple objects
    return Response(serializer.data)

@api_view(['GET'])
def getAed(request, pk):
    aeds = CurrentAED.objects.get(id=pk)
    # convert object to json
    serializer = AedSerializer(aeds, many=False)             #many=False means return one object0
    return Response(serializer.data)

# class Another(View):
#     # CurrentAED.objects.filter() will return a list
#     # CurrentAED.objects.get() will return only one record
#     currentaed = CurrentAED.objects.all()
#     output = ""
#     for aed in currentaed:
#         output += f"We have {aed.lat} latitude, {aed.lon} longtitude aed in database<br>"

#     def get(self, request):
#         return HttpResponse(self.output)


# # def first(request):
# #     return HttpResponse("First message from views")

# class AedViewSet(viewsets.ModelViewSet):
#     serializer_class = AedSerializer
#     queryset = CurrentAED.objects.all()
#     # Add token authentication to allow query
#     authentication_classes = (TokenAuthentication, )
#     # Require authentication to access this model. Change to IsAny to let all user access this ViewSet
#     # permission_classes = (IsAuthenticated,)

