import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../templates/Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Regions() {

  let [data, setgd] = useState()

  useEffect(() => {
      getData()
  }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/regions/')
      let data = await response.json()
      // console.log('DATA:', data.regions)
      // console.log(typeof data.regions)
      setgd(data.regions)
  }

  return (
    <React.Fragment>
      <Title>Regions</Title>
      <Typography component="p" variant="h4">
        {/* $3,024.00 */}
        {data}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        North, South, East, West
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View
        </Link>
      </div>
    </React.Fragment>
  );
}