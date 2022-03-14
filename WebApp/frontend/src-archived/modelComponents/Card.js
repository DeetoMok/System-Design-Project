import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { ButtonBody } from "./styledComponents";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const FormCard = () => {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
        <Card>
            Hello
        </Card>
    </div>

    // <Card  variant="outlined">
    //     <CardContent>   
    //         {/* <Typography
                
    //             color="textSecondary"
    //             gutterBottom
    //         >
    //             Tune Machine Learning Model
    //         </Typography> */}
    //         {/* <PredictorSelect config={config} setConfig={setConfig} />
    //         <ResponseSelect config={config} setConfig={setConfig} />
    //         <ModelSelect config={config} setConfig={setConfig} /> */}
    //     </CardContent>

    //     {/* <ButtonBody>
    //         <Button variant="contained" color="primary">
    //             Train Model
    //         </Button>
    //     </ButtonBody> */}
    //   {/* <ToastContainer /> */}
    // </Card>
  );
};
export default FormCard;
