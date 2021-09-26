import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import Orders from '../templates/Orders';
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

const Data = ({ data, setData }) => {

    let abc = () => {
      console.log("DATA: ", data)
    }

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
                    <Link color="primary" href="#" sx={{ textAlign: 'center '}}>
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
                    <Link color="primary" href="#" sx={{ textAlign: 'center '}}>
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
                    <Link color="primary" href="#" sx={{ textAlign: 'center '}}>
                      OHCA Data
                    </Link>                    
                    
                  </Paper>
                </Grid>              
                {/* Recent Orders */}
                <Grid item xs={12} md={12} lg={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {/* {abc()} */}
                    {(typeof data !== 'undefined') ? (
                      <Orders />
                    ): (
                      <Upload data={data} setData={setData}/>
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
