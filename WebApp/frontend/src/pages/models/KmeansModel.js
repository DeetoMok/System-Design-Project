import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./kmeansModel.css"
import { PredictorSelect, ResponseSelect, ModelSelect } from "./selectdropdown";
import KmeansMap from "./KmeansMap";
import MapHome from "../home/MapHome";
import MetricTable from "./MetricTable";
import MetricTableCurrent from "./MetricTableCurrent";
import AedNumberForm from "./AedNumberForm";
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
// import { PredictorSelect, ResponseSelect, ModelSelect } from "./selectdropdown";


export default function KmeansModel() {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;
    const [data, setData] = React.useState({
        columns: ['a', 'b'],
    });
    const [config, setConfig] = React.useState({
        predictor: [],
        response: "",
        model: "KNN",
        params: {
        knn: { neighbour: 0, "random state": 0 },
        "random forest": {
            "number of trees": 0,
            height: 0,
            depth: 0,
            max_depth: 0,
        },
        },
        columns: data.columns,
        predictorsOptions: data.columns,
        responseOptions: data.columns,
        clientData: data.csvData,
    });
    const [isTrained, setTrain] = React.useState(false)
    const [viewHome, setViewHome] = React.useState(false)

    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const [user, setUser] = React.useState({name:"", email: ""})
    const [error, setError] = React.useState("")    

    const Login = details => {
        console.log(details);
        setUser({
            name: details.name,
            email: details.email
        })
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
                <KmeansMap hasTrain={isTrained}/>
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
                    <AedNumberForm Submit={Login} error={error} />
                    {/* <div>
                        <input type="text" 
                        value={additionalAeds}
                        onChange={e => setAed(e.target.value)}/>
                    </div>
                    <input type="submit" value="Submit" /> */}
                </CardContent>
            </Card>



            <Card className="root" variant="outlined">
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
            </Card>

            {/* <MetricTable hasTrain={hasTrain} /> */}
            <MetricTableCurrent />
            <MetricTable hasTrain={isTrained} />
            
            {/* <div className="buttonBody">
                <Button variant="contained" color="secondary" size="large" onClick={() => {setViewHome(!viewHome)}}>
                    Compare Maps
                </Button>
            </div>             */}
        </div>
    </div>
  );
}

