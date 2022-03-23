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
import { currentAedData } from './currentAedData';
import { optimalAedData } from './optimalAedData';
import { newAedData } from './newAedData';

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
      let ohcaDensity = ohcaCount/area;
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
  const handleApiLoaded2015 = (map, maps) => {
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = sumValues(subzone.year['2015'].gender)
      let area = subzone.area;
      let ohcaDensity = ohcaCount/area;
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
  const handleApiLoaded2020 = (map, maps) => {
    ohcaData.map((subzone) => {
      var coords = subzone.coordinates;
      let ohcaCount = sumValues(subzone.year['2020'].gender)
      let area = subzone.area;
      let ohcaDensity = ohcaCount/area;
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

export default OhcaHeatMap