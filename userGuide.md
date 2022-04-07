# System Design Project Web Application - User Guide

Table of Contents<br>
.<br>
.<br>
.

# 1. Introduction
This Web Application is a dashboard that allows users to run optimization models and data visualizations with data sets relating to Out of Hospital Cardiac Arrests (OHCA) and Automated External Defibrillators (AED).

## 1.1. Purpose
The document contains the specified architecture and software design specifications for the application.

## 1.2. Scope
This describes the software features and design for the Web Application. This guide is mainly for developers, designers and web developers that are going to work on the dashboard.

# 2. Setting up
## 2.1 Prerequisites
1. NodeJS
2. Python

## 2.2 Setting up the project in your computer
1. Download all necessary python and NodeJS libraries in a virtual environment created in WebApp folder directory. Preferably, do this in a virtual environment.
Run `npm i` and `npm install --save google-map-react` in the frontend folder directory and 
`pip install -r "requirements.txt"` in the WebApp folder directory.
2. Change path of line 160 of ".\System-Design-Project\WebApp\dashboard\views.py" to be representative of user's path (NOTE: updating code to make this relative path is ideal)

# 3. Design
This section provides a high level overview of the web application.

## Design & Implementation
![system architecture](./Images/System%20Architecture.png)
The system architecture diagram above explains the high-leve design of the Web Application.
The client side component of the web application will run on ReactJS framework, while the
server side component of the web application will run on Django.

The server side component also commonly referred to as the backend is responsible for
processing data and running simulation and optimization models that are described in section. The client side component also commonly referred to as the frontend is responsible for
user interaction. A representational state transfer (REST) framework will be used to convert
data from the backend to be accessed and modified in the frontend.

# 3. Launching the application
## Backend
Start up the backend Django server with command `python manage.py runserver`
## Frontend
Start up the frontend with command `npm start`

# 4. Dashboard Pages
## 4.1 Main Page
![main page](./Images/Main%20Page.png)
This is the main page of the dashboard. On the top, there are three blocks which display the number of distinct regions, planning areas and subzones calculated based on existing data that was uploaded to the platform. In the centre of the page is an interactive map that shows the locations of all existing AED locations. Each heart icon represents a single AED, while each blue circle with a number in it represents a cluster that has that number of AEDs within it.

## 4.2 Data Management
![data management unpopulated](./Images/Data%20Management.png)
In this page, users will be able to toggle between Existing AED Locations Data, AED Candidate Locations Data and OHCA Data. When there is no data in the database, an empty box will appear to prompt the user to upload data in comma separated values (CSV) format. This can be done by dragging and dropping csv files into the empty box or clicking into the box to select a file for uploading.

![data management populated](./Images/Data%20Management%20Populated.png)
If existing data has been uploaded, a sample of 30 rows will be displayed in a table format along with the size of the data set uploaded.

### 4.2.1 Relevant Code Files
Note: 
- Backend functions are obtained from views.py in System-Design-Project/WebApp/dashboard/views.py
- Frontend js files are obtained from System-Design-Project/WebApp/frontend/src
### 4.2.1.1 View Data

| Frontend / Backend | Description |
| ----------- | ----------- |
| Frontend (DataManagement.js) | Frontend displays components|
| Backend (getAeds)|gets all AedCandidate objects from the database|
| Backend (getAedCandidates) | gets all AedCandidate objects from the database |
| Backend (getOhcas) | gets all AedCandidate objects from the database |

### 4.2.1.1 Update Data

| Frontend / Backend | Description |
| ----------- | ----------- |
| Frontend (DataManagement.js) | Frontend displays components|
| Backend (updateAeds)|updates all AedCandidate objects to the database (Expected columns of csv upload file - id, lat, lon)|
| Backend (updateAedCandidates) | updates all AedCandidate objects to the database (Expected columns of csv upload file - id, lat, lon)|
| Backend (updateOhcas) | updates all AedCandidate objects to the database (Expected columns of csv upload file - Date of Incident, Location of incident, Age, Gender, Race). Converts Location of incident to lat, lon with OneMap API, and aggregates raw data grouped by attributes. |

### 4.2.1.1 Delete Data

| Frontend / Backend | Description |
| ----------- | ----------- |
| Frontend (DataManagement.js) | Frontend displays components|
| Backend (deleteAeds)|deletes all AedCandidate objects from the database|
| Backend (deleteAedCandidates) | deletes all AedCandidate objects from the database |
| Backend (deleteOhcas) | deletes all AedCandidate objects from the database |

## 4.3 Additional AED Modeling
![add AED Modeling before input](./Images/Add%20AED%20Modeling%20before%20input.png)
This section shows a geographical map as the data visual that is the same as the map in the main page. The “Parameters” component is where users are prompted for how many additional AEDs are to be added to the list of existing AEDs in Singapore. The “Current Metrics” component shows the current metrics - Total Coverage, Partial Coverage, Expected Survival, Ave Dist to Closest AED, based on existing AEDs in Singapore, while the “New Metrics” component will show the value of metrics once additional AEDs have been submitted by the user.
![add AED Modeling before input](./Images/Add%20AED%20Modeling%20afrter%20input.png)
This is how the geographical map appears after the user submits the number of AEDs to add to the map. Each star on the map represents the optimal locations to place additional AEDs. Moreover, the “New Metrics” table will be updated to show metrics re-calculated when including the AEDs requested by the user, and a table of optimal lat lon locations will appear.

### 4.3.1 Relevant Code Files
Note: 
- Backend functions are obtained from views.py in System-Design-Project/WebApp/dashboard/views.py
- Frontend js files are obtained from System-Design-Project/WebApp/frontend/src

#### 4.3.1.1 Displaying components
| Frontend / Backend | Description |
| ----------- | ----------- |
| Frontend (currentAedData.js)| Data where currentAED for map is stored. (Changing to API Calling possible)|
| Frontend (KmeansModel.js, KmeansMap.js) | Frontend displays input component and metrics tables|

#### 4.3.1.1 Adding Additional AED feature
| Frontend / Backend | Description |
| ----------- | ----------- |
|Backend (optimalOhcas from views.py)|gets all aed and ohca data that was uploaded to the database. Performs Kmeans on all ohca occurence that is uncovered to get k centroids that represents lat, lon og k additional AEDs.|
## 4.4 Population Heat Map
![population heatmap](./Images/population%20heatmap.png)
In this page, users can view the Singapore map segregated into polygons that represent the subzones. Each subzone is filled with a colour that represents its population density. Colours sorted from green, yellow, orange, red and pink represent the lowest to highest density value, while uncoloured subzones are those with no population or no data for that population. Furthermore, users can hover their mouse over specific subzones to display more information such as the subzone name, region, area, and population density value.
Right below the map is a data table that displays the subzone name, region, area, and population density value of all the subzones displayed on the map. This will allow users a bird’s eye view of all population related subzone information. 
To the right of the table are snapshot year (2010, 2015, 2020), gender (Male, Female), ethnicity (Chinese, Malay, Indian, Others) and age (0-34, 35-64, >65) filters for users to choose. Choosing specific filters will dynamically change the display and information of the map. This feature allows users to make comparisons of population density of subzones across different groups and years.

### 4.4.1 Relevant Code Files
Note: 
- Backend functions are obtained from views.py in System-Design-Project/WebApp/dashboard/views.py
- Frontend js files are obtained from System-Design-Project/WebApp/frontend/src

| Frontend / Backend | Description |
| ----------- | ----------- |
|Frontend (HeatMap.js)|Uses google map react library to display and create polygons based on heatMapData.js|


## 4.5 OHCA Heat Map
![ohca heatmap](./Images/ohca%20heatmap.png)
In this page, users can view the Singapore map segregated into polygons that represent the subzones. Each subzone is filled with a colour that represents the incidence rate of OHCA occurrence. Incidence rate is the number of OHCA count over the population count of each subzone. Colours sorted from green, yellow, orange, red and pink represent the lowest to highest incidence rate, while uncoloured subzones are those with no population or no data for that population. Furthermore, users can hover their mouse over specific subzones to display more information such as the subzone name, region, area, OHCA count, and incidence rate value.
Right below the map is a data table that displays the subzone name, region, OHCA count, area and incidence rate value of all the subzones displayed on the map. This will allow users a bird’s eye view of all OHCA related subzone information. 
To the right of the table are snapshot year (2010, 2015, 2020), gender (Male, Female), ethnicity (Chinese, Malay, Indian, Others) and age (0-34, 35-64, >65) filters for users to choose. Choosing specific filters will dynamically change the display and information of the map. This feature allows users to make comparisons of OHCA incidence rate of subzones.

### 4.5.1 Relevant Code Files
Note: 
- Backend functions are obtained from views.py in System-Design-Project/WebApp/dashboard/views.py
- Frontend js files are obtained from System-Design-Project/WebApp/frontend/src

| Frontend / Backend | Description |
| ----------- | ----------- |
|Frontend (OhcaHeatMap.js)|Uses google map react library to display and create polygons based on heatMapData (ideally, this should be called from the backend getOhcaJson from views.py)|





