from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import CurrentAED, Ohca, AedCandidate
from rest_framework import viewsets
from .serializers import AedSerializer, OhcaSerializer, AedcandidateSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from collections import OrderedDict


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

@api_view(['GET'])
def getAedCandidates(request):
    aeds = AedCandidate.objects.all()
    # convert object to json
    serializer = AedcandidateSerializer(aeds, many=True)             #many=True means return multiple objects
    return Response(serializer.data)   

@api_view(['GET'])
def getOhcas(request):
    ohca = Ohca.objects.all()
    serializer = OhcaSerializer(ohca, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRegions(request):
    ohca = Ohca.objects.distinct()
    # OrderedDict([('id', 1), ('lat', 1.0), ('lon', 2.0), ('country', 'singapore'), ('pa', 1), ('region', 'N'), ('subzone', 1)])
    # OrderedDict([('id', 2), ('lat', 2.0), ('lon', 3.0), ('country', 'singapore'), ('pa', 2), ('region', 'S'), ('subzone', 2)])
    # OrderedDict([('id', 3), ('lat', 3.0), ('lon', 4.0), ('country', 'singapore'), ('pa', 3), ('region', 'E'), ('subzone', 3)])
    # OrderedDict([('id', 4), ('lat', 4.0), ('lon', 5.0), ('country', 'singapore'), ('pa', 4), ('region', 'W'), ('subzone', 4)])
    # return HttpResponse(serializer.data)
    regionCount = 4
    # return Response(OrderedDict([('regions', len(ohca))]))
    return Response(OrderedDict([('regions', regionCount)]))

@api_view(['GET'])
def getPlanningareas(request):
    paCount = 55
    # return Response(OrderedDict([('regions', len(ohca))]))
    return Response(OrderedDict([('regions', paCount)]))

@api_view(['GET'])
def getSubzones(request):
    subzoneCount = 331
    # return Response(OrderedDict([('regions', len(ohca))]))
    return Response(OrderedDict([('regions', subzoneCount)]))

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

