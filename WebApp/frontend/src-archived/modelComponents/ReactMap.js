import React from 'react';
import GoogleMapReact from "google-map-react";

export default function ReactMap() {
  return (
    <GoogleMapReact 
    bootstrapURLKeys={{key: process.env.AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II}}
    defaultCenter={{ lat: 1.290270, lng: 103.851959 }}
    defaultZoom={11.5}
    >

    </GoogleMapReact>
  )

}
