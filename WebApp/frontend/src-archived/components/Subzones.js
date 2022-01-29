import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../templates/Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Subzones() {

  let [data, setgd] = useState()

  useEffect(() => {
      getData()
  }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/subzones/')
      let data = await response.json()
      setgd(data.regions)
  }  

  return (
    <React.Fragment>
      <Title>Sub Zones</Title>
      <Typography component="p" variant="h4">
        {data}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
         1, 2, 3, 4, 5, ...
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View
        </Link>
      </div>
    </React.Fragment>
  );
}