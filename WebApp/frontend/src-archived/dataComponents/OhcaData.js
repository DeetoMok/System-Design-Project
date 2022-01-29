import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../templates/Title';


function preventDefault(event) {
  event.preventDefault();
}

export default function OhcaData() {

  let [ohcadata, setData] = useState([])

  useEffect(() => {
      getData()
  }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/ohcas/')
      let data = await response.json()
      console.log('DATA:', data)
      // console.log(typeof data.
      setData(data)
  }

  return (
    <React.Fragment>
      <Title>OHCA Data</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>Planning Area</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Subzone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ohcadata.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.lat}</TableCell>
              <TableCell>{row.lon}</TableCell>
              <TableCell>{row.pa}</TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell>{row.subzone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more data
      </Link>
    </React.Fragment>
  );
}