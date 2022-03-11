import React, { useState, useRef} from 'react';
import GoogleMapReact from "google-map-react";
import Polyline from "google-map-react";
import { heatMapData } from './heatMapdata';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import "./heatMap.css";
import { currentAedData } from './currentAedData';
import { optimalAedData } from './optimalAedData';
import { newAedData } from './newAedData';

function HeatMap() {

    const mapRef = useRef();

    const handleApiLoaded = (map, maps) => {
    
      console.log("DATA", heatMapData[0].coordinates);
      console.log("map", map);
      console.log("maps", maps);
      heatMapData.map((subzone) => {
        var coords = subzone.coordinates;

        if (subzone.population_density == 0) {
          var subzoneArea = new maps.Polygon({
            paths: coords,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#FFFFFF",
            fillOpacity: 0.7,
            
            });
        } else if (subzone.population_density <= 100) {
          // green 0-100
          var subzoneArea = new maps.Polygon({
            paths: coords,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#5fe60b",
            fillOpacity: 0.7,
            
            });
        } else if (subzone.population_density <= 500){
          // yellow 100 - 500
          var subzoneArea = new maps.Polygon({
            paths: coords,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#e6e60b",
            fillOpacity: 0.7,
            
            });
        } else if (subzone.population_density <= 3500){
          // orange 500 - 3.5k
          var subzoneArea = new maps.Polygon({
            paths: coords,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#e6870b",
            fillOpacity: 0.7,
            
            });
        } else if (subzone.population_density <= 20000){
          // red 3.5 - 20k
          var subzoneArea = new maps.Polygon({
            paths: coords,
            strokeColor: "#00000",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#d61a1a",
            fillOpacity: 0.7,
            
            });
        } else{
          var subzoneArea = new maps.Polygon({
            paths: coords,
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: "#f242f5",
            fillOpacity: 0.7,
            
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
        "Population Density: "+ subzone.population_density.toFixed(2) +" <br>" +
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
    <div className='heatMap'>
        <div className='reactMap'>
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: 1.3599614835747427, lng: 103.82221222898332 }}
          defaultZoom={11.5}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded(map,maps)}
          >
            <Polyline 
            />
          </GoogleMapReact>
        </div>
        <div>
          <Table size="small">
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
        </div>
    </div>
  )
}

export default HeatMap