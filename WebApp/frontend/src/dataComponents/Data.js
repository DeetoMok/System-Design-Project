import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import OhcaData from './OhcaData';
import AedData from './AedData';
import AedcandidateData from './AedcandidateData';
import Upload from './Upload';
import { AppBlocking } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Data = () => {

  let [data, setData] = useState('aed')

  // useEffect(() => {
  //     getData()
  // }, [])

  // let getData = async () => {
  //     let response = await fetch('http://127.0.0.1:8000/api/ohcas/')
  //     let data = await response.json()
  //     console.log('DATA:', data)
  //     // console.log(typeof data.
  //     setData(data)
  // }


    return (

 
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >

            <Toolbar /> 
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>

                {/* Chart */}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 60,
                    }}
                  >
                    <Link color="primary" href="#" sx={{ textAlign: 'center '}} onClick={() => setData('aed')}>
                      AED Data
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
                      height: 60,
                    }}
                  >
                    <Link color="primary" href="#" sx={{ textAlign: 'center '}} onClick={() => setData('aedcandidate')}>
                      AED Candidate Data
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
                      height: 60,
                    }}
                  >
                    <Link color="primary" href="#" sx={{ textAlign: 'center '}} onClick={() => setData('ohca')}>
                      OHCA Data
                    </Link>                    
                    
                  </Paper>
                </Grid>              
                {/* Recent Orders */}
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
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
          

    )
}

export default Data
