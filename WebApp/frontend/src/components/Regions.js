import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../templates/Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Regions() {

  let [geoData, setgd] = useState("This is data")

  // useEffect(() => {
  //     getData()
  // }, [])

  // let getData = async () => {
  //     let response = await fetch('http://127.0.0.1:8000/api/aeds/')
  //     let data = await response.json()
  //     console.log('DATA:', data)
  //     setgd(data)
  // }

  return (
    <React.Fragment>
      <Title>Regions</Title>
      <Typography component="p" variant="h4">
        {/* $3,024.00 */}
        {geoData}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}