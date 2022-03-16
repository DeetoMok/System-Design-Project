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
    const [metrics, setMetrics] = React.useState({
        totalCoverage:"", 
        partialCoverage: "", 
        expectedSurvival: "", 
        aveDistToAed: "", 
        computationalTime: ""
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
            setMetrics({
                totalCoverage:response.data['Total Coverage'], 
                partialCoverage: response.data['Partial Coverage'], 
                expectedSurvival: response.data['Survival Rate'], 
                aveDistToAed: response.data['Average Distance'], 
                computationalTime: ""                
            })
        })
    }

    let showNewPoints = (response) => {
        let newPoints = response.data['AED placement']
        console.log('new Coordinates:', newPoints);
        setTrain(!isTrained);
        setNewAedData(newPoints);
        
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
        <div className="maps">
            {/* {(viewHome) ?
                <Card className="map" variant="outlined">
                    <MapHome />
                </Card>
                : (<></>)  
            } */}
            <Card className="map" variant="outlined">
                <KmeansMap hasTrain={isTrained} newAedData={newAedData}/>
            </Card>
        </div>
           
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



            {/* <Card className="root" variant="outlined">
                <CardContent >
                    <Typography
                        className="title"
                        color="textSecondary"
                        gutterBottom
                    >
                        Parameters
                    </Typography>
                    <PredictorSelect config={config} setConfig={setConfig} />
                    <ResponseSelect config={config} setConfig={setConfig} />
                    <ModelSelect config={config} setConfig={setConfig} />
                </CardContent>

                <div className="buttonBody">
                    <Button variant="contained" color="primary" onClick={() => setTrain(!isTrained)}>
                        Train Model
                    </Button>
                </div>
            </Card> */}

            {/* <MetricTable hasTrain={hasTrain} /> */}
            <MetricTableCurrent />
            <MetricTable hasTrain={isTrained} metrics={metrics} />
            
            {/* <div className="buttonBody">
                <Button variant="contained" color="secondary" size="large" onClick={() => {setViewHome(!viewHome)}}>
                    Compare Maps
                </Button>
            </div>             */}
        </div>
    </div>
  );
}

