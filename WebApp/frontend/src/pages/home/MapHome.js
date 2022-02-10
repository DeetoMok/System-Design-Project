import React, { useState, useRef} from 'react';
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./home.css";
import { currentAedData } from './currentAedData';

const Marker = ({children}) => children;


export default function MapHome() {

    const mapRef = useRef();
    const [zoom, setZoom] = useState(11.5);
    const [bounds, setBounds] = useState(null);
    let currentAeds = currentAedData.slice(0,9000);
    let id = 1;
    const points = currentAeds.map(aed => ({
        "type": "Feature",
        "properties": {
          "cluster": false,
          "aedId": aed.Postal_Code,
        },
        "geometry": { 
            "type": "Point",
            "coordinates": [
                parseFloat(aed.Longitude),
                parseFloat(aed.Latitude)
            ] 
        }
      }));

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: {radius: 75, maxZoom: 20}
    })

    console.log(clusters);
  return (
        <GoogleMapReact 
            bootstrapURLKeys={{key: process.env.AIzaSyCsATUmU17pbVtJlvkLZwuEpTxafin92II}}
            defaultCenter={{ lat: 1.3599614835747427, lng: 103.82221222898332 }}
            defaultZoom={11.5}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({map}) => {
                mapRef.current = map;
            }}
            onChange={({zoom, bounds}) => {
                setZoom(zoom);
                setBounds([
                    bounds.nw.lng,
                    bounds.se.lat,
                    bounds.se.lng,
                    bounds.nw.lat
                ]);
            }}
        >
            {clusters.map(cluster => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const {
                    cluster: isCluster, 
                    point_count: pointCount
                } = cluster.properties;

                if (isCluster) {
                    return (
                        <Marker key={id++} lat={latitude} lng={longitude}>
                            <div className='cluster-marker' 
                            style={{
                                width: `${5 + (pointCount / points.length) * 200}px`,
                                height: `${5 + (pointCount / points.length) * 200}px`
                            }}
                            onClick={() => {
                                const expansionZoom = Math.min(
                                    supercluster.getClusterExpansionZoom(cluster.id),
                                    20
                                );
                                mapRef.current.setZoom(expansionZoom);
                                mapRef.current.panTo({ lat: latitude, lng: longitude});
                            }}
                            >
                                {pointCount}
                            </div>
                        </Marker>
                    )
                }

                return (
                <Marker key={id++} lat={latitude} lng={longitude}>
                    <button className='aed-marker'>
                        <img src="/heart-attack.png" alt="aed is here!" />
                    </button>
                </Marker>
                )
            })}
            {/* {currentAeds.map(aed => (
                <Marker key={id++} lat={aed.Latitude} lng={aed.Longitude}>
                    <button className='aed-marker'>
                        <img src="/heart-attack.png" alt="aed is here!" />
                    </button>
                </Marker>
            ))} */}
        </GoogleMapReact>

  );
}
