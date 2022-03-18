import React, { useState, useRef} from 'react';
import GoogleMapReact from "google-map-react";
import Polyline from "google-map-react";
import { heatMapData } from './heatMapdata';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./heatMap.css";
import { currentAedData } from './currentAedData';
import { optimalAedData } from './optimalAedData';
import { newAedData } from './newAedData';

function valueLabelFormat(value) {
  return `Year ${value}`;
}

function HeatMap() {

  const mapRef = useRef();
  const [zoom, setZoom] = useState(11.5);
  const [pan, setPan] = useState({ lat: 1.3599614835747427, lng: 103.82221222898332 }); 
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
  const handleApiLoaded2010chinese = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2010'].ethnicity.Chinese
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
  const handleApiLoaded2010malay = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2010'].ethnicity.Malays
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
  const handleApiLoaded2010indian = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2010'].ethnicity.Indians
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
  const handleApiLoaded2010others = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2010'].ethnicity.Others
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
  const handleApiLoaded2010young = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2010'].age['0-4']+subzone.year['2010'].age['5-9']+subzone.year['2010'].age['10-14']+subzone.year['2010'].age['15-19']+subzone.year['2010'].age['20-24']+subzone.year['2010'].age['25-29']+subzone.year['2010'].age['30-34']
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
  const handleApiLoaded2010middle = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2010'].age['35-39']+subzone.year['2010'].age['40-44']+subzone.year['2010'].age['45-49']+subzone.year['2010'].age['50-54']+subzone.year['2010'].age['55-59']+subzone.year['2010'].age['60-64']
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
  const handleApiLoaded2010old = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2010'].age['65-69']+subzone.year['2010'].age['70-74']+subzone.year['2010'].age['75-79']+subzone.year['2010'].age['80-84']+subzone.year['2010'].age['over 85']+subzone.year['2010'].age['over 90']
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

  const handleApiLoaded2015 = (map, maps) => { 
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = sumValues(subzone.year['2015'].gender)
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
  const handleApiLoaded2015male = (map, maps) => { 
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2015'].gender.Males
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
  const handleApiLoaded2015female = (map, maps) => { 
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2015'].gender.Females
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
  const handleApiLoaded2015chinese = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2015'].ethnicity.Chinese
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
  const handleApiLoaded2015malay = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2015'].ethnicity.Malays
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
  const handleApiLoaded2015indian = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2015'].ethnicity.Indians
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
  const handleApiLoaded2015others = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2015'].ethnicity.Others
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
  const handleApiLoaded2015young = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2015'].age['0-4']+subzone.year['2015'].age['5-9']+subzone.year['2015'].age['10-14']+subzone.year['2015'].age['15-19']+subzone.year['2015'].age['20-24']+subzone.year['2015'].age['25-29']+subzone.year['2015'].age['30-34']
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
  const handleApiLoaded2015middle = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2015'].age['35-39']+subzone.year['2015'].age['40-44']+subzone.year['2015'].age['45-49']+subzone.year['2015'].age['50-54']+subzone.year['2015'].age['55-59']+subzone.year['2015'].age['60-64']
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
  const handleApiLoaded2015old = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2015'].age['65-69']+subzone.year['2015'].age['70-74']+subzone.year['2015'].age['75-79']+subzone.year['2015'].age['80-84']+subzone.year['2015'].age['over 85']+subzone.year['2015'].age['over 90']
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

  const handleApiLoaded2020 = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = sumValues(subzone.year['2020'].gender)
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
  const handleApiLoaded2020male = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2020'].gender.Males
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
  const handleApiLoaded2020female = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2020'].gender.Females
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
  const handleApiLoaded2020chinese = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2020'].ethnicity.Chinese
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
  const handleApiLoaded2020malay = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2020'].ethnicity.Malays
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
  const handleApiLoaded2020indian = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2020'].ethnicity.Indians
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
  const handleApiLoaded2020others = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2020'].ethnicity.Others
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
  const handleApiLoaded2020young = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2020'].age['0-4']+subzone.year['2020'].age['5-9']+subzone.year['2020'].age['10-14']+subzone.year['2020'].age['15-19']+subzone.year['2020'].age['20-24']+subzone.year['2020'].age['25-29']+subzone.year['2020'].age['30-34']
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
  const handleApiLoaded2020middle = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2020'].age['35-39']+subzone.year['2020'].age['40-44']+subzone.year['2020'].age['45-49']+subzone.year['2020'].age['50-54']+subzone.year['2020'].age['55-59']+subzone.year['2020'].age['60-64']
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
  const handleApiLoaded2020old = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let population = subzone.year['2020'].age['65-69']+subzone.year['2020'].age['70-74']+subzone.year['2020'].age['75-79']+subzone.year['2020'].age['80-84']+subzone.year['2020'].age['over 85']+subzone.year['2020'].age['over 90']
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


  const [snapshotYear, setSnapshotYear] = React.useState(2010);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setSnapshotYear(newValue);
    }
  };
  const [gender, setGender] = React.useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    if (event.target.value!=="") {
      setEthnicity("");
      setAge("");
    }
  };
  const [ethnicity, setEthnicity] = React.useState('');

  const handleEthnicityChange = (event) => {
    setEthnicity(event.target.value);
    if (event.target.value!=="") {
      setGender("");
      setAge("");
    }
  };

  const [age, setAge] = React.useState('');

  const handleAgeChange = (event) => {
    setAge(event.target.value);
    if (event.target.value!=="") {
      setGender("");
      setEthnicity("");
    }
  };  

  return (
    <div className='heatMap'>
      <div className='reactMap'>
        {((snapshotYear===2010) && (gender==="") && (ethnicity==="") && (age==="")) ? (
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
        {((snapshotYear===2010) && (ethnicity==="chinese")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010chinese(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2010) && (ethnicity==="malay")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010malay(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}     
        {((snapshotYear===2010) && (ethnicity==="indian")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010indian(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}     
        {((snapshotYear===2010) && (ethnicity==="others")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010others(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}           
        {((snapshotYear===2010) && (age==="0-34")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010young(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2010) && (age==="35-64")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010middle(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2010) && (age==="65-over90")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010old(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}                



        
        {(snapshotYear===2015) && (gender==="")  && (ethnicity==="") && (age==="")? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }} 
          >
            <Polyline 
            />
          </GoogleMapReact>          
        ): (<></>)
        }
        {(snapshotYear===2015) && (gender==="male") ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015male(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }} 
          >
            <Polyline 
            />
          </GoogleMapReact>          
        ): (<></>)
        }
        {(snapshotYear===2015) && (gender==="female") ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015female(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }} 
          >
            <Polyline 
            />
          </GoogleMapReact>          
        ): (<></>)
        }
        {((snapshotYear===2015) && (ethnicity==="chinese")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015chinese(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2015) && (ethnicity==="malay")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015malay(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2015) && (ethnicity==="indian")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015indian(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2015) && (ethnicity==="others")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015others(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}      
        {((snapshotYear===2015) && (age==="0-34")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015young(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}     
        {((snapshotYear===2015) && (age==="35-64")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015middle(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2015) && (age==="65-over90")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015old(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}               




        {(snapshotYear===2020) && (gender==="")  && (ethnicity==="") && (age==="")? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}      
          >
            <Polyline 
            />
          </GoogleMapReact>          
        ): (<></>)
        }
        {(snapshotYear===2020) && (gender==="male") ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020male(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}      
          >
            <Polyline 
            />
          </GoogleMapReact>          
        ): (<></>)
        }
        {(snapshotYear===2020) && (gender==="female") ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020female(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}      
          >
            <Polyline 
            />
          </GoogleMapReact>          
        ): (<></>)
        }
        {((snapshotYear===2020) && (ethnicity==="chinese")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020chinese(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2020) && (ethnicity==="malay")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020malay(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2020) && (ethnicity==="indian")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020indian(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2020) && (ethnicity==="others")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020others(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2020) && (age==="0-34")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020young(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}     
        {((snapshotYear===2020) && (age==="35-64")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020middle(map,maps)}
          onChange={({zoom, center}) => {
            setPan({lat: center.lat, lng: center.lng});
            setZoom(zoom);
          }}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {((snapshotYear===2020) && (age==="65-over90")) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: pan.lat, lng: pan.lng }}
          defaultZoom={zoom}
          
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020old(map,maps)}
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

        <div className='body'>
          <TableContainer
            sx={{
              height: 500,
              width: "65%"
            }}
          >
            <Table size="small" 
              sx={{
                height: "max-content"
              }}>
              <TableHead>
                <TableRow>
                  <TableCell>Subzone</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Area</TableCell>
                  <TableCell>Population</TableCell>
                  <TableCell>Population Density</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  
                  {heatMapData.map((subzone) => (
                    <TableRow key={subzone.id}>
                      <TableCell>{subzone.subzone_name}</TableCell>
                      <TableCell>{subzone.region}</TableCell>
                      <TableCell>{subzone.area}</TableCell>
                      <TableCell>{subzone.population}</TableCell>
                      <TableCell>{subzone.population_density}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>            
            </Table>
          </TableContainer>
          <Box sx={{ width: 250 }}>
            <Typography id="non-linear-slider" gutterBottom>
              Year Snapshot: {valueLabelFormat(snapshotYear)}
            </Typography>
            <Slider
              value={snapshotYear}
              min={2010}
              step={5}
              max={2020}
              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="non-linear-slider"
            />

            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={gender}
                onChange={handleGenderChange}
                autoWidth
                label="Gender"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Ethnicity</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={ethnicity}
                onChange={handleEthnicityChange}
                autoWidth
                label="Ethnicity"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"chinese"}>Chinese</MenuItem>
                <MenuItem value={"malay"}>Malay</MenuItem>
                <MenuItem value={"indian"}>Indian</MenuItem>
                <MenuItem value={"others"}>Others</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={age}
                onChange={handleAgeChange}
                autoWidth
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"0-34"}>0 - 34</MenuItem>
                <MenuItem value={"35-64"}>35 - 64</MenuItem>
                <MenuItem value={"65-over90"}>65 - over 90</MenuItem>
              </Select>
            </FormControl>               

          </Box>        
        </div>

    </div>
  )
}

export default HeatMap