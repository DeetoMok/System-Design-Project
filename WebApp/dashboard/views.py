from django.db import router
from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import CurrentAED, Ohca, AedCandidate
from rest_framework import viewsets
from .serializers import AedSerializer, OhcaSerializer, AedcandidateSerializer, AedcandidatesSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from collections import OrderedDict
import json
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from scipy.spatial import distance_matrix

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

@api_view(['GET'])
def getAeds(request):
    aeds = CurrentAED.objects.all()
    # convert object to json
    serializer = AedSerializer(aeds, many=True)             #many=True means return multiple objects
    return Response(serializer.data)

# @api_view(['GET'])
# def getAedCandidates(request):
#     aeds = AedCandidate.objects.all()
#     # convert object to json
#     serializer = AedcandidateSerializer(aeds, many=True)             #many=True means return multiple objects
#     return Response(serializer.data)

@api_view(['POST'])
def updateAeds(request):
    data = request.data
    CurrentAED.objects.all().delete()
    
    for aed in data:
        print(aed)
        aed["id"] = int(aed["id"])
        aed["lat"] = int(aed["lat"])
        aed["lon"] = int(aed["lon"])
        aed["pa"] = int(aed["pa"])
        aed["subzone"] = int(aed["subzone"])
       
    serializer = AedcandidatesSerializer(data=data, many=True)

    if serializer.is_valid():
        serializer.save()
        print("SAVED")
    else:
        print("NOT SAVED", serializer.errors)
    
    return Response(serializer.data)

@api_view(['GET','POST'])
def deleteAeds(request):
    CurrentAED.objects.all().delete()
    return Response('Success')

# NOT IN USE
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

@api_view(['POST'])
def updateAedCandidates(request):
    data = request.data
    AedCandidate.objects.all().delete()
    
    for aed in data:
        # print(aed)
        aedKeys = aed.keys()
        aed["id"] = int(aed["id"])
        aed["lat"] = float(aed["lat"])
        aed["lon"] = float(aed["lon"])
        if "pa" in aedKeys:
            aed["pa"] = int(aed["pa"])
        if "subzone" in aedKeys:
            aed["subzone"] = int(aed["subzone"])
       
    serializer = AedcandidatesSerializer(data=data, many=True)

    if serializer.is_valid():
        serializer.save()
        print("SAVED")
    else:
        print("NOT SAVED", serializer.errors)
    
    return Response(serializer.data)

@api_view(['GET','POST'])
def deleteAedCandidates(request):
    AedCandidate.objects.all().delete()
    return Response('Success')

# NOT IN USE
@api_view(['GET','POST'])
def updateAedCandidate(request, pk):
    data = request.data
    aedCandidate = AedCandidate.objects.get(id=pk)
    serializer = AedcandidatesSerializer(instance=aedCandidate, data=data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)



@api_view(['GET'])
def getOhcas(request):
    ohca = Ohca.objects.all()
    serializer = OhcaSerializer(ohca, many=True)
    return Response(serializer.data)





@api_view(['POST'])
def optimalOhcas(request):
    print("READINGGG")
    print("request:", request.data)
    # numAeds = request.data[0]['numAeds']
    # numK = request.data[0]['numK']
    # numIters = request.data[0]['numIters']

    def EuclideanDist(arr1,arr2): 
        d_matrix = distance_matrix(111000*arr1,111000*arr2) 
        return(d_matrix) 
 
    def kmeans_OHCA(OHCA,k):  
        kmeans = KMeans(n_clusters=k, random_state=0).fit(OHCA)
        OHCA_Cluster_All = np.concatenate((OHCA, kmeans.labels_.reshape(len(OHCA),1)), axis=1) 
        return OHCA_Cluster_All, kmeans.cluster_centers_ 
 
    def ToNearestBuilding(arr1,arr2): 
        i = 0 
        nearest_building = [] 
        while i < len(arr1): 
            dist_arr = EuclideanDist(arr1[i:i+1],arr2) 
            argmin = dist_arr.argmin() 
            nearest_building.append(arr2[argmin]) 
            i += 1 
        nearest_building_array = np.array(nearest_building) 
        return nearest_building_array     

    ohca = Ohca.objects.all() 
    data = request.data 
    # k = data['Number of clusters'] 
    # aeds = request.data['Number of AEDs'] 
    k = 4
    LatOHCA = np.array(ohca.values_list('lat',flat=True)) 
    LongOHCA = np.array(ohca.values_list('lon',flat=True)) 
     
###Need to store SGbuilding address for mapping candidateAEDs to buildings 
 
    M = len(LatOHCA) 
    #N = len(LatBuilding) 
    OHCA_array = np.concatenate((LatOHCA.reshape(M,1), LongOHCA.reshape(M,1)),axis=1) 
    #Building_array = np.concatenate((LatBuilding.reshape(N,1),LongBuilding.reshape(N,1)),axis=1) 
    OHCA_kcluster_array, CC_kcluster = kmeans_OHCA(OHCA_array, k) 
    OHCA_kcluster_df = pd.DataFrame(OHCA_kcluster_array, columns=['LatOHCA','LongOHCA','cluster']) 
 
    CC_final = [] 
    OHCA_final = [] 
    for i in range(0,k):     
        OHCA_i = OHCA_kcluster_df.loc[OHCA_kcluster_df['cluster']==i].drop(columns = ['cluster']).reset_index(drop=True)    
        OHCA_second_layer, CC_second_layer = kmeans_OHCA(OHCA_i, 1)  
        CC_final.append(CC_second_layer) 
        OHCA_final.append(OHCA_second_layer) 
     
    lst_for_CC = [] 
    for i in range(0,k): 
        for j in range(0,len(CC_final[i])):         
            lst_for_CC.append(CC_final[i][j]) 
     
    CC_final_array = np.array(lst_for_CC)
     
    #AEDplacement_array = ToNearestBuilding(CC_9900_array, Building_array) 

     
    return Response(CC_final_array)
    return Response()



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

