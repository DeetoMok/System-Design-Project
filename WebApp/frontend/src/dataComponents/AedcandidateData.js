import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../templates/Title';
import Papa from 'papaparse'
import CsvReader from "./CsvReader";


function preventDefault(event) {
  event.preventDefault();
}

export default function AedcandidateData() {

  let [ohcadata, setData] = useState([])

  useEffect(() => {
      getData()
  }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/aedcandidates/')
      let data = await response.json()
      console.log('DATA:', data.length)
      // console.log(typeof data.
      setData(data)
  }

  const [rows, setRows] = useState([])
  useEffect(() => {
    async function getData() {
      const response = await fetch('/data/nodes.csv')
      const reader = response.body.getReader()
      const result = await reader.read() // raw array
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) // the csv text
      const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
      const rows = results.data // array of objects
      setRows(rows)
    }
    getData()
  }, [])

  return (
    <React.Fragment>
      <Title>AED Candidate Data</Title>
      {(ohcadata.length === 0) ? (
        <CsvReader
        data={ohcadata}
        setData={setData}
        />
      ) : (
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
      )}

      {(ohcadata.length === 0) ? (
        <p>Upload data to start</p>
      ) : (              
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more data
        </Link>
      )}
    </React.Fragment>
  );
}