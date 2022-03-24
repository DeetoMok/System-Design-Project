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
import CSRFToken from "../../csrftoken";
//import CSRFToken from "./csrf";
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import {
  Typography,
  Select,
  Button,
  Card,
  CardActions,
  CardContent,
  InputLabel,
  MenuItem,
  Chip,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { PredictorSelect, ResponseSelect, ModelSelect } from "./selectdropdown";


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

    let sendDetails = async (numAeds, numK, numIters) => {
        let formField = new FormData()

        formField.append('numAeds', numAeds)
        formField.append('numK', numK)
        formField.append('numIters', numIters)
        // formField.append('numAeds', setDetails.numAeds)
        // formField.append('numK', setDetails.numK)
        // formField.append('numIters', setDetails.numIters)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/ohcas/optimal',
            data: formField
        }).then((response) => {
            console.log("response", response);
            // history.push('/kmeans')
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
        console.log(detail);
        setDetails({
            numAeds: detail.numAeds,
            numK: detail.numK,
            numIters: detail.numIters,
        })
        // updateData(detail.numAeds, detail.numK, detail.numIters);
        sendDetails(detail.numAeds, detail.numK, detail.numIters);
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
                </CardContent>
            </Card>

            {/* <MetricTable hasTrain={hasTrain} /> */}
            <MetricTableCurrent hasTrain={isTrained} metrics={currentMetrics} />
            <MetricTable hasTrain={isTrained} metrics={newMetrics} />
            
        </div>
    </div>
  );
}

