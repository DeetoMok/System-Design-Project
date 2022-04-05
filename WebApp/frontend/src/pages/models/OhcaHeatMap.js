import React, { useState, useRef, useEffect} from 'react';
import GoogleMapReact from "google-map-react";
import Polyline from "google-map-react";
import { heatMapData } from './heatMapdata';
import { ohcaData } from './ohcaData';
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

function valueLabelFormat(value) {
  return `Year ${value}`;
}

function OhcaHeatMap() {

  const mapRef = useRef();
  // const [ohcaData, setData] = useState([]);
  useEffect(() => {
    // getData()
    
  }, [])  
  let populationData = heatMapData;
  // NOTE: Ideally, ohcajson data should be extracted from the backed. However, for now it is extracted from project file.
  // let getData = async () => {
  //   let response = await fetch('http://127.0.0.1:8000/api/ohcajson/')
  //   let data = await response.json()
  //   console.log('GET DATA:', data)
  //   if (data.length !== 0) {
  //     setData(data)
  //   }
  // }  
  const [zoom, setZoom] = useState(11.5);
  const [pan, setPan] = useState({ lat: 1.3599614835747427, lng: 103.82221222898332 }); 
  const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

  const subzoneGenerator = (incidenceRate, maps, coords) => {
    if (incidenceRate == 'Infinity') {
      var subzoneArea = new maps.Polygon({
        paths: coords,
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#FFFFFF",
        fillOpacity: 0.2,
        
        });
    } else if (incidenceRate <= 0.001) {
      // green 0-100
      var subzoneArea = new maps.Polygon({
        paths: coords,
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#5fe60b",
        fillOpacity: 0.3+(incidenceRate/0.001),
        
        });
    } else if (incidenceRate <= 0.002){
      // yellow 100 - 500
      var subzoneArea = new maps.Polygon({
        paths: coords,
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#e6e60b",
        fillOpacity: 0.3+(incidenceRate/0.002),
        
        });
    } else if (incidenceRate <= 0.003){
      // orange 500 - 3.5k
      var subzoneArea = new maps.Polygon({
        paths: coords,
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#e6870b",
        fillOpacity: 0.3+(incidenceRate/0.003),
        
        });
    } else if (incidenceRate <= 0.004){
      // red 3.5 - 20k
      var subzoneArea = new maps.Polygon({
        paths: coords,
        strokeColor: "#00000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#d61a1a",
        fillOpacity: 0.3+(incidenceRate/0.004),
        
        });
    } else{
      var subzoneArea = new maps.Polygon({
        paths: coords,
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#f242f5",
        fillOpacity: 0.3+(incidenceRate/0.015),
        
        });
    }
    return subzoneArea;
  }

  const infoboxGenerator = (map, maps, subzone, ohcaCount, popCount, incidenceRate) => {
    let maxLat = 0;
    let maxLatIndex = 0;
    for (let i=0; i < subzone.coordinates.length; i++) {
      if (subzone.coordinates[i].lat>maxLat) {
        maxLat = subzone.coordinates[i];
        maxLatIndex = i;
        
      }
    }
    var infoLatlng = new maps.LatLng(subzone.coordinates[maxLatIndex].lat, subzone.coordinates[maxLatIndex].lng);
      
    let contentString = "<b>"+ subzone.Subzone_name +"</b><br>" +
    "Region: "+ subzone.region +" <br>" +
    "Area: "+ subzone.area.toFixed(2) +" km^2 <br>" +
    "Ohca Count: "+ (ohcaCount) +" <br>" +
    "Population: "+ (popCount) +" <br>" +
    "Incidence Rate: "+ (incidenceRate) +" <br>" +
    
    "<br>";

    var infoWindow =  new maps.InfoWindow({
      content: contentString,
      map: map,
      position: infoLatlng
    });  
    return infoWindow
  }
  const popOhcaDataMapping = ()=> {
    // console.log(populationData);
    for(let i=0; i<ohcaData.length; i++){
      for(let j=0; j<populationData.length; j++){
        if (ohcaData[i]['Subzone_name'] === populationData[j]['subzone_name']) {
          ohcaData[i]['region'] = populationData[j]['region'];
          ohcaData[i]['area'] = populationData[j]['area'];
          ohcaData[i]['yearPop'] = populationData[j]['year'];
          ohcaData[i]['coordinates'] = populationData[j]['coordinates'];
        }
      }
    }
    console.log("after cleaning", ohcaData);
  }
  const handleApiLoaded2010 = (map, maps) => {
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = sumValues(subzone.year['2010'].gender)
      let area = subzone.area;
      let popCount = sumValues(subzone.yearPop['2010'].gender);
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2010'].gender.Male;
      let area = subzone.area;
      let popCount = subzone.yearPop['2010'].gender.Males;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2010'].gender.Female;
      let area = subzone.area;
      let popCount = subzone.yearPop['2010'].gender.Females;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2010'].race.Chinese;
      let area = subzone.area;
      let popCount = subzone.yearPop['2010'].ethnicity.Chinese;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2010'].race.Malay;
      let area = subzone.area;
      let popCount = subzone.yearPop['2010'].ethnicity.Malays;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2010'].race.Indian;
      let area = subzone.area;
      let popCount = subzone.yearPop['2010'].ethnicity.Indians;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2010'].Age['0-10'] + subzone.year['2010'].Age['10-20'] + subzone.year['2010'].Age['20-30'];
      let area = subzone.area;
      let popCount = subzone.yearPop['2010'].age['0-4'] + subzone.yearPop['2010'].age['5-9'] + subzone.yearPop['2010'].age['10-14'] + subzone.yearPop['2010'].age['15-19'] + subzone.yearPop['2010'].age['20-24'] + subzone.yearPop['2010'].age['25-29'];
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2010'].Age['30-40'] + subzone.year['2010'].Age['40-50'] + subzone.year['2010'].Age['50-60'];
      let area = subzone.area;
      let popCount = subzone.yearPop['2010'].age['30-34'] + subzone.yearPop['2010'].age['35-39'] + subzone.yearPop['2010'].age['40-44'] + subzone.yearPop['2010'].age['45-49'] + subzone.yearPop['2010'].age['50-54'] + subzone.yearPop['2010'].age['55-59'];
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2010'].Age['60-70'] + subzone.year['2010'].Age['70-80'] + subzone.year['2010'].Age['80-100'];
      let area = subzone.area;
      let popCount = subzone.yearPop['2010'].age['60-64'] + subzone.yearPop['2010'].age['65-69'] + subzone.yearPop['2010'].age['70-74'] + subzone.yearPop['2010'].age['75-79'] + subzone.yearPop['2010'].age['80-84'] + subzone.yearPop['2010'].age['over 85'] + subzone.yearPop['2010'].age['over 90'];
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = sumValues(subzone.year['2015'].gender)
      let area = subzone.area;
      let popCount = sumValues(subzone.yearPop['2015'].gender);
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2015'].gender.Male;
      let area = subzone.area;
      let popCount = subzone.yearPop['2015'].gender.Males;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2015'].gender.Female;
      let area = subzone.area;
      let popCount = subzone.yearPop['2015'].gender.Females;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2015'].race.Chinese;
      let area = subzone.area;
      let popCount = subzone.yearPop['2015'].ethnicity.Chinese;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2015'].race.Malay;
      let area = subzone.area;
      let popCount = subzone.yearPop['2015'].ethnicity.Malays;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2015'].race.Indian;
      let area = subzone.area;
      let popCount = subzone.yearPop['2015'].ethnicity.Indians;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2015'].Age['0-10'] + subzone.year['2015'].Age['10-20'] + subzone.year['2015'].Age['20-30'];
      let area = subzone.area;
      let popCount = subzone.yearPop['2015'].age['0-4'] + subzone.yearPop['2015'].age['5-9'] + subzone.yearPop['2015'].age['10-14'] + subzone.yearPop['2015'].age['15-19'] + subzone.yearPop['2015'].age['20-24'] + subzone.yearPop['2015'].age['25-29'];
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2015'].Age['30-40'] + subzone.year['2015'].Age['40-50'] + subzone.year['2015'].Age['50-60'];
      let area = subzone.area;
      let popCount = subzone.yearPop['2015'].age['30-34'] + subzone.yearPop['2015'].age['35-39'] + subzone.yearPop['2015'].age['40-44'] + subzone.yearPop['2015'].age['45-49'] + subzone.yearPop['2015'].age['50-54'] + subzone.yearPop['2015'].age['55-59'];
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2015'].Age['60-70'] + subzone.year['2015'].Age['70-80'] + subzone.year['2015'].Age['80-100'];
      let area = subzone.area;
      let popCount = subzone.yearPop['2015'].age['60-64'] + subzone.yearPop['2015'].age['65-69'] + subzone.yearPop['2015'].age['70-74'] + subzone.yearPop['2015'].age['75-79'] + subzone.yearPop['2015'].age['80-84'] + subzone.yearPop['2015'].age['over 85'] + subzone.yearPop['2015'].age['over 90'];
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = sumValues(subzone.year['2020'].gender)
      let area = subzone.area;
      let popCount = sumValues(subzone.yearPop['2020'].gender);
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2020'].gender.Male;
      let area = subzone.area;
      let popCount = subzone.yearPop['2020'].gender.Males;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2020'].gender.Female;
      let area = subzone.area;
      let popCount = subzone.yearPop['2020'].gender.Females;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2020'].race.Chinese;
      let area = subzone.area;
      let popCount = subzone.yearPop['2020'].ethnicity.Chinese;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2020'].race.Malay;
      let area = subzone.area;
      let popCount = subzone.yearPop['2020'].ethnicity.Malays;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2020'].race.Indian;
      let area = subzone.area;
      let popCount = subzone.yearPop['2020'].ethnicity.Indians;
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2020'].Age['0-10'] + subzone.year['2020'].Age['10-20'] + subzone.year['2020'].Age['20-30'];
      let area = subzone.area;
      let popCount = subzone.yearPop['2020'].age['0-4'] + subzone.yearPop['2020'].age['5-9'] + subzone.yearPop['2020'].age['10-14'] + subzone.yearPop['2020'].age['15-19'] + subzone.yearPop['2020'].age['20-24'] + subzone.yearPop['2020'].age['25-29'];
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2020'].Age['30-40'] + subzone.year['2020'].Age['40-50'] + subzone.year['2020'].Age['50-60'];
      let area = subzone.area;
      let popCount = subzone.yearPop['2020'].age['30-34'] + subzone.yearPop['2020'].age['35-39'] + subzone.yearPop['2020'].age['40-44'] + subzone.yearPop['2020'].age['45-49'] + subzone.yearPop['2020'].age['50-54'] + subzone.yearPop['2020'].age['55-59'];
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = subzone.year['2020'].Age['60-70'] + subzone.year['2020'].Age['70-80'] + subzone.year['2020'].Age['80-100'];
      let area = subzone.area;
      let popCount = subzone.yearPop['2020'].age['60-64'] + subzone.yearPop['2020'].age['65-69'] + subzone.yearPop['2020'].age['70-74'] + subzone.yearPop['2020'].age['75-79'] + subzone.yearPop['2020'].age['80-84'] + subzone.yearPop['2020'].age['over 85'] + subzone.yearPop['2020'].age['over 90'];
      let incidenceRate = ohcaCount/popCount;
      var subzoneArea = subzoneGenerator(incidenceRate, maps, coords);
      var infoWindow = infoboxGenerator(map, maps, subzone, ohcaCount, popCount, incidenceRate);
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
    {popOhcaDataMapping()}
    <h1 style={{marginLeft:'10px'}}> Out-of-Hospital Cardiac Arrest Heat Map</h1>
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
        {((snapshotYear===2010) && (age==="young")) ? (
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
        {((snapshotYear===2010) && (age==="middle")) ? (
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
        {((snapshotYear===2010) && (age==="old")) ? (
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
        {((snapshotYear===2015) && (gender==="male")) ? (
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
        ) : (<></>)}     
        {((snapshotYear===2015) && (gender==="female")) ? (
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
        ) : (<></>)}
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
        {((snapshotYear===2015) && (age==="young")) ? (
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
        {((snapshotYear===2015) && (age==="middle")) ? (
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
        {((snapshotYear===2015) && (age==="old")) ? (
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
        {((snapshotYear===2020) && (gender==="male")) ? (
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
        ) : (<></>)}     
        {((snapshotYear===2020) && (gender==="female")) ? (
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
        ) : (<></>)}
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
        {((snapshotYear===2020) && (age==="young")) ? (
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
        {((snapshotYear===2020) && (age==="middle")) ? (
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
        {((snapshotYear===2020) && (age==="old")) ? (
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
                <TableCell>OHCA count</TableCell>
                <TableCell>Population</TableCell>
                <TableCell>Incidence Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              

              {snapshotYear===2010 ? (
                    ohcaData.map((subzone) => (
                      <TableRow key={subzone.id}>
                        <TableCell>{subzone.Subzone_name}</TableCell>
                        <TableCell>{subzone.region}</TableCell>
                        <TableCell>{subzone.area.toFixed(2)}</TableCell>
                        <TableCell>{sumValues(subzone.year['2010'].gender)}</TableCell>
                        <TableCell>{sumValues(subzone.yearPop['2010'].gender)}</TableCell>
                        <TableCell>{(sumValues(subzone.year['2010'].gender)/sumValues(subzone.yearPop['2010'].gender)).toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  ): <></>}
                  {snapshotYear===2015 ? (
                    ohcaData.map((subzone) => (
                      <TableRow key={subzone.id}>
                      <TableCell>{subzone.Subzone_name}</TableCell>
                      <TableCell>{subzone.region}</TableCell>
                      <TableCell>{subzone.area.toFixed(2)}</TableCell>
                      <TableCell>{sumValues(subzone.year['2015'].gender)}</TableCell>
                      <TableCell>{sumValues(subzone.yearPop['2015'].gender)}</TableCell>
                      <TableCell>{(sumValues(subzone.year['2015'].gender)/sumValues(subzone.yearPop['2010'].gender)).toFixed(2)}</TableCell>
                    </TableRow>
                    ))
                  ): <></>}
                  {snapshotYear===2020 ? (
                    ohcaData.map((subzone) => (
                      <TableRow key={subzone.id}>
                        <TableCell>{subzone.Subzone_name}</TableCell>
                        <TableCell>{subzone.region}</TableCell>
                        <TableCell>{subzone.area.toFixed(2)}</TableCell>
                        <TableCell>{sumValues(subzone.year['2020'].gender)}</TableCell>
                        <TableCell>{sumValues(subzone.yearPop['2020'].gender)}</TableCell>
                        <TableCell>{(sumValues(subzone.year['2020'].gender)/sumValues(subzone.yearPop['2010'].gender)).toFixed(2)}</TableCell>
                      </TableRow>
                    ))
                  ): <></>}                      

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
                <MenuItem value={"young"}>0 - 30</MenuItem>
                <MenuItem value={"middle"}>30 - 60</MenuItem>
                <MenuItem value={"old"}>60 - over 90</MenuItem>
              </Select>
            </FormControl>               

        </Box>        
      </div>
  </div>
)
}

export default OhcaHeatMap