from django.db import router
from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import CurrentAED, Ohca, AedCandidate
from rest_framework import viewsets
from .serializers import AedSerializer, AedsSerializer, OhcaSerializer, OhcasSerializer, AedcandidateSerializer, AedcandidatesSerializer
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
import requests
import haversine as hs
from shapely.geometry import shape, Point
from shapely.geometry.polygon import Polygon


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
        # print(aed)
        aedKeys = aed.keys()
        aed["id"] = int(aed["id"])
        aed["lat"] = float(aed["lat"])
        aed["lon"] = float(aed["lon"])
        if "pa" in aedKeys:
            aed["pa"] = int(aed["pa"])
        if "subzone" in aedKeys:
            aed["subzone"] = int(aed["subzone"])
       
    serializer = AedsSerializer(data=data, many=True)

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

# ---------------------------------------------------------------------------
@api_view(['GET'])
def getOhcas(request):
    ohca = Ohca.objects.all()
    serializer = OhcaSerializer(ohca, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def updateOhcas(request):
    data = request.data
    # Ohca.objects.all().delete()
    # convert postal code to lat lon
    # based on lat lon, get subzones
    # ohca = pd.read_excel("~/Downloads/Ohcasample.xlsx")
    ohca = pd.json_normalize(data)
    #print("OHCA HERE", ohca)

    zipcodelist = list(ohca['Location of incident'])
    zipcodelist = [str(n) for n in zipcodelist]
    #len(zipcodelist)

    def getcoordinates(zipcode):
        req = requests.get('https://developers.onemap.sg/commonapi/search?searchVal='+zipcode+'&returnGeom=Y&getAddrDetails=Y&pageNum=1')
        resultsdict = eval(req.text)
        if len(resultsdict['results'])>0:
            return resultsdict['results'][0]['LATITUDE'], resultsdict['results'][0]['LONGITUDE']
        else:
            pass


    coordinateslist= []
    failedlist=[]
    count = 0
    failed_count = 0
    for x in range(len(zipcodelist)):
        try:       
            if len(getcoordinates(zipcodelist[x]))>0:
                count = count + 1
                print('Extracting',count,'out of',len(zipcodelist),'addresses')
                coordinateslist.append(getcoordinates(zipcodelist[x]))
        except:
            count = count + 1           
            failed_count = failed_count + 1
            print('Failed to extract',count,'out of',len(zipcodelist),'addresses')
            failedlist.append(x)
            coordinateslist.append(None)
    print('Total Number of Addresses With No Coordinates',failed_count)

    #failedlist

    df_coordinates = pd.DataFrame(coordinateslist)
    joinohca = ohca.join(df_coordinates)
    ohca = joinohca.rename(columns={0:'Latitude', 1:'Longitude'})
    #coordinateslist

    aed = pd.DataFrame.from_records(CurrentAED.objects.all().values())
    aed = aed[['lat','lon']].rename(columns={'lat':"Latitude",'lon':'Longitude'})

    
    aed['Longitude'] = pd.to_numeric(aed['Longitude'], errors='coerce')
    aed = aed.dropna().reset_index(drop=True)
    #ohca

    ohca = ohca.drop(failedlist).reset_index(drop=True)



    #ohca['Latitude'] = pd.to_numeric(ohca['Latitude'], errors='coerce')
    #ohcalat1 = ohcalat.dropna().reset_index(drop=True)
    #ohca['Longitude'] = pd.to_numeric(ohca['Longitude'], errors='coerce')
    #ohcalon1= ohcalon.dropna().reset_index(drop=True)

    ohca['Latitude'] = pd.to_numeric(ohca['Latitude'], errors='coerce')
    ohca['Longitude'] = pd.to_numeric(ohca['Longitude'], errors='coerce')
    aed['geom'] =list(zip(aed.Longitude,aed.Latitude))
    ohca['geom']=list(zip(ohca.Longitude,ohca.Latitude))

    #aed
    #ohca


    radius=100


    # In[486]:


    import os
    import json
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, '/data/master-plan-2019-subzone-boundary-no-sea-geojson.geojson')
    with open(os.path.expanduser("D:\\GitHub\\System-Design-Project\\WebApp\\dashboard\\data\\master-plan-2019-subzone-boundary-no-sea-geojson.geojson")) as f:
        gj = json.load(f)


    ohca['Subzone']=""

    geometry_list = []  # for area calculation
    for feature in gj['features']:
        geometry_list.append(feature['geometry'])

    properties_list = [] # for kml name retrieval
    for feature in gj['features']:
        properties_list.append(feature['properties'])
        
    #properties_list

    subzone_names_in_index = []
    for i in range(332):
        kml_index = properties_list[i].get('Name')
        kml_description = properties_list[i].get('Description')
        firstbgcolor_index = kml_description.index('bgcolor=""')
        subzone_c_index = kml_description.index('SUBZONE_C')

        subzone_n_to_c = kml_description[firstbgcolor_index:subzone_c_index]
        first_index = subzone_n_to_c.index('<td>')
        last_index = subzone_n_to_c.index('</td>')
        subzone_name = subzone_n_to_c[first_index+4:last_index]
        subzone_names_in_index.append(subzone_name)
    #subzone_names_in_index

    #geometry_list
    import time
    startTime = time.time()
    coordinates_list = []  # to be used for OHCA
    for feature in gj['features']:
        subzone_coordinates = []
        for coordinate in feature['geometry']['coordinates'][0]:
            temp = (coordinate[0], coordinate[1])
            subzone_coordinates.append(temp)
        
        coordinates_list.append(subzone_coordinates)
    

    kmlerror = [3, 6, 7, 8, 9, 118, 158, 294, 299, 303, 331]

    fixedkml = []

    for kml in kmlerror:
        
        coordinates_list_fix = []
        for i in range(len(geometry_list[kml]['coordinates'])): #n polygon
            subzone_coordinates_fix = []
            polygonx = geometry_list[kml]['coordinates'][i]
            coordinpolyx = polygonx[0]
        
            subzone_coordinates_fix = []
            for j in range(len(coordinpolyx)): #n coord in poly 0
                temp2 = (coordinpolyx[j][0], coordinpolyx[j][1])
                subzone_coordinates_fix.append(temp2)
                
            coordinates_list_fix.append(subzone_coordinates_fix)
        
        fixedkml.append(coordinates_list_fix) 
    print("extract polygon coords", time.time()-startTime)
    #len(fixedkml[0][0])


    listohca = []
    for i in range(332):
        listohca.append([])




    #for kml without errors (332-11)
    skipnumber = [3, 6, 7, 8, 9, 118, 158, 294, 299, 303, 331]

    startTime = time.time()
    for i in range((len(ohca.geom))): # 9734 points
        point = Point(ohca.geom[i])
        for  j in range(332): # 332 subzones  - [3, 6, 7, 8, 9, 118, 158, 294, 299, 303, 331] error kmls
            if j in skipnumber:
                continue
            else:

                polygon = Polygon(coordinates_list[j])
                pointinpoly = polygon.contains(point)
                
                if pointinpoly == True:
                    ohca['Subzone'][i]= subzone_names_in_index[j]
                    listohca[j].append(i)
                    break
    print("subzoning OHCA", time.time()-startTime)
    #listohca

    listaed = []

    for i in range(332):
        listaed.append([])


    skipnumber = [3, 6, 7, 8, 9, 118, 158, 294, 299, 303, 331]
    startTime = time.time()
    for i in range((len(aed))):
        point = Point(aed.geom[i])
        for  j in range(332): 
            if j in skipnumber:
                continue
            else:

                polygon = Polygon(coordinates_list[j])
                pointinpoly = polygon.contains(point)

                if pointinpoly == True:
                    
                    listaed[j].append(i)
                    break

    #listaed
    print("subzoning AED", time.time()-startTime)
    points = []

    startTime = time.time()
    for i in range(332):# for each subzone 1
        for j in range(len(listohca[i])):  #for each ohca coordinate 1
            b = ohca.geom[listohca[i][j]] 
            print(b) # ohca coordinates for the jth index
            for k in range(len(listaed[i])): #compare with every aed in the same subzone
                distance = hs.haversine(b,aed.geom[listaed[i][k]])*1000
                if distance<=radius:
                    points.append(listohca[i][j])
    print("checking 100m coverage", time.time()-startTime)

    points.sort()
    #points

    # all ohca index that gets subzoned
    regular_list = listohca 
    # make 2d array into 1d array
    flat_list = [item for sublist in regular_list for item in sublist]
    flat_list.sort()
    #flat_list
    print("assign aed to subzone", time.time()-startTime)
    startTime = time.time()
    def find_missing(lst):
        return [x for x in range(lst[0], lst[-1]+1) if x not in lst]


    # Driver code
    lst = flat_list
    listna = find_missing(lst)

    print("find aed that has no subzone", time.time()-startTime)
    startTime = time.time()
    for i in range(len(listna)):
        b = ohca.geom[listna[i]]
        for j in range(len(aed)):
            distance = hs.haversine(b,aed.geom[j])*1000
            if distance<=radius:
                points.append(i)
                break

    print("check if aed with no subzone is within 100m of aed", time.time()-startTime)


    ohca['Covered']=""


    for x in range(len(ohca)):
        if x in points:
            ohca['Covered'][x]=True
        else:
            ohca['Covered'][x]=False


    ohca['Year'] = pd.DatetimeIndex(ohca['Date of Incident']).year


    count = 0
    for x in range(len(ohca)):
        if(ohca['Covered'][x])==True:
            count=count+1

    #print(count)
    #ohca

    jsonData = []
    for index, row in ohca.iterrows():
        dictt = {}
        dictt['id']=index+1
        dictt['lat']=row['Latitude']
        dictt['lon']=row['Longitude']
        dictt['year']=row['Year']
        dictt['postalCode']=row['Location of incident']
        dictt['age']=row['Age']
        dictt['gender']=row['Gender']
        dictt['race']=row['Race']
        dictt['subzone']=row['Subzone']
        dictt['covered']=row['Covered']
        jsonData.append(dictt)

       
    serializer = OhcasSerializer(data=jsonData, many=True)

    if serializer.is_valid():
        serializer.save()
        print("SAVED")
    else:
        print("NOT SAVED", serializer.errors)
    
    return Response(serializer.data)

@api_view(['GET','POST'])
def deleteOhcas(request):
    Ohca.objects.all().delete()
    return Response('Success')

# ---------------------------------------------------------------------------



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


@api_view(['POST'])
def optimalOhcas(request):
    print("request:", request.data)
    # numAeds = request.data[0]['numAeds']
    # numK = request.data[0]['numK']
    # numIters = request.data[0]['numIters']
    
    #available_aeds = int(request.data.dict()['numAeds'])
    
    # print(available_aeds)
    # print('CHECK',available_aeds)
    # return Response()
    available_aeds = 2000
    currentAeds = CurrentAED.objects.all()
    allOhca = Ohca.objects.all()
    uncoveredOhca = Ohca.objects.filter(covered=False)

    data = request.data 
    #k = data['Number of clusters'] 
    #number_of_aeds = request.data['Number of AEDs'] 
 
    # First level clustering
    # user additional aeds to put
    # available_aeds = 100
 
    def EuclideanDist(arr1,arr2): 
        d_matrix = distance_matrix(111000*arr1,111000*arr2) 
        return(d_matrix) 
 
    def kmeans_OHCA(OHCA,k):  
        kmeans = KMeans(n_clusters=k, random_state=0).fit(OHCA) 
        OHCA_Cluster_All = np.concatenate((OHCA, kmeans.labels_.reshape(len(OHCA),1)), axis=1) 
        return OHCA_Cluster_All, kmeans.cluster_centers_ 
 
    def Coverage(OHCA_arr, AED_arr, MAX_DISTANT = 100, ALPHA = 0.05):
        i = 0
        shortest_dist_list = [] 
        while i < len(OHCA_arr): 
            dist_arr = EuclideanDist(OHCA_arr[i:i+1],AED_arr) 
            shortest_dist = dist_arr.min() 
            shortest_dist_list.append(shortest_dist) 
            i += 1 
        shortest_dist_array = np.array(shortest_dist_list)   
        avg_dist = shortest_dist_array.mean() 
         
        CoverageMatrix = np.where(shortest_dist_array < MAX_DISTANT, 1, 0) 
        total_cover = CoverageMatrix.mean() 
         
        PCM = shortest_dist_array.copy() 
        for j in range(0,len(PCM)): 
            a = PCM[j] 
            if a <= 20: 
                PCM[j] = 1.0 
            elif a >= 100: 
                PCM[j] = 0.0 
            else: 
                PCM[j] =  np.exp(- ALPHA * (a-20)) 
        partial_cover = PCM.mean()    
 
        Survival = shortest_dist_array.copy() 
        for k in range(0,len(Survival)): 
            b = Survival[k]/(6.15*1000/60)*2 
            #assume the travelling speed is 6.15km/h 
            if b <= 1:
                Survival[k] = 1
            elif b >= 20:
                Survival[k] = 0
            else:
                Survival[k] = 0.549*b**(-0.584)
        exp_survival = Survival.mean() 
         
        return avg_dist, total_cover, partial_cover, exp_survival

#Start Kmeans clustering
#Haven't Store SGbuilding address for mapping candidateAEDs to buildings 

    LatOHCA = np.array(uncoveredOhca.values_list('lat',flat=True)) 
    LongOHCA = np.array(uncoveredOhca.values_list('lon',flat=True))                
    M = len(LatOHCA) 
    OHCA_uncovered_array = np.concatenate((LatOHCA.reshape(M,1), LongOHCA.reshape(M,1)),axis=1)
    #N = len(LatBuilding) 
    #Building_array = np.concatenate((LatBuilding.reshape(N,1),LongBuilding.reshape(N,1)),axis=1) 
    
    LatOHCA = np.array(allOhca.values_list('lat',flat=True)) 
    LongOHCA = np.array(allOhca.values_list('lon',flat=True))                
    M = len(LatOHCA) 
    OHCA_array = np.concatenate((LatOHCA.reshape(M,1), LongOHCA.reshape(M,1)),axis=1)
    
    LatAED = np.array(currentAeds.values_list('lat',flat=True)) 
    LongAED = np.array(currentAeds.values_list('lon',flat=True)) 
    L = len(LatAED)
    currentAED_array = np.concatenate((LatAED.reshape(L,1), LongAED.reshape(L,1)),axis=1) 

    CC_final = [] 
    OHCA_final = []     
    k1 = 50
    
    if available_aeds <= 500:
        OHCA_kcluster_array, CC_kcluster = kmeans_OHCA(OHCA_uncovered_array, available_aeds)
        CC_final_array = np.array(CC_kcluster)
        #OHCA_kcluster_df = pd.DataFrame(OHCA_kcluster_array, columns=['LatOHCA','LongOHCA','cluster'])
        
    else:   
        
        OHCA_kcluster_array, CC_kcluster = kmeans_OHCA(OHCA_uncovered_array, k1) 
        OHCA_kcluster_df = pd.DataFrame(OHCA_kcluster_array, columns=['LatOHCA','LongOHCA','cluster'])
        
        k2 = min(available_aeds//k1, len(OHCA_uncovered_array)//k1)

        for i in range(0,k1):     
            OHCA_i = OHCA_kcluster_df.loc[OHCA_kcluster_df['cluster']==i].drop(columns = ['cluster']).reset_index(drop=True)    
            
            OHCA_second_layer, CC_second_layer = kmeans_OHCA(OHCA_i, k2)  
            CC_final.append(CC_second_layer) 
            OHCA_final.append(OHCA_second_layer) 

        lst_for_CC = [] 
        for i in range(0,k1): 
            for j in range(0,len(CC_final[i])):
                lst_for_CC.append(CC_final[i][j])


        CC_final_array = np.array(lst_for_CC)

    allAeds_array = np.concatenate((currentAED_array, CC_final_array), axis=0)
    
    performace_metric_new = Coverage(OHCA_array, allAeds_array, MAX_DISTANT = 100, ALPHA = 0.05) 
    performace_metric = Coverage(OHCA_array, currentAED_array, MAX_DISTANT = 100, ALPHA = 0.05)
    #AEDplacement_array = ToNearestBuilding(CC_9900_array, Building_array) 
 
    result = {'AED placement':CC_final_array, 
    'Average Distance':performace_metric[0], 
    'Total Coverage':performace_metric[1], 
    'Partial Coverage':performace_metric[2], 
    'Survival Rate':performace_metric[3],

    'New Average Distance':performace_metric_new[0], 
    'New Total Coverage':performace_metric_new[1], 
    'New Partial Coverage':performace_metric_new[2], 
    'New Survival Rate':performace_metric_new[3] 
    } 
    
    return Response(result)



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

