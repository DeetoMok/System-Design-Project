import React, { useState, useRef} from 'react';
import GoogleMapReact from "google-map-react";
import Polyline from "google-map-react";

function YearGender({ heatMapData, snapshotYear, gender, zoom, pan, setPan, setZoom }) {
    const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);    

    const handleApiLoaded2010 = (map, maps) => {
        heatMapData.map((subzone) => {
          var coords = subzone.coordinates;
          let population = sumValues(subzone.year['2010'].gender)
          let area = subzone.area;
          let popDensity = population/area;
          if (popDensity == 0) {
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#FFFFFF",
              fillOpacity: 0.7,
              
              });
          } else if (popDensity <= 100) {
            // green 0-100
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#5fe60b",
              fillOpacity: 0.3+(popDensity/100),
              
              });
          } else if (popDensity <= 500){
            // yellow 100 - 500
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#e6e60b",
              fillOpacity: 0.3+(popDensity/500),
              
              });
          } else if (popDensity <= 3500){
            // orange 500 - 3.5k
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#e6870b",
              fillOpacity: 0.3+(popDensity/3500),
              
              });
          } else if (popDensity <= 20000){
            // red 3.5 - 20k
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#00000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#d61a1a",
              fillOpacity: 0.3+(popDensity/2000),
              
              });
          } else{
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#f242f5",
              fillOpacity: 0.3+(popDensity/35000),
              
              });
          }
          let maxLat = 0;
          let maxLatIndex = 0;
          for (let i=0; i < subzone.coordinates.length; i++) {
            if (subzone.coordinates[i].lat>maxLat) {
              maxLat = subzone.coordinates[i];
              maxLatIndex = i;
              
            }
          }
          var infoLatlng = new maps.LatLng(subzone.coordinates[maxLatIndex].lat, subzone.coordinates[maxLatIndex].lng);
          
          let contentString = "<b>"+ subzone.subzone_name +"</b><br>" +
          "Region: "+ subzone.region +" <br>" +
          "Population Density: "+ popDensity.toFixed(2) +" <br>" +
          "<br>";
    
          var infoWindow =  new maps.InfoWindow({
            content: contentString,
            map: map,
            position: infoLatlng
          });  
    
          subzoneArea.setMap(map);
          infoWindow.close()
          subzoneArea.addListener("mouseover", ()=> {
            infoWindow.open(map, this);
          });
          subzoneArea.addListener("mouseout", () => {
            infoWindow.close();
          })
    
        })
      }
    const handleApiLoaded2010male = (map, maps) => {
        heatMapData.map((subzone) => {
          var coords = subzone.coordinates;
          let population = subzone.year['2010'].gender.Males
          let area = subzone.area;
          let popDensity = population/area;
          if (popDensity == 0) {
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#FFFFFF",
              fillOpacity: 0.7,
              
              });
          } else if (popDensity <= 100) {
            // green 0-100
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#5fe60b",
              fillOpacity: 0.3+(popDensity/100),
              
              });
          } else if (popDensity <= 500){
            // yellow 100 - 500
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#e6e60b",
              fillOpacity: 0.3+(popDensity/500),
              
              });
          } else if (popDensity <= 3500){
            // orange 500 - 3.5k
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#e6870b",
              fillOpacity: 0.3+(popDensity/3500),
              
              });
          } else if (popDensity <= 20000){
            // red 3.5 - 20k
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#00000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#d61a1a",
              fillOpacity: 0.3+(popDensity/2000),
              
              });
          } else{
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#f242f5",
              fillOpacity: 0.3+(popDensity/35000),
              
              });
          }
          let maxLat = 0;
          let maxLatIndex = 0;
          for (let i=0; i < subzone.coordinates.length; i++) {
            if (subzone.coordinates[i].lat>maxLat) {
              maxLat = subzone.coordinates[i];
              maxLatIndex = i;
              
            }
          }
          var infoLatlng = new maps.LatLng(subzone.coordinates[maxLatIndex].lat, subzone.coordinates[maxLatIndex].lng);
          
          let contentString = "<b>"+ subzone.subzone_name +"</b><br>" +
          "Region: "+ subzone.region +" <br>" +
          "Population Density: "+ popDensity.toFixed(2) +" <br>" +
          "<br>";
    
          var infoWindow =  new maps.InfoWindow({
            content: contentString,
            map: map,
            position: infoLatlng
          });  
    
          subzoneArea.setMap(map);
          infoWindow.close()
          subzoneArea.addListener("mouseover", ()=> {
            infoWindow.open(map, this);
          });
          subzoneArea.addListener("mouseout", () => {
            infoWindow.close();
          })
    
        })
      }  
    const handleApiLoaded2010female = (map, maps) => {
        heatMapData.map((subzone) => {
          var coords = subzone.coordinates;
          let population = subzone.year['2010'].gender.Females
          let area = subzone.area;
          let popDensity = population/area;
          if (popDensity == 0) {
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#FFFFFF",
              fillOpacity: 0.7,
              
              });
          } else if (popDensity <= 100) {
            // green 0-100
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#5fe60b",
              fillOpacity: 0.3+(popDensity/100),
              
              });
          } else if (popDensity <= 500){
            // yellow 100 - 500
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#e6e60b",
              fillOpacity: 0.3+(popDensity/500),
              
              });
          } else if (popDensity <= 3500){
            // orange 500 - 3.5k
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#e6870b",
              fillOpacity: 0.3+(popDensity/3500),
              
              });
          } else if (popDensity <= 20000){
            // red 3.5 - 20k
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#00000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#d61a1a",
              fillOpacity: 0.3+(popDensity/2000),
              
              });
          } else{
            var subzoneArea = new maps.Polygon({
              paths: coords,
              strokeColor: "#000000",
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#f242f5",
              fillOpacity: 0.3+(popDensity/35000),
              
              });
          }
          let maxLat = 0;
          let maxLatIndex = 0;
          for (let i=0; i < subzone.coordinates.length; i++) {
            if (subzone.coordinates[i].lat>maxLat) {
              maxLat = subzone.coordinates[i];
              maxLatIndex = i;
              
            }
          }
          var infoLatlng = new maps.LatLng(subzone.coordinates[maxLatIndex].lat, subzone.coordinates[maxLatIndex].lng);
          
          let contentString = "<b>"+ subzone.subzone_name +"</b><br>" +
          "Region: "+ subzone.region +" <br>" +
          "Population Density: "+ popDensity.toFixed(2) +" <br>" +
          "<br>";
    
          var infoWindow =  new maps.InfoWindow({
            content: contentString,
            map: map,
            position: infoLatlng
          });  
    
          subzoneArea.setMap(map);
          infoWindow.close()
          subzoneArea.addListener("mouseover", ()=> {
            infoWindow.open(map, this);
          });
          subzoneArea.addListener("mouseout", () => {
            infoWindow.close();
          })
    
        })
      }    

  return (
    <div>
        {((snapshotYear===2010) && (gender==="")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2010) && (gender==="male")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010male(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}     
        {((snapshotYear===2010) && (gender==="female")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010female(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}        
    </div>
  )
}

export default YearGender;