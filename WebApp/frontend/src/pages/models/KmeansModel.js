import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./kmeansModel.css"
import { PredictorSelect, ResponseSelect, ModelSelect } from "./selectdropdown";
import KmeansMap from "./KmeansMap";
import MapHome from "../home/MapHome";
import MetricTable from "./MetricTable";
import MetricTableCurrent from "./MetricTableCurrent";
import AedNumberForm from "./AedNumberForm";
import axios from 'axios';
import {
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import { alignProperty } from "@mui/material/styles/cssUtils";


export default function KmeansModel() {

    const [isTrained, setTrain] = React.useState(false);
    const [viewHome, setViewHome] = React.useState(false);
    const [newAedData, setNewAedData] = React.useState([]);
    const [details, setDetails] = React.useState({
        numAeds:"", 
        numK: "", 
        numIters: ""
    });
    const [currentMetrics, setCurrentMetrics] = React.useState({
        totalCoverage: 0, 
        partialCoverage: 0, 
        expectedSurvival: 0, 
        aveDistToAed: 0,
    });
    const [newMetrics, setNewMetrics] = React.useState({
        totalCoverage: 0, 
        partialCoverage: 0, 
        expectedSurvival: 0, 
        aveDistToAed: 0,
    });    
    const [error, setError] = React.useState("");
    const history = useHistory();
    let latlonid = 1;

    let sendDetails = async (numAeds, numK, numIters) => {
        let formField = new FormData()

        formField.append('numAeds', numAeds)
        formField.append('numK', numK)
        formField.append('numIters', numIters)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/ohcas/optimal',
            data: formField
        }).then((response) => {
            console.log("response", response);
            showNewPoints(response);

        })
    }

    let showNewPoints = (response) => {
        let newPoints = response.data['AED placement']
        console.log('new Coordinates:', newPoints);
        setTrain(!isTrained);
        setNewAedData(newPoints);
        setCurrentMetrics({
            totalCoverage:response.data['Total Coverage'], 
            partialCoverage: response.data['Partial Coverage'], 
            expectedSurvival: response.data['Survival Rate'], 
            aveDistToAed: response.data['Average Distance'], 
            computationalTime: ""                
        })
        setNewMetrics({
            totalCoverage:response.data['New Total Coverage'], 
            partialCoverage: response.data['New Partial Coverage'], 
            expectedSurvival: response.data['New Survival Rate'], 
            aveDistToAed: response.data['New Average Distance'], 
            computationalTime: ""                
        })             
        
    }

    const SubmitNumAeds = detail => {
        latlonid = 1
        console.log(detail);
        setDetails({
            numAeds: detail.numAeds,
            numK: detail.numK,
            numIters: detail.numIters,
        })

        sendDetails(detail.numAeds, detail.numK, detail.numIters);
    }

    const Reset = () => {
        setDetails({
            numAeds:"", 
            numK: "", 
            numIters: ""
        })
        setTrain(false);
        setNewAedData([]);
        setCurrentMetrics({
            totalCoverage:0, 
            partialCoverage: 0, 
            expectedSurvival: 0, 
            aveDistToAed: 0, 
            computationalTime: ""                
        })
        setNewMetrics({
            totalCoverage: 0, 
            partialCoverage: 0, 
            expectedSurvival: 0, 
            aveDistToAed: 0, 
            computationalTime: ""                
        })              
    }

  return (
    <div className="main">
        <Card className="map" variant="outlined">
            <KmeansMap hasTrain={isTrained} newAedData={newAedData}/>
        </Card>
           
        <div className="body">
            <Card className="root" variant="outlined">
                <CardContent >
                    <Typography
                        className="title"
                        color="textSecondary"
                        gutterBottom
                    >
                        Parameters
                    </Typography>                    
                    <AedNumberForm Submit={SubmitNumAeds} error={error} />
                    <button onClick={Reset}>Reset</button>
                </CardContent>
            </Card>

            <MetricTableCurrent hasTrain={isTrained} metrics={currentMetrics} />
            <MetricTable hasTrain={isTrained} metrics={newMetrics} />
            
        </div>
        {(isTrained)?
        <>
        <TableContainer
            sx={{
              height: 500,
              width: "100%"
            }}
          >
            <Table size="small" 
              sx={{
                height: "max-content"
              }}>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Latituide</TableCell>
                  <TableCell>Longitude</TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  {newAedData.map((coordinates) => (
                      <TableRow key={latlonid++}>
                        <TableCell>{latlonid}</TableCell>
                        <TableCell>{coordinates[0]}</TableCell>
                        <TableCell>{coordinates[1]}</TableCell>
                        
                      </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TableContainer>        
        </>:<></>}
        
    </div>
  );
}

