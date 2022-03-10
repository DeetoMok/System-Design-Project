import React, { useState, useRef} from 'react';
import GoogleMapReact from "google-map-react";
import Polyline from "google-map-react";
import { heatMapData } from './heatMapdata';
import "./heatMap.css";
import { currentAedData } from './currentAedData';
import { optimalAedData } from './optimalAedData';
import { newAedData } from './newAedData';

function OhcaHeatMap() {

    const mapRef = useRef();

    const handleApiLoaded = (map, maps) => {
    
      var triangleCoords = heatMapData[0].coordinates;
      console.log("DATA", heatMapData[0].coordinates);
      console.log("map", map);
      console.log("maps", maps);
      heatMapData.map((subzone) => {
        var coords = subzone.coordinates;      
        var subzoneArea = new maps.Polygon({
        paths: coords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.5,
        
        });

        var infoLatlng = new maps.LatLng(subzone.coordinates[0].lat, subzone.coordinates[0].lng)
        let contentString =     "<b>"+ subzone.subzone_name +"</b><br>" +
        "Region:"+ subzone.region +" <br>" +
        "OHCA Density:"+ "MY NUMBER DATA HERE WHEREEE :')" +" <br>" +
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
  )
}

export default OhcaHeatMap