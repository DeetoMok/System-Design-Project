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
import "./heatMap.css";
import { currentAedData } from './currentAedData';
import { optimalAedData } from './optimalAedData';
import { newAedData } from './newAedData';

function valueLabelFormat(value) {
  return `Year ${value}`;
}

function HeatMap() {

  const mapRef = useRef();
  const [map, setMap] = React.useState();
  const [maps, setMaps] = React.useState();

  const handleApiLoaded2010 = (map, maps) => {
    heatMapData.map((subzone) => {
      var coords = subzone.coordinates;
      let popDensity = subzone.year['2010'].population_density;
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
      let popDensity = subzone.year['2020'].population_density;
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
          fillOpacity: 0.7,
          
          });
      } else if (popDensity <= 500){
        // yellow 100 - 500
        var subzoneArea = new maps.Polygon({
          paths: coords,
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "#e6e60b",
          fillOpacity: 0.7,
          
          });
      } else if (popDensity <= 3500){
        // orange 500 - 3.5k
        var subzoneArea = new maps.Polygon({
          paths: coords,
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "#e6870b",
          fillOpacity: 0.7,
          
          });
      } else if (popDensity <= 20000){
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
      let popDensity = subzone.year['2015'].population_density;
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
          fillOpacity: 0.7,
          
          });
      } else if (popDensity <= 500){
        // yellow 100 - 500
        var subzoneArea = new maps.Polygon({
          paths: coords,
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "#e6e60b",
          fillOpacity: 0.7,
          
          });
      } else if (popDensity <= 3500){
        // orange 500 - 3.5k
        var subzoneArea = new maps.Polygon({
          paths: coords,
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "#e6870b",
          fillOpacity: 0.7,
          
          });
      } else if (popDensity <= 20000){
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

  const [snapshotYear, setSnapshotYear] = React.useState(2015);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setSnapshotYear(newValue);
    }
    // console.log(map);
  };

  return (
    <div className='heatMap'>
      <div className='reactMap'>
        {(snapshotYear===2010) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: 1.3599614835747427, lng: 103.82221222898332 }}
          defaultZoom={11.5}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2010(map,maps)}
          >
            <Polyline 
            />
          </GoogleMapReact>
        ) : (<></>)}
        {(snapshotYear===2015) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: 1.3599614835747427, lng: 103.82221222898332 }}
          defaultZoom={11.5}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2015(map,maps)}
          >
            <Polyline 
            />
          </GoogleMapReact>          
        ): (<></>)
        }
        {(snapshotYear===2020) ? (
          <GoogleMapReact
          bootstrapURLKeys={{
              key: 'AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II'
          }}
          defaultCenter={{ lat: 1.3599614835747427, lng: 103.82221222898332 }}
          defaultZoom={11.5}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps}) => handleApiLoaded2020(map,maps)}
          >
            <Polyline 
            />
          </GoogleMapReact>          
        ): (<></>)
        }        

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
          </Box>        
        </div>

    </div>
  )
}

export default HeatMap