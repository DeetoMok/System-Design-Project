import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import OhcaData from './OhcaData';
import AedData from './AedData';
import AedcandidateData from './AedcandidateData';
import { makeStyles } from "@material-ui/core/styles";
import "./dataManagement.css"
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
// import { ButtonBody } from "./styledComponents";


export default function DataManagement() {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;
  let [data, setData] = useState('aed')

  return (
    <div className="main">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 30,
              margin: 1,
              fontSize: 30,
            }}
          >
            <Link color="primary" href="#" sx={{ textAlign: 'center '}} onClick={() => setData('aed')}>
              Existing AED Locations
            </Link> 
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 30,
              margin: 1,
              fontSize: 30,
            }}
          >
            <Link color="primary" href="#" sx={{ textAlign: 'center '}} onClick={() => setData('aedcandidate')}>
              AED Candidate Locations
            </Link> 
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 30,
              margin: 1,
              fontSize: 30,
            }}
          >
            <Link color="primary" href="#" sx={{ textAlign: 'center '}} onClick={() => setData('ohca')}>
              OHCA Data
            </Link>                    
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

            {(data === 'aed') ? (
              <AedData />
            ): (
              <></>
            )}
            {(data === 'ohca') ? (
              <OhcaData />
            ): (
              <></>
            )}
            {(data === 'aedcandidate') ? (
              <AedcandidateData />
            ): (
              <></>
            )}                                                              

            
          </Paper>
        </Grid>        

      </Grid>
    </div>

  );
}

