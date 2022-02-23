import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function preventDefault(event) {
  event.preventDefault();
}

export default function AedData() {

  let tempData = [
    {
        "id": 1,
        "lat": 1.2971792094554653,
        "lon": 103.77646219577832,
        "country": "singapore",
        "pa": 10,
        "region": "S",
        "subzone": 7
    },
    {
        "id": 2,
        "lat": 123.0,
        "lon": 456.0,
        "country": "singapore",
        "pa": 10,
        "region": "S",
        "subzone": 15
    },
    {
        "id": 3,
        "lat": 1.352654,
        "lon": 103.973217,
        "country": "singapore",
        "pa": 10,
        "region": "S",
        "subzone": 72
    },
    {
        "id": 4,
        "lat": 1.375489,
        "lon": 103.738288,
        "country": "singapore",
        "pa": 3,
        "region": "N",
        "subzone": 121
    },
    {
        "id": 5,
        "lat": 1.39231,
        "lon": 103.746518,
        "country": "singapore",
        "pa": 4,
        "region": "N",
        "subzone": 148
    },
    {
        "id": 6,
        "lat": 1.392493,
        "lon": 103.745591,
        "country": "singapore",
        "pa": 2,
        "region": "N",
        "subzone": 160
    },
    {
        "id": 7,
        "lat": 1.393307,
        "lon": 103.746132,
        "country": "singapore",
        "pa": 40,
        "region": "W",
        "subzone": 238
    },
    {
        "id": 8,
        "lat": 1.393074,
        "lon": 103.747269,
        "country": "singapore",
        "pa": 45,
        "region": "W",
        "subzone": 220
    },
    {
        "id": 9,
        "lat": 1.39291,
        "lon": 103.74839,
        "country": "singapore",
        "pa": 30,
        "region": "E",
        "subzone": 288
    },
    {
        "id": 10,
        "lat": 1.392803,
        "lon": 103.749865,
        "country": "singapore",
        "pa": 33,
        "region": "E",
        "subzone": 300
    }
]
  let [ohcadata, setData] = useState(tempData)
  // let [ohcadata, setData] = useState([])
  
  // useEffect(() => {
  //     getData()
  // }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/aeds/')
      let data = await response.json()
      console.log('DATA:', data)
      // console.log(typeof data.
      setData(data)
  }

  return (
    <React.Fragment>
      <h1>AED Data</h1>
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