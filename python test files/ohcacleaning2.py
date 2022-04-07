#!/usr/bin/env python
# coding: utf-8

# input: 
# 1)A csv/excel with OHCA coordinates in lat and lon
# 2)A csv/excel with AED coordinates in lat and lon
# 
# Process
# If(OHCA) is within 100 circular distance from the AED, remove from the sheet
# Note: Calculate the distance in terms of lat/long
# 
# output: 
# 1)A csv/excel with OHCA coordinates that are out of the service range of available AEDs.
# 
# need to import haversine

# In[46]:


import pandas as pd
import haversine as hs


# In[47]:


aed = pd.read_excel("~/Desktop/AEDcurrent.xlsx")
aed


# In[48]:


ohca = pd.read_csv("~/Desktop/Virtual Test Problems/Test Problem Set 1 - 20210203/generatedPoints1_10000.csv")
ohca.columns = ["Latitude","Longtitude"]


# In[49]:


ohca


# Cleaning up data - force all values to be numeric. drop all NaN values

# In[50]:


aed['Latitude'] = pd.to_numeric(aed['Latitude'], errors='coerce')
aed = aed.dropna().reset_index(drop=True)


# In[51]:


aed['Longtitude'] = pd.to_numeric(aed['Longtitude'], errors='coerce')
aed = aed.dropna().reset_index(drop=True)


# In[52]:


ohca['Latitude'] = pd.to_numeric(ohca['Latitude'], errors='coerce')
ohca = ohca.dropna().reset_index(drop=True)


# In[53]:


ohca['Longtitude'] = pd.to_numeric(ohca['Longtitude'], errors='coerce')
ohca = ohca.dropna().reset_index(drop=True)


# Make into tuple

# In[54]:


aed['geom'] =list(zip(aed.Longtitude,aed.Latitude))


# In[55]:


ohca['geom']=list(zip(ohca.Longtitude,ohca.Latitude))


# In[56]:


radius=100


# In[57]:


ohca


# In[58]:


remove=[]


# In[59]:


import time
start_time = time.time()


# for i in range(len(aed)):
#     for j in range(len(ohca)):
#         distance = hs.haversine(aed.geom[i],ohca.geom[j])*1000
#         if distance<=radius:
#             remove.append(j)

# ohca = ohca.drop(remove)

# points.sort()
# points

# In[60]:


ohca


# ohca = ohca.drop(a).reset_index(drop=True)

# ohca

# point=[]

# radius = 100/1110000
# import time
# start_time = time.time()
# for i in range(10):
#     c = aed.Latitude[i]
#     d = aed.Longtitude[i]
#     for j in range(len(ohca)):
#         distance = pow((pow(c-ohca.Latitude[j],2) + pow(d-ohca.Latitude[j],2)),0.5)
#         if distance<=radius:
#             point.append(j)
# print("--- %s seconds ---" % (time.time() - start_time))

# point.sort()
# point

# In[61]:


import json
with open('master-plan-2019-subzone-boundary-no-sea-geojson.geojson') as f:
    gj = json.load(f)

for feature in gj['features']:
    print(feature['geometry']['type'])
    print(feature['geometry']['coordinates'])


# In[62]:


geometry_list = []  # for area calculation
for feature in gj['features']:
    geometry_list.append(feature['geometry'])

geometry_list


# In[63]:


coordinates_list = []  # to be used for OHCA
for feature in gj['features']:
    subzone_coordinates = []
    for coordinate in feature['geometry']['coordinates'][0]:
        temp = (coordinate[0], coordinate[1])
        subzone_coordinates.append(temp)
    
    coordinates_list.append(subzone_coordinates)


# In[64]:


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

len(fixedkml[0][0])


# In[65]:


listohca = []
for i in range(332):
    listohca.append([])


# In[66]:


from shapely.geometry import shape, Point
from shapely.geometry.polygon import Polygon

#for kml without errors (332-11)
skipnumber = [3, 6, 7, 8, 9, 118, 158, 294, 299, 303, 331]

for i in range((len(ohca.geom))): # 9734 points
    point = Point(ohca.geom[i])
    for  j in range(332): # 332 subzones  - [3, 6, 7, 8, 9, 118, 158, 294, 299, 303, 331] error kmls
        if j in skipnumber:
            continue
        else:

            polygon = Polygon(coordinates_list[j])
            pointinpoly = polygon.contains(point)
            
            if pointinpoly == True:
                listohca[j].append(i)
                break


# In[67]:


listohca


# In[68]:


listaed = []

for i in range(332):
    listaed.append([])


# In[69]:


skipnumber = [3, 6, 7, 8, 9, 118, 158, 294, 299, 303, 331]

for i in range((len(aed))):
    point = Point(aed.geom[i])
    for  j in range(332): 
        if j in skipnumber:
            continue
        else:

            polygon = Polygon(coordinates_list[j])
            pointinpoly = polygon.contains(point)

            if pointinpoly == True:
                print(j)
                print(i)
                listaed[j].append(i)
                break


# In[70]:


listaed


# In[71]:


points = []


# In[72]:


for i in range(332):# for each subzone 1
    for j in range(len(listohca[i])):  #for each ohca coordinate 1
        b = ohca.geom[listohca[i][j]] 
        print(b) # ohca coordinates for the jth index
        for k in range(len(listaed[i])): #compare with every aed in the same subzone
            distance = hs.haversine(b,aed.geom[listaed[i][k]])*1000
            if distance<=radius:
                points.append(listohca[i][j])


# In[73]:


points.sort()
points


# In[74]:


regular_list = listohca
flat_list = [item for sublist in regular_list for item in sublist]
flat_list.sort()
flat_list

def find_missing(lst):
    return [x for x in range(lst[0], lst[-1]+1) 
                               if x not in lst]

# Driver code
lst = flat_list
listna = find_missing(lst)


# In[75]:


for i in range(len(listna)):
    b = ohca.geom[listna[i]]
    for j in range(len(aed)):
        distance = hs.haversine(b,aed.geom[j])*1000
        if distance<=radius:
            points.append(i)
            break


# In[76]:


newohca = ohca.drop(points).reset_index(drop=True)


# In[77]:


newohca

