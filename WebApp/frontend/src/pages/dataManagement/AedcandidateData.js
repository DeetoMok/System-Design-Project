import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Papa from 'papaparse'
// import CsvReader from "./csvReader";
// import CsvReader from "./CsvReader";
import { CSVReader, readString } from 'react-papaparse';


function preventDefault(event) {
  event.preventDefault();
}

export default function AedcandidateData() {

  const [ohcadata, setData] = useState();
  const [columnData, setColumnData] = useState();
  const [rowData, setRowData] = useState();
  let testData = [
    {
        "id": 1,
        "lat": 1.2971792094554653,
        "lon": 103.77646219577832,
        "country": "singapore",
        "pa": null,
        "region": null,
        "subzone": null
    },
    {
        "id": 2,
        "lat": 123.0,
        "lon": 456.0,
        "country": "singapore",
        "pa": 10,
        "region": "S",
        "subzone": 7
    }
  ]

  useEffect(() => {
      getData()
  }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/aedcandidates/')
      let data = await response.json()
      console.log('DATA:', data.length)
      if (data.length !== 0) {
        setData(data)
      }
      
  }

  let updateData = async (rows) => {
    // console.log("ohcadata being sent to backend", ohcadata)
    fetch(`http://127.0.0.1:8000/api/aedcandidates/update`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(rows)
      // body: rows
    })

  }

  let handleSubmit = (rows) => {
    updateData(rows)
    // history.push('/')
  }

  // const [rows, setRows] = useState([])
  // useEffect(() => {
  //   async function getData() {
  //     const response = await fetch('/data/nodes.csv')
  //     const reader = response.body.getReader()
  //     const result = await reader.read() // raw array
  //     const decoder = new TextDecoder('utf-8')
  //     const csv = decoder.decode(result.value) // the csv text
  //     const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
  //     const rows = results.data // array of objects
  //     setRows(rows)
  //   }  
  //   getData()
  // }, [])

  let handleOnDrop = (data) => {
    console.log('---------------------------')
    console.log("UPLOADED DATA: ", data)
    // console.log(data[0].data[0])
    // console.log("JSON: ", readString("1,2,3,4,5,5,6,7"))
    console.log('---------------------------')

    const columns = data[0].data.map((col,index) => {
      return {
        Header: col,
        accessor: col.split(" ").join("_".toLowerCase()),
      };
    });

    const rows = data.slice(1).map((row) => {
      return row.data.reduce((acc, curr, index) => {

        acc[columns[index].accessor] = curr;
        return acc;
      }, {})
    });

    console.log("ROWS:", rows)
    // setData(testData)
    setData(rows)
    
    handleSubmit(rows)
  }

  let handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  let handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }  

  return (
    <React.Fragment>
      <h1>AED Candidate Data</h1>
      {/* <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        onRemoveFile={handleOnRemoveFile}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader> */}

      {/* {(ohcadata.length === 0) ? ( */}
      {(ohcadata === undefined) ? (
      <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
      >
      <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
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

      {(ohcadata === undefined) ? (
        <p>Upload data to start</p>
      ) : (              
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more data
        </Link>
      )}
    </React.Fragment>
  );
}