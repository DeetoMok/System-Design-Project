import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ReactMap from './ReactMap';

function preventDefault(event) {
  event.preventDefault();
}

export default function MclpModel() {
  return (
    // <div>
    
    // {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> */}
    //   <ReactMap />
    // {/* </Container> */}

    // </div>
    
    <Container
    component="main"
    maxWidth="lg"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      mt: 4,
      mb: 4
    }}>
      <Grid container spacing={3}>

{/* Recent Orders */}
<Grid item xs={12} md={12} lg={12}>

<ReactMap />

    
</Grid>        

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
    <Link color="primary" href="#" sx={{ textAlign: 'center '}} >
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
    <Link color="primary" href="#" sx={{ textAlign: 'center '}} >
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
    <Link color="primary" href="#" sx={{ textAlign: 'center '}} >
      OHCA Data
    </Link>                    
    
  </Paper>
</Grid>              


</Grid>
    </Container>

    // <Box
    // component="main"
    // sx={{
    //   backgroundColor: (theme) =>
    //     theme.palette.mode === 'light'
    //       ? theme.palette.grey[100]
    //       : theme.palette.grey[900],
    //   flexGrow: 1,
    //   height: '100vh',
    //   overflow: 'auto',
    // }}
    // >
    //   <Toolbar /> 
    //   <ReactMap />

    // </Box>
  );
}
